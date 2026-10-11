# CodeAtlas — Free Programming & IT Career Learning Hub

CodeAtlas is a static, beginner-friendly learning website with three connected areas: an interactive programming language map, a 52-week foundation course, and role-based IT specialisations.

## Run locally on Windows

From PowerShell:

```powershell
cd CodeAtlas_Website
python -m http.server 8000
```

Then open http://localhost:8000. Keep the terminal open. Do not open the HTML files directly using `file://`, because the pages fetch JSON curriculum data.

## Learning areas

- **Programming map:** 14 language paths with 12 topic groups each (168 topic lessons total): Python, JavaScript, TypeScript, Java, SQL, Go, Rust, C#, C, C++, PHP, Kotlin, Swift and Bash. Each lesson includes an explanation, analogy, examples, advanced patterns, practice questions and interview prompts.
- **52-week foundation course:** computer and web basics, Python, algorithms, Git, frontend, databases, backend APIs, testing, Linux, containers, deployment, data and ML fundamentals, security, architecture, a capstone and job readiness.
- **IT specialisations:** 12 role-based paths—frontend, backend, full-stack, mobile, data analyst, data engineer, AI/ML engineer, cybersecurity analyst, cloud/DevOps, QA automation, UI/UX and IT support/networking. Each has six modules, practice tasks, advanced extensions, a capstone and reference links.
- **Career Launchpad:** role roadmaps, starter study plan, interview preparation, resume checklist and job-application tracker.
- **Progress:** stored in browser local storage on the current device. There are no user accounts or cloud sync.

## Pages

- Learning map: http://localhost:8000/
- One-year foundation course: http://localhost:8000/year-course.html
- Career Launchpad: http://localhost:8000/career.html
- IT specialisations: http://localhost:8000/specializations.html

## Important limits

The content is a structured learning guide, not a guarantee of expert mastery or employment. It is designed to combine with hands-on coding and official documentation. The new language paths include worked examples and practice prompts; **run every example in the language's toolchain and verify it before relying on it**. Some advanced patterns are illustrative rather than production-ready.

The specialisation modules provide learning objectives, practice challenges, and project acceptance criteria. They are not substitutes for a complete professional textbook or supervised lab. Repeat modules until you can build and explain the work independently.

This remains a static website: it does not include cloud accounts, secure server-side code execution, a live AI provider backend, or cross-device sync. Never expose secret API keys in browser JavaScript or commit them to a public repository. If adding AI later, use a server-side API with environment variables, rate limits, privacy controls and provider-term review.

## Main files

- `index.html`, `app.js`, `styles.css`: programming map and lessons.
- `data/curriculum.json`: language lessons.
- `year-course.html`, `year-course.js`, `data/year-curriculum.json`: 52-week course.
- `specializations.html`, `specializations.js`, `specializations.css`: role-based specialist tracks.
- `career.html`, `career.js`, `career.css`: career planning workspace.

## Validation checklist

1. Run `python -m json.tool data/curriculum.json` and `python -m json.tool data/year-curriculum.json` from this folder.
2. Open each page using the local server and check desktop and mobile layouts.
3. Open each new language, read each example, run it in its correct runtime, and review output.
4. Complete and undo a lesson/week/module and reload to check browser-local progress.
5. Check navigation, search, copy buttons, resource links, and browser console errors.
6. Review all examples and links before publishing.
