const {chromium}=require('/opt/node-tools/node_modules/playwright');const fs=require('fs');const pack=require('./pack.js');
const FR=require('./frames3.js');
(async()=>{const only=process.argv[2]?process.argv[2].split(','):null;const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1280,height:1000},ignoreHTTPSErrors:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///home/user/Trickle_bugetTracking/archive/session-workfiles/mockup/mockup.html');await p.waitForTimeout(2500);await p.addScriptTag({path:'extract.js'});
const out=[];
for(const f of FR){if(only&&!only.includes(f.id))continue;
 await p.evaluate(f.setup);await p.waitForTimeout(350);
 const r=await p.evaluate(()=>{const ph=document.querySelector('#phone');const v=document.querySelector('#view');const lay=document.querySelector('#layer').children.length>0;const mb=document.querySelector('#layer .mbody');const tall=lay?Math.max(844,mb?mb.scrollHeight+4:844):Math.max(844,v.scrollHeight);ph.style.height=tall+'px';const fr=document.querySelector('#frame');fr.style.height=tall+'px';v.style.overflow='visible';window.__maxY=lay?850:0;const o=__extract();window.__maxY=0;ph.style.height='';fr.style.height='';v.style.overflow='';return o});
 const k=pack(r);out.push({id:f.id,sec:f.sec,name:f.name,D:k});
 await (await p.$('#frame')).screenshot({path:`shots/${f.id}.png`});}
fs.writeFileSync('captured3.json',JSON.stringify(out));console.log(out.length,'frames',out.map(o=>o.id+':'+JSON.stringify(o.D).length+':'+o.D.h).join(' '),errs);await b.close()})()
