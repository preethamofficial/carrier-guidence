# CodeAtlas design system

## Visual direction

- **Theme:** dark-first, focused and technical; navy surfaces with electric cyan and soft indigo accents.
- **Intent:** prioritise readable learning content and clear next actions over decorative complexity.
- **Layout:** responsive grids; card surfaces are used to group related actions, not to hide important information.
- **Typography:** system font stack for robust fallback; monospace only for labels, code and technical metadata.
- **Motion:** small state transitions only. Respect `prefers-reduced-motion`.
- **Colour:** use accent colours for interactive states and emphasis, not as the only indicator of meaning.

## Interaction principles

- Every control needs a visible label or accessible name.
- Use semantic headings, landmarks, forms and buttons.
- Provide a skip link, visible keyboard focus and live status messages for dynamic results.
- Keep interactive targets usable on touch screens; avoid hover-only content.
- Keep user-entered text as text, not executable HTML.
- Do not store secrets or sensitive personal information in browser storage.
- Explain the consequences of reset, export and delete actions.
- Prefer progressive enhancement; if an external resource is unavailable, core local tools should still work where possible.

## Privacy and trust

- Explain which actions stay local and which require an external website.
- Do not fabricate user counts, testimonials, job outcomes, salaries, market trends or model accuracy.
- Clearly label heuristic scores, practice results and recommendations.
- Do not place AI-provider keys in browser source. Any live AI service must be server-side and include abuse prevention, privacy review and cost controls.

## Quality gates

Before release:
1. Run `npm test` and JavaScript syntax checks.
2. Test all pages with a keyboard and at mobile/tablet/desktop widths.
3. Test empty, invalid, long and unusual user input.
4. Check contrast, focus, screen-reader labels, reduced motion and form errors.
5. Test local storage, import/export, service-worker updates and offline fallback.
6. Run Lighthouse and record actual results rather than promising a score.
7. Verify all outbound resources and any role-specific technical claims.
