/* ===== v15.1: Insights tab, teaching the grid, one-off payments, UPI balance split back ===== */

/* ---------- Insights: When / Repeats / Vs last week (v14 visuals, one per view, finding first) ---------- */
H.insseg=a=>{UI.ins=a[0];UI.hot.isel=null};
function insWhen(){const sc=UI.hot.scale,mode=UI.hot.mode,off=UI.hot.off||0;const {P,cols,cells}=insCells(sc,off,mode);const sel=UI.hot.isel;
 const minT=S.txns.length?Math.min(...S.txns.map(t=>t.t)):Infinity;const canPrev=periodInfo(sc,off-1).to>minT,canNext=off<0;
 const real=cells.filter(c=>!c.blank);const top=[...real].sort((a,b)=>b.v-a.v)[0];const tot=real.reduce((a,c)=>a+c.v,0);
 const lead=sc==='day'?'You spend most around':sc==='week'?'You spend most on':'You spend most around the';
 const hero=top&&top.v?`<div class="cap" style="text-transform:none;letter-spacing:0;font-size:15px;color:var(--ink2)">${lead}</div><div class="hero" style="font-size:${top.big.length>8?42:58}px;margin-top:4px;background:linear-gradient(145deg,#F1E8FF,#B48CFF 55%,#7C5CFF);-webkit-background-clip:text;background-clip:text;color:transparent">${esc(top.big)}</div><div class="sub" style="margin-top:6px">${mode==='times'?(top.v+(top.v>1?' spends':' spend')+(tot>top.v?' of '+tot:'')):(money(top.v)+(tot>top.v?' of '+money(tot):''))} ${sc==='day'?(off===0?'today':'that day'):sc==='week'?(off===0?'this week':'that week'):'that month'}</div>`
  :`<div class="title" style="font-size:26px">Nothing in this ${sc}.</div>`;
 const nav=`<div class="row sp" style="margin:20px 0 10px;align-items:center"><button class="chip" style="${canPrev?'':'opacity:.3;pointer-events:none'}" data-a="ioff|-1">‹</button><b style="font-size:16px">${esc(P.label)}</b><button class="chip" style="${canNext?'':'opacity:.3;pointer-events:none'}" data-a="ioff|1">›</button></div>`;
 const head=sc==='month'?`<div style="display:grid;grid-template-columns:repeat(7,1fr);width:310px;margin:0 auto 4px">${['M','T','W','T','F','S','S'].map(x=>`<span class="cap" style="text-align:center;font-size:11px">${x}</span>`).join('')}</div>`:sc==='week'?`<div style="display:grid;grid-template-columns:repeat(7,1fr);width:310px;margin:0 auto 4px">${DOW.map(x=>`<span class="cap" style="text-align:center;font-size:11px">${x[0]}</span>`).join('')}</div>`:'';
 let grid=hotHtml(cells.map(c=>c.blank?{v:0,label:'',w:''}:c),cols,sel,'#B48CFF',cols===6?300:310);cells.forEach((c,k)=>{if(c.blank)grid=grid.replace(`<i data-a="hsel|${k}" style="`,'<i style="visibility:hidden;')});
 const selc=sel!=null&&cells[sel]&&!cells[sel].blank?cells[sel]:null;
 return `<div>${hero}</div>${nav}${S.txns.length?head+grid:''}
  <div style="min-height:40px;margin-top:12px;text-align:center">${selc?`<b>${esc(selc.w)}</b> · ${selc.v?(mode==='times'?selc.v+(selc.v>1?' times':' time'):money(selc.v)):'nothing'}`:`<span class="sm">${sc==='week'?'Top to bottom: morning to night. Tap a spot.':'Tap a spot for details.'}</span>`}</div>
  <div class="row sp ctl" style="margin-top:8px"><div class="row" style="gap:6px">${[['day','Day'],['week','Week'],['month','Month']].map(x=>`<button class="chip ${sc===x[0]?'on':''}" data-a="iscale|${x[0]}">${x[1]}</button>`).join('')}</div><div class="row" style="gap:6px">${[['times','Times'],['rupees','₹']].map(x=>`<button class="chip ${mode===x[0]?'on':''}" data-a="hmode|${x[0]}">${x[1]}</button>`).join('')}</div></div>`}
