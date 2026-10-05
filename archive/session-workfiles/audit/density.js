// Measures how much a screen asks the reader to take in. Usage: node density.js <mockup.html> <frames.js> [out.json]
const {chromium}=require('/opt/node-tools/node_modules/playwright');const fs=require('fs');const path=require('path');
const html=path.resolve(process.argv[2]),FR=require(path.resolve(process.argv[3])),out=process.argv[4];
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1280,height:1000}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+html);await p.waitForTimeout(2000);await p.evaluate(()=>{window.TIPS=false});const rows=[];
for(const f of FR){try{await p.evaluate(f.setup);await p.waitForTimeout(250);}catch(e){errs.push(f.id+':'+e.message);continue}
 const r=await p.evaluate(()=>{const root=document.querySelector('#layer .modal')||document.querySelector('#view');const sc=document.querySelector('#layer .mbody')||root;
  const txt=root.innerText.replace(/\s+/g,' ').trim();const words=txt?txt.split(' ').length:0;const money=(txt.match(/₹/g)||[]).length;
  const acts=[...root.querySelectorAll('[data-a],[data-i],input,button')].filter(e=>e.offsetParent!==null).length;
  const h=Math.max(root.scrollHeight,sc.scrollHeight);return {words,money,acts,screens:+(h/844).toFixed(1)}});
 rows.push(Object.assign({id:f.id,sec:f.sec,name:f.name},r))}
const avg=k=>+(rows.reduce((a,r)=>a+r[k],0)/rows.length).toFixed(1);
const sum={n:rows.length,words:avg('words'),money:avg('money'),acts:avg('acts'),screens:avg('screens'),over25:rows.filter(r=>r.words>25).length,over40:rows.filter(r=>r.words>40).length,tall:rows.filter(r=>r.screens>1.2).length};
console.log(JSON.stringify(sum));if(errs.length)console.log('errors',errs.slice(0,5));
if(out)fs.writeFileSync(out,JSON.stringify({sum,rows}));await b.close()})()
