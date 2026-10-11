// concepts-5.js — shared, language-agnostic deep intros (part 4b)
const CONCEPTS = {
// ---------- TypeScript ----------
ts_interfaces_types: (L, t) => [
  `${L.name} adds <b>type annotations</b> so the compiler knows what shape of data a value will have. A <b>type</b> declares the shape of an object; an <b>interface</b> is the same idea written the way humans describe it — "a User has a name (string) and an age (number)".`,
  `Interfaces are open: you can describe the same shape across multiple declarations, and ${L.name} merges them. Type aliases are equivalent but cannot be reopened, which is useful for unions and primitives.`,
  `Both tell you what is <b>required</b> vs optional <code>?</code> and what the function must look like (parameters and return type). You can <b>assign</b> a value to a type only if it matches — this is the compile-time guard that catches mistakes early.`,
  `<b>Type vs interface:</b> interfaces describe object shapes; types describe anything (unions, tuples, mapped types). Modern teams mostly reach for interfaces for objects and types for everything else.`,
  `By the end you will read and write type annotations confidently, and understand that every type error is the compiler telling you where a real bug is hiding.`
],
ts_utility: (L, t) => [
  `The TypeScript <b>utility types</b> are built-in, reusable transformations of existing types — think of them as factory functions that build new shapes from old ones.`,
  `The most useful are <code>Partial&lt;T&gt;</code> (make every property optional), <code>Readonly&lt;T&gt;</code> (make everything read-only), <code>Pick&lt;T,K&gt;</code> (choose a few keys), and <code>Omit&lt;T,K&gt;</code> (drop a few keys).`,
  `<code>Record&lt;K,T&gt;</code> builds an object type whose keys are K and values are T; <code>ReturnType&lt;F&gt;</code> captures what a function returns. The key to understanding them is that they are just <b>mapped type</b> patterns — you will see the same shape all over the standard library.`,
  `<b>Why it matters:</b> without them you would keep hand-writing variations of the same shape. With them, changing one source type automatically flows through the rest of the codebase.`,
  `This topic gives you the vocabulary to keep types small, consistent, and easy to update as the app grows.`
],
ts_advanced_types: (L, t) => [
  `Beyond basic annotations, ${L.name} gives you <b>conditional types</b> and <b>mapped types</b> that build types based on other types — the machinery behind nearly every library type.`,
  `A <b>conditional type</b> is a type-level <code>if/else</code>: ${code('T extends U ? A : B')} evaluates to A if T is assignable to U, otherwise B. It lets you express "if this thing is a function, its return type is X".`,
  `<b>Mapped types</b> transform every property of an object type at once, like making all properties optional or readonly. <b>Template literal types</b> build strings from patterns, and <b>union types</b> describe a value that is exactly one of several shapes.`,
  `<b>Key insight:</b> type inference works hand-in-hand with these. Write the transformation, and ${L.name} infers the concrete shape for you — no manual repetition, no drift.`,
  `This topic is optional for everyday use, but it unlocks the type definitions of the most powerful libraries and makes you fluent in the language's type system.`
],
};
module.exports = CONCEPTS;
