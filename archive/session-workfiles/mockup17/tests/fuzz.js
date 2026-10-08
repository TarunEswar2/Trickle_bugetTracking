const {chromium}=require('/opt/node-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1280,height:1000}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack.split('\n').slice(0,3).join(' | ')));
await p.goto('file:///home/user/Trickle_bugetTracking/archive/session-workfiles/mockup17/mockup17.html#demo');await p.waitForTimeout(1500);
let seed=7;const rnd=()=>{seed=(seed*1664525+1013904223)%4294967296;return seed/4294967296};
const bad=[];
for(const prof of ['V','G','T','Y','N','H','M','fresh','track']){
 if(prof==='fresh'||prof==='track'){await p.evaluate(m=>{startOnb();Object.assign(UI.flow.d,{mode:'manual',cats:[...BASIC6],limits:false,pin:''});H.obfinish();UI.popup=null;UI.sheet=null;render()},prof)}
 else{await p.click(`[data-p="${prof}"]`);await p.waitForTimeout(250)}
 for(let i=0;i<60;i++){
  const els=await p.$$('#layer [data-a], #view [data-a], #tabbar [data-a]');const vis=[];for(const e of els){if(await e.isVisible())vis.push(e)}
  if(!vis.length)break;const e=vis[Math.floor(rnd()*vis.length)];const a=await e.getAttribute('data-a');
  if(/^(pclose)$/.test(a)&&rnd()<.5)continue;
  try{await e.click({timeout:800,force:true})}catch(x){}
  await p.waitForTimeout(40);
  // type amounts when a keypad is open
  if(rnd()<.2)await p.evaluate(()=>{if(UI.flow&&UI.flow.d&&'kp' in UI.flow.d&&!UI.flow.d.kp)UI.flow.d.kp=String(1+Math.floor(Math.random()*900));render()});
  const txt=await p.evaluate(()=>document.querySelector('#phone').innerText);
  if(/NaN|undefined|Infinity|\[object/.test(txt))bad.push(prof+' '+i+' '+a+' :: '+(txt.match(/.{0,30}(NaN|undefined|Infinity|\[object).{0,30}/)||[''])[0].replace(/\n/g,' '));
 }
 const inv=await p.evaluate(()=>{const o=[];S.cats.forEach(c=>{if(!(c.left>=0)||c.left>c.amt+1)o.push('cat '+c.name+' '+c.left+'/'+c.amt)});if(!(S.free>=0))o.push('free '+S.free);if(S.bufLeft<0)o.push('buf');return o});
 if(inv.length)bad.push(prof+' INV '+inv.join(';'));
}
console.log('ERRORS',errs.slice(0,6));console.log('BAD',bad.slice(0,12));await b.close()})()
