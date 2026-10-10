const {chromium}=require('/opt/node-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1280,height:1000}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///home/user/Trickle_bugetTracking/archive/session-workfiles/mockup21/mockup21.html');await p.waitForTimeout(1500);
const click=async sel=>{await p.click(sel,{timeout:4000});await p.waitForTimeout(250)};const log=[];const closeIf=async()=>{if(await p.$('#coach21 [data-a=closesheet]'))await click('#coach21 [data-a=closesheet]');else if(await p.$('.sheet [data-a=closesheet]'))await click('.sheet [data-a=closesheet]')};
const tip=()=>p.evaluate(()=>UI.sheet&&UI.sheet.id==='tip'?UI.sheet.p.k:UI.sheet&&UI.sheet.id==='gridhow'?'grid':null);
await p.evaluate(()=>startOnb());await p.waitForTimeout(300);
await click('[data-a="obgo|link"]');await click('[data-a="obm|skip"]');log.push('home',await tip());
await p.evaluate(()=>{UI.popup=null;render()});
await click('[data-a="payscan"]');await click('[data-a="paybyhand"]');await p.evaluate(()=>{UI.flow.d.kp='120'});await p.evaluate(()=>render());await click('[data-a="payask"]');await click('[data-a="tpick|c0"]');await click('[data-a="tadd"]');
log.push('afterpay',await tip(),await p.evaluate(()=>JSON.stringify({tq:TQ,ts:TS})));await p.screenshot({path:'tip1.png'});await closeIf();log.push('next',await tip());await closeIf();log.push('then',await tip());
await click('[data-a="addmoney17"]');await p.evaluate(()=>{UI.flow.d.kp='9000'});await p.evaluate(()=>render());await click('[data-a="incnext"]');await click('[data-a="incfinish"]');await p.waitForTimeout(600);
log.push('plan',await tip());await closeIf();
for(const t of ['spending','savings']){await click(`#tabbar [data-a="tab|${t}"]`);log.push(t,await tip());await closeIf()}
await click('#tabbar [data-a="tab|home"]');log.push('home2',await tip());
console.log(JSON.stringify(log));console.log(errs);await b.close()})()
