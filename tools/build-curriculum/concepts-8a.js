// concepts-8a.js — shared, language-agnostic deep intros (part 5a — Go)
const CONCEPTS = {
go_structs_interfaces: (L, t) => [
  `Go is not class-based, so it models data with <b>structs</b> (named fields) and behaviour with functions that <b>attach</b> to them via <code>methods</code>. Together they form a lightweight, explicit alternative to OOP.`,
  `A struct is a named group of fields: ${code('type User struct { Name string; Age int }')}. Methods are functions with a <b>receiver</b> that "belongs" to the type: ${code('func (u User) Desc() string { return u.Name + " is " + strconv.Itoa(u.Age) + " years old" }')}.`,
  `Go uses <b>interfaces</b> only for behaviour — a type implements an interface <b>implicitly</b>, by providing the methods. This makes composition the default and removes the need for type hierarchies.`,
  `<b>A key subtlety:</b> method receivers can be <b>value</b> or <b>pointer</b>. A value receiver reads a copy; a pointer receiver mutates the original and is also required when the type contains slices or maps you intend to change. Confusing the two is a frequent cause of bugs.`,
  `By the end you will write Go code that is explicit, composable, and easy to reason about — the Go way.`
],
go_embedding: (L, t) => [
  `Go has no inheritance, so it achieves reuse with <b>struct embedding</b> (and interface embedding). Embedding a struct inside another places its fields and methods <b>promoted</b> into the outer type, as if you had written them by hand.`,
  `Embedding is <b>not</b> subtyping: you can still tell the two types apart, and you are not forced into deep hierarchies. It means "has-a" plus a convenient way to delegate — <code>admin.User</code> can read all of <code>User</code>'s methods directly while adding its own.`,
  `<b>A common trap:</b> when two embedded types have methods with the same name, the compiler resolves the outer one first and gives an ambiguous error if both could apply. You resolve it by writing an explicit method on the outer type that delegates.`,
  `You can also <b>embed interfaces</b>, so one interface naturally becomes a group of smaller ones — a pattern that keeps interfaces small and composable (the <code>io.Reader</code>/<code>io.Writer</code> model).`,
  `Embedding is Go's answer to "sharing code without class inheritance" — pick it when a "has-a" relationship and delegation fit, and your code stays clear.`
],
};
module.exports = CONCEPTS;
