module.exports = [
  {
    "id": "csharp-1",
    "title": ".NET setup & your first program",
    "level": "Beginner",
    "definition": "C# (C-sharp) is a statically-typed, object-oriented language running on .NET. You write .cs files; the compiler builds them to IL (Intermediate Language) and the .NET runtime (CLR) executes it with garbage collection.",
    "analogy": "Like ordering via a standard railway catering contract: you write the order (C#), the kitchen translator (compiler) converts it to a universal slip (IL), and every pantry car (.NET runtime) fulfils it identically.",
    "keyPoints": [
      "Install the .NET SDK; verify with `dotnet --version`; scaffold with `dotnet new console -n Hello`.",
      "Run with `dotnet run` inside the project folder; entry point is top-level statements or `static void Main()`.",
      "Statically typed: `string name = \"Asha\"; int marks = 92;` — mismatches fail at compile time.",
      "`Console.WriteLine()` prints; `Console.ReadLine()` reads text (nullable string — handle null!).",
      "Statements end with semicolons; { } braces define blocks; file-scoped namespaces keep code tidy.",
      "Top-level statements (no Main boilerplate) are the modern default for small programs."
    ],
    "basicExamples": [
      {
        "title": "Your first program",
        "code": "Console.WriteLine(\"Namaste, CodeAtlas!\");\nConsole.WriteLine(\"I am learning C#\");",
        "lineByLine": [
          {
            "line": "Console.WriteLine(\"Namaste, CodeAtlas!\");",
            "explanation": "Prints the greeting line (top-level statements: no Main needed)."
          },
          {
            "line": "Console.WriteLine(\"I am learning C#\");",
            "explanation": "Second line prints below the first."
          }
        ]
      },
      {
        "title": "Variables and types",
        "code": "string name = \"Asha\";\nint marks = 92;\ndouble average = 91.5;\nbool passed = true;\nConsole.WriteLine($\"{name} {marks} {average} {passed}\");",
        "lineByLine": [
          {
            "line": "string name = \"Asha\";",
            "explanation": "Lowercase-type aliases: string, int, double, bool."
          },
          {
            "line": "double average = 91.5;",
            "explanation": "double holds decimal numbers."
          },
          {
            "line": "Console.WriteLine($\"{name} {marks} ...\");",
            "explanation": "$-interpolation inserts values directly."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Comments and structure",
        "code": "// A comment: C# skips this line\nstring city = \"Bengaluru\"; // store the city\n\nConsole.WriteLine(city); /* prints Bengaluru */",
        "lineByLine": [
          {
            "line": "// A comment: C# skips this line",
            "explanation": "// one line; /* */ spans many; /// documents APIs."
          },
          {
            "line": "string city = \"Bengaluru\";",
            "explanation": "Fixed-type variable declaration."
          },
          {
            "line": "Console.WriteLine(city);",
            "explanation": "Confirms the stored value."
          }
        ]
      },
      {
        "title": "Reading input safely",
        "code": "Console.Write(\"Your name: \");\nstring? name = Console.ReadLine();\nConsole.WriteLine($\"Namaste, {(string.IsNullOrWhiteSpace(name) ? \"friend\" : name.Trim())}!\");",
        "lineByLine": [
          {
            "line": "string? name = Console.ReadLine();",
            "explanation": "ReadLine returns string? (may be null) — the ? is honest about it."
          },
          {
            "line": "string.IsNullOrWhiteSpace(name) ? \"friend\" : ...",
            "explanation": "Falls back to \"friend\" for empty input."
          },
          {
            "line": "name.Trim()",
            "explanation": "Removes extra spaces before greeting."
          }
        ]
      },
      {
        "title": "String interpolation and formatting",
        "code": "int marks = 92;\nConsole.WriteLine($\"Marks: {marks}/100\");\nConsole.WriteLine($\"Average: {88.567:F2}\");\nConsole.WriteLine($\"{\"Asha\",-6}|{marks,3}\");",
        "lineByLine": [
          {
            "line": "$\"Marks: {marks}/100\"",
            "explanation": "The $ prefix turns {marks} into an interpolated expression."
          },
          {
            "line": "{88.567:F2}",
            "explanation": "F2 formats to 2 decimals -> 88.57."
          },
          {
            "line": "{\"Asha\",-6}|{marks,3}",
            "explanation": "Alignment: -6 left-pads the name, 3 right-aligns the number."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Classic Main structure",
        "code": "using System;\n\nclass Program\n{\n    static void Main(string[] args)\n    {\n        string city = args.Length > 0 ? args[0] : \"Bengaluru\";\n        Console.WriteLine($\"Learning from {city}\");\n    }\n}",
        "note": "Top-level statements are sugar: large apps still use explicit Program/Main with args[] for CLI input."
      },
      {
        "title": "Project commands you will use daily",
        "code": "$ dotnet new console -n Hello\n$ dotnet run --project Hello\n$ dotnet build -c Release",
        "note": "new scaffolds, run builds+runs, build -c Release produces an optimised binary."
      }
    ],
    "practice": [
      {
        "question": "Print name, city, favourite food on three lines.",
        "hint": "Three WriteLine calls.",
        "answer": "Console.WriteLine(\"Asha\");\nConsole.WriteLine(\"Bengaluru\");\nConsole.WriteLine(\"Masala dosa\");"
      },
      {
        "question": "Store birthYear (int) and print age in 2026.",
        "hint": "Subtract from 2026.",
        "answer": "int birthYear = 2005;\nConsole.WriteLine(2026 - birthYear);"
      },
      {
        "question": "Read a name; greet \"friend\" if input is empty.",
        "hint": "IsNullOrWhiteSpace + ternary.",
        "answer": "string? n = Console.ReadLine();\nConsole.WriteLine(\"Namaste, \" + (string.IsNullOrWhiteSpace(n) ? \"friend\" : n.Trim()) + \"!\");"
      },
      {
        "question": "Fix: int x = \"5\"; — two correct versions.",
        "hint": "Literal or Parse.",
        "answer": "int x = 5;\nint y = int.Parse(\"5\");"
      }
    ],
    "interview": [
      {
        "question": "C# + .NET: how does code actually run?",
        "answer": "C# compiles to IL assemblies; the CLR JIT-compiles IL to machine code at runtime, with garbage collection, type safety and exception handling."
      },
      {
        "question": "What are top-level statements?",
        "answer": "C# 9+ sugar letting small programs skip Program/Main boilerplate — the compiler generates the entry point for you."
      },
      {
        "question": "Why is Console.ReadLine() typed string? (nullable)?",
        "answer": "It can return null (e.g. redirected input ends), so the nullable annotation forces you to handle that case."
      },
      {
        "question": "Value types vs reference types — quick version?",
        "answer": "Value types (int, struct) hold data directly and copy on assignment; reference types (string, class) hold a reference to heap data. Affects nullability, copying and performance."
      }
    ]
  },
  {
    "id": "csharp-2",
    "title": "Types, variables & operators",
    "level": "Beginner",
    "definition": "C# variables have fixed static types: value types (int, double, bool, char, decimal) hold data directly; string holds text. Operators (+, -, *, /, %, ==, &&, ||, !) compute and compare; var infers the type but never loosens it.",
    "analogy": "Like reserved train berths: an int berth fits exactly one whole-number passenger; var is the TTE reading your ticket and writing the coach name for you — the berth stays fixed, only the paperwork is automatic.",
    "keyPoints": [
      "Value types: int, long, double, decimal (money!), bool, char; reference default string for text.",
      "var city = \"X\" infers string but stays string — city = 5 afterwards fails compilation.",
      "Integer division truncates: 7 / 2 is 3; 7.0 / 2 is 3.5; 7 % 2 is the remainder 1.",
      "Use decimal (99.50m) for money, double for science — floats cannot represent 0.1 exactly.",
      "== compares values for primitives and strings (string overloads it); objects compare references unless overridden.",
      "Convert with int.Parse / double.Parse (throw on bad input) or TryParse (returns bool, no exception)."
    ],
    "basicExamples": [
      {
        "title": "Declaration styles",
        "code": "string city = \"Bengaluru\";\nint year = 2026;\nvar marks = 91.5;\nbool passed = true;\nConsole.WriteLine($\"{city} {year} {marks} {passed}\");",
        "lineByLine": [
          {
            "line": "string city = \"Bengaluru\";",
            "explanation": "Explicit type declaration."
          },
          {
            "line": "var marks = 91.5;",
            "explanation": "var infers double from the value."
          },
          {
            "line": "Console.WriteLine($\"{city} ...\");",
            "explanation": "$-string inserts each value."
          }
        ]
      },
      {
        "title": "Division trap",
        "code": "Console.WriteLine(7 / 2);\nConsole.WriteLine(7.0 / 2);\nConsole.WriteLine(7 % 2);\nConsole.WriteLine(10m / 4m);",
        "lineByLine": [
          {
            "line": "Console.WriteLine(7 / 2);",
            "explanation": "int / int truncates: 3."
          },
          {
            "line": "Console.WriteLine(7.0 / 2);",
            "explanation": "double operand: 3.5."
          },
          {
            "line": "Console.WriteLine(10m / 4m);",
            "explanation": "m suffix = decimal: exact 2.5."
          }
        ]
      },
      {
        "title": "Logic for offers",
        "code": "int bill = 1200;\nbool member = true;\nbool bigDeal = bill >= 1000 && member;\nConsole.WriteLine(bigDeal);\nConsole.WriteLine(!member);",
        "lineByLine": [
          {
            "line": "bool bigDeal = bill >= 1000 && member;",
            "explanation": "&& needs both true."
          },
          {
            "line": "Console.WriteLine(bigDeal);",
            "explanation": "Prints True."
          },
          {
            "line": "Console.WriteLine(!member);",
            "explanation": "! flips to False."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "decimal money math",
        "code": "decimal price = 99.50m;\nint qty = 3;\ndecimal total = price * qty;\nConsole.WriteLine($\"Total: Rs.{total}\");",
        "lineByLine": [
          {
            "line": "decimal price = 99.50m;",
            "explanation": "m makes it decimal — exact for money."
          },
          {
            "line": "decimal total = price * qty;",
            "explanation": "int promotes safely into the multiplication."
          },
          {
            "line": "$\"Total: Rs.{total}\"",
            "explanation": "Interpolates the exact total."
          }
        ]
      },
      {
        "title": "TryParse without crashes",
        "code": "Console.Write(\"Age: \");\nstring? text = Console.ReadLine();\nif (int.TryParse(text, out int age))\n    Console.WriteLine($\"Next year: {age + 1}\");\nelse\n    Console.WriteLine(\"That is not a number\");",
        "lineByLine": [
          {
            "line": "int.TryParse(text, out int age)",
            "explanation": "Returns true + sets age on success; no exception ever."
          },
          {
            "line": "$\"Next year: {age + 1}\"",
            "explanation": "Success branch uses the parsed value."
          },
          {
            "line": "else ... \"not a number\"",
            "explanation": "Failure branch guides the user."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Parse vs TryParse vs Convert",
        "code": "Console.WriteLine(int.Parse(\"42\"));\nbool ok = int.TryParse(\"five\", out int n);\nConsole.WriteLine($\"{ok} {n}\");\nConsole.WriteLine(Convert.ToInt32(null));",
        "note": "Parse throws; TryParse reports bool; Convert tolerates null (returns 0) — pick by how much you trust the input."
      },
      {
        "title": "Checked arithmetic",
        "code": "checked\n{\n    int max = int.MaxValue;\n    // max++; // OverflowException instead of silent wrap\n    Console.WriteLine(max);\n}",
        "note": "checked blocks turn silent integer wrap-around into loud exceptions — enable for billing/safety code."
      }
    ],
    "practice": [
      {
        "question": "Store price 49.99m and qty 4; print the total.",
        "hint": "decimal multiplication.",
        "answer": "decimal price = 49.99m;\nint qty = 4;\nConsole.WriteLine(price * qty); // 199.96"
      },
      {
        "question": "Show 5/2 vs 5.0/2 and explain the outputs.",
        "hint": "int division truncates.",
        "answer": "Console.WriteLine(5 / 2);   // 2\nConsole.WriteLine(5.0 / 2); // 2.5"
      },
      {
        "question": "Read age text; print age+1 or \"bad input\" — no crash.",
        "hint": "TryParse + if/else.",
        "answer": "string? t = Console.ReadLine();\nif (int.TryParse(t, out int a)) Console.WriteLine(a + 1);\nelse Console.WriteLine(\"bad input\");"
      },
      {
        "question": "Fix `var x = \"hi\"; x = 5;` and explain.",
        "hint": "var fixes the inferred type at declaration.",
        "answer": "var x = \"hi\"; // x is string forever\n// x = 5; // ERROR\nx = \"bye\"; // fine"
      }
    ],
    "interview": [
      {
        "question": "var: dynamic typing or not? Explain.",
        "answer": "Fully static: var only skips WRITING the type; the compiler infers and locks it. x = \"hi\" then x = 5 fails. True dynamic behaviour needs the dynamic keyword."
      },
      {
        "question": "double vs decimal — which for money?",
        "answer": "decimal (base-10 exact, 28 digits) for money; double (binary, fast) for science/graphics. 0.1 + 0.2 != 0.3 in double — unacceptable in billing."
      },
      {
        "question": "Parse vs TryParse vs Convert?",
        "answer": "Parse: throws FormatException on bad input. TryParse: returns false, no throw — best for user input. Convert: null-tolerant (null -> 0). Never Parse raw user input."
      },
      {
        "question": "Value type vs reference type — quick version?",
        "answer": "Value types (int, struct) store data inline and copy on assignment; reference types (string, class) store a heap address and share. Affects nullability, copying cost and == behaviour."
      }
    ]
  },
  {
    "id": "csharp-3",
    "title": "Conditions, loops & arrays",
    "level": "Beginner",
    "definition": "if/else and switch choose paths; for, while and foreach repeat work; arrays (int[]) store fixed-size sequences by index. Together they solve most beginner programs before collections arrive.",
    "analogy": "Like a school assembly line: if it rains shift indoors else stay out (condition); the teacher repeats instructions row by row (loop); the class register is a fixed 60-slot array where slot 0 is the first student.",
    "keyPoints": [
      "if / else if / else runs the first true branch; switch matches one value against case labels.",
      "for (int i = 0; i < n; i++) counts exactly; foreach (var x in arr) walks values directly.",
      "while checks before each round; do-while runs once first - both need progress toward exit.",
      "Arrays: int[] a = new int[5]; indexes 0..4; a.Length gives size; index 5 throws.",
      "break exits the loop; continue skips to the next round; both pair with if.",
      "Compare strings with == (overloaded for content) but watch nulls: use \"Sun\".Equals(day) style or string.Equals."
    ],
    "basicExamples": [
      {
        "title": "Grade with if else",
        "code": "int marks = 72;\nstring grade;\nif (marks >= 90) grade = \"A\";\nelse if (marks >= 60) grade = \"B\";\nelse grade = \"C\";\nConsole.WriteLine(grade);",
        "lineByLine": [
          {
            "line": "int marks = 72;",
            "explanation": "Score to classify."
          },
          {
            "line": "if (marks >= 90) grade = \"A\";",
            "explanation": "Fails for 72; next branch tried."
          },
          {
            "line": "else if (marks >= 60) grade = \"B\";",
            "explanation": "Passes: grade is B."
          }
        ]
      },
      {
        "title": "Counting with for",
        "code": "int total = 0;\nfor (int i = 1; i <= 5; i++)\n    total += i;\nConsole.WriteLine(total);",
        "lineByLine": [
          {
            "line": "int total = 0;",
            "explanation": "Accumulator."
          },
          {
            "line": "for (int i = 1; i <= 5; i++)",
            "explanation": "i runs 1..5, then stops."
          },
          {
            "line": "total += i;",
            "explanation": "Adds each i: ends at 15."
          }
        ]
      },
      {
        "title": "Arrays by index",
        "code": "int[] marks = { 92, 78, 85 };\nConsole.WriteLine(marks[0]);\nConsole.WriteLine(marks.Length);\nmarks[1] = 80;\nConsole.WriteLine(marks[1]);",
        "lineByLine": [
          {
            "line": "int[] marks = { 92, 78, 85 };",
            "explanation": "Array of 3 ints, indexes 0..2."
          },
          {
            "line": "Console.WriteLine(marks[0]);",
            "explanation": "First element: 92."
          },
          {
            "line": "marks[1] = 80;",
            "explanation": "Arrays are mutable: slot 1 updated."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "foreach walk",
        "code": "string[] cities = { \"Mumbai\", \"Pune\", \"Delhi\" };\nforeach (var c in cities)\n    Console.WriteLine($\"Namaste, {c}\");",
        "lineByLine": [
          {
            "line": "string[] cities = {...};",
            "explanation": "Array of 3 city names."
          },
          {
            "line": "foreach (var c in cities)",
            "explanation": "c takes each value; no index needed."
          },
          {
            "line": "$\"Namaste, {c}\"",
            "explanation": "Greets each city."
          }
        ]
      },
      {
        "title": "switch on day",
        "code": "string day = \"Sun\";\nswitch (day)\n{\n    case \"Sat\":\n    case \"Sun\":\n        Console.WriteLine(\"Weekend\");\n        break;\n    default:\n        Console.WriteLine(\"Weekday\");\n        break;\n}",
        "lineByLine": [
          {
            "line": "case \"Sat\": case \"Sun\":",
            "explanation": "Stacked cases share one branch."
          },
          {
            "line": "break;",
            "explanation": "Stops fall-through into default."
          },
          {
            "line": "default:",
            "explanation": "Catches every other value."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "break and continue",
        "code": "for (int token = 1; token <= 10; token++)\n{\n    if (token == 4) continue;\n    if (token == 7) break;\n    Console.Write(token + \" \");\n}",
        "note": "Skips 4, stops at 7: prints 1 2 3 5 6 - the filtering pattern."
      },
      {
        "title": "2D seating chart",
        "code": "int[,] seats = { { 1, 0 }, { 1, 1 }, { 0, 1 } };\nfor (int r = 0; r < seats.GetLength(0); r++)\n{\n    for (int c = 0; c < seats.GetLength(1); c++)\n        Console.Write(seats[r, c] + \" \");\n    Console.WriteLine();\n}",
        "note": "Nested loops walk rows then columns with GetLength(dim) bounds - the matrix pattern."
      }
    ],
    "practice": [
      {
        "question": "Print even numbers 2..20 with for.",
        "hint": "Step i += 2.",
        "answer": "for (int i = 2; i <= 20; i += 2) Console.WriteLine(i);"
      },
      {
        "question": "Find the max of an int array.",
        "hint": "Track best across foreach.",
        "answer": "int[] a = { 4, 9, 2 };\nint best = a[0];\nforeach (var x in a) if (x > best) best = x;\nConsole.WriteLine(best);"
      },
      {
        "question": "Count down 5..1 with while, then Blast.",
        "hint": "Decrement inside.",
        "answer": "int n = 5;\nwhile (n > 0) { Console.WriteLine(n); n--; }\nConsole.WriteLine(\"Blast\");"
      },
      {
        "question": "Map 1/2/else to Veg/Non-veg/Invalid with switch.",
        "hint": "int switch with default.",
        "answer": "int c = 2;\nswitch (c) {\n    case 1: Console.WriteLine(\"Veg\"); break;\n    case 2: Console.WriteLine(\"Non-veg\"); break;\n    default: Console.WriteLine(\"Invalid\"); break;\n}"
      }
    ],
    "interview": [
      {
        "question": "for vs foreach vs while?",
        "answer": "for: need index or mutation. foreach: read every value simply (read-only over the enumerator). while: unknown rounds like reading until EOF."
      },
      {
        "question": "What happens at marks[5] on 3 elements?",
        "answer": "IndexOutOfRangeException at runtime. Arrays are fixed-size: check i < arr.Length, or use List<T> for growth."
      },
      {
        "question": "Why does switch need break?",
        "answer": "Without it execution falls through into the next case. Stacked labels share intentionally; otherwise missing break is a bug - switch expressions (=>) avoid it."
      },
      {
        "question": "== on strings - safe?",
        "answer": "Yes for content: string overloads == for value comparison (handles nulls safely too). For objects generally == means reference unless overloaded."
      }
    ]
  },
  {
    "id": "csharp-4",
    "title": "Methods, parameters & overloading",
    "level": "Beginner",
    "definition": "Methods package behaviour inside classes. Parameters supply input, return supplies output, and overloads give the same name different parameter shapes. Optional parameters and out variables handle common variations.",
    "analogy": "Like a canteen counter with one order window: regular meals, mini meals, and parcel orders all use the same window but different slips. Overloads are those slips, each complete in its own way.",
    "keyPoints": [
      "Define with access, return, name, and parameters: static int Add(int a, int b).",
      "Call with position or names: Add(4, 6) or Add(b: 6, a: 4).",
      "Return exits immediately; every path in a non-void method must return a value.",
      "Overloads differ by parameter count or types, not by return type alone.",
      "Optional parameters need defaults and must come last: Fee(int age = 10).",
      "Use out for extra results: TryGet(name, out marks) returns success plus value."
    ],
    "basicExamples": [
      {
        "title": "Static helper",
        "code": "static int Add(int a, int b)\n{\n    return a + b;\n}\nConsole.WriteLine(Add(4, 6));",
        "lineByLine": [
          {
            "line": "static int Add(int a, int b)",
            "explanation": "Takes two ints and promises an int."
          },
          {
            "line": "return a + b;",
            "explanation": "Sends the sum back."
          },
          {
            "line": "Add(4, 6)",
            "explanation": "Prints 10."
          }
        ]
      },
      {
        "title": "Overloads",
        "code": "static int Area(int s) => s * s;\nstatic int Area(int l, int b) => l * b;\nConsole.WriteLine(Area(5));\nConsole.WriteLine(Area(5, 3));",
        "lineByLine": [
          {
            "line": "Area(int s)",
            "explanation": "Square form with one parameter."
          },
          {
            "line": "Area(int l, int b)",
            "explanation": "Rectangle form with two parameters."
          },
          {
            "line": "Area(5, 3)",
            "explanation": "Compiler selects rectangle and prints 15."
          }
        ]
      },
      {
        "title": "Optional parameter",
        "code": "static int Fee(int age = 10)\n{\n    return age < 5 ? 0 : 100;\n}\nConsole.WriteLine(Fee());\nConsole.WriteLine(Fee(3));",
        "lineByLine": [
          {
            "line": "Fee(int age = 10)",
            "explanation": "Missing callers get age 10."
          },
          {
            "line": "Fee()",
            "explanation": "Uses default and prints 100."
          },
          {
            "line": "Fee(3)",
            "explanation": "Supplied age prints 0."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "out result",
        "code": "if (int.TryParse(\"21\", out int age))\n{\n    Console.WriteLine(age + 1);\n}\nelse\n{\n    Console.WriteLine(\"bad input\");\n}",
        "lineByLine": [
          {
            "line": "TryParse(..., out int age)",
            "explanation": "Declares age inline while parsing."
          },
          {
            "line": "True branch",
            "explanation": "Uses valid age and prints 22."
          },
          {
            "line": "False branch",
            "explanation": "Explains invalid input without exceptions."
          }
        ]
      },
      {
        "title": "Named arguments",
        "code": "static string Ticket(string name, int age)\n{\n    return $\"{name}:{age}\";\n}\nConsole.WriteLine(Ticket(age: 21, name: \"Asha\"));",
        "lineByLine": [
          {
            "line": "Ticket(string name, int age)",
            "explanation": "Two-parameter method."
          },
          {
            "line": "age: 21, name: ...",
            "explanation": "Names allow any order."
          },
          {
            "line": "Result",
            "explanation": "Prints Asha:21."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Params array",
        "code": "static int Total(params int[] nums)\n{\n    int s = 0;\n    foreach (int n in nums) s += n;\n    return s;\n}\nConsole.WriteLine(Total(40, 60, 20));",
        "note": "params collects any number of arguments into one array without overloads."
      },
      {
        "title": "Expression-bodied method",
        "code": "static string Band(int m) => m >= 90 ? \"A\" : m >= 60 ? \"B\" : \"C\";\nConsole.WriteLine(Band(72));",
        "note": "The => form suits one-expression methods and keeps simple mappings compact."
      }
    ],
    "practice": [
      {
        "question": "Write Square(n) returning n*n; test 7.",
        "hint": "Static int method.",
        "answer": "static int Square(int n) => n * n;\nConsole.WriteLine(Square(7));"
      },
      {
        "question": "Overload Greet(): guest default and Greet(name).",
        "hint": "Two signatures.",
        "answer": "static string Greet() => Greet(\"guest\");\nstatic string Greet(string n) => $\"Namaste, {n}\";"
      },
      {
        "question": "Max(a,b) returning the larger value.",
        "hint": "Ternary inside.",
        "answer": "static int Max(int a, int b) => a > b ? a : b;\nConsole.WriteLine(Max(4, 9));"
      },
      {
        "question": "Why must all paths return?",
        "hint": "Compiler checks non-void methods.",
        "answer": "static int F(bool ok)\n{\n    if (ok) return 1;\n    return 0;\n}"
      }
    ],
    "interview": [
      {
        "question": "Static versus instance methods?",
        "answer": "Static belongs to the type and needs no object; instance works on object fields through this. Stateless helpers go static, stateful behaviour goes instance."
      },
      {
        "question": "How are overloads resolved?",
        "answer": "By parameter count and types at compile time. Return type alone cannot distinguish them, and ambiguous calls fail compilation."
      },
      {
        "question": "Optional parameters versus overloads?",
        "answer": "Optional parameters suit small defaults; overloads suit genuinely different shapes or behaviour. Too many optionals make calls hard to read."
      },
      {
        "question": "What does out do?",
        "answer": "It lets a method return an extra value through a parameter. Callers declare the variable inline, and the method must assign it before returning."
      }
    ]
  },
  {
    "id": "csharp-5",
    "title": "Collections, LINQ & generics",
    "level": "Intermediate",
    "definition": "List<T> is the resizable typed array; Dictionary<K,V> maps keys to values; HashSet<T> holds uniques. LINQ (Where, Select, OrderBy, Sum) queries any collection declaratively; generics (List<T>, methods with <T>) reuse logic across types safely.",
    "analogy": "Like a ration shop ledger: List<T> is the growing item register; Dictionary is the card-number-to-family map; HashSet is the unique-token bowl; LINQ is the clerk answering in plain words - all bills above 500, sorted, totalled - without you counting pages.",
    "keyPoints": [
      "List<string> cart = new() { \"idli\", \"dosa\" }; cart.Add(\"vada\"); cart[0]; cart.Count.",
      "Dictionary<string,int> price = new() { [\"idli\"] = 30 }; TryGetValue avoids KeyNotFoundException.",
      "HashSet<string> seen dedups and tests membership fast; handy for visitedIds.",
      "LINQ: marks.Where(m => m >= 40).OrderBy(m => m).ToList(); Select transforms; Sum/Average aggregate.",
      "Deferred execution: queries run when enumerated - ToList() snapshots results now.",
      "Generics: T First<T>(List<T> xs) works for any type with full compile-time safety."
    ],
    "basicExamples": [
      {
        "title": "List basics",
        "code": "var cart = new List<string> { \"idli\", \"dosa\" };\ncart.Add(\"vada\");\nConsole.WriteLine(cart.Count + \" \" + cart[0]);\nforeach (var item in cart) Console.WriteLine(item);",
        "lineByLine": [
          {
            "line": "var cart = new List<string> { \"idli\", \"dosa\" };",
            "explanation": "Resizable list locked to strings."
          },
          {
            "line": "cart.Add(\"vada\");",
            "explanation": "Grows by one at the end."
          },
          {
            "line": "foreach (var item in cart)",
            "explanation": "Walks each value cleanly."
          }
        ]
      },
      {
        "title": "Dictionary lookups",
        "code": "var price = new Dictionary<string, int> { [\"idli\"] = 30, [\"dosa\"] = 60 };\nif (price.TryGetValue(\"vada\", out int p))\n    Console.WriteLine(p);\nelse\n    Console.WriteLine(\"not on menu\");",
        "lineByLine": [
          {
            "line": "var price = new Dictionary...",
            "explanation": "Maps dish names to prices."
          },
          {
            "line": "price.TryGetValue(\"vada\", out int p)",
            "explanation": "Safe read: false + p=0 when missing."
          },
          {
            "line": "else Console.WriteLine(\"not on menu\");",
            "explanation": "No exception, graceful message."
          }
        ]
      },
      {
        "title": "First LINQ query",
        "code": "using System.Linq;\nvar marks = new List<int> { 22, 78, 91, 35 };\nvar passed = marks.Where(m => m >= 40).ToList();\nConsole.WriteLine(string.Join(\", \", passed));",
        "lineByLine": [
          {
            "line": "using System.Linq;",
            "explanation": "Unlocks the query operators."
          },
          {
            "line": "marks.Where(m => m >= 40)",
            "explanation": "Keeps only passing marks."
          },
          {
            "line": ".ToList()",
            "explanation": "Runs the query into a new list: 78, 91."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Select transform",
        "code": "using System.Linq;\nvar words = new List<string> { \"idli\", \"dosa\" };\nvar loud = words.Select(w => w.ToUpper()).ToList();\nConsole.WriteLine(string.Join(\" \", loud));",
        "lineByLine": [
          {
            "line": "words.Select(w => w.ToUpper())",
            "explanation": "Transforms each item to uppercase."
          },
          {
            "line": ".ToList()",
            "explanation": "Materialises: IDLI DOSA."
          }
        ]
      },
      {
        "title": "OrderBy and Sum",
        "code": "using System.Linq;\nvar marks = new List<int> { 78, 22, 91 };\nConsole.WriteLine(marks.Sum());\nConsole.WriteLine(string.Join(\", \", marks.OrderBy(m => m)));",
        "lineByLine": [
          {
            "line": "marks.Sum()",
            "explanation": "Aggregates: 191."
          },
          {
            "line": "marks.OrderBy(m => m)",
            "explanation": "Sorts ascending: 22, 78, 91."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "GroupBy report",
        "code": "using System.Linq;\nvar marks = new List<int> { 22, 78, 91, 35, 88 };\nvar bands = marks.GroupBy(m => m >= 60 ? \"pass+\" : \"low\");\nforeach (var g in bands) Console.WriteLine(g.Key + \": \" + g.Count());",
        "note": "GroupBy buckets items by key: pass+: 3, low: 2 - one-line reports."
      },
      {
        "title": "Generic helper",
        "code": "T First<T>(List<T> xs) => xs[0];\nConsole.WriteLine(First(new List<int> { 7, 8 }));\nConsole.WriteLine(First(new List<string> { \"a\", \"b\" }));",
        "note": "One method serves every type; the compiler stamps a type-safe copy per T."
      }
    ],
    "practice": [
      {
        "question": "Filter marks >= 40 into a new list with LINQ.",
        "hint": "Where + ToList.",
        "answer": "var p = marks.Where(m => m >= 40).ToList();"
      },
      {
        "question": "Uppercase every word via Select.",
        "hint": "Transform then join.",
        "answer": "var u = words.Select(w => w.ToUpper()).ToList();"
      },
      {
        "question": "Sum a List<int> of bills.",
        "hint": "Sum().",
        "answer": "Console.WriteLine(bills.Sum());"
      },
      {
        "question": "Read unknown key without crashing.",
        "hint": "TryGetValue pattern.",
        "answer": "if (price.TryGetValue(k, out int v)) Console.WriteLine(v);"
      }
    ],
    "interview": [
      {
        "question": "List<T> vs array vs IEnumerable<T>?",
        "answer": "array: fixed, fastest index. List<T>: resizable with methods. IEnumerable<T>: read-forward sequence (often lazy LINQ) - pick by growth and laziness needs."
      },
      {
        "question": "What is deferred execution?",
        "answer": "LINQ builds the query now but runs it on enumeration, seeing latest data. Surprises stale readers and repeats work - ToList() when you need a snapshot."
      },
      {
        "question": "Dictionary lookup complexity?",
        "answer": "Average O(1) via hashing; worst O(n) on pathological collisions. Needs correct GetHashCode/Equals on custom keys."
      },
      {
        "question": "Why generics over object lists?",
        "answer": "Type safety at compile time, no casting, no boxing for value types - List<int> beats ArrayList on all three."
      }
    ]
  },
  {
    "id": "csharp-6",
    "title": "OOP: classes, objects & properties",
    "level": "Intermediate",
    "definition": "Classes blueprint objects: fields store data, properties guard access with get/set, constructors initialise, methods act. Objects (new Student()) carry their own state and behaviour.",
    "analogy": "Like an Aadhaar enrolment form: the blank form (class) defines fields, each filled card (object) holds one person’s data, the officer window (property) checks values before stamping, and the queue token (constructor) starts every card correctly.",
    "keyPoints": [
      "class Student { } blueprints; new Student() builds an object with its own field copies.",
      "Constructors (public Student(name)) run at creation; chain with : this(...) for defaults.",
      "Properties expose guarded access: public int Marks { get; private set; } reads freely, writes inside only.",
      "Auto-properties { get; set; } for plain data; full properties with backing fields for validation.",
      "static belongs to the class itself (Math.PI, counters); instance members belong to each object.",
      "Records (record Student(name, marks)) give tiny immutable data types with equality built in."
    ],
    "basicExamples": [
      {
        "title": "Class and object",
        "code": "class Student {\n  public string Name;\n  public int Marks;\n}\nvar s = new Student();\ns.Name = \"Asha\";\ns.Marks = 92;\nConsole.WriteLine($\"{s.Name}: {s.Marks}\");",
        "lineByLine": [
          {
            "line": "class Student {",
            "explanation": "Blueprint with two public fields."
          },
          {
            "line": "var s = new Student();",
            "explanation": "Builds one object from the blueprint."
          },
          {
            "line": "s.Name = \"Asha\";",
            "explanation": "Each object holds its own copies."
          }
        ]
      },
      {
        "title": "Constructor",
        "code": "class Student {\n  public string Name;\n  public Student(string name) { Name = name; }\n}\nvar s = new Student(\"Ravi\");\nConsole.WriteLine(s.Name);",
        "lineByLine": [
          {
            "line": "public Student(string name) { Name = name; }",
            "explanation": "Runs at creation; forces a name."
          },
          {
            "line": "var s = new Student(\"Ravi\");",
            "explanation": "Object starts valid - no empty state."
          }
        ]
      },
      {
        "title": "Guarded property",
        "code": "class Bill {\n  private int amount;\n  public int Amount {\n    get { return amount; }\n    set { if (value >= 0) amount = value; }\n  }\n}",
        "lineByLine": [
          {
            "line": "private int amount;",
            "explanation": "Backing field hidden from outsiders."
          },
          {
            "line": "get { return amount; }",
            "explanation": "Reading always allowed."
          },
          {
            "line": "set { if (value >= 0) ... }",
            "explanation": "Negative bills silently rejected."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Auto-property",
        "code": "class City {\n  public string Name { get; set; } = \"Pune\";\n  public int Pin { get; init; }\n}\nvar c = new City { Pin = 411001 };\nConsole.WriteLine($\"{c.Name} {c.Pin}\");",
        "lineByLine": [
          {
            "line": "public string Name { get; set; } = \"Pune\";",
            "explanation": "Plain data with a default, zero boilerplate."
          },
          {
            "line": "public int Pin { get; init; }",
            "explanation": "init allows setting only during creation."
          },
          {
            "line": "new City { Pin = 411001 }",
            "explanation": "Object initializer sets both neatly."
          }
        ]
      },
      {
        "title": "Static counter",
        "code": "class Token {\n  public static int Next = 1;\n  public int No;\n  public Token() { No = Next++; }\n}\nvar a = new Token();\nvar b = new Token();\nConsole.WriteLine($\"{a.No} {b.No}\");",
        "lineByLine": [
          {
            "line": "public static int Next = 1;",
            "explanation": "ONE copy shared by all tokens."
          },
          {
            "line": "No = Next++;",
            "explanation": "Each object grabs the next number."
          },
          {
            "line": "Console.WriteLine($\"{a.No} {b.No}\");",
            "explanation": "Prints 1 2."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Record in one line",
        "code": "record Student(string Name, int Marks);\nvar s1 = new Student(\"Asha\", 92);\nvar s2 = s1 with { Marks = 95 };\nConsole.WriteLine($\"{s1 == s2} {s2.Marks}\");",
        "note": "Records compare BY VALUE and copy with `with` - perfect for DTOs, events and test data."
      },
      {
        "title": "Validated full property",
        "code": "class Marks {\n  private int score;\n  public int Score {\n    get => score;\n    set => score = (value >= 0 && value <= 100)\n      ? value : throw new ArgumentOutOfRangeException();\n  }\n}",
        "note": "Invalid writes throw LOUDLY at the boundary instead of corrupting data silently downstream."
      }
    ],
    "practice": [
      {
        "question": "Book class with Title and Price; print both for one object.",
        "hint": "Fields plus new plus WriteLine.",
        "answer": "class Book {\n  public string Title;\n  public decimal Price;\n}\nvar b = new Book();\nb.Title = \"Wings of Fire\";\nb.Price = 350m;\nConsole.WriteLine($\"{b.Title} Rs.{b.Price}\");"
      },
      {
        "question": "Add a constructor forcing Title; create with one line.",
        "hint": "Constructor with parameter.",
        "answer": "class Book {\n  public string Title;\n  public Book(string title) { Title = title; }\n}\nvar b = new Book(\"Gitanjali\");\nConsole.WriteLine(b.Title);"
      },
      {
        "question": "Age property rejecting negatives; test with -5 and 21.",
        "hint": "Guarded setter.",
        "answer": "class Person {\n  private int age;\n  public int Age {\n    get { return age; }\n    set { if (value >= 0) age = value; }\n  }\n}\nvar p = new Person();\np.Age = -5;\np.Age = 21;\nConsole.WriteLine(p.Age);"
      },
      {
        "question": "Why do two objects share one static count? Explain.",
        "hint": "static lives on the class, not objects.",
        "answer": "class Token { public static int Next = 1; }\n// Token.Next is ONE slot; every object reads and writes the same slot"
      }
    ],
    "interview": [
      {
        "question": "Field vs property vs auto-property?",
        "answer": "Field: raw storage. Property: guarded gate with logic. Auto-property: shorthand when no logic is needed yet - upgrade later without breaking callers."
      },
      {
        "question": "Why validate inside the setter?",
        "answer": "The object defends its own rules at the boundary, so no caller can sneak in bad data. Fail fast with exceptions, not silent corruption."
      },
      {
        "question": "static vs instance - memory picture?",
        "answer": "Instance: one copy per object on the heap. static: one copy on the type itself for the app lifetime. Counters and factories live static; personal data lives instance."
      },
      {
        "question": "class vs record vs struct?",
        "answer": "class: reference, mutable, identity equality. record: reference, value equality, with-copies. struct: value type, copied on assignment - small immutable values only."
      }
    ]
  },
  {
    "id": "csharp-7",
    "title": "Inheritance & polymorphism",
    "level": "Intermediate",
    "definition": "Inheritance lets a class reuse and extend a base class: Derived : Base. Polymorphism lets a base reference hold derived objects, and virtual/override methods pick the derived behaviour at runtime.",
    "analogy": "Like a family tiffin business passed to the next generation: the child inherits the recipe book (base fields/methods) and adds new dishes, but a customer who ordered the family \"Special\" gets the child’s improved version automatically - same order, upgraded plate.",
    "keyPoints": [
      "Declare with : Base - a single base class plus any number of interfaces.",
      "base(...) calls the parent constructor; base.Method() calls the parent method.",
      "Mark base methods virtual and derived ones override to swap behaviour at runtime.",
      "Every class ultimately derives from object, so ToString/Equals are always available.",
      "Prefer composition over deep inheritance chains; more than 2 levels is a smell.",
      "sealed stops further inheritance; protected exposes members to derived classes only."
    ],
    "basicExamples": [
      {
        "title": "Inherit and extend",
        "code": "class Account\n{\n    public decimal Balance { get; set; }\n    public void Deposit(decimal amt) => Balance += amt;\n}\nclass Savings : Account\n{\n    public void AddInterest() => Balance *= 1.04m;\n}\nvar s = new Savings();\ns.Deposit(1000);\ns.AddInterest();\nConsole.WriteLine(s.Balance);",
        "lineByLine": [
          {
            "line": "class Savings : Account",
            "explanation": "Savings inherits everything Account has."
          },
          {
            "line": "s.Deposit(1000);",
            "explanation": "The inherited method works unchanged."
          },
          {
            "line": "s.AddInterest();",
            "explanation": "The new method boosts the balance by 4%."
          }
        ]
      },
      {
        "title": "virtual + override",
        "code": "class Shape\n{\n    public virtual double Area() => 0;\n}\nclass Square : Shape\n{\n    public double Side { get; set; }\n    public override double Area() => Side * Side;\n}\nShape sh = new Square { Side = 5 };\nConsole.WriteLine(sh.Area());",
        "lineByLine": [
          {
            "line": "public virtual double Area()",
            "explanation": "Marks the base for replacement."
          },
          {
            "line": "public override double Area()",
            "explanation": "Square supplies its own formula."
          },
          {
            "line": "Shape sh = new Square { Side = 5 };",
            "explanation": "Base reference, derived object - picks the override."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "base constructor",
        "code": "class Person\n{\n    public Person(string name) => Name = name;\n    public string Name { get; init; }\n}\nclass Student : Person\n{\n    public Student(string name) : base(name) { }\n    public int Marks { get; init; }\n}\nvar st = new Student(\"Asha\") { Marks = 92 };\nConsole.WriteLine($\"{st.Name} {st.Marks}\");",
        "lineByLine": [
          {
            "line": "public Student(string name) : base(name) { }",
            "explanation": "Forwards name to the parent constructor."
          },
          {
            "line": "public int Marks { get; init; }",
            "explanation": "Adds a student-only field."
          },
          {
            "line": "Console.WriteLine(...)",
            "explanation": "Prints \"Asha 92\"."
          }
        ]
      },
      {
        "title": "Polymorphic list",
        "code": "Shape[] shapes = { new Square { Side = 3 }, new Circle { R = 2 } };\nforeach (var sh in shapes)\n    Console.WriteLine(sh.Area().ToString(\"F1\"));",
        "lineByLine": [
          {
            "line": "Shape[] shapes = { ... }",
            "explanation": "Mixed types under one array."
          },
          {
            "line": "foreach (var sh in shapes)",
            "explanation": "Each item calls its OWN Area()."
          },
          {
            "line": "Console.WriteLine(...)",
            "explanation": "9.0 then 12.6 - no casting needed."
          }
        ]
      },
      {
        "title": "sealed and abstract members",
        "code": "abstract class Shape {\n    public abstract double Area();\n    public void Describe() => Console.WriteLine($\"Area = {Area()}\");\n}\nsealed class Circle : Shape {\n    double r;\n    public Circle(double r) { this.r = r; }\n    public override double Area() => Math.PI * r * r;\n}",
        "lineByLine": [
          {
            "line": "abstract class Shape",
            "explanation": "Cannot be instantiated directly - a template for subclasses."
          },
          {
            "line": "public abstract double Area();",
            "explanation": "No body: every subclass MUST provide it."
          },
          {
            "line": "sealed class Circle",
            "explanation": "sealed forbids further inheritance - a final class."
          },
          {
            "line": "public override double Area()",
            "explanation": "Provides the required implementation."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Sealed and protected",
        "code": "sealed class Admin : Person\n{\n    protected int Level { get; init; }\n    public string Badge() => $\"{Name}-L{Level}\";\n}\n// class SubAdmin : Admin {} // ERROR: cannot inherit a sealed class",
        "note": "sealed protects a finished design; protected keeps internals invisible to outside callers."
      },
      {
        "title": "Composition over inheritance",
        "code": "class Engine { public void Start() { } }\nclass Car\n{\n    private readonly Engine _engine = new();\n    public void Drive() => _engine.Start();\n}",
        "note": "Car HAS-A Engine instead of BEING-A Engine - flexible, no fragile base-class coupling."
      }
    ],
    "practice": [
      {
        "question": "Make Dog : Animal with an overridden Speak returning Woof.",
        "hint": "virtual base + override.",
        "answer": "class Animal { public virtual string Speak() => \"...\"; }\nclass Dog : Animal { public override string Speak() => \"Woof\"; }"
      },
      {
        "question": "Call the base constructor from a derived class with an extra field.",
        "hint": ": base(...) forwarding.",
        "answer": "class Employee : Person\n{\n    public Employee(string n, int id) : base(n) => Id = id;\n    public int Id { get; }\n}"
      },
      {
        "question": "Store Square and Circle in a Shape[]; print each area.",
        "hint": "virtual/override polymorphism.",
        "answer": "Shape[] a = { new Square { Side = 3 }, new Circle { R = 2 } };\nforeach (var s in a) Console.WriteLine(s.Area());"
      },
      {
        "question": "Why does hiding (new) differ from override?",
        "hint": "new shadows; override replaces the slot.",
        "answer": "// override -> base ref calls derived version\n// new -> base ref calls base version (compiler warning if base was virtual)"
      }
    ],
    "interview": [
      {
        "question": "override vs new (method hiding)?",
        "answer": "override replaces the base implementation for ALL references (virtual dispatch). new just hides it for the derived type only; a base reference still calls the base version - a classic foot-gun."
      },
      {
        "question": "Why favour composition over inheritance?",
        "answer": "Deep hierarchies create fragile base-class problems - a base change ripples everywhere. Composed behaviour is swappable at runtime and far easier to test."
      },
      {
        "question": "What does every class inherit implicitly?",
        "answer": "object, giving ToString/Equals/GetHashCode/GetType. Override ToString for readable output and Equals for value equality."
      },
      {
        "question": "Can you inherit from multiple classes?",
        "answer": "No single implementation inheritance in C# - one class base only. Multiple interfaces can be implemented, which is how multiple-type behaviour is achieved."
      }
    ]
  },
  {
    "id": "csharp-8",
    "title": "Interfaces, exceptions & files",
    "level": "Intermediate",
    "definition": "Interfaces declare contracts (what) that classes implement (how). Exceptions signal failures through try/catch/finally, and using plus File/StreamReader handle files and clean resource release.",
    "analogy": "Like a government form scheme: the interface is the blank printed form every office must fill (same fields), each department is a class filling it differently. try/catch is the enquiry counter catching rejected forms, and using is the staff auto-returning your file after processing.",
    "keyPoints": [
      "interface IShape { double Area(); } - pure contract, no fields, all public by default.",
      "A class can implement many interfaces - the C# answer to multiple inheritance.",
      "try runs risky code, catch handles specific exceptions, finally always runs (cleanup).",
      "Throw precise exceptions: ArgumentNullException, InvalidOperationException - not bare Exception.",
      "using var f = ... disposes the resource automatically even on exceptions (IDisposable).",
      "Let exceptions bubble with useful messages; catch only what you can genuinely handle."
    ],
    "basicExamples": [
      {
        "title": "Define and implement an interface",
        "code": "interface IGreeter { string Greet(string name); }\nclass Host : IGreeter\n{\n    public string Greet(string name) => $\"Namaste, {name}!\";\n}\nIGreeter g = new Host();\nConsole.WriteLine(g.Greet(\"Asha\"));",
        "lineByLine": [
          {
            "line": "interface IGreeter { string Greet(string name); }",
            "explanation": "Declares the contract only."
          },
          {
            "line": "class Host : IGreeter",
            "explanation": "Promises to implement Greet."
          },
          {
            "line": "public string Greet(...)",
            "explanation": "Supplies the actual behaviour."
          }
        ]
      },
      {
        "title": "try/catch",
        "code": "try\n{\n    int age = int.Parse(\"abc\");\n}\ncatch (FormatException ex)\n{\n    Console.WriteLine(\"Bad input: \" + ex.Message);\n}\nfinally\n{\n    Console.WriteLine(\"Always runs\");\n}",
        "lineByLine": [
          {
            "line": "int age = int.Parse(\"abc\");",
            "explanation": "Throws FormatException."
          },
          {
            "line": "catch (FormatException ex)",
            "explanation": "Catches exactly that type with details."
          },
          {
            "line": "finally",
            "explanation": "Runs whether or not an error occurred."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "using disposes safely",
        "code": "using var reader = new StreamReader(\"menu.txt\");\nstring? line;\nwhile ((line = reader.ReadLine()) is not null)\n    Console.WriteLine(line);\n// reader is closed here, even if reading threw",
        "lineByLine": [
          {
            "line": "using var reader = ...",
            "explanation": "Auto-disposes at end of scope."
          },
          {
            "line": "while ((line = reader.ReadLine()) is not null)",
            "explanation": "Reads until the file ends."
          },
          {
            "line": "// reader is closed here",
            "explanation": "No explicit Close needed."
          }
        ]
      },
      {
        "title": "TryParse never throws",
        "code": "if (int.TryParse(\"42\", out int n))\n    Console.WriteLine(n + 1);\nelse\n    Console.WriteLine(\"not a number\");",
        "lineByLine": [
          {
            "line": "int.TryParse(\"42\", out int n)",
            "explanation": "Returns true and sets n; never throws."
          },
          {
            "line": "Console.WriteLine(n + 1)",
            "explanation": "Safe use of the parsed value."
          },
          {
            "line": "else ...",
            "explanation": "Graceful path for bad input."
          }
        ]
      },
      {
        "title": "Custom exception type",
        "code": "class InvalidAgeException : Exception {\n    public InvalidAgeException(int age)\n        : base($\"Invalid age: {age}\") { }\n}\n// usage\ntry {\n    throw new InvalidAgeException(-5);\n} catch (InvalidAgeException ex) {\n    Console.WriteLine(ex.Message);\n}",
        "lineByLine": [
          {
            "line": "class InvalidAgeException : Exception",
            "explanation": "Custom exceptions inherit from Exception."
          },
          {
            "line": ": base($\"Invalid age: {age}\")",
            "explanation": "Calls the base constructor with a clear message."
          },
          {
            "line": "throw new InvalidAgeException(-5)",
            "explanation": "Throw a typed, self-describing error instead of a generic one."
          },
          {
            "line": "catch (InvalidAgeException ex)",
            "explanation": "Catch the specific type for targeted handling."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Custom exception",
        "code": "class InsufficientFundsException : Exception\n{\n    public decimal Shortfall { get; }\n    public InsufficientFundsException(decimal s) : base($\"Short by {s}\") => Shortfall = s;\n}\nthrow new InsufficientFundsException(120.5m);",
        "note": "Domain exceptions carry context (the shortfall) - far more useful than a generic message."
      },
      {
        "title": "Multiple interface contracts",
        "code": "interface IReadable { string Read(); }\ninterface IWritable { void Write(string data); }\nclass FileBuffer : IReadable, IWritable\n{\n    public string Read() => \"data\";\n    public void Write(string data) => Console.WriteLine($\"wrote {data}\");\n}",
        "note": "One class, many contracts - IReadable and IWritable kept separate so consumers depend only on what they use."
      }
    ],
    "practice": [
      {
        "question": "Define IPayable.Pay(); implement in Card and UPI.",
        "hint": "Interface + two implementers.",
        "answer": "interface IPayable { void Pay(decimal amt); }\nclass Card : IPayable { public void Pay(decimal a) => Console.WriteLine($\"Card {a}\"); }\nclass UPI : IPayable { public void Pay(decimal a) => Console.WriteLine($\"UPI {a}\"); }"
      },
      {
        "question": "Wrap a risky int.Parse in try/catch with a fallback.",
        "hint": "catch FormatException.",
        "answer": "int n;\ntry { n = int.Parse(\"x\"); } catch (FormatException) { n = -1; }\nConsole.WriteLine(n);"
      },
      {
        "question": "Read a file line by line and count non-empty lines.",
        "hint": "StreamReader + using.",
        "answer": "using var r = new StreamReader(\"a.txt\");\nint c = 0;\nstring? l;\nwhile ((l = r.ReadLine()) is not null) if (l.Trim() != \"\") c++;\nConsole.WriteLine(c);"
      },
      {
        "question": "Why prefer TryParse over try/catch for parsing?",
        "hint": "Exceptions are slow; avoid for expected failures.",
        "answer": "// TryParse returns false with no stack unwind - use it for normal bad input, exceptions for truly exceptional states"
      }
    ],
    "interview": [
      {
        "question": "Interface vs abstract class?",
        "answer": "Interface: pure contract, many can be implemented, no state/implementation (except default methods). Abstract class: shared code and fields, single inheritance. Use interfaces for capabilities, abstract classes for common base logic."
      },
      {
        "question": "When should you catch an exception?",
        "answer": "Only when you can add value - retry, translate to a domain error, or log-and-continue. Swallowing (catch { }) hides bugs; let unknown exceptions bubble to a top-level handler."
      },
      {
        "question": "What does finally guarantee?",
        "answer": "It runs on normal completion AND on exception - the guaranteed cleanup hook. Combined with using (which compiles to try/finally) resources never leak."
      },
      {
        "question": "Why does using beat manual Close?",
        "answer": "It becomes try/finally under the hood, so Dispose runs even on exceptions or early return - impossible to forget on the error path."
      }
    ]
  },
  {
    "id": "csharp-9",
    "title": "Async, await & Task",
    "level": "Advanced",
    "definition": "async/await writes asynchronous code that reads top-to-bottom. A Task represents work in progress; await yields control until it finishes, keeping the calling thread free. Task.WhenAll runs jobs in parallel.",
    "analogy": "Like ordering five dishes at a restaurant: instead of staring at the kitchen for each dish (blocking), you place all orders, sit back, and get notified as each arrives (await). Task.WhenAll is calling the whole table together once every dish lands.",
    "keyPoints": [
      "Mark methods async Task; use await on Tasks - the method resumes where it paused.",
      "await never blocks the thread - it returns control, so UIs stay responsive.",
      "Task.WhenAll(a, b) runs both concurrently and waits for all; Task.WhenAny waits for the first.",
      "Async all the way up: do not mix blocking .Result / .Wait() with async (deadlock risk).",
      "Use CancellationToken to cancel long tasks (timeouts, user cancel).",
      "For CPU-bound work use Task.Run; for I/O-bound rely on naturally async APIs (HttpClient, streams)."
    ],
    "basicExamples": [
      {
        "title": "await an async task",
        "code": "static async Task<string> FetchAsync()\n{\n    await Task.Delay(1000);\n    return \"menu ready\";\n}\nConsole.WriteLine(await FetchAsync());",
        "lineByLine": [
          {
            "line": "static async Task<string> FetchAsync()",
            "explanation": "async method returning a Task of string."
          },
          {
            "line": "await Task.Delay(1000);",
            "explanation": "Pauses without blocking the thread for 1s."
          },
          {
            "line": "Console.WriteLine(await FetchAsync());",
            "explanation": "Waits for the result then prints it."
          }
        ]
      },
      {
        "title": "Run in parallel",
        "code": "async Task<int> Cook(string dish)\n{\n    await Task.Delay(1000);\n    return dish.Length;\n}\nvar total = await Task.WhenAll(Cook(\"dosa\"), Cook(\"idli\"));\nConsole.WriteLine(total.Sum());",
        "lineByLine": [
          {
            "line": "var total = await Task.WhenAll(...)",
            "explanation": "Both cooks start together, ~1s total not 2s."
          },
          {
            "line": "total.Sum();",
            "explanation": "Combines the finished results."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "UI stays responsive",
        "code": "private async void Load_Click(object sender, EventArgs e)\n{\n    LoadBtn.Enabled = false;\n    var data = await HttpClient.GetStringAsync(\"https://api/menu\");\n    Output.Text = data;\n    LoadBtn.Enabled = true;\n}",
        "lineByLine": [
          {
            "line": "private async void Load_Click(...)",
            "explanation": "Event handlers are the one valid async void."
          },
          {
            "line": "var data = await HttpClient...",
            "explanation": "Network wait does not freeze the form."
          },
          {
            "line": "LoadBtn.Enabled = true;",
            "explanation": "Re-enables after the data arrives."
          }
        ]
      },
      {
        "title": "CancellationToken",
        "code": "var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));\ntry\n{\n    var r = await FetchAsync(cts.Token);\n}\ncatch (OperationCanceledException)\n{\n    Console.WriteLine(\"timed out\");\n}",
        "lineByLine": [
          {
            "line": "var cts = new CancellationTokenSource(...)",
            "explanation": "A token that cancels after 5s."
          },
          {
            "line": "catch (OperationCanceledException)",
            "explanation": "Graceful handling of the timeout."
          }
        ]
      },
      {
        "title": "Await many tasks with WhenAll",
        "code": "async Task<int> Work(string name, int ms) {\n    await Task.Delay(ms);\n    return name.Length;\n}\nvar results = await Task.WhenAll(\n    Work(\"dosa\", 100),\n    Work(\"idli\", 80)\n);\nConsole.WriteLine(results.Sum());",
        "lineByLine": [
          {
            "line": "async Task<int> Work(...)",
            "explanation": "An async method returning a value wrapped in Task."
          },
          {
            "line": "await Task.Delay(ms)",
            "explanation": "Simulates slow work without blocking the thread."
          },
          {
            "line": "await Task.WhenAll(...)",
            "explanation": "Starts both tasks and waits for ALL of them together."
          },
          {
            "line": "results.Sum()",
            "explanation": "results is an array of the returned values."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "ValueTask for hot paths",
        "code": "async ValueTask<int> GetCachedAsync(string key)\n{\n    if (cache.TryGetValue(key, out int v)) return v;\n    v = await LoadAsync(key);\n    cache[key] = v;\n    return v;\n}",
        "note": "ValueTask avoids heap allocation when the result is often already available - useful in tight library code."
      },
      {
        "title": "ConfigureAwait in libraries",
        "code": "var html = await HttpClient.GetStringAsync(url).ConfigureAwait(false);\nProcess(html);",
        "note": "Library code uses ConfigureAwait(false) to avoid forcing a resume on the original context, preventing deadlocks."
      }
    ],
    "practice": [
      {
        "question": "Fetch two URLs concurrently and combine lengths.",
        "hint": "Task.WhenAll.",
        "answer": "var r = await Task.WhenAll(Get(a), Get(b));\nConsole.WriteLine(r[0].Length + r[1].Length);"
      },
      {
        "question": "Add a 3-second timeout to an async call.",
        "hint": "CancellationTokenSource(TimeSpan).",
        "answer": "var cts = new CancellationTokenSource(TimeSpan.FromSeconds(3));\nawait Work(cts.Token);"
      },
      {
        "question": "Why can you not use await in a normal void method?",
        "hint": "async void cannot be awaited; reserved for events.",
        "answer": "// Use async Task for awaitable methods; async void only for event handlers"
      },
      {
        "question": "What is the risk of calling .Result on a Task?",
        "hint": "Blocks the thread and can deadlock on a captured context.",
        "answer": "// .Result/.Wait() block and can deadlock - always await instead"
      }
    ],
    "interview": [
      {
        "question": "What problem does async/await solve?",
        "answer": "It keeps threads free during I/O waits so apps scale (thousands of concurrent requests) and stay responsive, while code still reads top-to-bottom instead of nested callbacks."
      },
      {
        "question": "async Task vs async void?",
        "answer": "async Task is awaitable and propagates errors. async void is fire-and-forget, cannot be awaited, and throws crash the process - only for UI event handlers."
      },
      {
        "question": "Task.WhenAll vs sequential awaits?",
        "answer": "WhenAll starts all tasks then waits - total time is the longest task. Sequential awaits run one after another - total is the sum. Wrong choice can 10x a page load."
      },
      {
        "question": "CPU-bound vs I/O-bound async?",
        "answer": "I/O-bound: use naturally async APIs (await file/network). CPU-bound: Task.Run off the UI thread, since await alone does not speed up computation."
      }
    ]
  },
  {
    "id": "csharp-10",
    "title": "Delegates, events & LINQ deep dive",
    "level": "Advanced",
    "definition": "Delegates are type-safe method pointers; Func/Action/Predicate are the built-in generic ones. Events let objects notify subscribers. LINQ (query and method syntax) filters, maps, and aggregates sequences declaratively.",
    "analogy": "Like a newspaper subscription: the publisher (event) does not know who reads; you subscribe (event handler) and get each edition (callback). LINQ is the newsroom editor - Describe \"give me headlines above 80\", not the step-by-step sorting.",
    "keyPoints": [
      "Func<T, TResult> returns a value; Action<T> returns void; Predicate<T> returns bool.",
      "Lambdas are inline functions: x => x * x; multiple statements need braces and return.",
      "LINQ method chains (Where/Select/OrderBy) are usually clearer than query syntax for filtering.",
      "Where filters, Select maps, OrderBy sorts, GroupBy buckets, Aggregate reduces.",
      "LINQ uses deferred execution - the query runs when you enumerate (foreach/ToList).",
      "Events follow publisher + subscribe (+=) / unsubscribe (-=) for loose coupling."
    ],
    "basicExamples": [
      {
        "title": "Func and Action",
        "code": "Func<int, int> square = x => x * x;\nAction<string> shout = s => Console.WriteLine(s.ToUpper());\nConsole.WriteLine(square(6));\nshout(\"namaste\");",
        "lineByLine": [
          {
            "line": "Func<int, int> square = x => x * x;",
            "explanation": "Takes an int, returns an int."
          },
          {
            "line": "Action<string> shout = ...",
            "explanation": "Returns nothing - just acts."
          },
          {
            "line": "square(6)",
            "explanation": "Prints 36; shout prints NAMASTE."
          }
        ]
      },
      {
        "title": "LINQ method chain",
        "code": "var marks = new[] { 72, 35, 90, 58 };\nvar passed = marks.Where(m => m >= 40).OrderByDescending(m => m);\nConsole.WriteLine(string.Join(\", \", passed));",
        "lineByLine": [
          {
            "line": "marks.Where(m => m >= 40)",
            "explanation": "Keeps only passing marks."
          },
          {
            "line": ".OrderByDescending(m => m)",
            "explanation": "Sorts high to low."
          },
          {
            "line": "string.Join(\", \", passed)",
            "explanation": "Prints 90, 72, 58."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "query syntax",
        "code": "var students = new[] { (\"Asha\", 92), (\"Ravi\", 78) };\nvar top =\n    from s in students\n    where s.Item2 >= 80\n    select s.Item1;\nConsole.WriteLine(string.Join(\", \", top));",
        "lineByLine": [
          {
            "line": "from s in students",
            "explanation": "Like foreach over the source."
          },
          {
            "line": "where s.Item2 >= 80",
            "explanation": "Filters to high scorers."
          },
          {
            "line": "select s.Item1",
            "explanation": "Projects just the names."
          }
        ]
      },
      {
        "title": "Group and count",
        "code": "var words = new[] { \"dosa\", \"idli\", \"dosa\", \"vada\" };\nforeach (var g in words.GroupBy(w => w))\n    Console.WriteLine($\"{g.Key} x{g.Count()}\");",
        "lineByLine": [
          {
            "line": "words.GroupBy(w => w)",
            "explanation": "Buckets identical words together."
          },
          {
            "line": "g.Key / g.Count()",
            "explanation": "Each group exposes its value and size."
          }
        ]
      },
      {
        "title": "Multicast events",
        "code": "class Button {\n    public event EventHandler Clicked;\n    public void Press() => Clicked?.Invoke(this, EventArgs.Empty);\n}\nvar b = new Button();\nb.Clicked += (s, e) => Console.WriteLine(\"Handler 1\");\nb.Clicked += (s, e) => Console.WriteLine(\"Handler 2\");\nb.Press();",
        "lineByLine": [
          {
            "line": "public event EventHandler Clicked;",
            "explanation": "An event can have many subscribers."
          },
          {
            "line": "b.Clicked += ...",
            "explanation": "Each += attaches another handler."
          },
          {
            "line": "Clicked?.Invoke(...)",
            "explanation": "Fires all handlers; ?. guards the no-subscriber case."
          },
          {
            "line": "b.Press()",
            "explanation": "Prints Handler 1 then Handler 2, in order."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Deferred execution trap",
        "code": "var list = new List<int> { 1, 2, 3 };\nvar query = list.Where(n => n > 1);\nlist.Add(4);\nConsole.WriteLine(query.Count());",
        "note": "query re-runs each enumeration, so the later Add(4) is included - materialize with ToList() when you need a snapshot."
      },
      {
        "title": "Custom event",
        "code": "class Button\n{\n    public event EventHandler<string>? Clicked;\n    public void Press() => Clicked?.Invoke(this, \"pressed\");\n}\nvar b = new Button();\nb.Clicked += (s, msg) => Console.WriteLine($\"Got {msg}\");\nb.Press();",
        "note": "The publisher knows nothing about subscribers - the classic observer pattern behind UI and messaging."
      }
    ],
    "practice": [
      {
        "question": "From names, get only those starting with A, uppercased, sorted.",
        "hint": "Where + Select + OrderBy.",
        "answer": "var r = names.Where(n => n.StartsWith(\"A\")).Select(n => n.ToUpper()).OrderBy(n => n).ToList();"
      },
      {
        "question": "Group words by first letter and show counts.",
        "hint": "GroupBy.",
        "answer": "foreach (var g in words.GroupBy(w => w[0])) Console.WriteLine(g.Key + \": \" + g.Count());"
      },
      {
        "question": "Total price of items over 100 using Sum.",
        "hint": "Where then Sum.",
        "answer": "var t = items.Where(i => i.Price > 100).Sum(i => i.Price);"
      },
      {
        "question": "When does a LINQ query actually run?",
        "hint": "On enumeration - deferred execution.",
        "answer": "// Runs at foreach/ToList/Count - not at declaration"
      }
    ],
    "interview": [
      {
        "question": "Deferred vs immediate LINQ execution?",
        "answer": "Deferred (Where/Select): builds a query, runs on each enumeration, sees latest data. Immediate (ToList/Count/ToArray): runs once, snapshots. Confusing them causes phantom rows."
      },
      {
        "question": "Func vs Action vs Predicate?",
        "answer": "Func<TResult> returns a value; Action returns void; Predicate<T> is Func<T,bool> for conditions. Choose by whether the lambda produces a result."
      },
      {
        "question": "Why use events over direct method calls?",
        "answer": "Events decouple publisher from subscriber: the publisher raises, any number of listeners react, added/removed at runtime - the observer pattern that keeps UI and logic independent."
      },
      {
        "question": "Where does LINQ fall short?",
        "answer": "Complex multi-stage pipelines can hurt performance and debuggability; hot loops may need plain foreach. Also a database provider must translate it to SQL - unsupported methods throw at runtime."
      }
    ]
  },
  {
    "id": "csharp-11",
    "title": "File I/O, error handling & LINQ",
    "level": "Advanced",
    "definition": "try/catch/finally handle exceptions; using disposes resources deterministically. LINQ composes queries (Where, Select, GroupBy, Aggregate) over any IEnumerable with deferred execution and method-chain syntax.",
    "analogy": "Like a dabbawala sorting office: try is sorting tiffins, catch handles a broken latch (exception) without stopping the whole route, finally closes the shop (cleanup) either way, and LINQ is the routing table that filters, groups and totals dabbas in one readable pipeline.",
    "keyPoints": [
      "try risky code; catch (specific) handles known failures; finally always runs (cleanup).",
      "throw; re-throws preserving the stack; throw ex; resets it - prefer the bare throw in catch.",
      "using var f = ... guarantees Dispose even on exception; preferred over manual finally.",
      "LINQ method chains: list.Where(...).Select(...).OrderBy(...); query syntax reads like SQL.",
      "Deferred execution: the query runs only when enumerated (foreach/ToList), not when built.",
      "Aggregate folds a list into one value; GroupBy buckets; SelectMany flattens nested collections."
    ],
    "basicExamples": [
      {
        "title": "try/catch/finally",
        "code": "try {\n  int n = int.Parse(\"abc\");\n} catch (FormatException e) {\n  Console.WriteLine(\"bad number: \" + e.Message);\n} finally {\n  Console.WriteLine(\"done\");\n}",
        "lineByLine": [
          {
            "line": "int n = int.Parse(\"abc\");",
            "explanation": "Throws FormatException."
          },
          {
            "line": "catch (FormatException e) { ... }",
            "explanation": "Catches only that type; prints the message."
          },
          {
            "line": "finally { ... }",
            "explanation": "Runs whether or not an exception occurred."
          }
        ]
      },
      {
        "title": "LINQ filter and project",
        "code": "int[] nums = { 1, 2, 3, 4, 5 };\nvar evens = nums.Where(n => n % 2 == 0).Select(n => n * n);\nConsole.WriteLine(string.Join(\",\", evens));",
        "lineByLine": [
          {
            "line": "nums.Where(n => n % 2 == 0)",
            "explanation": "Keeps even numbers: 2,4."
          },
          {
            "line": ".Select(n => n * n)",
            "explanation": "Squares each: 4,16."
          },
          {
            "line": "string.Join(\",\", evens)",
            "explanation": "Prints 4,16 (query runs here)."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "using for files",
        "code": "using var reader = new StreamReader(\"data.txt\");\nstring line;\nwhile ((line = reader.ReadLine()) != null)\n  Console.WriteLine(line);\n// reader.Dispose() called automatically here",
        "lineByLine": [
          {
            "line": "using var reader = new StreamReader(...)",
            "explanation": "Guarantees the file closes even on error."
          },
          {
            "line": "while ((line = reader.ReadLine()) != null)",
            "explanation": "Reads line by line."
          },
          {
            "line": "// reader.Dispose() called here",
            "explanation": "End of scope auto-disposes."
          }
        ]
      },
      {
        "title": "GroupBy and count",
        "code": "string[] cities = { \"Pune\", \"Pune\", \"Delhi\" };\nvar g = cities.GroupBy(c => c)\n              .Select(x => x.Key + \"=\" + x.Count());\nConsole.WriteLine(string.Join(\",\", g));",
        "lineByLine": [
          {
            "line": "cities.GroupBy(c => c)",
            "explanation": "Buckets identical cities."
          },
          {
            "line": ".Select(x => x.Key + \"=\" + x.Count())",
            "explanation": "Name=count per bucket."
          },
          {
            "line": "string.Join(\",\", g)",
            "explanation": "Prints Pune=2,Delhi=1."
          }
        ]
      },
      {
        "title": "File.ReadAllLines and writing",
        "code": "File.WriteAllLines(\"cities.txt\", new[] { \"Pune\", \"Mumbai\" });\nvar lines = File.ReadAllLines(\"cities.txt\");\nforeach (var line in lines)\n    Console.WriteLine(line.ToUpper());",
        "lineByLine": [
          {
            "line": "File.WriteAllLines(...)",
            "explanation": "Writes each array element as one line."
          },
          {
            "line": "var lines = File.ReadAllLines(...)",
            "explanation": "Reads the whole file back into a string[]."
          },
          {
            "line": "foreach (var line in lines)",
            "explanation": "Process each line."
          },
          {
            "line": "line.ToUpper()",
            "explanation": "Transform as needed before output."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Aggregate for a running total",
        "code": "decimal[] bills = { 120m, 80m, 250m };\ndecimal total = bills.Aggregate((sum, b) => sum + b);\nConsole.WriteLine(total);",
        "note": "Aggregate folds the list into one value - here a sum. A seed overload starts from an initial accumulator for non-numeric folds."
      },
      {
        "title": "Custom exception type",
        "code": "public class InsufficientFundsException : Exception {\n  public decimal Shortfall { get; }\n  public InsufficientFundsException(decimal shortfall)\n    : base($\"Short by {shortfall}\") => Shortfall = shortfall;\n}",
        "note": "Domain-specific exceptions carry structured data (Shortfall) so callers can react precisely instead of parsing message strings."
      }
    ],
    "practice": [
      {
        "question": "Parse a number safely with TryParse and print a default on failure.",
        "hint": "int.TryParse branch.",
        "answer": "Console.WriteLine(int.TryParse(\"12\", out int n) ? n.ToString() : \"0\");"
      },
      {
        "question": "From nums {5,2,8,1} print sorted evens descending.",
        "hint": "Where + OrderByDescending.",
        "answer": "int[] a = {5,2,8,1};\nConsole.WriteLine(string.Join(\",\", a.Where(x=>x%2==0).OrderByDescending(x=>x)));"
      },
      {
        "question": "Read a file line by line and count non-empty lines.",
        "hint": "using StreamReader + LINQ.",
        "answer": "using var r = new StreamReader(\"d.txt\");\nint c = 0; string l;\nwhile ((l = r.ReadLine()) != null) if (l.Trim().Length > 0) c++;\nConsole.WriteLine(c);"
      },
      {
        "question": "Why is `throw ex;` discouraged in a catch block?",
        "hint": "It resets the stack trace.",
        "answer": "Use bare `throw;` to preserve the original stack. `throw ex;` marks the catch line as the new origin, hiding where the error truly began."
      }
    ],
    "interview": [
      {
        "question": "Deferred vs immediate LINQ execution?",
        "answer": "Most operators are lazy: the query is a blueprint, executed on enumeration (foreach/ToList/ToArray). Aggregators (Count, Sum, ToList) force immediate execution. Adding to the source after building but before enumerating changes results."
      },
      {
        "question": "Where vs First vs Single?",
        "answer": "Where returns a lazy filtered stream (0..n). First returns the first or throws; FirstOrDefault returns default instead. Single throws unless EXACTLY one matches - use for uniqueness guarantees."
      },
      {
        "question": "finally vs a finalizer (destructor)?",
        "answer": "finally runs deterministically when a try block exits; a finalizer runs at GC time, non-deterministically, and is slow. Use finally/using for cleanup, never rely on destructors."
      },
      {
        "question": "Why prefer exception filters (catch when)?",
        "answer": "catch (HttpException e) when (e.Status == 404) logs/handles only that case without unwinding and re-catching, keeping related handling in one place and preserving the stack."
      }
    ]
  },
  {
    "id": "csharp-12",
    "title": "Building apps: APIs, testing & best practices",
    "level": "Advanced",
    "definition": "Modern C# apps combine layered architecture (controllers, services, repositories), dependency injection, REST APIs, and xUnit testing. Best practices - nullable reference types, records, and clean boundaries - keep large codebases maintainable.",
    "analogy": "Like running a well-organised restaurant: the waiter (controller/API) takes orders, the kitchen (service) cooks the business logic, the storekeeper (repository) fetches ingredients (data), and DI is the manager wiring the right staff to each station - while the health inspector (tests) checks every dish before service.",
    "keyPoints": [
      "ASP.NET minimal API: app.MapGet(\"/hi\", () => \"hello\") exposes an endpoint in one line.",
      "Dependency injection: register services in Program.cs and receive them via constructor parameters.",
      "Records model immutable data: record Point(int X, int Y); gives value equality and with-expressions for free.",
      "Nullable reference types (string?) catch null bugs at compile time - enable <Nullable>enable</Nullable>.",
      "xUnit: [Fact] tests, Arrange-Act-Assert shape, Assert.Equal(expected, actual).",
      "Separate concerns: controllers stay thin, services hold logic, repositories own data access - each testable in isolation."
    ],
    "basicExamples": [
      {
        "title": "Minimal API endpoint",
        "code": "var builder = WebApplication.CreateBuilder(args);\nvar app = builder.Build();\napp.MapGet(\"/hi\", () => \"Namaste!\");\napp.Run();",
        "lineByLine": [
          {
            "line": "WebApplication.CreateBuilder(args)",
            "explanation": "Boots the host with config."
          },
          {
            "line": "app.MapGet(\"/hi\", () => \"Namaste!\")",
            "explanation": "Maps GET /hi to a handler."
          },
          {
            "line": "app.Run();",
            "explanation": "Starts listening for requests."
          }
        ]
      },
      {
        "title": "Record data type",
        "code": "record Point(int X, int Y);\nvar a = new Point(1, 2);\nvar b = a with { Y = 5 };\nConsole.WriteLine(a);  // Point { X = 1, Y = 2 }\nConsole.WriteLine(b);  // Point { X = 1, Y = 5 }",
        "lineByLine": [
          {
            "line": "record Point(int X, int Y);",
            "explanation": "Immutable positional record."
          },
          {
            "line": "a with { Y = 5 }",
            "explanation": "with-expression clones, changing only Y."
          },
          {
            "line": "Console.WriteLine(a);",
            "explanation": "Prints a readable form."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "DI and a service",
        "code": "builder.Services.AddSingleton<IGreeter, Greeter>();\n// Greeter : IGreeter { public string Hello() => \"hi\"; }\nvar app = builder.Build();\napp.MapGet(\"/\", (IGreeter g) => g.Hello());\napp.Run();",
        "lineByLine": [
          {
            "line": "builder.Services.AddSingleton<IGreeter, Greeter>()",
            "explanation": "Registers the implementation for the interface."
          },
          {
            "line": "app.MapGet(\"/\", (IGreeter g) => g.Hello())",
            "explanation": "DI injects g automatically per request."
          }
        ]
      },
      {
        "title": "xUnit test",
        "code": "public class MathTests {\n  [Fact]\n  public void Add_Returns_Sum() {\n    int result = 2 + 3;          // Act\n    Assert.Equal(5, result);     // Assert\n  }\n}",
        "lineByLine": [
          {
            "line": "[Fact]",
            "explanation": "Marks a parameterless test method."
          },
          {
            "line": "int result = 2 + 3;",
            "explanation": "Act: run the code."
          },
          {
            "line": "Assert.Equal(5, result);",
            "explanation": "Assert: expected vs actual."
          }
        ]
      },
      {
        "title": "Configuration from appsettings",
        "code": "var builder = WebApplication.CreateBuilder(args);\nvar title = builder.Configuration[\"Title\"] ?? \"CodeAtlas\";\nvar app = builder.Build();\napp.MapGet(\"/\", () => title);\napp.Run();",
        "lineByLine": [
          {
            "line": "WebApplication.CreateBuilder(args)",
            "explanation": "Sets up host, config and logging."
          },
          {
            "line": "builder.Configuration[\"Title\"]",
            "explanation": "Reads a value from appsettings.json or env vars."
          },
          {
            "line": "?? \"CodeAtlas\"",
            "explanation": "Falls back if the key is missing."
          },
          {
            "line": "app.MapGet(\"/\", () => title)",
            "explanation": "A minimal endpoint returning the config value."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Layered endpoint with DI",
        "code": "app.MapPost(\"/orders\", async (Order order, IOrderService svc) => {\n  var id = await svc.PlaceAsync(order);\n  return Results.Created($\"/orders/{id}\", id);\n});",
        "note": "Controller stays thin: parse, delegate to the service, map the result. Business rules and data access live in injectable, independently testable layers."
      },
      {
        "title": "Nullable-aware validation",
        "code": "string? name = Console.ReadLine();\nif (string.IsNullOrWhiteSpace(name))\n  throw new ArgumentException(\"name required\", nameof(name));\n// after the check, the compiler knows name is non-null here\nConsole.WriteLine(name.ToUpper());",
        "note": "Nullable reference types plus guard clauses turn runtime null crashes into compile-time warnings caught before deployment."
      }
    ],
    "practice": [
      {
        "question": "Expose GET /square/{n} returning n*n as JSON.",
        "hint": "MapGet with a route parameter.",
        "answer": "app.MapGet(\"/square/{n}\", (int n) => Results.Ok(n * n));"
      },
      {
        "question": "Model an immutable Money record with Amount and Currency.",
        "hint": "Positional record.",
        "answer": "record Money(decimal Amount, string Currency);\nvar m = new Money(100, \"INR\");\nConsole.WriteLine(m);"
      },
      {
        "question": "Write an xUnit test asserting Reverse(\"abc\") == \"cba\".",
        "hint": "[Fact] + Assert.Equal.",
        "answer": "public class S {\n  [Fact]\n  public void Rev() {\n    Assert.Equal(\"cba\", new string(\"abc\".Reverse().ToArray()));\n  }\n}"
      },
      {
        "question": "Why inject interfaces instead of new-ing a service?",
        "hint": "Testability and loose coupling.",
        "answer": "Coding to an interface lets tests substitute a fake and lets DI swap implementations without editing consumers - the Dependency Inversion Principle in action."
      }
    ],
    "interview": [
      {
        "question": "What problem does dependency injection solve?",
        "answer": "It inverts control: classes receive dependencies instead of creating them. This decouples components, enables unit testing with fakes, and centralises lifetime/configuration in one composition root."
      },
      {
        "question": "record vs class vs struct - modern guidance?",
        "answer": "record: immutable data with value equality and with-copies (DTOs, events). class: mutable reference types with identity. struct: small value types copied on assignment. Prefer records for data, classes for behaviour."
      },
      {
        "question": "How do you unit test an async method?",
        "answer": "Make the test async Task and await the method, then assert. xUnit supports async [Fact] tests - avoid async void and .Result/.Wait() which can deadlock and hide exceptions."
      },
      {
        "question": "Why separate controllers, services and repositories?",
        "answer": "Each layer has one responsibility and one reason to change. Controllers handle HTTP, services hold business rules, repositories own persistence - so each is independently testable and replaceable without touching the others."
      }
    ]
  }
];
