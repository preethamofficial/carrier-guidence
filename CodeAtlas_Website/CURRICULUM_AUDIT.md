# CodeAtlas Curriculum Audit and Expansion

**Audit scope:** 14 language paths, 168 original topic records, topic rendering, examples, practice/interview content, and missing concept coverage.

## Baseline findings

- The curriculum initially contained **14 languages × 12 topics = 168 topics**.
- The eight paths Python, JavaScript, TypeScript, Java, SQL, Go, Rust and C# had no dedicated `body` walkthrough sections in their topic records. Their lessons relied mostly on short definitions, key points, examples, practice prompts and interview questions.
- The six paths C, C++, PHP, Kotlin, Swift and Bash had short walkthrough sections, but lacked interview-question sets in the source curriculum.
- Existing content was uneven: some topics had multiple worked examples and interview prompts; others depended on short snippets or general explanations.
- The former supplemental renderer selected content by language/index and fell back to generic explanations for most languages. This was not a reliable topic-by-topic learning model.

## Changes made

1. Added a topic-specific study-guide engine that consumes each topic's own title, definition, key points, examples, practice questions and interview questions.
2. Added prerequisite context, concept breakdowns, worked-example line walkthroughs, common mistakes, edge cases, debugging steps, real-world context, production/security considerations, practice labs, interview frameworks and official documentation links.
3. Added four missing concepts to every language path, expanding the runtime curriculum from **168 to 224 topics**.
4. Added a visible **Curriculum coverage audit** section to each language overview so learners can see which additional topics were added.
5. Connected the additional-language page to the same canonical curriculum and made its topic counts/progress controls dynamic.
6. Updated offline caching and automated checks to cover the new scripts and verify that every expanded topic has a study guide, edge cases, practice prompts and interview questions.

## New topic coverage by language

| Language | Added topics |
|---|---|
| Python | Decorators and function composition; type hints, dataclasses and validation; HTTP clients, JSON and timeouts; database access and transaction boundaries |
| JavaScript | Closures, lexical scope and `this`; prototypes and classes; browser storage and session security; automated tests and accessibility |
| TypeScript | Runtime validation; strict nullability and exhaustive states; public package APIs and declaration contracts; secure HTTP clients and error modeling |
| Java | Concurrency and executors; JDBC and transactions; HTTP/REST contracts; authentication and authorization |
| SQL | NULL semantics and CASE; recursive CTEs; date/time zones; database permissions and least privilege |
| Go | Error wrapping; generics and constraints; HTTP middleware and timeouts; fuzzing, benchmarking and profiling |
| Rust | Macros; unsafe Rust and FFI; serialization and API boundaries; property testing and dependency audits |
| C# | Dependency injection and ASP.NET Core; Entity Framework Core and migrations; identity and authorization; integration testing and telemetry |
| C | Preprocessor and headers; bitwise flags; undefined behavior and aliasing; Make, linking and reproducible builds |
| C++ | Move semantics; ranges and views; futures and asynchronous work; serialization, protocol boundaries and sanitizers |
| PHP | Composer autoloading; REST APIs and JSON validation; queues and idempotent jobs; production logging and deployment |
| Kotlin | Flow and StateFlow; dependency injection; Room migrations and offline consistency; Compose accessibility and UI tests |
| Swift | ARC and retain cycles; Codable and API validation; Keychain and privacy; Instruments and performance diagnostics |
| Bash | Positional arguments and safe expansion; exit codes and cleanup traps; JSON processing with jq; cron/timers and job observability |

## Validation

GitHub Actions checks JavaScript syntax, local assets, JSON and the static test suite. The curriculum test runs the enrichment engine and verifies **224 unique runtime topics**, 16 topics per language, a coverage audit for each language, and a deep guide with edge cases, practice and interview questions for every topic.

## Reference policy

Each lesson links to official language documentation. Use the language's official reference to confirm version-specific syntax and behavior; SQL examples explicitly call out dialect-specific syntax where applicable. Examples that require surrounding imports, declarations, project setup or a database schema are learning fragments and should be run in the appropriate toolchain before reuse.


## Follow-up expansion: web foundations and engineering tracks (October 2026)

The learning map now includes **24 tracks and 344 runtime topics**. The original 14 language paths have 16 topics each (224 topics); 10 new tracks add 120 topics (12 each). New tracks are HTML, CSS, React, Node.js, Dart & Flutter, Git & GitHub, Data Structures & Algorithms, REST APIs, Docker & DevOps, and Linux & Shell.

HTML covers document structure, semantics, navigation, images/alt text, forms, tables, media, metadata, ARIA, security boundaries and validation. CSS covers the cascade, box model, typography, Flexbox, Grid, responsive design, positioning, design tokens, motion, focus/accessibility, architecture and debugging. Framework and engineering tracks cover components/state/hooks/routing, Node runtime/HTTP/database/security/deployment, Dart/Flutter widgets/state/layout/networking, version-control collaboration, algorithmic patterns, HTTP contracts, containers/CI/CD, and Linux operations.

All tracks are registered through the same curriculum enrichment engine, expose a visible coverage audit, and are included in the language library, offline cache and runtime tests. The runtime test checks the total topic count, unique IDs, guide sections, edge cases, practice and interview prompts. Examples remain instructional; verify version-specific syntax and execute examples in the appropriate toolchain before production use.


## Follow-up expansion: beginner-first career roadmap lessons (October 2026)

A review of the 41-role career-roadmap lesson renderer found that every role had the same ten lesson sections, but several foundational concepts could still resolve to a role-level fallback instead of a concept-specific explanation. The lesson engine now includes additional authored profiles for variables and types, conditionals, loops, collections, object-oriented programming, Git/version control, testing, debugging, JSON/serialization, data structures and algorithms, environment setup, networking, machine-learning fundamentals, and requirements/acceptance criteria. These profiles provide a plain-language definition, prerequisites, ordered learning steps, a worked code or command example, output reasoning, a practice task, a model solution and an advanced extension. Code examples now have a copy control with a non-Clipboard-API fallback, and the offline cache version was bumped so browsers can receive the updated assets.

**Coverage note:** the 41-role roadmap contains 492 topic placements. Shared concept profiles now give more of the foundational topics genuinely topic-specific instruction, while other specialist topics still use the existing role/domain-aware fallback. The automated renderer test checks the lesson structure across all 492 placements; it does not prove that every topic is a separately authored textbook chapter or that every code fragment runs without the project-specific setup described in its lesson. Continue expanding specialist profiles and run manual browser checks alongside automated tests.
