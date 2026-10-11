// concepts-8c.js — shared, language-agnostic deep intros (part 5c — C#)
const CONCEPTS = {
csharp_linq: (L, t) => [
  `LINQ (Language Integrated Query) brings the power of SQL to C# collections and streams. Instead of writing loops with nested conditionals, you <b>declare</b> what you want: filter, order, group, and project in one readable pipeline.`,
  `The building blocks are <b>extension methods</b> on <code>IEnumerable&lt;T&gt;</code>: <code>Where</code> (keep), <code>Select</code> (transform), <code>OrderBy</code> (sort), <code>GroupBy</code> (organise), and <code>Aggregate</code> (reduce). Each returns an <b>iterator</b>, so the pipeline runs <b>lazily</b> — items are produced only as you consume them.`,
  `Two styles express the same idea: <b>method syntax</b> (chained calls) and <b>query syntax</b> (SQL-like <code>from ... where ... select</code>). Under the hood they compile to the same calls, so pick whichever reads clearer to you.`,
  `<b>A common trap:</b> calling a method that <b>materialises</b> the query (like <code>ToList</code> or <code>Count</code>) inside a loop re-runs the whole query each time. Force one materialisation and reuse it, or let the loop run once.`,
  `By the end you will write concise, readable data pipelines that express intent instead of mechanics — and you will know which parts of a stream are evaluated immediately versus lazily.`
],
csharp_async: (L, t) => [
  `C# has long led the way in making asynchronous code <b>readable</b> with the <code>async</code>/<code>await</code> keywords. Methods marked <code>async</code> may <code>await</code> a <code>Task</code>, pausing only that method while the work happens elsewhere — the thread is never blocked.`,
  `The return type matters: a method returning a value needs <code>Task&lt;T&gt;</code>, and you await the inner value. The <code>async</code> modifier also ensures the right context is captured at the start and restored when the continuation runs, so UI and ASP.NET apps behave correctly.`,
  `<code>async</code> and <code>await</code> do not mean "run on multiple threads". They mean "do not block the thread while waiting". You get true parallelism by awaiting multiple independent tasks at once: <code>await Task.WhenAll(...)</code>.`,
  `<b>Key habit:</b> always handle the failure path. A request can time out or a file can be missing; code that only handles the happy path crashes in the real world. Use <code>try/catch</code> around awaits, never forget to <code>using</code> resources where relevant, and prefer <code>await Task.Delay</code> with a cancellation token over raw <code>Thread.Sleep</code>.`,
  `By the end you will write responsive, scalable code that waits without blocking, and you will understand exactly when work really happens in relation to your await points.`
],
csharp_delegates: (L, t) => [
  `C# functions are first-class, and <b>delegates</b> are the type-safe way to hold and pass them around — a delegate is a method pointer with a signature, so the compiler knows what the target must look like.`,
  `Special kinds of delegates — <b>predicate</b> (returns bool), <b>func</b> (returns a value), and <b>action</b> (no return) — cover the everyday cases cleanly, so you rarely need to declare a delegate by hand.`,
  `Delegates power <b>events</b> and <b>callbacks</b>: a publisher declares a <code>EventHandler</code>-like event, and subscribers attach methods that run when the event fires. The null-safe invocation pattern (<code>Handler?.Invoke(...)</code>) prevents crashes when no one has subscribed.`,
  `<b>A common trap:</b> adding a handler with <code>+=</code> and never removing it with <code>-=</code> causes memory leaks, because the publisher keeps a reference to the subscriber for as long as the handler is attached.`,
  `By the end you will use delegates to build pluggable, event-driven code that separates what happens from who decides it.`
],
};
module.exports = CONCEPTS;
