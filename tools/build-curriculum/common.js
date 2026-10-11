function ex(title, code, lines) {
  const o = { title, code };
  if (lines) o.lineByLine = lines.map(([line, explanation]) => ({ line, explanation }));
  return o;
}
function adv(title, code, note) { return { title, code, note }; }
function pq(question, hint, answer) { return { question, hint, answer }; }
function iq(question, answer) { return { question, answer }; }
module.exports = { ex, adv, pq, iq };
