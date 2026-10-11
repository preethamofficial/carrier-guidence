import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const files=[];
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const full=path.join(dir,entry.name);if(entry.isDirectory())walk(full);else files.push(full)}}
walk(root);
const rel=f=>path.relative(root,f).replaceAll(path.sep,'/');
let failed=0;
function check(name,fn){try{fn();console.log('PASS',name)}catch(e){failed++;console.error('FAIL',name,e.message)}}
for(const file of files.filter(f=>f.endsWith('.json')||f.endsWith('.webmanifest'))){check('JSON: '+rel(file),()=>JSON.parse(fs.readFileSync(file,'utf8')))}
for(const file of files.filter(f=>f.endsWith('.html'))){const source=fs.readFileSync(file,'utf8');check('Viewport: '+rel(file),()=>assert.match(source,/<meta[^>]+name=["']viewport["']/i));check('Local assets: '+rel(file),()=>{for(const m of source.matchAll(/\b(?:src|href)=["']([^"']+)["']/gi)){const value=m[1].trim();if(!value||/^(?:https?:|mailto:|tel:|data:|#)/i.test(value))continue;const part=decodeURIComponent(value.split(/[?#]/,1)[0]);if(!part)continue;const target=path.resolve(path.dirname(file),part);assert.ok(target===root||target.startsWith(root+path.sep),'Path escapes site root: '+value);assert.ok(fs.existsSync(target),'Missing local target '+value+' from '+rel(file))}})}
const sw=path.join(root,'service-worker.js');
if(fs.existsSync(sw)){const source=fs.readFileSync(sw,'utf8'),block=source.match(/const CORE=\[([\s\S]*?)\];/);check('Service worker core list',()=>assert.ok(block));if(block)for(const m of block[1].matchAll(/'([^']+)'/g)){const target=path.resolve(root,m[1]);check('Cached asset: '+m[1],()=>assert.ok(fs.existsSync(target),'Not found'))}}
console.log('Static validation finished for '+files.filter(f=>f.endsWith('.html')).length+' pages.');
if(failed)process.exitCode=1;
