# CodeAtlas curriculum audit: depth, gaps, and source-of-truth plan

## Scope and audit method

The unified curriculum currently contains 14 language paths with 12 topic cards per path (168 existing topic IDs). This audit distinguishes three kinds of gaps:

- **Depth gap:** a card exists, but the explanation, examples, edge cases, practice, or interview material is generic or too brief.
- **Coverage gap:** a language concept deserves a dedicated topic but is absent or only touched indirectly in the current 12-card path.
- **Verification gap:** code is illustrative or version-sensitive and needs a stated runtime/compiler version and testable expected result.

The topic-depth-lessons.js file provides individually authored deep lesson notes for each of the 168 existing topic IDs. Existing definitions, examples, practice prompts and progress keys remain in place. This register identifies the next curriculum expansions instead of silently changing existing topic IDs.

## Language-by-language gap register

### Python
**Current path:** setup; types; strings; conditionals; loops; functions; collections; errors/files/modules; OOP; collection transformations; iterators/generators/async basics; testing/debugging/environments.

**Underrepresented concepts:** decorators and closure-based wrappers; context-manager protocol and custom context managers; typing with Protocol, generics and TypedDict; packaging/build backends and publishing; concurrency choices (threads, processes, asyncio and implementation-specific GIL behavior); HTTP/API design and authentication boundaries; profiling and memory analysis.

**Required depth:** distinguish language guarantees from CPython details; test mutable defaults, aliasing, exceptions, empty data and cancellation; label library/version requirements.

**Official references:** https://docs.python.org/3/tutorial/ and https://docs.python.org/3/library/

### JavaScript
**Current path:** runtime/setup; types/equality; control flow; functions/scope; arrays/objects; DOM; spread/destructuring; promises/fetch; events/forms; modules/tooling; async patterns; DOM mini-project.

**Underrepresented concepts:** prototype chain and property descriptors; this binding and call/apply/bind; closures and lexical environment; event loop, tasks and microtasks; iterators/generators; regular expressions and internationalization; browser storage/security boundaries; accessibility, tests and performance profiling.

**Required depth:** separate ECMAScript behavior from browser and Node APIs; explain promise rejection and HTTP status handling; cover safe DOM rendering and listener lifecycle.

**Official references:** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference

### TypeScript
**Current path:** compiler; core types; unions/narrowing; functions; interfaces/type aliases; generics; classes; utility types; async types; advanced types; modules/config; mini-app.

**Underrepresented concepts:** runtime schema validation; declaration files and typed-library publishing; module resolution across Node and bundlers; JavaScript interoperability and migration; variance and assignability; compiler diagnostics and project references; runtime testing of typed code.

**Required depth:** explicitly teach type erasure, unknown versus any, type assertions versus validation, strict compiler settings, and why type-check success does not guarantee runtime correctness.

**Official references:** https://www.typescriptlang.org/docs/handbook/ and https://www.typescriptlang.org/tsconfig/

### Java
**Current path:** JDK; types; control flow/arrays; methods; classes; strings/ArrayList; inheritance; interfaces/exceptions/packages; collections/generics; I/O; lambdas/streams/Optional; modern Java types.

**Underrepresented concepts:** JVM memory model and garbage collection; concurrency/executors and synchronization; testing and mocking; Maven/Gradle lifecycle; JDBC transactions and connection pools; HTTP APIs and serialization; security; profiling and observability.

**Required depth:** label Java-version requirements; distinguish overload selection from virtual dispatch; teach equals/hashCode, exception propagation, stream laziness and resource closure with runnable tests.

**Official references:** https://dev.java/ and https://docs.oracle.com/en/java/

### SQL
**Current path:** database basics; SELECT/filter/sort; aggregation; joins; subqueries/CTEs; windows; schema/normalization; mutations; transactions; indexes/plans; views/procedures; analytics.

**Underrepresented concepts:** NULL and three-valued logic; constraints and referential actions; logical query processing and set operations; date/time zones and temporal data; permissions and row-level security; migrations/schema evolution; recursive CTEs; database dialect differences; cardinality estimates and locking behavior.

**Required depth:** state the SQL dialect for each example; define table grain and join cardinality; test NULLs, duplicates, empty sets and ties; explain EXPLAIN estimates versus actual execution.

**Official references:** https://www.postgresql.org/docs/current/tutorial.html and https://www.postgresql.org/docs/current/sql.html

### Go
**Current path:** toolchain/modules; types; control flow; collections; functions/errors; structs/pointers/interfaces; goroutines/channels; embedding; concurrency patterns; HTTP/JSON/data; tests; production patterns.

**Underrepresented concepts:** escape analysis and allocation profiling; memory model and race patterns; generics in realistic APIs; fuzzing and coverage; reflection and code generation; database migrations/transactions; authorization; configuration and observability; graceful shutdown under partial failure.

**Required depth:** make cancellation and goroutine ownership explicit; show nil-interface traps; demonstrate error wrapping and HTTP timeouts with tests.

**Official references:** https://go.dev/doc/ and https://go.dev/ref/spec

### Rust
**Current path:** Cargo; types/control flow; ownership/borrowing; structs/enums; collections; errors; traits/generics; iterators/closures; trait bounds/lifetimes; concurrency/async; smart pointers; capstone.

**Underrepresented concepts:** unsafe Rust and safety contracts; macros; FFI and ABI boundaries; pinning and async runtime choices; interior mutability trade-offs; Cargo features/workspaces; property testing/fuzzing; profiling; serialization and API boundaries.

**Required depth:** distinguish language guarantees from library conventions; explain moves, borrows, lifetimes, Send/Sync, cancellation and panic behavior with compile-tested examples.

**Official references:** https://doc.rust-lang.org/book/ and https://doc.rust-lang.org/reference/

