// concepts-2.js — shared, language-agnostic deep intros (part 2a)
const CONCEPTS = {
loops_control: (L, t) => [
  `Computers are brilliant at doing one thing thousands of times without getting bored. A <b>loop</b> tells ${L.name} to repeat a block of code. Instead of copying the same line 100 times, you write it once and let the loop run it 100 times.`,
  `The most common loop is the <b>for</b> loop, used when you know how many times to repeat or when you want to walk through a list item by item. The <b>while</b> loop repeats as long as a condition stays true — perfect when you do not know the count in advance, like reading input until the user types "done".`,
  `Two special words control loops: <code>break</code> jumps out immediately, and <code>continue</code> skips the rest of this round and starts the next one. Together they let you search a list and stop the instant you find what you want.`,
  `<b>Beware the infinite loop:</b> if a <code>while</code> test can never become false, your program runs forever and the window freezes. Always make sure something inside the loop moves it toward the exit — a counter that increases, or a flag that flips.`,
  `${L.name} also gives shortcuts like <b>comprehensions</b> that build a whole list in one readable line. This lesson covers all of these so you can pick the clearest tool for the job.`
],
functions_methods: (L, t) => [
  `As programs grow, repeating the same block of code becomes messy. A <b>function</b> (or method) packages steps under a name so you can <b>reuse</b> them anywhere by just calling that name. This is the biggest leap toward clean, professional code.`,
  `A function has three parts: a <b>name</b>, <b>parameters</b> (the inputs it expects), and a <b>body</b> (the steps). It can <code>return</code> a result back to whoever called it. Calling ${code('add(4, 6)')} runs the body with 4 and 6 and gives you back the answer.`,
  `Parameters can have <b>default values</b> so callers may omit them, and functions can accept a variable number of extra inputs. ${L.name} distinguishes the values you pass in (arguments) from the names that receive them (parameters).`,
  `A powerful idea is <b>scope</b>: variables created inside a function usually live only inside it. Keeping variables inside functions prevents one part of the program from accidentally breaking another.`,
  `By the end you will break a big task into small, testable functions — the single habit that separates beginner scripts from real applications.`
],
collections: (L, t) => [
  `A single variable holds one value, but real problems involve <b>many</b> values: all students in a class, every item in a cart, a whole table of rows. <b>Collections</b> are containers that hold groups of values so you can store, search, and update them together.`,
  `The everyday kinds are a <b>list/array</b> (an ordered row of items you can grow or shrink), a <b>set</b> (unique items, great for removing duplicates and fast lookups), and a <b>dictionary/map</b> (pairs a key with a value, like a real dictionary pairs a word with its meaning).`,
  `You add items, remove items, count them, sort them, and — most importantly — <b>loop through them</b> to process each one. A dictionary lookup such as ${code('marks["asha"]')} finds a value instantly by its key.`,
  `<b>A subtle trap:</b> copying a list with ${code('b = a')} often makes two names for the <i>same</i> container, so changing one changes the other. When you want an independent copy, make one explicitly. Empty containers also behave as "false" in tests, which is handy.`,
  `Mastering collections is essential because almost every program is really just "put data in a container, then loop over it and do something".`
],
};
module.exports = CONCEPTS;
