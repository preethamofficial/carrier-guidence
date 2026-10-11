const { ex } = require('./common.js');

// Fifth line-by-line example for the early lessons that only had four.
module.exports = {
  'python-1': [
    ex('Comments and print()', `# This line is a note for humans, Python ignores it
print("Namaste, CodeAtlas!")
print(1 + 2)
print("Age:", 21)`, [['# This line is a note for humans, Python ignores it', 'Comments start with # and never run.'], ['print("Namaste, CodeAtlas!")', 'Prints text exactly as written.'], ['print("Age:", 21)', 'Comma-separated items get a space between them.']])
  ],
  'python-2': [
    ex('Converting between types', `marks = "92"
print(int(marks) + 8)
print(str(2026))
print(float("91.5"))`, [['marks = "92"', 'A string, even though it looks like a number.'], ['print(int(marks) + 8)', 'int() turns text into a number so maths works.'], ['print(float("91.5"))', 'float() handles the decimal point.']])
  ],
  'python-3': [
    ex('Escapes and triple quotes', `bill = "Item: dosa\\tRs.60"
print(bill)
note = """Line one
Line two"""
print(note)`, [['bill = "Item: dosa\\tRs.60"', '\\t is a tab, \\n is a newline escape.'], ['print(bill)', 'The tab spaces out the columns.'], ['note = """Line one', 'Triple quotes hold text across several lines.']])
  ],
  'javascript-1': [
    ex('Console output and comments', `// Single-line comment for readers
console.log("Namaste, CodeAtlas!");
console.log(1 + 2);
console.log("Age:", 21);`, [['// Single-line comment for readers', '// comments never execute.'], ['console.log("Namaste, CodeAtlas!");', 'Prints text to the browser/Node console.'], ['console.log("Age:", 21);', 'Multiple arguments print space-separated.']])
  ],
  'javascript-2': [
    ex('Explicit conversion', `let marks = "92";
console.log(Number(marks) + 8);
console.log(String(2026));
console.log(parseFloat("91.5"));`, [['let marks = "92";', 'A string that merely looks numeric.'], ['console.log(Number(marks) + 8);', 'Number() converts before the addition happens.'], ['console.log(String(2026));', 'String() goes the other way.']])
  ],
  'typescript-1': [
    ex('Reading compile errors', `let city: string = "Bengaluru";
// let city: string = 2026; // ERROR: Type 'number' is not assignable to type 'string'
console.log(city.length);`, [['let city: string = "Bengaluru";', 'The annotation promises a string.'], ['// let city: string = 2026; // ERROR...', 'Assigning a number is caught before running.'], ['console.log(city.length);', 'Safe because the compiler guarantees a string.']])
  ],
  'typescript-2': [
    ex('Type-safe conversion', `let raw: string = "92";
let marks: number = Number(raw);
console.log(marks + 8);`, [['let raw: string = "92";', 'Text arriving from a form or file.'], ['let marks: number = Number(raw);', 'Convert first, then annotate the number.'], ['console.log(marks + 8);', 'Real addition instead of "928".']])
  ],
  'java-1': [
    ex('Comments and output', `public class Main {
    public static void main(String[] args) {
        // A comment for readers; the compiler ignores it
        System.out.println("Namaste, CodeAtlas!");
        System.out.println(1 + 2);
    }
}`, [['// A comment for readers...', 'Comments start with // and never run.'], ['System.out.println("Namaste, CodeAtlas!");', 'Prints the text, then a newline.'], ['System.out.println(1 + 2);', 'Adds first, then prints 3.']])
  ],
  'java-2': [
    ex('Parsing text to numbers', `public class Main {
    public static void main(String[] args) {
        String marks = "92";
        int total = Integer.parseInt(marks) + 8;
        double price = Double.parseDouble("91.5");
        System.out.println(total + " " + price);
    }
}`, [['String marks = "92";', 'Numeric text from input or a file.'], ['int total = Integer.parseInt(marks) + 8;', 'Parse before arithmetic, or it will not compile.'], ['double price = Double.parseDouble("91.5");', 'The decimal variant.']])
  ]
};
