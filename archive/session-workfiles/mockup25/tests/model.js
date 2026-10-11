// property test: random operations on every profile; after each step check the rules and the balance arithmetic
const {chromium}=require('/opt/node-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///home/user/Trickle_bugetTracking/archive/session-workfiles/mockup25/mockup25.html');await p.waitForTimeout(1500);
const SEEDV=+(process.env.SEED||7);const res=await p.evaluate((SEEDV)=>{window.SEED=SEEDV;window.TIPS=false;const out=[];let steps=0,seed=+(window.SEED||7);const rnd=n=>{seed=(seed*16807)%2147483647;return seed%n};
 const ops={
  spend:()=>{const a=[20,60,150,400,1500,6000][rnd(6)];const c=S.cats[rnd(S.cats.length)];doPay(S,{amt:a,target:{type:'cat',id:c.id},payee:'x'});return {d:-a}},
  addPlan:()=>{const a=[500,3000,9000][rnd(3)];const d={kp:String(a),pct:[0,10,20,30][rnd(4)]};setWeeks20(d,1+rnd(6));addIncome(d,true);render();return {d:+a}},
  addLoose:()=>{const a=[200,1000][rnd(2)];addIncome({kp:String(a),pct:0},false);render();return {d:+a}},
  toGoal:()=>{const g=S.goals.find(x=>x.state==='active');if(!g)return {d:0};moveMoney(S,{type:'buffer'},{type:'goal',id:g.id},100);return {d:0}},
  fromSav:()=>{if(S.free<50)return {d:0};moveMoney(S,{type:'free'},{type:'buffer'},50);return {d:0}},
  buy:()=>{const g=S.goals.find(x=>x.state!=='done'&&x.saved>0);if(!g)return {d:0};const a=Math.round(g.saved);H.goalbought([g.id]);return {d:-a}},
  day:()=>{advanceDays(S,1+rnd(4));render();return {d:null}},
  sync:()=>{const m=M25();const X=Math.max(0,[0.5,1,1.3][rnd(3)]*m.B|0);UI.flow={id:'sync24',step:1,d:{kp:String(X)}};H.sync24go();return {set:X}},
  weekSave:()=>{advanceDays(S,7);render();const pd=S.pending.shift();if(pd){M25();applyPending(S,pd,{to:'savings'})}render();return {d:null}},
  loose:()=>{H.loose25([rnd(2)?'save':'plan']);render();return {d:0}}};
 const names=Object.keys(ops);
 for(const k of ['V','G','T','Y','N','H','ONB']){if(k==='ONB'){startOnb();H.obgo(['link']);UI.flow.d.kp='400';H.obm(['go']);H.incnext();H.inc23next();H.incfinish();UI.popup=null;}else loadProfile(k);UI.sheet=null;render();
  for(let i=0;i<150;i++){const op=names[rnd(names.length)];const b0=M25().B;let r;try{r=ops[op]()}catch(e){out.push(k+' '+op+' threw '+e.message);continue}
   const m=M25();steps++;const errs=check25();
   if(r.set!=null&&Math.abs(m.B-r.set)>1)errs.push(`sync: balance ${m.B} not ${r.set}`);
   if(r.d!=null&&r.set==null&&op!=='day'&&Math.abs(m.B-(b0+r.d))>1)errs.push(`${op}: balance ${b0}→${m.B}, expected ${b0+r.d}`);
   if(errs.length)out.push(`${k} #${i} ${op}: ${errs.join('; ')} | B${m.B} Sv${m.Sv} Sp${m.Sp} wk${m.left}/${m.budget} later${m.later} loose${m.loose}`)}}
 return {steps,fails:out.length,first:out.slice(0,15)}},SEEDV);
console.log(JSON.stringify(res,null,1),errs.slice(0,5));await b.close()})()
