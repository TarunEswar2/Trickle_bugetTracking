/* ===== control panel ===== */
function loadProfile(k){S=newState(k);S.moneyIn=[{id:'m0',t:new Date(2026,9,1,9,0).getTime(),label:'Allowance',amt:S.p.income,note:''}];if(S.p.six)seedSix();else if(S.p.W>0){S.planSet=true;S.cats.forEach(c=>c.full=c.amt);S.bufFull=S.bufAmt;S.firstDay=new Date(S.now.getTime()-S.p.weeks*7*DAY)}resetUI();window._celeLock=false;render();fitPhone()}
function ev(name,fn){return {name,fn}}
const EVENTS=()=>{const c0=S.cats[0],big=S.cats.find(c=>c.name==='Outings')||S.cats[S.cats.length-1];const upi=S.p.mode==='upi';const g0=S.goals.find(g=>g.state==='active');const m0=S.memoryPick;return [
 {h:'Time',items:[
  ['+1 day',()=>{advanceDays(S,1);say('One day later.');maybeWeek();planTick();maybeOfferPlan();maybeOfferSub()}],
  ['+3 days',()=>{advanceDays(S,3);say('Three days later.');maybeWeek();planTick();maybeOfferPlan();maybeOfferSub()}],
  ['Sunday 8 pm: week-end pop-up',()=>{const sun=new Date(startOfWeek(S.now).getTime()+6*DAY+20*36e5);if(S.now<sun)S.now=sun;openWeekPop();UI.flow=null;UI.sheet=null}],
  ['New week starts (Monday)',()=>{const n=nextMonday(S.now);const days=Math.round((n-S.now)/DAY);advanceDays(S,Math.max(1,days));say('A new week began.');maybeWeek()}]]},
 {h:'Payments seen on your link',items:[
  [upi?'Known place: ₹60 at '+(S.txns.find(t=>t.kind==='cat')?.payee||'Tea Stall'):'(manual mode: nothing is seen)',()=>{if(!upi)return say('You track by hand, so Trickle sees nothing. Use Pay → Add a spend.');const t=S.txns.find(x=>x.kind==='cat');if(!t)return say('No known places yet.');S.memory[t.payee]=S.memory[t.payee]||t.ref;detectPayment(S,t.payee,60);say(`Seen: ₹60 at ${t.payee}, filed automatically.`)}],
  ['New place: ₹450 at Mystery Cafe',()=>{if(!upi)return say('You track by hand, so Trickle sees nothing.');detectPayment(S,'Mystery Cafe',450);say('A payment needs a category.')}],
  ['New place: ₹180 at Blue Tokai',()=>{if(!upi)return say('You track by hand, so Trickle sees nothing.');detectPayment(S,'Blue Tokai',180);say('A payment needs a category.')}]]},
 {h:'Spending',items:[
  ['Small spend: ₹60 in '+c0.name,()=>{doPay(S,{amt:60,target:{type:'cat',id:c0.id},payee:'Quick spend'});say('₹60 spent.')}],
  ['Overspend: ₹312 in '+big.name+' (uses the allowance)',()=>{doPay(S,{amt:312,target:{type:'cat',id:big.id},payee:'Big night'});say('₹312 spent.')}],
  ['Big overspend: ₹'+Math.round(S.flexW*.9)+' in '+big.name+' (reaches savings)',()=>{doPay(S,{amt:Math.round(S.flexW*.9),target:{type:'cat',id:big.id},payee:'Big night'});say('Savings were touched.')}],
  ['Use up the week (allowance to 0)',()=>{S.bufLeft=0;say('Nothing left this week.')}]]},
 {h:'Money in',items:[
  ['A ₹'+S.p.income.toLocaleString('en-IN')+' credit arrives (unsorted)',()=>{addCredit(S,'Allowance transfer',S.p.income);say('A credit is waiting in Income.')}],
  ['A friend repays ₹200 (unsorted)',()=>{addCredit(S,'Rahul',200);say('A credit is waiting in Income.')}]]},
 {h:'Bills',items:[
  ['A repeat payment looks like a subscription',()=>{const t=detectPayment(S,'Netflix',199);t.t=S.now.getTime()-30*DAY;detectPayment(S,'Netflix',199);maybeOfferSub()}],
  ['A bill is due tomorrow',()=>{const b=S.bills[0];if(!b)return say('This profile has no fixed bills.');b.nextDue=new Date(S.now.getTime()+DAY);b.dueNow=false;say(b.name+' is due tomorrow.')}],
  ['A bill is due now (unpaid)',()=>{const b=S.bills[0];if(!b)return say('This profile has no fixed bills.');b.dueNow=true;b.nextDue=new Date(S.now);say(b.name+' is due.')}]]},
 {h:'Limits (v16)',items:[
  ['Make '+c0.name+' a heavy category',()=>{for(let i=0;i<4;i++){const t=simSpend(c0.id,'Big '+c0.name+' '+(i+1),Math.round((S.W||600)*.14),i)}say('Spent a lot on '+c0.name+'.')}],
  ['Visit one shop 5 times',()=>{for(let i=0;i<5;i++)simSpend(c0.id,'Corner Cafe',40,i);say('Corner Cafe, 5 times.')}],
  ['Clear all limits',()=>{S.limits=[];S.limNo={};say('Limits cleared.')}]]},
 {h:'Lock',items:[
  ['Lock the app',()=>{H.lock()}]]},
 {h:'Awareness (v16.1)',items:[
  ['Time: 15 min before my busiest hour',()=>{const h=statsHour();const hr=6+2*h.pk;S.now=new Date(S.now.getFullYear(),S.now.getMonth(),S.now.getDate(),hr-1,45);say('It is '+S.now.toLocaleTimeString('en-IN',{hour:'numeric',minute:'2-digit'})+'.')}],
  ['Time: Thursday 3 pm (guess check)',()=>{S.now=new Date(startOfWeek(S.now).getTime()+3*DAY+15*36e5);say('Thursday afternoon.')}],
  ['Make today my biggest day',()=>{const c=S.cats[0];for(let k=1;k<=4;k++){const t=simSpend(c.id,'Heavy day',250,0);t.t=S.now.getTime()-k*7*DAY-36e5}say('Today is now your biggest day.')}],
  ['Heads-ups on',()=>{S.nudgeOff=false;say('On.')}]]},
 {h:'Scan & pay helper (Test B)',items:[['Log expense opens a scanner',()=>{window.HOMEBTN='scan';go('home')}],['Log expense goes straight to by hand',()=>{window.HOMEBTN='log';go('home')}],['Platform: Android',()=>{window.PLATFORM='android';go('home')}],['Platform: iOS (no scan)',()=>{window.PLATFORM='ios';go('home')}]]},
 {h:'First-time tips',items:[['Show every tip again',()=>{Object.keys(TS).forEach(k=>delete TS[k]);say('Tips will show again.')}],['Turn tips on or off',()=>{window.TIPS=!window.TIPS;say(window.TIPS?'Tips on.':'Tips off.')}]]},
 {h:'Pop-ups (always skippable)',items:[['Link UPI?',()=>openAsk('link')],['Add a spend?',()=>openAsk('add')],['Payments need a place',()=>openAsk('sort')],['Make a plan?',()=>openAsk('plan')],['Add your income?',()=>openAsk('income')],['After a week: here is how you spend',()=>{if(S.firstDay){S.now=new Date(S.firstDay.getTime()+8*DAY)}openAsk('planoffer')}],['Add a goal?',()=>openAsk('goal')],['Remind about bills?',()=>openAsk('notif')],['Add a PIN?',()=>openAsk('pin')],['Bring in older spends?',()=>openAsk('import')],['Last week recap (no budget)',()=>openAsk('recap')]]},
 {h:'Goals',items:[
  ['A goal reaches its target',()=>{if(!g0)return say('No active goal.');g0.saved=g0.target;g0.hist[11]=(g0.hist[11]||0)+Math.max(0,g0.target-g0.saved);reachedCheck(S);logE(S,g0.name+' reached its target')}],
  ['Add ₹500 to a goal',()=>{if(!g0)return say('No active goal.');g0.saved=Math.min(g0.target,g0.saved+500);g0.hist[11]=(g0.hist[11]||0)+500;reachedCheck(S);say('₹500 added to '+g0.name+'.')}]]}
]};
function maybeWeek(){if(S.pending.length){openWeekPop()}}
const FLAGS=[['linkLost','UPI link needs a refresh']];
function renderPanel(){const el=$('#panel');if(!el||!S)return;const sp=spentThisWeek(S);
 const potRows=[['Money left this week',money(flexLeft(S))+' of '+money(S.flexW)],['Buffer left',money(S.bufLeft)+' of '+money(S.bufAmt)],['Spent this week',money(sp)],['Fixed reserve',money(S.bills.reduce((a,b)=>a+b.reserve,0))],['Goals saved',money(S.goals.filter(g=>g.state!=='done').reduce((a,g)=>a+g.saved,0))],['Free savings',money(S.free)],['Unsorted payments',String(S.unsorted.length)],['Unsorted credits',String(S.credits.length)]];
 const flexSum=S.cats.reduce((a,c)=>a+c.amt,0)+S.bufAmt;const okInv=flexSum===S.flexW;
 el.innerHTML=`<div class="pc" style="background:linear-gradient(135deg,#12261f,#0c1017)"><div style="font-family:var(--display);font-weight:800;font-size:22px;line-height:1.1">Trickle mockup</div><div class="sm" style="margin-top:6px">Everything in the phone is computed from a live ledger. Pick a profile, tap around, then use <b>Simulate</b> to make things happen: a payment on your link, a credit, a bill, the week ending, a goal reached, a bank that declines. The <b>Ledger</b> shows where every rupee is.</div></div><div class="pc"><h3>Start</h3><button class="prof on" data-p="M"><b>Open the 6-month account</b><span>Meera: three incomes, subscriptions, goals, a plan that has run</span></button><button class="prof" data-ob="1"><b>Replay onboarding</b><span>Every step has a Skip. Or tap Just start tracking</span></button></div><div class="pc"><h3>Or jump to a profile</h3><div class="col" style="gap:6px">${Object.values(PROFILES).map(p=>`<button class="prof ${S.key===p.key?'on':''}" data-p="${p.key}"><b>${p.name}</b><span>${p.blurb}</span></button>`).join('')}</div></div>
 <div class="pc"><h3>Simulate</h3>${EVENTS().map((g,gi)=>`<div class="cap" style="margin:${gi?12:0}px 0 6px">${g.h}</div><div class="pgrid">${g.items.map((it,i)=>`<button class="pbtn" data-e="${gi}|${i}">${esc(it[0])}</button>`).join('')}</div>`).join('')}
  <div class="cap" style="margin:12px 0 6px">Switches</div><div class="pgrid">${FLAGS.map(f=>`<button class="pbtn ${S.flags[f[0]]?'on':''}" data-f="${f[0]}">${S.flags[f[0]]?'● ':'○ '}${f[1]}</button>`).join('')}</div></div>
 <div class="pc"><h3>Ledger</h3><div class="pot">${potRows.map(r=>`<span>${r[0]}</span><b>${r[1]}</b>`).join('')}<span>Categories + buffer = week</span><b style="color:${okInv?'#62DCB4':'#EDB458'}">${okInv?'balanced ✓':'check'}</b></div></div>
 <div class="pc"><h3>What just happened</h3><div class="log">${S.log.slice(0,10).map(l=>`<div><span class="mut">${l.t.toLocaleDateString('en-IN',{weekday:'short'})} ${fmtTime(l.t)}</span> · ${esc(l.text)}</div>`).join('')||'<span class="mut">Nothing yet. Try a simulation.</span>'}</div></div>
 <div class="pc"><h3>Not in this mockup</h3><div class="sm">Everything is here now: onboarding, pay, move money, week-end, goals, settings and lock. First week is not prorated yet. The blueprint lists every screen: <a style="color:#8CF3CE" href="https://claude.ai/artifact/RVjueXaXCsmCKyF6UUEErj" target="_blank" rel="noopener">blueprint ↗</a>. Look and tokens: <a style="color:#8CF3CE" href="https://claude.ai/artifact/3vrR99iZ8rmzw51MeFRXde" target="_blank" rel="noopener">design system ↗</a>.</div></div>`}
document.addEventListener('click',e=>{const ob=e.target.closest('[data-ob]');if(ob){startOnb();return}const p=e.target.closest('[data-p]');if(p){loadProfile(p.dataset.p);return}const v=e.target.closest('[data-e]');if(v){const [g,i]=v.dataset.e.split('|').map(Number);EVENTS()[g].items[i][1]();render();return}const f=e.target.closest('[data-f]');if(f){S.flags[f.dataset.f]=!S.flags[f.dataset.f];if(f.dataset.f==='linkLost'&&S.flags.linkLost)say('The link needs a refresh.');render()}});
startOnb();

function simSpend(catId,payee,amt,daysAgo){const t={id:'t'+(S.idc++),t:S.now.getTime()-(daysAgo||0)*DAY*0.5-36e5,payee,amt,kind:'cat',ref:catId,via:'manual',src:null};S.txns.unshift(t);S.txns.sort((a,b)=>b.t-a.t);S.bufLeft=Math.max(0,S.bufLeft-amt);return t}
