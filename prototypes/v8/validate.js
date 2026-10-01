const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const U='file://'+path.resolve('t8.html');
(async()=>{const b=await chromium.launch();const errs=[],log=[];
async function page(hash,opts){const p=await b.newPage(Object.assign({viewport:{width:412,height:860}},opts||{}));p.on('console',m=>{if(m.type()==='error'&&!/fonts|ERR_/.test(m.text()))errs.push(m.text())});p.on('pageerror',e=>errs.push('PE '+e.message));await p.goto(U+(hash||''));await p.waitForTimeout(200);return p;}
const inv=async(p,l)=>{const r=await p.evaluate(()=>{const x=checkInvariant('v');return x});log.push([l,r.ok,r.balance,r.new_money,r.budget,r.savings,r.owed]);if(!r.ok)errs.push('INV '+l);
 const ow=await p.evaluate(()=>{const els=[document.getElementById('vp'),document.querySelector('.sheet .sb'),document.querySelector('.story .sb')].filter(Boolean);return Math.max(document.documentElement.scrollWidth-innerWidth,...els.map(e=>e.scrollWidth-e.clientWidth))});if(ow>0)errs.push('overflow '+l+' '+ow);};
const C=async(p,s)=>{await p.click(s);await p.waitForTimeout(120);};
// 1. nav targets: every data-a has a handler
let p=await page('#demo');
const missing=await p.evaluate(()=>{const src=document.querySelector('script:last-of-type').textContent;const acts=new Set([...src.matchAll(/data-a="([a-z0-9]+)"/gi)].map(m=>m[1]));return [...acts].filter(a=>!A[a])});
if(missing.length)errs.push('missing handlers '+missing);
// numbers per screen
const count=async(p)=>p.evaluate(()=>{const v=document.getElementById('vp'),r=v.getBoundingClientRect();let first=0,all=0;const w=document.createTreeWalker(v,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const t=n.textContent.match(/\d[\d,.]*/g);if(!t)continue;const e=n.parentElement;if(!e.offsetParent||getComputedStyle(e).visibility==='hidden')continue;const rr=e.getBoundingClientRect();if(rr.height===0)continue;all+=t.length;if(rr.top<r.bottom)first+=t.length;}return {first,all}});
const nums={};const which=async(p)=>p.evaluate(()=>{const v=document.getElementById('vp');const o=[];const w=document.createTreeWalker(v,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const e=n.parentElement;if(/\d/.test(n.textContent)&&e.offsetParent&&getComputedStyle(e).visibility!=='hidden')o.push(n.textContent.trim())}return o});
for(const t of ['home','money','actions','insights']){await C(p,`[data-a=tab][data-x=${t}]`);await p.waitForTimeout(200);nums[t]=await count(p);nums[t].which=await which(p);await inv(p,'tab '+t);}
// red check on Home
await C(p,'[data-a=tab][data-x=home]');
const red=await p.evaluate(()=>{let bad=[];document.querySelectorAll('#app *').forEach(e=>{const cs=getComputedStyle(e);[cs.color,cs.backgroundColor,cs.borderColor].forEach(c=>{const m=c.match(/rgba?\((\d+), (\d+), (\d+)/);if(m){const [r,g,b]=[+m[1],+m[2],+m[3]];if(r>180&&g<90&&b<90)bad.push(e.className+':'+c)}})});return bad.slice(0,5)});
if(red.length)errs.push('red on home '+red);
// 2. pay with overflow (from Rainy-day jar)
await C(p,'[data-a=pay][data-x=upi]');await C(p,"[data-a=payee][data-x='1']");await C(p,"[data-a=quick][data-x='600']");await C(p,'[data-a=pstep][data-x=cat]');await C(p,'[data-a=pcat][data-x=Fun]');
const opts=await p.$$eval('[data-a=pcover]',e=>e.map(x=>x.dataset.x));log.push(['cover options',opts.join('|')]);
await C(p,"[data-a=pcover][data-x='goal:general']");await C(p,'[data-a=pdone]');await inv(p,'pay overflow from jar');
await C(p,'[data-a=splitit]');await C(p,"[data-a=sppick][data-x=Riya]");await C(p,'[data-a=spok]');await inv(p,'split after pay');
// pay overflow next month
await C(p,'[data-a=pay][data-x=upi]');await C(p,"[data-a=payee][data-x='1']");await C(p,"[data-a=quick][data-x='600']");await C(p,'[data-a=pstep][data-x=cat]');await C(p,'[data-a=pcat][data-x=Fun]');await C(p,"[data-a=pcover][data-x=next]");await C(p,'[data-a=pdone]');await C(p,'.sheet [data-a=close]');await inv(p,'pay overflow next month');
// log spend
await C(p,'[data-a=pay][data-x=log]');await C(p,"[data-a=quick][data-x='50']");await C(p,'[data-a=pstep][data-x=cat]');await C(p,'[data-a=pcat][data-x=Food]');await C(p,'[data-a=pdone]');await C(p,'.sheet [data-a=close]');await inv(p,'log cash');
// income arrival + undo + sort
let before=await p.evaluate(()=>POOLS().balance);
await p.evaluate(()=>A.cafe());await p.waitForTimeout(300);await inv(p,'income split');
await C(p,'[data-a=incundo]');await inv(p,'income undo');const nm=await p.evaluate(()=>POOLS().nm);log.push(['new money after undo',nm]);
await C(p,'[data-a=sortnew]');await inv(p,'sort new money');
// settle
await C(p,'[data-a=tab][data-x=actions]');const bF=await p.evaluate(()=>POOLS().b.Food);await C(p,'[data-item=split] [data-a=settle]');await C(p,'[data-a=settleone]');const aF=await p.evaluate(()=>POOLS().b.Food);log.push(['Food before/after repayment',bF,aF]);await C(p,'.sheet [data-a=close]');await inv(p,'settle');
await C(p,'[data-item=cat] [data-a=catset]');await inv(p,'categorise');
await C(p,'[data-item=sub] [data-a=subkeep]');await C(p,'[data-item=checkin] [data-a=checkin]');await C(p,'[data-a=cinext]');await C(p,'[data-a=cinext]');await C(p,'[data-a=cidone]');await inv(p,'checkin');
// goals
await C(p,'[data-a=tab][data-x=money]');await C(p,'[data-a=goalnew]');await C(p,'[data-a=gn]');await C(p,'[data-a=gn]');await C(p,'.sheet [data-a=close]');await inv(p,'goal create');
await p.evaluate(()=>{goalById('goa').target=Math.round(POOLS().g.goa)+100;A.goal('goa');});await C(p,"[data-a=gadd][data-x='100']");const reached=await p.$('[data-a=gspend]');log.push(['reached sheet',!!reached]);await C(p,'[data-a=gspend]');await inv(p,'goal reached+spend');
// move
await C(p,'[data-a=open][data-x=budget]');await C(p,'[data-a=move]');await C(p,"[data-a=mv][data-x='from:Travel']");await C(p,"[data-a=mv][data-x='to:Food']");await C(p,"[data-a=mv][data-x='amt:1']");await inv(p,'move');
// widgets
await C(p,'[data-a=tab][data-x=insights]');await C(p,'[data-w=tod] [data-a=wpin]');await C(p,'[data-a=wedit]');await C(p,"[data-a=wmove][data-x='tod:-1']");await C(p,'[data-w=week] [data-a=whide]');await C(p,'[data-a=wedit]');
await C(p,'[data-a=tab][data-x=home]');const pins=await p.$$eval('.pinrow [data-w]',e=>e.map(x=>x.dataset.w));log.push(['home pins',pins.join(',')]);if(pins.indexOf('tod')<0)errs.push('pin failed');
// story + fresh start (manual sweep)
await p.evaluate(()=>{SWEEP='manual'});await p.evaluate(()=>A.story());for(let i=0;i<3;i++)await C(p,'[data-a=stnext]');await C(p,'[data-a=fresh]');await inv(p,'fresh start');await C(p,'.sheet [data-a=close]');
await C(p,'[data-a=tab][data-x=actions]');const left=await p.$('[data-item=left]');log.push(['leftover item',!!left]);if(left){await C(p,'[data-a=leftsave]');await inv(p,'leftover saved');}
// drawer + tx list/detail
await C(p,'[data-a=drawer][data-x="1"]');await C(p,'[data-a=period][data-x=week]');await C(p,'[data-a=fp][data-x=fast]');await C(p,'.drawer [data-a=drawer]');await C(p,'[data-a=tab][data-x=home]');const glow=await p.$eval('#glow',e=>e.style.getPropertyValue('--gc'));log.push(['glow fast',glow]);await C(p,'[data-a=txlist]');await C(p,'.sheet [data-a=txd]');await C(p,'[data-a=txback]');await inv(p,'tx list');
log.push(['INV_LOG entries',await p.evaluate(()=>INV_LOG.length),'all ok',await p.evaluate(()=>INV_LOG.every(r=>r.ok))]);
await p.close();
// onboarding both paths
for(const path2 of ['upi','manual']){const q=await page('');await C(q,"[data-a=ob][data-x='2']");await C(q,`[data-a=obt][data-x=${path2}]`);if(path2==='upi')await C(q,'[data-a=oblink]');else await C(q,"[data-a=ob][data-x='4']");await C(q,'[data-a=obp][data-x=week]');await C(q,"[data-a=obb][data-x='-500']");await C(q,"[data-a=ob][data-x='6']");await C(q,'[data-a=obc][data-x=Books]');await C(q,"[data-a=ob][data-x='7']");await C(q,"[data-a=obg][data-x='New phone']");await q.waitForTimeout(300);await C(q,'[data-a=obdone]');
 const st=await q.evaluate(()=>({t:TRACK,p:PERIOD,c:CATS.join(','),b:Object.values(FIXED).reduce((a,b)=>a+b,0),g:topGoal().name,src:TX.filter(t=>t.type==='spend').slice(-5).map(t=>t.source).join(',')}));log.push(['onb '+path2,JSON.stringify(st)]);await inv(q,'onb '+path2);await q.close();}
// reduced motion
const r=await page('#demo',{reducedMotion:'reduce'});const dur=await r.evaluate(()=>getComputedStyle(document.querySelector('.glow i')).animationDuration);log.push(['reduced-motion glow anim',dur]);await r.close();
console.log(JSON.stringify({nums,log,errs},null,1));await b.close();})();
