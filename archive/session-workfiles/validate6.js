const { chromium } = require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});const errs=[],log=[];
async function page(){const p=await b.newPage({viewport:{width:412,height:915}});p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});p.on('pageerror',e=>errs.push('PE '+e.message));await p.goto('file://'+path.resolve('trickle-final-v6.html'));return p;}
const cur=p=>p.evaluate(()=>S.cur);
async function onboard(p,mode){
 await p.click("text=Get started");
 await p.click(mode==='upi'?"button.lane:has-text('Link UPI')":"button.lane:has-text('Manual entry')");await p.click(".frame.active button:has-text('Continue')");
 if(mode==='upi'){log.push('upi: '+await cur(p));await p.fill('#upi-in','bad');await p.click(".frame.active button:has-text('Add')");await p.fill('#upi-in','nishad@oksbi');await p.click(".frame.active button:has-text('Add')");await p.click(".frame.active button.pill:has-text('nishad@ybl')");await p.click(".frame.active button:has-text('Continue')");}
 log.push(mode+' cats: '+await cur(p));await p.click(".frame.active button.pill:has-text('+ Travel')");await p.click(".frame.active button.pill:has-text('Travel ×')");await p.click(".frame.active button:has-text('Continue')");
 log.push(mode+' alloc: '+await cur(p));await p.locator('#sl-0').fill('2500');await p.click(".frame.active button:has-text('Continue')");
 for(const k of ['1','2','3','4','1','2','3','5'])await p.click(`.frame.active .keypad button:text-is('${k}')`);await p.waitForTimeout(500);log.push('after mismatch '+await cur(p));

 for(const k of ['1','2','3','4'])await p.click(`.frame.active .keypad button:text-is('${k}')`);await p.waitForTimeout(900);
 log.push(mode+' perm: '+await cur(p));await p.click(".frame.active button[aria-label='Camera']");await p.click(".frame.active button:has-text('Continue')");
 log.push(mode+' allset: '+await cur(p));await p.click(".frame.active button:has-text('Open Trickle')");log.push(mode+' -> '+await cur(p)+' food budget '+await p.evaluate(()=>cat('Food').monthly));}
let p=await page();await onboard(p,'upi');
// payment via UI
await p.click(".frame.active button.paytile:has-text('Pay Anyone')");await p.click(".frame.active button.row:has-text('Yash Raina')");await p.fill('#pay-amt','150');await p.click(".frame.active button:has-text('Check & pay')");
await p.click(".sheet button:has-text('Pay ₹150')");log.push('pay -> '+await cur(p));await p.click("text=Round up to a goal");await p.click(".sheet button.tile >> nth=0");log.push('roundup ok '+await p.evaluate(()=>TXNS[0].merchant+' '+TXNS[0].amt+' '+TXNS[0].account));
// tooltips: click first data-t in categories
await p.evaluate(()=>go('categories'));await p.locator('.frame.active [data-t]').first().click({force:true});log.push('tip: '+await p.evaluate(()=>document.getElementById('tip').style.display+' '+document.getElementById('tip').textContent));
// all frames overflow
const fr=await p.evaluate(()=>Object.keys(FR));
for(const f of fr){await p.evaluate(x=>go(x),f);await p.waitForTimeout(30);const o=await p.evaluate(()=>{const a=document.querySelector('.frame.active');let bad=[];a.querySelectorAll('*').forEach(e=>{const r=e.getBoundingClientRect(),pr=a.getBoundingClientRect();if(r.width&&(r.right>pr.right+1||r.left<pr.left-1))bad.push(e.tagName+'.'+e.className.baseVal!==undefined?e.tagName:e.tagName+'.'+e.className)});return [a.scrollWidth-a.clientWidth,bad.length,bad.slice(0,3)]});if(o[0]>0||o[1]>0)log.push('overflow '+f+' '+JSON.stringify(o));}
for(const s of ['budgetSheet','editCatsSheet','periodSheet','quickCatSheet','trackingSheet','accountSheet','savingsSheet']){await p.evaluate(x=>{go('home');openSheet(x)},s);const o=await p.evaluate(()=>{const a=document.getElementById('sheet');return a.scrollWidth-a.clientWidth});if(o>0)log.push('sheet overflow '+s);}
await p.close();
p=await page();await onboard(p,'manual');log.push('manual home has Enter btn: '+await p.locator("button:has-text('+ Enter Transaction')").count());
await p.click(".frame.active button:has-text('+ Enter Transaction')");await p.fill('#me-amt','60');await p.click(".frame.active #me-cats button:has-text('Food')");await p.click(".frame.active button:has-text('Add transaction')");log.push('manual add -> '+await cur(p)+' '+await p.evaluate(()=>TXNS[0].source+' '+TXNS[0].account));
console.log(log.join('\n'));console.log('ERRORS',JSON.stringify(errs));await b.close();})();
