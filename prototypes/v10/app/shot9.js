const {chromium}=require('playwright');process.env.X=1;const path=require('path');
(async()=>{const b=await chromium.launch({executablePath:require('fs').readdirSync('/opt/pw-browsers').filter(d=>d.startsWith('chromium-')).map(d=>'/opt/pw-browsers/'+d+'/chrome-linux/chrome')[0]});const errs=[];
const items=JSON.parse(require('fs').readFileSync(process.argv[2],'utf8'));
for(const [name,hash,steps] of items){const p=await b.newPage({viewport:{width:412,height:860}});
 p.on('console',m=>{if(m.type()==='error'&&!/fonts|ERR_/.test(m.text()))errs.push(name+': '+m.text())});p.on('pageerror',e=>errs.push(name+' PE '+e.message));
 await p.goto('file://'+path.resolve('trickle-final-v10.html')+(hash||''));await p.waitForTimeout(300);
 for(const s of steps){ if(s.startsWith('js:'))await p.evaluate(s.slice(3)); else await p.click(s); await p.waitForTimeout(350);}
 await p.waitForTimeout(1500);
 const r=await p.evaluate(()=>{const v=document.querySelector('.sheet .sb,.story .sb')||document.getElementById('vp');return {ow:document.body.scrollWidth-innerWidth,vx:v?v.scrollWidth-v.clientWidth:0,inv:document.getElementById('inv').dataset.ok}});
 if(r.ow>0||r.vx>0)errs.push(name+' overflow '+JSON.stringify(r));if(r.inv==='0')errs.push(name+' INVARIANT');
 await p.addStyleTag({content:'.phone{height:auto!important;overflow:visible!important;max-height:none!important}body{height:auto!important}html{height:auto!important}.viewport{overflow:visible!important;flex:none!important}.sheet,.story{position:relative!important}.sheet .sb,.story .sb{overflow:visible!important}'}).catch(()=>{});
 await p.screenshot({path:'shots/'+name+'.png',fullPage:true});await p.close();}
console.log('errors',JSON.stringify(errs,null,1));await b.close();})();
