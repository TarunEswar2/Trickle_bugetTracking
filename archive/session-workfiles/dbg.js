const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();p.on('console',m=>console.log('C',m.text()));
await p.goto('file:///home/claude/v12/app/t12.html#demo');await p.waitForTimeout(200);
console.log(await p.evaluate(async()=>{var g=L.goals[0];g.saved=g.target;g.reachedTs={d:L.today.d,m:L.today.m};MS.user=true;go('V-04');var fg=document.querySelector('.bangle .fg');
 try{var a=fg.animate([{strokeDashoffset:'100'},{strokeDashoffset:'0'}],{duration:500});}catch(e){return 'err '+e.message;}
 await new Promise(r=>setTimeout(r,300));return JSON.stringify({n:document.getAnimations().map(a=>a.playState+' '+a.effect.target.tagName),red:reduced(),same:MS.same,fg:fg.outerHTML});}));await b.close();})();
