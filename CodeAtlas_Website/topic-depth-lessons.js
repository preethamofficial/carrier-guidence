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
  window.CodeAtlasTopicDepth = {
    render,
    count: () => Object.keys(lessons).length,
    has: id => Object.prototype.hasOwnProperty.call(lessons, id),
    add
  };
})();
