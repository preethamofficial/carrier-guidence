import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
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
 for(const name of ['LESSON_FOCUS','LESSON_ANALOGIES','LESSON_PITFALLS','LESSON_TASKS','ALT_EXAMPLES','LESSON_SOLUTIONS'])assert.ok(source.includes('const '+name+' ='),'Missing '+name+' lesson data');
 const extract=name=>{const marker='const '+name+' = ';const start=source.indexOf(marker);assert.ok(start>=0,'Missing '+name);const rest=source.slice(start+marker.length);const match=rest.match(/^(\{[\s\S]*?\});\nconst /);assert.ok(match,'Could not parse '+name+' data');return JSON.parse(match[1]);};
 const focus=extract('LESSON_FOCUS'), analogies=extract('LESSON_ANALOGIES'), pitfalls=extract('LESSON_PITFALLS'), tasks=extract('LESSON_TASKS'), alternatives=extract('ALT_EXAMPLES'), solutions=extract('LESSON_SOLUTIONS');
 for(const id of ['c','cpp','php','kotlin','swift','bash'])for(const [label,data] of [['focus',focus],['analogy',analogies],['pitfall',pitfalls],['task',tasks],['alternative',alternatives],['solution',solutions]])assert.equal(data[id]?.length,12,id+' has incomplete '+label+' data');
});
check('Core curriculum has complete guided and interview content',()=>{
 const curriculum=JSON.parse(fs.readFileSync(path.join(root,'data/curriculum.json'),'utf8'));
 assert.equal(curriculum.languages.length,14,'Expected fourteen unified language paths');
 const required=['definition','analogy','keyPoints','basicExamples','guidedExamples','advancedExamples','practice','interview'];
 for(const lang of curriculum.languages.slice(0,8)){
  assert.equal(lang.topics.length,12,lang.name+' should have 12 topics');
  for(const topic of lang.topics){
   for(const key of required)assert.ok(topic[key]&&(Array.isArray(topic[key])?topic[key].length>0:true),lang.name+'/'+topic.title+' missing '+key);
   assert.ok(topic.basicExamples.length>=2&&topic.guidedExamples.length>=2&&topic.advancedExamples.length>=2,lang.name+'/'+topic.title+' needs basic, guided and advanced examples');
   for(const example of [...topic.basicExamples,...topic.guidedExamples])assert.ok(example.lineByLine?.length,lang.name+'/'+topic.title+' has an example without line explanations');
   for(const q of [...topic.practice,...topic.interview])assert.ok(q.question&&q.answer,lang.name+'/'+topic.title+' has a question without an answer');
  }
 }
});
check('Additional language UI renders and navigation/progress interactions work',()=>{
 const source=fs.readFileSync(languageLibrary,'utf8');
 const storage=new Map();
 const elements=new Map();
 class FakeElement{
  constructor(id){this.id=id;this._html='';this.textContent='';this.value='';this.href='';this.hidden=false;this.onclick=null;this.oninput=null;this.onchange=null;this.disabled=false;this.dataset={};this.children=[];}
  set innerHTML(value){this._html=String(value);this.children=[];
   const attr=this.id==='languageList'?'data-lang':this.id==='topicList'?'data-topic':null;
   if(attr){const re=new RegExp('<button[^>]*'+attr+'="([^"]+)"[^>]*>([\\s\\S]*?)</button>','g');let m;while((m=re.exec(this._html))){const b=new FakeElement('button');b.dataset[attr==='data-lang'?'lang':'topic']=m[1];b.innerHTML=m[2];b.hidden=false;this.children.push(b);}}
  }
  get innerHTML(){return this._html;}
  querySelectorAll(selector){if(selector==='[data-lang]'||selector==='[data-topic]')return this.children;return [];}
 }
 const ids=['search','languageList','languageTitle','languagePurpose','languageProgress','topicList','lesson','docsLink'];
 for(const id of ids)elements.set(id,new FakeElement(id));
 const document={querySelector(selector){const id=selector.startsWith('#')?selector.slice(1):selector;if(!elements.has(id))elements.set(id,new FakeElement(id));const el=elements.get(id);if(id==='lesson'&&el._html){for(const key of ['done','prev','next']){const re=new RegExp('<(input|button)[^>]*id="'+key+'"[^>]*>');const m=el._html.match(re);if(m){const item=new FakeElement(key);item.checked=/\\bchecked\\b/.test(m[0]);item.disabled=/\\bdisabled\\b/.test(m[0]);elements.set(key,item);}}}return elements.get(id);}};
 const localStorage={getItem:key=>storage.has(key)?storage.get(key):null,setItem:(key,value)=>storage.set(key,String(value))};
 vm.runInNewContext(source,{document,localStorage,console,window:{CodeAtlasExtraDeepStudy:null}});
 assert.match(elements.get('lesson').innerHTML,/Core concept/);
 assert.match(elements.get('lesson').innerHTML,/Suggested solution approach/);
 assert.equal(elements.get('languageTitle').textContent,'C');
 elements.get('next').onclick();
 assert.match(elements.get('lesson').innerHTML,/Types, variables and operators/);
 elements.get('languageList').children.find(b=>b.dataset.lang==='kotlin').onclick();
 assert.equal(elements.get('languageTitle').textContent,'Kotlin');
 assert.match(elements.get('lesson').innerHTML,/Everyday Indian example/);
 elements.get('done').onchange({target:{checked:true}});
 const saved=JSON.parse(storage.get('codeatlas-extra-languages-v1'));
 assert.equal(saved['kotlin-1'],true,'Completion should persist to localStorage');
 elements.get('search').value='swift';
 elements.get('search').oninput();
 assert.equal(elements.get('languageList').children.find(b=>b.dataset.lang==='swift').hidden,false);
 assert.equal(elements.get('languageList').children.find(b=>b.dataset.lang==='c').hidden,true);
});
check('Additional lesson renderer exposes learning and progress controls',()=>{
 const source=fs.readFileSync(languageLibrary,'utf8');
 for(const marker of ['Everyday Indian example','Alternative example / extension','Line-by-line study guide','Common mistakes and debugging','Practice ladder','Suggested solution approach','id="done"','id="prev"','id="next"','localStorage'])assert.ok(source.includes(marker),'Missing lesson feature '+marker);
});
const studioHtml=path.join(root,'career-studio.html');
const studioJs=path.join(root,'career-studio.js');
check('Career Studio required sections',()=>{const source=fs.readFileSync(studioHtml,'utf8');for(const id of ['career-quiz','practice','interview','letter','insights','roadmap'])assert.ok(source.includes('id="'+id+'"'),'Missing section '+id);});
check('Career Studio has interactive tools',()=>{const source=fs.readFileSync(studioJs,'utf8');for(const marker of ['quizQuestions','interviewBank','careerPaths','letterForm','downloadPlan','codeatlas.studio.plan'])assert.ok(source.includes(marker),'Missing tool marker '+marker);});
const sw=path.join(root,'service-worker.js');
if(fs.existsSync(sw)){const source=fs.readFileSync(sw,'utf8'),block=source.match(/const CORE=\[([\s\S]*?)\];/);check('Service worker core list',()=>assert.ok(block));if(block)for(const m of block[1].matchAll(/'([^']+)'/g)){const target=path.resolve(root,m[1]);check('Cached asset: '+m[1],()=>assert.ok(fs.existsSync(target),'Not found'))}}
check('Unified curriculum has all 14 languages and 168 unique topics',()=>{
 const data=JSON.parse(fs.readFileSync(path.join(root,'data/curriculum.json'),'utf8'));
 assert.equal(data.languages.length,14);
 const all=data.languages.flatMap(l=>l.topics);
 assert.equal(all.length,168);
 assert.equal(new Set(all.map(t=>t.id)).size,168);
 for(const lang of data.languages){assert.equal(lang.topics.length,12,lang.name+' topic count');const doc=lang.docs||lang.references?.find(r=>r.url)?.url||'';assert.ok(/^https:\/\//.test(doc),lang.name+' official reference');}
});
check('All curriculum topics have learning content and practice',()=>{
 const data=JSON.parse(fs.readFileSync(path.join(root,'data/curriculum.json'),'utf8'));
 for(const lang of data.languages)for(const topic of lang.topics){
  assert.ok(typeof topic.definition==='string'&&topic.definition.length>25,lang.name+'/'+topic.id+' definition');
  assert.ok((topic.basicExamples||[]).length+(topic.guidedExamples||[]).length+(topic.advancedExamples||[]).length>=4,lang.name+'/'+topic.id+' examples');
  assert.ok((topic.practice||[]).length>=(data.languages.indexOf(lang)<8?4:5),lang.name+'/'+topic.id+' practice prompts');
 }
});
check('Company directory and recent jobs pages are connected',()=>{
 for(const file of ['job-boards.html','job-boards.css','job-boards.js','jobs.html','jobs.css','jobs.js','data/companies.json','data/jobs.json','data/scrape-log.json'])assert.ok(fs.existsSync(path.join(root,file)),'Missing '+file);
 const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
 assert.ok(home.includes('href="job-boards.html"'),'Missing directory navigation');
 assert.ok(home.includes('href="jobs.html"'),'Missing jobs navigation');
 const payload=JSON.parse(fs.readFileSync(path.join(root,'data/jobs.json'),'utf8'));
 assert.ok(Array.isArray(payload.jobs),'jobs feed should expose an array');
 for(const job of payload.jobs){assert.ok(job.title&&job.company&&job.apply_url,'Incomplete job listing');assert.match(job.apply_url,/^https:\/\//,'Application links must use HTTPS');}
});
check('Job feed is scheduled daily at 9 AM IST and auto-published',()=>{
 const workflow=fs.readFileSync(path.resolve(root,'../.github/workflows/scrape-jobs.yml'),'utf8');
 assert.ok(workflow.includes('cron: "30 3 * * *"'),'03:30 UTC is 09:00 IST');
 assert.ok(workflow.includes('git push origin HEAD:main'),'Daily feed changes must publish automatically');
 assert.ok(workflow.includes('workflow_dispatch'),'Manual refresh must be available');
 assert.ok(workflow.includes('contents: write'),'Workflow needs content write permission');
});
check('Scraper extracts and renders job descriptions safely',()=>{
 const scraper=fs.readFileSync(path.resolve(root,'../scripts/scrape_jobs.py'),'utf8');
 const renderer=fs.readFileSync(path.join(root,'jobs.js'),'utf8');
 assert.ok(scraper.includes('plain_description(job.get("content"))'),'Greenhouse descriptions');
 assert.ok(scraper.includes('job.get("descriptionPlain") or job.get("description")'),'Lever descriptions');
 assert.ok(scraper.includes('job.get("descriptionPlain") or job.get("descriptionHtml")'),'Ashby descriptions');
 assert.ok(scraper.includes('return text[:12000]'),'Descriptions must be size-limited');
 assert.ok(renderer.includes('full.textContent = descriptionText'),'Descriptions must not be injected as HTML');
 assert.ok(renderer.includes('Read full job description'),'Full descriptions must be expandable');
});
check('Unified lessons keep the deep-learning path reachable',()=>{
 const html=fs.readFileSync(path.join(root,'language-library.html'),'utf8');
 assert.ok(html.includes('language-library.js'),'Deep lesson renderer should remain accessible');
 const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
 for(const item of ['./job-boards.html','./jobs.html','./data/jobs.json'])assert.ok(sw.includes(item),'Missing service-worker asset '+item);
});


check('Career Growth Planner section and controls',()=>{
 const html=fs.readFileSync(path.join(root,'career-studio.html'),'utf8');
 for(const id of ['growth-planner','growthForm','growthRole','growthTime','growthSkills','growthJobDescription','growthResult','growthReset','growthExport'])assert.ok(html.includes('id="'+id+'"'),'Missing growth planner control '+id);
});
check('Career Growth Planner covers eight roles and local progress',()=>{
 const source=fs.readFileSync(path.join(root,'career-studio.js'),'utf8');
 for(const marker of ['const growthCatalog','ai:{title:','backend:{title:','python:{title:','frontend:{title:','data:{title:','qa:{title:','devops:{title:','security:{title:','codeatlas.growth-planner.v1','createGrowthPlan','exportGrowthPlan'])assert.ok(source.includes(marker),'Missing growth planner behavior '+marker);
 assert.ok(source.includes('localStorage'),'Growth plan must persist locally');
 assert.ok(source.includes('Self-assessment only'),'Growth output must avoid hiring guarantees');
});

check('Career Command Center assets, navigation and offline caching',()=>{
 for(const file of ['career-command-center.html','career-command-center.css','career-command-center.js'])assert.ok(fs.existsSync(path.join(root,file)),'Missing '+file);
 const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
 assert.ok(home.includes('href="career-command-center.html"'),'Career Command Center must be reachable from home');
 const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
 for(const file of ['./career-command-center.html','./career-command-center.css','./career-command-center.js'])assert.ok(sw.includes(file),'Missing cached asset '+file);
 const html=fs.readFileSync(path.join(root,'career-command-center.html'),'utf8');
 for(const id of ['direction','skills','goals','sprint','portfolio','applications','review','exportAll','importFile','clearWorkspace'])assert.ok(html.includes('id="'+id+'"'),'Missing command center control '+id);
});
check('Career Command Center includes core role and privacy safeguards',()=>{
 const source=fs.readFileSync(path.join(root,'career-command-center.js'),'utf8');
 for(const marker of ['roleSkills','genai:','python:','data:','frontend:','qa:','devops:','security:','codeatlas.command-center.v1','application/json','localStorage'])assert.ok(source.includes(marker),'Missing command center behavior '+marker);
 assert.ok(!/fetch\s*\(/.test(source),'Career Command Center should not call external APIs');
});

check('Topic-specific lesson engine and curated catalogs are wired into both learning pages',()=>{
 const lessonFile=path.join(root,'comprehensive-lessons.js');
 assert.ok(fs.existsSync(lessonFile),'Missing comprehensive explanation layer');
 const lessonSource=fs.readFileSync(lessonFile,'utf8');
 for(const marker of ['Complete topic study guide','Concept-by-concept breakdown','Practice lab','Edge cases to test','officialReference'])assert.ok(lessonSource.includes(marker),'Missing explanation section '+marker);
 const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
 assert.ok(app.includes('CodeAtlasComprehensiveStudy.renderLesson'),'Main topic renderer must use comprehensive explanations');
 const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
 assert.ok(home.includes('topic-additions-a.js')&&home.includes('topic-additions-b.js')&&home.includes('comprehensive-lessons.js'),'Main page must load curated topic data and explanation engine');
 const library=fs.readFileSync(path.join(root,'language-library.html'),'utf8');
 assert.ok(library.includes('topic-additions-a.js')&&library.includes('topic-additions-b.js')&&library.includes('comprehensive-lessons.js'),'Additional language page must load curated topic data and explanation engine');
 const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
 assert.ok(sw.includes('./topic-additions-a.js')&&sw.includes('./topic-additions-b.js')&&sw.includes('./comprehensive-lessons.js'),'Service worker must cache all lesson assets');
});

check('Runtime curriculum adds missing topics and deep guides to every language',()=>{
 const context={window:{},console};
 vm.runInNewContext(fs.readFileSync(path.join(root,'topic-additions-a.js'),'utf8'),context);
 vm.runInNewContext(fs.readFileSync(path.join(root,'topic-additions-b.js'),'utf8'),context);
 vm.runInNewContext(fs.readFileSync(path.join(root,'comprehensive-lessons.js'),'utf8'),context);
 const data=JSON.parse(fs.readFileSync(path.join(root,'data/curriculum.json'),'utf8'));
 context.window.CodeAtlasComprehensiveStudy.enrichCurriculum(data);
 const all=data.languages.flatMap(l=>l.topics);
 assert.equal(data.languages.length,14);
 assert.equal(all.length,224);
 assert.equal(new Set(all.map(t=>t.id)).size,224);
 for(const lang of data.languages){
  assert.equal(lang.topics.length,16,lang.name+' expanded topic count');
  assert.ok(lang.coverageAudit&&lang.coverageAudit.newTopicsAdded===4,lang.name+' missing-topic audit');
  for(const topic of lang.topics){
   assert.ok(topic.deepDive&&topic.deepDive.learningObjectives.length>=5,lang.name+'/'+topic.id+' deep guide');
   assert.ok(topic.deepDive.edgeCases.length>=4,lang.name+'/'+topic.id+' edge cases');
   assert.ok(topic.practice.length>=6,lang.name+'/'+topic.id+' practice');
   assert.ok(topic.interview.length>=5,lang.name+'/'+topic.id+' interview questions');
  }
 }
});

console.log('Static validation finished for '+files.filter(f=>f.endsWith('.html')).length+' pages.');
if(failed)process.exitCode=1;
