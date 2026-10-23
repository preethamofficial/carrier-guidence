"""Fetch publicly exposed Greenhouse, Lever and Ashby job-board listings.

Only configured board identifiers are queried. This script does not crawl arbitrary
websites. Unknown posting dates are marked unknown and are not represented as verified
recent postings; first_seen_at records when this collector discovered a listing.
"""
from __future__ import annotations

import json
import re
import time
from html import unescape
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

import requests

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "CodeAtlas_Website"
DATA = SITE / "data"
COMPANIES_FILE = DATA / "companies.json"
JOBS_FILE = DATA / "jobs.json"
LOG_FILE = DATA / "scrape-log.json"
RECENT_DAYS = 7
RETENTION_DAYS = 30
BATCH_SIZE = 300
HEADERS = {"User-Agent": "CodeAtlas-JobDirectory/1.0 (+public-job-board-index)"}
SESSION = requests.Session()
SESSION.headers.update(HEADERS)


def now_utc() -> datetime:
    return datetime.now(timezone.utc)


def iso_now() -> str:
    return now_utc().isoformat()


def load_json(path: Path, default: Any) -> Any:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        return default
    except (json.JSONDecodeError, OSError) as exc:
        print(f"Cannot read {path}: {exc}")
        return default


def save_json(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def parse_date(value: Any) -> datetime | None:
    if not value or not isinstance(value, str):
        return None
    try:
        dt = datetime.fromisoformat(value.replace("Z", "+00:00"))
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return dt.astimezone(timezone.utc)
    except ValueError:
        return None


def fetch_json(url: str) -> dict[str, Any] | list[Any] | None:
    try:
        response = SESSION.get(url, timeout=20)
        if response.status_code in (403, 404):
            print(f"Board unavailable ({response.status_code}): {url}")
            return None
        response.raise_for_status()
        payload = response.json()
        return payload if isinstance(payload, (dict, list)) else None
    except (requests.RequestException, ValueError) as exc:
        print(f"Request failed for {url}: {exc}")
        return None


def plain_description(value: Any) -> str | None:
    """Convert ATS HTML or text into safe, readable plain text for the static feed."""
    if not isinstance(value, str) or not value.strip():
        return None
    text = unescape(value)
    text = re.sub(r"(?is)<(script|style)\b[^>]*>.*?</\1\s*>", " ", text)
    text = re.sub(r"(?i)<br\s*/?>|</(p|div|li|h[1-6]|section|tr)\s*>", "\n", text)
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"[ \t\xa0]+", " ", text)
    text = re.sub(r"\n\s*\n+", "\n\n", text)
    text = text.strip()
    return text[:12000] if text else None


def scrape_greenhouse(token: str) -> list[dict[str, Any]] | None:
    payload = fetch_json(f"https://boards-api.greenhouse.io/v1/boards/{token}/jobs?content=true")
    if not isinstance(payload, dict) or not isinstance(payload.get("jobs"), list):
        return None
    return [{
        "external_id": str(job.get("id", "")),
        "title": job.get("title"),
        "location": (job.get("location") or {}).get("name") if isinstance(job.get("location"), dict) else None,
        "apply_url": job.get("absolute_url"),
        "posted_date": job.get("updated_at") or job.get("created_at"),
        "description": plain_description(job.get("content")),
    } for job in payload["jobs"]]


def scrape_lever(token: str) -> list[dict[str, Any]] | None:
    payload = fetch_json(f"https://api.lever.co/v0/postings/{token}?mode=json")
    if not isinstance(payload, list):
        return None
    result = []
    for job in payload:
        created = job.get("createdAt")
        posted = datetime.fromtimestamp(created / 1000, timezone.utc).isoformat() if isinstance(created, (int, float)) and created > 0 else None
        categories = job.get("categories") or {}
        result.append({
            "external_id": str(job.get("id", "")),
            "title": job.get("text"),
            "location": categories.get("location") if isinstance(categories, dict) else None,
            "apply_url": job.get("hostedUrl"),
            "posted_date": posted,
            "description": plain_description(job.get("descriptionPlain") or job.get("description")),
        })
    return result


def scrape_ashby(token: str) -> list[dict[str, Any]] | None:
    payload = fetch_json(f"https://api.ashbyhq.com/posting-api/job-board/{token}")
    if not isinstance(payload, dict) or not isinstance(payload.get("jobs"), list):
        return None
    return [{
        "external_id": str(job.get("id", "")),
        "title": job.get("title"),
        "location": job.get("location"),
        "apply_url": job.get("jobUrl") or job.get("applyUrl"),
        "posted_date": job.get("publishedAt"),
        "description": plain_description(job.get("descriptionPlain") or job.get("descriptionHtml")),
    } for job in payload["jobs"]]


SCRAPERS = {"greenhouse": scrape_greenhouse, "lever": scrape_lever, "ashby": scrape_ashby}


