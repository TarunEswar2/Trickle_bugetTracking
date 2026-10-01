const { chromium } = require('playwright');const fs=require('fs'),path=require('path');
fs.writeFileSync('t7.html','<!DOCTYPE html>'+fs.readFileSync('trickle-final-v7.html','utf8'));
(async()=>{
 const items=process.argv.slice(2);const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});const errs=[];
 for(const it of items){const [fr,act,hash]=it.split('|');
  const p=await b.newPage({viewport:{width:440,height:900}});
  p.on('console',m=>{if((m.type()==='error'||m.type()==='assert')&&!/ERR_TUNNEL|fonts/.test(m.text()))errs.push(it+': '+m.text())});p.on('pageerror',e=>errs.push(it+' PE '+e.message));
  const onb=fr.startsWith('onb:');
  await p.goto('file://'+path.resolve('t7.html')+(onb?'':'#'+(hash||'demo')));
  if(onb) await p.evaluate(x=>{S.tracking='upi';ACCOUNTS=ACC_SEED.slice();go(x)},fr.slice(4)); else if(fr!=='-') await p.evaluate(x=>go(x),fr);
  if(act) await p.evaluate(act);
  await p.waitForTimeout(250);
  const ow=await p.evaluate(()=>{const f=document.querySelector('.frame.active');const s=document.getElementById('sheet');return [f.scrollWidth-f.clientWidth,s.scrollWidth-s.clientWidth,document.getElementById('inv').dataset.ok]});
  if(ow[0]>0||ow[1]>0)errs.push(it+' overflowX '+ow);if(ow[2]!=='1')errs.push(it+' INVARIANT');
  await p.addStyleTag({content:'.phone{height:auto!important;min-height:600px}.viewport{overflow:visible;min-height:560px}.frame.active{position:relative!important;overflow:visible}.scrim.show{position:absolute}.drawer{position:absolute}'});
  await p.waitForTimeout(80);
  const name=(fr+(act?'_'+act.replace(/[^a-z]/gi,'').slice(0,18):'')).replace(/[:|]/g,'_');
  const bb=await p.locator('.phone').boundingBox();const tall=bb.height;if(tall>2200){for(let y=0,k=0;y<tall;y+=1800,k++)await p.screenshot({path:'shots7/'+name+'_'+k+'.png',clip:{x:bb.x,y:bb.y+y,width:bb.width,height:Math.min(1800,tall-y)},fullPage:true});}else await p.locator('.phone').screenshot({path:'shots7/'+name+'.png'});await p.close();}
 console.log('errors:',JSON.stringify(errs,null,1));await b.close();})();
