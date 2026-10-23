# Contributing to CodeAtlas

Thanks for helping improve CodeAtlas. Contributions can include fixing a broken link, improving a lesson, correcting a source, reporting an accessibility issue, improving tests or adding a learning feature.

## Before making a change

1. Open an issue or discussion for larger changes so the intended behavior can be agreed first.
2. Keep changes focused and avoid unrelated formatting or generated-file churn.
3. Never commit passwords, API keys, service-role keys, access tokens, private learner data or secrets.
4. For career, salary and job-market content, prefer primary sources, include geography and publication/review dates, and distinguish facts from estimates.

## Local setup

Use Node.js 18+ and Python 3.

```powershell
cd CodeAtlas_Website
python -m http.server 8000
```

Open http://localhost:8000. Do not use a `file://` URL because pages load JSON data with `fetch()`.

## Run checks before opening a pull request

```powershell
cd CodeAtlas_Website
npm test
node --check assessment.js
node --check assessment-engine.js
node --check onboarding.js
node --check my-path.js
node --check resume-builder.js
node --check career-studio.js
python -m json.tool data/assessment.json
python -m json.tool data/curriculum.json
python -m json.tool data/year-curriculum.json
```

Also test affected pages in a browser at desktop and mobile widths. Check keyboard access, form validation, links, browser console/network errors, local storage and export behavior where relevant. State clearly which checks you ran and any checks you could not run.

## Pull request checklist

- [ ] Explain the user problem and the intended change.
- [ ] Link related issue(s), if any.
- [ ] Include screenshots for meaningful UI changes when practical.
- [ ] Add or update automated tests for behavior changes.
- [ ] Update relevant README/changelog/documentation.
- [ ] Verify that examples and external references are accurate.
- [ ] Explain remaining limitations; do not describe unconfigured services as working.

## Reporting a problem

Use GitHub Issues or the feedback form on the Career Methodology page. Include the affected page, steps to reproduce, expected behavior and actual behavior. Remove personal information and secrets from screenshots, logs and reports.
