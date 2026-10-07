/* ===== v16.3: Trickle as a scan-and-hand-off helper (Android). It never reads a bank account.
   Scan a shop QR in Trickle, pay in your own UPI app, come back, say whether it went through. ===== */
window.PLATFORM='android';
function payLabel(){return 'Log expense'}
const QRS=[{pn:'Sharma Tea Stall',am:null},{pn:'Mess',am:75},{pn:'Campus Cafe',am:null},{pn:'Xerox Shop',am:20},{pn:'Cafe Coffee Corner',am:null}];
H.payscanned=()=>{const d=UI.flow.d,q=QRS[(UI._qr=(UI._qr||0)+1)%QRS.length];d.scanned=true;d.payee=q.pn;d.via='scan';
 if(q.am){d.kp=String(q.am);d.ask=1}else d.ask=0;const m=S.memory[q.pn];if(m&&S.cats.some(c=>c.id===m)){d.oneoff=false;if(planned()){d.toK=m;d.target={type:'cat',id:m}}else d.cid=m}};
/* by-hand category screen in "no allowance" mode adds at once; in a scan it goes on to the hand-off */
{const _tadd=H.tadd;H.tadd=()=>{const F=UI.flow,d=F.d;if(d.scan){const cid=d.cid||(d.target&&d.target.id);if(!cid)return false;d.target={type:'cat',id:cid};F.step=2;return}return _tadd()}}
{const _pgo=H.pgo;H.pgo=()=>{const F=UI.flow;if(F.d.scan){F.step=2;return}return _pgo()}}
H.scanback=()=>{UI.flow.step=F1()};const F1=()=>planned()?1:0;
H.scanres=a=>{const F=UI.flow;F.d.hint=a[0];F.step=4};
H.scandid=a=>{const F=UI.flow,d=F.d;
 if(a[0]==='no'){const amt=amtOf(d.kp);(S.failedTx=S.failedTx||[]).unshift({id:'f'+(S.idc++),t:S.now.getTime(),payee:d.payee||'Someone',amt,cat:d.target&&d.target.id});F.step=5;return}
 scanLog(a[0]==='yes'?'confirmed':'unconfirmed')};
function scanLog(status){payFinish(true);const t=UI.flow.d.result&&UI.flow.d.result.txn;if(t){t.via='scan';t.status=status;t.source='upi_intent'}}
const _pay17=FLOWS.pay;
FLOWS.pay=F=>{const d=F.d,amt=amtOf(d.kp);
 if(d.scan&&d.scanned){
  if(F.step===2)return `<div class="mbody"><button class="back" data-a="scanback">‹ Back</button><div class="cap">${esc(d.payee||'Someone')} · ${money(amt)}</div><div class="title" style="margin-top:6px">Pay in your UPI app</div><div class="sub" style="margin-top:6px">Trickle opens it for you. Finish there, then come back. Trickle never sees your bank.</div>
   <div class="card" style="margin-top:22px"><div class="cap">Your UPI app (simulated)</div><div class="h2" style="margin-top:8px">${money(amt)} to ${esc(d.payee||'Someone')}</div><div class="sm" style="margin-top:4px">Pick what happens in this prototype.</div><div class="col" style="gap:8px;margin-top:14px"><button class="btn s" data-a="scanres|paid">Payment goes through</button><button class="btn s q" data-a="scanres|failed">Payment fails</button><button class="btn s q" data-a="scanres|closed">I close the app</button></div></div></div>`;
  if(F.step===4){const hint={paid:'Your UPI app said it was paid.',failed:'Your UPI app said it failed.',closed:'Your UPI app did not say.'}[d.hint]||'';
   return `<div class="mbody" style="padding-top:70px"><div class="cap">${esc(d.payee||'Someone')} · ${money(amt)}</div><div class="title" style="margin-top:6px">Did it go through?</div><div class="sub" style="margin-top:8px">${hint} You tell Trickle. It does not look at your bank.</div></div>
   <div class="mfoot"><div class="col" style="gap:10px"><button class="btn" data-a="scandid|yes">Yes, it went through</button><button class="btn q" data-a="scandid|no">No, it failed</button><button class="btn q" data-a="scandid|unsure">Not sure yet</button></div></div>`}
  if(F.step===5)return `<div class="mbody" style="padding-top:70px"><div class="title">Not added.</div><div class="sub" style="margin-top:8px">Nothing was taken from your week. It stays in History if you want to try again.</div></div><div class="mfoot"><div class="col" style="gap:10px"><button class="btn" data-a="scanagain">Try again</button><button class="btn q" data-a="pclose">Done</button></div></div>`}
 let h=_pay17(F);
 if(d.scan&&d.scanned&&F.step===1)h=h.replace(/(<button class="btn" style="flex:1.3" data-a="pgo">)[^<]*/,'$1Open your UPI app');
 return h};
H.scanagain=()=>{UI.flow.step=2};

