const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:412,height:860}});p.on('console',m=>console.log('C',m.type(),m.text()));p.on('pageerror',e=>console.log('PE',e.message,e.stack));
await p.goto('file://'+__dirname+'/trickle-final-v9.html'+(process.argv[2]||'#demo'));await p.waitForTimeout(800);
for(const s of (process.argv[3]||'').split(';;').filter(Boolean)){await p.evaluate(s);await p.waitForTimeout(400);}
await p.screenshot({path:'shots/dbg.png'});await b.close();})();
