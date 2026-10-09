/* ===== v15.3: changes from the Architecture & Strategy Document (V15-21 to V15-30, PROPOSED until Tarun confirms) =====
   1 Weekly allowance, not category budgets (wallet mode)   2 Home = Tier 1 only: one gauge, one number, one button
   3 Fixed 100-mark gauge in 5 blocks of 20, ghosted spent marks, always empties   4 Small spends roll up silently
   5 Plain language: marks, weekly amount, Log expense   6 Model B switch: "Scan & pay" button (Test B)
   Loaded BEFORE ui15d.js so the Home-picture test harness wraps this Home. */
window.HOMEBTN='scan';
function payLabel(){return window.HOMEBTN==='scan'?'Scan & pay':'Log expense'}
/* marks left: spending is rounded DOWN to whole marks, so spends under 1% wait in a quiet buffer (rollup) */
function marksLeft(L,W){if(!(W>0))return 0;const sp=(1-Math.max(0,Math.min(W,L))/W)*100;return Math.max(0,Math.min(100,100-Math.floor(sp+1e-9)))}
function rollupPending(L,W){const m=100-marksLeft(L,W);return Math.max(0,Math.round((W-Math.max(0,L))-m*W/100))}
const GHOST='#8A94A6';
const blk=h=>h.replace('<div class="lg" ','<div class="lg blk" ');

/* ---------- the weekly amount (wallet) ---------- */
function zeroCats(){S.wallet=true;S.cats.forEach(c=>{c.amt=0;c.full=0;c.left=0});
 const sp=weekSpentAll(S,0,1);S.bufAmt=S.bufFull=S.flexW;S.bufLeft=Math.max(0,S.flexW-sp)}
function makeAllowance(wk){wk=Math.max(5,r5b(wk));UI.flow=null;
 startUpgrade({s:'done',qW:wk,balN:Math.round(wk*4.3),lasts:4.3,sav:0,fromInc:true,share:'eq',amts:{},bills:S.bills.map(b=>[b.name,b.amt,b.every,b.dueDay,b.nextDue]),qB:S.bills.map(b=>b.name),limits:true,noBal:true,method:'none',pin:APP_PIN||''});
 H.obfinish();zeroCats()}
function setAllowance(wk){wk=Math.max(5,r5b(wk));if(!planned()){makeAllowance(wk);return}
 S.W=wk;S.flexW=Math.max(0,wk-S.fixedW);if(S.wallet){S.bufAmt=S.bufFull=S.flexW;S.bufLeft=Math.max(0,S.flexW-weekSpentAll(S,0,1))}else if(typeof recomputePlan==='function')recomputePlan(true)}
/* ---------- Home: Tier 1 only (hero number, one gauge, one action) ---------- */
function nextAct(){
 if(S.flags&&S.flags.linkLost)return {t:'Refresh your UPI link',a:'settings|acct',c:'amber'};
 if(S.pending.length)return {t:'Last week is ready',a:'openweek',c:'amber'};
 if(S.credits&&S.credits.length){const c=S.credits[0];return {t:money(c.amt)+' came in from '+c.from,a:'assign|'+c.id,c:'green'}}
 if(S.unsorted.length)return {t:S.unsorted.length+(S.unsorted.length>1?' payments need':' payment needs')+' a category',a:'push|sort',c:'amber'};
 const b=billSoon()[0];if(b)return {t:b,a:'goto|spending',c:'amber'};
 if(!planned())return {t:'Set your weekly amount',a:'startplan',c:'plan'};
 return null}
SCREENS.home=()=>{const nt=nextAct(),pl=planned();let title,grid,cap='';
 if(pl){const W=Math.max(1,flexW()),L=Math.max(0,flexL()),lvl=marksLeft(L,W),empty=L<=0;
  let st='';if(typeof paceInfo==='function'){const p=paceInfo();if(S.touched||empty)st="This week's amount is used up.";else if(p&&p.over)st='Spending fast this week.'}
  title=`<span class="hero" style="font-size:46px;line-height:1">${money(L)}</span><span class="sub" style="margin-left:10px;font-size:18px">left this week</span>${st?`<div class="sub" style="margin-top:8px;color:${AMBER}">${st}</div>`:''}`;
  grid=blk(gridHtml(lvl,(typeof paceHex==='function')?paceHex():SPEND,100-lvl,GHOST,{w:300,fade:.6}))+(empty?`<div style="height:3px;background:${AMBER};margin:8px 4px 0;border-radius:2px;box-shadow:0 0 14px ${AMBER}"></div>`:'');
  cap=`<span class="row sp" style="align-items:center"><span></span><button class="chip" data-a="gridhow">1 mark = 1% ≈ ${money(boxVal(W))} ⓘ</button></span>`}
 else{const tot=wkTot(0);
  title=tot?`<span class="hero" style="font-size:46px;line-height:1">${money(tot)}</span><span class="sub" style="margin-left:10px;font-size:18px">spent this week</span>`:`<span class="title" style="font-size:30px">Nothing logged yet.</span>`;
  grid=blk(gridHtml(0,SPEND,100,GHOST,{w:300,fade:.4}))}
 const row=!nt?'':nt.c==='plan'?`<button class="li" style="padding:17px 18px;background:linear-gradient(135deg,rgba(140,243,206,.26),rgba(61,187,148,.2));border:1.5px solid #86B9A0;box-shadow:0 0 26px rgba(98,220,180,.3)" data-a="${nt.a}"><span class="n" style="font-size:18px;color:#86B9A0"><b>${nt.t}</b></span><span class="t" style="color:#86B9A0">›</span></button>`
  :`<button class="li" data-a="${nt.a}"><span class="d" style="background:${nt.c==='green'?SAVE:'var(--amber)'}"></span><span class="n">${esc(nt.t)}</span><span class="t">›</span></button>`;
 return `<div class="row sp" style="margin-top:2px"><span></span><button class="chip" data-a="settings">⚙</button></div>
 <div style="margin-top:14px">${title}</div>
 <div style="margin:20px 8px 12px" data-a="gridhow">${grid}</div><div style="margin:0 10px 16px">${cap}</div>
 ${row}
 <div style="position:sticky;bottom:0;margin-top:22px;padding-top:10px;background:transparent"><button class="btn" data-a="${window.HOMEBTN==='scan'?'payscan':'pay'}">${payLabel()}</button></div>`};

