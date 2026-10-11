// concepts-8b.js — shared, language-agnostic deep intros (part 5b — Go HTTP/JSON + Cloud)
const CONCEPTS = {
go_http_json: (L, t) => [
  `Go is widely used for web services because the standard library makes <b>HTTP</b> and <b>JSON</b> almost effortless. A handler receives a request and writes a response using the <code>http</code> package, all in one runtime.`,
  `You define a struct whose fields carry <b>JSON tags</b> that map names to keys exactly as the client expects: ${code('`json:"name"`')} or ${code('`json:"full_name,omitempty"`')}). The tag <code>omitempty</code> skips zero values, keeping payloads clean.`,
  `<b>Input:</b> decode the request body with <code>json.NewDecoder(r.Body).Decode(&amp;target)</code>, then validate. <b>Output:</b> encode at the end with <code>json.NewEncoder(w).Encode(&amp;data)</code> and set the content-type header.`,
  `<b>Watch the rules:</b> pointers distinguish "missing" from "zero" (handy for optional fields), <code>json.RawMessage</code> lets you defer parsing, and streams let you handle large payloads without holding them all in memory.`,
  `By the end you will build a small REST API that parses JSON, validates it, and returns correct, well-formed responses — the foundation of Go backends.`
],
go_cloud: (L, t) => [
  `Go's killer app beyond servers is <b>cloud-native</b> tooling: Kubernetes was written in Go, and Go is the language of modern infrastructure. This topic shows how Go's design serves that world.`,
  `Go compiles to a single static binary with no runtime dependencies — you copy one file and it runs anywhere. That makes containerising, deploying, and moving services trivial, and it is why Go dominates cloud tooling and CLIs.`,
  `<b>Concurrency with channels</b> gives you safe, readable pipelines: start a goroutine, send results downstream, coordinate with <code>select</code> and <code>sync.WaitGroup</code>, and shut everything down cleanly.`,
  `<b>The standard library is your friend:</b> <code>net/http</code> covers the web, <code>context</code> propagates deadlines and cancellations, <code>testing</code> gives you the framework, and <code>flag</code>/<code>cobra</code> build CLIs. You need few third-party dependencies to start.`,
  `By the end you will see why Go is the default choice for modern cloud systems and how to write code that is fast to deploy, safe to scale, and a pleasure to debug.`
],
};
module.exports = CONCEPTS;
