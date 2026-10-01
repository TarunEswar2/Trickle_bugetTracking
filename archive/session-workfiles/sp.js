const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();for(const w of [1000,400]){const p=await b.newPage({viewport:{width:w,height:900}});const e=[];p.on('pageerror',x=>e.push(x.message));
await p.goto('file:///tmp/claude-0/-home-claude/860f62eb-517e-5d8f-84c5-65604e6e2975/scratchpad/trickle-v9-spec.html');await p.waitForTimeout(800);
console.log(w,e,await p.evaluate(()=>document.body.scrollWidth-innerWidth));await p.screenshot({path:'/tmp/claude-0/-home-claude/860f62eb-517e-5d8f-84c5-65604e6e2975/scratchpad/sp'+w+'.png',fullPage:true});}await b.close();})();
