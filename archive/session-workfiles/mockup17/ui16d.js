/* ===== v16.3: Trickle as a scan-and-hand-off helper (Android). No result is read from the UPI app (V16-35).
   Scan a shop QR, Trickle logs the spend and hands the link unchanged to the user's UPI app. If the payment fails the user removes the record. ===== */
window.PLATFORM='android';
function payLabel(){return 'Log expense'}
const QRS=[{pn:'Sharma Tea Stall',am:null,mc:'5499'},{pn:'Mess',am:75,mc:'5812'},{pn:'Campus Cafe',am:null,mc:'5814'},{pn:'Xerox Shop',am:20,mc:'7338'},{pn:'Raju Auto',am:null,mc:'4121'},{pn:'Apna Medical',am:null,mc:'5912'},{pn:'Cafe Coffee Corner',am:null,mc:'5814'}];
/* On-device tagging, in this order: what the user picked last time, words in the shop name, the merchant code in the QR. No server. */
const KEYW=[[/tea|chai|coffee|cafe|brew/i,'Chai & coffee'],[/mess|canteen|restaurant|biryani|dhaba|hotel|kitchen|bhojan/i,'Food'],[/xerox|print|stationer|book|copy/i,'College & study'],[/metro|auto|cab|bus|rail|petrol|fuel/i,'Travel'],[/recharge|jio|airtel|\bvi\b|broadband/i,'Phone & data'],[/snack|bakery|sweet|juice/i,'Snacks'],[/medical|pharmacy|salon|chemist/i,'Personal care']];
const MCCS={'5812':'Food','5814':'Food','5411':'Groceries','5499':'Snacks','5462':'Snacks','4111':'Travel','4121':'Travel','4131':'Travel','4814':'Phone & data','5942':'College & study','5943':'College & study','7338':'College & study','5912':'Personal care','7230':'Personal care','7832':'Outings'};
function suggestCat(q){const byName=n=>(S.cats.find(c=>c.name===n)||{}).id;const m=S.memory[q.pn];if(m&&S.cats.some(c=>c.id===m))return {id:m,why:'You picked this last time.'};
 for(const [re,n] of KEYW){if(re.test(q.pn)){const id=byName(n);if(id)return {id,why:'Suggested from the shop name.'}}}
 const n=MCCS[q.mc];if(n){const id=byName(n);if(id)return {id,why:"Suggested from the shop's code."}}return null}
H.payscanned=()=>{const F=UI.flow,d=F.d,q=QRS[(UI._qr=(UI._qr||0)+1)%QRS.length];d.scanned=true;d.payee=q.pn;d.via='scan';d.oneoff=false;d.target=null;d.cid=null;d.toK=null;d.catWhy='';
 const s=suggestCat(q);if(s){d.cid=s.id;d.target={type:'cat',id:s.id};d.toK=s.id;d.catWhy=s.why}
 if(q.am){d.kp=String(q.am);d.ask=1;F.step=1}else{d.kp='';d.ask=0;F.step=0}};
