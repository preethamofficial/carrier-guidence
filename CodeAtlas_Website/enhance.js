(()=>{
const SYM={python:'🐍',javascript:'JS',typescript:'TS',java:'☕',sql:'DB',go:'Go',rust:'⚙',csharp:'C#'};
const COL={python:'#3776ab',javascript:'#f0b429',typescript:'#3178c6',java:'#e76f00',sql:'#00758f',go:'#00add8',rust:'#b7410e',csharp:'#68217a'};
const badge=id=>`<svg viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${COL[id]}"/><stop offset="1" stop-color="${COL[id]}" stop-opacity=".55"/></linearGradient></defs><path d="M24 3l18 10.5v21L24 45 6 34.5v-21z" fill="url(#g${id})"/><text x="24" y="30" text-anchor="middle" font-size="${SYM[id].length>1&&/^[A-Za-z#]/.test(SYM[id])?15:19}" font-weight="800" font-family="DM Mono,monospace" fill="#fff">${SYM[id]}</text></svg>`;
const bar=document.body.appendChild(Object.assign(document.createElement('div'),{id:'scrollbar'}));
addEventListener('scroll',()=>{const h=document.documentElement;bar.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight||1)*100)+'%'},{passive:true});
const lines=["<b>def</b> learn(topic):","  plan = <i>'understand → trace → build'</i>","  <b>return</b> practice(topic, plan)","<b>await</b> atlas.explore(<i>'Rust'</i>)"];
function typeHero(el){let i=0,c=0,out=[];const tick=()=>{if(!el.isConnected)return;const raw=lines[i].replace(/<[^>]+>/g,'').length;c++;const shown=c>=raw?lines[i]:lines[i].slice(0,0)+lines[i].replace(/<[^>]+>/g,'').slice(0,c);el.innerHTML=out.concat(c>=raw?lines[i]:shown).join('\n')+'<span class="cur"></span>';if(c>=raw){out.push(lines[i]);i++;c=0;if(i>=lines.length){i=0;out=[];setTimeout(tick,1800);return}}setTimeout(tick,45)};tick()}
function count(el){const to=parseInt(el.textContent);if(isNaN(to))return;let n=0;const s=()=>{n+=Math.ceil(to/25);el.textContent=(n>=to?to:n).toString().padStart(2,'0');if(n<to)requestAnimationFrame(s)};s()}
function enhance(){
 const v=document.getElementById('view');
 v.querySelectorAll('.lang-logo').forEach(l=>{const id=l.closest('[data-open-lang]')?.dataset.openLang;if(id&&SYM[id])l.innerHTML=badge(id)});
 const hero=v.querySelector('.hero');
 if(hero&&!hero.querySelector('.hero-code')){
  for(let i=0;i<10;i++){const g=document.createElement('span');g.className='glyph';g.textContent=['{ }','</>','()=>','::','λ','&&','#!','[]','fn','SELECT'][i];g.style.cssText=`left:${i*10+2}%;animation-duration:${10+i*2}s;animation-delay:-${i*2}s`;hero.appendChild(g)}
  const box=document.createElement('pre');box.className='hero-code';box.style.margin=0;hero.appendChild(box);typeHero(box);
  hero.querySelectorAll('.hero-stat strong').forEach(count)}
 const lh=v.querySelector('.language-hero');
 if(lh&&!lh.querySelector('.lang-logo')){const id=currentLanguage?.id;if(id){const s=document.createElement('span');s.className='lang-logo big';s.innerHTML=badge(id);lh.firstElementChild.prepend(s)}}
 v.querySelectorAll('.topic-card[data-topic]').forEach(c=>{const t=currentLanguage?.topics.find(x=>x.id===c.dataset.topic);if(t&&t.level==='Advanced')c.dataset.adv=1});
 v.querySelectorAll('.language-card,.topic-card,.path-step,.lesson-block,.search-result,.hero-stat').forEach((el,i)=>{if(el.classList.contains('reveal'))return;el.classList.add('reveal');el.style.animationDelay=Math.min(i*45,500)+'ms'});
 v.querySelectorAll('.language-card').forEach(c=>{if(c._t)return;c._t=1;c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(600px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-3px)`});c.addEventListener('mouseleave',()=>c.style.transform='')});
}
new MutationObserver(()=>{if(enhance._p)return;enhance._p=1;requestAnimationFrame(()=>{enhance._p=0;enhance()})}).observe(document.getElementById('view'),{childList:true});
})();
