// concepts-1.js — shared, language-agnostic deep intros (part 1)
const CONCEPTS = {
setup: (L, t) => [
  `Every programmer starts the same way: getting the computer to print one word on the screen. Before we build anything big, we must know how to <b>write a line of ${L.name}, save it in a file, and run it</b> so the computer obeys. That is the whole goal of this lesson.`,
  `Think of a program as a recipe. You write the steps in a plain text file, then a tool — the ${L.name} interpreter or compiler — reads your file and performs each step in order. If a step is written wrong, the tool stops and shows you an <b>error message</b>. Reading those messages calmly is a core skill, not a sign of failure.`,
  `In this lesson you will install the tooling, create your very first file, print a message, and fix your first deliberate mistake. Here is the smallest possible ${L.name} program you are aiming for: ${t.basicExamples && t.basicExamples[0] ? t.basicExamples[0].code.split('\n')[0] : 'print("Namaste")'}.`,
  `<b>Common beginner traps:</b> saving the file with the wrong name or extension, typing "smart quotes" copied from chat apps, and ignoring the spacing or indentation rules ${L.name} cares about. We point each of these out as we go.`,
  `Once you can run code and read errors, everything else — variables, conditions, functions — is just more of the same loop: <b>write, run, read the message, fix, repeat</b>.`
],
variables_types: (L, t) => [
  `A program that only prints fixed text is boring. Real programs <b>remember values</b> and <b>do maths</b> on them. A <b>variable</b> is a named box you can put a value into and read back later.`,
  `Every value in ${L.name} has a <b>type</b> saying what kind of thing it is. The most basic is the <b>integer</b> — a whole number like <code>7</code> or <code>-42</code> with no decimal point. Then come <b>floats</b> (decimals like <code>91.5</code>), <b>booleans</b> (<code>true</code>/<code>false</code>, a yes/no), and <b>strings</b> (text like <code>"Bengaluru"</code>).`,
  `To store an integer you write the name on the left and the value on the right, for example ${t.basicExamples && t.basicExamples[0] ? t.basicExamples[0].code.split('\n').slice(0, 2).join(' ; ') : 'x = 7'}. From then on, using that name substitutes the stored value.`,
  `<b>Operators</b> combine values: ${code('+ - * /')} for maths and ${code('== != < >')} for comparisons. Watch one famous trap: dividing two integers often gives a whole-number result, so <code>7 / 2</code> may become <code>3</code>, not <code>3.5</code>. Always check what a division really returns.`,
  `Types matter because they decide how much memory a value needs and which operations are legal. ${L.name} often stops you from adding a number to text — that is a feature protecting you from silent bugs.`
],
strings: (L, t) => [
  `Text is everywhere in software — names, addresses, error messages, whole web pages. In ${L.name}, text is stored as a <b>string</b>: a sequence of characters between quotes, like ${code('"Asha"')}.`,
  `You can reach into a string by position. The first character is at index <code>0</code> (programmers count from zero), and you can grab a <b>slice</b> — a sub-section — by giving a start and end. You can also join strings and build new text from values, which is how almost every friendly message is printed.`,
  `Strings come with ready-made tools: making text upper or lower case, trimming stray spaces, splitting one long line into pieces, and joining pieces back with a separator. For example ${code('split')} turns <code>"idli,dosa"</code> into a list of two items.`,
  `One important habit: strings are usually <b>immutable</b> — you cannot change one character inside them. Methods return a brand-new string instead. If you try to edit in place you will get an error; the fix is to build a new value.`,
  `In this lesson you will format strings with real values inside them, clean messy user input, and slice out exactly the part you need.`
],
conditions: (L, t) => [
  `So far our programs do the same thing every time. <b>Conditions</b> let a program make decisions: <b>if</b> something is true, do this; <b>otherwise</b>, do that. This is the moment a program starts to feel intelligent.`,
  `The basic shape is ${code('if (something is true) { do this } else { do that }')}. The "something is true" part is a <b>test</b> built with comparison operators like ${code('== != < >')} and joined with <b>and</b>/<b>or</b>. Only one branch runs.`,
  `You can chain many tests with <code>else if</code> (or <code>elif</code>) to handle several cases in order — for example grading marks into A, B, C. ${L.name} also offers compact forms, like a one-line ternary that packs a two-way choice into a single line.`,
  `<b>Watch out:</b> a single <code>=</code> assigns a value while a double <code>==</code> compares two values. Mixing them up is the number-one beginner bug. Another trap: empty or zero values usually count as "false" in a test.`,
  `By the end you will write programs that react to input, validate a login, and choose between many outcomes cleanly.`
],
};
module.exports = CONCEPTS;
