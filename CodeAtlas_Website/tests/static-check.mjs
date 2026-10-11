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
const studioHtml=path.join(root,'career-studio.html');
const studioJs=path.join(root,'career-studio.js');
check('Career Studio required sections',()=>{const source=fs.readFileSync(studioHtml,'utf8');for(const id of ['career-quiz','practice','interview','letter','insights','roadmap'])assert.ok(source.includes('id="'+id+'"'),'Missing section '+id);});
check('Career Studio has interactive tools',()=>{const source=fs.readFileSync(studioJs,'utf8');for(const marker of ['quizQuestions','interviewBank','careerPaths','letterForm','downloadPlan','codeatlas.studio.plan'])assert.ok(source.includes(marker),'Missing tool marker '+marker);});
const sw=path.join(root,'service-worker.js');
if(fs.existsSync(sw)){const source=fs.readFileSync(sw,'utf8'),block=source.match(/const CORE=\[([\s\S]*?)\];/);check('Service worker core list',()=>assert.ok(block));if(block)for(const m of block[1].matchAll(/'([^']+)'/g)){const target=path.resolve(root,m[1]);check('Cached asset: '+m[1],()=>assert.ok(fs.existsSync(target),'Not found'))}}
console.log('Static validation finished for '+files.filter(f=>f.endsWith('.html')).length+' pages.');
const jobsPage=path.join(root,'jobs.html');
const jobsScript=path.join(root,'jobs.js');
check('Recent jobs feed page',()=>{const source=fs.readFileSync(jobsPage,'utf8');assert.ok(source.includes('id="jobs"'));assert.ok(fs.readFileSync(jobsScript,'utf8').includes('./data/jobs.json'));});
check('Recent jobs feed filtering',()=>{const source=fs.readFileSync(jobsScript,'utf8');for(const marker of ['locationFilter','recentOnly','apply_url','first_seen_at'])assert.ok(source.includes(marker),'Missing job-feed feature '+marker);});
check('Job data schema',()=>{const data=JSON.parse(fs.readFileSync(path.join(root,'data/jobs.json'),'utf8'));assert.ok(Array.isArray(data.jobs),'jobs must be an array');});

if(failed)process.exitCode=1;

const curriculumFile=path.join(root,'data','curriculum.json');
check('Unified 14-language curriculum',()=>{const c=JSON.parse(fs.readFileSync(curriculumFile,'utf8'));assert.equal(c.languages.length,14);assert.equal(c.languages.flatMap(l=>l.topics).length,168);const ids=c.languages.flatMap(l=>l.topics.map(t=>t.id));assert.equal(new Set(ids).size,ids.length);});
check('Every lesson has explanations, examples, challenges, and references',()=>{const c=JSON.parse(fs.readFileSync(curriculumFile,'utf8'));for(const l of c.languages)for(const t of l.topics){assert.ok(t.definition&&t.definition.length>40,l.name+' '+t.id+' definition');assert.ok((t.basicExamples||[]).length+(t.guidedExamples||[]).length+(t.advancedExamples||[]).length>=4,l.name+' '+t.id+' examples');assert.ok((t.practice||[]).length>=5,l.name+' '+t.id+' challenges');assert.ok(l.references?.some(x=>x.url),l.name+' official reference');}});

if(failed)process.exitCode=1;
