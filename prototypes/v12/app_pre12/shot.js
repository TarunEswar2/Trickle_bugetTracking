const {chromium}=require('playwright');const fs=require('fs');
const U='file://'+__dirname+'/t12.html';const out=process.argv[2]||'shots/all';const scheme=process.argv[3]||'dark';const look=process.argv[4]||'colour';const only=process.argv[5];
fs.mkdirSync(out,{recursive:true});
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:412,height:860},colorScheme:scheme});const errs=[];
p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/fonts\.g|ERR_/.test(m.text()))errs.push(m.text())});
await p.goto(U+'#demo');await p.waitForTimeout(300);
const ids=await p.evaluate(()=>Object.keys(FR));
for(const id of ids){if(only&&!only.split(',').includes(id))continue;
 await p.evaluate(([id,look])=>{seedDemo();['H','I','S','V','N'].forEach(t=>L.seen[t]=1);L.prefs.look=look;S.hist=[];S.toast=null;
   if(id.startsWith('O-')){if(id!=='O-00'){S.ob={apps:['GPay'],type:'Hostel',manual:id==='O-01m',inc:12000,day:1,taps:0,t0:0};L=null;}}
   S.scr=id;S.ctx={};render();},[id,look]);
 await p.waitForTimeout(id==='P-05'?150:60);
 await p.screenshot({path:out+'/'+id+'.png'});}
console.log('frames',ids.length,'errors',JSON.stringify(errs.slice(0,10)));await b.close();})();
