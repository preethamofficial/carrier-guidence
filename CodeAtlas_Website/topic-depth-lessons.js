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
  window.CodeAtlasTopicDepth = {
    render,
    count: () => Object.keys(lessons).length,
    has: id => Object.prototype.hasOwnProperty.call(lessons, id),
    add
  };
})();
