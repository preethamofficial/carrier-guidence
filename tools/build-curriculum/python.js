module.exports = [
  {
    "id": "python-1",
    "title": "Setup, running code & first program",
    "level": "Beginner",
    "definition": "Python is a high-level, interpreted programming language. You write human-readable code in a .py file and the Python interpreter runs it line by line, without a separate compile step.",
    "analogy": "Like a cooking show host who reads your recipe aloud and cooks each step immediately: write a line, Python does it at once. Installing Python is like setting up your kitchen before cooking.",
    "keyPoints": [
      "Install Python 3.10+ and check it with `python --version`; on some systems the command is `python3`.",
      "A .py file is plain text: write code in any editor, run it with `python file.py` from that folder.",
      "`print()` shows output on screen; `input()` pauses and reads what the user types (always as text).",
      "Indentation (4 spaces) defines blocks: everything lined up under `if` or `for` belongs to it — inconsistent spaces cause IndentationError.",
      "Create one virtual environment per project (`python -m venv .venv`) so libraries never clash between projects.",
      "Guard runnable code with `if __name__ == \"__main__\":` so the file can also be safely imported as a module."
    ],
    "basicExamples": [
      {
        "title": "Your first program",
        "code": "print(\"Namaste, CodeAtlas!\")\nprint(\"I am learning Python\")",
        "lineByLine": [
          {
            "line": "print(\"Namaste, CodeAtlas!\")",
            "explanation": "Prints the greeting text to the screen."
          },
          {
            "line": "print(\"I am learning Python\")",
            "explanation": "Runs next, printing the second line below the first."
          }
        ]
      },
      {
        "title": "Reading user input",
        "code": "name = input(\"Your name: \")\nprint(f\"Namaste, {name}!\")",
        "lineByLine": [
          {
            "line": "name = input(\"Your name: \")",
            "explanation": "Shows the prompt, waits for typing, and stores the typed text in name."
          },
          {
            "line": "print(f\"Namaste, {name}!\")",
            "explanation": "The f-string inserts the value of name into the greeting."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Comments and blank lines",
        "code": "# This line is a note for humans; Python skips it\ncity = \"Bengaluru\"  # store the city name\n\nprint(city)  # prints: Bengaluru",
        "lineByLine": [
          {
            "line": "# This line is a note for humans; Python skips it",
            "explanation": "A # starts a comment: Python ignores it, humans read it."
          },
          {
            "line": "city = \"Bengaluru\"  # store the city name",
            "explanation": "Stores the text in city; the trailing comment explains why."
          },
          {
            "line": "print(city)  # prints: Bengaluru",
            "explanation": "Shows the value so you can confirm the program state."
          }
        ]
      },
      {
        "title": "Script with a main guard",
        "code": "def main():\n    print(\"Learning started\")\n\nif __name__ == \"__main__\":\n    main()",
        "lineByLine": [
          {
            "line": "def main():",
            "explanation": "Defines a function holding the program steps."
          },
          {
            "line": "print(\"Learning started\")",
            "explanation": "Indented line: it belongs to main."
          },
          {
            "line": "if __name__ == \"__main__\":",
            "explanation": "True only when this file is run directly, not imported."
          },
          {
            "line": "main()",
            "explanation": "Calls the function so the message prints."
          }
        ]
      },
      {
        "title": "Naming rules and keywords",
        "code": "name = \"CodeAtlas\"\ncount = 1\n# 2name = 5   # ERROR: cannot start with a digit\n# class = 3  # ERROR: class is a keyword\nprint(name, count)",
        "lineByLine": [
          {
            "line": "name = \"CodeAtlas\"",
            "explanation": "Valid: starts with a letter, uses letters and digits."
          },
          {
            "line": "count = 1",
            "explanation": "Lowercase by convention for variables (PEP 8)."
          },
          {
            "line": "# 2name = 5",
            "explanation": "Illegal: identifiers cannot start with a digit."
          },
          {
            "line": "# class = 3",
            "explanation": "Illegal: class is a reserved keyword."
          },
          {
            "line": "print(name, count)",
            "explanation": "Prints the two valid names."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Command-line greeter with argparse",
        "code": "import argparse\n\ndef main() -> None:\n    parser = argparse.ArgumentParser(description=\"Greeter\")\n    parser.add_argument(\"city\", help=\"city to greet\")\n    parser.add_argument(\"--loud\", action=\"store_true\")\n    args = parser.parse_args()\n    msg = f\"Learning from {args.city}\"\n    print(msg.upper() if args.loud else msg)\n\nif __name__ == \"__main__\":\n    main()",
        "note": "Turns a script into a real CLI with validation and free --help output."
      },
      {
        "title": "Reading files relative to the script",
        "code": "from pathlib import Path\n\ndef read_notes() -> str:\n    here = Path(__file__).parent\n    return (here / \"notes.txt\").read_text(encoding=\"utf-8\")\n\nif __name__ == \"__main__\":\n    print(read_notes())",
        "note": "Relative paths resolve from where you run Python, so anchor them to the script folder with Path(__file__).parent."
      }
    ],
    "practice": [
      {
        "question": "Print your name, city, and favourite food on three lines.",
        "hint": "Three print() calls, one per line.",
        "answer": "print(\"Asha\")\nprint(\"Bengaluru\")\nprint(\"Masala dosa\")"
      },
      {
        "question": "Ask for a name and print \"Namaste, <name>!\".",
        "hint": "input() gives text; join it with an f-string.",
        "answer": "name = input(\"Name: \").strip() or \"friend\"\nprint(f\"Namaste, {name}!\")"
      },
      {
        "question": "Why does this fail: print(\"Total: \" + 5)? Fix it two ways.",
        "hint": "str + int is not allowed; convert or interpolate.",
        "answer": "print(\"Total: \" + str(5))\nprint(f\"Total: {5}\")"
      },
      {
        "question": "Make a file work both as import and script.",
        "hint": "Which dunder variable tells you how the file was started?",
        "answer": "def main():\n    print(\"running\")\n\nif __name__ == \"__main__\":\n    main()"
      }
    ],
    "interview": [
      {
        "question": "Interpreted vs compiled: how does Python run code?",
        "answer": "Python compiles source to bytecode (.pyc) automatically, then the interpreter (CPython VM) executes it — you never invoke a compiler manually, but syntax errors still stop the program before running."
      },
      {
        "question": "What does `if __name__ == \"__main__\":` do?",
        "answer": "When run directly, the file’s __name__ is \"__main__\"; when imported it is the module name. The guard lets one file be both a script and a reusable module."
      },
      {
        "question": "How do you isolate project dependencies?",
        "answer": "python -m venv .venv creates a private environment; activate it, then pip install so each project keeps its own library versions."
      },
      {
        "question": "Why does input() math surprise beginners?",
        "answer": "input() always returns a string, so \"5\" + \"5\" is \"55\". Convert first: int(input(...)) for numbers, and handle ValueError for bad input."
      }
    ]
  },
  {
    "id": "python-2",
    "title": "Variables, data types & operators",
    "level": "Beginner",
    "definition": "Variables are named boxes that store values. Python has built-in data types — int, float, str, bool, None — and operators (+, -, *, /, %, ==, and, or, not) to compute and compare them.",
    "analogy": "Like labelled dabbas in an Indian kitchen: sugar dabba holds sugar (string), rice dabba holds a quantity (number). Operators are the cooking actions — mix (add), compare (taste-test), combine (and/or).",
    "keyPoints": [
      "Use snake_case names (student_marks); names can hold any type and can be reassigned.",
      "int (5), float (5.5), str (\"Asha\"), bool (True/False), NoneType (None) are the core types; check with type(x).",
      "Arithmetic: + - * / (float division), // (floor), % (remainder), ** (power).",
      "Comparison (==, !=, <, >, <=, >=) returns True/False; combine with and, or, not.",
      "Convert explicitly: int(\"5\") -> 5, str(5) -> \"5\"; int(\"five\") raises ValueError.",
      "None means \"no value yet\" — check with `is None`, never `== None` in clean code."
    ],
    "basicExamples": [
      {
        "title": "Variables and types",
        "code": "name = \"Asha\"\nmarks = 92\naverage = 91.5\npassed = True\nprint(name, marks, average, passed)\nprint(type(marks))",
        "lineByLine": [
          {
            "line": "name = \"Asha\"",
            "explanation": "Stores text (str) in the variable name."
          },
          {
            "line": "marks = 92",
            "explanation": "Stores a whole number (int)."
          },
          {
            "line": "print(type(marks))",
            "explanation": "Confirms the type: <class ...int...>."
          }
        ]
      },
      {
        "title": "Operators in action",
        "code": "a = 10\nb = 3\nprint(a + b)\nprint(a // b)\nprint(a % b)\nprint(a > b and b > 0)",
        "lineByLine": [
          {
            "line": "a = 10",
            "explanation": "Two integer variables to compute with."
          },
          {
            "line": "print(a // b)",
            "explanation": "Floor division: 10 // 3 is 3."
          },
          {
            "line": "print(a % b)",
            "explanation": "Remainder: 10 % 3 is 1."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Type conversion for input math",
        "code": "age_text = input(\"Age: \")\nage = int(age_text)\nprint(f\"Next year: {age + 1}\")",
        "lineByLine": [
          {
            "line": "age_text = input(\"Age: \")",
            "explanation": "input() always returns a string like \"17\"."
          },
          {
            "line": "age = int(age_text)",
            "explanation": "Converts the text to an integer so maths works."
          },
          {
            "line": "print(f\"Next year: {age + 1}\")",
            "explanation": "Adds 1 numerically, then displays it."
          }
        ]
      },
      {
        "title": "Boolean logic for eligibility",
        "code": "age = 19\nhas_id = True\ncan_vote = age >= 18 and has_id\nprint(\"Can vote:\", can_vote)",
        "lineByLine": [
          {
            "line": "age = 19",
            "explanation": "Test data for the rule."
          },
          {
            "line": "can_vote = age >= 18 and has_id",
            "explanation": "Both conditions must be True for the result to be True."
          },
          {
            "line": "print(\"Can vote:\", can_vote)",
            "explanation": "Prints the decision."
          }
        ]
      },
      {
        "title": "Augmented and multiple assignment",
        "code": "marks = 50\nmarks += 10\nmarks *= 2\nprint(marks)\nx, y = 5, 9\nx, y = y, x\nprint(x, y)",
        "lineByLine": [
          {
            "line": "marks = 50",
            "explanation": "Start value."
          },
          {
            "line": "marks += 10",
            "explanation": "Same as marks = marks + 10 -> 60."
          },
          {
            "line": "marks *= 2",
            "explanation": "Now 120; these compound operators update in place."
          },
          {
            "line": "x, y = 5, 9",
            "explanation": "Multiple assignment unpacks a pair at once."
          },
          {
            "line": "x, y = y, x",
            "explanation": "Pythonic swap: no temp variable needed."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Safe conversion with fallback",
        "code": "def to_int(text, default=0):\n    try:\n        return int(str(text).strip())\n    except (ValueError, TypeError):\n        return default\n\nprint(to_int(\" 42 \"))   # 42\nprint(to_int(\"five\"))   # 0",
        "note": "Real user input is messy — wrap conversion so one bad value never crashes the program."
      },
      {
        "title": "Short-circuit defaults with or",
        "code": "nickname = \"\"\ndisplay = nickname or \"Guest\"\nprint(display)\n\nqty = 0\nbillable = qty or 1\nprint(billable)",
        "note": "or returns the first truthy value: handy for defaults, but beware 0 and \"\" count as falsy."
      }
    ],
    "practice": [
      {
        "question": "Swap two variables without a third one (show two ways).",
        "hint": "Tuple unpacking a, b = b, a is the Pythonic way.",
        "answer": "a, b = 5, 9\na, b = b, a\nprint(a, b)  # 9 5"
      },
      {
        "question": "Take two numbers as input and print sum, difference, product.",
        "hint": "Wrap input() with int() or float().",
        "answer": "a = float(input(\"A: \"))\nb = float(input(\"B: \"))\nprint(a + b, a - b, a * b)"
      },
      {
        "question": "Check if a number is even using %.",
        "hint": "Even numbers leave remainder 0 when divided by 2.",
        "answer": "n = int(input(\"N: \"))\nprint(n % 2 == 0)"
      },
      {
        "question": "Fix: age = input(\"Age: \"); print(age + 1).",
        "hint": "What type is age? Convert before adding.",
        "answer": "age = int(input(\"Age: \"))\nprint(age + 1)"
      }
    ],
    "interview": [
      {
        "question": "Dynamic typing: what is it and what can go wrong?",
        "answer": "Variables have no fixed type, so the same name can hold an int then a string. Flexible, but a surprise type causes TypeError at runtime — hence type hints and tests."
      },
      {
        "question": "== vs is — when does it matter?",
        "answer": "== compares values (\"a\" == \"a\" is True); is compares identity (same object). Use is only for None/singletons, never for numbers or strings."
      },
      {
        "question": "What is None and how do you test for it?",
        "answer": "None is the absence of a value. Test with `x is None` because `==` can be overloaded and behave unexpectedly."
      },
      {
        "question": "Why is 0.1 + 0.2 != 0.3 in Python?",
        "answer": "Floats are binary approximations, so 0.1 + 0.2 is 0.30000000000000004. Compare with round() or math.isclose(), or use Decimal for money."
      }
    ]
  },
  {
    "id": "python-3",
    "title": "Strings & text handling",
    "level": "Beginner",
    "definition": "Strings (str) hold text. They support indexing, slicing, methods (upper, strip, split, join), concatenation with +, and interpolation with f-strings: f\"Hello {name}\".",
    "analogy": "Like a garland of marigold flowers: each flower is a character at a position; slicing takes a section of the garland; split separates it into individual flowers; join re-threads them with new string.",
    "keyPoints": [
      "Create with single, double or triple quotes; triple quotes span multiple lines.",
      "Index from 0 (s[0] is first); negative index s[-1] is the last character; slice s[0:5] takes a range.",
      "f-strings embed expressions: f\"{price * 1.18:.2f}\" formats GST-inclusive price to 2 decimals.",
      "Key methods: upper/lower, strip (trim spaces), split (text->list), join (list->text), replace, startswith.",
      "Strings are immutable: methods return new strings; s.upper() never changes s itself.",
      "Convert carefully: int(\"42\") works, int(\"4.2\") fails (use float first); str(42) goes the other way."
    ],
    "basicExamples": [
      {
        "title": "Indexing and slicing",
        "code": "city = \"Bengaluru\"\nprint(city[0,\nex(\"Escapes and triple quotes\", \"bill = \"Item: dosa\\tRs.60\"\nprint(bill)\nnote = \"\"\"Line one\nLine two\"\"\"\nprint(note)\", [[\"bill = \"Item: dosa\\tRs.60\"\", \"\\t is a tab, \\n is a newline escape.\"], [\"print(bill)\", \"The tab spaces out the columns.\"], [\"note = \"\"\"Line one\", \"Triple quotes hold text across several lines.\"]])\n])\nprint(city[-1])\nprint(city[0:5])\nprint(len(city))",
        "lineByLine": [
          {
            "line": "city = \"Bengaluru\"",
            "explanation": "Test string to slice."
          },
          {
            "line": "print(city[0])",
            "explanation": "First character: B."
          },
          {
            "line": "print(city[-1])",
            "explanation": "Last character: u."
          },
          {
            "line": "print(city[0:5])",
            "explanation": "Characters 0-4: Benga."
          }
        ]
      },
      {
        "title": "f-strings",
        "code": "name = \"Asha\"\nmarks = 92\nprint(f\"{name} scored {marks}/100\")\nprint(f\"Next year she targets {marks + 3}\")",
        "lineByLine": [
          {
            "line": "name = \"Asha\"",
            "explanation": "Data for the message."
          },
          {
            "line": "print(f\"{name} scored {marks}/100\")",
            "explanation": "Placeholders are replaced by values."
          },
          {
            "line": "print(f\"Next year she targets {marks + 3}\")",
            "explanation": "Any expression works inside { }."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Cleaning user input",
        "code": "raw = \"  Bengaluru  \"\ncity = raw.strip().title()\nprint(f\"[{city}]\")\nprint(city.startswith(\"Ben\"))",
        "lineByLine": [
          {
            "line": "raw = \"  Bengaluru  \"",
            "explanation": "Typical messy typed input with spaces."
          },
          {
            "line": "city = raw.strip().title()",
            "explanation": "strip removes spaces; title capitalises each word."
          },
          {
            "line": "print(city.startswith(\"Ben\"))",
            "explanation": "Checks the prefix: True."
          }
        ]
      },
      {
        "title": "split and join",
        "code": "line = \"idli,sambar,vada\"\nitems = line.split(\",\")\nprint(items)\nprint(len(items))\nprint(\" | \".join(items))",
        "lineByLine": [
          {
            "line": "line = \"idli,sambar,vada\"",
            "explanation": "Comma-separated breakfast menu."
          },
          {
            "line": "items = line.split(\",\")",
            "explanation": "Splits into a list of 3 strings."
          },
          {
            "line": "print(\" | \".join(items))",
            "explanation": "Joins back with a new separator."
          }
        ]
      },
      {
        "title": "replace, find and count",
        "code": "msg = \"Namaste Bharat, Namaste Chennai\"\nprint(msg.count(\"Namaste\"))\nprint(msg.replace(\"Namaste\", \"Hello\"))\nprint(msg.find(\"Bharat\"))\nprint(\"Chennai\" in msg)",
        "lineByLine": [
          {
            "line": "msg.count(\"Namaste\")",
            "explanation": "Counts non-overlapping matches: 2."
          },
          {
            "line": "msg.replace(\"Namaste\", \"Hello\")",
            "explanation": "Returns a NEW string with replacements; msg itself is unchanged."
          },
          {
            "line": "msg.find(\"Bharat\")",
            "explanation": "Index of the first match, or -1 if missing."
          },
          {
            "line": "\"Chennai\" in msg",
            "explanation": "The in operator answers yes/no membership for free."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Parsing and validating a bill line",
        "code": "def parse_item(line: str) -> tuple[str, int, float]:\n    parts = [p.strip() for p in line.split(\",\")]\n    if len(parts) != 3:\n        raise ValueError(f\"expected 3 fields, got {len(parts)}: {line!r}\")\n    name, qty_text, price_text = parts\n    return name, int(qty_text), float(price_text)\n\nprint(parse_item(\"dosa, 2, 60.5\"))",
        "note": "split + strip + convert is the backbone of CSV parsing; validate field count before unpacking."
      },
      {
        "title": "Readable reports with format specs",
        "code": "items = [(\"dosa\", 2, 60.5), (\"idli\", 4, 30.0)]\nfor name, qty, price in items:\n    print(f\"{name:<8} x{qty:<3} Rs.{qty * price:>7.2f}\")",
        "note": "Width (<8), alignment and .2f turn raw numbers into shop-bill columns."
      }
    ],
    "practice": [
      {
        "question": "Take full name input; print first name, last name, initials.",
        "hint": "split() on spaces; index [0] and [-1].",
        "answer": "full = input(\"Full name: \").strip()\nparts = full.split()\nprint(parts[0], parts[-1], parts[0][0] + parts[-1][0])"
      },
      {
        "question": "Count vowels in a sentence (case-insensitive).",
        "hint": "Lower the text; loop and check membership in \"aeiou\".",
        "answer": "s = input(\"Sentence: \").lower()\nprint(sum(1 for ch in s if ch in \"aeiou\"))"
      },
      {
        "question": "Check if an email looks valid (one @, one dot after @).",
        "hint": "split(\"@\"), then check \".\" in the domain part.",
        "answer": "e = input(\"Email: \").strip()\nparts = e.split(\"@\")\nprint(len(parts) == 2 and \".\" in parts[1])"
      },
      {
        "question": "Format: item dosa, qty 2, price 60.5 -> \"dosa x2 = Rs.121.00\".",
        "hint": "f-string with .2f.",
        "answer": "print(f\"dosa x{2} = Rs.{2 * 60.5:.2f}\")"
      }
    ],
    "interview": [
      {
        "question": "Why are Python strings immutable, and what follows from it?",
        "answer": "Characters cannot change in place, so every method returns a new string. Enables safe sharing, hashing (dict keys), and thread safety; repeated += in loops is O(n^2) — build lists and join instead."
      },
      {
        "question": "f-string vs .format() vs % — which and when?",
        "answer": "f-strings for nearly everything (fastest, most readable); .format() for templates stored separately; % is legacy. f-strings support full expressions and format specs like {x:.2f}."
      },
      {
        "question": "Explain slicing s[a:b:c] precisely.",
        "answer": "From index a (inclusive) to b (exclusive), stepping by c. Defaults 0/len/1; negatives count from the end; s[::-1] reverses. Out-of-range slices clip silently instead of erroring."
      },
      {
        "question": "strip() vs lstrip() vs rstrip()?",
        "answer": "strip removes leading+trailing whitespace (or given chars); lstrip left only; rstrip right only. None touches the middle — use replace for that."
      }
    ]
  },
  {
    "id": "python-4",
    "title": "Conditions: if, elif, else & match",
    "level": "Beginner",
    "definition": "Conditions let programs choose: if runs a block when its test is True, elif tries the next test, else catches the rest. match (Python 3.10+) picks a branch by pattern, and the ternary fits a two-way choice in one line.",
    "analogy": "Like a traffic policeman at a busy signal: if an ambulance comes, clear the lane; elif a VIP convoy comes, hold traffic; else let everyone flow. match is the toll plaza — each vehicle type has its own exact lane.",
    "keyPoints": [
      "Only one branch runs: the first test that is True; else needs no test and catches everything left.",
      "Compare with ==, !=, <, >, <=, >=; combine with and, or, not; chain ranges like 18 <= age <= 60.",
      "Empty values are falsy (\"\", 0, [], None) — write `if name:` to mean \"if name is non-empty\".",
      "Ternary packs a choice: status = \"pass\" if marks >= 40 else \"fail\".",
      "match checks one value against patterns: case \"Mon\": ... with case _ as the default.",
      "Never write `== True`; write `if passed:` — and indent every branch with 4 spaces."
    ],
    "basicExamples": [
      {
        "title": "Grade with if elif else",
        "code": "marks = 72\nif marks >= 90:\n    grade = \"A\"\nelif marks >= 60:\n    grade = \"B\"\nelse:\n    grade = \"C\"\nprint(grade)",
        "lineByLine": [
          {
            "line": "marks = 72",
            "explanation": "Test score to classify."
          },
          {
            "line": "if marks >= 90:",
            "explanation": "72 fails this, so Python tries elif."
          },
          {
            "line": "elif marks >= 60:",
            "explanation": "72 passes: grade becomes B; else is skipped."
          },
          {
            "line": "print(grade)",
            "explanation": "Prints B."
          }
        ]
      },
      {
        "title": "Login check with and",
        "code": "user = \"asha\"\npassword = \"rose123\"\nif user == \"asha\" and password == \"rose123\":\n    print(\"Welcome!\")\nelse:\n    print(\"Try again\")",
        "lineByLine": [
          {
            "line": "user == \"asha\" and password == \"rose123\"",
            "explanation": "and needs BOTH sides True."
          },
          {
            "line": "print(\"Welcome!\")",
            "explanation": "Runs only when both match."
          },
          {
            "line": "else: print(\"Try again\")",
            "explanation": "Any mismatch lands here."
          }
        ]
      },
      {
        "title": "One-line ternary",
        "code": "marks = 35\nstatus = \"pass\" if marks >= 40 else \"fail\"\nprint(status)",
        "lineByLine": [
          {
            "line": "status = \"pass\" if marks >= 40 else \"fail\"",
            "explanation": "Condition sits in the middle: value-if-true first."
          },
          {
            "line": "print(status)",
            "explanation": "Prints fail for 35."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Truthy values directly",
        "code": "name = input(\"Name: \").strip()\nif name:\n    print(f\"Namaste, {name}!\")\nelse:\n    print(\"Namaste, guest!\")",
        "lineByLine": [
          {
            "line": "name = input(\"Name: \").strip()",
            "explanation": "Reads and trims spaces."
          },
          {
            "line": "if name:",
            "explanation": "Non-empty strings are truthy; \"\" is falsy."
          },
          {
            "line": "print(\"Namaste, guest!\")",
            "explanation": "Empty input falls through to else."
          }
        ]
      },
      {
        "title": "match for day types",
        "code": "day = \"Sun\"\nmatch day:\n    case \"Sat\" | \"Sun\":\n        print(\"Weekend\")\n    case \"Mon\":\n        print(\"Fresh start\")\n    case _:\n        print(\"Weekday\")",
        "lineByLine": [
          {
            "line": "match day:",
            "explanation": "match examines one value."
          },
          {
            "line": "case \"Sat\" | \"Sun\":",
            "explanation": "The | means either pattern matches."
          },
          {
            "line": "case _:",
            "explanation": "The _ wildcard is the default branch."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Guard clauses beat nesting",
        "code": "def entry_fee(age):\n    if age < 0:\n        raise ValueError(\"age cannot be negative\")\n    if age < 5:\n        return 0\n    if age >= 60:\n        return 50\n    return 100\n\nprint(entry_fee(65))",
        "note": "Return early for edge cases: flat code reads better than 4-level nested ifs."
      },
      {
        "title": "Discount calculator",
        "code": "bill = 1200\nmember = True\nif bill >= 1000 and member:\n    bill *= 0.85\nelif bill >= 1000:\n    bill *= 0.95\nprint(f\"Pay Rs.{bill:.2f}\")",
        "note": "Order matters: the stricter combined test comes first, else the general one swallows it."
      }
    ],
    "practice": [
      {
        "question": "Print minor / adult / senior for age brackets.",
        "hint": "if / elif / else chain on age.",
        "answer": "age = int(input(\"Age: \"))\nif age < 18:\n    print(\"minor\")\nelif age < 60:\n    print(\"adult\")\nelse:\n    print(\"senior\")"
      },
      {
        "question": "Accept login only if username non-empty AND password is 6+ chars.",
        "hint": "Combine truthiness with len() and and.",
        "answer": "u = input(\"User: \").strip()\np = input(\"Pass: \")\nprint(\"OK\" if u and len(p) >= 6 else \"Invalid\")"
      },
      {
        "question": "Map number 1-7 to a weekday with match; default invalid.",
        "hint": "Cases plus case _ fallback.",
        "answer": "d = int(input(\"Day: \"))\nmatch d:\n    case 1:\n        print(\"Mon\")\n    case 7:\n        print(\"Sun\")\n    case _:\n        print(\"invalid\")"
      },
      {
        "question": "Why does `if marks = 90:` crash? Fix it.",
        "hint": "= assigns; == compares.",
        "answer": "marks = 90\nif marks == 90:\n    print(\"topper\")"
      }
    ],
    "interview": [
      {
        "question": "What values are falsy in Python?",
        "answer": "None, False, 0, 0.0, \"\", [], (), {}, set() - everything else is truthy. That is why `if items:` safely means \"non-empty\"."
      },
      {
        "question": "if/elif/else vs match - when is match better?",
        "answer": "match shines when branching one value against many exact patterns (commands, statuses) with destructuring; if/elif wins for ranges and complex boolean logic."
      },
      {
        "question": "Explain short-circuiting in `a and b` / `a or b`.",
        "answer": "and stops at the first falsy value (returns it); or stops at the first truthy one. Used for guards and defaults - but beware falsy-but-valid 0 and \"\"."
      },
      {
        "question": "Why avoid deep nesting? Show the fix.",
        "answer": "Each level doubles mental paths. Invert conditions into guard clauses with early return/raise so the main logic stays flat and readable."
      }
    ]
  },
  {
    "id": "python-5",
    "title": "Loops: for, while & comprehensions",
    "level": "Intermediate",
    "definition": "Loops repeat work: for walks items directly, while repeats while a test holds, comprehensions build lists in one line. break exits, continue skips, else on a loop runs when no break happened.",
    "analogy": "Like a temple prasadam line: for serves each person in queue one by one; while keeps serving until the vessel empties; a comprehension is the pre-packed laddu box line - same sweet for everyone, packed in one motion.",
    "keyPoints": [
      "for x in items walks values directly - prefer it over index juggling whenever possible.",
      "range(n) gives 0..n-1; range(1, 6) gives 1..5; range(0, 10, 2) steps by 2.",
      "while needs progress toward its exit (counter/found flag) or it loops forever.",
      "break exits the loop; continue skips to the next round; loop-else runs only without break.",
      "List comprehensions: [x*x for x in nums if x > 0] filters and maps in one readable line.",
      "Iterate dicts with .items() for key+value; use enumerate() when you also need the index."
    ],
    "basicExamples": [
      {
        "title": "for over items",
        "code": "fruits = [\"mango\", \"banana\", \"grapes\"]\nfor f in fruits:\n    print(f)",
        "lineByLine": [
          {
            "line": "fruits = [\"mango\", \"banana\", \"grapes\"]",
            "explanation": "The queue of items to visit."
          },
          {
            "line": "for f in fruits:",
            "explanation": "f takes each value in turn."
          },
          {
            "line": "print(f)",
            "explanation": "Prints each fruit on its own line."
          }
        ]
      },
      {
        "title": "range counting",
        "code": "total = 0\nfor i in range(1, 6):\n    total += i\nprint(total)",
        "lineByLine": [
          {
            "line": "total = 0",
            "explanation": "Accumulator starts empty."
          },
          {
            "line": "for i in range(1, 6):",
            "explanation": "i runs 1,2,3,4,5 (6 excluded)."
          },
          {
            "line": "print(total)",
            "explanation": "Prints 15."
          }
        ]
      },
      {
        "title": "while countdown",
        "code": "n = 3\nwhile n > 0:\n    print(n)\n    n -= 1\nprint(\"Go!\")",
        "lineByLine": [
          {
            "line": "n = 3",
            "explanation": "Start value."
          },
          {
            "line": "while n > 0:",
            "explanation": "Repeats while the test holds."
          },
          {
            "line": "n -= 1",
            "explanation": "Moves toward the exit - without this, infinite loop."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "break and continue",
        "code": "for token in range(1, 11):\n    if token == 4:\n        continue\n    if token == 7:\n        break\n    print(token)",
        "lineByLine": [
          {
            "line": "if token == 4: continue",
            "explanation": "Skips printing 4, loop carries on."
          },
          {
            "line": "if token == 7: break",
            "explanation": "Stops the whole loop at 7."
          },
          {
            "line": "print(token)",
            "explanation": "Prints 1 2 3 5 6."
          }
        ]
      },
      {
        "title": "Comprehension",
        "code": "nums = [-2, 3, -5, 8]\nsquares = [x * x for x in nums if x > 0]\nprint(squares)",
        "lineByLine": [
          {
            "line": "[x * x for x in nums if x > 0]",
            "explanation": "Keep positives, square each - one line."
          },
          {
            "line": "print(squares)",
            "explanation": "Prints [9, 64]."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "enumerate and zip",
        "code": "cities = [\"Mumbai\", \"Pune\"]\ncodes = [\"BOM\", \"PNQ\"]\nfor i, (c, code) in enumerate(zip(cities, codes), start=1):\n    print(f\"{i}. {c} ({code})\")",
        "note": "enumerate adds the index, zip pairs two lists - the standard parallel-walk pattern."
      },
      {
        "title": "Search with loop-else",
        "code": "order = [101, 205, 307]\nwant = 205\nfor o in order:\n    if o == want:\n        print(\"found at\", order.index(o))\n        break\nelse:\n    print(\"not in order\")",
        "note": "loop-else runs only when no break fired - found vs missing without flag variables."
      }
    ],
    "practice": [
      {
        "question": "Print squares of 1..10 with a for loop.",
        "hint": "range(1, 11) and i*i.",
        "answer": "for i in range(1, 11):\n    print(i * i)"
      },
      {
        "question": "Sum input numbers until the user types done.",
        "hint": "while True with break on done.",
        "answer": "total = 0\nwhile True:\n    s = input(\"num (done to stop): \")\n    if s == \"done\":\n        break\n    total += float(s)\nprint(total)"
      },
      {
        "question": "Build [len(w) for w in words] skipping short words.",
        "hint": "Comprehension with if filter.",
        "answer": "words = [\"idli\", \"a\", \"dosa\"]\nprint([len(w) for w in words if len(w) > 2])"
      },
      {
        "question": "Why does a while loop run forever? Fix an example.",
        "hint": "Missing progress toward exit.",
        "answer": "n = 5\nwhile n > 0:\n    print(n)\n    n -= 1  # without this line it never ends"
      }
    ],
    "interview": [
      {
        "question": "for vs while - which when?",
        "answer": "for: known/iterable-driven rounds (lists, ranges). while: unknown rounds ending on a condition (retry until success, read until EOF). Mismatching them causes index bugs or infinite loops."
      },
      {
        "question": "How does loop-else work?",
        "answer": "else after for/while runs only if the loop finished WITHOUT break. Perfect for search-found vs search-missed logic without extra flags."
      },
      {
        "question": "Comprehension vs map/filter?",
        "answer": "Comprehensions are more readable for simple transforms and faster to write; map/filter win when reusing an existing named function. Avoid nested comprehensions past 2 levels."
      },
      {
        "question": "break vs continue vs pass?",
        "answer": "break exits the loop; continue jumps to the next round; pass does nothing (a placeholder keeping syntax valid). Mixing break/continue up inverts the logic."
      }
    ]
  },
  {
    "id": "python-6",
    "title": "Functions: def, arguments & return",
    "level": "Intermediate",
    "definition": "Functions package steps into reusable blocks: def names them, parameters receive input, return sends a result back. Default args, *args and **kwargs make functions flexible.",
    "analogy": "Like a tiffin caterer with a standard order form: you fill items (arguments), the kitchen cooks (body), and returns packed boxes (return value). Default items are the fixed menu; *args is the extra-addons list.",
    "keyPoints": [
      "def add(a, b): defines; add(4, 6) calls; return sends the result back and exits.",
      "Positional args match by order; keyword args (add(b=6, a=4)) match by name.",
      "Defaults fill gaps: def fee(age=10) uses 10 when omitted - defaults must come last.",
      "*args collects extra positionals into a tuple; **kwargs collects named extras into a dict.",
      "Variables assigned inside are local; use return to get values out - avoid globals.",
      "Docstrings (\"\"\"...\"\"\") document the function; type hints (def f(x: int) -> int) aid readers."
    ],
    "basicExamples": [
      {
        "title": "Define and call",
        "code": "def namaste(name):\n    return f\"Namaste, {name}!\"\nprint(namaste(\"Asha\"))",
        "lineByLine": [
          {
            "line": "def namaste(name):",
            "explanation": "name is the parameter placeholder."
          },
          {
            "line": "return f\"Namaste, {name}!\"",
            "explanation": "Builds and returns the greeting."
          },
          {
            "line": "print(namaste(\"Asha\"))",
            "explanation": "Calls with \"Asha\" and prints it."
          }
        ]
      },
      {
        "title": "Default argument",
        "code": "def ticket_price(age=10):\n    return 0 if age < 5 else 100\nprint(ticket_price())",
        "lineByLine": [
          {
            "line": "def ticket_price(age=10):",
            "explanation": "age defaults to 10 when omitted."
          },
          {
            "line": "return 0 if age < 5 else 100",
            "explanation": "Ternary picks the price."
          },
          {
            "line": "print(ticket_price())",
            "explanation": "Uses default: prints 100."
          }
        ]
      },
      {
        "title": "Multiple returns",
        "code": "def report(marks):\n    total = sum(marks)\n    return total, total / len(marks)\nt, avg = report([80, 90])\nprint(t, avg)",
        "lineByLine": [
          {
            "line": "return total, total / len(marks)",
            "explanation": "Returns a tuple of two values."
          },
          {
            "line": "t, avg = report([80, 90])",
            "explanation": "Unpacks both at once."
          },
          {
            "line": "print(t, avg)",
            "explanation": "Prints 170 85.0."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "*args totals",
        "code": "def total(*nums):\n    return sum(nums)\nprint(total(40, 60, 20))",
        "lineByLine": [
          {
            "line": "def total(*nums):",
            "explanation": "*args collects all positionals into a tuple."
          },
          {
            "line": "return sum(nums)",
            "explanation": "Sums whatever arrived."
          },
          {
            "line": "print(total(40, 60, 20))",
            "explanation": "Prints 120."
          }
        ]
      },
      {
        "title": "Local scope",
        "code": "city = \"Delhi\"\ndef visit():\n    city = \"Mumbai\"\n    return city\nprint(visit())\nprint(city)",
        "lineByLine": [
          {
            "line": "city = \"Mumbai\"",
            "explanation": "A NEW local variable, not the global."
          },
          {
            "line": "print(visit())",
            "explanation": "Prints Mumbai."
          },
          {
            "line": "print(city)",
            "explanation": "Global unchanged: Delhi."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "**kwargs order builder",
        "code": "def order(name, **items):\n    lines = [f\"{k} x{v}\" for k, v in items.items()]\n    return f\"{name}: \" + \", \".join(lines)\nprint(order(\"Asha\", dosa=2, idli=4))",
        "note": "**kwargs turns named extras into a dict - the flexible-order pattern."
      },
      {
        "title": "Function as argument",
        "code": "def apply_twice(fn, x):\n    return fn(fn(x))\nprint(apply_twice(lambda n: n + 5, 10))",
        "note": "Functions accept functions: apply_twice runs the lambda twice (10->15->20)."
      }
    ],
    "practice": [
      {
        "question": "Write area(r) returning 3.14*r*r; test r=7.",
        "hint": "def with return.",
        "answer": "def area(r):\n    return 3.14 * r * r\nprint(area(7))"
      },
      {
        "question": "bill(items) summing a list of prices.",
        "hint": "sum() inside.",
        "answer": "def bill(items):\n    return sum(items)\nprint(bill([60.5, 30.0]))"
      },
      {
        "question": "greet(name=\"guest\") printing Namaste, X!",
        "hint": "Default parameter.",
        "answer": "def greet(name=\"guest\"):\n    print(f\"Namaste, {name}!\")\ngreet()"
      },
      {
        "question": "Fix a function that prints instead of returning.",
        "hint": "Callers need return values for math.",
        "answer": "def add(a, b):\n    return a + b  # not print\nprint(add(2, 3) * 10)"
      }
    ],
    "interview": [
      {
        "question": "return vs print inside a function?",
        "answer": "return hands a value to the caller for further use; print only displays it. Logic functions should return; printing makes results untestable."
      },
      {
        "question": "*args vs **kwargs?",
        "answer": "*args collects extra positionals into a tuple; **kwargs collects named extras into a dict. Order: positional, default, *args, **kwargs."
      },
      {
        "question": "What is scope and why avoid globals?",
        "answer": "Names inside a function are local and vanish after return; globals are visible everywhere but create hidden coupling. Return values instead of mutating globals."
      },
      {
        "question": "Mutable default trap: def f(x=[])?",
        "answer": "The default list is created ONCE and shared across calls - appends accumulate. Fix with def f(x=None): x = x or []."
      }
    ]
  },
  {
    "id": "python-7",
    "title": "Collections: list, tuple, set & dict",
    "level": "Intermediate",
    "definition": "Collections store many values together. Lists are ordered and changeable, tuples are ordered and frozen, sets hold unique items with fast membership tests, and dicts map keys to values.",
    "analogy": "Like a Mumbai local train: a list is the general coach where people board, leave and shuffle; a tuple is the reserved-seat coach where nobody moves; a set is the ticket-checker list of unique valid tickets; a dict is the station board mapping platform numbers to train names.",
    "keyPoints": [
      "Lists grow with append/extend, shrink with pop/remove; indexes start at 0 and slices copy ranges.",
      "Tuples cannot change after creation - use them for fixed records like (x, y) coordinates.",
      "Sets remove duplicates automatically and test membership in O(1): if id in seen is instant.",
      "Dicts map keys to values: student[\"marks\"]; use .get() to avoid KeyError on missing keys.",
      "Copy carefully: b = a shares one list; b = a.copy() or list(a) makes an independent copy.",
      "Loop with enumerate() for index+value and zip() to walk two lists side by side."
    ],
    "basicExamples": [
      {
        "title": "Lists grow and shrink",
        "code": "dabba = [\"roti\", \"dal\"]\ndabba.append(\"sabzi\")\nprint(dabba)\ndabba.remove(\"dal\")\nprint(dabba)\nprint(len(dabba))",
        "lineByLine": [
          {
            "line": "dabba = [\"roti\", \"dal\"]",
            "explanation": "Start with a two-item list."
          },
          {
            "line": "dabba.append(\"sabzi\")",
            "explanation": "Adds sabzi at the end - lists grow freely."
          },
          {
            "line": "dabba.remove(\"dal\")",
            "explanation": "Removes dal by value; print shows the rest."
          }
        ]
      },
      {
        "title": "Tuple coordinates",
        "code": "point = (10, 20)\nprint(point[0])\nx, y = point\nprint(x + y)",
        "lineByLine": [
          {
            "line": "point = (10, 20)",
            "explanation": "Fixed pair - attempting point[0] = 1 would crash."
          },
          {
            "line": "x, y = point",
            "explanation": "Unpacking splits the tuple into two names."
          },
          {
            "line": "print(x + y)",
            "explanation": "Prints 30."
          }
        ]
      },
      {
        "title": "Dict lookups",
        "code": "marks = {\"asha\": 92, \"ravi\": 78}\nprint(marks[\"asha\"])\nprint(marks.get(\"kabir\", 0))\nmarks[\"ravi\"] = 80\nprint(marks)",
        "lineByLine": [
          {
            "line": "marks = {\"asha\": 92, ...}",
            "explanation": "Keys map names to scores."
          },
          {
            "line": "marks.get(\"kabir\", 0)",
            "explanation": ".get returns 0 instead of crashing on missing keys."
          },
          {
            "line": "marks[\"ravi\"] = 80",
            "explanation": "Updates the value for an existing key."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Sets kill duplicates",
        "code": "ids = [101, 205, 101, 307, 205]\nunique = sorted(set(ids))\nprint(unique)\nprint(205 in unique)",
        "lineByLine": [
          {
            "line": "set(ids)",
            "explanation": "set() drops the repeats."
          },
          {
            "line": "sorted(...)",
            "explanation": "Orders them: [101, 205, 307]."
          },
          {
            "line": "205 in unique",
            "explanation": "Membership test: True, done instantly."
          }
        ]
      },
      {
        "title": "enumerate and zip",
        "code": "cities = [\"Mumbai\", \"Pune\"]\ncodes = [\"BOM\", \"PNQ\"]\nfor i, (c, code) in enumerate(zip(cities, codes), start=1):\n    print(f\"{i}. {c} ({code})\")",
        "lineByLine": [
          {
            "line": "zip(cities, codes)",
            "explanation": "Pairs the lists."
          },
          {
            "line": "enumerate(..., start=1)",
            "explanation": "Adds 1-based numbering."
          },
          {
            "line": "print(f\"{i}. {c} ({code})\")",
            "explanation": "Prints numbered city-code pairs."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Counting with dict.get",
        "code": "votes = [\"dosa\", \"idli\", \"dosa\", \"vada\", \"dosa\"]\ncount = {}\nfor v in votes:\n    count[v] = count.get(v, 0) + 1\nprint(count)",
        "note": "get(v, 0) supplies the starting count so the first vote never crashes."
      },
      {
        "title": "Safe nested access",
        "code": "menu = {\"veg\": {\"meals\": 120}}\nprint(menu.get(\"veg\", {}).get(\"meals\", \"NA\"))\nprint(menu.get(\"chinese\", {}).get(\"meals\", \"NA\"))",
        "note": "Chained .get with {} defaults walks nested dicts without a single KeyError."
      }
    ],
    "practice": [
      {
        "question": "Store 5 marks in a list; print the average and the highest.",
        "hint": "sum()/len() and max().",
        "answer": "m = [78, 92, 65, 88, 71]\nprint(sum(m)/len(m), max(m))"
      },
      {
        "question": "Remove duplicates from [3, 1, 3, 2, 1] keeping sorted order.",
        "hint": "set then sorted.",
        "answer": "print(sorted(set([3, 1, 3, 2, 1])))"
      },
      {
        "question": "Count word frequency in \"idli dosa idli\".",
        "hint": "Split, then dict.get counting.",
        "answer": "w = \"idli dosa idli\".split()\nc = {}\nfor x in w:\n    c[x] = c.get(x, 0) + 1\nprint(c)"
      },
      {
        "question": "Why does b = a; b.append(1) also change a? Fix it.",
        "hint": "Same object shared; copy instead.",
        "answer": "a = [1, 2]\nb = a.copy()\nb.append(3)\nprint(a, b)"
      }
    ],
    "interview": [
      {
        "question": "List vs tuple vs set vs dict - one-line picks?",
        "answer": "List: ordered changeable sequence. Tuple: frozen record. Set: unique bag with instant membership. Dict: key-to-value lookup."
      },
      {
        "question": "Why is `x in my_set` faster than `x in my_list`?",
        "answer": "Sets hash values for O(1) lookup; lists scan each item O(n)."
      },
      {
        "question": "Shallow vs deep copy of nested lists?",
        "answer": "a.copy() copies only the outer list; inner lists still shared. copy.deepcopy() clones everything."
      },
      {
        "question": "When does .get() beat [key]?",
        "answer": "Whenever the key may be missing: .get returns a default instead of raising KeyError."
      }
    ]
  },
  {
    "id": "python-8",
    "title": "Errors, files & modules",
    "level": "Intermediate",
    "definition": "Errors (exceptions) interrupt programs when something goes wrong. try/except handles them gracefully; with open() reads and writes files safely; import reuses code from modules and packages.",
    "analogy": "Like a railway ticket counter: try asks for a ticket, except handles no-change and no-trains calmly instead of shouting. Files are ledger books you open, write, and close; modules are specialist counters (parcel, refund) you visit by name.",
    "keyPoints": [
      "try/except catches errors: except ValueError handles bad input while the program keeps running.",
      "Catch specific errors first, generic Exception last; empty except: hides bugs - never use it.",
      "finally always runs (closing counters); else runs only when no error happened.",
      "with open(\"bill.txt\") as f auto-closes the file even if errors strike mid-way.",
      "Read with read()/readlines(), write with \"w\" (overwrite) vs \"a\" (append); paths need the right folder.",
      "import math reuses tested code; from x import y picks one tool; pip installs third-party packages."
    ],
    "basicExamples": [
      {
        "title": "Safe number input",
        "code": "raw = input(\"Age: \")\ntry:\n    age = int(raw)\n    print(f\"Next year: {age + 1}\")\nexcept ValueError:\n    print(\"Please type digits only\")",
        "lineByLine": [
          {
            "line": "raw = input(\"Age: \")",
            "explanation": "Reads text - could be anything the user types."
          },
          {
            "line": "age = int(raw)",
            "explanation": "Crashes with ValueError if raw is not numeric."
          },
          {
            "line": "except ValueError:",
            "explanation": "Catches exactly that crash and guides the user."
          }
        ]
      },
      {
        "title": "Writing a file",
        "code": "with open(\"menu.txt\", \"w\") as f:\n    f.write(\"dosa 60\n\")\n    f.write(\"idli 30\n\")\nprint(\"saved\")",
        "lineByLine": [
          {
            "line": "with open(\"menu.txt\", \"w\") as f:",
            "explanation": "\"w\" creates/overwrites; with auto-closes afterwards."
          },
          {
            "line": "f.write(\"dosa 60\n\")",
            "explanation": "Writes one line including the newline character."
          },
          {
            "line": "print(\"saved\")",
            "explanation": "Confirms after the file is safely closed."
          }
        ]
      },
      {
        "title": "Using a module",
        "code": "import math\nprint(math.sqrt(144))\nprint(math.pi)\nfrom random import choice\nprint(choice([\"idli\", \"dosa\", \"vada\"]))",
        "lineByLine": [
          {
            "line": "import math",
            "explanation": "Loads the tested maths toolbox."
          },
          {
            "line": "print(math.sqrt(144))",
            "explanation": "Square root: 12.0."
          },
          {
            "line": "from random import choice",
            "explanation": "Picks one tool out of the random module."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Reading a file safely",
        "code": "try:\n    with open(\"menu.txt\") as f:\n        for line in f:\n            print(line.strip())\nexcept FileNotFoundError:\n    print(\"menu.txt not found - run the writer first\")",
        "lineByLine": [
          {
            "line": "with open(\"menu.txt\") as f:",
            "explanation": "Default mode \"r\" reads the file line by line."
          },
          {
            "line": "print(line.strip())",
            "explanation": "strip() removes the trailing newline for clean output."
          },
          {
            "line": "except FileNotFoundError:",
            "explanation": "Friendly message instead of a traceback."
          }
        ]
      },
      {
        "title": "else and finally",
        "code": "try:\n    n = int(\"42\")\nexcept ValueError:\n    print(\"bad\")\nelse:\n    print(f\"double is {n * 2}\")\nfinally:\n    print(\"counter closed\")",
        "lineByLine": [
          {
            "line": "n = int(\"42\")",
            "explanation": "Succeeds, so the except branch is skipped."
          },
          {
            "line": "else: print(f\"double is {n * 2}\")",
            "explanation": "else runs only on success: prints 84."
          },
          {
            "line": "finally: print(\"counter closed\")",
            "explanation": "finally runs in every case - success or failure."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "raise your own errors",
        "code": "def withdraw(balance, amount):\n    if amount <= 0:\n        raise ValueError(\"amount must be positive\")\n    if amount > balance:\n        raise ValueError(f\"only Rs.{balance} available\")\n    return balance - amount\n\nprint(withdraw(500, 200))",
        "note": "raise with a clear message turns silent wrong answers into loud, debuggable failures at the boundary."
      },
      {
        "title": "Mini logger module pattern",
        "code": "def log(msg, path=\"shop.log\"):\n    with open(path, \"a\") as f:\n        f.write(msg + \"\n\")\n\nlog(\"opened\")\nlog(\"sold dosa x2\")\nprint(open(\"shop.log\").read())",
        "note": "Append mode \"a\" keeps history across runs - the seed of real logging without any library."
      }
    ],
    "practice": [
      {
        "question": "Ask marks; on non-numeric input print retry (no crash).",
        "hint": "try int() / except ValueError.",
        "answer": "try:\n    m = int(input(\"Marks: \"))\n    print(\"ok\", m)\nexcept ValueError:\n    print(\"retry with digits\")"
      },
      {
        "question": "Save 3 friend names to friends.txt, then read them back.",
        "hint": "with open w, then with open r.",
        "answer": "with open(\"friends.txt\", \"w\") as f:\n    f.write(\"asha\nravi\nkabir\n\")\nprint(open(\"friends.txt\").read())"
      },
      {
        "question": "Open nosuch.txt with a friendly missing-file message.",
        "hint": "except FileNotFoundError.",
        "answer": "try:\n    open(\"nosuch.txt\").read()\nexcept FileNotFoundError:\n    print(\"file missing\")"
      },
      {
        "question": "Import datetime; print today date as DD-Mon-YYYY.",
        "hint": "date.today().strftime.",
        "answer": "from datetime import date\nprint(date.today().strftime(\"%d-%b-%Y\"))"
      }
    ],
    "interview": [
      {
        "question": "try/except/else/finally - each block role?",
        "answer": "try: risky code. except: named failures. else: success-only follow-up. finally: always-run cleanup (close/release)."
      },
      {
        "question": "Why is bare except: dangerous?",
        "answer": "It swallows KeyboardInterrupt, MemoryError and typos alike - bugs hide and Ctrl+C stops working. Always name the error."
      },
      {
        "question": "How does with open() beat f = open(); f.close()?",
        "answer": "with guarantees closing even on mid-block exceptions or returns; manual close is skipped when errors jump over it - leaking file handles."
      },
      {
        "question": "\"w\" vs \"a\" vs \"r\" - data-loss question?",
        "answer": "\"w\" truncates first (old content gone forever); \"a\" appends preserving history; \"r\" reads only. Interviewers probe: which mode for logs? (a). For fresh reports? (w)."
      }
    ]
  },
  {
    "id": "python-9",
    "title": "OOP: classes & objects",
    "level": "Advanced",
    "definition": "A class is a blueprint that bundles data (attributes) with the functions working on that data (methods). An object is one concrete thing built from the blueprint, holding its own values.",
    "analogy": "Like a railway ticket form: the blank form (class) defines the fields; each filled ticket (object) has its own name and seat. Methods are the actions a ticket supports - confirm, cancel, upgrade.",
    "keyPoints": [
      "class Student: defines the blueprint; __init__(self, name) runs at creation to store per-object data.",
      "self is the object itself: every method takes self first and reads or writes self.marks.",
      "Create instances with s = Student(\"Asha\", 92) - Python calls __init__ automatically.",
      "Methods add behaviour: def passed(self): return self.marks >= 40.",
      "__str__ controls print(s); without it you see a raw object address.",
      "Class attributes are shared by all objects; self.x attributes belong to one object only."
    ],
    "basicExamples": [
      {
        "title": "First class",
        "code": "class Student:\n    def __init__(self, name, marks):\n        self.name = name\n        self.marks = marks\n\ns = Student(\"Asha\", 92)\nprint(s.name, s.marks)",
        "lineByLine": [
          {
            "line": "class Student:",
            "explanation": "Blueprint definition starts."
          },
          {
            "line": "def __init__(self, name, marks):",
            "explanation": "Constructor: runs once per new object."
          },
          {
            "line": "s = Student(\"Asha\", 92)",
            "explanation": "Builds one object; values stored on self."
          }
        ]
      },
      {
        "title": "Method on objects",
        "code": "class Student:\n    def __init__(self, name, marks):\n        self.name = name\n        self.marks = marks\n    def passed(self):\n        return self.marks >= 40\n\ns = Student(\"Ravi\", 35)\nprint(s.passed())",
        "lineByLine": [
          {
            "line": "def passed(self):",
            "explanation": "Method reads the objects own marks."
          },
          {
            "line": "s = Student(\"Ravi\", 35)",
            "explanation": "Object with low marks."
          },
          {
            "line": "print(s.passed())",
            "explanation": "Prints False for 35."
          }
        ]
      },
      {
        "title": "Readable printing",
        "code": "class Student:\n    def __init__(self, name, marks):\n        self.name = name\n        self.marks = marks\n    def __str__(self):\n        return f\"{self.name}: {self.marks}\"\n\nprint(Student(\"Asha\", 92))",
        "lineByLine": [
          {
            "line": "def __str__(self):",
            "explanation": "Controls how print() shows the object."
          },
          {
            "line": "return f\"{self.name}: {self.marks}\"",
            "explanation": "Builds a friendly one-line summary."
          },
          {
            "line": "print(Student(\"Asha\", 92))",
            "explanation": "Prints Asha: 92."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Shared vs own data",
        "code": "class Batch:\n    school = \"KV No.2\"\n    def __init__(self, name):\n        self.name = name\n\na = Batch(\"Asha\")\nprint(a.school, a.name)",
        "lineByLine": [
          {
            "line": "school = \"KV No.2\"",
            "explanation": "Class attribute: one copy shared by all."
          },
          {
            "line": "self.name = name",
            "explanation": "Instance attribute: each object has its own."
          },
          {
            "line": "print(a.school, a.name)",
            "explanation": "Both readable through the object."
          }
        ]
      },
      {
        "title": "List of objects",
        "code": "class Item:\n    def __init__(self, name, price):\n        self.name = name\n        self.price = price\n\nmenu = [Item(\"dosa\", 60), Item(\"idli\", 30)]\nprint(sum(i.price for i in menu))",
        "lineByLine": [
          {
            "line": "menu = [Item(\"dosa\", 60), ...]",
            "explanation": "Objects live happily inside lists."
          },
          {
            "line": "sum(i.price for i in menu)",
            "explanation": "Reads each objects price attribute."
          },
          {
            "line": "print(...)",
            "explanation": "Prints 90."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Validated account",
        "code": "class Account:\n    def __init__(self, owner):\n        self.owner = owner\n        self.balance = 0\n    def deposit(self, amount):\n        if amount <= 0:\n            raise ValueError(\"amount must be positive\")\n        self.balance += amount\n\na = Account(\"Asha\")\na.deposit(500)\nprint(a.balance)",
        "note": "Methods guard the data: invalid deposits raise instead of corrupting balance."
      },
      {
        "title": "Alternate constructor",
        "code": "class Student:\n    def __init__(self, name, marks):\n        self.name = name\n        self.marks = marks\n    @classmethod\n    def from_line(cls, line):\n        name, marks = line.split(\",\")\n        return cls(name.strip(), int(marks))\n\nprint(Student.from_line(\"Asha, 92\").marks)",
        "note": "@classmethod builds objects another way - here from a CSV line - without touching __init__."
      }
    ],
    "practice": [
      {
        "question": "class Book with title, pages; method is_long() True when pages > 300.",
        "hint": "Store both in __init__; compare in method.",
        "answer": "class Book:\n    def __init__(self, title, pages):\n        self.title = title\n        self.pages = pages\n    def is_long(self):\n        return self.pages > 300\nprint(Book(\"Gitanjali\", 103).is_long())"
      },
      {
        "question": "Add __str__ to Book printing title (pages pages).",
        "hint": "Return an f-string.",
        "answer": "def __str__(self):\n        return f\"{self.title} ({self.pages} pages)\""
      },
      {
        "question": "class Circle with radius; area() returning 3.14*r*r.",
        "hint": "Method uses self.radius.",
        "answer": "class Circle:\n    def __init__(self, radius):\n        self.radius = radius\n    def area(self):\n        return 3.14 * self.radius ** 2\nprint(Circle(7).area())"
      },
      {
        "question": "Why does forgetting self in a method break calls?",
        "hint": "Python passes the object as first arg always.",
        "answer": "def passed(marks):  # missing self\n# s.passed() -> TypeError: takes 1 arg but 2 given (self + nothing)"
      }
    ],
    "interview": [
      {
        "question": "Class vs object vs instance?",
        "answer": "Class is the blueprint; object/instance is one built thing with its own data. Many instances share the class methods but hold different attribute values."
      },
      {
        "question": "What is self really?",
        "answer": "The instance the method was called on, passed automatically as the first argument. Forgetting it misaligns all parameters."
      },
      {
        "question": "__init__ vs __str__ vs __repr__?",
        "answer": "__init__ builds state at creation. __str__ is the friendly print for users. __repr__ is the precise rebuild-style string for developers; define __repr__ if only one."
      },
      {
        "question": "Class attribute vs instance attribute bug?",
        "answer": "Assigning via self.x always creates instance data. Mutating a shared mutable class attribute (like a list) from one instance leaks into all - keep shared data immutable or assign per instance."
      }
    ]
  },
  {
    "id": "python-10",
    "title": "Collection methods & comprehensions",
    "level": "Advanced",
    "definition": "Beyond basics: list methods (append, extend, sort), dict get/update/items, set ops, plus comprehensions [x for x in data if ok] that build collections in one readable line.",
    "analogy": "Like packing a tiffin efficiently: append adds one roti, extend empties a whole plate in, dict.get asks \"is sabzi there?\" without dropping the box, and a comprehension is packing all non-spicy items in one pass.",
    "keyPoints": [
      "append(x) adds one item; extend(list) adds many; insert(i,x) slots in middle; pop() removes and returns.",
      "dict.get(k, default) avoids KeyError; update() merges; items() loops key+value together.",
      "Comprehension: [m+5 for m in marks if m < 90] filters and transforms in one line.",
      "Set ops (| union, & intersect, - difference) answer \"common / only-here\" questions fast.",
      "sort() sorts in place; sorted(data) returns a new sorted copy; key=len sorts by length.",
      "Copy carefully: b = a[:] or list(a) for a real copy; b = a shares one list."
    ],
    "basicExamples": [
      {
        "title": "append vs extend",
        "code": "cart = [\"idli\"]\ncart.append(\"dosa\")\ncart.extend([\"vada\", \"poha\"])\nprint(cart)\nprint(len(cart))",
        "lineByLine": [
          {
            "line": "cart = [\"idli\"]",
            "explanation": "Start with one item."
          },
          {
            "line": "cart.append(\"dosa\")",
            "explanation": "Adds one single item."
          },
          {
            "line": "cart.extend([\"vada\", \"poha\"])",
            "explanation": "Adds each item separately: 4 total."
          }
        ]
      },
      {
        "title": "dict get with default",
        "code": "price = {\"idli\": 30, \"dosa\": 60}\nprint(price.get(\"vada\", 0))\nprint(price.get(\"dosa\", 0))\nprice[\"vada\"] = 40\nprint(price)",
        "lineByLine": [
          {
            "line": "price = {...}",
            "explanation": "Menu dict."
          },
          {
            "line": "price.get(\"vada\", 0)",
            "explanation": "Missing key returns 0 instead of crashing."
          },
          {
            "line": "price[\"vada\"] = 40",
            "explanation": "Adds the missing item."
          }
        ]
      },
      {
        "title": "First comprehension",
        "code": "marks = [22, 78, 91, 35]\npassed = [m for m in marks if m >= 40]\nprint(passed)\nprint(len(passed))",
        "lineByLine": [
          {
            "line": "marks = [...]",
            "explanation": "Raw scores."
          },
          {
            "line": "[m for m in marks if m >= 40]",
            "explanation": "Keeps only passing marks: [78, 91]."
          },
          {
            "line": "print(len(passed))",
            "explanation": "Counts them: 2."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Square and label",
        "code": "nums = [1, 2, 3, 4]\nsq = [n*n for n in nums]\nbig = [\"BIG\" if n > 10 else \"small\" for n in sq]\nprint(sq)\nprint(big)",
        "lineByLine": [
          {
            "line": "sq = [n*n for n in nums]",
            "explanation": "Transforms each: [1, 4, 9, 16]."
          },
          {
            "line": "[\"BIG\" if n > 10 else \"small\" for n in sq]",
            "explanation": "Labels each: only 16 is BIG."
          }
        ]
      },
      {
        "title": "Word frequency dict",
        "code": "words = [\"idli\", \"dosa\", \"idli\"]\ncount = {}\nfor w in words:\n    count[w] = count.get(w, 0) + 1\nprint(count)",
        "lineByLine": [
          {
            "line": "count = {}",
            "explanation": "Empty frequency table."
          },
          {
            "line": "count[w] = count.get(w, 0) + 1",
            "explanation": "First sight stores 1, repeats add up."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "dict comprehension flip",
        "code": "price = {\"idli\": 30, \"dosa\": 60}\nby_price = {v: k for k, v in price.items()}\nprint(by_price[60])",
        "note": "Swaps keys and values in one line: {30: idli, 60: dosa} - handy for reverse lookup."
      },
      {
        "title": "Flatten with nested comprehension",
        "code": "matrix = [[1, 2], [3, 4]]\nflat = [x for row in matrix for x in row]\nprint(flat)\nprint(sum(flat))",
        "note": "Two fors in one line flatten rows: [1,2,3,4] - read it as nested loops left to right."
      }
    ],
    "practice": [
      {
        "question": "Double only even numbers from [1..8] with one comprehension.",
        "hint": "Condition at the end.",
        "answer": "[n*2 for n in range(1, 9) if n % 2 == 0]  # [4, 8, 12, 16]"
      },
      {
        "question": "Count letters in \"masala dosa\" ignoring the space.",
        "hint": "Dict get pattern per char.",
        "answer": "s = \"masala dosa\"\nc = {}\nfor ch in s:\n    if ch != \" \":\n        c[ch] = c.get(ch, 0) + 1\nprint(c)"
      },
      {
        "question": "Merge price dicts; second wins.",
        "hint": "update() or {**a, **b}.",
        "answer": "a = {\"idli\": 30}\nb = {\"dosa\": 60}\nprint({**a, **b})"
      },
      {
        "question": "Fix: squares = [i*2 for i in range(5)] gives doubles not squares.",
        "hint": "Multiply i by itself.",
        "answer": "squares = [i*i for i in range(5)]  # [0, 1, 4, 9, 16]"
      }
    ],
    "interview": [
      {
        "question": "List comprehension vs map/filter?",
        "answer": "Comprehensions are more readable and Pythonic for simple transforms; map/filter win when reusing an existing function. Nested comprehension beats nested map calls."
      },
      {
        "question": "Why does b = a then b.append surprise?",
        "answer": "Both names point at one list object - mutating through either shows everywhere. Copy with a[:] or list(a) for independence."
      },
      {
        "question": "dict.get vs [key] vs setdefault?",
        "answer": "[key] throws KeyError when missing. get returns a default. setdefault returns existing or inserts default - perfect for grouping in one pass."
      },
      {
        "question": "When are sets the right tool?",
        "answer": "Membership tests, dedup, and common/only comparisons - O(1) average lookup vs O(n) list scan, plus union/intersect/difference operators."
      }
    ]
  },
  {
    "id": "python-11",
    "title": "Iterators, generators & async basics",
    "level": "Advanced",
    "definition": "Iterators produce values one at a time with next(); generators (yield) create lazy sequences; async/await (asyncio) runs I/O tasks concurrently without threads.",
    "analogy": "Like a dosa counter: an iterator serves one dosa per token (next()); a generator is the cook making each dosa only when ordered (lazy, no pile-up); async is one waiter taking many tables orders while the kitchen works - nobody blocks.",
    "keyPoints": [
      "iter() + next() walk manually; StopIteration ends the stream - for loops hide this.",
      "Generator: def gen(): yield x pauses and resumes - memory-flat for lakh-item streams.",
      "Generator expressions (x*x for x in data) are lazy; list(...) forces the whole result.",
      "async def + await pauses on I/O; asyncio.run(main()) drives the event loop.",
      "gather() runs many awaits together; total time is the slowest, not the sum.",
      "Generators are single-pass: once consumed they are empty - re-create to re-read."
    ],
    "basicExamples": [
      {
        "title": "Manual iteration",
        "code": "nums = [10, 20]\nit = iter(nums)\nprint(next(it))\nprint(next(it))",
        "lineByLine": [
          {
            "line": "it = iter(nums)",
            "explanation": "Iterator object over the list."
          },
          {
            "line": "print(next(it))",
            "explanation": "First call: 10."
          },
          {
            "line": "print(next(it))",
            "explanation": "Second call: 20; a third would raise StopIteration."
          }
        ]
      },
      {
        "title": "First generator",
        "code": "def counts(n):\n    for i in range(1, n + 1):\n        yield i\n\nfor c in counts(3):\n    print(c)",
        "lineByLine": [
          {
            "line": "def counts(n):",
            "explanation": "yield inside makes this a generator factory."
          },
          {
            "line": "yield i",
            "explanation": "Pauses, hands i out, resumes on next request."
          },
          {
            "line": "for c in counts(3):",
            "explanation": "Prints 1 2 3 lazily."
          }
        ]
      },
      {
        "title": "First async",
        "code": "import asyncio\n\nasync def hello():\n    await asyncio.sleep(0.1)\n    return \"namaste\"\n\nprint(asyncio.run(hello()))",
        "lineByLine": [
          {
            "line": "async def hello():",
            "explanation": "Coroutine: pauses at await instead of blocking."
          },
          {
            "line": "await asyncio.sleep(0.1)",
            "explanation": "Yields control during the wait."
          },
          {
            "line": "asyncio.run(hello())",
            "explanation": "Runs the loop; prints namaste."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Lazy squares",
        "code": "sq = (x * x for x in range(1, 1000000))\nprint(next(sq))\nprint(next(sq))",
        "lineByLine": [
          {
            "line": "sq = (x*x for x in ...)",
            "explanation": "Generator expression: computes nothing yet."
          },
          {
            "line": "print(next(sq))",
            "explanation": "First square: 1."
          },
          {
            "line": "print(next(sq))",
            "explanation": "Second: 4 - a million items cost almost no memory."
          }
        ]
      },
      {
        "title": "gather concurrency",
        "code": "import asyncio\n\nasync def serve(item):\n    await asyncio.sleep(0.1)\n    return item\n\nasync def main():\n    print(await asyncio.gather(serve(\"idli\"), serve(\"dosa\")))\n\nasyncio.run(main())",
        "lineByLine": [
          {
            "line": "async def serve(item):",
            "explanation": "One simulated order taking 0.1s."
          },
          {
            "line": "await asyncio.gather(...)",
            "explanation": "Both orders overlap: ~0.1s total, not 0.2s."
          },
          {
            "line": "asyncio.run(main())",
            "explanation": "Drives both to completion."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Pipeline of generators",
        "code": "def nums(n):\n    for i in range(n):\n        yield i\n\ndef evens(stream):\n    for x in stream:\n        if x % 2 == 0:\n            yield x\n\nprint(list(evens(nums(10))))",
        "note": "Chained generators filter/transform streams stage by stage - each item flows through without storing the whole list."
      },
      {
        "title": "Async with timeout guard",
        "code": "import asyncio\n\nasync def slow():\n    await asyncio.sleep(5)\n    return \"late\"\n\nasync def main():\n    try:\n        print(await asyncio.wait_for(slow(), timeout=0.2))\n    except asyncio.TimeoutError:\n        print(\"too slow, moved on\")\n\nasyncio.run(main())",
        "note": "wait_for caps a coroutine: slow I/O becomes a caught TimeoutError instead of a hung program."
      }
    ],
    "practice": [
      {
        "question": "Write a generator giving squares 1..5; print list() of it.",
        "hint": "yield i*i in a loop.",
        "answer": "def sq():\n    for i in range(1, 6):\n        yield i * i\nprint(list(sq()))"
      },
      {
        "question": "Show a generator is single-pass: consume twice.",
        "hint": "Second list() is [].",
        "answer": "g = (x for x in [1, 2])\nprint(list(g))\nprint(list(g))  # [] - exhausted"
      },
      {
        "question": "Async: fetch two fake orders with gather.",
        "hint": "Two coroutines, one gather.",
        "answer": "import asyncio\nasync def o(x):\n    await asyncio.sleep(0.05)\n    return x\nasync def m():\n    print(await asyncio.gather(o(\"a\"), o(\"b\")))\nasyncio.run(m())"
      },
      {
        "question": "Fix: for+sleep taking 3s for 3 orders - make it ~1s.",
        "hint": "gather overlaps the waits.",
        "answer": "# sequential: await one by one (3s)\n# fixed: await asyncio.gather(*[serve(i) for i in orders]) (~1s)"
      }
    ],
    "interview": [
      {
        "question": "Iterator vs iterable?",
        "answer": "Iterable has __iter__ (makes iterators: lists, files). Iterator has __next__ and state (it itself). for calls iter() then next() until StopIteration."
      },
      {
        "question": "How does yield save memory?",
        "answer": "The generator pauses per item - only one value exists at a time. A list of 10 lakh rows eats RAM; a generator streams them flat."
      },
      {
        "question": "async/await vs threads?",
        "answer": "Async: one thread, cooperative pauses at await - cheap for I/O-bound (10k connections). Threads: OS-managed, better for CPU work but heavier; GIL limits Python thread parallelism."
      },
      {
        "question": "Why is a generator exhausted after one pass?",
        "answer": "It holds a position pointer, not the data. Consuming advances to the end; there is no rewind - call the factory again for a fresh stream."
      }
    ]
  },
  {
    "id": "python-12",
    "title": "Testing, debugging & virtual environments",
    "level": "Advanced",
    "definition": "Virtual environments (venv) isolate each projects packages; pip installs libraries; pytest or assert checks prove code works; tracebacks and print/debugger inspection fix what fails.",
    "analogy": "Like a tiffin trial kitchen: venv is a separate counter so masala tests never spoil the main order; pip fetches ingredients; taste-tests (asserts) catch salt errors before delivery; the traceback is the complaint slip pointing at the exact counter.",
    "keyPoints": [
      "python -m venv .venv then source .venv/bin/activate (or .venv Scripts activate on Windows) isolates packages.",
      "pip install requests installs into the active env; pip freeze > requirements.txt records exact versions.",
      "assert add(2, 3) == 5 stops loudly on failure - the simplest possible test.",
      "pytest runs test_*.py files; one failing test names the exact function and values.",
      "Read tracebacks bottom-up: last line is the error, above lines are the call path.",
      "Catch specific errors (ValueError) never bare except; log or re-raise what you cannot handle."
    ],
    "basicExamples": [
      {
        "title": "venv and pip flow",
        "code": "python -m venv .venv\nsource .venv/bin/activate\npip install requests\npip freeze > requirements.txt",
        "lineByLine": [
          {
            "line": "python -m venv .venv",
            "explanation": "Creates an isolated package folder for this project."
          },
          {
            "line": "source .venv/bin/activate",
            "explanation": "Switches the shell to use it (prompt shows .venv)."
          },
          {
            "line": "pip freeze > requirements.txt",
            "explanation": "Records versions so teammates install identically."
          }
        ]
      },
      {
        "title": "assert smoke test",
        "code": "def total(bill, gst=0.18):\n    return bill * (1 + gst)\n\nassert total(100) == 118.0\nassert total(200, 0) == 200\nprint(\"all ok\")",
        "lineByLine": [
          {
            "line": "def total(bill, gst=0.18):",
            "explanation": "Bill plus GST, default 18 percent."
          },
          {
            "line": "assert total(100) == 118.0",
            "explanation": "Fails loudly if the math ever breaks."
          },
          {
            "line": "print(\"all ok\")",
            "explanation": "Reached only when every assert passed."
          }
        ]
      },
      {
        "title": "Reading a traceback",
        "code": "def avg(marks):\n    return sum(marks) / len(marks)\n\nprint(avg([]))",
        "lineByLine": [
          {
            "line": "def avg(marks):",
            "explanation": "Average helper."
          },
          {
            "line": "print(avg([]))",
            "explanation": "len([]) is 0 so this raises ZeroDivisionError."
          },
          {
            "line": "Last traceback line names ZeroDivisionError - add a guard: if not marks: return 0.0.",
            "explanation": "undefined"
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "pytest test file",
        "code": "from shop import total\n\ndef test_gst():\n    assert total(100) == 118.0\n\ndef test_no_gst():\n    assert total(200, 0) == 200",
        "lineByLine": [
          {
            "line": "from shop import total",
            "explanation": "Imports the function under test."
          },
          {
            "line": "def test_gst():",
            "explanation": "pytest discovers every test_ prefixed function."
          },
          {
            "line": "assert total(100) == 118.0",
            "explanation": "Run with: pytest -q; failures show expected vs got."
          }
        ]
      },
      {
        "title": "try specific errors",
        "code": "def age(text):\n    try:\n        n = int(text)\n    except ValueError:\n        return \"not a number\"\n    return f\"next year {n + 1}\"\n\nprint(age(\"five\"))",
        "lineByLine": [
          {
            "line": "n = int(text)",
            "explanation": "Risky conversion inside try."
          },
          {
            "line": "except ValueError:",
            "explanation": "Catches only bad-number errors, nothing else."
          },
          {
            "line": "print(age(\"five\"))",
            "explanation": "Prints: not a number - no crash."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Debugging with breakpoints",
        "code": "def bill(items):\n    total = 0\n    breakpoint()\n    for price in items:\n        total += price\n    return total\n\nprint(bill([60, 30]))",
        "note": "breakpoint() pauses live code: inspect total, step with n, continue with c - faster than print archaeology."
      },
      {
        "title": "requirements discipline",
        "code": "requests==2.31.0\npytest==8.2.0",
        "note": "Pinned versions in requirements.txt make installs reproducible: unpinned installs drift and break CI mysteriously."
      }
    ],
    "practice": [
      {
        "question": "Create a venv and install pytest in it (3 commands).",
        "hint": "venv, activate, pip install.",
        "answer": "python -m venv .venv\nsource .venv/bin/activate\npip install pytest"
      },
      {
        "question": "Write asserts for a discount(bill) giving 10 percent off above 500.",
        "hint": "Two asserts: above and below.",
        "answer": "assert discount(600) == 540\nassert discount(400) == 400"
      },
      {
        "question": "Fix avg([]) crashing with ZeroDivisionError.",
        "hint": "Guard empty input.",
        "answer": "def avg(m):\n    return sum(m)/len(m) if m else 0.0"
      },
      {
        "question": "pytest shows FAILED test_gst - assert 118.0 == 117.99: likely cause?",
        "hint": "Float rounding in the function.",
        "answer": "Round inside total: round(bill * (1 + gst), 2)"
      }
    ],
    "interview": [
      {
        "question": "Why venv per project?",
        "answer": "Global installs collide: project A needs requests 2.x, B needs 3.x. A venv gives each project its own isolated package set."
      },
      {
        "question": "assert vs pytest?",
        "answer": "assert is a quick inline sanity check (also stripped with python -O). pytest gives discovery, rich failure diffs, fixtures and parametrize for real suites."
      },
      {
        "question": "How do you read a traceback?",
        "answer": "Bottom line first: error type + message. Then walk up the call stack to your file and line - the top frames are usually library internals."
      },
      {
        "question": "Why is bare except harmful?",
        "answer": "It swallows KeyboardInterrupt, SystemExit and real bugs, hiding failures. Catch the specific error you can handle; let the rest surface."
      }
    ]
  }
];
