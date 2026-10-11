const fs = require("fs");
const content = [
"// concepts-8e.js — shared, language-agnostic deep intros (part 6 — default + python)",
"const CONCEPTS = {",
"__default__: (L, t) => [",
"  `This topic, \"${t.title}\", is your step into a bigger idea, and it builds directly on everything you have learned so far. We will start from the very beginning: what this concept actually means, why it exists, and how it is used in everyday programs — never assuming you already know the jargon.`,",
"  `At its core, ${t.definition.toLowerCase()}. If you are not sure of a word we use, pause and check it: each one is defined in plain language in the key points that follow.`,",
"  `Think about it through a real-world analogy before touching code: ${t.analogy}. This mental picture is the fastest way to remember the shape of the idea when you meet it again in a real project.`,",
"  `The key points below are the minimum you need. Notice how each one connects to the last — that is how knowledge sticks. After each point you will see a tiny example you can run, followed by one that slowly grows in difficulty, so you can watch the idea work from start to finish.`,",
"  `Never stop at reading the examples. Type them into your editor, change a value, break it on purpose, and read the error. That loop — write, run, break, fix — is where the concept becomes yours.`,",
"  `Finally, test yourself with the practice questions and the interview questions. The interview questions are the \"why\" behind the \"how\": they are the ones that reappear in real work and in technical interviews, and we have written them to be answerable from the explanations above.`",
"],",
"python: (L, t) => CONCEPTS.python_setup(L, t),",
"python_setup: (L, t) => [",
"  `Python is a high-level, interpreted language. You write human-readable code in a .py file, and the interpreter runs it line by line — no separate compile step. This lesson gets you from a blank file to a working first program.`,",
"  `You install Python 3.10+, open a terminal, and run ${'python file.py'} from the folder that holds your script. The print() function shows output; input() pauses and reads what the user types (always as text).`",
"  `The first line you will type is a greeting: ${'print(\"Namaste, CodeAtlas!\")'}. Saving and running it correctly is a small victory — every other lesson starts from this exact step.`",
"  `<b>Common traps:</b> using smart quotes in source code, saving with a wrong extension, and — the most famous — inconsistent indentation. Python uses 4 spaces per level; mixing tabs and spaces raises an IndentationError.`",
"  `Once you can run code and read errors, the rest of Python is the same loop: <b>write, run, read the message, fix, repeat</b>.`",
"],",
"};",
"module.exports = CONCEPTS;",
].join("\n");
fs.writeFileSync("c:/Users/preet/Downloads/CodeAtlas_Website_v1_13/tools/build-curriculum/concepts-8e.js", content);
console.log("wrote concepts-8e.js");
