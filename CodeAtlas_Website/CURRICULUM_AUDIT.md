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
