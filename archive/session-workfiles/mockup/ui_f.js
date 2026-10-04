/* ===== TRACK MODE (B-1..B-8): categories only, no budget, no balance ===== */
const wkTot=w=>Math.round(weekSpentAll(S,w,1));
const wkCat=(c,w)=>Math.round(weekSpentBy(S,c.id,w));
function topCat(w){return S.cats.map(c=>[c,wkCat(c,w)]).sort((a,b)=>b[1]-a[1])[0]}
function openWeekPop(){if(S.track){openAsk('recap');return}if(S.planSet){if(!S.pending.length){const un=unspentNow(S);weekEnd(S,{to:'savings'});S.now=nextMonday(S.now);if(un>0)openAsk('weekmoved',{moved:un});return}autoWeek();return}UI.popup={id:'weekend',step:(S.p.mode==='manual'&&!S.noBal)?'bal':1,sel:S.goals.filter(g=>g.state==='active').map(g=>g.id)}}
H.openweek=()=>{openWeekPop();return true};
/* engine: no cascade while tracking only */
const _doPay=doPay,_detect=detectPayment,_sort=sortTxn,_refile=refileTxn;
doPay=function(S0,o){if(!S0.track)return _doPay(S0,o);const t={id:'t'+(S0.idc++),t:S0.now.getTime(),payee:o.payee||'Payment',amt:o.amt,kind:'cat',ref:o.target.id,via:o.paid?'manual':'trickle',src:null};S0.txns.unshift(t);logE(S0,`Added ₹${o.amt} to ${labelOf(S0,o.target)}`);return {txn:t,res:{amt:o.amt,target:o.amt,buffer:0,others:0,savings:0,unfunded:0}}};
detectPayment=function(S0,payee,amt){if(!S0.track)return _detect(S0,payee,amt);const mem=S0.memory[payee];const t={id:'t'+(S0.idc++),t:S0.now.getTime(),payee,amt,kind:mem?'cat':'unsorted',ref:mem||null,via:'detected',src:null};if(!mem)S0.unsorted.push(t.id);S0.txns.unshift(t);return t};
sortTxn=function(S0,id,catId){if(!S0.track)return _sort(S0,id,catId);const t=S0.txns.find(x=>x.id===id);if(!t||t.kind!=='unsorted')return;t.kind='cat';t.ref=catId;S0.memory[t.payee]=catId;S0.unsorted=S0.unsorted.filter(x=>x!==id)};
refileTxn=function(S0,id,cat){if(!S0.track)return _refile(S0,id,cat);const t=S0.txns.find(x=>x.id===id);if(!t||t.kind==='fixed'||t.kind==='goal')return;if(t.kind==='unsorted')S0.unsorted=S0.unsorted.filter(x=>x!==id);t.kind='cat';t.ref=cat;S0.memory[t.payee]=cat};
/* the three levels: limit left is always computed from spend */
const limLeft=c=>Math.max(0,c.amt-wkCat(c,0));
/* ---- home ---- */
const _home=SCREENS.home;
const nudge=(k,text,act)=>(S.asked&&S.asked[k]==='no')?'':`<button class="li" data-a="${act}"><span class="d" style="background:${SAVE}"></span><span class="n">${text}</span><span class="t">›</span></button>`;
SCREENS.home=()=>{if(!S.track)return _home();const tot=wkTot(0),prev=wkTot(1);const scale=Math.max(100,Math.ceil(Math.max(tot,prev)/50)*50);const [tc,tv]=topCat(0)||[];
 const parts=S.cats.map((c,i)=>({amt:wkCat(c,0),color:catCol(i)})).filter(p=>p.amt>0);const lines=[];
 if(S.pending.length)lines.push(`<button class="li" data-a="openweek"><span class="d" style="background:var(--amber)"></span><span class="n">Last week is ready</span><span class="t">›</span></button>`);
 creditLines().forEach(l=>lines.push(l));
 if(S.unsorted.length)lines.push(`<button class="li" data-a="push|sort"><span class="d" style="border:1.5px dashed ${AMBER};background:none"></span><span class="n">${S.unsorted.length} payment${S.unsorted.length>1?'s need':' needs'} a place</span><span class="t">›</span></button>`);
 lines.push(`<button class="li" data-a="startplan"><span class="d" style="background:${SAVE}"></span><span class="n"><b>Make a plan</b><br><span class="sm">Say what you spend in a week.</span></span><span class="t">›</span></button>`);
 return `<div class="row sp" style="margin-top:2px"><span class="cap">${fmtDay(S.now)}</span><button class="chip" data-a="settings">⚙ Settings</button></div>
 <div class="title" style="margin-top:14px">${tot?'Mostly '+esc(tc.name)+'.':'A fresh week.'}</div><div class="sub" style="margin-top:6px">${tot?'So far this week.':'Your spends will show here.'}</div>
 <div style="margin:22px 8px 8px">${parts.length?multiGrid(parts,scale,{w:300}):gridHtml(0,SPEND,0,0,{w:300})}</div><div style="text-align:center;margin-bottom:14px"><span class="chipscale">1 box ≈ ₹${Math.max(1,Math.round(scale/100))}</span></div>
 <div class="col" style="gap:8px">${lines.join('')}</div>
 <div style="position:sticky;bottom:0;margin-top:24px;padding-top:10px;background:linear-gradient(180deg,transparent,rgba(5,7,11,.9) 40%)"><button class="btn" data-a="pay">${S.p.mode==='manual'?'Add a spend':'Pay'}</button></div>`};