### C#
**Current path:** .NET setup; types; flow/arrays; methods; collections/LINQ; classes; inheritance; interfaces/errors/files; async; delegates/events/LINQ; file I/O; app capstone.

**Underrepresented concepts:** CLR/JIT/GC and allocation; generics and variance; dependency injection/configuration; ASP.NET Core request pipeline; Entity Framework Core and migrations; authentication/authorization; resilient HTTP and cancellation; tests/mocking; logging/metrics/tracing; profiling.

**Required depth:** explain deferred LINQ execution, Task cancellation and exception propagation; separate C# language features from framework APIs and target-framework requirements.

**Official references:** https://learn.microsoft.com/en-us/dotnet/csharp/ and https://learn.microsoft.com/en-us/dotnet/core/

### C
**Current path:** toolchain; types; control flow; functions/scope; arrays/strings; pointers; dynamic memory; structs/enums; files; data structures; debugging/sanitizers; capstone.

**Underrepresented concepts:** preprocessor and macro hazards; undefined, unspecified and implementation-defined behavior; integer promotions and aliasing rules; ABI/calling conventions; atomics and memory ordering; POSIX process/thread APIs; binary serialization; static analysis/fuzzing; embedded constraints.

**Required depth:** distinguish standard guarantees from compiler/platform behavior; show sanitizer-based diagnosis; test allocation failure, integer overflow, ownership cleanup and string bounds.

**Official references:** https://learn.microsoft.com/en-us/cpp/c-language/ and https://en.cppreference.com/w/c

### C++
**Current path:** modern toolchain; types/value semantics; control flow; classes; RAII; STL; smart pointers; templates; errors; concurrency; testing/CMake; capstone.

**Underrepresented concepts:** ranges and views; concepts in API design; modules and build support; coroutines and executors; allocator/memory-resource design; ABI/ODR/linkage; atomic memory order; sanitizers/profiling; C interoperability.

**Required depth:** make the rule of zero and ownership contracts explicit; teach iterator invalidation, exception safety, data races and the difference between std::move and an actual move operation.

**Official references:** https://isocpp.org/ and https://en.cppreference.com/w/

### PHP
**Current path:** runtime; types; control flow/functions; arrays; forms/escaping; routing/sessions; OOP/Composer; PDO; framework architecture; web security; tests/queues/cache; production project.

**Underrepresented concepts:** PHP-FPM/request lifecycle; strict typing and modern type features; Composer autoloading/version constraints; database migrations/isolation; password/session lifecycle; CSRF/XSS/SQL injection as distinct threats; queue idempotency; OPcache/profiling; structured logs and deployment configuration.

**Required depth:** use prepared statements; distinguish validation from escaping; explain HTTP request boundaries and session regeneration; identify PHP-version-specific features.

**Official references:** https://www.php.net/manual/en/ and https://www.php.net/manual/en/langref.php

### Kotlin
**Current path:** toolchain; null safety; control flow; functions/lambdas; classes/data classes; collections/sequences; errors; coroutines; testing/Gradle; Android lifecycle; networking/security; capstone.

**Underrepresented concepts:** Flow and cancellation; Java interop/platform types; inline/reified generics and contracts; delegated properties; serialization; Kotlin Multiplatform; dependency injection; lifecycle-aware collection; performance/profiling.

**Required depth:** teach structured concurrency, cancellation, shallow data-class copying and the difference between read-only collection interfaces and deep immutability.

**Official references:** https://kotlinlang.org/docs/home.html and https://kotlinlang.org/docs/coroutines-overview.html

### Swift
**Current path:** toolchain; optionals; control flow; collections/value semantics; structs/enums/protocols; errors/testing; generics; concurrency/actors; package manager; SwiftUI state; networking/privacy; capstone.

**Underrepresented concepts:** ARC and retain cycles; weak/unowned lifetime contracts; Sendable and strict concurrency; macros/property wrappers; protocol witness dispatch; Core Data/SwiftData; URLSession caching/retry policy; testing frameworks; Objective-C interoperability.

**Required depth:** explain actor reentrancy, structured cancellation, value semantics with reference members, deployment-target availability and secure credential storage.

**Official references:** https://docs.swift.org/swift-book/ and https://swift.org/documentation/

### Bash
**Current path:** shell commands; variables/quoting; pipelines/redirection; conditions/loops; functions; files; processes/signals; diagnostics; scheduling; security; testing/CI; operations capstone.

**Underrepresented concepts:** POSIX portability versus Bash-specific syntax; arrays and associative arrays; getopts and CLI interfaces; trap cleanup edge cases; locking and atomic file publication; subshells/process substitution; environment/PATH hardening; shell startup files; NUL-safe file processing; shell injection.

**Required depth:** test paths with spaces/newlines, check exit codes and pipeline failure, avoid eval, use bounded timeouts, and test scripts in a temporary directory.

**Official references:** https://www.gnu.org/software/bash/manual/bash.html and https://www.shellcheck.net/wiki/

## Completion criteria for each lesson

A topic is not complete merely because it has a definition and a code snippet. Every lesson should include:

1. A precise definition and the problem the concept solves.
2. Prerequisites and a mental model before syntax.
3. Language-specific semantics, including version/platform caveats.
4. Runnable code with expected output and a line-by-line walkthrough.
5. A second example that changes an input or design decision.
6. Edge cases, failure behavior, debugging and relevant security implications.
7. A practical exercise with acceptance criteria and tests.
8. Interview questions with technically correct explanations.
9. An official reference appropriate to the concept.
10. Automated checks for coverage, broken links and example syntax where execution is practical.

This document is a coverage plan, not a claim that the additional concepts listed above already exist as separate topic cards. The current deep rewrite covers all 168 existing topic IDs; the gap register defines the next breadth expansion.
