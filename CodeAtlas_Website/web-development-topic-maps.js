/* Evidence-informed, topic-specific Web Development mind maps.
   Curriculum structure follows MDN Learn Web Development and web.dev; security topics
   include OWASP guidance. Each map is authored per topic rather than generated from title text. */
(function () {
'use strict';
const M = {
'How the web works': [
['Addressing & discovery','URL anatomy; DNS recursive lookup; A/AAAA/CNAME records; TTL and caching'],
['Transport & HTTP','TCP connection; TLS handshake and certificates; HTTP methods and headers; status codes and redirects'],
['Browser rendering pipeline','Parse HTML into DOM; parse CSS into CSSOM; style/layout/paint/composite; JavaScript and render-blocking resources'],
['Runtime & operations','Origin and same-origin policy; cookies/cache/service workers; CDN and reverse proxy; server logs and network waterfall']
],
'HTML document structure': [
['Document contract','DOCTYPE and standards mode; lang and character encoding; viewport metadata; title and description'],
['Semantic information architecture','Header/nav/main/footer landmarks; heading hierarchy; article vs section; lists and meaningful link text'],
['Resources & metadata','Relative vs absolute URLs; image alt and dimensions; preload/defer/async intent; canonical and social metadata'],
['Validation & maintainability','Valid nesting and unique IDs; HTML validator and DevTools; progressive enhancement; semantics for assistive tech and search']
],
'Accessible HTML forms': [
['Input semantics','Label association; input type and autocomplete; name/value submission contract; fieldset and legend grouping'],
['Constraint validation','Required and type constraints; min/max/pattern boundaries; client validation is not security; server validation and normalization'],
['Error and feedback UX','Inline errors tied with aria-describedby; focus first invalid field; preserve valid input; success and pending states'],
['Privacy & secure handling','HTTPS and sensitive-field caution; CSRF strategy for cookie sessions; rate limiting and abuse controls; never log passwords or tokens']
],
'CSS selectors and box model': [
['Cascade resolution','Origin and importance; cascade layers; specificity and source order; inheritance and computed values'],
['Box geometry','Content/padding/border/margin; content-box vs border-box; intrinsic sizing and min-width; margin collapse and overflow'],
['Selector architecture','Class-based components; combinators and pseudo-classes; :is/:where/:has tradeoffs; avoid over-specific selectors'],
['Debugging & design tokens','Computed styles and box model panel; custom properties; logical properties for writing modes; stacking contexts and z-index']
],
'Responsive layouts with Flexbox and Grid': [
['Layout primitives','Flex main/cross axes; flex-basis/grow/shrink; Grid tracks and implicit placement; gap and alignment'],
['Intrinsic responsiveness','minmax and auto-fit/auto-fill; min-content/max-content; clamp and fluid sizing; content-first breakpoints'],
['Responsive content','Mobile-first constraints; responsive images and aspect-ratio; navigation and overflow behavior; touch target sizing'],
['Verification','Test 320px through wide screens; keyboard and zoom at 200%; avoid fixed heights; inspect overflow and layout shifts']
],
'Git, GitHub and browser DevTools': [
['Git object model','Working tree/index/commit; branches and refs; merge vs rebase; restore/revert and recovery'],
['Team workflow','Small descriptive commits; pull request context; code review and conflict resolution; protected branches and CI checks'],
['Browser diagnostics','Console exceptions and source maps; Elements/computed CSS; Network headers/waterfall; device emulation and accessibility tree'],
['Debugging discipline','Reproduce and minimize; inspect request payload/status; compare before/after diffs; avoid committing secrets or generated artifacts']
],
'JavaScript values, functions and control flow': [
['Language foundations','Primitive types and reference values; coercion and strict equality; lexical scope and closures; hoisting and temporal dead zone'],
['Functions & composition','Declarations, expressions and arrow functions; parameters/defaults/rest; pure functions and side effects; higher-order functions'],
['Collections & iteration','Array map/filter/reduce; object destructuring and spread; Map/Set use cases; mutation versus immutable updates'],
['Correctness & diagnostics','Falsy and nullish values; input validation and edge cases; exceptions and error boundaries; unit tests and debugger']
],
'DOM, events and browser forms': [
['DOM model','Node tree and selectors; textContent vs HTML injection; attributes vs properties; create/remove nodes'],
['Event propagation','Capture/target/bubble phases; preventDefault vs stopPropagation; delegation for dynamic lists; listener cleanup'],
['Form behavior','Submit event and FormData; native constraints; async submission state; reset and duplicate-submit prevention'],
['State & safety','Keep DOM and application state consistent; keyboard behavior; avoid stale listeners; safe rendering of untrusted input']
],
'Asynchronous JavaScript and fetch': [
['Concurrency model','Call stack and event loop; task vs microtask queue; promises and chaining; async/await error propagation'],
['HTTP request lifecycle','Request URL/options/headers; response.ok and status; JSON parsing failures; abort signals and timeouts'],
['UI state machine','Idle/loading/success/empty/error; retry and backoff; cancellation and stale-response guards; pagination and request deduplication'],
['Reliability & security','CORS is server policy not auth; credentials and CSRF implications; bounded payloads; safe telemetry without sensitive data']
],
'Accessibility and semantic interaction': [
['Perceivable content','Semantic landmarks and headings; meaningful alt text; color contrast; captions and non-color cues'],
['Operable interaction','Keyboard-only completion; visible focus; logical focus order; no keyboard traps and sufficient target size'],
['Understandable feedback','Accessible labels and instructions; errors announced and associated; predictable controls; reduced-motion preferences'],
['Assistive technology testing','Native HTML before ARIA; accessible name/role/state; screen reader smoke tests; automated checks plus manual testing']
],
'Responsive typography, themes and UI states': [
['Typography system','Rem and fluid type scales; line-height and measure; font loading and fallback; text zoom and reflow'],
['Design tokens & themes','CSS custom properties; semantic color tokens; data/theme attribute; persistence and system preference'],
['Interaction states','Hover/focus/active/disabled; focus-visible styling; reduced-motion media query; high contrast and forced colors'],
['Visual robustness','Contrast ratios; long content and localization; dark-theme surfaces; avoid color-only status signals']
],
'React components and props': [
['Component boundaries','Single responsibility; composition over giant components; JSX expression rules; stable component identity'],
['Props and data flow','One-way parent-to-child flow; defaults and prop validation; children and slots; avoid mutating props'],
['Rendering & lists','Pure render functions; stable keys from identity; conditional rendering; controlled vs uncontrolled inputs'],
['Architecture choices','Lift shared state to common owner; separate UI from data access; error boundaries; avoid premature abstraction']
],
'React state, forms and effects': [
['State model','useState and functional updates; immutable arrays/objects; derived values vs stored state; state ownership'],
['Forms and validation','Controlled inputs; field-level errors; submit/pending states; native validation and server feedback'],
['Effects & lifecycle','Effects synchronize external systems; dependency correctness; cleanup subscriptions; abort stale fetches'],
['Performance & debugging','React DevTools profiler; memoization only after measurement; avoid effect loops; test user-observable behavior']
],
'Routing, component testing and build': [
['Route architecture','Path params and query strings; nested layouts; navigation and history; 404 and error routes'],
['Test strategy','Unit tests for pure logic; component tests by role/name; integration tests for data flow; end-to-end critical paths'],
['Production build','Lint and type checks; bundling and code splitting; environment configuration; source maps and asset paths'],
['Release quality','Loading and failure states; route refresh/deep-link fallback; accessibility regression; CI gates and rollback']
],
'HTTP methods, status codes and REST': [
['Resource modelling','Nouns and resource identifiers; collection vs item routes; nested resources with restraint; pagination/filter/sort'],
['Method semantics','GET safe and cacheable; POST create or command; PUT replacement/idempotency; PATCH partial update and DELETE'],
['Status & error contracts','200/201/204 success; 400/401/403/404/409/422 client failures; 429 throttling; 5xx server failures'],
['API evolution','Request/response schemas; content types and validation; idempotency keys; versioning, deprecation and OpenAPI']
],
'Node.js server and request lifecycle': [
['Runtime architecture','Event loop and nonblocking I/O; process environment; package lockfiles; supported Node LTS version'],
['HTTP pipeline','Routing and middleware order; request parsing and size limits; validation before service calls; centralized errors'],
['Service design','Controller/service/repository boundaries; async error propagation; connection pooling; graceful shutdown'],
['Production hardening','Secrets via environment; health/readiness checks; rate limits and timeouts; structured logs and request IDs']
],
'SQL, data modelling and migrations': [
['Relational modelling','Entities and relationships; primary and foreign keys; normalization and constraints; nullable and unique semantics'],
['Query execution','SELECT/filter/order/limit; joins and cardinality; aggregation and window functions; NULL and transaction isolation'],
['Performance & safety','Indexes and query plans; parameterized queries; avoid N+1 access; pool connections and bound result sets'],
['Schema lifecycle','Forward/backward-compatible migrations; transactional DDL where supported; backfill strategies; backup and restore drills']
],
'Authentication, authorization and sessions': [
['Identity lifecycle','Registration and verification; password hashing with Argon2id/bcrypt; login and account recovery; MFA and re-authentication'],
['Credential/session design','Secure HttpOnly SameSite cookies; session rotation and expiration; token issuer/audience/expiry checks; refresh/revocation strategy'],
['Authorization model','Role vs permission; resource ownership checks; least privilege; deny-by-default and tenant isolation'],
['Threat controls','Rate limiting and credential stuffing defense; CSRF for cookie-authenticated writes; secret rotation; audit security events']
],
'Web security: XSS, CSRF, secrets and validation': [
['Injection prevention','Contextual output encoding; textContent and safe templating; parameterized SQL; strict server-side schema validation'],
['Browser trust boundaries','Same-origin policy; CORS allowlists are not authorization; CSP as defense-in-depth; sandbox untrusted embeds'],
['Session & request forgery','SameSite cookies and CSRF tokens; Origin/Referer validation where appropriate; secure cookie flags; re-authenticate sensitive actions'],
['Secrets & privacy','Server-only environment secrets; least-privilege credentials; rotation and incident response; minimize collection and redact logs']
],
'API testing, validation and documentation': [
['Contract design','OpenAPI paths and components; schema and enum constraints; auth schemes; examples and standardized errors'],
['Test layers','Unit tests for business rules; integration tests with database; contract/schema validation; end-to-end workflows'],
['Negative & security cases','Missing/invalid fields; 401 vs 403; ownership/tenant isolation; rate limits and oversized payloads'],
['Observability & change control','Correlation/request IDs; structured sanitized logs; backwards-compatible changes; CI gates and generated client review']
],
'Git collaboration and code review': [
['Branch and commit strategy','Short-lived feature branches; atomic commits; conventional descriptive messages; merge/rebase tradeoffs'],
['Review dimensions','Correctness and edge cases; security/privacy; readability and maintainability; tests and documentation'],
['Conflict & recovery tools','Understand three-way merges; resolve by intent not blindly; revert shared changes; reflog for local recovery'],
['Team safeguards','Branch protection and required checks; code owners; secret scanning; release tags and traceable changes']
],
'Frontend and API performance': [
['Measure first','Performance panel and network waterfall; Core Web Vitals LCP/INP/CLS; real-user vs lab data; performance budgets'],
['Delivery optimization','Image formats and responsive srcset; compression and caching headers; code splitting and lazy loading; CDN and font strategy'],
['Runtime efficiency','Avoid long main-thread tasks; virtualize large lists; prevent redundant requests; measure React rerenders'],
['API/data efficiency','Pagination and field selection; indexes and query plans; caching with invalidation rules; timeouts and concurrency limits']
],
'SEO and discoverability': [
['Crawl & index','Robots and sitemap roles; canonical URL; redirects and status codes; noindex for private or duplicate pages'],
['Document semantics','Unique title and useful description; semantic headings; descriptive internal links; structured data only when accurate'],
['Performance & mobile','Responsive mobile experience; Core Web Vitals; image optimization; avoid blocked rendering and layout shifts'],
['Validation & measurement','Search Console and URL inspection; preview social metadata; detect broken links; measure qualified organic outcomes']
],
'Docker, environments and deployment': [
['Image construction','Small trusted base image; pinned dependencies and lockfiles; multi-stage builds; non-root runtime user'],
['Runtime configuration','Environment-specific config; secret injection not baked into image; ports and process signals; health checks'],
['Deployment strategy','Build/test/publish artifact; immutable image tags; rolling or blue-green rollout; migration compatibility and rollback'],
['Operations & supply chain','Dependency scanning; image vulnerability checks; resource limits; logs/metrics and disaster recovery']
],
'Linux, logs and operational debugging': [
['Host/service basics','Processes and exit codes; permissions and ownership; systemd status; ports and DNS resolution'],
['Logs & observability','journalctl filters; structured fields and correlation IDs; metrics and alert thresholds; redaction of sensitive data'],
['Resource diagnosis','CPU and memory pressure; disk/inodes; socket and connection saturation; dependency latency'],
['Incident workflow','Confirm scope and timeline; gather evidence before restarting; mitigate and verify recovery; post-incident root cause and prevention']
],
'Capstone: full-stack course platform': [
['Product & architecture','User stories and acceptance criteria; route and data model design; trust boundaries and role matrix; architecture decision record'],
['Frontend experience','Accessible responsive catalogue; search/filter/detail routes; form validation and feedback; empty/error/loading states'],
['Backend & persistence','REST contract and schema; authentication and ownership authorization; transactions and migrations; pagination and validation'],
['Release & evidence','Automated tests and CI; deployment/health/rollback; logs and security review; README, demo script and measurable outcomes']
]
};

const lessons = {
  "JavaScript values, functions and control flow": {
    "intro": "JavaScript is the programming language that runs in the browser and can also run on servers with Node.js. It lets a page make decisions, transform data, respond to user actions, and communicate with APIs. Start by understanding how values are stored and how instructions execute from top to bottom.",
    "sections": [
      [
        "1. Variables and values",
        "Use const when a variable will not be reassigned and let when its binding must change. Avoid var in modern code because its function-scoped behavior can be surprising. A variable stores a value such as a string, number, boolean, undefined, null, object, or array. const prevents reassignment of the binding; it does not freeze an object or array."
      ],
      [
        "2. Types, equality and conversion",
        "Primitive values include string, number, bigint, boolean, undefined, null and symbol. Objects and arrays are reference values. Use === and !== for comparisons to avoid most implicit-coercion surprises. Convert external input deliberately: Number(\"12\") gives 12, while Number(\"hello\") gives NaN. Validate before using user-provided values."
      ],
      [
        "3. Conditions and loops",
        "Use if/else when different paths depend on a condition, switch for a set of discrete cases, and for/of to iterate values in arrays or other iterables. Use forEach when you need an action for every item, and map/filter/reduce when transforming collections. Ensure loops make progress and handle empty collections."
      ],
      [
        "4. Functions, scope and return values",
        "A function packages reusable behavior. Parameters are inputs; return sends a result back to the caller. Arrow functions are concise callbacks, but do not create their own this binding. Scope determines where a variable can be accessed. Keep functions small, name them by intent, and avoid hidden side effects when a pure transformation is possible."
      ],
      [
        "5. Arrays, objects and immutability",
        "Objects model named properties; arrays model ordered collections. Destructuring extracts properties, spread syntax copies enumerable properties, and map/filter/find/reduce support common transformations. Spread makes a shallow copy, not a deep copy. Avoid mutating shared data when other parts of the UI depend on it."
      ],
      [
        "6. Errors and debugging",
        "Check edge cases such as empty strings, missing properties, null values, zero, and invalid numbers. Throw Error objects when an operation cannot continue safely; catch errors at a boundary where you can recover or show useful feedback. Use browser DevTools breakpoints, console output, and small test cases to inspect assumptions."
      ]
    ],
    "exampleTitle": "Example: validate input and calculate a summary",
    "example": "function summarizeScores(values) {\\n  if (!Array.isArray(values)) {\\n    throw new TypeError(\"Expected an array of scores\");\\n  }\\n\\n  const valid = values\\n    .map(Number)\\n    .filter(score => Number.isFinite(score) && score >= 0 && score <= 100);\\n\\n  const average = valid.length\\n    ? valid.reduce((sum, score) => sum + score, 0) / valid.length\\n    : 0;\\n\\n  return { count: valid.length, average, passed: average >= 40 };\\n}\\n\\nconsole.log(summarizeScores([80, \"70\", -4, \"missing\"]));\\n// { count: 2, average: 75, passed: true }",
    "explanation": "The function first verifies the input shape, converts each item to a number, removes values outside the accepted range, and computes an average only when at least one valid score remains. The returned object keeps related results together. In a real application, decide whether invalid entries should be ignored or reported to the user.",
    "practice": [
      "Write isAdult(age) that rejects invalid ages and returns true only for ages 18 or above.",
      "Create a function that counts words in a sentence, ignoring extra spaces and letter case.",
      "Given an array of products, use filter and reduce to calculate the total price of in-stock products.",
      "Test empty arrays, null input, numeric strings, NaN, negative values and boundary values."
    ]
  },
  "DOM, events and browser forms": {
    "intro": "The Document Object Model (DOM) is the browser's object representation of an HTML document. JavaScript can query DOM nodes, change text and attributes, create elements, and respond to events such as clicks and form submissions. The DOM is the interface to the page, not a replacement for well-structured HTML.",
    "sections": [
      [
        "1. Selecting elements",
        "Use document.querySelector for the first matching CSS selector and querySelectorAll for all matches. Check whether a query returned null before using the result. Prefer stable IDs or meaningful data attributes over fragile selectors tied to visual styling."
      ],
      [
        "2. Changing content safely",
        "Use textContent when displaying text from a user or API. Assigning untrusted strings to innerHTML can create cross-site scripting (XSS) vulnerabilities because the browser parses them as markup. Use createElement and append when building a list of elements from data."
      ],
      [
        "3. Events and event objects",
        "addEventListener registers a handler for an event. The event object contains details such as the target. preventDefault cancels a browser default action, such as a form navigation; stopPropagation stops the event from travelling further through the event path. They solve different problems."
      ],
      [
        "4. Event bubbling and delegation",
        "Many events bubble from the target to parent elements. Delegation means attaching one handler to a stable parent and checking which child triggered the event. It is useful for dynamic lists because newly added children can work without individual listeners."
      ],
      [
        "5. Forms and FormData",
        "Listen to the submit event rather than only a button click, because users can submit with Enter. Call preventDefault when handling submission in JavaScript. FormData(form) reads named controls; browser constraints such as required and type=email improve usability, but server-side validation is still required."
      ],
      [
        "6. UI state and accessibility",
        "Keep the displayed page consistent with application data. Provide visible labels, keyboard-operable controls, clear success/error messages and focus management when appropriate. Remove event listeners or cancel outstanding work when a component is no longer needed."
      ]
    ],
    "exampleTitle": "Example: handle a signup form safely",
    "example": "const form = document.querySelector(\"#signup\");\\nconst status = document.querySelector(\"#status\");\\n\\nform.addEventListener(\"submit\", event => {\\n  event.preventDefault();\\n  const data = new FormData(form);\\n  const email = String(data.get(\"email\") ?? \"\").trim();\\n\\n  if (!email) {\\n    status.textContent = \"Enter your email address.\";\\n    return;\\n  }\\n\\n  // Display as text, never parse user input as HTML.\\n  status.textContent = `Ready to register: ${email}`;\\n});",
    "explanation": "This example finds the form and status element once, handles the form's submit event, reads the named email control, validates that it is not empty, and writes feedback as plain text. The HTML should include a label and an input with name=\"email\". A real app must submit to a backend and validate the address again on the server.",
    "practice": [
      "Build a task list with add, complete and delete actions.",
      "Use event delegation so one list handler can process clicks on dynamically created delete buttons.",
      "Create a form with required name and email fields and show field-specific errors.",
      "Test the page using only a keyboard and verify that untrusted text is displayed literally."
    ]
  },
  "Asynchronous JavaScript and fetch": {
    "intro": "JavaScript often needs to wait for work that completes later, including HTTP requests, timers and file operations. Asynchronous code lets the browser continue responding while that work is pending. Promises represent future completion; async/await provides a readable way to work with promises, but errors and loading states still need to be handled explicitly.",
    "sections": [
      [
        "1. Synchronous versus asynchronous work",
        "Synchronous statements run in sequence and can block the current task. Network requests take unpredictable time, so browsers expose asynchronous APIs. JavaScript uses an event loop to schedule callbacks and promise reactions when the current work allows them to run."
      ],
      [
        "2. Promises and async/await",
        "A Promise is pending, fulfilled or rejected. .then handles fulfillment, .catch handles rejection, and .finally runs cleanup. An async function always returns a Promise. await pauses that async function until the Promise settles; it does not freeze the whole browser."
      ],
      [
        "3. Making a fetch request",
        "fetch(url) sends an HTTP request and resolves to a Response when headers arrive. A 404 or 500 response does not automatically reject the Promise, so check response.ok or response.status. Then parse the body with response.json(); body parsing can also fail if the response is not valid JSON."
      ],
      [
        "4. Loading, empty, success and error states",
        "A useful UI distinguishes loading, successful results, no results, and failure. Disable duplicate submissions when necessary, show an actionable error, and provide a retry when retrying is safe. Do not leave a spinner running forever after a request fails."
      ],
      [
        "5. Cancellation and stale responses",
        "AbortController can cancel a fetch when a user navigates away or starts a newer search. In type-ahead search, a slower earlier request can finish after a newer one; cancel old requests or verify that the response still matches the latest query before rendering it."
      ],
      [
        "6. Security and reliability",
        "Do not put secrets in browser JavaScript. CORS is a browser-enforced server policy, not authentication or authorization. Use HTTPS, validate data on the server, apply appropriate timeouts and payload limits, and avoid logging tokens or private response bodies."
      ]
    ],
    "exampleTitle": "Example: request data and handle HTTP errors",
    "example": "async function loadCourses() {\\n  const response = await fetch(\"/api/courses\");\\n\\n  // fetch does not reject just because the server returned 404/500.\\n  if (!response.ok) {\\n    throw new Error(`Request failed: HTTP ${response.status}`);\\n  }\\n\\n  const courses = await response.json();\\n  if (!Array.isArray(courses)) {\\n    throw new TypeError(\"Expected the API to return a course array\");\\n  }\\n  return courses;\\n}\\n\\nloadCourses()\\n  .then(courses => console.log(\"Courses:\", courses))\\n  .catch(error => console.error(\"Could not load courses:\", error.message));",
    "explanation": "The function waits for the response, checks the HTTP status, parses JSON, and checks the shape of the returned data. The catch handler handles network errors, non-success status errors thrown by this function, and JSON parsing errors. In a UI, set loading state before calling it and always restore the UI in a finally block or equivalent state transition.",
    "practice": [
      "Build a course list that displays loading, empty, success and error states.",
      "Simulate an API failure and add a retry button.",
      "Use AbortController to cancel a request when a search query changes.",
      "Test network failure, 404, 500, invalid JSON and an empty successful response."
    ]
  }
};
const references = {
'How the web works':[['MDN: How the web works','https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works'],['MDN: How browsers load websites','https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_browsers_load_websites']],
'HTML document structure':[['MDN: Structuring content with HTML','https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content'],['WHATWG HTML Standard','https://html.spec.whatwg.org/']],
'Accessible HTML forms':[['MDN: Forms','https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms'],['W3C WAI Forms Tutorial','https://www.w3.org/WAI/tutorials/forms/']],
'CSS selectors and box model':[['MDN: CSS styling basics','https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics'],['web.dev: Learn CSS','https://web.dev/learn/css/']],
'Responsive layouts with Flexbox and Grid':[['MDN: CSS layout','https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout'],['web.dev: Learn responsive design','https://web.dev/learn/design/']],
'Git, GitHub and browser DevTools':[['Git book','https://git-scm.com/book/en/v2'],['Chrome DevTools documentation','https://developer.chrome.com/docs/devtools/']],
'JavaScript values, functions and control flow':[['MDN: JavaScript fundamentals','https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting'],['web.dev: Learn JavaScript','https://web.dev/learn/javascript/']],
'DOM, events and browser forms':[['MDN: DOM scripting','https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/DOM_scripting'],['MDN: Event reference','https://developer.mozilla.org/en-US/docs/Web/Events']],
'Asynchronous JavaScript and fetch':[['MDN: Promises','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises'],['MDN: Fetch API','https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch']],
'Accessibility and semantic interaction':[['MDN: Accessibility','https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility'],['W3C WAI tutorials','https://www.w3.org/WAI/tutorials/']],
'Responsive typography, themes and UI states':[['web.dev: Learn design','https://web.dev/learn/design/'],['MDN: CSS media queries','https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries']],
'React components and props':[['React: Describing the UI','https://react.dev/learn/describing-the-ui'],['React: Passing props','https://react.dev/learn/passing-props-to-a-component']],
'React state, forms and effects':[['React: Managing state','https://react.dev/learn/managing-state'],['React: Synchronizing with Effects','https://react.dev/learn/synchronizing-with-effects']],
'Routing, component testing and build':[['React: Thinking in React','https://react.dev/learn/thinking-in-react'],['Testing Library principles','https://testing-library.com/docs/guiding-principles/']],
'HTTP methods, status codes and REST':[['MDN: HTTP request methods','https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods'],['MDN: HTTP response status codes','https://developer.mozilla.org/en-US/docs/Web/HTTP/Status']],
'Node.js server and request lifecycle':[['Node.js documentation','https://nodejs.org/docs/latest/api/'],['Express guide','https://expressjs.com/en/guide/routing.html']],
'SQL, data modelling and migrations':[['PostgreSQL documentation','https://www.postgresql.org/docs/current/'],['OWASP SQL Injection Prevention','https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html']],
'Authentication, authorization and sessions':[['OWASP Authentication Cheat Sheet','https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html'],['OWASP Session Management Cheat Sheet','https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html']],
'Web security: XSS, CSRF, secrets and validation':[['OWASP Cheat Sheet Series','https://cheatsheetseries.owasp.org/'],['MDN: Web security','https://developer.mozilla.org/en-US/docs/Web/Security']],
'API testing, validation and documentation':[['OpenAPI Specification','https://spec.openapis.org/oas/latest.html'],['OWASP API Security Top 10','https://owasp.org/API-Security/']],
'Git collaboration and code review':[['GitHub: About pull requests','https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests'],['Git book','https://git-scm.com/book/en/v2']],
'Frontend and API performance':[['web.dev: Learn Performance','https://web.dev/learn/performance/'],['web.dev: Core Web Vitals','https://web.dev/articles/vitals']],
'SEO and discoverability':[['Google Search Central SEO Starter Guide','https://developers.google.com/search/docs/fundamentals/seo-starter-guide'],['Google Search Central: Sitemaps','https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview']],
'Docker, environments and deployment':[['Docker documentation','https://docs.docker.com/'],['12-Factor App configuration','https://12factor.net/config']],
'Linux, logs and operational debugging':[['systemd journalctl manual','https://www.freedesktop.org/software/systemd/man/latest/journalctl.html'],['Google SRE book','https://sre.google/sre-book/table-of-contents/']],
'Capstone: full-stack course platform':[['MDN Curriculum','https://developer.mozilla.org/en-US/curriculum/'],['web.dev Learn','https://web.dev/learn/']]
};
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

function renderLesson(lesson){
 const sections=lesson.sections.map(s=>'<article class="javascript-lesson-section"><h4>'+esc(s[0])+'</h4><p>'+esc(s[1])+'</p></article>').join('');
 const practice=lesson.practice.map((p,i)=>'<li><label><input type="checkbox"> <span>'+esc(p)+'</span></label></li>').join('');
 return '<section class="javascript-deep-lesson"><span class="eyebrow">FULL LESSON · BEGINNER FRIENDLY</span><h3>Understand the concept step by step</h3><p class="javascript-lesson-intro">'+esc(lesson.intro)+'</p><div class="javascript-lesson-sections">'+sections+'</div><h4>'+esc(lesson.exampleTitle)+'</h4><pre><code>'+esc(lesson.example)+'</code></pre><p>'+esc(lesson.explanation)+'</p><h4>Practice exercises</h4><ol class="javascript-practice-list">'+practice+'</ol></section>';
}

function render(topic){
 const branches=M[topic.title];
 if(!branches)return '<p class="roadmap-map-fallback">Use the learning objectives above as the topic checklist.</p>';
 const links=references[topic.title]||[];
 const branchHtml=branches.map((b,i)=>'<article class="topic-map-branch"><header><span class="topic-map-index">'+String(i+1).padStart(2,'0')+'</span><div><h4>'+esc(b[0])+'</h4><p>Explore this branch</p></div></header><ul>'+b[1].split('; ').map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></article>').join('');
 const checks=branches.map(b=>b[0]).map(x=>'<label class="topic-map-check"><input type="checkbox"> <span>'+esc(x)+'</span></label>').join('');
 return '<section class="topic-map-deep"><div class="topic-map-heading"><div><span class="eyebrow">TOPIC KNOWLEDGE GRAPH</span><h3>Deep mind map: '+esc(topic.title)+'</h3><p>Study the center first, then follow each branch. Mark a branch complete only after you can explain it and demonstrate it in code.</p></div><span class="topic-map-badge">4 branches · '+branches.reduce((n,b)=>n+b[1].split('; ').length,0)+' concepts</span></div>'+(lessons[topic.title]?renderLesson(lessons[topic.title]):'')+'<div class="topic-map-canvas"><div class="topic-map-center"><span>CORE TOPIC</span><strong>'+esc(topic.title)+'</strong><small>Understand → Implement → Verify</small></div><div class="topic-map-connect" aria-hidden="true"></div><div class="topic-map-branches">'+branchHtml+'</div></div><div class="topic-map-mastery"><div><h4>Mastery checklist</h4><p>Use this checklist as a self-assessment; browser storage is not used.</p></div><div class="topic-map-checks">'+checks+'</div></div><div class="topic-map-resources"><h4>Research and reference material</h4><p>Start with the standards or official documentation; use examples to verify your understanding.</p><div>'+links.map(l=>'<a href="'+esc(l[1])+'" target="_blank" rel="noopener noreferrer">'+esc(l[0])+' ↗</a>').join('')+'</div></div></section>';
}
window.CodeAtlasWebTopicMaps={render,maps:M,references};
})();