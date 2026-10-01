const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+path.resolve('t8.html')+'#demo');
console.log(await p.evaluate(process.argv[2]));await b.close();})();
