module.exports = [
  {
    "id": "sql-1",
    "title": "Databases, tables & your first query",
    "level": "Beginner",
    "definition": "SQL (Structured Query Language) is the language for storing and asking questions of relational databases. Data lives in tables (rows + columns); you write queries and the database returns matching rows.",
    "analogy": "Like a railway reservation register: each page is a table, each line a passenger row, each column (name, berth, train) an attribute. SQL is the clerk who finds exactly the rows you describe.",
    "keyPoints": [
      "A database holds tables; a table has named columns with types (TEXT, INT, DATE) and rows of data.",
      "Core verbs: SELECT (read), INSERT (add), UPDATE (change), DELETE (remove), CREATE TABLE (define).",
      "Every query ends with a semicolon; keywords are case-insensitive but UPPER CASE is the convention.",
      "Install PostgreSQL locally or practise in a browser (e.g. SQLite playground) — syntax here is PostgreSQL-style.",
      "Never run UPDATE/DELETE without WHERE on real data — without it, every row changes.",
      "NULL means unknown/missing, not zero or empty string; test with IS NULL, never = NULL."
    ],
    "basicExamples": [
      {
        "title": "Your first query",
        "code": "SELECT 'Namaste, CodeAtlas!';",
        "lineByLine": [
          {
            "line": "SELECT 'Namaste, CodeAtlas!';",
            "explanation": "SELECT asks the database to return a value; the string in quotes comes back as one row."
          }
        ]
      },
      {
        "title": "Create a table and add rows",
        "code": "CREATE TABLE students (\n  id SERIAL PRIMARY KEY,\n  name TEXT NOT NULL,\n  marks INT\n);\n\nINSERT INTO students (name, marks) VALUES\n  ('Asha', 92),\n  ('Ravi', 78);\n\nSELECT * FROM students;",
        "lineByLine": [
          {
            "line": "CREATE TABLE students (",
            "explanation": "Defines a table with id, name, marks columns."
          },
          {
            "line": "INSERT INTO students (name, marks) VALUES",
            "explanation": "Adds two rows of data."
          },
          {
            "line": "SELECT * FROM students;",
            "explanation": "* returns every column of every row."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Comments in SQL",
        "code": "-- Show every student\nSELECT name, marks   -- pick only these columns\nFROM students;        -- from this table",
        "lineByLine": [
          {
            "line": "-- Show every student",
            "explanation": "-- comments the rest of the line."
          },
          {
            "line": "SELECT name, marks",
            "explanation": "Lists exactly the columns you want back."
          },
          {
            "line": "FROM students;",
            "explanation": "Names the table to read."
          }
        ]
      },
      {
        "title": "Filtering with WHERE",
        "code": "SELECT name, marks\nFROM students\nWHERE marks >= 80;",
        "lineByLine": [
          {
            "line": "SELECT name, marks",
            "explanation": "Choose the columns to display."
          },
          {
            "line": "FROM students",
            "explanation": "Source table."
          },
          {
            "line": "WHERE marks >= 80;",
            "explanation": "Keeps only rows matching the condition."
          }
        ]
      },
      {
        "title": "NULLs and IS NULL",
        "code": "SELECT name, city FROM students WHERE city IS NULL;\n-- LIKE patterns\nSELECT name FROM students WHERE name LIKE 'A%';",
        "lineByLine": [
          {
            "line": "SELECT name, city FROM students",
            "explanation": "Pick two columns to inspect."
          },
          {
            "line": "WHERE city IS NULL",
            "explanation": "Missing values match IS NULL; = NULL never works."
          },
          {
            "line": "WHERE name LIKE 'A%'",
            "explanation": "LIKE with % wildcard matches names starting with A."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Safe, repeatable setup script",
        "code": "DROP TABLE IF EXISTS students;\nCREATE TABLE students (\n  id SERIAL PRIMARY KEY,\n  name TEXT NOT NULL,\n  marks INT CHECK (marks BETWEEN 0 AND 100)\n);\nINSERT INTO students (name, marks)\nVALUES ('Asha', 92), ('Ravi', 78)\nON CONFLICT DO NOTHING;",
        "note": "DROP IF EXISTS + constraints + conflict handling make setup scripts re-runnable without errors."
      },
      {
        "title": "Inspecting table structure",
        "code": "d students        -- psql: describe table\nSELECT column_name, data_type\nFROM information_schema.columns\nWHERE table_name = 'students';",
        "note": "Two ways to see columns and types: the psql shortcut, or the standard information_schema view."
      }
    ],
    "practice": [
      {
        "question": "Select the literal greeting Hello, SQL.",
        "hint": "SELECT with a quoted string.",
        "answer": "SELECT 'Hello, SQL';"
      },
      {
        "question": "Create a cities table (id, name, population) and insert 2 rows.",
        "hint": "Mirror the students example with new names.",
        "answer": "CREATE TABLE cities (id SERIAL PRIMARY KEY, name TEXT, population INT);\nINSERT INTO cities (name, population) VALUES ('Bengaluru', 13000000), ('Mumbai', 21000000);"
      },
      {
        "question": "List names of students scoring above 85.",
        "hint": "SELECT name ... WHERE marks > 85.",
        "answer": "SELECT name FROM students WHERE marks > 85;"
      },
      {
        "question": "Why is WHERE marks = NULL wrong? Fix it.",
        "hint": "NULL needs IS NULL.",
        "answer": "SELECT * FROM students WHERE marks IS NULL;"
      }
    ],
    "interview": [
      {
        "question": "What is a relational database in one minute?",
        "answer": "Data stored in related tables of rows and columns, with keys linking them (e.g. orders.student_id -> students.id), queried with SQL, with the engine enforcing types and constraints."
      },
      {
        "question": "SELECT * — when is it fine vs harmful?",
        "answer": "Fine for quick exploration; harmful in app code because it fetches unneeded columns (slow, breaks when columns change). List explicit columns instead."
      },
      {
        "question": "What does NULL mean and how do you test it?",
        "answer": "NULL is unknown/missing — comparisons with = return unknown, not true. Use IS NULL / IS NOT NULL."
      },
      {
        "question": "Why is DELETE without WHERE dangerous?",
        "answer": "Without WHERE every row is deleted. Safe habit: run the SELECT version first, use transactions, and restrict permissions on production."
      }
    ]
  },
  {
    "id": "sql-2",
    "title": "SELECT, WHERE & sorting",
    "level": "Beginner",
    "definition": "SELECT reads data: choose columns, filter rows with WHERE, order with ORDER BY, limit with LIMIT. WHERE combines conditions with AND, OR, NOT and patterns with LIKE, IN, BETWEEN, IS NULL.",
    "analogy": "Like ordering at a darshini: SELECT dosa, coffee says what you want; WHERE chutney = extra filters the order; ORDER BY bill DESC sorts the queue richest-first; LIMIT 5 serves only five plates.",
    "keyPoints": [
      "Basic shape: SELECT col1, col2 FROM table WHERE condition ORDER BY col LIMIT n;",
      "Comparison: = <> < > <= >=; combine with AND (both), OR (either), NOT (negate) — AND binds tighter than OR.",
      "LIKE patterns: % any run of chars, _ one char: WHERE name LIKE 'A%' finds Asha/Arjun.",
      "IN (a, b, c) and BETWEEN 80 AND 100 simplify range tests; IS NULL finds missing values.",
      "ORDER BY marks DESC, name ASC sorts; LIMIT 5 OFFSET 5 paginates (page 2 of 5-per-page).",
      "SELECT DISTINCT removes duplicate rows from the result."
    ],
    "basicExamples": [
      {
        "title": "Choose columns and filter",
        "code": "SELECT name, marks\nFROM students\nWHERE marks >= 80;",
        "lineByLine": [
          {
            "line": "SELECT name, marks",
            "explanation": "Return only these two columns."
          },
          {
            "line": "FROM students",
            "explanation": "Read from the students table."
          },
          {
            "line": "WHERE marks >= 80;",
            "explanation": "Keep rows scoring 80 or more."
          }
        ]
      },
      {
        "title": "Sorting and limiting",
        "code": "SELECT name, marks\nFROM students\nORDER BY marks DESC\nLIMIT 3;",
        "lineByLine": [
          {
            "line": "ORDER BY marks DESC",
            "explanation": "Highest marks first (ASC would be lowest first)."
          },
          {
            "line": "LIMIT 3;",
            "explanation": "Return just the top 3 rows — the class toppers."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "AND, OR, NOT",
        "code": "SELECT name, marks\nFROM students\nWHERE marks >= 60 AND marks < 80;\n\nSELECT name FROM students\nWHERE name LIKE 'A%' OR marks < 50;",
        "lineByLine": [
          {
            "line": "WHERE marks >= 60 AND marks < 80;",
            "explanation": "Both must hold: the 60–79 band."
          },
          {
            "line": "WHERE name LIKE 'A%' OR marks < 50;",
            "explanation": "Either condition suffices: A-names plus struggling students."
          }
        ]
      },
      {
        "title": "IN, BETWEEN, IS NULL",
        "code": "SELECT name FROM students\nWHERE marks IN (85, 92, 100);\n\nSELECT name FROM students\nWHERE marks BETWEEN 70 AND 90;\n\nSELECT name FROM students\nWHERE marks IS NULL;",
        "lineByLine": [
          {
            "line": "WHERE marks IN (85, 92, 100);",
            "explanation": "Matches any listed value."
          },
          {
            "line": "WHERE marks BETWEEN 70 AND 90;",
            "explanation": "Inclusive range, both ends included."
          },
          {
            "line": "WHERE marks IS NULL;",
            "explanation": "Finds students with no recorded marks."
          }
        ]
      },
      {
        "title": "LIKE patterns and wildcards",
        "code": "SELECT name FROM students WHERE name LIKE 'A%';   -- starts with A\nSELECT name FROM students WHERE name LIKE '_sh_%'; -- 4th char sh\nSELECT email FROM students WHERE email LIKE '%@gmail.com';",
        "lineByLine": [
          {
            "line": "name LIKE 'A%'",
            "explanation": "% matches any run of characters: names starting with A."
          },
          {
            "line": "name LIKE '_sh_%'",
            "explanation": "The _ wildcard matches exactly one character."
          },
          {
            "line": "email LIKE '%@gmail.com'",
            "explanation": "Combine a leading % to match any prefix before the domain."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Pagination that stays stable",
        "code": "SELECT id, name, marks\nFROM students\nORDER BY marks DESC, id ASC\nLIMIT 5 OFFSET 5;",
        "note": "Always ORDER BY a unique column (id) with the sort key, or rows can shuffle between pages."
      },
      {
        "title": "Case-insensitive search (PostgreSQL)",
        "code": "SELECT name FROM students\nWHERE name ILIKE 'asha%';\n\nSELECT name FROM students\nWHERE LOWER(name) LIKE 'asha%';",
        "note": "ILIKE is PostgreSQL’s case-insensitive LIKE; LOWER() works on every database."
      }
    ],
    "practice": [
      {
        "question": "List all students scoring below 40 (need remedial class).",
        "hint": "WHERE marks < 40.",
        "answer": "SELECT name, marks FROM students WHERE marks < 40;"
      },
      {
        "question": "Find names starting with R, sorted A–Z.",
        "hint": "LIKE + ORDER BY ASC.",
        "answer": "SELECT name FROM students WHERE name LIKE 'R%' ORDER BY name ASC;"
      },
      {
        "question": "Top 5 scorers with name and marks.",
        "hint": "ORDER BY DESC + LIMIT.",
        "answer": "SELECT name, marks FROM students ORDER BY marks DESC LIMIT 5;"
      },
      {
        "question": "Students with marks 50–70 OR missing marks.",
        "hint": "BETWEEN + OR + IS NULL (parenthesise!).",
        "answer": "SELECT name FROM students WHERE (marks BETWEEN 50 AND 70) OR marks IS NULL;"
      }
    ],
    "interview": [
      {
        "question": "Walk me through logical query order vs written order.",
        "answer": "Written: SELECT ... FROM ... WHERE ... ORDER BY ... LIMIT. Executed: FROM -> WHERE -> SELECT -> ORDER BY -> LIMIT. That is why WHERE cannot use SELECT aliases but ORDER BY can."
      },
      {
        "question": "LIKE vs ILIKE vs = ?",
        "answer": "= exact match; LIKE pattern match (case-sensitive, % and _ wildcards); ILIKE case-insensitive LIKE (PostgreSQL). For indexed prefix searches, name LIKE 'Ab%' can still use a btree index."
      },
      {
        "question": "Why is `WHERE marks = NULL` always empty?",
        "answer": "= NULL evaluates to UNKNOWN, and WHERE keeps only TRUE rows. Use IS NULL. (Even NULL = NULL is not true.)"
      },
      {
        "question": "AND/OR precedence trap — example?",
        "answer": "WHERE a OR b AND c means a OR (b AND c). Always parenthesise mixed logic: WHERE (a OR b) AND c — interviewers love this bug."
      }
    ]
  },
  {
    "id": "sql-3",
    "title": "Aggregation: GROUP BY & HAVING",
    "level": "Beginner",
    "definition": "Aggregate functions (COUNT, SUM, AVG, MIN, MAX) collapse many rows into one value. GROUP BY splits rows into buckets first (one result row per group); HAVING filters groups the way WHERE filters rows.",
    "analogy": "Like a class teacher totalling marks: first sort answer sheets into subject piles (GROUP BY subject), then compute each pile average (AVG), and finally keep only piles averaging above 80 (HAVING) — piles, not individual sheets.",
    "keyPoints": [
      "COUNT(*) counts rows; COUNT(marks) skips NULLs; COUNT(DISTINCT city) counts unique values.",
      "GROUP BY city turns one row per student into one row per city with the aggregate beside it.",
      "HAVING filters AFTER grouping (on aggregates); WHERE filters BEFORE grouping (on raw rows).",
      "Mixing bare columns with aggregates without GROUP BY is an error in PostgreSQL — every selected column must be grouped or aggregated.",
      "NULLs are ignored by SUM/AVG/COUNT(col) — a student with no marks does not drag the average to zero.",
      "Alias aggregates (AS avg_marks) and ORDER BY the alias for readable top-N reports."
    ],
    "basicExamples": [
      {
        "title": "Whole-table totals",
        "code": "SELECT COUNT(*) AS students,\n       AVG(marks) AS avg_marks,\n       MAX(marks) AS topper\nFROM students;",
        "lineByLine": [
          {
            "line": "SELECT COUNT(*) AS students,",
            "explanation": "Counts every row including NULL-mark rows."
          },
          {
            "line": "AVG(marks) AS avg_marks,",
            "explanation": "Averages only non-NULL marks."
          },
          {
            "line": "FROM students;",
            "explanation": "One result row summarising the whole table."
          }
        ]
      },
      {
        "title": "Average per city",
        "code": "SELECT city, AVG(marks) AS avg_marks\nFROM students\nGROUP BY city;",
        "lineByLine": [
          {
            "line": "SELECT city, AVG(marks)",
            "explanation": "city is the bucket label; AVG summarises the bucket."
          },
          {
            "line": "FROM students",
            "explanation": "Source rows."
          },
          {
            "line": "GROUP BY city;",
            "explanation": "One output row per distinct city."
          }
        ]
      },
      {
        "title": "Keep only strong groups",
        "code": "SELECT city, AVG(marks) AS avg_marks\nFROM students\nGROUP BY city\nHAVING AVG(marks) >= 80;",
        "lineByLine": [
          {
            "line": "GROUP BY city",
            "explanation": "Bucket rows by city first."
          },
          {
            "line": "HAVING AVG(marks) >= 80;",
            "explanation": "HAVING tests the group result — WHERE could not do this."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "WHERE vs HAVING together",
        "code": "SELECT city, COUNT(*) AS n\nFROM students\nWHERE marks IS NOT NULL\nGROUP BY city\nHAVING COUNT(*) >= 2;",
        "lineByLine": [
          {
            "line": "WHERE marks IS NOT NULL",
            "explanation": "Drops unmarked students BEFORE grouping."
          },
          {
            "line": "GROUP BY city",
            "explanation": "Buckets survivors by city."
          },
          {
            "line": "HAVING COUNT(*) >= 2;",
            "explanation": "Keeps cities with 2+ marked students."
          }
        ]
      },
      {
        "title": "Conditional counting with CASE",
        "code": "SELECT COUNT(*) AS total,\n       SUM(CASE WHEN marks >= 40 THEN 1 ELSE 0 END) AS passed\nFROM students;",
        "lineByLine": [
          {
            "line": "SUM(CASE WHEN marks >= 40 THEN 1 ELSE 0 END)",
            "explanation": "Adds 1 per passing row: a filtered count."
          },
          {
            "line": "AS passed",
            "explanation": "Names the computed column."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Top city per... actually rank groups",
        "code": "SELECT city, AVG(marks) AS avg_marks\nFROM students\nWHERE marks IS NOT NULL\nGROUP BY city\nORDER BY avg_marks DESC\nLIMIT 1;",
        "note": "ORDER BY an aggregate alias + LIMIT 1 finds the champion group without any app code."
      },
      {
        "title": "Rollup grand total",
        "code": "SELECT COALESCE(city, 'ALL CITIES') AS city,\n       AVG(marks) AS avg_marks\nFROM students\nGROUP BY ROLLUP (city);",
        "note": "ROLLUP adds a super-row (city NULL) with the grand average — one query, detail plus total."
      }
    ],
    "practice": [
      {
        "question": "Count students per grade band: A (90+), B (60+), else C.",
        "hint": "GROUP BY a CASE expression.",
        "answer": "SELECT CASE WHEN marks >= 90 THEN 'A' WHEN marks >= 60 THEN 'B' ELSE 'C' END AS band, COUNT(*) FROM students GROUP BY 1;"
      },
      {
        "question": "Cities with more than 3 students, highest count first.",
        "hint": "GROUP BY + HAVING + ORDER BY.",
        "answer": "SELECT city, COUNT(*) AS n FROM students GROUP BY city HAVING COUNT(*) > 3 ORDER BY n DESC;"
      },
      {
        "question": "Pass percentage of the class in one row.",
        "hint": "AVG of a 1/0 CASE gives a ratio.",
        "answer": "SELECT AVG(CASE WHEN marks >= 40 THEN 1.0 ELSE 0 END) * 100 AS pass_pct FROM students;"
      },
      {
        "question": "Why does SELECT city, AVG(marks) without GROUP BY fail?",
        "hint": "city is bare (many values) beside one aggregate — PostgreSQL rejects the mix.",
        "answer": "-- Fix: add GROUP BY city so each city gets its own average row."
      }
    ],
    "interview": [
      {
        "question": "WHERE vs HAVING — precise difference?",
        "answer": "WHERE filters raw rows before grouping (cannot use aggregates); HAVING filters grouped rows after aggregation (uses aggregates). Wrong placement is a compile error or wrong numbers."
      },
      {
        "question": "COUNT(*) vs COUNT(col) vs COUNT(DISTINCT col)?",
        "answer": "* counts rows including NULLs; col skips NULLs in that column; DISTINCT col counts unique non-NULL values. Mixing them up silently changes reports."
      },
      {
        "question": "Why must bare columns appear in GROUP BY (Postgres)?",
        "answer": "Each output row represents a group, so every non-aggregated column must be constant within the group — enforced by listing it in GROUP BY. MySQL’s lax mode picks arbitrary values instead."
      },
      {
        "question": "How do NULLs affect aggregates?",
        "answer": "All aggregates except COUNT(*) ignore NULLs. AVG over (90, NULL) is 90, not 45 - correct for \"average of recorded marks\", wrong if missing means zero (then COALESCE first)."
      }
    ]
  },
  {
    "id": "sql-4",
    "title": "Joins: combining tables",
    "level": "Beginner",
    "definition": "Joins combine rows from two tables using a shared key: INNER keeps only matches, LEFT keeps every left row (filling NULLs), RIGHT the reverse, FULL both sides. ON states the matching rule.",
    "analogy": "Like matching wedding RSVP cards to the guest list: INNER seats only guests with both card and list entry; LEFT lists every invited guest and marks who never replied (NULL); the ON rule is comparing names on both papers.",
    "keyPoints": [
      "INNER JOIN keeps rows with a match on BOTH sides - the strict guest list.",
      "LEFT JOIN keeps ALL left rows; missing right sides become NULL - find gaps with WHERE right.id IS NULL.",
      "ON states the link (orders.student_id = students.id); USING(id) is the short form for same-named keys.",
      "Alias tables (students s) to keep queries short: s.city reads better than students.city.",
      "Joining without ON (comma join) multiplies every row with every row - a cross join explosion.",
      "Filter joined rows with WHERE after the JOIN; pre-filter big tables in subqueries/CTEs for speed."
    ],
    "basicExamples": [
      {
        "title": "INNER JOIN orders to students",
        "code": "SELECT s.name, o.item\nFROM students s\nINNER JOIN orders o ON o.student_id = s.id;",
        "lineByLine": [
          {
            "line": "FROM students s",
            "explanation": "s is a short alias for students."
          },
          {
            "line": "INNER JOIN orders o ON o.student_id = s.id;",
            "explanation": "Keeps only students who actually ordered."
          },
          {
            "line": "SELECT s.name, o.item",
            "explanation": "Name from the left, item from the right."
          }
        ]
      },
      {
        "title": "LEFT JOIN finds the gaps",
        "code": "SELECT s.name\nFROM students s\nLEFT JOIN orders o ON o.student_id = s.id\nWHERE o.id IS NULL;",
        "lineByLine": [
          {
            "line": "LEFT JOIN orders o ...",
            "explanation": "Keeps EVERY student, order or not."
          },
          {
            "line": "WHERE o.id IS NULL;",
            "explanation": "NULL means no matching order - these students never ordered."
          }
        ]
      },
      {
        "title": "Count orders per student",
        "code": "SELECT s.name, COUNT(o.id) AS orders\nFROM students s\nLEFT JOIN orders o ON o.student_id = s.id\nGROUP BY s.name;",
        "lineByLine": [
          {
            "line": "LEFT JOIN ...",
            "explanation": "Students with zero orders stay in the list."
          },
          {
            "line": "COUNT(o.id) AS orders",
            "explanation": "Counts matches; NULL sides count as 0."
          },
          {
            "line": "GROUP BY s.name;",
            "explanation": "One row per student."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Self-join pairs",
        "code": "SELECT a.name AS senior, b.name AS junior\nFROM students a\nJOIN students b ON b.mentor_id = a.id;",
        "lineByLine": [
          {
            "line": "FROM students a JOIN students b",
            "explanation": "Same table twice with two aliases."
          },
          {
            "line": "ON b.mentor_id = a.id;",
            "explanation": "Links each junior to their senior."
          }
        ]
      },
      {
        "title": "Multi-table chain",
        "code": "SELECT s.name, m.dish\nFROM students s\nJOIN orders o ON o.student_id = s.id\nJOIN menu m ON m.id = o.menu_id;",
        "lineByLine": [
          {
            "line": "JOIN orders o ...",
            "explanation": "First link: who ordered."
          },
          {
            "line": "JOIN menu m ON m.id = o.menu_id;",
            "explanation": "Second link: what each order contains."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "FULL JOIN reconciliation",
        "code": "SELECT COALESCE(s.name, g.name) AS who,\n       CASE WHEN s.id IS NULL THEN 'guest only'\n            WHEN g.id IS NULL THEN 'student only'\n            ELSE 'both' END AS status\nFROM students s\nFULL JOIN guests g ON g.email = s.email;",
        "note": "FULL JOIN keeps both sides - the standard reconcile-two-lists audit query."
      },
      {
        "title": "Anti-join with NOT EXISTS",
        "code": "SELECT s.name\nFROM students s\nWHERE NOT EXISTS (\n    SELECT 1 FROM orders o WHERE o.student_id = s.id\n);",
        "note": "NOT EXISTS often beats LEFT JOIN + IS NULL on big tables - the optimiser stops at the first match."
      }
    ],
    "practice": [
      {
        "question": "List each student with their order items (only orderers).",
        "hint": "INNER JOIN on student_id.",
        "answer": "SELECT s.name, o.item FROM students s INNER JOIN orders o ON o.student_id = s.id;"
      },
      {
        "question": "Find menu dishes nobody ordered.",
        "hint": "LEFT JOIN menu to orders, keep NULLs.",
        "answer": "SELECT m.dish FROM menu m LEFT JOIN orders o ON o.menu_id = m.id WHERE o.id IS NULL;"
      },
      {
        "question": "Count orders per city, including zero-order cities.",
        "hint": "LEFT JOIN then GROUP BY city.",
        "answer": "SELECT s.city, COUNT(o.id) FROM students s LEFT JOIN orders o ON o.student_id = s.id GROUP BY s.city;"
      },
      {
        "question": "What explodes when ON is forgotten?",
        "hint": "Comma join = every row x every row.",
        "answer": "-- SELECT * FROM students, orders; -- cross join: N*M rows!\n-- Always write the ON condition."
      }
    ],
    "interview": [
      {
        "question": "INNER vs LEFT vs FULL - one-line each?",
        "answer": "INNER: only matches. LEFT: all left rows + NULLs for misses. FULL: all rows from both + NULLs wherever unmatched. RIGHT mirrors LEFT."
      },
      {
        "question": "How do you find orphans (no match on the other side)?",
        "answer": "LEFT JOIN then WHERE right.key IS NULL - or NOT EXISTS. The IS NULL test must target the nullable side."
      },
      {
        "question": "ON vs WHERE in a join?",
        "answer": "ON defines how rows pair up (before grouping); WHERE filters the joined result after. For LEFT JOINs, moving a right-side filter from ON to WHERE silently converts it to INNER."
      },
      {
        "question": "Why is a missing ON catastrophic?",
        "answer": "Without ON every left row pairs with every right row (cross join): 10k x 10k = 100M rows. Always alias and always write the join condition."
      }
    ]
  },
  {
    "id": "sql-5",
    "title": "Subqueries & CTEs",
    "level": "Intermediate",
    "definition": "Subqueries nest one SELECT inside another (in WHERE or FROM); CTEs (WITH name AS (...)) name those blocks up front so the main query reads top-down. Both break big questions into named steps.",
    "analogy": "Like preparing a wedding feast: a subquery is fetching masala mid-cooking (nested errand); a CTE is prepping all ingredient bowls first (WITH ...), labelled and lined up, so the final cooking reads cleanly.",
    "keyPoints": [
      "Scalar subquery returns one value: WHERE marks > (SELECT AVG(marks) FROM students).",
      "IN subqueries test membership: WHERE id IN (SELECT student_id FROM orders).",
      "FROM subqueries (derived tables) must be aliased: FROM (SELECT ...) AS t.",
      "WITH city_avg AS (...) names a step once, then SELECT from it like a table.",
      "CTEs chain: WITH a AS (...), b AS (... SELECT FROM a ...) builds pipelines.",
      "EXISTS checks presence without returning data - fastest for yes/no questions."
    ],
    "basicExamples": [
      {
        "title": "Above-average students",
        "code": "SELECT name, marks\nFROM students\nWHERE marks > (SELECT AVG(marks) FROM students);",
        "lineByLine": [
          {
            "line": "(SELECT AVG(marks) FROM students)",
            "explanation": "Inner query computes one number first."
          },
          {
            "line": "WHERE marks > (...)",
            "explanation": "Outer keeps rows beating that number."
          }
        ]
      },
      {
        "title": "Students who ordered",
        "code": "SELECT name\nFROM students\nWHERE id IN (SELECT student_id FROM orders);",
        "lineByLine": [
          {
            "line": "(SELECT student_id FROM orders)",
            "explanation": "Inner list of orderer IDs."
          },
          {
            "line": "WHERE id IN (...)",
            "explanation": "Keeps students on that list."
          }
        ]
      },
      {
        "title": "First CTE",
        "code": "WITH avg_m AS (SELECT AVG(marks) AS v FROM students)\nSELECT name FROM students, avg_m\nWHERE marks > avg_m.v;",
        "lineByLine": [
          {
            "line": "WITH avg_m AS (...)",
            "explanation": "Names the average as a one-row table."
          },
          {
            "line": "WHERE marks > avg_m.v",
            "explanation": "Main query reads like plain English."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "EXISTS check",
        "code": "SELECT name\nFROM students s\nWHERE EXISTS (SELECT 1 FROM orders o WHERE o.student_id = s.id);",
        "lineByLine": [
          {
            "line": "WHERE EXISTS (SELECT 1 ...)",
            "explanation": "True when at least one order row matches."
          },
          {
            "line": "Correlated: o.student_id = s.id",
            "explanation": "Inner query references the outer row."
          }
        ]
      },
      {
        "title": "Chained CTEs",
        "code": "WITH city_avg AS (\n  SELECT city, AVG(marks) AS a FROM students GROUP BY city\n),\nstrong AS (\n  SELECT city FROM city_avg WHERE a >= 80\n)\nSELECT * FROM strong;",
        "lineByLine": [
          {
            "line": "WITH city_avg AS (...)",
            "explanation": "Step 1: averages per city."
          },
          {
            "line": "strong AS (... FROM city_avg ...)",
            "explanation": "Step 2 filters step 1."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Derived table with alias",
        "code": "SELECT t.city, t.n\nFROM (SELECT city, COUNT(*) AS n FROM students GROUP BY city) AS t\nWHERE t.n >= 2;",
        "note": "FROM subqueries MUST be aliased (AS t) - then filter and join them like tables."
      },
      {
        "title": "Top-N per group pattern",
        "code": "SELECT name, city, marks\nFROM students s\nWHERE marks >= (SELECT AVG(marks) FROM students WHERE city = s.city);",
        "note": "Correlated scalar: each student vs THEIR city average - per-group champions without window functions."
      }
    ],
    "practice": [
      {
        "question": "Students scoring above their city average.",
        "hint": "Correlated scalar subquery.",
        "answer": "SELECT name FROM students s WHERE marks > (SELECT AVG(marks) FROM students WHERE city = s.city);"
      },
      {
        "question": "Dishes never ordered, using NOT IN.",
        "hint": "Membership test.",
        "answer": "SELECT dish FROM menu WHERE id NOT IN (SELECT menu_id FROM orders);"
      },
      {
        "question": "Rewrite an IN query as a CTE.",
        "hint": "WITH ... then JOIN or IN.",
        "answer": "WITH orderers AS (SELECT DISTINCT student_id FROM orders)\nSELECT name FROM students WHERE id IN (SELECT student_id FROM orderers);"
      },
      {
        "question": "EXISTS vs IN with NULLs - which is safer?",
        "hint": "EXISTS ignores NULL pitfalls.",
        "answer": "-- NOT IN returns nothing if the list has NULL; EXISTS never has this bug."
      }
    ],
    "interview": [
      {
        "question": "Subquery vs CTE vs temp table?",
        "answer": "Subquery: inline, single-use. CTE: named, readable, chainable, same statement only. Temp table: persists for the session, indexable - for big multi-step jobs."
      },
      {
        "question": "Correlated vs non-correlated subqueries?",
        "answer": "Non-correlated runs once (independent). Correlated references the outer row and runs per row - powerful (per-group comparisons) but costlier."
      },
      {
        "question": "Why does NOT IN misbehave with NULLs?",
        "answer": "x NOT IN (1, NULL) is UNKNOWN, never TRUE - so zero rows return. Use NOT EXISTS or filter NULLs out of the list."
      },
      {
        "question": "Can a CTE be referenced twice? Cost?",
        "answer": "Yes - but Postgres may execute it twice unless MATERIALIZED. For expensive CTEs reused often, prefer temp tables."
      }
    ]
  },
  {
    "id": "sql-6",
    "title": "Window functions: RANK & ROW_NUMBER",
    "level": "Intermediate",
    "definition": "Window functions compute across rows related to the current row without collapsing them: ROW_NUMBER() numbers rows, RANK() ranks with gaps for ties, SUM() OVER gives running totals. OVER (PARTITION BY ... ORDER BY ...) defines each rows window.",
    "analogy": "Like a marathon results board: every runner keeps their own row, but RANK() writes their position beside them, PARTITION BY city gives per-city positions, and the running total column is the cumulative water-station count as they pass.",
    "keyPoints": [
      "OVER () is the window: PARTITION BY splits into groups (like GROUP BY but rows survive); ORDER BY orders inside.",
      "ROW_NUMBER() numbers 1,2,3 with no ties; RANK() gives ties the same number then skips (1,1,3).",
      "Aggregates as windows (SUM(marks) OVER (PARTITION BY city)) add group context to every row.",
      "LAG(marks) peeks at the previous row; LEAD(marks) peeks ahead - perfect for growth math.",
      "Windows run AFTER WHERE/GROUP BY, so filter first, then number the survivors.",
      "Always ORDER BY inside OVER for ranking functions - without it the order is undefined."
    ],
    "basicExamples": [
      {
        "title": "Number every student",
        "code": "SELECT name, marks,\n       ROW_NUMBER() OVER (ORDER BY marks DESC) AS pos\nFROM students;",
        "lineByLine": [
          {
            "line": "ROW_NUMBER() OVER (ORDER BY marks DESC)",
            "explanation": "Numbers rows from topper downward."
          },
          {
            "line": "AS pos",
            "explanation": "Names the computed column."
          },
          {
            "line": "FROM students;",
            "explanation": "All rows survive with positions attached."
          }
        ]
      },
      {
        "title": "Rank with ties",
        "code": "SELECT name, marks,\n       RANK() OVER (ORDER BY marks DESC) AS rnk\nFROM students;",
        "lineByLine": [
          {
            "line": "RANK() OVER (ORDER BY marks DESC)",
            "explanation": "Equal marks share a rank."
          },
          {
            "line": "ties then skip",
            "explanation": "Two students at rank 1 push next to 3."
          }
        ]
      },
      {
        "title": "Per-city toppers",
        "code": "SELECT name, city, marks,\n       RANK() OVER (PARTITION BY city ORDER BY marks DESC) AS city_rank\nFROM students;",
        "lineByLine": [
          {
            "line": "PARTITION BY city",
            "explanation": "Restarts ranking inside each city."
          },
          {
            "line": "ORDER BY marks DESC",
            "explanation": "Topper per city gets 1."
          },
          {
            "line": "city_rank",
            "explanation": "Filter = 1 later for city toppers."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Running total",
        "code": "SELECT name, marks,\n       SUM(marks) OVER (ORDER BY name) AS running\nFROM students;",
        "lineByLine": [
          {
            "line": "SUM(marks) OVER (ORDER BY name)",
            "explanation": "Cumulative sum in name order."
          },
          {
            "line": "running",
            "explanation": "Each row shows total so far."
          }
        ]
      },
      {
        "title": "Compare with previous",
        "code": "SELECT name, marks,\n       LAG(marks) OVER (ORDER BY marks) AS prev_marks\nFROM students;",
        "lineByLine": [
          {
            "line": "LAG(marks) OVER (ORDER BY marks)",
            "explanation": "Previous rows marks beside each row."
          },
          {
            "line": "first row gets NULL",
            "explanation": "No previous row exists there."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Top 2 per city",
        "code": "SELECT name, city, marks FROM (\n  SELECT name, city, marks,\n         RANK() OVER (PARTITION BY city ORDER BY marks DESC) AS r\n  FROM students\n) t WHERE r <= 2;",
        "note": "Rank inside a subquery, filter outside - windows cannot appear in WHERE directly."
      },
      {
        "title": "Growth vs class average",
        "code": "SELECT name, marks,\n       marks - AVG(marks) OVER () AS vs_avg\nFROM students;",
        "note": "AVG() OVER () broadcasts the class average onto every row for instant comparison."
      }
    ],
    "practice": [
      {
        "question": "Number students by marks descending.",
        "hint": "ROW_NUMBER with ORDER BY DESC.",
        "answer": "SELECT name, ROW_NUMBER() OVER (ORDER BY marks DESC) FROM students;"
      },
      {
        "question": "DENSE_RANK vs RANK on tied marks - show both.",
        "hint": "DENSE skips nothing: 1,1,2.",
        "answer": "SELECT name, marks, RANK() OVER (ORDER BY marks DESC) r, DENSE_RANK() OVER (ORDER BY marks DESC) d FROM students;"
      },
      {
        "question": "Running count of admissions in date order.",
        "hint": "COUNT(*) OVER with ORDER BY date.",
        "answer": "SELECT name, COUNT(*) OVER (ORDER BY admitted) AS running_n FROM students;"
      },
      {
        "question": "Why is WHERE rank = 1 an error? Fix it.",
        "hint": "Windows evaluate after WHERE; wrap in subquery.",
        "answer": "SELECT * FROM (SELECT name, RANK() OVER (ORDER BY marks DESC) r FROM students) t WHERE r = 1;"
      }
    ],
    "interview": [
      {
        "question": "GROUP BY vs PARTITION BY?",
        "answer": "GROUP BY collapses each group to one row. PARTITION BY keeps every row and attaches the group computation beside it - detail plus context."
      },
      {
        "question": "ROW_NUMBER vs RANK vs DENSE_RANK?",
        "answer": "ROW_NUMBER: unique 1,2,3,4. RANK: ties share, gaps follow (1,1,3). DENSE_RANK: ties share, no gaps (1,1,2). Pick by whether ties should skip positions."
      },
      {
        "question": "Why cannot windows sit in WHERE?",
        "answer": "Logical order: WHERE filters before windows compute. Filtered rows would change rankings - so rank in a subquery/CTE, filter outside."
      },
      {
        "question": "LAG/LEAD default and use?",
        "answer": "LAG(x) reads the previous row, LEAD(x) the next; both NULL at edges unless given a default. Core tools for period-over-period and sequence checks."
      }
    ]
  },
  {
    "id": "sql-7",
    "title": "Schema: CREATE, keys & normalization",
    "level": "Intermediate",
    "definition": "Schema design shapes tables: CREATE TABLE defines columns and types, PRIMARY KEY uniquely identifies rows, FOREIGN KEY links tables, NOT NULL/UNIQUE/DEFAULT/CHECK guard quality, and normalization removes redundancy.",
    "analogy": "Like planning a school building: CREATE TABLE raises each classroom with fixed desk sizes (types); PRIMARY KEY is the roll number on every desk; FOREIGN KEY is the corridor connecting class to library records; normalization stops writing the full address on every single page.",
    "keyPoints": [
      "CREATE TABLE students(id SERIAL PRIMARY KEY, name TEXT NOT NULL, marks INT CHECK(marks BETWEEN 0 AND 100));",
      "PRIMARY KEY: unique + never null, one per table; SERIAL/BIGSERIAL/IDENTITY auto-numbers it.",
      "FOREIGN KEY (city_id) REFERENCES cities(id) keeps links valid - orphans rejected, deletes controlled.",
      "UNIQUE blocks duplicates (emails); DEFAULT fills values (created_at DEFAULT now()); CHECK enforces rules.",
      "1NF: atomic values, no lists in cells. 2NF/3NF: every fact lives in one place, linked by keys.",
      "ALTER TABLE ADD COLUMN / DROP COLUMN evolves schema; CREATE INDEX speeds lookups on filtered columns."
    ],
    "basicExamples": [
      {
        "title": "Create two linked tables",
        "code": "CREATE TABLE cities (\n  id SERIAL PRIMARY KEY,\n  name TEXT UNIQUE NOT NULL\n);\n\nCREATE TABLE students (\n  id SERIAL PRIMARY KEY,\n  name TEXT NOT NULL,\n  city_id INT REFERENCES cities(id)\n);",
        "lineByLine": [
          {
            "line": "CREATE TABLE cities (...",
            "explanation": "Parent table with unique city names."
          },
          {
            "line": "id SERIAL PRIMARY KEY",
            "explanation": "Auto-numbered unique row id."
          },
          {
            "line": "city_id INT REFERENCES cities(id)",
            "explanation": "Every student must point at a real city."
          }
        ]
      },
      {
        "title": "Constraints guard quality",
        "code": "CREATE TABLE marks (\n  student TEXT NOT NULL,\n  score INT DEFAULT 0 CHECK (score BETWEEN 0 AND 100)\n);",
        "lineByLine": [
          {
            "line": "student TEXT NOT NULL",
            "explanation": "Name is mandatory - NULL rejected."
          },
          {
            "line": "score INT DEFAULT 0 ...",
            "explanation": "Missing scores default to 0."
          },
          {
            "line": "CHECK (score BETWEEN 0 AND 100)",
            "explanation": "Impossible scores rejected at insert."
          }
        ]
      },
      {
        "title": "Evolve with ALTER",
        "code": "ALTER TABLE students ADD COLUMN email TEXT;\nALTER TABLE students ADD CONSTRAINT uniq_email UNIQUE (email);",
        "lineByLine": [
          {
            "line": "ADD COLUMN email TEXT",
            "explanation": "New nullable column: old rows get NULL."
          },
          {
            "line": "ADD CONSTRAINT uniq_email UNIQUE (email)",
            "explanation": "Duplicate emails now rejected table-wide."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Normalization example",
        "code": "-- One row per student, cities stored once:\nCREATE TABLE cities (id SERIAL PRIMARY KEY, name TEXT);\nCREATE TABLE students (id SERIAL PRIMARY KEY, name TEXT, city_id INT REFERENCES cities(id));",
        "lineByLine": [
          {
            "line": "CREATE TABLE cities ...",
            "explanation": "Each city spelled once, id-referenced."
          },
          {
            "line": "city_id INT REFERENCES cities(id)",
            "explanation": "Rename a city in one row, all students follow."
          }
        ]
      },
      {
        "title": "Index for speed",
        "code": "CREATE INDEX idx_students_city ON students (city_id);\nSELECT * FROM students WHERE city_id = 3;",
        "lineByLine": [
          {
            "line": "CREATE INDEX idx_students_city ...",
            "explanation": "B-tree on city_id: lookups jump instead of scanning."
          },
          {
            "line": "WHERE city_id = 3",
            "explanation": "This filter now uses the index."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "ON DELETE behaviour",
        "code": "CREATE TABLE orders (\n  id SERIAL PRIMARY KEY,\n  student_id INT REFERENCES students(id) ON DELETE CASCADE\n);",
        "note": "CASCADE deletes child orders with the student; SET NULL keeps orders but clears the link; RESTRICT blocks the delete. Choose per business rule."
      },
      {
        "title": "Composite keys",
        "code": "CREATE TABLE enrol (student_id INT, course_id INT, PRIMARY KEY (student_id, course_id));",
        "note": "Two columns together unique: same student can take many courses but never the same one twice."
      }
    ],
    "practice": [
      {
        "question": "Create courses(id, title unique, fee default 0, fee non-negative).",
        "hint": "SERIAL, UNIQUE, DEFAULT, CHECK.",
        "answer": "CREATE TABLE courses (id SERIAL PRIMARY KEY, title TEXT UNIQUE NOT NULL, fee INT DEFAULT 0 CHECK (fee >= 0));"
      },
      {
        "question": "Link enrolments to students with a foreign key.",
        "hint": "REFERENCES with ON DELETE CASCADE.",
        "answer": "student_id INT REFERENCES students(id) ON DELETE CASCADE"
      },
      {
        "question": "Add a UNIQUE email column to existing students.",
        "hint": "ALTER TABLE twice or combined.",
        "answer": "ALTER TABLE students ADD COLUMN email TEXT UNIQUE;"
      },
      {
        "question": "City name repeated in every student row - normalise it.",
        "hint": "Extract cities table + FK.",
        "answer": "Move names to cities(id, name); keep city_id REFERENCES cities(id) in students."
      }
    ],
    "interview": [
      {
        "question": "Primary vs foreign vs unique keys?",
        "answer": "Primary: the tables identity (unique, not null, one). Foreign: a pointer into another tables primary, enforcing valid links. Unique: no-duplicates rule on non-identity data like emails."
      },
      {
        "question": "1NF through 3NF in one minute?",
        "answer": "1NF: atomic cells, no repeating groups. 2NF: no partial dependency on part of a composite key. 3NF: no transitive dependencies - facts depend only on the key. Result: each fact stored once."
      },
      {
        "question": "When do you denormalise?",
        "answer": "Read-heavy analytics where joins cost too much: store a computed total or copy a name. Accept slower writes and sync risk for faster reads."
      },
      {
        "question": "What does an index cost?",
        "answer": "Faster reads on filtered/sorted columns, but slower writes (index updated per insert) plus disk space. Index foreign keys and WHERE columns, not everything."
      }
    ]
  },
  {
    "id": "sql-8",
    "title": "Data changes: INSERT, UPDATE & DELETE",
    "level": "Intermediate",
    "definition": "DML writes data: INSERT adds rows, UPDATE changes existing rows, DELETE removes them. Every UPDATE and DELETE needs a WHERE clause, or the change hits the whole table.",
    "analogy": "Like a hostel mess register: INSERT writes a new student line, UPDATE corrects a spelling in one named row, DELETE strikes a left student. Forgetting WHERE is spilling ink across every page at once.",
    "keyPoints": [
      "INSERT INTO students (name, marks) VALUES (’Asha’, 92) adds one row; list columns explicitly.",
      "Multi-row INSERT stacks tuples: VALUES (a), (b), (c) - one round trip for many rows.",
      "UPDATE students SET marks = 95 WHERE id = 7 changes one row; without WHERE every row changes.",
      "DELETE FROM students WHERE id = 7 removes matches; TRUNCATE empties fast but keeps the table.",
      "RETURNING id, marks shows affected rows immediately - no second SELECT needed.",
      "Wrap related writes in a transaction so all succeed or all roll back together."
    ],
    "basicExamples": [
      {
        "title": "Insert one row",
        "code": "INSERT INTO students (name, city, marks)\nVALUES (’Kabir’, ’Jaipur’, 88)\nRETURNING id;",
        "lineByLine": [
          {
            "line": "INSERT INTO students (name, city, marks)",
            "explanation": "Names the target columns explicitly."
          },
          {
            "line": "VALUES (’Kabir’, ’Jaipur’, 88)",
            "explanation": "One tuple becomes one row."
          },
          {
            "line": "RETURNING id;",
            "explanation": "Shows the new auto-generated id at once."
          }
        ]
      },
      {
        "title": "Insert many rows",
        "code": "INSERT INTO students (name, city, marks)\nVALUES (’Asha’, ’Pune’, 92),\n       (’Ravi’, ’Delhi’, 78),\n       (’Meena’, ’Pune’, 85);",
        "lineByLine": [
          {
            "line": "VALUES (...), (...), (...);",
            "explanation": "Three tuples insert three rows."
          },
          {
            "line": "One statement, one trip",
            "explanation": "Far faster than three separate INSERTs."
          }
        ]
      },
      {
        "title": "Safe update",
        "code": "UPDATE students\nSET marks = 95\nWHERE id = 7\nRETURNING name, marks;",
        "lineByLine": [
          {
            "line": "UPDATE students",
            "explanation": "Names the table to change."
          },
          {
            "line": "SET marks = 95",
            "explanation": "New value for the column."
          },
          {
            "line": "WHERE id = 7",
            "explanation": "WITHOUT this line every student gets 95."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Conditional raise",
        "code": "UPDATE students\nSET marks = marks + 5\nWHERE city = ’Pune’ AND marks < 90\nRETURNING name, marks;",
        "lineByLine": [
          {
            "line": "SET marks = marks + 5",
            "explanation": "Updates from the old value, not a fixed number."
          },
          {
            "line": "WHERE city = ’Pune’ AND marks < 90",
            "explanation": "Only low Pune scores move."
          },
          {
            "line": "RETURNING name, marks;",
            "explanation": "Audit exactly who changed."
          }
        ]
      },
      {
        "title": "Delete with backup select",
        "code": "SELECT * FROM students WHERE marks < 35;\nDELETE FROM students WHERE marks < 35\nRETURNING *;",
        "lineByLine": [
          {
            "line": "SELECT * ... first",
            "explanation": "Preview the victims before deleting."
          },
          {
            "line": "DELETE ... WHERE marks < 35",
            "explanation": "Removes only the failing rows."
          },
          {
            "line": "RETURNING *;",
            "explanation": "Keeps a copy of what was removed."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Upsert with ON CONFLICT",
        "code": "INSERT INTO students (id, name, marks)\nVALUES (7, ’Ravi’, 80)\nON CONFLICT (id) DO UPDATE SET marks = EXCLUDED.marks\nRETURNING *;",
        "note": "Insert-or-update in one atomic step - no check-then-insert race between two requests."
      },
      {
        "title": "Update from another table",
        "code": "UPDATE students s\nSET city = c.new_city\nFROM corrections c\nWHERE s.name = c.name;",
        "note": "Joins inside UPDATE: mass-fix cities from a corrections sheet in a single statement."
      }
    ],
    "practice": [
      {
        "question": "Add yourself (name, city, marks) and see the new id.",
        "hint": "INSERT with RETURNING id.",
        "answer": "INSERT INTO students (name, city, marks)\nVALUES (’You’, ’Home’, 100)\nRETURNING id;"
      },
      {
        "question": "Give every Mumbai student +3 marks, capped display at 100.",
        "hint": "UPDATE with WHERE city filter.",
        "answer": "UPDATE students\nSET marks = marks + 3\nWHERE city = ’Mumbai’\nRETURNING name, marks;"
      },
      {
        "question": "Remove students with NULL marks after previewing them.",
        "hint": "SELECT first, then DELETE with IS NULL.",
        "answer": "SELECT * FROM students WHERE marks IS NULL;\nDELETE FROM students WHERE marks IS NULL;"
      },
      {
        "question": "What does UPDATE students SET marks = 0 do? Fix it.",
        "hint": "Missing WHERE hits every row.",
        "answer": "-- Damage: zeroes the whole table\n-- Fix: always add WHERE id = ...\nUPDATE students SET marks = 0 WHERE id = 7;"
      }
    ],
    "interview": [
      {
        "question": "Why is WHERE on UPDATE/DELETE the most feared line?",
        "answer": "Without it the change hits every row. Production rule: write WHERE first, preview with SELECT, then run inside a transaction."
      },
      {
        "question": "INSERT single vs multi-row vs COPY?",
        "answer": "Single: simple writes. Multi-row VALUES: bulk seeds in one trip. COPY: lakh-row loads from files, fastest by far. Pick by scale."
      },
      {
        "question": "What does RETURNING buy you?",
        "answer": "Affected rows come back instantly - new ids, changed values - with no second query and no race with other writers."
      },
      {
        "question": "UPDATE..FROM and upserts - when?",
        "answer": "UPDATE..FROM mass-fixes from another table; ON CONFLICT upserts make retries and syncs idempotent. Both keep multi-step logic inside one atomic statement."
      }
    ]
  },
  {
    "id": "sql-9",
    "title": "Transactions, isolation levels & locking",
    "level": "Advanced",
    "definition": "A transaction groups statements into one all-or-nothing unit (BEGIN ... COMMIT / ROLLBACK). Isolation levels decide which effects of concurrent transactions are visible, trading consistency against speed.",
    "analogy": "Like a bank cashier counter: a transaction serves one customer completely (check balance, deduct, print slip) - if any step fails nothing is applied. Isolation is how loudly the next customer can overhear the work in progress.",
    "keyPoints": [
      "BEGIN ... COMMIT saves everything; ROLLBACK undoes everything since BEGIN.",
      "ACID: Atomicity (all or nothing), Consistency (rules hold), Isolation (no interference), Durability (survives crashes).",
      "Isolation: READ COMMITTED (no dirty reads) < REPEATABLE READ (no non-repeatable reads) < SERIALIZABLE (no phantoms).",
      "Dirty read: seeing uncommitted data. Non-repeatable read: the same row changes mid-transaction. Phantom: new rows appear in a re-run range query.",
      "SET TRANSACTION ISOLATION LEVEL REPEATABLE READ raises safety but adds blocking and deadlocks.",
      "SELECT ... FOR UPDATE locks chosen rows so two clerks cannot sell the same seat at once.",
      "SAVEPOINT allows a partial rollback inside one transaction."
    ],
    "basicExamples": [
      {
        "title": "All-or-nothing transfer",
        "code": "BEGIN;\nUPDATE accounts SET balance = balance - 500 WHERE acc = 'A';\nUPDATE accounts SET balance = balance + 500 WHERE acc = 'B';\nCOMMIT;",
        "lineByLine": [
          {
            "line": "BEGIN;",
            "explanation": "Start one unit of work."
          },
          {
            "line": "UPDATE ... - 500 WHERE acc = A",
            "explanation": "Debit one account."
          },
          {
            "line": "COMMIT;",
            "explanation": "Both updates become permanent together."
          }
        ]
      },
      {
        "title": "ROLLBACK on error",
        "code": "BEGIN;\nUPDATE stock SET qty = qty - 3 WHERE item = 'dosa';\n-- wrong item, undo everything\nROLLBACK;\nSELECT qty FROM stock WHERE item = 'dosa';",
        "lineByLine": [
          {
            "line": "BEGIN;",
            "explanation": "Open the transaction."
          },
          {
            "line": "ROLLBACK;",
            "explanation": "Discards every change since BEGIN."
          },
          {
            "line": "SELECT ...",
            "explanation": "Shows the ORIGINAL quantity - nothing applied."
          }
        ]
      },
      {
        "title": "Row lock for seat booking",
        "code": "BEGIN;\nSELECT qty FROM seats WHERE show = 'IMAX' FOR UPDATE;\nUPDATE seats SET qty = qty - 1 WHERE show = 'IMAX';\nCOMMIT;",
        "lineByLine": [
          {
            "line": "SELECT ... FOR UPDATE",
            "explanation": "Locks these rows; other writers WAIT here."
          },
          {
            "line": "UPDATE ... qty - 1",
            "explanation": "Safe because nobody else can change the row meanwhile."
          },
          {
            "line": "COMMIT;",
            "explanation": "Releases the lock."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "SAVEPOINT partial rollback",
        "code": "BEGIN;\nINSERT INTO orders (id) VALUES (1);\nSAVEPOINT after_order;\nINSERT INTO payments (order_id) VALUES (1);\n-- payment failed: undo only that part\nROLLBACK TO after_order;\nCOMMIT;",
        "lineByLine": [
          {
            "line": "SAVEPOINT after_order;",
            "explanation": "A checkpoint inside the transaction."
          },
          {
            "line": "ROLLBACK TO after_order;",
            "explanation": "Undoes payments but KEEPS the order insert."
          },
          {
            "line": "COMMIT;",
            "explanation": "Commits the remaining work."
          }
        ]
      },
      {
        "title": "Dirty read prevented",
        "code": "-- Session A\nSET TRANSACTION ISOLATION LEVEL READ COMMITTED;\nBEGIN;\nUPDATE marks SET score = 99 WHERE student = 'asha';\n-- (not committed yet)\n-- Session B sees the OLD score here, not 99",
        "lineByLine": [
          {
            "line": "SET TRANSACTION ISOLATION LEVEL READ COMMITTED;",
            "explanation": "PostgreSQL default: no dirty reads."
          },
          {
            "line": "BEGIN; UPDATE ... 99",
            "explanation": "The change stays private until COMMIT."
          },
          {
            "line": "-- Session B sees the OLD score",
            "explanation": "Uncommitted work is never visible to others."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Idempotent upsert",
        "code": "INSERT INTO inventory (item, qty) VALUES ('dosa', 10)\nON CONFLICT (item)\nDO UPDATE SET qty = inventory.qty + EXCLUDED.qty;",
        "note": "ON CONFLICT turns a duplicate-key crash into an increment - safe to retry sync jobs without double-counting."
      },
      {
        "title": "Deadlock-aware batch update",
        "code": "BEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE acc = 'B';\nUPDATE accounts SET balance = balance + 100 WHERE acc = 'A';\nCOMMIT;",
        "note": "Locking rows in one consistent ORDER prevents circular waits: clerk 1 does A-then-B while clerk 2 does B-then-A - the classic deadlock."
      }
    ],
    "practice": [
      {
        "question": "Wrap two related inserts in one transaction with a savepoint.",
        "hint": "BEGIN, SAVEPOINT, ROLLBACK TO.",
        "answer": "BEGIN;\nINSERT INTO orders (id) VALUES (1);\nSAVEPOINT s1;\nINSERT INTO payments (order_id) VALUES (1);\nROLLBACK TO s1;\nCOMMIT;"
      },
      {
        "question": "Read the balance while locking the row for an update.",
        "hint": "SELECT ... FOR UPDATE.",
        "answer": "BEGIN;\nSELECT balance FROM accounts WHERE acc = 'A' FOR UPDATE;\nUPDATE accounts SET balance = balance - 50 WHERE acc = 'A';\nCOMMIT;"
      },
      {
        "question": "Explain phantom read with an example.",
        "hint": "A range re-query returns extra rows mid-transaction.",
        "answer": "BEGIN;\nSELECT COUNT(*) FROM seats WHERE price < 200;  -- 4 rows\n-- another session inserts a Rs.150 seat and commits\nSELECT COUNT(*) FROM seats WHERE price < 200;  -- 5 rows: a phantom\nCOMMIT;"
      },
      {
        "question": "Why is REPEATABLE READ slower than READ COMMITTED?",
        "hint": "It keeps snapshots/older row versions to guarantee identical re-reads.",
        "answer": "Extra version storage plus more conflict checks mean more blocking and more deadlocks to retry."
      }
    ],
    "interview": [
      {
        "question": "Define ACID precisely.",
        "answer": "Atomicity: partial failure undoes all. Consistency: every constraint still holds after commit. Isolation: concurrent transactions behave as if serialised (per level). Durability: committed data survives a crash."
      },
      {
        "question": "Dirty vs non-repeatable vs phantom read?",
        "answer": "Dirty: reading uncommitted data. Non-repeatable: the same row changed between two reads in one transaction. Phantom: a range re-query returns newly committed rows."
      },
      {
        "question": "FOR UPDATE vs FOR SHARE?",
        "answer": "FOR UPDATE takes an exclusive lock - others cannot update or lock conflicting. FOR SHARE allows concurrent reads but blocks writers."
      },
      {
        "question": "How do you reduce deadlocks?",
        "answer": "Lock rows in one consistent order, keep transactions short, touch the fewest rows needed, add indexes so locks do not escalate, and retry deadlock errors with backoff."
      }
    ]
  },
  {
    "id": "sql-10",
    "title": "Indexes, EXPLAIN & query performance",
    "level": "Advanced",
    "definition": "An index is an extra lookup structure (usually a B-tree) that lets the database find rows without scanning the whole table. EXPLAIN ANALYZE shows the real plan and timing so you can prove a change helped.",
    "analogy": "Like the index pages at the back of a textbook: instead of reading all 800 pages to find Kanyakumari you jump straight there. EXPLAIN is the librarian telling you which path they walked and how long each step took.",
    "keyPoints": [
      "CREATE INDEX ON students (city); speeds lookups on city; UNIQUE INDEX also enforces uniqueness.",
      "Indexes speed up WHERE, JOIN conditions and ORDER BY - but every write must maintain them too.",
      "EXPLAIN shows the plan; EXPLAIN ANALYZE actually runs it and reports real timings and row counts.",
      "Seq Scan = full table read (fine for small tables); Index Scan / Index Only Scan = targeted lookup.",
      "A huge gap between estimated and actual rows usually means stale statistics - run ANALYZE.",
      "Composite index order matters: (city, marks) serves city and city+marks, but not marks alone.",
      "A partial index (WHERE ...) is smaller and only covers the rows you actually query."
    ],
    "basicExamples": [
      {
        "title": "Create and verify an index",
        "code": "CREATE INDEX idx_students_city ON students (city);\nEXPLAIN SELECT * FROM students WHERE city = 'Pune';",
        "lineByLine": [
          {
            "line": "CREATE INDEX idx_students_city ON students (city);",
            "explanation": "Builds a lookup structure on city."
          },
          {
            "line": "EXPLAIN SELECT * FROM ...",
            "explanation": "Prints the plan without running it."
          },
          {
            "line": "Look for Index Scan",
            "explanation": "Index Scan = index used; Seq Scan = table scanned."
          }
        ]
      },
      {
        "title": "Composite index order",
        "code": "CREATE INDEX idx_city_marks ON students (city, marks);\nSELECT * FROM students\nWHERE city = 'Pune' AND marks > 80;",
        "lineByLine": [
          {
            "line": "(city, marks)",
            "explanation": "Leftmost column first - like surname then first name."
          },
          {
            "line": "WHERE city = ... AND marks > 80",
            "explanation": "Both columns are served by this one index."
          },
          {
            "line": "WHERE marks > 80 alone",
            "explanation": "Would NOT use it - the leftmost column is missing."
          }
        ]
      },
      {
        "title": "EXPLAIN ANALYZE real timings",
        "code": "EXPLAIN ANALYZE\nSELECT city, AVG(marks) FROM students\nWHERE marks IS NOT NULL\nGROUP BY city;",
        "lineByLine": [
          {
            "line": "EXPLAIN ANALYZE",
            "explanation": "Actually executes and reports milliseconds per node."
          },
          {
            "line": "GROUP BY city",
            "explanation": "Watch for a Sort or HashAggregate node."
          },
          {
            "line": "Compare before/after",
            "explanation": "The numbers prove whether the index helped."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Partial index for hot queries",
        "code": "CREATE INDEX idx_failed_payments\nON payments (student_id)\nWHERE status = 'failed';\n\nSELECT * FROM payments WHERE status = 'failed';",
        "lineByLine": [
          {
            "line": "WHERE status = failed",
            "explanation": "The index stores only the rows you actually search."
          },
          {
            "line": "Much smaller index",
            "explanation": "Fits in memory, faster scans, cheaper maintenance."
          },
          {
            "line": "Ideal for queues",
            "explanation": "Pending/failed/active rows are usually a small subset."
          }
        ]
      },
      {
        "title": "Covering index avoids table hits",
        "code": "CREATE INDEX idx_cov ON students (city) INCLUDE (marks);\nSELECT city, marks FROM students WHERE city = 'Pune';",
        "lineByLine": [
          {
            "line": "INCLUDE (marks)",
            "explanation": "Extra columns stored in the index leaves."
          },
          {
            "line": "Index Only Scan",
            "explanation": "All needed data is in the index - table never touched."
          },
          {
            "line": "Cost",
            "explanation": "Bigger index, but dramatically faster narrow reads."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Fix the classic anti-pattern",
        "code": "-- SLOW: a function on the indexed column defeats the index\nSELECT * FROM students WHERE LOWER(name) = 'asha';\n\n-- FAST: index the expression you actually query\nCREATE INDEX idx_lower_name ON students (LOWER(name));",
        "note": "Any function wrapped around a column makes a plain index unusable - index the exact expression instead."
      },
      {
        "title": "Pagination without OFFSET slowdown",
        "code": "SELECT * FROM students\nWHERE (marks, id) < (80, 5000)\nORDER BY marks DESC, id DESC\nLIMIT 20;",
        "note": "OFFSET 100000 still walks 100000 rows. Keyset pagination on (marks, id) resumes exactly where the last page stopped."
      }
    ],
    "practice": [
      {
        "question": "Add an index for lookups by email and enforce uniqueness.",
        "hint": "CREATE UNIQUE INDEX.",
        "answer": "CREATE UNIQUE INDEX idx_email ON users (email);"
      },
      {
        "question": "Which index helps WHERE city = ? AND marks > ? but not marks alone?",
        "hint": "Composite with city leftmost.",
        "answer": "CREATE INDEX idx_city_marks ON students (city, marks);"
      },
      {
        "question": "EXPLAIN shows Seq Scan on a 1M-row table - what does it suggest?",
        "hint": "No usable index for that predicate.",
        "answer": "Add an index matching the WHERE columns, then re-run EXPLAIN ANALYZE and compare."
      },
      {
        "question": "Why does LIKE '%sha' not use an index?",
        "hint": "A leading wildcard cannot bound the B-tree range.",
        "answer": "Use a trigram index (pg_trgm) or full-text search for substring matching."
      }
    ],
    "interview": [
      {
        "question": "What is an index and what does it cost?",
        "answer": "A separate lookup structure (B-tree) enabling fast row location. Cost: extra disk space and slower INSERT/UPDATE/DELETE because every write maintains it."
      },
      {
        "question": "Index Scan vs Seq Scan vs Index Only Scan?",
        "answer": "Seq Scan reads every row (fine for small tables). Index Scan finds rows via the index then fetches the table. Index Only Scan answers from the index alone - fastest."
      },
      {
        "question": "Why is composite index order critical?",
        "answer": "It is a sorted structure: (a, b) can satisfy a and a+b but not b alone. Put equality/leftmost filters first, ranges last."
      },
      {
        "question": "How do you prove a query got faster?",
        "answer": "EXPLAIN ANALYZE before and after, comparing total time, rows removed by filter, and node types - never guess."
      }
    ]
  },
  {
    "id": "sql-11",
    "title": "Views, procedures & user-defined functions",
    "level": "Advanced",
    "definition": "A view is a saved named query that behaves like a read-only table. Stored procedures and user-defined functions package multi-statement logic inside the database so many applications share one tested implementation.",
    "analogy": "Like a pre-mixed masala packet in a Kirana shop: instead of every home grinding the same spice mix, the shop prepares it once (CREATE VIEW / CREATE FUNCTION) and everyone just uses the packet by name. A procedure is the restaurant kitchen - you call \"make thali\" and many hidden steps run in order.",
    "keyPoints": [
      "CREATE VIEW active_users AS SELECT ... saves the query; SELECT * FROM active_users then works like any table.",
      "Views do not store data by default (Postgres evaluates the underlying query each time) - excellent for consistent definitions and column hiding.",
      "Materialized views (Postgres) DO cache results - refresh them with REFRESH MATERIALIZED VIEW after data changes.",
      "CREATE FUNCTION f(a int) RETURNS int AS $$ ... $$ LANGUAGE plpgsql lets SQL call reusable logic; RETURNS TABLE returns rows.",
      "GRANT column-level privileges on the base table, then expose only safe columns through the view for security.",
      "ALTER VIEW / DROP VIEW manage them; views can be layered (a view on a view) but keep nesting shallow for debuggability."
    ],
    "basicExamples": [
      {
        "title": "Create and use a view",
        "code": "CREATE VIEW passing_students AS\nSELECT name, marks\nFROM students\nWHERE marks >= 40;\n\nSELECT name FROM passing_students ORDER BY marks DESC;",
        "lineByLine": [
          {
            "line": "CREATE VIEW passing_students AS",
            "explanation": "Saves this query under a name."
          },
          {
            "line": "WHERE marks >= 40;",
            "explanation": "The definition - only passing rows are visible."
          },
          {
            "line": "SELECT name FROM passing_students",
            "explanation": "Queries the view exactly like a table."
          }
        ]
      },
      {
        "title": "A scalar function",
        "code": "CREATE FUNCTION grade_of(marks int) RETURNS char AS $$\nBEGIN\n    RETURN CASE WHEN marks >= 90 THEN 'A'\n                WHEN marks >= 60 THEN 'B'\n                ELSE 'C' END;\nEND;\n$$ LANGUAGE plpgsql;\n\nSELECT name, grade_of(marks) FROM students;",
        "lineByLine": [
          {
            "line": "CREATE FUNCTION grade_of(marks int) RETURNS char AS $$",
            "explanation": "One integer in, one character out."
          },
          {
            "line": "RETURN CASE WHEN marks >= 90 THEN 'A' ...",
            "explanation": "The logic lives in the database, not in every app."
          },
          {
            "line": "grade_of(marks)",
            "explanation": "Called like any built-in function."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Aggregating view for reports",
        "code": "CREATE VIEW city_summary AS\nSELECT city, COUNT(*) AS n, ROUND(AVG(marks), 1) AS avg_marks\nFROM students\nGROUP BY city;\n\nSELECT * FROM city_summary WHERE n >= 5;",
        "lineByLine": [
          {
            "line": "CREATE VIEW city_summary AS",
            "explanation": "Encapsulates a GROUP BY as a reusable report."
          },
          {
            "line": "ROUND(AVG(marks), 1)",
            "explanation": "Aggregates computed inside the view."
          },
          {
            "line": "WHERE n >= 5",
            "explanation": "Filters on the aggregated result afterwards."
          }
        ]
      },
      {
        "title": "A function returning a table",
        "code": "CREATE FUNCTION top_scorers(min_marks int)\nRETURNS TABLE(name varchar, marks int) AS $$\n    SELECT name, marks FROM students WHERE marks >= min_marks ORDER BY marks DESC;\n$$ LANGUAGE sql;\n\nSELECT * FROM top_scorers(85);",
        "lineByLine": [
          {
            "line": "CREATE FUNCTION top_scorers(min_marks int)",
            "explanation": "Takes the cut-off as a parameter."
          },
          {
            "line": "RETURNS TABLE(name varchar, marks int)",
            "explanation": "Returns rows, not a single value."
          },
          {
            "line": "SELECT * FROM top_scorers(85)",
            "explanation": "Parameterised view behaviour."
          }
        ]
      },
      {
        "title": "DROP safely with IF EXISTS",
        "code": "DROP VIEW IF EXISTS pass_report;\nDROP FUNCTION IF EXISTS to_grade(int);\nDROP TABLE IF EXISTS temp_import;",
        "lineByLine": [
          {
            "line": "DROP VIEW IF EXISTS pass_report;",
            "explanation": "Removes the view; IF EXISTS prevents an error if it is already gone."
          },
          {
            "line": "DROP FUNCTION IF EXISTS to_grade(int);",
            "explanation": "Functions are dropped by signature, not just name."
          },
          {
            "line": "DROP TABLE IF EXISTS temp_import;",
            "explanation": "Same safety pattern for tables - re-runnable migration scripts."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Materialized view for dashboards",
        "code": "CREATE MATERIALIZED VIEW daily_sales AS\nSELECT order_date, SUM(amount) AS total\nFROM orders\nGROUP BY order_date;\n\nCREATE INDEX ON daily_sales (order_date);\nREFRESH MATERIALIZED VIEW CONCURRENTLY daily_sales;",
        "note": "Caching a heavy aggregate turns a 30-second dashboard query into milliseconds; CONCURRENTLY allows reads during refresh."
      },
      {
        "title": "View for column-level security",
        "code": "CREATE TABLE users (id serial PRIMARY KEY, email text, password_hash text);\nCREATE VIEW public_users AS SELECT id, email FROM users;\n\nGRANT SELECT ON public_users TO app_role;\nREVOKE ALL ON users FROM app_role;",
        "note": "The app role can never read password_hash - the base table is simply not exposed. Security enforced in the schema, not in app code."
      }
    ],
    "practice": [
      {
        "question": "Create a view of students above 80 marks, ordered by name.",
        "hint": "CREATE VIEW with ORDER BY inside.",
        "answer": "CREATE VIEW toppers AS SELECT * FROM students WHERE marks > 80 ORDER BY name;"
      },
      {
        "question": "Write a function that returns the count of students in a city.",
        "hint": "CREATE FUNCTION ... RETURNS int.",
        "answer": "CREATE FUNCTION city_count(c text) RETURNS int AS $$\n    SELECT COUNT(*) FROM students WHERE city = c;\n$$ LANGUAGE sql;"
      },
      {
        "question": "Hide the phone column from an app using a view.",
        "hint": "Select only the safe columns; revoke base access.",
        "answer": "CREATE VIEW safe_customers AS SELECT id, name, city FROM customers;"
      },
      {
        "question": "Why is a plain view slow on a big aggregation? Fix it.",
        "hint": "Views re-run the query; cache it instead.",
        "answer": "-- Use a materialized view + index:\nCREATE MATERIALIZED VIEW city_stats AS SELECT city, AVG(marks) a FROM students GROUP BY city;"
      }
    ],
    "interview": [
      {
        "question": "View vs materialized view?",
        "answer": "A view stores only the query definition and re-evaluates on every use (always fresh, cost each time). A materialized view stores the RESULT set (fast reads, stale until refreshed). Pick by freshness vs speed."
      },
      {
        "question": "Are views updatable?",
        "answer": "Simple single-table views without aggregates, DISTINCT or GROUP BY often are (INSERT/UPDATE pass through to the base table). Complex views need INSTEAD OF triggers. Views are primarily a read abstraction."
      },
      {
        "question": "Function vs procedure in Postgres?",
        "answer": "Older Postgres only had functions; procedures (CREATE PROCEDURE) arrived in v11 and can COMMIT inside themselves. Functions cannot run transaction control, procedures can."
      },
      {
        "question": "Name three reasons to use views in a real system.",
        "answer": "1) Consistent business definitions shared by all apps. 2) Column-level security (hide password_hash/PII). 3) Backward-compatible schema evolution - reshape columns in a view instead of breaking clients."
      }
    ]
  },
  {
    "id": "sql-12",
    "title": "Analytics: pivots, cohorts & running totals",
    "level": "Advanced",
    "definition": "Analytical SQL answers \"how did things change over time\" questions: CASE pivots rows into columns, FILTER attaches conditions to aggregates, and window functions produce running totals, month-over-month growth and retention cohorts.",
    "analogy": "Like a school annual report: a pivot turns the long attendance register (one row per student per day) into a compact table with a column for each month. A running total is the cumulative fees-collected tally, and a cohort is tracking the whole batch of 2025 students together instead of comparing every student to the school average.",
    "keyPoints": [
      "Pivot pattern: SUM(CASE WHEN month = 1 THEN amount ELSE 0 END) AS jan - one column per bucket.",
      "FILTER is the tidier Postgres form: SUM(amount) FILTER (WHERE month = 1) AS jan.",
      "Running total: SUM(amount) OVER (ORDER BY d) - the frame grows to the current row.",
      "Month-over-month growth needs LAG(amount) OVER (ORDER BY d) to reach the previous row.",
      "Retention cohorts group users by signup month, then measure how many return in later months.",
      "DATE_TRUNC('month', d) buckets timestamps; generate_series() fills gaps so missing months still appear."
    ],
    "basicExamples": [
      {
        "title": "Pivot months into columns",
        "code": "SELECT city,\n       SUM(CASE WHEN month = 1 THEN amount ELSE 0 END) AS jan,\n       SUM(CASE WHEN month = 2 THEN amount ELSE 0 END) AS feb\nFROM sales\nGROUP BY city;",
        "lineByLine": [
          {
            "line": "SELECT city,",
            "explanation": "One row per city."
          },
          {
            "line": "SUM(CASE WHEN month = 1 THEN amount ELSE 0 END) AS jan",
            "explanation": "Sums only January values into its own column."
          },
          {
            "line": "GROUP BY city;",
            "explanation": "Rows become cities, months become columns."
          }
        ]
      },
      {
        "title": "FILTER instead of CASE",
        "code": "SELECT\n    COUNT(*) FILTER (WHERE marks >= 90) AS a_grades,\n    COUNT(*) FILTER (WHERE marks >= 60) AS b_or_above,\n    COUNT(*) AS total\nFROM students;",
        "lineByLine": [
          {
            "line": "COUNT(*) FILTER (WHERE marks >= 90) AS a_grades",
            "explanation": "Same as the CASE version but reads far cleaner."
          },
          {
            "line": "COUNT(*) AS total",
            "explanation": "Unfiltered count for the ratio."
          },
          {
            "line": "FROM students;",
            "explanation": "All columns computed in one pass."
          }
        ]
      },
      {
        "title": "Running total",
        "code": "SELECT order_date, amount,\n       SUM(amount) OVER (ORDER BY order_date) AS running_total\nFROM orders;",
        "lineByLine": [
          {
            "line": "SUM(amount) OVER (ORDER BY order_date)",
            "explanation": "Default frame: unbounded preceding to current row."
          },
          {
            "line": "AS running_total",
            "explanation": "Each row shows the total earned so far."
          }
        ]
      }
    ],
    "guidedExamples": [
      {
        "title": "Month-over-month growth",
        "code": "WITH monthly AS (\n    SELECT DATE_TRUNC('month', order_date) AS m, SUM(amount) AS total\n    FROM orders\n    GROUP BY 1\n)\nSELECT m, total,\n       LAG(total) OVER (ORDER BY m) AS prev,\n       ROUND((total - LAG(total) OVER (ORDER BY m)) * 100.0\n             / NULLIF(LAG(total) OVER (ORDER BY m), 0), 1) AS growth_pct\nFROM monthly;",
        "lineByLine": [
          {
            "line": "LAG(total) OVER (ORDER BY m) AS prev",
            "explanation": "Grabs the previous month total."
          },
          {
            "line": "NULLIF(LAG(total) ..., 0)",
            "explanation": "Prevents division by zero on the first month."
          },
          {
            "line": "ROUND(... , 1) AS growth_pct",
            "explanation": "Percentage change, one decimal."
          }
        ]
      },
      {
        "title": "Fill missing months",
        "code": "SELECT m.month,\n       COALESCE(s.total, 0) AS total\nFROM generate_series('2026-01-01'::date, '2026-12-01'::date, '1 month') AS m(month)\nLEFT JOIN (SELECT DATE_TRUNC('month', order_date) AS mo, SUM(amount) total\n           FROM orders GROUP BY 1) s ON s.mo = m.month;",
        "lineByLine": [
          {
            "line": "generate_series(... '1 month') AS m(month)",
            "explanation": "Generates every month in the year."
          },
          {
            "line": "LEFT JOIN ... ON s.mo = m.month",
            "explanation": "Attaches real sales; missing months stay NULL."
          },
          {
            "line": "COALESCE(s.total, 0)",
            "explanation": "Shows zero instead of blank gaps."
          }
        ]
      }
    ],
    "advancedExamples": [
      {
        "title": "Signup retention cohort",
        "code": "WITH first_seen AS (\n    SELECT user_id, DATE_TRUNC('month', MIN(order_date)) AS cohort\n    FROM orders GROUP BY 1\n)\nSELECT f.cohort,\n       DATE_TRUNC('month', o.order_date) AS active_month,\n       COUNT(DISTINCT o.user_id) AS users\nFROM first_seen f\nJOIN orders o USING (user_id)\nGROUP BY 1, 2\nORDER BY 1, 2;",
        "note": "Group by signup month, then by activity month: the classic cohort retention table used in growth dashboards."
      },
      {
        "title": "Percent of total with window SUM",
        "code": "SELECT city, amount,\n       ROUND(amount * 100.0 / SUM(amount) OVER (), 2) AS pct_of_total,\n       RANK() OVER (ORDER BY amount DESC) AS rnk\nFROM sales;",
        "note": "SUM(amount) OVER () with an empty window is the grand total - each row share of the whole without a second query."
      }
    ],
    "practice": [
      {
        "question": "Pivot sales into jan/feb/mar columns by city.",
        "hint": "SUM(CASE WHEN month=...) per column.",
        "answer": "SELECT city,\n  SUM(amount) FILTER (WHERE month = 1) AS jan,\n  SUM(amount) FILTER (WHERE month = 2) AS feb,\n  SUM(amount) FILTER (WHERE month = 3) AS mar\nFROM sales GROUP BY city;"
      },
      {
        "question": "Add a running total of marks ordered by marks.",
        "hint": "SUM(...) OVER (ORDER BY marks).",
        "answer": "SELECT name, marks, SUM(marks) OVER (ORDER BY marks) AS running FROM students;"
      },
      {
        "question": "Show each city share of total sales as a percentage.",
        "hint": "SUM() OVER () as grand total.",
        "answer": "SELECT city, ROUND(SUM(amount) * 100.0 / SUM(SUM(amount)) OVER (), 2) AS pct FROM sales GROUP BY city;"
      },
      {
        "question": "Compute month-over-month growth safely.",
        "hint": "LAG + NULLIF to avoid divide-by-zero.",
        "answer": "WITH m AS (SELECT DATE_TRUNC('month', d) mo, SUM(a) t FROM s GROUP BY 1)\nSELECT mo, t - LAG(t) OVER (ORDER BY mo) AS change FROM m;"
      }
    ],
    "interview": [
      {
        "question": "How do you pivot rows to columns in standard SQL?",
        "answer": "Conditional aggregation: SUM(CASE WHEN bucket = x THEN value END) - one such expression per target column, plus GROUP BY the row dimension. FILTER is the Postgres shorthand."
      },
      {
        "question": "Running total vs running average - what changes?",
        "answer": "Same OVER (ORDER BY ...) frame; swap SUM for AVG. The default frame grows to the current row, which is what makes it running rather than overall."
      },
      {
        "question": "Why does a LEFT JOIN on generate_series beat a self-join?",
        "answer": "It guarantees every period appears even with zero sales - self-joins can only produce periods that already exist in the data. Charts need the zeros."
      },
      {
        "question": "What is a cohort analysis and why not just average everything?",
        "answer": "Averages hide behaviour differences between signup periods. Cohorts track each signup month separately, revealing retention decay - a flat overall average can conceal a failing product."
      }
    ]
  }
];
