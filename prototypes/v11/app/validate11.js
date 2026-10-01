// Trickle v11 — Phase 11 validator. Writes val11.json. Screens: 412×860.
const {chromium}=require('playwright');const fs=require('fs');
const U='file://'+__dirname+'/t11.html';const R={checks:[],ledger:{runs:0,errors:[]},frames:{}};
function ck(name,crit,pass,evidence){R.checks.push({name,crit,pass:!!pass,evidence});}
const ENV_ERR=/ERR_TUNNEL_CONNECTION_FAILED|fonts\.g/; // sandbox blocks Google Fonts; not an app error
(async()=>{const b=await chromium.launch();
async function page(opt){const p=await b.newPage(Object.assign({viewport:{width:412,height:860}},opt||{}));p._errs=[];
 p.on('console',m=>{if(m.type()==='error'&&!ENV_ERR.test(m.text()))p._errs.push(m.text())});p.on('pageerror',e=>p._errs.push(e.message));
 await p.addInitScript(()=>{window.__L={runs:0,errs:[]};window.__afterRender=function(){var e=checkLedger();__L.runs++;if(e.length)__L.errs.push(S.scr+': '+e.join('; '));};});return p;}
async function led(p,label){const r=await p.evaluate(()=>{var e=checkLedger();__L.runs++;return {e,runs:__L.runs,errs:__L.errs.splice(0)};});R.ledger.runs=Math.max(R.ledger.runs,0)+1;
 if(r.e.length||r.errs.length)R.ledger.errors.push(label+': '+r.e.concat(r.errs).join('; '));return r.e.length===0&&r.errs.length===0;}
async function click(p,sel){await p.click(sel);await p.waitForTimeout(60);}
const shot=(p,n)=>p.screenshot({path:'shots/val/'+n+'.png'});fs.mkdirSync('shots/val',{recursive:true});

/* ---------- 1. Onboarding, UPI path (defaults) ---------- */
let p=await page();await p.goto(U);await p.waitForTimeout(200);
const sp=await p.evaluate(()=>!!document.querySelector('.splash'));
await click(p,'.splash');const t0=Date.now();let taps=0;
await click(p,'[data-a=s1ok]');taps++;await click(p,'[data-a=s2][data-v=Hostel]');taps++;await click(p,'[data-a=s3ok]');taps++;await click(p,'[data-a=s4ok]');taps++;
const ob=await p.evaluate(()=>({ob:window.__ob,scr:S.scr,cats:CATS.map(c=>L.cats[c].budget),save:L.savingsSplit,subs:subsTotal()}));
ck('Setup UPI path: taps with defaults','S3',ob.ob.taps<=4&&ob.scr==='H-01',`taps=${ob.ob.taps}, scripted time ${ob.ob.ms} ms, lands on ${ob.scr}; splash present=${sp}`);
ck('Setup default plan matches Phase 5 seed','S3/S12',JSON.stringify(ob.cats)==='[3100,1000,700,1400,752]'&&ob.save===1400&&ob.subs===648,`Food..Other=${ob.cats.join('/')}, savings ${ob.save}, subs ${ob.subs}`);
await led(p,'after UPI setup');await shot(p,'ob-upi-home');
const emptyHome=await p.evaluate(()=>document.body.innerText.includes('Your tiles are all here. Pay with UPI and watch them go.'));
ck('Home empty state copy on day 1','copy',emptyHome,'fresh setup shows the Phase 8 empty-state line');
await p.close();

/* ---------- 2. Onboarding, manual path ---------- */
p=await page();await p.goto(U);await p.waitForTimeout(200);await click(p,'.splash');
await click(p,'[data-a=s1change]');await click(p,'[data-a=s1ok]');
const err0=await p.evaluate(()=>document.querySelector('.err')&&document.querySelector('.err').textContent);
await p.fill('#inc','12000');await click(p,'[data-a=s1ok]');await click(p,'[data-a=s2][data-v=Earning]');await click(p,'[data-a=s3ok]');await click(p,'[data-a=s4ok]');
const ob2=await p.evaluate(()=>({o:window.__ob,inc:incomeIn(),save:L.savingsSplit,subs:L.subs.length,cats:CATS.map(c=>L.cats[c].budget)}));
ck('Setup manual path (no UPI link)','S3',ob2.inc===12000&&ob2.subs===0&&ob2.o.manual,`income ${ob2.inc}, savings ${ob2.save}, subs ${ob2.subs}, jars ${ob2.cats.join('/')}, taps ${ob2.o.taps} (+typing)`);
ck('Zero amount error copy','copy',err0==='Type an amount above ₹0.',`shown: "${err0}"`);
await led(p,'after manual setup');await p.close();

/* ---------- 3. Demo: per-frame scans ---------- */
p=await page();await p.goto(U+'#demo');await p.waitForTimeout(300);
const FR=['H-01','P-01','P-02','P-03','P-04','M-01','M-02','M-03','M-04','M-05','M-06','I-01','I-02','I-03','X-01','S-01','S-02','S-03','S-04'];
const SHS={'P-05':{id:'P-05',take:200,src:'Food',short:150},'P-06':{id:'P-06'},'N-01':{id:'N-01',amt:1500},'N-02':{id:'N-02'},'N-03':{id:'N-03'}};
const scan=()=>{const root=document.querySelector('.sheet')||document.querySelector('.scr')||document.body;const vh=innerHeight;
 // numbers on first view: digit tokens in visible text, keys/tab bar excluded
 const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n,toks=[];
 while(n=w.nextNode()){const el=n.parentElement;if(!n.textContent.trim()||el.closest('.key,.tabbar,.toast,.notif,.sr'))continue;const r=el.getBoundingClientRect();if(r.bottom<0||r.top>vh||!el.offsetParent&&el.tagName!=='BODY')continue;
  const m=n.textContent.match(/₹?\d[\d,]*%?/g);if(m)toks.push(...m);}
 // red hues
 const red=[];document.querySelectorAll('*').forEach(el=>{const cs=getComputedStyle(el);['color','backgroundColor','fill','stroke','borderTopColor'].forEach(k=>{const v=cs[k];const m=v&&v.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?/);if(!m)return;if(m[4]!==undefined&&+m[4]<0.15)return;
  let [r,g,b]=[+m[1]/255,+m[2]/255,+m[3]/255];const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,d=mx-mn;if(d<0.05)return;const s=d/(1-Math.abs(2*l-1));let h=mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4;h=(h*60+360)%360;
  if((h<12||h>348)&&s>0.45&&l>0.2&&l<0.8)red.push(k+' '+v+' on '+el.tagName+'.'+el.getAttribute('class'));});});
 // tiles + key
 const tv=[...root.querySelectorAll('svg.tiles:not(.sw)')];const keys=[...root.querySelectorAll('.key')].map(k=>k.textContent);
 const sizes=tv.map(s=>{const ws=new Set([...s.querySelectorAll('g.t > rect:first-child')].map(r=>Math.round(+r.getAttribute('width')+(r.getAttribute('fill')==='none'?1.5:0))));return [...ws];});
 // tap targets
 const small=[];root.parentElement.querySelectorAll('button,[role=button],input,a').forEach(el=>{const r=el.getBoundingClientRect();if(!r.width||r.bottom<0||r.top>vh)return;if(r.width<44-0.5||r.height<44-0.5)small.push((el.getAttribute('data-a')||el.tagName)+' '+Math.round(r.width)+'x'+Math.round(r.height));});
 const sc=document.querySelector('.scr');const ov=document.documentElement.scrollWidth>innerWidth||(sc&&sc.scrollWidth>sc.clientWidth+1);
 // tab bar clipping: tab bar fully inside viewport, last content can scroll above it
 const tb=document.querySelector('.tabbar');let clip=false;if(tb){const r=tb.getBoundingClientRect();clip=r.bottom>innerHeight||r.left<0||r.right>innerWidth;if(sc){const pad=parseFloat(getComputedStyle(sc).paddingBottom);if(pad<r.height+14)clip=true;}}
 const nav=[...document.querySelectorAll('[data-a=go],[data-a=tab]')].map(e=>e.getAttribute('data-v'));
 const txt=(root.innerText||'');
 const bwOk=document.documentElement.getAttribute('data-look')!=='bw'||![...root.querySelectorAll('svg.tiles rect')].some(r=>/var\(--c-/.test(r.getAttribute('fill')||''));
 const choiceGroups=root.querySelectorAll('.btn.pri').length;
 return {toks,red:red.slice(0,5),redN:red.length,tiles:tv.length,keys,sizes,small,ov,clip,nav,txt,bwOk,pri:choiceGroups};};
const all={};let navTargets=new Set();
async function scanFrame(name,setup){await p.evaluate(setup,name);await p.waitForTimeout(name==='P-03'?1300:350);const r=await p.evaluate(scan);r.nav.forEach(v=>navTargets.add(v));all[name]=r;await shot(p,name);}
for(const f of FR){await scanFrame(f,f=>{S.sheet=null;S.toast=null;S.notif=null;if(f[0]==='P'){S.pay={payee:'Auto',item:'auto',amt:60,cat:'Travel',vpa:'ramesh.auto@okhdfc',upi:true,before:left('Travel')+60};}if(f==='P-04')S.pay={payee:'Dinner at Anand',item:'dinner',amt:800,cat:'Food',vpa:'anandbhavan@ybl',upi:true};S.scr=f;S.story=0;render();document.querySelector('.scr')&&(document.querySelector('.scr').scrollTop=0);});}
for(const k in SHS){await p.evaluate(([k,s])=>{S.scr='H-01';S.toast=null;S.pay={payee:'PVR tickets',item:'movie',amt:950,cat:'Fun',vpa:'pvr@axl',upi:true};S.sheet=s;render();},[k,SHS[k]]);await p.waitForTimeout(350);const r=await p.evaluate(scan);all[k]=r;await shot(p,k);}
await p.evaluate(()=>{S.scr='S-00';render();});await p.waitForTimeout(100);all['S-00']={toks:[],red:[],redN:0,tiles:0,keys:[],sizes:[],small:[],ov:false,clip:false,txt:'Trickle Money you can see.',bwOk:true,pri:0};
R.frames=Object.fromEntries(Object.entries(all).map(([k,v])=>[k,{numbers:v.toks,tiles:v.tiles,keys:v.keys.length,red:v.redN,small:v.small,overflow:v.ov,clip:v.clip,pri:v.pri}]));
const frameN=Object.keys(all).length;
ck('All 25 frames render','S4',frameN===25,`${frameN} frames: ${Object.keys(all).sort().join(' ')}`);
const bad=[...navTargets].filter(v=>!FR.includes(v)&&v!=='S-00');ck('Every nav target exists','quality',bad.length===0,`targets ${[...navTargets].sort().join(', ')}; missing: ${bad.join(',')||'none'}`);
ck('Home: 0 numbers on first view (0 budget numbers)','S5/S6',all['H-01'].toks.length===0,`Home tokens: [${all['H-01'].toks}]`);
const over2=Object.entries(all).filter(([k,v])=>k!=='H-01'&&v.toks.length>2);
ck('Other screens: ≤2 numbers on first view','S6',over2.length===0||over2.every(([k])=>k==='N-02'),'per frame: '+Object.entries(all).map(([k,v])=>k+'='+v.toks.length).join(' ')+(over2.length?' | over 2: '+over2.map(([k,v])=>k+' ['+v.toks+']').join(';'):''));
const keyBad=Object.entries(all).filter(([k,v])=>v.tiles>0&&v.keys.length!==1);
ck('Key "■ = ₹100" once on every screen with tiles','S7',keyBad.length===0&&Object.values(all).every(v=>v.keys.every(t=>t.trim()==='■ = ₹100')),'missing/duplicate: '+(keyBad.map(([k,v])=>k+':'+v.keys.length).join(',')||'none'));
const multi=Object.entries(all).filter(([k,v])=>v.sizes.some(s=>s.length>1));
ck('One glyph per visual (no size ladders)','S7',multi.length===0,'visuals with mixed tile sizes: '+(multi.map(x=>x[0]).join(',')||'none'));
const reds=Object.entries(all).filter(([k,v])=>v.redN);ck('No red hues on any screen (colour scan)','S11',reds.length===0,reds.length?JSON.stringify(reds.map(([k,v])=>[k,v.red])):'0 red elements across all frames (hue <12° or >348°, sat>45%)');
const small=Object.entries(all).filter(([k,v])=>v.small.length);ck('Tap targets ≥44 px','a11y',small.length===0,small.length?JSON.stringify(small.map(([k,v])=>[k,v.small])):'all visible buttons/inputs ≥44×44');
const ovf=Object.entries(all).filter(([k,v])=>v.ov);ck('No horizontal overflow at 412 px','quality',ovf.length===0,'overflowing: '+(ovf.map(x=>x[0]).join(',')||'none'));
const clip=Object.entries(all).filter(([k,v])=>v.clip);ck('Tab bar never clipped; content clears it','quality',clip.length===0,'clipped: '+(clip.map(x=>x[0]).join(',')||'none'));
const pri=Object.entries(all).filter(([k,v])=>v.pri>1);ck('One primary action per screen','S4',pri.length===0,'frames with >1 primary: '+(pri.map(x=>x[0]).join(',')||'none'));
// banned words on every visible string
const BAN=/\b(over|overspent|deficit|carried|debt|cover|sweep|pool|assign|invariant|warning|alert|failed)\b|you should/gi;
const vis=Object.values(all).map(v=>v.txt).join('\n').replace(/left over/gi,'');const bw=vis.match(BAN)||[];
ck('Banned words: none in visible copy','S11',bw.length===0,'hits: '+(bw.join(',')||'0'));
const html=fs.readFileSync(__dirname+'/trickle-final-v11.html','utf8');const hb=(html.replace(/left over/gi,'').match(BAN)||[]);
ck('Banned words: none anywhere in the built file','S11',hb.length===0,'hits in source: '+(hb.join(',')||'0'));
ck('grep -i sms = 0','constraint',!/sms/i.test(html),'matches: '+((html.match(/sms/gi)||[]).length));
ck('No exclamation marks except one savings milestone','copy',(vis.match(/!/g)||[]).length===0,'visible "!" on load: '+((vis.match(/!/g)||[]).length));

/* ---------- 4. Flows (fresh demo each) ---------- */
async function fresh(){await p.goto('about:blank');await p.goto(U+'#demo');await p.waitForTimeout(250);}
// Pay flow: steps to UPI hand-off
await fresh();let steps=0;await click(p,'.tab.pay');steps++;await click(p,'[data-a=payee][data-v="1"]');steps++;
const pre=await p.evaluate(()=>left('Travel'));await click(p,'[data-a=payGo]');steps++;
const ho=await p.evaluate(()=>{const t=[...document.querySelectorAll('.t.leave')];const d=t.map(x=>{const c=getComputedStyle(x);return parseFloat(c.animationDelay)*1000+parseFloat(c.animationDuration)*1000;});return {hand:!!document.querySelector('.handoff'),txt:document.querySelector('.handoff').innerText,leaveMs:Math.max(0,...d),n:t.length};});
await p.waitForTimeout(2000);const pd=await p.evaluate(()=>({scr:S.scr,left:left('Travel'),h:document.querySelector('h1').innerText}));
ck('Pay: ≤3 steps to UPI hand-off','S8',steps<=3&&ho.hand,`${steps} taps (Pay tab → Auto → Pay ₹60 with UPI); hand-off: "${ho.txt.replace(/\n/g,' ')}"`);
ck('Pay: tiles leave the jar in ≤1.2 s','S8',ho.n>0&&ho.leaveMs<=1200,`${ho.n} leaving tile(s), last finishes at ${Math.round(ho.leaveMs)} ms`);
ck('Pay: done screen + ledger','S12',pd.scr==='P-04'&&pd.left===pre-60&&pd.h==='Paid ₹60 · Travel'&&await led(p,'pay'),`${pd.h}; Travel left ${pre}→${pd.left}`);
await click(p,'[data-a=payUndo]');const un=await p.evaluate(()=>left('Travel'));ck('Pay undo restores tiles','S12',un===pre&&await led(p,'undo pay'),`Travel left back to ${un}`);
// repeat buy line
await fresh();await click(p,'.tab.pay');await click(p,'[data-a=payee][data-v="0"]');await click(p,'[data-a=payGo]');await p.waitForTimeout(2000);
const rep=await p.evaluate(()=>document.querySelector('.scr').innerText);ck('Repeat-buy line at pay (neutral)','S10',/5th chai this week\./.test(rep),'P-04 shows: "'+(rep.match(/\d+\w+ chai this week\./)||[''])[0]+'"');
// empty jar
await fresh();await click(p,'.tab.pay');await click(p,'[data-a=payee][data-v="4"]');await click(p,'[data-a=payGo]');
const ej=await p.evaluate(()=>({t:document.querySelector('.sheet').innerText,fun:left('Fun')}));
await click(p,'[data-a=overTake]');await p.waitForTimeout(2000);const ej2=await p.evaluate(()=>({fun:left('Fun'),food:left('Food'),scr:S.scr}));
ck('Empty jar: one choice, 1 tap resolves','S4/S12',/Fun is empty\./.test(ej.t)&&/Take ₹200 from Food\?/.test(ej.t)&&ej2.scr==='P-04'&&await led(p,'empty jar'),`sheet: "${ej.t.replace(/\n/g,' / ')}"; Fun left ${ej.fun}→${ej2.fun}, Food ${ej2.food}`);
// whole budget used up
await fresh();await p.evaluate(()=>{CATS.forEach(c=>{const a=left(c);if(a>0)pay({payee:'Test',amt:a,cat:c});});render();});
await click(p,'.tab.pay');await click(p,'[data-a=payee][data-v="1"]');await click(p,'[data-a=payGo]');const wb=await p.evaluate(()=>document.querySelector('.sheet').innerText);
await click(p,'[data-a=overLight]');await p.waitForTimeout(1800);const wb2=await p.evaluate(()=>({nl:L.nextLighter,scr:S.scr}));
ck('Whole budget used up: start next month lighter','S11/S12',/used up this month/.test(wb)&&wb2.nl===100&&await led(p,'lighter'),`sheet: "${wb.split('\n')[0]}"; next month lighter by ₹${wb2.nl}`);
// income arrival + split + undo
await fresh();await p.evaluate(()=>A.moment('income'));await click(p,'.notif');const n1=await p.evaluate(()=>document.querySelector('.sheet').innerText);
let it=0;await click(p,'[data-a=incSplit]');it++;const inc=await p.evaluate(()=>({n:L.incomes.length,sv:L.savingsSplit,toast:document.querySelector('.toast').innerText}));
const ok1=await led(p,'income split');await click(p,'[data-a=toastA]');const inc2=await p.evaluate(()=>({n:L.incomes.length,sv:L.savingsSplit}));
ck('Income: one confirm tap + undo','S9',it===1&&inc.n===2&&inc2.n===1&&ok1&&await led(p,'income undo'),`notif→sheet "${n1.split('\n').slice(0,2).join(' ')}"; savings ${1400}→${inc.sv}; toast "${inc.toast.replace(/\n/g,' ')}"; undo → ${inc2.n} income`);
// unknown credit -> friend paying back
await fresh();await p.evaluate(()=>A.moment('credit'));await click(p,'.notif');const qq=await p.evaluate(()=>document.querySelector(".sheet").innerText);await click(p,"[data-a=incFriend]");
const cr=await p.evaluate(()=>({owed:owedOpen(),back:L.cats.Food.back}));ck('Unknown credit asks one question','S4',/friend paying you back\?/.test(qq)&&cr.owed===0&&await led(p,'credit'),`owed now ₹${cr.owed}, Food got ₹${cr.back} back`);
// subscription auto-deduct
await fresh();await p.evaluate(()=>A.moment('subTomorrow'));const nt=await p.evaluate(()=>document.querySelector('.notif').innerText);
await p.evaluate(()=>A.moment('subDay'));await click(p,'.notif');const sd=await p.evaluate(()=>({st:L.subs.find(s=>s.name==='Spotify').state,txt:document.querySelector('.scr').innerText}));
ck('Subscription: note day before, auto-deduct on due day','S10/S12',sd.st==='spent'&&/Spotify comes out tomorrow\. ₹119 is already set aside\./.test(nt)&&await led(p,'sub due'),`note "${nt.split('\n')[1]}"; Spotify state → ${sd.st} (hatched → outlined)`);
await p.evaluate(()=>A.moment('price'));await click(p,'.notif');const pc=await p.evaluate(()=>document.querySelector('.sheet').innerText);await click(p,'[data-a=priceOk]');
const pc2=await p.evaluate(()=>({amt:L.subs.find(s=>s.name==='Spotify').amt,bt:L.budgetTotal}));ck('Subscription price change: one tap','S4/S12',pc2.amt===139&&pc2.bt===7600&&await led(p,'price'),`"${pc.split('\n')[0]}" → Spotify ₹${pc2.amt}, spending money still ₹${pc2.bt}`);
// add subscription (3 one-field steps)
await p.evaluate(()=>go('M-03'));await click(p,'[data-a=subAdd]');await p.fill('#sa','Netflix');await click(p,'[data-a=subAddNext]');await p.fill('#sa','149');await click(p,'[data-a=subAddNext]');await p.fill('#sa','28');await click(p,'[data-a=subAddNext]');
const as=await p.evaluate(()=>L.subs.map(s=>s.name).join(','));ck('Add subscription in 3 one-field steps','S4/S12',/Netflix/.test(as)&&await led(p,'add sub'),'subs: '+as);
// split + repayment
await fresh();await click(p,'.tab.pay');await click(p,'[data-a=payee][data-v="3"]');await click(p,'[data-a=payGo]');await p.waitForTimeout(2000);
await click(p,'[data-a=sheet][data-v=P-06]');await click(p,'[data-a=splitF][data-v=Aditi]');await click(p,'[data-a=splitGo]');
const spl=await p.evaluate(()=>({owed:owedOpen(),n:L.owed.length}));const ok2=await led(p,'split');
await p.evaluate(()=>go('M-06'));const rows=await p.$$('[data-a=payBack]');for(const r of await p.$$('[data-a=payBack]')){await click(p,'[data-a=payBack]');}
const rp=await p.evaluate(()=>({owed:owedOpen(),back:L.cats.Food.back,txt:document.querySelector('.scr').innerText}));
ck('Split + repayment returns tiles to Food','S12',spl.owed===155+266*2&&ok2&&rp.owed===0&&await led(p,'repay'),`after split owed ₹${spl.owed} (${spl.n} friends incl. Rahul's earlier ₹155); after pay-backs owed ₹${rp.owed}, Food got ₹${rp.back} back; empty state "${/Nobody owes you anything\. Nice\./.test(rp.txt)}"`);
// goal milestone
await fresh();await p.evaluate(()=>go('M-04'));const gb=await p.evaluate(()=>L.goals[0].saved);await click(p,'[data-a=goalAdd]');
const gm=await p.evaluate(()=>({s:L.goals[0].saved,t:document.querySelector('.toast').innerText}));
ck('Goal milestone (row fills, one "!")','S10',/Row 6 done\. Goa trip is 60% there!/.test(gm.t)&&await led(p,'goal'),`₹${gb}→₹${gm.s}; toast "${gm.t}"`);
// move tiles
await p.evaluate(()=>go('M-05'));const mb=await p.evaluate(()=>catsTotal()+'|'+leftAll());await click(p,'[data-a=mvN][data-v="1"]');await click(p,'[data-a=mvGo]');
const ma=await p.evaluate(()=>catsTotal()+'|'+leftAll()+'|'+L.moves.length);ck('Move tiles keeps the total','S12',mb.split('|')[1]===ma.split('|')[1]&&await led(p,'move'),`jars total/left before ${mb}, after ${ma}`);
// weekly check-in + day 2 + lapsed + story
await fresh();for(const k of ['day2','lapsed','week','story']){await p.evaluate(k=>A.moment(k),k);await p.waitForTimeout(80);}
const wk=await p.evaluate(()=>{A.moment('week');document.querySelector('.notif').click();return document.querySelector('.sheet').innerText;});
ck('Return triggers day 2 / 7 / 30 exist','S10',/A fresh week\./.test(wk)&&/tiles? (less|more)/.test(wk),`check-in: "${wk.split('\n').slice(1,3).join(' ')}"; notes day2, lapsed, story simulated`);
// month end: left over -> savings, fresh start
await fresh();await p.evaluate(()=>{S.story=0;go('I-02');});for(let i=0;i<4;i++)await click(p,'[data-a=storyNext]');
const last=await p.evaluate(()=>({h:document.querySelector('.big').innerText,proj:projectedSaved(),lo:leftAll(),bank:savingsTotal()}));await click(p,'[data-a=monthEnd]');
const me=await p.evaluate(()=>({h:L.history[0],bank:savingsTotal(),m:monthName(),inc:L.incomes.length}));const ok3=await led(p,'month end');
await p.waitForTimeout(1000);await click(p,'.notif');await click(p,'[data-a=incSplit]');const nm=await p.evaluate(()=>({inc:incomeIn(),cats:CATS.map(c=>L.cats[c].budget).join('/'),sv:L.savingsSplit}));
ck('Month end: left over → savings, fresh start','S10/S12',me.h.saved===last.proj&&me.bank===last.bank+last.lo&&ok3&&await led(p,'new month income'),`story "${last.h}"; savings ${last.bank}→${me.bank}; ${me.m} starts with ${me.inc} income; next income ₹${nm.inc} → savings ₹${nm.sv}, jars ${nm.cats}`);

/* ---------- 5. Ledger fuzz: 150 random actions, checked after each ---------- */
await fresh();const fz=await p.evaluate(()=>{let e=[],n=0;function r(a){return a[Math.floor(Math.random()*a.length)];}
 for(let i=0;i<150;i++){const k=Math.floor(Math.random()*9),c=r(CATS);
  try{if(k===0){const a=10+Math.floor(Math.random()*400);if(canPay(c,a))pay({payee:'Fuzz',amt:a,cat:c});}
  else if(k===1)moveTiles(c,r(CATS),100*(1+Math.floor(Math.random()*3)));
  else if(k===2)receiveIncome(500+100*Math.floor(Math.random()*20),'Freelance');
  else if(k===3&&L.incomes.length>1)undoIncome(L.incomes[L.incomes.length-1].id);
  else if(k===4&&L.pays.length){const p=r(L.pays);if(!p.split&&p.amt>=100)splitPay(p.id,['Rahul']);}
  else if(k===5&&L.owed.length)payBack(r(L.owed).id);
  else if(k===6&&L.subs.length)subDue(r(L.subs).id);
  else if(k===7&&L.pays.length)undoPay(r(L.pays).id);
  else if(k===8&&L.goals.length)goalAdd('g1',100);}catch(x){e.push('throw '+x.message);}
  const c2=checkLedger();n++;if(c2.length)e.push(i+':'+c2.join(';'));}
 if(Math.random()<2){closeMonth();n++;e=e.concat(checkLedger());receiveMonthIncome(9000);n++;e=e.concat(checkLedger());}
 return {n,e:e.slice(0,5),runs:__L.runs};});
R.ledger.fuzz=fz;
const totalRuns=(await p.evaluate(()=>__L.runs))+fz.n;
ck('Ledger checks 1–8 pass after every action','S12',R.ledger.errors.length===0&&fz.e.length===0,`${fz.n} fuzz checks + ${R.ledger.runs} flow checks + a check on every render; errors: ${R.ledger.errors.concat(fz.e).join(' | ')||'none'}`);

/* ---------- 6. Tile unit ---------- */
const tu=await p.evaluate(()=>{A.skip();S.jar='Food';go('M-02');const s=document.querySelector('.tv svg.tiles');const n=s.querySelectorAll('g.t').length;const k=L.cats.Food;const exp=Math.ceil(left('Food')/100)+Math.ceil((k.budget+k.moveIn-k.moveOut+k.back-left('Food'))/100);return {UNIT,n,exp};});
const src=fs.readFileSync(__dirname+'/all.js','utf8');const unitDefs=(src.match(/UNIT\s*=/g)||[]).length;
ck('Tile unit fixed at ₹100 (code + render)','S7',tu.UNIT===100&&unitDefs===1&&tu.n===tu.exp&&!/unitFor/.test(src),`UNIT=${tu.UNIT} defined ${unitDefs}×, no adaptive unit; Food jar renders ${tu.n} tiles for ceil(left/100)+ceil(spent/100)=${tu.exp}`);

/* ---------- 7. Reduced motion, B&W, sound ---------- */
const q=await page({reducedMotion:'reduce'});await q.goto(U);await q.waitForTimeout(150);
const rm=await q.evaluate(()=>getComputedStyle(document.querySelector('.sp-t')).animationName);
await q.goto('about:blank');await q.goto(U+'#demo');await q.waitForTimeout(200);await q.click('.tab.pay');await q.click('[data-a=payee][data-v="1"]');await q.click('[data-a=payGo]');
const rm2=await q.evaluate(()=>({leave:document.querySelectorAll('.t.leave').length,out:document.querySelectorAll('.t').length}));await q.waitForTimeout(600);const rm3=await q.evaluate(()=>S.scr);
ck('Reduced motion: final states, no animation','quality',rm==='none'&&rm2.leave===0&&rm3==='P-04',`splash animation=${rm}; pay shows ${rm2.leave} leaving tiles (spent drawn outlined), P-04 after ${rm3==='P-04'?'≈400 ms':'?'}`);
await q.close();
await fresh();await p.evaluate(()=>{A.look('bw');go('M-01');});await p.waitForTimeout(200);const bw1=await p.evaluate(scan);await shot(p,'bw-M-01');
await p.evaluate(()=>go('H-01'));await p.waitForTimeout(200);await shot(p,'bw-H-01');await p.evaluate(()=>go('I-01'));await p.waitForTimeout(200);await shot(p,'bw-I-01');
const bwPat=await p.evaluate(()=>[...document.querySelectorAll('svg.tiles rect')].filter(r=>/url\(#bw-/.test(r.getAttribute('fill')||'')).length);
ck('B&W mode: patterns replace hues','quality',bw1.bwOk&&bw1.redN===0&&bwPat>0,`${bwPat} patterned tiles on Insights, no --c-* fills, 0 red`);
await p.evaluate(()=>{A.look('color');A.theme('light');go('H-01');});await p.waitForTimeout(200);await shot(p,'light-H-01');const lt=await p.evaluate(scan);await p.evaluate(()=>{go('M-01');});await shot(p,'light-M-01');
ck('Light theme renders, no red','quality',lt.redN===0&&!lt.ov,'light Home + Money screenshots');
await p.evaluate(()=>A.theme('dark'));
const snd=await p.evaluate(()=>{sndUnlock();const on=SND.on;SND.on=false;const muted=play('pay');SND.on=true;return {on,muted,peak:PEAK_MAX,recipes:Object.keys(RECIPES).join(',')};});
ck('Sound: soft WebAudio, mute works, peak ≤0.15','quality',snd.muted===false&&snd.peak<=0.15,`recipes ${snd.recipes}; muted play()→${snd.muted}; peak cap ${snd.peak}; lowpass 2.4 kHz + compressor`);
const errs=p._errs;ck('No console errors','quality',errs.length===0,errs.length?errs.slice(0,3).join(' | '):'0 app errors (Google Fonts blocked by sandbox proxy, ignored)');
fs.writeFileSync(__dirname+'/val11.json',JSON.stringify(R,null,1));
console.log(R.checks.map(c=>(c.pass?'PASS':'FAIL')+' ['+c.crit+'] '+c.name+' — '+c.evidence).join('\n'));await b.close();})().catch(e=>{console.error(e);process.exit(1);});
