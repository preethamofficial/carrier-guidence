'use strict';
const CACHE_NAME='codeatlas-shell-v12';
const CORE=[
 './','./index.html','./dashboard.html','./styles.css','./enhance.css','./app.js','./enhance.js',
 './data/curriculum.json','./year-course.html','./year-course.css','./year-course.js','./data/year-curriculum.json',
 './language-library.html','./language-library.css','./language-library.js','./extra-deep-lessons.js','./deep-lessons.js','./topic-additions-a.js','./topic-additions-b.js','./topic-additions-c.js','./topic-additions-d.js','./comprehensive-lessons.js',
 './specializations.html','./specializations.css','./specializations.js',
 './career.html','./career.css','./career.js',
 './career-studio.html','./career-studio.css','./career-studio.js','./career-command-center.html','./career-command-center.css','./career-command-center.js',
 './resume-review.html','./resume-review.css','./resume-review.js',
 './dashboard.css','./dashboard.js','./job-boards.html','./job-boards.css','./job-boards.js','./jobs.html','./jobs.css','./jobs.js','./data/jobs.json','./manifest.webmanifest','./assets/codeatlas-icon.svg'
];
self.addEventListener('install',event=>{event.waitUntil((async()=>{const cache=await caches.open(CACHE_NAME);await Promise.all(CORE.map(async path=>{try{const request=new Request(new URL(path,self.registration.scope),{cache:'reload'});const response=await fetch(request);if(response.ok)await cache.put(request,response)}catch{}}));await self.skipWaiting()})())});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(key=>key.startsWith('codeatlas-')&&key!==CACHE_NAME).map(key=>caches.delete(key)));await self.clients.claim()})())});
self.addEventListener('fetch',event=>{const request=event.request;if(request.method!=='GET')return;const url=new URL(request.url);if(url.origin!==self.location.origin)return;event.respondWith((async()=>{const cache=await caches.open(CACHE_NAME);if(request.mode==='navigate'){try{const response=await fetch(request);if(response.ok)cache.put(request,response.clone());return response}catch{return await cache.match(request)||await cache.match(new URL('./index.html',self.registration.scope).href)||Response.error()}}const cached=await cache.match(request);const isJobFeed=url.pathname.endsWith('/data/jobs.json');if(isJobFeed){try{const fresh=await fetch(request);if(fresh.ok)await cache.put(request,fresh.clone());return fresh}catch{return cached||Response.error()}}const network=fetch(request).then(response=>{if(response.ok)cache.put(request,response.clone());return response}).catch(()=>cached);return cached||network})())});
