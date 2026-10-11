const fs = require('fs');

// Replace the lesson object whose `id` matches, preserving the trailing comma.
function swap(file, id, newFile) {
  const p = __dirname + '/' + file;
  let src = fs.readFileSync(p, 'utf8');
  const anchor = "id: '" + id + "',";
  const start = src.indexOf(anchor);
  if (start < 0) throw new Error('anchor not found: ' + id);
  const objStart = src.lastIndexOf('{', start);
  // Find the matching closing brace of this object literal.
  let depth = 0, i = objStart;
  for (; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') { depth--; if (depth === 0) break; }
  }
  const objEnd = i + 1; // exclusive
  const body = fs.readFileSync(__dirname + '/' + newFile, 'utf8').trim();
  // Preserve a trailing comma if the original had one.
  let after = objEnd;
  while (after < src.length && /\s/.test(src[after])) after++;
  const comma = src[after] === ',' ? ',' : '';
  src = src.slice(0, objStart) + body + comma + src.slice(after === objEnd ? objEnd : after + (comma ? 1 : 0));
  fs.writeFileSync(p, src);
  console.log('replaced ' + id + ' in ' + file);
}

swap('sql.js', 'sql-11', 'new-sql11.txt');
swap('sql.js', 'sql-12', 'new-sql12.txt');
swap('rust.js', 'rust-9', 'new-rust9.txt');
swap('rust.js', 'rust-11', 'new-rust11.txt');