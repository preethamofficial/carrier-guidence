// concepts-4.js — shared, language-agnostic deep intros (part 4a)
const CONCEPTS = {
// ---------- JavaScript ----------
js_dom_events: (L, t) => [
  `A static web page only looks good. ${code('document')} gives JavaScript access to every element on the page, and an <b>event</b> is something the browser announces — a click, a key press, a page finishing loading. You "listen" for an event and run your code when it happens.`,
  `For example, ${code('button.addEventListener("click", () => { ... })')} tells the page: "when this button is clicked, run this function". Events bubble and capture, so you can listen on a parent and catch clicks on any child.`,
  `Forms go through events too. Instead of submitting a page and reloading, you intercept the form's submit event, read what the user typed, send it to a server, and update the page without a refresh.`,
  `<b>A common trap:</b> reusing the same handler function object means the event reference never matches exactly; prefer named functions or a stable reference. Also remember to clean up event listeners when you remove elements, or memory leaks build up.`,
  `By the end you will make a page that reacts to clicks, keys, and form input — the heart of every interactive web app.`
],
js_spread_destructure: (L, t) => [
  `Destructuring and spreading let you pull values out of arrays and objects, or copy/merge them, in a single readable line. It is the workhorse of modern JavaScript data handling.`,
  `<b>Destructuring</b> reads: ${code('const [a, b] = numbers')} takes the first two items into named variables, and ${code('const { name, age } = user')} pulls object properties out too. You can skip items, use defaults, and rename them.`,
  `<b>Spreading</b> copies and merges: ${code('const all = [...a, ...b]')} or ${code('const copy = { ...user }')} builds new structures without mutating the originals. It powers the <b>rest pattern</b>, which collects the remaining items into an array.`,
  `<b>Beware:</b> spreading only does a shallow copy — nested objects are still shared. If you mutate a nested object in a "copy", the original changes. That is usually fine, but worth knowing when React and state-owned data are involved.`,
  `Use these every day; they make data transformation concise and prevent the accidental mutation bugs that plague larger apps.`
],
js_iterators: (L, t) => [
  `An <b>iterator</b> is a precise way to walk through a collection one item at a time. Conceptually it is an object with a <code>next()</code> method that returns each item, plus a flag saying whether there is more.`,
  `JavaScript hides most of this behind <b>for...of</b>, which works on anything iterable: arrays, strings, maps, sets, and even the arguments object. Behind the scenes it just calls <code>next()</code> again and again.`,
  `Generators are functions that <code>yield</code> values one at a time and freeze between calls, letting you build infinite or carefully paced sequences. They pair naturally with the <b>iterator protocol</b>, so you can customise exactly what counts as "one step".`,
  `<b>Why it matters:</b> iterators let you process huge or even infinite data streams without loading everything into memory, and they are the engine behind <b>map</b>, <b>filter</b>, and <b>reduce</b>.`,
  `This topic closes the loop on collections: you will know not just how to use them, but how the machinery under the hood actually works.`
],
};
module.exports = CONCEPTS;
