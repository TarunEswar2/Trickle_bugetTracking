const { chromium } = require('playwright');const fs=require('fs'),path=require('path');
fs.writeFileSync('t7.html','<!DOCTYPE html>'+fs.readFileSync('trickle-final-v7.html','utf8'));
const log=[];async function C(p,sel){if(!/^(\.tab|#)/.test(sel))sel='.frame.active >> '+sel;await p.click(sel,{timeout:8000,force:/editing|Move up|Hide widget/.test(sel)});await p.waitForTimeout(60);}
let errs=[];
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
 async function page(hash){const p=await b.newPage({viewport:{width:440,height:900}});p.on('console',m=>{if((m.type()==='error'||m.type()==='assert')&&!/ERR_TUNNEL|fonts/.test(m.text()))errs.push(m.text())});p.on('pageerror',e=>errs.push('PE '+e.message));await p.goto('file://'+path.resolve('t7.html')+(hash||''));return p;}
 async function inv(p,label){const r=await p.evaluate(()=>{var x=checkInvariant('check');return {ok:x.ok,ta:x.to_assign,b:Math.round(x.budget),s:Math.round(x.savings),bal:Math.round(x.balance),owed:x.owed,badge:badgeCount(),cur:S.cur};});log.push(label+' '+JSON.stringify(r));if(!r.ok)errs.push('INV FAIL '+label);return r;}
 const shot=(p,n)=>p.screenshot({path:'shots7/flow_'+n+'.png'});
 // ---- onboarding UPI path by clicks
 let p=await page();
 await C(p,'text=Get started');await C(p,'text=Link UPI');await C(p,'button:has-text("Continue")');
 await p.fill('#upi-in','bad');await C(p,'button:has-text("Add")');await shot(p,'upi_err');
 await C(p,'text=+ nishad@oksbi');await C(p,'button:has-text("Continue")');
 await C(p,'text=Match payday');await shot(p,'period');await C(p,'button:has-text("Continue")');
 await C(p,'button:has-text("Freelance")');await C(p,'text=+ Custom');await p.fill('#inc-c','Tutoring');await C(p,'.frow button:has-text("Add")');await shot(p,'income');await C(p,'button:has-text("Continue")');
 await C(p,'button:has-text("Continue")');await shot(p,'alloc');await C(p,'button:has-text("Continue")');
 await C(p,'.seg button:has-text("Auto")');await shot(p,'sweepSplit');await C(p,'button:has-text("Continue")');
 for(const k of '1234')await C(p,'.keypad button:text-is("'+k+'")');for(const k of '1111')await C(p,'.keypad button:text-is("'+k+'")');await p.waitForTimeout(500);
 for(const k of '1234')await C(p,'.keypad button:text-is("'+k+'")');await p.waitForTimeout(900);
 await C(p,'button:has-text("Continue")');await shot(p,'allset');await C(p,'text=Open Trickle');await inv(p,'onb-upi');
 log.push('onb upi -> '+await p.evaluate(()=>S.cur+' period='+S.period+' sweep='+S.sweep));await p.close();
 // ---- manual path
 p=await page();await C(p,'text=Get started');await C(p,'text=Manual entry');await C(p,'button:has-text("Continue")');
 for(let i=0;i<5;i++)await C(p,'button:has-text("Continue")');
 for(const k of '12341234')await C(p,'.keypad button:text-is("'+k+'")');await p.waitForTimeout(900);
 await C(p,'button:has-text("Continue")');await C(p,'text=Open Trickle');await inv(p,'onb-manual');
 log.push('manual accounts null: '+await p.evaluate(()=>TX.every(t=>t.source!=='UPI'&&t.account==null)));await p.close();
 // ---- demo flows
 p=await page('#demo');await inv(p,'seed');
 // UPI payment with overspend cover
 await C(p,'text=Scan QR');await C(p,'.pill:has-text("Snacks")');await C(p,'text=Simulate a scan');await p.fill('#pay-amt','450');
 await C(p,'button.btn:has-text("Pay")');await shot(p,'cover');log.push('cover cur '+await p.evaluate(()=>S.cur+' sel='+S.coverCtx.sel));
 await C(p,'.opt:has-text("A savings goal")');await shot(p,'cover_goal');await C(p,'.opt:has-text("To assign")');
 await C(p,'button:has-text("Cover & pay")');await p.waitForTimeout(1700);await shot(p,'payConfirm');await inv(p,'upi+cover');
 await C(p,'button:has-text("Done")');
 // manual spend with split
 await C(p,'.tab[data-tab=actions]');await C(p,'text=Log spend');for(const k of '300')await C(p,'.keypad button:text-is("'+k+'")');
 await C(p,'.pill:has-text("Food")');await C(p,'button[aria-label=Split]');await C(p,'.person:has-text("Arjun")');await C(p,'.person:has-text("Meera")');await shot(p,'logspend_split');
 const owedBefore=await p.evaluate(()=>owedOpen());await C(p,'text=Save · Manual');await inv(p,'manual+split');
 log.push('owed '+owedBefore+' -> '+await p.evaluate(()=>owedOpen())+' cur='+await p.evaluate(()=>S.cur));
 if(await p.evaluate(()=>S.cur)==='coverSheet'){await C(p,'button:has-text("Cover & save")');await inv(p,'manual cover');}
 // settle split (inbox) with custom shares
 await C(p,'.tab[data-tab=actions]');await C(p,'[data-inbox^="split:"] button[aria-label="More options"]');await C(p,'.segw button:has-text("Custom")');
 const ins=await p.$$('.frame.active .sharerow input');await ins[0].fill('300');await shot(p,'settle_gap');
 await ins[0].fill('240');await ins[1].fill('240');await ins[2].fill('240');await ins[3].fill('240');await shot(p,'settle_ok');await C(p,'#sh-save');await inv(p,'settle split');
 // repayment
 await C(p,'.tab[data-tab=money]');await C(p,'text=See all ›');await shot(p,'owed');const bal0=await p.evaluate(()=>POOLS().balance);
 await C(p,'.inbox button:has-text("Mark repaid")');const r=await inv(p,'repayment');log.push('balance +'+(r.bal-Math.round(bal0))+' last settle returns '+await p.evaluate(()=>JSON.stringify(TX.filter(t=>t.type==='settle').slice(-1)[0].returns)));
 await C(p,'.inbox button:has-text("Remind")');await shot(p,'remind');await C(p,'#sheet button:has-text("Close")');
 // assign income
 await C(p,'.tab[data-tab=actions]');await C(p,'[data-inbox^="inc:"] button[aria-label="More options"]');await C(p,'text=Fill underfunded first');await shot(p,'assign');await C(p,'#as-cta');await inv(p,'assign income');
 // overspend (Snacks) cover via one tap if still there
 await C(p,'.tab[data-tab=actions]');const ov=await p.$('.frame.active [data-inbox^="over:"] .lbtn');if(ov){await ov.click();await inv(p,'overspend cover');}
 await C(p,'[data-inbox^="sub:"] .lbtn');await inv(p,'sub looks right');
 await C(p,'[data-inbox^="cat:"] button[aria-label="More options"]');await C(p,'#cat-always');await C(p,'text=Save category');await inv(p,'categorise');
 await shot(p,'actions_after');
 // sweep: close period, then sweep to goal
 await p.evaluate(()=>{S.sweep='manual';demoClosePeriod();});await inv(p,'close period');await C(p,'.tab[data-tab=actions]');await shot(p,'actions_sweep');
 await C(p,'[data-inbox^="sweep:"] button[aria-label="More options"]');await shot(p,'sweep');await C(p,'button.btn:has-text("Sweep to")');await inv(p,'sweep');
 // undo test
 await p.evaluate(()=>{var a=POOLS().balance;});await C(p,'.tab[data-tab=actions]');
 // move money
 await C(p,'text=Move money');await p.fill('#mv-amt','100');await C(p,'button.btn:has-text("Move")');await inv(p,'move');
 await C(p,'text=Move money');await p.evaluate(()=>{S.flow.from='goal:goa';S.flow.to='to_assign';rerender();});await p.fill('#mv-amt','200');await shot(p,'move_slip');await C(p,'button.btn:has-text("Move")');await inv(p,'withdraw');
 // add income
 await C(p,'.tab[data-tab=actions]');await C(p,'text=Add income');await p.fill('#ai-amt','500');await C(p,'.pill:has-text("Gift")');await p.fill('#ai-amt','500');await C(p,'text=Save income');await C(p,'#sheet button:has-text("Later")');await inv(p,'add income later');
 // undo
 await p.evaluate(()=>{S.sweep='manual'});await C(p,'text=Log spend');await C(p,'.pill:has-text("Stationery")');await p.evaluate(()=>{transfer([{ref:'to_assign',amt:200}],[{ref:'budget:Stationery',amt:200}],'assign');VER++;});for(const k of '50')await C(p,'.keypad button:text-is("'+k+'")');await C(p,'text=Save · Manual');const n1=await p.evaluate(()=>TX.length);await C(p,'#toast button');const n2=await p.evaluate(()=>TX.length);log.push('undo '+n1+'->'+n2);await inv(p,'undo');
 // pin widget & see on Home
 await C(p,'.tab[data-tab=home]');await p.evaluate(()=>{S.pins=S.pins.filter(x=>x!=='W03');});await C(p,'.tab[data-tab=insights]');
 await C(p,'.tab[data-tab=home]');await C(p,'#home-pins .w[data-w=W26] .pinb');await C(p,'.tab[data-tab=insights]');await C(p,'.w[data-w=W13] .pinb');await C(p,'.tab[data-tab=home]');await shot(p,'home_pinned');log.push('home pins '+await p.evaluate(()=>[...document.querySelectorAll('#home-pins .w')].map(x=>x.dataset.w).join(',')));
 await C(p,'text=Edit Home widgets');await shot(p,'edit');await C(p,'.w[data-w=W13] button[aria-label="Move up"]');await C(p,'.w[data-w=W16] button[aria-label="Hide widget"]');await C(p,'text=Add from library');await C(p,'.row:has-text("Top merchants") .lbtn');
 log.push('home pins after reorder '+await p.evaluate(()=>{tabGo('home');return [...document.querySelectorAll('#home-pins .w')].map(x=>x.dataset.w).join(',')}));log.push('hidden '+await p.evaluate(()=>JSON.stringify(S.hidden)));
 await p.close();
 console.log(log.join('\n'));console.log('ERRORS',JSON.stringify(errs));await b.close();})().catch(e=>{console.log(log.join('\n'));console.log('FAIL',e.message.slice(0,500));console.log(JSON.stringify(errs));process.exit(1)});