H.askopen=a=>{openAsk(a[0]);return false};
/* ---- spending ---- */
const _spend=SCREENS.spending;
SCREENS.spending=()=>{if(!S.track)return _spend();const rows=S.cats.map((c,i)=>({c,i,v:wkCat(c,0)})).sort((a,b)=>b.v-a.v);const hist=S.txns.slice(0,40);
 return `<div class="sec"><div class="cap">Spending</div><div class="title" style="margin-top:4px">Your week</div>
 <div class="col" style="gap:6px;margin-top:14px">${rows.map(r=>`<button class="li" data-a="push|tcat|${J({id:r.c.id})}"><span class="d" style="background:${boxBg(catCol(r.i))}"></span><span class="n">${esc(r.c.name)}</span><span class="t">${r.c.amt?money(limLeft(r.c))+' left':''}</span><span class="a">${money(r.v)}</span></button>`).join('')}</div>
 ${subsHtml()}<div class="cap" style="margin:22px 0 8px">History</div>${hist.length?`<div class="col" style="gap:6px">${hist.map(t=>`<button class="li" data-a="push|txn|${J({id:t.id})}"><span class="d" style="${t.kind==='unsorted'?`border:1.5px dashed ${AMBER};background:none`:`background:${catColor2(t.ref)}`}"></span><span class="n">${esc(t.payee)}${t.kind==='unsorted'?' <span class="mut" style="font-weight:500">· unsorted</span>':''}</span><span class="t">${fmtDay(new Date(t.t))}</span><span class="a">${money(t.amt)}</span></button>`).join('')}</div>`:`<div class="card sub">Nothing yet. Add a spend to begin.</div>`}</div>`};
