# CodeAtlas — Free Programming & IT Career Learning Hub

CodeAtlas is a free, browser-based learning hub with an interactive programming map, 52-week foundation course, 22 IT specialisation paths, local learning dashboard, resume-to-job matcher, Career Studio practice tools, and a searchable company job-board directory.

## Run locally on Windows

From PowerShell:

```powershell
cd CodeAtlas_Website
python -m http.server 8000
```

Open http://localhost:8000 and keep the terminal running. Use a local server rather than opening HTML with `file://`, because the curriculum is loaded as JSON.

## What is included

- **Programming map:** Python, JavaScript, TypeScript, Java, SQL, Go, Rust and C#; 96 topic groups.
- **Additional languages:** C, C++, PHP, Kotlin, Swift and Bash with staged topics and official references.
- **52-week curriculum:** foundations, programming, algorithms, web, APIs, databases, tests, Linux, containers, deployment, data/ML/security foundations and job readiness.
- **22 IT specialisations:** paths include frontend, backend, full-stack, mobile, data, AI/ML, GenAI, RAG, DevOps, .NET/C#, MLOps, SRE, QA automation, cybersecurity, Salesforce and blockchain. Each has staged modules and a capstone.
- **Career Launchpad:** existing role roadmaps, resource links, job-application tracker and planning tools.
- **Career Studio:** directional career-fit quiz, local knowledge checks with explanations, role-specific interview question practice, on-device interview notes, editable cover-letter draft generator, official labour-market research links and a 30-day action plan.
- **Resume vs job match:** local weighted heuristic alignment score, matched terms, potential gaps and exportable suggestions. It is not an employer ATS and does not predict hiring.
- **Job Board Directory:** searchable and filterable starter directory of company career pages and job-search platforms, with direct links to original sources.
- **Dashboard:** course progress, weekly target, check-ins/streak, focus timer, task list, journal and JSON backup/restore.
- **PWA/offline shell:** manifest and best-effort cache of core pages after a successful visit. External links still require internet.
- **Privacy-first defaults:** progress, quiz results, interview notes and planner state use this browser's local storage. There are no accounts or cloud sync in this static build.

## Useful pages

- Main learning map: http://localhost:8000/
- Dashboard: http://localhost:8000/dashboard.html
- Career Studio: http://localhost:8000/career-studio.html
- Career Launchpad: http://localhost:8000/career.html
- Job Board Directory: http://localhost:8000/job-boards.html
- Resume match: http://localhost:8000/resume-review.html
- IT specialisations: http://localhost:8000/specializations.html
- One-year course: http://localhost:8000/year-course.html
- Additional languages: http://localhost:8000/language-library.html

## Job aggregation roadmap and limitations

The directory is a static starter feature: it does **not** currently fetch live vacancies, crawl thousands of companies, or send alerts. Browsers cannot reliably query every third-party ATS endpoint because of cross-origin restrictions. To implement automated recent-job aggregation, add a scheduled backend/workflow, a verified employer/ATS identifier list, deduplication and expiry logic, and a database or generated data feed. Keep all credentials in server-side environment variables or GitHub Actions secrets—never in browser JavaScript. Begin with a small, tested list and respect each provider's API terms and rate limits. A first-seen timestamp is useful for detecting newly discovered postings when the source does not provide a trustworthy posting date.

## Validation

```powershell
node --check career-studio.js
node --check job-boards.js
npm test
python -m json.tool data/curriculum.json
python -m json.tool data/year-curriculum.json
```

The automated static test checks JSON, page viewport metadata, local references and the service-worker cache list. The GitHub Actions workflow also checks JavaScript syntax. These checks do not replace manual browser testing: test desktop/mobile layouts, keyboard-only navigation, local storage, downloads, offline behavior and browser-console errors before release.

## Security, accuracy and limitations

- Career quiz recommendations are directional reflections, not validated psychometric assessments.
- Knowledge-check scores are practice feedback, not professional certification.
- Resume alignment is a local keyword/heuristic score, not a recruiter-calibrated ATS prediction.
- Career Studio's interview questions are a practice bank; no live AI feedback or speech evaluation is performed.
- Cover letters are template-based drafts; review each statement and do not invent experience.
- Labour-market section links to primary sources and intentionally avoids invented live salary/trend figures. Check the geography and publication date of any data.
- Browser-local data does not sync across devices and may be cleared by browser settings. Avoid entering sensitive personal data in notes.
- No cloud authentication, hosted database, server-side AI inference or secure code execution sandbox is included.
- Never expose API keys in browser JavaScript. Any future AI integration should use a server-side API, secret environment variables, rate limits, input/output limits, privacy controls, abuse monitoring and provider-term review.

## SEO and hosting

The main page and Career Studio include descriptions and Open Graph metadata. A final `sitemap.xml`, canonical URLs, and production robots directives should be generated only after the actual public deployment URL and hosting base path are chosen. Do not publish a sitemap with a guessed domain. See `DESIGN.md` and `SEO_DEPLOYMENT.md`.

## Main files

- `index.html`, `app.js`, `styles.css`: learning map.
- `dashboard.html`, `dashboard.js`, `dashboard.css`: learning dashboard.
- `career-studio.html`, `career-studio.js`, `career-studio.css`: Career Studio practice tools.
- `career.html`, `career.js`, `career.css`: Career Launchpad.
- `job-boards.html`, `job-boards.js`, `job-boards.css`: job source directory.
- `resume-review.html`, `resume-review.js`, `resume-review.css`: resume matcher.
- `year-course.html`, `year-course.js`, `data/year-curriculum.json`: 52-week course.
- `language-library.html`, `language-library.js`: additional languages.
- `specializations.html`, `specializations.js`: specialisation paths.
- `manifest.webmanifest`, `service-worker.js`, `pwa.js`: PWA shell.
- `tests/static-check.mjs`, `.github/workflows/static-check.yml`: static validation and CI.
