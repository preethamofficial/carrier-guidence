# Career Launchpad smoke-test checklist

Run these checks after serving `CodeAtlas_Website` over HTTP.

- [ ] Open `career.html` and confirm all sections load without console errors.
- [ ] Search/filter career paths and open each roadmap.
- [ ] Tick a study task, reload, and verify it remains checked.
- [ ] Reset the study plan and confirm the confirmation prompt works.
- [ ] Tick resume checklist items and reload.
- [ ] Add an application, change status, reload, and remove it.
- [ ] Test light/dark theme and reload.
- [ ] Test at mobile width and keyboard navigation.
- [ ] Test with localStorage blocked or corrupted; confirm graceful behaviour.
- [ ] Check every external link and inspect browser console/network requests.

This checklist documents manual checks; it is not evidence that the checks have already passed.

## Advanced dashboard smoke checks

- [ ] Open `dashboard.html` using the local HTTP server.
- [ ] Progress values reflect the existing learning-map and 52-week-course local storage keys.
- [ ] Set a weekly target, mark today's check-in, and confirm the streak/progress updates.
- [ ] Add, complete, and delete a task; verify task text renders as text, not markup.
- [ ] Start, pause, reset and complete a short focus session; verify focus minutes update once.
- [ ] Save and reload the learning journal.
- [ ] Export a backup, change dashboard data, then restore the backup.
- [ ] Reject an invalid or oversized backup without losing current data.
- [ ] Reset dashboard-only data and confirm course progress remains intact.
- [ ] Test responsive layout, keyboard focus, dark theme and reduced-motion preferences.
- [ ] Test resume review with empty, short, ordinary and adversarial-looking text; verify score explanation remains visible.
