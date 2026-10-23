import json
import tempfile
import unittest
from datetime import datetime, timezone
from pathlib import Path
from unittest.mock import patch
import importlib.util

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location("scrape_jobs", ROOT / "scripts" / "scrape_jobs.py")
scraper = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(scraper)


class ScraperRefreshTests(unittest.TestCase):
    def test_successful_board_drops_closed_roles_and_failed_board_keeps_last_snapshot(self):
        with tempfile.TemporaryDirectory() as directory:
            base = Path(directory)
            companies_file = base / "companies.json"
            jobs_file = base / "jobs.json"
            log_file = base / "scrape-log.json"
            companies = [
                {"name": "Good Board", "ats": "greenhouse", "token": "good", "careers_url": "https://good.example/careers"},
                {"name": "Offline Board", "ats": "ashby", "token": "offline", "careers_url": "https://offline.example/careers"},
            ]
            stamp = "2026-10-23T04:30:00+00:00"
            def old_job(company, ats, token, external_id, title, first_seen):
                return {
                    "company": company, "ats": ats, "board_token": token,
                    "external_id": external_id, "title": title,
                    "apply_url": "https://jobs.example/" + external_id,
                    "posted_date": stamp, "first_seen_at": first_seen,
                }
            jobs_file.write_text(json.dumps({
                "jobs": [
                    old_job("Good Board", "greenhouse", "good", "closed", "Closed role", stamp),
                    old_job("Good Board", "greenhouse", "good", "active", "Active role", "2026-10-20T00:00:00+00:00"),
                    old_job("Offline Board", "ashby", "offline", "old-offline", "Last known role", stamp),
                ]
            }), encoding="utf-8")
            companies_file.write_text(json.dumps(companies), encoding="utf-8")
            current = [{
                "external_id": "active",
                "title": "Active role",
                "location": "Remote",
                "apply_url": "https://jobs.example/active",
                "posted_date": stamp,
                "description": "Current description",
            }]
            def successful_board(_token):
                return current
            def failed_board(_token):
                return None
            with patch.multiple(
                scraper,
                COMPANIES_FILE=companies_file,
                JOBS_FILE=jobs_file,
                LOG_FILE=log_file,
                SCRAPERS={"greenhouse": successful_board, "ashby": failed_board},
                iso_now=lambda: stamp,
                now_utc=lambda: datetime(2026, 10, 23, 4, 30, tzinfo=timezone.utc),
            ), patch.object(scraper.time, "sleep", return_value=None):
                scraper.main()
            feed = json.loads(jobs_file.read_text(encoding="utf-8"))
            by_id = {job["external_id"]: job for job in feed["jobs"]}
            self.assertNotIn("closed", by_id)
            self.assertIn("active", by_id)
            self.assertEqual(by_id["active"]["first_seen_at"], "2026-10-20T00:00:00+00:00")
            self.assertEqual(by_id["active"]["company_careers_url"], "https://good.example/careers")
            self.assertIn("old-offline", by_id)
            self.assertEqual(feed["companies_failed"], 1)
            self.assertEqual(feed["failed_companies"], ["Offline Board"])

    def test_company_sources_have_career_pages_and_unique_board_keys(self):
        companies = json.loads((ROOT / "CodeAtlas_Website" / "data" / "companies.json").read_text(encoding="utf-8"))
        self.assertGreaterEqual(len(companies), 30)
        self.assertTrue(all(str(item.get("careers_url", "")).startswith("https://") for item in companies))
        keys = [(item.get("ats"), item.get("token")) for item in companies]
        self.assertEqual(len(keys), len(set(keys)), "Duplicate ATS board configured")


if __name__ == "__main__":
    unittest.main()
