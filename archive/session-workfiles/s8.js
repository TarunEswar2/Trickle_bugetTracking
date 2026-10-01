const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:require('fs').readdirSync('/opt/pw-browsers').filter(d=>d.startsWith('chromium')).map(d=>'/opt/pw-browsers/'+d+'/chrome-linux/chrome').find(p=>require('fs').existsSync(p))});
for(const w of [1200,400]){const p=await b.newPage({viewport:{width:w,height:900}});await p.goto('file:///home/claude/v12/board.html');await p.waitForTimeout(500);
const r=await p.evaluate(()=>({ov:document.documentElement.scrollWidth>innerWidth}));console.log(w,JSON.stringify(r));
await (await p.$('#p8')).screenshot({path:'/home/claude/v12/shots/p8_'+w+'.png'});}
await b.close();})();
