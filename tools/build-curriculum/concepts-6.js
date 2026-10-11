// concepts-6.js — shared, language-agnostic deep intros (part 4c)
const CONCEPTS = {
// ---------- Rust ----------
rust_ownership: (L, t) => [
  `Rust's superpower — and its steepest learning curve — is <b>ownership</b>. Every value in Rust has exactly <b>one owner</b>, and when that owner goes out of scope, the value is <b>dropped</b> (freed) automatically. No garbage collector, no memory leaks, if you play by the rules.`,
  `Three rules govern this: a value has one owner; you can <b>move</b> it to another owner or <b>borrow</b> it temporarily; and the compiler tracks both so it never frees memory too early. When you pass a value into a function, you usually move it — the original can no longer be used.`,
  `<b>Borrowing</b> is the escape hatch: you can look at a value without taking it. You can have many <b>shared borrows</b> (read-only) or exactly one <b>mutable borrow</b>, but never both at once — this single rule eliminates the entire class of data races.`,
  `<b>A classic trap:</b> keeping a reference to something that was moved, or mutating a value while it is borrowed. Rust's compiler catches both, and the error messages point you to the exact fix.`,
  `Once you internalise ownership, Rust becomes remarkably safe and fast at the same time — a rare combination in systems programming.`
],
rust_structs_enums: (L, t) => [
  `Rust organises data with <b>structs</b> (named fields) and <b>enums</b> (a value that can be one of several named cases). A struct is like a record; an enum describes a choice, and each case can carry its own data.`,
  `The flagship pattern is the <b>enum with data</b>, which replaces special-case values everywhere. Instead of a <code>result = 1</code> meaning "ok" and 2 meaning "error", you declare ${code('enum Result<T, E> { Ok(T), Err(E) }')} and let each case carry what it needs.`,
  `You <b>match</b> an enum with a <b>match expression</b> that handles every case — and the compiler forces you to, making every branch explicit. Patterns let you pull data out of an enum as you match.`,
  `<b>Struct updates</b> let you copy most fields from an existing struct into a new one, and <b>methods</b> live on types via <code>impl</code> blocks. Combined, these form the core way Rust models data and the behaviour on that data.`,
  `By the end you will model real-world data with structs and enums, and use matching to handle every case explicitly and safely.`
],
rust_result_option: (L, t) => [
  `Rust has no exceptions. Instead it uses the <b>Result</b> type to represent success or failure, and the <b>Option</b> type to represent a value that may be absent. These two types are the foundation of safe Rust.`,
  `<code>Result&lt;T, E&gt;</code> is either <code>Ok(T)</code> (success, holding a value) or <code>Err(E)</code> (failure, holding an error). Functions that can fail return <code>Result</code>, and callers <b>match</b> on it — or use the convenient <code>?</code> operator inside functions that themselves return <code>Result</code>.`,
  `<code>Option&lt;T&gt;</code> is <code>Some(T)</code> or <code>None</code>, used whenever a value is not guaranteed to exist. You unwrap it safely: assign a default with <code>unwrap_or</code>, chain with <code>map</code>, or pass it through <code>and_then</code>.`,
  `<b>Why these exist:</b> they force you to think about failure at the call site. Ignoring a <code>Result</code> leaves the compiler annoyed, which means your code simply cannot silently swallow errors.`,
  `This topic teaches you to write functions that communicate error states explicitly, and to handle them with composable, readable code instead of try/catch noise.`
],
};
module.exports = CONCEPTS;
