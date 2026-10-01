const { chromium } = require('playwright');
const path=require('path');
(async()=>{
 const frames=process.argv.slice(2);
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
 const errs=[];
 for(const f of frames){
  const p=await b.newPage({viewport:{width:440,height:900}});
  p.on('console',m=>{if(m.type()==='error')errs.push(f+': '+m.text())});p.on('pageerror',e=>errs.push(f+' PE '+e.message));
  const [fr,act]=f.split('|');
  const onb=fr.startsWith('onb:');
  await p.goto('file://'+path.resolve('trickle-final-v6.html')+(onb?'':'#demo'));
  if(onb) await p.evaluate(x=>{S.tracking='upi';ACCOUNTS=ACC_SEED.slice();go(x)},fr.slice(4)); else await p.evaluate(x=>go(x),fr);
  if(act) await p.evaluate(act);
  await p.waitForTimeout(200);
  const ow=await p.evaluate(()=>{const f=document.querySelector('.frame.active');const s=document.getElementById('sheet');return [f.scrollWidth-f.clientWidth,s.scrollWidth-s.clientWidth]});
  if(ow[0]>0||ow[1]>0)errs.push(f+' overflowX '+ow);
  await p.addStyleTag({content:'.phone{height:auto!important;min-height:600px}.viewport{overflow:visible;min-height:560px}.frame.active{position:relative!important;overflow:visible}.scrim.show{position:absolute}'});
  await p.waitForTimeout(100);
  await p.locator('.phone').screenshot({path:'shots6/'+fr.replace(/[:|]/g,'_')+(act?'_'+act.replace(/[^a-z]/gi,'').slice(0,14):'')+'.png'});
  await p.close();
 }
 console.log('errors:',JSON.stringify(errs));
 await b.close();})();
