# CodeAtlas — Free Programming & Career Learning Hub

CodeAtlas is a beginner-friendly programming learning website with an added Career Launchpad. Learn programming concepts, follow career roadmaps, build portfolio projects, practise interviews, prepare a resume checklist, and track job applications.

## Run locally (Windows)

Open PowerShell and run:

```powershell
cd CodeAtlas_Website
python -m http.server 8000
``

Then open http://localhost:8000. Keep the terminal open while using the site. Do not open `index.html` directly as a `file://` URL because the curriculum is loaded as JSON.

If you have Node.js, you can also run `npx serve .` from the `CodeAtlas_Website` folder.

## Features

- Interactive concept maps and lessons for Python, JavaScript, TypeScript, Java, SQL, Go, Rust and C#.
- Code examples, guided explanations, practice/interview questions, bookmarks, notes and progress tracking.
- Career Launchpad with eight IT career roadmaps and free learning resources.
- 30-day study plan, resume-readiness checklist, interview practice and a job application tracker.
- Responsive layout, dark mode and browser-local progress storage.

## Free hosting

You can publish a static version with GitHub Pages or another static host. Configure the host to serve the contents of `CodeAtlas_Website` as the site root, then test the published URL on desktop and mobile.

## Privacy and limitations

- This is a learning website, not a placement agency. Learning timelines are estimates and no job outcome is guaranteed.
- Progress and job tracker records stay in the current browser's local storage. They do not sync across devices and may be cleared by browser settings.
- The project does not currently provide cloud accounts, a secure code execution sandbox, or live AI inference.
- Never put secret API keys in browser JavaScript or commit them to a public repository. If AI features are added, route calls through a server-side service with environment variables, rate limits, privacy controls and provider terms review.
- Free third-party learning resources can change. Follow each provider's terms and confirm details using official documentation.
- Code examples should be run and checked in the appropriate language/runtime before production use.

## Main files

- `CodeAtlas_Website/index.html`, `app.js`, `styles.css`: existing programming learning map.
- `CodeAtlas_Website/data/curriculum.json`: lesson content.
- `CodeAtlas_Website/career.html`, `career.css`, `career.js`: career roadmap and planning tools.
- `CodeAtlas_Website/tests/career-smoke-check.md`: manual testing checklist.

## Testing

Run `python -m json.tool data/curriculum.json` from the `CodeAtlas_Website` folder to validate the curriculum JSON. Use the smoke-test checklist to verify the career features manually. A checklist is not a substitute for automated tests or a completed runtime test pass.
