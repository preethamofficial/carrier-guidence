module.exports = [
  {
    "id": "java-1",
    "title": "JDK setup & your first program",
    "level": "Beginner",
    "definition": "Java is a compiled, statically-typed, object-oriented language. You write .java files, javac compiles them to bytecode (.class), and the JVM (Java Virtual Machine) runs that bytecode anywhere.",
    "analogy": "Like writing an exam answer sheet that any examiner in India can grade: javac converts your writing to a standard answer key (bytecode), and every JVM reads that key identically.",
    "keyPoints": [
      "Install a JDK (17+ LTS recommended); verify with `java -version` and `javac -version`.",
      "Every program lives in a class; execution starts at `public static void main(String[] args)`.",
      "Compile: `javac Main.java`; run: `java Main` (no .class extension when running).",
      "Java is statically typed: `int age = 19;` — the type is fixed at declaration.",
      "Statements end with semicolons; { } braces define class and method blocks.",
      "File name must match the public class name (Main class goes in Main.java)."
    ],
    "basicExamples": [
      {
        "title": "Your first program",
        "code": "public class Main {\n    public static void main(String[,\nex(\"Comments and output\", \"public class Main {\n    public static void main(String[] args) {\n        // A comment for readers; the compiler ignores it\n        System.out.println(\"Namaste, CodeAtlas!\");\n        System.out.println(1 + 2);\n    }\n}\", [[\"// A comment for readers...\", \"Comments start with // and never run.\"], [\"System.out.println(\"Namaste, CodeAtlas!\");\", \"Prints the text, then a newline.\"], [\"System.out.println(1 + 2);\", \"Adds first, then prints 3.\"]])\n] args) {\n        System.out.println(\"Namaste, CodeAtlas!\");\n        System.out.println(\"I am learning Java\");\n    }\n}",
        "lineByLine": [
          {
            "line": "public class Main {",
            "explanation": "Everything lives inside a class named Main (file Main.java)."
          },
          {
            "line": "public static void main(String[] args) {",
            "explanation": "The entry point: the JVM starts here."
          },
          {
            "line": "System.out.println(\"Namaste, CodeAtlas!\");",
            "explanation": "Prints the greeting line to the console."
          }
        ]
      },
      {
        "title": "Variables and types",
        "code": "public class Main {\n    public static void main(String[] args) {\n        String name = \"Asha\";\n        int marks = 92;\n        double average = 91.5;\n        boolean passed = true;\n        System.out.println(name + \" \" + marks + \" \" + average + \" \" + passed);\n    }\n}",
        "lineByLine": [
          {
            "line": "String name = \"Asha\";",
            "explanation": "Text uses capital-S String type."
          },
          {
            "line": "int marks = 92;",
            "explanation": "Whole numbers use int; decimals use double."
          },
          {
            "line": "System.out.println(name + \" \" + marks ...);",
            "explanation": "+ joins values into one printed line."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Comments and structure",
        "code": "public class Main {\n    // Program entry: execution starts here\n    public static void main(String[] args) {\n        int year = 2026; // store the year\n        System.out.println(year); // prints 2026\n    }\n}",
        "lineByLine": [
          {
            "line": "// Program entry: execution starts here",
            "explanation": "// comments one line; /* */ spans many."
          },
          {
            "line": "int year = 2026;",
            "explanation": "Declares a fixed-type integer variable."
          },
          {
            "line": "System.out.println(year);",
            "explanation": "Outputs the value to verify state."
          }
        ]
      },
      {
        "title": "Reading input with Scanner",
        "code": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print(\"Your name: \");\n        String name = sc.nextLine();\n        System.out.println(\"Namaste, \" + name + \"!\");\n        sc.close();\n    }\n}",
        "lineByLine": [
          {
            "line": "import java.util.Scanner;",
            "explanation": "Brings in the Scanner helper for keyboard input."
          },
          {
            "line": "String name = sc.nextLine();",
            "explanation": "Waits for Enter and stores the whole line."
          },
          {
            "line": "sc.close();",
            "explanation": "Releases the input resource when done."
          }
        ]
      },
      {
        "title": "Concatenation vs printf formatting",
        "code": "int marks = 92;\nSystem.out.println(\"Marks: \" + marks + \"/100\");\nSystem.out.printf(\"Average: %.2f%n\", 88.567);\nSystem.out.printf(\"%-5s|%3d%n\", \"Asha\", 92);",
        "lineByLine": [
          {
            "line": "\"Marks: \" + marks",
            "explanation": "The + operator joins text and numbers into one string."
          },
          {
            "line": "System.out.printf(\"Average: %.2f%n\", 88.567)",
            "explanation": "%.2f rounds to 2 decimals -> 88.57; %n is a portable newline."
          },
          {
            "line": "%-5s|%3d",
            "explanation": "Left-pad the name to 5, right-align the number to 3 - a clean column."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Command-line arguments",
        "code": "public class Main {\n    public static void main(String[] args) {\n        if (args.length == 0) {\n            System.out.println(\"Usage: java Main <city>\");\n            return;\n        }\n        System.out.println(\"Learning from \" + args[0]);\n    }\n}",
        "note": "The JVM passes terminal words into args[] — validate length before using them."
      },
      {
        "title": "JShell quick experiments",
        "code": "$ jshell\njshell> int x = 5 + 3\nx ==> 8\njshell> System.out.println(x * 2)\n16",
        "note": "JShell is Java’s REPL: test snippets instantly without creating a file."
      }
    ],
    "practice": [
      {
        "question": "Print name, city, favourite food on three lines.",
        "hint": "Three System.out.println calls inside main.",
        "answer": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Asha\");\n        System.out.println(\"Bengaluru\");\n        System.out.println(\"Masala dosa\");\n    }\n}"
      },
      {
        "question": "Store birthYear (int) and print age in 2026.",
        "hint": "Subtract birthYear from 2026.",
        "answer": "int birthYear = 2005;\nSystem.out.println(2026 - birthYear);"
      },
      {
        "question": "Read an int age with Scanner and print age + 1.",
        "hint": "Use nextInt(); beware the leftover newline.",
        "answer": "Scanner sc = new Scanner(System.in);\nint age = sc.nextInt();\nSystem.out.println(age + 1);\nsc.close();"
      },
      {
        "question": "Fix: int x = \"5\"; — two correct versions.",
        "hint": "Use a literal or parse the string.",
        "answer": "int x = 5;\nint y = Integer.parseInt(\"5\");"
      }
    ],
    "interview": [
      {
        "question": "JDK vs JRE vs JVM?",
        "answer": "JDK = full toolkit (compiler javac + runtime). JRE = runtime only (JVM + libraries). JVM = the virtual machine executing bytecode. Developers install the JDK."
      },
      {
        "question": "What happens when you run `javac Main.java` then `java Main`?",
        "answer": "javac compiles source to Main.class bytecode; the java launcher starts a JVM that loads, verifies, and executes that bytecode’s main method."
      },
      {
        "question": "Why must the file name match the public class?",
        "answer": "The compiler and classloader locate public classes by file name; mismatches cause compilation errors."
      },
      {
        "question": "Static typing: what does `int x = \"hi\"` do?",
        "answer": "Compilation fails — a String cannot convert to int. Java catches type errors at compile time, not runtime."
      }
    ]
  },
  {
    "id": "java-2",
    "title": "Variables, types & operators",
    "level": "Beginner",
    "definition": "Java variables have fixed types: primitives (int, long, double, boolean, char) hold values directly; String and objects hold references. Operators (+, -, *, /, %, ==, &&, ||, !) compute and compare; + with a String concatenates.",
    "analogy": "Like fixed-size steel dabbas vs labels: a primitive dabba physically holds the rice (int holds 5); a String is a label pointing to a shelf box. == compares dabba contents for primitives but label addresses for objects — use .equals() for object content.",
    "keyPoints": [
      "Primitives: byte/short/int/long (whole), float/double (decimal), boolean, char; defaults 0/false/\\u0000.",
      "declare: int marks = 92; final int YEAR = 2026; (final = cannot reassign).",
      "Dividing ints truncates: 7 / 2 is 3 — use 7.0 / 2 for 3.5.",
      "== on objects compares references; compare String content with .equals(), never ==.",
      "String + anything concatenates; arithmetic first with parentheses: \"Total: \" + (a + b).",
      "Convert: Integer.parseInt(\"42\"), Double.parseDouble(\"4.2\"); bad input throws NumberFormatException."
    ],
    "basicExamples": [
      {
        "title": "Primitives and finals",
        "code": "public class Main {\n    public static void main(String[,\nex(\"Parsing text to numbers\", \"public class Main {\n    public static void main(String[] args) {\n        String marks = \"92\";\n        int total = Integer.parseInt(marks) + 8;\n        double price = Double.parseDouble(\"91.5\");\n        System.out.println(total + \" \" + price);\n    }\n}\", [[\"String marks = \"92\";\", \"Numeric text from input or a file.\"], [\"int total = Integer.parseInt(marks) + 8;\", \"Parse before arithmetic, or it will not compile.\"], [\"double price = Double.parseDouble(\"91.5\");\", \"The decimal variant.\"]])\n] args) {\n        int marks = 92;\n        double average = 91.5;\n        boolean passed = true;\n        char grade = 'A';\n        final int YEAR = 2026;\n        System.out.println(marks + \" \" + average + \" \" + passed + \" \" + grade + \" \" + YEAR);\n    }\n}",
        "lineByLine": [
          {
            "line": "int marks = 92;",
            "explanation": "int holds whole numbers directly."
          },
          {
            "line": "final int YEAR = 2026;",
            "explanation": "final locks the variable — reassignment fails."
          },
          {
            "line": "System.out.println(marks + \" \" + ...);",
            "explanation": "+ with a String builds one line."
          }
        ]
      },
      {
        "title": "Integer division trap",
        "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(7 / 2);\n        System.out.println(7.0 / 2);\n        System.out.println(7 % 2);\n    }\n}",
        "lineByLine": [
          {
            "line": "System.out.println(7 / 2);",
            "explanation": "int / int truncates: prints 3, not 3.5."
          },
          {
            "line": "System.out.println(7.0 / 2);",
            "explanation": "One double operand gives 3.5."
          },
          {
            "line": "System.out.println(7 % 2);",
            "explanation": "% gives the remainder: 1."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "String equality done right",
        "code": "public class Main {\n    public static void main(String[] args) {\n        String a = new String(\"Asha\");\n        String b = new String(\"Asha\");\n        System.out.println(a == b);\n        System.out.println(a.equals(b));\n    }\n}",
        "lineByLine": [
          {
            "line": "String a = new String(\"Asha\");",
            "explanation": "Two distinct objects with equal text."
          },
          {
            "line": "System.out.println(a == b);",
            "explanation": "false: == compares references for objects."
          },
          {
            "line": "System.out.println(a.equals(b));",
            "explanation": "true: .equals() compares content."
          }
        ]
      },
      {
        "title": "Parsing input safely",
        "code": "public class Main {\n    public static void main(String[] args) {\n        String text = \"42\";\n        int n = Integer.parseInt(text.trim());\n        System.out.println(n + 8);\n    }\n}",
        "lineByLine": [
          {
            "line": "String text = \"42\";",
            "explanation": "Raw text, e.g. from input."
          },
          {
            "line": "int n = Integer.parseInt(text.trim());",
            "explanation": "Trims spaces then parses to int."
          },
          {
            "line": "System.out.println(n + 8);",
            "explanation": "Numeric addition: prints 50."
          }
        ]
      },
      {
        "title": "Compound assignment and increment",
        "code": "int total = 10;\ntotal += 5;  // 15\ntotal -= 3;  // 12\ntotal++;    // 13\nint a = total++;\nint b = ++total;\nSystem.out.println(a + \" \" + b + \" \" + total);",
        "lineByLine": [
          {
            "line": "total += 5",
            "explanation": "Compound op: total = total + 5."
          },
          {
            "line": "total++",
            "explanation": "Post-increment: returns 13, then total becomes 14."
          },
          {
            "line": "int a = total++;",
            "explanation": "a gets 13, total is now 14."
          },
          {
            "line": "int b = ++total;",
            "explanation": "Pre-increment: total becomes 15 first, b gets 15."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Guarded parsing with fallback",
        "code": "public class Main {\n    static int toInt(String s, int fallback) {\n        try {\n            return Integer.parseInt(s.trim());\n        } catch (NumberFormatException | NullPointerException e) {\n            return fallback;\n        }\n    }\n    public static void main(String[] args) {\n        System.out.println(toInt(\" 42 \", 0)); // 42\n        System.out.println(toInt(\"five\", 0)); // 0\n    }\n}",
        "note": "Multi-catch keeps one helper total: bad text and null both yield the fallback."
      },
      {
        "title": "var and numeric promotion",
        "code": "public class Main {\n    public static void main(String[] args) {\n        var city = \"Bengaluru\"; // inferred String\n        // city = 5; // ERROR: still fixed\n        byte b = 10;\n        int sum = b + 100; // byte promotes to int\n        System.out.println(city + \" \" + sum);\n    }\n}",
        "note": "var infers but never loosens the type; small ints promote to int in arithmetic."
      }
    ],
    "practice": [
      {
        "question": "Store price 99.5 (double) and qty 3 (int); print total.",
        "hint": "Multiply; result is double.",
        "answer": "double price = 99.5;\nint qty = 3;\nSystem.out.println(price * qty);"
      },
      {
        "question": "Why does 5 / 2 print 2? Show the 2.5 fix.",
        "hint": "int division truncates; make an operand double.",
        "answer": "System.out.println(5 / 2); // 2\nSystem.out.println(5.0 / 2); // 2.5"
      },
      {
        "question": "Compare two input strings for equal content.",
        "hint": "Use .equals(), not ==.",
        "answer": "String a = \"hi\";\nString b = new String(\"hi\");\nSystem.out.println(a.equals(b)); // true"
      },
      {
        "question": "Parse \"  7 \" to int and add 3.",
        "hint": "trim() then parseInt.",
        "answer": "System.out.println(Integer.parseInt(\"  7 \".trim()) + 3); // 10"
      }
    ],
    "interview": [
      {
        "question": "Primitive vs reference types?",
        "answer": "Primitives (int, boolean...) store values directly on the stack; references (String, objects) store an address to heap data. Copies of primitives are independent; copies of references share the object."
      },
      {
        "question": "Why does 7/2 give 3 in Java?",
        "answer": "Both operands are int, so Java performs integer division and truncates toward zero. Promote one operand (7.0/2) for floating-point division."
      },
      {
        "question": "== vs .equals() for Strings?",
        "answer": "== compares object references (usually false for distinct objects); .equals() compares character content. Always use .equals() for value comparison."
      },
      {
        "question": "What is `final` on a variable?",
        "answer": "The binding cannot be reassigned after initialisation (constants by convention UPPER_CASE). For objects, the reference is fixed but contents may still mutate."
      }
    ]
  },
  {
    "id": "java-3",
    "title": "Conditions, loops & arrays",
    "level": "Beginner",
    "definition": "if/else and switch choose paths; for, while and do-while repeat work; arrays (int[]) store fixed-size sequences accessed by index starting at 0.",
    "analogy": "Like an attendance register: if present mark P else A (condition); the teacher repeats the row for every roll number (loop); the register is a fixed list of 60 slots (array) — slot 0 is the first student.",
    "keyPoints": [
      "if / else if / else runs the first true branch; switch matches one value against case labels with break.",
      "for (int i = 0; i < n; i++) counts exactly; enhanced for (int x : arr) walks values directly.",
      "while checks before each round; do-while runs once first — both need progress toward exit.",
      "Arrays: int[] a = new int[5]; indexes 0..4; a.length gives size; index 5 throws.",
      "break exits the loop; continue skips to the next round; both pair with if.",
      "Use .equals() for String tests; == on Strings compares references, not text."
    ],
    "basicExamples": [
      {
        "title": "Grade with if else",
        "code": "public class Main {\n    public static void main(String[] args) {\n        int marks = 72;\n        String grade;\n        if (marks >= 90) grade = \"A\";\n        else if (marks >= 60) grade = \"B\";\n        else grade = \"C\";\n        System.out.println(grade);\n    }\n}",
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
        "title": "Summing with for",
        "code": "public class Main {\n    public static void main(String[] args) {\n        int total = 0;\n        for (int i = 1; i <= 5; i++) {\n            total += i;\n        }\n        System.out.println(total);\n    }\n}",
        "lineByLine": [
          {
            "line": "int total = 0;",
            "explanation": "Accumulator."
          },
          {
            "line": "for (int i = 1; i <= 5; i++) {",
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
        "code": "public class Main {\n    public static void main(String[] args) {\n        int[] marks = {92, 78, 85};\n        System.out.println(marks[0]);\n        System.out.println(marks.length);\n        marks[1] = 80;\n        System.out.println(marks[1]);\n    }\n}",
        "lineByLine": [
          {
            "line": "int[] marks = {92, 78, 85};",
            "explanation": "Array of 3 ints, indexes 0..2."
          },
          {
            "line": "System.out.println(marks[0]);",
            "explanation": "First element: 92."
          },
          {
            "line": "marks[1] = 80;",
            "explanation": "Slots are mutable: slot 1 updated."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Enhanced for walk",
        "code": "public class Main {\n    public static void main(String[] args) {\n        String[] cities = {\"Mumbai\", \"Pune\", \"Delhi\"};\n        for (String c : cities) {\n            System.out.println(\"Namaste, \" + c);\n        }\n    }\n}",
        "lineByLine": [
          {
            "line": "String[] cities = {...};",
            "explanation": "Array of 3 city names."
          },
          {
            "line": "for (String c : cities) {",
            "explanation": "c takes each value in turn."
          },
          {
            "line": "System.out.println(\"Namaste, \" + c);",
            "explanation": "Greets each city."
          }
        ]
      },
      {
        "title": "switch on day",
        "code": "public class Main {\n    public static void main(String[] args) {\n        String day = \"Sun\";\n        switch (day) {\n            case \"Sat\":\n            case \"Sun\":\n                System.out.println(\"Weekend\");\n                break;\n            default:\n                System.out.println(\"Weekday\");\n        }\n    }\n}",
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
        "title": "break and continue audit",
        "code": "public class Main {\n    public static void main(String[] args) {\n        for (int token = 1; token <= 10; token++) {\n            if (token == 4) continue;\n            if (token == 7) break;\n            System.out.print(token + \" \");\n        }\n    }\n}",
        "note": "Skips 4, stops at 7: prints 1 2 3 5 6 — same pattern as filtering queues."
      },
      {
        "title": "2D array seating chart",
        "code": "public class Main {\n    public static void main(String[] args) {\n        int[][] seats = {{1, 0}, {1, 1}, {0, 1}};\n        for (int r = 0; r < seats.length; r++) {\n            for (int c = 0; c < seats[r].length; c++) {\n                System.out.print(seats[r][c] + \" \");\n            }\n            System.out.println();\n        }\n    }\n}",
        "note": "Nested loops walk rows then columns — the matrix pattern behind boards and timetables."
      }
    ],
    "practice": [
      {
        "question": "Print even numbers 2..20 with a for loop.",
        "hint": "Step i += 2.",
        "answer": "for (int i = 2; i <= 20; i += 2) System.out.println(i);"
      },
      {
        "question": "Find the max of an int array.",
        "hint": "Track best across an enhanced for.",
        "answer": "int[] a = {4, 9, 2};\nint best = a[0];\nfor (int x : a) if (x > best) best = x;\nSystem.out.println(best);"
      },
      {
        "question": "Count down 5..1 with while, then print Blast.",
        "hint": "Decrement inside the loop.",
        "answer": "int n = 5;\nwhile (n > 0) { System.out.println(n); n--; }\nSystem.out.println(\"Blast\");"
      },
      {
        "question": "Map 1/2/else to Veg / Non-veg / Invalid with switch.",
        "hint": "int switch with default.",
        "answer": "int c = 2;\nswitch (c) {\n    case 1: System.out.println(\"Veg\"); break;\n    case 2: System.out.println(\"Non-veg\"); break;\n    default: System.out.println(\"Invalid\");\n}"
      }
    ],
    "interview": [
      {
        "question": "for vs enhanced-for vs while — which when?",
        "answer": "Indexed for: need position or mutation. Enhanced-for: read every value simply. while: unknown rounds, e.g. reading until EOF."
      },
      {
        "question": "What happens at marks[5] on a 3-element array?",
        "answer": "ArrayIndexOutOfBoundsException. Arrays are fixed-size — check i < arr.length, or use ArrayList for growth."
      },
      {
        "question": "Why does switch need break?",
        "answer": "Without it execution falls through into the next case. Modern switch expressions (case 1 -> ...) avoid it."
      },
      {
        "question": "== vs .equals() inside conditions?",
        "answer": "if (day == \"Sun\") may fail for non-interned Strings; if (\"Sun\".equals(day)) compares content safely."
      }
    ]
  },
  {
    "id": "java-4",
    "title": "Methods: params, return & overloading",
    "level": "Beginner",
    "definition": "Methods are named actions inside classes: static methods belong to the class, instance methods to objects. Parameters receive input, return sends a result; overloading reuses one name with different parameter lists.",
    "analogy": "Like counters at a railway station: the enquiry counter (static method) serves anyone without a ticket; the TTE (instance method) checks YOUR coach. Overloading is one counter handling both single tickets and family passes.",
    "keyPoints": [
      "static methods call via ClassName.method(); instance methods need an object first.",
      "Signature = name + parameter types; return type fixed (use void for nothing).",
      "Overloading: same name, different params (area(5) vs area(5, 3)) - compiler picks by args.",
      "Parameters pass by value: primitives copy; object references copy the address (contents shared).",
      "return exits immediately with a value; every non-void path must return.",
      "Helper methods should be small, named by intent (calculateBill), and static when stateless."
    ],
    "basicExamples": [
      {
        "title": "Static method call",
        "code": "public class Main {\n    static int add(int a, int b) {\n        return a + b;\n    }\n    public static void main(String[] args) {\n        System.out.println(add(4, 6));\n    }\n}",
        "lineByLine": [
          {
            "line": "static int add(int a, int b) {",
            "explanation": "Static: callable without an object."
          },
          {
            "line": "return a + b;",
            "explanation": "Sends the sum back."
          },
          {
            "line": "System.out.println(add(4, 6));",
            "explanation": "Prints 10."
          }
        ]
      },
      {
        "title": "Instance method",
        "code": "public class Main {\n    String name = \"Asha\";\n    String greet() { return \"Namaste, \" + name; }\n    public static void main(String[] args) {\n        Main m = new Main();\n        System.out.println(m.greet());\n    }\n}",
        "lineByLine": [
          {
            "line": "String greet() { ... }",
            "explanation": "Instance method: needs an object."
          },
          {
            "line": "Main m = new Main();",
            "explanation": "Creates the object."
          },
          {
            "line": "m.greet()",
            "explanation": "Runs on that object: Namaste, Asha."
          }
        ]
      },
      {
        "title": "Overloading",
        "code": "public class Main {\n    static int area(int s) { return s * s; }\n    static int area(int l, int b) { return l * b; }\n    public static void main(String[] args) {\n        System.out.println(area(5) + \" \" + area(5, 3));\n    }\n}",
        "lineByLine": [
          {
            "line": "static int area(int s)",
            "explanation": "Square version: one param."
          },
          {
            "line": "static int area(int l, int b)",
            "explanation": "Rectangle version: two params."
          },
          {
            "line": "area(5) + \" \" + area(5, 3)",
            "explanation": "Prints 25 15."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Default via overload",
        "code": "public class Main {\n    static int fee(int age) { return age < 5 ? 0 : 100; }\n    static int fee() { return fee(10); }\n    public static void main(String[] args) {\n        System.out.println(fee());\n    }\n}",
        "lineByLine": [
          {
            "line": "static int fee() { return fee(10); }",
            "explanation": "No-arg version forwards with a default."
          },
          {
            "line": "fee(10)",
            "explanation": "Reuses the real logic."
          },
          {
            "line": "System.out.println(fee());",
            "explanation": "Prints 100."
          }
        ]
      },
      {
        "title": "Pass by value demo",
        "code": "public class Main {\n    static void tweak(int x, int[] a) {\n        x = 99; a[0] = 99;\n    }\n    public static void main(String[] args) {\n        int x = 1; int[] a = {1};\n        tweak(x, a);\n        System.out.println(x + \" \" + a[0]);\n    }\n}",
        "lineByLine": [
          {
            "line": "x = 99;",
            "explanation": "Primitive copy: caller x stays 1."
          },
          {
            "line": "a[0] = 99;",
            "explanation": "Shared array contents DO change."
          },
          {
            "line": "System.out.println(x + \" \" + a[0]);",
            "explanation": "Prints 1 99."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Varargs totals",
        "code": "public class Main {\n    static int total(int... nums) {\n        int s = 0;\n        for (int n : nums) s += n;\n        return s;\n    }\n    public static void main(String[] args) {\n        System.out.println(total(40, 60, 20));\n    }\n}",
        "note": "int... collects any count into an array - flexible totals without overloads."
      },
      {
        "title": "Method chaining builder",
        "code": "public class Main {\n    static class Bill {\n        int total = 0;\n        Bill add(int p) { total += p; return this; }\n    }\n    public static void main(String[] args) {\n        System.out.println(new Bill().add(60).add(30).total);\n    }\n}",
        "note": "Returning this enables b.add(60).add(30) chains - the fluent builder pattern."
      }
    ],
    "practice": [
      {
        "question": "Static square(n) returning n*n; test 7.",
        "hint": "static int method.",
        "answer": "static int square(int n) { return n * n; }\nSystem.out.println(square(7)); // 49"
      },
      {
        "question": "Overload greet(): default guest; greet(name).",
        "hint": "Two signatures.",
        "answer": "static String greet() { return greet(\"guest\"); }\nstatic String greet(String n) { return \"Namaste, \" + n; }"
      },
      {
        "question": "max(a,b) returning the larger.",
        "hint": "Ternary inside.",
        "answer": "static int max(int a, int b) { return a > b ? a : b; }\nSystem.out.println(max(4, 9));"
      },
      {
        "question": "Why must every path return in int methods?",
        "hint": "Compiler enforces it.",
        "answer": "static int f(boolean ok) {\n    if (ok) return 1;\n    return 0; // missing this = compile error\n}"
      }
    ],
    "interview": [
      {
        "question": "static vs instance methods?",
        "answer": "static belongs to the class (no object, no this); instance belongs to objects (has this, sees fields). Stateless helpers go static; behaviour needing object state goes instance."
      },
      {
        "question": "What is overloading and how is it resolved?",
        "answer": "Same name, different parameter lists; the compiler picks the closest match at compile time. Return type alone cannot distinguish overloads."
      },
      {
        "question": "Java pass-by-value or reference?",
        "answer": "Always by value: primitives copy the value, objects copy the reference. So reassigning a param never affects the caller, but mutating through it does."
      },
      {
        "question": "Can you overload by return type only?",
        "answer": "No - int f() vs String f() is a compile error. Callers may ignore returns, so the compiler could not choose."
      }
    ]
  },
  {
    "id": "java-5",
    "title": "Classes & objects",
    "level": "Intermediate",
    "definition": "A class is a blueprint combining fields (data) with methods (behaviour). An object is one instance built with new; a constructor (same name as the class) initialises its fields at creation.",
    "analogy": "Like a PAN card form: the blank form (class) defines fields; each issued card (object via new) carries one persons data. The constructor is the officer filling it at issue time - no card leaves blank.",
    "keyPoints": [
      "class Student { String name; int marks; } declares the shape; fields hold per-object data.",
      "A constructor Student(String n, int m) assigns fields; new Student(\"Asha\", 92) calls it.",
      "Methods like boolean passed() { return marks >= 40; } add behaviour using the objects fields.",
      "this.name = name disambiguates when parameter and field share a name.",
      "toString() controls printing; without it you see Student@1a2b3c addresses.",
      "static fields/methods belong to the class (Student.count); instance members belong to objects."
    ],
    "basicExamples": [
      {
        "title": "First class",
        "code": "class Student {\n    String name;\n    int marks;\n    Student(String n, int m) {\n        name = n;\n        marks = m;\n    }\n}\nStudent s = new Student(\"Asha\", 92);\nSystem.out.println(s.name + \" \" + s.marks);",
        "lineByLine": [
          {
            "line": "class Student { String name; int marks; }",
            "explanation": "Blueprint with two fields."
          },
          {
            "line": "Student(String n, int m) {",
            "explanation": "Constructor fills fields at birth."
          },
          {
            "line": "new Student(\"Asha\", 92)",
            "explanation": "new builds one object in memory."
          }
        ]
      },
      {
        "title": "Method behaviour",
        "code": "class Student {\n    String name; int marks;\n    Student(String n, int m) { name = n; marks = m; }\n    boolean passed() { return marks >= 40; }\n}\nStudent s = new Student(\"Ravi\", 35);\nSystem.out.println(s.passed());",
        "lineByLine": [
          {
            "line": "boolean passed() { return marks >= 40; }",
            "explanation": "Method reads the objects own marks."
          },
          {
            "line": "new Student(\"Ravi\", 35)",
            "explanation": "Low-marks object."
          },
          {
            "line": "System.out.println(s.passed());",
            "explanation": "Prints false."
          }
        ]
      },
      {
        "title": "Readable toString",
        "code": "class Student {\n    String name; int marks;\n    Student(String n, int m) { name = n; marks = m; }\n    public String toString() { return name + \": \" + marks; }\n}\nSystem.out.println(new Student(\"Asha\", 92));",
        "lineByLine": [
          {
            "line": "public String toString() { ... }",
            "explanation": "Overrides default address printing."
          },
          {
            "line": "return name + \": \" + marks;",
            "explanation": "Friendly one-line summary."
          },
          {
            "line": "System.out.println(new Student(\"Asha\", 92));",
            "explanation": "Prints Asha: 92."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "this keyword",
        "code": "class Student {\n    String name;\n    Student(String name) { this.name = name; }\n}\nSystem.out.println(new Student(\"Asha\").name);",
        "lineByLine": [
          {
            "line": "Student(String name) { this.name = name; }",
            "explanation": "this.name is the field; name is the parameter."
          },
          {
            "line": "new Student(\"Asha\").name",
            "explanation": "Field correctly filled: Asha."
          }
        ]
      },
      {
        "title": "static counter",
        "code": "class Student {\n    static int count = 0;\n    Student() { count++; }\n}\nnew Student(); new Student();\nSystem.out.println(Student.count);",
        "lineByLine": [
          {
            "line": "static int count = 0;",
            "explanation": "One copy shared by every object."
          },
          {
            "line": "Student() { count++; }",
            "explanation": "Each birth increments it."
          },
          {
            "line": "System.out.println(Student.count);",
            "explanation": "Prints 2 via the class name."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Guarded account",
        "code": "class Account {\n    private int balance = 0;\n    void deposit(int amount) {\n        if (amount <= 0) throw new IllegalArgumentException(\"positive only\");\n        balance += amount;\n    }\n    int getBalance() { return balance; }\n}",
        "note": "private hides balance; the method validates before mutating - invalid money never lands."
      },
      {
        "title": "Constructor chaining",
        "code": "class Student {\n    String name; int marks;\n    Student(String name) { this(name, 0); }\n    Student(String name, int marks) { this.name = name; this.marks = marks; }\n}",
        "note": "this(...) calls the fuller constructor: one real initialiser, short conveniences beside it."
      }
    ],
    "practice": [
      {
        "question": "class Book with title, pages; isLong() over 300 pages.",
        "hint": "Fields plus boolean method.",
        "answer": "class Book {\n    String title; int pages;\n    Book(String t, int p) { title = t; pages = p; }\n    boolean isLong() { return pages > 300; }\n}"
      },
      {
        "question": "Add a toString to Book.",
        "hint": "Return title plus pages.",
        "answer": "public String toString() { return title + \" (\" + pages + \"p)\"; }"
      },
      {
        "question": "Circle with radius; area() using 3.14.",
        "hint": "Method computes from field.",
        "answer": "class Circle {\n    double radius;\n    Circle(double r) { radius = r; }\n    double area() { return 3.14 * radius * radius; }\n}"
      },
      {
        "question": "Why does new matter? What fails without it?",
        "hint": "References default to null; methods on null throw NPE.",
        "answer": "Student s; // null\n// s.passed(); // NullPointerException - build with new first"
      }
    ],
    "interview": [
      {
        "question": "Class vs object vs reference?",
        "answer": "Class is the blueprint; object is heap data built by new; the variable holds a reference (address) to it. Two variables can reference one object."
      },
      {
        "question": "What does a constructor do and not do?",
        "answer": "Initialises a fresh objects fields at creation. It has no return type, never returns values, and is not inherited - though children call super(...)."
      },
      {
        "question": "this in one line, plus a use?",
        "answer": "The current object. Uses: disambiguate fields (this.name), chain constructors (this(...)), pass self to other methods."
      },
      {
        "question": "static vs instance - memory view?",
        "answer": "static lives once per class loader; instance fields repeat per object. Stateless utilities go static; anything with per-object state must be instance."
      }
    ]
  },
  {
    "id": "java-6",
    "title": "Strings, StringBuilder & ArrayList",
    "level": "Intermediate",
    "definition": "String holds immutable text with rich methods; StringBuilder builds text efficiently in loops; ArrayList is a resizable array of objects with add/get/size; generics ArrayList<String> keep it type-safe.",
    "analogy": "Like a notice board: String is a printed poster (any change needs a fresh print); StringBuilder is a chalkboard you keep editing; ArrayList is the expandable attendance register that adds pages as students join.",
    "keyPoints": [
      "String methods: length(), charAt(i), substring(a,b), equals(), split(), trim(), toUpperCase().",
      "Strings are immutable: s.toUpperCase() returns a NEW string; loop-concat with + is O(n^2).",
      "StringBuilder appends cheaply in loops; toString() converts back at the end.",
      "ArrayList<String> list = new ArrayList<>(); list.add(\"idli\"); list.get(0); list.size().",
      "ArrayList holds objects only: use Integer/Double wrappers, autoboxing converts automatically.",
      "Enhanced for walks lists cleanly; get(i)/set(i,x) give index control when needed."
    ],
    "basicExamples": [
      {
        "title": "String methods",
        "code": "public class Main {\n    public static void main(String[] args) {\n        String city = \"  Bengaluru  \";\n        System.out.println(city.trim().toUpperCase());\n        System.out.println(city.trim().length());\n    }\n}",
        "lineByLine": [
          {
            "line": "String city = \"  Bengaluru  \";",
            "explanation": "Raw input with stray spaces."
          },
          {
            "line": "city.trim().toUpperCase()",
            "explanation": "Chains: trim then shout: BENGALURU."
          },
          {
            "line": "System.out.println(...length());",
            "explanation": "Trimmed length counts without spaces."
          }
        ]
      },
      {
        "title": "split and join",
        "code": "public class Main {\n    public static void main(String[] args) {\n        String line = \"idli,sambar,vada\";\n        String[] items = line.split(\",\");\n        System.out.println(items.length);\n        System.out.println(String.join(\" | \", items));\n    }\n}",
        "lineByLine": [
          {
            "line": "line.split(\",\")",
            "explanation": "Breaks into 3 pieces at commas."
          },
          {
            "line": "System.out.println(items.length);",
            "explanation": "Arrays use .length field: prints 3."
          },
          {
            "line": "String.join(\" | \", items)",
            "explanation": "Rejoins with new separator."
          }
        ]
      },
      {
        "title": "ArrayList basics",
        "code": "import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> cart = new ArrayList<>();\n        cart.add(\"idli\");\n        cart.add(\"dosa\");\n        System.out.println(cart.size() + \" \" + cart.get(0));\n    }\n}",
        "lineByLine": [
          {
            "line": "ArrayList<String> cart = new ArrayList<>();",
            "explanation": "Resizable list locked to Strings."
          },
          {
            "line": "cart.add(\"idli\");",
            "explanation": "Grows by one; no size declared upfront."
          },
          {
            "line": "cart.size() + \" \" + cart.get(0)",
            "explanation": "Prints: 2 idli."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "StringBuilder in loops",
        "code": "public class Main {\n    public static void main(String[] args) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 1; i <= 3; i++) sb.append(i).append(\" \");\n        System.out.println(sb.toString().trim());\n    }\n}",
        "lineByLine": [
          {
            "line": "StringBuilder sb = new StringBuilder();",
            "explanation": "Mutable buffer, cheap appends."
          },
          {
            "line": "sb.append(i).append(\" \")",
            "explanation": "Chains appends without new objects."
          },
          {
            "line": "sb.toString().trim()",
            "explanation": "Converts once: prints 1 2 3."
          }
        ]
      },
      {
        "title": "Walking a list",
        "code": "import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> marks = new ArrayList<>();\n        marks.add(92);\n        marks.add(78);\n        int total = 0;\n        for (int m : marks) total += m;\n        System.out.println(total);\n    }\n}",
        "lineByLine": [
          {
            "line": "marks.add(92);",
            "explanation": "int autoboxes into Integer automatically."
          },
          {
            "line": "for (int m : marks) total += m;",
            "explanation": "Enhanced for unboxes each back to int."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Why + in loops hurts",
        "code": "public class Main {\n    public static void main(String[] args) {\n        String s = \"\";\n        for (int i = 0; i < 1000; i++) s += i;\n        System.out.println(s.length());\n    }\n}",
        "note": "Each += copies the whole string: 1000 rounds copy ~500k chars. StringBuilder does it in one pass."
      },
      {
        "title": "removeIf filtering",
        "code": "import java.util.ArrayList;\nArrayList<Integer> m = new ArrayList<>();\nm.add(22);\nm.add(78);\nm.removeIf(x -> x < 40);\nSystem.out.println(m);",
        "note": "removeIf with a lambda drops failing marks in place: prints [78]."
      }
    ],
    "practice": [
      {
        "question": "Trim and uppercase user input in one chain.",
        "hint": "trim().toUpperCase().",
        "answer": "System.out.println(input.trim().toUpperCase());"
      },
      {
        "question": "Split \"a,b,c\" and print the count.",
        "hint": "split then .length.",
        "answer": "System.out.println(\"a,b,c\".split(\",\").length);"
      },
      {
        "question": "Build \"1 2 3\" with StringBuilder, no trailing space.",
        "hint": "Append then trim.",
        "answer": "StringBuilder sb = new StringBuilder();\nfor (int i = 1; i <= 3; i++) sb.append(i).append(\" \");\nSystem.out.println(sb.toString().trim());"
      },
      {
        "question": "Store 3 marks in ArrayList, print average.",
        "hint": "Enhanced for sum / size.",
        "answer": "int t = 0;\nfor (int m : marks) t += m;\nSystem.out.println(t / (double) marks.size());"
      }
    ],
    "interview": [
      {
        "question": "Why is String immutable in Java?",
        "answer": "Enables string-pool sharing, safe HashMap keys, and thread safety. Trade-off: edits allocate new objects, hence StringBuilder."
      },
      {
        "question": "StringBuilder vs StringBuffer?",
        "answer": "Same API; Builder is faster and unsynchronised (single thread), Buffer is synchronised (legacy multi-thread). Default to Builder."
      },
      {
        "question": "ArrayList vs array - when each?",
        "answer": "ArrayList: unknown size, rich methods, slight overhead. Array: fixed size, primitives without boxing, fastest indexed access."
      },
      {
        "question": "What is autoboxing and its cost?",
        "answer": "Automatic int<->Integer conversion. Convenient but each box allocates: heavy in tight loops over ArrayList<Integer>; prefer int[] there."
      }
    ]
  },
  {
    "id": "java-7",
    "title": "Inheritance & polymorphism",
    "level": "Intermediate",
    "definition": "Inheritance lets a child class reuse a parent class with extends; polymorphism lets child objects stand in for parent types, so one call runs the right override at runtime.",
    "analogy": "Like a family sweet shop: the parent recipe (Mysore pak) passes to children, each adding a flavour (override). Customers order sweets by the family name (parent type) and each shop serves its own version - same order, different taste.",
    "keyPoints": [
      "class Child extends Parent inherits fields and methods; super(...) calls the parent constructor first.",
      "@Override replaces a parent method; the annotation makes typos a compile error instead of silent bugs.",
      "A Parent-typed variable can hold any child: Payment p = new UpiPayment(); the child method runs.",
      "final methods cannot be overridden; final classes cannot be extended; abstract methods must be overridden.",
      "Constructors are NOT inherited - every child constructor must chain super(...) or this(...).",
      "Prefer composition over deep hierarchies: more than 3 levels usually signals a design smell."
    ],
    "basicExamples": [
      {
        "title": "extends and super",
        "code": "class Vehicle {\n  String name;\n  Vehicle(String name) { this.name = name; }\n}\nclass Bus extends Vehicle {\n  int seats;\n  Bus(String name, int seats) {\n    super(name);\n    this.seats = seats;\n  }\n}",
        "lineByLine": [
          {
            "line": "class Bus extends Vehicle {",
            "explanation": "Bus inherits the name field."
          },
          {
            "line": "super(name);",
            "explanation": "Parent constructor runs FIRST - must be line one."
          },
          {
            "line": "this.seats = seats;",
            "explanation": "Child adds its own field after."
          }
        ]
      },
      {
        "title": "Override in action",
        "code": "class Vehicle {\n  String sound() { return \"vroom\"; }\n}\nclass Auto extends Vehicle {\n  @Override\n  String sound() { return \"tuk-tuk\"; }\n}\nVehicle v = new Auto();\nSystem.out.println(v.sound());",
        "lineByLine": [
          {
            "line": "@Override String sound() ...",
            "explanation": "Child replaces the parent version."
          },
          {
            "line": "Vehicle v = new Auto();",
            "explanation": "Parent type holding a child object."
          },
          {
            "line": "System.out.println(v.sound());",
            "explanation": "Prints tuk-tuk: runtime picks the child method."
          }
        ]
      },
      {
        "title": "Safe downcast",
        "code": "Vehicle v = new Bus(\"City\", 40);\nif (v instanceof Bus b) {\n  System.out.println(b.seats);\n}",
        "lineByLine": [
          {
            "line": "Vehicle v = new Bus(\"City\", 40);",
            "explanation": "Upcast is always safe and implicit."
          },
          {
            "line": "if (v instanceof Bus b) {",
            "explanation": "Pattern matching tests AND binds in one step."
          },
          {
            "line": "System.out.println(b.seats);",
            "explanation": "Child fields visible only after the check."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Abstract billing",
        "code": "abstract class Bill {\n  abstract int total();\n  void print() { System.out.println(\"Pay Rs.\" + total()); }\n}\nclass FoodBill extends Bill {\n  @Override int total() { return 240; }\n}",
        "lineByLine": [
          {
            "line": "abstract class Bill {",
            "explanation": "Cannot be created - only extended."
          },
          {
            "line": "abstract int total();",
            "explanation": "No body: children MUST supply it."
          },
          {
            "line": "void print() ... total()",
            "explanation": "Shared code calls the child override."
          }
        ]
      },
      {
        "title": "Sealed family",
        "code": "sealed class Ticket permits Bus, Train {\n}\nfinal class Bus extends Ticket {\n}\nnon-sealed class Train extends Ticket {\n}",
        "lineByLine": [
          {
            "line": "sealed class Ticket permits Bus, Train {",
            "explanation": "Only listed classes may extend."
          },
          {
            "line": "final class Bus extends Ticket {",
            "explanation": "Bus ends its branch completely."
          },
          {
            "line": "non-sealed class Train ... {",
            "explanation": "Train stays open for further extension."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Template method",
        "code": "abstract class Report {\n  final void publish() { header(); body(); footer(); }\n  abstract void body();\n  void header() { System.out.println(\"== Report ==\"); }\n  void footer() { System.out.println(\"== End ==\"); }\n}",
        "note": "publish is final so the skeleton never changes; children fill only body(). Frameworks run on this pattern."
      },
      {
        "title": "Polymorphic billing desk",
        "code": "List<Bill> desk = List.of(new FoodBill(), new FoodBill());\nint sum = 0;\nfor (Bill b : desk) sum += b.total();\nSystem.out.println(sum);",
        "note": "The desk holds Bill types; each element runs its own total() - new bill kinds need zero desk changes."
      }
    ],
    "practice": [
      {
        "question": "Shape parent with area(); Circle and Square children override it.",
        "hint": "extends plus @Override each.",
        "answer": "class Shape { double area() { return 0; } }\nclass Circle extends Shape {\n  double r; Circle(double r) { this.r = r; }\n  @Override double area() { return 3.14 * r * r; }\n}\nclass Square extends Shape {\n  double s; Square(double s) { this.s = s; }\n  @Override double area() { return s * s; }\n}"
      },
      {
        "question": "Hold both shapes in a Shape[] and print each area.",
        "hint": "Polymorphic loop over parent type.",
        "answer": "Shape[] hall = { new Circle(2), new Square(3) };\nfor (Shape s : hall) System.out.println(s.area());"
      },
      {
        "question": "Make Animal abstract with speak(); Dog and Cat supply it.",
        "hint": "abstract method forced override.",
        "answer": "abstract class Animal { abstract String speak(); }\nclass Dog extends Animal {\n  @Override String speak() { return \"bow\"; }\n}\nclass Cat extends Animal {\n  @Override String speak() { return \"meow\"; }\n}"
      },
      {
        "question": "Why does a missing @Override typo compile but misbehave?",
        "hint": "Without it, sound(String x) overloads instead of overriding.",
        "answer": "class Auto extends Vehicle {\n  String sound(String extra) { return \"tuk\"; } // overload, NOT override\n}\n// Fix: match the parent signature exactly and keep @Override"
      }
    ],
    "interview": [
      {
        "question": "Overloading vs overriding - full contrast?",
        "answer": "Overloading: same name, different params, compile-time choice. Overriding: same signature in a child, runtime choice. Return type must be compatible; access cannot narrow."
      },
      {
        "question": "Why is super(...) mandatory as the first line?",
        "answer": "The parent part of the object must exist before child code touches it. Java enforces the order so inherited fields are never half-built."
      },
      {
        "question": "When do you pick abstract class vs interface?",
        "answer": "Abstract class: shared code plus forced hooks (is-a with reuse). Interface: pure capability across unrelated trees (can-do). Modern Java often prefers interfaces with defaults."
      },
      {
        "question": "What breaks when hierarchies grow too deep?",
        "answer": "Fragile base class: parent edits ripple unpredictably. Favour composition (has-a helpers) once you pass 2 to 3 levels."
      }
    ]
  },
  {
    "id": "java-8",
    "title": "Interfaces, exceptions & packages",
    "level": "Intermediate",
    "definition": "Interfaces declare capabilities (can-do contracts) that unrelated classes implement. Exceptions (try/catch/finally) handle failures without crashing; packages organise classes into namespaces.",
    "analogy": "Like a driving licence: the RTO (interface) lists what any driver must do (start, stop) without caring which car (class) you bring. Exceptions are airbags - trouble triggers a controlled stop (catch) instead of a wreck. Packages are city zones keeping addresses unique.",
    "keyPoints": [
      "interface Payable { int pay(int amt); } declares; class Upi implements Payable supplies the body.",
      "A class implements many interfaces but extends one class - interfaces dodge the diamond problem.",
      "try { risky(); } catch (IOException e) { } handles; finally always runs for cleanup.",
      "Checked exceptions (IOException) must be caught or declared with throws; unchecked (NullPointer) need not.",
      "throw new IllegalArgumentException(\"bad age\") raises your own failures with clear messages.",
      "Packages (package shop.billing;) group classes; import brings other packages into scope."
    ],
    "basicExamples": [
      {
        "title": "Interface and implementation",
        "code": "interface Payable {\n  int pay(int amt);\n}\nclass Upi implements Payable {\n  @Override\n  public int pay(int amt) {\n    System.out.println(\"UPI paid \" + amt);\n    return amt;\n  }\n}",
        "lineByLine": [
          {
            "line": "interface Payable {",
            "explanation": "Contract: every payment MUST have pay."
          },
          {
            "line": "class Upi implements Payable {",
            "explanation": "Upi signs the contract."
          },
          {
            "line": "@Override public int pay(int amt) {",
            "explanation": "Supplies the real UPI behaviour."
          }
        ]
      },
      {
        "title": "Polymorphic desk",
        "code": "Payable desk = new Upi();\ndesk.pay(240);\nPayable[] queue = { new Upi() };\nfor (Payable p : queue) p.pay(100);",
        "lineByLine": [
          {
            "line": "Payable desk = new Upi();",
            "explanation": "Interface type holding any implementation."
          },
          {
            "line": "desk.pay(240);",
            "explanation": "Runs Upi code through the contract."
          },
          {
            "line": "for (Payable p : queue) p.pay(100);",
            "explanation": "New payment kinds need zero desk changes."
          }
        ]
      },
      {
        "title": "try catch finally",
        "code": "try {\n  int n = Integer.parseInt(\"42\");\n  System.out.println(n * 2);\n} catch (NumberFormatException e) {\n  System.out.println(\"type digits only\");\n} finally {\n  System.out.println(\"counter closed\");\n}",
        "lineByLine": [
          {
            "line": "int n = Integer.parseInt(\"42\");",
            "explanation": "Risky line: crashes on non-digits."
          },
          {
            "line": "catch (NumberFormatException e) {",
            "explanation": "Catches exactly that crash."
          },
          {
            "line": "finally {",
            "explanation": "Runs in every case - success or failure."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Custom exception",
        "code": "class ShortBillException extends Exception {\n  ShortBillException(String m) { super(m); }\n}\nvoid bill(int amt) throws ShortBillException {\n  if (amt < 10) throw new ShortBillException(\"min Rs.10\");\n}",
        "lineByLine": [
          {
            "line": "class ShortBillException extends Exception {",
            "explanation": "Your own checked failure type."
          },
          {
            "line": "throws ShortBillException",
            "explanation": "Warns callers in the signature."
          },
          {
            "line": "throw new ShortBillException(\"min Rs.10\");",
            "explanation": "Raises with a clear message."
          }
        ]
      },
      {
        "title": "try with resources",
        "code": "try (java.util.Scanner sc = new java.util.Scanner(System.in)) {\n  System.out.println(\"Hi \" + sc.nextLine());\n}",
        "lineByLine": [
          {
            "line": "try (Scanner sc = ... ) {",
            "explanation": "Resource declared in the brackets."
          },
          {
            "line": "Auto-close guarantee",
            "explanation": "Scanner closes itself even on exceptions - no finally needed."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Default methods evolve APIs",
        "code": "interface Notifier {\n  void send(String m);\n  default void ping() { send(\"ping\"); }\n}",
        "note": "default gives old implementations the new method FREE - interfaces evolve without breaking every class."
      },
      {
        "title": "Multi-catch and chaining",
        "code": "try {\n  risky();\n} catch (java.io.IOException | IllegalStateException e) {\n  throw new RuntimeException(\"billing failed\", e);\n}",
        "note": "Multi-catch merges handlers; chaining (cause e) keeps the original trail for debugging."
      }
    ],
    "practice": [
      {
        "question": "Drawable interface with draw(); Circle and Square implement it.",
        "hint": "interface plus two implements.",
        "answer": "interface Drawable { void draw(); }\nclass Circle implements Drawable {\n  public void draw() { System.out.println(\"O\"); }\n}\nclass Square implements Drawable {\n  public void draw() { System.out.println(\"#\"); }\n}"
      },
      {
        "question": "Parse user age safely: digits add 1, anything else guides.",
        "hint": "try/catch NumberFormatException.",
        "answer": "try {\n  int a = Integer.parseInt(\"21\");\n  System.out.println(a + 1);\n} catch (NumberFormatException e) {\n  System.out.println(\"type digits only\");\n}"
      },
      {
        "question": "Read a file with try-with-resources printing each line.",
        "hint": "Scanner in try brackets.",
        "answer": "try (java.util.Scanner sc = new java.util.Scanner(new java.io.File(\"menu.txt\"))) {\n  while (sc.hasNextLine()) System.out.println(sc.nextLine());\n} catch (java.io.FileNotFoundException e) {\n  System.out.println(\"missing file\");\n}"
      },
      {
        "question": "Why does catch (Exception e) first break the next catch?",
        "hint": "First matching catch wins; generic first swallows all.",
        "answer": "// Fix: specific before generic\ntry { risky(); }\ncatch (java.io.IOException e) { System.out.println(\"io\"); }\ncatch (Exception e) { System.out.println(\"other\"); }"
      }
    ],
    "interview": [
      {
        "question": "Abstract class vs interface - final answer?",
        "answer": "Abstract: shared code plus forced hooks, one parent. Interface: pure capability, many per class, unrelated trees. Defaults let interfaces carry helpers too."
      },
      {
        "question": "Checked vs unchecked exceptions?",
        "answer": "Checked (IOException): compiler forces handling - recoverable conditions. Unchecked (NullPointer): programming bugs, no forcing. Catching unchecked everywhere hides bugs."
      },
      {
        "question": "Why try-with-resources over finally close?",
        "answer": "Auto-closes in reverse order, suppresses close-exceptions properly, and cannot forget. finally blocks routinely leak when close itself throws."
      },
      {
        "question": "What do packages solve?",
        "answer": "Name clashes (two Utils), access control (package-private), and navigation. Reverse-domain naming (com.shop) keeps the world unique."
      }
    ]
  },
  {
    "id": "java-9",
    "title": "Collections & generics",
    "level": "Advanced",
    "definition": "The Collections Framework adds growable containers - List, Set, Map, Queue - with fast search, sorting and iteration. Generics (<T>) type those containers so the compiler rejects the wrong kind of element before you run.",
    "analogy": "Like a South Indian kitchen shelf system: ArrayList is the open rack where you can push in another jar at any time; LinkedList is a chain of tiffin boxes hooked to each other; HashSet is the label-checked shelf that refuses a duplicate jar; HashMap is the sticker board that finds any jar by its written name instead of hunting shelf by shelf.",
    "keyPoints": [
      "Declare with the interface and construct the class: List<String> n = new ArrayList<>(); - swap implementations later without touching callers.",
      "ArrayList is the default: O(1) reads and appends. LinkedList only wins for heavy insert or remove in the middle.",
      "HashMap gives O(1) lookup by key; TreeMap keeps keys sorted at O(log n) per operation.",
      "Collections.sort, Collections.max and Collections.frequency do the common maths so you do not hand-write loops.",
      "Override equals and hashCode together or a HashSet will silently store what look like duplicates.",
      "Use record (Java 16+) for read-only data holders - it generates equals, hashCode and toString correctly for free."
    ],
    "basicExamples": [
      {
        "title": "ArrayList grows",
        "code": "import java.util.*;\n\nList<String> tiffin = new ArrayList<>();\ntiffin.add(\"roti\");\ntiffin.add(\"dal\");\nSystem.out.println(tiffin);\nSystem.out.println(tiffin.size());",
        "lineByLine": [
          {
            "line": "List<String> tiffin = new ArrayList<>();",
            "explanation": "Interface-typed variable, ArrayList implementation."
          },
          {
            "line": "tiffin.add(\"roti\");",
            "explanation": "Appends at the end - no fixed size to declare."
          },
          {
            "line": "System.out.println(tiffin.size());",
            "explanation": "Prints 2."
          }
        ]
      },
      {
        "title": "HashMap lookup",
        "code": "import java.util.*;\n\nMap<String, Integer> marks = new HashMap<>();\nmarks.put(\"asha\", 92);\nmarks.put(\"ravi\", 78);\nSystem.out.println(marks.get(\"asha\"));\nSystem.out.println(marks.getOrDefault(\"kabir\", 0));",
        "lineByLine": [
          {
            "line": "Map<String, Integer> marks = new HashMap<>();",
            "explanation": "Keys are strings, values are integers."
          },
          {
            "line": "marks.get(\"asha\")",
            "explanation": "Direct key lookup - no loop required."
          },
          {
            "line": "marks.getOrDefault(\"kabir\", 0)",
            "explanation": "Safe read: returns 0 instead of null."
          }
        ]
      },
      {
        "title": "Set rejects duplicates",
        "code": "import java.util.*;\n\nSet<Integer> ids = new HashSet<>(List.of(101, 205, 101, 307));\nSystem.out.println(ids);\nSystem.out.println(ids.contains(101));",
        "lineByLine": [
          {
            "line": "Set<Integer> ids = new HashSet<>(List.of(101, 205, 101, 307));",
            "explanation": "Four values in, duplicates dropped."
          },
          {
            "line": "System.out.println(ids);",
            "explanation": "Prints the three unique ids."
          },
          {
            "line": "ids.contains(101)",
            "explanation": "Instant membership test: true."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Sorting with a comparator",
        "code": "import java.util.*;\n\nList<String> names = new ArrayList<>(List.of(\"ram\", \"Sita\", \"aman\"));\nnames.sort(String.CASE_INSENSITIVE_ORDER);\nSystem.out.println(names);\nnames.sort(Comparator.comparingInt(String::length));\nSystem.out.println(names);",
        "lineByLine": [
          {
            "line": "names.sort(String.CASE_INSENSITIVE_ORDER);",
            "explanation": "Method reference to a ready-made comparator."
          },
          {
            "line": "names.sort(Comparator.comparingInt(String::length));",
            "explanation": "Custom rule - here shortest name first."
          },
          {
            "line": "System.out.println(names);",
            "explanation": "Prints the reordered list."
          }
        ]
      },
      {
        "title": "Three ways to iterate",
        "code": "import java.util.*;\n\nList<String> cities = List.of(\"Mumbai\", \"Pune\");\nfor (String c : cities) System.out.println(c);\nfor (int i = 0; i < cities.size(); i++) System.out.println(i + \": \" + cities.get(i));\ncities.forEach(c -> System.out.println(\"go \" + c));",
        "lineByLine": [
          {
            "line": "for (String c : cities)",
            "explanation": "Enhanced for - simplest read-only walk."
          },
          {
            "line": "for (int i = 0; ...)",
            "explanation": "Classic for when you also need the index."
          },
          {
            "line": "cities.forEach(c -> ...)",
            "explanation": "Lambda form: concise, but no break or continue."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Counting with merge",
        "code": "import java.util.*;\n\nList<String> votes = List.of(\"dosa\", \"idli\", \"dosa\", \"vada\", \"dosa\");\nMap<String, Integer> count = new HashMap<>();\nfor (String v : votes) {\n    count.merge(v, 1, Integer::sum);\n}\nSystem.out.println(count);",
        "note": "merge(key, seed, adder) replaces the get-then-put dance in a single null-safe call."
      },
      {
        "title": "Defensive unmodifiable copy",
        "code": "import java.util.*;\n\nList<String> menu = new ArrayList<>(List.of(\"idli\", \"dosa\"));\nList<String> safe = Collections.unmodifiableList(new ArrayList<>(menu));\n// safe.add(\"vada\"); // UnsupportedOperationException\nSystem.out.println(safe);",
        "note": "Expose an unmodifiable copy so callers cannot corrupt your internal list - a real production bug fix."
      }
    ],
    "practice": [
      {
        "question": "Store 5 marks in an ArrayList; print sorted order and the topper.",
        "hint": "Collections.sort then read the last element.",
        "answer": "List<Integer> m = new ArrayList<>(List.of(78, 92, 65, 88, 71));\nCollections.sort(m);\nSystem.out.println(m);\nSystem.out.println(m.get(m.size() - 1));"
      },
      {
        "question": "Count word frequency in \"idli dosa idli vada dosa idli\".",
        "hint": "HashMap plus merge.",
        "answer": "String[] w = \"idli dosa idli vada dosa idli\".split(\" \");\nMap<String, Integer> c = new HashMap<>();\nfor (String x : w) c.merge(x, 1, Integer::sum);\nSystem.out.println(c);"
      },
      {
        "question": "Sort records by marks descending using a Comparator.",
        "hint": "Comparator.comparingInt then reversed.",
        "answer": "record S(String n, int m) {}\nList<S> s = new ArrayList<>(List.of(new S(\"a\", 70), new S(\"b\", 90)));\ns.sort(Comparator.comparingInt(S::m).reversed());\ns.forEach(x -> System.out.println(x.n() + \" \" + x.m()));"
      },
      {
        "question": "Why does a HashSet keep duplicates? Fix it.",
        "hint": "equals and hashCode must be overridden together.",
        "answer": "record Id(String v) {}\nSet<Id> ids = new HashSet<>(List.of(new Id(\"A\"), new Id(\"A\")));\nSystem.out.println(ids.size()); // 1 - a record generates both methods"
      }
    ],
    "interview": [
      {
        "question": "ArrayList vs LinkedList - which by default?",
        "answer": "ArrayList nearly always: an array gives O(1) indexed reads and cache-friendly iteration. LinkedList only wins for frequent middle insert/remove, which is rare in practice."
      },
      {
        "question": "How does HashMap work internally?",
        "answer": "key.hashCode() selects a bucket and equals() resolves collisions inside it. O(1) average; long buckets are treeified in Java 8+ to keep worst case O(log n)."
      },
      {
        "question": "State the equals/hashCode contract.",
        "answer": "Equal objects must return equal hash codes, and unequal objects should spread across buckets. Override one without the other and HashMap or HashSet silently misbehaves."
      },
      {
        "question": "Comparable vs Comparator?",
        "answer": "Comparable defines the single natural order inside the class via compareTo. Comparator is an external reusable rule allowing many sort orders. Prefer Comparator for flexibility."
      }
    ]
  },
  {
    "id": "java-10",
    "title": "Exceptions, try-with-resources & file I/O",
    "level": "Advanced",
    "definition": "Exceptions signal problems at runtime: checked ones (IOException) the compiler makes you handle, unchecked ones (NullPointerException) come from logic bugs. try/catch/finally handles them, try-with-resources closes files automatically, and java.nio.file reads and writes text.",
    "analogy": "Like ordering food on a delivery app: try is placing the order, catch is the support call when the restaurant is closed (handled without crashing), finally is the wallet page you always pass through, and try-with-resources is the auto-refund - the app closes the payment session itself even if the order failed.",
    "keyPoints": [
      "Throw for exceptional conditions, not for normal flow - exceptions are slow and hide the happy path.",
      "catch the most specific exception first; catching Exception early makes later blocks unreachable.",
      "Never swallow an exception with an empty catch - log it or rethrow so the failure stays visible.",
      "try-with-resources (try (var w = Files.newBufferedWriter(p))) closes automatically, even on exception.",
      "Read a whole file with Files.readString(path); write with Files.writeString(path, text).",
      "Create your own exception by extending Exception (checked) or RuntimeException (unchecked) with a clear message."
    ],
    "basicExamples": [
      {
        "title": "try catch finally",
        "code": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        try {\n            int marks = Integer.parseInt(\"92abc\");\n            System.out.println(marks);\n        } catch (NumberFormatException e) {\n            System.out.println(\"Not a number: \" + e.getMessage());\n        } finally {\n            System.out.println(\"Always runs\");\n        }\n    }\n}",
        "lineByLine": [
          {
            "line": "try {",
            "explanation": "Attempt the risky parse."
          },
          {
            "line": "catch (NumberFormatException e)",
            "explanation": "Handles only that failure type."
          },
          {
            "line": "finally {",
            "explanation": "Cleanup that runs either way."
          }
        ]
      },
      {
        "title": "Custom checked exception",
        "code": "class AgeException extends Exception {\n    AgeException(String msg) { super(msg); }\n}\n\npublic class Main {\n    static void check(int age) throws AgeException {\n        if (age < 18) throw new AgeException(\"Must be 18+, got \" + age);\n        System.out.println(\"Allowed\");\n    }\n    public static void main(String[] args) {\n        try { check(15); } catch (AgeException e) { System.out.println(e.getMessage()); }\n    }\n}",
        "lineByLine": [
          {
            "line": "class AgeException extends Exception",
            "explanation": "Checked: callers must handle or declare it."
          },
          {
            "line": "throw new AgeException(...)",
            "explanation": "Signals the exact business rule that failed."
          },
          {
            "line": "try { check(15); }",
            "explanation": "The try is mandatory - the compiler enforces it."
          }
        ]
      },
      {
        "title": "try-with-resources write",
        "code": "import java.nio.file.*;\nimport java.io.IOException;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        try (var w = Files.newBufferedWriter(Path.of(\"notes.txt\"))) {\n            w.write(\"Namaste, Java\");\n        }\n        System.out.println(Files.readString(Path.of(\"notes.txt\")));\n    }\n}",
        "lineByLine": [
          {
            "line": "try (var w = Files.newBufferedWriter(...))",
            "explanation": "w is closed automatically at the block end."
          },
          {
            "line": "w.write(\"Namaste, Java\");",
            "explanation": "Writes the text."
          },
          {
            "line": "Files.readString(...)",
            "explanation": "Reads it all back in one call."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Multi-catch order",
        "code": "public class Main {\n    static int divide(int a, String b) {\n        try {\n            return a / Integer.parseInt(b);\n        } catch (ArithmeticException e) {\n            return -1;\n        } catch (NumberFormatException e) {\n            return -2;\n        }\n    }\n    public static void main(String[] args) {\n        System.out.println(divide(10, \"0\"));\n        System.out.println(divide(10, \"x\"));\n        System.out.println(divide(10, \"2\"));\n    }\n}",
        "lineByLine": [
          {
            "line": "catch (ArithmeticException e)",
            "explanation": "Division by zero lands here: -1."
          },
          {
            "line": "catch (NumberFormatException e)",
            "explanation": "Bad text lands here: -2."
          },
          {
            "line": "return a / Integer.parseInt(b);",
            "explanation": "Clean input reaches the return: 5."
          }
        ]
      },
      {
        "title": "Reading lines safely",
        "code": "import java.nio.file.*;\nimport java.io.IOException;\n\npublic class Main {\n    public static void main(String[] args) {\n        Path p = Path.of(\"menu.txt\");\n        if (Files.exists(p)) {\n            try {\n                Files.readAllLines(p).forEach(System.out::println);\n            } catch (IOException e) {\n                System.out.println(\"read failed: \" + e.getMessage());\n            }\n        } else {\n            System.out.println(\"no file yet\");\n        }\n    }\n}",
        "lineByLine": [
          {
            "line": "if (Files.exists(p))",
            "explanation": "Check before reading - avoids FileNotFoundException."
          },
          {
            "line": "Files.readAllLines(p)",
            "explanation": "Returns a List<String> of every line."
          },
          {
            "line": "catch (IOException e)",
            "explanation": "Disks fail; the message keeps the cause visible."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Wrapping and rethrowing with context",
        "code": "public class Main {\n    static void load(String path) {\n        try {\n            if (path.isEmpty()) throw new IllegalArgumentException(\"path empty\");\n        } catch (IllegalArgumentException e) {\n            throw new IllegalStateException(\"config load failed\", e);\n        }\n    }\n    public static void main(String[] args) {\n        try { load(\"\"); } catch (IllegalStateException e) { e.printStackTrace(); }\n    }\n}",
        "note": "Rethrow with the original as the cause so the stack trace keeps the real origin - never lose the chain."
      },
      {
        "title": "Result-style validation without exceptions",
        "code": "import java.util.*;\n\nrecord Outcome(int code, String msg) { static Outcome ok(int c) { return new Outcome(c, \"ok\"); } }\n\npublic class Main {\n    static Outcome parse(String s) {\n        try { return Outcome.ok(Integer.parseInt(s)); }\n        catch (NumberFormatException e) { return new Outcome(0, \"bad input\"); }\n    }\n    public static void main(String[] args) {\n        System.out.println(parse(\"42\").msg() + \" \" + parse(\"x\").msg());\n    }\n}",
        "note": "For expected input mistakes, return a result object instead of throwing - cheaper and easier to test."
      }
    ],
    "practice": [
      {
        "question": "Parse user input; return -1 on bad numbers without crashing.",
        "hint": "catch NumberFormatException.",
        "answer": "int parse(String s) {\n    try { return Integer.parseInt(s); }\n    catch (NumberFormatException e) { return -1; }\n}"
      },
      {
        "question": "Write then read a file with try-with-resources.",
        "hint": "Files.newBufferedWriter + Files.readString.",
        "answer": "import java.nio.file.*;\nimport java.io.IOException;\n\ntry (var w = Files.newBufferedWriter(Path.of(\"t.txt\"))) {\n    w.write(\"hello\");\n}\nSystem.out.println(Files.readString(Path.of(\"t.txt\")));"
      },
      {
        "question": "Throw your own exception when marks are negative.",
        "hint": "Extend RuntimeException.",
        "answer": "class BadMarks extends RuntimeException {\n    BadMarks(String m) { super(m); }\n}\n\nvoid set(int m) {\n    if (m < 0) throw new BadMarks(\"negative: \" + m);\n}"
      },
      {
        "question": "Why is catching `Exception` first a compile error? Fix it.",
        "hint": "Specific handlers must precede general ones.",
        "answer": "try { work(); }\ncatch (IOException e) { log(e); }\ncatch (Exception e) { log(e); } // general goes LAST"
      }
    ],
    "interview": [
      {
        "question": "Checked vs unchecked exceptions?",
        "answer": "Checked extend Exception (IOException): compiler forces handling because the caller can reasonably recover. Unchecked extend RuntimeException (NPE, ClassCast): programming bugs to fix, not to catch everywhere."
      },
      {
        "question": "Why is an empty catch block dangerous?",
        "answer": "It hides failures, so bugs surface far from their cause. At minimum log with context or rethrow; prefer handling or converting to a result value."
      },
      {
        "question": "What does try-with-resources guarantee?",
        "answer": "Every AutoCloseable resource is closed in reverse order at block exit - normal or exceptional. It removes the manual finally-with-null-check boilerplate and the leak risk."
      },
      {
        "question": "finally vs return inside try?",
        "answer": "finally runs before the method actually returns, so a return inside finally silently overrides the try return value. Avoid returns in finally - the classic interview trap."
      }
    ]
  },
  {
    "id": "java-11",
    "title": "Lambdas, streams & Optional",
    "level": "Advanced",
    "definition": "Lambdas are compact functions passed as values; the Stream API pipes collections through filter, map, reduce and collect without explicit loops; Optional wraps a value that may be absent so you handle it explicitly.",
    "analogy": "Like a water-filter plant on a farm canal: the canal is your List, each filter station is a stream stage (remove mud = filter, chlorinate = map), and the tank at the end is collect. Optional is the sealed bottle label that honestly says whether the bottle is full or empty instead of handing you a blank.",
    "keyPoints": [
      "Lambda syntax: (a, b) -> a + b; method reference: String::length - shorter when a method already exists.",
      "filter keeps matching elements, map transforms each one, forEach consumes, collect materialises a result.",
      "Streams are lazy: nothing runs until a terminal op (collect, count, reduce), so filtered-out stages cost nothing.",
      "Use primitive streams (IntStream) to avoid boxing overhead in hot numeric loops.",
      "Optional: use map, filter, orElse instead of get(); returning null from a method defeats the whole point.",
      "Do not modify a collection while streaming it (ConcurrentModificationException) - collect to a new list first."
    ],
    "basicExamples": [
      {
        "title": "Filter and map",
        "code": "import java.util.*;\nimport java.util.stream.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> marks = List.of(22, 35, 78, 91);\n        List<Integer> passed = marks.stream()\n            .filter(m -> m >= 40)\n            .map(m -> m + 5)\n            .collect(Collectors.toList());\n        System.out.println(passed);\n    }\n}",
        "lineByLine": [
          {
            "line": "marks.stream()",
            "explanation": "Turns the list into a stream pipeline."
          },
          {
            "line": "filter(m -> m >= 40)",
            "explanation": "Keeps only passing marks."
          },
          {
            "line": "map(m -> m + 5)",
            "explanation": "Adds grace marks to each survivor."
          },
          {
            "line": "collect(Collectors.toList())",
            "explanation": "Materialises the result list."
          }
        ]
      },
      {
        "title": "Reduce to a total",
        "code": "import java.util.*;\nimport java.util.stream.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        int total = List.of(10, 20, 30).stream()\n            .reduce(0, Integer::sum);\n        System.out.println(total);\n    }\n}",
        "lineByLine": [
          {
            "line": "reduce(0, Integer::sum)",
            "explanation": "0 is the seed; sum folds each element in."
          },
          {
            "line": "System.out.println(total);",
            "explanation": "Prints 60."
          }
        ]
      },
      {
        "title": "Optional instead of null",
        "code": "import java.util.*;\n\npublic class Main {\n    static Optional<String> findCity(String q) {\n        return q.equals(\"BOM\") ? Optional.of(\"Mumbai\") : Optional.empty();\n    }\n    public static void main(String[] args) {\n        System.out.println(findCity(\"BOM\").map(String::toUpperCase).orElse(\"unknown\"));\n        System.out.println(findCity(\"PNQ\").orElseGet(() -> \"not found\"));\n    }\n}",
        "lineByLine": [
          {
            "line": "Optional.of / Optional.empty",
            "explanation": "Explicit present or absent value."
          },
          {
            "line": "map(String::toUpperCase)",
            "explanation": "Transforms only when present."
          },
          {
            "line": "orElse(\"unknown\")",
            "explanation": "Supplies the value when empty."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "groupingBy collector",
        "code": "import java.util.*;\nimport java.util.stream.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> words = List.of(\"idli\", \"dosa\", \"vada\", \"idli\");\n        Map<String, Long> byWord = words.stream()\n            .collect(Collectors.groupingBy(w -> w, Collectors.counting()));\n        System.out.println(byWord);\n    }\n}",
        "lineByLine": [
          {
            "line": "groupingBy(w -> w, ...)",
            "explanation": "Buckets elements by the key function."
          },
          {
            "line": "Collectors.counting()",
            "explanation": "Downstream collector counting each bucket."
          },
          {
            "line": "System.out.println(byWord);",
            "explanation": "Prints {idli=2, dosa=1, vada=1}."
          }
        ]
      },
      {
        "title": "IntStream ranges",
        "code": "import java.util.stream.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        int sum = IntStream.rangeClosed(1, 5).sum();\n        long evens = IntStream.rangeClosed(1, 10).filter(i -> i % 2 == 0).count();\n        System.out.println(sum + \" \" + evens);\n    }\n}",
        "lineByLine": [
          {
            "line": "IntStream.rangeClosed(1, 5)",
            "explanation": "Inclusive 1..5 - no boxing, fast."
          },
          {
            "line": "filter(i -> i % 2 == 0).count()",
            "explanation": "Counts even numbers: 5."
          },
          {
            "line": "System.out.println(sum + \" \" + evens);",
            "explanation": "Prints 15 5."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "flatMap for nested data",
        "code": "import java.util.*;\nimport java.util.stream.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<List<String>> orders = List.of(List.of(\"dosa\"), List.of(\"idli\", \"vada\"));\n        List<String> flat = orders.stream()\n            .flatMap(List::stream)\n            .toList();\n        System.out.println(flat);\n    }\n}",
        "note": "flatMap merges nested collections into one flat stream - the clean replacement for nested loops."
      },
      {
        "title": "Lazy short-circuit with limit",
        "code": "import java.util.stream.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        IntStream.iterate(1, n -> n * 2)\n            .limit(5)\n            .forEach(System.out::println);\n    }\n}",
        "note": "iterate is infinite; limit short-circuits it. Streams compute only what a terminal op demands."
      }
    ],
    "practice": [
      {
        "question": "Return names of students scoring 40+, uppercased.",
        "hint": "filter then map then collect.",
        "answer": "import java.util.*;\nimport java.util.stream.*;\n\nList<String> r = List.of(\"asha:92\", \"ravi:30\").stream()\n    .map(s -> s.split(\":\"))\n    .filter(p -> Integer.parseInt(p[1]) >= 40)\n    .map(p -> p[0].toUpperCase())\n    .toList();\nSystem.out.println(r);"
      },
      {
        "question": "Find the longest word in a list.",
        "hint": "max with a Comparator.",
        "answer": "import java.util.*;\n\nString longest = List.of(\"idli\", \"dosa\", \"vada\").stream()\n    .max(Comparator.comparingInt(String::length))\n    .orElse(\"\");\nSystem.out.println(longest);"
      },
      {
        "question": "Group marks into pass and fail.",
        "hint": "Collectors.partitioningBy.",
        "answer": "import java.util.*;\nimport java.util.stream.*;\n\nMap<Boolean, List<Integer>> g = List.of(22, 78, 35).stream()\n    .collect(Collectors.partitioningBy(m -> m >= 40));\nSystem.out.println(g);"
      },
      {
        "question": "Why can a stream be consumed only once?",
        "hint": "It is a single-use view over the source.",
        "answer": "import java.util.*;\n\nvar s = List.of(1, 2).stream();\ns.count();\n// s.count(); // IllegalStateException: stream has already been operated upon or closed"
      }
    ],
    "interview": [
      {
        "question": "Why are lambdas not just syntax sugar for anonymous classes?",
        "answer": "They compile to invokedynamic, giving a smaller memory footprint and correct this-scoping (no shadowed outer reference). They also cannot mutate locals - only effectively final ones."
      },
      {
        "question": "Intermediate vs terminal operations?",
        "answer": "Intermediate (filter, map, sorted) are lazy and return a new stream; terminal (collect, count, forEach) triggers evaluation and closes the stream. Without a terminal op, nothing executes."
      },
      {
        "question": "map vs flatMap in one line each?",
        "answer": "map: one element in, one out. flatMap: one element in, a stream out, flattened. Use flatMap for nested collections and Optional chains."
      },
      {
        "question": "Why avoid Optional.get()?",
        "answer": "get() throws NoSuchElementException on empty - the same crash Optional was meant to prevent. Use orElse, orElseGet, or orElseThrow with a clear message."
      }
    ]
  },
  {
    "id": "java-12",
    "title": "Modern Java: records, sealed types & pattern matching",
    "level": "Advanced",
    "definition": "Modern Java shrinks boilerplate: records are immutable data carriers in one line, sealed classes restrict who may extend them, and pattern matching (instanceof, switch) tests and destructures shapes directly.",
    "analogy": "Like swapping hand-written paper bills for a printed GST invoice: a record is the pre-printed template (fields filled once, never edited), sealed is a fixed approved-vendor list, and pattern matching is the clerk who reads the invoice type and files it automatically.",
    "keyPoints": [
      "record Point(int x, int y) auto-generates constructor, accessors x()/y(), equals, hashCode and toString.",
      "Records are final and immutable by design - ideal for DTOs, API responses and map keys.",
      "sealed interface Shape permits Circle, Square - the compiler knows every subtype that can exist.",
      "Pattern matching for instanceof: if (o instanceof Circle c) tests AND binds c in one step.",
      "switch expressions with case Circle c -> ... return a value and need no break; they can demand exhaustiveness.",
      "Records cannot extend classes or add mutable fields - use classes when you need inheritance."
    ],
    "basicExamples": [
      {
        "title": "Record vs class boilerplate",
        "code": "record Point(int x, int y) {}\n\npublic class Main {\n    public static void main(String[] args) {\n        Point p = new Point(3, 4);\n        System.out.println(p.x() + \",\" + p.y());\n        System.out.println(p);\n    }\n}",
        "lineByLine": [
          {
            "line": "record Point(int x, int y) {}",
            "explanation": "One line replaces a class, 2 fields, getters, equals, hashCode, toString."
          },
          {
            "line": "Point p = new Point(3, 4);",
            "explanation": "The generated constructor takes fields in declaration order."
          },
          {
            "line": "System.out.println(p);",
            "explanation": "Auto toString prints Point[x=3, y=4]."
          }
        ]
      },
      {
        "title": "Compact constructor validation",
        "code": "record Age(int value) {\n    public Age {\n        if (value < 0) throw new IllegalArgumentException(\"negative age\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(new Age(21).value());\n    }\n}",
        "lineByLine": [
          {
            "line": "public Age {",
            "explanation": "Compact form: no parameter list, runs after fields are assigned."
          },
          {
            "line": "if (value < 0) throw ...",
            "explanation": "Rejects bad data at construction - immutable and always valid."
          },
          {
            "line": "new Age(21).value()",
            "explanation": "Prints 21."
          }
        ]
      },
      {
        "title": "switch expression",
        "code": "public class Main {\n    static String bucket(int marks) {\n        return switch (marks / 10) {\n            case 9, 10 -> \"A\";\n            case 8 -> \"B\";\n            case 7 -> \"C\";\n            default -> \"D\";\n        };\n    }\n    public static void main(String[] args) {\n        System.out.println(bucket(72));\n    }\n}",
        "lineByLine": [
          {
            "line": "return switch (marks / 10) {",
            "explanation": "A switch EXPRESSION returns a value."
          },
          {
            "line": "case 9, 10 -> \"A\";",
            "explanation": "Multiple labels share one arrow branch."
          },
          {
            "line": "default -> \"D\"",
            "explanation": "Guarantees a result for every input."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Sealed hierarchy",
        "code": "sealed interface Shape permits Circle, Square {}\nrecord Circle(double r) implements Shape {}\nrecord Square(double s) implements Shape {}\n\npublic class Main {\n    static double area(Shape shape) {\n        return switch (shape) {\n            case Circle c -> Math.PI * c.r() * c.r();\n            case Square s -> s.s() * s.s();\n        };\n    }\n}",
        "lineByLine": [
          {
            "line": "sealed interface Shape permits Circle, Square {}",
            "explanation": "No one else may implement Shape - the list is closed."
          },
          {
            "line": "case Circle c -> ...",
            "explanation": "The pattern binds the record so c.r() is available."
          },
          {
            "line": "no default needed",
            "explanation": "Adding a third subtype makes the compiler demand a new case."
          }
        ]
      },
      {
        "title": "instanceof pattern",
        "code": "static void describe(Object o) {\n    if (o instanceof String s && s.length() > 3) {\n        System.out.println(\"long text: \" + s.toUpperCase());\n    } else if (o instanceof Integer i) {\n        System.out.println(\"number: \" + (i + 1));\n    }\n}",
        "lineByLine": [
          {
            "line": "o instanceof String s",
            "explanation": "Tests the type AND declares the cast variable s."
          },
          {
            "line": "&& s.length() > 3",
            "explanation": "The binding stays in scope for further conditions."
          },
          {
            "line": "o instanceof Integer i",
            "explanation": "No hand-written (Integer) o cast anywhere."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Records as map keys",
        "code": "import java.util.*;\nrecord Seat(int row, int col) {}\npublic class Main {\n    public static void main(String[] args) {\n        Map<Seat, String> booked = new HashMap<>();\n        booked.put(new Seat(3, 7), \"Asha\");\n        System.out.println(booked.get(new Seat(3, 7)));\n    }\n}",
        "note": "Generated equals/hashCode give value equality in HashMap/HashSet - hand-written classes need both correct by hand."
      },
      {
        "title": "Exhaustive switch catches design drift",
        "code": "sealed interface Payment permits Cash, Upi {}\nrecord Cash(double amt) implements Payment {}\nrecord Upi(String id, double amt) implements Payment {}\n\npublic class Main {\n    static String label(Payment p) {\n        return switch (p) {\n            case Cash c -> \"cash \" + c.amt();\n            case Upi u -> \"upi \" + u.id();\n        };\n    }\n}",
        "note": "Add a Card variant later and this switch fails to compile - the compiler maintains your checklist."
      }
    ],
    "practice": [
      {
        "question": "Model a Student with name and marks as a record; print both.",
        "hint": "record Student(String name, int marks) {}.",
        "answer": "record Student(String name, int marks) {}\nSystem.out.println(new Student(\"Asha\", 92));"
      },
      {
        "question": "Convert an if/else grade chain into a switch expression.",
        "hint": "case 9, 10 -> \"A\" with default.",
        "answer": "static String grade(int m){ return switch(m/10){ case 9,10 -> \"A\"; case 8 -> \"B\"; default -> \"C\"; }; }"
      },
      {
        "question": "Validate a record field using the compact constructor.",
        "hint": "Throw inside public RecordName { ... }.",
        "answer": "record Age(int value) {\n    public Age {\n        if (value < 0) throw new IllegalArgumentException(\"negative\");\n    }\n}"
      },
      {
        "question": "Why can a record not be abstract or extend a class?",
        "hint": "Inheritance would allow mutable state, breaking value equality.",
        "answer": "Records are implicitly final so their equals/hashCode contract stays trustworthy."
      }
    ],
    "interview": [
      {
        "question": "Records vs classes - decision rule?",
        "answer": "Records for immutable data (DTOs, config, keys, API models). Classes when you need inheritance, mutable state or rich behaviour."
      },
      {
        "question": "What does a record generate, and what may you add?",
        "answer": "Constructor, accessors (x() not getX()), equals, hashCode, toString. You may add static members, extra constructors and validation; you may not add instance fields."
      },
      {
        "question": "sealed + pattern matching: real benefit?",
        "answer": "Closed hierarchies let the compiler verify exhaustiveness, so adding a subtype breaks exactly the switches that must handle it - refactors become compile errors, not production bugs."
      },
      {
        "question": "switch expression vs switch statement?",
        "answer": "Expression returns a value, uses -> , cannot fall through, and can be required exhaustive. Statement is the legacy form with break and fall-through."
      }
    ]
  }
];
