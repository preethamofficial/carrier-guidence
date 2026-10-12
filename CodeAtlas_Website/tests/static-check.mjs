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
const languageLibrary=path.join(root,'language-library.js');
check('Additional language catalog has six complete topic paths',()=>{
 const source=fs.readFileSync(languageLibrary,'utf8');
 const match=source.match(/const LANGUAGES=(\[.*?\]);const LESSON_FOCUS/s);
 assert.ok(match,'Could not locate additional language catalog');
 const languages=JSON.parse(match[1]);
 assert.equal(languages.length,6,'Expected C, C++, PHP, Kotlin, Swift and Bash');
 for(const lang of languages){assert.equal(lang.topics.length,12,lang.name+' should have 12 topics');assert.ok(lang.docs,'Missing official docs link for '+lang.name);for(const topic of lang.topics){assert.ok(topic.title&&topic.code,'Missing title/code in '+topic.id);}}
});
check('Every additional topic has focused learning content',()=>{
 const source=fs.readFileSync(languageLibrary,'utf8');
 for(const name of ['LESSON_FOCUS','LESSON_ANALOGIES','LESSON_PITFALLS','LESSON_TASKS','ALT_EXAMPLES'])assert.ok(source.includes('const '+name+' ='),'Missing '+name+' lesson data');
 const extract=name=>{const marker='const '+name+' = ';const start=source.indexOf(marker);assert.ok(start>=0,'Missing '+name);const rest=source.slice(start+marker.length);const match=rest.match(/^(\{[\s\S]*?\});\nconst /);assert.ok(match,'Could not parse '+name+' data');return JSON.parse(match[1]);};
 const focus=extract('LESSON_FOCUS'), analogies=extract('LESSON_ANALOGIES'), pitfalls=extract('LESSON_PITFALLS'), tasks=extract('LESSON_TASKS'), alternatives=extract('ALT_EXAMPLES');
 for(const id of ['c','cpp','php','kotlin','swift','bash'])for(const [label,data] of [['focus',focus],['analogy',analogies],['pitfall',pitfalls],['task',tasks],['alternative',alternatives]])assert.equal(data[id]?.length,12,id+' has incomplete '+label+' data');
});
check('Additional lesson renderer exposes learning and progress controls',()=>{
 const source=fs.readFileSync(languageLibrary,'utf8');
 for(const marker of ['Everyday Indian example','Alternative example / extension','Line-by-line study guide','Common mistakes and debugging','Practice ladder','id="done"','id="prev"','id="next"','localStorage'])assert.ok(source.includes(marker),'Missing lesson feature '+marker);
});
const studioHtml=path.join(root,'career-studio.html');
const studioJs=path.join(root,'career-studio.js');
check('Career Studio required sections',()=>{const source=fs.readFileSync(studioHtml,'utf8');for(const id of ['career-quiz','practice','interview','letter','insights','roadmap'])assert.ok(source.includes('id="'+id+'"'),'Missing section '+id);});
check('Career Studio has interactive tools',()=>{const source=fs.readFileSync(studioJs,'utf8');for(const marker of ['quizQuestions','interviewBank','careerPaths','letterForm','downloadPlan','codeatlas.studio.plan'])assert.ok(source.includes(marker),'Missing tool marker '+marker);});
const sw=path.join(root,'service-worker.js');
if(fs.existsSync(sw)){const source=fs.readFileSync(sw,'utf8'),block=source.match(/const CORE=\[([\s\S]*?)\];/);check('Service worker core list',()=>assert.ok(block));if(block)for(const m of block[1].matchAll(/'([^']+)'/g)){const target=path.resolve(root,m[1]);check('Cached asset: '+m[1],()=>assert.ok(fs.existsSync(target),'Not found'))}}
console.log('Static validation finished for '+files.filter(f=>f.endsWith('.html')).length+' pages.');
if(failed)process.exitCode=1;
