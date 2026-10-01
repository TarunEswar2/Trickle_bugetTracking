const {chromium}=require('playwright');const path=require('path');
const U='file://'+path.resolve('t9.html');
(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const errs=[],log=[];
async function page(hash,opts){const p=await b.newPage(Object.assign({viewport:{width:412,height:860}},opts||{}));p.on('console',m=>{if(m.type()==='error'&&!/fonts|ERR_/.test(m.text()))errs.push(m.text())});p.on('pageerror',e=>errs.push('PE '+e.message));await p.goto(U+(hash||''));await p.waitForTimeout(300);return p;}
const inv=async(p,l)=>{const r=await p.evaluate(()=>checkInvariant('v'));log.push([l,r.ok,r.balance,r.new_money,r.budget,r.savings,r.owed]);if(!r.ok)errs.push('INV '+l);
 const ow=await p.evaluate(()=>{const els=[document.getElementById('vp'),document.querySelector('.sheet .sb'),document.querySelector('.story .sb')].filter(Boolean);return Math.max(document.documentElement.scrollWidth-innerWidth,...els.map(e=>e.scrollWidth-e.clientWidth))});if(ow>0)errs.push('overflow '+l+' '+ow);};
const C=async(p,s)=>{await p.click(s);await p.waitForTimeout(150);};
let p=await page('#demo');
const missing=await p.evaluate(()=>{const src=document.querySelector('script:last-of-type').textContent;const acts=new Set([...src.matchAll(/data-a="([a-z0-9]+)"/gi)].map(m=>m[1]));return [...acts].filter(a=>!A[a])});
if(missing.length)errs.push('missing handlers '+missing);
const count=async(p)=>p.evaluate(()=>{const v=document.getElementById('vp'),r=v.getBoundingClientRect();let first=0,txt=[];const w=document.createTreeWalker(v,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const t=n.textContent.match(/\d[\d,.]*/g);if(!t)continue;const e=n.parentElement;if(e.closest('.tkey,svg')||!e.offsetParent||getComputedStyle(e).visibility==='hidden')continue;const rr=e.getBoundingClientRect();if(rr.height===0)continue;if(rr.top<r.bottom){first+=t.length;txt.push(n.textContent.trim())}}return {first,txt}});
const nums={};for(const t of ['home','money','actions','insights']){await C(p,`[data-a=tab][data-x=${t}]`);await p.waitForTimeout(250);nums[t]=await count(p);await inv(p,'tab '+t);}
if(nums.home.first>2)errs.push('home numbers '+nums.home.first);
// widget audit colour + bw
for(const look of ['color','bw']){await p.evaluate(l=>{S.hidden=[];S.look=l;S.tab='insights';render();},look);await p.waitForTimeout(400);
 const a=await p.evaluate(()=>[...document.querySelectorAll('.wc[data-w]')].map(c=>{const n=c.querySelectorAll('.tg i').length;return {w:c.dataset.w,n,key:!!c.querySelector('.tkey'),waffle:['goal','rate'].includes(c.dataset.w)}}));
 a.forEach(x=>{if(x.n>1&&!x.key)errs.push(look+' no key '+x.w);if(x.n>(x.waffle?100:50))errs.push(look+' too many tiles '+x.w+' '+x.n);});log.push(['widgets '+look,a.length,a.map(x=>x.w+':'+x.n).join(' ')]);
 await p.screenshot({path:'shots/all_'+look+'.png',fullPage:false});await inv(p,'board '+look);}
await p.evaluate(()=>{S.look='color';S.hidden=DEF_ORDER.slice(8);render();});
// other tiled cards on money/actions have keys
for(const t of ['money']){await C(p,`[data-a=tab][data-x=${t}]`);for(const o of ['income','budget','savings']){await p.evaluate(o=>{S.open=o;render();},o);const k=await p.evaluate(()=>[...document.querySelectorAll('.acc[data-open="1"] .card, .acc[data-open="1"] .wc, .acc[data-open="1"] .inner')].filter(c=>c.querySelectorAll('.tg i').length>1&&!c.querySelector('.tkey')).length);if(k)errs.push('money '+o+' keyless '+k);}}
const sk=await p.evaluate(()=>sankeyCheck());log.push(['sankey',JSON.stringify(sk)]);if(!sk.ok)errs.push('sankey '+sk.bad);
const skDom=await p.evaluate(()=>{S.open='income';render();return document.querySelectorAll('.sk .band').length});log.push(['sankey bands in DOM',skDom]);
// pay with repeat line
await C(p,'[data-a=tab][data-x=home]');await C(p,'[data-a=pay][data-x=upi]');await C(p,"[data-a=payee][data-x='0']");await C(p,"[data-a=quick][data-x='50']");await C(p,'[data-a=pstep][data-x=cat]');await C(p,'[data-a=pcat][data-x=Food]');
const rl=await p.$eval('[data-testid=repeat]',e=>e.textContent).catch(()=>null);log.push(['repeat line',rl]);if(!rl)errs.push('no repeat line');
const payKey=await p.$eval('.paystage',e=>e.textContent);log.push(['pay key',payKey]);
await C(p,'[data-a=pstep][data-x=upi]');await C(p,'[data-a=pdone]');await C(p,'.sheet [data-a=close]');await inv(p,'pay chai');
await C(p,'[data-a=pay][data-x=upi]');await C(p,"[data-a=payee][data-x='1']");await C(p,"[data-a=quick][data-x='600']");await C(p,'[data-a=pstep][data-x=cat]');await C(p,'[data-a=pcat][data-x=Fun]');
const opts=await p.$$eval('[data-a=pcover]',e=>e.map(x=>x.dataset.x));log.push(['cover options',opts.join('|')]);
await C(p,"[data-a=pcover][data-x='goal:general']");await C(p,'[data-a=pdone]');await inv(p,'pay overflow from jar');
await C(p,'[data-a=splitit]');await C(p,"[data-a=sppick][data-x=Riya]");await C(p,'[data-a=spok]');await inv(p,'split after pay');
await C(p,'[data-a=pay][data-x=log]');await C(p,"[data-a=quick][data-x='50']");await C(p,'[data-a=pstep][data-x=cat]');await C(p,'[data-a=pcat][data-x=Food]');await C(p,'[data-a=pdone]');await C(p,'.sheet [data-a=close]');await inv(p,'log cash');
await p.evaluate(()=>A.cafe());await p.waitForTimeout(400);await inv(p,'income split');
await C(p,'[data-a=incundo]');await inv(p,'income undo');log.push(['new money after undo',await p.evaluate(()=>POOLS().nm)]);
await C(p,'[data-a=sortnew]');await inv(p,'sort new money');
await C(p,'[data-a=tab][data-x=actions]');const bF=await p.evaluate(()=>POOLS().b.Food);await C(p,'[data-item=split] [data-a=settle]');await C(p,'[data-a=settleone]');const aF=await p.evaluate(()=>POOLS().b.Food);log.push(['Food before/after repayment',bF,aF]);await C(p,'.sheet [data-a=close]');await inv(p,'settle');
await C(p,'[data-item=cat] [data-a=catset]');await inv(p,'categorise');
await C(p,'[data-item=sub] [data-a=subkeep]');await C(p,'[data-item=checkin] [data-a=checkin]');for(let i=0;i<3;i++)await C(p,'[data-a=cinext]');await C(p,'[data-a=cidone]');await inv(p,'checkin 4 cards');
await C(p,'[data-a=tab][data-x=money]');await C(p,'[data-a=goalnew]');await C(p,'[data-a=gn]');await C(p,'[data-a=gn]');await C(p,'.sheet [data-a=close]');await inv(p,'goal create');
await p.evaluate(()=>A.goal('goa'));await p.waitForTimeout(200);const ge=await p.$$eval('.sheet .card',e=>e.length);log.push(['goal detail cards',ge]);
await p.evaluate(()=>{goalById('goa').target=Math.round(POOLS().g.goa)+100;A.goal('goa');});await C(p,"[data-a=gadd][data-x='100']");log.push(['reached sheet',!!await p.$('[data-a=gspend]')]);await C(p,'[data-a=gspend]');await inv(p,'goal reached+spend');
await p.evaluate(()=>{S.open='budget';render();});await C(p,'[data-a=move]');await C(p,"[data-a=mv][data-x='from:Travel']");await C(p,"[data-a=mv][data-x='to:Food']");await C(p,"[data-a=mv][data-x='amt:1']");await inv(p,'move');
// pin / reorder / hide / add via settings
await C(p,'[data-a=tab][data-x=insights]');await C(p,'[data-w=tod] [data-a=wset]');await C(p,'.sheet [data-a=wpin]');await C(p,'[data-w=tod] [data-a=wset]');await C(p,".sheet [data-a=wmove][data-x='tod:-1']");await C(p,'.sheet [data-a=close]');
const ord=await p.$$eval('.board [data-w]',e=>e.map(x=>x.dataset.w));log.push(['board order',ord.join(',')]);if(ord.indexOf('tod')>ord.indexOf('vs'))errs.push('reorder failed');
await C(p,'[data-w=range] [data-a=wset]');await C(p,'.sheet [data-a=whide]');await C(p,'.addw');await C(p,".sheet [data-a=wshow][data-x=eta]");
const ord2=await p.$$eval('.board [data-w]',e=>e.map(x=>x.dataset.w));if(ord2.includes('range')||!ord2.includes('eta'))errs.push('hide/add failed');
await C(p,'[data-a=tab][data-x=home]');const pins=await p.$$eval('.board [data-w]',e=>e.map(x=>x.dataset.w));log.push(['home pins',pins.join(',')]);if(!pins.includes('tod'))errs.push('pin failed');
await p.evaluate(()=>A.rbopen());await p.waitForTimeout(300);log.push(['rb detail total',await p.$eval('[data-count]',e=>e.dataset.count)]);await C(p,'.sheet [data-a=close]');
await p.evaluate(()=>{SWEEP='manual'});await p.evaluate(()=>A.story());for(let i=0;i<4;i++){await C(p,'[data-a=stnext]');}log.push(['story sankey',await p.evaluate(()=>document.querySelectorAll('.story .sk').length)]);
await C(p,'[data-a=fresh]');await inv(p,'fresh start');await C(p,'.sheet [data-a=close]');
await C(p,'[data-a=tab][data-x=actions]');if(await p.$('[data-item=left]')){await C(p,'[data-a=leftsave]');await inv(p,'leftover saved');}
await C(p,'[data-a=drawer][data-x="1"]');await C(p,'[data-a=look][data-x=bw]');await C(p,'[data-a=snd][data-x="0"]');log.push(['snd off',await p.evaluate(()=>SND.on)]);await C(p,'[data-a=snd][data-x="1"]');await C(p,'[data-a=rn][data-x="4"]');await C(p,'[data-a=period][data-x=week]');await C(p,'[data-a=fp][data-x=fast]');await C(p,'.drawer [data-a=drawer]');
await C(p,'[data-a=tab][data-x=home]');log.push(['glow bw fast',await p.$eval('#glow',e=>e.style.getPropertyValue('--gc'))]);await C(p,'[data-a=txlist]');await C(p,'.sheet [data-a=txd]');await C(p,'[data-a=txback]');await inv(p,'tx list');
const au=await p.evaluate(()=>({ctx:SND.ctx?SND.ctx.state:null,voices:SND.log.length,max:Math.max(0,...SND.log),played:[...new Set(SND.played||[])].join(',')}));log.push(['audio',JSON.stringify(au)]);if(au.max>0.15)errs.push('gain too high');
log.push(['INV_LOG',await p.evaluate(()=>INV_LOG.length),'all ok',await p.evaluate(()=>INV_LOG.every(r=>r.ok))]);
await p.close();
for(const path2 of ['upi','manual']){const q=await page('');await C(q,"[data-a=ob][data-x='2']");await C(q,`[data-a=obt][data-x=${path2}]`);if(path2==='upi')await C(q,'[data-a=oblink]');else await C(q,"[data-a=ob][data-x='4']");await C(q,'[data-a=obp][data-x=week]');await C(q,"[data-a=obb][data-x='-500']");await C(q,"[data-a=ob][data-x='6']");await C(q,'[data-a=obc][data-x=Books]');await C(q,"[data-a=ob][data-x='7']");await C(q,"[data-a=obg][data-x='New phone']");await q.waitForTimeout(300);await C(q,'[data-a=obdone]');
 await inv(q,'onb '+path2);for(const t of ['money','insights']){await C(q,`[data-a=tab][data-x=${t}]`);await inv(q,'onb '+path2+' '+t);}await q.close();}
const r=await page('#demo',{reducedMotion:'reduce'});const dur=await r.evaluate(()=>{S.tab='insights';render();const t=document.querySelector('.wc .tg i.f'),bd=document.querySelector('.sk .band');return [getComputedStyle(t).animationDuration,getComputedStyle(bd).animationDuration,getComputedStyle(bd).animationDelay]});log.push(['reduced-motion tile/band',dur.join(' ')]);await r.close();
console.log(JSON.stringify({nums,log,errs},null,1));await b.close();})();
