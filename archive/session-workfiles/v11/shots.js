const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const G=n=>"js:try{go('"+n+"')}catch(e){}";
const T=n=>"js:document.querySelector('[data-a=\"tab\"][data-x=\""+n+"\"]')?.click()";
const J=[
['onb','trickle-onboarding.html','',{home:G('home'),cats:G('categoriesTab'),sms:G('smsRationale')}],
['v2','trickle-v2.html','',{home:G('home'),cats:G('categories'),ins:G('insight')}],
['darkA','trickle-dark-a.html','',{home:G('home'),ins:G('insight')}],
['darkB','trickle-dark-b.html','',{home:G('home')}],
['darkC','trickle-dark-c.html','',{home:G('home')}],
['expl1','trickle-explorations.html','',{first:'js:0'}],
['expl2','build/trickle-explorations-2.html','',{first:'js:0',d:"js:try{go('d','home')}catch(e){}"}],
['redesign','trickle-visual-redesign.html','',{home:G('home'),cats:G('categories'),goal:G('goalDetail')}],
['v3','trickle-final-v3.html','',{home:G('home'),ins:G('insight')}],
['v4','trickle-final-v4.html','',{home:G('home'),ins:G('insight')}],
['v5','trickle-final-v5.html','',{home:G('home'),ins:G('insight'),cats:G('categories')}],
['v6','trickle-final-v6.html','#demo',{home:G('home'),cats:G('categories'),ins:G('insights')}],
['v7','trickle-final-v7.html','#demo',{home:G('home'),money:G('money'),actions:G('actions')}],
['v8','trickle-final-v8.html','#demo',{home:T('home'),money:T('money'),ins:T('insights')}],
['v9','trickle-final-v9.html','#demo',{home:T('home'),money:T('money'),ins:T('insights')}],
['v10','trickle-final-v10.html','#demo',{home:T('home'),money:T('money'),ins:T('insights')}],
];
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for(const [k,f,h,steps] of J){for(const [n,s] of Object.entries(steps)){const p=await b.newPage({viewport:{width:412,height:860}});
try{await p.goto('file://'+path.resolve(f)+h);await p.waitForTimeout(700);await p.evaluate(s.slice(3));await p.waitForTimeout(1600);
await p.screenshot({path:'v11/audit_shots/'+k+'_'+n+'.png'});}catch(e){console.log(k,n,e.message.slice(0,80))}await p.close();}}
await b.close();})();
