const {chromium}=require('/opt/node-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1280,height:1000}})).newPage();const errs=[];p.on('pageerror',async e=>{errs.push(e.stack.split('\n').slice(0,6).join('|')+' STATE '+await p.evaluate(()=>JSON.stringify({step:UI.flow&&UI.flow.step,d:UI.flow&&UI.flow.d.scan,sc:UI.flow&&UI.flow.d.scanned,t:UI.flow&&UI.flow.d.target})))});
await p.goto('file:///home/user/Trickle_bugetTracking/archive/session-workfiles/mockup20/mockup20.html#demo');await p.waitForTimeout(1300);
await p.evaluate(()=>{window.TIPS=false;loadProfile('T');go('home');UI._qr=4});await p.waitForTimeout(400);
const shot=async n=>{await p.waitForTimeout(900);await p.locator('#phone').screenshot({path:`/tmp/claude-0/v16/s5_${n}.png`})};
const click=async a=>{await p.click(`[data-a="${a}"]`,{force:true,timeout:4000});await p.waitForTimeout(250)};
await click('payscan');await click('payscanned');await shot('amount');for(const k of '35')await click('k|kp|'+k);await click('payask');await shot('confirm_unknown');
await click('scancat|c0');await shot('confirm_picked');await click('scango');await shot('hand');await click('scanreturn');await shot('result');
console.log(await p.evaluate(()=>JSON.stringify({left:flexLeft(S),t0:S.txns[0].payee+' '+S.txns[0].amt})),errs);await b.close()})();