def valid_job(job: dict[str, Any]) -> bool:
    return bool(job.get("external_id") and job.get("title") and job.get("apply_url")
                and str(job["apply_url"]).startswith("https://"))


def job_key(job: dict[str, Any]) -> str:
    return "|".join(str(job.get(field) or "").strip().lower()
                    for field in ("ats", "board_token", "external_id"))


def main() -> None:
    companies = load_json(COMPANIES_FILE, [])
    existing_data = load_json(JOBS_FILE, {"last_updated": None, "total": 0, "jobs": []})
    if not isinstance(companies, list):
        raise ValueError("companies.json must contain a JSON array")
    old_jobs = existing_data.get("jobs", []) if isinstance(existing_data, dict) else []
    configured_boards = {
        (str(company.get("ats", "")).lower(), str(company.get("token", "")).strip())
        for company in companies
        if isinstance(company, dict) and company.get("ats") and company.get("token")
    }
    # Drop stale listings from boards that were removed from the configured source list.
    old_by_key = {
        job_key(job): job for job in old_jobs
        if isinstance(job, dict)
        and job_key(job)
        and (str(job.get("ats", "")).lower(), str(job.get("board_token", "")).strip()) in configured_boards
    }
    seen_at = iso_now()
    checked = errors = discovered = 0
    failed_companies: list[str] = []
    cutoff_recent = now_utc() - timedelta(days=RECENT_DAYS)

    for company in companies[:BATCH_SIZE]:
        if not isinstance(company, dict):
            continue
        ats = str(company.get("ats", "")).lower()
        token = str(company.get("token", "")).strip()
        name = str(company.get("name") or token).strip()
        scraper = SCRAPERS.get(ats)
        if not scraper or not token:
            continue
        checked += 1
        print(f"[{checked}] {name} ({ats}:{token})")
        try:
            postings = scraper(token)
        except Exception as exc:
            print(f"Unexpected parser error for {name}: {exc}")
            postings = None
        if postings is None:
            errors += 1
            failed_companies.append(name)
            # Keep the last known listings for a temporarily unavailable board,
            # but report the failed source so the page can warn visitors.
            continue

        # A successful response is the source of truth for this board. Remove
        # its previous snapshot before inserting the currently published roles,
        # so closed/deleted jobs do not linger in the feed for the retention window.
        board_key = (ats, token)
        previous_board_jobs = {
            job_key(job): job for job in old_by_key.values()
            if (str(job.get("ats", "")).lower(), str(job.get("board_token", "")).strip()) == board_key
        }
        old_by_key = {
            key: job for key, job in old_by_key.items()
            if (str(job.get("ats", "")).lower(), str(job.get("board_token", "")).strip()) != board_key
        }

        for posting in postings:
            if not valid_job(posting):
                continue
            careers_url = str(company.get("careers_url") or "").strip()
            if not careers_url.startswith("https://"):
                careers_url = None
            job = {
                **posting,
                "company": name,
                "ats": ats,
                "board_token": token,
                "company_careers_url": careers_url,
            }
            key = job_key(job)
            previous = previous_board_jobs.get(key)
            posted_dt = parse_date(job.get("posted_date"))
            if previous:
                job["first_seen_at"] = previous.get("first_seen_at") or seen_at
            else:
                job["first_seen_at"] = seen_at
                discovered += 1
            job["date_status"] = "source_date" if posted_dt else "unknown"
            job["is_recent"] = bool(posted_dt and posted_dt >= cutoff_recent)
            old_by_key[key] = job
        time.sleep(0.25)

    retention_cutoff = now_utc() - timedelta(days=RETENTION_DAYS)
    retained = []
    for job in old_by_key.values():
        posted_dt = parse_date(job.get("posted_date"))
        first_seen = parse_date(job.get("first_seen_at"))
        reference = posted_dt or first_seen
        if reference and reference >= retention_cutoff:
            retained.append(job)
    retained.sort(key=lambda item: parse_date(item.get("posted_date")) or parse_date(item.get("first_seen_at")) or datetime.min.replace(tzinfo=timezone.utc), reverse=True)

    save_json(JOBS_FILE, {
        "last_updated": seen_at,
        "total": len(retained),
        "companies_checked": checked,
        "companies_configured": len(companies),
        "companies_failed": errors,
        "failed_companies": failed_companies,
        "jobs": retained,
        "notice": "A source posting date may be missing or reflect an update date. Unknown dates are not verified as recent. Listings are refreshed from configured public employer boards once daily; apply links are the source of truth."
    })
    save_json(LOG_FILE, {
        "last_run": seen_at,
        "companies_configured": len(companies),
        "companies_checked": checked,
        "newly_discovered": discovered,
        "request_or_parse_errors": errors,
        "failed_companies": failed_companies,
        "jobs_retained": len(retained),
        "jobs_with_description": sum(bool(job.get("description")) for job in retained),
    })
    print(f"Checked {checked} boards; {discovered} newly discovered listings; {errors} board errors.")


if __name__ == "__main__":
    main()
