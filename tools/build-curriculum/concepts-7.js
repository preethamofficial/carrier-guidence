// concepts-7.js — shared, language-agnostic deep intros (part 4d)
const CONCEPTS = {
rust_traits: (L, t) => [
  `A <b>trait</b> is Rust's way of saying "this type can do this thing". It is like an interface in other languages: you declare a set of methods, and any type that provides them "implements" the trait.`,
  `Traits define <b>behaviour</b>, not data. Instead of coupling a function to a specific struct, you write it against a trait — so the same function works for a <code>File</code>, a <code>Vec</code>, or a custom type, as long as they all implement the trait.`,
  `Traits can <b>inherit</b> from each other, and you can make them <b>default</b> implementations of methods, so only the essential logic needs to be written by you. You can also <b>implement a trait for a type</b> from a library you do not control (external traits on external types).`,
  `<b>Trait objects</b> (<code>dyn Trait</code>) let you store different types behind a common interface at runtime, enabling polymorphism without inheritance.`,
  `This topic is central to Rust's design: you will write your own traits, implement them for your types, and understand the small but powerful standard traits that make Rust data structures compose.`
],
rust_iterators: (L, t) => [
  `Rust's <b>iterators</b> combine the convenience of a loop with the safety of a single pass. An iterator is a value that can be asked for the next item, and chaining methods transforms, filters, and folds it step by step.`,
  `Methods like <code>map</code>, <code>filter</code>, <code>enumerate</code>, and <code>flat_map</code> read like a clear recipe: turn each item, keep the ones you want, number them, flatten nested results. The magic is that they do <b>not</b> produce intermediate collections — the work happens lazily as you consume the iterator.`,
  `<code>for</code> loops desugar into iterator calls, so every loop you write is already idiomatic if you let it be. The final step — <code>collect</code> — gathers the result into a collection in one line, and you choose what kind (<code>Vec</code>, <code>HashMap</code>, etc.).`,
  `<b>A common pitfall:</b> calling a method that consumes the iterator (like <code>find</code> or <code>sum</code>) after you already consumed it, because many methods consume the iterator rather than borrowing it. Chaining carefully avoids this.`,
  `This topic teaches you to process data with composable, zero-copy pipelines instead of manually managing indices and temporary vectors.`
],
rust_smart_pointers: (L, t) => [
   `Sometimes you genuinely need more control over memory. <b>Smart pointers</b> are types that own and manage a heap allocation, adding behaviour like reference counting or lending. The three most important are <code>Box&lt;T&gt;</code> (one owner), <code>Rc&lt;T&gt;</code> (shared read-only ownership), and <code>RefCell&lt;T&gt;</code> (interior mutability — you can mutate even through an immutable reference).`,
   `<code>Box&lt;T&gt;</code> is the everyday escape hatch when a value is too big to fit on the stack, or you need to transfer ownership at runtime. It is guaranteed to be dropped when it goes out of scope, so you still get automatic memory management.`,
   `<code>Rc&lt;T&gt;</code> lets many parts of your program share one value, but since the reference count never goes down on drop, it can cause memory leaks if you accidentally create a cycle — a cycle of reference counts never reaching zero.`,
   `<code>RefCell&lt;T&gt;</code> relaxes Rust's borrowing rules at runtime: you can mutate an interior value even through an immutable reference, and it checks at runtime whether you have a mutable borrow currently active. It trades compile-time safety for flexibility when you truly need it.`,
   `By the end you will reach for the right smart pointer for each job, and understand the tradeoffs between compile-time safety and runtime flexibility.`
],
};
module.exports = CONCEPTS;
