// Extracts every visible string per screen state. Usage: node copy.js <mockup.html> <frames.js> <out.json>
const {chromium}=require('/opt/node-tools/node_modules/playwright');const fs=require('fs');const path=require('path');
const html=path.resolve(process.argv[2]),FR=require(path.resolve(process.argv[3]));
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1280,height:1000}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+html);await p.waitForTimeout(2000);await p.evaluate(()=>{window.TIPS=false});const out=[];
for(const f of FR){try{await p.evaluate(f.setup);await p.waitForTimeout(250)}catch(e){errs.push(f.id+':'+e.message);continue}
 const r=await p.evaluate(()=>{const lines=el=>{if(!el)return[];const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const a=[];let n;while(n=w.nextNode()){const t=n.nodeValue.replace(/\s+/g,' ').trim();if(t&&n.parentElement&&n.parentElement.offsetParent!==null)a.push(t)}return a};
  const modal=document.querySelector('#layer .modal'),sheet=document.querySelector('#layer .sheet');
  const titles=[...document.querySelectorAll((modal?'#layer .modal':'#view')+' .title,'+(modal?'#layer .modal':'#view')+' .h2,'+(sheet?'#layer .sheet .title,#layer .sheet .h2':'#none'))].map(e=>e.innerText.replace(/\s+/g,' ').trim()).filter(Boolean);
  return {view:modal?[]:lines(document.querySelector('#view')),layer:lines(modal||sheet),titles}});
 out.push({id:f.id,sec:f.sec,name:f.name,view:r.view,layer:r.layer,titles:r.titles})}
fs.writeFileSync(process.argv[4],JSON.stringify(out));console.log(out.length,'states',errs.slice(0,3));await b.close()})()
