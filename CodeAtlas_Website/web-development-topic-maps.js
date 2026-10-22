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
function render(topic){
 const branches=M[topic.title];
 if(!branches)return '<p class="roadmap-map-fallback">Use the learning objectives above as the topic checklist.</p>';
 const links=references[topic.title]||[];
 const branchHtml=branches.map((b,i)=>'<article class="topic-map-branch"><header><span class="topic-map-index">'+String(i+1).padStart(2,'0')+'</span><div><h4>'+esc(b[0])+'</h4><p>Explore this branch</p></div></header><ul>'+b[1].split('; ').map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></article>').join('');
 const checks=branches.map(b=>b[0]).map(x=>'<label class="topic-map-check"><input type="checkbox"> <span>'+esc(x)+'</span></label>').join('');
 return '<section class="topic-map-deep"><div class="topic-map-heading"><div><span class="eyebrow">TOPIC KNOWLEDGE GRAPH</span><h3>Deep mind map: '+esc(topic.title)+'</h3><p>Study the center first, then follow each branch. Mark a branch complete only after you can explain it and demonstrate it in code.</p></div><span class="topic-map-badge">4 branches · '+branches.reduce((n,b)=>n+b[1].split('; ').length,0)+' concepts</span></div><div class="topic-map-canvas"><div class="topic-map-center"><span>CORE TOPIC</span><strong>'+esc(topic.title)+'</strong><small>Understand → Implement → Verify</small></div><div class="topic-map-connect" aria-hidden="true"></div><div class="topic-map-branches">'+branchHtml+'</div></div><div class="topic-map-mastery"><div><h4>Mastery checklist</h4><p>Use this checklist as a self-assessment; browser storage is not used.</p></div><div class="topic-map-checks">'+checks+'</div></div><div class="topic-map-resources"><h4>Research and reference material</h4><p>Start with the standards or official documentation; use examples to verify your understanding.</p><div>'+links.map(l=>'<a href="'+esc(l[1])+'" target="_blank" rel="noopener noreferrer">'+esc(l[0])+' ↗</a>').join('')+'</div></div></section>';
}
window.CodeAtlasWebTopicMaps={render,maps:M,references};
})();