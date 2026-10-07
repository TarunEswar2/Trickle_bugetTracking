/* ===== v16.3: Trickle as a scan-and-hand-off helper (Android). No result is read from the UPI app (V16-35).
   Scan a shop QR, Trickle logs the spend and hands the link unchanged to the user's UPI app. If the payment fails the user removes the record. ===== */
window.PLATFORM='android';
function payLabel(){return 'Log expense'}
const QRS=[{pn:'Sharma Tea Stall',am:null},{pn:'Mess',am:75},{pn:'Campus Cafe',am:null},{pn:'Xerox Shop',am:20},{pn:'Cafe Coffee Corner',am:null}];
H.payscanned=()=>{const d=UI.flow.d,q=QRS[(UI._qr=(UI._qr||0)+1)%QRS.length];d.scanned=true;d.payee=q.pn;d.via='scan';
 if(q.am){d.kp=String(q.am);d.ask=1}else d.ask=0;const m=S.memory[q.pn];if(m&&S.cats.some(c=>c.id===m)){d.oneoff=false;if(planned()){d.toK=m;d.target={type:'cat',id:m}}else d.cid=m}};
/* the spend is logged the moment Trickle hands over to the UPI app */
function scanHandOff(){const F=UI.flow,d=F.d;d.before=Math.max(0,flexL());payFinish(true);const t=d.result&&d.result.txn;if(t){t.via='scan';t.source='upi_intent'}F.step=2}
{const _tadd=H.tadd;H.tadd=()=>{const F=UI.flow,d=F.d;if(d.scan){const cid=d.cid||(d.target&&d.target.id);if(!cid)return false;d.target={type:'cat',id:cid};scanHandOff();return}return _tadd()}}
/* Trickle never pays: by hand it just adds the spend */
{H.pgo=()=>{const d=UI.flow.d;if(d.scan){scanHandOff();return}d.paid=true;payFinish(true)}}
H.scanback=()=>{UI.flow.step=planned()?1:0};
H.scanreturn=()=>{UI.flow.step=3};
H.scanremove=()=>{const d=UI.flow.d,t=d.result&&d.result.txn;if(t){const sd=(t.src&&t.src.savingsDetail)||{};Object.keys(sd).forEach(k=>{if(k==='free')S.free+=sd[k];else{const g=S.goals.find(x=>x.id===k);if(g)g.saved+=sd[k]}});removeTxn(S,t.id)}closeFlow();say('Removed. Nothing is taken from your week.');return false};

const savWhere=(res)=>{const sd=res.savingsDetail||{};return Object.keys(sd).filter(k=>sd[k]>0).map(k=>({n:k==='free'?'Free savings':((S.goals.find(g=>g.id===k)||{}).name||'A goal'),v:sd[k]}))};
const _pay17=FLOWS.pay;
FLOWS.pay=F=>{const d=F.d,amt=amtOf(d.kp);
 if(d.scan&&!d.scanned)return `<div class="mbody"><button class="back" data-a="pclose">‹ Close</button><div class="title" style="margin-top:8px">Scan the shop's QR</div><div class="sub" style="margin-top:6px">Trickle only helps you pay. It never sees your bank.</div>
  <div class="vf"><i class="c tl"></i><i class="c tr"></i><i class="c bl"></i><i class="c br"></i><b class="scanline"></b><span class="sub">Point at the QR</span></div></div>
  <div class="mfoot"><div class="col" style="gap:8px"><button class="btn" data-a="payscanned">Scan (simulated)</button><button class="btn q" data-a="paybyhand">No QR? Add by hand</button></div></div>`;
 if(d.scan&&d.scanned&&F.step===2)return `<div class="mbody"><button class="back" data-a="pclose">‹ Close</button><div class="cap">${esc(d.payee||'Someone')} · ${money(amt)}</div><div class="title" style="margin-top:6px">Pay in your UPI app</div><div class="sub" style="margin-top:6px">Trickle has added it to your week and opened your UPI app. Finish there, then come back.</div>
  <div class="card" style="margin-top:22px"><div class="cap">Your UPI app (simulated)</div><div class="h2" style="margin-top:8px">${money(amt)} to ${esc(d.payee||'Someone')}</div><div class="sm" style="margin-top:6px">Prototype only. Trickle cannot see what happens in here.</div><button class="btn s" style="margin-top:14px;width:100%" data-a="scanreturn">Back to Trickle</button></div></div>`;
 if(F.step===3&&d.result&&!d.fail&&planned()&&d.target&&d.target.type==='cat'){const R=d.result,res=R.res||{},t=R.txn,W=Math.max(1,flexW()),L=Math.max(0,flexL()),sv=savWhere(res),col=(typeof paceHex==='function')?paceHex():'#5FE3B8',before=Math.min(W,(d.before!=null?d.before:L+amt)),warn=limWarn(d.target.id,d.payee,amt);
  return `<div class="mbody" style="text-align:center;padding-top:56px"><svg class="okring" width="92" height="92" viewBox="0 0 92 92" aria-hidden="true"><circle cx="46" cy="46" r="42" fill="rgba(95,227,184,.10)" stroke="#5FE3B8" stroke-width="3" stroke-linecap="round" stroke-dasharray="264" stroke-dashoffset="0"/><path d="M28 47l12 12 24-27" fill="none" stroke="#5FE3B8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="64" stroke-dashoffset="0"/></svg>
  <div class="title" style="font-size:26px;margin-top:18px">${d.scan?'Added to your week':'Added'}</div><div class="hero" style="font-size:56px;margin-top:8px">${money(amt)}</div><div class="sub" style="margin-top:8px">${esc(d.payee||'Someone')} · ${esc(tgtName(d.target))}</div>
  <div class="card" style="text-align:left;margin-top:28px"><div class="row sp" style="align-items:baseline"><span class="cap">Left this week</span><span class="sm">of ${money(W)}</span></div><div class="hero" style="font-size:34px;margin:6px 0 14px">${money(L)}</div>${battery(L,W,{col,prev:before/W,sm:true})}</div>
  ${sv.length?`<div class="banner" style="margin-top:14px;text-align:left"><b style="color:var(--amber)">${money(res.savings)} came from your savings.</b><div class="sm" style="margin-top:4px">${sv.map(x=>esc(x.n)+' '+money(x.v)).join(' · ')}</div></div>`:''}
  ${warn?`<div class="banner" style="margin-top:14px;text-align:left"><span style="color:var(--amber);font-weight:700">${esc(warn)}</span></div>`:''}
  ${d.scan?`<div class="sm" style="margin-top:16px">Not sure it went through? Check your UPI app.</div>`:''}</div>
  <div class="mfoot"><div class="col" style="gap:8px"><button class="btn" data-a="pclose">Done</button>${d.scan?`<button class="btn q" data-a="scanremove">Didn't pay? Remove</button>`:''}</div></div>`}
 let h=_pay17(F);
 if(d.scan&&d.scanned&&F.step===1)h=h.replace(/(<button class="btn" style="flex:1.3" data-a="pgo">)[^<]*/,'$1Open UPI app');
 return h};
{const _pf=payFinish;payFinish=function(ok,why){try{UI.flow.d.before=Math.max(0,flexL())}catch(e){}return _pf(ok,why)}}

H.paybyhand=()=>{const d=UI.flow.d;d.scan=false;d.scanned=false;d.via=null};
