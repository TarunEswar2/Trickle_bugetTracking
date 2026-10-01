const {chromium}=require('playwright');const path=require('path');const U='file://'+path.resolve('t10.html');
(async()=>{const b=await chromium.launch();const errs=[],log=[];
const audit=async(p,l)=>{const r=await p.evaluate(()=>{const o=[];document.querySelectorAll('.tg.gm').forEach(g=>{if(!g.offsetParent&&!g.closest('svg'))return;const is=[...g.querySelectorAll(':scope>i.g')];const shapes=new Set(is.map(i=>(i.className.match(/s-(\w+)/)||[])[1]));const card=g.closest('.wc,.card,.skcard,.stage,.moment,section,.story,.sheet,.acc');const single=card&&card.querySelector('.tkey:not(.pk) .kg');const pileKey=g.classList.contains('goalp')||(card&&card.querySelector('.tkey.pk'));const tap=g.closest('[data-a]')||g.hasAttribute('data-a')||g.querySelector('[data-a]')||(card&&card.closest('[data-a]'));const minW=Math.min(...is.filter(i=>getComputedStyle(i).opacity!=='0').map(i=>i.offsetWidth).filter(w=>w>0));
 o.push({n:is.length,sh:[...shapes].join(','),single:!!single,pk:!!pileKey,tap:!!tap,minW,w:(card&&(card.dataset.w||card.dataset.item||card.dataset.id||card.className))||''});});
 const inv=checkInvariant('x');return {o,inv:inv.ok,ow:document.documentElement.scrollWidth-innerWidth};});
 r.o.forEach(x=>{if(!(x.single||x.pk||x.tap))errs.push(l+' no key/tap '+x.w);if(x.single&&!x.pk&&x.sh.split(',').length>1)errs.push(l+' mixed shapes in single-shape chart '+x.w+' '+x.sh);if(x.single&&!x.pk&&x.n>44)errs.push(l+' >40 glyphs '+x.w+' '+x.n);if(x.minW<13.5)errs.push(l+' glyph <14px '+x.w+' '+x.minW);});
 if(!r.inv)errs.push('INV '+l);if(r.ow>0)errs.push('overflow '+l);log.push(l+': '+r.o.length+' glyph grids, max '+Math.max(0,...r.o.map(x=>x.n)));};
const p=await b.newPage({viewport:{width:412,height:860}});p.on('console',m=>{if(m.type()==='error'&&!/fonts|ERR_/.test(m.text()))errs.push(m.text())});p.on('pageerror',e=>errs.push('PE '+e.message));
await p.goto(U+'#demo');await p.waitForTimeout(300);
for(const look of ['color','bw']){await p.evaluate(l=>{S.look=l;S.hidden=[];render();},look);
 for(const t of ['home','money','actions','insights']){await p.evaluate(t=>{S.tab=t;render();},t);if(t==='money'){for(const o of ['income','budget','savings']){await p.evaluate(o=>{S.open=o;render();},o);await p.waitForTimeout(200);await audit(p,look+' money/'+o);}}else{await p.waitForTimeout(200);await audit(p,look+' '+t);}}
 for(const [n,js] of [['pay',"A.pay('upi');A.payee('0');S.sheet.amt='350';S.sheet.step='cat';render();A.pcat('Food')"],['goal',"A.goal('goa')"],['cafe',"A.cafe()"],['story',"A.story()"],['checkin',"A.checkin()"]]){await p.evaluate(()=>{S.sheet=null;S.story=null;render();});await p.evaluate(js).catch(e=>errs.push(n+' '+e.message));await p.waitForTimeout(400);await audit(p,look+' '+n);
  for(let i=0;i<4;i++){const nx=await p.$('[data-a=stnext],[data-a=cinext]');if(!nx)break;await nx.click().catch(()=>{});await p.waitForTimeout(300);await audit(p,look+' '+n+i);}
  await p.evaluate(()=>{try{A.close()}catch(e){}});}
}
// splash + reduced motion
const q=await b.newPage({viewport:{width:412,height:860},reducedMotion:'reduce'});q.on('pageerror',e=>errs.push('PE splash '+e.message));await q.goto(U);await q.waitForTimeout(300);
const sp=await q.evaluate(()=>({has:!!document.querySelector('.splash'),anim:getComputedStyle(document.querySelector('.spf')).animationName}));log.push('splash '+JSON.stringify(sp));if(!sp.has||sp.anim!=='none')errs.push('splash RM');
await q.click('.splash');await q.waitForTimeout(200);const ob=await q.evaluate(()=>!!document.querySelector('.ladder'));if(!ob)errs.push('no ladder onboarding');
const fs=require('fs');const src=fs.readFileSync('trickle-final-v10.html','utf8');const sms=(src.match(/sms/gi)||[]).length;log.push('sms '+sms);if(sms)errs.push('sms found');
console.log(log.join('\n'));console.log('ERRS',JSON.stringify(errs,null,1));await b.close();})();
