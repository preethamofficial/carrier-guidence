const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
let curriculum, currentLanguage=null, currentTopic=null, activeTab='basic', searchQuery='';
const STORE='codeatlas-progress-v1';
function loadProgress(){
  try {
    const parsed=JSON.parse(localStorage.getItem(STORE)||'{"completed":[],"bookmarks":[]}');
    if(!parsed || typeof parsed!=='object' || Array.isArray(parsed)) return {completed:[],bookmarks:[]};
    return {completed:Array.isArray(parsed.completed)?parsed.completed:[],bookmarks:Array.isArray(parsed.bookmarks)?parsed.bookmarks:[]};
  } catch { return {completed:[],bookmarks:[]}; }
}
const state=loadProgress();
const view=$('#view');

async function init(){
  const response=await fetch('./data/curriculum.json');
  curriculum=await response.json();
  renderLanguageNav(); updateProgress(); showHome();
  $('#navMap').addEventListener('click',showHome);
  $('#navAll').addEventListener('click',showAllLanguages);
  $('#homeBrand').addEventListener('click',e=>{e.preventDefault();showHome()});
  $('#searchInput').addEventListener('input',e=>{searchQuery=e.target.value.trim().toLowerCase(); if(searchQuery) showSearch(); else if(currentTopic) showLesson(currentLanguage.id,currentTopic.id); else if(currentLanguage) showLanguage(currentLanguage.id); else showHome();});
  $('#searchInput').addEventListener('keydown',e=>{if(e.key==='Escape'){e.target.value='';searchQuery='';showHome()}});
  document.addEventListener('keydown',e=>{if(e.key==='/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();$('#searchInput').focus()}});
  $('#themeToggle').addEventListener('click',()=>{document.body.classList.toggle('dark');try{localStorage.setItem('codeatlas-theme',document.body.classList.contains('dark')?'dark':'light')}catch{toast('Theme changed, but could not be saved.')}});
  try{if(localStorage.getItem('codeatlas-theme')==='dark') document.body.classList.add('dark')}catch{}
}
function save(){try{localStorage.setItem(STORE,JSON.stringify(state))}catch{toast('Progress could not be saved in this browser.')}updateProgress();renderLanguageNav()}
function allTopics(){return curriculum.languages.flatMap(l=>l.topics.map(t=>({...t,language:l})))}
function isDone(id){return state.completed.includes(id)}
function updateProgress(){
  if(!curriculum)return;
  const total=allTopics().length, done=state.completed.length, pct=Math.round(done/total*100);
  $('#overallPct').textContent=pct+'%';$('#overallBar').style.width=pct+'%';$('#overallCount').textContent=`${done} of ${total} topics completed`;
}
function renderLanguageNav(){
  $('#languageNav').innerHTML=curriculum.languages.map(l=>`<button class="lang-link ${currentLanguage?.id===l.id?'selected':''}" data-lang="${l.id}"><i class="lang-dot" style="background:${l.color}"></i>${l.name}<span class="count">${l.topics.filter(t=>isDone(t.id)).length}/${l.topics.length}</span></button>`).join('');
  $$('[data-lang]',$('#languageNav')).forEach(b=>b.onclick=()=>showLanguage(b.dataset.lang));
}
function setCrumbs(items){$('#breadcrumbs').innerHTML=items.map((x,i)=>`${i?'<b>/</b>':''}${x.action?`<button data-crumb="${x.action}" class="crumb-btn">${x.label}</button>`:i===items.length-1?`<strong>${x.label}</strong>`:`<span>${x.label}</span>`}`).join('');$$('[data-crumb]').forEach(b=>b.onclick=()=>b.dataset.crumb==='home'?showHome():showLanguage(b.dataset.crumb))}
function showHome(){
  currentLanguage=null;currentTopic=null;renderLanguageNav();setCrumbs([{label:'CodeAtlas'},{label:'Learning map'}]);
  const topics=allTopics().length, codeBlocks=allTopics().reduce((s,t)=>s+t.basicExamples.length+t.guidedExamples.length+t.advancedExamples.length,0);
  view.innerHTML=`
  <section class="hero"><div class="eyebrow">YOUR PERSONAL PROGRAMMING ATLAS</div><h1>Understand the code.<br>Connect the concepts.</h1><p>Fourteen programming languages in one unified curriculum, with deeper explanations, code examples, challenges, and interview practice — organized as a map you can explore at your own pace.</p><div class="hero-stats"><div class="hero-stat"><strong>${String(curriculum.languages.length).padStart(2,'0')}</strong><span>Languages</span></div><div class="hero-stat"><strong>${String(topics).padStart(2,'0')}</strong><span>Topic paths</span></div><div class="hero-stat"><strong>${codeBlocks}+</strong><span>Code patterns</span></div><div class="hero-stat"><strong>Always</strong><span>Learn at your pace</span></div></div></section>
  <div class="section-head"><div><h2>Explore the learning map</h2><p>Select a language node to enter its topic map.</p></div><button class="subtle-button" id="allLangBtn">View all languages ↗</button></div>
  <section class="map-canvas"><div class="map-root"><strong>⌘ CodeAtlas</strong><small>Programming language knowledge map</small></div><div class="map-grid">${curriculum.languages.map(l=>`<button class="language-card" style="--lang:${l.color}" data-open-lang="${l.id}"><div class="lang-card-top"><span class="lang-logo">${l.name.slice(0,2).toUpperCase()}</span><strong>${l.name}</strong></div><p>${l.purpose}</p><div class="card-bottom"><span>${l.topics.filter(t=>isDone(t.id)).length}/${l.topics.length} topics complete</span><b>Open map ↗</b></div></button>`).join('')}</div></section>
  <div class="section-head"><div><h2>A learning path that sticks</h2><p>Move from understanding to implementation, then prove what you know.</p></div></div>
  <div class="path-list"><div class="path-step"><span class="step-num">01 / UNDERSTAND</span><strong>Definition + everyday analogy</strong><p>Learn the formal idea, then connect it to a familiar real-life situation.</p></div><div class="path-step"><span class="step-num">02 / TRACE</span><strong>Read code line by line</strong><p>Follow inputs, values and outputs before writing code from scratch.</p></div><div class="path-step"><span class="step-num">03 / BUILD</span><strong>Try advanced patterns</strong><p>Extend the examples with validation, error handling and maintainable design.</p></div><div class="path-step"><span class="step-num">04 / PROVE</span><strong>Practice + interview</strong><p>Attempt questions before revealing the answer and explain your reasoning.</p></div></div>
  <div class="section-head"><div><h2>Continue learning</h2><p>Your next incomplete topic across all languages.</p></div></div>
  <div class="topic-grid">${curriculum.languages.map(l=>{const t=l.topics.find(x=>!isDone(x.id))||l.topics[0];return `<button class="topic-card" style="--lang:${l.color}" data-open-topic="${l.id}|${t.id}"><span class="topic-index">${l.name.toUpperCase()} · ${String(l.topics.indexOf(t)+1).padStart(2,'0')}</span><h3>${t.title}</h3><p>${t.definition}</p><div class="topic-card-foot"><span>Continue path</span><span>↗</span></div></button>`}).join('')}</div>`;
  $('#allLangBtn').onclick=showAllLanguages;
  $$('[data-open-lang]').forEach(b=>b.onclick=()=>showLanguage(b.dataset.openLang));
  $$('[data-open-topic]').forEach(b=>b.onclick=()=>{const [l,t]=b.dataset.openTopic.split('|');showLesson(l,t)});
}
function showAllLanguages(){
 currentLanguage=null;currentTopic=null;setCrumbs([{label:'CodeAtlas',action:'home'},{label:'All languages'}]);
 view.innerHTML=`<div class="eyebrow">LANGUAGE LIBRARY</div><h1 style="font-size:30px;letter-spacing:-1px;margin:10px 0">Choose your next language</h1><p style="font-size:12px;color:var(--muted);margin-bottom:24px">Each language has 12 structured topic groups, a beginner-to-advanced path, practice questions and interview preparation.</p><div class="map-grid">${curriculum.languages.map(l=>`<button class="language-card" style="--lang:${l.color}" data-open-lang="${l.id}"><div class="lang-card-top"><span class="lang-logo">${l.name.slice(0,2)}</span><strong>${l.name}</strong></div><p>${l.purpose}</p><div class="card-bottom"><span>${l.topics.filter(t=>isDone(t.id)).length}/${l.topics.length} completed</span><b>Enter ↗</b></div></button>`).join('')}</div>`;
 $$('[data-open-lang]').forEach(b=>b.onclick=()=>showLanguage(b.dataset.openLang));
}
function mindMap(lang){
  const stages=[['Beginner','#3fae72'],['Intermediate','#e8a93a'],['Advanced','#e2685a']];
  const byStage=stages.map(([name,color])=>({name,color,items:lang.topics.map((t,i)=>({t,i})).filter(({t})=>t.level===name)}));
  const colW=230,rowGap=8,rowH=40,padY=16;
  const maxRows=Math.max(...byStage.map(s=>s.items.length),1);
  const H=maxRows*rowH+(maxRows-1)*rowGap+padY*2;
  const W=170+colW*3+20;
  const cx=58,cy=H/2;
  const colX=[165,165+colW,165+colW*2];
  byStage.forEach(s=>{
    const block=s.items.length*rowH+(s.items.length-1)*rowGap;
    const top=(H-block)/2;
    s.items.forEach((it,ri)=>{it.y=top+ri*(rowH+rowGap)+rowH/2;});
  });
  let svg=`<svg class="mindmap" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${lang.name} topic mind map">`;
  byStage.forEach((s,si)=>{
    const x=colX[si];
    s.items.forEach((it,ri)=>{
      const sx=si===0?cx+56:x-colW/2;
      const sy=ri>0?s.items[ri-1].y:cy;
      svg+=`<path d="M ${sx} ${sy} L ${x} ${it.y}" />`;
    });
  });
  svg+=`<g class="mm-center"><circle cx="${cx}" cy="${cy}" r="54" style="fill:${lang.color}" /><text x="${cx}" y="${cy-1}" text-anchor="middle" class="mm-center-title">${lang.name}</text><text x="${cx}" y="${cy+17}" text-anchor="middle" class="mm-center-sub">${lang.topics.length} topics</text></g>`;
  byStage.forEach((s,si)=>{
    const x=colX[si];
    s.items.forEach((it)=>{
      const y=it.y,w=colW-18,h=rowH-6,bx=x-w/2,by=y-h/2,done=isDone(it.t.id);
      const label=it.t.title.length>26?it.t.title.slice(0,25)+'…':it.t.title;
      svg+=`<g class="mm-node ${done?'done':''}" data-topic="${it.t.id}" tabindex="0" role="button" aria-label="${label}"><rect x="${bx}" y="${by}" width="${w}" height="${h}" rx="9" style="stroke:${s.color}" /><text x="${bx+11}" y="${y+4}" class="mm-node-title">${it.i+1}. ${label}</text><circle cx="${bx+w-13}" cy="${y}" r="4" style="fill:${s.color}" /></g>`;
    });
  });
  return svg+'</svg>';
}
function showLanguage(id){
 currentLanguage=curriculum.languages.find(l=>l.id===id);currentTopic=null;renderLanguageNav();
 setCrumbs([{label:'CodeAtlas',action:'home'},{label:currentLanguage.name}]);
 view.innerHTML=`<section class="language-hero" style="--lang:${currentLanguage.color}"><div><span class="pill">LEARNING PATH · ${currentLanguage.topics.length} TOPICS</span><h1>${currentLanguage.name}</h1><p>${currentLanguage.purpose}. Follow the map from foundational concepts through advanced practices, then reinforce each topic with exercises and interview questions.</p><p style="margin-top:10px"><a class="resource-link" href="${currentLanguage.docs}" target="_blank" rel="noreferrer">Official learning documentation ↗</a></p></div><button class="primary-button" id="firstLesson">Start learning →</button></section>
 <div class="section-head"><div><h2>${currentLanguage.name} mind map</h2><p>Visual learning map — click any node to open its complete lesson.</p></div><span class="pill done">${currentLanguage.topics.filter(t=>isDone(t.id)).length}/${currentLanguage.topics.length} COMPLETE</span></div>
  <div class="mindmap-legend"><span class="lg" style="--c:#3fae72">Beginner</span><span class="lg" style="--c:#e8a93a">Intermediate</span><span class="lg" style="--c:#e2685a">Advanced</span></div>
  <div class="mindmap-wrap">${mindMap(currentLanguage)}</div>
  <div class="section-head"><div><h2>Topic list</h2><p>Browse every topic as a card.</p></div></div>

 <div class="topic-grid">${currentLanguage.topics.map((t,i)=>`<button class="topic-card" style="--lang:${currentLanguage.color}" data-topic="${t.id}"><span class="topic-index">${String(i+1).padStart(2,'0')} / ${t.level.toUpperCase()}</span><h3>${t.title}</h3><p>${t.definition}</p><div class="topic-card-foot"><span>${isDone(t.id)?'Completed':'Open lesson'}</span><span class="${isDone(t.id)?'check':''}">${isDone(t.id)?'✓':'↗'}</span></div></button>`).join('')}</div>
 <div class="section-head"><div><h2>Hands-on project ideas</h2><p>Apply several topics together.</p></div></div><div class="path-list">${currentLanguage.projects.map((p,i)=>`<div class="path-step"><span class="step-num">PROJECT 0${i+1}</span><strong>${p.split(': ')[1]}</strong><p>${p}</p></div>`).join('')}</div>`;
 $('#firstLesson').onclick=()=>showLesson(id,currentLanguage.topics.find(t=>!isDone(t.id))?.id||currentLanguage.topics[0].id);
 $$('[data-topic]').forEach(b=>b.addEventListener('click',()=>showLesson(id,b.dataset.topic)));
}
function showLesson(langId,topicId){
 currentLanguage=curriculum.languages.find(l=>l.id===langId);currentTopic=currentLanguage.topics.find(t=>t.id===topicId);activeTab='basic';renderLanguageNav();
 const idx=currentLanguage.topics.indexOf(currentTopic);
 setCrumbs([{label:'CodeAtlas',action:'home'},{label:currentLanguage.name,action:langId},{label:currentTopic.title}]);
 view.innerHTML=`
 <div class="lesson-layout"><article class="lesson-main">
 <div class="lesson-title"><span class="pill">${currentLanguage.name.toUpperCase()} · ${currentTopic.level.toUpperCase()}</span><h1>${currentTopic.title}</h1><p>Lesson ${String(idx+1).padStart(2,'0')} of ${currentLanguage.topics.length} · Read the explanation, trace each example, then attempt the questions before revealing the answers.</p></div>
  ${currentTopic.intro&&currentTopic.intro.length?`<section class="lesson-block prose-block" id="intro"><div class="block-heading"><span class="block-icon">✎</span><h2>What you will learn</h2></div>${currentTopic.intro.map(p=>`<p class="prose">${p}</p>`).join('')}</section>`:''}
 <section class="lesson-block" id="definition"><div class="block-heading"><span class="block-icon">Aa</span><h2>Standard definition</h2></div><p class="definition">${currentTopic.definition}</p><p style="color:var(--muted)">In simple terms: understand what this concept does, what problem it solves, and how it behaves when the input changes.</p></section>
 <section class="lesson-block" id="analogy"><div class="block-heading"><span class="block-icon">✦</span><h2>Think of it like this</h2></div><p class="analogy"><b>Everyday Indian example</b>${currentTopic.analogy}</p><ul class="key-points">${currentTopic.keyPoints.map(p=>`<li>${p}</li>`).join('')}</ul></section>
  ${currentTopic.body&&currentTopic.body.length?`<section class="lesson-block prose-block" id="deepdive"><div class="block-heading"><span class="block-icon">◇</span><h2>Understanding it step by step</h2></div>${currentTopic.body.map(s=>`<div class="prose-section"><h3>${s.heading}</h3><p>${s.text}</p></div>`).join('')}</section>`:''}
 <section class="lesson-block" id="basic"><div class="block-heading"><span class="block-icon">01</span><h2>Basic code — guided examples</h2></div><p>Start small. Read the code first, then check the output and open the line-by-line notes.</p>${currentTopic.basicExamples.map((ex,i)=>exampleCard(ex,i,true)).join('')}</section>
 <section class="lesson-block" id="guided"><div class="block-heading"><span class="block-icon">02</span><h2>More coding styles</h2></div><p>Compare alternative ways to express the same idea. Pick the one that best communicates intent.</p><div class="example-grid">${currentTopic.guidedExamples.map((ex,i)=>exampleCard(ex,i+2,true)).join('')}</div></section>
 <section class="lesson-block" id="advanced"><div class="block-heading"><span class="block-icon">03</span><h2>Advanced practice</h2></div><p>These are extension patterns and design prompts. Treat them as learning starting points, not copy-paste production code.</p><div class="example-grid">${currentTopic.advancedExamples.map((ex,i)=>`<div class="example-card"><h3>${ex.title}</h3><p>${ex.note}</p><div class="code-card"><div class="code-top"><strong>Advanced pattern ${i+1}</strong><button data-copy="${encodeURIComponent(ex.code)}">Copy code</button></div><pre><code>${escapeHtml(ex.code)}</code></pre></div></div>`).join('')}</div></section>
 <section class="lesson-block" id="practice"><div class="block-heading"><span class="block-icon">?</span><h2>Practice questions</h2></div><p>Try to answer without looking. Use the hint if you get stuck, then reveal the suggested approach.</p>${currentTopic.practice.map((q,i)=>revealCard(q,i,'Practice')).join('')}</section>
 <section class="lesson-block" id="interview"><div class="block-heading"><span class="block-icon">↗</span><h2>Interview questions & code challenges</h2></div><p>Practice explaining trade-offs out loud, then compare with the answer notes.</p>${currentTopic.interview.map((q,i)=>revealCard(q,i,'Interview')).join('')}<div style="margin-top:15px"><label style="font-size:10px;font-weight:800;display:block;margin-bottom:8px">YOUR CODE CHALLENGE NOTES</label><textarea id="challengeNotes" class="challenge-input" placeholder="Write your approach, edge cases, complexity, or code here. Saved only in this browser for this topic."></textarea><button class="subtle-button" id="saveNotes" style="margin-top:8px">Save my notes</button></div></section>
 <div class="lesson-switch"><button id="prevTopic">← Previous topic<strong>${idx>0?currentLanguage.topics[idx-1].title:'First topic'}</strong></button><button id="nextTopic">Next topic →<strong>${idx<currentLanguage.topics.length-1?currentLanguage.topics[idx+1].title:'Last topic'}</strong></button></div>
 </article><aside class="lesson-side"><div class="side-card"><h3>IN THIS LESSON</h3><nav class="side-nav"><button data-scroll="definition">Standard definition</button><button data-scroll="analogy">Everyday analogy</button><button data-scroll="basic">Basic examples</button><button data-scroll="guided">Coding styles</button><button data-scroll="advanced">Advanced practice</button><button data-scroll="practice">Practice questions</button><button data-scroll="interview">Interview + challenge</button></nav><button class="primary-button complete-button" id="completeBtn">${isDone(currentTopic.id)?'✓ Completed — mark again':'Mark lesson complete ✓'}</button><button class="outline-button complete-button" id="bookmarkBtn">${state.bookmarks.includes(currentTopic.id)?'★ Bookmarked':'☆ Bookmark lesson'}</button></div><div class="side-card"><h3>LEARNING CHECKLIST</h3><ul class="key-points"><li>Explain it in your own words</li><li>Trace each code line</li><li>Modify the example</li><li>Test an edge case</li><li>Answer one question unaided</li></ul></div><div class="side-card"><h3>OFFICIAL RESOURCE</h3><a class="resource-link" href="${currentLanguage.docs}" target="_blank" rel="noreferrer">${currentLanguage.name} official documentation ↗</a><p style="font-size:10px;color:var(--muted);line-height:1.7">Use the official reference to verify language-version details and explore beyond this lesson.</p></div></aside></div>`;
 $$('[data-scroll]').forEach(b=>b.onclick=()=>document.getElementById(b.dataset.scroll).scrollIntoView({behavior:'smooth',block:'start'}));
 $$('[data-copy]').forEach(b=>b.onclick=()=>copyText(decodeURIComponent(b.dataset.copy)));
 $$('.reveal-question button').forEach(b=>b.onclick=()=>{const ans=b.closest('.reveal-card').querySelector('.reveal-answer');const open=ans.hidden;ans.hidden=!open;b.textContent=open?'Hide answer':'Reveal answer';});
 $('#completeBtn').onclick=()=>{if(!isDone(currentTopic.id))state.completed.push(currentTopic.id);save();$('#completeBtn').textContent='✓ Completed — mark again';toast('Lesson marked complete')};
 $('#bookmarkBtn').onclick=()=>{const i=state.bookmarks.indexOf(currentTopic.id);if(i>=0)state.bookmarks.splice(i,1);else state.bookmarks.push(currentTopic.id);save();$('#bookmarkBtn').textContent=state.bookmarks.includes(currentTopic.id)?'★ Bookmarked':'☆ Bookmark lesson';};
 $('#prevTopic').onclick=()=>{if(idx>0)showLesson(langId,currentLanguage.topics[idx-1].id)};
 $('#nextTopic').onclick=()=>{if(idx<currentLanguage.topics.length-1)showLesson(langId,currentLanguage.topics[idx+1].id)};
 const noteKey='codeatlas-note-'+currentTopic.id;$('#challengeNotes').value=localStorage.getItem(noteKey)||'';
 $('#saveNotes').onclick=()=>{localStorage.setItem(noteKey,$('#challengeNotes').value);toast('Your notes were saved in this browser')};
}
function exampleCard(ex,i,showLines){
 return `<div class="example-card"><h3>${String(i+1).padStart(2,'0')} · ${ex.title}</h3><p>${i<2?'Read the code and follow how each value changes.':'Try changing one input and predict the result.'}</p><div class="code-card"><div class="code-top"><strong>${currentLanguage.name} example</strong><button data-copy="${encodeURIComponent(ex.code)}">Copy code</button></div><pre><code>${escapeHtml(ex.code)}</code></pre>${showLines&&ex.lineByLine?.length?`<div class="line-explanations">${ex.lineByLine.map(line=>`<div class="line-explanation"><code>${escapeHtml(line.line)}</code><span>${line.explanation}</span></div>`).join('')}</div>`:''}</div></div>`;
}
function revealCard(q,i,kind){
 return `<div class="reveal-card"><div class="reveal-question"><span><span style="color:var(--accent);font:10px 'DM Mono',monospace">${kind} ${String(i+1).padStart(2,'0')}</span><br>${q.question}</span><button>Reveal answer</button></div><div class="reveal-answer" hidden><strong>Suggested approach</strong><p>${q.answer}</p><p class="hint">Hint: ${q.hint||'Explain your assumptions and test an edge case.'}</p></div></div>`;
}
function showSearch(){
 currentLanguage=null;currentTopic=null;setCrumbs([{label:'CodeAtlas',action:'home'},{label:'Search'}]);
 const results=allTopics().filter(t=>[t.title,t.definition,t.analogy,t.language.name,...t.basicExamples.map(e=>e.title)].join(' ').toLowerCase().includes(searchQuery));
 view.innerHTML=`<div class="eyebrow">SEARCH THE KNOWLEDGE MAP</div><h1 style="font-size:28px;margin:10px 0">Results for “${escapeHtml(searchQuery)}”</h1><p style="font-size:11px;color:var(--muted);margin-bottom:20px">${results.length} matching topics</p><div class="search-results">${results.map(t=>`<button class="search-result" data-result="${t.language.id}|${t.id}"><span class="lang-logo" style="--lang:${t.language.color};color:${t.language.color};background:color-mix(in srgb,${t.language.color} 12%,white)">${t.language.name.slice(0,2)}</span><span><strong>${t.language.name} · ${t.title}</strong><small>${t.definition}</small></span></button>`).join('')||'<div class="empty-state">No matches yet. Try a language name or concept like functions, loops, errors or testing.</div>'}</div>`;
 $$('[data-result]').forEach(b=>b.onclick=()=>{const [l,t]=b.dataset.result.split('|');$('#searchInput').value='';searchQuery='';showLesson(l,t)});
}
function escapeHtml(str){return String(str).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
async function copyText(text){try{await navigator.clipboard.writeText(text);toast('Code copied')}catch{toast('Copy unavailable in this browser — select the code manually')}}
let toastTimer;function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2200)}
init().catch(err=>{console.error(err);view.innerHTML='<div class="empty-state">CodeAtlas could not load its curriculum file. Open this project through a local web server rather than file://. See README.md for instructions.</div>'});