function insRep(){const hs=habits();if(!hs.length)return `<div class="title" style="font-size:26px">Nothing repeats yet.</div><div class="sub" style="margin-top:8px">Habits show up after a few weeks.</div>`;
 const top=hs[0],sum=top.list.reduce((a,t)=>a+t.amt,0);
 return `<div class="cap" style="text-transform:none;letter-spacing:0;font-size:15px;color:var(--ink2)">Your most repeated spend</div><div class="hero" style="font-size:38px;line-height:1.05;margin-top:4px;background:linear-gradient(145deg,#F1E8FF,#B48CFF 55%,#7C5CFF);-webkit-background-clip:text;background-clip:text;color:transparent">${esc(top.payee)}</div><div class="sub" style="margin-top:6px">${top.n} times in 30 days · ${money(sum)}</div>
 <div class="row wrap" style="gap:6px;margin:18px 0 22px">${top.list.slice(0,30).map(()=>`<i style="width:14px;height:14px;border-radius:4px;background:${boxBg('#B48CFF')}"></i>`).join('')}</div>
 <div class="col" style="gap:8px">${hs.slice(1,5).map(h=>`<button class="li" data-a="push|habit|${J({payee:h.payee}).replace(/\|/g,'')}"><span class="n">${esc(h.payee)}</span><span class="t">×${h.n}</span><span class="a">${money(h.list.reduce((a,t)=>a+t.amt,0))}</span></button>`).join('')}<button class="btn q" data-a="push|habit|${J({payee:top.payee}).replace(/\|/g,'')}">See ${esc(top.payee)} by day</button></div>`}
function insCmp(){const frac=Math.min(1,((S.now-startOfWeek(S.now))/DAY+1)/7);const hasLast=S.p.weeks>0||S.txns.some(t=>t.t<wk0());
 if(!hasLast)return `<div class="title" style="font-size:26px">Come back next week.</div><div class="sub" style="margin-top:8px">Then this week and last sit side by side.</div>`;
 const nowSp=weekSpentAll(S,0,frac),lastSp=weekSpentAll(S,1,frac);const diff=nowSp-lastSp;const tf=planned()?flexW():Math.max(nowSp,lastSp,100);
 const nowL=planned()?flexL()/flexW()*100:Math.max(0,100-nowSp/tf*100),lastL=planned()?Math.max(0,(flexW()-lastSp)/flexW()*100):Math.max(0,100-lastSp/tf*100);
 const head=Math.abs(diff)<Math.max(20,lastSp*.08)?'About the same as last week.':diff>0?money(diff)+' more than last week.':money(-diff)+' less than last week.';
 const rows=S.cats.map((c,i)=>({c,i,now:Math.round(weekSpentBy(S,c.id,0,frac)),was:Math.round(weekSpentBy(S,c.id,1,frac))})).map(r=>Object.assign(r,{d:r.now-r.was})).filter(r=>r.now||r.was).sort((a,b)=>Math.abs(b.d)-Math.abs(a.d)).slice(0,4);
 return `<div class="title" style="font-size:30px;line-height:1.1">${head}</div><div class="sub" style="margin-top:6px">Same days of the week.</div>
 <div class="row" style="gap:14px;justify-content:center;margin:20px 0 16px"><div style="width:132px;opacity:.5"><div class="cap" style="text-align:center;margin-bottom:6px">Last</div>${gridHtml(lastL,'#B48CFF',0,'#B48CFF',{fade:.5})}</div><div style="width:132px"><div class="cap" style="text-align:center;margin-bottom:6px">This</div>${gridHtml(nowL,'#B48CFF',0,'#B48CFF')}</div></div>
 <div class="col" style="gap:8px">${rows.map(r=>`<button class="li" data-a="insc|${r.c.id}"><span class="d" style="background:${catCol(r.i)}"></span><span class="n">${esc(r.c.name)}</span><span class="a" style="color:${r.d>0?AMBER:r.d<0?SAVE:'var(--ink3)'}">${r.d>0?'↑ '+money(r.d):r.d<0?'↓ '+money(-r.d):'same'}</span></button>`).join('')}</div>`}
SCREENS.insights=()=>{if(!UI._insInit){UI._insInit=1;UI.hot.scale='week'}const v=UI.ins||'when';return `${SEG([['when','When'],['rep','Repeats'],['cmp','Vs last week']],v,'insseg')}${v==='when'?insWhen():v==='rep'?insRep():insCmp()}`};

