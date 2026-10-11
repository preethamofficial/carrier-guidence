module.exports = [
  {
    "id": "javascript-1",
    "title": "Setup, running code & first program",
    "level": "Beginner",
    "definition": "JavaScript (JS) is a high-level, interpreted language that runs in browsers and on servers via Node.js. You write code in .js files or <script> tags and a JS engine (V8, SpiderMonkey) executes it.",
    "analogy": "Like a street magician who performs instantly wherever there is a crowd: the same JS trick runs in the browser, on a server, even in a mobile app — no stage setup, just perform.",
    "keyPoints": [
      "Run browser JS: open DevTools (F12) Console and type code; run files with Node.js via `node file.js`.",
      "`console.log()` prints output; `prompt()` (browser) reads text input, always as a string.",
      "Statements end with newlines (semicolons optional but recommended in teams); { } braces define blocks.",
      "`let` (changeable), `const` (one-time binding), `var` (old, function-scoped — avoid in new code).",
      "JS is dynamically typed: a variable can hold a number, then a string; check with typeof x.",
      "One language, many runtimes: browser APIs (DOM, fetch) exist only in browsers; fs/process only in Node."
    ],
    "basicExamples": [
      {
        "title": "Your first program",
        "code": "console.log(\"Namaste, CodeAtlas!\");\nconsole.log(\"I am learning JavaScript\");",
        "lineByLine": [
          {
            "line": "console.log(\"Namaste, CodeAtlas!\");",
            "explanation": "Prints the greeting to the console output."
          },
          {
            "line": "console.log(\"I am learning JavaScript\");",
            "explanation": "Runs next, printing the second line below."
          }
        ]
      },
      {
        "title": "Variables with let and const",
        "code": "let city = \"Bengaluru\";\nconst year = 2026;\ncity = \"Mumbai\";\nconsole.log(city, year);\nconsole.log(typeof city);",
        "lineByLine": [
          {
            "line": "let city = \"Bengaluru\";",
            "explanation": "Declares a changeable variable holding text."
          },
          {
            "line": "city = \"Mumbai\";",
            "explanation": "Reassigns let freely; const year could not be reassigned."
          },
          {
            "line": "console.log(typeof city);",
            "explanation": "typeof reports the current type: \"string\"."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Comments and style",
        "code": "// A comment: JS skips this line\nlet marks = 92; // store the score\n\nconsole.log(marks); /* prints 92 */",
        "lineByLine": [
          {
            "line": "// A comment: JS skips this line",
            "explanation": "// comments one line; /* */ spans many lines."
          },
          {
            "line": "let marks = 92;",
            "explanation": "Stores the number for later use."
          },
          {
            "line": "console.log(marks);",
            "explanation": "Confirms the stored value."
          }
        ]
      },
      {
        "title": "Input and string building",
        "code": "let name = \"Asha\";\nconsole.log(\"Namaste, \" + name + \"!\");\nconsole.log(\"Next year: \" + 2027);",
        "lineByLine": [
          {
            "line": "let name = \"Asha\";",
            "explanation": "Test data (in Node use readline; prompt() works in browsers)."
          },
          {
            "line": "console.log(\"Namaste, \" + name + \"!\");",
            "explanation": "+ joins strings; the variable value slots in."
          },
          {
            "line": "console.log(\"Next year: \" + 2027);",
            "explanation": "The number auto-converts to text."
          }
        ]
      },
      {
        "title": "Template literals and multi-line",
        "code": "const city = \"Pune\";\nconst n = 3;\nconsole.log(`Rank ${n} city: ${city}`);\nconsole.log(`total = ${2 + 3} rupees`);\nconsole.log(`line1\nline2`);",
        "lineByLine": [
          {
            "line": "const city = \"Pune\";",
            "explanation": "Two constants to interpolate."
          },
          {
            "line": "`Rank ${n} city: ${city}`",
            "explanation": "Backticks allow ${...} expressions inside a string."
          },
          {
            "line": "`total = ${2 + 3} rupees`",
            "explanation": "Any expression works inside ${}; prints total = 5 rupees."
          },
          {
            "line": "`line1\\nline2`",
            "explanation": "Template literals preserve real line breaks without \\n."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "CLI input in Node with readline",
        "code": "const readline = require(\"readline\").createInterface({\n  input: process.stdin, output: process.stdout\n});\nreadline.question(\"Your name: \", (name) => {\n  console.log(\"Namaste, \" + (name.trim() || \"friend\") + \"!\");\n  readline.close();\n});",
        "note": "Browsers have prompt(); Node needs the readline module — same program, runtime-specific input."
      },
      {
        "title": "Strict mode guard",
        "code": "\"use strict\";\nfunction demo() {\n  // assigned = 5; // ReferenceError here instead of a silent global\n  let assigned = 5;\n  return assigned;\n}\nconsole.log(demo());",
        "note": "\"use strict\" turns silent mistakes (accidental globals) into loud errors."
      }
    ],
    "practice": [
      {
        "question": "Print your name, city, favourite food on three lines.",
        "hint": "Three console.log calls.",
        "answer": "console.log(\"Asha\");\nconsole.log(\"Bengaluru\");\nconsole.log(\"Masala dosa\");"
      },
      {
        "question": "Declare a const birthYear and compute age for 2026.",
        "hint": "const cannot be reassigned; subtract from 2026.",
        "answer": "const birthYear = 2005;\nconsole.log(2026 - birthYear);"
      },
      {
        "question": "What prints: console.log(typeof 42, typeof \"hi\", typeof true)?",
        "hint": "typeof reports \"number\", \"string\", \"boolean\".",
        "answer": "console.log(typeof 42, typeof \"hi\", typeof true);\n// number string boolean"
      },
      {
        "question": "Fix: let total = \"5\" + 5; make it numeric 10.",
        "hint": "Convert the string first with Number().",
        "answer": "let total = Number(\"5\") + 5;\nconsole.log(total); // 10"
      }
    ],
    "interview": [
      {
        "question": "How does JavaScript run in browser vs Node?",
        "answer": "The language is the same; the environment differs. Browsers provide DOM, window, fetch; Node provides fs, process, modules. The V8 engine powers both Chrome and Node."
      },
      {
        "question": "let vs const vs var?",
        "answer": "let: block-scoped, reassignable. const: block-scoped, must be initialised, binding not reassignable (object contents still mutable). var: function-scoped, hoisted, legacy — avoid."
      },
      {
        "question": "What is typeof null and why?",
        "answer": "typeof null is \"object\" — a famous legacy bug from the first implementation. Test null with x === null instead."
      },
      {
        "question": "What does \"use strict\" change?",
        "answer": "Enables strict mode: assignments to undeclared variables throw, silent failures become errors, and some unsafe features are banned."
      }
    ]
  },
  {
    "id": "javascript-2",
    "title": "Types, operators & equality",
    "level": "Beginner",
    "definition": "JS has primitive types (number, string, boolean, null, undefined, symbol, bigint) and objects (including arrays and functions). Operators (+, -, *, /, %, ===, &&, ||, !) compute and compare; === checks value AND type with no conversion.",
    "analogy": "Like currency notes vs coins vs UPI: each is money but behaves differently. === is a strict shopkeeper who rejects a Rs.100 note photocopy — type must match exactly, unlike == which accepts lookalikes after conversion.",
    "keyPoints": [
      "number covers integers and decimals (all 64-bit floats); use BigInt (10n) for huge integers.",
      "string with quotes/backticks; boolean true/false; null (intentional empty) vs undefined (never assigned).",
      "=== strict equality (no conversion) — always prefer it; == loose equality converts (\"5\" == 5 is true, a classic bug).",
      "Arithmetic: + - * / % **; + with a string concatenates: \"Age: \" + 21.",
      "Logical: && (and), || (or), ! (not); || and ?? (nullish) give defaults — ?? only falls back on null/undefined.",
      "Convert explicitly: Number(\"42\"), String(42), Boolean(0) is false; check NaN with Number.isNaN()."
    ],
    "basicExamples": [
      {
        "title": "Primitives and typeof",
        "code": "let age = 21;\nlet name = \"Asha\";\nlet passed = true;\nlet nick = null;\nlet extra;\nconsole.log(typeof age, typeof name, typeof passed);\nconsole.log(nick, extra);",
        "lineByLine": [
          {
            "line": "let age = 21;",
            "explanation": "number holds both integers and decimals."
          },
          {
            "line": "let nick = null;",
            "explanation": "null: deliberately empty value."
          },
          {
            "line": "console.log(typeof age, ...);",
            "explanation": "Reports: number string boolean."
          }
        ]
      },
      {
        "title": "Strict vs loose equality",
        "code": "console.log(5 === \"5\");\nconsole.log(5 == \"5\");\nconsole.log(0 === false);\nconsole.log(null === undefined);",
        "lineByLine": [
          {
            "line": "console.log(5 === \"5\");",
            "explanation": "false: number vs string, no conversion."
          },
          {
            "line": "console.log(5 == \"5\");",
            "explanation": "true: == converts then compares — avoid this."
          },
          {
            "line": "console.log(null === undefined);",
            "explanation": "false: they are different empty values."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Number conversion from input",
        "code": "let text = \"42\";\nlet n = Number(text);\nconsole.log(n + 8);\nconsole.log(Number(\"five\"));\nconsole.log(Number.isNaN(Number(\"five\")));",
        "lineByLine": [
          {
            "line": "let n = Number(text);",
            "explanation": "Converts \"42\" to 42 so maths works."
          },
          {
            "line": "console.log(Number(\"five\"));",
            "explanation": "Bad input becomes NaN (Not a Number)."
          },
          {
            "line": "console.log(Number.isNaN(...));",
            "explanation": "Reliable NaN test (NaN === NaN is false!)."
          }
        ]
      },
      {
        "title": "Defaults with || and ??",
        "code": "let nick = \"\";\nconsole.log(nick || \"Guest\");\nconsole.log(nick ?? \"Guest\");\nlet qty = 0;\nconsole.log(qty || 1);\nconsole.log(qty ?? 1);",
        "lineByLine": [
          {
            "line": "console.log(nick || \"Guest\");",
            "explanation": "|| falls back on any falsy value: Guest."
          },
          {
            "line": "console.log(nick ?? \"Guest\");",
            "explanation": "?? keeps \"\" (only null/undefined trigger it): prints \"\"."
          },
          {
            "line": "console.log(qty ?? 1);",
            "explanation": "Keeps 0 — the key difference from ||."
          }
        ]
      },
      {
        "title": "Math methods and rounding",
        "code": "console.log(Math.max(4, 9, 2));\nconsole.log(Math.min(4, 9, 2));\nconsole.log(Math.round(4.5));\nconsole.log((12.345).toFixed(2));\nconsole.log(Math.floor(4.9), Math.ceil(4.1));",
        "lineByLine": [
          {
            "line": "Math.max(4, 9, 2)",
            "explanation": "Largest of the arguments: 9."
          },
          {
            "line": "Math.round(4.5)",
            "explanation": "Rounds to nearest: 5 (.5 goes up)."
          },
          {
            "line": "(12.345).toFixed(2)",
            "explanation": "Formats to \"12.35\" as a string - good for money display."
          },
          {
            "line": "Math.floor(4.9), Math.ceil(4.1)",
            "explanation": "floor -> 4, ceil -> 5."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Parsing messy numeric input",
        "code": "function toNumber(text, fallback = 0) {\n  const cleaned = String(text).replace(/[^0-9.-]/g, \"\").trim();\n  const n = Number(cleaned);\n  return Number.isNaN(n) ? fallback : n;\n}\nconsole.log(toNumber(\"Rs. 1,250 \")); // 1250\nconsole.log(toNumber(\"free\"));       // 0",
        "note": "Strip currency symbols/commas before Number(); fall back instead of leaking NaN."
      },
      {
        "title": "Truthy/falsy audit",
        "code": "const falsy = [false, 0, \"\", null, undefined, NaN];\nconsole.log(falsy.map(Boolean)); // all false\nconsole.log(Boolean([]), Boolean({})); // true true — empty objects are truthy!",
        "note": "Only 6 falsy values exist; empty arrays/objects are truthy — a classic interview trap."
      }
    ],
    "practice": [
      {
        "question": "Predict: \"5\" + 2, \"5\" - 2, true + 1.",
        "hint": "+ concatenates, - and + coerce to numbers.",
        "answer": "console.log(\"5\" + 2); // \"52\"\nconsole.log(\"5\" - 2); // 3\nconsole.log(true + 1); // 2"
      },
      {
        "question": "Convert \"3.14\" to a number and add 1.",
        "hint": "Number() or parseFloat().",
        "answer": "console.log(Number(\"3.14\") + 1); // 4.14"
      },
      {
        "question": "Write a function isAdult(age) returning boolean.",
        "hint": "Compare with >= 18.",
        "answer": "function isAdult(age) {\n  return age >= 18;\n}\nconsole.log(isAdult(19));"
      },
      {
        "question": "Fix: users with qty 0 get billed 1 by `qty || 1`.",
        "hint": "Use ?? so 0 is kept.",
        "answer": "let qty = 0;\nconsole.log(qty ?? 1); // 0"
      }
    ],
    "interview": [
      {
        "question": "== vs === — explain with an example.",
        "answer": "== converts types first (\"5\" == 5 is true); === requires same type (5 === \"5\" is false). Teams enforce === (eslint eqeqeq) to kill conversion bugs."
      },
      {
        "question": "List all falsy values.",
        "answer": "false, 0, -0, 0n, \"\", null, undefined, NaN. Everything else — including [] and {} — is truthy."
      },
      {
        "question": "null vs undefined?",
        "answer": "undefined: declared but never assigned (or missing property); null: intentional \"no value\". typeof null is \"object\" (legacy bug); test null with === null."
      },
      {
        "question": "Why is NaN === NaN false?",
        "answer": "NaN means \"not a number result\" and IEEE-754 defines it as unequal to everything including itself. Use Number.isNaN(x) to detect it."
      }
    ]
  },
  {
    "id": "javascript-3",
    "title": "Conditions & loops",
    "level": "Beginner",
    "definition": "Conditions (if/else, switch, ternary) choose paths; loops (for, while, for...of) repeat work. Together they turn static scripts into programs that react to data.",
    "analogy": "Like a festival food stall: if a customer pays, serve; else ask again. The cook repeats dosa after dosa (loop) until the batter ends, skipping burnt ones (continue) and stopping when the gas runs out (break).",
    "keyPoints": [
      "if/else if/else picks the first true branch; switch matches one value against many cases (remember break).",
      "Ternary cond ? a : b fits two-way choices in one line: status = marks >= 40 ? \"pass\" : \"fail\".",
      "for (let i = 0; i < n; i++) counts precisely; for...of walks array values directly.",
      "while repeats while a test holds — always move toward the exit or it loops forever.",
      "break exits the loop; continue skips to the next round; both pair with if inside loops.",
      "Compare with === in conditions; == invites conversion bugs into every branch."
    ],
    "basicExamples": [
      {
        "title": "Grade with if else",
        "code": "let marks = 72;\nlet grade;\nif (marks >= 90) {\n  grade = \"A\";\n} else if (marks >= 60) {\n  grade = \"B\";\n} else {\n  grade = \"C\";\n}\nconsole.log(grade);",
        "lineByLine": [
          {
            "line": "let marks = 72;",
            "explanation": "Test score to classify."
          },
          {
            "line": "if (marks >= 90) {",
            "explanation": "72 fails, so JS tries else if."
          },
          {
            "line": "grade = \"B\";",
            "explanation": "72 passes here; the final else is skipped."
          }
        ]
      },
      {
        "title": "Counting with for",
        "code": "let total = 0;\nfor (let i = 1; i <= 5; i++) {\n  total = total + i;\n}\nconsole.log(total);",
        "lineByLine": [
          {
            "line": "let total = 0;",
            "explanation": "Accumulator starts at zero."
          },
          {
            "line": "for (let i = 1; i <= 5; i++) {",
            "explanation": "i runs 1,2,3,4,5 then stops."
          },
          {
            "line": "total = total + i;",
            "explanation": "Adds each i: ends at 15."
          }
        ]
      },
      {
        "title": "while countdown",
        "code": "let n = 3;\nwhile (n > 0) {\n  console.log(n);\n  n = n - 1;\n}\nconsole.log(\"Go!\");",
        "lineByLine": [
          {
            "line": "let n = 3;",
            "explanation": "Start value."
          },
          {
            "line": "while (n > 0) {",
            "explanation": "Repeats while the test holds."
          },
          {
            "line": "n = n - 1;",
            "explanation": "Moves toward the exit — without this, infinite loop."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Truthy login check",
        "code": "let user = \"asha\";\nlet pass = \"rose123\";\nif (user && pass.length >= 6) {\n  console.log(\"Welcome!\");\n} else {\n  console.log(\"Try again\");\n}",
        "lineByLine": [
          {
            "line": "let user = \"asha\";",
            "explanation": "Non-empty string counts as truthy."
          },
          {
            "line": "if (user && pass.length >= 6) {",
            "explanation": "Both must hold: user truthy AND long password."
          },
          {
            "line": "console.log(\"Try again\");",
            "explanation": "Empty user or short pass lands here."
          }
        ]
      },
      {
        "title": "break and continue",
        "code": "for (let token = 1; token <= 10; token++) {\n  if (token === 4) continue;\n  if (token === 7) break;\n  console.log(token);\n}",
        "lineByLine": [
          {
            "line": "if (token === 4) continue;",
            "explanation": "Skips printing 4, loop carries on."
          },
          {
            "line": "if (token === 7) break;",
            "explanation": "Stops the whole loop at 7."
          },
          {
            "line": "console.log(token);",
            "explanation": "Prints 1 2 3 5 6."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "switch for fixed choices",
        "code": "let day = \"Sun\";\nlet type;\nswitch (day) {\n  case \"Sat\":\n  case \"Sun\":\n    type = \"Weekend\";\n    break;\n  case \"Mon\":\n    type = \"Fresh start\";\n    break;\n  default:\n    type = \"Weekday\";\n}\nconsole.log(type);",
        "note": "Stacked cases share one branch; missing break falls through — the classic switch bug."
      },
      {
        "title": "Find first passing student",
        "code": "const marks = [22, 35, 78, 91];\nlet first = -1;\nfor (let i = 0; i < marks.length; i++) {\n  if (marks[i] >= 40) { first = i; break; }\n}\nconsole.log(first, marks[first]);",
        "note": "break on first match avoids scanning the rest — O(n) best case, not always full scan."
      }
    ],
    "practice": [
      {
        "question": "Print Fizz (3), Buzz (5), FizzBuzz (both) for 1-20.",
        "hint": "Check 15 first, then 3, then 5.",
        "answer": "for (let i = 1; i <= 20; i++) {\n  if (i % 15 === 0) console.log(\"FizzBuzz\");\n  else if (i % 3 === 0) console.log(\"Fizz\");\n  else if (i % 5 === 0) console.log(\"Buzz\");\n  else console.log(i);\n}"
      },
      {
        "question": "Sum array values with for...of.",
        "hint": "for (const x of arr) accumulates.",
        "answer": "const a = [4, 8, 15];\nlet s = 0;\nfor (const x of a) s += x;\nconsole.log(s);"
      },
      {
        "question": "Keep asking until input is non-empty (simulate 3 tries).",
        "hint": "while with a tries counter.",
        "answer": "let tries = 0, name = \"\";\nwhile (!name && tries < 3) { name = tries === 2 ? \"guest\" : \"\"; tries++; }\nconsole.log(name);"
      },
      {
        "question": "Rewrite if/else grade as a ternary chain.",
        "hint": "cond ? a : cond ? b : c.",
        "answer": "let m = 72;\nconsole.log(m >= 90 ? \"A\" : m >= 60 ? \"B\" : \"C\");"
      }
    ],
    "interview": [
      {
        "question": "for vs for...of vs forEach — which when?",
        "answer": "Classic for: index control, break/continue. for...of: values, supports break/continue/await. forEach: concise but cannot break or await properly — avoid for async work."
      },
      {
        "question": "What happens if switch misses break?",
        "answer": "Execution falls through into the next case body regardless of its label — sometimes intentional (stacked cases), usually a bug. Linters flag it."
      },
      {
        "question": "How do you avoid infinite while loops?",
        "answer": "Guarantee progress toward the exit (counter/flag), cap iterations for safety, and prefer for/for...of when the bound is known upfront."
      },
      {
        "question": "== inside a condition - real danger example?",
        "answer": "if (input == 0) is true for \"\", false, \"0\" too - any of those wrongly pass. === restricts to real zeros."
      }
    ]
  },
  {
    "id": "javascript-4",
    "title": "Functions: declarations, arrows & scope",
    "level": "Beginner",
    "definition": "Functions package reusable steps: declare with function or const arrow, pass arguments, return a result. Scope decides where a name is visible - block scope (let/const) keeps variables inside their { }.",
    "analogy": "Like a dosa counter with a fixed recipe card: you hand over batter and filling (arguments), the cook follows steps and returns a dosa (return value). The masala bowl stays inside the counter (scope) - the dining hall cannot grab it directly.",
    "keyPoints": [
      "function greet(name) { return ...; } declares; greet(\"Asha\") calls it with an argument.",
      "Arrow functions: const add = (a, b) => a + b; - short form, great for callbacks.",
      "return sends a value back and exits immediately; a function without return gives undefined.",
      "let/const are block-scoped: visible only inside their { }; var leaks to the function - avoid it.",
      "Default parameters fill gaps: function fee(age = 10) uses 10 when no age is passed.",
      "Rest (...args) collects extra arguments into an array; spread (...arr) expands one."
    ],
    "basicExamples": [
      {
        "title": "Declare and call",
        "code": "function namaste(name) {\n  return \"Namaste, \" + name + \"!\";\n}\nconsole.log(namaste(\"Asha\"));",
        "lineByLine": [
          {
            "line": "function namaste(name) {",
            "explanation": "name is the parameter (placeholder)."
          },
          {
            "line": "return \"Namaste, \" + name + \"!\";",
            "explanation": "Builds and returns the greeting."
          },
          {
            "line": "console.log(namaste(\"Asha\"));",
            "explanation": "Calls with \"Asha\", prints the result."
          }
        ]
      },
      {
        "title": "Arrow function",
        "code": "const add = (a, b) => a + b;\nconsole.log(add(4, 6));",
        "lineByLine": [
          {
            "line": "const add = (a, b) => a + b;",
            "explanation": "Arrow: parameters left, expression result returned automatically."
          },
          {
            "line": "console.log(add(4, 6));",
            "explanation": "Prints 10."
          }
        ]
      },
      {
        "title": "Default parameter",
        "code": "function ticketPrice(age = 10) {\n  return age < 5 ? 0 : 100;\n}\nconsole.log(ticketPrice());",
        "lineByLine": [
          {
            "line": "function ticketPrice(age = 10) {",
            "explanation": "age defaults to 10 when omitted."
          },
          {
            "line": "return age < 5 ? 0 : 100;",
            "explanation": "Ternary picks the price."
          },
          {
            "line": "console.log(ticketPrice());",
            "explanation": "Uses the default: prints 100."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Block scope",
        "code": "let city = \"Delhi\";\nif (true) {\n  let city = \"Mumbai\";\n  console.log(city);\n}\nconsole.log(city);",
        "lineByLine": [
          {
            "line": "let city = \"Delhi\";",
            "explanation": "Outer binding."
          },
          {
            "line": "let city = \"Mumbai\";",
            "explanation": "A SEPARATE inner binding - shadows the outer."
          },
          {
            "line": "console.log(city);",
            "explanation": "Outside prints Delhi again."
          }
        ]
      },
      {
        "title": "Rest and spread",
        "code": "function total(...nums) {\n  let s = 0;\n  for (const n of nums) s += n;\n  return s;\n}\nconst bills = [40, 60];\nconsole.log(total(...bills, 20));",
        "lineByLine": [
          {
            "line": "function total(...nums) {",
            "explanation": "Rest collects all arguments into an array."
          },
          {
            "line": "const bills = [40, 60];",
            "explanation": "Spread expands the array into separate arguments."
          },
          {
            "line": "console.log(total(...bills, 20));",
            "explanation": "total(40, 60, 20) prints 120."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Callback pattern",
        "code": "function applyTwice(fn, x) {\n  return fn(fn(x));\n}\nconst add5 = n => n + 5;\nconsole.log(applyTwice(add5, 10));",
        "note": "Functions accept functions: applyTwice runs add5 twice (10 -> 15 -> 20) - the basis of map/filter/forEach."
      },
      {
        "title": "Closure counter",
        "code": "function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst next = makeCounter();\nconsole.log(next(), next());",
        "note": "The returned arrow remembers count from its birth scope - private state without objects (prints 1 2)."
      }
    ],
    "practice": [
      {
        "question": "Write areaOfCircle(r) with 3.14 and test r=7.",
        "hint": "function with return Math-free 3.14 * r * r.",
        "answer": "function areaOfCircle(r) {\n  return 3.14 * r * r;\n}\nconsole.log(areaOfCircle(7));"
      },
      {
        "question": "Arrow isEven(n) returning true/false.",
        "hint": "Single-expression arrow: n % 2 === 0.",
        "answer": "const isEven = n => n % 2 === 0;\nconsole.log(isEven(8));"
      },
      {
        "question": "greet(name = \"guest\") printing Namaste, X!",
        "hint": "Default parameter fills the gap.",
        "answer": "function greet(name = \"guest\") {\n  console.log(\"Namaste, \" + name + \"!\");\n}\ngreet();"
      },
      {
        "question": "Fix the var-in-loop closure surprise.",
        "hint": "var leaks one shared binding; let gives each round its own.",
        "answer": "for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 10);\n}\n// prints 0 1 2 (var would print 3 3 3)"
      }
    ],
    "interview": [
      {
        "question": "function vs arrow - real differences?",
        "answer": "Arrows: shorter, no own this/arguments, cannot be constructors. Use arrows for callbacks; use function for methods needing this or hoisted helpers."
      },
      {
        "question": "What is scope and why does let beat var?",
        "answer": "Scope is where a name is visible. let/const are block-scoped (each loop round gets its own); var is function-scoped and shared - the classic loop+setTimeout bug."
      },
      {
        "question": "What is a closure in one example?",
        "answer": "A function remembering its birth scope: makeCounter returns an arrow that keeps incrementing its private count after makeCounter finished."
      },
      {
        "question": "Rest vs spread - same dots, different jobs?",
        "answer": "Rest (...args in parameters) COLLECTS arguments into an array; spread (...arr in calls) EXPANDS an array into arguments. Position decides the job."
      }
    ]
  },
  {
    "id": "javascript-5",
    "title": "Arrays & objects",
    "level": "Intermediate",
    "definition": "Arrays store ordered lists (arr[0], .length, .push); objects store named properties ({name: \"Asha\"}). Array methods (map, filter, find) transform data without manual loops.",
    "analogy": "Like a train pantry: the array is the numbered coach (berth 0, 1, 2 - order matters); the object is the labelled storage box (sugar jar, milk jar - names matter). map/filter are the pantry staff refilling every berth the same way.",
    "keyPoints": [
      "Arrays: const a = [4, 8]; a[0] is 4; a.length is 2; a.push(9) appends.",
      "Objects: const s = {name: \"Asha\"}; read with s.name or s[\"name\"]; add with s.city = \"Pune\".",
      "map builds a new array by transforming each item; filter keeps only matching items.",
      "find returns the first match (or undefined); includes checks membership.",
      "Spread [...a, 5] copies plus extras; destructure const [x, y] = pair.",
      "Loop arrays with for...of; loop object keys with for...in or Object.entries()."
    ],
    "basicExamples": [
      {
        "title": "Array basics",
        "code": "const marks = [92, 78, 85];\nconsole.log(marks[0]);\nmarks.push(90);\nconsole.log(marks.length);",
        "lineByLine": [
          {
            "line": "const marks = [92, 78, 85];",
            "explanation": "Ordered list, indexes 0..2."
          },
          {
            "line": "console.log(marks[0]);",
            "explanation": "First item: 92."
          },
          {
            "line": "marks.push(90);",
            "explanation": "Appends; length becomes 4."
          }
        ]
      },
      {
        "title": "Object basics",
        "code": "const student = { name: \"Asha\", marks: 92 };\nconsole.log(student.name);\nstudent.city = \"Pune\";\nconsole.log(student.city);",
        "lineByLine": [
          {
            "line": "const student = { name: \"Asha\", marks: 92 };",
            "explanation": "Named properties in braces."
          },
          {
            "line": "console.log(student.name);",
            "explanation": "Dot reads the property."
          },
          {
            "line": "student.city = \"Pune\";",
            "explanation": "Adds a new property."
          }
        ]
      },
      {
        "title": "map and filter",
        "code": "const nums = [4, 9, 16];\nconsole.log(nums.map(n => n / 2));\nconsole.log(nums.filter(n => n > 8));",
        "lineByLine": [
          {
            "line": "nums.map(n => n / 2)",
            "explanation": "Transforms each: [2, 4.5, 8]."
          },
          {
            "line": "nums.filter(n => n > 8)",
            "explanation": "Keeps matches: [9, 16]."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "find and includes",
        "code": "const cities = [\"Mumbai\", \"Pune\"];\nconsole.log(cities.find(c => c[0] === \"P\"));\nconsole.log(cities.includes(\"Delhi\"));",
        "lineByLine": [
          {
            "line": "cities.find(c => c[0] === \"P\")",
            "explanation": "First match: Pune (or undefined)."
          },
          {
            "line": "cities.includes(\"Delhi\")",
            "explanation": "Membership test: false."
          }
        ]
      },
      {
        "title": "Destructure and spread",
        "code": "const pair = [\"Asha\", 92];\nconst [name, marks] = pair;\nconst more = [...pair, \"Pune\"];\nconsole.log(name, marks, more.length);",
        "lineByLine": [
          {
            "line": "const [name, marks] = pair;",
            "explanation": "Unpacks positionally."
          },
          {
            "line": "const more = [...pair, \"Pune\"];",
            "explanation": "Copies plus one extra."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Group orders by item",
        "code": "const orders = [{item: \"dosa\", qty: 2}, {item: \"idli\", qty: 4}, {item: \"dosa\", qty: 1}];\nconst totals = {};\nfor (const o of orders) totals[o.item] = (totals[o.item] || 0) + o.qty;\nconsole.log(totals);",
        "note": "Object-as-counter: dosa totals 3, idli 4 - the standard grouping pattern."
      },
      {
        "title": "Chained pipeline",
        "code": "const bills = [120, 45, 300, 80];\nconst big = bills.filter(b => b >= 100).map(b => b * 0.9);\nconsole.log(big);",
        "note": "filter then map: keep big bills, apply 10% off - readable data pipelines."
      }
    ],
    "practice": [
      {
        "question": "Double [1,2,3] with map.",
        "hint": "n => n * 2.",
        "answer": "console.log([1, 2, 3].map(n => n * 2));"
      },
      {
        "question": "Keep passing marks (>=40) from [22,55,78].",
        "hint": "filter with >= 40.",
        "answer": "console.log([22, 55, 78].filter(m => m >= 40));"
      },
      {
        "question": "Student object with name, marks; add grade B.",
        "hint": "Dot assignment.",
        "answer": "const s = { name: \"Asha\", marks: 72 };\ns.grade = \"B\";\nconsole.log(s);"
      },
      {
        "question": "Find price of dosa in a menu array of objects.",
        "hint": "find with === test.",
        "answer": "const menu = [{item: \"dosa\", price: 60}, {item: \"idli\", price: 30}];\nconsole.log(menu.find(m => m.item === \"dosa\").price);"
      }
    ],
    "interview": [
      {
        "question": "map vs forEach vs for...of?",
        "answer": "map builds a NEW array (chainable); forEach just runs side effects (returns undefined); for...of supports break/continue/await. Default to map for transforms."
      },
      {
        "question": "How do objects differ from arrays?",
        "answer": "Arrays: ordered, numeric indexes, .length, list methods. Objects: named keys, no order guarantee, property access. Pick by how you look things up."
      },
      {
        "question": "Reference trap: const b = a; b.push(1)?",
        "answer": "Arrays/objects copy the REFERENCE - b.push also changes a. Clone with [...a] or {...o} (shallow) or structuredClone for deep."
      },
      {
        "question": "When does find return undefined and why guard?",
        "answer": "When nothing matches. Accessing .price on undefined throws - check first (found && found.price) or use ?. optional chaining."
      }
    ]
  },
  {
    "id": "javascript-6",
    "title": "DOM: selecting & changing the page",
    "level": "Intermediate",
    "definition": "The DOM (Document Object Model) is the live tree of a web page. JavaScript selects nodes (querySelector), changes text, styles and classes, creates elements, and reacts to clicks and typing with event listeners.",
    "analogy": "Like redecorating a shop display while customers watch: querySelector points at one shelf, textContent swaps the price board, classList toggles festival lights, and addEventListener rings the bell whenever someone touches the door.",
    "keyPoints": [
      "document.querySelector(\".price\") picks the first match; querySelectorAll returns all matches as a list.",
      "el.textContent sets safe plain text; innerHTML parses HTML (never feed it raw user input - XSS).",
      "Toggle looks with el.classList.add/remove/toggle and el.style for one-off styles.",
      "Create nodes with document.createElement, attach with parent.append, remove with el.remove().",
      "el.addEventListener(\"click\", fn) reacts to clicks; input events fire on every keystroke.",
      "Put scripts at the end of body (or use defer) so the elements exist before your code runs."
    ],
    "basicExamples": [
      {
        "title": "Change the heading",
        "code": "const h = document.querySelector(\"h1\");\nh.textContent = \"Namaste, CodeAtlas!\";\nconsole.log(h.textContent);",
        "lineByLine": [
          {
            "line": "const h = document.querySelector(\"h1\");",
            "explanation": "Grabs the first h1 on the page (null if missing)."
          },
          {
            "line": "h.textContent = \"Namaste, CodeAtlas!\";",
            "explanation": "Replaces the visible heading text safely."
          },
          {
            "line": "console.log(h.textContent);",
            "explanation": "Confirms the new text."
          }
        ]
      },
      {
        "title": "Toggle festival lights",
        "code": "const shop = document.querySelector(\"#shop\");\nshop.classList.toggle(\"lights\");\nconsole.log(shop.className);",
        "lineByLine": [
          {
            "line": "const shop = document.querySelector(\"#shop\");",
            "explanation": "Selects by id with the # prefix."
          },
          {
            "line": "shop.classList.toggle(\"lights\");",
            "explanation": "Adds the class if absent, removes if present."
          },
          {
            "line": "console.log(shop.className);",
            "explanation": "Shows current classes."
          }
        ]
      },
      {
        "title": "Click counter",
        "code": "let n = 0;\nconst btn = document.querySelector(\"#buy\");\nbtn.addEventListener(\"click\", () => {\n  n = n + 1;\n  console.log(\"bought \" + n);\n});",
        "lineByLine": [
          {
            "line": "let n = 0;",
            "explanation": "Counter lives outside so clicks accumulate."
          },
          {
            "line": "btn.addEventListener(\"click\", () => {",
            "explanation": "Registers a function to run on every click."
          },
          {
            "line": "n = n + 1;",
            "explanation": "Each click bumps the count."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Build a list from data",
        "code": "const items = [\"dosa\", \"idli\", \"vada\"];\nconst ul = document.querySelector(\"#menu\");\nfor (const name of items) {\n  const li = document.createElement(\"li\");\n  li.textContent = name;\n  ul.append(li);\n}",
        "lineByLine": [
          {
            "line": "const ul = document.querySelector(\"#menu\");",
            "explanation": "Finds the empty ul container."
          },
          {
            "line": "const li = document.createElement(\"li\");",
            "explanation": "Creates a fresh list item node."
          },
          {
            "line": "ul.append(li);",
            "explanation": "Attaches it so the browser shows it."
          }
        ]
      },
      {
        "title": "Live search filter",
        "code": "const box = document.querySelector(\"#q\");\nbox.addEventListener(\"input\", () => {\n  const cards = document.querySelectorAll(\".card\");\n  for (const c of cards) {\n    const hit = c.textContent.includes(box.value);\n    c.style.display = hit ? \"\" : \"none\";\n  }\n});",
        "lineByLine": [
          {
            "line": "box.addEventListener(\"input\", () => {",
            "explanation": "Fires on every keystroke in the search box."
          },
          {
            "line": "document.querySelectorAll(\".card\");",
            "explanation": "Grabs every card to test."
          },
          {
            "line": "c.style.display = hit ? \"\" : \"none\";",
            "explanation": "Hides non-matching cards instantly."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Event delegation",
        "code": "document.querySelector(\"#menu\").addEventListener(\"click\", (e) => {\n  const item = e.target.closest(\"li\");\n  if (!item) return;\n  console.log(\"ordered \" + item.textContent);\n});",
        "note": "One listener on the parent serves all current AND future children via e.target - no re-binding after each render."
      },
      {
        "title": "Safe user comments",
        "code": "function addComment(text) {\n  const li = document.createElement(\"li\");\n  li.textContent = text;\n  document.querySelector(\"#comments\").append(li);\n}\naddComment(\"<img src=x onerror=alert(1)>\");",
        "note": "textContent renders the attack as harmless text; innerHTML would have executed it - the core XSS defence."
      }
    ],
    "practice": [
      {
        "question": "Change all .old-price elements to show Rs.99.",
        "hint": "querySelectorAll + for...of.",
        "answer": "for (const el of document.querySelectorAll(\".old-price\")) el.textContent = \"Rs.99\";"
      },
      {
        "question": "Add a \"sold out\" class to #dosa when stock hits 0.",
        "hint": "classList.add in an if.",
        "answer": "const stock = 0;\nif (stock === 0) document.querySelector(\"#dosa\").classList.add(\"sold-out\");"
      },
      {
        "question": "Render 3 city names as li items inside #cities.",
        "hint": "createElement + append in a loop.",
        "answer": "for (const c of [\"Mumbai\",\"Pune\",\"Delhi\"]) { const li = document.createElement(\"li\"); li.textContent = c; document.querySelector(\"#cities\").append(li); }"
      },
      {
        "question": "Count button clicks and show \"Clicked N times\".",
        "hint": "Listener + textContent update.",
        "answer": "let n = 0;\nconst b = document.querySelector(\"#hit\");\nb.addEventListener(\"click\", () => { n++; b.textContent = \"Clicked \" + n + \" times\"; });"
      }
    ],
    "interview": [
      {
        "question": "textContent vs innerHTML vs innerText?",
        "answer": "textContent: raw text, fast, safe. innerHTML: parses HTML (XSS risk with user data). innerText: styled/visible text, slow (forces layout). Default to textContent."
      },
      {
        "question": "What is event delegation and why?",
        "answer": "One parent listener handles child events via e.target. Survives re-renders, uses less memory, and needs no rebinding when items are added dynamically."
      },
      {
        "question": "Why does my script see null from querySelector?",
        "answer": "It ran before the element existed (script in head without defer) or the selector is wrong. Fix: move script to end of body or add defer."
      },
      {
        "question": "How does an XSS attack via innerHTML work?",
        "answer": "Attacker input like <img onerror=...> is parsed as live HTML and executes. Defence: textContent for user data, escape or sanitise before any innerHTML use."
      }
    ]
  },
  {
    "id": "javascript-7",
    "title": "Spread, destructure & array methods",
    "level": "Intermediate",
    "definition": "Modern JS transforms collections without manual loops: spread (...) copies and merges, destructuring unpacks values into names, and map/filter/reduce/find express the intent of each pass over an array.",
    "analogy": "Like a mess manager handling thalis: spread copies the whole thali layout to a new plate, destructuring hands dal to one student and rice to another by name, and map/filter are assembly lines - one adds extra roti to every plate, one removes plates without dal.",
    "keyPoints": [
      "Spread copies: [...a, 4] extends arrays; {...user, city: \"Pune\"} clones objects with one change.",
      "Destructure to name things: const [first, second] = marks; const {name, city} = student.",
      "map builds a new transformed array; the original is untouched (immutability wins in React).",
      "filter keeps matches; find returns the first match (or undefined); some/every test the group.",
      "reduce folds many values into one: sums, totals, grouped objects - start from an initial value.",
      "Chaining (filter then map) reads like a pipeline; keep each step small and named when reused."
    ],
    "basicExamples": [
      {
        "title": "Spread copies",
        "code": "const a = [1, 2];\nconst b = [...a, 3];\nconst user = { name: \"Asha\", city: \"Delhi\" };\nconst moved = { ...user, city: \"Pune\" };\nconsole.log(b, moved.city);",
        "lineByLine": [
          {
            "line": "const b = [...a, 3];",
            "explanation": "Copies a then adds 3; a unchanged."
          },
          {
            "line": "const moved = { ...user, city: \"Pune\" };",
            "explanation": "Clones user, overrides city only."
          },
          {
            "line": "console.log(b, moved.city);",
            "explanation": "Prints [1,2,3] and Pune."
          }
        ]
      },
      {
        "title": "Destructuring",
        "code": "const marks = [92, 78];\nconst [first, second] = marks;\nconst student = { name: \"Asha\", city: \"Pune\" };\nconst { name, city } = student;\nconsole.log(first, name, city);",
        "lineByLine": [
          {
            "line": "const [first, second] = marks;",
            "explanation": "Unpacks positions into names."
          },
          {
            "line": "const { name, city } = student;",
            "explanation": "Unpacks matching property names."
          },
          {
            "line": "console.log(first, name, city);",
            "explanation": "Prints 92 Asha Pune."
          }
        ]
      },
      {
        "title": "map and filter",
        "code": "const marks = [22, 55, 78, 91];\nconst passed = marks.filter(m => m >= 40);\nconst doubled = passed.map(m => m * 2);\nconsole.log(passed, doubled);",
        "lineByLine": [
          {
            "line": "marks.filter(m => m >= 40);",
            "explanation": "Keeps 55, 78, 91."
          },
          {
            "line": "passed.map(m => m * 2);",
            "explanation": "Transforms each kept value."
          },
          {
            "line": "console.log(passed, doubled);",
            "explanation": "Original marks untouched."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "find, some, every",
        "code": "const users = [{ id: 1, name: \"Asha\" }, { id: 2, name: \"Ravi\" }];\nconsole.log(users.find(u => u.id === 2).name);\nconsole.log(users.some(u => u.name === \"Asha\"));\nconsole.log(users.every(u => u.id > 0));",
        "lineByLine": [
          {
            "line": "users.find(u => u.id === 2).name",
            "explanation": "First match object, then its name: Ravi."
          },
          {
            "line": "users.some(...)",
            "explanation": "True when at least one matches."
          },
          {
            "line": "users.every(u => u.id > 0)",
            "explanation": "True only when all match."
          }
        ]
      },
      {
        "title": "reduce totals",
        "code": "const cart = [{ price: 60, qty: 2 }, { price: 30, qty: 4 }];\nconst total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);\nconsole.log(total);",
        "lineByLine": [
          {
            "line": "cart.reduce((sum, item) => ..., 0)",
            "explanation": "sum starts at 0, folds each item in."
          },
          {
            "line": "sum + item.price * item.qty",
            "explanation": "Adds each line total."
          },
          {
            "line": "console.log(total);",
            "explanation": "Prints 240."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Rest in destructuring",
        "code": "const [topper, ...rest] = [98, 91, 85, 76];\nconst { city, ...profile } = { name: \"Asha\", city: \"Pune\", age: 21 };\nconsole.log(topper, rest.length, profile.name);",
        "note": "Rest (...) gathers leftovers: topper plus a rest array; city pulled out, profile keeps the rest."
      },
      {
        "title": "Group with reduce",
        "code": "const sales = [{ city: \"Pune\", amt: 100 }, { city: \"Pune\", amt: 50 }, { city: \"Delhi\", amt: 70 }];\nconst byCity = sales.reduce((g, s) => { g[s.city] = (g[s.city] || 0) + s.amt; return g; }, {});\nconsole.log(byCity);",
        "note": "reduce builds a lookup object: { Pune: 150, Delhi: 70 } - the group-by pattern."
      }
    ],
    "practice": [
      {
        "question": "Double [1,2,3,4] then keep values over 5.",
        "hint": "map then filter chain.",
        "answer": "console.log([1, 2, 3, 4].map(x => x * 2).filter(x => x > 5)); // [6, 8]"
      },
      {
        "question": "Pull name and age from a user object with defaults.",
        "hint": "Destructure with = fallback.",
        "answer": "const { name = \"guest\", age = 0 } = {};\nconsole.log(name, age);"
      },
      {
        "question": "Merge two objects; second wins on clashes.",
        "hint": "Spread both in order.",
        "answer": "console.log({ ...{ a: 1, b: 1 }, ...{ b: 2 } }); // { a: 1, b: 2 }"
      },
      {
        "question": "Total marks with reduce from [{m:40},{m:60}].",
        "hint": "Pluck .m and add from 0.",
        "answer": "console.log([{ m: 40 }, { m: 60 }].reduce((s, x) => s + x.m, 0)); // 100"
      }
    ],
    "interview": [
      {
        "question": "map vs forEach vs for...of?",
        "answer": "map returns a new transformed array (pure, chainable). forEach returns undefined - side effects only, cannot break. for...of supports break/continue/await. Default to map for transforms."
      },
      {
        "question": "Why spread instead of direct assignment?",
        "answer": "Assignment copies the reference: two names, one array - mutating one surprises the other. Spread makes a real shallow copy so updates stay local."
      },
      {
        "question": "Shallow copy gotcha with nested objects?",
        "answer": "Spread copies one level: nested objects still share references. {...user} then editing .address mutates the original - deep-clone (structuredClone) for nested edits."
      },
      {
        "question": "When is reduce the right tool?",
        "answer": "Many values into one: sums, products, grouped lookups, frequency counts. If the result is still an array, map/filter express intent better."
      }
    ]
  },
  {
    "id": "javascript-8",
    "title": "Async JS: promises, await & fetch",
    "level": "Intermediate",
    "definition": "Async code waits without blocking: promises represent future values, .then chains steps, async/await writes waiting code flatly, and fetch() loads data from APIs over HTTP.",
    "analogy": "Like ordering at a busy canteen: you take a token (promise) instead of blocking the counter; the kitchen calls your number when ready (.then); async/await is sitting down while the waiter brings each course in order; fetch is phoning the supplier for fresh stock.",
    "keyPoints": [
      "Promise states: pending, fulfilled, rejected - .then handles success, .catch handles failure.",
      "async functions always return promises; await pauses that function only, never the whole page.",
      "fetch(url) returns a promise of Response; await (await fetch(url)).json() reads the body.",
      "Promise.all runs jobs together (total time is the slowest); Promise.allSettled never short-circuits.",
      "await in loops runs steps one by one (slow); map to promises + Promise.all runs them together.",
      "Always handle rejection: try/catch around await or .catch at chain end, else silent failures."
    ],
    "basicExamples": [
      {
        "title": "First promise chain",
        "code": "function late(result) {\n  return new Promise(done => setTimeout(() => done(result), 100));\n}\nlate(\"dosa ready\").then(console.log);",
        "lineByLine": [
          {
            "line": "return new Promise(done => ...)",
            "explanation": "Wraps the timer in a future value."
          },
          {
            "line": "setTimeout(() => done(result), 100)",
            "explanation": "After 100ms the promise fulfils with result."
          },
          {
            "line": ".then(console.log)",
            "explanation": "Runs when ready: prints dosa ready."
          }
        ]
      },
      {
        "title": "async await flat",
        "code": "async function menu() {\n  const a = await late(\"idli\");\n  const b = await late(\"vada\");\n  return a + \" + \" + b;\n}\nmenu().then(console.log);",
        "lineByLine": [
          {
            "line": "async function menu() {",
            "explanation": "Async wrapper: lets us use await inside."
          },
          {
            "line": "const a = await late(\"idli\");",
            "explanation": "Pauses here until idli resolves."
          },
          {
            "line": "menu().then(console.log)",
            "explanation": "menu() itself returns a promise of the meal."
          }
        ]
      },
      {
        "title": "fetch JSON",
        "code": "async function city() {\n  const res = await fetch(\"https://api.example.com/city\");\n  const data = await res.json();\n  return data.name;\n}",
        "lineByLine": [
          {
            "line": "await fetch(\"https://...\")",
            "explanation": "Sends the HTTP request, waits for headers."
          },
          {
            "line": "await res.json()",
            "explanation": "Reads and parses the JSON body."
          },
          {
            "line": "return data.name;",
            "explanation": "Caller gets the city name via await city()."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "try catch on await",
        "code": "async function safeCity() {\n  try {\n    return await city();\n  } catch (err) {\n    return \"offline menu\";\n  }\n}",
        "lineByLine": [
          {
            "line": "try { return await city(); }",
            "explanation": "Network may fail: await can throw."
          },
          {
            "line": "catch (err) {",
            "explanation": "Catches rejection AND JSON parse errors."
          },
          {
            "line": "return \"offline menu\";",
            "explanation": "Graceful fallback instead of a blank page."
          }
        ]
      },
      {
        "title": "Parallel with all",
        "code": "async function thali() {\n  const [a, b] = await Promise.all([late(\"dal\"), late(\"rice\")]);\n  return a + \" + \" + b;\n}",
        "lineByLine": [
          {
            "line": "Promise.all([late(\"dal\"), late(\"rice\")])",
            "explanation": "Both timers run together, not one by one."
          },
          {
            "line": "const [a, b] = await ...",
            "explanation": "Destructures both results in order."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Timeout race",
        "code": "const timeout = ms => new Promise((_, no) => setTimeout(() => no(new Error(\"slow\")), ms));\nconst data = await Promise.race([fetch(\"https://api.example.com/menu\"), timeout(3000)]);",
        "note": "race() takes the first settler: a slow API becomes a caught slow error instead of a hung page."
      },
      {
        "title": "Sequential vs parallel loop",
        "code": "const ids = [1, 2, 3];\nconst slow = [];\nfor (const id of ids) slow.push(await get(id));\nconst fast = await Promise.all(ids.map(get));",
        "note": "await inside the loop waits per item (3x time); map + all overlaps them. Classic interview answer."
      }
    ],
    "practice": [
      {
        "question": "Fetch a URL and log its JSON title field.",
        "hint": "Two awaits: fetch then json.",
        "answer": "const r = await fetch(url);\nconst j = await r.json();\nconsole.log(j.title);"
      },
      {
        "question": "Run two slow() calls in parallel, log both.",
        "hint": "Promise.all with array.",
        "answer": "const [a, b] = await Promise.all([slow(\"a\"), slow(\"b\")]);\nconsole.log(a, b);"
      },
      {
        "question": "Add a fallback when fetch fails.",
        "hint": "try/catch returning default.",
        "answer": "try { return await city(); } catch { return \"Bengaluru\"; }"
      },
      {
        "question": "Fix: for loop with await get(id) is slow - why and fix?",
        "hint": "Sequential waits; parallelise.",
        "answer": "await Promise.all(ids.map(get));"
      }
    ],
    "interview": [
      {
        "question": "What does await actually pause?",
        "answer": "Only its own async function, freeing the event loop for other work. The rest of the page keeps running - that is why async I/O scales."
      },
      {
        "question": "Promise.all vs allSettled vs race?",
        "answer": "all: all fulfil or first rejection wins. allSettled: waits for everything, reports per-status. race: first settler wins - ideal for timeouts."
      },
      {
        "question": "Why is await-in-loop usually a bug?",
        "answer": "Each iteration waits fully before starting the next, serialising independent work. Map to promises first, then one Promise.all."
      },
      {
        "question": "How do unhandled rejections surface?",
        "answer": "No .catch/try-catch means the rejection escapes: Node crashes workers, browsers log errors. Always terminate chains with handling."
      }
    ]
  },
  {
    "id": "javascript-9",
    "title": "Events & forms",
    "level": "Advanced",
    "definition": "Events (click, submit, input) let pages react to users. addEventListener attaches a handler; the event object describes what happened; preventDefault stops the browser default like form reload.",
    "analogy": "Like a shop doorbell: the bell (listener) waits quietly, each entering customer (event) rings it with details, and the keeper (handler) can hold the door shut (preventDefault) instead of letting it swing.",
    "keyPoints": [
      "el.addEventListener(\"click\", fn) attaches; removeEventListener detaches the same function.",
      "Handlers receive an event object: e.target is what was acted on, e.preventDefault() stops defaults.",
      "Form submit reloads unless you preventDefault - then read values from the inputs yourself.",
      "input fires per keystroke (live search); change fires on commit (dropdowns, checkboxes).",
      "Events bubble: a button click also fires parent handlers unless stopPropagation is called.",
      "Delegate: one listener on a parent list beats hundreds on rows - e.target tells which child."
    ],
    "basicExamples": [
      {
        "title": "Click counter",
        "code": "let n = 0;\nconst btn = document.querySelector(\"#hi\");\nconst out = document.querySelector(\"#out\");\nbtn.addEventListener(\"click\", () => {\n  n = n + 1;\n  out.textContent = \"Clicks: \" + n;\n});",
        "lineByLine": [
          {
            "line": "let n = 0;",
            "explanation": "Counter lives outside so it survives clicks."
          },
          {
            "line": "btn.addEventListener(\"click\", () => {",
            "explanation": "Runs the function on every click."
          },
          {
            "line": "out.textContent = \"Clicks: \" + n;",
            "explanation": "Updates the page without reload."
          }
        ]
      },
      {
        "title": "Stop a form reload",
        "code": "const form = document.querySelector(\"#f\");\nform.addEventListener(\"submit\", (e) => {\n  e.preventDefault();\n  console.log(\"saved, no reload\");\n});",
        "lineByLine": [
          {
            "line": "form.addEventListener(\"submit\", (e) => {",
            "explanation": "Submit fires on button or Enter key."
          },
          {
            "line": "e.preventDefault();",
            "explanation": "Stops the browser navigating away."
          },
          {
            "line": "console.log(\"saved, no reload\");",
            "explanation": "Your save logic runs instead."
          }
        ]
      },
      {
        "title": "Live input echo",
        "code": "const inp = document.querySelector(\"#name\");\nconst echo = document.querySelector(\"#echo\");\ninp.addEventListener(\"input\", (e) => {\n  echo.textContent = \"Namaste, \" + e.target.value;\n});",
        "lineByLine": [
          {
            "line": "inp.addEventListener(\"input\", (e) => {",
            "explanation": "Fires on every keystroke."
          },
          {
            "line": "e.target.value",
            "explanation": "Current text inside the box."
          },
          {
            "line": "echo.textContent = \"Namaste, \" + ...;",
            "explanation": "Page mirrors typing live."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Delegation on a list",
        "code": "const menu = document.querySelector(\"#menu\");\nmenu.addEventListener(\"click\", (e) => {\n  if (e.target.matches(\"button\")) {\n    console.log(\"ordered \" + e.target.dataset.dish);\n  }\n});",
        "lineByLine": [
          {
            "line": "menu.addEventListener(\"click\", (e) => {",
            "explanation": "ONE listener on the parent list."
          },
          {
            "line": "if (e.target.matches(\"button\")) {",
            "explanation": "Ignores clicks on gaps and padding."
          },
          {
            "line": "e.target.dataset.dish",
            "explanation": "Reads data-dish of the clicked button."
          }
        ]
      },
      {
        "title": "Checkbox total",
        "code": "const boxes = document.querySelectorAll(\".addon\");\nconst bill = document.querySelector(\"#bill\");\nfunction total() {\n  let s = 0;\n  boxes.forEach(b => { if (b.checked) s += Number(b.value); });\n  bill.textContent = \"Rs.\" + s;\n}\nboxes.forEach(b => b.addEventListener(\"change\", total));",
        "lineByLine": [
          {
            "line": "boxes.forEach(b => b.addEventListener(\"change\", total));",
            "explanation": "change fires when a tick flips."
          },
          {
            "line": "if (b.checked) s += Number(b.value);",
            "explanation": "Adds only ticked addon prices."
          },
          {
            "line": "bill.textContent = \"Rs.\" + s;",
            "explanation": "Bill updates on every toggle."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Debounced search",
        "code": "const box = document.querySelector(\"#q\");\nlet timer = null;\nbox.addEventListener(\"input\", (e) => {\n  clearTimeout(timer);\n  timer = setTimeout(() => console.log(\"search\", e.target.value), 300);\n});",
        "note": "Waits 300ms after the last keystroke - one request per pause, not per letter."
      },
      {
        "title": "Custom validation",
        "code": "const age = document.querySelector(\"#age\");\nage.addEventListener(\"input\", () => {\n  const ok = Number(age.value) >= 18;\n  age.setCustomValidity(ok ? \"\" : \"Must be 18+\");\n  age.reportValidity();\n});",
        "note": "Plugs your rule into browser error bubbles and blocks submit until valid."
      }
    ],
    "practice": [
      {
        "question": "Button adds input text to a list and clears the box.",
        "hint": "click + createElement + append + value=\"\".",
        "answer": "const b = document.querySelector(\"#add\");\nconst i = document.querySelector(\"#item\");\nconst u = document.querySelector(\"#list\");\nb.addEventListener(\"click\", () => {\n  if (!i.value.trim()) return;\n  const li = document.createElement(\"li\");\n  li.textContent = i.value;\n  u.append(li);\n  i.value = \"\";\n});"
      },
      {
        "question": "Show live character count (max 140) under a textarea.",
        "hint": "input event + length.",
        "answer": "const t = document.querySelector(\"#t\");\nconst c = document.querySelector(\"#c\");\nt.addEventListener(\"input\", () => {\n  c.textContent = t.value.length + \"/140\";\n});"
      },
      {
        "question": "Two buttons raise and lower a counter, never below 0.",
        "hint": "Guard with Math.max.",
        "answer": "let n = 0;\nconst o = document.querySelector(\"#n\");\ndocument.querySelector(\"#up\").addEventListener(\"click\", () => { n++; o.textContent = n; });\ndocument.querySelector(\"#dn\").addEventListener(\"click\", () => { n = Math.max(0, n - 1); o.textContent = n; });"
      },
      {
        "question": "Why does the form flash and reset? Fix it.",
        "hint": "Missing preventDefault on submit.",
        "answer": "form.addEventListener(\"submit\", (e) => {\n  e.preventDefault();\n});"
      }
    ],
    "interview": [
      {
        "question": "Bubbling vs capturing - explain with an example?",
        "answer": "Events travel down (capture) to the target then bubble up. A button click also triggers div handlers - use delegation deliberately, stopPropagation to contain."
      },
      {
        "question": "Why delegate instead of 100 listeners?",
        "answer": "One parent listener plus e.target uses less memory, survives re-renders, and covers rows added later. The pattern behind every dynamic table."
      },
      {
        "question": "input vs change - which when?",
        "answer": "input fires every keystroke (live preview); change fires on committed value (saving). Debounce input handlers that hit the network."
      },
      {
        "question": "What does preventDefault do - and not do?",
        "answer": "Stops the browser default (reload, link jump). It does NOT stop other handlers - that is stopPropagation."
      }
    ]
  },
  {
    "id": "javascript-10",
    "title": "Modules & tooling",
    "level": "Advanced",
    "definition": "Modules split code across files: export shares, import reuses. npm installs packages, package.json records them, and bundlers or Node run the result across environments.",
    "analogy": "Like a thali kitchen with stations: each cook (module) exports finished dishes, the pass (import) collects them onto one thali, and the recipe book (package.json) lists every ingredient supplier (npm) so any branch rebuilds the same meal.",
    "keyPoints": [
      "export function bill() shares; import { bill } from \"./bill.js\" reuses - names must match.",
      "export default one main thing per file; import Bill from \"./bill.js\" names it freely.",
      "Node needs \"type\": \"module\" for import syntax; browsers need <script type=\"module\">.",
      "npm install lodash fetches; package.json locks names, package-lock.json locks exact versions.",
      "node app.js runs server code; the same module shape works in browsers via bundlers.",
      "Never commit node_modules; npm ci rebuilds it exactly on any machine."
    ],
    "basicExamples": [
      {
        "title": "Named export and import",
        "code": "// bill.js\n// export function total(items) {\n//   return items.reduce((s, x) => s + x.price, 0);\n// }\n// app.js\n// import { total } from \"./bill.js\";\n// console.log(total([{price: 60}, {price: 30}]));",
        "lineByLine": [
          {
            "line": "export function total(items) {",
            "explanation": "Shares this function publicly."
          },
          {
            "line": "import { total } from \"./bill.js\";",
            "explanation": "Braces match the exported NAME."
          },
          {
            "line": "total([{price: 60}, {price: 30}])",
            "explanation": "Runs to 90."
          }
        ]
      },
      {
        "title": "Default export",
        "code": "// menu.js\n// export default [\"dosa\", \"idli\"];\n// app.js\n// import menu from \"./menu.js\";\n// console.log(menu.length);",
        "lineByLine": [
          {
            "line": "export default [\"dosa\", \"idli\"];",
            "explanation": "One main export per file."
          },
          {
            "line": "import menu from \"./menu.js\";",
            "explanation": "No braces; you choose the name."
          },
          {
            "line": "console.log(menu.length);",
            "explanation": "Prints 2."
          }
        ]
      },
      {
        "title": "npm script run",
        "code": "// package.json scripts:\n// { \"scripts\": { \"start\": \"node app.js\" } }\n// terminal: npm start",
        "lineByLine": [
          {
            "line": "\"start\": \"node app.js\"",
            "explanation": "Names the command once."
          },
          {
            "line": "npm start",
            "explanation": "Runs it anywhere - same on every machine."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Re-export barrel",
        "code": "// shop/index.js\n// export { total } from \"./bill.js\";\n// export { default as menu } from \"./menu.js\";\n// app.js: import { total, menu } from \"./shop/index.js\";",
        "lineByLine": [
          {
            "line": "export { total } from \"./bill.js\";",
            "explanation": "Forwards without importing locally."
          },
          {
            "line": "import { total, menu } from \"./shop/index.js\";",
            "explanation": "ONE import for the whole station."
          }
        ]
      },
      {
        "title": "JSON config import",
        "code": "// import data from \"./menu.json\" with { type: \"json\" };\n// console.log(data.items.length);",
        "lineByLine": [
          {
            "line": "with { type: \"json\" }",
            "explanation": "Tells the loader this is data, not code."
          },
          {
            "line": "data.items.length",
            "explanation": "Typed-ish access to the file content."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Dynamic import",
        "code": "async function load(lang) {\n  const m = await import(\"./lang/\" + lang + \".js\");\n  m.greet();\n}",
        "note": "Loads code ON DEMAND (per language, per route) - smaller first paint, pay-as-you-go bundles."
      },
      {
        "title": "Circular import trap",
        "code": "// a.js imports b.js; b.js imports a.js\n// Fix: move shared bits to c.js; both import c.",
        "note": "Circles give half-ready bindings. The fix is always a third shared module, never clever ordering."
      }
    ],
    "practice": [
      {
        "question": "Split total() into bill.js; import and print for two items.",
        "hint": "export plus named import.",
        "answer": "// bill.js: export function total(items) {\n//   return items.reduce((s, x) => s + x.price, 0);\n// }\n// app.js: import { total } from \"./bill.js\";\n// console.log(total([{price: 60}, {price: 30}]));"
      },
      {
        "question": "Default-export a GST helper (18%) and use it.",
        "hint": "export default plus free naming.",
        "answer": "// gst.js: export default function gst(x) { return x * 1.18; }\n// import gst from \"./gst.js\";\n// console.log(gst(100));"
      },
      {
        "question": "Add a \"dev\" script running node with --watch.",
        "hint": "scripts entry plus npm run.",
        "answer": "// \"scripts\": { \"dev\": \"node --watch app.js\" }\n// terminal: npm run dev"
      },
      {
        "question": "imports break with \"Cannot use import\"? Fix it.",
        "hint": "Missing module mode.",
        "answer": "// Node: add \"type\": \"module\" to package.json\n// Browser: <script type=\"module\" src=\"app.js\"></script>"
      }
    ],
    "interview": [
      {
        "question": "Named vs default exports - team rule?",
        "answer": "Named for libraries (many helpers, refactor-safe); default for one-main-thing components. Mixed files confuse - stay consistent per project."
      },
      {
        "question": "What do package.json and lock files each guarantee?",
        "answer": "package.json: INTENT (names and ranges). lock: EXACT bits (every transitive version). Commit both; install with npm ci in CI."
      },
      {
        "question": "Why do circular imports break?",
        "answer": "Each module executes once on first import; the circle re-enters half-ready bindings (undefined functions). Extract shared code to a third module."
      },
      {
        "question": "ESM vs CommonJS - practical differences?",
        "answer": "ESM: static import/export, top-level await, browser-native. CJS: require/module.exports, dynamic, Node-legacy. Interop works but defaults and timing bite."
      }
    ]
  },
  {
    "id": "javascript-11",
    "title": "Async: callbacks to promises to await",
    "level": "Advanced",
    "definition": "Async code waits without blocking: callbacks pass a done-function, promises hold future values with .then/.catch chains, async/await pauses inside an async function until the promise settles. The event loop keeps everything else running meanwhile.",
    "analogy": "Like ordering at a busy dosa counter: callbacks are the boy shouting your name when ready; promises are the token slip you hold; async/await is sitting with the token - you pause YOUR journey, but the kitchen keeps cooking for everyone else.",
    "keyPoints": [
      "Callbacks nest into callback hell past 2 levels - promises flatten them into chains.",
      "A promise is pending, then fulfilled or rejected exactly once; .then handles value, .catch errors.",
      "async fn always returns a promise; await pauses THAT function until the promise settles.",
      "Promise.all runs tasks together and fails fast; allSettled reports every outcome; race takes first.",
      "await in for..of runs steps in order; Promise.all maps them in parallel - pick deliberately.",
      "Unhandled rejections crash Node - always end chains with .catch or try/catch awaits."
    ],
    "basicExamples": [
      {
        "title": "Delayed promise",
        "code": "function wait(ms) {\n  return new Promise(done => setTimeout(done, ms));\n}\nwait(300).then(() => console.log(\"dosa ready\"));",
        "lineByLine": [
          {
            "line": "function wait(ms) {",
            "explanation": "Wraps setTimeout in a promise."
          },
          {
            "line": "return new Promise(done => ...)",
            "explanation": "done fulfils the promise after ms."
          },
          {
            "line": "wait(300).then(...)",
            "explanation": ".then runs when it settles."
          }
        ]
      },
      {
        "title": "async await order",
        "code": "function wait(ms) {\n  return new Promise(r => setTimeout(r, ms));\n}\nasync function serve() {\n  console.log(\"order in\");\n  await wait(200);\n  console.log(\"served\");\n}\nserve();",
        "lineByLine": [
          {
            "line": "async function serve() {",
            "explanation": "async enables await inside."
          },
          {
            "line": "await wait(200);",
            "explanation": "Pauses serve, loop stays free."
          },
          {
            "line": "console.log(\"served\")",
            "explanation": "Runs after the wait, order kept."
          }
        ]
      },
      {
        "title": "catch rejection",
        "code": "function fail() {\n  return Promise.reject(new Error(\"burnt\"));\n}\nfail().catch(e => console.log(\"caught: \" + e.message));",
        "lineByLine": [
          {
            "line": "Promise.reject(...)",
            "explanation": "A promise that fails at once."
          },
          {
            "line": ".catch(e => ...)",
            "explanation": "Catches it like try/catch."
          },
          {
            "line": "Logs \"caught: burnt\".",
            "explanation": "Error message surfaces cleanly."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Promise.all parallel",
        "code": "const jobs = [1, 2, 3].map(n => Promise.resolve(n * 10));\nPromise.all(jobs).then(v => console.log(v));",
        "lineByLine": [
          {
            "line": ".map(n => Promise.resolve(...))",
            "explanation": "Three promises made together."
          },
          {
            "line": "Promise.all(jobs)",
            "explanation": "Waits for all; fails fast on reject."
          },
          {
            "line": ".then(v => ...)",
            "explanation": "Prints [10, 20, 30]."
          }
        ]
      },
      {
        "title": "try catch around await",
        "code": "async function order(n) {\n  try {\n    if (n <= 0) throw new Error(\"bad qty\");\n    return \"token \" + n;\n  } catch (e) {\n    return \"sorry: \" + e.message;\n  }\n}\norder(0).then(console.log);",
        "lineByLine": [
          {
            "line": "if (n <= 0) throw ...",
            "explanation": "Failure becomes rejection."
          },
          {
            "line": "catch (e) {",
            "explanation": "Catches throws and rejected awaits."
          },
          {
            "line": "order(0).then(console.log)",
            "explanation": "Prints sorry: bad qty."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Sequential vs parallel",
        "code": "async function seq(ids) {\n  const out = [];\n  for (const id of ids) out.push(await get(id));\n  return out;\n}\nasync function par(ids) {\n  return Promise.all(ids.map(get));\n}",
        "note": "for..of awaits in order (slow, rate-limit safe); Promise.all fires together (fast, hammers server)."
      },
      {
        "title": "Timeout race",
        "code": "function withTimeout(p, ms) {\n  const t = new Promise((_, rej) => setTimeout(() => rej(new Error(\"timeout\")), ms));\n  return Promise.race([p, t]);\n}",
        "note": "race takes the first settler - a classic timeout wrapper for slow APIs."
      }
    ],
    "practice": [
      {
        "question": "Write wait(ms); log hi after 500ms with await.",
        "hint": "async wrapper plus await.",
        "answer": "function wait(ms) {\n  return new Promise(r => setTimeout(r, ms));\n}\n(async () => { await wait(500); console.log(\"hi\"); })();"
      },
      {
        "question": "Run three waits (100/200/300ms) in parallel.",
        "hint": "Promise.all over mapped promises.",
        "answer": "function wait(ms) {\n  return new Promise(r => setTimeout(() => r(ms), ms));\n}\nPromise.all([100, 200, 300].map(wait)).then(console.log);"
      },
      {
        "question": "Handle a rejected promise with log plus fallback.",
        "hint": ".catch returns the fallback.",
        "answer": "Promise.reject(new Error(\"x\")).catch(() => \"fallback\").then(console.log);"
      },
      {
        "question": "Why does forEach with async misbehave? Fix it.",
        "hint": "forEach ignores promises; use for..of.",
        "answer": "async function run(ids) {\n  for (const id of ids) await get(id);\n}"
      }
    ],
    "interview": [
      {
        "question": "What does the event loop do with await?",
        "answer": "await parks the async function and returns to the loop; when the promise settles, the function resumes from a microtask. Nothing blocks meanwhile."
      },
      {
        "question": "Promise.all vs allSettled vs race?",
        "answer": "all: all values, fails fast. allSettled: every outcome, never rejects. race: first settler wins. any: first fulfiller wins."
      },
      {
        "question": "Why does async forEach drop work?",
        "answer": "forEach fires callbacks and ignores returned promises - the loop ends before work finishes. Use for..of with await or Promise.all(map)."
      },
      {
        "question": "Unhandled rejection - what happens?",
        "answer": "Browser warns, Node crashes modern versions. End chains with .catch or wrap awaits in try/catch."
      }
    ]
  },
  {
    "id": "javascript-12",
    "title": "DOM, events and mini project",
    "level": "Advanced",
    "definition": "The DOM is the page as objects: querySelector finds elements, addEventListener reacts to clicks and typing, and small projects combine state plus rendering plus persistence into a working app.",
    "analogy": "Like running a kirana shop board: querySelector finds the price slate, events are the bell when a customer enters, render() rewrites the slate from stock (state), and localStorage is the ledger that remembers stock after closing.",
    "keyPoints": [
      "querySelector picks one element, querySelectorAll picks many - both take CSS selectors.",
      "addEventListener(click, fn) reacts; event.target tells which child was clicked (delegation).",
      "Keep state (array) separate from rendering - update data, then re-render the list.",
      "textContent is safe; innerHTML with user data invites XSS - sanitise first.",
      "Persist with localStorage JSON stringify/parse so the list survives refresh.",
      "Mini project: bill splitter - inputs, live total, per-person share, saved history."
    ],
    "basicExamples": [
      {
        "title": "Find and change text",
        "code": "const h = document.querySelector(\"h1\");\nh.textContent = \"Namaste, CodeAtlas!\";\nconsole.log(h.textContent);",
        "lineByLine": [
          {
            "line": "document.querySelector(\"h1\")",
            "explanation": "Finds the first h1 on the page."
          },
          {
            "line": "h.textContent = ...",
            "explanation": "Replaces its text safely."
          },
          {
            "line": "console.log(h.textContent)",
            "explanation": "Confirms the new text."
          }
        ]
      },
      {
        "title": "Click counter",
        "code": "let n = 0;\nconst btn = document.querySelector(\"#tap\");\nbtn.addEventListener(\"click\", () => {\n  n += 1;\n  btn.textContent = \"taps: \" + n;\n});",
        "lineByLine": [
          {
            "line": "let n = 0;",
            "explanation": "State lives outside the handler."
          },
          {
            "line": "addEventListener(\"click\", ...)",
            "explanation": "Runs the arrow on every click."
          },
          {
            "line": "btn.textContent = ...",
            "explanation": "Re-renders from state."
          }
        ]
      },
      {
        "title": "Build a list item",
        "code": "const ul = document.querySelector(\"ul\");\nconst li = document.createElement(\"li\");\nli.textContent = \"masala dosa - Rs.60\";\nul.appendChild(li);",
        "lineByLine": [
          {
            "line": "document.createElement(\"li\")",
            "explanation": "Makes a fresh element."
          },
          {
            "line": "li.textContent = ...",
            "explanation": "Fills it with safe text."
          },
          {
            "line": "ul.appendChild(li)",
            "explanation": "Attaches it to the page."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Input drives output",
        "code": "const inp = document.querySelector(\"#qty\");\nconst out = document.querySelector(\"#bill\");\ninp.addEventListener(\"input\", () => {\n  out.textContent = \"Rs.\" + (Number(inp.value || 0) * 60);\n});",
        "lineByLine": [
          {
            "line": "addEventListener(\"input\", ...)",
            "explanation": "Fires on every keystroke."
          },
          {
            "line": "Number(inp.value || 0)",
            "explanation": "Empty becomes 0 safely."
          },
          {
            "line": "out.textContent = ...",
            "explanation": "Live bill updates."
          }
        ]
      },
      {
        "title": "Delegated delete",
        "code": "const ul = document.querySelector(\"ul\");\nul.addEventListener(\"click\", e => {\n  if (e.target.matches(\"button.rm\")) e.target.closest(\"li\").remove();\n});",
        "lineByLine": [
          {
            "line": "e.target.matches(\"button.rm\")",
            "explanation": "Only delete buttons react."
          },
          {
            "line": "e.target.closest(\"li\")",
            "explanation": "Finds the row to remove."
          },
          {
            "line": "One listener covers all rows.",
            "explanation": "Delegation scales to dynamic lists."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "State plus render pattern",
        "code": "const items = [];\nfunction render() {\n  const ul = document.querySelector(\"ul\");\n  ul.innerHTML = \"\";\n  items.forEach((t, i) => {\n    const li = document.createElement(\"li\");\n    li.textContent = (i + 1) + \". \" + t;\n    ul.appendChild(li);\n  });\n}",
        "note": "Single render() from state - every change calls it; no scattered DOM edits."
      },
      {
        "title": "Persist to localStorage",
        "code": "function save(items) {\n  localStorage.setItem(\"bill\", JSON.stringify(items));\n}\nfunction load() {\n  try { return JSON.parse(localStorage.getItem(\"bill\")) || []; }\n  catch { return []; }\n}",
        "note": "JSON round-trip persists state; try/catch survives corrupted saved data."
      }
    ],
    "practice": [
      {
        "question": "Button adds input value to a list; input clears.",
        "hint": "Listener plus createElement plus reset.",
        "answer": "const b = document.querySelector(\"#add\");\nconst inp = document.querySelector(\"#item\");\nb.addEventListener(\"click\", () => {\n  if (!inp.value.trim()) return;\n  const li = document.createElement(\"li\");\n  li.textContent = inp.value.trim();\n  document.querySelector(\"ul\").appendChild(li);\n  inp.value = \"\";\n});"
      },
      {
        "question": "Show live character count under a textarea.",
        "hint": "input event plus length.",
        "answer": "const t = document.querySelector(\"textarea\");\nconst c = document.querySelector(\"#count\");\nt.addEventListener(\"input\", () => { c.textContent = t.value.length + \" chars\"; });"
      },
      {
        "question": "Toggle dark class on body with one button.",
        "hint": "classList.toggle.",
        "answer": "document.querySelector(\"#mode\").addEventListener(\"click\", () => {\n  document.body.classList.toggle(\"dark\");\n});"
      },
      {
        "question": "Why is innerHTML with user text dangerous? Fix it.",
        "hint": "XSS injection; use textContent.",
        "answer": "li.textContent = userText; // safe"
      }
    ],
    "interview": [
      {
        "question": "textContent vs innerHTML vs innerText?",
        "answer": "textContent: raw text, fast, safe. innerHTML: parses HTML - XSS-prone. innerText: rendered text, CSS-aware, slow. Default to textContent for user data."
      },
      {
        "question": "What is event delegation and why use it?",
        "answer": "One listener on a parent handles children via event.target. Covers dynamic rows, less memory, simpler cleanup."
      },
      {
        "question": "How do you keep DOM code maintainable?",
        "answer": "State object plus single render(), delegated events, small named handlers - the mini-framework pattern."
      },
      {
        "question": "localStorage limits and gotchas?",
        "answer": "About 5MB, strings only (JSON it), synchronous, no expiry - wrap in try/catch for private-mode failures."
      }
    ]
  }
];
