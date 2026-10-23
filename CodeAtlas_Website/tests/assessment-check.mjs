import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import engine from '../assessment-engine.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'data/assessment.json'),'utf8'));
assert.equal(data.questions.length,30,'Assessment should have 30 questions');
assert.ok(data.roles.length>=10,'Assessment should cover at least 10 career paths');
assert.equal(new Set(data.questions.map(q=>q.id)).size,data.questions.length,'Question IDs must be unique');
assert.equal(new Set(data.roles.map(r=>r.id)).size,data.roles.length,'Role IDs must be unique');
for(const q of data.questions){assert.ok(q.prompt&&q.options.length>=3,q.id+' needs a prompt and at least three options');assert.equal(new Set(q.options.map(o=>o.id)).size,q.options.length,q.id+' option IDs must be unique');for(const o of q.options)assert.ok(o.text&&o.scores,q.id+' has an incomplete option')}
for(const r of data.roles){assert.ok(r.title&&r.summary&&r.time&&r.daily&&r.skills.length>=3&&r.start,r.id+' needs complete guidance');for(const [,url] of r.links)assert.ok(url.startsWith('https://'),r.id+' reference should use HTTPS')}
const answers=Object.fromEntries(data.questions.map(q=>[q.id,q.options[0].id]));
const ranked=engine.score(data,answers);
assert.equal(ranked.length,data.roles.length,'Scoring must return every role');
assert.ok(ranked.every(r=>Number.isInteger(r.score)&&r.score>=0&&r.score<=100),'Scores must be bounded percentages');
assert.ok(ranked.every((r,i)=>i===0||ranked[i-1].score>=r.score),'Matches must be sorted highest first');
assert.deepEqual(engine.score(data,answers).map(r=>r.id),ranked.map(r=>r.id),'Scoring should be deterministic');
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const file of ['my-path.html','onboarding.html','assessment.html','resume-builder.html'])assert.ok(home.includes('href="'+file+'"'),'Home navigation missing '+file);
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
for(const file of ['./data/assessment.json','./assessment-engine.js','./assessment.js','./onboarding.html','./my-path.html','./resume-builder.html'])assert.ok(sw.includes(file),'Service worker cache missing '+file);
console.log('✓ Career assessment: 30 questions, '+data.roles.length+' roles, deterministic bounded scoring and navigation/cache checks');
