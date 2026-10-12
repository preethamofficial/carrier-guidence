# CodeAtlas — Free Programming & IT Career Learning Hub

CodeAtlas is a free, browser-based learning hub with an interactive programming map with 14 languages, 52-week foundation course, 22 IT specialisation paths, local learning dashboard, resume-to-job matcher, Career Studio practice tools, and a searchable company job-board directory.

## Run locally on Windows

From PowerShell:

```powershell
cd CodeAtlas_Website
python -m http.server 8000
```

Open http://localhost:8000 and keep the terminal running. Use a local server rather than opening HTML with `file://`, because the curriculum is loaded as JSON.

## What is included

- **Programming map:** Python, JavaScript, TypeScript, Java, SQL, Go, Rust and C#; 96 topic groups.
- **Additional languages:** C, C++, PHP, Kotlin, Swift and Bash; each has 12 staged topics, topic-specific learning objectives, distinct everyday analogies, starter and alternative snippets, syntax-aware line-tracing prompts, topic-specific pitfalls, practice challenges and local progress tracking. Snippets that depend on project setup or surrounding declarations are labeled as illustrative; always run them in the appropriate toolchain.
- **52-week curriculum:** foundations, programming, algorithms, web, APIs, databases, tests, Linux, containers, deployment, data/ML/security foundations and job readiness.
- **22 IT specialisations:** paths include frontend, backend, full-stack, mobile, data, AI/ML, GenAI, RAG, DevOps, .NET/C#, MLOps, SRE, QA automation, cybersecurity, Salesforce and blockchain. Each has staged modules and a capstone.
- **Career Launchpad:** existing role roadmaps, resource links, job-application tracker and planning tools.
- **Career Studio:** directional career-fit quiz, local knowledge checks with explanations, role-specific interview question practice, on-device interview notes, editable cover-letter draft generator, official labour-market research links and a 30-day action plan.
- **Resume vs job match:** local weighted heuristic alignment score, matched terms, potential gaps and exportable suggestions. It is not an employer ATS and does not predict hiring.\n- **Job Board Directory:** searchable company career pages and job-search resources with original links.\n- **Recent Jobs feed:** source-labeled listings with search, location/source filters, and a recent-date filter. It starts empty until a successful scheduled scrape runs; posting date and freshness are not guaranteed.
- **Dashboard:** course progress, weekly target, check-ins/streak, focus timer, task list, journal and JSON backup/restore.
- **PWA/offline shell:** manifest and best-effort cache of core pages after a successful visit. External links still require internet.
- **Privacy-first defaults:** progress, quiz results, interview notes and planner state use this browser's local storage. There are no accounts or cloud sync in this static build.

## Useful pages

- Main learning map: http://localhost:8000/
- Dashboard: http://localhost:8000/dashboard.html
- Career Studio: http://localhost:8000/career-studio.html
- Career Launchpad: http://localhost:8000/career.html
- Resume match: http://localhost:8000/resume-review.html
- IT specialisations: http://localhost:8000/specializations.html
- One-year course: http://localhost:8000/year-course.html
- Deep language lessons: http://localhost:8000/language-library.html\n- Job Board Directory: http://localhost:8000/job-boards.html\n- Recent Jobs feed: http://localhost:8000/jobs.html

## Validation

```powershell
node --check career-studio.js
npm test
python -m json.tool data/curriculum.json
python -m json.tool data/year-curriculum.json
```

The automated static test checks JSON, page viewport metadata, local references, the service-worker cache list, the core and additional language lesson catalogs, and the new jobs and company-directory pages. The GitHub Actions workflow also checks JavaScript syntax. These checks do not replace manual browser testing: test desktop/mobile layouts, keyboard-only navigation, local storage, downloads, offline behavior and browser-console errors before release.

## Job data collection and automation\n\nThe feed uses configured public Greenhouse, Lever, and Ashby board identifiers. Scheduled collection proposes data-only updates through a pull request for human review rather than pushing directly to `main`. Missing posting dates are marked unknown; first-seen time is not the same as employer posting date. Verify each listing on the employer's official careers page.\n\n## Security, accuracy and limitations

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
- `resume-review.html`, `resume-review.js`, `resume-review.css`: resume matcher.
- `year-course.html`, `year-course.js`, `data/year-curriculum.json`: 52-week course.
- `language-library.html`, `language-library.js`: additional languages.
- `specializations.html`, `specializations.js`: specialisation paths.
- `manifest.webmanifest`, `service-worker.js`, `pwa.js`: PWA shell.
- `tests/static-check.mjs`, `.github/workflows/static-check.yml`: static validation and CI.
