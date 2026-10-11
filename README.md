# CodeAtlas — Free Programming & IT Career Learning Hub

CodeAtlas combines a programming learning map, a 52-week course, 22 IT specialisation paths, a learning dashboard, a resume/job-description matcher, and Career Studio practice tools.

## Run locally

In PowerShell:

```powershell
cd CodeAtlas_Website
python -m http.server 8000
```

Open http://localhost:8000. Keep the terminal open. Do not use a `file://` URL because curriculum JSON is fetched by the browser.

## Core features

- 14 language paths across the core map and additional language library.
- 52-week beginner-to-job-readiness foundation course.
- 22 staged IT specialisation paths, including GenAI, RAG, DevOps, .NET/C#, MLOps, SRE, data, QA automation and cybersecurity.
- Local resume-to-job-description alignment with heuristic score and improvement checklist.
- Dashboard with learning progress, study goals, streaks, focus timer, tasks, journal and JSON backup.
- Career Studio with a directional career-fit quiz, knowledge checks, role-specific interview practice, locally saved answer notes, editable cover-letter draft builder, primary-source industry research links and a 30-day plan.
- Installable PWA shell with best-effort offline caching.
- Static checks and GitHub Actions JavaScript syntax validation.

## Main pages

- Learning map: http://localhost:8000/
- Dashboard: http://localhost:8000/dashboard.html
- Career Studio: http://localhost:8000/career-studio.html
- Career Launchpad: http://localhost:8000/career.html
- Resume match: http://localhost:8000/resume-review.html
- Specialisations: http://localhost:8000/specializations.html
- 52-week course: http://localhost:8000/year-course.html
- More languages: http://localhost:8000/language-library.html

## Run checks

```powershell
node --check CodeAtlas_Website/career-studio.js
cd CodeAtlas_Website
npm test
python -m json.tool data/curriculum.json
python -m json.tool data/year-curriculum.json
```

## Important limits

This is still a static, local-first website. Progress and Career Studio notes stay in the current browser and do not sync across devices. The career quiz is directional, practice quiz scores are not certification, resume matching is heuristic and not an employer ATS, interview practice is a question bank (not live AI), and generated letters require review. Industry insights link to primary sources instead of inventing real-time salaries or demand numbers.

No cloud accounts, hosted database, live AI inference, server-side code execution, or public deployment are included. Never expose API secrets in browser code. A production AI service needs a server-side integration, secret management, rate limiting, privacy controls and abuse monitoring.

Before launch, complete browser end-to-end tests, keyboard/screen-reader checks, accessibility review, Lighthouse measurement, and configure canonical URLs, sitemap and robots rules using the real deployed domain. See `CodeAtlas_Website/DESIGN.md` and `CodeAtlas_Website/SEO_DEPLOYMENT.md`.