SHEETS.gridhow=({tour})=>{const pl=planned();
 if(!pl)return `<div class="cap">How to read it</div><div class="title" style="font-size:28px;margin:4px 0 14px">100 marks. That will be your week.</div><div style="display:flex;justify-content:center">${blk(gridHtml(0,SPEND,100,GHOST,{w:220,fade:.3}))}</div><p class="sub" style="margin:14px 0 18px">Set a weekly amount. Each mark is 1% of it. Spending fades marks out.</p><button class="btn" data-a="closesheet">Got it</button>`;
 const W=Math.max(1,flexW()),L=Math.max(0,flexL()),box=boxVal(W),lvl=marksLeft(L,W),pend=rollupPending(L,W),n=10;
 return `<div class="cap">${tour?'Your week':'How to read it'}</div><div class="title" style="font-size:28px;margin:4px 0 14px">100 marks. That is your week.</div>
 <div style="display:flex;justify-content:center">${blk(gridHtml(Math.max(0,lvl-n),paceHex(),n,'#F5F7FA',{w:220}))}</div>
 <p class="sub" style="margin:14px 0 8px">Each mark is 1% of ${money(W)}, about ${money(box)}. Spend ${money(box*n)} and the dashed ${n} marks fade out.</p>
 <p class="sub" style="margin:0 0 18px">Small spends collect quietly until they add up to one mark${pend>0?`. Collecting now: ${money(pend)}`:''}. Marks come back on Monday.</p><button class="btn" data-a="closesheet">Got it</button>`};

/* Model B (Test B): a "Scan & pay" button that opens a Trickle scan step first (prototype only: nothing is scanned) */
H.payscan=()=>{openPay({scan:true});return false};
const _payX=FLOWS.pay;
function walletConfirm(F){const d=F.d,amt=amtOf(d.kp),W=Math.max(1,flexW()),L=Math.max(0,flexL()),over=Math.max(0,amt-L);
 const now=marksLeft(L,W),after=marksLeft(Math.max(0,L-amt),W),goes=now-after,col=(typeof paceHex==='function')?paceHex():SPEND,lowbal=S.flags.lowBalance&&S.p.mode==='upi';
 const words=over>0?`That is more than this week's amount. The rest comes from savings.`:`${money(L-amt)} left after this.`;
 return `<div class="mbody"><button class="back" data-a="pclose">‹ Close</button><div class="cap">Logging</div><div class="title" style="font-size:28px;margin:4px 0 2px">${money(amt)} · ${esc(tgtName(d.target))}</div><div class="sub" style="margin-bottom:8px">To ${esc(d.payee||'Someone')}</div>
 <div id="pgrid" style="margin:8px 8px 0">${blk(over>0?gridHtml(0,col,100,AMBER,{w:290}):gridHtml(after,col,goes,'#F5F7FA',{w:290}))}</div>
 <div style="margin:12px 0 4px"><span class="chipscale">${over>0?'All 100 marks go':goes<1?'Under 1 mark, saved up quietly':goes+(goes===1?' mark goes':' marks go')} · 1 mark ≈ ${money(boxVal(W))}</span></div>
 ${over>0?`<div class="title" style="font-size:32px;color:var(--amber);margin-top:8px">${money(over)} over.</div>`:''}<div class="sub" style="margin-top:4px">${words}</div>
 ${lowbal?`<div class="banner" style="margin-top:12px"><b style="color:var(--amber)">Your account shows ${money(40)}.</b> <span class="sub">This may not go through.</span></div>`:''}</div>
 <div class="mfoot"><div class="row" style="gap:10px"><button class="btn o" style="flex:1" data-a="pback">Back</button><button class="btn" style="flex:1.3" data-a="pgo">${S.p.mode==='manual'||d.paid?'Add':'Pay'} ${money(amt)}</button></div></div>`}
FLOWS.pay=F=>{const d=F.d;if(S.wallet&&F.step===1&&d.target&&d.target.type==='cat')return walletConfirm(F);if(d.scan&&!d.scanned)return `<div class="mbody"><button class="back" data-a="pclose">‹ Close</button><div class="title" style="margin-top:8px">Scan the shop's QR</div><div style="margin:26px auto;width:240px;height:240px;border-radius:24px;border:2px dashed #86B9A0;display:flex;align-items:center;justify-content:center"><span class="sub">Point at the QR</span></div></div><div class="mfoot"><button class="btn" data-a="payscanned">Scan</button></div>`;
 return _payX(F)};
H.payscanned=()=>{UI.flow.d.scanned=true};

H.v15addinc=()=>{openFlow('inc',{step:0,kp:''});return false};H.startplan=H.v15addinc;

const _mpi=makePlanFromIncome;makePlanFromIncome=function(r){_mpi(r);zeroCats()};
