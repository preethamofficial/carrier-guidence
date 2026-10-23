# SEO, accessibility and deployment checklist

## Public canonical domain

The configured public URL is `https://codeatlas-career-guidance.onrender.com/`.

- `sitemap.xml` lists the current public HTML routes.
- `robots.txt` allows public routes and references the sitemap.
- `404.html` provides a not-found experience.
- `offline.html` provides a network-failure fallback for the service worker.
- `privacy.html` explains local storage and the status of optional integrations.

Canonical URLs and metadata should be reviewed when routes change or a custom domain is configured. A Render service can be publicly accessible while still having deployment, mobile, caching or runtime defects; verify those in a browser.

## Launch checks

1. Open the live site on desktop and mobile. Check every navigation link and each new page.
2. Inspect the browser console and network panel for 404 assets, failed JSON requests and uncaught errors.
3. Run `npm test`, `node --check` for browser scripts and `python -m json.tool` for JSON data.
4. Keyboard-test navigation, forms, radio groups, focus order, error messages and dialogs. Check reduced-motion behavior and visible focus.
5. Use a screen reader to confirm labels, headings, live result announcements and controls.
6. Measure Lighthouse performance, accessibility, best practices and SEO. Aim for 90+ where practical, record actual scores and fix the largest issues rather than claiming an unmeasured score.
7. Test service-worker updates from an older cache and confirm new pages/data become available. Confirm offline fallback behavior.
8. Verify all external sources, job postings and career-market claims; show region and last-reviewed date for any salary or demand statement.
9. Do not add fabricated testimonials, learner counts, salary figures or hiring guarantees.
10. Re-test after each deploy and keep a changelog of verified changes.

## Remaining integration gates

Supabase login/RLS, cross-device progress sync, server-side AI counselling, live job API/RSS integration, mentor/contact storage, and full Playwright end-to-end flows are not considered implemented until their code, credentials/configuration, security checks and tests are complete. Never expose private provider keys in browser code.
