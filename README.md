# CodeAtlas — Free Programming & Career Learning Hub

CodeAtlas is a beginner-friendly programming learning website. It now includes a structured 52-week learning path alongside the original interactive concept map and Career Launchpad.

## Run locally (Windows)

Open PowerShell and run:

```powershell
cd CodeAtlas_Website
python -m http.server 8000
``

Then open http://localhost:8000. Keep the terminal open while using the site. Do not open `index.html` directly as a `file://` URL because the curriculum is loaded as JSON.

## Main learning areas

- **Programming learning map:** interactive lessons and examples for Python, JavaScript, TypeScript, Java, SQL, Go, Rust and C#.
- **52-week course:** a staged beginner-to-advanced foundation curriculum with weekly goals, plain-language explanations, worked examples, practice challenges, hints, solution examples, review questions, mini-projects and free references.
- **Career Launchpad:** eight IT career roadmaps, free learning resources, a 30-day starter plan, interview practice, resume-readiness checklist and job application tracker.
- **IT specialisations:** 22 role paths, including Generative AI, RAG, DevOps, .NET/C#, MLOps, SRE/platform engineering, QA automation, data science, Salesforce and blockchain.
- **Resume vs job match:** a local-only resume/JD comparison with weighted 0–100 alignment score, matched terms, potential gaps and an exportable improvement checklist. It does not predict hiring or reproduce an employer ATS.
- **Progress:** course completion and planner state save in local browser storage; they do not sync across devices.

## View the course

With the local server running, open:

- Main learning map: http://localhost:8000/
- Resume vs job match: http://localhost:8000/resume-review.html
- IT specialisations: http://localhost:8000/specializations.html
- One-year course: http://localhost:8000/year-course.html
- Career Launchpad: http://localhost:8000/career.html

## Free hosting

You can publish a static version with GitHub Pages or another static host. Configure the host to serve the contents of `CodeAtlas_Website` as the site root, then test the published URL on desktop and mobile.

## Privacy and limitations

- The 52-week plan is a structured foundation, not a guarantee of expert mastery or employment. Learners should repeat weeks when they need more practice.
- The curriculum includes worked examples and solution approaches. Solutions are illustrative; learners should run, test and adapt code before relying on it.
- Career timelines are estimates. Choose one primary specialisation after building the common foundation.
- Progress and job tracker records stay in the current browser's local storage. They do not sync across devices and may be cleared by browser settings.
- The project does not currently provide cloud accounts, a secure code execution sandbox, or live AI inference.
- Never put secret API keys in browser JavaScript or commit them to a public repository. If AI features are added, route requests through a server-side service with environment variables, rate limits, privacy controls and provider terms review.
- Free third-party resources can change. Follow each provider's terms and verify technical details against official documentation.

## Main files

- `CodeAtlas_Website/index.html`, `app.js`, `styles.css`: original programming learning map.
- `CodeAtlas_Website/data/curriculum.json`: existing topic content.
- `CodeAtlas_Website/year-course.html`, `year-course.css`, `year-course.js`: interactive 52-week course interface.
- `CodeAtlas_Website/data/year-curriculum.json`: structured weekly curriculum.
- `CodeAtlas_Website/career.html`, `career.css`, `career.js`: career roadmaps and planning tools.
- `CodeAtlas_Website/tests/career-smoke-check.md`: manual testing checklist.
- `CodeAtlas_Website/resume-review.html`, `resume-review.js`, `resume-review.css`: local resume-to-job matching tool.

## Testing

Run `python -m json.tool data/year-curriculum.json` and `python -m json.tool data/curriculum.json` from the `CodeAtlas_Website` folder to validate curriculum JSON. Use the manual smoke-test checklist and test the site in a browser at desktop and mobile widths. Content changes should be reviewed and code examples run in their appropriate language/runtime before production use.
