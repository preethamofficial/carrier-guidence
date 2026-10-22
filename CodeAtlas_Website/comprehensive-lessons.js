/* Topic-specific CodeAtlas lesson engine. Loads curated missing-topic catalogs first. */
(function () {
'use strict';
const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const DOCS = {
python:'https://docs.python.org/3/tutorial/',javascript:'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',html:'https://developer.mozilla.org/en-US/docs/Web/HTML',css:'https://developer.mozilla.org/en-US/docs/Web/CSS',react:'https://react.dev/learn',nodejs:'https://nodejs.org/en/learn',dart:'https://dart.dev/learn',git:'https://git-scm.com/doc',linux:'https://linuxjourney.com/',dsa:'https://opendsa-server.cs.vt.edu/',
typescript:'https://www.typescriptlang.org/docs/handbook/intro.html',java:'https://dev.java/learn/',
sql:'https://www.postgresql.org/docs/current/tutorial.html',go:'https://go.dev/doc/',rust:'https://doc.rust-lang.org/book/',
csharp:'https://learn.microsoft.com/en-us/dotnet/csharp/',c:'https://en.cppreference.com/w/c',cpp:'https://en.cppreference.com/w/cpp',
php:'https://www.php.net/manual/en/',kotlin:'https://kotlinlang.org/docs/home.html',swift:'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/',bash:'https://www.gnu.org/software/bash/manual/'
};
function family(title) {
 const t=title.toLowerCase(), rules=[
 ['setup',/setup|toolchain|first program|runtime|program structure|compiler|build/],
 ['html',/document structure|elements and attributes|semantic landmarks|headings|images and alt|forms and validation|tables|audio and video|metadata and seo|accessibility and aria|html security|validation and portfolio/],
 ['css',/selectors and cascade|box model|typography and units|flexbox|grid|responsive design|positioning|custom properties|transitions|focus and accessible forms|css architecture/],
 ['testing',/accessibility|testing|debugging|validation|capstone|ci|performance/],
 ['types',/type|variable|operator|null|optional|value semantics|constant/],
 ['text',/string|text|encoding|json|serialization/],
 ['control',/condition|loop|control flow|switch|match/],
 ['functions',/function|method|closure|lambda|decorator|macro|generic|trait/],
 ['collections',/collection|array|list|tuple|set|dict|map|slice|vector|range/],
 ['memory',/pointer|ownership|borrow|lifetime|memory|arc|smart pointer|resource|raii|move semantics/],
 ['oop',/class|object|struct|enum|interface|protocol|inheritance|polymorphism|composition/],
 ['async',/async|await|concurr|goroutine|channel|coroutine|thread|future|flow|actor|process/],
 ['database',/database|sql|schema|transaction|query|index|migration|repository|orm|persistence|jdbc|room/],
 ['http',/http|api|rest|network|fetch|socket|web service|routing|request|response/],
 ['security',/security|auth|secret|permission|privacy|xss|csrf|keychain|credential/],
 ['security',/security|auth|secret|permission|privacy|xss|csrf|keychain|credential/],
 ['testing',/test|debug|profile|benchmark|fuzz|sanitizer|ci|performance|observability/],
 ['files',/file|stream|pipe|redirection|module|package|composer|cargo|gradle|spm|deployment|configuration/],
 ['analytics',/analytics|window function|aggregation|group by|join|cohort|running total|pivot|data quality|date.time/]
 ];
 return (rules.find(r=>r[1].test(t))||['general',/.*/])[0];
}
function profile(lang, topic) {
 const c=family(topic.title), rules={
 setup:['A reproducible toolchain and project layout are prerequisites for trustworthy behavior.','Start with the smallest runnable program, then add dependencies one at a time.','Version mismatches, hidden working-directory assumptions and missing dependencies.','Verify the supported runtime/compiler version and reproduce the build from a clean checkout.'],
 html:['Semantic HTML communicates document structure, relationships and interaction intent to browsers, crawlers and assistive technology.','Choose an element based on its meaning, then add attributes required for behavior and accessible names.','Invalid nesting, duplicate IDs, inaccessible forms, missing alternative text and treating HTML as a sanitizer.','Validate markup, inspect the accessibility tree and test keyboard navigation plus mobile layouts.'],
 css:['CSS controls presentation through the cascade, layout algorithms, responsive constraints and visual states.','Start with normal flow and reusable tokens; use Flexbox for one-dimensional alignment and Grid for two-dimensional layout.','Specificity wars, overflow at narrow widths, invisible focus indicators, low contrast and motion that cannot be reduced.','Test viewport sizes, keyboard focus, contrast, reduced motion and computed styles before release.'],
 types:['Types and value semantics determine which states can be represented and which operations are valid.','Trace each value’s type, initial value, conversions and mutation points.','Implicit conversions, invalid/null values and assuming static types validate external data.','Test normal, boundary and invalid values; inspect diagnostics before adding casts.'],
 text:['Text processing crosses representation boundaries: characters, bytes, encodings and formats are not interchangeable.','Follow data from input through parsing/normalization to output.','Malformed encoding, whitespace surprises, escaping mistakes and treating input as trusted markup.','Test empty text, Unicode, malformed input and strings containing delimiters.'],
 control:['Control flow determines which branches execute and how often repeated work occurs.','Write the condition in plain language and trace the smallest, typical and boundary inputs.','Off-by-one bounds, unreachable branches, missing default handling and non-terminating loops.','Test immediately below, at and above each threshold.'],
 functions:['A function defines a contract for inputs, outputs, side effects and failure behavior.','Trace arguments into local state, follow each branch and identify what the caller receives.','Hidden state changes, unclear return semantics and unhandled failures.','Test each return path and invalid input independently.'],
 collections:['Collection choice encodes ordering, uniqueness, lookup and mutation semantics.','Choose the data structure from the operations and invariants the program must preserve.','Unexpected aliasing, duplicate handling, mutation during iteration and repeated scans.','Test empty, singleton, duplicate and large inputs.'],
 memory:['Memory/resource safety depends on lifetime, ownership, bounds and cleanup on every exit path.','Identify who owns each resource, when it is valid and which operation releases or transfers it.','Use-after-free, leaks, invalid references, double cleanup and unchecked sizes.','Test failure paths and use language diagnostics or sanitizers where available.'],
 oop:['A good type protects domain invariants and exposes behavior through a narrow contract.','Identify state, allowed transitions, public operations and collaborators.','God objects, mutable internals and invalid states that callers can construct.','Test valid and forbidden state transitions.'],
 async:['Asynchronous execution introduces ordering, cancellation, backpressure and shared-state concerns.','Track task ownership, awaited operations, timeout behavior and error propagation.','Unbounded work, data races, detached tasks, swallowed cancellation and deadlocks.','Test timeout, cancellation, concurrent access and shutdown.'],
 database:['Database correctness depends on query semantics, constraints, transaction boundaries and measured query plans.','Define row grain and trace filtering/joining/grouping or the write transaction.','NULL/duplicate semantics, partial updates, injection and dialect assumptions.','Test empty/duplicate data, failed transactions and concurrent changes.'],
 http:['Network boundaries are fallible and must define validation, timeouts, status/error behavior and data contracts.','Trace request construction, transport result, status, parsing and validation.','No timeout, malformed payload, missing status checks and unsafe retries.','Test timeout, non-success status, invalid body and unauthorized access.'],
 security:['Security depends on explicit trust boundaries, least privilege and server-side enforcement.','Mark untrusted values, the acting principal, required permission and exposed data.','Client-only checks, secrets in logs, injection and missing object-level checks.','Test allowed/denied paths, malformed input and secret redaction.'],
 testing:['Tests and diagnostics provide evidence; optimization needs repeatable workloads.','State the invariant, create a minimal test and retain a regression case.','Happy-path-only tests, flaky fixtures and treating one clean run as proof.','Automate deterministic tests and record workload/tool versions for performance claims.'],
 files:['External resources and modules need explicit ownership, paths, configuration and failure handling.','Follow the resource lifecycle from acquisition through operation to cleanup.','Leaked handles, path assumptions, partial writes and hidden setup requirements.','Test missing/empty/large input, permission failures and clean setup.'],
 analytics:['Analytical correctness depends on grain, grouping keys, NULL semantics and the question the metric must answer.','Define one output row’s grain and reconcile a small hand-calculated dataset.','Double counting from joins, incorrect grouping and confusing row-level with window results.','Test duplicates, missing values, boundary dates and totals manually.'],
 general:['Reliable engineering connects a precise concept model to observable behavior and explicit failure handling.','Predict the result, run the smallest example and change one input at a time.','Untested assumptions, unclear edge behavior and hidden dependencies.','Verify ordinary, boundary and failure inputs.']
 }[c];
 const points=Array.isArray(topic.keyPoints)?topic.keyPoints:[];
 const edgeMap={
  html:['Test keyboard-only navigation through every interactive element.','Test forms with empty, malformed and valid values.','Inspect alternative text and semantic landmarks with accessibility tools.','Test narrow viewports and malformed or untrusted content.'],
  css:['Test at narrow, medium and wide viewports.','Test long text, empty content and enlarged browser text.','Verify visible keyboard focus and sufficient contrast.','Enable reduced-motion preferences and check layout overflow.'],
  setup:['Run from a clean checkout with the documented runtime version.','Check execution from the intended working directory and with required dependencies absent.','Test invalid command-line arguments and missing environment settings.','Confirm the result is reproducible in CI, not only in an IDE.'],
  types:['Test zero, negative, maximum and out-of-range values.','Check null/None/nil/undefined or missing fields where the language allows them.','Test conversions that may lose precision or change signedness.','Verify external JSON/database values before trusting the declared type.'],
  text:['Test empty strings, whitespace-only strings and embedded delimiters.','Include Unicode and non-ASCII characters.','Test malformed encoding or malformed structured text.','Verify escaping at the destination context: SQL, HTML, shell or JSON.'],
  control:['Test values immediately below, at and above each condition threshold.','Test an empty collection and a one-element collection.','Check loop termination for values that never meet the usual condition.','Exercise every branch, including default/else/error branches.'],
  functions:['Test each return path and invalid arguments.','Check whether exceptions/errors propagate or are converted intentionally.','Verify that calling the function twice does not create unintended state changes.','Test boundary values for parameters and return values.'],
  collections:['Test empty and singleton collections.','Test duplicates, ordering and key collisions.','Test mutation while iterating and aliasing between references.','Measure large inputs to reveal quadratic scans or unnecessary copies.'],
  memory:['Test allocation or resource acquisition failure.','Exercise early returns and exceptions to verify cleanup.','Check use-after-free/dangling references and ownership transfer.','Use sanitizers or leak tools where the language/toolchain supports them.'],
  oop:['Try invalid state transitions as well as valid ones.','Check invariants after repeated updates and partial failures.','Test substitutability for interface/base implementations.','Verify mutable state cannot bypass required validation.'],
  async:['Simulate slow dependencies and timeout expiration.','Cancel work while it is in progress and confirm cleanup.','Test concurrent updates and race conditions.','Verify shutdown drains or cancels in-flight work within a bound.'],
  database:['Test NULL, duplicate keys and empty result sets.','Force one write in a transaction to fail and verify rollback.','Test concurrent updates to the same logical record.','Inspect query plans and verify join cardinality does not inflate totals.'],
  http:['Test timeout, DNS/network failure and non-success HTTP status.','Test malformed JSON and a valid payload with an invalid schema.','Test unauthorized and forbidden requests separately.','Verify retries do not duplicate non-idempotent writes.'],
  security:['Test anonymous, authenticated-but-forbidden and authorized requests.','Try changing an object ID or tenant ID to access another user’s data.','Use malformed input and markup-like strings at every trust boundary.','Verify secrets and private fields are absent from logs and public errors.'],
  testing:['Run the test on a clean environment and with deterministic fixtures.','Test the known failure before and after the fix.','Benchmark representative input sizes and record the environment.','Check that a failing assertion makes CI fail instead of merely printing output.'],
  files:['Test missing, empty, unreadable and unexpectedly large files.','Test partial read/write and malformed records.','Verify cleanup after an error and after an early return.','Run with a different working directory and restrictive permissions.'],
  analytics:['Test duplicate join keys and reconcile row counts before/after joins.','Check NULL values and groups with no matching rows.','Test adjacent date windows and timezone boundaries.','Verify a small result manually to confirm the intended grain and metric.']
 }[c]||['Test missing input.','Test boundary values.','Force a failure.','Repeat the operation and compare state.'];
 const scenarios={
  html:'Accessible content pages, forms, product documentation, learning resources and search-friendly web documents rely on semantic HTML.',
  css:'Responsive dashboards, forms, navigation, cards and design systems rely on predictable layout, tokens and accessible interaction states.',
  setup:'New repositories, developer workstations, CI runners and deployment images must use the same documented commands and versions.',
  types:'API requests, database records and configuration values must be validated before business logic relies on their types.',
  text:'Text appears in logs, CSV/JSON imports, web forms and protocol payloads; encoding and escaping must match the destination.',
  control:'Validation workflows and business rules rely on branches and loops to handle every allowed and rejected state.',
  functions:'Service methods and reusable utilities should expose a stable contract that can be tested without unrelated I/O.',
  collections:'Deduplication, lookup, aggregation and batching depend on choosing a structure with the correct ordering and uniqueness semantics.',
  memory:'Resource-heavy services, native integrations and systems components must make lifetime and cleanup behavior explicit.',
  oop:'Domain models and services should protect valid states while keeping persistence and presentation concerns behind interfaces.',
  async:'Web requests, background jobs and mobile/network tasks must handle timeouts, cancellation and concurrent state changes.',
  database:'Transactional business operations must preserve invariants across related reads and writes while remaining measurable.',
  http:'API clients and server handlers must validate contracts, bound waiting time and report failures consistently.',
  security:'Authentication, authorization, safe output and least privilege must be enforced at server-side trust boundaries.',
  testing:'CI pipelines, regression suites and performance checks turn assumptions into repeatable evidence.',
  files:'Batch imports, configuration loading and scheduled jobs need reliable paths, cleanup and partial-failure handling.',
  analytics:'Reporting pipelines need correct row grain, joins, null semantics and time windows before interpreting business metrics.',
  general:'Apply the concept at a clearly defined boundary, document assumptions and verify normal, boundary and failure behavior.'
 };
 const production={
  html:'Use semantic elements, unique IDs, meaningful labels and alt text; validate markup and keep untrusted data out of executable HTML contexts.',
  css:'Use responsive constraints and design tokens, preserve focus styles, check contrast, respect reduced motion and remove debug rules.',
  setup:'Pin supported tool/runtime versions, document clean setup, validate configuration at startup and run build/tests in CI.',
  types:'Validate external data at runtime, define nullability/range rules and avoid unchecked conversions at trust boundaries.',
  text:'Specify encoding, validate input size, escape for the output context and avoid parsing structured data with ad hoc string matching.',
  control:'Keep branches exhaustive, bound loops and test every decision boundary to prevent silent logic gaps.',
  functions:'Document inputs, outputs and side effects; preserve error context and keep business rules independently testable.',
  collections:'Choose structures based on access patterns and data volume; check duplicate behavior, mutation semantics and memory cost.',
  memory:'Make ownership and cleanup explicit, handle acquisition failure and use available static/dynamic diagnostics.',
  oop:'Keep invariants in one place, minimize mutable public state and define contracts for interfaces and state transitions.',
  async:'Bound concurrency and queues, set timeouts, propagate cancellation and make shutdown behavior explicit.',
  database:'Use parameterized queries, constraints, short transactions and measured plans; test rollback and concurrent updates.',
  http:'Set timeouts and body limits, validate payloads, check status codes and use bounded retries only when safe.',
  security:'Use least privilege, secure secret storage, server-side authorization and redacted logs; test denied access.',
  testing:'Automate unit/integration checks, retain regression cases and benchmark only representative workloads.',
  files:'Check I/O results, use explicit encodings and paths, clean up resources and handle permissions and partial writes.',
  analytics:'Document metric definitions and SQL dialect, verify query grain and reconcile aggregates against known data.',
  general:'Document the contract, validate inputs, preserve useful error context and add automated tests before shipping.'
 };
 function explainPoint(point) {
  const q=String(point).toLowerCase();
  let detail='This point is a specific rule for '+topic.title.toLowerCase()+'. '+rules[0]+' Verify it with a small example and state the expected result before running the code.';
  if(/input|parse|validat|external|user|request|payload/.test(q)) detail='Boundary rule: '+point+' For '+topic.title.toLowerCase()+', reject malformed or out-of-range input before it can alter state.';
  else if(/type|null|none|nil|undefined|convert|cast|overflow/.test(q)) detail='Type rule: '+point+' Check the exact value representation, missing-value behavior and any conversion that could lose information.';
  else if(/error|exception|fail|return|result|status/.test(q)) detail='Failure contract: '+point+' Decide what the caller receives on failure and preserve enough context to diagnose it.';
  else if(/test|debug|assert|benchmark|profile/.test(q)) detail='Verification rule: '+point+' Turn this into an assertion or repeatable diagnostic rather than relying on visual inspection.';
  else if(/security|secret|permission|auth|escape|injection|password/.test(q)) detail='Security boundary: '+point+' Treat external data as untrusted and enforce permissions on the server, not only in the UI.';
  else if(/memory|pointer|ownership|resource|free|close|lifetime|allocation/.test(q)) detail='Lifetime rule: '+point+' Identify the owner, valid lifetime and cleanup path, including early return and failure.';
  else if(/sql|query|join|transaction|database|index|schema|row/.test(q)) detail='Data rule: '+point+' Check row cardinality, NULL behavior, transaction boundaries and the actual query plan where relevant.';
  else if(/loop|condition|branch|iteration|range/.test(q)) detail='Control-flow rule: '+point+' Trace the first iteration, boundary iteration and stopping condition to detect off-by-one errors.';
  else if(/array|list|map|set|collection|slice|dict|vector/.test(q)) detail='Collection rule: '+point+' Check ordering, duplicates, empty input, mutation and the cost of repeated lookup.';
  else if(/async|await|thread|concurr|cancel|channel|coroutine/.test(q)) detail='Concurrency rule: '+point+' Check task ownership, shared state, cancellation and bounded resource usage.';
  return detail;
 }
 return {concept:lang.name+' — '+topic.title+': '+(topic.definition||'')+' Treat this topic as a contract: identify inputs, rules, output/state changes and possible failure outcomes.',why:rules[0],model:rules[1],mistakes:rules[2],verification:rules[3],concepts:points.map(point=>({point,detail:explainPoint(point)})),edges:edgeMap,realWorld:scenarios[c]||scenarios.general,production:production[c]||production.general,source:DOCS[lang.id]||lang.docs};
}
function lineWalk(code,title,name) {
 return String(code||'').split('\n').filter(x=>x.trim()).map((line,i)=>({line,explanation:i===0?'Identify how this statement participates in '+title.toLowerCase()+': declaration, input, transformation, control flow, resource access or output.':'Trace this line using values created earlier. Check '+name+' type, scope, mutation and failure rules; predict the result before running it.'}));
}
function buildDive(lang,topic,index) {
 const p=profile(lang,topic), first=(topic.basicExamples||[])[0]||(topic.guidedExamples||[])[0]||null, code=first?first.code:((topic.advancedExamples||[])[0]||{}).code||'';
 const lines=first&&first.lineByLine&&first.lineByLine.length?first.lineByLine:lineWalk(code,topic.title,lang.name);
 return {learningObjectives:['Explain '+topic.title.toLowerCase()+' and identify the problem it solves.','Trace the supplied '+lang.name+' example and predict its output or state change.','Choose behavior for empty, boundary and invalid inputs.','Identify trade-offs, failure modes and a suitable testing strategy.','Apply the concept in a small, testable feature.'],prerequisites:[index>0?lang.topics[index-1].title:'the language runtime, project setup and basic program structure'],coreConcept:p.concept,whyItMatters:p.why,mentalModel:p.model,conceptBreakdown:p.concepts,workedExample:first?{title:first.title,code:first.code,explanation:first.note||first.explanation||'This example demonstrates '+topic.title.toLowerCase()+' in '+lang.name+'.',lineByLine:lines}:null,stepByStep:[{heading:'Define the contract',text:'State what '+topic.title.toLowerCase()+' receives, what it must do, what it returns or changes, and which assumptions are valid.'},{heading:'Trace the example',text:'Read from top to bottom. Record important values before and after each operation and identify the statement that determines the result. Add only required imports or declarations if the snippet is a fragment.'},{heading:'Test boundaries',text:p.edges[0]+' '+p.edges[1]},{heading:'Handle failure',text:p.mistakes+' '+p.verification},{heading:'Refactor and verify',text:'Run the example using the supported '+lang.name+' toolchain, add assertions for intended behavior and refactor only after tests describe the contract.'}],commonMistakes:[p.mistakes].concat((topic.keyPoints||[]).filter(x=>/avoid|never|careful|must|do not|don't|not assume|check/i.test(x)).slice(0,3)),edgeCases:p.edges,debuggingChecklist:['Reproduce the issue with the smallest failing input.','Read the first meaningful diagnostic; later errors may be consequences.','Inspect input shape, types, nullability, bounds and assumptions.','Add a regression test for the exact failure before refactoring.','Run topic tests and project checks again after the fix.'],realWorldScenario:p.realWorld,performanceSecurity:p.production,practiceLab:{task:(topic.practice||[])[0]?.question||'Build a small feature demonstrating '+topic.title.toLowerCase()+'.',steps:['Write the smallest correct implementation.','Test a normal case, boundary case and failure case.','Compare the implementation with one alternative.','Document what should be monitored or validated before production.'],reviewQuestions:(topic.practice||[]).slice(0,4).map(q=>q.question)},interviewGuide:{questions:(topic.interview||[]).slice(0,5).map(q=>q.question),answerFramework:['Define the concept precisely.','Explain the mechanism and relevant language rule.','Walk through a small example.','Discuss one trade-off and one failure case.']},verification:p.verification,officialReference:{label:'Official '+lang.name+' documentation',url:p.source}};
}
function makeQuestion(title,lang,kind,n,p) {
 const cases=['an empty input','a boundary condition','a failed operation','a duplicate operation'];
 return {question:(kind==='practice'?'For ':'Explain ')+title.toLowerCase()+(kind==='practice'?' how you would handle '+cases[n%cases.length]:' and discuss '+['the contract and use case','the most important edge case','how to test it','the production trade-off'][n%4]),hint:p.verification,answer:p.why+' '+p.mistakes+' Implement the smallest correct behavior, validate at the boundary and test normal, boundary and failure cases using the '+lang.name+' toolchain.'};
}
function makeTopic(lang,meta,number) {
 const topic={id:lang.id+'-'+number,title:meta[0],level:number<=4?'Beginner':number<=8?'Intermediate':'Advanced',definition:meta[1]+' The engineering contract should specify inputs, output/state changes, failure outcomes and caller assumptions.',analogy:'Think of '+meta[0].toLowerCase()+' as a documented workflow: each step has a purpose, inputs have rules and failure must be visible.',keyPoints:[meta[1],'Why it matters: this concept makes application behavior easier to reason about and test.','Correctness: validate values at the boundary before changing state.','Failure handling: '+meta[3],'Testing: cover ordinary, boundary and failure cases.','Practice: '+meta[4]],intro:['Learning objective: understand '+meta[0].toLowerCase()+' in '+lang.name+' and apply it in a testable feature.',meta[1],'Test what happens when inputs are missing, malformed, duplicated, oversized or unavailable.','Run the example in the supported toolchain and verify behavior against the official reference.'],body:[{heading:'Concept and contract',text:meta[1]},{heading:'How the example works',text:'Trace declarations, inputs, state changes and outputs. Identify where failure can occur and what the caller observes.'},{heading:'Failure modes and edge cases',text:meta[3]},{heading:'Production considerations',text:'Choose the simplest implementation that satisfies the contract. Consider readability, correctness, resource limits, security and observability.'},{heading:'Testing strategy',text:meta[4]+' Add regression tests for normal, boundary and failure behavior.'}],basicExamples:[{title:'Core example',code:meta[2],lineByLine:lineWalk(meta[2],meta[0],lang.name)}],guidedExamples:[],advancedExamples:[],practice:[],interview:[]};
 const p=profile(lang,topic);for(let i=0;i<6;i++)topic.practice.push(makeQuestion(topic.title,lang,'practice',i,p));for(let i=0;i<5;i++)topic.interview.push(makeQuestion(topic.title,lang,'interview',i,p));topic.deepDive=buildDive(lang,topic,lang.topics.length);return topic;
}
function enrichCurriculum(data) {
 if(!data||!Array.isArray(data.languages)||data.__codeAtlasEnriched)return data;
 const addedTrackIds=[];
 [...(window.CodeAtlasAdditionalTracks||[]),...(window.CodeAtlasAdditionalTracksB||[])].forEach(track=>{if(data.languages.some(lang=>lang.id===track.id))return;const lang={id:track.id,name:track.name,color:track.color,purpose:track.purpose,docs:track.docs,topics:[]};track.topics.forEach((meta,index)=>lang.topics.push(makeTopic(lang,meta,index+1)));lang.isNewTrack=true;data.languages.push(lang);addedTrackIds.push(track.id);});
 data.languages.forEach(lang=>{
  const existing=lang.topics.length;
  const isNewTrack=!!lang.isNewTrack;
  lang.topics.forEach((topic,index)=>{
   const p=profile(lang,topic);topic.deepDive=buildDive(lang,topic,index);
   topic.definition=(topic.definition||'')+'\n\nDeeper explanation: '+p.why+' '+p.model+' '+p.mistakes+' Apply the concept to the provided example and test relevant edge cases.';
   const intro=Array.isArray(topic.intro)?topic.intro:[];
   topic.intro=intro.concat(['Learning objective: explain '+topic.title.toLowerCase()+' in '+lang.name+' and apply it in a testable feature.','Why it matters: '+p.why,'Mental model: '+p.model,'Verification: '+p.verification]);
   const body=Array.isArray(topic.body)?topic.body:[];
   const extra=[{heading:'Concept model and design intent',text:p.why+' '+p.model},{heading:'Execution walkthrough',text:'Trace the example for '+topic.title.toLowerCase()+', identify inputs and state changes, and predict the output. '+p.verification},{heading:'Common failures and edge cases',text:p.mistakes+' '+p.edges.slice(0,2).join(' ')},{heading:'Production considerations',text:'Validate inputs, define failure behavior, bound resource use and add useful non-sensitive diagnostics.'},{heading:'Testing and practice',text:(topic.practice||[])[0]?.question||'Build a small example, then test normal, boundary and failure behavior.'}];
   const have=new Set(body.map(x=>x.heading));topic.body=body.concat(extra.filter(x=>!have.has(x.heading)));
   topic.keyPoints=Array.isArray(topic.keyPoints)?topic.keyPoints:[];topic.keyPoints.push('Edge-case discipline: '+p.edges[0]+' '+p.edges[1],'Production verification: '+p.verification);
   topic.practice=Array.isArray(topic.practice)?topic.practice:[];while(topic.practice.length<6)topic.practice.push(makeQuestion(topic.title,lang,'practice',topic.practice.length,p));
   topic.interview=Array.isArray(topic.interview)?topic.interview:[];while(topic.interview.length<5)topic.interview.push(makeQuestion(topic.title,lang,'interview',topic.interview.length,p));
  });
  ((window.CodeAtlasMissingTopics||{})[lang.id]||[]).forEach(meta=>lang.topics.push(makeTopic(lang,meta,lang.topics.length+1)));
  lang.coverageAudit={existingTopicsReviewed:isNewTrack?0:existing,newTopicsAdded:isNewTrack?existing:lang.topics.length-existing,isNewTrack,topicSpecificDeepDive:true,reviewAreas:['prerequisites','concept model','worked example','common mistakes','edge cases','debugging','real-world use','testing','security/performance','practice','interview preparation','official documentation'],officialReference:DOCS[lang.id]||lang.docs};
 });
 data.__codeAtlasEnriched=true;return data;
}
function renderLesson(lang,topic,index) {
 if(!topic)return '';const d=topic.deepDive||buildDive(lang,topic,index||0);
 const ul=items=>'<ul>'+items.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>';
 const sections=d.stepByStep.map(x=>'<section class="lesson-section"><h4>'+esc(x.heading)+'</h4><p>'+esc(x.text)+'</p></section>').join('');
 const concepts=(d.conceptBreakdown||[]).map(x=>'<li><strong>'+esc(x.point)+'</strong><p>'+esc(x.detail)+'</p></li>').join('');
 const ex=d.workedExample?'<h4>Worked example: '+esc(d.workedExample.title)+'</h4><p>'+esc(d.workedExample.explanation)+'</p><pre><code>'+esc(d.workedExample.code)+'</code></pre><ol>'+d.workedExample.lineByLine.map(x=>'<li><code>'+esc(x.line)+'</code><p>'+esc(x.explanation)+'</p></li>').join('')+'</ol>':'';
 const lab=d.practiceLab||{},guide=d.interviewGuide||{};
 return '<section class="lesson-section comprehensive-lesson" id="deep-study"><h3>Complete topic study guide</h3><p><strong>Core concept:</strong> '+esc(d.coreConcept)+'</p><p><strong>Why it matters:</strong> '+esc(d.whyItMatters)+'</p><p><strong>Mental model:</strong> '+esc(d.mentalModel)+'</p><h4>Learning objectives</h4>'+ul(d.learningObjectives)+'<h4>Prerequisites</h4>'+ul(d.prerequisites)+'<h4>Concept-by-concept breakdown</h4><ul>'+concepts+'</ul>'+ex+'<h4>Step-by-step reasoning</h4>'+sections+'<h4>Common mistakes</h4>'+ul(d.commonMistakes)+'<h4>Edge cases to test</h4>'+ul(d.edgeCases)+'<h4>Debugging checklist</h4>'+ul(d.debuggingChecklist)+'<h4>Real-world application</h4><p>'+esc(d.realWorldScenario)+'</p><h4>Production, performance and security</h4><p>'+esc(d.performanceSecurity)+'</p><h4>Practice lab</h4><p><strong>Task:</strong> '+esc(lab.task||'')+'</p>'+ul(lab.steps||[])+'<h4>Review questions</h4>'+ul(lab.reviewQuestions||[])+'<h4>Interview preparation</h4>'+ul(guide.questions||[])+'<p><strong>Answer framework</strong></p>'+ul(guide.answerFramework||[])+'<h4>Verification checklist</h4><p>'+esc(d.verification)+'</p><p><a class="resource-link" href="'+esc(d.officialReference.url)+'" target="_blank" rel="noreferrer">'+esc(d.officialReference.label)+' ↗</a></p></section>';
}
window.CodeAtlasComprehensiveStudy={enrichCurriculum,renderLesson};
})();