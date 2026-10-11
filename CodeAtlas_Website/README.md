# CodeAtlas — Free Programming & IT Career Learning Hub

CodeAtlas is a free, static programming and IT career learning hub with interactive lessons, a 52-week foundation course, 22 specialisation paths, a local resume-to-job matcher, a personal learning dashboard and an installable offline shell.

## Run locally on Windows

From PowerShell:

```powershell
cd CodeAtlas_Website
python -m http.server 8000
``

Then open http://localhost:8000. Keep the terminal open. Do not open the HTML files directly using `file://`, because the pages fetch JSON curriculum data.

## Learning areas

- **Core programming map:** Python, JavaScript, TypeScript, Java, SQL, Go, Rust and C# with 12 topic groups per language (96 topic lessons).
- **Additional language library:** C, C++, PHP, Kotlin, Swift and Bash, each with 12 staged topics, code examples, practice prompts and an official reference.
- **52-week foundation course:** computer and web basics, Python, algorithms, Git, frontend, databases, backend APIs, testing, Linux, containers, deployment, data and ML fundamentals, security, architecture, a capstone and job readiness.
- **IT specialisations:** 22 role-based paths, including frontend, backend, full-stack, mobile, data analyst, data engineer, AI/ML, GenAI, RAG, DevOps, .NET/C#, MLOps, SRE, QA automation/SDET, data science, cybersecurity, Salesforce and blockchain. Each path has six staged modules and a capstone.
- **Resume vs job match:** a local-only resume and job-description comparison with a weighted heuristic score, matched terms, potential gaps and an exportable improvement report.
- **Personal dashboard:** combines learning-map and course progress with weekly study goals, check-ins, a focus timer, task list, journal and JSON backup/restore.
- **Installable/offline shell:** manifest and service worker cache core pages and assets after a successful first visit. Offline availability depends on what has been cached; external resources still require internet.
- **Career Launchpad:** role roadmaps, starter study plan, interview preparation, resume checklist and job-application tracker.
- **Progress:** stored in browser local storage on the current device. There are no user accounts or cloud sync.

## Pages

- Personal dashboard: http://localhost:8000/dashboard.html
- Learning map: http://localhost:8000/
- Resume match: http://localhost:8000/resume-review.html
- One-year foundation course: http://localhost:8000/year-course.html
- Additional programming languages: http://localhost:8000/language-library.html
- Career Launchpad: http://localhost:8000/career.html
- IT specialisations: http://localhost:8000/specializations.html

## Important limits

The content is a structured learning guide, not a guarantee of expert mastery or employment. It should be combined with hands-on coding and official documentation. The additional language page provides staged concepts and examples; run every example in its language's actual toolchain and verify it before relying on it. Some advanced patterns are illustrative rather than production-ready.

Specialisation modules provide learning objectives, practice challenges and project acceptance criteria. They are guided starting points, not substitutes for a complete professional textbook or supervised lab. Repeat modules until you can build and explain the work independently.

This remains a static website: it does not include cloud accounts, secure server-side code execution, a live AI provider backend, or cross-device sync. Never expose secret API keys in browser JavaScript or commit them to a public repository. If adding AI later, use a server-side API with environment variables, rate limits, privacy controls and provider-term review.

## Main files

- `index.html`, `app.js`, `styles.css`: core programming map.
- `dashboard.html`, `dashboard.js`, `dashboard.css`: personal learning dashboard.
- `resume-review.html`, `resume-review.js`, `resume-review.css`: local resume matcher.
- `manifest.webmanifest`, `service-worker.js`, `pwa.js`, `pwa.css`: install prompt and offline shell.
- `data/curriculum.json`: core language lessons.
- `language-library.html`, `language-library.js`, `language-library.css`: six additional languages.
- `year-course.html`, `year-course.js`, `data/year-curriculum.json`: 52-week course.
- `specializations.html`, `specializations.js`, `specializations.css`: role-based specialist tracks.
- `career.html`, `career.js`, `career.css`: career planning workspace.

## Validation checklist

0. Open `dashboard.html`, test study tasks, check-ins, timer, journal, backup and restore. Test install/offline behaviour in a browser; offline caching is best-effort.

1. Run `python -m json.tool data/curriculum.json` and `python -m json.tool data/year-curriculum.json` from this folder.
2. Open every page through the local server and check desktop and mobile layouts.
3. Run each new language example in its correct runtime and review output.
4. Complete and undo a lesson/week/module and reload to check local progress.
5. Check navigation, search, copy buttons, resource links and browser console errors.
6. Review examples and links before publishing.
