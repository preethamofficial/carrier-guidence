// concepts-8d.js — shared, language-agnostic deep intros (part 5d — Java)
const CONCEPTS = {
java_streams: (L, t) => [
  `Java 8 introduced <b>Streams</b>, a declarative way to process collections: filter, map, sort, reduce, and collect — all in readable, chainable pipelines. A stream expresses <b>what</b> you want from the data, not <b>how</b> to loop through it.`,
  `A stream is <b>built</b> from a source, <b>transformed</b> by intermediate operations (which are lazy and can be chained), and <b>completed</b> by a terminal operation (which triggers the pipeline). Terminal operations consume the stream, so you can only use them once.`,
  `Key operations include <code>filter</code> (keep), <code>map</code> (transform), <code>flatMap</code> (flatten a stream of streams), <code>distinct</code> (unique), <code>sorted</code> (order), and <code>collect</code> (gather into a list, map, or group). <code>Collectors.groupingBy</code> and <code>joining</code> are the most useful for real work.`,
  `<b>Parallel streams</b> (<code>.parallel()</code>) split work across cores, but only use them for CPU-heavy, independent work — they add overhead and are not a free speedup for small or I/O-bound datasets.`,
  `By the end you will process collections with expressive pipelines, avoid the classic pitfalls of parallelism, and write more readable data-processing code.`
],
java_collections: (L, t) => [
  `Java provides a rich set of <b>collections</b> in <code>java.util</code>, each suited to a different question. Choosing the right one is as important as knowing how to use it.`,
  `<code>List</code> (ordered, indexed — <code>ArrayList</code> or <code>LinkedList</code>) and <code>Set</code> (unique items — <code>HashSet</code> or <code>TreeSet</code>) store groups; <code>Map</code> stores key/value pairs (<code>HashMap</code> or <code>TreeMap</code>). <code>Queue</code> models a waiting line (FIFO), and <code>Deque</code> a double-ended one.`,
  `<b>Equality matters:</b> <code>HashSet</code> and <code>HashMap</code> rely on <code>hashCode</code> and <code>equals</code>. If you put a mutable object in a set or use it as a map key, changing its fields changes its hash and the collection breaks — so prefer immutable keys.`,
  `<b>Common pitfall:</b> mixing ordered and unordered expectations. <code>ArrayList</code> keeps insertion order; <code>HashSet</code> does not. If you need both order and uniqueness, use a <code>LinkedHashSet</code>.`,
  `By the end you will choose the right collection for the job, and reason correctly about when elements are ordered, unique, or keyed.`
],
java_modern: (L, t) => [
  `Modern Java blends the old class model with functional and concise idioms: <b>records</b>, <b>pattern matching</b>, <b>streams</b>, and <b>optional</b>. These features let you write Java that is safer, shorter, and free of legacy habits.`,
  `<b>Records</b> are a compact way to declare a transparent data carrier: ${code('record Point(int x, int y) {}')}. They auto-generate <code>equals</code>/<code>hashCode</code>/<code>toString</code>/accessors, so you stop writing boilerplate.`,
  `<b>Pattern matching on instanceof</b> lets you both test a type and <b>declare a variable</b> in one step: ${code('if (obj instanceof String s) { ... }')} — no casting needed. This reduces a classic source of bugs.`,
  `<b>Optional&lt;T&gt;</b> replaces nullable references: it explicitly says a value may be absent, so callers must handle the empty case instead of risking a <code>NullPointerException</code>.`,
  `By the end you will write modern, concise Java, recognise when a record is the right tool, and use <code>Optional</code> to make absence visible in your API design.`
],
};
module.exports = CONCEPTS;