/* a payment that was not confirmed asks again, later */
{const _na=nextAct;nextAct=function(){const uc=S.txns.find(t=>t.status==='unconfirmed');if(uc)return {t:`Did ${money(uc.amt)} at ${uc.payee} go through?`,a:'didgo|'+uc.id,c:'amber'};return _na()}}
SHEETS.didgo=({id})=>{const t=S.txns.find(x=>x.id===id);if(!t)return '';return `<div class="cap">${esc(t.payee)}</div><div class="title" style="font-size:26px;margin:4px 0 6px">Did ${money(t.amt)} go through?</div><div class="sub">Check your UPI app if you are not sure.</div><div class="col" style="gap:10px;margin-top:18px"><button class="btn" data-a="didres|${t.id}|yes">Yes, it did</button><button class="btn q" data-a="didres|${t.id}|no">No, it failed</button></div>`};
H.didgo=a=>{openSheet('didgo',{id:a[0]});return false};
H.didres=a=>{const t=S.txns.find(x=>x.id===a[0]);UI.sheet=null;if(!t)return false;
 if(a[1]==='yes'){t.status='confirmed';say('Confirmed.')}
 else{(S.failedTx=S.failedTx||[]).unshift({id:'f'+(S.idc++),t:t.t,payee:t.payee,amt:t.amt,cat:t.ref});removeTxn(S,t.id);say('Taken out of your week.')}return false};
SHEETS.failtx=({id})=>{const f=(S.failedTx||[]).find(x=>x.id===id);if(!f)return '';return `<div class="cap">Did not go through</div><div class="title" style="font-size:26px;margin:4px 0 6px">${esc(f.payee)} · ${money(f.amt)}</div><div class="sub">Nothing was taken from your week.</div><div class="col" style="gap:10px;margin-top:18px"><button class="btn" data-a="failadd|${f.id}">I did pay, add it</button><button class="btn q" data-a="faildel|${f.id}">Delete this</button></div>`};
H.failtx=a=>{openSheet('failtx',{id:a[0]});return false};
H.failadd=a=>{const f=(S.failedTx||[]).find(x=>x.id===a[0]);UI.sheet=null;if(!f)return false;const cid=f.cat&&S.cats.some(c=>c.id===f.cat)?f.cat:S.cats[0].id;const r=doPay(S,{amt:f.amt,target:{type:'cat',id:cid},payee:f.payee,paid:true});r.txn.via='scan';r.txn.status='confirmed';S.failedTx=S.failedTx.filter(x=>x!==f);say('Added.');return false};
H.faildel=a=>{S.failedTx=(S.failedTx||[]).filter(x=>x.id!==a[0]);UI.sheet=null;return false};

/* History shows the ones that did not go through, muted, and the ones still to confirm */
spHist=function(){const full=UI.spAll,N=full?80:8;const items=S.txns.slice(0,N).concat((S.failedTx||[]).map(f=>({id:f.id,t:f.t,payee:f.payee,amt:f.amt,kind:'failed'}))).sort((a,b)=>b.t-a.t).slice(0,N);
 if(!items.length)return `<div class="title" style="font-size:22px">Nothing yet.</div>`;const groups={};items.forEach(t=>{const k=new Date(t.t).toDateString();(groups[k]=groups[k]||[]).push(t)});
 return Object.keys(groups).map(k=>{const d=new Date(k),dl=Math.floor((new Date(S.now.toDateString())-d)/DAY),name=dl===0?'Today':dl===1?'Yesterday':fmtDay(d),tot=groups[k].filter(isSp).reduce((a,t)=>a+t.amt,0);
  return `<div class="row sp" style="margin:16px 0 6px"><span class="cap">${name}</span>${tot?`<span class="cap">${money(tot)}</span>`:''}</div><div class="col" style="gap:6px">${groups[k].map(t=>{const failed=t.kind==='failed',unc=t.status==='unconfirmed';
   const cn=failed?'Did not go through':unc?'To confirm':t.kind==='cat'?catName(t.ref):t.kind==='unsorted'?'Needs a category':t.kind==='fixed'?'Subscription':t.kind==='oneoff'?'One-off':'Goal';
   const act=failed?'failtx|'+t.id:unc?'didgo|'+t.id:'push|txn|'+J({id:t.id}).replace(/\|/g,'');
   return `<button class="li" style="${failed?'opacity:.62':''}" data-a="${act}"><span class="d" style="${failed?'border:1.5px solid #8F9AAB;background:none':t.kind==='unsorted'||unc?`border:1.5px dashed ${AMBER};background:none`:`background:${t.kind==='fixed'?FIXC:t.kind==='goal'?SAVE:t.kind==='oneoff'?'#B48CFF':catColor2(t.ref)}`}"></span><span class="n" style="line-height:1.25">${esc(t.payee)}<span class="mut" style="display:block;font-weight:500;font-size:12px;${unc?'color:'+AMBER:''}">${cn}</span></span><span class="a" style="${failed?'text-decoration:line-through;color:var(--ink3)':''}">${money(t.amt)}</span></button>`}).join('')}</div>`}).join('')+(!full&&S.txns.length>8?`<button class="li" style="margin-top:12px" data-a="spall"><span class="n mut">Show all</span><span class="t">›</span></button>`:'')};
