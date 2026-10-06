const {chromium}=require('/opt/node-tools/node_modules/playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const out={};
for(const [k,f] of [['v14','../mockup/mockup.html'],['v15','../mockup15/mockup15.html']]){const p=await (await b.newContext({viewport:{width:1280,height:1000}})).newPage();await p.goto('file://'+require('path').resolve(f));await p.waitForTimeout(1800);
 out[k]=await p.evaluate(()=>({screens:Object.keys(SCREENS),sheets:Object.keys(SHEETS),flows:Object.keys(FLOWS),popups:Object.keys(POPUPS),handlers:Object.keys(H).length,inputHandlers:Object.keys(HI).length,asks:typeof ASKS!=='undefined'?Object.keys(ASKS):[],profiles:Object.keys(PROFILES).map(k=>k+': '+PROFILES[k].name+' - '+(PROFILES[k].blurb||'')),tips:typeof TIPDEF!=='undefined'?Object.keys(TIPDEF):[]}))}
fs.writeFileSync('inv.json',JSON.stringify(out,null,1));console.log(JSON.stringify(out.v15).slice(0,1500));await b.close()})()
