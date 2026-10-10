const {chromium}=require('/opt/node-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1280,height:1000}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack.split('\n').slice(0,3).join('|')));
await p.goto('file:///home/user/Trickle_bugetTracking/archive/session-workfiles/mockup18/mockup18.html#demo');await p.waitForTimeout(1200);
const bad=[];
for(const prof of ['T','Y','G','M']){
 await p.click(`[data-p="${prof}"]`);await p.waitForTimeout(200);
 const n=await p.$$eval('#panel .pbtn',e=>e.length);
 for(let i=0;i<n;i++){
  const label=await p.evaluate(i=>{const b=document.querySelectorAll('#panel .pbtn')[i];return b?b.innerText:''},i);
  if(/Lock the app/.test(label))continue;
  try{await p.evaluate(i=>document.querySelectorAll('#panel .pbtn')[i].click(),i)}catch(e){}
  await p.waitForTimeout(60);
  for(const t of ['home','spending','money','insights']){await p.evaluate(t=>{UI.flow=null;UI.popup=null;UI.sheet=null;UI.stack=[];go(t)},t);const txt=await p.evaluate(()=>document.querySelector('#phone').innerText);if(/NaN|undefined|Infinity|\[object/.test(txt))bad.push(prof+' '+label+' '+t+' '+(txt.match(/.{0,30}(NaN|undefined|Infinity|\[object).{0,30}/)||[''])[0].replace(/\n/g,' '))}
 }
}
console.log('ERR',errs.slice(0,5));console.log('BAD',bad.slice(0,10));await b.close()})();
