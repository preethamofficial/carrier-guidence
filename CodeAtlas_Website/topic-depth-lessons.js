/* CodeAtlas topic-by-topic curriculum rewrite. Entries are keyed to exact topic IDs, not guessed by topic position. */
(function () {
  'use strict';
  const lessons = Object.create(null);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[ch]));
  const add = entries => Object.assign(lessons, entries);
  function render(language, topic) {
    const lesson = lessons[topic.id];
    if (!lesson) return '';
    const example = (topic.basicExamples || [])[0];
    const code = example && example.code ? example.code : '';
    const notes = example && example.lineByLine ? example.lineByLine : [];
    const steps = notes.length
      ? '<ol class="depth-walkthrough">' + notes.map(item =>
          '<li><code>' + esc(item.line) + '</code><p>' + esc(item.explanation) + '</p></li>').join('') + '</ol>'
      : '<p>Run the example and trace each input, intermediate value, side effect and output. If it is a fragment, place it inside the surrounding function or program required by the language.</p>';
    return '<section class="lesson-block prose-block topic-depth-v2" id="topic-depth-v2">' +
      '<div class="block-heading"><span class="block-icon">↳</span><h2>Deep lesson: ' + esc(topic.title) + '</h2></div>' +
      '<h3>1. Mental model and purpose</h3><p class="prose">' + esc(lesson.concept) + '</p>' +
      '<h3>2. How it works in ' + esc(language.name) + '</h3><p class="prose">' + esc(lesson.mechanics) + '</p>' +
      '<h3>3. Worked example</h3>' + (code ? '<p class="prose">Start with <strong>' + esc(example.title || 'the first example') + '</strong>. Use it as the concrete starting point for the explanation below.</p><pre><code>' + esc(code) + '</code></pre>' : '') + steps +
      '<h3>4. Failure modes and debugging</h3><p class="prose">' + esc(lesson.pitfalls) + '</p>' +
      '<h3>5. Practice task</h3><p class="prose">' + esc(lesson.challenge) + '</p>' +
      '<h3>6. Interview check</h3><p class="prose">' + esc(lesson.interview) + '</p>' +
      '<p class="prose"><strong>Verification routine:</strong> predict the result before running the program, test a normal case and an edge case, inspect the error message when a test fails, and explain why the result follows from the language rules.</p>' +
      '</section>';
  }
  add({
    "python-1": {
      concept: "A Python program is a sequence of statements executed by a Python implementation. Distinguish the interpreter from the editor, the source file from the process that runs it, and a project environment from globally installed packages. These distinctions explain why a script may work in one terminal but fail in another.",
      mechanics: "CPython normally parses source into an abstract syntax tree, compiles it to bytecode, then executes that bytecode in its virtual machine. The exact implementation can differ, so interpreted does not mean there is no compilation step. The main guard prevents script-only actions from running when the module is imported.",
      pitfalls: "Running the wrong Python executable, using a different working directory, installing packages outside the active virtual environment, naming a file after a standard-library module, and assuming a .pyc file is the source of truth are common setup errors.",
      challenge: "Create a project with a virtual environment, a main.py entry point and a helper module. Print the active interpreter path, import the helper without triggering the program main behavior, and document the commands needed to run it from a fresh checkout.",
      interview: "Explain the path from .py source to executed code in CPython, what a virtual environment isolates, and why the main guard matters when a module is imported."
    },
    "python-2": {
      concept: "A name in Python refers to an object; assignment binds a name to that object rather than automatically copying its contents. Types determine supported operations, while mutability determines whether an object can change in place. This model explains aliasing, identity, equality and bugs involving lists and dictionaries.",
      mechanics: "Python is dynamically typed: a name can be rebound to an object of another type. Equality with == asks whether values compare equal, while identity with is checks whether both names refer to the same object. The / operator produces a floating-point result for integer operands; // performs floor division. Type hints help readers and static tools but do not validate arbitrary runtime input.",
      pitfalls: "Using identity to compare ordinary strings or numbers, assuming annotations enforce types, confusing assignment with equality, relying on floating-point exactness for money, and overlooking implicit conversions are frequent mistakes.",
      challenge: "Write a price calculator that validates quantity and unit price, demonstrates equality versus identity with a mutable list, and uses Decimal when decimal arithmetic must follow a currency policy.",
      interview: "Explain Python name binding, mutable versus immutable objects, identity versus equality, and why 0.1 plus 0.2 may not equal exactly 0.3."
    },
    "python-3": {
      concept: "A Python str is an immutable sequence of Unicode code points, not a byte array. Text becomes bytes when encoded for files or networks, and bytes become text when decoded. String operations such as slicing and replacement create new strings, which matters for correctness and performance.",
      mechanics: "F-strings evaluate expressions and format their results; slicing uses a half-open interval; split and join transform text sequences. File APIs should specify an encoding such as UTF-8. Unicode normalization and case folding may matter when comparing human text, but should follow the application requirements.",
      pitfalls: "Assuming one character always equals one byte, decoding arbitrary bytes as UTF-8 without handling errors, concatenating strings repeatedly in a large loop, stripping meaningful whitespace, and building SQL or shell commands through raw concatenation are unsafe patterns.",
      challenge: "Read a UTF-8 text file, count words under an explicit punctuation policy, handle an empty file, and test a name containing non-ASCII characters. Explain whether comparison should be case-sensitive.",
      interview: "Describe str versus bytes, encoding versus decoding, slicing boundaries, and why text escaping is not a substitute for parameterized SQL or context-aware HTML escaping."
    },
    "python-4": {
      concept: "Conditional statements select behavior based on truth values. Python treats False, None, numeric zero and empty collections as falsey, but a non-empty string such as 'False' is truthy. Pattern matching with match can destructure and classify structured values.",
      mechanics: "An if/elif chain stops at the first true branch. Boolean and/or short-circuit and return one of their operands, not necessarily a Boolean. In match, a wildcard case catches anything left over, so order and exhaustiveness deserve attention.",
      pitfalls: "Comparing user input before normalizing it, using identity instead of equality for ordinary values, accidentally treating an empty collection as an error, and writing overlapping match patterns in the wrong order can create silent branch errors.",
      challenge: "Implement a grade classifier with input validation, boundary tests for every grade, and a separate policy for missing or malformed input. Then rewrite the classification using match where it improves readability.",
      interview: "Explain truthiness, short-circuit evaluation, branch ordering, and the difference between matching a literal value and binding a name in a match pattern."
    },
    "python-5": {
      concept: "A loop repeats work over a sequence or until a condition changes. Python for loops consume iterables; they do not inherently mean a numeric counter loop. Comprehensions express transformations or filters, while generator expressions defer producing each value until requested.",
      mechanics: "range(start, stop, step) excludes stop. A while loop requires an update or state change that eventually makes its condition false. break exits the nearest loop and continue skips to the next iteration. A comprehension should remain simple enough to read and debug.",
      pitfalls: "Off-by-one ranges, infinite while loops, modifying a collection during iteration, nesting many conditions in one comprehension, and building a huge list when a generator would be more memory-efficient are common problems.",
      challenge: "Given a list of marks, produce passing marks, count them and calculate the average. Test an empty list and a threshold-boundary value, then compare a list comprehension with a generator expression on a large input.",
      interview: "Explain why range(1, 5) omits 5, how break differs from continue, and when a generator expression is preferable to a list comprehension."
    },
    "python-6": {
      concept: "A function is a named contract: it accepts arguments, performs a defined operation and may return a result. Parameters and return values make dependencies visible. Separating pure calculations from input/output makes code easier to test, reuse and reason about.",
      mechanics: "Python supports positional-only, positional-or-keyword and keyword-only parameters. Default argument expressions are evaluated once when the function is defined, not on every call. *args collects extra positional arguments and **kwargs collects extra keyword arguments. A function without an explicit return returns None.",
      pitfalls: "Using a list or dictionary as a default parameter, confusing printing with returning, shadowing built-ins such as list, catching every exception inside a helper, and writing a function with unrelated responsibilities make APIs fragile.",
      challenge: "Write a pure calculate_total(items, tax_rate) function with explicit validation, then write a separate CLI wrapper that reads input and prints the result. Test the function without mocking terminal I/O.",
      interview: "Why are mutable default arguments dangerous? Explain positional versus keyword-only arguments, *args/**kwargs, and the difference between a return value and printed output."
    },
    "python-7": {
      concept: "Python collections encode different data models: lists are ordered and mutable, tuples are ordered and immutable at the container level, sets represent unique hashable values, and dictionaries map hashable keys to values. Choose based on the operations the program needs.",
      mechanics: "Dictionary and set lookup is average-case constant time under normal hash distribution, while searching a list is linear. A shallow copy duplicates only the outer container; nested mutable objects remain shared. Dictionary insertion order is guaranteed in modern Python, but a set has no ordering contract.",
      pitfalls: "Mutating a list through an alias, using a mutable object as a dictionary key, assuming a shallow copy isolates nested data, depending on set order, and replacing a clear loop with a hard-to-read comprehension cause bugs.",
      challenge: "Build a word-frequency counter using a dictionary, remove duplicates while preserving input order, and demonstrate with a nested list why shallow and deep copies differ.",
      interview: "Compare list, tuple, set and dict; explain hashability and average lookup complexity; describe aliasing, shallow copy and deep copy."
    },
    "python-8": {
      concept: "Exceptions represent failures that interrupt normal control flow; files and imported modules are external boundaries with their own lifecycle and naming rules. A robust program handles only failures it can recover from and releases resources even when an operation fails.",
      mechanics: "try encloses risky work, except handles selected exception types, else runs when no exception occurred, and finally runs during cleanup. A with statement delegates setup and cleanup to a context manager. pathlib.Path provides object-oriented path operations, while imports execute module-level code when a module is first loaded.",
      pitfalls: "Bare except, suppressing an error and returning success, failing to close files, assuming a relative path is relative to the source file, circular imports, and naming a project file json.py or random.py can cause hard-to-diagnose failures.",
      challenge: "Write a CSV reader that uses UTF-8 and a context manager, distinguishes a missing optional file from malformed data, and reports useful context without printing sensitive row contents.",
      interview: "Explain exception propagation, else versus finally, context managers, import side effects, and choosing between raising an exception and returning an ordinary not-found result."
    },
    "python-9": {
      concept: "A class defines behavior and state for instances. In Python, instance attributes usually belong to an object, class attributes are shared through the class, and method lookup follows the method resolution order. Encapsulation is primarily a design convention rather than strict private memory access.",
      mechanics: "self is the instance passed to an instance method; __init__ initializes an already-created instance. Inheritance reuses and specializes behavior, while composition delegates work to collaborators. Properties can preserve a stable public interface while validating access to internal state.",
      pitfalls: "Mutable class attributes accidentally shared by all instances, forgetting self, overusing inheritance, exposing invalid state, and confusing name mangling with true security privacy lead to fragile designs.",
      challenge: "Model an inventory item with a validated quantity and an operation to adjust stock. Test two instances to prove their state is independent, and decide whether a collaborator is better represented through composition.",
      interview: "Explain instance versus class attributes, the role of self, method resolution order, and when composition is preferable to inheritance."
    },
    "python-10": {
      concept: "Collection methods and comprehensions transform data while expressing intent. A comprehension is useful when the output can be understood as taking values, optionally filtering them, and producing a result. For multi-stage business logic, named intermediate variables can be clearer than a dense expression.",
      mechanics: "A list comprehension eagerly builds a list; a generator expression evaluates lazily as values are consumed. enumerate pairs an item with an index, zip combines iterables until the shortest ends by default, and dictionary/set comprehensions construct their respective collection types.",
      pitfalls: "Putting side effects in a comprehension, accidentally truncating mismatched inputs with zip, creating a large temporary list, and hiding nested conditions in a single expression harm clarity and memory use.",
      challenge: "Transform a list of order records into a dictionary keyed by order ID, calculate totals, and report duplicate IDs explicitly. Compare a comprehension with a multi-line loop and justify the more maintainable version.",
      interview: "Compare eager list comprehensions and lazy generator expressions, explain how zip handles unequal lengths, and identify when a simple loop is more readable."
    },
    "python-11": {
      concept: "An iterator provides successive values through the iterator protocol; a generator function creates an iterator whose execution pauses at each yield. Async functions use a different protocol: they produce awaitables and cooperate with an event loop rather than automatically running work in parallel.",
      mechanics: "iter(obj) obtains an iterator and next(it) requests a value until StopIteration. Generator state is suspended between yields. async def creates a coroutine function; await yields control while waiting for an awaitable. Async I/O helps when many tasks spend time waiting, not when CPU-heavy work must execute faster.",
      pitfalls: "Trying to iterate an exhausted iterator twice, materializing a huge generator, blocking the event loop with synchronous I/O, forgetting to await a coroutine, and assuming async code is automatically parallel are common mistakes.",
      challenge: "Create a generator that streams records from a file and an async function that concurrently requests two independent network resources with timeouts. Explain which part saves memory and which part overlaps I/O.",
      interview: "Explain iterable versus iterator, yield versus return, coroutine versus task, and why CPU-bound work may need multiprocessing or native code instead of asyncio."
    },
    "python-12": {
      concept: "Tests turn behavioral expectations into repeatable checks. Debugging reduces a failure to a minimal reproduction and examines state where reality diverges from expectation. Virtual environments isolate dependencies but do not by themselves guarantee a reproducible build.",
      mechanics: "A unit test checks a small contract, an integration test checks collaborating components, and a regression test prevents a fixed defect from returning. Fixtures prepare and clean test state. Coverage can reveal untested code but does not prove assertions are meaningful.",
      pitfalls: "Testing only the happy path, depending on live services in unit tests, asserting private implementation details, swallowing a failing test, and committing secrets or machine-specific paths into environment configuration weaken reliability.",
      challenge: "Package a small module with pytest tests for success, invalid input and a boundary case. Create a fresh virtual environment from a dependency file and run the same test command from a clean checkout.",
      interview: "Compare unit, integration and regression tests; explain why code coverage is not correctness; describe how virtual environments and dependency lock files contribute to reproducibility."
    }
  });
  add({
    "javascript-1": {
      concept: "JavaScript source runs inside an engine hosted by a browser, Node.js, or another runtime. The language defines expressions and objects; the host provides APIs such as the DOM, timers, filesystem and networking. Separating language features from host APIs explains environment-specific failures.",
      mechanics: "Modern engines parse source, create internal representations and may optimize frequently executed paths. Browser files can be classic scripts or ES modules; Node interprets files according to package and extension rules. Runtime version and module mode are part of the project's contract.",
      pitfalls: "Assuming window exists in Node, mixing CommonJS and ES modules without configuration, relying on the current working directory, and assuming code that parses must work in its host environment.",
      challenge: "Create a Node script and a browser module that share a pure calculation function. Document the runtime versions and identify which APIs belong to JavaScript and which belong to the host.",
      interview: "Explain the difference between the JavaScript language and its host, how an engine executes code at a high level, and why browser and Node globals differ."
    },
    "javascript-2": {
      concept: "JavaScript values have types, and variables hold references to values. Primitive values are copied as values; objects and arrays are accessed through references, so two variables can observe the same object's mutations. Equality operators matter because coercion changes comparison results.",
      mechanics: "Strict equality with === avoids broad type coercion. typeof null historically returns object; arrays are detected with Array.isArray. NaN is unequal to itself, so Number.isNaN is clearer. const prevents rebinding, not mutation of an object.",
      pitfalls: "Using == without understanding coercion, confusing const with deep immutability, relying on truthiness for empty arrays, and treating typeof as a complete type-inspection API.",
      challenge: "Write a numeric parser for form input, reject empty and non-finite values, and demonstrate mutating an object versus reassigning a const binding.",
      interview: "Compare == and ===, explain primitive values versus object references, describe the typeof null quirk, and clarify what const guarantees."
    },
    "javascript-3": {
      concept: "Control flow selects which statements run. JavaScript truthiness differs from some languages: empty arrays and objects are truthy, while 0, empty text, null, undefined and NaN are falsy. Loops should make the iteration set and termination condition explicit.",
      mechanics: "for...of iterates values from an iterable; for...in iterates enumerable property keys and is usually not suitable for array values. switch uses strict comparison. Short-circuit operators can return an operand, and optional chaining short-circuits only on nullish values.",
      pitfalls: "Using for...in for array values, writing a loop that cannot terminate, confusing || with ?? when zero or empty text are valid, and relying on implicit coercion.",
      challenge: "Implement validation that accepts zero as a valid numeric value, rejects missing input, and processes a list with for...of. Test empty arrays and nullish values.",
      interview: "Compare for...of with for...in, explain truthy/falsy values, and describe when nullish coalescing is safer than logical OR."
    },
    "javascript-4": {
      concept: "Functions are first-class values that can be stored, passed and returned. A function can capture its lexical environment through a closure. Declaration form, arrow syntax and this binding affect hoisting, call behavior and API design.",
      mechanics: "Function declarations are initialized during scope setup; function expressions follow the initialization rules of their binding. Arrow functions capture this lexically and have no own arguments object. let and const are block-scoped, while var is function-scoped.",
      pitfalls: "Assuming arrow functions bind this like methods, closing over a changing loop variable, calling a function expression before its binding initializes, and mixing function declaration with invocation responsibilities.",
      challenge: "Build a counter factory that returns increment/read functions, then implement an object method that uses this. Demonstrate why replacing the method with an arrow function changes behavior.",
      interview: "Explain closures, lexical scope, hoisting, var versus let/const, and how arrow functions differ from ordinary functions in this and arguments."
    },
    "javascript-5": {
      concept: "Arrays are ordered objects with indexed elements; ordinary objects represent keyed properties. Choose among object, Map, array and Set based on whether the data models a sequence, key/value lookup, or uniqueness.",
      mechanics: "map transforms every element, filter keeps matching elements, and reduce combines elements into an accumulator. These methods normally produce results instead of mutating the source. Object spread is shallow, and ordinary object keys are strings or symbols.",
      pitfalls: "Expecting map to mutate the source, using reduce for a simple transformation, assuming spread clones nested objects, and using untrusted strings as object keys without considering prototype-related hazards.",
      challenge: "Transform order records into a customer summary, preserve the original data, handle empty input, and explain whether Map better fits the requirement.",
      interview: "Compare map, filter and reduce; explain shallow copying with spread; choose among object, Map, Set and array for a concrete task."
    },
    "javascript-6": {
      concept: "The Document Object Model represents an HTML document as a tree of nodes. JavaScript queries and updates that tree. DOM changes are application state, so user input must remain separate from trusted markup.",
      mechanics: "querySelector returns the first matching element or null; textContent writes text, whereas innerHTML parses markup. Event listeners respond to actions. DOM operations require a browser document and should run after the relevant nodes exist.",
      pitfalls: "Dereferencing a missing element, inserting untrusted input through innerHTML, appending duplicate nodes during rerender, and scattering presentation changes across unrelated handlers can create fragile UI and XSS risk.",
      challenge: "Create a searchable list using textContent, handle a missing input element safely, and add/remove a CSS class from a click event. Show that input containing markup is displayed as text.",
      interview: "Explain the DOM tree, querySelector nullability, the security difference between textContent and innerHTML, and event delegation."
    },
    "javascript-7": {
      concept: "Destructuring extracts array positions or object properties; spread expands iterable values or enumerable object properties; rest collects remaining values. These features express data flow but do not perform deep copies.",
      mechanics: "Array destructuring follows position; object destructuring follows property names and supports renaming and defaults for undefined. Spread creates shallow copies; later object properties overwrite earlier keys. Rest must occupy a permitted final position.",
      pitfalls: "Assuming spread deep-clones nested values, expecting a default to replace explicit null, overwriting properties unintentionally through spread order, and destructuring optional data without a fallback.",
      challenge: "Merge two configuration objects with a documented precedence order, preserve the source objects, and safely extract optional nested data. Test missing properties and explicit null.",
      interview: "Compare rest and spread, explain object spread precedence and shallow-copy behavior, and distinguish a destructuring default from nullish coalescing."
    },
    "javascript-8": {
      concept: "Promises represent the eventual outcome of asynchronous work. Async functions always return promises; await pauses that async function until an awaited value settles without blocking the entire JavaScript thread. Receiving a response is not the same as validating its HTTP status or parsing its body.",
      mechanics: "A promise transitions from pending to fulfilled or rejected. then chains transformations and catch handles rejection. fetch normally rejects for network-level failures, not simply for HTTP 404/500 responses, so check response.ok explicitly.",
      pitfalls: "Failing to return a promise from a chain, launching asynchronous work without handling it, assuming fetch throws on 404, parsing a body twice, and failing to time out or cancel a request.",
      challenge: "Write an async JSON loader with an AbortController timeout, response.ok check, and separate handling for network errors, HTTP errors and invalid JSON. Test failure paths with mocked responses.",
      interview: "Explain promise states, async/await, why fetch does not reject on ordinary HTTP error status, and how Promise.all runs independent requests concurrently."
    },
    "javascript-9": {
      concept: "Events let browser code react to user actions and browser activity. Propagation normally includes capture, target and bubble phases. Form handling should preserve accessible browser behavior while validating and submitting data predictably.",
      mechanics: "addEventListener attaches a listener; the event object describes the target and action. preventDefault cancels a browser default action; stopPropagation stops further propagation. Event delegation listens on a stable ancestor and inspects the target.",
      pitfalls: "Registering duplicate listeners after rerenders, calling preventDefault without implementing the intended behavior, treating client validation as the only security control, and failing to associate labels and errors with form fields.",
      challenge: "Build a form with accessible validation, clear error messages, duplicate-submit protection, and a button that is restored after both success and failure.",
      interview: "Explain bubbling and delegation, distinguish preventDefault from stopPropagation, and explain why server-side validation remains mandatory."
    },
    "javascript-10": {
      concept: "Modules split a program into explicit interfaces. ES modules export selected bindings and import dependencies, while the module system defines scope and loading behavior. Tooling creates repeatable builds and checks code before execution.",
      mechanics: "ES modules have their own scope and live bindings; static imports are resolved before normal module execution. Package metadata affects how Node interprets .js files, and bundlers may transform modules and assets for browser delivery.",
      pitfalls: "Circular dependencies, confusing default and named exports, mixing ESM and CommonJS accidentally, committing machine-specific build output, and assuming bundler configuration is the language specification.",
      challenge: "Split a small application into a pure calculation module and a UI entry module, add a package test script, and build it from a clean checkout with documented runtime versions.",
      interview: "Compare named and default exports, explain module scope, and describe the roles of a runtime, package manager, bundler, linter and test runner."
    },
    "javascript-11": {
      concept: "Asynchronous APIs often begin as callbacks, gain composition through promises, and use async/await for sequential-looking control flow. The central issue is how success, failure, ordering and cancellation move through the operation.",
      mechanics: "A promise chain forwards returned values to the next then and forwards thrown errors to rejection handling. await unwraps fulfillment and throws rejection into try/catch. Promise.all rejects if one input rejects; Promise.allSettled reports every outcome. Neither automatically cancels sibling work.",
      pitfalls: "Mixing callback and promise error conventions, creating a floating promise, serializing independent requests accidentally, and using Promise.all when every result must be collected despite failures.",
      challenge: "Refactor a nested callback workflow into a promise chain and then async/await. Test a failed first operation and two independent operations that should run concurrently.",
      interview: "Describe promise-chain error propagation, compare Promise.all and Promise.allSettled, and explain why awaiting requests inside a loop can serialize work."
    },
    "javascript-12": {
      concept: "A reliable DOM feature combines semantic HTML, event handling, state updates and safe rendering. Input is validated, state changes once, the UI reflects state, and errors remain visible and accessible.",
      mechanics: "Register event listeners once, render user-controlled strings as text, and use stable identifiers for list updates. Browser storage persists strings and may contain stale or malformed data, so parse and validate it before trusting it. Separate state transformation from DOM manipulation to make behavior testable.",
      pitfalls: "One giant event handler, injecting input as HTML, storing malformed JSON without recovery, losing keyboard accessibility, and testing only the initial happy path leave a feature brittle.",
      challenge: "Build a task list with add, complete, filter and persistence features. Handle empty input, duplicate submissions, stale stored data and keyboard use; keep core state transformations independent of the DOM.",
      interview: "Explain state flow in a small UI, identify XSS risks in rendering, and describe how to test behavior independently of browser DOM details."
    },
    "typescript-1": {
      concept: "TypeScript adds a static type system to JavaScript and normally emits JavaScript for execution. Its types help developers catch mismatches before runtime, but the type system is erased during compilation and does not automatically validate JSON, network responses or user input.",
      mechanics: "The TypeScript compiler parses files, checks types using tsconfig settings, and emits JavaScript when configured to do so. Strictness options alter the guarantees. The target and module options affect emitted syntax and module behavior; bundling and runtime execution are separate concerns.",
      pitfalls: "Assuming a type annotation validates runtime data, compiling with strictness disabled without understanding the trade-off, mixing incompatible module systems, and using a cast to silence a problem rather than validating it.",
      challenge: "Create a strict TypeScript project with separate source and build directories, compile it, and parse an unknown JSON value only after runtime validation. Document the target and module settings.",
      interview: "Explain type erasure, compile-time checking versus runtime validation, and the distinct roles of tsc, tsconfig and a bundler."
    },
    "typescript-2": {
      concept: "Primitive types describe values, arrays describe ordered collections, and tuples describe fixed-position structures with known element types. TypeScript's structural type system checks whether a value has the required shape rather than relying only on a declared class name.",
      mechanics: "Type inference derives types from initializers and usage. Literal types can preserve exact string/number values, while widening may generalize them. readonly prevents certain mutations through a typed reference but does not freeze the underlying object at runtime.",
      pitfalls: "Using any to bypass checking, confusing readonly with runtime immutability, assuming arrays have fixed length, and forgetting that an external value still requires validation even if a variable is annotated.",
      challenge: "Model a CSV row as a tuple and a collection of rows as an array, then write a parser that validates incoming unknown values before producing the typed representation.",
      interview: "Compare any, unknown and never; explain type inference and literal widening; and distinguish readonly type restrictions from Object.freeze."
    },
    "typescript-3": {
      concept: "A union says a value may belong to one of several types. Narrowing uses runtime checks and control flow to reduce that set before accessing type-specific properties. A discriminated union encodes alternatives with a shared literal property.",
      mechanics: "typeof, in, instanceof and equality checks can narrow types. A switch over a discriminant is often clearer than scattered boolean flags. An exhaustive check using never makes a newly added union variant visible to the compiler when a branch is missing.",
      pitfalls: "Using assertions instead of narrowing, checking only one union branch, trusting a discriminant from unvalidated external JSON, and allowing a default branch to silently ignore a new variant.",
      challenge: "Represent API results as a discriminated union of loading, success and failure states. Render each state and add an exhaustive check so adding a fourth state causes a compile-time reminder.",
      interview: "Explain narrowing, discriminated unions, type guards, and how never helps detect missing cases."
    },
    "typescript-4": {
      concept: "A function type defines the inputs and output callers may rely on. Optional parameters, overload signatures and generic parameters shape an API contract. A useful signature communicates constraints without requiring callers to inspect implementation details.",
      mechanics: "Overloads expose several call signatures while one implementation handles them. Generic parameters preserve relationships between inputs and outputs, whereas broad unions may lose that relationship. A function returning Promise<T> describes asynchronous completion but not every possible runtime failure.",
      pitfalls: "Overloading when a union is simpler, optional arguments that create ambiguous calls, broad any return types, and assuming a declared return type validates untrusted data.",
      challenge: "Create a typed parse function with overloads for string and numeric input, then decide whether a single generic or union-based API would be clearer. Test invalid runtime input separately.",
      interview: "Compare overloads and union parameters, explain generic type parameters, and describe how to type an asynchronous function that may reject."
    },
    "typescript-5": {
      concept: "An interface describes an object's required shape; a type alias can name unions, intersections, primitives, tuples and other types. Because TypeScript is structural, compatible objects may satisfy an interface without explicitly declaring that they implement it.",
      mechanics: "Interfaces can be extended and merged under specific declaration rules; type aliases compose with unions and intersections. Optional and readonly properties affect compile-time usage but do not enforce runtime data shape. Prefer small domain contracts over a single interface that models every possible state.",
      pitfalls: "Assuming interfaces exist at runtime, confusing optional properties with properties whose value is undefined, creating overly broad interfaces, and relying on compile-time types to secure data from an API.",
      challenge: "Define a public User contract, an internal UserWithSecrets type and an API response union. Ensure secrets are not included in the response object and validate external payloads at runtime.",
      interview: "Compare interface and type alias, explain structural typing, and state why TypeScript interfaces cannot be used as runtime validators."
    },
    "typescript-6": {
      concept: "Generics allow functions and types to preserve relationships between values without giving up type safety. A generic parameter is useful when the result type depends on the input type; it is less useful when every value is immediately widened to unknown or any.",
      mechanics: "Type inference often chooses generic arguments from call-site inputs. Constraints such as T extends { id: string } express required operations. Generic defaults and variance affect more advanced APIs, while utility types transform existing type shapes.",
      pitfalls: "Adding unnecessary generic parameters, constraining a type too narrowly, using assertions to bypass the generic relationship, and assuming generic constraints imply runtime validation.",
      challenge: "Implement a generic groupBy or mapById helper that preserves the input element type, add a constraint for the key property, and test it with two distinct record types.",
      interview: "Explain generic inference, constraints, type parameters versus concrete types, and why a generic type does not validate external data at runtime."
    },
    "typescript-7": {
      concept: "Classes combine JavaScript runtime behavior with TypeScript's static descriptions of fields, methods and access modifiers. Interfaces and composition often express contracts more flexibly than class inheritance. TypeScript's private modifier is a type-checking restriction, distinct from JavaScript private fields.",
      mechanics: "A class can implement an interface, extend a base class, and use abstract members to require subclass behavior. Access modifiers influence compile-time access; ECMAScript #private fields have runtime privacy semantics. Constructor parameter properties are syntax that declares and initializes members.",
      pitfalls: "Using inheritance for unrelated capabilities, treating TypeScript private as a security boundary, failing to initialize strict properties, and exposing mutable state that lets callers violate invariants.",
      challenge: "Model a payment method behind an interface and implement two variants. Keep validation inside each implementation and test code through the interface rather than depending on concrete classes.",
      interview: "Compare interface implementation with inheritance, explain abstract classes, and distinguish TypeScript private from ECMAScript private fields."
    },
    "typescript-8": {
      concept: "Utility types derive new types from existing ones, reducing repeated declarations and helping express partial updates, selected fields and dictionary shapes. They operate at compile time; they do not automatically remove properties or validate an object at runtime.",
      mechanics: "Partial<T> makes properties optional, Pick<T, K> selects keys, Omit<T, K> removes keys from a type, and Record<K, V> maps keys to values. These types can compose, but deeply nested transformations often deserve a named domain type.",
      pitfalls: "Using Partial for an unrestricted database update, assuming Omit strips a property from a runtime object, exposing private fields because a type was widened, and creating complex mapped types that obscure the actual data contract.",
      challenge: "Define a full User model, a safe public response using Pick/Omit, and a restricted update DTO. Validate the DTO and explicitly whitelist mutable fields before persisting it.",
      interview: "Explain Partial, Pick, Omit and Record, and why type-level omission does not delete a property from a JavaScript object."
    },
    "typescript-9": {
      concept: "A Promise<T> represents eventual fulfillment with a value of type T, but rejected promises are not encoded as a typed error union by ordinary Promise types. A function's type should make the success shape clear while runtime handling addresses network, parsing and domain failures.",
      mechanics: "async functions return Promise values, and await unwraps fulfillment. Catch variables should be treated as unknown under strict settings because JavaScript can throw arbitrary values. A discriminated Result type can represent expected failure outcomes when callers must handle them explicitly.",
      pitfalls: "Assuming Promise<T> describes all errors, catching an unknown value as if it were Error without checking, forgetting to await a result, and confusing a network error with an API's valid failure response.",
      challenge: "Write a typed API client that validates unknown JSON, returns a discriminated success/error result for expected failures, and still allows unexpected programming errors to surface.",
      interview: "Explain why Promise<T> does not type its rejection, how unknown catch variables improve safety, and when a Result union is preferable to throwing."
    },
    "typescript-10": {
      concept: "Conditional and mapped types let the type system transform relationships between types. They are powerful for libraries and reusable API contracts, but they can become difficult to read if they encode too many layers of conditional behavior.",
      mechanics: "A conditional type uses T extends U ? X : Y. When the checked type is a naked generic parameter, the condition distributes across union members. Mapped types iterate over keys, and keyof produces a union of property keys. Indexed access types select a property type by key.",
      pitfalls: "Unexpected distributive behavior, recursive type complexity, assuming a type-level conditional performs runtime branching, and using advanced types where a clear named interface would be easier to maintain.",
      challenge: "Build a type that extracts the success payload from a discriminated API result and a mapped type that makes selected fields readonly. Add compile-time examples for each union variant.",
      interview: "Explain conditional types, distributive conditional types, mapped types, keyof and indexed access types."
    },
    "typescript-11": {
      concept: "Modules and compiler configuration define the boundary between source files, packages and emitted code. TypeScript can model different runtimes, but the project must configure module resolution, target, strictness and library types to match how the application is built and executed.",
      mechanics: "tsconfig.json controls compiler options and file inclusion. ModuleResolution should match the runtime or bundler model. Declaration files describe types for JavaScript libraries, while project references support larger builds. A successful type check does not prove the bundler or runtime will resolve imports correctly.",
      pitfalls: "Conflicting module settings, accidentally compiling test files into production output, relying on ambient types from unrelated packages, and ignoring strict compiler warnings because the code still emits JavaScript.",
      challenge: "Create separate application and test configurations, enable strict checking, add one declaration file for an untyped dependency, and verify both type-checking and the actual production build.",
      interview: "Explain target versus module, module resolution, declaration files, and why passing tsc does not guarantee runtime imports will work."
    },
    "typescript-12": {
      concept: "A typed mini application combines domain types, validated input, UI state and API boundaries. The type system should make illegal states harder to represent, while runtime validation protects the application from values that arrive outside its control.",
      mechanics: "Define domain types and discriminated states, keep transformation logic pure, and isolate browser/network code behind interfaces. Use strict compiler settings and tests at both the type and runtime levels. Types are erased, so parse external data from unknown rather than asserting it directly into a trusted shape.",
      pitfalls: "Treating types as validation, scattering casts throughout the app, duplicating domain rules between UI and service layers, and allowing impossible state combinations such as loading and success simultaneously.",
      challenge: "Build a typed task tracker with loading/success/error states, runtime-validated persistence, a small service interface, and tests for corrupted storage and invalid API responses.",
      interview: "Explain how to model state with discriminated unions, where runtime validation belongs, and how strict compiler settings improve maintainability."
    }
  });
  add({
    "java-1": {
      concept: "Java source files are compiled to bytecode and executed by a Java Virtual Machine. The JDK contains developer tools such as the compiler; the runtime provides the environment needed to execute compiled classes. Build configuration is part of the program because it fixes the JDK, dependencies and entry point.",
      mechanics: "javac compiles source into class files, and the java launcher starts the configured main class. Packages map names to namespaces and normally correspond to directory layout. Maven or Gradle make dependency resolution and repeatable builds explicit.",
      pitfalls: "Confusing a JRE/runtime with a JDK, mismatching package names and directories, compiling with one JDK and running with another, and relying on IDE-only settings.",
      challenge: "Create a minimal project with a main class and a helper package, build it from the terminal, and document the JDK version and exact command needed for a clean build.",
      interview: "Explain source-to-bytecode execution, the difference between JDK and JVM, and how a build tool makes dependencies reproducible."
    },
    "java-2": {
      concept: "Java is statically typed: each variable and expression has a compile-time type. Primitive variables store primitive values, while reference variables refer to objects and can be null. Numeric conversions, integer division and wrapper types affect program behavior.",
      mechanics: "The compiler checks method signatures and conversions before execution. Integer division truncates toward zero; floating-point values use binary representation and may not represent decimal fractions exactly. Wrapper classes such as Integer are objects and participate in autoboxing/unboxing.",
      pitfalls: "Unboxing null, using == to compare String content, overflowing integer arithmetic, assuming decimal floating point is exact, and mixing primitive and wrapper semantics without considering nullability.",
      challenge: "Write a typed invoice calculation that validates quantities, compares strings correctly, and uses BigDecimal with an explicit rounding policy for currency.",
      interview: "Compare primitive and reference types, == and equals, integer and floating-point division, and explain why BigDecimal is often used for monetary values."
    },
    "java-3": {
      concept: "Control flow chooses which statements execute; arrays store a fixed number of elements of one declared component type. Array indices start at zero and the final valid index is length minus one. Collection iteration has different behavior from indexed array loops.",
      mechanics: "A for loop evaluates initialization once, checks its condition before each iteration and runs its update after the body. Enhanced for loops iterate values. Arrays have a fixed length, and accessing an invalid index throws ArrayIndexOutOfBoundsException.",
      pitfalls: "Off-by-one loop bounds, modifying an array while assuming its size changes, confusing == with value equality for objects, and failing to handle empty arrays.",
      challenge: "Calculate min, max and average from an array without using a collection library. Test an empty array, a single element, negative numbers and repeated values.",
      interview: "Explain array bounds, classic versus enhanced for loops, and how to avoid division by zero when averaging an empty collection."
    },
    "java-4": {
      concept: "A method defines a callable operation with a return type and parameter list. Overloading allows multiple methods with the same name but different parameter signatures. Return type alone cannot distinguish overloads, and compile-time overload selection is distinct from runtime overriding.",
      mechanics: "Arguments are matched to a method signature using overload-resolution rules, including conversions and varargs. Java passes values by value; for an object reference, the copied value still refers to the same object. A method that returns void communicates through side effects rather than a return value.",
      pitfalls: "Overloads that are ambiguous for null or primitive conversions, confusing pass-by-value with pass-by-reference, methods with hidden side effects, and returning mutable internal collections can make APIs surprising.",
      challenge: "Design overloaded methods for parsing integer and decimal inputs, then write tests for ambiguous-looking inputs, invalid values and side effects.",
      interview: "Explain overloading versus overriding, Java's pass-by-value semantics for references, and why return type alone cannot overload a method."
    },
    "java-5": {
      concept: "A class is a blueprint for instances; constructors establish initial state and methods define behavior. Encapsulation protects invariants by controlling how fields can change. A reference variable is not the object itself, so assignment may create another reference to the same instance.",
      mechanics: "The new expression allocates and initializes an object. Constructors can validate inputs; final fields support stable state after initialization. Access modifiers define visibility, and equals/hashCode should agree when objects are used as keys or set members.",
      pitfalls: "Public mutable fields, constructors that permit invalid states, forgetting equals/hashCode contracts, leaking this during construction, and assuming final makes an object deeply immutable.",
      challenge: "Create an immutable Money or InventoryItem class with constructor validation, value equality and tests showing that callers cannot mutate its state unexpectedly.",
      interview: "Explain object identity versus equality, constructor responsibilities, access modifiers, and the equals/hashCode contract."
    },
    "java-6": {
      concept: "String is immutable, so repeated concatenation in a loop can create many intermediate objects. StringBuilder is mutable and is useful for repeated assembly. ArrayList provides a resizable indexed sequence and is appropriate when ordered duplicates and fast indexed access are needed.",
      mechanics: "String operations return new values; StringBuilder appends to an internal buffer. ArrayList grows its backing storage as needed and usually provides constant-time indexed access, while insertion near the front shifts elements. The diamond operator lets the compiler infer generic type arguments.",
      pitfalls: "Using == for string content, concatenating repeatedly in a large loop, exposing a mutable list when a defensive copy is required, and choosing ArrayList for workloads dominated by frequent middle insertions without measuring.",
      challenge: "Build a report from thousands of records using StringBuilder and ArrayList. Compare the resulting output against a small reference case and document the expected collection operations.",
      interview: "Explain String immutability, StringBuilder use cases, and ArrayList trade-offs for indexed reads versus insertions."
    },
    "java-7": {
      concept: "Inheritance creates a subtype relationship; polymorphism allows code to invoke an overridden method through a base-type reference. The design is strongest when a subtype can honor the behavioral contract expected by callers, not merely reuse implementation.",
      mechanics: "Overridden instance methods are selected dynamically at runtime, while overloaded methods are selected at compile time. super can call base behavior, and final can prevent overriding or subclassing. Prefer composition when a type needs a capability but is not conceptually a subtype.",
      pitfalls: "Deep inheritance trees, overriding methods while changing their expected contract, confusing overload resolution with dynamic dispatch, and using inheritance solely to share utility code.",
      challenge: "Model a payment or notification hierarchy and test each implementation through the common base contract. Add a case where composition is a clearer choice than inheritance.",
      interview: "Compare overloading and overriding, explain runtime dispatch, and describe the Liskov substitution principle in practical terms."
    },
    "java-8": {
      concept: "An interface defines a contract, exceptions represent failure paths, and packages organize names. Interfaces allow business logic to depend on capabilities rather than a concrete class, which improves testing and reduces coupling.",
      mechanics: "A class implements interface methods; checked exceptions must be caught or declared, while unchecked exceptions do not have that compiler requirement. Package-private access supports internal collaboration. Dependency injection supplies an implementation from outside the consumer.",
      pitfalls: "Catching exceptions and ignoring them, exposing implementation classes unnecessarily, making interfaces mirror every method of a concrete class, and coupling business logic directly to a database or HTTP client.",
      challenge: "Define a repository interface, implement an in-memory version for unit tests, and show how the service can use a database implementation without changing its business rules.",
      interview: "Explain interface-based design, checked versus unchecked exceptions, and how dependency inversion makes code easier to test."
    },
    "java-9": {
      concept: "Collections model groups of values, while generics preserve type relationships at compile time. List, Set and Map have different semantics; selecting the right abstraction avoids manual duplicate checks and unsafe casts.",
      mechanics: "ArrayList preserves order and duplicates, HashSet enforces uniqueness, and HashMap maps keys to values. Hash-based collections depend on stable equals/hashCode behavior. Generic type parameters are erased in many runtime contexts, which affects reflection and overloads.",
      pitfalls: "Mutable hash keys, raw collection types, assuming HashMap iteration order, modifying a collection during iteration, and using a list where uniqueness is a domain invariant.",
      challenge: "Build a word-frequency map and a unique user-ID set. Add tests for duplicate values and explain how equals/hashCode influence custom object keys.",
      interview: "Compare List, Set and Map; explain hash collisions and equals/hashCode; and describe type erasure at a high level."
    },
    "java-10": {
      concept: "File and network operations can fail and should be treated as resource-owning boundaries. Try-with-resources closes AutoCloseable resources even when an exception occurs, reducing leaks. Exceptions should carry useful context without exposing secrets.",
      mechanics: "A resource declared in try-with-resources is closed at scope exit. Files APIs can throw checked I/O exceptions; callers should decide whether to recover, translate the error or propagate it. Buffered I/O is usually preferable for repeated reads and writes.",
      pitfalls: "Leaking streams, swallowing IOException, using platform-default encodings, assuming a path exists, and logging full file contents or credentials during failure handling.",
      challenge: "Read a UTF-8 CSV file with try-with-resources, validate each row, distinguish I/O failure from malformed data, and write a test for missing and empty files.",
      interview: "Explain try-with-resources, checked I/O exceptions, explicit text encodings, and why cleanup should not depend on reaching the last line of a method."
    },
    "java-11": {
      concept: "Lambdas represent behavior as values, streams express a pipeline over data, and Optional models a value that may be absent. These tools can improve clarity when the operation is a transformation, but should not hide side effects or make simple code harder to follow.",
      mechanics: "A stream pipeline has a source, intermediate operations and a terminal operation; many intermediate operations are lazy. Streams should not generally be reused after a terminal operation. Optional.map transforms a present value and flatMap avoids nested Optional structures.",
      pitfalls: "Putting side effects in stream predicates, calling get without checking presence, using parallel streams without measuring, and creating a long stream pipeline that is harder to debug than a loop.",
      challenge: "Filter and group orders by status, calculate totals, and represent a missing customer with Optional. Compare the stream version with a loop and justify readability and performance.",
      interview: "Explain stream laziness, intermediate versus terminal operations, map versus flatMap, and why Optional.get without a presence check is risky."
    },
    "java-12": {
      concept: "Records model data-oriented classes concisely, sealed types restrict which classes may extend or implement a type, and pattern matching can reduce repetitive type checks and casts. These features are version-sensitive, so the project JDK and language level must be explicit.",
      mechanics: "A record generates a canonical constructor, accessors and value-oriented methods, but nested mutable objects are not automatically deeply immutable. Sealed hierarchies list permitted subtypes. Pattern matching refines the type of a value after a successful test.",
      pitfalls: "Assuming records validate all invariants automatically, treating records as deeply immutable, using newer syntax with an older JDK, and making a sealed hierarchy too closed for the domain's extension needs.",
      challenge: "Represent a payment result as a sealed success/failure hierarchy with records for data. Add constructor validation and tests for each variant using the project's chosen JDK.",
      interview: "Compare records with ordinary classes, explain sealed type benefits, and identify why a project's Java language level affects available syntax."
    },
    "sql-1": {
      concept: "A relational database stores data in tables with rows and columns, while a query asks the database to return a set of rows. SQL is declarative: you specify the result you want, and the database chooses an execution plan. Schema design defines the data types and integrity rules the engine can enforce.",
      mechanics: "CREATE TABLE defines columns and constraints; INSERT adds rows; SELECT projects columns and FROM identifies the source. A query without ORDER BY has no guaranteed row order. SQL NULL represents missing or unknown information and is not equal to ordinary values.",
      pitfalls: "Assuming physical row order, using SELECT * in stable application contracts, confusing NULL with zero or empty text, and skipping primary/foreign-key design lead to unreliable data access.",
      challenge: "Create customers and orders tables with primary and foreign keys, insert sample rows, and write a query that returns a defined set of columns in deterministic order.",
      interview: "Explain relational tables, declarative querying, primary keys, foreign keys, and why ORDER BY is required when result ordering matters."
    },
    "sql-2": {
      concept: "SELECT projects columns, WHERE filters individual rows, and ORDER BY sorts the final result. The logical query-processing model helps explain why aliases, aggregates and filtering clauses have different rules even though the SQL text begins with SELECT.",
      mechanics: "WHERE is evaluated before grouping; ORDER BY is applied to the resulting query rows. NULL comparisons use IS NULL or IS NOT NULL, not equality. LIKE patterns use percent for any-length text and underscore for one character in standard SQL-style matching.",
      pitfalls: "Using SELECT * for production interfaces, forgetting deterministic tie-breakers in ORDER BY, comparing NULL with equals, and applying functions to indexed columns without checking the plan can hurt correctness or performance.",
      challenge: "Write a report that filters a date range, handles NULL values explicitly, sorts by total descending and uses a stable secondary key for ties.",
      interview: "Explain WHERE versus HAVING, how NULL affects predicates, and why ORDER BY on only one non-unique column may still leave ties unordered."
    },
    "sql-3": {
      concept: "Aggregate functions summarize groups of rows. GROUP BY creates one result group per distinct grouping key; HAVING filters those groups after aggregation. The distinction between row-level and group-level predicates is fundamental to analytical SQL.",
      mechanics: "COUNT(*) counts rows, COUNT(column) ignores NULL in that column, and SUM/AVG operate on non-NULL values. Every selected non-aggregated expression generally must be grouped or otherwise valid under the database's grouping rules. A WHERE clause reduces rows before aggregate calculations.",
      pitfalls: "Filtering aggregate results in WHERE, counting nullable columns when row counts are intended, accidentally grouping at the wrong grain, and joining one-to-many tables before aggregation so totals are multiplied.",
      challenge: "Calculate monthly sales by customer, show only customers above a threshold, and prove the totals remain correct when a customer has multiple order lines.",
      interview: "Compare WHERE and HAVING, COUNT(*) and COUNT(column), and explain how join cardinality can inflate aggregate results."
    },
    "sql-4": {
      concept: "A join combines rows from relations according to a matching predicate. Join type controls what happens to unmatched rows; join cardinality determines whether each input row can match zero, one or many rows. Correct joins depend on understanding keys and relationship grain.",
      mechanics: "INNER JOIN keeps matches, LEFT JOIN keeps every left-side row and fills missing right-side columns with NULL. A predicate placed in WHERE can remove those NULL-extended rows and effectively change a left join's behavior. Many-to-many joins can multiply rows unless the relationship is modeled explicitly.",
      pitfalls: "Joining on a non-unique name instead of a key, forgetting part of a composite key, filtering the right table in WHERE after a left join, and aggregating after a row-multiplying join without accounting for grain.",
      challenge: "Return every customer, including those with no orders, plus each customer's order count. Test a customer with zero orders and verify that it remains in the output.",
      interview: "Compare inner, left and full joins; explain ON versus WHERE for outer joins; and diagnose why a join unexpectedly duplicates rows."
    },
    "sql-5": {
      concept: "A subquery nests one query inside another; a common table expression names a query result for use within a larger statement. Both help break complex logic into readable steps, but the optimizer may inline or transform them depending on the database.",
      mechanics: "A scalar subquery returns one value, while a correlated subquery references the current outer row. EXISTS tests whether matching rows exist and can express a semi-join intention. A recursive CTE can traverse hierarchical relationships when supported.",
      pitfalls: "A scalar subquery returning multiple rows, accidental correlation that repeats expensive work, using NOT IN when the subquery may contain NULL, and assuming a CTE is always materialized.",
      challenge: "Find customers who have placed at least one order and those who have never ordered. Compare EXISTS with a join and explain the expected output when duplicate orders exist.",
      interview: "Compare subqueries and CTEs, correlated subqueries and EXISTS, and explain the NULL hazard with NOT IN."
    },
    "sql-6": {
      concept: "Window functions calculate values across related rows without collapsing them into one row per group. They are useful for ranking, running totals, period comparisons and top-N-per-group queries while retaining each detail row.",
      mechanics: "OVER defines a window, PARTITION BY separates groups, and ORDER BY defines sequence inside each partition. ROW_NUMBER assigns unique sequence numbers, RANK leaves gaps after ties, and DENSE_RANK does not. The window frame affects running calculations and should be specified when the default is not the intended behavior.",
      pitfalls: "Using a non-deterministic order for row_number, confusing rank variants, omitting the correct partition key, and relying on a default frame that does not match the desired running-total semantics.",
      challenge: "Rank employees by salary within each department, keep the top three per department, and test ties in salary with both RANK and DENSE_RANK.",
      interview: "Compare window functions with GROUP BY, ROW_NUMBER with RANK/DENSE_RANK, and explain PARTITION BY versus a window frame."
    },
    "sql-7": {
      concept: "A schema defines tables, types, keys and constraints. Normalization reduces update anomalies by separating facts that belong to different entities; denormalization may later improve a measured workload but must preserve consistency.",
      mechanics: "Primary keys uniquely identify rows; foreign keys enforce references; UNIQUE, CHECK and NOT NULL constraints enforce additional invariants. First, second and third normal forms address repeating groups, partial dependency and transitive dependency under their formal assumptions.",
      pitfalls: "Using natural labels as unstable keys, duplicating a fact in many rows, assuming application validation is enough without database constraints, and normalizing or denormalizing without understanding access patterns.",
      challenge: "Design a customer-order-order-line schema, state each entity's key and functional dependencies, and explain which update anomalies a normalized design avoids.",
      interview: "Explain primary and foreign keys, normalization through third normal form, and when denormalization may be justified."
    },
    "sql-8": {
      concept: "INSERT, UPDATE and DELETE change persisted rows. Correct data mutation needs a precise predicate, integrity constraints and a transaction boundary where several statements must succeed together. The number of affected rows is part of the operation's outcome.",
      mechanics: "UPDATE changes rows matching WHERE; omitting WHERE can update every row. DELETE removes matching rows but may be restricted by foreign keys. RETURNING is supported by some databases and can report changed rows. Parameter binding keeps data separate from SQL syntax.",
      pitfalls: "Running UPDATE or DELETE without verifying the predicate, building SQL by concatenating input, ignoring affected-row counts, and applying multi-step changes without a transaction can corrupt data.",
      challenge: "Implement a stock decrement that refuses negative inventory, checks the affected-row count and rolls back when a later step fails. Test insufficient stock and concurrent updates.",
      interview: "Explain why UPDATE without WHERE is dangerous, how parameterized queries prevent injection, and how transactions protect multi-step changes."
    },
    "sql-9": {
      concept: "A transaction groups database work into an atomic unit. Isolation defines which concurrent effects a transaction may observe; locking and MVCC are implementation techniques that help preserve consistency under concurrent access.",
      mechanics: "ACID describes atomicity, consistency, isolation and durability. Depending on the database, isolation levels permit different phenomena such as non-repeatable reads or phantom rows. Deadlocks can occur when transactions acquire locks in conflicting orders; the database may abort one transaction.",
      pitfalls: "Assuming every database implements isolation levels identically, holding transactions open while waiting on a user, retrying a non-idempotent operation blindly, and ignoring deadlock or serialization errors.",
      challenge: "Transfer money between two accounts in one transaction, validate the balance, force a failure between updates, and prove that rollback restores the original balances.",
      interview: "Explain ACID, compare common isolation levels, and describe how deadlocks arise and how an application should handle a retryable transaction failure."
    },
    "sql-10": {
      concept: "Indexes trade extra storage and write work for faster access paths. EXPLAIN shows how a database plans to retrieve and combine rows; performance tuning should begin with a representative query and measured plan rather than adding indexes by intuition.",
      mechanics: "B-tree indexes commonly support equality and range searches; composite index usefulness depends on column order and query predicates. Statistics influence cardinality estimates. EXPLAIN ANALYZE executes a query in systems that support it, so use care with statements that modify data.",
      pitfalls: "Indexing every column, ignoring index maintenance cost, applying non-sargable expressions to filtered columns, tuning against tiny sample data, and treating estimated cost as a direct millisecond measurement.",
      challenge: "Compare the plan for a filtered date-range query before and after an appropriate composite index. Record row estimates, actual rows and execution time using representative data.",
      interview: "Explain how indexes work at a high level, what a query plan reveals, and why an index can fail to improve a query."
    },
    "sql-11": {
      concept: "Views provide named query interfaces; stored procedures and user-defined functions package logic inside the database with database-specific semantics. These features can centralize rules, but they also introduce deployment, permission and portability considerations.",
      mechanics: "A normal view stores a query definition, not necessarily its result; a materialized view stores results and needs refresh behavior. Procedures and functions differ across database engines in return semantics, transaction control and invocation. Grant only the permissions required for each role.",
      pitfalls: "Assuming every view is materialized, creating procedures that hide critical business logic from source control, granting excessive execution privileges, and relying on vendor-specific syntax without documenting it.",
      challenge: "Create a view for a safe public customer report, restrict access to underlying sensitive columns, and document how the view changes when the base schema evolves.",
      interview: "Compare views and materialized views, discuss procedures versus functions in a chosen database, and explain how database permissions support least privilege."
    },
    "sql-12": {
      concept: "Analytical SQL transforms event-level records into measures and cohorts while preserving the correct grain. A running total, pivot or cohort-retention table is only meaningful when the time zone, date bucket, denominator and missing-data policy are explicit.",
      mechanics: "Conditional aggregation uses CASE inside aggregate functions; date truncation and interval arithmetic are database-specific; window functions can compute cumulative sums. Cohort queries assign entities to a start period and compare later activity against a clearly defined cohort denominator.",
      pitfalls: "Double-counting after joins, mixing event and user grain, treating missing activity as zero without defining the metric, inconsistent time zones, and comparing cohorts with different observation windows.",
      challenge: "Build a monthly active-user and retention report from event records. State the cohort definition, timezone, deduplication rule and denominator, then test users with no later activity.",
      interview: "Explain grain, conditional aggregation, running totals and cohort retention, and identify the assumptions required for a trustworthy analytics query."
    }
  });
  add({
    "go-1": {
      concept: "A Go program is organized into packages, with modules defining dependency and version boundaries. The toolchain compiles Go source into an executable, while go run is convenient for development. Explicit package structure makes code easier to build, test and reuse.",
      mechanics: "A package declares its name and imports; an exported identifier begins with an uppercase letter. go.mod records the module path and Go version directive. The go command handles compilation, dependency resolution, formatting and tests through consistent project commands.",
      pitfalls: "Running commands outside the intended module, forgetting imports, confusing package names with module paths, committing generated binaries, and relying on unpinned or unexplained dependencies.",
      challenge: "Create a module with a main package and a reusable internal package, run gofmt, add one unit test, and document the commands needed to build and test from a clean checkout.",
      interview: "Explain packages versus modules, how exported identifiers are named, and why gofmt and the go toolchain are important to Go projects."
    },
    "go-2": {
      concept: "Go is statically typed and uses explicit declarations plus inference with :=. Zero values make variables usable without constructors, but the zero value is only appropriate when it represents a valid initial state. Constants and typed conversions should communicate domain meaning.",
      mechanics: "A short declaration creates new local variables; var can declare package or local variables with an explicit type. Numeric types do not implicitly convert between widths. A type assertion or conversion has different semantics, and integer overflow behavior should be considered for domain constraints.",
      pitfalls: "Assuming numeric types convert implicitly, shadowing an outer variable with :=, using a zero value as if it meant 'not provided', and ignoring precision or overflow constraints.",
      challenge: "Write a parser for a positive quantity that distinguishes missing, malformed and valid input. Add tests for zero, negative values, large values and conversion errors.",
      interview: "Compare var and :=, explain zero values and shadowing, and describe why Go requires explicit conversions between different numeric types."
    },
    "go-3": {
      concept: "Go uses if, for and switch to express control flow. There is only one loop keyword, for, which can act as a classic counter loop, condition loop or range iteration. Clear branch structure reduces hidden state and makes termination easier to reason about.",
      mechanics: "A range loop produces values according to the ranged-over type. When ranging over maps, iteration order is unspecified. switch cases do not fall through by default. A short statement can scope a variable to an if or switch statement.",
      pitfalls: "Assuming map iteration is ordered, capturing a loop variable incorrectly in concurrent closures on older language versions, mutating a collection while reasoning as if it were stable, and creating a loop with no termination path.",
      challenge: "Summarize values from a slice, classify a parsed input with switch, and test empty data. Then sort map keys explicitly when deterministic output is required.",
      interview: "Explain Go's range semantics, map iteration ordering, switch fallthrough behavior, and how loop-variable semantics differ across language versions."
    },
    "go-4": {
      concept: "Arrays have a fixed length that is part of their type; slices are descriptors over an underlying array and are the usual sequence abstraction. Maps provide key/value lookup, while structs group related fields into a domain record.",
      mechanics: "A slice contains a pointer to storage, length and capacity. Appending may reuse or allocate an underlying array; two slices can therefore share storage and observe mutations. A map lookup can return both value and presence. A nil map can be read but not assigned into.",
      pitfalls: "Assuming append always preserves backing storage, retaining a slice of a huge buffer, writing to a nil map, confusing len with cap, and mutating a slice that aliases another part of the program.",
      challenge: "Implement a word counter using a map and a slice transformation. Test nil and empty collections, and demonstrate how append can affect another slice sharing the same backing array.",
      interview: "Compare array and slice, explain slice length/capacity and append, and describe the comma-ok map lookup and nil map behavior."
    },
    "go-5": {
      concept: "Functions define behavior and return values; methods attach behavior to a receiver; errors are ordinary values that callers are expected to inspect. This explicit error model encourages local handling and makes failure paths visible in signatures.",
      mechanics: "A method can use a value or pointer receiver. Multiple return values commonly return result and error. Wrapping with %w preserves error identity for errors.Is/errors.As. defer schedules cleanup at function return, and its arguments are evaluated when defer is registered.",
      pitfalls: "Ignoring returned errors, comparing wrapped errors by string, using defer in a very long loop, choosing pointer receivers inconsistently, and returning an error that loses useful context.",
      challenge: "Write a file-processing function that returns a wrapped error with operation context, closes the file reliably, and has tests that distinguish a missing file from malformed content.",
      interview: "Explain Go's explicit error handling, error wrapping with %w, value versus pointer receivers, and when defer runs."
    },
    "go-6": {
      concept: "Structs model records, pointers allow access to a value through its address, and interfaces describe behavior satisfied implicitly by types. Interfaces are most useful when they are small and owned by the code that needs the behavior.",
      mechanics: "A pointer receiver can mutate the original value and may be required to satisfy an interface. A nil pointer stored inside a non-nil interface can make the interface itself non-nil. Interfaces are satisfied by method sets rather than explicit declarations.",
      pitfalls: "Returning typed nil through an interface, using pointers without clear ownership, defining large interfaces too early, and confusing copying a struct with copying resources referenced by its fields.",
      challenge: "Define a small Store interface and provide an in-memory implementation for tests. Include a typed-nil case and explain why interface comparison does not always reveal a nil underlying pointer.",
      interview: "Explain implicit interface satisfaction, method sets and pointer receivers, and the typed-nil interface pitfall."
    },
    "go-7": {
      concept: "Goroutines are lightweight concurrent executions managed by the Go runtime; channels communicate values between goroutines. Concurrency describes overlapping progress, while parallelism describes simultaneous execution on multiple processing resources.",
      mechanics: "An unbuffered channel send and receive synchronize; buffered channels allow a bounded number of values without an immediate receiver. Closing a channel signals that no more values will be sent, not that all receivers should close it. A goroutine exits when its function returns, but a blocked goroutine can leak.",
      pitfalls: "Sending to a closed channel, leaking goroutines blocked on sends, sharing mutable state without synchronization, closing a channel from the wrong owner, and assuming a goroutine automatically terminates when the caller stops caring.",
      challenge: "Build a worker pool with a fixed number of workers and a jobs channel. Ensure all workers terminate, errors are collected, and the test does not hang when the input is empty.",
      interview: "Compare concurrency and parallelism, explain channel buffering and closure, and describe common goroutine leak patterns."
    },
    "go-8": {
      concept: "Embedding promotes fields and methods from an embedded type, while composition lets one type delegate work to another. Interfaces decouple callers from implementation details and make substitution possible in tests.",
      mechanics: "An embedded field is not classical inheritance; method promotion follows Go's selector rules and can introduce ambiguity. A type may implement several small interfaces, and a compile-time interface assertion can verify that it satisfies a contract.",
      pitfalls: "Treating embedding as a full subtype relationship, accidentally exposing methods through embedding, building large interfaces for every implementation, and coupling business logic to concrete infrastructure.",
      challenge: "Create a service that depends on a small repository interface, use an in-memory fake in unit tests, and compare composition with embedding for the same design.",
      interview: "Explain embedding versus inheritance, implicit interface implementation, and why small consumer-owned interfaces improve testability."
    },
    "go-9": {
      concept: "WaitGroup coordinates completion, select chooses among ready channel operations, and context carries cancellation/deadline signals across API boundaries. These primitives help structure concurrent work, but cancellation is cooperative and every goroutine must decide how to respond.",
      mechanics: "A WaitGroup counter must be incremented before the goroutine can finish and each completed task must call Done. select can include a default case, which makes it non-blocking. Context cancellation propagates to children when passed correctly; it does not forcibly stop arbitrary code.",
      pitfalls: "Calling Add after Wait begins, forgetting Done, using time.Sleep as synchronization, ignoring context cancellation, and creating background work without a clear owner or shutdown path.",
      challenge: "Implement a concurrent request fan-out with a deadline, bounded workers and cancellation. Verify that blocked work exits and that errors do not cause the test to wait forever.",
      interview: "Explain WaitGroup lifecycle, select behavior, context cancellation, and why cancellation must be checked by the code doing the work."
    },
    "go-10": {
      concept: "An HTTP service maps requests to handlers, validates inputs, performs domain work and serializes responses. JSON is a data format, not a validation policy. Database access should use context-aware calls and parameterized SQL.",
      mechanics: "http.Handler and ServeMux route requests; handlers should set status and content type deliberately. json.Decoder can decode request bodies, but the application still needs size limits, schema checks and unknown-field policy. database/sql manages a connection pool and uses context for cancellable operations.",
      pitfalls: "Trusting decoded JSON without validation, reading unbounded request bodies, forgetting timeouts, concatenating SQL input, leaking database rows, and returning internal error details to clients.",
      challenge: "Build a small CRUD API with request-size limits, input validation, context deadlines, parameterized persistence and tests for malformed JSON, missing records and database errors.",
      interview: "Explain handler responsibilities, JSON decoding versus validation, context propagation, and how database/sql manages connections."
    },
    "go-11": {
      concept: "Go tests are regular Go files that verify behavior; benchmarks measure repeated operations, while fuzz tests explore many generated inputs. Formatting, vetting and module hygiene help keep projects consistent and maintainable.",
      mechanics: "Test functions begin with Test and receive *testing.T. Benchmarks use the testing.B harness; fuzz targets define seed cases and then explore inputs. Race detection can reveal data races in executed paths but does not prove every possible schedule is safe.",
      pitfalls: "Tests depending on order, benchmarks that include setup unintentionally, nondeterministic timing assertions, failing to reset shared state, and assuming race detection or coverage proves correctness.",
      challenge: "Add unit tests for a parser, a fuzz target for malformed input, a benchmark for the hot path, and a CI command that runs tests, vet and the race detector where supported.",
      interview: "Compare tests, benchmarks and fuzz tests; explain what the race detector can and cannot prove; and describe how modules support repeatable dependencies."
    },
    "go-12": {
      concept: "A production Go service needs bounded resources, explicit timeouts, observable failure behavior and a clear shutdown lifecycle. Cloud-native readiness is not just a successful process start: the service must be able to handle its intended workload and stop without abandoning critical work.",
      mechanics: "Use contexts and server timeouts, structured logs, health/readiness endpoints and graceful shutdown. Configure connection pools and worker counts deliberately. Profile CPU, memory and blocking behavior before optimizing, and track dependencies for known vulnerabilities.",
      pitfalls: "Unbounded goroutines or queues, missing HTTP timeouts, logging secrets, treating liveness as readiness, and shutting down without draining in-flight requests.",
      challenge: "Harden the HTTP service with timeouts, health endpoints, graceful shutdown, bounded concurrency and a load-test baseline. Document which signals indicate a process failure versus an unavailable dependency.",
      interview: "Explain graceful shutdown, liveness versus readiness, bounded concurrency and how profiling informs Go performance work."
    },
    "rust-1": {
      concept: "Cargo manages Rust projects, dependencies, builds and tests. A crate is a compilation unit, while a package may contain one or more crates and metadata in Cargo.toml. Toolchain versions and feature flags affect the code that compiles.",
      mechanics: "cargo new creates a project, cargo build compiles it, cargo run builds and executes, and cargo test runs tests. Cargo.lock records resolved versions for applications. Rust's compiler checks ownership and type rules before producing executable code.",
      pitfalls: "Editing Cargo.toml without understanding features, confusing package and crate, ignoring compiler diagnostics, and relying on undeclared local dependencies or toolchain versions.",
      challenge: "Create a library crate plus a binary that calls it, add a unit test and an integration test, and reproduce the build with cargo test from a clean checkout.",
      interview: "Explain crate versus package, the role of Cargo.toml and Cargo.lock, and why Rust compiler errors are central to the development workflow."
    },
    "rust-2": {
      concept: "Rust variables are immutable by default, and types express the shape and allowed operations of values. Control flow is expression-oriented in many contexts, so if and match can produce values. Explicit mutability helps reveal where program state changes.",
      mechanics: "let binds a name, mut permits mutation, and shadowing creates a new binding with the same name. Integer types have explicit widths; casts can truncate or reinterpret values, so conversions should be chosen deliberately. Match must cover all possible cases unless a wildcard is used.",
      pitfalls: "Assuming variables are mutable by default, using unchecked casts for potentially out-of-range data, forgetting match exhaustiveness, and mixing expression return values with semicolon-terminated statements.",
      challenge: "Write a parser that converts text into a bounded integer, handles invalid and out-of-range input, and uses match to classify the parsed result.",
      interview: "Explain immutability by default, shadowing versus mutability, expression-oriented control flow, and why casts may lose information."
    },
    "rust-3": {
      concept: "Ownership gives each value a clear owner responsible for its lifetime. Borrowing lets code access a value without taking ownership, while borrowing rules prevent unsafe aliasing and mutation combinations at compile time. These rules replace many runtime memory errors with compile-time constraints.",
      mechanics: "Moving a non-Copy value transfers ownership; borrowing with & creates a shared reference and &mut creates an exclusive mutable reference. A mutable borrow cannot overlap with incompatible borrows. Lifetimes describe how references relate to valid scopes; they do not extend the life of a value.",
      pitfalls: "Cloning to silence every borrow-checker error, returning references to local values, keeping a mutable borrow while trying to read the same value elsewhere, and assuming a lifetime annotation changes runtime lifetime.",
      challenge: "Write a function that reads a string slice and another that mutates a vector through a mutable reference. Explain each borrow and refactor one ownership error without unnecessary cloning.",
      interview: "Explain move semantics, shared versus mutable borrowing, and why lifetime annotations describe relationships rather than keeping data alive."
    },
    "rust-4": {
      concept: "Structs group fields into a record, enums define a closed set of variants, and match makes variant handling explicit. Modeling a domain with an enum can prevent invalid combinations that would otherwise be represented by several loosely related booleans.",
      mechanics: "Struct update syntax can reuse fields from another value, and enum variants may carry data. Match patterns destructure values and must be exhaustive. Methods live in impl blocks; associated functions do not receive self automatically.",
      pitfalls: "Using many booleans to represent mutually exclusive states, matching only the variants currently expected, exposing fields that violate invariants, and confusing associated functions with instance methods.",
      challenge: "Represent a network request as Pending, Success(data) or Failure(error). Implement a function that handles every state and test how adding a new variant exposes missing match arms.",
      interview: "Compare structs and enums, explain exhaustive matching and destructuring, and describe why algebraic data types help model state safely."
    },
    "rust-5": {
      concept: "Vec stores a growable sequence, String owns UTF-8 text, and HashMap associates keys with values. Their APIs expose ownership and borrowing explicitly, so a method may take ownership, borrow immutably or borrow mutably depending on its contract.",
      mechanics: "Vec indexing panics when out of bounds, while get returns an Option reference. Rust String is UTF-8 and cannot be indexed by an arbitrary integer because a byte offset may split a character. HashMap get borrows a value and insert may replace an existing value.",
      pitfalls: "Indexing without bounds checks, assuming String indexes are character positions, cloning large collections unnecessarily, and holding a map borrow while mutating the same map.",
      challenge: "Count words in a UTF-8 text file with HashMap, handle empty input, and compare safe get-based access with indexing. Include a multi-byte character in the test data.",
      interview: "Explain Vec versus arrays, why String cannot be indexed like a byte array, and how borrowing affects collection mutation."
    },
    "rust-6": {
      concept: "Option represents a value that may be absent; Result represents success or failure with an error value. These enums force the caller to confront uncertainty rather than relying on null or silently ignoring an error.",
      mechanics: "match, if let and combinators such as map, and_then and unwrap_or transform optional or fallible values. The question-mark operator propagates an error when the surrounding function's return type supports it. unwrap panics when the value is absent or erroneous.",
      pitfalls: "Using unwrap on untrusted input, discarding error context, confusing absence with failure, and converting every error to a generic string too early can hide useful recovery decisions.",
      challenge: "Parse configuration into a Result, distinguish missing optional settings from malformed required settings, and propagate errors with context rather than panicking.",
      interview: "Compare Option and Result, explain the question-mark operator, and state when unwrap is acceptable versus dangerous."
    },
    "rust-7": {
      concept: "Traits define shared behavior and generics parameterize code over types. Together they allow reusable abstractions while preserving compile-time guarantees. Trait bounds state which behavior a generic function needs, rather than requiring a concrete class hierarchy.",
      mechanics: "A type implements a trait with an impl block. Generic parameters can have bounds such as Display or Clone, and where clauses improve readability for complex bounds. Trait objects use dynamic dispatch through dyn Trait, while many generic calls use monomorphization and static dispatch.",
      pitfalls: "Adding Clone bounds merely to satisfy ownership issues, making traits too broad, confusing trait objects with generic parameters, and assuming dynamic dispatch is always slower enough to matter without measuring.",
      challenge: "Write a generic formatter over a small trait, then implement it for two unrelated types. Compare generic static dispatch with a trait object and explain the trade-off.",
      interview: "Explain traits, generic bounds, monomorphization and dyn Trait, and why a trait is not the same as a class inheritance hierarchy."
    },
    "rust-8": {
      concept: "Iterators produce values on demand, and closures are anonymous functions that may capture variables from their environment. Iterator pipelines can express transformations without intermediate collections, but lazy execution means nothing happens until a consumer requests values.",
      mechanics: "map transforms items, filter retains matching items, and collect builds a target collection. Closures can borrow, mutably borrow or move captured values depending on use and the move keyword. Iterator adapters generally consume self and return a new iterator.",
      pitfalls: "Assuming lazy adapters run before collect, capturing a value with the wrong ownership mode, collecting into a large unnecessary vector, and writing a dense chain that is harder to debug than a loop.",
      challenge: "Process a stream of records with filter and map, collect only the final report, and compare allocation behavior with a version that creates several intermediate vectors.",
      interview: "Explain lazy iterator adapters, closure capture modes, map versus filter, and why collect requires a target collection type."
    },
    "rust-9": {
      concept: "Generics abstract over types; trait bounds state the capabilities required by an implementation. Lifetimes express relationships among references, and associated types let a trait specify a related type without making every use site supply another generic parameter.",
      mechanics: "A where clause can express multiple bounds clearly. Lifetime elision follows language rules, but explicit annotations may be needed when relationships are ambiguous. Higher-ranked bounds and associated types support advanced APIs; they should be introduced only when they clarify a real contract.",
      pitfalls: "Adding lifetime annotations without understanding the relationship, returning a reference to data that does not outlive it, over-generalizing a simple function, and choosing associated types or generic parameters without considering API ergonomics.",
      challenge: "Implement a generic function that returns a reference into its input and explain the lifetime relationship. Then define a trait with an associated output type and implement it for two types.",
      interview: "Explain trait bounds, associated types versus generic parameters, and what a lifetime annotation does and does not guarantee."
    },
    "rust-10": {
      concept: "Threads, channels and async tasks model different forms of concurrent work. Rust's type and ownership system helps prevent many data races, but it does not automatically prevent deadlocks, starvation, unbounded work or incorrect cancellation behavior.",
      mechanics: "Send and Sync express cross-thread safety properties. Threads can communicate through channels or shared synchronization primitives. Async functions produce futures that must be polled by an executor; awaiting I/O can suspend a task without blocking the operating-system thread.",
      pitfalls: "Blocking an async executor with synchronous work, spawning unbounded tasks, using shared mutable state unnecessarily, assuming cancellation instantly stops all work, and confusing thread concurrency with async task scheduling.",
      challenge: "Implement a bounded worker pipeline, then compare a thread-based version with an async I/O version. Ensure errors propagate and shutdown does not leave blocked workers.",
      interview: "Explain Send and Sync, threads versus async tasks, futures and executors, and why Rust safety does not eliminate deadlocks."
    },
    "rust-11": {
      concept: "Smart pointers encode ownership patterns beyond a simple stack value. Box provides heap allocation with single ownership, Rc/Arc provide reference counting, RefCell/Mutex provide interior mutability under different checking models, and lifetimes still constrain borrowed references.",
      mechanics: "Box<T> owns a heap allocation; Rc<T> is single-threaded shared ownership; Arc<T> supports atomic reference counting across threads. RefCell checks borrowing rules at runtime, while Mutex guards synchronized access. Reference cycles involving shared pointers can leak unless weak references break the cycle.",
      pitfalls: "Choosing shared ownership by default, creating Rc/Arc cycles, holding a Mutex lock too long, causing runtime RefCell borrow panics, and using interior mutability to hide an unclear ownership design.",
      challenge: "Model a shared graph or cache, choose the minimum ownership primitive needed, and explain how a cycle is avoided and what thread-safety guarantees the design provides.",
      interview: "Compare Box, Rc and Arc; explain interior mutability, Mutex and RefCell; and describe why reference cycles can leak."
    },
    "rust-12": {
      concept: "A production Rust design combines explicit error contracts, ownership boundaries, tests and measured performance. The borrow checker prevents classes of memory errors, but domain validation, resource limits, concurrency design and operational diagnostics remain application responsibilities.",
      mechanics: "Use Result at fallible boundaries, keep domain types responsible for invariants, and separate I/O adapters from pure logic. Cargo features and dependency versions influence compiled behavior. Benchmarks should use representative workloads, and unsafe blocks need a documented safety invariant.",
      pitfalls: "Using unsafe without a written invariant, hiding failures with unwrap, adding clones without measuring, exposing internal mutable state, and assuming compiler safety implies business correctness.",
      challenge: "Build a CLI or small service with validated input, structured errors, unit tests, dependency hygiene and a benchmark for one measured hot path. Explain any unsafe code or remove it.",
      interview: "Explain why memory safety is not the same as application correctness, how to structure Result-based errors, and how you would review unsafe code and benchmark claims."
    }
  });
  window.CodeAtlasTopicDepth = {
    render,
    count: () => Object.keys(lessons).length,
    has: id => Object.prototype.hasOwnProperty.call(lessons, id),
    add
  };
})();