SCREENS.tcat=({id})=>{const c=S.cats.find(x=>x.id===id);if(!c)return '';const i=catIdx(id),a=wkCat(c,0),b=wkCat(c,1);const scale=Math.max(100,Math.ceil(Math.max(a,b,c.amt)/50)*50);const list=S.txns.filter(t=>t.ref===id&&t.kind==='cat').slice(0,20);
 return `<button class="back" data-a="back">‹ Spending</button><div class="title">${esc(c.name)}</div><div class="sub" style="margin-top:6px">${a?'This week so far.':'Nothing this week.'}</div>
 <div style="margin:18px 8px 8px">${gridHtml(a/scale*100,catCol(i),0,0,{w:280})}</div><div style="text-align:center;margin-bottom:12px"><span class="chipscale">1 box ≈ ₹${Math.max(1,Math.round(scale/100))}</span></div>
 <div class="card" style="display:grid;gap:10px"><div class="row sp"><span class="mut">This week</span><b>${money(a)}</b></div><div class="row sp"><span class="mut">Last week</span><b>${money(b)}</b></div>${c.amt?`<div class="row sp"><span class="mut">Weekly limit</span><b>${money(c.amt)} · ${money(limLeft(c))} left</b></div>`:''}</div>
 <div class="col" style="gap:8px;margin:14px 0"><button class="btn q" data-a="tlimit|${id}">${c.amt?'Change the limit':'Set a limit?'}</button>${c.amt?`<button class="btn o" data-a="tnolimit|${id}">Remove the limit</button>`:''}</div>
 ${list.length?`<div class="cap" style="margin-bottom:8px">Recent</div><div class="col" style="gap:6px">${list.map(t=>`<button class="li" data-a="push|txn|${J({id:t.id})}"><span class="n">${esc(t.payee)}</span><span class="t">${fmtDay(new Date(t.t))}</span><span class="a">${money(t.amt)}</span></button>`).join('')}</div>`:''}`};
H.tlimit=a=>{UI.popup={id:'ask',k:'limit',cid:a[0],bg:'rgba(5,7,11,.74)'};return true};
H.tnolimit=a=>{const c=S.cats.find(x=>x.id===a[0]);c.amt=0;c.left=0;say('Limit removed.')};
/* ---- tabs that need a plan: invite, never require ---- */
function invite(cap,title,sub,label,k){return `<div class="sec" style="padding-top:40px"><div class="cap">${cap}</div><div class="title" style="margin-top:6px">${title}</div><p class="sub" style="margin:10px 0 22px">${sub}</p><div class="col" style="gap:10px"><button class="btn" data-a="askopen|${k}">${label}</button></div><p class="sm" style="margin-top:14px">You can keep tracking without it.</p>${k==='income'?`<div style="margin-top:22px"><button class="btn o s" data-a="oneoff">Add one-off money</button><p class="sm" style="margin-top:8px">Like a friend paying you back.</p></div>`:''}</div>`}
H.oneoff=()=>{openFlow('oneoff',{step:0,kp:''});return false};
const _inc=SCREENS.income,_sav=SCREENS.savings;
SCREENS.income=()=>S.noInc?invite('Money in','No income added.','Add money you get and split it between spending and saving. Only if you want.','Add income','income'):_inc();
SCREENS.savings=()=>(S.track||S.noInc)&&!S.goals.length&&S.free<=0?invite('Savings','Saving for something?','Name it and pick an amount. Trickle shows how close you are.','Add a goal','goal'):_sav();
/* ---- pay / add a spend while tracking ---- */
const _payF=FLOWS.pay;
FLOWS.pay=F=>{if(!S.track)return _payF(F);const d=F.d;const amt=amtOf(d.kp);const cid=d.cid||(d.target&&d.target.id);const ok=amt>0&&cid;
 return `<div class="mbody"><button class="back" data-a="pclose">‹ Close</button><div class="cap">${S.p.mode==='manual'?'Add a spend':'Pay'}</div><div class="title" style="margin-top:4px">How much?</div><div style="margin:10px 0;display:flex;justify-content:center">${amtDots('₹'+(d.kp||'0'))}</div>${keypad('kp')}<div class="cap" style="margin:14px 0 8px">For what?</div><div class="tgrid">${S.cats.map((c,i)=>`<button class="tile ${cid===c.id?'on':''}" style="${cid===c.id?`border-color:${catCol(i)};background:${catCol(i)}18`:''}" data-a="tpick|${c.id}"><b><i style="background:${boxBg(catCol(i))}"></i>${esc(c.name)}</b></button>`).join('')}</div><div style="height:90px"></div></div><div class="mfoot"><button class="btn ${ok?'':'d'}" data-a="${ok?'tadd':'x'}">${ok?'Add '+money(amt):'Pick an amount and a place'}</button></div>`};
