module.exports = [
  {
    "id": "rust-1",
    "title": "Toolchain, Cargo & first program",
    "level": "Beginner",
    "definition": "Rust is a compiled, statically-typed systems language guaranteeing memory safety without a garbage collector. You manage projects with Cargo (build tool + package manager); rustc compiles, the borrow checker verifies safety.",
    "analogy": "Like a bank locker with two keys: you (the owner) can lend items, but the guard (borrow checker) ensures only one person mutates at a time and nothing is taken twice — safety checked before the vault opens.",
    "keyPoints": [
      "Install via rustup (rustup.rs); verify with `rustc --version` and `cargo --version`.",
      "Create a project: `cargo new hello`; run it: `cargo run`; release build: `cargo run --release`.",
      "Entry point is `fn main()` in src/main.rs; print with `println!` (a macro — note the !).",
      "Variables are immutable by default: `let x = 5;` cannot change; add `mut` to allow it.",
      "Types are inferred but fixed: `let city = \"Bengaluru\";` locks city to &str.",
      "Compiler errors are lessons, not insults — read them top-down; they often suggest the fix."
    ],
    "basicExamples": [
      {
        "title": "Your first program",
        "code": "fn main() {\n    println!(\"Namaste, CodeAtlas!\");\n    println!(\"I am learning Rust\");\n}",
        "lineByLine": [
          {
            "line": "fn main() {",
            "explanation": "The entry point: execution starts here."
          },
          {
            "line": "println!(\"Namaste, CodeAtlas!\");",
            "explanation": "Prints the greeting (println! is a macro, hence !)."
          },
          {
            "line": "println!(\"I am learning Rust\");",
            "explanation": "Second line prints below the first."
          }
        ]
      },
      {
        "title": "Immutable vs mutable variables",
        "code": "fn main() {\n    let city = \"Bengaluru\";\n    let mut year = 2025;\n    year = 2026;\n    println!(\"{city} {year}\");\n}",
        "lineByLine": [
          {
            "line": "let city = \"Bengaluru\";",
            "explanation": "Immutable binding: assigning to city later would fail."
          },
          {
            "line": "let mut year = 2025;",
            "explanation": "mut permits reassignment."
          },
          {
            "line": "println!(\"{city} {year}\");",
            "explanation": "Inline format args capture variables directly (Rust 2021+)."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Comments and types",
        "code": "fn main() {\n    // A comment: Rust skips this line\n    let marks: i32 = 92; // explicit type: 32-bit integer\n    println!(\"{marks}\"); // prints 92\n}",
        "lineByLine": [
          {
            "line": "// A comment: Rust skips this line",
            "explanation": "// one line; /* */ spans many."
          },
          {
            "line": "let marks: i32 = 92;",
            "explanation": "Explicit annotation i32 (alternatives: u32, f64, bool, char)."
          },
          {
            "line": "println!(\"{marks}\");",
            "explanation": "Verifies the stored value."
          }
        ]
      },
      {
        "title": "Reading input",
        "code": "use std::io;\n\nfn main() {\n    let mut name = String::new();\n    println!(\"Your name:\");\n    io::stdin().read_line(&mut name).unwrap();\n    println!(\"Namaste, {}!\", name.trim());\n}",
        "lineByLine": [
          {
            "line": "let mut name = String::new();",
            "explanation": "Creates an empty growable String (must be mut to fill)."
          },
          {
            "line": "io::stdin().read_line(&mut name).unwrap();",
            "explanation": "Reads a line into name; unwrap crashes on error (fine for lesson 1)."
          },
          {
            "line": "println!(\"Namaste, {}!\", name.trim());",
            "explanation": "trim() removes the trailing Enter before greeting."
          }
        ]
      },
      {
        "title": "Shadowing to change type",
        "code": "fn main() {\n    let input = \"42\";\n    let input: i32 = input.parse().expect(\"not a number\");\n    println!(\"{}\", input + 8);\n}",
        "lineByLine": [
          {
            "line": "let input = \"42\";",
            "explanation": "First binding is a string slice (&str)."
          },
          {
            "line": "let input: i32 = input.parse()...",
            "explanation": "Shadowing rebinds the same name as an i32, parsing the text."
          },
          {
            "line": ".expect(\"not a number\")",
            "explanation": "parse returns a Result; expect unwraps it or panics with a message."
          },
          {
            "line": "println!(\"{}\", input + 8)",
            "explanation": "input is now a number, so arithmetic works."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Handling input errors properly",
        "code": "use std::io;\n\nfn main() {\n    let mut buf = String::new();\n    match io::stdin().read_line(&mut buf) {\n        Ok(_) => println!(\"Namaste, {}!\", buf.trim()),\n        Err(e) => eprintln!(\"Could not read input: {e}\"),\n    }\n}",
        "note": "match on Result forces both success and failure paths — the Rust way instead of unwrap in real code."
      },
      {
        "title": "Cargo project anatomy",
        "code": "$ cargo new hello --bin\n$ tree hello\nhello\n├── Cargo.toml     # project name, version, dependencies\n└── src\n    └── main.rs    # your code\n$ cd hello && cargo run",
        "note": "Cargo owns layout, builds and dependencies; Cargo.toml is the project manifest."
      }
    ],
    "practice": [
      {
        "question": "Print name, city, favourite food on three lines.",
        "hint": "Three println! calls in main.",
        "answer": "fn main() {\n    println!(\"Asha\");\n    println!(\"Bengaluru\");\n    println!(\"Masala dosa\");\n}"
      },
      {
        "question": "Explain why `let x = 5; x = 6;` fails and fix it.",
        "hint": "Immutability: add mut.",
        "answer": "fn main() {\n    let mut x = 5;\n    x = 6;\n    println!(\"{x}\");\n}"
      },
      {
        "question": "Read a name and greet without the trailing newline.",
        "hint": "read_line + trim().",
        "answer": "use std::io;\nfn main() {\n    let mut n = String::new();\n    io::stdin().read_line(&mut n).unwrap();\n    println!(\"Namaste, {}!\", n.trim());\n}"
      },
      {
        "question": "Print the type sizes: size_of::<i32>() etc.",
        "hint": "std::mem::size_of.",
        "answer": "println!(\"{}\", std::mem::size_of::<i32>()); // 4"
      }
    ],
    "interview": [
      {
        "question": "What is Rust’s core promise in one sentence?",
        "answer": "Memory safety without a garbage collector, enforced at compile time by ownership, borrowing and lifetimes."
      },
      {
        "question": "immutable by default — why?",
        "answer": "Prevents accidental mutation and data races; you opt into mutability explicitly, making shared state visible and reviewable."
      },
      {
        "question": "What is Cargo beyond a compiler?",
        "answer": "Build system + dependency manager + test runner + doc tool: cargo new/run/build/test/doc cover the whole workflow."
      },
      {
        "question": "Why are Rust compiler errors famously long?",
        "answer": "They explain the rule violated, point at all involved lines, and usually suggest a fix — read the first error first, fix, recompile."
      }
    ]
  },
  {
    "id": "rust-2",
    "title": "Variables, types & control flow",
    "level": "Beginner",
    "definition": "Rust variables are immutable and typed (inferred but fixed): integers (i32), floats (f64), bool, char. Control flow uses if/else (expressions returning values), loop, while, for, and match for exhaustive branching.",
    "analogy": "Like ink vs pencil in a school notebook: let writes in permanent ink (immutable); let mut is pencil (erasable). if/else is the teacher choosing remarks by marks; match is the report card covering EVERY grade — no student left ungraded.",
    "keyPoints": [
      "Scalar types: i32/u32, f64, bool, char (Unicode!); annotate once (let x: i32 = 5) or let inference decide.",
      "Shadowing (let x = x + 1) re-declares with a new value/type — different from mut reassignment.",
      "if is an expression: let g = if m >= 90 {\"A\"} else {\"B\"}; — no ternary operator needed.",
      "loop runs forever until break (which can return a value); while and for cover the rest.",
      "match must be exhaustive: every possible value needs an arm, or _ catches the rest.",
      "Integer division truncates (7 / 2 == 3); compare floats with care, not ==."
    ],
    "basicExamples": [
      {
        "title": "Immutable, mutable, shadowed",
        "code": "fn main() {\n    let city = \"Bengaluru\";\n    let mut year = 2025;\n    year = 2026;\n    let year = year + 1;\n    println!(\"{city} {year}\");\n}",
        "lineByLine": [
          {
            "line": "let city = \"Bengaluru\";",
            "explanation": "Immutable: assigning later would fail."
          },
          {
            "line": "let mut year = 2025; year = 2026;",
            "explanation": "mut allows reassignment."
          },
          {
            "line": "let year = year + 1;",
            "explanation": "Shadowing: a NEW binding reusing the name."
          }
        ]
      },
      {
        "title": "if as expression",
        "code": "fn main() {\n    let marks = 72;\n    let grade = if marks >= 90 {\n        \"A\"\n    } else if marks >= 60 {\n        \"B\"\n    } else {\n        \"C\"\n    };\n    println!(\"{grade}\");\n}",
        "lineByLine": [
          {
            "line": "let grade = if marks >= 90 {",
            "explanation": "if returns a value assigned to grade."
          },
          {
            "line": "} else if marks >= 60 {",
            "explanation": "72 lands here: \"B\"."
          },
          {
            "line": "println!(\"{grade}\");",
            "explanation": "Prints B."
          }
        ]
      },
      {
        "title": "for and while",
        "code": "fn main() {\n    let mut total = 0;\n    for i in 1..=5 {\n        total += i;\n    }\n    println!(\"{total}\");\n    let mut n = 3;\n    while n > 0 {\n        println!(\"{n}\");\n        n -= 1;\n    }\n}",
        "lineByLine": [
          {
            "line": "for i in 1..=5 {",
            "explanation": "Inclusive range 1..5; .. would exclude 5."
          },
          {
            "line": "total += i;",
            "explanation": "Accumulates to 15."
          },
          {
            "line": "while n > 0 {",
            "explanation": "Counts down; n -= 1 moves to exit."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "loop with value",
        "code": "fn main() {\n    let mut n = 1;\n    let doubled = loop {\n        n *= 2;\n        if n > 100 {\n            break n;\n        }\n    };\n    println!(\"{doubled}\");\n}",
        "lineByLine": [
          {
            "line": "let mut n = 1;",
            "explanation": "Start value."
          },
          {
            "line": "if n > 100 { break n; }",
            "explanation": "break RETURNS n from the loop."
          },
          {
            "line": "let doubled = loop {",
            "explanation": "doubled captures it: 128."
          }
        ]
      },
      {
        "title": "match basics",
        "code": "fn main() {\n    let day = \"Sun\";\n    let kind = match day {\n        \"Sat\" | \"Sun\" => \"Weekend\",\n        \"Mon\" => \"Fresh start\",\n        _ => \"Weekday\",\n    };\n    println!(\"{kind}\");\n}",
        "lineByLine": [
          {
            "line": "match day {",
            "explanation": "Examines one value."
          },
          {
            "line": "\"Sat\" | \"Sun\" => \"Weekend\",",
            "explanation": "| combines patterns in one arm."
          },
          {
            "line": "_ => \"Weekday\",",
            "explanation": "_ wildcard makes it exhaustive."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Shadowing for type change",
        "code": "fn main() {\n    let input = \"42\";\n    let input: i32 = input.parse().unwrap();\n    println!(\"{}\", input + 8);\n}",
        "note": "Shadowing lets input evolve from &str to i32 cleanly — no mut needed, old binding simply ends."
      },
      {
        "title": "Labeled loops",
        "code": "fn main() {\n    'outer: for r in 0..3 {\n        for c in 0..3 {\n            if r == 1 && c == 1 {\n                break 'outer;\n            }\n            print!(\"{r}{c} \");\n        }\n    }\n}",
        "note": "Loop labels (outer:) let break escape nested loops directly — no flag variables."
      }
    ],
    "practice": [
      {
        "question": "Classify age: child (<13), teen (<20), adult, senior (60+).",
        "hint": "if as expression assigned to a variable.",
        "answer": "let age = 16;\nlet group = if age < 13 {\n    \"child\"\n} else if age < 20 {\n    \"teen\"\n} else if age < 60 {\n    \"adult\"\n} else {\n    \"senior\"\n};\nprintln!(\"{group}\");"
      },
      {
        "question": "Sum 1..=100 with a for loop.",
        "hint": "Inclusive range 1..=100.",
        "answer": "let mut s = 0;\nfor i in 1..=100 {\n    s += i;\n}\nprintln!(\"{s}\"); // 5050"
      },
      {
        "question": "Print even numbers below 10 using loop + continue.",
        "hint": "Skip odds with continue.",
        "answer": "let mut n = 0;\nloop {\n    n += 1;\n    if n >= 10 {\n        break;\n    }\n    if n % 2 == 1 {\n        continue;\n    }\n    println!(\"{n}\");\n}"
      },
      {
        "question": "Fix: `let x = 5; x = 6;` two ways; explain the difference.",
        "hint": "mut vs shadowing.",
        "answer": "let mut x = 5;\nx = 6; // same binding updated\nlet x = 5;\nlet x = 6; // NEW binding shadows old"
      }
    ],
    "interview": [
      {
        "question": "mut vs shadowing — difference?",
        "answer": "mut reassigns the SAME binding (type fixed). Shadowing declares a NEW binding that may even change type. Use mut for updates, shadowing for transformations."
      },
      {
        "question": "Why is match exhaustive, and what is _?",
        "answer": "The compiler forces every possible value to be handled — missing cases fail compilation. _ is the wildcard catching the rest, guaranteeing coverage."
      },
      {
        "question": "if is an expression — what does that imply?",
        "answer": "Branches return values, so let g = if c {a} else {b} works. Both arms must yield the same type; it replaces the ternary operator entirely."
      },
      {
        "question": ".. vs ..= in ranges?",
        "answer": "1..5 excludes 5 (1-4); 1..=5 includes it (1-5). Off-by-one bugs hide here — read the = as \"equals included\"."
      }
    ]
  },
  {
    "id": "rust-3",
    "title": "Ownership & borrowing",
    "level": "Beginner",
    "definition": "Ownership is Rusts memory system with no garbage collector: each value has exactly one owner, moves transfer ownership, borrows (& references) let code look without taking, and values die when their owner leaves scope.",
    "analogy": "Like a library book: one current holder (owner), lending to a friend moves it (move), letting someone read over your shoulder is a borrow (&), and returning it to the shelf (drop) ends it. The librarian (borrow checker) never allows two writers at once.",
    "keyPoints": [
      "Each value has ONE owner; assigning (let b = a) MOVES Strings - a is unusable after.",
      "Copy types (i32, bool, char) duplicate cheaply instead of moving; Clone makes explicit deep copies.",
      "Immutable borrows (&x) allow many readers; mutable borrows (&mut x) allow exactly one writer, never both together.",
      "References must never outlive their data - the compiler rejects dangling pointers at build time.",
      "Functions take ownership (fn eat(s: String)) or borrow (fn read(s: &String)) - pick by intent.",
      "Slices (&s[0..5]) borrow part of a collection without copying - string processing lives on slices."
    ],
    "basicExamples": [
      {
        "title": "Move semantics",
        "code": "fn main() {\n    let book = String::from(\"Gitanjali\");\n    let holder = book;\n    println!(\"{holder}\");\n}",
        "lineByLine": [
          {
            "line": "let book = String::from(\"Gitanjali\");",
            "explanation": "book owns the heap String."
          },
          {
            "line": "let holder = book;",
            "explanation": "Ownership MOVES: book is now invalid."
          },
          {
            "line": "println!(\"{holder}\");",
            "explanation": "Only holder may be used."
          }
        ]
      },
      {
        "title": "Copy types stay",
        "code": "fn main() {\n    let marks = 92;\n    let backup = marks;\n    println!(\"{marks} {backup}\");\n}",
        "lineByLine": [
          {
            "line": "let marks = 92;",
            "explanation": "i32 is a Copy type (stack-only)."
          },
          {
            "line": "let backup = marks;",
            "explanation": "Cheap duplicate: marks stays valid."
          },
          {
            "line": "println!(\"{marks} {backup}\");",
            "explanation": "Both usable: 92 92."
          }
        ]
      },
      {
        "title": "Borrow to read",
        "code": "fn main() {\n    let city = String::from(\"Pune\");\n    let n = count_letters(&city);\n    println!(\"{city} has {n}\");\n}\nfn count_letters(s: &String) -> usize {\n    s.len()\n}",
        "lineByLine": [
          {
            "line": "count_letters(&city)",
            "explanation": "& borrows: ownership stays with main."
          },
          {
            "line": "fn count_letters(s: &String) -> usize {",
            "explanation": "Function only looks, never takes."
          },
          {
            "line": "println!(\"{city} has {n}\");",
            "explanation": "city still valid afterwards."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Mutable borrow",
        "code": "fn main() {\n    let mut name = String::from(\"Ash\");\n    name.push_str(\"a\");\n    shout(&mut name);\n    println!(\"{name}\");\n}\nfn shout(s: &mut String) {\n    s.make_ascii_uppercase();\n}",
        "lineByLine": [
          {
            "line": "let mut name = ...",
            "explanation": "mut allows change through the owner."
          },
          {
            "line": "shout(&mut name);",
            "explanation": "Lends exclusive write access."
          },
          {
            "line": "s.make_ascii_uppercase();",
            "explanation": "Mutates in place: ASHA."
          }
        ]
      },
      {
        "title": "Clone for independence",
        "code": "fn main() {\n    let a = String::from(\"idli\");\n    let b = a.clone();\n    println!(\"{a} {b}\");\n}",
        "lineByLine": [
          {
            "line": "let b = a.clone();",
            "explanation": "Deep copy: separate heap data."
          },
          {
            "line": "println!(\"{a} {b}\");",
            "explanation": "Both valid: idli idli."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Borrow rules in action",
        "code": "fn main() {\n    let mut n = 5;\n    let r1 = &n;\n    let r2 = &n;\n    println!(\"{r1} {r2}\");\n    let w = &mut n;\n    *w += 1;\n    println!(\"{n}\");\n}",
        "note": "Many & readers OR one &mut writer - the scopes above keep them apart so this compiles."
      },
      {
        "title": "Dangling rejected",
        "code": "fn main() {\n    let s = keep(\"hi\");\n    println!(\"{s}\");\n}\nfn keep(x: &str) -> &str {\n    x\n}",
        "note": "Returning a borrow of the PARAMETER is fine (caller owns data); returning a borrow of a LOCAL would be rejected - no dangling ever."
      }
    ],
    "practice": [
      {
        "question": "Show a move error then fix with clone.",
        "hint": "String moves; clone duplicates.",
        "answer": "let a = String::from(\"x\");\nlet b = a.clone(); // fix: clone\nprintln!(\"{a} {b}\");"
      },
      {
        "question": "Write len_of(s: &String) -> usize; call without losing ownership.",
        "hint": "Borrow at the call site.",
        "answer": "fn len_of(s: &String) -> usize { s.len() }\nlet c = String::from(\"Pune\");\nprintln!(\"{}\", len_of(&c));\nprintln!(\"{c}\");"
      },
      {
        "question": "Double a number through &mut.",
        "hint": "Dereference to write.",
        "answer": "fn double(n: &mut i32) { *n *= 2; }\nlet mut v = 21;\ndouble(&mut v);\nprintln!(\"{v}\"); // 42"
      },
      {
        "question": "Fix two &mut borrows alive together.",
        "hint": "Scopes or sequential use only.",
        "answer": "let mut n = 1;\n{ let a = &mut n; *a += 1; }\n{ let b = &mut n; *b += 1; }\nprintln!(\"{n}\");"
      }
    ],
    "interview": [
      {
        "question": "What is ownership in one breath?",
        "answer": "Each value has one owner; moves transfer it; borrows allow temporary access; values drop when owners leave scope - memory safety without a garbage collector."
      },
      {
        "question": "Move vs Copy vs Clone?",
        "answer": "Move: ownership transfers (heap types). Copy: implicit bitwise duplicate (small stack types). Clone: explicit deep copy (may allocate). Interviews love which types are Copy."
      },
      {
        "question": "Borrow checker rules?",
        "answer": "Unlimited immutable borrows OR exactly one mutable borrow, never mixed while alive; references must not outlive data. Violations are compile errors, not runtime bugs."
      },
      {
        "question": "Why no garbage collector - benefit?",
        "answer": "Zero runtime pause, no background thread, predictable performance for systems code; the cost is learning to satisfy the checker upfront."
      }
    ]
  },
  {
    "id": "rust-4",
    "title": "Structs, enums & match",
    "level": "Beginner",
    "definition": "Structs bundle named fields into one type. Enums list possible shapes, often carrying data. Match handles every case and can pull the carried values out while checking.",
    "analogy": "Like a railway reservation form: a struct is the filled passenger record with name, age, and berth. An enum is the ticket-status stamp, either Confirmed with a seat number or Waiting with a queue number, and match is the examiner reading each stamp correctly.",
    "keyPoints": [
      "Define with struct Student { name: String, marks: u32 } and build with Student { name: ..., marks: ... }.",
      "Update with ..old syntax and construct with helper functions such as Student::new.",
      "Enums carry data: enum Ticket { Confirmed(u32), Waiting(u32) } holds different payloads.",
      "Match must cover all cases: each arm can bind payloads like Confirmed(seat).",
      "Use methods with impl blocks: fn passed(&self) reads without taking ownership.",
      "Derive Debug for printing and Clone when copies are needed."
    ],
    "basicExamples": [
      {
        "title": "Make and read a struct",
        "code": "struct Student {\n    name: String,\n    marks: u32,\n}\n\nfn main() {\n    let s = Student { name: String::from(\"Asha\"), marks: 92 };\n    println!(\"{} has {}\", s.name, s.marks);\n}",
        "lineByLine": [
          {
            "line": "struct Student { name: String, marks: u32 }",
            "explanation": "Defines the shape with two fields."
          },
          {
            "line": "Student { name: ..., marks: 92 }",
            "explanation": "Builds one concrete student."
          },
          {
            "line": "s.name, s.marks",
            "explanation": "Reads fields with dot access."
          }
        ]
      },
      {
        "title": "Enum with payloads",
        "code": "enum Ticket {\n    Confirmed(u32),\n    Waiting(u32),\n}\n\nfn main() {\n    let t = Ticket::Confirmed(42);\n    println!(\"ticket ready\");\n}",
        "lineByLine": [
          {
            "line": "enum Ticket { Confirmed(u32), Waiting(u32) }",
            "explanation": "Two shapes with seat or queue numbers."
          },
          {
            "line": "Ticket::Confirmed(42)",
            "explanation": "Chooses one variant with payload 42."
          },
          {
            "line": "println!(\"ticket ready\")",
            "explanation": "Confirms construction; match comes next."
          }
        ]
      },
      {
        "title": "Match and bind",
        "code": "enum Ticket {\n    Confirmed(u32),\n    Waiting(u32),\n}\n\nfn main() {\n    let t = Ticket::Waiting(7);\n    match t {\n        Ticket::Confirmed(seat) => println!(\"seat {seat}\"),\n        Ticket::Waiting(pos) => println!(\"wait {pos}\"),\n    }\n}",
        "lineByLine": [
          {
            "line": "match t {",
            "explanation": "Checks the single ticket value."
          },
          {
            "line": "Ticket::Confirmed(seat)",
            "explanation": "Binds the payload to seat."
          },
          {
            "line": "Ticket::Waiting(pos)",
            "explanation": "This arm runs and prints wait 7."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Method on a struct",
        "code": "struct Bill {\n    total: f64,\n}\n\nimpl Bill {\n    fn with_gst(&self) -> f64 {\n        self.total * 1.18\n    }\n}\n\nfn main() {\n    let b = Bill { total: 100.0 };\n    println!(\"{}\", b.with_gst());\n}",
        "lineByLine": [
          {
            "line": "impl Bill {",
            "explanation": "Attaches behaviour to the type."
          },
          {
            "line": "fn with_gst(&self)",
            "explanation": "Borrows the bill without consuming it."
          },
          {
            "line": "b.with_gst()",
            "explanation": "Calculates 118.0."
          }
        ]
      },
      {
        "title": "Update syntax",
        "code": "struct City {\n    name: String,\n    metro: bool,\n}\n\nfn main() {\n    let a = City { name: String::from(\"Pune\"), metro: true };\n    let b = City { name: String::from(\"Mumbai\"), ..a };\n    println!(\"{} {}\", b.name, b.metro);\n}",
        "lineByLine": [
          {
            "line": "let a = City { ... }",
            "explanation": "Original record."
          },
          {
            "line": "..a",
            "explanation": "Copies unchanged fields into b."
          },
          {
            "line": "b.metro",
            "explanation": "Still true from a."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Option as enum",
        "code": "fn main() {\n    let city: Option<String> = Some(String::from(\"Delhi\"));\n    match city {\n        Some(c) => println!(\"go to {c}\"),\n        None => println!(\"stay home\"),\n    }\n}",
        "note": "Option is an enum with Some and None, so missing values are handled explicitly instead of null."
      },
      {
        "title": "Result style flow",
        "code": "fn parse_age(s: &str) -> Result<u32, String> {\n    s.trim().parse::<u32>().map_err(|_| format!(\"bad age {s}\"))\n}\n\nfn main() {\n    match parse_age(\"21\") {\n        Ok(a) => println!(\"next {}\", a + 1),\n        Err(e) => println!(\"{e}\"),\n    }\n}",
        "note": "Result carries success or a message, and match forces both paths to be handled."
      }
    ],
    "practice": [
      {
        "question": "Model a Book with title and pages, then print both.",
        "hint": "Struct plus dot access.",
        "answer": "struct Book {\n    title: String,\n    pages: u32,\n}\nfn main() {\n    let b = Book { title: String::from(\"Guide\"), pages: 320 };\n    println!(\"{} {}\", b.title, b.pages);\n}"
      },
      {
        "question": "Make Signal enum Red/Yellow/Green and match it.",
        "hint": "Unit variants need no payload.",
        "answer": "enum Signal {\n    Red,\n    Yellow,\n    Green,\n}\nfn main() {\n    match Signal::Green {\n        Signal::Red => println!(\"stop\"),\n        Signal::Yellow => println!(\"wait\"),\n        Signal::Green => println!(\"go\"),\n    }\n}"
      },
      {
        "question": "Add is_long(&self) to Book for pages over 300.",
        "hint": "Method returning bool.",
        "answer": "impl Book {\n    fn is_long(&self) -> bool {\n        self.pages > 300\n    }\n}"
      },
      {
        "question": "Why must match cover every enum variant?",
        "hint": "Rust rejects missing cases at compile time.",
        "answer": "match t {\n    Ticket::Confirmed(s) => println!(\"{s}\"),\n    Ticket::Waiting(p) => println!(\"{p}\"),\n}"
      }
    ],
    "interview": [
      {
        "question": "Struct versus enum?",
        "answer": "A struct combines several fields that occur together. An enum chooses one shape from several alternatives, each optionally carrying different data."
      },
      {
        "question": "What does exhaustive match guarantee?",
        "answer": "Every possible value has handling code, so new variants break compilation until handled. This prevents silent unhandled cases."
      },
      {
        "question": "When should methods take &self?",
        "answer": "When they only read the object. Use &mut self for mutation and self when intentionally consuming the value."
      },
      {
        "question": "Why is Option better than null?",
        "answer": "Option makes absence visible in the type, so the compiler forces Some and None handling. Null hides absence and causes runtime crashes."
      }
    ]
  },
  {
    "id": "rust-5",
    "title": "Collections: Vec, String & HashMap",
    "level": "Intermediate",
    "definition": "Vec<T> is a growable typed array; String is growable UTF-8 text (vs borrowed &str); HashMap<K,V> maps keys to values. All are heap-allocated, owned values that move, borrow and drop like everything else.",
    "analogy": "Like a wedding guest list: Vec is the extendable register (push more names as RSVPs arrive); String is the erasable whiteboard (push_str edits freely) vs the printed card (&str); HashMap is the seating chart mapping table numbers to family names.",
    "keyPoints": [
      "Vec: let mut v = vec![1, 2]; v.push(3); v[0]; v.len(); v.iter() borrows each item.",
      "Indexing v[i] panics if out of bounds; v.get(i) returns Option for safe access.",
      "String vs &str: String owns and grows (push_str); &str borrows a view; \"lit\" is &str, to_string() converts.",
      "Iterate strings by .chars() (Unicode-safe) not bytes; never index a String with [i].",
      "HashMap: map.insert(k, v); map.get(&k) gives Option<&V>; entry(k).or_insert(0) counts in one pass.",
      "Ownership applies: passing a Vec moves it unless borrowed (&v) or cloned (v.clone())."
    ],
    "basicExamples": [
      {
        "title": "Vec grow and read",
        "code": "fn main() {\n    let mut cart = vec![\"idli\", \"dosa\"];\n    cart.push(\"vada\");\n    println!(\"{} {}\", cart.len(), cart[0]);\n    for item in &cart {\n        println!(\"{item}\");\n    }\n}",
        "lineByLine": [
          {
            "line": "let mut cart = vec![\"idli\", \"dosa\"];",
            "explanation": "Growable list of two items."
          },
          {
            "line": "cart.push(\"vada\");",
            "explanation": "Appends a third at the end."
          },
          {
            "line": "for item in &cart {",
            "explanation": "Borrows each - cart stays usable after."
          }
        ]
      },
      {
        "title": "String building",
        "code": "fn main() {\n    let mut s = String::from(\"Namaste\");\n    s.push_str(\", Asha\");\n    s.push(33 as char);\n    println!(\"{s}\");\n}",
        "lineByLine": [
          {
            "line": "let mut s = String::from(\"Namaste\");",
            "explanation": "Owned, growable text."
          },
          {
            "line": "s.push_str(\", Asha\");",
            "explanation": "Appends a borrowed slice."
          },
          {
            "line": "println!(\"{s}\");",
            "explanation": "Prints: Namaste, Asha!"
          }
        ]
      },
      {
        "title": "HashMap counting",
        "code": "use std::collections::HashMap;\nfn main() {\n    let mut count = HashMap::new();\n    for w in [\"idli\", \"dosa\", \"idli\"] {\n        *count.entry(w).or_insert(0) += 1;\n    }\n    println!(\"{}\", count[\"idli\"]);\n}",
        "lineByLine": [
          {
            "line": "let mut count = HashMap::new();",
            "explanation": "Empty word-to-count map."
          },
          {
            "line": "*count.entry(w).or_insert(0) += 1;",
            "explanation": "First sight inserts 0 then adds; repeats accumulate."
          },
          {
            "line": "println!(\"{}\", count[\"idli\"]);",
            "explanation": "Prints 2."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Safe access with get",
        "code": "fn main() {\n    let v = vec![10, 20];\n    match v.get(5) {\n        Some(x) => println!(\"{x}\"),\n        None => println!(\"missing\"),\n    }\n}",
        "lineByLine": [
          {
            "line": "v.get(5)",
            "explanation": "Returns Option instead of panicking."
          },
          {
            "line": "Some(x) => ... None => ...",
            "explanation": "Both outcomes handled explicitly."
          }
        ]
      },
      {
        "title": "chars not bytes",
        "code": "fn main() {\n    let s = \"namaste\";\n    println!(\"{}\", s.chars().count());\n    for c in s.chars() {\n        print!(\"{c} \");\n    }\n}",
        "lineByLine": [
          {
            "line": "s.chars().count()",
            "explanation": "Counts Unicode characters correctly."
          },
          {
            "line": "for c in s.chars() {",
            "explanation": "Walks each char safely."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "entry API patterns",
        "code": "use std::collections::HashMap;\nfn main() {\n    let mut stock = HashMap::new();\n    stock.entry(\"dosa\").or_insert(50);\n    stock.entry(\"dosa\").and_modify(|n| *n -= 1);\n    println!(\"{}\", stock[\"dosa\"]);\n}",
        "note": "entry avoids double lookup: or_insert defaults, and_modify updates in place - the idiomatic counter."
      },
      {
        "title": "Vec of structs with retain",
        "code": "struct Item { name: String, qty: i32 }\nfn main() {\n    let mut cart = vec![Item { name: \"idli\".into(), qty: 2 }];\n    cart.retain(|i| i.qty > 0);\n    println!(\"{}\", cart.len());\n}",
        "note": "retain keeps matching items in place - filtering without allocating a second Vec."
      }
    ],
    "practice": [
      {
        "question": "Build vec 1..5, print sum via iter().sum().",
        "hint": "Range collect + sum.",
        "answer": "let v: Vec<i32> = (1..=5).collect();\nprintln!(\"{}\", v.iter().sum::<i32>());"
      },
      {
        "question": "Greet name by pushing onto \"Namaste, \".",
        "hint": "push_str then print.",
        "answer": "let mut s = String::from(\"Namaste, \");\ns.push_str(\"Asha\");\nprintln!(\"{s}\");"
      },
      {
        "question": "Count letters in \"dosa\" with a HashMap.",
        "hint": "entry + or_insert per char.",
        "answer": "use std::collections::HashMap;\nlet mut m = HashMap::new();\nfor c in \"dosa\".chars() { *m.entry(c).or_insert(0) += 1; }\nprintln!(\"{:?}\", m);"
      },
      {
        "question": "Fix: v[v.len()] panics - safe version?",
        "hint": "get() with match/unwrap_or.",
        "answer": "match v.get(v.len()) { Some(x) => println!(\"{x}\"), None => println!(\"end\") }"
      }
    ],
    "interview": [
      {
        "question": "Vec vs array vs slice?",
        "answer": "Array [T; N]: fixed size, stack. Vec<T>: growable, heap. Slice &[T]: borrowed view into either. Functions take slices for flexibility."
      },
      {
        "question": "String vs &str - when each?",
        "answer": "String: owned, growable return/storage. &str: borrowed view for reading (function args). Convert with to_string()/as_str(); literals are &str."
      },
      {
        "question": "Why does indexing a String not compile?",
        "answer": "UTF-8 chars vary in bytes, so [i] is ambiguous (byte vs char). chars()/bytes() or slices make the unit explicit."
      },
      {
        "question": "How does entry() avoid double lookup?",
        "answer": "entry(k) finds-or-prepares the slot once; or_insert/and_modify then act on it. The naive contains+insert hashes twice."
      }
    ]
  },
  {
    "id": "rust-6",
    "title": "Errors: Result, Option & unwrap habits",
    "level": "Intermediate",
    "definition": "Rust has no exceptions: functions return Result<T, E> (success or failure) and Option<T> (value or nothing). match, ?, unwrap and combinators handle them - the compiler forces every failure path to be addressed.",
    "analogy": "Like a parcel counter with two slips: Result is delivered-or-returned (you MUST sign for either), Option is full-or-empty locker (you check before reaching in). ? is handing the return slip straight up the chain instead of queuing twice.",
    "keyPoints": [
      "Result<T, E> is Ok(value) or Err(problem); Option<T> is Some(value) or None - both are enums.",
      "match handles every arm explicitly; if let handles one case and ignores the rest.",
      "? unwraps success and RETURNS the error early - functions using it must return Result or Option.",
      "unwrap() panics on failure: fine in examples, banned in production and interviews.",
      "ok_or turns Option into Result with a chosen error; ok() turns Result into Option.",
      "Combinators map, and_then, unwrap_or chain without nesting: opt.map(|v| v + 1).unwrap_or(0)."
    ],
    "basicExamples": [
      {
        "title": "Option check",
        "code": "fn main() {\n    let locker: Option<i32> = Some(42);\n    if let Some(v) = locker {\n        println!(\"found {v}\");\n    }\n    let empty: Option<i32> = None;\n    println!(\"{}\", empty.unwrap_or(0));\n}",
        "lineByLine": [
          {
            "line": "let locker: Option<i32> = Some(42);",
            "explanation": "A locker that HAS a value."
          },
          {
            "line": "if let Some(v) = locker {",
            "explanation": "Opens only the full case."
          },
          {
            "line": "empty.unwrap_or(0)",
            "explanation": "Empty locker yields the fallback 0 - no panic."
          }
        ]
      },
      {
        "title": "Result match",
        "code": "fn divide(a: f64, b: f64) -> Result<f64, String> {\n    if b == 0.0 {\n        Err(\"cannot divide by zero\".to_string())\n    } else {\n        Ok(a / b)\n    }\n}\nfn main() {\n    match divide(10.0, 2.0) {\n        Ok(v) => println!(\"{v}\"),\n        Err(e) => println!(\"error: {e}\"),\n    }\n}",
        "lineByLine": [
          {
            "line": "if b == 0.0 { Err(...) }",
            "explanation": "Bad input becomes an Err VALUE."
          },
          {
            "line": "Ok(a / b)",
            "explanation": "Good input wraps the answer."
          },
          {
            "line": "match divide(10.0, 2.0) {",
            "explanation": "Caller MUST handle both arms."
          }
        ]
      },
      {
        "title": "Question mark",
        "code": "use std::num::ParseIntError;\nfn double(s: &str) -> Result<i32, ParseIntError> {\n    let n = s.parse::<i32>()?;\n    Ok(n * 2)\n}\nfn main() {\n    println!(\"{:?}\", double(\"21\"));\n}",
        "lineByLine": [
          {
            "line": "let n = s.parse::<i32>()?;",
            "explanation": "? returns the error early on bad input."
          },
          {
            "line": "Ok(n * 2)",
            "explanation": "Runs only when parsing succeeded."
          },
          {
            "line": "println!(\"{:?}\", double(\"21\"));",
            "explanation": "Prints Ok(42)."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Combinator chain",
        "code": "fn main() {\n    let raw = Some(\"42\");\n    let n = raw\n        .and_then(|s| s.parse::<i32>().ok())\n        .map(|v| v + 8)\n        .unwrap_or(0);\n    println!(\"{n}\");\n}",
        "lineByLine": [
          {
            "line": ".and_then(|s| s.parse::<i32>().ok())",
            "explanation": "Parse may fail: failures become None."
          },
          {
            "line": ".map(|v| v + 8)",
            "explanation": "Transforms only surviving values."
          },
          {
            "line": ".unwrap_or(0)",
            "explanation": "One fallback at the end, no nesting."
          }
        ]
      },
      {
        "title": "ok_or bridge",
        "code": "fn main() {\n    let maybe: Option<i32> = None;\n    let r: Result<i32, &str> = maybe.ok_or(\"locker empty\");\n    println!(\"{:?}\", r);\n}",
        "lineByLine": [
          {
            "line": "let maybe: Option<i32> = None;",
            "explanation": "Starts as maybe-nothing."
          },
          {
            "line": "maybe.ok_or(\"locker empty\")",
            "explanation": "Converts None into Err with your message."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Custom error enum",
        "code": "#[derive(Debug)]\nenum BillError {\n    Missing(String),\n    BadAmount(i32),\n}\nfn total(items: &[i32]) -> Result<i32, BillError> {\n    if items.is_empty() {\n        return Err(BillError::Missing(\"no items\".into()));\n    }\n    Ok(items.iter().sum())\n}",
        "note": "Domain error enums name EVERY failure mode; callers match precisely instead of parsing strings."
      },
      {
        "title": "Propagate with context",
        "code": "fn load(path: &str) -> Result<String, String> {\n    std::fs::read_to_string(path)\n        .map_err(|e| format!(\"{path}: {e}\"))\n}",
        "note": "map_err adds WHERE it failed while ?/propagation carries it up - location plus cause in one line."
      }
    ],
    "practice": [
      {
        "question": "Return the first even number as Option<i32>.",
        "hint": "Iterate, wrap match in Some, default None.",
        "answer": "fn first_even(xs: &[i32]) -> Option<i32> {\n    for &x in xs {\n        if x % 2 == 0 {\n            return Some(x);\n        }\n    }\n    None\n}"
      },
      {
        "question": "Parse two strings and sum; ? on both parses.",
        "hint": "? chains two fallible steps.",
        "answer": "fn sum2(a: &str, b: &str) -> Result<i32, std::num::ParseIntError> {\n    Ok(a.parse::<i32>()? + b.parse::<i32>()?)\n}"
      },
      {
        "question": "Get config port: env Option, default 8000, parse safely.",
        "hint": "and_then plus unwrap_or.",
        "answer": "fn port(env: Option<&str>) -> u16 {\n    env.and_then(|s| s.parse().ok()).unwrap_or(8000)\n}"
      },
      {
        "question": "Why is .unwrap() on user input dangerous? Fix it.",
        "hint": "Panics crash the program on bad data.",
        "answer": "// Fix: match or ? the Result\n// match s.parse::<i32>() {\n//   Ok(n) => println!(\"{n}\"),\n//   Err(_) => println!(\"type digits only\"),\n// }"
      }
    ],
    "interview": [
      {
        "question": "Why no exceptions in Rust?",
        "answer": "Errors are VALUES (Result) so every failure path is visible in signatures and checked by the compiler. No hidden control flow, no forgotten catches."
      },
      {
        "question": "? operator - exact rules?",
        "answer": "Unwraps Ok/Some, early-returns Err/None converted via From. Function must return Result/Option with compatible error type. Keeps happy paths flat."
      },
      {
        "question": "When is unwrap acceptable?",
        "answer": "Examples, tests, and provably-safe spots (parsed constants). Never on user input, I/O, or network - reviewers reject it there. expect() with a message is the documented sibling."
      },
      {
        "question": "Combinators vs match - which when?",
        "answer": "map/and_then/unwrap_or for short pipelines; match for side effects, logging, or different types per arm. Long combinator chains become unreadable past 3 steps."
      }
    ]
  },
  {
    "id": "rust-7",
    "title": "Traits & generics",
    "level": "Intermediate",
    "definition": "Traits define shared behavior (methods a type must provide) like interfaces. Generics write code once that works for many types. Together they give reusable, type-safe abstractions with zero runtime cost.",
    "analogy": "Like a Swiggy delivery contract: a trait says \"anyone delivering must have ride() and deliver(). A bike rider and a cyclist both sign it (implement the trait). Generics is one delivery app that works for any vehicle without rewriting code for each.",
    "keyPoints": [
      "Define a trait: trait Speak { fn speak(&self) -> String; } and implement it per type with impl Speak for Dog { ... }.",
      "impl Trait for Type must implement EVERY required method or the compiler errors.",
      "Generics: fn largest<T: PartialOrd>(list: &[T]) -> &T works for any comparable type.",
      "Trait bounds (T: Trait) restrict generics to types that implement the trait.",
      "Derive traits for free: #[derive(Debug, Clone, PartialEq)] prints, clones and compares structs.",
      "The blanket impl pattern lets the stdlib auto-implement traits (like ToString) for your types."
    ],
    "basicExamples": [
      {
        "title": "Trait with default method",
        "code": "trait Greet {\n    fn name(&self) -> String;\n    fn greet(&self) -> String {\n        format!(\"Namaste, {}!\", self.name())\n    }\n}\nstruct Student { name: String }\nimpl Greet for Student {\n    fn name(&self) -> String { self.name.clone() }\n}",
        "lineByLine": [
          {
            "line": "trait Greet {",
            "explanation": "Defines the shared contract."
          },
          {
            "line": "fn greet(&self) -> String { ... }",
            "explanation": "A default method every implementor inherits."
          },
          {
            "line": "impl Greet for Student",
            "explanation": "Provides the one required method; greet comes free."
          }
        ]
      },
      {
        "title": "Using a trait object",
        "code": "fn shout(g: &impl Greet) {\n    println!(\"{}\", g.greet());\n}\nlet s = Student { name: \"Asha\".into() };\nshout(&s);",
        "lineByLine": [
          {
            "line": "fn shout(g: &impl Greet)",
            "explanation": "Accepts anything implementing Greet."
          },
          {
            "line": "let s = Student { name: \"Asha\".into() };",
            "explanation": "Build a concrete type."
          },
          {
            "line": "shout(&s);",
            "explanation": "Passes it in; the trait method runs."
          }
        ]
      },
      {
        "title": "Generic function",
        "code": "fn biggest<T: PartialOrd>(a: T, b: T) -> T {\n    if a > b { a } else { b }\n}\nprintln!(\"{}\", biggest(3, 7));\nprintln!(\"{}\", biggest(\"apple\", \"mango\"));",
        "lineByLine": [
          {
            "line": "fn biggest<T: PartialOrd>(a: T, b: T) -> T {",
            "explanation": "Works for any ordered type T."
          },
          {
            "line": "if a > b { a } else { b }",
            "explanation": "Needs PartialOrd to compare."
          },
          {
            "line": "biggest(\"apple\", \"mango\")",
            "explanation": "Same code, now for strings."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Generic struct",
        "code": "struct Pair<T> { first: T, second: T }\nlet p = Pair { first: 10, second: 20 };\nlet q = Pair { first: \"a\", second: \"b\" };\nprintln!(\"{} {}\", p.first, q.second);",
        "lineByLine": [
          {
            "line": "struct Pair<T> { first: T, second: T }",
            "explanation": "One struct, any type T."
          },
          {
            "line": "let p = Pair { first: 10, second: 20 };",
            "explanation": "T is inferred as i32."
          },
          {
            "line": "let q = Pair { ... \"b\" };",
            "explanation": "Same struct, now T is &str."
          }
        ]
      },
      {
        "title": "Derive common traits",
        "code": "#[derive(Debug, Clone, PartialEq)]\nstruct Point { x: i32, y: i32 }\nlet a = Point { x: 1, y: 2 };\nlet b = a.clone();\nprintln!(\"{:?} {}\", a == b, a.x);",
        "lineByLine": [
          {
            "line": "#[derive(Debug, Clone, PartialEq)]",
            "explanation": "Auto-implements print, clone, equality."
          },
          {
            "line": "let b = a.clone();",
            "explanation": "Clone comes from the derive."
          },
          {
            "line": "a == b",
            "explanation": "Equality too — no manual impl needed."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Trait bound with multiple constraints",
        "code": "fn show<T: std::fmt::Debug + Clone>(x: T) {\n    let y = x.clone();\n    println!(\"{:?}\", y);\n}\nshow(vec![1, 2, 3]);",
        "note": "Combine bounds with + to require Debug AND Clone; the compiler monomorphizes a specialized copy per type."
      },
      {
        "title": "Associated types vs generics",
        "code": "trait Container {\n    type Item;\n    fn first(&self) -> Option<&Self::Item>;\n}",
        "note": "Associated types (type Item) name the element once per impl, unlike a generic <T> that could repeat. Used by Iterator."
      }
    ],
    "practice": [
      {
        "question": "Define trait Area with fn area() and implement for a Rect struct.",
        "hint": "impl Area for Rect { fn area(&self) -> f64 { ... } }.",
        "answer": "struct Rect { w: f64, h: f64 }\ntrait Area { fn area(&self) -> f64; }\nimpl Area for Rect {\n    fn area(&self) -> f64 { self.w * self.h }\n}"
      },
      {
        "question": "Write max_of<T: PartialOrd>(&[T]) -> &T returning the largest.",
        "hint": "Track best; use > to compare.",
        "answer": "fn max_of<T: PartialOrd>(list: &[T]) -> &T {\n    let mut best = &list[0];\n    for x in &list[1..] { if x > best { best = x; } }\n    best\n}"
      },
      {
        "question": "Add #[derive] so a struct can be printed with {:?}.",
        "hint": "Derive Debug.",
        "answer": "#[derive(Debug)]\nstruct T { n: i32 }\nprintln!(\"{:?}\", T { n: 5 });"
      },
      {
        "question": "Why does impl Speak for Dog without all methods fail?",
        "hint": "Every required trait method must be implemented unless it has a default body.",
        "answer": "trait Speak { fn bark(&self); }\nimpl Speak for Dog {} // ERROR: bark missing"
      }
    ],
    "interview": [
      {
        "question": "Traits vs interfaces (Java) — similarities and differences?",
        "answer": "Both define shared behavior. Rust traits support default methods, associated types, and can be implemented for types you do not own (e.g. your trait on Vec), unlike Java interfaces on your own classes only."
      },
      {
        "question": "What is monomorphization and why does Rust generics cost nothing at runtime?",
        "answer": "The compiler generates a concrete function/struct per used type at compile time. No boxing, no vtables for generics — as fast as hand-written code, at the cost of larger binaries."
      },
      {
        "question": "Static dispatch vs dynamic dispatch (impl Trait vs &dyn Trait)?",
        "answer": "impl Trait / <T: Trait> is static: known type, monomorphized, fastest. &dyn Trait is dynamic: one call site, vtable lookup, allows heterogeneous collections. Pick static by default."
      },
      {
        "question": "What is the orphan rule?",
        "answer": "You can implement a trait for a type only if the trait OR the type is local to your crate. Prevents conflicting impls across crates; worked around with newtype wrappers."
      }
    ]
  },
  {
    "id": "rust-8",
    "title": "Iterators & closures",
    "level": "Intermediate",
    "definition": "Iterators produce a sequence of values lazily; closures are anonymous functions that can capture their environment. Chained adapters (map, filter, fold) express data transforms clearly and usually compile to the same speed as hand-written loops.",
    "analogy": "Like a juice counter workflow: the fruit basket is the collection, the peeler/filter/strainer are iterator adapters, and a closure is a one-line recipe card (\"peel only ripe mangoes\"). Nothing runs until you actually pour the glass (collect).",
    "keyPoints": [
      "Calling .iter()/iter_mut()/into_iter() borrows or takes elements; loops over them lazily.",
      "Adapters (map, filter, take, skip) are lazy — they do nothing until a consumer runs.",
      "Consumers (collect, sum, count, for_each) drive the pipeline and produce the result.",
      "Closures: |x| x + 1; use move to take ownership of captured variables.",
      "fold is the general accumulator (reduce): list.iter().fold(0, |acc, x| acc + x).",
      "IteRators avoid intermediate allocations and often beat index loops in benchmarks."
    ],
    "basicExamples": [
      {
        "title": "map and filter",
        "code": "let nums = vec![1, 2, 3, 4, 5];\nlet evens_sq: Vec<i32> = nums.iter().filter(|&&x| x % 2 == 0).map(|&x| x * x).collect();\nprintln!(\"{:?}\", evens_sq);",
        "lineByLine": [
          {
            "line": "nums.iter()",
            "explanation": "Borrows each element."
          },
          {
            "line": ".filter(|&&x| x % 2 == 0)",
            "explanation": "Keeps only even numbers (closure)."
          },
          {
            "line": ".map(|&x| x * x).collect()",
            "explanation": "Squares them and gathers into a Vec."
          }
        ]
      },
      {
        "title": "sum and count",
        "code": "let total: i32 = (1..=100).sum();\nlet n = vec![2, 4, 6].iter().count();\nprintln!(\"{} {}\", total, n);",
        "lineByLine": [
          {
            "line": "(1..=100).sum()",
            "explanation": "Range is an iterator; sum consumes it: 5050."
          },
          {
            "line": ".iter().count()",
            "explanation": "counts elements: 3."
          },
          {
            "line": "println!(\"{} {}\", total, n)",
            "explanation": "Prints 5050 3."
          }
        ]
      },
      {
        "title": "Closure capture",
        "code": "let factor = 3;\nlet scale = |x: i32| x * factor;\nprintln!(\"{}\", scale(4));",
        "lineByLine": [
          {
            "line": "let factor = 3;",
            "explanation": "Captured by the closure by reference."
          },
          {
            "line": "let scale = |x: i32| x * factor;",
            "explanation": "Borrows factor from the environment."
          },
          {
            "line": "scale(4)",
            "explanation": "Prints 12."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "fold as reduce",
        "code": "let words = vec![\"idli\", \"dosa\", \"vada\"];\nlet menu = words.iter().fold(String::new(), |mut acc, w| {\n    if !acc.is_empty() { acc.push_str(\", \"); }\n    acc.push_str(w);\n    acc\n});\nprintln!(\"{}\", menu);",
        "lineByLine": [
          {
            "line": "words.iter().fold(String::new(), ...)",
            "explanation": "Starts with an empty accumulator."
          },
          {
            "line": "if !acc.is_empty() { acc.push_str(\", \"); }",
            "explanation": "Adds a separator except before the first item."
          },
          {
            "line": "acc.push_str(w); acc",
            "explanation": "Appends and returns the accumulator."
          }
        ]
      },
      {
        "title": "move closures",
        "code": "let name = String::from(\"Asha\");\nlet greet = move || println!(\"Hi {}\", name);\ngreet();",
        "lineByLine": [
          {
            "line": "let name = String::from(\"Asha\");",
            "explanation": "Owned string."
          },
          {
            "line": "let greet = move || ...",
            "explanation": "move forces the closure to take ownership of name."
          },
          {
            "line": "greet();",
            "explanation": "Prints Hi Asha; name is now owned by greet."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Chained pipeline with take",
        "code": "let result: Vec<i32> = (1..).map(|x| x * x).take_while(|&x| x < 50).collect();\nprintln!(\"{:?}\", result);",
        "note": "(1..) is an infinite lazy range — take_while makes it finite. Zero-cost: no unbounded allocation."
      },
      {
        "title": "Custom iterator",
        "code": "struct Countdown(i32);\nimpl Iterator for Countdown {\n    type Item = i32;\n    fn next(&mut self) -> Option<i32> {\n        if self.0 <= 0 { return None; }\n        self.0 -= 1;\n        Some(self.0 + 1)\n    }\n}\nfor n in Countdown(3) { print!(\"{} \", n); }",
        "note": "Implement next() and you get map/filter/for free. Iterator is the backbone of idiomatic Rust."
      }
    ],
    "practice": [
      {
        "question": "Square only the positive numbers and collect into a Vec.",
        "hint": "filter then map.",
        "answer": "let v = vec![-2, 3, -1, 5];\nlet out: Vec<i32> = v.iter().filter(|&&x| x > 0).map(|&x| x * x).collect();"
      },
      {
        "question": "Find the sum of all even numbers 1..=50.",
        "hint": "filter + sum.",
        "answer": "let s: i32 = (1..=50).filter(|x| x % 2 == 0).sum();"
      },
      {
        "question": "Build \"a, b, c\" from a Vec<&str> using fold.",
        "hint": "fold with separator logic.",
        "answer": "let v = vec![\"a\", \"b\", \"c\"];\nlet s = v.iter().fold(String::new(), |a, w| if a.is_empty() { w.to_string() } else { format!(\"{}, {}\", a, w) });"
      },
      {
        "question": "Why does `nums.iter().map(...)` not run until collect()?",
        "hint": "Adapters are lazy; a consumer is required.",
        "answer": "let v = vec![1, 2, 3];\nlet it = v.iter().map(|x| x * 2); // nothing yet\nlet out: Vec<_> = it.collect(); // runs now"
      }
    ],
    "interview": [
      {
        "question": "What makes iterators zero-cost?",
        "answer": "Lazy adapters compile into tight loops via monomorphization, with intermediate steps fused and optimized away — often matching hand-written index loops."
      },
      {
        "question": "iter() vs into_iter() vs iter_mut()?",
        "answer": "iter borrows (&T), iter_mut borrows mutably (&mut T), into_iter consumes (T). Choose by whether you need to keep or change the collection."
      },
      {
        "question": "Closures vs fn pointers?",
        "answer": "Closures can capture environment and each has a unique anonymous type; fn pointers cannot capture. Use closures by default; fn for callbacks needing a plain pointer type."
      },
      {
        "question": "When is a for loop clearer than iterator chains?",
        "answer": "When the body has complex control flow (multiple break/continue, early returns with data). Prefer chains for simple filter/map/reduce transforms."
      }
    ]
  },
  {
    "id": "rust-9",
    "title": "Generics & trait bounds",
    "level": "Advanced",
    "definition": "Generics let one function or struct work over many types, and trait bounds (T: Display) restrict which types are acceptable. Monomorphisation means the compiler generates a concrete version for each type used, so generics cost nothing at runtime.",
    "analogy": "Like a modular kitchen platform: the countertop is the generic function that accepts any container meeting the standard (the trait bound is the ISI measurement - must fit the socket). You write the platform once; the workshop cuts a custom version for each vessel you actually bring, which is why nothing wobbles at runtime.",
    "keyPoints": [
      "fn largest<T: PartialOrd>(list: &[T]) -> &T works for ints, floats and Strings alike.",
      "Bounds come after the colon: T: Clone + Debug requires both traits; where clauses read better when long.",
      "impl Trait is the shorthand: fn area(s: impl Shape) is the same as <S: Shape>(s: S).",
      "Derive gives you Debug, Clone, PartialEq, Eq, Hash for free - the everyday traits you need constantly.",
      "Sized is implicit; use ?Sized when you genuinely want trait objects or slices.",
      "Blanket impls like impl<T: Display> ToString for T add methods to every qualifying type - that is how .to_string() exists everywhere."
    ],
    "basicExamples": [
      {
        "title": "Generic max function",
        "code": "fn largest<T: PartialOrd>(list: &[T]) -> &T {\n    let mut best = &list[0];\n    for item in list {\n        if item > best {\n            best = item;\n        }\n    }\n    best\n}\n\nfn main() {\n    println!(\"{}\", largest(&[3, 9, 2]));\n    println!(\"{}\", largest(&[\"goa\", \"agra\", \"delhi\"]));\n}",
        "lineByLine": [
          {
            "line": "fn largest<T: PartialOrd>(list: &[T]) -> &T {",
            "explanation": "One function; T is decided by the caller."
          },
          {
            "line": "if item > best {",
            "explanation": "Allowed because PartialOrd guarantees comparison."
          },
          {
            "line": "largest(&[\"goa\", \"agra\", \"delhi\"])",
            "explanation": "Same code now works on strings."
          }
        ]
      },
      {
        "title": "Generic struct",
        "code": "struct Box2<T> {\n    item: T,\n}\n\nfn main() {\n    let a = Box2 { item: 42 };\n    let b = Box2 { item: \"chai\" };\n    println!(\"{} {}\", a.item, b.item);\n}",
        "lineByLine": [
          {
            "line": "struct Box2<T> {",
            "explanation": "The struct is parameterised by the item type."
          },
          {
            "line": "let a = Box2 { item: 42 };",
            "explanation": "Box2<i32> version generated here."
          },
          {
            "line": "let b = Box2 { item: \"chai\" };",
            "explanation": "A second, separate version generated for &str."
          }
        ]
      },
      {
        "title": "impl Trait shorthand",
        "code": "fn shout(name: impl std::fmt::Display) -> String {\n    format!(\"HEY {}!\", name)\n}\n\nfn main() {\n    println!(\"{}\", shout(\"Asha\"));\n    println!(\"{}\", shout(42));\n}",
        "lineByLine": [
          {
            "line": "fn shout(name: impl std::fmt::Display) -> String {",
            "explanation": "Anything printable is accepted."
          },
          {
            "line": "shout(\"Asha\")",
            "explanation": "A &str qualifies - Display is implemented."
          },
          {
            "line": "shout(42)",
            "explanation": "Integers also implement Display, so this compiles."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Multiple bounds with where",
        "code": "use std::fmt::Debug;\n\nfn show_all<T>(items: &[T])\nwhere\n    T: Debug + Clone,\n{\n    for item in items {\n        println!(\"{:?}\", item.clone());\n    }\n}\n\nfn main() {\n    show_all(&[1, 2, 3]);\n}",
        "lineByLine": [
          {
            "line": "where T: Debug + Clone,",
            "explanation": "Both traits required; the where clause keeps signatures readable."
          },
          {
            "line": "item.clone()",
            "explanation": "clone() exists only because of the Clone bound."
          },
          {
            "line": "println!(\"{:?}\", ...)",
            "explanation": "Debug formatting exists because of the Debug bound."
          }
        ]
      },
      {
        "title": "Generic returning T",
        "code": "fn pick_first<T>(a: T, b: T) -> T {\n    a\n}\n\nfn main() {\n    println!(\"{}\", pick_first(\"first\", \"second\"));\n    println!(\"{}\", pick_first(7, 9));\n}",
        "lineByLine": [
          {
            "line": "fn pick_first<T>(a: T, b: T) -> T {",
            "explanation": "Both inputs must be the SAME type T."
          },
          {
            "line": "a is returned",
            "explanation": "The chosen value, type preserved."
          },
          {
            "line": "pick_first(7, 9)",
            "explanation": "Mixed types like pick_first(1, \"a\") would be rejected."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Generic enum with guards",
        "code": "enum Holder<T> {\n    Empty,\n    Full(T),\n}\n\nfn describe(h: Holder<i32>) -> String {\n    match h {\n        Holder::Empty => \"nothing\".to_string(),\n        Holder::Full(n) if n > 100 => \"big\".to_string(),\n        Holder::Full(n) => format!(\"value {}\", n),\n    }\n}\n\nfn main() {\n    println!(\"{}\", describe(Holder::Full(150)));\n}",
        "note": "Generic enums (Result<T, E>, Option<T>) plus guard arms (if n > 100) are how libraries stay reusable and expressive."
      },
      {
        "title": "Trait objects vs generics",
        "code": "trait Shape {\n    fn area(&self) -> f64;\n}\n\nfn total_dynamic(shapes: &[Box<dyn Shape>]) -> f64 {\n    shapes.iter().map(|s| s.area()).sum()\n}\n\nstruct Sq(f64);\nimpl Shape for Sq {\n    fn area(&self) -> f64 {\n        self.0 * self.0\n    }\n}\n\nfn main() {\n    let v: Vec<Box<dyn Shape>> = vec![Box::new(Sq(3.0))];\n    println!(\"{}\", total_dynamic(&v));\n}",
        "note": "Generics monomorphise (faster, more code); &dyn Shape keeps one version for a mixed list (slight vtable cost). Choose by whether types are known at compile time."
      }
    ],
    "practice": [
      {
        "question": "Write a generic identity function returning its argument.",
        "hint": "fn id<T>(x: T) -> T.",
        "answer": "fn id<T>(x: T) -> T {\n    x\n}\nfn main() {\n    println!(\"{}\", id(5));\n}"
      },
      {
        "question": "Write max_of<T: PartialOrd> for two values.",
        "hint": "Compare and return the larger.",
        "answer": "fn max_of<T: PartialOrd>(a: T, b: T) -> T {\n    if a > b {\n        a\n    } else {\n        b\n    }\n}"
      },
      {
        "question": "Make a struct Pair<T> with a method using both fields.",
        "hint": "Generic struct + impl block.",
        "answer": "struct Pair<T> {\n    a: T,\n    b: T,\n}\nimpl<T> Pair<T> {\n    fn show(&self) -> String {\n        format!(\"{} then {}\", self.a, self.b)\n    }\n}"
      },
      {
        "question": "Fix: fn mix<T>(a: T) using a.to_string() without a bound.",
        "hint": "Add the bound T: ToString or Display.",
        "answer": "fn mix<T: std::fmt::Display>(a: T) -> String {\n    a.to_string()\n}"
      }
    ],
    "interview": [
      {
        "question": "What is monomorphisation and why does it matter?",
        "answer": "The compiler emits a specialised copy of each generic function per concrete type used. Result: zero runtime cost versus hand-written duplicates, at the price of slightly larger binaries."
      },
      {
        "question": "impl Trait in argument vs return position - difference?",
        "answer": "Argument: caller picks any type implementing Trait. Return: I return some type implementing Trait, you cannot name it - great for hiding iterators and futures."
      },
      {
        "question": "Trait bounds vs trait objects - when each?",
        "answer": "Bounds are static dispatch (monomorphised, fastest, one type per call). dyn Trait is dynamic dispatch through a vtable, needed for heterogeneous collections."
      },
      {
        "question": "Why must both parameters share T in fn f<T>(a: T, b: T)?",
        "answer": "T is a single unknown type, so both arguments must be it. Different types require two parameters (a: T, b: U) or a relationship bound like T: Into<U>."
      }
    ]
  },
  {
    "id": "rust-10",
    "title": "Concurrency: threads, channels & async",
    "level": "Advanced",
    "definition": "Fearless concurrency means the compiler checks thread safety. std::thread::spawn runs closures on new threads, channels (mpsc) pass values between them, Arc<Mutex<T>> shares mutable state safely, and async/await handles thousands of waiting tasks on few threads.",
    "analogy": "Like a railway station with parallel platforms: threads are separate trains running at the same time. A channel is the parcel trolley that safely hands bags from one train to the next. Arc<Mutex<T>> is a single ticket window with one counter clerk and a queue outside. async is one booking clerk handling a thousand phone calls by putting each on hold instead of waiting.",
    "keyPoints": [
      "thread::spawn(|| ...) starts a thread; join() waits for it and returns its Result.",
      "mpsc::channel() gives a sender and receiver - many senders, one receiver, values move across.",
      "Arc<T> shares ownership across threads; Mutex<T> allows one thread inside the lock at a time.",
      "Never share &mut across threads: the borrow checker rejects it at compile time, not at 2 AM.",
      "Send marks types safe to move to another thread; Sync marks them safe to share by reference.",
      "async fn with .await yields instead of blocking - ideal for I/O-heavy servers; use a runtime like tokio."
    ],
    "basicExamples": [
      {
        "title": "Spawn a thread and join",
        "code": "use std::thread;\n\nfn main() {\n    let handle = thread::spawn(|| {\n        let mut sum = 0;\n        for i in 1..=5 {\n            sum += i;\n        }\n        sum\n    });\n    println!(\"from thread: {}\", handle.join().unwrap());\n}",
        "lineByLine": [
          {
            "line": "use std::thread;",
            "explanation": "Brings the thread module into scope."
          },
          {
            "line": "let handle = thread::spawn(|| {",
            "explanation": "Starts a new thread running this closure."
          },
          {
            "line": "handle.join().unwrap()",
            "explanation": "Waits for the thread and unwraps its returned sum: 15."
          }
        ]
      },
      {
        "title": "Channel between threads",
        "code": "use std::sync::mpsc;\nuse std::thread;\n\nfn main() {\n    let (tx, rx) = mpsc::channel();\n    thread::spawn(move || {\n        tx.send(\"order ready\").unwrap();\n    });\n    println!(\"{}\", rx.recv().unwrap());\n}",
        "lineByLine": [
          {
            "line": "let (tx, rx) = mpsc::channel();",
            "explanation": "Creates the send and receive halves."
          },
          {
            "line": "thread::spawn(move || {",
            "explanation": "move pushes tx into the new thread."
          },
          {
            "line": "rx.recv().unwrap()",
            "explanation": "Blocks until a message arrives, then returns it."
          }
        ]
      },
      {
        "title": "Shared counter with Arc<Mutex<T>>",
        "code": "use std::sync::{Arc, Mutex};\nuse std::thread;\n\nfn main() {\n    let total = Arc::new(Mutex::new(0));\n    let mut handles = vec![];\n    for _ in 0..3 {\n        let c = Arc::clone(&total);\n        handles.push(thread::spawn(move || {\n            *c.lock().unwrap() += 1;\n        }));\n    }\n    for h in handles {\n        h.join().unwrap();\n    }\n    println!(\"{}\", total.lock().unwrap());\n}",
        "lineByLine": [
          {
            "line": "let total = Arc::new(Mutex::new(0));",
            "explanation": "Shared, lockable counter."
          },
          {
            "line": "let c = Arc::clone(&total);",
            "explanation": "Each thread gets its own handle to the same value."
          },
          {
            "line": "*c.lock().unwrap() += 1;",
            "explanation": "Lock, mutate, unlock automatically."
          },
          {
            "line": "println!(\"{}\", total.lock().unwrap())",
            "explanation": "Prints 3 - no data race."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Parallel work with scoped threads",
        "code": "use std::thread;\n\nfn main() {\n    let data = vec![1, 2, 3, 4];\n    let sum: i32 = thread::scope(|s| {\n        let half = data.split_at(2);\n        let a: Vec<i32> = half.0.to_vec();\n        let h = s.spawn(move || a.iter().sum::<i32>());\n        let rest: i32 = half.1.iter().sum();\n        h.join().unwrap() + rest\n    });\n    println!(\"{sum}\");\n}",
        "lineByLine": [
          {
            "line": "thread::scope(|s| {",
            "explanation": "Scoped threads may borrow local data safely."
          },
          {
            "line": "let h = s.spawn(move || a.iter().sum())",
            "explanation": "Runs half the sum in parallel."
          },
          {
            "line": "h.join().unwrap() + rest",
            "explanation": "Combines both halves: 10."
          }
        ]
      },
      {
        "title": "async fn and await",
        "code": "async fn fetch_price(item: &str) -> u32 {\n    100 + item.len() as u32\n}\n\nasync fn bill() -> u32 {\n    let dosa = fetch_price(\"dosa\").await;\n    let coffee = fetch_price(\"coffee\").await;\n    dosa + coffee\n}\n\n#[tokio::main]\nasync fn main() {\n    println!(\"{}\", bill().await);\n}",
        "lineByLine": [
          {
            "line": "async fn fetch_price(...)",
            "explanation": "Declares a function that can pause at .await points."
          },
          {
            "line": "let dosa = fetch_price(\"dosa\").await;",
            "explanation": "Runs the task and yields to others while waiting."
          },
          {
            "line": "#[tokio::main]",
            "explanation": "The runtime that drives the future to completion."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Fan-out, fan-in pipeline",
        "code": "use std::sync::mpsc;\nuse std::thread;\n\nfn main() {\n    let (tx, rx) = mpsc::channel();\n    for id in 1..=3 {\n        let t = tx.clone();\n        thread::spawn(move || {\n            t.send(id * id).unwrap();\n        });\n    }\n    drop(tx);\n    let total: i32 = rx.iter().sum();\n    println!(\"{total}\");\n}",
        "note": "Clone the sender for fan-out, drop the original, then rx.iter() ends cleanly when every clone is gone - the standard worker-pool shape."
      },
      {
        "title": "RwLock for read-heavy data",
        "code": "use std::sync::{Arc, RwLock};\n\nfn main() {\n    let menu = Arc::new(RwLock::new(vec![\"dosa\", \"idli\"]));\n    {\n        let read = menu.read().unwrap();\n        println!(\"{:?}\", *read);\n    }\n    {\n        let mut write = menu.write().unwrap();\n        write.push(\"vada\");\n    }\n    println!(\"{:?}\", *menu.read().unwrap());\n}",
        "note": "Many readers OR one writer. Mutex allows only one reader, so RwLock wins for caches and config read constantly."
      }
    ],
    "practice": [
      {
        "question": "Spawn a thread that returns the sum 1..=10; print it in main.",
        "hint": "spawn with a closure returning a value, then join.",
        "answer": "let h = std::thread::spawn(|| (1..=10).sum::<i32>());\nprintln!(\"{}\", h.join().unwrap());"
      },
      {
        "question": "Send three messages through a channel and print them all.",
        "hint": "Clone sender per thread; iterate rx.",
        "answer": "let (tx, rx) = std::sync::mpsc::channel();\nfor i in 1..=3 {\n    let t = tx.clone();\n    std::thread::spawn(move || { t.send(i).unwrap(); });\n}\ndrop(tx);\nfor m in rx {\n    println!(\"{m}\");\n}"
      },
      {
        "question": "Fix: two threads increment a shared i32 without Arc/Mutex.",
        "hint": "Wrap in Arc<Mutex<i32>> and lock.",
        "answer": "use std::sync::{Arc, Mutex};\nlet n = Arc::new(Mutex::new(0));\nlet c = Arc::clone(&n);\nstd::thread::spawn(move || { *c.lock().unwrap() += 1; });\n*n.lock().unwrap() += 1;"
      },
      {
        "question": "When is async better than threads? Explain.",
        "hint": "Many waiting I/O tasks, few cores.",
        "answer": "async suits I/O-bound work: one thread juggles thousands of sockets by awaiting. Threads suit CPU-bound parallel work."
      }
    ],
    "interview": [
      {
        "question": "How does Rust prevent data races at compile time?",
        "answer": "Ownership plus Send/Sync: the borrow checker rejects aliased mutation and moving non-Send values across threads before the program ever runs."
      },
      {
        "question": "Arc vs Rc?",
        "answer": "Rc is fast but single-threaded (non-atomic); Arc uses atomic reference counting and is Send/Sync, so it is the only choice across threads."
      },
      {
        "question": "Mutex vs RwLock - pick one and defend it.",
        "answer": "Mutex: simpler, best when writes are common. RwLock: many concurrent readers with rare writes (caches, config), higher read throughput."
      },
      {
        "question": "What does .await actually do?",
        "answer": "It yields control back to the runtime so other tasks progress while this one waits, then resumes where it left off. Without .await the future does nothing."
      }
    ]
  },
  {
    "id": "rust-11",
    "title": "Smart pointers, lifetimes & interior mutability",
    "level": "Advanced",
    "definition": "Smart pointers are structs that act like pointers but add behaviour: Box<T> moves data to the heap, Rc<T> shares ownership by reference counting, RefCell<T> permits mutation through a shared reference. Lifetimes (a) tell the compiler how long references stay valid so it can guarantee no dangling pointer.",
    "analogy": "Like a public library: Box is a book issued to exactly one reader (single owner on the heap). Rc is a reference book with a counter card - every reader ticks it and it returns to the shelf only when the last tick is crossed out. RefCell is the notebook anyone may read but only the librarian writes in, with the rule checked at the door rather than at printing time. Lifetimes are the due-date stamp proving you still hold the book legally.",
    "keyPoints": [
      "Box<T> = single heap owner; also required for recursive types like linked lists and trait objects.",
      "Rc<T> counts owners; the value drops when the count hits zero. Single-threaded only - use Arc across threads.",
      "RefCell<T> moves borrow checking to runtime: it panics instead of failing to compile. That is the trade.",
      "Lifetime annotations never change how long a value lives - they describe an existing relationship to the compiler.",
      "Most lifetimes are elided; annotate when several references make the rule ambiguous (structs, multi-ref fns).",
      "static is the longest lifetime: string literals are &static str, valid for the whole program."
    ],
    "basicExamples": [
      {
        "title": "Box on the heap",
        "code": "fn main() {\n    let boxed: Box<i32> = Box::new(50);\n    println!(\"{}\", *boxed);\n    let items: Vec<Box<dyn std::fmt::Display>> =\n        vec![Box::new(1), Box::new(\"two\")];\n    println!(\"{} {}\", items[0], items[1]);\n}",
        "lineByLine": [
          {
            "line": "let boxed: Box<i32> = Box::new(50);",
            "explanation": "Moves 50 onto the heap; boxed is the only owner."
          },
          {
            "line": "println!(\"{}\", *boxed)",
            "explanation": "* dereferences to reach the value: 50."
          },
          {
            "line": "Vec<Box<dyn Display>>",
            "explanation": "Boxed trait objects allow mixed types in one Vec."
          }
        ]
      },
      {
        "title": "Rc shares ownership",
        "code": "use std::rc::Rc;\n\nfn main() {\n    let recipe = Rc::new(String::from(\"masala dosa\"));\n    let a = Rc::clone(&recipe);\n    let b = Rc::clone(&recipe);\n    println!(\"{} {} {}\", a, b, Rc::strong_count(&recipe));\n}",
        "lineByLine": [
          {
            "line": "let recipe = Rc::new(String::from(\"masala dosa\"));",
            "explanation": "One shared owner to begin with."
          },
          {
            "line": "let a = Rc::clone(&recipe);",
            "explanation": "Clones the handle, NOT the data - count becomes 2."
          },
          {
            "line": "Rc::strong_count(&recipe)",
            "explanation": "Prints 3: recipe plus two clones."
          }
        ]
      },
      {
        "title": "RefCell mutates a shared value",
        "code": "use std::cell::RefCell;\n\nfn main() {\n    let tally = RefCell::new(0);\n    *tally.borrow_mut() += 1;\n    println!(\"{}\", tally.borrow());\n}",
        "lineByLine": [
          {
            "line": "let tally = RefCell::new(0);",
            "explanation": "Shared reference, interior mutability enabled."
          },
          {
            "line": "*tally.borrow_mut() += 1;",
            "explanation": "Takes a mutable borrow at runtime."
          },
          {
            "line": "println!(\"{}\", tally.borrow())",
            "explanation": "Borrows immutably - fine because the mut borrow ended."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Lifetime annotation",
        "code": "fn longest<'a>(a: &'a str, b: &'a str) -> &'a str {\n    if a.len() >= b.len() { a } else { b }\n}\n\nfn main() {\n    println!(\"{}\", longest(\"namaste\", \"hello there\"));\n}",
        "lineByLine": [
          {
            "line": "fn longest<'a>(a: &'a str, b: &'a str) -> &'a str",
            "explanation": "'a ties all three references to one lifetime."
          },
          {
            "line": "if a.len() >= b.len() { a } else { b }",
            "explanation": "Returns one input, so output cannot outlive either."
          },
          {
            "line": "println!(...)",
            "explanation": "Prints hello there - the longer string."
          }
        ]
      },
      {
        "title": "Recursive type with Box",
        "code": "enum Menu {\n    Item(String),\n    Combo(Box<Menu>, Box<Menu>),\n}\n\nfn main() {\n    let meal = Menu::Combo(\n        Box::new(Menu::Item(\"dosa\".into())),\n        Box::new(Menu::Item(\"coffee\".into())),\n    );\n    if let Menu::Combo(a, _) = meal {\n        println!(\"combo starts with an item\");\n        let _ = a;\n    }\n}",
        "lineByLine": [
          {
            "line": "enum Menu { Item(String), Combo(...) }",
            "explanation": "A tree-like recursive shape."
          },
          {
            "line": "Box<Menu>",
            "explanation": "Breaks infinite size: one level is indirected."
          },
          {
            "line": "if let Menu::Combo(a, _) = meal",
            "explanation": "Destructures to inspect the first branch."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Rc<RefCell<T>> graph node",
        "code": "use std::rc::Rc;\nuse std::cell::RefCell;\n\n#[derive(Debug)]\nstruct Node {\n    value: i32,\n    children: RefCell<Vec<Rc<Node>>>,\n}\n\nfn main() {\n    let root = Rc::new(Node { value: 1, children: RefCell::new(vec![]) });\n    root.children.borrow_mut().push(Rc::new(Node { value: 2, children: RefCell::new(vec![]) }));\n    println!(\"{:?}\", root);\n}",
        "note": "Rc handles shared ownership of the tree, RefCell allows adding children through shared references - the classic parent-child graph pattern."
      },
      {
        "title": "Lifetime in a struct",
        "code": "struct Holder<'a> {\n    label: &'a str,\n}\n\nimpl<'a> Holder<'a> {\n    fn show(&self) -> String {\n        format!(\"label: {}\", self.label)\n    }\n}\n\nfn main() {\n    let text = String::from(\"batch 2026\");\n    let h = Holder { label: &text };\n    println!(\"{}\", h.show());\n}",
        "note": "A struct holding a reference must declare the lifetime so the compiler proves the struct never outlives the borrowed data."
      }
    ],
    "practice": [
      {
        "question": "Put a large Vec on the heap with Box and print its length.",
        "hint": "Box::new(vec![...]).",
        "answer": "let b = Box::new(vec![1, 2, 3]);\nprintln!(\"{}\", b.len());"
      },
      {
        "question": "Share a String across two variables with Rc; print the count.",
        "hint": "Rc::clone then strong_count.",
        "answer": "use std::rc::Rc;\nlet s = Rc::new(String::from(\"dosa\"));\nlet a = Rc::clone(&s);\nprintln!(\"{} {}\", a, Rc::strong_count(&s));"
      },
      {
        "question": "Why does borrow_mut() while borrow() is alive panic? Fix it.",
        "hint": "One mutable borrow at a time; scope the first.",
        "answer": "let c = std::cell::RefCell::new(5);\n{\n    let r = c.borrow();\n    println!(\"{}\", *r);\n}\n*c.borrow_mut() += 1; // safe now"
      },
      {
        "question": "Write fn first_word(s: &str) -> &str returning the first word.",
        "hint": "Return a slice; lifetime elided.",
        "answer": "fn first_word(s: &str) -> &str {\n    match s.find(char::is_whitespace) {\n        Some(i) => &s[..i],\n        None => s,\n    }\n}\nprintln!(\"{}\", first_word(\"masala dosa\"));"
      }
    ],
    "interview": [
      {
        "question": "Box vs Rc vs RefCell - one line each?",
        "answer": "Box: single heap owner, zero overhead. Rc: shared single-threaded ownership with a count. RefCell: mutation through shared refs, checked at runtime."
      },
      {
        "question": "What is interior mutability and when do you accept it?",
        "answer": "Mutation while appearing immutable, e.g. RefCell or Mutex. Accept it when sharing must go through a shared reference and the runtime check is a fair trade."
      },
      {
        "question": "Do lifetime annotations extend a value life?",
        "answer": "No. They only describe a relationship the compiler already enforces. They can never make a dangling reference valid."
      },
      {
        "question": "Why does a recursive enum need Box?",
        "answer": "A type containing itself directly has infinite size, so the compiler cannot allocate it. Box adds one pointer level, fixing the size while keeping the recursion."
      }
    ]
  },
  {
    "id": "rust-12",
    "title": "Advanced: iterators, closures & production mindset",
    "level": "Advanced",
    "definition": "Iterators are lazy, chainable pipelines (map, filter, fold) that do no work until consumed. Closures capture their environment. Combined with Rust tooling (clippy, fmt, doc tests), they are how real Rust code is written.",
    "analogy": "Like a food processing line in a modern factory: raw mangoes come in, a washer (map), a ripeness checker (filter) and a packing machine (fold) sit along the belt, and nothing moves until a customer order (consume) starts the line. Closures are the workers who remember the recipe board of their section.",
    "keyPoints": [
      "Iterators are lazy: nothing runs until a consumer like collect(), sum() or for_each() pulls items.",
      "map transforms, filter keeps matches, take/skip bound the count, and they chain without intermediate vectors.",
      "collect() needs a type hint when ambiguous: let v: Vec<i32> = iter.collect();",
      "fold(init, |acc, x| ...) reduces to one value; sum() and count() are shortcuts.",
      "Closures capture by reference by default; move forces ownership transfer into the closure.",
      "Use clippy for lint advice, rustfmt for formatting, and /// doc comments for doc tests."
    ],
    "basicExamples": [
      {
        "title": "Lazy chaining",
        "code": "fn main() {\n    let nums = vec![1, 2, 3, 4, 5];\n    let doubled: Vec<i32> = nums.iter().map(|x| x * 2).collect();\n    println!(\"{:?}\", doubled);\n}",
        "lineByLine": [
          {
            "line": "nums.iter().map(|x| x * 2)",
            "explanation": "Describes the work; runs nothing yet."
          },
          {
            "line": ".collect()",
            "explanation": "The consumer that finally runs the pipeline."
          },
          {
            "line": "println!(\"{:?}\", doubled);",
            "explanation": "Prints [2, 4, 6, 8, 10]."
          }
        ]
      },
      {
        "title": "filter and count",
        "code": "fn main() {\n    let marks = vec![35, 72, 88, 29, 91];\n    let passed = marks.iter().filter(|&&m| m >= 40).count();\n    println!(\"{}\", passed);\n}",
        "lineByLine": [
          {
            "line": "filter(|&&m| m >= 40)",
            "explanation": "&&m unwraps the &&i32 from iter() to compare."
          },
          {
            "line": ".count()",
            "explanation": "Consumes and counts matches."
          },
          {
            "line": "println!(\"{}\", passed);",
            "explanation": "Prints 3."
          }
        ]
      },
      {
        "title": "fold to sum",
        "code": "fn main() {\n    let nums = vec![10, 20, 30];\n    let total = nums.iter().fold(0, |acc, x| acc + x);\n    println!(\"{}\", total);\n}",
        "lineByLine": [
          {
            "line": "nums.iter().fold(0, |acc, x| acc + x)",
            "explanation": "acc starts at 0, absorbing each value."
          },
          {
            "line": "println!(\"{}\", total);",
            "explanation": "Prints 60."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Closure captures",
        "code": "fn main() {\n    let base = 100;\n    let add_base = |x: i32| x + base;\n    println!(\"{}\", add_base(5));\n    println!(\"{}\", base);\n}",
        "lineByLine": [
          {
            "line": "let add_base = |x: i32| x + base;",
            "explanation": "Captures base by reference automatically."
          },
          {
            "line": "add_base(5)",
            "explanation": "Evaluates to 105."
          },
          {
            "line": "println!(\"{}\", base);",
            "explanation": "base is still usable: the borrow ended with the call."
          }
        ]
      },
      {
        "title": "move into a thread",
        "code": "use std::thread;\n\nfn main() {\n    let name = String::from(\"Asha\");\n    let handle = thread::spawn(move || println!(\"Hello {}\", name));\n    handle.join().unwrap();\n}",
        "lineByLine": [
          {
            "line": "let name = String::from(\"Asha\");",
            "explanation": "Owned value to move."
          },
          {
            "line": "thread::spawn(move || ...)",
            "explanation": "move transfers ownership so the thread can outlive main scope."
          },
          {
            "line": "handle.join().unwrap();",
            "explanation": "Waits for the thread to finish."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Infinite iterator made safe",
        "code": "fn main() {\n    let squares: Vec<i32> = (1..)\n        .map(|x| x * x)\n        .take_while(|&x| x <= 50)\n        .collect();\n    println!(\"{:?}\", squares);\n}",
        "note": "(1..) is infinite yet safe: take_while stops the lazy chain, so only finite work happens."
      },
      {
        "title": "partition into two buckets",
        "code": "fn main() {\n    let marks = vec![35, 72, 88, 29];\n    let (passed, failed): (Vec<i32>, Vec<i32>) = marks.iter().partition(|&&m| m >= 40);\n    println!(\"{:?} {:?}\", passed, failed);\n}",
        "note": "partition splits one pass into two typed buckets - clearer than a manual loop with two pushes."
      }
    ],
    "practice": [
      {
        "question": "From 1..=10, keep evens, square them, collect a Vec.",
        "hint": "Chain filter then map then collect.",
        "answer": "let v: Vec<i32> = (1..=10).filter(|x| x % 2 == 0).map(|x| x * x).collect();\nprintln!(\"{:?}\", v);"
      },
      {
        "question": "Sum marks above the average using iterator methods.",
        "hint": "filter + sum.",
        "answer": "let m = vec![50, 70, 90];\nlet avg = m.iter().sum::<i32>() / m.len() as i32;\nlet s: i32 = m.iter().filter(|&&x| x > avg).sum();\nprintln!(\"{}\", s);"
      },
      {
        "question": "Write a closure that squares its input, then call it.",
        "hint": "let sq = |x| x * x;",
        "answer": "let sq = |x: i32| x * x;\nprintln!(\"{}\", sq(7)); // 49"
      },
      {
        "question": "Why does (1..).map(...) without take hang? Fix it.",
        "hint": "Infinite source needs a bound.",
        "answer": "let first: Vec<i32> = (1..).map(|x| x * 2).take(3).collect();\nprintln!(\"{:?}\", first); // [2, 4, 6]"
      }
    ],
    "interview": [
      {
        "question": "Why are Rust iterators zero-cost?",
        "answer": "Laziness plus monomorphisation lets the compiler fuse a chain into a single loop with no heap allocation, matching hand-written indexing speed."
      },
      {
        "question": "iter() vs iter_mut() vs into_iter()?",
        "answer": "iter borrows items; iter_mut borrows them mutably; into_iter consumes the collection and yields owned values. Pick by whether you need to keep or mutate the source."
      },
      {
        "question": "How do closures capture, and what does move change?",
        "answer": "By reference by default (least privilege that works: &, &mut, then by value). move forces capture by value, required when the closure must outlive the scope, e.g. threads."
      },
      {
        "question": "filter_map vs filter().map()?",
        "answer": "filter_map combines both in one pass and lets each step return None to drop an item - fewer passes and no Option plumbing compared to chaining."
      }
    ]
  }
];