/* ---------- Teaching the grid: label it, let people tap it, show what a payment does to it ---------- */
SHEETS.gridhow=({tour})=>{const pl=planned();const box=pl?boxVal(flexW()):boxVal(Math.max(100,Math.ceil(Math.max(wkTot(0),wkTot(1))/50)*50));const n=10;const lvl=pl?Math.max(n,Math.min(100,flexL()/flexW()*100)):60;
 return `<div class="cap">${tour?'Your week':'How to read it'}</div><div class="title" style="font-size:28px;margin:4px 0 14px">${pl?'100 boxes. That is your week.':'Boxes fill as you spend.'}</div>
 <div style="display:flex;justify-content:center">${pl?gridHtml(lvl-n,paceHex(),n,'#F5F7FA',{w:220}):gridHtml(0,SPEND,0,0,{w:220})}</div>
 <p class="sub" style="margin:14px 0 18px">${pl?`Each box is about ${money(box)}. Spend ${money(box*n)} and the dashed ${n} boxes go.`:`Each box is about ${money(box)}. Add a spend and a box fills.`}</p><button class="btn" data-a="closesheet">Got it</button>`};
H.gridhow=()=>{openSheet('gridhow',{});return false};
/* at the moment of paying: say how many boxes go */
const _payFlow2=FLOWS.pay;
FLOWS.pay=F=>{let h=_payFlow2(F);if(F.step===1||F.step===undefined){const amt=amtOf(F.d.kp);h=h.replace(/1 box (=|≈) ₹(\d+)/,(m,e,v)=>`${Math.max(1,Math.min(100,Math.round(amt/(+v||1))))} boxes go · 1 box ≈ ₹${v}`)}return h};

/* ---------- One-off payments: outside the weekly plan ---------- */
const OOCH=['Trip','Gift','Repair','Fees','Medical','Event'];
function doOneOff(amt,payee,fromSav){const fs=fromSav?Math.min(amt,Math.max(0,S.free)):0;S.free-=fs;const t={id:'t'+(S.idc++),t:S.now.getTime(),payee:payee||'One-off',amt,kind:'oneoff',ref:null,via:'manual',src:{fromSavings:fs}};S.txns.unshift(t);logE(S,'One-off ₹'+amt+' '+t.payee);return t}
const _payFlow3=FLOWS.pay;
FLOWS.pay=F=>{const d=F.d;if(F.step>0||!d.ask)return _payFlow3(F);const amt=amtOf(d.kp);
 if(d.ask===1){let h=_payFlow3(F);
  const tile=`<button class="tile ${d.oneoff?'on':''}" style="border-style:dashed;${d.oneoff?'border-color:#B48CFF;background:#B48CFF22':''}" data-a="poneoff"><b><i style="background:#B48CFF"></i>One-off</b><small>outside your plan</small></button>`;
  h=/data-a="(pto\|__more|tmore)"/.test(h)?h.replace(/<button class="tile[^"]*"[^>]*data-a="(pto\|__more|tmore)"/,m=>tile+m):h.replace(/(<div class="tgrid"[^>]*>[\s\S]*?)(<\/div>)/,`$1${tile}$2`);
  if(d.oneoff)h=h.replace(/<button class="btn d" data-a="x">Pick one<\/button>/,`<button class="btn" data-a="oonext">Next</button>`).replace(/data-a="(pnext|tadd)">(Next|Add [^<]*)<\/button>/,`data-a="oonext">Next</button>`);
  return h}
 const back=`<button class="back" data-a="ooback">‹ Back</button>`;
 if(d.ask===2)return `<div class="mbody">${back}<div class="cap">${money(amt)} · one-off</div><div class="title" style="margin-top:4px">What was it?</div><div class="row wrap" style="gap:8px;margin:18px 0">${OOCH.map(o=>`<button class="chip ${d.ooname===o?'on':''}" data-a="ooname|${o}">${o}</button>`).join('')}</div><input class="field" style="width:100%;font-size:18px;font-family:var(--body);color:#E9E5DC" placeholder="Or type a name" value="${esc(OOCH.includes(d.ooname)?'':(d.ooname||''))}" data-i="oonamein" autocomplete="off"></div><div class="mfoot"><button class="btn ${d.ooname?'':'q'}" data-a="oonext2">${d.ooname?'Next':'Skip'}</button></div>`;
 return `<div class="mbody">${back}<div class="cap">${money(amt)} · ${esc(d.ooname||'one-off')}</div><div class="title" style="margin-top:4px">Paid from?</div><div class="col" style="gap:10px;margin-top:20px"><button class="btn" data-a="oofinal|plan">Outside my plan</button>${S.free>0?`<button class="btn q" style="border:1.5px solid #2f3642" data-a="oofinal|sav">My savings · ${money(S.free)}</button>`:''}</div></div>`};
