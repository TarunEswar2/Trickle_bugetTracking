const {chromium}=require('playwright');
const F=['home','money','actions','savings','insights','payAmount','coverSheet','payConfirm','assignIncome','logSpend','onbAllocate','sweepSplit','transactions','goalDetail','overspendResolve','categorise'];
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await b.newPage({viewport:{width:420,height:880}});const out=[];
await p.goto('file://'+__dirname+'/trickle-final-v7.html#demo');await p.waitForTimeout(900);
for(const f of F){await p.evaluate(f=>{closeSheet&&closeSheet();go(f)},f).catch(e=>console.log(f,e.message));await p.waitForTimeout(500);
const r=await p.evaluate(()=>{const el=document.querySelector('.frame.active');if(!el)return null;
const txt=el.innerText+' '+[...el.querySelectorAll('svg text')].map(t=>t.textContent).join(' ');const vis=[...el.querySelectorAll('*')].filter(e=>e.childElementCount==0&&e.getBoundingClientRect().top<880&&e.getBoundingClientRect().bottom>0).map(e=>e.textContent).join(' ');const vnums=(vis.match(/\d[\d,.]*%?/g)||[]).length;const nums=(txt.match(/[₹−\-+]?\d[\d,.]*%?/g)||[]).filter(s=>s.replace(/\D/g,'').length>0);
const svgs=el.querySelectorAll('svg').length;const btns=el.querySelectorAll('button,[onclick]').length;
const red=[...el.querySelectorAll('*')].filter(e=>{const c=getComputedStyle(e).color;const m=c.match(/\d+/g);return m&&+m[0]>180&&+m[1]<90&&+m[2]<90&&e.childElementCount==0&&e.innerText}).length;
const redfill=[...el.querySelectorAll('[fill],[stroke],*')].filter(e=>{const cs=getComputedStyle(e);return [cs.fill,cs.stroke,cs.backgroundColor,cs.color].some(c=>{const m=(c||'').match(/\d+/g);return m&&m.length>=3&&+m[0]>190&&+m[1]<110&&+m[2]<110})}).length;return {vnums,redfill,name:el.dataset.frame,nums:nums.length,svgs,btns,red,h:el.scrollHeight,words:txt.split(/\s+/).length}});
out.push(r);console.log(JSON.stringify(r));
await p.screenshot({path:'shots8/'+f+'.png',fullPage:false});
await p.evaluate(()=>{const el=document.querySelector('.frame.active');el.style.height='auto';el.style.overflow='visible'});
}
require('fs').writeFileSync('audit8.json',JSON.stringify(out));await b.close()})();
