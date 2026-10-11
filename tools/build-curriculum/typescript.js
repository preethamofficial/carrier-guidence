module.exports = [
  {
    "id": "typescript-1",
    "title": "Setup, compiler & first typed program",
    "level": "Beginner",
    "definition": "TypeScript (TS) is JavaScript plus static types. You write .ts files, the tsc compiler checks types and converts (transpiles) them to plain .js that runs anywhere JS runs.",
    "analogy": "Like writing an address with a PIN code checker: JS delivers the letter anyway, TS verifies the PIN first so wrong addresses never leave your desk.",
    "keyPoints": [
      "Install once: `npm install -g typescript`; check with `tsc --version`; start a project with `tsc --init`.",
      "Compile with `tsc file.ts` (produces file.js), then run with `node file.js`.",
      "Annotate with `: string`, `: number`, `: boolean`; the compiler rejects mismatches before runtime.",
      "TS types vanish at runtime — they are a development-time safety net, not runtime checks.",
      "`tsconfig.json` controls strictness; `\"strict\": true` is recommended for real projects.",
      "Any valid JS is valid TS, so you can migrate file by file."
    ],
    "basicExamples": [
      {
        "title": "Your first typed program",
        "code": "let city: string = \"Bengaluru\";\nlet year: number = 2026;\nconsole.log(city, year);",
        "lineByLine": [
          {
            "line": "let city: string = \"Bengaluru\";",
            "explanation": "Declares city must always hold a string."
          },
          {
            "line": "let year: number = 2026;",
            "explanation": "Declares year must always hold a number."
          },
          {
            "line": "console.log(city, year);",
            "explanation": "Prints both values after type checking passes."
          }
        ]
      },
      {
        "title": "Typed function",
        "code": "function greet(name: string): string {\n  return \"Namaste, \" + name + \"!\";\n}\nconsole.log(greet(\"Asha\"));",
        "lineByLine": [
          {
            "line": "function greet(name: string): string {",
            "explanation": "name must be a string; the function must return a string."
          },
          {
            "line": "return \"Namaste, \" + name + \"!\";",
            "explanation": "Builds and returns the greeting."
          },
          {
            "line": "console.log(greet(\"Asha\"));",
            "explanation": "Calls with a valid string — compiles cleanly."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Catching errors early",
        "code": "let marks: number = 92;\n// marks = \"ninety\"; // ERROR: Type 'string' is not assignable to type 'number'\nmarks = 95;\nconsole.log(marks);",
        "lineByLine": [
          {
            "line": "let marks: number = 92;",
            "explanation": "Locks marks to numbers."
          },
          {
            "line": "// marks = \"ninety\"; // ERROR...",
            "explanation": "Uncommenting this line makes tsc fail before anything runs."
          },
          {
            "line": "marks = 95;",
            "explanation": "A number assignment is accepted."
          }
        ]
      },
      {
        "title": "Type inference",
        "code": "let country = \"India\"; // inferred: string\n// country = 91; // ERROR: inferred type blocks this\nconsole.log(country.toUpperCase());",
        "lineByLine": [
          {
            "line": "let country = \"India\"; // inferred: string",
            "explanation": "No annotation needed — TS infers string from the value."
          },
          {
            "line": "console.log(country.toUpperCase());",
            "explanation": "The editor even autocompletes string methods safely."
          }
        ]
      },
      {
        "title": "Typed variables and const assertions",
        "code": "let age: number = 21;\nconst name: string = \"Asha\";\nconst DIRS = [\"N\", \"S\"] as const;\ntype Dir = typeof DIRS[number];\nlet d: Dir = \"N\";\nconsole.log(age, name, d);",
        "lineByLine": [
          {
            "line": "let age: number = 21;",
            "explanation": "Explicit type on a variable - reassigning text now errors."
          },
          {
            "line": "const name: string = \"Asha\";",
            "explanation": "const with a type: constant AND typed."
          },
          {
            "line": "const DIRS = [\"N\", \"S\"] as const;",
            "explanation": "as const freezes the literal values, not just string[]."
          },
          {
            "line": "type Dir = typeof DIRS[number];",
            "explanation": "Derives the union \"N\" | \"S\" from the array."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Strict null handling",
        "code": "function welcome(name: string | null): string {\n  if (name === null) return \"Namaste, guest!\";\n  return \"Namaste, \" + name.trim() + \"!\";\n}\nconsole.log(welcome(null));",
        "note": "With strict mode, null is not a string — union types force you to handle the empty case."
      },
      {
        "title": "Minimal tsconfig for projects",
        "code": "{\n  \"compilerOptions\": {\n    \"target\": \"ES2020\",\n    \"strict\": true,\n    \"outDir\": \"dist\",\n    \"rootDir\": \"src\"\n  }\n}",
        "note": "Separate src/ and dist/, target modern JS, and keep strict on from day one."
      }
    ],
    "practice": [
      {
        "question": "Declare a typed age variable and a function isAdult(age: number): boolean.",
        "hint": "Annotate parameter and return type.",
        "answer": "let age: number = 19;\nfunction isAdult(a: number): boolean {\n  return a >= 18;\n}\nconsole.log(isAdult(age));"
      },
      {
        "question": "What error does tsc give for: let x: number = \"hi\"?",
        "hint": "Type string is not assignable to number.",
        "answer": "let x: number = \"hi\"; // error TS2322: Type 'string' is not assignable to type 'number'."
      },
      {
        "question": "Write a function add(a: number, b: number): number.",
        "hint": "Both params and return annotated.",
        "answer": "function add(a: number, b: number): number {\n  return a + b;\n}\nconsole.log(add(3, 4));"
      },
      {
        "question": "Convert a JS file to TS in the smallest step.",
        "hint": "Rename .js to .ts — it still compiles, then add types gradually.",
        "answer": "// app.js -> app.ts: compiles as-is; add `: string` annotations one variable at a time."
      }
    ],
    "interview": [
      {
        "question": "What is TypeScript in one sentence, and where do types live?",
        "answer": "A statically-typed superset of JS that compiles to plain JS; types exist only at compile time and are erased in the emitted JS."
      },
      {
        "question": "Why does `let x: number = \"hi\"` fail?",
        "answer": "The compiler checks assignability: a string value is not assignable to a number-typed variable, so tsc reports error TS2322 before any code runs."
      },
      {
        "question": "What does strict mode add?",
        "answer": "strictNullChecks (null/undefined are distinct types), noImplicitAny (every value needs a known type), plus checks on this, function types and property initialisation."
      },
      {
        "question": "If types are erased, how do you validate runtime data (e.g. API responses)?",
        "answer": "Use runtime validators (Zod, io-ts) or manual guards — the compiler cannot check data that arrives after compilation."
      }
    ]
  },
  {
    "id": "typescript-2",
    "title": "Core types: primitives, arrays & tuples",
    "level": "Beginner",
    "definition": "Core TS types: string, number, boolean, arrays (number[]), tuples ([string, number]), literal unions (\"red\" | \"blue\"), and enum-like unions. TS infers types from values, and widens/narrows them as code flows.",
    "analogy": "Like railway ticket categories — Sleeper, 3AC, 2AC: each berth has a fixed category printed at booking (declaration), and the TTE (compiler) checks your ticket matches your coach.",
    "keyPoints": [
      "string, number, boolean are the primitives; arrays as string[] or Array<string>.",
      "Tuples fix length+order: let p: [string, number] = [\"Asha\", 92].",
      "Literal types restrict to exact values: let dir: \"L\" | \"R\" = \"L\"; wrong strings fail compilation.",
      "Inference: let city = \"X\" gives string automatically; const gives literal types.",
      "any disables checking (avoid); unknown forces a check before use (prefer).",
      "Type assertions (x as string) tell the compiler what you know — they add no runtime check."
    ],
    "basicExamples": [
      {
        "title": "Arrays and tuples",
        "code": "let marks: number[,\nex(\"Type-safe conversion\", \"let raw: string = \"92\";\nlet marks: number = Number(raw);\nconsole.log(marks + 8);\", [[\"let raw: string = \"92\";\", \"Text arriving from a form or file.\"], [\"let marks: number = Number(raw);\", \"Convert first, then annotate the number.\"], [\"console.log(marks + 8);\", \"Real addition instead of \"928\".\"]])\n] = [92, 78, 85];\nlet student: [string, number] = [\"Asha\", 92];\nconsole.log(marks.length, student[0]);",
        "lineByLine": [
          {
            "line": "let marks: number[] = [92, 78, 85];",
            "explanation": "An array holding only numbers."
          },
          {
            "line": "let student: [string, number] = [\"Asha\", 92];",
            "explanation": "Tuple: exactly a string then a number."
          },
          {
            "line": "console.log(marks.length, student[0]);",
            "explanation": "Prints 3 and Asha."
          }
        ]
      },
      {
        "title": "Literal unions",
        "code": "let grade: \"A\" | \"B\" | \"C\" = \"A\";\ngrade = \"B\";\n// grade = \"Z\"; // ERROR: not in the union\nconsole.log(grade);",
        "lineByLine": [
          {
            "line": "let grade: \"A\" | \"B\" | \"C\" = \"A\";",
            "explanation": "grade can only ever be A, B or C."
          },
          {
            "line": "grade = \"B\";",
            "explanation": "Allowed member — compiles."
          },
          {
            "line": "// grade = \"Z\"; // ERROR...",
            "explanation": "Any other string is rejected before running."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "any vs unknown",
        "code": "let loose: any = \"hi\";\nloose = 5; // no error — checking off\nlet strict: unknown = \"hi\";\n// strict.toUpperCase(); // ERROR: must narrow first\nif (typeof strict === \"string\") {\n  console.log(strict.toUpperCase());\n}",
        "lineByLine": [
          {
            "line": "let loose: any = \"hi\";",
            "explanation": "any opts out of type checking entirely."
          },
          {
            "line": "let strict: unknown = \"hi\";",
            "explanation": "unknown holds anything but forces a check."
          },
          {
            "line": "if (typeof strict === \"string\") {",
            "explanation": "Narrowing unlocks string methods safely."
          }
        ]
      },
      {
        "title": "Inference and widening",
        "code": "let city = \"Bengaluru\"; // string\nconst year = 2026;        // literal 2026\nlet tag = \"veg\";          // widened to string\nconsole.log(city, year, tag);",
        "lineByLine": [
          {
            "line": "let city = \"Bengaluru\"; // string",
            "explanation": "let widens the literal to string."
          },
          {
            "line": "const year = 2026; // literal 2026",
            "explanation": "const keeps the exact literal type."
          },
          {
            "line": "let tag = \"veg\";",
            "explanation": "Reassignable, so the type widens to string."
          }
        ]
      },
      {
        "title": "readonly arrays and enums",
        "code": "const nums: readonly number[] = [1, 2, 3];\n// nums.push(4); // ERROR: readonly\nenum Role { Admin, Editor, Viewer }\nlet r: Role = Role.Editor;\nconsole.log(r, nums.length);",
        "lineByLine": [
          {
            "line": "readonly number[]",
            "explanation": "Promises the array is never mutated - push/assignment errors."
          },
          {
            "line": "enum Role { Admin, Editor, Viewer }",
            "explanation": "Numeric enum: Admin=0, Editor=1, Viewer=2."
          },
          {
            "line": "let r: Role = Role.Editor;",
            "explanation": "Store a named member, not a magic number."
          },
          {
            "line": "console.log(r)",
            "explanation": "Prints 1 (the enum value); readable source, numeric output."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Readonly arrays and tuples",
        "code": "const marks: readonly number[] = [92, 78];\n// marks.push(90); // ERROR: readonly\nconst point: readonly [number, number] = [12, 5];\nconsole.log(marks.length, point[0]);",
        "note": "readonly arrays/tuples prevent accidental mutation — use for config and shared constants."
      },
      {
        "title": "Safe assertion from unknown JSON",
        "code": "function asName(data: unknown): string {\n  if (typeof data === \"object\" && data !== null && \"name\" in data) {\n    const n = (data as { name: unknown }).name;\n    if (typeof n === \"string\") return n;\n  }\n  throw new Error(\"bad payload\");\n}",
        "note": "Assertions never validate — narrow first with typeof/in, then assert the shape."
      }
    ],
    "practice": [
      {
        "question": "Type an array of city names and push one more.",
        "hint": "string[] with .push.",
        "answer": "let cities: string[] = [\"Mumbai\"];\ncities.push(\"Pune\");\nconsole.log(cities);"
      },
      {
        "question": "Model a [name, age] tuple and print both.",
        "hint": "Tuple [string, number].",
        "answer": "let s: [string, number] = [\"Ravi\", 20];\nconsole.log(s[0], s[1]);"
      },
      {
        "question": "Restrict a variable to \"veg\" | \"non-veg\".",
        "hint": "Literal union annotation.",
        "answer": "let diet: \"veg\" | \"non-veg\" = \"veg\";\nconsole.log(diet);"
      },
      {
        "question": "Fix: const x = \"hi\"; x = \"bye\" fails — explain.",
        "hint": "const bindings cannot reassign; use let.",
        "answer": "let x = \"hi\";\nx = \"bye\";"
      }
    ],
    "interview": [
      {
        "question": "What does let city = \"X\" infer, and how does const differ?",
        "answer": "let infers string (widened, reassignable); const infers the literal \"X\". Widening applies to mutable bindings so later assignments of other strings stay legal."
      },
      {
        "question": "any vs unknown — when is each acceptable?",
        "answer": "unknown by default for untrusted data (forces narrowing); any only at system boundaries with a comment, or never — eslint bans explicit any."
      },
      {
        "question": "What is a tuple and when do you use one?",
        "answer": "Fixed-length, ordered, heterogeneously-typed array ([string, number]). Use for pairs/coordinates/entries where position carries meaning; objects win for 3+ fields."
      },
      {
        "question": "Do assertions like `x as string` check anything at runtime?",
        "answer": "No — purely compile-time. If x is actually a number, the lie compiles and fails at runtime. Prefer narrowing or validators (Zod) for runtime data."
      }
    ]
  },
  {
    "id": "typescript-3",
    "title": "Unions & type narrowing",
    "level": "Beginner",
    "definition": "Union types (string | number) say a value may be one of several types. Narrowing — typeof, instanceof, in, truthiness checks — shrinks the union inside each branch so the compiler allows only safe operations.",
    "analogy": "Like a railway platform announcement for \"train OR bus passengers\": the union boards everyone together, then narrowing checks tickets at each gate so metro riders take the metro stairs and bus riders take the bus exit.",
    "keyPoints": [
      "Write unions with |: function printId(id: string | number) accepts either, rejects booleans.",
      "Narrow with typeof x === \"string\" — inside the branch id is string, outside still the union.",
      "Truthiness narrows too: if (name) removes \"\" | null | undefined from the type.",
      "The in operator narrows object unions: if (\"swim\" in pet) picks the fish branch.",
      "Literal unions (\"up\" | \"down\") plus exhaustive checks catch unhandled cases at compile time.",
      "Optional chaining (?.) and ?? handle possibly-missing values without throwing."
    ],
    "basicExamples": [
      {
        "title": "Union parameter",
        "code": "function printId(id: string | number): void {\n  console.log(\"ID: \" + id);\n}\nprintId(\"A102\");\nprintId(102);\n// printId(true); // ERROR: boolean not allowed\nconsole.log(\"done\");",
        "lineByLine": [
          {
            "line": "function printId(id: string | number): void {",
            "explanation": "id may be a string or a number — nothing else."
          },
          {
            "line": "printId(\"A102\");",
            "explanation": "String member: compiles."
          },
          {
            "line": "// printId(true); // ERROR...",
            "explanation": "Boolean is outside the union: rejected."
          }
        ]
      },
      {
        "title": "typeof narrowing",
        "code": "function welcome(name: string | null): string {\n  if (name === null) {\n    return \"Namaste, guest!\";\n  }\n  return \"Namaste, \" + name.toUpperCase() + \"!\";\n}\nconsole.log(welcome(null));",
        "lineByLine": [
          {
            "line": "if (name === null) {",
            "explanation": "Handles the null member first."
          },
          {
            "line": "return \"Namaste, guest!\";",
            "explanation": "Early return for the empty case."
          },
          {
            "line": "name.toUpperCase()",
            "explanation": "After the check, name is narrowed to string — safe."
          }
        ]
      },
      {
        "title": "Optional chaining",
        "code": "type User = { name: string; address?: { city: string } };\nconst u: User = { name: \"Asha\" };\nconsole.log(u.address?.city ?? \"city unknown\");",
        "lineByLine": [
          {
            "line": "address?: { city: string }",
            "explanation": "? marks the property optional (may be missing)."
          },
          {
            "line": "u.address?.city",
            "explanation": "?. stops and yields undefined instead of throwing."
          },
          {
            "line": "?? \"city unknown\"",
            "explanation": "Falls back only for null/undefined."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Narrowing with in",
        "code": "type Fish = { swim: boolean };\ntype Bird = { fly: boolean };\nfunction move(pet: Fish | Bird): string {\n  if (\"swim\" in pet) return \"swims\";\n  return \"flies\";\n}\nconsole.log(move({ fly: true }));",
        "lineByLine": [
          {
            "line": "type Fish = { swim: boolean };",
            "explanation": "Two shapes sharing no property."
          },
          {
            "line": "if (\"swim\" in pet)",
            "explanation": "in narrows pet to Fish inside the branch."
          },
          {
            "line": "return \"flies\";",
            "explanation": "Elsewhere pet must be Bird."
          }
        ]
      },
      {
        "title": "Truthy narrowing",
        "code": "function shout(s: string | undefined): string {\n  if (!s) return \"(silent)\";\n  return s.toUpperCase() + \"!\";\n}\nconsole.log(shout(undefined));",
        "lineByLine": [
          {
            "line": "if (!s) return \"(silent)\";",
            "explanation": "Filters out undefined and \"\" at once."
          },
          {
            "line": "s.toUpperCase()",
            "explanation": "Surviving values are narrowed to string."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Discriminated unions",
        "code": "type Order =\n  | { kind: \"veg\"; dish: string }\n  | { kind: \"bill\"; total: number };\nfunction handle(o: Order): string {\n  if (o.kind === \"veg\") return \"Cooking \" + o.dish;\n  return \"Bill: Rs.\" + o.total;\n}\nconsole.log(handle({ kind: \"bill\", total: 240 }));",
        "note": "A shared literal field (kind) lets TS narrow whole object shapes — the standard Redux/API pattern."
      },
      {
        "title": "Exhaustive check with never",
        "code": "type Coin = \"H\" | \"T\";\nfunction flip(c: Coin): string {\n  if (c === \"H\") return \"heads\";\n  if (c === \"T\") return \"tails\";\n  const _exhaustive: never = c;\n  return _exhaustive;\n}",
        "note": "Assigning the leftover to never errors the moment a new union member is added but unhandled."
      }
    ],
    "practice": [
      {
        "question": "Write format(x: string | number): string — quote strings, fix numbers to 2 decimals.",
        "hint": "typeof branch each way.",
        "answer": "function format(x: string | number): string {\n  if (typeof x === \"string\") return `\"` + x + `\"`;\n  return x.toFixed(2);\n}\nconsole.log(format(3.14159));"
      },
      {
        "question": "Type role as admin | editor | viewer; reject anything else.",
        "hint": "Literal union annotation.",
        "answer": "let role: \"admin\" | \"editor\" | \"viewer\" = \"editor\";\nconsole.log(role);"
      },
      {
        "question": "Narrow unknown input to a number, else return 0.",
        "hint": "typeof check first.",
        "answer": "function num(x: unknown): number {\n  return typeof x === \"number\" ? x : 0;\n}\nconsole.log(num(\"5\"));"
      },
      {
        "question": "Safely read user.profile?.email ?? \"no-email\".",
        "hint": "Chain ?. with ?? fallback.",
        "answer": "type U = { profile?: { email: string } };\nconst u: U = {};\nconsole.log(u.profile?.email ?? \"no-email\");"
      }
    ],
    "interview": [
      {
        "question": "What is narrowing and why does TS need it?",
        "answer": "Narrowing shrinks a union type inside a branch via checks (typeof, in, ===). Without it the compiler only allows operations valid for ALL members, so id.toUpperCase() on string | number is correctly rejected."
      },
      {
        "question": "in vs instanceof vs typeof — when each?",
        "answer": "typeof: primitives. instanceof: class instances (Date, Error). in: object shapes by property. Truthiness: filtering null/undefined/empty."
      },
      {
        "question": "What is a discriminated union?",
        "answer": "An object union sharing one literal field (kind/status) whose value identifies the shape. Switching on it narrows precisely — the backbone of typed API responses and state machines."
      },
      {
        "question": "?. vs && chains, and ?? vs ||?",
        "answer": "?. short-circuits null/undefined access; && also skips other falsies. ?? falls back only on null/undefined; || on any falsy - so 0 and \"\" survive ??."
      }
    ]
  },
  {
    "id": "typescript-4",
    "title": "Functions: signatures & overloads",
    "level": "Beginner",
    "definition": "TS functions carry type signatures: typed parameters and return types checked at compile time. Optional (?) and default parameters handle missing args; overloads describe one function with several call shapes.",
    "analogy": "Like a railway booking counter with a rate card on the wall: the signature lists exactly which tickets (parameters) the clerk accepts and what receipt (return type) you get - wrong form, no ticket, before you even queue.",
    "keyPoints": [
      "Annotate both ends: function add(a: number, b: number): number - compiler rejects add(\"x\", 1).",
      "Optional params need ?: function greet(name?: string) - inside, name is string | undefined.",
      "Defaults fill gaps: function fee(age: number = 10): number uses 10 when omitted.",
      "void means \"returns nothing useful\"; never means \"never returns\" (throws or loops forever).",
      "Overloads list each accepted call shape above one implementation signature.",
      "Arrow types look like (a: number) => number - the same shape function types use everywhere."
    ],
    "basicExamples": [
      {
        "title": "Typed function",
        "code": "function add(a: number, b: number): number {\n  return a + b;\n}\nconsole.log(add(4, 6));\n// add(\"4\", 6); // ERROR at compile time",
        "lineByLine": [
          {
            "line": "function add(a: number, b: number): number {",
            "explanation": "Both parameters and the result are typed."
          },
          {
            "line": "return a + b;",
            "explanation": "Must produce a number - enforced."
          },
          {
            "line": "// add(\"4\", 6); // ERROR...",
            "explanation": "Wrong types never reach runtime."
          }
        ]
      },
      {
        "title": "Optional and default",
        "code": "function greet(name?: string): string {\n  return \"Namaste, \" + (name ?? \"guest\") + \"!\";\n}\nconsole.log(greet());",
        "lineByLine": [
          {
            "line": "function greet(name?: string): string {",
            "explanation": "? lets callers omit name."
          },
          {
            "line": "(name ?? \"guest\")",
            "explanation": "?? fills null/undefined with guest."
          },
          {
            "line": "console.log(greet());",
            "explanation": "Prints Namaste, guest!."
          }
        ]
      },
      {
        "title": "Arrow with types",
        "code": "const isEven = (n: number): boolean => n % 2 === 0;\nconsole.log(isEven(8));",
        "lineByLine": [
          {
            "line": "const isEven = (n: number): boolean => ...",
            "explanation": "Arrow carrying full type info."
          },
          {
            "line": "console.log(isEven(8));",
            "explanation": "Prints true."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Union-accepting function",
        "code": "function format(x: string | number): string {\n  if (typeof x === \"string\") return x.toUpperCase();\n  return \"Rs.\" + x.toFixed(2);\n}\nconsole.log(format(99.5));",
        "lineByLine": [
          {
            "line": "function format(x: string | number): string {",
            "explanation": "Accepts either type, always returns string."
          },
          {
            "line": "if (typeof x === \"string\") ...",
            "explanation": "Narrows inside each branch."
          },
          {
            "line": "console.log(format(99.5));",
            "explanation": "Prints Rs.99.50."
          }
        ]
      },
      {
        "title": "Rest parameters typed",
        "code": "function total(...nums: number[]): number {\n  let s = 0;\n  for (const n of nums) s += n;\n  return s;\n}\nconsole.log(total(40, 60, 20));",
        "lineByLine": [
          {
            "line": "...nums: number[]",
            "explanation": "Rest collects numbers into an array."
          },
          {
            "line": "for (const n of nums) s += n;",
            "explanation": "Sums them."
          },
          {
            "line": "console.log(total(40, 60, 20));",
            "explanation": "Prints 120."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Overloads",
        "code": "function fee(age: number): number;\nfunction fee(student: string): number;\nfunction fee(x: number | string): number {\n  if (typeof x === \"number\") return x < 5 ? 0 : 100;\n  return x === \"hostel\" ? 50 : 100;\n}\nconsole.log(fee(4), fee(\"hostel\"));",
        "note": "Two call shapes advertised, one implementation behind them - callers get precise types per shape."
      },
      {
        "title": "never for impossible paths",
        "code": "function fail(msg: string): never {\n  throw new Error(msg);\n}\nfunction entry(age: number): string {\n  if (age < 0) return fail(\"bad age\");\n  return \"welcome\";\n}",
        "note": "never marks functions that never return - the compiler uses it for exhaustiveness checks."
      }
    ],
    "practice": [
      {
        "question": "Type areaOfCircle(r: number): number and test r=7.",
        "hint": "Signature with both annotations.",
        "answer": "function areaOfCircle(r: number): number {\n  return 3.14 * r * r;\n}\nconsole.log(areaOfCircle(7));"
      },
      {
        "question": "Write greet(name?: string) defaulting to guest.",
        "hint": "Optional + ?? fallback.",
        "answer": "function greet(name?: string): string {\n  return \"Namaste, \" + (name ?? \"guest\");\n}\nconsole.log(greet());"
      },
      {
        "question": "Overload describe(x: string) and describe(x: number).",
        "hint": "Two signatures, one implementation.",
        "answer": "function describe(x: string): string;\nfunction describe(x: number): string;\nfunction describe(x: string | number): string {\n  return typeof x === \"string\" ? \"text:\" + x : \"num:\" + x;\n}"
      },
      {
        "question": "Why does a missing return break a : string function?",
        "hint": "All code paths must produce the declared type.",
        "answer": "function f(ok: boolean): string {\n  if (ok) return \"yes\";\n  return \"no\"; // every path returns string\n}"
      }
    ],
    "interview": [
      {
        "question": "Why annotate return types instead of letting TS infer?",
        "answer": "Explicit returns document intent, catch body bugs early (returning undefined by accident), and keep .d.ts APIs stable when internals change."
      },
      {
        "question": "Optional (?) vs default (=) vs union-with-undefined?",
        "answer": "? omits the arg and narrows to T | undefined; = also supplies a value; explicit T | undefined forces callers to pass something (possibly undefined)."
      },
      {
        "question": "What are overloads for?",
        "answer": "One implementation, several precise call shapes - e.g. get(id: number) vs get(ids: number[]). Beats a loose union signature that loses the input-output link."
      },
      {
        "question": "void vs undefined vs never as return types?",
        "answer": "void: caller ignores the result. undefined: the value undefined is returned. never: the function never returns (throws/infinite loop) - used for exhaustiveness."
      }
    ]
  },
  {
    "id": "typescript-5",
    "title": "Interfaces & type aliases",
    "level": "Intermediate",
    "definition": "Interfaces and type aliases name object shapes: interface Student { name: string; marks: number }. Implementations must supply every required property with matching types - checked before runtime.",
    "analogy": "Like an admission form template: the interface prints the exact boxes (name, marks, city?) every applicant must fill. ? boxes are optional; the office (compiler) rejects forms with missing or wrong-type entries.",
    "keyPoints": [
      "interface Student { name: string; marks: number } names a reusable object shape.",
      "Properties with ? are optional: city?: string may be missing entirely.",
      "readonly id: number prevents reassignment after creation - IDs should never change.",
      "type aliases (type Point = {x: number}) also name shapes; interfaces extend cleaner.",
      "Excess property checks reject unknown fields in literals - typos fail fast.",
      "Functions can live in interfaces: greet(): string forces implementers to provide it."
    ],
    "basicExamples": [
      {
        "title": "First interface",
        "code": "interface Student {\n  name: string;\n  marks: number;\n}\nconst s: Student = { name: \"Asha\", marks: 92 };\nconsole.log(s.name);",
        "lineByLine": [
          {
            "line": "interface Student {",
            "explanation": "Declares the required shape."
          },
          {
            "line": "const s: Student = { name: \"Asha\", marks: 92 };",
            "explanation": "Must match exactly or compile fails."
          },
          {
            "line": "console.log(s.name);",
            "explanation": "Prints Asha."
          }
        ]
      },
      {
        "title": "Optional property",
        "code": "interface Student {\n  name: string;\n  city?: string;\n}\nconst a: Student = { name: \"Asha\" };\nconsole.log(a.city ?? \"unknown\");",
        "lineByLine": [
          {
            "line": "city?: string;",
            "explanation": "? means may be missing."
          },
          {
            "line": "const a: Student = { name: \"Asha\" };",
            "explanation": "Valid without city."
          },
          {
            "line": "a.city ?? \"unknown\"",
            "explanation": "Falls back safely."
          }
        ]
      },
      {
        "title": "readonly id",
        "code": "interface Bill {\n  readonly id: number;\n  total: number;\n}\nconst b: Bill = { id: 101, total: 240 };\nconsole.log(b.id);",
        "lineByLine": [
          {
            "line": "readonly id: number;",
            "explanation": "Locked after creation."
          },
          {
            "line": "const b: Bill = ...",
            "explanation": "Initial values fine."
          },
          {
            "line": "// b.id = 5; // ERROR",
            "explanation": "Reassignment rejected."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Interface with method",
        "code": "interface Greeter {\n  name: string;\n  greet(): string;\n}\nconst g: Greeter = {\n  name: \"Asha\",\n  greet() { return \"Namaste, \" + this.name; }\n};\nconsole.log(g.greet());",
        "lineByLine": [
          {
            "line": "greet(): string;",
            "explanation": "Implementers must supply this method."
          },
          {
            "line": "greet() { return \"Namaste, \" + this.name; }",
            "explanation": "Method using sibling property."
          },
          {
            "line": "console.log(g.greet());",
            "explanation": "Prints Namaste, Asha."
          }
        ]
      },
      {
        "title": "type alias union",
        "code": "type Result = { ok: true; value: number } | { ok: false; error: string };\nconst r: Result = { ok: true, value: 42 };\nconsole.log(r.ok);",
        "lineByLine": [
          {
            "line": "type Result = ... | ...",
            "explanation": "Alias for a two-shape union."
          },
          {
            "line": "const r: Result = { ok: true, value: 42 };",
            "explanation": "Matches the success shape."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Extending interfaces",
        "code": "interface Person { name: string; }\ninterface Student extends Person {\n  marks: number;\n}\nconst s: Student = { name: \"Asha\", marks: 92 };\nconsole.log(s.name, s.marks);",
        "note": "extends inherits required fields - Student must carry name AND marks."
      },
      {
        "title": "Index signatures",
        "code": "interface Marks {\n  [subject: string]: number;\n}\nconst m: Marks = { maths: 92, science: 88 };\nconsole.log(m.maths);",
        "note": "Index signatures allow any string key with number values - typed dictionaries."
      }
    ],
    "practice": [
      {
        "question": "Interface Book {title, price}; make one object.",
        "hint": "Shape annotation.",
        "answer": "interface Book { title: string; price: number; }\nconst b: Book = { title: \"Wings\", price: 350 };\nconsole.log(b);"
      },
      {
        "question": "Add optional author?: string; test without it.",
        "hint": "? property.",
        "answer": "interface Book { title: string; author?: string; }\nconst b: Book = { title: \"Wings\" };\nconsole.log(b.author ?? \"anon\");"
      },
      {
        "question": "readonly roll number that cannot change.",
        "hint": "readonly modifier.",
        "answer": "interface S { readonly roll: number; }\nconst s: S = { roll: 7 };\n// s.roll = 8; // ERROR"
      },
      {
        "question": "Why does {name: 5} fail for interface {name: string}?",
        "hint": "Type mismatch at compile time.",
        "answer": "// const s: Student = { name: 5, marks: 1 }; // ERROR: number not assignable to string"
      }
    ],
    "interview": [
      {
        "question": "interface vs type - which when?",
        "answer": "Interfaces: object shapes, extendable, better errors. type: unions, tuples, primitives, compositions. Teams use interface for objects, type for everything else."
      },
      {
        "question": "What does ? actually add to a property?",
        "answer": "It adds undefined to the type AND allows omission. Readers must narrow (?? / if) before use - the compiler enforces it."
      },
      {
        "question": "readonly vs const?",
        "answer": "readonly locks a PROPERTY after creation; const locks a BINDING. const obj still allows obj.field = x unless the field is readonly."
      },
      {
        "question": "Excess property checks - example?",
        "answer": "{ name: \"A\", markss: 1 } for Student errors on the typo markss - but only in fresh literals, not in prebuilt variables. Catches spelling bugs early."
      }
    ]
  },
  {
    "id": "typescript-6",
    "title": "Generics: reusable type-safe code",
    "level": "Intermediate",
    "definition": "Generics add type parameters (T, K) so one function, class or interface works for many types while staying fully checked. Write once, reuse safely everywhere.",
    "analogy": "Like a tiffin dabba manufacturer with adjustable moulds: one mould (generic function) makes 250ml or 1-litre dabbas depending on the setting (type argument) - every box still comes out perfectly shaped, never a lid that almost fits.",
    "keyPoints": [
      "Declare with angle brackets: function first<T>(items: T[]): T returns the same type it received.",
      "The compiler infers T from the call: first([\"a\"]) gives string without writing first<string>.",
      "Constrain with extends: function longest<T extends { length: number }>(a: T, b: T) works for strings and arrays.",
      "Generic interfaces model containers: interface Box<T> { item: T; label: string }.",
      "keyof T means any key name of T; T[K] is the value type at that key - the safe lookup pair.",
      "Defaults (T = string) and multiple params <K, V> cover maps, caches and API wrappers."
    ],
    "basicExamples": [
      {
        "title": "Identity keeps the type",
        "code": "function wrap<T>(value: T): T {\n  return value;\n}\nconst n = wrap(42);\nconst s = wrap(\"dosa\");\nconsole.log(n + 1, s.toUpperCase());",
        "lineByLine": [
          {
            "line": "function wrap<T>(value: T): T {",
            "explanation": "T is a placeholder decided per call."
          },
          {
            "line": "const n = wrap(42);",
            "explanation": "T becomes number, so n + 1 type-checks."
          },
          {
            "line": "const s = wrap(\"dosa\");",
            "explanation": "T becomes string, so .toUpperCase() is allowed."
          }
        ]
      },
      {
        "title": "First of any array",
        "code": "function first<T>(items: T[]): T | undefined {\n  return items[0];\n}\nconsole.log(first([10, 20]));\nconsole.log(first([]));",
        "lineByLine": [
          {
            "line": "function first<T>(items: T[]): T | undefined {",
            "explanation": "Works for number[], string[], anything."
          },
          {
            "line": "console.log(first([10, 20]));",
            "explanation": "Returns 10 typed as number."
          },
          {
            "line": "console.log(first([]));",
            "explanation": "Empty array gives undefined - handled in the type."
          }
        ]
      },
      {
        "title": "Generic box interface",
        "code": "interface Box<T> {\n  item: T;\n  label: string;\n}\nconst lunch: Box<string> = { item: \"dosa\", label: \"veg\" };\nconsole.log(lunch.item);",
        "lineByLine": [
          {
            "line": "interface Box<T> {",
            "explanation": "Box works for any item type."
          },
          {
            "line": "const lunch: Box<string> = ...",
            "explanation": "Fixes T to string for this box."
          },
          {
            "line": "console.log(lunch.item);",
            "explanation": "item is known to be a string."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Constrained longest",
        "code": "function longest<T extends { length: number }>(a: T, b: T): T {\n  return a.length >= b.length ? a : b;\n}\nconsole.log(longest(\"idli\", \"dosa\"));\nconsole.log(longest([1], [1, 2, 3]));",
        "lineByLine": [
          {
            "line": "<T extends { length: number }>",
            "explanation": "T must have a .length - strings, arrays qualify."
          },
          {
            "line": "console.log(longest(\"idli\", \"dosa\"));",
            "explanation": "Compares 4 vs 4, keeps the first: idli."
          },
          {
            "line": "console.log(longest([1], [1, 2, 3]));",
            "explanation": "Arrays work too: returns [1,2,3]."
          }
        ]
      },
      {
        "title": "Safe property getter",
        "code": "function get<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\nconst marks = { maths: 92, art: 78 };\nconsole.log(get(marks, \"maths\"));",
        "lineByLine": [
          {
            "line": "<T, K extends keyof T>",
            "explanation": "K must be a real key of the object."
          },
          {
            "line": "console.log(get(marks, \"maths\"));",
            "explanation": "Returns 92; get(marks, \"x\") would not compile."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Result wrapper for APIs",
        "code": "type Result<T> =\n  | { ok: true; value: T }\n  | { ok: false; error: string };\nfunction handle<T>(r: Result<T>): string {\n  return r.ok ? \"got it\" : \"fail: \" + r.error;\n}\nconsole.log(handle({ ok: false, error: \"timeout\" }));",
        "note": "One generic Result models every API call; narrowing on ok keeps both paths typed."
      },
      {
        "title": "Generic cache class",
        "code": "class Cache<K extends string, V> {\n  private store: Record<K, V | undefined> = {} as Record<K, V | undefined>;\n  set(key: K, value: V): void { this.store[key] = value; }\n  get(key: K): V | undefined { return this.store[key]; }\n}\nconst c = new Cache<string, number>();\nc.set(\"dosa\", 60);\nconsole.log(c.get(\"dosa\"));",
        "note": "Two type params separate key and value types while the compiler guards every access."
      }
    ],
    "practice": [
      {
        "question": "Write last<T>(items: T[]): T | undefined.",
        "hint": "Mirror first() from the end.",
        "answer": "function last<T>(items: T[]): T | undefined {\n  return items[items.length - 1];\n}\nconsole.log(last([\"a\", \"b\"]));"
      },
      {
        "question": "Type a Pair<K, V> interface with key and value.",
        "hint": "Two type params.",
        "answer": "interface Pair<K, V> { key: K; value: V; }\nconst p: Pair<string, number> = { key: \"dosa\", value: 60 };\nconsole.log(p);"
      },
      {
        "question": "Constrain doubleLen to things with length; return length * 2.",
        "hint": "T extends { length: number }.",
        "answer": "function doubleLen<T extends { length: number }>(x: T): number {\n  return x.length * 2;\n}\nconsole.log(doubleLen(\"idli\"));"
      },
      {
        "question": "Why does wrap(42) know n is number? Explain inference.",
        "hint": "T inferred from the argument.",
        "answer": "function wrap<T>(v: T): T { return v; }\nconst n = wrap(42); // T = number, so n + 1 compiles, n.toUpperCase() does not"
      }
    ],
    "interview": [
      {
        "question": "What problem do generics solve vs any?",
        "answer": "any disables checking (typos pass silently); generics preserve the exact type through the function so misuse still fails compilation while code stays reusable."
      },
      {
        "question": "Explain T extends { length: number }.",
        "answer": "A constraint: callers may use any type WITH a numeric length. The function can safely read .length; number or boolean arguments are rejected."
      },
      {
        "question": "keyof and indexed access T[K] - use case?",
        "answer": "Type-safe property access: get(obj, key) only accepts real keys and returns the matching value type - powers form libraries and ORMs."
      },
      {
        "question": "When do you write the type argument explicitly?",
        "answer": "Usually never (inference covers it), but needed when inference picks too narrow a type, e.g. wrap<string | null>(null), or for empty collections: [] as number[]."
      }
    ]
  },
  {
    "id": "typescript-7",
    "title": "Classes & object-oriented types",
    "level": "Intermediate",
    "definition": "TypeScript classes bundle typed fields with methods: constructor builds state, access modifiers (public/private/readonly) guard it, implements checks shape contracts, and extends reuses behaviour through inheritance.",
    "analogy": "Like a bank account counter: the class is the counter design, private balance is the locked cash drawer only staff touch, public deposit is the service window anyone may use, and a savings counter extends the base counter with interest.",
    "keyPoints": [
      "Fields need types and values: balance = 0 infers number; declare name: string for clarity.",
      "constructor(name: string) assigns readonly name once; readonly fields cannot be reassigned.",
      "private hides internals (balance); public methods (deposit) are the safe doorway in.",
      "implements Account checks the class honours a shape; the compiler rejects missing members.",
      "extends reuses a base class; override replaces behaviour; super calls the parent version.",
      "abstract classes define shared skeletons that only children can instantiate."
    ],
    "basicExamples": [
      {
        "title": "First typed class",
        "code": "class Student {\n  name: string;\n  marks: number;\n  constructor(name: string, marks: number) {\n    this.name = name;\n    this.marks = marks;\n  }\n  passed(): boolean {\n    return this.marks >= 40;\n  }\n}\nconst s = new Student(\"Asha\", 92);\nconsole.log(s.passed());",
        "lineByLine": [
          {
            "line": "name: string; marks: number;",
            "explanation": "Every field declares its type upfront."
          },
          {
            "line": "constructor(name: string, marks: number)",
            "explanation": "Builds state; new calls it automatically."
          },
          {
            "line": "passed(): boolean {",
            "explanation": "Methods annotate their return type too."
          }
        ]
      },
      {
        "title": "private and readonly",
        "code": "class Account {\n  readonly owner: string;\n  private balance = 0;\n  constructor(owner: string) { this.owner = owner; }\n  deposit(a: number): void {\n    if (a > 0) this.balance += a;\n  }\n  getBalance(): number { return this.balance; }\n}\nconst a = new Account(\"Asha\");\na.deposit(500);\nconsole.log(a.getBalance());",
        "lineByLine": [
          {
            "line": "readonly owner: string;",
            "explanation": "Set once in constructor, never again."
          },
          {
            "line": "private balance = 0;",
            "explanation": "Only methods inside may touch it."
          },
          {
            "line": "getBalance(): number",
            "explanation": "Public reader for the hidden state."
          }
        ]
      },
      {
        "title": "implements a shape",
        "code": "interface Printable { print(): string; }\nclass Report implements Printable {\n  constructor(private title: string) {}\n  print(): string { return \"Report: \" + this.title; }\n}\nconsole.log(new Report(\"Marks\").print());",
        "lineByLine": [
          {
            "line": "interface Printable { print(): string; }",
            "explanation": "The contract any printable thing honours."
          },
          {
            "line": "class Report implements Printable {",
            "explanation": "Compiler enforces the print method."
          },
          {
            "line": "constructor(private title: string) {}",
            "explanation": "Parameter property: declares AND assigns."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "extends and super",
        "code": "class Person {\n  constructor(public name: string) {}\n  greet(): string { return \"Hi, \" + this.name; }\n}\nclass Teacher extends Person {\n  constructor(name: string, public subject: string) {\n    super(name);\n  }\n  greet(): string { return super.greet() + \" (\" + this.subject + \")\"; }\n}\nconsole.log(new Teacher(\"Rao\", \"Maths\").greet());",
        "lineByLine": [
          {
            "line": "class Teacher extends Person {",
            "explanation": "Inherits name and greet."
          },
          {
            "line": "super(name);",
            "explanation": "Parent constructor must run first."
          },
          {
            "line": "super.greet() + ...",
            "explanation": "Reuses then extends parent behaviour."
          }
        ]
      },
      {
        "title": "static helpers",
        "code": "class Maths {\n  static PI = 3.14;\n  static circle(r: number): number { return Maths.PI * r * r; }\n}\nconsole.log(Maths.circle(7));",
        "lineByLine": [
          {
            "line": "static PI = 3.14;",
            "explanation": "Belongs to the class, not instances."
          },
          {
            "line": "Maths.circle(7)",
            "explanation": "Called on the class itself, no new needed."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "abstract skeleton",
        "code": "abstract class Shape {\n  abstract area(): number;\n  describe(): string { return \"Area: \" + this.area(); }\n}\nclass Square extends Shape {\n  constructor(private side: number) { super(); }\n  area(): number { return this.side * this.side; }\n}\nconsole.log(new Square(4).describe());",
        "note": "abstract forces children to supply area(); shared describe() reuses it. new Shape() is forbidden."
      },
      {
        "title": "class vs interface",
        "code": "interface User { name: string; }\nclass Admin implements User {\n  constructor(public name: string, public level: number) {}\n}\nfunction isSenior(u: Admin): boolean { return u.level > 2; }\nconsole.log(isSenior(new Admin(\"Asha\", 3)));",
        "note": "Interfaces describe shapes; classes create values. instanceof narrows classes only - interfaces vanish at runtime."
      }
    ],
    "practice": [
      {
        "question": "class Book: title, pages; isLong() for pages over 300.",
        "hint": "Typed fields, boolean method.",
        "answer": "class Book {\n  constructor(public title: string, public pages: number) {}\n  isLong(): boolean { return this.pages > 300; }\n}\nconsole.log(new Book(\"Gitanjali\", 103).isLong());"
      },
      {
        "question": "Make balance private with a deposit guard.",
        "hint": "private field, public method validates.",
        "answer": "class Safe {\n  private balance = 0;\n  deposit(n: number): void { if (n > 0) this.balance += n; }\n  get(): number { return this.balance; }\n}"
      },
      {
        "question": "Dog extends Animal overriding speak().",
        "hint": "extends plus super for shared fields.",
        "answer": "class Animal {\n  constructor(public name: string) {}\n  speak(): string { return \"...\"; }\n}\nclass Dog extends Animal {\n  speak(): string { return \"Woof \" + this.name; }\n}\nconsole.log(new Dog(\"Tommy\").speak());"
      },
      {
        "question": "Fix: assigning to readonly id after creation.",
        "hint": "readonly allows constructor-only writes.",
        "answer": "class U {\n  readonly id: number;\n  constructor(id: number) { this.id = id; }\n}"
      }
    ],
    "interview": [
      {
        "question": "private vs #private vs protected?",
        "answer": "private is compile-time only (erased, still visible in JS). #x is runtime-hard private. protected allows children access. Interviews probe the compile-vs-runtime gap."
      },
      {
        "question": "When interface, when abstract class?",
        "answer": "Interface: pure shape contracts, multiple allowed, zero runtime. Abstract class: shared implementation plus enforced skeleton, single inheritance. Prefer interfaces for data shapes."
      },
      {
        "question": "What are parameter properties?",
        "answer": "constructor(private title: string) declares the field AND assigns it - shorthand for the common declare-then-assign pattern."
      },
      {
        "question": "Do types exist at runtime?",
        "answer": "No - all annotations erase to plain JS. instanceof works on classes (real values) but never on interfaces; validate runtime data with guards or Zod."
      }
    ]
  },
  {
    "id": "typescript-8",
    "title": "Utility types: Partial, Pick & Record",
    "level": "Intermediate",
    "definition": "Utility types transform existing types: Partial makes fields optional, Pick/Omit select or drop keys, Record builds key-to-value maps, Readonly freezes, and ReturnType extracts a functions result type.",
    "analogy": "Like thali customisation: Partial is make everything optional for a diet plate; Pick is full meals but only dal and rice; Omit is everything except onion; Record is the printed price chart mapping every item to its cost.",
    "keyPoints": [
      "Partial<T> options-ifies every field: perfect for update payloads and config objects.",
      "Pick<T, K> keeps listed keys; Omit<T, K> drops listed keys - mirror tools for views vs forms.",
      "Record<K, V> maps a key union to values: Record<\"veg\" | \"bill\", number> price tables.",
      "Readonly<T> blocks reassignment; Required<T> reverses Partial by demanding every field.",
      "ReturnType<typeof fn> and Parameters<typeof fn> derive types from functions - single source of truth.",
      "Compose them: Partial<Pick<Order, \"dish\" | \"qty\">> narrows then relaxes in one line."
    ],
    "basicExamples": [
      {
        "title": "Partial updates",
        "code": "type Menu = { dish: string; price: number };\nfunction update(patch: Partial<Menu>): void {\n  console.log(patch);\n}\nupdate({ price: 70 });",
        "lineByLine": [
          {
            "line": "function update(patch: Partial<Menu>)",
            "explanation": "patch may carry dish, price, both or neither."
          },
          {
            "line": "update({ price: 70 });",
            "explanation": "Half an object now compiles legally."
          }
        ]
      },
      {
        "title": "Pick and Omit",
        "code": "type User = { id: number; name: string; pass: string };\ntype Public = Pick<User, \"id\" | \"name\">;\ntype Safe = Omit<User, \"pass\">;\nconst u: Public = { id: 1, name: \"Asha\" };\nconsole.log(u);",
        "lineByLine": [
          {
            "line": "type Public = Pick<User, \"id\" | \"name\">;",
            "explanation": "Keeps only id and name."
          },
          {
            "line": "type Safe = Omit<User, \"pass\">;",
            "explanation": "Drops the secret field."
          },
          {
            "line": "const u: Public = { id: 1, name: \"Asha\" };",
            "explanation": "Shape-checked at assignment."
          }
        ]
      },
      {
        "title": "Record price chart",
        "code": "type Item = \"idli\" | \"dosa\";\nconst price: Record<Item, number> = { idli: 30, dosa: 60 };\nconsole.log(price.dosa);",
        "lineByLine": [
          {
            "line": "type Item = \"idli\" | \"dosa\";",
            "explanation": "Allowed keys listed once."
          },
          {
            "line": "const price: Record<Item, number>",
            "explanation": "Every key must map to a number - miss one and it errors."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Readonly freeze",
        "code": "type Bill = { total: number };\nconst b: Readonly<Bill> = { total: 240 };\n// b.total = 300; // ERROR\nconsole.log(b.total);",
        "lineByLine": [
          {
            "line": "const b: Readonly<Bill>",
            "explanation": "All fields locked after creation."
          },
          {
            "line": "// b.total = 300; // ERROR",
            "explanation": "Reassignment rejected at compile time."
          }
        ]
      },
      {
        "title": "ReturnType reuse",
        "code": "function bill(items: number[]): number {\n  return items.reduce((a, b) => a + b, 0);\n}\ntype Total = ReturnType<typeof bill>;\nconst t: Total = bill([60, 30]);\nconsole.log(t);",
        "lineByLine": [
          {
            "line": "type Total = ReturnType<typeof bill>;",
            "explanation": "Total follows the function even if its return changes."
          },
          {
            "line": "const t: Total = bill([60, 30]);",
            "explanation": "Prints 90, typed automatically."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Compose Pick + Partial",
        "code": "type Order = { dish: string; qty: number; note: string };\ntype Edit = Partial<Pick<Order, \"dish\" | \"qty\">>;\nconst e: Edit = { qty: 2 };\nconsole.log(e);",
        "note": "Pick narrows to editable fields, Partial relaxes them - the standard edit-form type in one line."
      },
      {
        "title": "Record with template keys",
        "code": "type City = \"mum\" | \"pnq\";\ntype Stock = Record<`stock-${City}`, number>;\nconst s: Stock = { \"stock-mum\": 40, \"stock-pnq\": 25 };\nconsole.log(s[\"stock-mum\"]);",
        "note": "Template literal keys generate families (stock-mum, stock-pnq) - typed without writing each by hand."
      }
    ],
    "practice": [
      {
        "question": "Make an UpdateUser where name and city are optional.",
        "hint": "Partial of the full type.",
        "answer": "type User = { name: string; city: string };\ntype UpdateUser = Partial<User>;"
      },
      {
        "question": "Build a role-to-permissions map for admin and viewer.",
        "hint": "Record with union keys.",
        "answer": "const p: Record<\"admin\" | \"viewer\", string[]> = { admin: [\"all\"], viewer: [\"read\"] };"
      },
      {
        "question": "Strip password from a User type.",
        "hint": "Omit the pass key.",
        "answer": "type Safe = Omit<User, \"pass\">;"
      },
      {
        "question": "Why does Record<\"a\"|\"b\", number> reject {a: 1}?",
        "hint": "Missing key b.",
        "answer": "{ a: 1, b: 0 } // every listed key required"
      }
    ],
    "interview": [
      {
        "question": "When Partial, when Required?",
        "answer": "Partial for patches/drafts where fields arrive over time; Required to re-demand everything (e.g. validating a draft became complete)."
      },
      {
        "question": "Pick vs Omit - which is safer long-term?",
        "answer": "Pick whitelists: new sensitive fields stay hidden by default. Omit blacklists: new fields leak until added. Prefer Pick for public shapes."
      },
      {
        "question": "What does Record guarantee?",
        "answer": "Totality: every key in the union maps to a value, checked at compile time. Ideal for lookup tables, reducers and exhaustive configs."
      },
      {
        "question": "Why derive with ReturnType instead of repeating?",
        "answer": "One source of truth: when the function signature changes, derived types follow automatically instead of drifting into lies."
      }
    ]
  },
  {
    "id": "typescript-9",
    "title": "Async types: promises & errors",
    "level": "Advanced",
    "definition": "Async functions return Promise<T>: a future value of type T. await unwraps it; try/catch handles rejection. Promise.all runs independent calls together and keeps every result typed.",
    "analogy": "Like ordering from three cloud kitchens at once: each ticket (Promise<Meal>) is a typed promise of food. await waits at your gate for one; Promise.all lays the full thali; a burnt dish (rejection) goes to the complaint counter (catch).",
    "keyPoints": [
      "async function f(): Promise<number> must return a number; forgetting async breaks the contract.",
      "await pauses only the function, never the whole page; wrap fallible calls in try.",
      "Promise.all([a, b]) types as a [T1, T2] tuple - one failure rejects everything.",
      "Promise.allSettled never rejects: inspect status, value and reason per call.",
      "Catch errors as unknown, then narrow with instanceof Error before reading .message.",
      "Promise.resolve(x) and reject(e) build settled promises for tests and adapters."
    ],
    "basicExamples": [
      {
        "title": "Typed async fetch",
        "code": "async function getMarks(id: number): Promise<number> {\n  const r = await fetch(\"/api/marks/\" + id);\n  if (!r.ok) throw new Error(\"HTTP \" + r.status);\n  const data: { marks: number } = await r.json();\n  return data.marks;\n}",
        "lineByLine": [
          {
            "line": "async function getMarks(id: number): Promise<number> {",
            "explanation": "Signature promises a future number."
          },
          {
            "line": "if (!r.ok) throw new Error(\"HTTP \" + r.status);",
            "explanation": "Bad status becomes a typed rejection."
          },
          {
            "line": "return data.marks;",
            "explanation": "Fulfils the Promise<number> contract."
          }
        ]
      },
      {
        "title": "try/catch with unknown",
        "code": "async function safe(id: number): Promise<number> {\n  try {\n    return await getMarks(id);\n  } catch (e: unknown) {\n    const msg = e instanceof Error ? e.message : \"unknown\";\n    console.log(\"failed: \" + msg);\n    return 0;\n  }\n}",
        "lineByLine": [
          {
            "line": "try { return await getMarks(id); }",
            "explanation": "Success path returns real marks."
          },
          {
            "line": "catch (e: unknown) {",
            "explanation": "TS forces unknown - you must narrow."
          },
          {
            "line": "return 0;",
            "explanation": "Fallback keeps the number contract."
          }
        ]
      },
      {
        "title": "Parallel pair",
        "code": "async function total(a: number, b: number): Promise<number> {\n  const pair: [number, number] = await Promise.all([getMarks(a), getMarks(b)]);\n  return pair[0] + pair[1];\n}",
        "lineByLine": [
          {
            "line": "await Promise.all([getMarks(a), getMarks(b)])",
            "explanation": "Both requests fly together."
          },
          {
            "line": "const pair: [number, number] = ...",
            "explanation": "Result is a typed tuple, not any[]."
          },
          {
            "line": "return pair[0] + pair[1];",
            "explanation": "Sums when both land."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "allSettled audit",
        "code": "async function audit(ids: number[]): Promise<void> {\n  const rs = await Promise.allSettled(ids.map(getMarks));\n  rs.forEach((r, i) => {\n    console.log(ids[i], r.status === \"fulfilled\" ? r.value : \"FAIL\");\n  });\n}",
        "lineByLine": [
          {
            "line": "await Promise.allSettled(ids.map(getMarks));",
            "explanation": "One promise per id; none sinks the batch."
          },
          {
            "line": "r.status === \"fulfilled\" ? r.value : \"FAIL\"",
            "explanation": "Narrows each result before touching value."
          }
        ]
      },
      {
        "title": "Timeout race",
        "code": "async function quick(id: number): Promise<number> {\n  const timeout = new Promise<number>((_, rej) =>\n    setTimeout(() => rej(new Error(\"slow\")), 2000));\n  return Promise.race([getMarks(id), timeout]);\n}",
        "lineByLine": [
          {
            "line": "Promise.race([getMarks(id), timeout])",
            "explanation": "First to settle wins."
          },
          {
            "line": "setTimeout(() => rej(new Error(\"slow\")), 2000)",
            "explanation": "Rejects after 2s if the API lags."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Retry helper",
        "code": "async function retry<T>(fn: () => Promise<T>, n = 3): Promise<T> {\n  try { return await fn(); }\n  catch (e) { if (n <= 1) throw e; return retry(fn, n - 1); }\n}",
        "note": "Generic retry preserves type T across attempts - reuse for every flaky call."
      },
      {
        "title": "Result wrapper",
        "code": "type Result<T> = { ok: true; value: T } | { ok: false; error: string };\nasync function wrap(id: number): Promise<Result<number>> {\n  try { return { ok: true, value: await getMarks(id) }; }\n  catch { return { ok: false, error: \"unavailable\" }; }\n}",
        "note": "Result<T> makes failure a VALUE the compiler tracks - callers handle both arms."
      }
    ],
    "practice": [
      {
        "question": "Fetch two users in parallel; print both names.",
        "hint": "Promise.all plus a typed tuple.",
        "answer": "async function names(a: number, b: number): Promise<void> {\n  const pair = await Promise.all([\n    fetch(\"/api/u/\" + a).then(r => r.json()),\n    fetch(\"/api/u/\" + b).then(r => r.json())\n  ]);\n  console.log((pair[0] as { name: string }).name);\n}"
      },
      {
        "question": "safeDivide(a, b): Promise<number> rejecting on b = 0; catch returns 0.",
        "hint": "throw plus unknown narrowing.",
        "answer": "async function safeDivide(a: number, b: number): Promise<number> {\n  try {\n    if (b === 0) throw new Error(\"div0\");\n    return a / b;\n  } catch { return 0; }\n}"
      },
      {
        "question": "Log pass or fail per id with allSettled.",
        "hint": "Map ids to promises, inspect status.",
        "answer": "async function rep(ids: number[]): Promise<void> {\n  const rs = await Promise.allSettled(ids.map(getMarks));\n  rs.forEach((r, i) => console.log(ids[i], r.status));\n}"
      },
      {
        "question": "Add a 1s timeout to any Promise<number>.",
        "hint": "Promise.race with a rejecting timer.",
        "answer": "function withTimeout(p: Promise<number>): Promise<number> {\n  const t = new Promise<number>((_, rej) =>\n    setTimeout(() => rej(new Error(\"timeout\")), 1000));\n  return Promise.race([p, t]);\n}"
      }
    ],
    "interview": [
      {
        "question": "Why is catch(e: unknown) forced - not any?",
        "answer": "any lets you read e.message unchecked and crash on thrown strings. unknown forces narrowing, so only real Errors yield messages."
      },
      {
        "question": "all vs allSettled vs race - pick each?",
        "answer": "all: need every result, fail fast. allSettled: audit batches where partial failure is fine. race: first-wins timeouts."
      },
      {
        "question": "What does an async function actually return?",
        "answer": "Always a Promise of the declared type. return 5 fulfils with 5; throw rejects. Callers must await or .then it."
      },
      {
        "question": "How do you keep async errors typed?",
        "answer": "Throw Error subclasses or return Result<T> unions; narrow unknown in catch. Never let raw rejections cross module boundaries."
      }
    ]
  },
  {
    "id": "typescript-10",
    "title": "Advanced types: conditionals & mapped types",
    "level": "Advanced",
    "definition": "Conditional types (T extends U ? X : Y) pick a type based on a relationship; mapped types ({ [K in keyof T]: ... }) transform every property; infer captures a piece of a matched pattern.",
    "analogy": "Like a tiffin subscription that reshapes itself: hand it a steel dabba (a type) and it returns a dabba with every compartment relabelled (mapped type). Conditional types are the if-this-then-that rule; infer is the caterer noticing the chutney compartment always holds chutney without being told.",
    "keyPoints": [
      "type IsStr<T> = T extends string ? 'yes' : 'no' is a type-level ternary, evaluated only at compile time.",
      "Bare T distributes over unions: IsStr<string|number> becomes 'yes'|'no'. Wrap [T] to stop that.",
      "Mapped type: type RO<T> = { readonly [K in keyof T]: T[K] } transforms each property.",
      "Key remapping: [K in keyof T as `get${Capitalize<K>}`]: () => T[K] renames keys to getX.",
      "infer extracts a type: type Unwrap<T> = T extends Promise<infer V> ? V : never.",
      "Template literal types build string unions: `${Method} /${Path}` from 'GET'|'POST'."
    ],
    "basicExamples": [
      {
        "title": "A first conditional type",
        "code": "type IsString<T> = T extends string ? 'yes' : 'no';\ntype A = IsString<string>;\ntype B = IsString<number>;\nconst a: A = 'yes';\nconst b: B = 'no';\nconsole.log(a, b);",
        "lineByLine": [
          {
            "line": "type IsString<T> = T extends string ? 'yes' : 'no';",
            "explanation": "A type-level ternary: if T fits string the result is the literal 'yes'."
          },
          {
            "line": "type A = IsString<string>;",
            "explanation": "Feeding string makes A the literal type 'yes'."
          }
        ]
      },
      {
        "title": "Mapped type: nullable fields",
        "code": "type Product = { id: number; name: string; price: number };\ntype Nullable<T> = { [K in keyof T]: T[K] | null };\nconst draft: Nullable<Product> = { id: 1, name: null, price: 99.5 };\nconsole.log(draft.name);",
        "lineByLine": [
          {
            "line": "type Nullable<T> = { [K in keyof T]: T[K] | null };",
            "explanation": "Walks every key K of T and unions each value with null."
          },
          {
            "line": "const draft: Nullable<Product> = { id: 1, name: null, price: 99.5 };",
            "explanation": "name may now be null — great for draft records."
          }
        ]
      },
      {
        "title": "infer to unwrap a Promise",
        "code": "type Unwrap<T> = T extends Promise<infer V> ? V : T;\ntype Value = Unwrap<Promise<string>>;\nconst v: Value = 'hello';\nconsole.log(v.length);",
        "lineByLine": [
          {
            "line": "type Unwrap<T> = T extends Promise<infer V> ? V : T;",
            "explanation": "If T is a Promise, capture its inner type as V and return it."
          },
          {
            "line": "type Value = Unwrap<Promise<string>>;",
            "explanation": "Promise<string> matches, so Value becomes string."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Distributive conditional",
        "code": "type ToArray<T> = T extends unknown ? T[] : never;\ntype R = ToArray<string | number>;\nconst r: R = ['a', 1, 'b'];\nconsole.log(r.length);",
        "lineByLine": [
          {
            "line": "type ToArray<T> = T extends unknown ? T[] : never;",
            "explanation": "Bare T makes it distribute — each union member handled separately."
          },
          {
            "line": "type R = ToArray<string | number>;",
            "explanation": "Result is string[] | number[], not (string | number)[]."
          }
        ]
      },
      {
        "title": "Key remapping with as",
        "code": "type Point = { x: number; y: number };\ntype Getters<T> = { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] };\nconst g: Getters<Point> = { getX: () => 1, getY: () => 2 };\nconsole.log(g.getX());",
        "lineByLine": [
          {
            "line": "type Getters<T> = { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] };",
            "explanation": "Mapped type renaming each key to getX/getY via template literal + as."
          },
          {
            "line": "const g: Getters<Point> = { getX: () => 1, getY: () => 2 };",
            "explanation": "Object must provide the transformed keys getX and getY."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Utility types are mapped types",
        "code": "type Partial2<T> = { [K in keyof T]?: T[K] };\ntype Readonly2<T> = { readonly [K in keyof T]: T[K] };\ntype Pick2<T, K extends keyof T> = { [P in K]: T[P] };\nconst patch: Partial2<{ id: number; name: string }> = { name: 'Asha' };\nconsole.log(patch);",
        "note": "Partial, Readonly and Pick are exactly these three mapped types. Once you see it, inventing project-specific utility types feels natural."
      },
      {
        "title": "Template literal routes",
        "code": "type Method = 'GET' | 'POST';\ntype Path = 'users' | 'orders';\ntype Route = `${Method} /${Path}`;\nconst r1: Route = 'GET /users';\nconsole.log(r1);",
        "note": "Template literal types generate string unions from other unions — the basis of typed HTTP clients. A typo like 'GET /user' fails at compile time."
      }
    ],
    "practice": [
      {
        "question": "Write Unwrap<T> that returns the element type of T[], else never.",
        "hint": "T extends (infer U)[] ? U : never.",
        "answer": "type Unwrap<T> = T extends (infer U)[] ? U : never;\ntype N = Unwrap<number[]>;\nconst n: N = 5;\nconsole.log(n);"
      },
      {
        "question": "Make every property of a type readonly.",
        "hint": "Mapped type adding readonly.",
        "answer": "type Frozen<T> = { readonly [K in keyof T]: T[K] };\nconst c: Frozen<{ a: number }> = { a: 1 };\nconsole.log(c.a);"
      },
      {
        "question": "Extract the parameter types of a function as a tuple.",
        "hint": "infer inside (...args: infer A).",
        "answer": "type Params<T> = T extends (...args: infer A) => any ? A : never;\nfunction add(a: number, b: string) { return a; }\ntype P = Params<typeof add>;\nconst p: P = [1, 'x'];\nconsole.log(p);"
      },
      {
        "question": "Why does string extends T stay unresolved?",
        "hint": "Type parameter must be on the left.",
        "answer": "With string fixed and T open, the relationship cannot be decided. Write T extends string so the compiler resolves it when a concrete T arrives."
      }
    ],
    "interview": [
      {
        "question": "What are conditional types and when do you use them?",
        "answer": "Types that resolve to one of two types based on a check (T extends U ? X : Y). Use them when a function's return type depends on its argument type, to unwrap types, and to build helper types that map or filter types."
      },
      {
        "question": "Explain distributivity with an example.",
        "answer": "With a bare type parameter, a conditional distributes over unions: Box<T> = T extends any ? {v:T} : never; Box<string|number> becomes {v:string}|{v:number}. Wrap in [T] to disable distribution."
      },
      {
        "question": "infer — what problem does it solve?",
        "answer": "It captures a type from inside a matched pattern: ReturnType<T> = T extends (...a:any)=>infer R ? R : never. Without infer you could detect a shape but not extract and reuse a piece of it."
      },
      {
        "question": "How are Partial, Readonly, Pick, Record implemented?",
        "answer": "All are mapped types: Partial adds ?, Readonly adds readonly, Pick selects keys K, Record<K,V> is { [P in K]: V }. They show almost every utility type combines mapped types with keyof."
      }
    ]
  },
  {
    "id": "typescript-11",
    "title": "Modules, tsconfig & tooling",
    "level": "Advanced",
    "definition": "Modules split code into files: export shares names, import brings them in. tsconfig.json configures the compiler (strict, target, module). Tooling (tsc --watch, bundlers, ESLint, source maps) turns many .ts files into one optimized .js bundle.",
    "analogy": "Like a big Indian kitchen divided into stations — tandoor, curry, sweets. Each station exports finished dishes (export); the head chef imports what a menu needs (import). tsconfig is the recipe rulebook (how spicy, how fast); the bundler is the catering van that packs every station's output into one delivery crate.",
    "keyPoints": [
      "Named exports/imports: export function fee(){} then import { fee } from './billing'; default export gives one main thing.",
      "A .ts file with no import/export is a global script; add one export to make it a module with its own scope.",
      "ES modules are native in browsers and Node; \"type\":\"module\" in package.json makes .js files ESM.",
      "tsconfig essentials: strict (all safety checks), target (JS version), module (module system), outDir (build folder).",
      "tsc compiles types away — the output is plain JS; source maps let you debug the original .ts.",
      "ts-node / tsx run TS directly in Node; bundlers (Vite, esbuild) tree-shake unused code for smaller bundles."
    ],
    "basicExamples": [
      {
        "title": "Export and import",
        "code": "// billing.ts\nexport function fee(age: number): number { return age >= 60 ? 50 : 100; }\nexport const GST = 0.18;\n// app.ts\nimport { fee, GST } from './billing';\nconsole.log(fee(65), GST);",
        "lineByLine": [
          {
            "line": "export function fee(age: number): number",
            "explanation": "export makes fee visible to other files."
          },
          {
            "line": "import { fee, GST } from './billing';",
            "explanation": "Named import pulls exactly those two names."
          },
          {
            "line": "console.log(fee(65), GST);",
            "explanation": "Uses the imported values: 50 0.18."
          }
        ]
      },
      {
        "title": "Default export",
        "code": "// menu.ts\nexport default function greet(name: string) { return 'Namaste, ' + name; }\n// main.ts\nimport greet from './menu';\nconsole.log(greet('Asha'));",
        "lineByLine": [
          {
            "line": "export default function greet",
            "explanation": "A file's single default export, named freely on import."
          },
          {
            "line": "import greet from './menu';",
            "explanation": "Default import needs no braces and any local name."
          }
        ]
      },
      {
        "title": "tsconfig.json",
        "code": "{\n  \"compilerOptions\": {\n    \"strict\": true,\n    \"target\": \"ES2020\",\n    \"module\": \"ESNext\",\n    \"outDir\": \"dist\"\n  }\n}",
        "lineByLine": [
          {
            "line": "\"strict\": true",
            "explanation": "Turns on the full battery of type-safety checks."
          },
          {
            "line": "\"target\": \"ES2020\"",
            "explanation": "Which JS features tsc may emit."
          },
          {
            "line": "\"outDir\": \"dist\"",
            "explanation": "Compiled .js lands in dist/, sources stay put."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Import types only",
        "code": "// api.ts\nexport type User = { id: number; name: string };\nexport async function load(): Promise<User> { return { id: 1, name: 'Asha' }; }\n// ui.ts\nimport type { User } from './api';\nimport { load } from './api';\nconst u: User = { id: 2, name: 'Ravi' };\nload().then(x => console.log(x.name));",
        "lineByLine": [
          {
            "line": "import type { User } from './api';",
            "explanation": "import type pulls only the type — erased at compile time."
          },
          {
            "line": "import { load } from './api';",
            "explanation": "A normal import for the runtime function."
          }
        ]
      },
      {
        "title": "tsx runs TS directly",
        "code": "// No build step needed:\n//   npx tsx app.ts\nconsole.log('Hello from TypeScript, run directly');",
        "lineByLine": [
          {
            "line": "npx tsx app.ts",
            "explanation": "tsx strips types on the fly, great for scripts and servers during development."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Path aliases for clean imports",
        "code": "// tsconfig.json\n{ \"compilerOptions\": { \"baseUrl\": \".\", \"paths\": { \"@/*\": [\"src/*\"] } } }\n// now import without ../../../ spaghetti:\nimport { fee } from '@/billing';",
        "note": "Path aliases keep imports readable in large projects; the bundler must be configured to understand the same alias."
      },
      {
        "title": "Declaration files for untyped packages",
        "code": "// globals.d.ts\ndeclare module 'old-helper' {\n  export function shout(s: string): string;\n}\n// now the untyped package is safe to import anywhere",
        "note": "When a package ships no types, a .d.ts declaration file describes its API so your code still type-checks. Better still, prefer packages with @types/* or built-in types."
      }
    ],
    "practice": [
      {
        "question": "Split a total() function into its own file and import it.",
        "hint": "export function total, import { total }.",
        "answer": "// math.ts\nexport function total(xs: number[]): number { return xs.reduce((a, b) => a + b, 0); }\n// app.ts\nimport { total } from './math';\nconsole.log(total([1, 2, 3]));"
      },
      {
        "question": "Write a minimal strict tsconfig.json.",
        "hint": "strict, target, outDir.",
        "answer": "{\n  \"compilerOptions\": { \"strict\": true, \"target\": \"ES2020\", \"outDir\": \"dist\" }\n}"
      },
      {
        "question": "Import only the type of a value you never call at runtime.",
        "hint": "import type.",
        "answer": "export type Point = { x: number; y: number };\nimport type { Point } from './geo';\nconst p: Point = { x: 1, y: 2 };\nconsole.log(p);"
      },
      {
        "question": "Why does tsc output still run without TS installed?",
        "hint": "Types are erased at compile time.",
        "answer": "tsc removes every type annotation and emits standard JavaScript. The running program contains no TypeScript — only plain JS that any engine can execute."
      }
    ],
    "interview": [
      {
        "question": "named vs default export — when each?",
        "answer": "Named for most things (many per file, clear import names, better tree-shaking and refactor safety). Default when a file has one primary export (a React component, a class). Avoid mixing in one file."
      },
      {
        "question": "What does tsc actually do to types?",
        "answer": "Erases them. TypeScript is a compile-time layer; tsc checks then strips annotations and emits plain JS. Types never reach runtime, so they cost nothing at execution."
      },
      {
        "question": "Why is strict mode recommended?",
        "answer": "It enables strictNullChecks, noImplicitAny and more, catching null/undefined bugs and untyped values at compile time. Turning it off pushes those bugs to production where they crash."
      },
      {
        "question": "import type vs import — difference?",
        "answer": "import type is guaranteed erased, never emits a runtime import; import may keep a real module load. Use import type for pure types and isolatedModules-friendly code."
      }
    ]
  },
  {
    "id": "typescript-12",
    "title": "Project: typed mini app & best practices",
    "level": "Advanced",
    "definition": "This capstone combines types, generics, modules and async into a small typed app: a typed data layer, validation, an async loader and a couple of tests. Best practices — strict mode, small pure functions, no any — keep it maintainable.",
    "analogy": "Like running a full tiffin service end to end: you define the menu types (the menu card), take orders through a validated form, cook each dish in its own small station (functions), and taste-test before packing (tests). The result is a tidy operation anyone can join mid-shift and understand.",
    "keyPoints": [
      "Model the domain with types first; let the compiler catch missing fields before you write logic.",
      "Prefer pure functions (same input, same output, no side effects) — they are trivial to test.",
      "Ban any and unknown; narrow unknown at the boundary instead of pretending it is safe.",
      "Async boundaries should return Promise<T> and handle errors with try/catch or a Result type.",
      "Keep functions small and named for intent; the type of a function documents its contract.",
      "A few focused unit tests beat manual clicking — they also serve as living documentation."
    ],
    "basicExamples": [
      {
        "title": "A typed data model",
        "code": "type Student = { id: number; name: string; marks: number };\nfunction grade(s: Student): 'A' | 'B' | 'C' {\n  if (s.marks >= 90) return 'A';\n  if (s.marks >= 60) return 'B';\n  return 'C';\n}\nconst s: Student = { id: 1, name: 'Asha', marks: 92 };\nconsole.log(grade(s));",
        "lineByLine": [
          {
            "line": "type Student = { id: number; name: string; marks: number };",
            "explanation": "The domain shape — every student has these fields."
          },
          {
            "line": "function grade(s: Student): 'A' | 'B' | 'C'",
            "explanation": "Return type is a small union, so callers can switch on it safely."
          },
          {
            "line": "const s: Student = { id: 1, name: 'Asha', marks: 92 };",
            "explanation": "A typed value; a missing field would not compile."
          }
        ]
      },
      {
        "title": "Pure function + test",
        "code": "function total(xs: number[]): number { return xs.reduce((a, b) => a + b, 0); }\nconsole.log(total([1, 2, 3]) === 6);\nconsole.log(total([]) === 0);\nconsole.log(total([-1, 1]) === 0);",
        "lineByLine": [
          {
            "line": "function total(xs: number[]): number",
            "explanation": "Pure: depends only on its argument, returns a value."
          },
          {
            "line": "console.log(total([]) === 0);",
            "explanation": "Edge case: empty list returns 0, not a crash."
          }
        ]
      },
      {
        "title": "Validate unknown input",
        "code": "function isStudent(x: unknown): x is Student {\n  return typeof x === 'object' && x !== null && 'marks' in x &&\n    typeof (x as Student).marks === 'number';\n}\nconsole.log(isStudent({ id: 1, marks: 90 }));",
        "lineByLine": [
          {
            "line": "function isStudent(x: unknown): x is Student",
            "explanation": "A type guard: returns true and narrows x to Student."
          },
          {
            "line": "return typeof x === 'object' && x !== null",
            "explanation": "Check shape before trusting properties."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Async loader with error handling",
        "code": "type Result<T> = { ok: true; value: T } | { ok: false; error: string };\nasync function loadMark(id: number): Promise<Result<number>> {\n  try {\n    const data = { id, marks: 88 };\n    return { ok: true, value: data.marks };\n  } catch {\n    return { ok: false, error: 'failed to load' };\n  }\n}\nloadMark(1).then(r => console.log(r.ok ? r.value : r.error));",
        "lineByLine": [
          {
            "line": "type Result<T> = { ok: true; value: T } | { ok: false; error: string };",
            "explanation": "A discriminated union for success/failure."
          },
          {
            "line": "return { ok: false, error: 'failed to load' };",
            "explanation": "Errors become values, not thrown exceptions."
          }
        ]
      },
      {
        "title": "Generic cache",
        "code": "function cacheLast<T>(fn: () => T): () => T {\n  let stored: T | undefined;\n  return () => (stored ??= fn());\n}\nconst next = cacheLast(() => 42);\nconsole.log(next(), next());",
        "lineByLine": [
          {
            "line": "let stored: T | undefined;",
            "explanation": "Memo slot starts empty."
          },
          {
            "line": "return () => (stored ??= fn());",
            "explanation": "Call fn once, then reuse — ??= assigns only if undefined."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Type-safe event emitter",
        "code": "type Events = { login: string; logout: void };\nfunction on<K extends keyof Events>(k: K, h: (v: Events[K]) => void): void {}\non('login', u => console.log('welcome', u));\n// on('login', n => console.log(n * 2)); // ERROR: n is string",
        "note": "keyof + mapped types give per-event payload types; a wrong handler fails at compile time."
      },
      {
        "title": "Small typed module boundary",
        "code": "// api.ts\nexport type Student = { id: number; name: string; marks: number };\nexport function grade(s: Student): 'A' | 'B' | 'C' {\n  if (s.marks >= 90) return 'A';\n  if (s.marks >= 60) return 'B';\n  return 'C';\n}\n// app.ts\nimport type { Student } from './api';\nimport { grade } from './api';\nconst s: Student = { id: 1, name: 'Asha', marks: 72 };\nconsole.log(grade(s));",
        "note": "Keep types in one module and import type where needed — a clean, strict boundary between data and logic."
      }
    ],
    "practice": [
      {
        "question": "Model a Product type and a pure priceWithGST(p) function.",
        "hint": "Type + pure fn.",
        "answer": "type Product = { price: number };\nfunction priceWithGST(p: Product): number { return p.price * 1.18; }\nconsole.log(priceWithGST({ price: 100 }));"
      },
      {
        "question": "Write a type guard isNumberArray(x: unknown) narrowing to number[].",
        "hint": "Array.isArray + every typeof.",
        "answer": "function isNumberArray(x: unknown): x is number[] {\n  return Array.isArray(x) && x.every(v => typeof v === 'number');\n}\nconsole.log(isNumberArray([1, 2]));"
      },
      {
        "question": "Make an async fake fetch returning Promise<string>, await it in a function.",
        "hint": "async/await.",
        "answer": "async function fetchName(): Promise<string> { return 'Asha'; }\nasync function main() { console.log(await fetchName()); }\nmain();"
      },
      {
        "question": "Why is `any` dangerous in a codebase? Replace with a safer option.",
        "hint": "any disables all checks; use unknown + narrowing.",
        "answer": "// any disables checking:\nfunction bad(x: any) { return x.foo.bar; } // no error ever\n// safer: unknown forces a guard\nfunction good(x: unknown) { return typeof x === 'object' && x !== null; }"
      }
    ],
    "interview": [
      {
        "question": "How do you type a React/async API response safely?",
        "answer": "Model it with a type/interface, treat the fetched JSON as unknown, then validate (type guard or Zod) before use. Never `as MyType` on raw fetch data — it lies at runtime."
      },
      {
        "question": "What are utility types and name three?",
        "answer": "Helpers built on generics: Partial<T> (all optional), Pick<T,K> (subset), Omit<T,K> (exclude), Readonly<T>, Record<K,V>, ReturnType<F>. They reuse one type in many shapes without duplication."
      },
      {
        "question": "strictNullChecks — what breaks and why is it worth it?",
        "answer": "null/undefined are no longer assignable everywhere, so you must handle them. It catches the classic \"cannot read property of undefined\" bugs at compile time instead of in production."
      },
      {
        "question": "How do you keep a growing TS project safe?",
        "answer": "strict on, no any (lint rule), validate at boundaries, small typed modules with explicit exports, types close to domain, and unit tests on pure functions — the compiler then guards the rest."
      }
    ]
  }
];