H.tpick=a=>{UI.flow.d.cid=a[0]};
H.tadd=()=>{const d=UI.flow.d;const amt=amtOf(d.kp);const cid=d.cid||(d.target&&d.target.id);doPay(S,{amt,target:{type:'cat',id:cid},payee:d.payee||'Cash',paid:true});const n=labelOf(S,{type:'cat',id:cid});closeFlow();say(money(amt)+' added to '+n+'.');return false};
/* ---- lock needs a PIN ---- */
const _lock=H.lock;H.lock=()=>{if(!APP_PIN){say('No PIN yet. Add one in Settings.');return false}return _lock()};

H.startplan=()=>{startUpgrade();return false};
/* offer a plan after a week of tracking; ask again after four weeks if declined */
function maybeOfferPlan(){if(!S.track||S.planSet||UI.popup||UI.flow||UI.sheet)return;if(!S.firstDay||(S.now-S.firstDay)/DAY<7||S.txns.length<4)return;const at=S.askedAt&&S.askedAt.planoffer;if(at&&(S.now.getTime()-at)/DAY<28)return;openAsk('planoffer')}
/* ---- income: separate from the plan ---- */
FLOWS.inc=F=>{const d=F.d;const a=amtOf(d.kp);const pct=d.pct===undefined?20:d.pct;const sav=Math.round(a*pct/100/10)*10,sp=a-sav;
 if(F.step===0)return `<div class="mbody"><button class="back" data-a="pclose">‹ Close</button><div class="cap">Money in</div><div class="title" style="margin-top:4px">How much came in?</div><div style="margin:10px 0;display:flex;justify-content:center">${amtDots('₹'+(d.kp||'0'))}</div>${keypad('kp')}</div><div class="mfoot"><div class="col" style="gap:10px"><button class="btn ${a>0?'':'d'}" data-a="${a>0?'incnext':'x'}">Next</button><button class="btn q" data-a="pclose">Not now</button></div></div>`;
 if(F.step===2){const t0=wk0(),end=snapEnd(d.end||t0+27*DAY),wks=weeksIn(t0,end),wk=Math.max(5,r5b(sp/wks));
  return `<div class="mbody"><button class="back" data-a="incback">‹ Back</button><div class="cap">${money(sp)} to spend</div><div class="title" style="margin-top:4px">Until when?</div><p class="sub">Plans run in whole weeks, Monday to Sunday.</p>
  <div class="row wrap" style="gap:8px;margin:14px 0 10px">${PRESETS.map((p,i)=>`<button class="chip ${end===presetEnd(p)?'on':''}" data-a="incpre|${i}">${p[0]}</button>`).join('')}</div>
  <div style="margin:6px 0 14px;text-align:center"><div class="sub">Until <b style="color:var(--ink)">Sunday ${fmtDate(end)}</b> · ${wks} week${wks>1?'s':''}</div><div style="display:flex;justify-content:center;margin-top:8px">${amtDots(money(wk))}</div><div class="sub">a week · about ${money(Math.round(wk*weeksPer/10)*10)} a month</div></div>${calHtml(d,t0,end)}</div><div class="mfoot"><div class="col" style="gap:10px"><button class="btn" data-a="${S.planSet?'incaddplan':'incplan'}">${S.planSet?'Add to my plan':'Make my plan'}</button><button class="btn q" data-a="incdone">Just add the income</button></div></div>`}
 return `<div class="mbody"><button class="back" data-a="incback">‹ Back</button><div class="cap">${money(a)} came in</div><div class="title" style="margin-top:4px">How much to save?</div><p class="sub">The rest is for spending. Change it any time.</p><div id="inc-grid" style="margin:16px auto;width:260px">${multiGrid([{amt:Math.max(0,sav),color:SAVE},{amt:Math.max(1,sp),color:SPEND}],Math.max(1,a),{w:260})}</div><div class="row sp"><span><span class="cap">Saving · <span id="inc-pct">${pct}%</span></span><div id="inc-sav" class="h2" style="color:${SAVE}">${money(sav)}</div></span><span style="text-align:right"><span class="cap">Spending</span><div id="inc-sp" class="h2" style="color:${SPEND}">${money(sp)}</div></span></div><input type="range" min="0" max="100" step="5" value="${pct}" data-i="incpct" style="margin:18px 0 6px"><div class="row sp sm"><span>Nothing</span><span>All of it</span></div></div><div class="mfoot"><div class="col" style="gap:10px">${sp>0?`<button class="btn" data-a="incnext2">Next</button><button class="btn q" data-a="incdone">Just add ${money(a)}</button>`:`<button class="btn" id="inc-btn" data-a="incdone">Add ${money(a)}</button>`}</div></div>`};

