// concepts-2b.js — shared, language-agnostic deep intros (part 2b)
const CONCEPTS = {
errors_files: (L, t) => [
  `Programs do not live in a perfect world: users type wrong input, files go missing, networks fail. <b>Error handling</b> is how your program survives surprises instead of crashing with a scary message.`,
  `The pattern is <b>try / catch</b>: you <i>try</i> something risky, and if it fails you <i>catch</i> the problem and respond calmly — showing a friendly message instead of dying. ${L.name} also lets you create your own meaningful errors and throw them when something is invalid.`,
  `Separately, <b>files</b> let your program keep data after it closes: reading a saved list, or writing results to disk. You open a file, read or write, and always close it. <b>Modules</b> let you split one big file into many small ones and reuse code across projects.`,
  `<b>Good habits:</b> catch only the specific error you expect (not everything), never hide an error silently, and always release files/resources even when something goes wrong. Trusting user input without checking it is the root of most real crashes.`,
  `After this lesson your programs will be robust: they validate input, handle failure calmly, and save data that lasts beyond a single run.`
],
oop_classes: (L, t) => [
  `Everything so far has been <b>data</b> (variables) and <b>behaviour</b> (functions) kept separate. <b>Object-Oriented Programming (OOP)</b> bundles related data and the actions on that data into one thing called an <b>object</b>, built from a blueprint called a <b>class</b>.`,
  `If a class is the <b>blueprint</b> for a house, an object is an actual house built from it. The blueprint says "a Student has a name and marks"; each student you create is an object with its own values. Inside a class, variables become <b>properties/fields</b> and functions become <b>methods</b> that act on that object.`,
  `You create an object with ${code('new')} (or by calling the class), and it starts with its own copy of the data. Methods can read and change that object's data, keeping everything about one "thing" in one place.`,
  `OOP is popular because it <b>models the real world</b> and keeps big programs organised: a BankAccount object knows how to deposit and withdraw, and no other part of the code needs to fiddle with its balance directly.`,
  `This lesson introduces classes, objects, fields, methods, and constructors — the vocabulary you will use in almost every larger application.`
],
inheritance_poly: (L, t) => [
  `Once you have classes, you notice repetition: a <code>Dog</code> and a <code>Cat</code> both have a name and can eat. <b>Inheritance</b> lets one class reuse another: a shared <code>Animal</code> holds what is common, and <code>Dog</code>/<code>Cat</code> only add what is special.`,
  `The child class <b>inherits</b> the parent's fields and methods, and can also <b>override</b> a method to do it differently. This models "is-a" relationships: a Dog <i>is an</i> Animal.`,
  `<b>Polymorphism</b> ("many shapes") means the same call behaves differently depending on the actual object. If both Dog and Cat override <code>speak()</code>, calling ${code('speak()')} on each produces the right sound without you checking types.`,
  `Used well, inheritance removes duplication and makes code flexible; used badly (very deep chains) it becomes hard to follow. Modern advice: prefer <b>composition</b> — building objects from smaller parts — when "has-a" fits better than "is-a".`,
  `This lesson shows how to build class hierarchies, override behaviour, and use polymorphism to write code that works for many types at once.`
],
interfaces_packages: (L, t) => [
  `Big programs are built by many parts agreeing on shared contracts. An <b>interface</b> is a promise: "any class of this kind will provide these methods", without saying exactly how. Different classes can fulfil the same promise in their own way.`,
  `This is what lets you write code against a contract and swap the real implementation later — for example, code that "saves" something works whether you save to a file, a database, or the cloud, as long as they all follow the same interface.`,
  `${L.name} also helps you organise code into <b>packages/namespaces/modules</b> so related classes live together and do not clash with others. You group files, control what is public, and import what you need.`,
  `Interfaces pair naturally with <b>polymorphism</b> and with <b>dependency injection</b> — handing an object the tools it needs instead of building them itself, which makes testing far easier.`,
  `By the end you will design clean contracts and organise code the way real teams do, so large projects stay manageable.`
],
};
module.exports = CONCEPTS;