H.poneoff=()=>{const d=UI.flow.d;d.oneoff=!d.oneoff;d.target=null;d.toK=null;d.cid=null;d.paid=true};
const _pto=H.pto,_tpick=H.tpick;H.pto=a=>{UI.flow.d.oneoff=false;return _pto(a)};H.tpick=a=>{UI.flow.d.oneoff=false;return _tpick(a)};
H.payask=()=>{UI.flow.d.ask=1};H.payback=()=>{UI.flow.d.ask=0;UI.flow.d.oneoff=false};
H.oonext=()=>{UI.flow.d.ask=2};H.ooback=()=>{const d=UI.flow.d;d.ask=d.ask>1?d.ask-1:1};
H.ooname=a=>{UI.flow.d.ooname=a[0]};HI.oonamein=(a,el)=>{UI.flow.d.ooname=el.value;return false};
H.oonext2=()=>{const d=UI.flow.d;if(!planned()||S.free<=0){H.oofinal(['plan']);return false}d.ask=3};
H.oofinal=a=>{const d=UI.flow.d,amt=amtOf(d.kp);const t=doOneOff(amt,(d.ooname||'One-off').trim(),a[0]==='sav');closeFlow();say(a[0]==='sav'?money(t.src.fromSavings)+' taken from savings.':'One-off added. Your week is untouched.');return false};
const _txScreen=SCREENS.txn;
SCREENS.txn=p=>{const t=S.txns.find(x=>x.id===p.id);if(!t||t.kind!=='oneoff')return _txScreen(p);const dt=new Date(t.t);
 return `<button class="back" data-a="back">‹ Back</button><div class="cap">${esc(t.payee)} · one-off</div><div class="title" style="font-size:46px;margin-top:4px">${money(t.amt)}</div><div class="card" style="margin:16px 0;display:grid;gap:10px">${[['When',fmtDay(dt)+', '+fmtTime(dt)],['Paid from',t.src&&t.src.fromSavings?'Savings':'Outside your plan']].map(r=>`<div class="row sp"><span class="mut">${r[0]}</span><b>${esc(r[1])}</b></div>`).join('')}</div><button class="btn o" data-a="rm|${t.id}">Delete</button>`};

/* ---------- UPI linked: use the balance to make a plan (skippable, two short screens) ---------- */
H.obverify=a=>{const d=obD();if(a[0]==='fail'){d.fail=true;return}d.fail=false;d.upiBal=6500;d.pct=20;d.s='ubal'};
function ubScreen(d,s){const {a,pct,sav,sp}=ubSplit(d);
 if(s==='ubal')return `<div class="mbody" style="padding-top:64px"><div class="cap">${money(a)} in your account</div><div class="title" style="margin-top:4px">How much to save?</div><div id="ub-grid" style="margin:18px auto;width:240px">${multiGrid([{amt:Math.max(0,sav),color:SAVE},{amt:Math.max(1,sp),color:SPEND}],Math.max(1,a),{w:240})}</div><div class="row sp"><span><span class="cap">Saving · <span id="ub-pct">${pct}%</span></span><div id="ub-sav" class="h2" style="color:${SAVE}">${money(sav)}</div></span><span style="text-align:right"><span class="cap">Spending</span><div id="ub-sp" class="h2" style="color:${SPEND}">${money(sp)}</div></span></div><input type="range" min="0" max="100" step="5" value="${pct}" data-i="ubpct" style="margin:18px 0 6px"></div>`+obFoot(obBtn('Next','obgo|uend')+obBtn('Skip','ubskip','q'));
 const t0=day0(),end=snapEnd(d.end||presetEnd(PRESETS[1])),days=daysIn(t0,end),wk=Math.max(5,r5b(sp/days*7));d.end=end;
 return `<div class="mbody" style="padding-top:64px"><button class="back" data-a="obgo|ubal">‹ Back</button><div class="title" style="margin-top:8px">How long should it last?</div>
  <div class="row wrap" style="gap:8px;margin:18px 0 10px">${PRESETS.map((p,i)=>`<button class="chip ${!d.cal&&end===presetEnd(p)?'on':''}" data-a="incpre|${i}">${p[0]}</button>`).join('')}<button class="chip ${d.cal?'on':''}" data-a="ubcal">Pick a date</button></div>
  ${d.cal?`<div class="sub" style="text-align:center;margin-bottom:8px">${money(wk)} a week · until ${fmtDate(end)}</div>${calHtml(d,t0,end)}`:`<div style="text-align:center;margin-top:26px"><div style="display:flex;justify-content:center">${amtDots(money(wk))}</div><div class="sub">a week to spend</div></div>`}</div>`+obFoot(obBtn('Next','ubdone')+obBtn('Skip','ubskip','q'))}
H.ubcal=()=>{const d=UI.flow.d;d.cal=!d.cal};
