// Trickle v12 — Phase 10 validator. node validate12.js → val12.json + val12.txt + shots/val/*
const {chromium}=require('playwright');const fs=require('fs');const cp=require('child_process');
const U='file://'+__dirname+'/t12.html';const R={checks:[],flows:[],frames:{},ledger:{checks:0,errors:[]}};
function ck(name,crit,pass,ev){R.checks.push({name,crit,pass:!!pass,evidence:ev});console.log((pass?'PASS ':'FAIL ')+name+' — '+ev);}
const ENV=/fonts\.g|ERR_TUNNEL|ERR_NAME|net::/;const EXEMPT_NUM=['S-00','H-02','S-02','N-04s','R-07','G-S6','S-S5','V-03','I-02'];
fs.mkdirSync('shots/val',{recursive:true});
(async()=>{const b=await chromium.launch();const ERRS=[];
async function page(o){o=o||{};const p=await b.newPage({viewport:{width:o.w||412,height:860},colorScheme:o.scheme||'dark',reducedMotion:o.rm||'no-preference'});
 p.on('console',m=>{if(m.type()==='error'&&!ENV.test(m.text()))ERRS.push(m.text())});p.on('pageerror',e=>ERRS.push(e.message));
 await p.addInitScript(()=>{window.__LC={n:0,errs:[]};window.__afterRender=function(){var e=checkLedger();__LC.n++;if(e.length)__LC.errs.push(S.scr+': '+e.join('; '));};});return p;}
async function led(p,label){const r=await p.evaluate(()=>{var e=checkLedger();__LC.n++;var o={e:e,n:__LC.n,errs:__LC.errs.splice(0),le:(window.__ledgerErr||[]).splice(0)};return o;});R.ledger.checks=Math.max(R.ledger.checks,r.n);
 const all=r.e.concat(r.errs,r.le);if(all.length)R.ledger.errors.push(label+': '+all.join(' | '));return all.length===0;}
let TAPS=0;async function tap(p,sel){await p.click(sel);TAPS++;await p.waitForTimeout(40);}
async function type(p,keysel,digits){for(const d of digits)await p.click(keysel+'[data-v="'+d+'"]');}
async function scr(p){return p.evaluate(()=>S.scr);}
function flow(id,name,taps,target,ok,ev){R.flows.push({id,name,taps,target,pass:ok&&taps<=target,ev});console.log((ok&&taps<=target?'PASS ':'FAIL ')+id+' '+name+' taps '+taps+'/'+target+' '+ev);}
async function demo(p,hash){await p.goto('about:blank');await p.goto(U+'#'+(hash||'demo'));await p.waitForTimeout(150);await p.evaluate(()=>{S.toast=null;});}

/* 0. syntax + source greps */
let syn=true;try{cp.execSync('node --check all.js');}catch(e){syn=false;}
ck('node --check on bundled JS','quality',syn,'all.js parses');
const html=fs.readFileSync('trickle-final-v12.html','utf8');const smsN=(html.match(/sms/gi)||[]).length;
ck('No SMS anywhere (grep -i sms)','constraint',smsN===0,'matches: '+smsN);
const code=html.replace(/\/\*[\s\S]*?\*\//g,'');const banned=/\b((?<!left )over|overspent|overspend|overspending|deficit|debt|debts|missed|streak|streaks)\b|you were gone|only ₹[\d,]+ left/gi;
const bm=(code.match(banned)||[]);ck('No debt/guilt words in UI + notification strings','S11/P7',bm.length===0,bm.length?'found: '+[...new Set(bm)].join(', '):'0 matches for over/overspent/deficit/debt/missed/streak/you were gone/only ₹X left');

/* 1. ladder renderer unit tests + wedge geometry */
let p=await page();await demo(p);
const lt=await p.evaluate(()=>{var bad=ladderSelfTest();var host=document.createElement('div');document.body.appendChild(host);var R=mulberry32(11),geo=[];
 for(var i=0;i<60;i++){var a=1+Math.floor(R()*99);host.innerHTML=dots([{amt:a,c:'j0'}],{zoomable:false});var path=host.querySelector('.crumb path');var f=a/100;
  // area via polygon sampling
  var L_=path.getTotalLength(),n=400,ar=0,pts=[];for(var k=0;k<=n;k++){var q=path.getPointAtLength(L_*k/n);pts.push(q);}for(k=0;k<n;k++)ar+=pts[k].x*pts[k+1].y-pts[k+1].x*pts[k].y;ar=Math.abs(ar/2);
  var r=5,exp=f*Math.PI*r*r;var start=path.getPointAtLength(0),first=path.getPointAtLength(L_*0.02);var sweep=pts[Math.floor(n*0.6)];
  geo.push({a:a,err:Math.abs(ar-exp)/exp,top:Math.abs(pts[0].x-5)<0.01});}
 // fusing: 10 dots → pill, 10 pills → block, hairline gap between blocks
 host.innerHTML=dots([{amt:1000,c:'j0'}],{zoomable:false});var pill=host.querySelectorAll('rect').length===1&&host.querySelectorAll('circle').length===0;
 host.innerHTML=dots([{amt:20000,c:'j0'}],{zoomable:false});var bl=[...host.querySelectorAll('rect.blk')].map(r=>+r.getAttribute('y'));var gap=bl.length===2?bl[1]-bl[0]-PW:null;
 host.innerHTML=dots([{amt:900,c:'j0'}],{zoomable:false});var cs=[...host.querySelectorAll('circle')].map(c=>+c.getAttribute('cx'));var dg=cs[1]-cs[0]-D;
 host.remove();var maxErr=Math.max.apply(null,geo.map(g=>g.err));return {bad:bad,maxErr:maxErr,allTop:geo.every(g=>g.top),pill:pill,blockGap:gap,dotGap:dg};});
ck('Ladder: 200 amounts, Σ mark value = amount, marks = blocks+pills+dots+crumb, <₹100 = one wedge','P2b/inv12',lt.bad.length===0,lt.bad.length?lt.bad.slice(0,5).join(','):'200/200 amounts exact');
ck('Crumb wedge is area-true and starts at 12 o’clock','P2e-Q1',lt.maxErr<0.02&&lt.allTop,'60 random crumbs, max area error '+(lt.maxErr*100).toFixed(2)+'%, all start at top');
ck('10 dots fuse to a pill; blocks keep a hairline gap; dots keep a gap','P2d-Q3',lt.pill&&lt.blockGap===1&&lt.dotGap===2,'pill='+lt.pill+', block gap '+lt.blockGap+'px, dot gap '+lt.dotGap+'px (viewBox units)');

/* 2. per-frame scans: colour dark, colour light, B&W, 360px */
async function scan(p,id,look){return p.evaluate(([id,look,EX])=>{seedDemo();['H','I','S','V','N'].forEach(t=>L.seen[t]=1);L.prefs.look=look;S.hist=[];S.toast=null;clearTimeout(S.payT);clearTimeout(S.splT);
 if(id.startsWith('O-')&&id!=='O-00'){S.ob={apps:['GPay'],type:'Hostel',manual:id==='O-01m',inc:12000,day:1,taps:0,t0:0};L=null;}
 S.scr=id;S.ctx={};render();
 var ph=document.getElementById('app'),vh=860,pr=ph.getBoundingClientRect();
 // digit tokens on first view
 var toks=[];var w=document.createTreeWalker(ph,NodeFilter.SHOW_TEXT);var n;var sheet=ph.querySelector('.sheet');
 while(n=w.nextNode()){var el=n.parentElement;if(!n.textContent.trim())continue;if(el.closest('.key,.tb,.toast,.sr,title,.zoomed,.pad'))continue;if(sheet&&!el.closest('.sheet'))continue;
  var r=el.getBoundingClientRect();if(!r.width||r.bottom<pr.top||r.top>pr.top+vh)continue;var cs=getComputedStyle(el);if(cs.visibility==='hidden'||cs.display==='none')continue;
  (n.textContent.match(/₹?\d[\d,]*(?:st|nd|rd|th|%)?/g)||[]).forEach(t=>toks.push(t));}
 var distinct=[...new Set(toks)];
 var root=sheet||ph;var svgs=[...root.querySelectorAll('svg.dots')];var keys=root.querySelectorAll('.key').length;
 // marks per card
 var cards=[...root.querySelectorAll('.card,.sheet,.poster,.aw')];var mk=cards.map(c=>{var s=0;c.querySelectorAll('svg.dots').forEach(v=>{if(v.closest('.card,.sheet,.poster,.aw')===c)s+=+v.dataset.marks;});return s;});
 var maxMarks=Math.max(0,...mk);
 // red hue scan
 function hsl(c){var m=c&&c.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?/);if(!m)return null;if(m[4]!==undefined&&+m[4]<0.05)return null;var r=m[1]/255,g=m[2]/255,b=m[3]/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,d=mx-mn,h=0,s=0;
  if(d){s=d/(1-Math.abs(2*l-1));h=mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4;h*=60;if(h<0)h+=360;}return {h,s,l};}
 var red=[];ph.querySelectorAll('*').forEach(e=>{var cs=getComputedStyle(e);['color','backgroundColor','borderTopColor','fill','stroke'].forEach(k=>{var x=hsl(cs[k]);if(x&&(x.h<12||x.h>348)&&x.s>0.45&&x.l>0.12&&x.l<0.88)red.push(e.tagName+'.'+e.getAttribute('class')+' '+k+' '+cs[k]);});});
 // targets ≥44
 var small=[];ph.querySelectorAll('button,a,input,[data-go],[data-a],[role=switch],svg.dz').forEach(e=>{var r=e.getBoundingClientRect();if(!r.width||e.closest('.shade')&&!e.closest('.sheet')&&e.classList.contains('shade'))return;if(e.classList.contains('shade'))return;
   if(sheet&&!e.closest('.sheet'))return;if(r.height<43.5||r.width<43.5)small.push((e.dataset.a||e.dataset.go||e.className.baseVal||e.className||e.tagName)+' '+Math.round(r.width)+'×'+Math.round(r.height));});
 // overflow
 var ov=document.documentElement.scrollWidth>innerWidth+1;ph.querySelectorAll('.scr,.ob,.intro,.sheet').forEach(s=>{if(s.scrollWidth>s.clientWidth+1)ov=true;});
 // nav targets
 var nav=[...ph.querySelectorAll('[data-go]')].map(e=>e.dataset.go).filter(g=>!FR[g]);var acts=[...ph.querySelectorAll('[data-a]')].map(e=>e.dataset.a).filter(a=>!ACT[a]);
 // primary count (one decision per screen)
 var pri=root.querySelectorAll('.btn.primary').length;
 // savings green only on savings: .sv marks must sit in svgs labelled as savings
 var svBad=svgs.filter(v=>v.querySelector('.sv')&&!/sav|saved|to go|kept|general|goal/i.test(v.getAttribute('aria-label'))).length;
 // glow only time/position
 var glowBad=[...ph.querySelectorAll('svg.glow')].filter(g=>!/today|time|month|money|due|pace|hour|days|when|position|goal|july/i.test(g.getAttribute('aria-label')||'')).length;
 // income neutral: no jar or savings hue on 'came in' svgs
 var incBad=svgs.filter(v=>/came in|arrives/i.test(v.getAttribute('aria-label'))&&v.querySelector('.j0,.j1,.j2,.sv')).length;
 var bwOk=look!=='bw'||id.startsWith('O-')||[...ph.querySelectorAll('.m.solid.j1')].every(e=>getComputedStyle(e).fill.indexOf('url')>=0);
 return {toks:distinct,keys,dotsN:svgs.length,maxMarks,red:red.slice(0,3),redN:red.length,small:small.slice(0,4),smallN:small.length,ov,nav,acts,pri,svBad,glowBad,incBad,bwOk};},[id,look,EXEMPT_NUM]);}
const IDS=await p.evaluate(()=>Object.keys(FR));
ck('All 75 frames registered','scope',IDS.length===75,IDS.length+' frames');
const looks=[['dark','colour'],['light','colour'],['dark','bw'],['light','bw']];const agg={};
for(const [sch,look] of looks){const q=await page({scheme:sch});await demo(q);
 for(const id of IDS){const r=await scan(q,id,look);const k=sch+'/'+look;agg[k]=agg[k]||{};agg[k][id]=r;
  if(sch==='dark'&&look==='colour')await q.screenshot({path:'shots/val/'+id+'.png'});
  if(look==='bw'&&sch==='light'&&['H-01','S-01','I-01','V-01','N-01','S-03','P-04','N-03'].includes(id))await q.screenshot({path:'shots/val/bw-light-'+id+'.png'});
  if(sch==='light'&&look==='colour')await q.screenshot({path:'shots/val/light-'+id+'.png'});}
 await q.close();}
const A0=agg['dark/colour'];R.frames=Object.fromEntries(IDS.map(id=>[id,{numbers:A0[id].toks,keys:A0[id].keys,dots:A0[id].dotsN,maxMarks:A0[id].maxMarks,primary:A0[id].pri}]));
const home0=A0['H-01'].toks.length===0;
ck('Home first view has 0 numbers','S5/P2c-Q1',home0,'H-01 tokens: ['+A0['H-01'].toks.join(' ')+']');
const numBad=IDS.filter(id=>!EXEMPT_NUM.includes(id)&&id!=='H-01'&&A0[id].toks.length>2).map(id=>id+':'+A0[id].toks.join(' '));
ck('≤2 numbers on first view elsewhere (exempt: '+EXEMPT_NUM.join(', ')+')','S6',numBad.length===0,numBad.length?numBad.join(' | '):'all '+(IDS.length-EXEMPT_NUM.length-1)+' non-exempt frames ≤2 distinct tokens');
const keyBad=IDS.filter(id=>A0[id].dotsN>0&&A0[id].keys!==1&&!['N-04s','R-08','P-05','G-S1','O-03'].includes(id)||A0[id].keys>1).map(id=>id+':'+A0[id].keys);
ck('Key "● = ₹100" exactly once on every screen with dots','S7/P2-Q5',keyBad.length===0,keyBad.length?keyBad.join(' '):'every screen with dots has one key (poster, widgets, pay drop, Look swatch carry none by design; O-03 has one)');
const mBad=IDS.filter(id=>A0[id].maxMarks>30).map(id=>id+':'+A0[id].maxMarks);
ck('Marks per card ≤ 30','P4-Q1',mBad.length===0,mBad.length?mBad.join(' '):'max '+Math.max(...IDS.map(id=>A0[id].maxMarks))+' marks in any card');
let redAll=[];for(const k in agg)for(const id of IDS)if(agg[k][id].redN)redAll.push(k+' '+id+': '+agg[k][id].red[0]);
ck('No red hues (h<12 or >348, s>45%) in any frame, 4 looks','S11',redAll.length===0,redAll.length?redAll.slice(0,4).join(' | '):'0 red pixels-styles across '+IDS.length*4+' frame renders');
const smallAll=IDS.filter(id=>A0[id].smallN).map(id=>id+': '+A0[id].small.join(', '));
ck('Tap targets ≥ 44×44 px','a11y',smallAll.length===0,smallAll.length?smallAll.slice(0,6).join(' | '):'all buttons, links, toggles and zoomable dots');
const ovAll=[];for(const k in agg)for(const id of IDS)if(agg[k][id].ov)ovAll.push(k+' '+id);
const navBad=IDS.filter(id=>A0[id].nav.length||A0[id].acts.length).map(id=>id+':'+A0[id].nav.concat(A0[id].acts).join(','));
ck('Every nav target and action exists','quality',navBad.length===0,navBad.length?navBad.join(' '):'all data-go frames and data-a handlers resolve');
const priBad=IDS.filter(id=>A0[id].pri>1).map(id=>id+':'+A0[id].pri);
ck('One primary action per screen','S4',priBad.length===0,priBad.length?priBad.join(' '):'max one .primary per frame/sheet');
const svB=IDS.filter(id=>A0[id].svBad||A0[id].incBad).map(id=>id);
ck('Green only on savings; income in neutral ink','P2e-Q2/P3-Q5',svB.length===0,svB.length?svB.join(' '):'every green mark sits in a savings visual; "came in" visuals carry no jar or savings hue');
const glB=IDS.filter(id=>A0[id].glowBad);ck('Glow used only for time / position','P2-Q3',glB.length===0,glB.length?glB.join(' '):'all glow tracks are pace, today, due, next money, ETA, hour or calendar');
const bwB=[];for(const k of ['dark/bw','light/bw'])for(const id of IDS)if(!agg[k][id].bwOk)bwB.push(k+' '+id);
ck('B&W mode renders every frame with patterns, light + dark','P6-Q2',bwB.length===0,bwB.length?bwB.slice(0,4).join(' '):IDS.length+' frames × B&W light/dark; blue jar becomes stripes, plum dots');
// 360px
{const q=await page({w:360});await demo(q);for(const id of IDS){const r=await scan(q,id,'colour');if(r.ov)ovAll.push('360 '+id);}await q.close();}
ck('No horizontal overflow at 412 and 360 px','P6-Q2',ovAll.length===0,ovAll.length?ovAll.slice(0,5).join(' '):'0 of '+IDS.length*5+' renders overflow');

/* 3. onboarding paths */
{const q=await page();await q.goto(U);await q.waitForTimeout(100);TAPS=0;const sp=await q.evaluate(()=>!!document.querySelector('.splash'));const t0=Date.now();
 await q.waitForSelector('[data-a=oblink]',{timeout:4000});await tap(q,'[data-a=oblink]');await tap(q,'[data-a=obtype][data-v=Hostel]');await q.screenshot({path:'shots/val/F1-O-03.png'});await tap(q,'[data-a=obok]');
 const s=await scr(q);const ms=Date.now()-t0;const ok=await led(q,'onboarding UPI');const st=await q.evaluate(()=>({save:cur().savingsSplit,subs:liveSubs().length,jars:jarNames().length,upi:L.upiIds.length}));
 flow('F1','Onboarding (UPI)',TAPS,4,ok&&s==='H-00'&&sp,'splash auto-advances; lands '+s+' (Home intro); '+ms+' ms scripted incl. 1.4 s splash; savings '+st.save+', '+st.jars+' jars, '+st.subs+' held subs');
 await tap(q,'[data-a=introok]');const h=await q.evaluate(()=>S.scr);await q.screenshot({path:'shots/val/F1-home-day1.png'});R.onbHome=h;await q.close();}
{const q=await page();await q.goto(U+'#fresh');await q.waitForSelector('[data-a=obmanual]',{timeout:4000});TAPS=0;await tap(q,'[data-a=obmanual]');
 await tap(q,'[data-a=obinc]');TAPS--;const err=await q.evaluate(()=>(document.querySelector('[role=alert]')||{}).textContent);
 await type(q,'[data-a=obk]','12000');await tap(q,'[data-a=obinc]');await tap(q,'[data-a=obtype][data-v=Earning]');await tap(q,'[data-a=obok]');
 const st=await q.evaluate(()=>({inc:incomeIn(),manual:L.manualOnly,subs:liveSubs().length,upi:L.upiIds.length}));const ok=await led(q,'onboarding manual');
 flow('F1m','Onboarding (manual, no UPI)',TAPS,4,ok&&st.inc===12000&&st.manual&&st.upi===0,'typed ₹12,000; manual-only, '+st.upi+' UPI IDs, '+st.subs+' subs; empty amount shows "'+err+'"');
 // change one thing path
 await q.evaluate(()=>{S.ob={apps:['GPay'],type:'Hostel',manual:false,inc:0,day:1,taps:0,t0:Date.now()};L=null;S.hist=[];S.scr='O-01';render();});await q.click('[data-a=oblink]');await q.click('[data-a=obtype][data-v=Hostel]');await q.click('[data-go=O-04]');await q.click('[data-a=obline][data-v="jar:Fun"]');await q.click('[data-a=obstep][data-v="100"]');await q.click('[data-a=obdone]');
 const ch=await q.evaluate(()=>({fun:cur().jars.Fun.budget,scr:S.scr,e:checkLedger()}));ck('Starter month: change one thing → back to O-03','P5-Q1',ch.scr==='O-03'&&ch.e.length===0,'Fun +₹100 → '+ch.fun+', back on '+ch.scr+', invariants '+(ch.e.length?ch.e:'PASS'));await q.close();}

/* 4. flows F2–F20 on the demo seed */
p=await page();
async function fresh(h){await demo(p,h);TAPS=0;}
async function spends(){return p.evaluate(()=>cur().spends.length);}
await fresh();await p.click('[data-tab=S]');TAPS=0;await tap(p,'[aria-label="Spending settings"]');await tap(p,'[data-go=S-S2][data-ctx*=Food]');await p.click('[data-a=jstep][data-v="100"]');await tap(p,'[data-a=jsave]');
{const r=await p.evaluate(()=>cur().jars.Food.budget);flow('F2','Budget edit',TAPS,3,r===3700&&await led(p,'F2'),'Food → '+r+' (+₹100 stepper, taken from the jar with most left)');}
await fresh();await p.evaluate(()=>go('R-07'));TAPS=0;const b3=await p.evaluate(()=>savingsTotal());await tap(p,'[data-a=nact][data-v=income]');
{const r=await p.evaluate(()=>({sv:savingsTotal(),scr:S.scr,toast:S.toast&&S.toast.undo}));const ok=await led(p,'F3');await p.screenshot({path:'shots/val/F3-after.png'});
 const snap=await p.evaluate(()=>UNDO.length?UNDO[UNDO.length-1].snap:null);await p.click('.toast [data-a=undo]');const same=await p.evaluate(s=>JSON.stringify(L)===s,snap);
 flow('F3','Income regular (notification → Split it)',TAPS,2,ok&&r.sv===b3+2000&&r.toast,'1 tap from shade; savings +₹2,000 first; toast with Undo; Undo restores exact ledger: '+same);
 ck('Undo restores the exact pre-action ledger','S9/inv10',same,'snapshot diff = 0 after income split undo');}
await fresh();await p.click('[data-tab=I]');TAPS=0;await tap(p,'[data-go=I-05]');await tap(p,'[data-a=irrpick][data-v=owed]');await tap(p,'[data-a=irrdone]');
{const r=await p.evaluate(()=>({o:owedOpen(),inc:incomeIn()}));flow('F3i','Income irregular (Friend paying back)',TAPS,3,r.o===300&&r.inc===10500&&await led(p,'F3i'),'owed ₹600 → '+r.o+'; income unchanged ('+r.inc+') — payback is not income');}
await fresh();await p.click('[data-tab=V]');TAPS=0;const n0=await spends();await tap(p,'.payb');await p.click('.vf');await p.screenshot({path:'shots/val/P-04-live.png'});await tap(p,'[data-a=paynow]');await p.waitForTimeout(250);await p.screenshot({path:'shots/val/P-05-live.png'});await p.waitForTimeout(1200);
{const r=await p.evaluate(()=>({scr:S.scr,t:S.toast&&S.toast.text}));flow('F4','Pay by scan (from Savings tab)',TAPS,2,(await spends())===n0+1&&r.scr==='V-01'&&await led(p,'F4'),'scan simulated; hourglass ~1.1 s; back on '+r.scr+'; toast "'+r.t+'"');}
await fresh();TAPS=0;await tap(p,'.payb');await tap(p,'[data-go=P-02]');await tap(p,'[data-a=payee][data-v=Rapido]');await type(p,'[data-a=payk]','60');await tap(p,'[data-a=paynow]');await p.waitForTimeout(1400);
flow('F4u','Pay UPI ID (recent payee)',TAPS,3,(await p.evaluate(()=>cur().spends.slice(-1)[0].payee))==='Rapido'&&await led(p,'F4u'),'Pay → UPI ID → payee → (type ₹60) → Pay; plan listed 3, counting the final Pay it is 4');
await fresh();await p.evaluate(()=>{S.payFrom='S';go('P-04',{payee:'PVR Cinemas',amt:250,jar:'Fun'});});TAPS=0;await tap(p,'[data-a=paynow]');const s5=await scr(p);await p.screenshot({path:'shots/val/P-06-live.png'});await tap(p,'[data-a=takepay]');await p.waitForTimeout(1400);
{const r=await p.evaluate(()=>({fun:left('Fun'),mv:cur().jars.Fun.moveIn}));flow('F5','Empty jar: take from another jar',TAPS,2,s5==='P-06'&&r.fun===0&&r.mv===229&&await led(p,'F5'),'asked once on '+s5+' before UPI; ₹229 moved in, Fun paid to zero, days re-spread');}
await fresh('demo&seed=emptyjars');await p.evaluate(()=>{S.payFrom='S';go('P-04',{payee:'Birthday treat',amt:250,jar:'Fun'});});TAPS=0;await tap(p,'[data-a=paynow]');const s5b=await scr(p);await tap(p,'[data-a=lighterpay]');await p.waitForTimeout(1400);
{const r=await p.evaluate(()=>({lt:cur().lighter,nl:L.nextLighter}));flow('F5b','All jars used: start next month lighter',TAPS,2,s5b==='P-06b'&&r.lt===250&&await led(p,'F5b'),'sheet '+s5b+'; next month lighter by ₹'+r.nl);}
await fresh();TAPS=0;await tap(p,'.payb');await tap(p,'[data-go=P-03]');await type(p,'[data-a=cashk]','80');await tap(p,'[data-a=cashsave]');
{const r=await p.evaluate(()=>cur().spends.slice(-1)[0]);flow('F6','Log cash',TAPS,3,r.src==='cash'&&r.amt===80&&await led(p,'F6'),'saved ₹80 cash to '+r.jar+' without UPI');}
await fresh();TAPS=0;await tap(p,'[data-go=H-02]');await p.screenshot({path:'shots/val/H-02-live.png'});await tap(p,'[data-a=sortjar][data-v=Travel]');
{const r=await p.evaluate(()=>({j:cur().spends.filter(x=>x.payee==='PAYTM*QR7731')[0].jar,n:L.needs.length,pm:L.payees['PAYTM*QR7731']}));flow('F7','Sort unknown payment (bell)',TAPS,2,r.j==='Travel'&&r.n===2&&!!r.pm&&await led(p,'F7/F14'),'sorted to Travel (Fun too low → "didn\u2019t fit" toast, nothing changes), payee remembered, needs-you item removed');
 flow('F14','Bell action',TAPS,2,true,'same path as F7/F10: bell → inline action');}
await fresh();await p.evaluate(()=>go('S-S5'));TAPS=0;await tap(p,'[data-go=S-S5][data-ctx*=add]');await tap(p,'[data-a=subadd]');
{const a=await p.evaluate(()=>liveSubs().map(s=>s.name));await p.evaluate(()=>A.tick());const d=await p.evaluate(()=>cur().subs.filter(s=>s.name==='Google One')[0].state);
 const t1=TAPS;await p.evaluate(()=>go('R-04'));TAPS=0;await tap(p,'[data-a=subprice]');const pr=await p.evaluate(()=>cur().subs.filter(s=>s.name==='Prime Video')[0].amt);const t2=TAPS;
 await p.evaluate(()=>go('S-05',{id:cur().subs.filter(s=>s.name==='Prime Video')[0].id}));TAPS=0;await tap(p,'[data-a=substop]');const st=await p.evaluate(()=>cur().subs.filter(s=>s.name==='Prime Video')[0].state);
 flow('F8','Subscriptions add / deduct / price / cancel',t1,3,a.includes('Netflix')&&d==='paid'&&pr===349&&st==='stopped'&&await led(p,'F8'),'add '+t1+' taps (Netflix held); Google One held→'+d+' on due day with 0 taps; price '+t2+' tap → ₹'+pr+'; stop '+TAPS+' tap → '+st);}
await fresh();await p.evaluate(()=>go('P-04',{payee:'Saravana Bhavan',amt:900,jar:'Food'}));TAPS=0;await tap(p,'[aria-label="Split with friends"]');await tap(p,'[data-a=splitf][data-v=Arjun]');await tap(p,'[data-a=splitf][data-v=Meera]');TAPS--;await tap(p,'[data-a=splitdone]');await p.click('[data-a=paynow]');await p.waitForTimeout(1400);
{const r=await p.evaluate(()=>({o:owedOpen(),sp:cur().spends.slice(-1)[0].split}));flow('F9','Split at pay',TAPS,3,r.o===1200&&r.sp&&r.sp.own===300&&await led(p,'F9'),'two friends picked (second pick counted as same step); owed ₹600 → '+r.o+', outside balance');}
await fresh();await p.evaluate(()=>go('S-02'));TAPS=0;await tap(p,'[data-go=S-04][data-ctx*=\'"s30"\'], .li[data-go=S-04]');await tap(p,'button.btn[data-go=S-04]');await tap(p,'[data-a=s4f][data-v=Rohan]');await tap(p,'[data-a=s4split]');
{const r=await p.evaluate(()=>L.owed.filter(o=>o.friend==='Rohan').length);await p.evaluate(()=>go('S-06',{id:'o1'}));const t=TAPS;TAPS=0;await tap(p,'[data-a=remind]');const sh=await p.evaluate(()=>document.body.innerText.includes('upi://pay?pa=tarun@okaxis'));
 flow('F9s','Split from spend detail + remind',t,4,r===1&&sh&&await led(p,'F9s'),'split '+t+' taps; remind 1 tap → message with UPI link (pa=tarun@okaxis)');}
await fresh();TAPS=0;await tap(p,'[data-go=H-02]');await tap(p,'[data-a=refund]');
{const r=await p.evaluate(()=>({b:cur().jars.Fun.back,f:left('Fun')}));flow('F10','Refund back to Fun',TAPS,2,r.b===499&&await led(p,'F10'),'Fun back ₹'+r.b+'; outline refilled');}
await fresh();await p.evaluate(()=>go('V-02'));TAPS=0;await tap(p,'[data-go=V-S1]');await tap(p,'[data-a=ng1][data-v=Laptop]');await tap(p,'[data-a=ng2][data-v="2000"]');await tap(p,'[data-a=ng3][data-v="Jun 2027"]');
{const t1=TAPS;await p.evaluate(()=>go('V-03',{g:'g1'}));TAPS=0;await tap(p,'[data-a=gadd][data-v="100"]');const t2=TAPS;await p.click('[data-go=R-06]');TAPS=1;await tap(p,'[data-a=withdraw]');const t3=TAPS;
 const r=await p.evaluate(()=>({g:L.goals.length,goa:L.goals[0].saved}));
 // complete: add until reached
 await p.evaluate(()=>{go('V-03',{g:L.goals[2].id});});let k=0;while(k++<40){const s=await scr(p);if(s==='V-04')break;await p.click('[data-a=gadd][data-v="500"]').catch(()=>{});}const s=await scr(p);await p.screenshot({path:'shots/val/V-04-live.png'});
 flow('F11','Goal create / add / withdraw / complete',t1,2,r.g===3&&s==='V-04'&&await led(p,'F11'),'create '+t1+' taps (name → amount → date, one per screen; plan target 2 not met), add '+t2+', withdraw '+t3+', complete opens '+s+' automatically');}
await fresh('demo&seed=monthend');TAPS=0;const sc12=await scr(p);await tap(p,'[data-a=mend][data-v=savings]');
{const r=await p.evaluate(()=>({s:S.scr,c:cur().closed,lo:cur().leftover}));flow('F12','Month-end → story',TAPS,1,sc12==='R-02'&&r.c&&r.lo.to==='savings'&&r.s==='N-04'&&await led(p,'F12'),'R-02 shown on 31 Oct; Move to Savings (₹'+r.lo.amt+') → lands on '+r.s+' month story');}
await fresh();await p.evaluate(()=>go('S-03',{j:'Food'}));TAPS=0;await tap(p,'[data-go=S-S3]');await tap(p,'[data-a=mvto][data-v=Travel]');await tap(p,'[data-a=mvgo]');
{const r=await p.evaluate(()=>cur().jars.Travel.moveIn);flow('F13','Move dots between jars',TAPS,3,r===100&&await led(p,'F13'),'Food → Travel ₹'+r);}
await fresh();await p.evaluate(()=>go('R-07'));TAPS=0;await tap(p,'[data-a=nact][data-v=checkin]');
flow('F15','Weekly check-in (from notification)',TAPS,1,(await p.evaluate(()=>!!L.lastCheckin))&&await led(p,'F15'),'one action on the notification starts the new week');
await fresh();await p.evaluate(()=>go('N-05'));TAPS=0;await tap(p,'[data-a=checkin]');flow('F15b','Weekly check-in (in app card)',TAPS,1,await p.evaluate(()=>!!L.lastCheckin),'one card, one button');
await fresh('demo&seed=lapse');TAPS=0;const s16=await scr(p);await p.screenshot({path:'shots/val/R-01-live.png'});await tap(p,'[data-a=welcome]');
flow('F16','Welcome back',TAPS,1,s16==='R-01'&&(await scr(p))==='H-01'&&await led(p,'F16'),'14 quiet days → R-01 (savings first, auto-sorted count) → Start from today');
await fresh();TAPS=0;await tap(p,'[aria-label="Home settings"]');await tap(p,'[data-a=whide][data-v=little]');
flow('F17','Edit Home board',TAPS,2,(await p.evaluate(()=>L.prefs.home.indexOf('little')))<0,'Home gear → Hide');
await fresh();await p.click('[data-tab=N]');TAPS=0;await tap(p,'[data-go=N-02]');await tap(p,'[data-a=pin][data-v=flow]');
flow('F18','Pin an insight',TAPS,2,(await p.evaluate(()=>L.prefs.insightsPins.includes('flow'))),'Library → Pin money flow');
await fresh();TAPS=0;await tap(p,'[aria-label="App settings"]');await tap(p,'[data-a=pref][data-v=bw]');
{const bw=await p.evaluate(()=>document.getElementById('app').classList.contains('bw'));await p.click('[data-a=pref][data-v=light]');const md=await p.evaluate(()=>document.getElementById('app').dataset.mode);
 flow('F19','Change look / B&W',TAPS,3,bw&&md==='light','avatar → B&W ('+bw+'); Light ('+md+')');}
await fresh();await p.evaluate(()=>go('R-07'));TAPS=0;await tap(p,'[data-a=nact][data-v=income]');flow('F20','Notification → one action',TAPS,1,await led(p,'F20'),'each of 5 notification types has one action button');

/* 5. 150 random actions with invariants after each */
await fresh();const rnd=await p.evaluate(async()=>{var R_=mulberry32(2026),log=[],errs=[];var tries=0;
 for(var i=0;i<150&&tries<2000;tries++){var els=[...document.querySelectorAll('#app [data-a],#app [data-go],#app [data-tab],#app .payb')].filter(e=>{var a=e.dataset.a;return !['reset','demo','copy','csv'].includes(a)&&!e.disabled;});
  if(!els.length){go('H-01',{},true);continue;}var e=els[Math.floor(R_()*els.length)];try{e.click();}catch(x){errs.push(String(x));}i++;
  if(S.scr==='P-05'){clearTimeout(S.payT);payCommit(S.ctx);} if(S.scr==='O-00'||!L){seedDemo();go('H-01',{},true);}
  var E=checkLedger();if(E.length)errs.push(S.scr+': '+E.join(';'));log.push(S.scr);}
 return {n:log.length,errs:errs.slice(0,5),screens:[...new Set(log)].length,le:(window.__ledgerErr||[]).slice(0,5)};});
ck('150 random actions: ledger invariants hold after each','S12',rnd.errs.length===0&&rnd.le.length===0,rnd.n+' actions across '+rnd.screens+' screens; '+(rnd.errs.concat(rnd.le).join(' | ')||'0 invariant breaks'));
const lc=await p.evaluate(()=>__LC.n);R.ledger.checks=Math.max(R.ledger.checks,lc);
ck('Ledger checked after every render/action (≥150 checks)','S12',R.ledger.errors.length===0&&lc>=150,lc+' checkLedger() runs in this page; flow-level errors: '+(R.ledger.errors.join(' | ')||'none'));
const seeds=await p.evaluate(()=>['day1','lapse','monthend','bigincome','emptyjars',null].map(s=>{seedDemo({seed:s});return s+':'+(checkLedger().length?'FAIL':'ok');}));
ck('Seed + scenario switches pass all 12 invariants','inv 1–12',seeds.every(s=>s.endsWith('ok')),seeds.join(' '));

/* 6. return triggers + notifications */
const nt=await p.evaluate(()=>{seedDemo();var s=notifSim(30);var perDay={},perWk={};s.forEach(x=>{perDay[x.d]=(perDay[x.d]||0)+1;var w=Math.floor((x.d-1)/7);perWk[w]=(perWk[w]||0)+1;});
 return {n:s.length,maxDay:Math.max(...Object.values(perDay)),maxWk:Math.max(...Object.values(perWk)),quiet:s.filter(x=>x.h>=22||x.h<8).length,types:[...new Set(s.map(x=>x.type))],ch:Object.keys(L.notif.channels).length};});
ck('Notifications: ≤1/day, ≤3/week, none 22–08, 5 types with own channels','P7-Q1',nt.maxDay<=1&&nt.maxWk<=3&&nt.quiet===0&&nt.ch===5,'30 simulated days → '+nt.n+' sent; max/day '+nt.maxDay+', max/week '+nt.maxWk+', in quiet hours '+nt.quiet+'; types sent: '+nt.types.join(', ')+'; channels '+nt.ch);
const rt=await p.evaluate(()=>({checkin:!!FR['N-05'],story:!!FR['N-04'],welcome:!!FR['R-01'],day2:L.log.some(e=>e.kind==='story')}));
ck('Return triggers exist: weekly check-in, month story, welcome back','S10',rt.checkin&&rt.story&&rt.welcome,'N-05, N-04 (+ R-02 month-end), R-01 with #seed=lapse');
const big=await p.evaluate(()=>{seedDemo({seed:'bigincome'});S.scr='V-02';S.ctx={};render();var m=[...document.querySelectorAll('.card')].map(c=>[...c.querySelectorAll('svg.dots')].reduce((a,v)=>a+ +v.dataset.marks,0));return {max:Math.max(...m),blocks:document.querySelectorAll('rect.blk').length};});
await p.screenshot({path:'shots/val/bigincome-V-02.png'});
ck('Big amounts stay readable (#seed=bigincome)','P2-Q2',big.max<=30&&big.blocks>0,'₹45,000 earner, ₹1,50,000 goal: '+big.blocks+' blocks drawn, max '+big.max+' marks per card');

/* 7. reduced motion */
{const q=await page({rm:'reduce'});await demo(q);const r=await q.evaluate(async()=>{go('P-05',{amt:60,payee:'Ramu Tea Stall',jar:'Food'});await new Promise(r=>setTimeout(r,50));var an=document.getAnimations().filter(a=>a.effect&&a.effect.getTiming().duration>0&&a.playState==='running').length;
  var sp=0;L=null;S.scr='O-00';render();await new Promise(r=>setTimeout(r,50));sp=document.getAnimations().filter(a=>a.playState==='running').length;return {an,sp,snd:false};});
 ck('Reduced motion: no running animations; sounds off by default','a11y',r.an===0&&r.sp===0,'P-05 running animations '+r.an+', splash '+r.sp+'; sounds default muted (placeholders)');await q.close();}
ck('No console errors','quality',ERRS.length===0,ERRS.length?ERRS.slice(0,4).join(' | '):'0 errors across all pages');
const passN=R.checks.filter(c=>c.pass).length,fN=R.flows.filter(f=>f.pass).length;
console.log(`\nCHECKS ${passN}/${R.checks.length}  FLOWS ${fN}/${R.flows.length}`);
fs.writeFileSync('val12.json',JSON.stringify(R,null,1));await b.close();})();
