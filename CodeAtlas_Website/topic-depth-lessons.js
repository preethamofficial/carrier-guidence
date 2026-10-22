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
  add({
    "csharp-1": {
      concept: "C# source is compiled into an intermediate language and executed by the .NET runtime, commonly with just-in-time compilation. The SDK provides build and development commands; the target framework selects available APIs and runtime compatibility.",
      mechanics: "A project file declares target framework and dependencies. dotnet build compiles, dotnet run launches and dotnet test runs tests. Top-level statements simplify entry points but do not remove the underlying program model.",
      pitfalls: "Using a mismatched SDK, confusing a class library with an executable, relying on machine-specific paths, and assuming that successful compilation proves runtime configuration is correct.",
      challenge: "Create a console app plus a class library, target an explicit .NET version, add a unit test and document the commands for restore, build, run and test.",
      interview: "Explain the roles of the .NET SDK, runtime and target framework, and how a C# application is built and executed."
    },
    "csharp-2": {
      concept: "C# has value types and reference types, nullable annotations and explicit conversion rules. Value-type assignment copies the value; reference-type assignment copies a reference, so both variables can observe the same object's mutation.",
      mechanics: "The compiler performs static type checking. Nullable reference types provide warnings about possible null usage but do not create runtime validation. Numeric conversions can be checked or unchecked; decimal is often suitable for base-10 financial calculations.",
      pitfalls: "Assuming nullable annotations prevent null at runtime, using == without understanding operator behavior, unchecked overflow, unboxing invalid values, and using binary floating point for exact currency arithmetic.",
      challenge: "Implement a validated invoice calculator, enable nullable reference analysis, and test missing values, overflow-sensitive inputs and currency rounding.",
      interview: "Compare value and reference types, explain nullable reference types, and describe checked versus unchecked numeric conversions."
    },
    "csharp-3": {
      concept: "Conditions, loops and arrays control execution and store fixed-length sequences. Arrays are zero-indexed, and the last valid index is Length - 1. Collections and LINQ provide higher-level operations but do not remove the need to understand iteration boundaries.",
      mechanics: "foreach traverses an enumerable without exposing index updates; for is useful when index control matters. LINQ queries may be deferred until enumerated, depending on the operator. Array bounds are checked and an invalid index throws an exception.",
      pitfalls: "Off-by-one bounds, modifying a collection during enumeration, enumerating a deferred query repeatedly, and assuming a LINQ query has already executed when it was declared.",
      challenge: "Summarize marks in an array, filter passing values with LINQ, and test empty input and repeated enumeration. Explain whether the source collection changes.",
      interview: "Compare for and foreach, explain deferred LINQ execution, and describe how array bounds and empty sequences should be handled."
    },
    "csharp-4": {
      concept: "Methods define callable contracts. Optional parameters, named arguments, overloads and ref/out/in modifiers change how a caller supplies or receives data. An API should make mutation and return behavior clear rather than relying on hidden side effects.",
      mechanics: "Overload resolution occurs at compile time. C# passes arguments by value by default, including references to objects; ref and out alter parameter passing semantics. Async methods commonly return Task or Task<T> rather than blocking for a result.",
      pitfalls: "Ambiguous overloads, too many optional parameters, confusing ref/out with ordinary reference-type parameters, and returning mutable internal collections without defining ownership or mutability.",
      challenge: "Design a parser with clear overloads or TryParse-style results, then test invalid input and demonstrate how passing a reference by value differs from using ref.",
      interview: "Explain overload resolution, value passing for object references, and the intended distinction between ref, out and in."
    },
    "csharp-5": {
      concept: "Collections encode data structure semantics; generics preserve element types, and LINQ composes filtering, projection, grouping and aggregation. A collection should be chosen according to ordering, uniqueness, lookup and mutation requirements.",
      mechanics: "List<T> is a resizable ordered collection, HashSet<T> enforces uniqueness, and Dictionary<TKey,TValue> provides key lookup. IEnumerable<T> supports enumeration; many LINQ operators are deferred while materialization methods such as ToList execute the query.",
      pitfalls: "Assuming deferred queries are cached, modifying a collection while enumerating it, using a mutable object as a dictionary key, and choosing a collection without considering duplicate and ordering rules.",
      challenge: "Group order records by customer, compute totals, and compare a deferred query with a materialized list. Test duplicate IDs and empty input.",
      interview: "Compare List, HashSet and Dictionary, explain deferred execution and materialization, and describe how equality affects hash-based collections."
    },
    "csharp-6": {
      concept: "Classes model reference-type objects; properties expose controlled access to state, and constructors establish invariants. Encapsulation means callers use a stable public contract rather than directly changing internal representation.",
      mechanics: "Auto-properties generate backing storage; init-only setters allow initialization without ordinary later mutation. Records are useful for value-oriented data models, but a record containing mutable references is not deeply immutable. Dependency injection can supply collaborators.",
      pitfalls: "Public setters that permit invalid state, large classes with unrelated responsibilities, assuming records deep-copy their members, and creating hidden service dependencies inside constructors.",
      challenge: "Model an order with validated quantity and status transitions. Use private state and public operations, then test that invalid transitions are rejected.",
      interview: "Explain fields versus properties, class versus record, object invariants, and how dependency injection reduces coupling."
    },
    "csharp-7": {
      concept: "Inheritance models an is-a relationship, and virtual dispatch lets derived implementations specialize behavior through a base contract. Polymorphism is useful when callers can rely on the same behavioral expectations for every implementation.",
      mechanics: "virtual members may be overridden; abstract members require implementation; sealed can restrict further inheritance. Overload resolution is compile-time, while overridden virtual methods dispatch at runtime. Composition is often preferable when a type merely needs another capability.",
      pitfalls: "Deep inheritance trees, violating base-class assumptions, hiding rather than overriding a method, and using inheritance as a shortcut for sharing unrelated code.",
      challenge: "Implement two notification providers behind a common abstraction and test them through the shared contract. Show where composition is a better fit than a subclass.",
      interview: "Compare overriding and method hiding, explain virtual dispatch, and apply the Liskov substitution principle to a concrete design."
    },
    "csharp-8": {
      concept: "Interfaces define capabilities; exceptions report failures; files and streams are resources that must be disposed. These concerns meet at application boundaries, where code should isolate infrastructure from business rules and make failure handling explicit.",
      mechanics: "IDisposable and using ensure deterministic cleanup for resources. Exceptions propagate until handled; catch only where recovery or translation is possible. Interfaces can be injected so unit tests substitute a fake implementation for filesystem or network access.",
      pitfalls: "Swallowing exceptions, failing to dispose streams, catching exceptions too broadly, using platform-default text encoding, and coupling domain logic directly to filesystem APIs.",
      challenge: "Build a file-backed repository behind an interface, dispose resources with using, and test missing file, malformed input and write failure without coupling domain tests to the real filesystem.",
      interview: "Explain IDisposable and using, interface-based testing, and how to preserve error context without leaking internal details."
    },
    "csharp-9": {
      concept: "async and await let a method suspend while awaiting asynchronous work. Task represents an operation that may complete later; it is not synonymous with a dedicated thread. Asynchronous I/O improves scalability by avoiding blocked threads while waiting for external systems.",
      mechanics: "Awaiting a Task resumes the async method when completion is signaled. Task.WhenAll combines independent tasks; cancellation is cooperative through CancellationToken. Async exceptions are observed through the returned task, so callers should await or otherwise observe it.",
      pitfalls: "Using .Result or .Wait in async call paths, fire-and-forget tasks whose failures are lost, omitting cancellation, assuming async automatically parallelizes CPU work, and holding locks across awaits.",
      challenge: "Implement an API client with cancellation and timeout behavior, await two independent calls concurrently, and test success, failure and cancellation.",
      interview: "Compare Task and Thread, explain async I/O, Task.WhenAll and cancellation tokens, and describe why unobserved fire-and-forget failures are dangerous."
    },
    "csharp-10": {
      concept: "Delegates represent callable behavior, events provide a publish/subscribe contract, and LINQ offers composable data transformations. These abstractions are useful when they make the producer-consumer relationship clearer and keep side effects at visible boundaries.",
      mechanics: "A delegate type defines a method signature. Events restrict ordinary callers to subscribe or unsubscribe rather than invoke the event directly. LINQ operators may be deferred, and expression trees are distinct from compiled delegates because they represent code as data for inspection.",
      pitfalls: "Event subscribers that are never detached, event handlers that throw and disrupt publishers, side effects inside deferred LINQ queries, and using complex LINQ expressions where a named method is clearer.",
      challenge: "Build a small order-processing pipeline with a delegate-based predicate and an event for status changes. Test subscriber lifecycle and verify when the LINQ query actually executes.",
      interview: "Compare delegates and events, explain event subscription leaks, and distinguish deferred LINQ queries from materialized results."
    },
    "csharp-11": {
      concept: "File I/O and LINQ often meet in data-import tasks. Correct code must validate file content, dispose resources, preserve useful error context and avoid repeatedly enumerating a deferred query when its source can change or be expensive.",
      mechanics: "StreamReader and File APIs expose different loading and streaming choices. Explicit encodings make text interpretation stable. LINQ Select transforms records, Where filters them and GroupBy groups by a key; ToList materializes the results and incurs memory cost.",
      pitfalls: "Reading huge files fully into memory, assuming malformed data is impossible, catching and ignoring IOException, enumerating a query multiple times, and failing to document culture-sensitive parsing rules.",
      challenge: "Stream a large CSV file, validate rows, aggregate by category and report malformed line numbers. Compare streaming memory use with loading the full file into a list.",
      interview: "Explain streaming versus buffering, explicit encoding, deferred execution, and how to design error reporting for a data import."
    },
    "csharp-12": {
      concept: "A production application integrates domain logic, API or UI boundaries, persistence, configuration, tests and observability. Good architecture keeps domain rules independent from frameworks while still using framework-supported dependency injection and hosting conventions.",
      mechanics: "Separate controllers or endpoints from services and repositories. Validate request DTOs, use structured logging and health checks, configure timeouts, and keep secrets in deployment configuration. Integration tests should verify real serialization and persistence boundaries.",
      pitfalls: "Business logic in controllers, unvalidated DTOs, hard-coded secrets, missing request timeouts, flaky integration tests and logging sensitive data are common production defects.",
      challenge: "Build a small API with a service layer, repository interface, validation, structured logs, health endpoint and tests for authorization and persistence failures. Document startup and deployment.",
      interview: "Explain separation of concerns, dependency injection, unit versus integration testing, and what production readiness requires beyond a successful local build."
    },
    "c-1": {
      concept: "A C toolchain transforms source into an executable through preprocessing, compilation, assembly and linking. The language standard and compiler flags determine which constructs are accepted and which diagnostics are available. Program structure separates declarations, definitions and the entry point.",
      mechanics: "The preprocessor expands includes and macros; the compiler translates each translation unit; the linker resolves external symbols. main is the hosted program entry point. Header files publish declarations, while source files normally hold definitions. A successful link does not prove runtime memory safety.",
      pitfalls: "Missing function prototypes, incompatible declarations across files, relying on non-standard extensions, ignoring compiler warnings, and confusing compile-time success with runtime correctness.",
      challenge: "Split a small program into a header, implementation file and main file. Compile with C11 and strict warnings, then explain the role of each build stage.",
      interview: "Explain preprocessing, compilation and linking; distinguish declarations and definitions; and state why warnings and a language-standard flag matter."
    },
    "c-2": {
      concept: "C types define object representation, alignment, range and permitted operations. Initialization differs from later assignment, and implicit conversions can change signedness or lose precision. Portable code checks the actual type limits rather than assuming every platform has identical widths.",
      mechanics: "Integer promotions and the usual arithmetic conversions determine operand types before many operations. Unsigned arithmetic wraps modulo its range; signed overflow is undefined behavior. Format specifiers must match the argument types passed to variadic functions such as printf.",
      pitfalls: "Signed overflow, mismatched printf specifiers, signed/unsigned comparison surprises, uninitialized automatic variables and narrowing conversions that silently lose information.",
      challenge: "Write a numeric summary program that validates input range, prints each value with the correct format specifier, and tests negative, zero and maximum permitted values.",
      interview: "Explain integer promotions, signed overflow, unsigned wraparound, and why printf format mismatches can cause undefined behavior."
    },
    "c-3": {
      concept: "Conditions choose branches and loops repeat a block while a condition permits it. C's expression rules make it possible to write compact control flow, but explicit comparisons and clear loop invariants are easier to review.",
      mechanics: "A for loop performs initialization once, checks the condition before each iteration, then executes the update. break exits the nearest loop or switch; continue advances to the next loop iteration. A switch dispatches on an integer-like expression and normally needs explicit break statements to avoid fallthrough.",
      pitfalls: "Off-by-one conditions, accidental assignment inside a condition, missing switch breaks, empty-loop bodies caused by stray semicolons, and loop variables that never change.",
      challenge: "Implement a range-based summary with min/max and count. Test an empty input policy, a single element and boundary values; use compiler warnings to catch suspicious expressions.",
      interview: "Explain for-loop execution order, break versus continue, switch fallthrough and how to reason about loop termination."
    },
    "c-4": {
      concept: "A function has a declaration, a definition and a calling contract. Scope controls where names are visible, storage duration controls how long objects exist, and linkage controls whether declarations across translation units refer to the same entity.",
      mechanics: "Parameters are passed by value; pointers allow a function to modify a caller-owned object indirectly. A prototype informs the compiler of parameter and return types. static at file scope gives internal linkage, while automatic local objects normally cease to exist when their block ends.",
      pitfalls: "Returning the address of a local variable, missing prototypes, accidental global state, mismatched declarations across files and assuming a pointer parameter means ownership transfer.",
      challenge: "Write a function that computes a summary through output parameters, document pointer preconditions, and split its declaration and definition into a header and source file.",
      interview: "Explain scope, storage duration and linkage; describe pass-by-value with pointers; and explain why returning a pointer to a local object is invalid."
    },
    "c-5": {
      concept: "An array is a contiguous sequence of elements, and array expressions often convert to pointers to the first element. A C string is a character array terminated by a null byte, so its capacity and terminator are part of the correctness contract.",
      mechanics: "The sizeof operator applied to an actual array yields its storage size, but a function parameter declared as an array is adjusted to a pointer. Indexing is pointer arithmetic, and the program must ensure the index remains within the array object. strlen counts bytes before the terminator, not allocated capacity.",
      pitfalls: "Out-of-bounds reads/writes, forgetting space for the null terminator, using sizeof on a pointer as if it were the original array size, and calling string functions on unterminated character storage.",
      challenge: "Write a bounded string-copy routine or use a well-defined library approach, pass capacity explicitly, and test empty input, maximum-length input and truncation.",
      interview: "Explain array-to-pointer conversion, sizeof array versus sizeof pointer, and why a C string requires a null terminator."
    },
    "c-6": {
      concept: "A pointer stores an address and carries assumptions about the object type and lifetime at that address. Dereferencing is valid only when the pointer refers to an appropriately aligned, live object. Pointer arithmetic is constrained to an array object and its one-past position.",
      mechanics: "& obtains an object's address and * accesses the pointed-to object. A null pointer represents no valid object; an uninitialized pointer has an indeterminate value. const can restrict mutation through a particular pointer path but does not automatically make every alias immutable.",
      pitfalls: "Uninitialized or dangling pointers, dereferencing NULL, pointer arithmetic outside an array, confusing pointer-to-const with const-pointer, and assuming a pointer automatically owns the referenced object.",
      challenge: "Implement a function that updates a caller-provided integer through a pointer, checks nullable input, and documents lifetime and ownership requirements. Compile with warnings and a sanitizer.",
      interview: "Explain address-of and dereference, pointer-to-const versus const-pointer, and the difference between a null, dangling and uninitialized pointer."
    },
    "c-7": {
      concept: "Dynamic allocation requests storage whose lifetime is controlled explicitly by the program. Ownership means one clearly defined part of the program is responsible for releasing that storage; borrowing means another part may use it without releasing it.",
      mechanics: "malloc returns uninitialized storage, calloc zero-initializes bytes, realloc may move the allocation, and free releases it. Allocation can fail. Allocation-size multiplication should be checked for overflow, and a temporary pointer is safer when storing realloc's result.",
      pitfalls: "Memory leaks, double free, use-after-free, dereferencing a failed allocation, losing the original pointer when realloc fails, and computing an allocation size that overflowed.",
      challenge: "Allocate an array from a validated count, grow it safely with realloc, handle allocation failure and free all owned resources on every exit path. Run a memory sanitizer where available.",
      interview: "Compare malloc, calloc and realloc, explain ownership and lifetime, and describe the safe pattern for handling realloc failure."
    },
    "c-8": {
      concept: "A struct groups fields into one record, while an enum gives names to a set of integer-like states. These types communicate domain meaning and reduce the need for unrelated variables or unexplained numeric constants.",
      mechanics: "Struct layout may include padding for alignment, so raw memory layout is not automatically a portable file or network format. Enum constants are integer-like values. Initializing a struct with designated initializers can make field intent clear when supported by the chosen C standard.",
      pitfalls: "Assuming a struct has no padding, serializing raw structs across platforms, leaving fields uninitialized, and allowing invalid state transitions because a struct's fields are public to all code that sees the definition.",
      challenge: "Model an inventory record with an enum status and validated update function. Serialize fields explicitly rather than writing raw struct bytes, and test invalid status transitions.",
      interview: "Explain struct padding and alignment, enum purpose, and why raw struct memory should not be treated as a portable serialization format."
    },
    "c-9": {
      concept: "File I/O uses streams whose operations can fail due to permissions, missing files, disk errors or encoding assumptions. Correct code checks open, read, write and close results and ensures every opened stream is closed.",
      mechanics: "fopen returns NULL on failure. fgets reads bounded text, fread/fwrite operate on byte counts, and EOF is distinct from an I/O error which can be checked with ferror. A relative path is resolved against the process working directory, not automatically the source file directory.",
      pitfalls: "Ignoring fopen failure, confusing EOF with a read error, assuming a write succeeded before fclose, using unbounded input functions, and trusting paths derived from untrusted input.",
      challenge: "Build a line-count utility that handles a missing file, empty file and read error. Use bounded reads and report errors to stderr with a nonzero exit status.",
      interview: "Explain fopen failure, EOF versus ferror, why input should be bounded, and why fclose can still report a write failure."
    },
    "c-10": {
      concept: "A data structure defines how elements are organized and which operations are efficient. Linked lists trade indexed access for node-based insertion; stacks and queues constrain how items are added and removed. The structure's ownership model is as important as its algorithm.",
      mechanics: "A singly linked list node points to the next node, with NULL marking the end. Inserting at the head is constant time when the head pointer is available; searching remains linear. Every allocated node needs a defined owner and cleanup path.",
      pitfalls: "Losing the rest of a list by overwriting a link, failing to update the head, leaking removed nodes, dereferencing NULL, and assuming linked lists outperform arrays for every workload.",
      challenge: "Implement push-front, find, remove and free-all for a singly linked list. Test empty, one-node and multi-node cases and run a memory checker.",
      interview: "Compare arrays and linked lists, explain insertion and lookup complexity, and describe ownership when deleting a linked-list node."
    },
    "c-11": {
      concept: "Debuggers inspect execution state; compiler warnings flag suspicious constructs; sanitizers detect classes of memory and undefined-behavior defects during instrumented runs. Each tool provides evidence, but none replaces tests and code review.",
      mechanics: "Build with debug symbols for source-level stepping. AddressSanitizer can detect many out-of-bounds and use-after-free errors; UndefinedBehaviorSanitizer catches selected undefined behavior. Valgrind and static analyzers provide other views depending on platform and toolchain.",
      pitfalls: "Ignoring warnings, assuming a clean sanitizer run proves correctness, testing only one input, and fixing the last visible crash instead of the earliest invalid state can leave the root cause in place.",
      challenge: "Create a small test with a deliberate out-of-bounds access in a disposable branch, reproduce it under a sanitizer, fix the defect, and retain a regression test.",
      interview: "Compare compiler warnings, debugger, AddressSanitizer and UndefinedBehaviorSanitizer, and explain why dynamic tools cannot prove all executions are safe."
    },
    "c-12": {
      concept: "A systems project should make module boundaries, ownership, input validation, failure handling and reproducible builds explicit. Performance-sensitive C is maintainable only when correctness invariants are documented and tested alongside speed.",
      mechanics: "Separate parsing, domain logic and I/O; expose declarations through headers; use explicit resource cleanup paths; and define how errors reach callers. Build targets should use a declared C standard and strict warnings. Profiling should guide optimization on representative workloads.",
      pitfalls: "One giant source file, hidden ownership, unbounded input, missing cleanup on error paths, nonportable assumptions and optimization without a repeatable benchmark undermine a systems project.",
      challenge: "Build an inventory CLI with add/list/remove operations, persistent storage, validated input, a documented ownership model, unit tests and a reproducible build command.",
      interview: "Describe how you would structure a maintainable C project, audit its memory ownership, test failure paths and measure performance without sacrificing correctness."
    }
  });
  add({
    "cpp-1": {
      concept: "Modern C++ is compiled, statically typed and multi-paradigm. The language offers low-level control but also standard abstractions for ownership, containers and algorithms. The chosen language standard and build system determine which features and libraries are available.",
      mechanics: "The compiler processes translation units and the linker resolves symbols and libraries. CMake can describe targets and dependencies independently of a particular IDE. Header inclusion and one-definition rules affect how declarations and definitions are organized across files.",
      pitfalls: "Using a compiler default without documenting the standard, including headers only indirectly, defining non-inline symbols in headers included by many translation units, and treating a successful build as proof of runtime safety.",
      challenge: "Create a CMake project with a library, executable and test target. Compile under a chosen standard with warnings enabled and reproduce the build from a clean directory.",
      interview: "Explain compilation and linking, the role of CMake targets, and why modern C++ favors explicit standard selection and direct header inclusion."
    },
    "cpp-2": {
      concept: "C++ types express representation and operations, while const, references and value categories communicate mutation and ownership. Passing by value can be ideal for small types; const references avoid copies for larger read-only values, but introduce lifetime considerations.",
      mechanics: "An lvalue identifies an object with a location; an rvalue often represents a temporary or expiring value. Move operations can transfer resources from an object, but std::move itself is a cast and does not move anything unless a suitable operation consumes the result. const limits mutation through a particular access path.",
      pitfalls: "Returning references to local objects, assuming std::move guarantees a move, accidental copies of large containers, dangling references and using signed/unsigned conversions without checking range.",
      challenge: "Write an API that accepts a small integer by value and a large record by const reference. Add a move-aware type and instrument copy/move operations to observe which operations actually occur.",
      interview: "Explain value categories, std::move, copy versus move semantics, and when pass-by-value or const reference is appropriate."
    },
    "cpp-3": {
      concept: "Control flow determines execution; functions expose reusable contracts. Modern C++ range-based loops and algorithms often communicate intent more clearly than hand-written index logic, while return types and const qualification make a function's behavior easier to reason about.",
      mechanics: "A loop condition is checked at defined points, and early return can reduce nested branching. Standard algorithms operate on iterator ranges and rely on the operations their iterator and value types support. Integer overflow and invalid indexing remain correctness concerns even in modern C++.",
      pitfalls: "Off-by-one iterator ranges, modifying a container while iterating, functions with hidden global side effects, and choosing a complex algorithm when a direct loop is clearer.",
      challenge: "Summarize a vector with min, max and count_if, test empty input and repeated values, and compare a standard algorithm with a manual loop for readability.",
      interview: "Explain iterator range boundaries, const member functions, early return, and when a standard algorithm improves clarity."
    },
    "cpp-4": {
      concept: "A class defines a type and its invariants: conditions that must remain true for every valid object. Constructors establish a valid initial state, and public methods should preserve that state. Encapsulation is about controlling state transitions, not merely making fields private.",
      mechanics: "Member initialization lists initialize members before the constructor body. RAII often follows from giving resources to members with appropriate lifetime. Copy/move constructors and assignment operators determine how objects duplicate or transfer their state; the rule of zero is preferred when standard members already manage resources.",
      pitfalls: "Leaving an object invalid after construction, using raw owning pointers, defining only some copy/move operations without considering the rest, and exposing setters that allow invalid state transitions.",
      challenge: "Design a bounded inventory counter whose constructor and methods preserve nonnegative stock. Add tests for overflow, invalid decrement and copy behavior, and implement it using standard value members.",
      interview: "Explain class invariants, member initialization order, rule of zero versus rule of five, and how encapsulation prevents invalid states."
    },
    "cpp-5": {
      concept: "RAII ties resource lifetime to object lifetime. When an owning object is destroyed, its destructor releases the resource, including when control exits through an exception. This is the central C++ technique for exception-safe memory, files, locks and other resources.",
      mechanics: "A local object's destructor runs at scope exit. unique_ptr expresses exclusive dynamic ownership; vector and string own their storage; lock_guard releases a mutex when its scope ends. Destructors should generally not throw, because throwing during stack unwinding can terminate the program.",
      pitfalls: "Raw owning pointers, manually paired new/delete, double release, leaking resources through early returns, and destructors that throw can break exception safety.",
      challenge: "Replace a manually managed buffer with vector or unique_ptr, then add an early-return error path and prove cleanup still occurs.",
      interview: "Explain RAII, deterministic destruction, exception safety, and why the rule of zero is preferable when standard resource-owning types are available."
    },
    "cpp-6": {
      concept: "Standard containers encode storage and lookup trade-offs; algorithms express operations over iterator ranges. Choosing a container requires understanding ordering, duplicate policy, iterator invalidation, complexity and memory layout.",
      mechanics: "vector stores elements contiguously and supports fast indexing; map maintains ordered keys; unordered_map uses hashing with average-case constant lookup; set models unique values. Some vector operations invalidate iterators and references when reallocation occurs. Algorithms such as sort require their range and value type to meet specified requirements.",
      pitfalls: "Keeping invalidated iterators, assuming unordered iteration is stable, choosing a node-based container without a need for it, and using an algorithm with a range that does not meet its preconditions.",
      challenge: "Implement a frequency counter, sort records by a comparator, and document why the chosen container fits the required order and access pattern. Add tests for duplicates and empty data.",
      interview: "Compare vector, map and unordered_map; explain iterator invalidation; and describe how algorithm complexity and container choice interact."
    },
    "cpp-7": {
      concept: "A pointer provides indirect access to an object, while smart pointers encode ownership. unique_ptr represents exclusive ownership, shared_ptr shared ownership, and weak_ptr a non-owning reference to a shared_ptr-managed object. Prefer values or containers unless dynamic lifetime is required.",
      mechanics: "make_unique and make_shared create managed objects safely. A shared_ptr control block tracks owners; reference cycles can keep objects alive indefinitely. References and raw pointers commonly express non-owning access, but they do not extend the lifetime of the referenced object.",
      pitfalls: "Dangling references, shared_ptr cycles, unnecessary shared ownership, using get() to transfer ownership, and manually deleting memory owned by a smart pointer cause lifetime defects.",
      challenge: "Build a tree with unique_ptr children and a separate observer reference. Explain who owns each node and test destruction behavior without introducing shared_ptr cycles.",
      interview: "Compare unique_ptr, shared_ptr and weak_ptr, explain ownership versus observation, and identify how shared ownership cycles are broken."
    },
    "cpp-8": {
      concept: "Templates let algorithms and data structures work with types that meet a set of requirements. Generic programming preserves type information at compile time and can avoid virtual dispatch, but template errors and overly abstract interfaces can become difficult to maintain.",
      mechanics: "Template arguments may be deduced from call-site values. Concepts can constrain a template with named requirements in modern C++. Type traits inspect type properties; specialization customizes behavior for selected types. Template definitions are commonly visible in headers so the compiler can instantiate them.",
      pitfalls: "Unclear compiler diagnostics from unconstrained templates, accidental copies of expensive values, overusing specialization, and placing non-inline ordinary definitions in headers alongside templates can cause build or maintenance problems.",
      challenge: "Write a generic clamp or lookup utility with an explicit concept, test it with two suitable types, and add a compile-time example that demonstrates rejection of an unsupported type.",
      interview: "Explain template argument deduction, concepts, specialization and why template definitions are commonly included in headers."
    },
    "cpp-9": {
      concept: "Exceptions propagate failures through stack unwinding; result-like types represent expected success or failure as a value. The right design depends on whether failure is exceptional, part of ordinary control flow, or must be explicitly handled by every caller.",
      mechanics: "Throwing an exception transfers control to a matching handler and destroys automatic objects during unwinding. Catch by const reference to avoid slicing. std::optional models presence/absence, while std::expected is available in C++23 implementations and models a value or error.",
      pitfalls: "Catching and discarding exceptions, throwing from destructors, catching a base exception by value, using exceptions for ordinary high-frequency branching without a clear policy, and returning ambiguous sentinel values.",
      challenge: "Design a parser that distinguishes malformed input from a valid zero value. Implement one exception-based API and one result-based API, then compare call-site clarity and test coverage.",
      interview: "Explain stack unwinding, exception safety guarantees, optional versus expected, and why exceptions should not be silently swallowed."
    },
    "cpp-10": {
      concept: "Concurrency permits overlapping execution; the C++ memory model defines which interactions between threads are valid. A data race on non-atomic shared memory is undefined behavior. Synchronization establishes ordering and visibility, not just mutual exclusion.",
      mechanics: "mutex and lock_guard protect critical sections; atomic operations provide specific memory-order guarantees; condition_variable coordinates waiting on a predicate. Thread lifetime and joining/detaching matter. A program must avoid circular lock acquisition and define shutdown behavior.",
      pitfalls: "Data races, deadlocks, waiting without a predicate, detached threads outliving referenced objects, and choosing relaxed atomics without understanding the required ordering.",
      challenge: "Protect a shared counter with a mutex, then implement a producer-consumer queue using a condition variable and predicate. Run under a thread sanitizer where available.",
      interview: "Explain data races and undefined behavior, mutex versus atomic, condition-variable predicates, and how deadlocks arise."
    },
    "cpp-11": {
      concept: "Tests verify contracts, build systems define reproducible targets, and profilers identify measured bottlenecks. Correctness comes before optimization; a benchmark must represent realistic input and separate setup overhead from the operation being measured.",
      mechanics: "CMake targets declare sources, include directories and dependencies. Unit tests should isolate domain logic; integration tests validate boundaries. Debug builds and sanitizers find different defect classes, while profilers report CPU, memory or contention evidence.",
      pitfalls: "Tests without meaningful assertions, nondeterministic timing thresholds, benchmarks that measure setup accidentally, optimizing an unmeasured path, and using one build configuration as proof that every configuration is correct.",
      challenge: "Create a CMake test target, add tests for normal and invalid inputs, run sanitizers, and capture a benchmark baseline before optimizing one measured hotspot.",
      interview: "Explain unit versus integration tests, how CMake models targets, and why profiling and reproducible benchmarks should guide optimization."
    },
    "cpp-12": {
      concept: "A capstone demonstrates integrated engineering: domain modeling, explicit ownership, stable interfaces, error handling, tests and reproducible builds. Advanced C++ should use language features to make invariants visible rather than merely showcasing syntax.",
      mechanics: "Separate domain logic from persistence and CLI/API layers. Prefer standard containers and RAII, minimize shared mutable state, document any unsafe assumptions around raw memory, and test copy/move and error paths. Measure performance before introducing custom allocators or complex concurrency.",
      pitfalls: "Scope creep, unclear ownership, raw resource management, no failure-path tests, undefined behavior hidden by one compiler, and optimization without representative benchmarks.",
      challenge: "Build a task tracker or inventory CLI with CRUD operations, persistent storage, input validation, unit tests, CMake, CI and a benchmark for a justified hot path.",
      interview: "Explain how your design manages ownership and errors, which invariants are tested, and how you would prove a claimed performance improvement."
    },
    "php-1": {
      concept: "PHP is commonly executed by a server-side runtime for each request or through CLI scripts. The web server, PHP runtime, dependency manager and framework are distinct layers. Project setup should declare supported PHP versions and dependencies rather than relying on a machine's global configuration.",
      mechanics: "The PHP interpreter parses and executes source; Composer resolves package dependencies and autoloads classes. Web requests expose server and request data through defined APIs, while CLI scripts have a different execution context. The current working directory and include paths affect file loading.",
      pitfalls: "Assuming browser and CLI environments expose the same globals, committing vendor files without a project policy, relying on a different PHP version locally than in production, and using ambiguous include paths.",
      challenge: "Create a Composer project with PSR-4 autoloading, a CLI entry point and one unit test. Document the required PHP version and reproduce installation from composer.lock.",
      interview: "Explain the PHP runtime, Composer and autoloading, and how CLI execution differs from an HTTP request."
    },
    "php-2": {
      concept: "PHP variables are dynamically typed values prefixed with a dollar sign. Loose comparison may coerce values, while strict comparison checks type as well as value. Type declarations and return types make contracts clearer but do not replace validation of external input.",
      mechanics: "Scalar type declarations and strict_types affect argument coercion behavior. Arrays are ordered maps, and nullability should be explicit in modern signatures. Numeric strings and booleans can behave unexpectedly under loose comparison, so parsing should be deliberate.",
      pitfalls: "Using == on untrusted values, trusting type declarations as request validation, relying on implicit numeric-string conversion, and treating empty string, null and zero as interchangeable.",
      challenge: "Build a form parser that validates quantity and price, uses strict comparisons, and reports malformed values separately from valid zero values.",
      interview: "Compare loose and strict comparison, explain type declarations and strict_types, and describe why request data must be validated explicitly."
    },
    "php-3": {
      concept: "Conditions and loops control execution, while functions package behavior into reusable contracts. PHP supports named functions, closures and arrow functions, each with different capture and scope rules. Clear return values make application logic easier to test.",
      mechanics: "A function declares parameters and return type; closures can capture variables with use, while arrow functions automatically capture referenced outer variables by value. foreach iterates arrays and traversables. Return types should match all intended paths.",
      pitfalls: "Missing return paths, capturing a variable by reference unexpectedly, modifying an array during foreach without understanding the effect, and combining request handling with domain calculations inside one function.",
      challenge: "Write a pure function that calculates a cart total, then call it from a separate request handler. Test empty input, invalid quantities and closure capture behavior.",
      interview: "Compare closures and arrow functions, explain variable capture, and describe why separating pure logic from request handling improves testing."
    },
    "php-4": {
      concept: "PHP arrays act as ordered maps and can represent lists, dictionaries and mixed-key structures. Data transformation should make key preservation, reindexing, mutation and empty-input behavior explicit because array functions differ in these details.",
      mechanics: "array_map transforms values, array_filter keeps elements matching a predicate, and array_reduce accumulates a result. Some functions preserve keys while others reindex; strict comparison flags can matter for membership checks. Copy-on-write is an implementation optimization, not a substitute for understanding references.",
      pitfalls: "Assuming all array functions preserve keys, confusing list and map shapes, using loose membership checks for security-sensitive values, and mutating data through references without clear ownership.",
      challenge: "Transform a list of order records into totals by category, preserve required keys, handle empty arrays and duplicate IDs, and test the output shape.",
      interview: "Explain PHP arrays as ordered maps, compare array_map/filter/reduce, and describe why key preservation and strict comparisons matter."
    },
    "php-5": {
      concept: "A form is an untrusted input boundary. Validation checks whether input meets domain rules; normalization creates a consistent representation; output escaping ensures data is interpreted as text in its destination context. These are separate operations and none can replace the others.",
      mechanics: "Validate request method and expected fields, use filter/validation functions where appropriate, and escape HTML output with a context-aware API such as htmlspecialchars. CSRF tokens protect state-changing browser requests; server-side validation remains authoritative.",
      pitfalls: "Trusting browser validation, using raw input in HTML or SQL, treating sanitization as universal, failing to validate array-shaped request data, and omitting CSRF protection on state-changing forms.",
      challenge: "Implement a registration form with server-side validation, context-aware output escaping, CSRF protection and safe error redisplay. Test malformed input and strings containing HTML markup.",
      interview: "Compare validation, normalization and output escaping; explain XSS and CSRF; and state why client-side validation cannot be the security boundary."
    },
    "php-6": {
      concept: "HTTP routing maps a request method and path to application behavior. Sessions maintain state across requests using a session identifier, but session data and cookies are security-sensitive and need appropriate lifecycle controls.",
      mechanics: "A response has a status code, headers and body; headers must be sent before output. Session cookies should use secure attributes appropriate to HTTPS deployment. Routes should validate method, authorization and input before performing state changes.",
      pitfalls: "Changing headers after output, trusting session identifiers without regeneration at authentication boundaries, allowing state-changing GET requests, and exposing detailed server errors to clients.",
      challenge: "Implement a small authenticated route with session regeneration on login, logout invalidation, authorization checks and tests for unauthorized requests.",
      interview: "Explain HTTP methods and status codes, session cookies, session fixation, and why GET should not perform state-changing operations."
    },
    "php-7": {
      concept: "Classes group behavior and state, namespaces avoid name collisions, and Composer manages dependencies and autoloading. Modern PHP uses type declarations, interfaces and dependency injection to make boundaries clearer and testing easier.",
      mechanics: "Namespaces define qualified names; PSR-4 maps namespaces to directory paths. Interfaces express contracts and constructor injection supplies collaborators. Composer's lock file records resolved dependency versions for repeatable installs.",
      pitfalls: "Large classes with unrelated responsibilities, static service lookups that hide dependencies, autoloading that differs by environment, and committing credentials or unstable dependency ranges without a lock file.",
      challenge: "Build a namespaced service with an injected repository interface, a Composer PSR-4 mapping and a unit test using an in-memory fake.",
      interview: "Explain namespaces, PSR-4 autoloading, Composer lock files and dependency injection."
    },
    "php-8": {
      concept: "Database access must separate SQL instructions from input values and define transaction boundaries for multi-step changes. PDO provides a consistent interface across supported database drivers, but placeholder syntax and some behaviors can depend on driver configuration.",
      mechanics: "Prepared statements bind values separately from SQL text. Transactions group statements and allow rollback when supported by the storage engine. Constraints enforce invariants at the database boundary, and row-count semantics vary by driver and statement type.",
      pitfalls: "Building SQL through string concatenation, assuming every driver handles placeholders identically, leaving a transaction open after failure, and relying only on application validation for integrity.",
      challenge: "Create a PDO repository that uses prepared statements, performs a multi-step update transactionally and distinguishes not-found from database failure. Test rollback behavior.",
      interview: "Explain PDO prepared statements, transaction commit/rollback, and why parameterization prevents SQL injection."
    },
    "php-9": {
      concept: "A framework provides conventions for routing, dependency injection, validation, persistence and middleware. It does not remove the need to understand HTTP, authorization, database transactions or error boundaries. Framework-specific behavior should be tied to a documented version.",
      mechanics: "A request typically passes through middleware, routing, controller/action logic and response serialization. Domain services should contain business rules; repositories or framework data layers manage persistence. Dependency injection resolves collaborators according to configuration.",
      pitfalls: "Putting all business logic in controllers, trusting framework defaults without checking configuration, leaking ORM entities directly as public API contracts, and using global state that makes tests order-dependent.",
      challenge: "Implement one endpoint with request validation, authorization, a domain service, a persistence boundary and integration tests for invalid and unauthorized requests.",
      interview: "Explain middleware and dependency injection, controller versus service responsibilities, and why framework familiarity does not replace understanding HTTP and data integrity."
    },
    "php-10": {
      concept: "Authentication establishes who a user is; authorization decides what that user may do. Password storage, session handling, CSRF protection, output escaping and least-privilege database access address different threats and must be applied together.",
      mechanics: "Use password_hash/password_verify with supported algorithms rather than custom hashing. Regenerate session identifiers after authentication, validate CSRF tokens for state-changing browser requests, parameterize SQL and escape output for the destination context.",
      pitfalls: "Storing plaintext or fast-hashed passwords, checking permissions only in the UI, accepting user IDs as proof of authorization, logging credentials, and trusting raw HTML from users.",
      challenge: "Build a small account flow with password hashing, session regeneration, server-side authorization, CSRF checks and tests for privilege escalation attempts.",
      interview: "Differentiate authentication and authorization, explain password hashing versus encryption, and outline defenses against CSRF, XSS and SQL injection."
    },
    "php-11": {
      concept: "Automated tests protect behavior; queues move work outside the request path; caches reduce repeated work but introduce freshness and invalidation problems. These systems require explicit failure, retry and observability policies.",
      mechanics: "Unit tests isolate business logic; integration tests exercise database or HTTP boundaries. Queue workers need idempotent handlers because jobs may be retried. Cache keys should include all inputs that affect the result, and invalidation should follow the data update contract.",
      pitfalls: "Non-idempotent jobs that double-charge or duplicate records, retry storms, stale cached authorization data, testing only a synchronous happy path, and logging secrets in job payloads.",
      challenge: "Implement a queued report-generation job that can safely retry, uses a cache with a documented invalidation rule and has tests for duplicate delivery and dependency failure.",
      interview: "Explain queue retries and idempotency, cache invalidation, and the difference between unit and integration tests."
    },
    "php-12": {
      concept: "A production PHP project needs stable dependency resolution, environment-based configuration, safe HTTP handling, observability and repeatable deployment. A working local page is not sufficient evidence that security and operational behavior are correct.",
      mechanics: "Use environment configuration for secrets, structured logging, request limits and timeouts, health checks and a tested deployment process. Separate domain rules from HTTP and persistence. Keep framework and runtime versions explicit and run tests during CI.",
      pitfalls: "Debug output in production, hard-coded credentials, missing timeouts, unbounded request bodies, public error traces and deployment steps that depend on a developer's local machine.",
      challenge: "Deliver a small PHP API with validated configuration, safe persistence, authentication/authorization tests, health checks and a documented clean deployment.",
      interview: "Describe a production readiness checklist for PHP, including configuration, security, observability, dependency updates and deployment reproducibility."
    }
  });
  add({
    "kotlin-1": {
      concept: "Kotlin compiles to a target such as JVM bytecode or JavaScript depending on the project configuration. Its syntax supports concise expression-oriented code, but project setup still needs explicit toolchain, dependency and target choices.",
      mechanics: "Gradle commonly manages Kotlin builds and plugins. The main function is an entry point for command-line apps; packages and imports organize names. Kotlin compiler and language versions affect syntax and standard-library APIs.",
      pitfalls: "Confusing Kotlin language version with JVM target, mixing incompatible Gradle plugin versions, relying on IDE-only settings, and assuming concise syntax removes the need to understand generated behavior.",
      challenge: "Create a Kotlin project with a reusable module and unit test, configure the target explicitly, and reproduce build and test from a clean checkout.",
      interview: "Explain Kotlin's compilation targets, the role of Gradle, and why language version and runtime target are separate settings."
    },
    "kotlin-2": {
      concept: "Kotlin distinguishes nullable and non-nullable types in the type system. Null safety reduces accidental null dereferences, but platform types from Java and unsafe assertions can reintroduce risk. val prevents reassignment of a binding; it does not make referenced objects deeply immutable.",
      mechanics: "A nullable type uses a question mark; safe calls return null when the receiver is null, and the Elvis operator supplies a fallback. The not-null assertion throws if its operand is null. Smart casts depend on compiler knowledge that a value has not changed.",
      pitfalls: "Using !! as a routine escape hatch, assuming Java platform types are safe, confusing val with deep immutability, and using a fallback that silently converts invalid data into a valid-looking default.",
      challenge: "Parse optional user input into a domain value, use safe calls and explicit validation, and test null, blank and malformed inputs without using !!.",
      interview: "Explain nullable types, safe calls, Elvis and not-null assertion, and why Kotlin cannot guarantee null safety across every Java boundary."
    },
    "kotlin-3": {
      concept: "Kotlin control flow uses conditions, loops and ranges; many constructs are expressions that produce values. A when expression can replace long conditional chains, while range boundaries and collection iteration still require precise reasoning.",
      mechanics: "Ranges such as 1..5 include both endpoints; until excludes the upper bound. downTo and step define descending or stepped ranges. when can match values, types or conditions, and exhaustive when expressions over sealed or enum types help catch missing cases.",
      pitfalls: "Assuming until includes its endpoint, creating an incorrect step direction, using a non-exhaustive branch where a value is required, and confusing iteration over indices with iteration over values.",
      challenge: "Build a score classifier using when, iterate over an inclusive and exclusive range, and test the smallest and largest permitted values.",
      interview: "Compare .. and until, explain when exhaustiveness, and identify when direct collection iteration is clearer than index iteration."
    },
    "kotlin-4": {
      concept: "Functions declare a contract; lambdas and higher-order functions let behavior be passed as a value. Kotlin supports named and default arguments, extension functions and inline functions, each serving a different readability or performance purpose.",
      mechanics: "A trailing lambda can be placed outside parentheses when the final parameter is a function. An extension function adds callable syntax without changing the original class. Inline can reduce lambda allocation in some cases and enables reified type parameters, but should not be used without understanding its semantics.",
      pitfalls: "Overusing extension functions until APIs become hard to discover, creating ambiguous overloads with default arguments, capturing mutable state in a lambda, and assuming inline always improves performance.",
      challenge: "Write a higher-order filtering function and a small extension function for a domain type. Compare the result with an ordinary helper and test whether the extension name communicates its responsibility.",
      interview: "Explain higher-order functions, trailing lambdas, extension functions and when inline/reified features are appropriate."
    },
    "kotlin-5": {
      concept: "Classes model identity-bearing objects; data classes model values with generated equality and copy behavior. Constructors and visibility should preserve invariants, while sealed classes or interfaces can represent a finite set of domain states.",
      mechanics: "A data class generates equals, hashCode, toString and copy based on primary-constructor properties. copy is shallow, so nested mutable values may still be shared. A companion object holds class-associated members but is itself an object.",
      pitfalls: "Assuming copy is deep, placing mutable state in a data class used as a hash key, exposing invalid state through public setters, and using inheritance when composition expresses the relationship better.",
      challenge: "Model an order with immutable data and a sealed status type. Demonstrate shallow copy behavior and test that invalid status transitions cannot be created through the public API.",
      interview: "Compare data classes and ordinary classes, explain generated equality and shallow copy, and describe the purpose of sealed hierarchies."
    },
    "kotlin-6": {
      concept: "Collections can be read-only or mutable through a given interface. List, Set and Map encode different semantics; sequences can defer transformations until elements are consumed. Read-only access is not the same as guaranteed deep immutability.",
      mechanics: "map transforms, filter selects and groupBy partitions values by key. Collection operations commonly create intermediate collections; Sequence pipelines are lazy and may reduce intermediate allocations for large or multi-step processing. Iteration order depends on the concrete collection type.",
      pitfalls: "Assuming List guarantees an immutable underlying object, mutating through another reference, choosing Sequence for tiny data without measuring, and using a mutable object as a map key after changing its equality-relevant fields.",
      challenge: "Group records by category, compute summaries and compare List operations with a Sequence pipeline. Test empty data and verify the output ordering assumptions.",
      interview: "Compare List and MutableList, read-only views and immutable data, and eager collection transformations versus lazy sequences."
    },
    "kotlin-7": {
      concept: "Exceptions signal failures, while sealed result types can represent expected outcomes explicitly. The choice depends on whether the caller can reasonably recover from the condition and whether every caller must handle each outcome.",
      mechanics: "try can be an expression, but Kotlin does not have checked exceptions. Result and sealed classes can encode success/failure variants. Use finally for cleanup, and preserve error causes when translating infrastructure failures into domain errors.",
      pitfalls: "Catching Throwable for ordinary errors, swallowing exceptions, using exceptions for every expected branch, and representing a rich failure as an unstructured string lose important diagnostic information.",
      challenge: "Implement a configuration parser that returns a sealed success/failure result for expected validation errors and still propagates unexpected programming defects. Test every result variant.",
      interview: "Explain Kotlin's unchecked exception model, try as an expression, and when a sealed result is clearer than throwing an exception."
    },
    "kotlin-8": {
      concept: "Coroutines represent suspendable computations. A coroutine can suspend without blocking its underlying thread, but it still needs a coroutine context and dispatcher. Structured concurrency ties child work to a parent scope so cancellation and failures have a predictable owner.",
      mechanics: "suspend marks a function that can suspend; it does not automatically create a new thread. launch starts work without returning a direct result, while async returns a Deferred result. Cancellation is cooperative and propagates through structured scopes when code uses cancellable suspension points.",
      pitfalls: "Using GlobalScope for request-owned work, blocking a dispatcher with CPU-heavy tasks, swallowing CancellationException, launching unbounded child tasks, and assuming suspend means background-thread execution.",
      challenge: "Fetch two independent resources concurrently inside a structured scope, add a timeout and cancellation handling, and test that child work stops when the parent operation is cancelled.",
      interview: "Compare launch and async, explain dispatchers and structured concurrency, and describe why cancellation must not be swallowed."
    },
    "kotlin-9": {
      concept: "Gradle describes build tasks and dependencies; tests protect behavior and module boundaries reduce coupling. A reliable Kotlin project should make toolchain versions, dependency resolution and test commands reproducible.",
      mechanics: "The Gradle wrapper pins the Gradle distribution used by the project. Unit tests isolate logic; integration tests verify framework, storage or network boundaries. Dependency scopes control what is available at compile time and runtime.",
      pitfalls: "Using a global Gradle installation instead of the wrapper, dependency version drift, tests depending on execution order, and confusing compilation success with a working runtime package.",
      challenge: "Add a unit test and one integration test to a Kotlin module, run them through the Gradle wrapper, and document the dependency scopes used.",
      interview: "Explain the Gradle wrapper, dependency scopes, unit versus integration tests, and how reproducible builds reduce environment-only failures."
    },
    "kotlin-10": {
      concept: "Android apps are driven by lifecycle events and state changes rather than a single main function. Architecture separates UI rendering, state ownership and data access so configuration changes and process recreation do not silently destroy important state.",
      mechanics: "Activities and fragments have lifecycle callbacks; ViewModel can retain UI-related state across configuration changes, while persistent data requires storage. Coroutines should be scoped to the lifecycle or owner that needs them, and UI updates must follow main-thread rules.",
      pitfalls: "Starting long-lived work in an activity without cancellation, storing durable data only in UI state, leaking context references, and treating a configuration change as if the process can never be recreated.",
      challenge: "Build a simple screen with loading, content and error states, a ViewModel-backed state holder and a repository abstraction. Test recreation and cancellation behavior.",
      interview: "Explain Android lifecycle, ViewModel responsibilities, lifecycle-aware coroutine scopes and the difference between in-memory UI state and persistence."
    },
    "kotlin-11": {
      concept: "Networking, persistence and security are external boundaries. A well-designed app validates response data, handles timeouts and cancellation, stores sensitive values in appropriate storage, and separates repository logic from UI code.",
      mechanics: "HTTP clients should use explicit timeouts and handle status codes before parsing bodies. A repository can coordinate remote and local sources. Sensitive tokens should use platform-appropriate protected storage and should not appear in logs or analytics events.",
      pitfalls: "Trusting JSON shape, logging access tokens, storing secrets in ordinary preferences, ignoring cancellation, and assuming a successful HTTP status guarantees a valid domain response.",
      challenge: "Implement a repository that fetches and validates a record, caches safe data, handles offline/error states, and keeps credentials out of logs. Test malformed response and timeout cases.",
      interview: "Explain repository boundaries, network timeout/error handling, safe token storage, and why API response parsing must include validation."
    },
    "kotlin-12": {
      concept: "A Kotlin capstone should combine domain modeling, structured concurrency, testing and a reproducible build. The goal is to make invalid states difficult to represent and make resource ownership and cancellation explicit.",
      mechanics: "Use immutable data where practical, sealed types for finite state, injected interfaces for external dependencies and coroutine scopes with clear owners. Test business logic independently from UI or network frameworks and run static checks in CI.",
      pitfalls: "Global coroutine scopes, unvalidated external data, UI logic mixed with persistence, tests tied to real networks and build settings that only work in one IDE.",
      challenge: "Deliver a task or expense tracker with a typed domain model, repository, offline/error handling, coroutine cancellation, unit tests and a documented clean build.",
      interview: "Explain the architecture boundaries, state model, coroutine lifecycle and testing strategy of the capstone."
    },
    "swift-1": {
      concept: "Swift source is compiled by the Swift toolchain and organized into modules and packages. Swift supports multiple platforms, so project settings determine the target, available APIs and build products. Package configuration and compiler version are part of reproducibility.",
      mechanics: "swift build and swift test are available through Swift Package Manager for package-based projects. The compiler performs type checking and emits target-specific code. Import statements make module APIs available, and access control determines which declarations are exposed.",
      pitfalls: "Using APIs unavailable on the deployment target, assuming an Xcode project and Swift package share identical settings, ignoring compiler version constraints, and putting all application logic in one entry file.",
      challenge: "Create a Swift package with a library, executable and test target. Build and test from the command line and document the supported Swift version.",
      interview: "Explain Swift compilation, module boundaries, Swift Package Manager and why target availability matters."
    },
    "swift-2": {
      concept: "Swift uses constants, variables and a strong type system. Optionals explicitly represent the possible absence of a value, preventing missing data from being silently treated as an ordinary value. Value types and reference types also affect mutation and copying semantics.",
      mechanics: "let binds a constant and var a mutable variable. Optional binding with if let or guard let unwraps a value safely; nil-coalescing supplies a fallback. Force unwrap with ! traps when the value is nil. Structs and enums are value types, while classes are reference types.",
      pitfalls: "Force-unwrapping external data, confusing a constant reference with immutable referenced state, assuming struct copies deeply duplicate reference-type members, and using a fallback that hides invalid input.",
      challenge: "Parse optional configuration into validated domain values using guard let and explicit error reporting. Test missing, malformed and valid input without force-unwrapping.",
      interview: "Explain optionals, optional binding, force unwrap, and value versus reference semantics in Swift."
    },
    "swift-3": {
      concept: "Control flow and functions define how work is selected and reused. Swift's guard statement handles conditions that must be true to continue, enabling early exits that keep the main path less nested. Functions can use argument labels to make call sites self-documenting.",
      mechanics: "for-in iterates over sequences, while repeat-while evaluates its condition after the body. guard must exit the current scope when its condition fails. Function argument labels are part of the API surface, and return types can use optionals or Result when absence/failure is expected.",
      pitfalls: "Ignoring guard's required exit, creating deeply nested conditionals, using confusing argument labels, and hiding invalid input behind a default value.",
      challenge: "Write a function that validates an order request with guard, returns a typed result and tests each early-exit condition.",
      interview: "Compare if let and guard let, explain argument labels, and describe how early exits improve readability without hiding failure behavior."
    },
    "swift-4": {
      concept: "Arrays, sets and dictionaries are value types in Swift, so mutation follows value semantics even when implementations optimize copying. Value semantics make reasoning easier, but copying behavior should still be considered for large collections and nested reference values.",
      mechanics: "Array preserves order and duplicates, Set stores unique Hashable values, and Dictionary maps Hashable keys to values. Collection methods such as map, filter and reduce return transformed results. Copy-on-write can delay physical copying until mutation requires independent storage.",
      pitfalls: "Assuming nested reference objects are deeply copied, using a mutable key whose hash/equality changes, mutating a collection while iterating, and using reduce when map or filter is clearer.",
      challenge: "Transform a collection of transactions into totals by category, handle empty input and duplicate identifiers, and demonstrate value semantics with a nested class reference.",
      interview: "Compare Array, Set and Dictionary, explain value semantics and copy-on-write, and describe the role of Hashable."
    },
    "swift-5": {
      concept: "Structs and enums model values and finite state; protocols define requirements that unrelated types can adopt. Protocol-oriented design uses behavior contracts instead of requiring a shared class hierarchy.",
      mechanics: "A struct gets memberwise initialization by default in many cases; enums can carry associated values. Protocol extensions can provide default implementations, and generic constraints can require protocol conformance. Classes support identity and inheritance, while structs and enums use value semantics.",
      pitfalls: "Choosing a class when value semantics fit better, adding too many protocol extensions with surprising defaults, using associated values without exhaustive handling, and assuming copying a struct deeply clones reference-valued fields.",
      challenge: "Represent a download state with an enum carrying progress or error details, define a protocol for storage, and test two implementations through that protocol.",
      interview: "Compare structs and classes, explain associated-value enums, and describe protocol-oriented design and its trade-offs."
    },
    "swift-6": {
      concept: "Swift errors use throwing functions and do-catch, while tests verify behavior across valid and invalid inputs. Resource cleanup should be deterministic, and tests should not depend on mutable global state or real external services unless they are integration tests.",
      mechanics: "A function marked throws can propagate an error; try marks a call that may throw. defer schedules cleanup at scope exit. XCTest or Swift Testing can verify behavior, and test doubles isolate external dependencies.",
      pitfalls: "Using try! on external data, catching an error and returning a misleading success value, forgetting defer for cleanup, and writing tests that depend on order or live network availability.",
      challenge: "Write a throwing file parser with cleanup and domain-specific errors. Test valid data, malformed data and file-access failure using an injected reader or temporary file.",
      interview: "Explain throws/try/do-catch, defer, and how to design deterministic unit tests for code that reads files or calls a service."
    },
    "swift-7": {
      concept: "Generics and protocol-oriented design allow code to work with multiple types while preserving type safety. Opaque result types hide a concrete implementation behind a protocol contract, while existential values store values of types conforming to a protocol.",
      mechanics: "A generic constraint uses where clauses to express requirements. some Protocol returns or stores one hidden concrete type with a known conformance; any Protocol can hold values of different conforming types subject to existential rules. Associated types and Self requirements affect which protocols can be used as existentials.",
      pitfalls: "Using any and some interchangeably, over-generalizing a simple helper, hiding expensive copies behind abstraction, and ignoring associated-type constraints when designing a protocol API.",
      challenge: "Create a generic collection helper constrained by a protocol, then expose an opaque return type. Explain which implementation details are hidden and which guarantees callers still receive.",
      interview: "Compare generics, some and any, explain associated types, and describe when protocol existentials are useful."
    },
    "swift-8": {
      concept: "Swift concurrency provides async/await, tasks and actors to express asynchronous work and isolate mutable state. Structured concurrency ties child tasks to their parent; actors serialize access to actor-isolated state, but code must still reason about cancellation and reentrancy.",
      mechanics: "An async function can suspend at await. Task groups manage child tasks and propagate cancellation through structured scopes. Actors protect isolated state, but an actor method can be re-entered at suspension points, so invariants must be rechecked after await when necessary.",
      pitfalls: "Launching unstructured tasks without an owner, assuming an actor makes an entire multi-await operation atomic, ignoring cancellation, and blocking a cooperative executor with synchronous heavy work.",
      challenge: "Implement concurrent loading of independent resources with a task group and an actor-backed cache. Test cancellation and a state change that occurs while an actor method is suspended.",
      interview: "Explain structured concurrency, actor isolation, cancellation, and actor reentrancy across await points."
    },
    "swift-9": {
      concept: "Swift Package Manager defines packages, targets and dependencies. Modular boundaries make code reusable and testable, while explicit platform and deployment targets constrain which APIs are available.",
      mechanics: "Package.swift describes targets and dependencies. A library target exposes a module; a test target imports it. Semantic version constraints and resolved package state influence repeatability, while build configurations and platform deployment settings affect actual app compatibility.",
      pitfalls: "Circular target dependencies, exposing implementation details as public API, using an API newer than the deployment target, and assuming a package builds identically under every platform configuration.",
      challenge: "Split a utility library from an application target, add unit tests and a dependency, and build/test from a clean checkout with the declared toolchain.",
      interview: "Explain package versus target, public API boundaries, dependency resolution and platform availability checks."
    },
    "swift-10": {
      concept: "SwiftUI describes UI as a function of state. When state changes, the framework recomputes affected view descriptions; state ownership and identity determine whether the right values persist through view updates.",
      mechanics: "@State stores view-owned mutable state, @Binding passes a reference-like connection to state owned elsewhere, and observable models expose changes to views. View structs are recreated frequently, so transient local variables are not persistent UI state. Side effects belong in lifecycle-aware tasks or explicit actions.",
      pitfalls: "Storing persistent state in ordinary view properties, creating network side effects during body evaluation, using the wrong state owner, and ignoring task cancellation when a view disappears or its inputs change.",
      challenge: "Build a form with validation, loading and error states using a view model or observable model. Ensure network work is cancellable and the UI remains consistent after repeated submissions.",
      interview: "Explain SwiftUI's state-driven rendering, State versus Binding, and why side effects should not be placed directly in body."
    },
    "swift-11": {
      concept: "Networking, persistence and privacy involve data crossing trust boundaries. A robust app validates decoded payloads, handles cancellation and HTTP failures, stores sensitive information appropriately, and minimizes data collection and logging.",
      mechanics: "URLSession performs asynchronous network operations; Codable decodes structured payloads but decoding success does not prove domain validity. Keychain is intended for sensitive credentials; ordinary preferences suit non-sensitive settings. App transport security and permission prompts should match the actual data flow.",
      pitfalls: "Trusting decoded fields without domain validation, logging tokens, storing credentials in ordinary preferences, assuming all non-2xx responses throw, and failing to handle cancellation or offline state.",
      challenge: "Create a repository that fetches a Codable response, validates business constraints, caches non-sensitive data and reports offline/error states. Keep credentials out of logs and test malformed payloads.",
      interview: "Explain decoding versus validation, Keychain versus preferences, HTTP error handling, and privacy-by-design for an iOS feature."
    },
    "swift-12": {
      concept: "A production iOS capstone combines state modeling, modular domain logic, concurrency, persistence, privacy and automated tests. Swift language safety helps, but API contracts, cancellation and user-data handling remain design responsibilities.",
      mechanics: "Keep views thin, place business rules in testable types, isolate networking behind a repository, use structured tasks and explicit error states, and define data retention behavior. Validate platform permissions and deployment-target availability before release.",
      pitfalls: "Networking inside view body, force unwraps in production paths, unstructured tasks, secrets in logs, untested offline behavior and state that disappears unexpectedly during view recreation.",
      challenge: "Build a small habit or expense tracker with local persistence, a remote sync boundary, cancellable async work, clear loading/error states, unit tests and a privacy checklist.",
      interview: "Explain the capstone's state ownership, async cancellation strategy, persistence boundary and privacy decisions."
    }
  });
  add({
    "bash-1": {
      concept: "Bash is both a command interpreter and a scripting language. A shell command has words, quoting, expansions, redirections and exit status; the shell parses these before launching external programs. Understanding the parse order explains many automation bugs.",
      mechanics: "Bash performs expansions such as parameter expansion, command substitution and pathname expansion before executing a command. Builtins run inside the shell; external commands run as processes. The current directory, PATH and shell options influence behavior and should be treated as explicit environment dependencies.",
      pitfalls: "Assuming Bash syntax is POSIX sh syntax, ignoring command exit status, using a script with the wrong interpreter, and failing to quote paths with spaces or wildcard characters.",
      challenge: "Write a script with a shebang, strict but deliberate error handling, a usage message and one external command. Run it from a different working directory and explain which paths remain stable.",
      interview: "Explain the difference between Bash and POSIX sh, how a command is parsed and executed, and why the shebang and exit status matter."
    },
    "bash-2": {
      concept: "Shell variables hold strings, and expansion determines how those values become command arguments. Quoting is a correctness and security boundary: double quotes preserve most expansions as one word, single quotes suppress expansion, and unquoted expansions can split words and expand wildcards.",
      mechanics: "Parameter expansion substitutes variable values; command substitution captures command output and removes trailing newlines. Arithmetic expansion evaluates integer arithmetic. Bash arrays preserve argument boundaries when expanded as quoted arrays, while a plain scalar string is not a safe substitute for an argument list.",
      pitfalls: "Unquoted variables, using eval to reconstruct a command, confusing single and double quotes, relying on word splitting, and storing multiple arguments in one string can cause accidental file matches or command injection.",
      challenge: "Write a script that accepts file paths containing spaces, stores arguments in an array, prints them safely and invokes a command without eval. Test spaces, wildcard characters and empty values.",
      interview: "Explain shell quoting, word splitting, pathname expansion, command substitution, and why arrays are safer than command strings."
    },
    "bash-3": {
      concept: "Pipelines connect one command's standard output to another command's standard input. Redirection changes where input and output flow; file descriptors distinguish standard input, output and error. These mechanisms compose small tools but require explicit failure handling.",
      mechanics: "The pipe operator connects processes; > truncates a destination file and >> appends. Redirections are processed in order, so redirecting stdout and stderr in a different order can change the result. By default, pipeline status often reflects the last command; pipefail changes how failures are reported.",
      pitfalls: "Overwriting a file with > unintentionally, discarding stderr, assuming an earlier pipeline command succeeded, and reading a file line-by-line with unsafe word splitting can corrupt data.",
      challenge: "Create a pipeline that filters a log, counts matching lines and saves diagnostics separately. Enable and explain pipefail, then test what happens when the first command fails.",
      interview: "Explain file descriptors, the difference between > and >>, redirection order, and why pipefail matters in automation."
    },
    "bash-4": {
      concept: "Conditions and loops let shell scripts make decisions and process lists of arguments or files. Shell syntax is not identical to general-purpose languages: test expressions, exit statuses and quoting rules determine how a condition behaves.",
      mechanics: "A command returns an exit status; zero conventionally means success and nonzero indicates failure. [[ ... ]] is a Bash conditional compound command with safer pattern and string behavior than legacy test syntax. Use for over quoted arrays when processing explicit arguments.",
      pitfalls: "Testing strings with the wrong operator, comparing numeric values as strings, using unquoted command substitution in a loop, and assuming a condition tests a printed word rather than the command's exit status.",
      challenge: "Write a script that validates a numeric argument, loops over supplied paths safely, and reports missing files without stopping the entire batch. Test no arguments and a path containing spaces.",
      interview: "Explain shell exit status, the difference between [[ ]] and [ ], and why for file in $(find ...) is fragile."
    },
    "bash-5": {
      concept: "A shell function groups commands and returns an exit status; positional parameters carry arguments. Shell functions do not return arbitrary structured values through return, which is intended for numeric status, so output and status should be designed separately.",
      mechanics: "Inside a function, $1 and the other positional parameters refer to arguments; local limits variable scope. printf emits formatted output predictably. A function can write a result to stdout and use its exit status to indicate success or failure.",
      pitfalls: "Using global variables accidentally, assuming return can return a string, failing to quote function arguments, and mixing human-readable logs with machine-readable stdout make scripts hard to compose.",
      challenge: "Create a validate_path function that prints a normalized result on stdout and uses its exit code for success/failure. Send diagnostics to stderr and test callers with paths containing spaces.",
      interview: "Explain function scope, positional parameters, stdout versus stderr, and why shell return values are normally exit statuses rather than arbitrary data."
    },
    "bash-6": {
      concept: "File automation should treat filenames as data, not as shell syntax. Safe transformations must preserve spaces, newlines and leading dashes where possible, avoid destructive defaults, and make overwrite behavior explicit.",
      mechanics: "Use quoted path expansions and -- when a command supports it to mark the end of options. find can emit NUL-delimited paths with -print0 and xargs can consume them with -0. Temporary files should be created safely and cleaned up on both success and failure.",
      pitfalls: "Parsing ls output, using whitespace-delimited command substitution for filenames, deleting recursively without validating the target, and writing to a temporary path that another process could pre-create.",
      challenge: "Build a file-renaming or cleanup script that handles spaces and newlines in names, previews changes before applying them, and safely cleans temporary files with a trap.",
      interview: "Explain why parsing ls output is unsafe, how NUL-delimited filenames work, and how to design a safe destructive file operation."
    },
    "bash-7": {
      concept: "Processes have lifetimes, exit statuses and signals. Background jobs allow work to overlap, but scripts must decide how to wait, collect failures and stop child processes. Signal handling is part of the program's cleanup contract.",
      mechanics: "& starts a background job; wait collects its status. Traps run a handler for selected signals or shell events. A process may spawn descendants, so killing only the immediate PID may not stop the full workload. Job control behavior also differs between interactive and non-interactive shells.",
      pitfalls: "Starting background tasks without waiting, losing child exit statuses, using broad process-name kills, ignoring SIGTERM cleanup, and assuming a shell trap can interrupt every command instantly.",
      challenge: "Run several independent tasks with a concurrency limit, collect each status and clean up child processes on termination. Test one child failure and a simulated interrupt.",
      interview: "Explain foreground versus background jobs, wait, traps and exit statuses, and why process cleanup must account for child processes."
    },
    "bash-8": {
      concept: "Operational scripts often inspect network services and system resources. Diagnostics should distinguish DNS failure, connection refusal, timeout, TLS problems and application-level HTTP errors rather than treating every unsuccessful request as the same failure.",
      mechanics: "Commands such as curl, getent and ss expose different layers of evidence. curl's failure behavior depends on options; HTTP error statuses are not always command failures unless requested. Timeouts bound how long automation waits, and retries should be limited and appropriate to the operation.",
      pitfalls: "Using ping as proof that an HTTP service works, omitting request timeouts, treating any HTTP response as success, retrying non-idempotent requests blindly, and printing credentials embedded in command arguments.",
      challenge: "Write a health-check script with a connection timeout, total timeout, explicit HTTP-status check and distinct exit codes for DNS, transport and application failures. Avoid logging authorization headers.",
      interview: "Explain DNS versus TCP/TLS versus HTTP failure, curl status handling, and why timeouts and bounded retries are essential in operations scripts."
    },
    "bash-9": {
      concept: "Scheduling repeats work, and idempotency means running an operation more than once has the same intended final effect as running it once. Scheduled jobs must handle overlap, partial failure, stale locks and environment differences.",
      mechanics: "cron runs commands with a limited environment, so PATH and working directory should be explicit. A lock can prevent overlapping executions, while atomic file replacement can prevent readers from seeing partial output. Logs and exit codes should let operators distinguish success from failure.",
      pitfalls: "Assuming cron inherits an interactive environment, allowing overlapping jobs to corrupt outputs, using fragile timestamp locks, and writing output directly to a live file before the run succeeds.",
      challenge: "Create a scheduled report script that uses an explicit environment, prevents overlap, writes to a temporary file and atomically publishes only a successful result. Document recovery after interruption.",
      interview: "Explain idempotency, scheduled-job environment differences, overlap prevention and atomic publication of generated files."
    },
    "bash-10": {
      concept: "A shell script can expose secrets through arguments, environment dumps, logs, process listings or overly permissive files. Security means minimizing secret lifetime and access while validating every external value before using it in a command or path.",
      mechanics: "Quote expansions to preserve argument boundaries; avoid eval; use restrictive file permissions and secret stores appropriate to the environment. Environment variables can be inherited by child processes, so they are not automatically private. Least privilege limits the damage from a compromised script.",
      pitfalls: "Hard-coded tokens, set -x around secrets, logging environment variables, interpolating untrusted data into eval or shell command strings, and running privileged scripts with uncontrolled PATH.",
      challenge: "Audit a deployment script for secret leakage, remove tracing around sensitive commands, validate inputs, set safe permissions and demonstrate that a malicious-looking argument is passed as data rather than executed.",
      interview: "Explain shell injection, secret exposure through tracing and environment variables, and how least privilege and safe quoting reduce risk."
    },
    "bash-11": {
      concept: "Shell tests and linting protect operational behavior, where a small quoting or exit-code error can affect many machines. Static analysis catches suspicious patterns; tests verify behavior under controlled conditions; CI makes these checks repeatable.",
      mechanics: "ShellCheck identifies common shell pitfalls. Bats or another test harness can execute scripts with controlled input and inspect exit codes/output. Tests should isolate filesystem effects using temporary directories and should verify failure cases as well as success.",
      pitfalls: "Testing only on one machine, asserting output without checking exit status, tests that modify real user data, ignoring ShellCheck warnings, and relying on network services for every unit test.",
      challenge: "Add ShellCheck and automated tests for a script that processes files. Cover missing arguments, spaces in filenames, a failing child command and cleanup after interruption.",
      interview: "Explain the roles of ShellCheck, automated shell tests and CI, and how to test scripts without damaging real data."
    },
    "bash-12": {
      concept: "Reliable operations automation is a small software system: it needs inputs, invariants, observability, bounded retries, cleanup and a clear failure contract. The best script is not the shortest one; it is the one an operator can safely rerun and diagnose.",
      mechanics: "Use explicit options and usage output, validated configuration, structured log prefixes, timeouts, exit codes and cleanup traps. Make destructive steps previewable, write generated artifacts atomically and define what should happen if the process is interrupted midway.",
      pitfalls: "Unbounded loops, silent failures, hard-coded paths, unsafe deletion, non-idempotent retries, no lock or timeout, and scripts that depend on interactive shell configuration.",
      challenge: "Deliver a backup or deployment automation script with dry-run mode, locking, validation, checksums or verification, bounded retries, cleanup and a testable rollback plan.",
      interview: "Describe how to make an operations script idempotent, observable and safe to rerun, and how you would design rollback and recovery."
    }
  });
  window.CodeAtlasTopicDepth = {
    render,
    count: () => Object.keys(lessons).length,
    has: id => Object.prototype.hasOwnProperty.call(lessons, id),
    add
  };
})();
