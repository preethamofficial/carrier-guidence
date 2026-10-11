/**
 * Career tracks part B: Frontend, Backend, Full-Stack, Data Analytics.
 * Each track carries real authored content; Foundations modules attach from
 * careers-shared.js via sharedModules. Statuses are honest (draft/reviewed).
 */
'use strict';

function track(t) {
  return Object.assign({ sharedModules: ['foundations-tech-career'], status: 'draft' }, t);
}

module.exports = [
  track({
    id: 'frontend-development',
    name: 'Frontend Development',
    emoji: '🎨',
    color: '#e34c26',
    tagline: 'Build the interfaces people actually touch.',
    overview: [
      'Frontend development is everything the user sees and interacts with in a browser: layout, styling, interaction, performance and accessibility. Frontend engineers translate designs into fast, responsive, accessible interfaces and wire them to APIs.',
      'It is the most visual entry point into software: you get immediate feedback on your work, and the required stack (HTML, CSS, JavaScript) runs everywhere with zero setup. Frameworks like React, Vue or Angular come after the fundamentals are solid.',
    ],
    responsibilities: ['Turn designs and requirements into responsive pages', 'Integrate frontend with backend APIs', 'Ensure accessibility and cross-browser behaviour', 'Optimise load time and runtime performance', 'Write reusable components and maintain design systems'],
    prerequisites: ['HTML/CSS basics (see shared web foundations)', 'Beginner JavaScript', 'Eye for detail and patience with browser quirks'],
    skills: { technical: ['Semantic HTML & modern CSS', 'JavaScript (DOM, async, modules)', 'A component framework (React/Vue)', 'Web performance basics', 'Accessibility (WCAG fundamentals)'], tools: ['Browser dev tools', 'Git', 'npm packages', 'Linters & formatters', 'Lighthouse'], soft: ['Collaboration with designers', 'Translating visual specs to code', 'Writing clear component docs'] },
    sharedModules: ['foundations-tech-career', 'foundations-programming', 'foundations-web'],
    estHours: 480,
    levels: [
      {
        id: 'Beginner', title: 'Beginner', modules: [
          {
            id: 'fe-basics', title: 'Interfaces that work for everyone', lessons: [
              {
                id: 'fe-basics-1', title: 'Semantic HTML and accessibility essentials', estMinutes: 45, status: 'reviewed',
                objectives: ['Choose semantic elements over divs', 'Add alt text, labels and focus states correctly'],
                intro: ['Accessibility is not optional polish — many people experience some form of disability, and semantic HTML gives you most of the solution for free. Use button for actions and a for links, label every input, keep headings in order, and provide alt text that describes the image’s purpose.', 'Keyboard navigation is the quick test: unplug your mouse and Tab through the page. If you cannot reach and trigger every control, something is broken.'],
                keyPoints: ['Semantics first; ARIA only to fill real gaps.', 'Every input needs a label; every image needs meaningful alt.', 'Visible focus styles are essential, not ugly.', 'Test with keyboard-only navigation every session.'],
                practice: ['Take any page you built and make it fully usable with keyboard only.'],
                resources: [{ title: 'W3C — WAI tutorials', url: 'https://www.w3.org/WAI/tutorials/' }],
              },
              {
                id: 'fe-basics-2', title: 'Responsive layout with grid and flexbox', estMinutes: 50, status: 'reviewed',
                objectives: ['Build a layout that adapts from 320px to 1920px', 'Choose grid vs flexbox per section'],
                intro: ['Grid handles two-dimensional layout (page shells, card galleries); flexbox handles one-dimensional flow (nav bars, toolbars). Real pages combine both: grid for the page, flexbox inside components.', 'Start from the small screen: define the phone layout first, then add media queries for tablets and desktops. This avoids the trap of removing desktop features downwards.'],
                keyPoints: ['Grid = rows + columns; flexbox = one axis.', 'Mobile-first media queries: min-width upward.', 'minmax() and auto-fit make responsive galleries without extra breakpoints.', 'Use relative units (rem, %, vw) for anything scalable.'],
                practice: ['Build a responsive gallery: 1 column on phones, 2 on tablets, 4 on desktop — no horizontal scroll.'],
              },
              {
                id: 'fe-basics-3', title: 'DOM manipulation and events in JavaScript', estMinutes: 55, status: 'reviewed',
                objectives: ['Select and update elements safely', 'Handle user events and form input'],
                intro: ['The DOM is your page as a tree of objects JavaScript can read and change. querySelector finds elements; textContent and classList change them; addEventListener reacts to clicks, input and key presses. Use event delegation for dynamic lists.', 'Forms are central: read values, validate before submit, prevent the default reload, and give clear inline error messages tied to the offending input.'],
                keyPoints: ['querySelector / querySelectorAll to select.', 'Prefer event delegation on containers for dynamic content.', 'preventDefault() stops page reloads on submit.', 'Show validation errors next to the input, in text.'],
                practice: ['Build a todo list: add, toggle-complete and delete items using only DOM APIs — no framework.'],
                resources: [{ title: 'MDN — Introduction to the DOM', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction' }],
              },
            ],
          },
        ],
      },
      {
        id: 'Intermediate', title: 'Intermediate', modules: [
          {
            id: 'fe-frameworks', title: 'Component frameworks', lessons: [
              {
                id: 'fe-frameworks-1', title: 'Thinking in components', estMinutes: 55, status: 'draft',
                objectives: ['Split a page into reusable components', 'Manage state where it belongs'],
                intro: ['Component frameworks (React, Vue, Svelte) treat UI as functions of state: given the same data, the same interface appears. Split UI by responsibility — a Card, a NavBar, a LoginForm — each owning its markup, styles and behaviour.', 'Keep state as low as possible: only lift it up when two siblings genuinely need it. Prop-drilling through five layers usually signals a missing context or store.'],
                keyPoints: ['One component = one responsibility.', 'State lives at the lowest common ancestor that needs it.', 'Props flow down; events flow up.', 'Extract components when markup repeats, not before.'],
                practice: ['Rebuild your todo list as a component tree with at least three components.'],
                resources: [{ title: 'React — Describing the UI', url: 'https://react.dev/learn/describing-the-ui' }],
              },
            ],
          },
        ],
      },
      {
        id: 'Advanced', title: 'Advanced', modules: [
          {
            id: 'fe-perf', title: 'Performance and architecture', lessons: [
              {
                id: 'fe-perf-1', title: 'Measuring and fixing web performance', estMinutes: 60, status: 'outline',
                objectives: ['Use Core Web Vitals to find real problems', 'Apply targeted fixes (lazy loading, code splitting)'],
                intro: ['Frontend performance has three user-facing metrics: LCP (how fast the main content appears), INP (how fast it responds to input) and CLS (how much the layout jumps). Measure with Lighthouse and real-user monitoring, then fix the biggest offender first — usually images, blocking scripts or heavy hydration.'],
                keyPoints: ['Measure Core Web Vitals before optimising.', 'Compress and lazy-load images; serve modern formats.', 'Code-split so users download only what the page needs.', 'Debounce expensive handlers; avoid layout thrash.'],
                practice: ['Audit any site with Lighthouse, list its top three issues, and fix one on your own project.'],
              },
            ],
          },
        ],
      },
      {
        id: 'Job preparation', title: 'Job preparation', modules: [
          {
            id: 'fe-jobprep', title: 'Frontend interviews and take-homes', lessons: [
              {
                id: 'fe-jobprep-1', title: 'CSS and JS interview questions you will actually face', estMinutes: 45, status: 'reviewed',
                objectives: ['Explain the cascade, specificity and the box model', 'Answer common JS questions with examples'],
                intro: ['Frontend interviews mix live coding (build a component or fix CSS) with conceptual questions. Be ready to explain: the box model and box-sizing, cascade and specificity, event bubbling and delegation, closures, the event loop, and the difference between == and ===.', 'For take-home tasks: read requirements twice, ship something working, then polish README and tests. Reviewers value clarity over feature count.'],
                keyPoints: ['Box model, specificity, cascade — explain with examples.', 'Closures and the event loop appear constantly.', 'Take-homes: working beats exhaustive; document trade-offs.', 'Talk through your UI decisions while coding.'],
                practice: ['Answer "explain event delegation" out loud in under two minutes, with a code example.'],
              },
            ],
          },
        ],
      },
    ],
    projects: [
      { id: 'fe-proj-1', title: 'Responsive portfolio website', difficulty: 'beginner', description: 'A personal portfolio with projects section, contact form and dark mode, fully responsive.', steps: ['Plan sections and wireframe', 'Build semantic HTML + CSS layout', 'Add theme toggle and form validation', 'Deploy and link from your résumé'] },
      { id: 'fe-proj-2', title: 'Weather dashboard consuming a public API', difficulty: 'intermediate', description: 'Search a city, show current weather and a 5-day forecast with loading and error states.', steps: ['Read the API docs and get a key', 'Build search UI with states', 'Render forecast cards', 'Handle errors and rate limits'] },
    ],
    interview: [
      { q: 'Explain the CSS box model and box-sizing.', a: 'Every element is a box of content, padding, border and margin. box-sizing: border-box makes width include padding and border, matching how designers usually specify sizes.' },
      { q: 'What is event delegation?', a: 'Listening on a common ancestor instead of each child; events bubble up, so one handler can manage all children — essential for dynamic lists.' },
      { q: 'Difference between == and ===?', a: '== compares after type coercion ("" == 0 is true); === compares value and type with no coercion. Prefer ===.' },
    ],
    checklist: ['Semantic, accessible HTML in every project', 'Responsive layouts tested at 320/768/1280px', 'One framework used in at least one real project', 'Portfolio live with 3+ explained projects', 'Comfortable using dev tools to debug CSS and JS'],
    resources: [{ title: 'MDN Web Docs', url: 'https://developer.mozilla.org/' }, { title: 'web.dev — Core Web Vitals', url: 'https://web.dev/articles/vitals' }],
    status: 'reviewed',
  }),
];
