const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:412,height:860},colorScheme:'dark'});const U='file://'+__dirname+'/t11.html';
await p.goto(U);await p.waitForTimeout(1700);await p.screenshot({path:'shots/x-splash.png'});
await p.goto('about:blank');await p.goto(U+'#demo');await p.waitForTimeout(300);
await p.evaluate(()=>{S.story=4;go('I-02');});await p.waitForTimeout(900);await p.screenshot({path:'shots/x-story.png'});
await p.evaluate(()=>{go('M-04');});await p.click('[data-a=goalAdd]');await p.waitForTimeout(300);await p.screenshot({path:'shots/x-goal.png'});
await p.evaluate(()=>{go('H-01');A.moment('income');});await p.waitForTimeout(400);await p.screenshot({path:'shots/x-notif.png'});
await p.click('.notif');await p.click('[data-a=incSplit]');await p.waitForTimeout(700);await p.screenshot({path:'shots/x-split.png'});
await p.evaluate(()=>{go('M-06');});await p.waitForTimeout(300);await p.screenshot({path:'shots/x-owed.png'});
await b.close();})();
