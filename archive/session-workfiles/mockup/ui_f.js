/* ===== TRACK MODE (B-1..B-8): categories only, no budget, no balance ===== */
const wkTot=w=>Math.round(weekSpentAll(S,w,1));
const wkCat=(c,w)=>Math.round(weekSpentBy(S,c.id,w));
function topCat(w){return S.cats.map(c=>[c,wkCat(c,w)]).sort((a,b)=>b[1]-a[1])[0]}
function openWeekPop(){if(S.track){openAsk('recap');return}UI.popup={id:'weekend',step:(S.p.mode==='manual'&&!S.noBal)?'bal':1,sel:S.goals.filter(g=>g.state==='active').map(g=>g.id)}}
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
 if(S.unsorted.length)lines.push(`<button class="li" data-a="push|sort"><span class="d" style="border:1.5px dashed ${AMBER};background:none"></span><span class="n">${S.unsorted.length} payment${S.unsorted.length>1?'s need':' needs'} a place</span><span class="t">›</span></button>`);
 if(tot>0&&!S.cats.some(c=>c.amt))lines.push(nudge('limit','Set a limit for '+esc(tc.name)+'?','askopen|limit'));
 if(!S.balSet)lines.push(nudge('bal','How long will my money last?','askopen|bal'));
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
 <div class="cap" style="margin:22px 0 8px">History</div>${hist.length?`<div class="col" style="gap:6px">${hist.map(t=>`<button class="li" data-a="push|txn|${J({id:t.id})}"><span class="d" style="${t.kind==='unsorted'?`border:1.5px dashed ${AMBER};background:none`:`background:${catColor2(t.ref)}`}"></span><span class="n">${esc(t.payee)}${t.kind==='unsorted'?' <span class="mut" style="font-weight:500">· unsorted</span>':''}</span><span class="t">${fmtDay(new Date(t.t))}</span><span class="a">${money(t.amt)}</span></button>`).join('')}</div>`:`<div class="card sub">Nothing yet. Add a spend to begin.</div>`}</div>`};
SCREENS.tcat=({id})=>{const c=S.cats.find(x=>x.id===id);if(!c)return '';const i=catIdx(id),a=wkCat(c,0),b=wkCat(c,1);const scale=Math.max(100,Math.ceil(Math.max(a,b,c.amt)/50)*50);const list=S.txns.filter(t=>t.ref===id&&t.kind==='cat').slice(0,20);
 return `<button class="back" data-a="back">‹ Spending</button><div class="title">${esc(c.name)}</div><div class="sub" style="margin-top:6px">${a?'This week so far.':'Nothing this week.'}</div>
 <div style="margin:18px 8px 8px">${gridHtml(a/scale*100,catCol(i),0,0,{w:280})}</div><div style="text-align:center;margin-bottom:12px"><span class="chipscale">1 box ≈ ₹${Math.max(1,Math.round(scale/100))}</span></div>
 <div class="card" style="display:grid;gap:10px"><div class="row sp"><span class="mut">This week</span><b>${money(a)}</b></div><div class="row sp"><span class="mut">Last week</span><b>${money(b)}</b></div>${c.amt?`<div class="row sp"><span class="mut">Weekly limit</span><b>${money(c.amt)} · ${money(limLeft(c))} left</b></div>`:''}</div>
 <div class="col" style="gap:8px;margin:14px 0"><button class="btn q" data-a="tlimit|${id}">${c.amt?'Change the limit':'Set a limit?'}</button>${c.amt?`<button class="btn o" data-a="tnolimit|${id}">Remove the limit</button>`:''}</div>
 ${list.length?`<div class="cap" style="margin-bottom:8px">Recent</div><div class="col" style="gap:6px">${list.map(t=>`<button class="li" data-a="push|txn|${J({id:t.id})}"><span class="n">${esc(t.payee)}</span><span class="t">${fmtDay(new Date(t.t))}</span><span class="a">${money(t.amt)}</span></button>`).join('')}</div>`:''}`};
H.tlimit=a=>{UI.popup={id:'ask',k:'limit',cid:a[0],bg:'rgba(5,7,11,.74)'};return true};
H.tnolimit=a=>{const c=S.cats.find(x=>x.id===a[0]);c.amt=0;c.left=0;say('Limit removed.')};
/* ---- tabs that need a plan: invite, never require ---- */
function invite(cap,title,sub,label,k){return `<div class="sec" style="padding-top:40px"><div class="cap">${cap}</div><div class="title" style="margin-top:6px">${title}</div><p class="sub" style="margin:10px 0 22px">${sub}</p><div class="col" style="gap:10px"><button class="btn" data-a="askopen|${k}">${label}</button></div><p class="sm" style="margin-top:14px">You can keep tracking without it.</p></div>`}
const _inc=SCREENS.income,_sav=SCREENS.savings;
SCREENS.income=()=>S.noInc?invite('Money in','No plan yet.','Add what you get each month and Trickle splits it. Only if you want.','Make a plan','plan'):_inc();
SCREENS.savings=()=>(S.track||S.noInc)&&!S.goals.length?invite('Savings','Saving for something?','Name it and pick an amount. Trickle shows how close you are.','Add a goal','goal'):_sav();
/* ---- pay / add a spend while tracking ---- */
const _payF=FLOWS.pay;
FLOWS.pay=F=>{if(!S.track)return _payF(F);const d=F.d;const amt=amtOf(d.kp);const cid=d.cid||(d.target&&d.target.id);const ok=amt>0&&cid;
 return `<div class="mbody"><button class="back" data-a="pclose">‹ Close</button><div class="cap">${S.p.mode==='manual'?'Add a spend':'Pay'}</div><div class="title" style="margin-top:4px">How much?</div><div style="margin:10px 0;display:flex;justify-content:center">${amtDots('₹'+(d.kp||'0'))}</div>${keypad('kp')}<div class="cap" style="margin:14px 0 8px">For what?</div><div class="tgrid">${S.cats.map((c,i)=>`<button class="tile ${cid===c.id?'on':''}" style="${cid===c.id?`border-color:${catCol(i)};background:${catCol(i)}18`:''}" data-a="tpick|${c.id}"><b><i style="background:${boxBg(catCol(i))}"></i>${esc(c.name)}</b></button>`).join('')}</div><div style="height:90px"></div></div><div class="mfoot"><button class="btn ${ok?'':'d'}" data-a="${ok?'tadd':'x'}">${ok?'Add '+money(amt):'Pick an amount and a place'}</button></div>`};
H.tpick=a=>{UI.flow.d.cid=a[0]};
H.tadd=()=>{const d=UI.flow.d;const amt=amtOf(d.kp);const cid=d.cid||(d.target&&d.target.id);doPay(S,{amt,target:{type:'cat',id:cid},payee:d.payee||'Cash',paid:true});const n=labelOf(S,{type:'cat',id:cid});closeFlow();say(money(amt)+' added to '+n+'.');return false};
/* ---- lock needs a PIN ---- */
const _lock=H.lock;H.lock=()=>{if(!APP_PIN){say('No PIN yet. Add one in Settings.');return false}return _lock()};
