// concepts-3.js — shared, language-agnostic deep intros (part 3)
const CONCEPTS = {
generics: (L, t) => [
  `Suppose you write a box that holds one integer, then another that holds one string, then another for every type — that is endless repetition. <b>Generics</b> let you write the box <b>once</b> as "a box of some type T", and ${L.name} fills in the real type each time you use it.`,
  `You will see generics everywhere: a list of students, a map of name-to-score, a function that returns "whatever type you gave me". They give you <b>reuse without losing type safety</b> — the compiler still knows exactly what is inside.`,
  `A generic is written with angle brackets, like ${code('Box<T>')} or ${code('List<Student>')}). You can even limit what T is allowed to be (a <b>bound</b>), so you can safely call the methods you rely on.`,
  `<b>Why it matters:</b> generics catch mistakes at compile time. If a list is declared to hold only students, trying to sneak a number in is rejected before the program ever runs — far better than a crash later.`,
  `This lesson teaches you to read and write generic types so library code like collections makes complete sense.`
],
async_promises: (L, t) => [
  `Some tasks take time — fetching data from a server, reading a big file, waiting for a timer. If the program just froze until each finished, apps would feel broken. <b>Asynchronous</b> programming lets ${L.name} start a slow task and keep going, then come back when the result is ready.`,
  `The core idea is a <b>promise</b>: a placeholder that says "I will give you a value later — either a success or a failure". You attach what should happen on success and what should happen on error, instead of blocking.`,
  `Modern ${L.name} uses the keywords ${code('async')} and ${code('await')} so asynchronous code <i>reads</i> like normal step-by-step code, even though it does not block. Underneath it is still promises, but ${code('await')} hides the messy nesting.`,
  `<b>Key habit:</b> always handle the failure path. A request can time out or a file can be missing; code that only handles the happy path crashes in the real world. Also remember that several async tasks can run at the same time and may finish in any order.`,
  `By the end you will fetch real data, wait for it, handle errors, and understand why the rest of the app keeps responding while a request is in flight.`
],
concurrency: (L, t) => [
  `A single thread does one thing at a time, but real services juggle thousands of tasks: serving many users, reading many files, waiting on many network calls. <b>Concurrency</b> is about structuring a program to make progress on several tasks at once, overlapping the waiting.`,
  `${L.name} has its own model for this. You start lightweight workers that run independently and let them talk to each other through safe channels — instead of fighting over shared memory, they <b>send and receive messages</b>.`,
  `This "share memory by communicating" idea removes a huge class of bugs. You must still coordinate: two workers writing the same data at once can corrupt it, so you use locks, channels, or immutable data.`,
  `Patterns you will meet include waiting for a group of tasks to finish, racing several operations with a timeout, and cancelling work that is no longer needed. Each solves a real production headache.`,
  `After this lesson you will write programs that use the machine properly and stay correct — the foundation of fast, reliable servers.`
],
testing_debug: (L, t) => [
  `Anyone can write code that works on the happy path. Professionals write code that <b>keeps</b> working — and they prove it with <b>tests</b>. A test is a small piece of code that checks another piece of code gives the expected answer.`,
  `<b>Debugging</b> is the partner skill: when something is wrong, you find out <i>why</i>. You read the error, form a guess, add a print or use a debugger to inspect values, and confirm the cause before fixing. Guessing without looking wastes hours.`,
  `Good tests cover the <b>edge cases</b> too: empty input, the largest allowed value, missing data, and invalid types. ${L.name} gives you testing tools and a way to keep your project's dependencies separate (a virtual environment or module system) so your work is reproducible.`,
  `<b>Habit to build:</b> when you fix a bug, first write a test that fails because of the bug, then fix the code until the test passes. This "test first" loop prevents the same bug from ever coming back.`,
  `This lesson ties everything together: an environment you control, tests you trust, and a calm debugging method you can rely on for the rest of your career.`
],
};
module.exports = CONCEPTS;