/* ---- dates: an income covers a date range ---- */
const PRESETS=[['1 week','w',1],['1 month','m',1],['3 months','m',3],['6 months','m',6],['1 year','m',12],['2 years','m',24]];
const presetEnd=p=>{if(p[1]==='w')return wk0()+6*DAY;const t=new Date(day0());t.setMonth(t.getMonth()+p[2]);return snapEnd(t.getTime())};
const day0=()=>{const t=new Date(S.now);t.setHours(0,0,0,0);return t.getTime()};
const wk0=()=>startOfWeek(S.now).getTime();
const snapEnd=ts=>startOfWeek(new Date(ts)).getTime()+6*DAY;
const weeksIn=(t0,end)=>Math.max(1,Math.round((end-t0+DAY)/(7*DAY)));
const fmtDate=ts=>new Date(ts).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
function calHtml(d,t0,end){const today0=day0();const off=d.cm||0;const m0=new Date(new Date(today0).getFullYear(),new Date(today0).getMonth()+off,1);const first=(m0.getDay()+6)%7,dim=new Date(m0.getFullYear(),m0.getMonth()+1,0).getDate(),max=t0+735*DAY;
 let cells='';for(let i=0;i<first;i++)cells+='<i></i>';
 for(let n=1;n<=dim;n++){const ts=new Date(m0.getFullYear(),m0.getMonth(),n).getTime();const dis=ts<today0||ts>max,sel=ts===end,inr=ts>=t0&&ts<end,today=ts===today0;
  const st=`height:38px;border:0;border-radius:12px;font:inherit;font-size:14px;font-weight:${sel||today?700:500};cursor:${dis?'default':'pointer'};color:${dis?'#3b4350':sel?'#04231B':'var(--ink)'};background:${sel?'linear-gradient(135deg,#8CF3CE,#3DBB94)':inr?'rgba(98,220,180,.16)':'transparent'};${today&&!sel?'box-shadow:inset 0 0 0 1.5px #3DBB94;':''}`;
  cells+=dis?`<span style="${st};display:flex;align-items:center;justify-content:center">${n}</span>`:`<button style="${st}" data-a="incday|${ts}">${n}</button>`}
 return `<div class="card" style="padding:12px 10px"><div class="row sp" style="margin:0 4px 8px"><button class="chip" style="${off<=0?'opacity:.3;pointer-events:none':''}" data-a="incmon|-1">‹</button><b>${m0.toLocaleDateString('en-IN',{month:'long',year:'numeric'})}</b><button class="chip" style="${off>=24?'opacity:.3;pointer-events:none':''}" data-a="incmon|1">›</button></div><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;text-align:center">${['M','T','W','T','F','S','S'].map(x=>`<span class="cap" style="font-size:11px;padding:4px 0">${x}</span>`).join('')}${cells}</div></div>`}
