# CodeAtlas — Free Career Guidance & Learning Platform

**Live website:** https://codeatlas-career-guidance.onrender.com/  
**Repository:** https://github.com/preethamofficial/carrier-guidence

CodeAtlas is a static, local-first learning and career workspace. It combines programming lessons, role roadmaps, a one-year course, graduate onboarding, a career-fit assessment, a unified My Path journey, resume tools, interview practice and a searchable job directory.

## Start locally

In PowerShell:

```powershell
cd CodeAtlas_Website
python -m http.server 8000
```

Open http://localhost:8000. Keep the terminal running. Do not use a `file://` URL because the browser loads JSON curriculum files with `fetch()`.

## Main features

- 14 core language paths and additional programming/technology roadmaps.
- A 52-week foundation course, 41 role roadmaps, specialisations and a learning dashboard.
- **30-question career assessment** with weighted, explainable matches across 12 technical and non-technical roles, plus career comparison.
- **Graduate onboarding** for degree stream, graduation year, coding experience, goal, study time and timeline.
- **My Path** step tracker from career choice through learning, projects, resume, interviews and applications.
- **Resume builder** with three print-friendly layouts, local saving, live preview and browser Print → Save as PDF.
- Resume-to-job-description comparison, Career Studio, interview practice, cover-letter drafts and local study notes.
- PWA shell with best-effort offline caching and a static validation suite.

## Main pages

- [Learning map](https://codeatlas-career-guidance.onrender.com/)
- [My Path](https://codeatlas-career-guidance.onrender.com/my-path.html)
- [Graduate onboarding](https://codeatlas-career-guidance.onrender.com/onboarding.html)
- [Career assessment](https://codeatlas-career-guidance.onrender.com/assessment.html)
- [Career Studio](https://codeatlas-career-guidance.onrender.com/career-studio.html)
- [Resume builder](https://codeatlas-career-guidance.onrender.com/resume-builder.html)
- [Resume-to-job match](https://codeatlas-career-guidance.onrender.com/resume-review.html)
- [Role roadmaps](https://codeatlas-career-guidance.onrender.com/role-roadmaps.html)
- [52-week course](https://codeatlas-career-guidance.onrender.com/year-course.html)
- [Additional language lessons](https://codeatlas-career-guidance.onrender.com/language-library.html)
- [Recent jobs](https://codeatlas-career-guidance.onrender.com/jobs.html)

## Run checks

```powershell
cd CodeAtlas_Website
npm test
node --check assessment.js
node --check assessment-engine.js
node --check my-path.js
node --check onboarding.js
node --check resume-builder.js
python -m json.tool data/assessment.json
python -m json.tool data/curriculum.json
python -m json.tool data/year-curriculum.json
```

## Privacy and honest limitations

This is a **static, local-first website**. Profiles, assessment results, progress, resume content and notes are stored in the current browser. They do not automatically sync across devices. Clearing browser data can erase local information; export or save important work separately.

Career-fit percentages are explainable relative scores for selected answers, not validated psychometrics or a probability of employment. Role preparation timelines are broad planning estimates, not guarantees. Resume matching is heuristic, not a real employer ATS. The resume builder asks the browser to print; choose Save as PDF in the print dialog. All resume claims must be reviewed for accuracy.

Optional cloud authentication, cross-device sync, live AI counselling, server-side code execution, a legal live job feed, and a mentor/community backend still require external configuration and further implementation. No private API key belongs in browser code. Any AI service must keep secrets server-side and enforce rate limits, input limits, CORS, privacy safeguards and clear AI disclosure.

The public Render URL is configured in `render.yaml`; this documentation does not itself confirm the live deployment health. After changes, test on desktop and mobile, run the test suite, inspect browser console/network errors, verify the Render deployment, and check accessibility and Lighthouse performance.
