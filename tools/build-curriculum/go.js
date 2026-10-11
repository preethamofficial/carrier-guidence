module.exports = [
  {
    "id": "go-1",
    "title": "Toolchain, modules & first program",
    "level": "Beginner",
    "definition": "Go (Golang) is a compiled, statically-typed language from Google. You write .go files, organise them in modules, and `go run` / `go build` compiles them to a single fast binary.",
    "analogy": "Like a tiffin delivery service with one sealed dabba: Go packs your whole program (all dependencies) into a single binary lunchbox that runs anywhere without extra setup.",
    "keyPoints": [
      "Install Go from go.dev; verify with `go version`; every project starts with `go mod init example.com/hello`.",
      "Every program has `package main` and `func main()` — execution starts there.",
      "Run instantly: `go run .`; ship: `go build -o app .` then `./app`.",
      "Declare with `var name string = \"Asha\"` or short `name := \"Asha\"` (inside functions only); types are fixed.",
      "Import standard packages (fmt, strings); unused imports or variables are compile errors — delete or use them.",
      "Format with `gofmt` / `go fmt ./...`; the compiler enforces braces on the same line as the statement."
    ],
    "basicExamples": [
      {
        "title": "Your first program",
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Namaste, CodeAtlas!\")\n\tfmt.Println(\"I am learning Go\")\n}",
        "lineByLine": [
          {
            "line": "package main",
            "explanation": "Declares an executable program (not a library)."
          },
          {
            "line": "func main() {",
            "explanation": "The entry point: execution starts here."
          },
          {
            "line": "fmt.Println(\"Namaste, CodeAtlas!\")",
            "explanation": "Prints the greeting line (Println adds a newline)."
          }
        ]
      },
      {
        "title": "Variables and types",
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar city string = \"Bengaluru\"\n\tyear := 2026\n\tmarks := 91.5\n\tpassed := true\n\tfmt.Println(city, year, marks, passed)\n\tfmt.Printf(\"%T %T\n\", city, year)\n}",
        "lineByLine": [
          {
            "line": "var city string = \"Bengaluru\"",
            "explanation": "Explicit declaration with fixed type string."
          },
          {
            "line": "year := 2026",
            "explanation": "Short declaration: infers int, function-scope only."
          },
          {
            "line": "fmt.Printf(\"%T %T\n\", city, year)",
            "explanation": "%T prints each value’s type: string int."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Comments and style",
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\t// A comment: Go skips this line\n\tmarks := 92 // store the score\n\tfmt.Println(marks) /* prints 92 */\n}",
        "lineByLine": [
          {
            "line": "// A comment: Go skips this line",
            "explanation": "// one line; /* */ spans many lines."
          },
          {
            "line": "marks := 92",
            "explanation": "Short declaration inside a function."
          },
          {
            "line": "fmt.Println(marks)",
            "explanation": "Confirms the stored value."
          }
        ]
      },
      {
        "title": "Formatted output",
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tname := \"Asha\"\n\tfmt.Printf(\"Namaste, %s!\\n\", name)\n\tfmt.Printf(\"Next year: %d\\n\", 2027)\n}",
        "lineByLine": [
          {
            "line": "fmt.Printf(\"Namaste, %s!\\n\", name)",
            "explanation": "%s formats a string; \\n is a newline."
          },
          {
            "line": "fmt.Printf(\"Next year: %d\\n\", 2027)",
            "explanation": "%d formats an integer."
          }
        ]
      },
      {
        "title": "Multiple return values",
        "code": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n)\n\nfunc toNum(s string) (int, error) {\n\tn, err := strconv.Atoi(s)\n\treturn n, err\n}\n\nfunc main() {\n\tn, err := toNum(\"42\")\n\tif err != nil {\n\t\tfmt.Println(\"bad input\")\n\t\treturn\n\t}\n\tfmt.Println(\"ok:\", n)\n}",
        "lineByLine": [
          {
            "line": "func toNum(s string) (int, error) {",
            "explanation": "Go functions commonly return a value AND an error."
          },
          {
            "line": "n, err := strconv.Atoi(s)",
            "explanation": "Atoi returns (int, error) as a pair."
          },
          {
            "line": "if err != nil {",
            "explanation": "Idiomatic Go: check the error before using the value."
          },
          {
            "line": "fmt.Println(\"ok:\", n)",
            "explanation": "Only reached when parsing succeeded."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Reading CLI arguments",
        "code": "package main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\tif len(os.Args) < 2 {\n\t\tfmt.Println(\"Usage: app <city>\")\n\t\tos.Exit(1)\n\t}\n\tfmt.Println(\"Learning from \" + os.Args[1])\n}",
        "note": "os.Args holds terminal words; index 0 is the program name, so check length first."
      },
      {
        "title": "Module layout for a real project",
        "code": "$ go mod init example.com/marks\n$ ls\ngo.mod  main.go\n$ go fmt ./... && go vet ./... && go run .",
        "note": "mod init + fmt + vet + run is the everyday Go loop; vet catches suspicious code the compiler allows."
      }
    ],
    "practice": [
      {
        "question": "Print name, city, favourite food on three lines.",
        "hint": "Three fmt.Println calls in main.",
        "answer": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Asha\")\n\tfmt.Println(\"Bengaluru\")\n\tfmt.Println(\"Masala dosa\")\n}"
      },
      {
        "question": "Declare birthYear and print age in 2026.",
        "hint": "Subtract from 2026.",
        "answer": "birthYear := 2005\nfmt.Println(2026 - birthYear)"
      },
      {
        "question": "Fix: unused variable x. Show two options.",
        "hint": "Use it or remove it (blank identifier _ discards).",
        "answer": "x := 5\nfmt.Println(x) // use it\n// or: _ = 5"
      },
      {
        "question": "Print types of 42, \"hi\", true with %T.",
        "hint": "%T reveals the static type.",
        "answer": "fmt.Printf(\"%T %T %T\n\", 42, \"hi\", true)\n// int string bool"
      }
    ],
    "interview": [
      {
        "question": "How does Go build and run code?",
        "answer": "go run compiles to a temp binary and executes it; go build produces a standalone binary with dependencies included — no JVM/VM needed at runtime."
      },
      {
        "question": ":= vs var — what is the difference?",
        "answer": ":= is shorthand inside functions only, inferring the type; var works at any scope and allows explicit types. Both create fixed-type variables."
      },
      {
        "question": "Why do unused imports/variables fail compilation?",
        "answer": "Deliberate design: it keeps codebases clean and catches half-finished edits. Use the value, delete it, or assign to _ ."
      },
      {
        "question": "What is a Go module?",
        "answer": "A versioned collection of packages rooted at go.mod (module path + Go version + dependencies); go mod tidy keeps it consistent."
      }
    ]
  },
  {
    "id": "go-2",
    "title": "Variables, types & operators",
    "level": "Beginner",
    "definition": "Go variables have fixed types set at declaration: integers (int), floats (float64), strings, booleans. Operators (+, -, *, /, %, ==, &&, ||, !) compute and compare; := declares with inference inside functions, var declares anywhere with optional explicit types.",
    "analogy": "Like fixed-size steel lunch boxes: an int dabba holds only whole rotis, a string dabba only chits. := is the vendor guessing the box size from what you put in; var with a type is you ordering the exact size. The compiler rejects a soup box labelled rice.",
    "keyPoints": [
      "Core types: int, float64, string, bool; check a value’s type with %T in fmt.Printf.",
      ":= infers and declares inside functions only; var works at package level and allows explicit types.",
      "Integer division truncates: 7 / 2 is 3; use 7.0 / 2 for 3.5.",
      "Zero values: 0, 0.0, \"\", false — every variable starts useful, never garbage.",
      "Convert explicitly: int(3.9) truncates to 3; string(65) gives \"A\" (rune!), use strconv.Itoa for digits.",
      "Constants with const (and iota for sequences) can never change; unused variables/imports fail the build."
    ],
    "basicExamples": [
      {
        "title": "Declaration styles",
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar city string = \"Bengaluru\"\n\tyear := 2026\n\tvar marks float64 = 91.5\n\tpassed := true\n\tfmt.Println(city, year, marks, passed)\n}",
        "lineByLine": [
          {
            "line": "var city string = \"Bengaluru\"",
            "explanation": "Explicit type, works anywhere."
          },
          {
            "line": "year := 2026",
            "explanation": "Short form: infers int, functions only."
          },
          {
            "line": "fmt.Println(city, year, marks, passed)",
            "explanation": "Prints all four values."
          }
        ]
      },
      {
        "title": "Arithmetic and division",
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(7 / 2)\n\tfmt.Println(7.0 / 2)\n\tfmt.Println(7 % 2)\n\tfmt.Println(\"Age: \", 21)\n}",
        "lineByLine": [
          {
            "line": "fmt.Println(7 / 2)",
            "explanation": "int / int truncates: 3."
          },
          {
            "line": "fmt.Println(7.0 / 2)",
            "explanation": "Float operand: 3.5."
          },
          {
            "line": "fmt.Println(7 % 2)",
            "explanation": "Remainder: 1."
          }
        ]
      },
      {
        "title": "Booleans and logic",
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tage := 19\n\thasID := true\n\tfmt.Println(age >= 18 && hasID)\n\tfmt.Println(!(age < 18))\n}",
        "lineByLine": [
          {
            "line": "age := 19",
            "explanation": "Test data."
          },
          {
            "line": "fmt.Println(age >= 18 && hasID)",
            "explanation": "&& needs both true: prints true."
          },
          {
            "line": "fmt.Println(!(age < 18))",
            "explanation": "! flips false to true."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Zero values",
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar n int\n\tvar s string\n\tvar ok bool\n\tfmt.Printf(\"%d %q %v\n\", n, s, ok)\n}",
        "lineByLine": [
          {
            "line": "var n int",
            "explanation": "No assignment — starts at zero value 0."
          },
          {
            "line": "var s string",
            "explanation": "Empty string, not null/garbage."
          },
          {
            "line": "fmt.Printf(\"%d %q %v\\n\", n, s, ok)",
            "explanation": "Prints: 0 \"\" false."
          }
        ]
      },
      {
        "title": "const and iota",
        "code": "package main\n\nimport \"fmt\"\n\nconst Year = 2026\n\nconst (\n\tVeg = iota\n\tNonVeg\n\tVegan\n)\n\nfunc main() {\n\tfmt.Println(Year, Veg, NonVeg, Vegan)\n}",
        "lineByLine": [
          {
            "line": "const Year = 2026",
            "explanation": "Constant: reassignment is a compile error."
          },
          {
            "line": "Veg = iota",
            "explanation": "iota counts 0,1,2... per line in the block."
          },
          {
            "line": "fmt.Println(Year, Veg, NonVeg, Vegan)",
            "explanation": "Prints: 2026 0 1 2."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "strconv conversions",
        "code": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n)\n\nfunc main() {\n\tn, err := strconv.Atoi(\" 42 \")\n\tfmt.Println(n, err)\n\tfmt.Println(strconv.Itoa(42) + \"!\")\n\tfmt.Println(int(3.99))\n}",
        "note": "Atoi parses (with error!), Itoa formats back; int(float) truncates toward zero."
      },
      {
        "title": "Overflow-aware types",
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tvar small int8 = 127\n\t// small++ // overflow wraps to -128 in release builds\n\tfmt.Println(small)\n\tfmt.Printf(\"%T\n\", small + 1)\n}",
        "note": "Fixed-size ints wrap on overflow; int8 + 1 promotes in the expression — choose sizes deliberately."
      }
    ],
    "practice": [
      {
        "question": "Declare birthYear, print age in 2026 with a label.",
        "hint": "Subtract from 2026.",
        "answer": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tbirthYear := 2005\n\tfmt.Println(\"Age:\", 2026-birthYear)\n}"
      },
      {
        "question": "Show 5/2 vs 5.0/2 and explain.",
        "hint": "int division truncates.",
        "answer": "fmt.Println(5 / 2)   // 2\nfmt.Println(5.0 / 2) // 2.5"
      },
      {
        "question": "Convert \"7\" to int, add 3, handle the error.",
        "hint": "strconv.Atoi returns (n, err).",
        "answer": "n, err := strconv.Atoi(\"7\")\nif err != nil {\n\tfmt.Println(\"bad input\")\n} else {\n\tfmt.Println(n + 3)\n}"
      },
      {
        "question": "Why does `x := 5` fail at package level? Fix it.",
        "hint": ":= is function-only; use var outside.",
        "answer": "var x = 5 // package level\nfunc main() {\n\ty := 6 // function level\n\tfmt.Println(x, y)\n}"
      }
    ],
    "interview": [
      {
        "question": ":= vs var vs const?",
        "answer": ":= declares+infers inside functions only. var declares anywhere, optionally with explicit type. const fixes the value forever (with iota enums). All three keep static types."
      },
      {
        "question": "What is a zero value and why does it matter?",
        "answer": "Every type’s ready-to-use default (0, \"\", false, nil for pointers/slices/maps). No uninitialised garbage — a major source of Go’s reliability."
      },
      {
        "question": "Why do unused variables fail compilation?",
        "answer": "Deliberate strictness: catches typos and half-finished edits. Use the value, delete it, or blank-identify (_) it."
      },
      {
        "question": "int(3.99) gives 3 — explain, and what about string(65)?",
        "answer": "Numeric conversion truncates toward zero. string(int) converts to the rune (65 = \"A\"), NOT digits — use strconv.Itoa/FormatInt for numbers-as-text."
      }
    ]
  },
  {
    "id": "go-3",
    "title": "Control flow: if, for & switch",
    "level": "Beginner",
    "definition": "Go chooses with if/else, repeats ONLY with for (no while keyword - for covers it), and branches on values with switch. Short init statements (if x := f(); x > 0) keep conditions tidy.",
    "analogy": "Like a Mumbai local: if the fast train comes take it else take slow (if/else); the motorman repeats stations with one loop handle (for does all looping); switch is the platform indicator routing each train number to its line.",
    "keyPoints": [
      "if needs no parens but needs braces: if age >= 18 { ... } else { ... }.",
      "for is the ONLY loop: for i := 0; i < 5; i++ counts; for cond { } acts as while.",
      "for range walks collections: for i, v := range items gives index and value.",
      "break exits, continue skips; switch matches values with implicit breaks (no fallthrough by default).",
      "Init statement: if n, err := strconv.Atoi(s); err != nil { ... } scopes n to the branch.",
      "++ and -- are statements, not expressions: x := i++ is illegal in Go."
    ],
    "basicExamples": [
      {
        "title": "if else grades",
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tmarks := 72\n\tif marks >= 90 {\n\t\tfmt.Println(\"A\")\n\t} else if marks >= 60 {\n\t\tfmt.Println(\"B\")\n\t} else {\n\t\tfmt.Println(\"C\")\n\t}\n}",
        "lineByLine": [
          {
            "line": "marks := 72",
            "explanation": "Score to classify."
          },
          {
            "line": "if marks >= 90 {",
            "explanation": "No parens; braces required."
          },
          {
            "line": "} else if marks >= 60 {",
            "explanation": "72 lands here: prints B."
          }
        ]
      },
      {
        "title": "for as while",
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tn := 3\n\tfor n > 0 {\n\t\tfmt.Println(n)\n\t\tn--\n\t}\n}",
        "lineByLine": [
          {
            "line": "n := 3",
            "explanation": "Start value."
          },
          {
            "line": "for n > 0 {",
            "explanation": "Condition-only for = while loop."
          },
          {
            "line": "n--",
            "explanation": "Moves toward exit."
          }
        ]
      },
      {
        "title": "switch days",
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tday := \"Sun\"\n\tswitch day {\n\tcase \"Sat\", \"Sun\":\n\t\tfmt.Println(\"Weekend\")\n\tdefault:\n\t\tfmt.Println(\"Weekday\")\n\t}\n}",
        "lineByLine": [
          {
            "line": "switch day {",
            "explanation": "Examines one value."
          },
          {
            "line": "case \"Sat\", \"Sun\":",
            "explanation": "Comma lists share a branch; auto-break."
          },
          {
            "line": "default:",
            "explanation": "Catches the rest."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "for range walk",
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfruits := []string{\"mango\", \"banana\"}\n\tfor i, f := range fruits {\n\t\tfmt.Println(i, f)\n\t}\n}",
        "lineByLine": [
          {
            "line": "fruits := []string{...}",
            "explanation": "A slice of two strings."
          },
          {
            "line": "for i, f := range fruits {",
            "explanation": "i = index, f = value each round."
          },
          {
            "line": "fmt.Println(i, f)",
            "explanation": "Prints 0 mango / 1 banana."
          }
        ]
      },
      {
        "title": "Init in if",
        "code": "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n)\n\nfunc main() {\n\tif n, err := strconv.Atoi(\"42\"); err != nil {\n\t\tfmt.Println(\"bad\")\n\t} else {\n\t\tfmt.Println(n + 8)\n\t}\n}",
        "lineByLine": [
          {
            "line": "if n, err := strconv.Atoi(\"42\"); err != nil {",
            "explanation": "Init then test in one line."
          },
          {
            "line": "fmt.Println(\"bad\")",
            "explanation": "Error branch."
          },
          {
            "line": "fmt.Println(n + 8)",
            "explanation": "Prints 50; n scoped to branches."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "FizzBuzz with switch",
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfor i := 1; i <= 15; i++ {\n\t\tswitch {\n\t\tcase i%15 == 0:\n\t\t\tfmt.Println(\"FizzBuzz\")\n\t\tcase i%3 == 0:\n\t\t\tfmt.Println(\"Fizz\")\n\t\tcase i%5 == 0:\n\t\t\tfmt.Println(\"Buzz\")\n\t\tdefault:\n\t\t\tfmt.Println(i)\n\t\t}\n\t}\n}",
        "note": "Bare switch (no value) tests boolean cases top-down - order matters, 15 first."
      },
      {
        "title": "Labeled break",
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\nouter:\n\tfor r := 0; r < 3; r++ {\n\t\tfor c := 0; c < 3; c++ {\n\t\t\tif r == 1 && c == 1 {\n\t\t\t\tbreak outer\n\t\t\t}\n\t\t\tfmt.Print(r, c, \" \")\n\t\t}\n\t}\n}",
        "note": "Labels (outer:) let break escape nested loops directly - no flag variables."
      }
    ],
    "practice": [
      {
        "question": "Print even numbers 2..20 with for.",
        "hint": "Step i += 2.",
        "answer": "for i := 2; i <= 20; i += 2 {\n\tfmt.Println(i)\n}"
      },
      {
        "question": "Countdown 5..1 using for-as-while.",
        "hint": "Condition-only for.",
        "answer": "n := 5\nfor n > 0 {\n\tfmt.Println(n)\n\tn--\n}"
      },
      {
        "question": "Classify age via if/else chain.",
        "hint": "Minor/adult/senior brackets.",
        "answer": "age := 65\nif age < 18 {\n\tfmt.Println(\"minor\")\n} else if age < 60 {\n\tfmt.Println(\"adult\")\n} else {\n\tfmt.Println(\"senior\")\n}"
      },
      {
        "question": "Why is x := i++ illegal?",
        "hint": "++ is a statement, not a value.",
        "answer": "i := 5\ni++ // fine alone\n// x := i++ // ERROR: ++ gives no value"
      }
    ],
    "interview": [
      {
        "question": "Why does Go have only for and no while?",
        "answer": "One loop construct covers counting, conditionals (for cond), infinite (for {}), and ranging - fewer keywords, one idiom to master. for cond IS while."
      },
      {
        "question": "switch without fallthrough - explain.",
        "answer": "Cases break automatically, unlike C. Explicit fallthrough keyword exists for the rare intentional cascade - the safe default."
      },
      {
        "question": "range gives what for slices vs maps?",
        "answer": "Slices: index + copy of value. Maps: key + value in RANDOM order - never rely on map order. Use for i := range s when only the index matters."
      },
      {
        "question": "Init statements in if/switch - why idiomatic?",
        "answer": "if x := f(); x > 0 keeps x scoped to the branches - no leaking temporaries, and err-checking reads as one thought."
      }
    ]
  },
  {
    "id": "go-4",
    "title": "Collections: slices, maps & structs",
    "level": "Beginner",
    "definition": "Go collections: slices are growable views over arrays (append, len, cap), maps are key-value lookups (make, delete, comma-ok), structs bundle named fields into one record type.",
    "analogy": "Like a wedding guest system: slices are the flexible seating rows (add chairs with append), maps are the name-to-table lookup register, and structs are the per-guest card holding name, table and food choice together.",
    "keyPoints": [
      "Slices: s := []int{1,2}; s = append(s, 3); len(s) counts used, cap(s) counts room.",
      "Never index beyond len - 1; append may reallocate, so always keep its return value.",
      "Maps: m := map[string]int{\"dosa\": 60}; read with v, ok := m[\"idli\"] to detect missing keys.",
      "Structs: type Student struct { Name string; Marks int }; access fields with s.Name.",
      "range walks slices (index, value) and maps (key, value); use _ to skip what you do not need.",
      "Maps are unordered and not goroutine-safe; slices share backing arrays on copy."
    ],
    "basicExamples": [
      {
        "title": "Slice basics",
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ts := []int{10, 20}\n\ts = append(s, 30)\n\tfmt.Println(s, len(s))\n\tfmt.Println(s[0], s[len(s)-1])\n}",
        "lineByLine": [
          {
            "line": "s := []int{10, 20}",
            "explanation": "Slice literal with two elements."
          },
          {
            "line": "s = append(s, 30)",
            "explanation": "Grows to three; keep the return."
          },
          {
            "line": "fmt.Println(s, len(s))",
            "explanation": "Prints [10 20 30] 3."
          }
        ]
      },
      {
        "title": "Map lookup",
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tprice := map[string]int{\"dosa\": 60, \"idli\": 30}\n\tfmt.Println(price[\"dosa\"])\n\tv, ok := price[\"vada\"]\n\tfmt.Println(v, ok)\n}",
        "lineByLine": [
          {
            "line": "price := map[string]int{\"dosa\": 60, ...}",
            "explanation": "Menu from name to price."
          },
          {
            "line": "fmt.Println(price[\"dosa\"])",
            "explanation": "Direct hit: 60."
          },
          {
            "line": "v, ok := price[\"vada\"]",
            "explanation": "Missing key: 0, false - comma-ok detects it."
          }
        ]
      },
      {
        "title": "Struct record",
        "code": "package main\n\nimport \"fmt\"\n\ntype Student struct {\n\tName  string\n\tMarks int\n}\n\nfunc main() {\n\ts := Student{Name: \"Asha\", Marks: 92}\n\tfmt.Println(s.Name, s.Marks)\n}",
        "lineByLine": [
          {
            "line": "type Student struct { Name string; Marks int }",
            "explanation": "Record with two named fields."
          },
          {
            "line": "s := Student{Name: \"Asha\", Marks: 92}",
            "explanation": "Builds one student value."
          },
          {
            "line": "fmt.Println(s.Name, s.Marks)",
            "explanation": "Dot access reads fields."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "range walks",
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfruits := []string{\"mango\", \"banana\"}\n\tfor i, f := range fruits {\n\t\tfmt.Println(i, f)\n\t}\n}",
        "lineByLine": [
          {
            "line": "for i, f := range fruits {",
            "explanation": "i is index, f is a copy of each value."
          },
          {
            "line": "fmt.Println(i, f)",
            "explanation": "Prints 0 mango then 1 banana."
          }
        ]
      },
      {
        "title": "Delete and iterate maps",
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tm := map[string]int{\"a\": 1, \"b\": 2}\n\tdelete(m, \"a\")\n\tfor k, v := range m {\n\t\tfmt.Println(k, v)\n\t}\n}",
        "lineByLine": [
          {
            "line": "delete(m, \"a\")",
            "explanation": "Removes the key safely (no error if absent)."
          },
          {
            "line": "for k, v := range m {",
            "explanation": "Walks remaining pairs in random order."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "make with capacity",
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ts := make([]int, 0, 100)\n\tfmt.Println(len(s), cap(s))\n\ts = append(s, 1)\n\tfmt.Println(len(s), cap(s))\n}",
        "note": "make pre-books room for 100 ints: appends stay cheap without reallocating."
      },
      {
        "title": "Struct with method",
        "code": "package main\n\nimport \"fmt\"\n\ntype Student struct{ Marks int }\n\nfunc (s Student) Passed() bool { return s.Marks >= 40 }\n\nfunc main() { fmt.Println(Student{35}.Passed()) }",
        "note": "Methods attach to structs with a receiver (s Student): behaviour lives beside data."
      }
    ],
    "practice": [
      {
        "question": "Append 4 and 5 to [1,2,3]; print len.",
        "hint": "append twice, then len.",
        "answer": "s := []int{1, 2, 3}\ns = append(s, 4, 5)\nfmt.Println(s, len(s)) // 5"
      },
      {
        "question": "Count word frequency from a slice into a map.",
        "hint": "m[w]++ per word.",
        "answer": "words := []string{\"idli\", \"dosa\", \"idli\"}\nm := map[string]int{}\nfor _, w := range words {\n\tm[w]++\n}\nfmt.Println(m)"
      },
      {
        "question": "Safe map read with default 0.",
        "hint": "Comma-ok plus fallback.",
        "answer": "v, ok := price[\"vada\"]\nif !ok {\n\tv = 0\n}\nfmt.Println(v)"
      },
      {
        "question": "Fix: s2 := s1 then s2[0] = 9 surprises.",
        "hint": "Slices share backing arrays; copy first.",
        "answer": "s2 := make([]int, len(s1))\ncopy(s2, s1)\ns2[0] = 9 // s1 untouched"
      }
    ],
    "interview": [
      {
        "question": "Slice vs array in Go?",
        "answer": "Arrays have fixed length in the type ([3]int); slices ([]int) are growable views with pointer, len, cap. Nearly all code uses slices."
      },
      {
        "question": "What does append really do?",
        "answer": "Adds to the slice, reallocating (usually doubling) when cap runs out. Always use the return: s = append(s, x) - the old header may point at stale memory."
      },
      {
        "question": "Comma-ok idiom - why?",
        "answer": "v, ok := m[k] separates missing keys (zero value, false) from stored zero values (0, true). Without ok the two cases are indistinguishable."
      },
      {
        "question": "Why is map iteration random?",
        "answer": "Go deliberately shuffles map order to stop programs depending on it. Need sorted output? Collect keys, sort them, then read."
      }
    ]
  },
  {
    "id": "go-5",
    "title": "Functions, methods & errors",
    "level": "Intermediate",
    "definition": "Functions package logic: func add(a, b int) int takes typed params and returns a typed result. Go functions can return multiple values, and errors are returned as values (not thrown) so callers handle them explicitly.",
    "analogy": "Like a railway refund counter: you hand the form (arguments), the clerk either hands cash (result) or a rejection slip (error) - both come back across the same counter, and you must deal with whichever arrives.",
    "keyPoints": [
      "Signature: func add(a int, b int) int - types after names, return type at the end.",
      "Multiple returns: func div(a, b float64) (float64, error) - result plus error together.",
      "Errors are values: if err != nil { ... } right after the call - handle, do not ignore.",
      "Methods attach to structs: func (s Student) Passed() bool - receiver before the name.",
      "defer runs at function exit (cleanup); named returns pair well with naked return.",
      "Variadic: func sum(nums ...int) takes any count; pass a slice with sum(s...)."
    ],
    "basicExamples": [
      {
        "title": "Simple function",
        "code": "package main\n\nimport \"fmt\"\n\nfunc add(a int, b int) int {\n\treturn a + b\n}\n\nfunc main() {\n\tfmt.Println(add(4, 6))\n}",
        "lineByLine": [
          {
            "line": "func add(a int, b int) int {",
            "explanation": "Two int params, one int result."
          },
          {
            "line": "return a + b",
            "explanation": "Sends the sum back to the caller."
          },
          {
            "line": "fmt.Println(add(4, 6))",
            "explanation": "Calls it: prints 10."
          }
        ]
      },
      {
        "title": "Error as value",
        "code": "package main\n\nimport (\n\t\"fmt\"\n\t\"errors\"\n)\n\nfunc ticket(age int) (string, error) {\n\tif age < 0 {\n\t\treturn \"\", errors.New(\"age invalid\")\n\t}\n\treturn \"half\", nil\n}",
        "lineByLine": [
          {
            "line": "func ticket(age int) (string, error) {",
            "explanation": "Returns a string AND an error."
          },
          {
            "line": "return \"\", errors.New(\"age invalid\")",
            "explanation": "Failure: empty result plus the reason."
          },
          {
            "line": "return \"half\", nil",
            "explanation": "Success: result plus nil (no error)."
          }
        ]
      },
      {
        "title": "Method on struct",
        "code": "package main\n\nimport \"fmt\"\n\ntype Student struct{ Marks int }\n\nfunc (s Student) Passed() bool { return s.Marks >= 40 }\n\nfunc main() { fmt.Println(Student{72}.Passed()) }",
        "lineByLine": [
          {
            "line": "func (s Student) Passed() bool {",
            "explanation": "Method: receiver (s Student) binds it to the type."
          },
          {
            "line": "return s.Marks >= 40",
            "explanation": "Reads the objects own field."
          },
          {
            "line": "Student{72}.Passed()",
            "explanation": "Calls it: prints true."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Handle the error",
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\ts, err := ticket(19)\n\tif err != nil {\n\t\tfmt.Println(\"sorry:\", err)\n\t\treturn\n\t}\n\tfmt.Println(\"book:\", s)\n}",
        "lineByLine": [
          {
            "line": "s, err := ticket(19)",
            "explanation": "Both returns captured at once."
          },
          {
            "line": "if err != nil {",
            "explanation": "Standard Go check, immediately after the call."
          },
          {
            "line": "return",
            "explanation": "Bails out early so the happy path stays flat."
          }
        ]
      },
      {
        "title": "defer cleanup",
        "code": "package main\n\nimport \"fmt\"\n\nfunc shop() {\n\tdefer fmt.Println(\"shutter down\")\n\tfmt.Println(\"selling dosa\")\n}",
        "lineByLine": [
          {
            "line": "defer fmt.Println(\"shutter down\")",
            "explanation": "Queued to run when shop() exits."
          },
          {
            "line": "fmt.Println(\"selling dosa\")",
            "explanation": "Runs first; deferred line runs last."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Named returns",
        "code": "package main\n\nimport \"fmt\"\n\nfunc split(bill int) (veg int, nonveg int) {\n\tveg = bill * 60 / 100\n\tnonveg = bill - veg\n\treturn\n}",
        "note": "Named results act as pre-declared variables; bare return sends them home - keep functions short so this stays readable."
      },
      {
        "title": "Variadic total",
        "code": "package main\n\nimport \"fmt\"\n\nfunc sum(nums ...int) int {\n\tt := 0\n\tfor _, n := range nums {\n\t\tt += n\n\t}\n\treturn t\n}\n\nfunc main() { fmt.Println(sum(10, 20, 30)) }",
        "note": "...int gathers any count into a slice; callers can spread their own slice with sum(s...)."
      }
    ],
    "practice": [
      {
        "question": "Write mul(a, b int) int; print mul(7, 6).",
        "hint": "Signature then return.",
        "answer": "func mul(a, b int) int {\n\treturn a * b\n}"
      },
      {
        "question": "Write even(n int) (bool, error): negative input is an error.",
        "hint": "Two returns; nil on success.",
        "answer": "func even(n int) (bool, error) {\n\tif n < 0 {\n\t\treturn false, errors.New(\"negative\")\n\t}\n\treturn n%2 == 0, nil\n}"
      },
      {
        "question": "Attach Area() float64 to struct Rect{W, H float64}.",
        "hint": "Receiver method.",
        "answer": "func (r Rect) Area() float64 { return r.W * r.H }"
      },
      {
        "question": "Fix: ignoring err from strconv.Atoi causes surprise 0. Show the guard.",
        "hint": "Check err != nil.",
        "answer": "n, err := strconv.Atoi(s)\nif err != nil {\n\tfmt.Println(\"bad number\")\n\treturn\n}"
      }
    ],
    "interview": [
      {
        "question": "Why does Go return errors instead of throwing?",
        "answer": "Explicit handling: every failure path is visible at the call site, no hidden control flow. Forces developers to decide: handle, wrap (%w), or propagate."
      },
      {
        "question": "Method vs function - what changes?",
        "answer": "Only the receiver: func (s T) M() binds behaviour to type T, enabling interfaces. Value receivers copy; pointer receivers (*T) mutate and avoid copies."
      },
      {
        "question": "What does defer do, and when does it run?",
        "answer": "Defers a call until the surrounding function returns (LIFO order). Classic for closing files, unlocking mutexes - guaranteed cleanup even on error returns."
      },
      {
        "question": "When do multiple returns beat structs?",
        "answer": "For result+error pairs and small tuples. Beyond 2-3 values, a named struct documents fields better than an anonymous tuple."
      }
    ]
  },
  {
    "id": "go-6",
    "title": "Structs, pointers & interfaces",
    "level": "Intermediate",
    "definition": "Structs bundle fields into records; pointers (&x, *p) reference memory for mutation and cheap passing; methods attach behaviour via receivers; interfaces declare method sets that any matching type satisfies implicitly.",
    "analogy": "Like a canteen thali card: a struct is the printed card listing fixed slots (dish, price); a pointer is the token number pointing at your thali on the shelf; an interface is the promise any counter must keep - serve(item) - whether veg or chinese counter.",
    "keyPoints": [
      "type Student struct { Name string; Marks int } bundles fields; access with s.Name.",
      "Pointers: p := &x takes the address; *p reads/writes through it; nil means pointing nowhere.",
      "Pointer receivers func (s *Student) Pass() mutate the original; value receivers copy.",
      "Interfaces: type Server interface { Serve(item string) string } - no implements keyword needed.",
      "Any type with the methods satisfies the interface automatically (duck typing, checked at compile).",
      "Nil interface vs typed-nil: an interface holding a nil pointer is NOT == nil - classic gotcha."
    ],
    "basicExamples": [
      {
        "title": "Struct basics",
        "code": "package main\n\nimport \"fmt\"\n\ntype Student struct {\n\tName  string\n\tMarks int\n}\n\nfunc main() {\n\ts := Student{Name: \"Asha\", Marks: 92}\n\tfmt.Println(s.Name, s.Marks)\n}",
        "lineByLine": [
          {
            "line": "type Student struct {",
            "explanation": "Blueprint with two named fields."
          },
          {
            "line": "s := Student{Name: \"Asha\", Marks: 92}",
            "explanation": "Builds one record value."
          },
          {
            "line": "fmt.Println(s.Name, s.Marks)",
            "explanation": "Dot access reads fields."
          }
        ]
      },
      {
        "title": "Pointer mutation",
        "code": "package main\n\nimport \"fmt\"\n\nfunc bonus(m *int) {\n\t*m += 5\n}\n\nfunc main() {\n\tmarks := 90\n\tbonus(&marks)\n\tfmt.Println(marks)\n}",
        "lineByLine": [
          {
            "line": "func bonus(m *int) {",
            "explanation": "Receives the ADDRESS of an int."
          },
          {
            "line": "*m += 5",
            "explanation": "Dereference-and-add edits the original."
          },
          {
            "line": "bonus(&marks)",
            "explanation": "& passes the address: prints 95."
          }
        ]
      },
      {
        "title": "Method receivers",
        "code": "package main\n\nimport \"fmt\"\n\ntype Cart struct{ Total int }\n\nfunc (c *Cart) Add(n int) { c.Total += n }\n\nfunc main() {\n\tc := Cart{}\n\tc.Add(60)\n\tfmt.Println(c.Total)\n}",
        "lineByLine": [
          {
            "line": "func (c *Cart) Add(n int)",
            "explanation": "Add belongs to *Cart: pointer receiver."
          },
          {
            "line": "c.Add(60)",
            "explanation": "Shorthand for (&c).Add(60)."
          },
          {
            "line": "fmt.Println(c.Total)",
            "explanation": "Prints 60 - mutation stuck."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Interface in action",
        "code": "package main\n\nimport \"fmt\"\n\ntype Server interface{ Serve(item string) string }\n\ntype Veg struct{}\n\nfunc (Veg) Serve(item string) string { return \"veg \" + item }\n\nfunc order(s Server) { fmt.Println(s.Serve(\"thali\")) }\n\nfunc main() { order(Veg{}) }",
        "lineByLine": [
          {
            "line": "type Server interface{ ... }",
            "explanation": "Requires one method: Serve."
          },
          {
            "line": "func (Veg) Serve(...)",
            "explanation": "Veg implements it - no keyword needed."
          },
          {
            "line": "order(Veg{})",
            "explanation": "Veg accepted wherever Server is wanted."
          }
        ]
      },
      {
        "title": "Nil pointer guard",
        "code": "package main\n\nimport \"fmt\"\n\nfunc safe(s *string) string {\n\tif s == nil {\n\t\treturn \"guest\"\n\t}\n\treturn *s\n}\n\nfunc main() { fmt.Println(safe(nil)) }",
        "lineByLine": [
          {
            "line": "if s == nil {",
            "explanation": "Always check before dereferencing."
          },
          {
            "line": "return \"guest\"",
            "explanation": "Fallback for missing value."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Typed-nil interface trap",
        "code": "package main\n\nimport \"fmt\"\n\ntype Server interface{ Serve() }\n\ntype Veg struct{}\n\nfunc (v *Veg) Serve() {}\n\nfunc main() {\n\tvar v *Veg\n\tvar s Server = v\n\tfmt.Println(s == nil)\n}",
        "note": "Prints false: the interface holds type info + nil pointer. Return explicit nil interfaces, or check with type assertion."
      },
      {
        "title": "Embedding for composition",
        "code": "package main\n\nimport \"fmt\"\n\ntype Bill struct{ Total int }\ntype Order struct {\n\tBill\n\tTable int\n}\n\nfunc main() {\n\to := Order{Table: 4}\n\to.Total = 240\n\tfmt.Println(o.Table, o.Total)\n}",
        "note": "Embedding promotes Bill fields into Order - Go composition over inheritance."
      }
    ],
    "practice": [
      {
        "question": "Define Book{Title, Pages}; print pages of one book.",
        "hint": "Struct literal + dot.",
        "answer": "type Book struct {\n\tTitle string\n\tPages int\n}\nb := Book{Title: \"Gita\", Pages: 700}\nfmt.Println(b.Pages)"
      },
      {
        "question": "Write inc(p *int) adding 1; show the caller sees it.",
        "hint": "& and * pair.",
        "answer": "func inc(p *int) { *p++ }\nn := 5\ninc(&n)\nfmt.Println(n) // 6"
      },
      {
        "question": "Interface Shape{Area() float64}; implement for Square.",
        "hint": "Method set match.",
        "answer": "type Square struct{ Side float64 }\nfunc (s Square) Area() float64 { return s.Side * s.Side }"
      },
      {
        "question": "Fix: value receiver method not saving updates. Why?",
        "hint": "Receiver copied; use pointer.",
        "answer": "func (c *Cart) Add(n int) { c.Total += n } // *Cart keeps the change"
      }
    ],
    "interview": [
      {
        "question": "Value vs pointer receiver?",
        "answer": "Value: operates on a copy (safe, small structs). Pointer: mutates original, avoids copying large structs. Rule: if ANY method needs pointer, use pointer for all for consistency."
      },
      {
        "question": "How are Go interfaces satisfied?",
        "answer": "Implicitly: a type implementing all methods qualifies automatically - no declaration. Enables decoupled design and easy mocks in tests."
      },
      {
        "question": "Explain the typed-nil gotcha.",
        "answer": "An interface is (type, value); storing a nil pointer sets value nil but type non-nil, so == nil is false. Check underlying value or return nil interface explicitly."
      },
      {
        "question": "Struct embedding vs inheritance?",
        "answer": "Go has no inheritance: embedding composes by promoting inner fields/methods to the outer type. Behaviour reuse without fragile base-class coupling."
      }
    ]
  },
  {
    "id": "go-7",
    "title": "Concurrency: goroutines & channels",
    "level": "Intermediate",
    "definition": "Concurrency runs tasks together: go f() starts a lightweight goroutine; channels (chan) pass data safely between them. Buffered channels queue items; select waits on whichever message arrives first.",
    "analogy": "Like a busy dosa counter: each cook (goroutine) works their own tawa, and the steel trays sliding between counter and tables (channels) carry plates safely - nobody grabs food from another cook’s hands.",
    "keyPoints": [
      "go cook(order) starts a goroutine: cheap (KBs), thousands can run, scheduled by the Go runtime.",
      "ch := make(chan int) creates a channel; ch <- 5 sends, x := <-ch receives (blocks till ready).",
      "Unbuffered channels sync sender and receiver; make(chan int, 10) buffers ten without blocking.",
      "sync.WaitGroup waits for a batch: Add(1) before each go, Done() inside, Wait() at the end.",
      "select picks whichever channel is ready first - the heart of timeouts and fan-in merges.",
      "Never copy a sync.Mutex; share by pointer or the lock silently stops working."
    ],
    "basicExamples": [
      {
        "title": "First goroutine",
        "code": "package main\n\nimport (\n  \"fmt\"\n  \"time\"\n)\n\nfunc cook(item string) {\n  fmt.Println(\"cooking\", item)\n}\n\nfunc main() {\n  go cook(\"dosa\")\n  go cook(\"idli\")\n  time.Sleep(100)\n  fmt.Println(\"done\")\n}",
        "lineByLine": [
          {
            "line": "go cook(\"dosa\")",
            "explanation": "Starts cooking without waiting."
          },
          {
            "line": "go cook(\"idli\")",
            "explanation": "Second cook starts in parallel."
          },
          {
            "line": "time.Sleep(100)",
            "explanation": "Keeps main alive so cooks finish (demo only)."
          }
        ]
      },
      {
        "title": "Channel handoff",
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n  ch := make(chan string)\n  go func() { ch <- \"dosa ready\" }()\n  msg := <-ch\n  fmt.Println(msg)\n}",
        "lineByLine": [
          {
            "line": "ch := make(chan string)",
            "explanation": "Tray carrying strings between cooks."
          },
          {
            "line": "go func() { ch <- \"dosa ready\" }()",
            "explanation": "Background cook slides the plate on."
          },
          {
            "line": "msg := <-ch",
            "explanation": "Main blocks until the plate arrives."
          }
        ]
      },
      {
        "title": "WaitGroup batch",
        "code": "package main\n\nimport (\n  \"fmt\"\n  \"sync\"\n)\n\nfunc main() {\n  var wg sync.WaitGroup\n  for _, item := range []string{\"a\", \"b\", \"c\"} {\n    wg.Add(1)\n    go func(s string) {\n      fmt.Println(s)\n      wg.Done()\n    }(item)\n  }\n  wg.Wait()\n}",
        "lineByLine": [
          {
            "line": "wg.Add(1)",
            "explanation": "Registers one task before starting it."
          },
          {
            "line": "wg.Done()",
            "explanation": "Signals this cook finished."
          },
          {
            "line": "wg.Wait()",
            "explanation": "Blocks until all three are done."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Buffered queue",
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n  orders := make(chan string, 2)\n  orders <- \"dosa\"\n  orders <- \"idli\"\n  fmt.Println(<-orders)\n  fmt.Println(<-orders)\n}",
        "lineByLine": [
          {
            "line": "orders := make(chan string, 2)",
            "explanation": "Tray holds two plates without a waiter."
          },
          {
            "line": "orders <- \"dosa\"",
            "explanation": "First send does NOT block (buffer free)."
          },
          {
            "line": "fmt.Println(<-orders)",
            "explanation": "Receives in FIFO order."
          }
        ]
      },
      {
        "title": "select timeout",
        "code": "package main\n\nimport (\n  \"fmt\"\n  \"time\"\n)\n\nfunc main() {\n  ch := make(chan string)\n  select {\n  case m := <-ch:\n    fmt.Println(m)\n  case <-time.After(50):\n    fmt.Println(\"too slow\")\n  }\n}",
        "lineByLine": [
          {
            "line": "select {",
            "explanation": "Waits on all branches at once."
          },
          {
            "line": "case m := <-ch:",
            "explanation": "Wins if the cook answers in time."
          },
          {
            "line": "case <-time.After(50):",
            "explanation": "Fires after 50 units: timeout branch wins."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Fan-in merge",
        "code": "func fanIn(a, b <-chan string) <-chan string {\n  out := make(chan string)\n  go func() {\n    for a != nil || b != nil {\n      select {\n      case m, ok := <-a:\n        if !ok { a = nil; continue }\n        out <- m\n      case m, ok := <-b:\n        if !ok { b = nil; continue }\n        out <- m\n      }\n    }\n    close(out)\n  }()\n  return out\n}",
        "note": "Merges two cook streams into one serving line; nil-ing a closed channel removes it from select."
      },
      {
        "title": "Worker pool",
        "code": "jobs := make(chan int, 10)\nresults := make(chan int, 10)\nfor w := 0; w < 3; w++ {\n  go func() {\n    for j := range jobs {\n      results <- j * j\n    }\n  }()\n}",
        "note": "Three workers share one job queue; range closes down cleanly when jobs closes - fixed parallelism, elastic demand."
      }
    ],
    "practice": [
      {
        "question": "Run hello three times concurrently, wait for all.",
        "hint": "go plus WaitGroup.",
        "answer": "package main\n\nimport (\n  \"fmt\"\n  \"sync\"\n)\n\nfunc main() {\n  var wg sync.WaitGroup\n  for i := 0; i < 3; i++ {\n    wg.Add(1)\n    go func() { fmt.Println(\"hello\"); wg.Done() }()\n  }\n  wg.Wait()\n}"
      },
      {
        "question": "Send numbers 1..3 on a channel; print their sum.",
        "hint": "Buffered chan plus receive loop.",
        "answer": "ch := make(chan int, 3)\nch <- 1\nch <- 2\nch <- 3\nclose(ch)\ns := 0\nfor n := range ch {\n  s += n\n}\nfmt.Println(s)"
      },
      {
        "question": "Print whichever finishes first: fast (10) or slow (100 sleep).",
        "hint": "select with two channels.",
        "answer": "fast := make(chan string, 1)\nslow := make(chan string, 1)\nfast <- \"fast wins\"\nselect {\ncase m := <-fast:\n  fmt.Println(m)\ncase m := <-slow:\n  fmt.Println(m)\n}"
      },
      {
        "question": "Why does main exit before go output prints? Fix it.",
        "hint": "Main does not wait for goroutines.",
        "answer": "// Fix: block with a channel or WaitGroup\n// done := make(chan bool)\n// go func() { fmt.Println(\"hi\"); done <- true }()\n// <-done"
      }
    ],
    "interview": [
      {
        "question": "Goroutine vs OS thread - why cheaper?",
        "answer": "KB-sized stacks grown by the runtime, multiplexed M:N onto threads. Spawning thousands is normal; thousands of OS threads would exhaust memory."
      },
      {
        "question": "Unbuffered vs buffered channels?",
        "answer": "Unbuffered: rendezvous, both sides sync each handoff. Buffered: queue up to cap without blocking. Unbuffered for sync points, buffered for smoothing bursts."
      },
      {
        "question": "What is select really doing?",
        "answer": "Blocks until one branch can proceed, picks randomly among ready ones, runs default if given and none ready. Timeouts, cancellation and fan-in all build on it."
      },
      {
        "question": "When is a mutex better than a channel?",
        "answer": "Channels move OWNERSHIP of data; mutexes guard SHARED state (counters, caches). Simple counter plus mutex beats channel ping-pong; pipelines prefer channels."
      }
    ]
  },
  {
    "id": "go-8",
    "title": "Interfaces, embedding & composition",
    "level": "Intermediate",
    "definition": "Methods are functions attached to a type via a receiver (func (r Rect) Area() float64). An interface is a set of method signatures; any type implementing them satisfies it implicitly (no 'implements' keyword). Go favours composition (embedding) over deep inheritance.",
    "analogy": "Like a food-delivery app contract: an interface is the promise 'anything that can Deliver() and Track() is a Courier'. Zomato, Swiggy, Dunzo each satisfy it differently (value or pointer receivers) without ever declaring 'implements Courier'. Composition is adding a 'Driver' struct inside a 'Courier' to reuse fields.",
    "keyPoints": [
      "Value receiver (r Rect) copies; pointer receiver (r *Rect) can mutate - be consistent within a type.",
      "Interfaces are satisfied implicitly: define Area() float64 and your type is a Shape.",
      "The empty interface any accepts anything - use sparingly; typed interfaces catch bugs at compile time.",
      "Type assertions (s.(Rect)) and the comma-ok form (s.(Rect), ok) safely extract concrete types.",
      "A type switch (switch v := x.(type)) branches on the dynamic type of an interface value.",
      "Composition: embed struct B in A to reuse B's fields/methods - Go's answer to inheritance."
    ],
    "basicExamples": [
      {
        "title": "Method on a type",
        "code": "package main\n\nimport \"fmt\"\n\ntype Rect struct {\n\tW, H float64\n}\n\nfunc (r Rect) Area() float64 {\n\treturn r.W * r.H\n}\n\nfunc main() {\n\tr := Rect{W: 5, H: 4}\n\tfmt.Println(r.Area())\n}",
        "lineByLine": [
          {
            "line": "type Rect struct { W, H float64 }",
            "explanation": "A struct grouping width and height."
          },
          {
            "line": "func (r Rect) Area() float64 { return r.W * r.H }",
            "explanation": "A method with receiver r - callable as r.Area()."
          },
          {
            "line": "fmt.Println(r.Area())",
            "explanation": "Prints 20."
          }
        ]
      },
      {
        "title": "Interface satisfied implicitly",
        "code": "package main\n\nimport \"fmt\"\n\ntype Shape interface {\n\tArea() float64\n}\n\ntype Rect struct{ W, H float64 }\n\nfunc (r Rect) Area() float64 { return r.W * r.H }\n\nfunc main() {\n\tvar s Shape = Rect{W: 3, H: 4}\n\tfmt.Println(s.Area())\n}",
        "lineByLine": [
          {
            "line": "type Shape interface { Area() float64 }",
            "explanation": "Just a method signature - no implementation."
          },
          {
            "line": "func (r Rect) Area() float64",
            "explanation": "Rect now satisfies Shape automatically - no keyword needed."
          },
          {
            "line": "var s Shape = Rect{W: 3, H: 4}",
            "explanation": "Assign a Rect wherever a Shape is expected."
          }
        ]
      },
      {
        "title": "Pointer receiver mutation",
        "code": "package main\n\nimport \"fmt\"\n\ntype Counter struct{ n int }\n\nfunc (c *Counter) Inc() { c.n++ }\n\nfunc main() {\n\tc := Counter{}\n\tc.Inc()\n\tc.Inc()\n\tfmt.Println(c.n)\n}",
        "lineByLine": [
          {
            "line": "func (c *Counter) Inc() { c.n++ }",
            "explanation": "Pointer receiver - can modify the original."
          },
          {
            "line": "c.Inc(); c.Inc()",
            "explanation": "Go auto-takes the address so c.Inc() works on a value."
          },
          {
            "line": "fmt.Println(c.n)",
            "explanation": "Prints 2 - mutations persisted."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Type assertion + comma-ok",
        "code": "package main\n\nimport \"fmt\"\n\nfunc describe(i any) {\n\ts, ok := i.(string)\n\tif ok {\n\t\tfmt.Println(\"string of len\", len(s))\n\t} else {\n\t\tfmt.Println(\"not a string\")\n\t}\n}\n\nfunc main() {\n\tdescribe(\"dosa\")\n\tdescribe(42)\n}",
        "lineByLine": [
          {
            "line": "s, ok := i.(string)",
            "explanation": "Comma-ok: ok is false instead of panicking if i is not a string."
          },
          {
            "line": "if ok { ... } else { ... }",
            "explanation": "Handle both the string and non-string cases safely."
          },
          {
            "line": "describe(42)",
            "explanation": "Prints 'not a string' - no panic."
          }
        ]
      },
      {
        "title": "Type switch",
        "code": "package main\n\nimport \"fmt\"\n\nfunc classify(v any) string {\n\tswitch t := v.(type) {\n\tcase int:\n\t\treturn fmt.Sprintf(\"int %d\", t)\n\tcase string:\n\t\treturn \"string \" + t\n\tdefault:\n\t\treturn \"unknown\"\n\t}\n}\n\nfunc main() {\n\tfmt.Println(classify(7), classify(\"hi\"))\n}",
        "lineByLine": [
          {
            "line": "switch t := v.(type)",
            "explanation": "t has the concrete type inside each case."
          },
          {
            "line": "case int: return fmt.Sprintf(\"int %d\", t)",
            "explanation": "t is an int here."
          },
          {
            "line": "default: return \"unknown\"",
            "explanation": "Catches every other type."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Composition via embedding",
        "code": "package main\n\nimport \"fmt\"\n\ntype Engine struct{ HP int }\n\nfunc (e Engine) Start() string { return \"vroom\" }\n\ntype Car struct {\n\tEngine  // embedded: Car gets Start() and HP\n\tName string\n}\n\nfunc main() {\n\tc := Car{Engine: Engine{HP: 200}, Name: \"Swift\"}\n\tfmt.Println(c.Name, c.Start(), c.HP)\n}",
        "note": "Embedding Engine gives Car both the Start() method and the HP field for free - reuse without inheritance."
      },
      {
        "title": "Interface-driven decoupling",
        "code": "package main\n\nimport \"fmt\"\n\ntype Notifier interface{ Notify(msg string) }\n\ntype SMS struct{}\nfunc (SMS) Notify(m string) { fmt.Println(\"SMS:\", m) }\n\nfunc send(n Notifier) { n.Notify(\"order ready\") }\n\nfunc main() { send(SMS{}) }",
        "note": "Functions depend on the small Notifier interface, not on SMS directly - swap in Email later without touching send()."
      }
    ],
    "practice": [
      {
        "question": "Add a Perimeter() method to Rect and print it.",
        "hint": "func (r Rect) Perimeter() float64.",
        "answer": "func (r Rect) Perimeter() float64 { return 2 * (r.W + r.H) }\nfmt.Println(Rect{W: 5, H: 4}.Perimeter()) // 18"
      },
      {
        "question": "Make a type satisfy Stringer so fmt prints it nicely.",
        "hint": "Implement String() string.",
        "answer": "func (r Rect) String() string {\n\treturn fmt.Sprintf(\"Rect %gx%g\", r.W, r.H)\n}\nfmt.Println(Rect{2, 3}) // Rect 2x3"
      },
      {
        "question": "Safely extract an int from an any without panicking.",
        "hint": "Comma-ok assertion.",
        "answer": "n, ok := x.(int)\nif !ok {\n\tfmt.Println(\"not an int\")\n}"
      },
      {
        "question": "Give Car an Engine field so c.Start() works - which Go feature?",
        "hint": "Embedding, not inheritance.",
        "answer": "type Car struct {\n\tEngine\n\tName string\n}  // c.Start() and c.HP both work via embedding"
      }
    ],
    "interview": [
      {
        "question": "How does Go achieve polymorphism without inheritance?",
        "answer": "Implicit interface satisfaction: any type with the right methods satisfies the interface. Composition (embedding) reuses code instead of class hierarchies."
      },
      {
        "question": "Value vs pointer receiver - how to choose?",
        "answer": "Value receiver: read-only, small structs, keeps value semantics. Pointer receiver: mutation, large structs (avoid copying), or to satisfy an interface consistently. Mixing them per type causes subtle bugs."
      },
      {
        "question": "What is the empty interface any and its risk?",
        "answer": "any = interface{} accepts all types. Convenient for generic containers but moves errors from compile time to runtime; prefer typed interfaces."
      },
      {
        "question": "Type assertion vs type switch?",
        "answer": "Assertion extracts ONE expected type (with comma-ok for safety). A type switch branches on many possible dynamic types at once - cleaner for multiple cases."
      }
    ]
  },
  {
    "id": "go-9",
    "title": "Concurrency patterns: WaitGroup, select & context",
    "level": "Advanced",
    "definition": "Go runs functions concurrently with the lightweight keyword go, and they communicate through typed channels instead of shared memory. sync.WaitGroup waits for a set of goroutines, buffered channels cap work in flight, and select picks whichever channel is ready first.",
    "analogy": "Like an Indian dhaba kitchen: each go cook is a separate tawa (goroutine), the order tickets pinned to the wall are the channels, and the manager standing at the pass is select deciding which dish to plate next. The WaitGroup is the manager waiting until every tawa has finished its order.",
    "keyPoints": [
      "go doWork() starts doWork immediately and does not wait - scheduling is done by the Go runtime, not by you.",
      "A channel is a pipe: ch <- v sends, v := <-ch receives; unbuffered channels hand over the value only when both sides meet.",
      "close(ch) signals no more values, which ends a for range ch loop cleanly.",
      "A goroutine that sends to a channel nobody reads blocks forever and leaks - always pair sends with a receiver or a timeout.",
      "Buffered channels (make(chan int, 10)) hold up to 10 values before the sender blocks, smoothing bursts of work.",
      "select with a <-time.After(d) case adds a deadline to any wait, and a default case makes a receive non-blocking."
    ],
    "basicExamples": [
      {
        "title": "WaitGroup joins goroutines",
        "code": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n\t\"time\"\n)\n\nfunc cook(dish string, wg *sync.WaitGroup) {\n\tdefer wg.Done()\n\ttime.Sleep(50 * time.Millisecond)\n\tfmt.Println(dish, \"ready\")\n}\n\nfunc main() {\n\tvar wg sync.WaitGroup\n\tfor _, dish := range []string{\"dosa\", \"idli\", \"vada\"} {\n\t\twg.Add(1)\n\t\tgo cook(dish, &wg)\n\t}\n\twg.Wait()\n\tfmt.Println(\"all served\")\n}",
        "lineByLine": [
          {
            "line": "func cook(dish string, wg *sync.WaitGroup) {",
            "explanation": "Gets the group pointer so it can report completion."
          },
          {
            "line": "defer wg.Done()",
            "explanation": "Marks this goroutine done when the function returns, even on panic."
          },
          {
            "line": "wg.Add(1)",
            "explanation": "Counts one task before launching it."
          },
          {
            "line": "go cook(dish, &wg)",
            "explanation": "Starts the goroutine; main carries on immediately."
          },
          {
            "line": "wg.Wait()",
            "explanation": "Blocks until all 3 calls to Done bring the counter to 0."
          }
        ]
      },
      {
        "title": "Send and receive",
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tch := make(chan string)\n\tgo func() { ch <- \"order 205\" }()\n\tmsg := <-ch\n\tfmt.Println(msg)\n}",
        "lineByLine": [
          {
            "line": "ch := make(chan string)",
            "explanation": "Unbuffered pipe carrying strings."
          },
          {
            "line": "go func() { ch <- \"order 205\" }()",
            "explanation": "Sends from a separate goroutine so main is not blocked."
          },
          {
            "line": "msg := <-ch",
            "explanation": "Receives the value; unblocks the sender."
          },
          {
            "line": "fmt.Println(msg)",
            "explanation": "Prints order 205."
          }
        ]
      },
      {
        "title": "Close and range",
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tch := make(chan int)\n\tgo func() {\n\t\tfor i := 1; i <= 3; i++ {\n\t\t\tch <- i\n\t\t}\n\t\tclose(ch)\n\t}()\n\tfor n := range ch {\n\t\tfmt.Println(n)\n\t}\n}",
        "lineByLine": [
          {
            "line": "for i := 1; i <= 3; i++ { ch <- i }",
            "explanation": "Sends 1, 2, 3 down the pipe."
          },
          {
            "line": "close(ch)",
            "explanation": "Announces the end of values - never send on it again."
          },
          {
            "line": "for n := range ch {",
            "explanation": "Receives until the channel is closed, then exits."
          },
          {
            "line": "fmt.Println(n)",
            "explanation": "Prints 1 then 2 then 3."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Buffered channel burst",
        "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tjobs := make(chan int, 3)\n\tjobs <- 1\n\tjobs <- 2\n\tjobs <- 3\n\tclose(jobs)\n\tfmt.Println(\"queued 3 without blocking\")\n\tfor j := range jobs {\n\t\tfmt.Println(\"do\", j)\n\t}\n}",
        "lineByLine": [
          {
            "line": "jobs := make(chan int, 3)",
            "explanation": "Buffer of 3 lets three sends complete before anyone reads."
          },
          {
            "line": "jobs <- 1",
            "explanation": "Fits in the buffer; the sender never blocks."
          },
          {
            "line": "for j := range jobs {",
            "explanation": "Drains the buffered values in order after close."
          }
        ]
      },
      {
        "title": "select with timeout",
        "code": "package main\n\nimport (\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc main() {\n\tch := make(chan string)\n\tselect {\n\tcase msg := <-ch:\n\t\tfmt.Println(\"got\", msg)\n\tcase <-time.After(200 * time.Millisecond):\n\t\tfmt.Println(\"timed out waiting\")\n\t}\n}",
        "lineByLine": [
          {
            "line": "case msg := <-ch:",
            "explanation": "First branch that is ready wins."
          },
          {
            "line": "case <-time.After(200 * time.Millisecond):",
            "explanation": "A timer channel fires after 200ms as a safety net."
          },
          {
            "line": "fmt.Println(\"timed out waiting\")",
            "explanation": "Nothing sends, so this branch runs."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Worker pool",
        "code": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc main() {\n\tjobs := make(chan int, 6)\n\tresults := make(chan int, 6)\n\tvar wg sync.WaitGroup\n\tfor w := 0; w < 3; w++ {\n\t\twg.Add(1)\n\t\tgo func() {\n\t\t\tdefer wg.Done()\n\t\t\tfor j := range jobs {\n\t\t\t\tresults <- j * j\n\t\t\t}\n\t\t}()\n\t}\n\tfor i := 1; i <= 6; i++ {\n\t\tjobs <- i\n\t}\n\tclose(jobs)\n\twg.Wait()\n\tclose(results)\n\tfor r := range results {\n\t\tfmt.Println(r)\n\t}\n}",
        "note": "Three workers pull from one job channel: fixed concurrency, back-pressure from the buffer, and no data races because ownership passes through the channel."
      },
      {
        "title": "Race detector discipline",
        "code": "// go run -race main.go\n\npackage main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nvar hits int\n\nfunc main() {\n\tvar wg sync.WaitGroup\n\tvar mu sync.Mutex\n\tfor i := 0; i < 1000; i++ {\n\t\twg.Add(1)\n\t\tgo func() {\n\t\t\tdefer wg.Done()\n\t\t\tmu.Lock()\n\t\t\thits++\n\t\t\tmu.Unlock()\n\t\t}()\n\t}\n\twg.Wait()\n\tfmt.Println(hits)\n}",
        "note": "Run every concurrent test with -race: it instruments memory access and fails the moment two goroutines touch hits without the mutex."
      }
    ],
    "practice": [
      {
        "question": "Run 3 goroutines that print their name and wait for all with a WaitGroup.",
        "hint": "Add before each go, Done via defer.",
        "answer": "var wg sync.WaitGroup\nnames := []string{\"a\", \"b\", \"c\"}\nfor _, n := range names {\n\twg.Add(1)\n\tgo func(n string) { defer wg.Done(); fmt.Println(n) }(n)\n}\nwg.Wait()"
      },
      {
        "question": "Sum 1..5 in a goroutine and print the total from main.",
        "hint": "Send the result on a channel rather than sharing a variable.",
        "answer": "ch := make(chan int)\ngo func() { t := 0; for i := 1; i <= 5; i++ { t += i }; ch <- t }()\nfmt.Println(<-ch)"
      },
      {
        "question": "Make a receive time out after 100ms instead of hanging.",
        "hint": "select with time.After.",
        "answer": "select {\ncase v := <-ch:\n\tfmt.Println(v)\ncase <-time.After(100 * time.Millisecond):\n\tfmt.Println(\"timeout\")\n}"
      },
      {
        "question": "What leaks when a goroutine sends to a channel nobody reads?",
        "hint": "It blocks forever holding its stack and any captured memory.",
        "answer": "The goroutine is parked forever and the WaitGroup never reaches zero, so main hangs too. Fix by always closing or buffering, and by using select with a timeout or a done channel."
      }
    ],
    "interview": [
      {
        "question": "Goroutine vs OS thread - why is concurrency cheap in Go?",
        "answer": "Goroutines start at a few KB of stack (grown on demand) and are multiplexed onto a small set of OS threads by the runtime scheduler. Spawning 1,000,000 goroutines is normal; 1,000,000 OS threads is not."
      },
      {
        "question": "Buffered vs unbuffered channel - when to pick each?",
        "answer": "Unbuffered gives a strict rendezvous: the sender blocks until the receiver takes the value, which guarantees synchronisation. Buffered decouples producer and consumer up to the limit - good for bursts and queues, but it can hide back-pressure and delays."
      },
      {
        "question": "What is a select statement actually good for?",
        "answer": "Waiting on multiple channels at once: timeouts (time.After), cancellation (done channels), and taking whichever result arrives first. A default branch turns the whole thing non-blocking."
      },
      {
        "question": "How do you avoid a data race without channels?",
        "answer": "Guard shared state with sync.Mutex (or sync/atomic for counters), keeping the critical section tiny. But the idiomatic Go answer is still: share memory by communicating - pass ownership through a channel instead."
      }
    ]
  },
  {
    "id": "go-10",
    "title": "HTTP services, JSON & data access",
    "level": "Advanced",
    "definition": "The net/http package builds servers and clients using only the standard library: ServeMux routes URL paths, handlers write status codes and bytes, and encoding/json maps Go structs to JSON through struct tags.",
    "analogy": "Like a railway enquiry counter: the mux is the signboard telling each queue (route) which window to approach; the handler is the clerk who checks the ticket (request) and writes the reply; struct tags are the pre-printed form fields so customer details land in the right boxes.",
    "keyPoints": [
      "mux.HandleFunc(\"/health\", h) registers a route; a trailing slash makes the pattern match a whole subtree.",
      "An http.HandlerFunc takes (w http.ResponseWriter, r *http.Request) and is itself a type - pass it straight to HandleFunc.",
      "Return JSON with w.Header().Set(\"Content-Type\", \"application/json\") before w.WriteHeader(status).",
      "Struct tags control the wire format: json:\"user_name\" renames, json:\"-\" hides a field entirely.",
      "Only exported (capitalised) fields are marshalled - lowercase fields are silently ignored.",
      "Decode with json.NewDecoder(r.Body).Decode(&payload) so malformed bodies surface as an error you can return."
    ],
    "basicExamples": [
      {
        "title": "Minimal server",
        "code": "package main\n\nimport (\n\t\"fmt\"\n\t\"net/http\"\n)\n\nfunc main() {\n\tmux := http.NewServeMux()\n\tmux.HandleFunc(\"/health\", func(w http.ResponseWriter, r *http.Request) {\n\t\tfmt.Fprintln(w, \"ok\")\n\t})\n\thttp.ListenAndServe(\":8080\", mux)\n}",
        "lineByLine": [
          {
            "line": "mux := http.NewServeMux()",
            "explanation": "A router mapping URL patterns to handlers."
          },
          {
            "line": "mux.HandleFunc(\"/health\", func(w http.ResponseWriter, r *http.Request) {",
            "explanation": "Registers the exact path /health."
          },
          {
            "line": "fmt.Fprintln(w, \"ok\")",
            "explanation": "Writing to w sends the body and implies status 200."
          },
          {
            "line": "http.ListenAndServe(\":8080\", mux)",
            "explanation": "Starts the server; it blocks until shutdown."
          }
        ]
      },
      {
        "title": "JSON response",
        "code": "package main\n\nimport (\n\t\"encoding/json\"\n\t\"net/http\"\n)\n\ntype Station struct {\n\tCode string `json:\"code\"`\n\tName string `json:\"name\"`\n}\n\nfunc main() {\n\thttp.HandleFunc(\"/station\", func(w http.ResponseWriter, r *http.Request) {\n\t\tw.Header().Set(\"Content-Type\", \"application/json\")\n\t\tjson.NewEncoder(w).Encode(Station{Code: \"BOM\", Name: \"Mumbai\"})\n\t})\n\thttp.ListenAndServe(\":8080\", nil)\n}",
        "lineByLine": [
          {
            "line": "type Station struct {",
            "explanation": "The shape we want on the wire."
          },
          {
            "line": "Code string `json:\"code\"`",
            "explanation": "The tag renames Code to code in the JSON."
          },
          {
            "line": "w.Header().Set(\"Content-Type\", \"application/json\")",
            "explanation": "Tells clients how to read the body."
          },
          {
            "line": "json.NewEncoder(w).Encode(Station{...})",
            "explanation": "Streams the struct directly into the response."
          }
        ]
      },
      {
        "title": "JSON request body",
        "code": "package main\n\nimport (\n\t\"encoding/json\"\n\t\"net/http\"\n)\n\ntype Order struct {\n\tDish string `json:\"dish\"`\n\tQty  int    `json:\"qty\"`\n}\n\nfunc main() {\n\thttp.HandleFunc(\"/order\", func(w http.ResponseWriter, r *http.Request) {\n\t\tvar o Order\n\t\tif err := json.NewDecoder(r.Body).Decode(&o); err != nil {\n\t\t\thttp.Error(w, \"bad body\", http.StatusBadRequest)\n\t\t\treturn\n\t\t}\n\t\tw.WriteHeader(http.StatusCreated)\n\t})\n\thttp.ListenAndServe(\":8080\", nil)\n}",
        "lineByLine": [
          {
            "line": "var o Order",
            "explanation": "Destination for the decoded body."
          },
          {
            "line": "if err := json.NewDecoder(r.Body).Decode(&o); err != nil {",
            "explanation": "Reads and validates the JSON; bad input errors here."
          },
          {
            "line": "http.Error(w, \"bad body\", http.StatusBadRequest)",
            "explanation": "Sends 400 with a plain-text message."
          },
          {
            "line": "w.WriteHeader(http.StatusCreated)",
            "explanation": "Explicit 201 for a successful creation."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Query parameters with validation",
        "code": "package main\n\nimport (\n\t\"net/http\"\n\t\"strconv\"\n)\n\nfunc main() {\n\tmux := http.NewServeMux()\n\tmux.HandleFunc(\"/item/\", func(w http.ResponseWriter, r *http.Request) {\n\t\tid := r.URL.Query().Get(\"id\")\n\t\tn, err := strconv.Atoi(id)\n\t\tif err != nil || n <= 0 {\n\t\t\thttp.Error(w, \"id must be a positive number\", http.StatusBadRequest)\n\t\t\treturn\n\t\t}\n\t\tw.Write([]byte(\"item \" + id))\n\t})\n\thttp.ListenAndServe(\":8080\", mux)\n}",
        "lineByLine": [
          {
            "line": "mux.HandleFunc(\"/item/\", ...)",
            "explanation": "The trailing slash makes this a subtree pattern."
          },
          {
            "line": "id := r.URL.Query().Get(\"id\")",
            "explanation": "Reads ?id=... from the query string."
          },
          {
            "line": "n, err := strconv.Atoi(id)",
            "explanation": "Never trust the string - parse it and check the error."
          },
          {
            "line": "http.Error(w, \"...\", http.StatusBadRequest)",
            "explanation": "Rejects invalid input with 400."
          }
        ]
      },
      {
        "title": "Client with timeout",
        "code": "package main\n\nimport (\n\t\"fmt\"\n\t\"io\"\n\t\"net/http\"\n\t\"time\"\n)\n\nfunc main() {\n\tclient := &http.Client{Timeout: 2 * time.Second}\n\tres, err := client.Get(\"http://localhost:8080/health\")\n\tif err != nil {\n\t\tfmt.Println(\"request failed:\", err)\n\t\treturn\n\t}\n\tdefer res.Body.Close()\n\tbody, _ := io.ReadAll(res.Body)\n\tfmt.Println(res.StatusCode, string(body))\n}",
        "lineByLine": [
          {
            "line": "client := &http.Client{Timeout: 2 * time.Second}",
            "explanation": "The default client has NO timeout - always set one."
          },
          {
            "line": "res, err := client.Get(...)",
            "explanation": "Every network call returns an error you must handle."
          },
          {
            "line": "defer res.Body.Close()",
            "explanation": "Returns the connection to the pool."
          },
          {
            "line": "body, _ := io.ReadAll(res.Body)",
            "explanation": "Reads the whole response into memory."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Middleware wrapping",
        "code": "func logging(next http.Handler) http.Handler {\n\treturn http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n\t\tstart := time.Now()\n\t\tnext.ServeHTTP(w, r)\n\t\tlog.Printf(\"%s %s %s\", r.Method, r.URL.Path, time.Since(start))\n\t})\n}\n\nfunc main() {\n\tmux := http.NewServeMux()\n\tmux.HandleFunc(\"/health\", health)\n\thttp.ListenAndServe(\":8080\", logging(mux))\n}",
        "note": "Middleware is a function that takes and returns a Handler. Auth, logging, recovery and CORS all stack this way, and the wrapping order is the execution order."
      },
      {
        "title": "Table-driven handler tests",
        "code": "func TestOrderValidation(t *testing.T) {\n\tcases := []struct {\n\t\tname string\n\t\tbody string\n\t\twant int\n\t}{\n\t\t{\"valid\", `{\"dish\":\"dosa\",\"qty\":2}`, http.StatusCreated},\n\t\t{\"missing qty\", `{\"dish\":\"dosa\"}`, http.StatusBadRequest},\n\t\t{\"broken json\", `{`, http.StatusBadRequest},\n\t}\n\tfor _, tc := range cases {\n\t\tt.Run(tc.name, func(t *testing.T) {\n\t\t\treq := httptest.NewRequest(http.MethodPost, \"/order\", strings.NewReader(tc.body))\n\t\t\trec := httptest.NewRecorder()\n\t\t\torderHandler(rec, req)\n\t\t\tif rec.Code != tc.want {\n\t\t\t\tt.Fatalf(\"got %d want %d\", rec.Code, tc.want)\n\t\t\t}\n\t\t})\n\t}\n}",
        "note": "httptest.NewRecorder captures the response without opening a socket, so one table covers success, missing-field and malformed-JSON paths."
      }
    ],
    "practice": [
      {
        "question": "Serve {\"code\":\"BOM\"} at /station as JSON.",
        "hint": "Set the content type, then Encode a struct.",
        "answer": "type Station struct{ Code string `json:\"code\"` }\nmux.HandleFunc(\"/station\", func(w http.ResponseWriter, r *http.Request) {\n\tw.Header().Set(\"Content-Type\", \"application/json\")\n\tjson.NewEncoder(w).Encode(Station{Code: \"BOM\"})\n})"
      },
      {
        "question": "Reject a POST /order whose qty is missing with 400.",
        "hint": "Decode, then validate before returning 201.",
        "answer": "var o Order\nif err := json.NewDecoder(r.Body).Decode(&o); err != nil {\n\thttp.Error(w, \"bad json\", http.StatusBadRequest)\n\treturn\n}\nif o.Qty <= 0 {\n\thttp.Error(w, \"qty required\", http.StatusBadRequest)\n\treturn\n}\nw.WriteHeader(http.StatusCreated)"
      },
      {
        "question": "Read ?page= from the URL and 400 if it is not numeric.",
        "hint": "Query().Get plus strconv.Atoi.",
        "answer": "p := r.URL.Query().Get(\"page\")\nif _, err := strconv.Atoi(p); err != nil {\n\thttp.Error(w, \"page must be numeric\", http.StatusBadRequest)\n\treturn\n}"
      },
      {
        "question": "Why is a client without a Timeout dangerous?",
        "hint": "A silent peer holds the goroutine and the connection.",
        "answer": "http.Get on the zero Client has no timeout at all, so a hung server parks the goroutine and leaks the connection indefinitely. Always set client.Timeout or drive the request with a context deadline."
      }
    ],
    "interview": [
      {
        "question": "How does encoding/json decide what to marshal?",
        "answer": "Only exported fields are considered and unexported ones are ignored silently. Names default to the Go field name unless a json tag renames them, and json:\"-\" excludes a field entirely."
      },
      {
        "question": "Explain http.ResponseWriter ordering rules.",
        "answer": "Headers must be set before WriteHeader, and WriteHeader before writing the body. Writing implies 200 if WriteHeader was never called, and a second WriteHeader is ignored with a superfluous-write warning."
      },
      {
        "question": "ServeMux patterns: /health vs /item/ vs /?",
        "answer": "Without a trailing slash a pattern matches only that exact path; with one it matches the whole subtree; / catches everything not matched more specifically. Go 1.22+ adds method and wildcard segments."
      },
      {
        "question": "How do you test an HTTP handler in Go?",
        "answer": "Build a request with httptest.NewRequest, capture the result with httptest.NewRecorder, call the handler directly, then assert on rec.Code, rec.Header and rec.Body - no port or network involved."
      }
    ]
  },
  {
    "id": "go-11",
    "title": "Testing, benchmarking & module hygiene",
    "level": "Advanced",
    "definition": "Go ships testing and benchmarking in the standard toolchain: _test.go files hold Test* functions using t.Error/t.Fatal, table-driven cases cover many inputs from one body, benchmarks measure with b.N, and go vet plus gofmt keep modules honest.",
    "analogy": "Like a school exam plus a sports day on the same ground: a test is the written paper checking right or wrong, a benchmark is the stopwatch timing how fast you ran, and go vet with gofmt is the invigilator checking uniform and discipline before anyone even starts.",
    "keyPoints": [
      "Test functions live in _test.go and take *testing.T: func TestAdd(t *testing.T) { ... }.",
      "t.Errorf reports a failure and continues; t.Fatalf stops the test immediately - use Fatal when continuing would panic.",
      "Table-driven tests put name/input/want in a slice and loop with t.Run(name, ...) for per-case reporting.",
      "Benchmarks take *testing.B and loop for b.N iterations; run them with go test -bench=.",
      "go vet catches suspicious constructs (wrong Printf verbs, unreachable code) that compile fine but are usually wrong.",
      "gofmt -w . and go test ./... before every commit - the toolchain is the code review baseline."
    ],
    "basicExamples": [
      {
        "title": "First test",
        "code": "package main\n\nimport \"testing\"\n\nfunc Add(a, b int) int { return a + b }\n\nfunc TestAdd(t *testing.T) {\n\tgot := Add(2, 3)\n\tif got != 5 {\n\t\tt.Errorf(\"Add(2, 3) = %d, want 5\", got)\n\t}\n}",
        "lineByLine": [
          {
            "line": "func TestAdd(t *testing.T) {",
            "explanation": "The Test prefix and *testing.T parameter are what make it a test."
          },
          {
            "line": "got := Add(2, 3)",
            "explanation": "Calls the code under test."
          },
          {
            "line": "if got != 5 {",
            "explanation": "Compares actual against expected."
          },
          {
            "line": "t.Errorf(\"Add(2, 3) = %d, want 5\", got)",
            "explanation": "Fails with a message naming both values."
          }
        ]
      },
      {
        "title": "Table-driven cases",
        "code": "package main\n\nimport \"testing\"\n\nfunc Grade(m int) string {\n\tif m >= 90 {\n\t\treturn \"A\"\n\t}\n\tif m >= 60 {\n\t\treturn \"B\"\n\t}\n\treturn \"C\"\n}\n\nfunc TestGrade(t *testing.T) {\n\tcases := []struct {\n\t\tmarks int\n\t\twant  string\n\t}{\n\t\t{95, \"A\"}, {60, \"B\"}, {0, \"C\"}, {89, \"B\"},\n\t}\n\tfor _, tc := range cases {\n\t\tt.Run(tc.marks, func(t *testing.T) {\n\t\t\tif got := Grade(tc.marks); got != tc.want {\n\t\t\t\tt.Errorf(\"Grade(%d) = %s, want %s\", tc.marks, got, tc.want)\n\t\t\t}\n\t\t})\n\t}\n}",
        "lineByLine": [
          {
            "line": "cases := []struct { marks int; want string }{",
            "explanation": "One row per scenario: input beside the expected result."
          },
          {
            "line": "for _, tc := range cases {",
            "explanation": "Every row runs the same assertions."
          },
          {
            "line": "t.Run(tc.marks, func(t *testing.T) {",
            "explanation": "Names the subtest so failures point at the exact case."
          },
          {
            "line": "if got := Grade(tc.marks); got != tc.want {",
            "explanation": "The single assertion reused for all rows."
          }
        ]
      },
      {
        "title": "Error path test",
        "code": "package main\n\nimport (\n\t\"errors\"\n\t\"testing\"\n)\n\nfunc Fee(age int) (int, error) {\n\tif age < 0 {\n\t\treturn 0, errors.New(\"age cannot be negative\")\n\t}\n\treturn 50, nil\n}\n\nfunc TestFeeRejectsNegative(t *testing.T) {\n\t_, err := Fee(-1)\n\tif err == nil {\n\t\tt.Fatal(\"expected an error for negative age, got nil\")\n\t}\n}",
        "lineByLine": [
          {
            "line": "func Fee(age int) (int, error) {",
            "explanation": "Idiomatic Go returns the error as the last value."
          },
          {
            "line": "_, err := Fee(-1)",
            "explanation": "Discards the value, keeps the error."
          },
          {
            "line": "if err == nil {",
            "explanation": "Asserts that an error DID happen."
          },
          {
            "line": "t.Fatal(\"expected an error...\")",
            "explanation": "Stops at once - continuing would be meaningless."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Benchmark",
        "code": "package main\n\nimport \"testing\"\n\nfunc Squares(n int) []int {\n\tout := make([]int, 0, n)\n\tfor i := 1; i <= n; i++ {\n\t\tout = append(out, i*i)\n\t}\n\treturn out\n}\n\nfunc BenchmarkSquares(b *testing.B) {\n\tfor i := 0; i < b.N; i++ {\n\t\tSquares(1000)\n\t}\n}",
        "lineByLine": [
          {
            "line": "func BenchmarkSquares(b *testing.B) {",
            "explanation": "The Benchmark prefix marks it for -bench."
          },
          {
            "line": "for i := 0; i < b.N; i++ {",
            "explanation": "Go raises N until the timing is stable."
          },
          {
            "line": "Squares(1000)",
            "explanation": "The work being measured; result discarded on purpose."
          }
        ]
      },
      {
        "title": "Testing an HTTP handler",
        "code": "package main\n\nimport (\n\t\"net/http\"\n\t\"net/http/httptest\"\n\t\"testing\"\n)\n\nfunc health(w http.ResponseWriter, r *http.Request) { w.Write([]byte(\"ok\")) }\n\nfunc TestHealth(t *testing.T) {\n\treq := httptest.NewRequest(http.MethodGet, \"/health\", nil)\n\trec := httptest.NewRecorder()\n\thealth(rec, req)\n\tif rec.Code != http.StatusOK {\n\t\tt.Fatalf(\"got %d want 200\", rec.Code)\n\t}\n\tif rec.Body.String() != \"ok\" {\n\t\tt.Fatalf(\"body = %q, want ok\", rec.Body.String())\n\t}\n}",
        "lineByLine": [
          {
            "line": "req := httptest.NewRequest(http.MethodGet, \"/health\", nil)",
            "explanation": "Builds a request in memory - no server needed."
          },
          {
            "line": "rec := httptest.NewRecorder()",
            "explanation": "Captures status, headers and body."
          },
          {
            "line": "health(rec, req)",
            "explanation": "Calls the handler directly."
          },
          {
            "line": "if rec.Code != http.StatusOK {",
            "explanation": "Asserts on the captured response."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Parallel subtests",
        "code": "for _, tc := range cases {\n\ttc := tc\n\tt.Run(tc.name, func(t *testing.T) {\n\t\tt.Parallel()\n\t\tif got := Compute(tc.input); got != tc.want {\n\t\t\tt.Errorf(\"got %v want %v\", got, tc.want)\n\t\t}\n\t})\n}",
        "note": "t.Parallel runs independent cases side by side to cut wall-clock time. Capture the loop variable (tc := tc) before Go 1.22 or every case shares the last row."
      },
      {
        "title": "Avoiding benchmark traps",
        "code": "func BenchmarkSlow(b *testing.B) {\n\tvar sink int\n\tfor i := 0; i < b.N; i++ {\n\t\tsink = Heavy()\n\t}\n\t_ = sink\n}",
        "note": "The compiler can optimise away a result nobody reads, producing a fake benchmark. Assign to a package-level sink so the work is real, and use b.ResetTimer after expensive setup."
      }
    ],
    "practice": [
      {
        "question": "Write a test for IsEven(4) == true and IsEven(5) == false.",
        "hint": "Two checks, or a tiny table.",
        "answer": "func TestIsEven(t *testing.T) {\n\tcases := []struct{ n int; want bool }{{4, true}, {5, false}}\n\tfor _, tc := range cases {\n\t\tif got := tc.n%2 == 0; got != tc.want {\n\t\t\tt.Errorf(\"%d: got %v want %v\", tc.n, got, tc.want)\n\t\t}\n\t}\n}"
      },
      {
        "question": "Add a benchmark for summing a 10000-element slice.",
        "hint": "Loop over b.N.",
        "answer": "func BenchmarkSum(b *testing.B) {\n\tnums := make([]int, 10000)\n\tfor i := 0; i < b.N; i++ {\n\t\t_ = sum(nums)\n\t}\n}"
      },
      {
        "question": "Assert that Parse(\"abc\") returns an error.",
        "hint": "err == nil means the test must fail.",
        "answer": "_, err := Parse(\"abc\")\nif err == nil {\n\tt.Fatal(\"expected error for input abc\")\n}"
      },
      {
        "question": "Errorf vs Fatalf - when does it matter?",
        "hint": "Ask what happens on the next line.",
        "answer": "Errorf marks failure and keeps running, so the rest of the test still executes; Fatalf stops immediately. Use Fatalf when continuing would nil-panic or hide the real cause, otherwise Errorf reports more problems in one run."
      }
    ],
    "interview": [
      {
        "question": "Why is table-driven testing the Go default?",
        "answer": "Adding a case is one line of data instead of a new function, and every case reports under its own name via t.Run. It keeps the assertion logic in exactly one place, so tests stay honest as edge cases multiply."
      },
      {
        "question": "What does b.N mean in a benchmark?",
        "answer": "The iteration count Go chooses dynamically: it runs 1, then scales up until the total time is stable enough to report ns/op. Your job is to make the loop body do the measured work and nothing else."
      },
      {
        "question": "How do you run a subset of tests or benchmarks?",
        "answer": "go test -run TestGrade exercises matching tests, -bench=. runs benchmarks, and the -run pattern accepts /subtest names such as -run TestGrade/95. -v prints every case."
      },
      {
        "question": "Why run go vet and -race in CI?",
        "answer": "vet catches compile-legal but wrong patterns like mismatched Printf verbs and unreachable code; -race instruments memory access and fails on unsynchronised sharing. Both find classes of bug that unit assertions simply cannot see."
      }
    ]
  },
  {
    "id": "go-12",
    "title": "Cloud-native patterns & production projects",
    "level": "Advanced",
    "definition": "Production Go services combine small deployable binaries, dependency injection through interfaces, structured logging, graceful shutdown via signals and context cancellation, and configuration from the environment. These habits are what take a program from a tutorial to a service you can run.",
    "analogy": "Like running a highway dhaba during a bandh: the menu is fixed and posted (config from env), every order gets a numbered slip with a timer (context timeout), the manager can close the shutters politely while clearing the last tables (graceful shutdown), and the day's takings are written in a standard register (structured logs).",
    "keyPoints": [
      "Contexts carry deadlines and cancellation: always accept ctx as the first parameter of anything that blocks or does I/O.",
      "Depend on narrow interfaces, not concrete types - that is what makes code testable without a real database.",
      "Read configuration from environment variables; keep secrets out of source and out of images.",
      "log/slog gives structured, leveled logging that log aggregators can actually query.",
      "Graceful shutdown: listen for SIGINT/SIGTERM, then stop accepting work and wait for in-flight requests to finish.",
      "Ship a /health and a /ready endpoint, and make the binary statically built (CGO_ENABLED=0) for tiny container images."
    ],
    "basicExamples": [
      {
        "title": "Config from environment",
        "code": "package main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n\t\"time\"\n)\n\ntype Config struct {\n\tAddr string\n\tTimeout time.Duration\n}\n\nfunc Load() Config {\n\taddr := os.Getenv(\"APP_ADDR\")\n\tif addr == \"\" {\n\t\taddr = \":8080\"\n\t}\n\treturn Config{Addr: addr, Timeout: 2 * time.Second}\n}\n\nfunc main() {\n\tcfg := Load()\n\tfmt.Println(\"serving on\", cfg.Addr)\n}",
        "lineByLine": [
          {
            "line": "type Config struct {",
            "explanation": "One typed home for every runtime setting."
          },
          {
            "line": "addr := os.Getenv(\"APP_ADDR\")",
            "explanation": "Reads the deployment-provided value."
          },
          {
            "line": "if addr == \"\" { addr = \":8080\" }",
            "explanation": "Sensible default so local runs need no env."
          },
          {
            "line": "return Config{Addr: addr, Timeout: 2 * time.Second}",
            "explanation": "Returns one immutable config value."
          }
        ]
      },
      {
        "title": "Context timeout",
        "code": "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc fetch(ctx context.Context) error {\n\tselect {\n\tcase <-time.After(3 * time.Second):\n\t\tfmt.Println(\"work done\")\n\t\treturn nil\n\tcase <-ctx.Done():\n\t\treturn ctx.Err()\n\t}\n}\n\nfunc main() {\n\tctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)\n\tdefer cancel()\n\tfmt.Println(fetch(ctx))\n}",
        "lineByLine": [
          {
            "line": "ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)",
            "explanation": "Creates a context that self-cancels after 500ms."
          },
          {
            "line": "defer cancel()",
            "explanation": "Releases the timer - always defer it to avoid a leak."
          },
          {
            "line": "case <-ctx.Done():",
            "explanation": "Wakes the moment the deadline passes."
          },
          {
            "line": "return ctx.Err()",
            "explanation": "Propagates context.DeadlineExceeded to the caller."
          }
        ]
      },
      {
        "title": "Structured logging",
        "code": "package main\n\nimport (\n\t\"log/slog\"\n\t\"os\"\n)\n\nfunc main() {\n\tlogger := slog.New(slog.NewJSONHandler(os.Stdout, nil))\n\tslog.SetDefault(logger)\n\tslog.Info(\"order placed\", \"id\", 205, \"total\", 240.5)\n\tslog.Warn(\"stock low\", \"dish\", \"dosa\")\n}",
        "lineByLine": [
          {
            "line": "logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))",
            "explanation": "Emits one JSON object per log line."
          },
          {
            "line": "slog.SetDefault(logger)",
            "explanation": "Makes the package-level log functions use it."
          },
          {
            "line": "slog.Info(\"order placed\", \"id\", 205, \"total\", 240.5)",
            "explanation": "Key/value pairs make logs queryable, not just readable."
          },
          {
            "line": "slog.Warn(\"stock low\", \"dish\", \"dosa\")",
            "explanation": "Levels let you filter noise in production."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Graceful shutdown",
        "code": "package main\n\nimport (\n\t\"context\"\n\t\"errors\"\n\t\"log/slog\"\n\t\"net/http\"\n\t\"os\"\n\t\"os/signal\"\n\t\"syscall\"\n\t\"time\"\n)\n\nfunc main() {\n\tsrv := &http.Server{Addr: \":8080\"\n\tgo func() {\n\t\tif err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {\n\t\t\tslog.Error(\"listen failed\", \"err\", err)\n\t\t}\n\t}()\n\tstop := make(chan os.Signal, 1)\n\tsignal.Notify(stop, syscall.SIGINT, syscall.SIGTERM)\n\t<-stop\n\tctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)\n\tdefer cancel()\n\tif err := srv.Shutdown(ctx); err != nil {\n\t\tslog.Error(\"shutdown failed\", \"err\", err)\n\t}\n}",
        "lineByLine": [
          {
            "line": "go func() { ... srv.ListenAndServe() ... }()",
            "explanation": "Serves in the background so main can wait for signals."
          },
          {
            "line": "signal.Notify(stop, syscall.SIGINT, syscall.SIGTERM)",
            "explanation": "Turns OS shutdown signals into a channel event."
          },
          {
            "line": "<-stop",
            "explanation": "Blocks until the platform asks us to stop."
          },
          {
            "line": "srv.Shutdown(ctx)",
            "explanation": "Stops accepting new requests and drains in-flight ones."
          }
        ]
      },
      {
        "title": "Interface-based DI",
        "code": "package main\n\nimport \"fmt\"\n\ntype Pricer interface {\n\tPrice(dish string) (float64, bool)\n}\n\ntype Service struct{ p Pricer }\n\nfunc (s Service) Bill(dish string, qty int) (float64, error) {\n\tunit, ok := s.p.Price(dish)\n\tif !ok {\n\t\treturn 0, fmt.Errorf(\"unknown dish: %s\", dish)\n\t}\n\treturn unit * float64(qty), nil\n}\n\ntype Menu map[string]float64\n\nfunc (m Menu) Price(dish string) (float64, bool) {\n\tv, ok := m[dish]\n\treturn v, ok\n}\n\nfunc main() {\n\ts := Service{p: Menu{\"dosa\": 60}}\n\tfmt.Println(s.Bill(\"dosa\", 2))\n}",
        "lineByLine": [
          {
            "line": "type Pricer interface {",
            "explanation": "Names the single behaviour the service needs."
          },
          {
            "line": "type Service struct{ p Pricer }",
            "explanation": "Holds the interface, not a concrete menu type."
          },
          {
            "line": "unit, ok := s.p.Price(dish)",
            "explanation": "The comma-ok idiom handles unknown dishes."
          },
          {
            "line": "return unit * float64(qty), nil",
            "explanation": "Business rule: price times quantity."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Errgroup with cancellation",
        "code": "import \"golang.org/x/sync/errgroup\"\n\nfunc loadAll(ctx context.Context) error {\n\tg, ctx := errgroup.WithContext(ctx)\n\turls := []string{\"/menu\", \"/stock\", \"/bills\"}\n\tfor _, u := range urls {\n\t\tu := u\n\t\tg.Go(func() error {\n\t\treturn fetchJSON(ctx, u)\n\t\t})\n\t}\n\tif err := g.Wait(); err != nil {\n\t\treturn fmt.Errorf(\"loadAll: %w\", err)\n\t}\n\treturn nil\n}",
        "note": "errgroup runs tasks concurrently, waits for all of them, and cancels the derived context as soon as any task fails - so siblings stop doing wasted work. Wrap with %w to keep the original error inspectable."
      },
      {
        "title": "Thin container with health checks",
        "code": "// Dockerfile\nFROM golang:1.22 AS build\nWORKDIR /src\nCOPY . .\nRUN CGO_ENABLED=0 go build -o /out/app ./cmd/server\n\nFROM gcr.io/distroless/static\nCOPY --from=build /out/app /app\nENV APP_ADDR=:8080\nEXPOSE 8080\nENTRYPOINT [\"/app\"]",
        "note": "A multi-stage build with CGO disabled produces a static binary; running it on distroless leaves no shell, no package manager and almost no attack surface. Pair it with a /ready endpoint so the orchestrator only routes traffic once dependencies are warm."
      }
    ],
    "practice": [
      {
        "question": "Read APP_PORT from env, defaulting to 8080.",
        "hint": "os.Getenv then an empty-string check.",
        "answer": "port := os.Getenv(\"APP_PORT\")\nif port == \"\" {\n\tport = \"8080\"\n}"
      },
      {
        "question": "Give a function a 300ms deadline and return an error when it expires.",
        "hint": "context.WithTimeout plus select on ctx.Done().",
        "answer": "ctx, cancel := context.WithTimeout(context.Background(), 300*time.Millisecond)\ndefer cancel()\nselect {\ncase <-done:\n\treturn nil\ncase <-ctx.Done():\n\treturn ctx.Err()\n}"
      },
      {
        "question": "Log an order with id and total as structured JSON.",
        "hint": "slog with a JSON handler.",
        "answer": "logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))\nlogger.Info(\"order\", \"id\", 205, \"total\", 240.5)"
      },
      {
        "question": "Why is `defer cancel()` mandatory after WithTimeout?",
        "hint": "Think about the timer resource when cancel is skipped.",
        "answer": "Without cancel the context timer is kept until it fires, so a tight loop leaks timers and memory. The Go vet lostcancel check flags exactly this. Cancelling early tells the runtime the resources are free."
      }
    ],
    "interview": [
      {
        "question": "Why does Go pass context.Context first?",
        "answer": "It is a convention the whole ecosystem relies on: cancellation and deadlines then propagate uniformly through servers, clients and databases. Putting it in a struct hides the lifetime and breaks tooling expectations."
      },
      {
        "question": "How does graceful shutdown protect users?",
        "answer": "On SIGTERM the server stops accepting new connections, finishes in-flight requests within a deadline, flushes logs and closes database pools. Orchestrators send SIGTERM before SIGKILL, so finishing cleanly avoids dropped payments and half-written rows."
      },
      {
        "question": "Interfaces and dependency injection in Go - why does it fit?",
        "answer": "Accepting a small interface instead of a concrete struct decouples business logic from infrastructure. Tests pass a fake with the same method set, no mocking framework needed, and production swaps in the real implementation."
      },
      {
        "question": "What makes a Go service cloud-native?",
        "answer": "A single static binary, config from the environment, structured logs to stdout, health and readiness endpoints, context-aware shutdown, and no assumption about the local filesystem. Together those let the same image run anywhere."
      }
    ]
  }
];
