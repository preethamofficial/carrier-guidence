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
- Optional **Supabase account/cloud-sync scaffold** with RLS SQL, progress/notes merge, local JSON export and an account-deletion Edge Function; it stays disabled until configured.
- Resume-to-job-description comparison, Career Studio, interview practice, cover-letter drafts and local study notes.
- PWA shell with best-effort offline caching and a static validation suite.

## Main pages

- [Learning map](https://codeatlas-career-guidance.onrender.com/)
- [My Path](https://codeatlas-career-guidance.onrender.com/my-path.html)
- [Graduate onboarding](https://codeatlas-career-guidance.onrender.com/onboarding.html)
- [Career assessment](https://codeatlas-career-guidance.onrender.com/assessment.html)
- [Career Studio](https://codeatlas-career-guidance.onrender.com/career-studio.html)
- [Resume builder](https://codeatlas-career-guidance.onrender.com/resume-builder.html)
- [Account & cloud sync](https://codeatlas-career-guidance.onrender.com/auth.html) (disabled until Supabase is configured)
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


## Automated job feed

- The configured collector checks 39 employer boards and lists 49 company career pages through public Greenhouse, Lever and Ashby job-posting endpoints, plus links to each employer's official careers page.
- GitHub Actions is scheduled daily at **10:00 AM India Standard Time (04:30 UTC)**. Scheduled workflows can be delayed by GitHub; the page displays the actual last refresh timestamp in IST.
- New listings are published to the static feed after validation and the resulting commit triggers the configured static-site deployment. The feed is not real-time; changes normally appear after the daily run and deployment.
- Listings are sourced from public employer job boards and link back to the original posting. When a board responds successfully, roles no longer returned by that board are removed. If a board fails to respond, its last-known listings are temporarily retained and the page reports the failed-source count.
- Coverage is limited to the configured boards. A company may change its ATS/provider, some identifiers may fail, and no collector can guarantee that a vacancy remains open after the source was checked. Verify each role on the employer's official page before applying.

## Privacy and honest limitations

This is a **static, local-first website**. Profiles, assessment results, progress, resume content and notes are stored in the current browser. They do not automatically sync across devices. Clearing browser data can erase local information; export or save important work separately.

Career-fit percentages are explainable relative scores for selected answers, not validated psychometrics or a probability of employment. Role preparation timelines are broad planning estimates, not guarantees. Resume matching is heuristic, not a real employer ATS. The resume builder asks the browser to print; choose Save as PDF in the print dialog. All resume claims must be reviewed for accuracy.

Optional cloud authentication and cross-device sync have a configuration scaffold but are not active until Supabase credentials, RLS schema, OAuth settings and the deletion Edge Function are deployed. Live AI counselling, server-side code execution, broad real-time job coverage beyond the configured daily employer feeds, and an operational mentor/community backend still require further implementation. No private API key belongs in browser code. Any AI service must keep secrets server-side and enforce rate limits, input limits, CORS, privacy safeguards and clear AI disclosure.

The public Render URL is configured in `render.yaml`; this documentation does not itself confirm the live deployment health. After changes, test on desktop and mobile, run the test suite, inspect browser console/network errors, verify the Render deployment, and check accessibility and Lighthouse performance.