H.incday=a=>{const d=UI.flow.d;d.end=snapEnd(+a[0])};
H.incmon=a=>{const d=UI.flow.d;d.cm=Math.max(0,Math.min(24,(d.cm||0)+(+a[0])))};
H.incpre=a=>{const d=UI.flow.d;d.end=presetEnd(PRESETS[+a[0]]);const e=new Date(d.end),n=new Date(day0());d.cm=(e.getFullYear()-n.getFullYear())*12+e.getMonth()-n.getMonth()};
H.incnext=()=>{UI.flow.step=1;UI.flow.d.pct=20};
H.incback=()=>{UI.flow.step=Math.max(0,UI.flow.step-1)};H.incnext2=()=>{const d=UI.flow.d;UI.flow.step=2;if(!d.end){d.end=presetEnd(PRESETS[1]);const e=new Date(d.end),n=new Date(day0());d.cm=(e.getFullYear()-n.getFullYear())*12+e.getMonth()-n.getMonth()}};H.inclast=a=>{UI.flow.d.lasts=parseFloat(a[0])};
HI.incpct=(a,el)=>{const d=UI.flow.d;d.pct=+el.value;const t=amtOf(d.kp),sav=Math.round(t*d.pct/100/10)*10,sp=t-sav;$('#inc-pct').textContent=d.pct+'%';$('#inc-sav').textContent=money(sav);$('#inc-sp').textContent=money(sp);$('#inc-grid').innerHTML=multiGrid([{amt:Math.max(0,sav),color:SAVE},{amt:Math.max(1,sp),color:SPEND}],Math.max(1,t),{w:260});return false};
function addIncome(d,withEnd){const a=amtOf(d.kp),pct=d.pct===undefined?20:d.pct;const sav=Math.round(a*pct/100/10)*10;const sp=a-sav;const t0=wk0();const end=withEnd&&d.end?snapEnd(d.end):null;
 (S.incomes=S.incomes||[]).push({id:'in'+(S.idc++),amt:a,sav,sp,start:t0,end});
 S.moneyIn.unshift({id:'m'+(S.idc++),t:S.now.getTime(),label:'Income'+(end?' until '+fmtDate(end):''),amt:a,note:money(sp)+' to spend, '+money(sav)+' to save'});
 S.free+=sav;S.p.income=(S.incomeSet?S.p.income:0)+a;S.p.savingsShare=(S.incomeSet?S.p.savingsShare:0)+sav;S.incomeSet=true;S.noInc=false;logE(S,`Income ₹${a}: ₹${sav} saved`);return {a,sav,sp,end}}
/* the weekly plan follows the incomes that are still running */
function planRate(){const t=S.now.getTime();return (S.incomes||[]).filter(i=>i.end&&i.end+DAY>t).reduce((x,i)=>x+i.sp/weeksIn(i.start,i.end),0)}
function recomputePlan(){const W=r5b(planRate());if(!S.planSet||W<=0||W===S.W)return false;const old=S.cats.reduce((x,c)=>x+c.amt,0)||1,flex=Math.max(10,W-S.fixedW);const sc=(flex*0.85)/old;S.cats.forEach(c=>{c.amt=Math.max(5,r5b(c.amt*sc));c.left=Math.max(0,c.amt-weekSpentBy(S,c.id,0))});const sum=S.cats.reduce((x,c)=>x+c.amt,0);S.W=W;S.flexW=Math.max(sum,flex);S.bufAmt=S.flexW-sum;S.bufLeft=S.bufAmt;S.planSig=W;logE(S,'Weekly plan is now ₹'+W);return true}
function planTick(){if(S.planSet&&S.incomes&&recomputePlan())say('Your weekly plan changed to '+money(S.W)+'.')}
H.incdone=()=>{const r=addIncome(UI.flow.d,false);closeFlow();say('Added. '+money(r.sav)+' saved.');return false};
H.incaddplan=()=>{const r=addIncome(UI.flow.d,true);recomputePlan();closeFlow();say('Added. Weekly plan is '+money(S.W)+'.');return false};
H.incplan=()=>{const d=UI.flow.d;const r=addIncome(d,true);const wk=Math.max(5,r5b(r.sp/weeksIn(wk0(),r.end)));UI.flow=null;startUpgrade({s:'q2',qW:wk,fromInc:true});return false};