/* after the amount, a scan goes straight to one combined screen: category, what it does to the week, then UPI */
{const _pa=H.payask;H.payask=()=>{const F=UI.flow;if(F.d.scan&&F.d.scanned){F.d.ask=1;F.step=1;return}return _pa()}}
H.scancat=a=>{const d=UI.flow.d;d.cid=a[0];d.target={type:'cat',id:a[0]};d.toK=a[0];d.catWhy=''};
H.scanmore=()=>{openSheet('catpick',{act:'scan',arg:'x'});return false};
{const _ap=applyPick;applyPick=function(act,arg,id){if(act==='scan'){UI.sheet=null;const d=UI.flow.d;d.cid=id;d.target={type:'cat',id};d.toK=id;d.catWhy='';return}return _ap(act,arg,id)}}
H.scango=()=>{const d=UI.flow.d;if(!d.target)return false;scanHandOff()};
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
 if(d.scan&&d.scanned&&F.step===1)return scanConfirm(F);
 if(d.scan&&!d.scanned)return `<div class="mbody"><button class="back" data-a="pclose">‹ Close</button><div class="title" style="margin-top:8px">Scan the shop's QR</div><div class="sub" style="margin-top:6px">Trickle only helps you pay. It never sees your bank.</div>
  <div class="vf"><i class="c tl"></i><i class="c tr"></i><i class="c bl"></i><i class="c br"></i><b class="scanline"></b><span class="sub">Point at the QR</span></div></div>
  <div class="mfoot"><div class="col" style="gap:8px"><button class="btn" data-a="payscanned">Scan (simulated)</button><button class="btn q" data-a="paybyhand">No QR? Add by hand</button></div></div>`;
 if(d.scan&&d.scanned&&F.step===2)return `<div class="mbody"><button class="back" data-a="pclose">‹ Close</button><div class="cap">${esc(d.payee||'Someone')} · ${money(amt)}</div><div class="title" style="margin-top:6px">Pay in your UPI app</div><div class="sub" style="margin-top:6px">Added to your week. Pay in your UPI app, then come back.</div>
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

function scanConfirm(F){const d=F.d,amt=amtOf(d.kp),pl=planned(),W=Math.max(1,flexW()),L=Math.max(0,flexL()),over=Math.max(0,amt-L),sel=d.target&&d.target.id,col=(typeof paceHex==='function')?paceHex():'#5FE3B8';
 const ids=S.cats.map(c=>c.id),order=[...(sel?[sel]:[]),...ids.filter(x=>x!==sel)].slice(0,8);
 const chips=order.map(id=>{const c=S.cats.find(x=>x.id===id),i=catIdx(id),on=id===sel;return `<button class="chip ${on?'on':''}" data-a="scancat|${id}"><i style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${catCol(i)};margin-right:7px"></i>${esc(c.name)}</button>`}).join('')+(S.cats.length>8?`<button class="chip" data-a="scanmore">More</button>`:'');
 const warn=sel?limWarn(sel,d.payee,amt):'',aw=pl?awareness():null,share=pl&&L>0?L/daysToGo():0;
 return `<div class="mbody"><button class="back" data-a="pclose">‹ Close</button><div class="cap">${esc(d.payee||'Someone')}</div><div style="margin-top:4px"><span class="hero" style="font-size:46px">${money(amt)}</span></div>
 <div class="row wrap" style="gap:8px;margin-top:16px">${chips}</div>${d.catWhy?`<div class="sm" style="margin-top:8px">${esc(d.catWhy)}</div>`:''}
 ${pl?`<div style="margin:26px 2px 22px">${battery(L,W,{col:over>0?AMBER:col,goes:Math.min(amt,L),prev:L/W})}</div><div class="row sp"><span><span class="cap">Left now</span><div class="h2">${money(L)}</div></span><span style="text-align:right"><span class="cap">Left after</span><div class="h2" style="${over>0?'color:var(--amber)':''}">${money(Math.max(0,L-amt))}</div></span></div>
 ${over>0?`<div class="sub" style="margin-top:14px;color:var(--amber);font-weight:600">${money(over)} over. Savings cover the rest.</div>`:share>0?`<div class="sub" style="margin-top:14px">${amt<=share?`That is ${Math.max(1,Math.round(amt/share*100))}% of today's ${money(share)}.`:`More than today's ${money(share)}.`}</div>`:''}`:''}
 ${warn?`<div class="banner" style="margin-top:14px"><span style="color:var(--amber);font-weight:700">${esc(warn)}</span></div>`:''}${aw&&!warn?`<div class="banner" style="margin-top:14px;border-color:rgba(205,182,255,.4);background:rgba(205,182,255,.08)"><span style="color:#CDB6FF;font-weight:700">${esc(aw.t)}</span></div>`:''}</div>
 <div class="mfoot"><button class="btn ${sel?'':'d'}" data-a="${sel?'scango':'x'}">${sel?'Open UPI app':'Pick a category'}</button></div>`}
