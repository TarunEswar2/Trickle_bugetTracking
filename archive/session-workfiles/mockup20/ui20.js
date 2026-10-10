/* ===== v20 (10 Oct): answers the 3-person test of v19. Report and reasons: docs/claude/v20_user_test_report.md =====
   Rules used here: one look per job (status, action, suggestion, information, record); coloured text only on things you can tap;
   one bar for "left this week", drawn the same everywhere; show the sum, not only the result; labels, not sentences. */
window.NAV17='bar';

/* ---------- status: a word and a small speed-dial (needle moves), never a warning sign ---------- */
const ST20={ok:{w:'On track',c:'#6FD3AE',a:-55},fast:{w:'A bit fast',c:'#E6B24F',a:35},out:{w:'All spent',c:'#F2877A',a:80}};
function dial20(hs,sz){const s=ST20[hs]||ST20.ok;sz=sz||18;return `<svg width="${sz}" height="${Math.round(sz*.7)}" viewBox="0 0 22 15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 13a8 8 0 0 1 16 0"/><path d="M11 13V6.5" transform="rotate(${s.a} 11 13)"/><circle cx="11" cy="13" r="1.4" fill="currentColor" stroke="none"/></svg>`}
function chip20(hs){const s=ST20[hs]||ST20.ok;return `<span class="st20" style="color:${s.c};background:${s.c}1F">${dial20(hs,22)}<b>${s.w}</b></span>`}

/* ---------- one bar for "left this week": fill = what is left; a payment shows as a lighter piece marked −₹ ---------- */
function bar20(L,W,o){o=o||{};const pc=v=>(Math.max(0,Math.min(1,v/W))*100).toFixed(1),col=o.col||ST20.ok.c,m=Math.min(o.minus||0,L),after=L-m;
 return `<div class="bar20w${m?' lab':''}">${m?`<span class="bar20l" style="left:${((+pc(after)+ +pc(L))/2).toFixed(1)}%">−${money(m)}</span>`:''}<div class="bar20"><i style="width:${pc(after)}%;background:${col}"></i>${m?`<i class="mi" style="left:${pc(after)}%;width:${(pc(L)-pc(after)).toFixed(1)}%;background:${col}"></i>`:''}</div></div>`}
const dots20=dl=>`<div class="wd19" role="img" aria-label="${dl} of 7 days left">${Array.from({length:7},(_,i)=>`<i class="${i<dl?'on':''}"></i>`).join('')}</div>`;
function hsNow20(){const hs=homeState();return ST20[hs]?hs:'ok'}

/* ---------- Home hero: one answer. "₹607 / of ₹1,072 left this week", the bar, days left, a day's amount ---------- */
heroHome17=function(){const W=Math.max(1,flexW()),L=Math.max(0,flexL()),hs=hsNow20(),s=ST20[hs],dl=Math.max(1,Math.min(7,daysToGo())),aw=awareList17();
 return `<div class="hero17 h20" style="--st:${s.c}"><div class="row sp" style="align-items:center">${chip20(hs)}<button class="chip q20" data-a="gridhow" aria-label="How this works">?</button></div>
 <div class="hero" style="font-size:66px;line-height:1;margin-top:16px">${money(L)}</div>
 <div style="font-size:17px;color:var(--ink2);margin-top:6px">of ${money(W)} left this week</div>
 <div data-a="gridhow" style="margin-top:18px">${bar20(L,W,{col:s.c})}</div>
 <div class="row" style="gap:12px;margin-top:18px;align-items:flex-end"><div style="flex:1">${dots20(dl)}<div class="sm" style="margin-top:7px">${dl===1?'Last day':dl+' days left'}</div></div><div style="text-align:right">${L>0?`<div style="font-size:22px;font-weight:700;white-space:nowrap">${money(L/dl)} a day</div><div class="sm">to last the week</div>`:`<div style="font-size:18px;font-weight:700">Back on Monday</div><div class="sm">new week, new money</div>`}</div></div>
 ${aw.length?`<div class="hu20">${aw.map(x=>`<button data-a="insgo|${x.k}"><span>${esc(x.t)}</span><i>›</i></button>`).join('')}</div>`:''}</div>`};

/* the "?" sheet: a picture of the sum, and what the three states mean */
SHEETS.gridhow=()=>{const W=Math.max(1,flexW()),L=Math.max(0,flexL()),dl=Math.max(1,Math.min(7,daysToGo()));
 return `<div class="title" style="font-size:24px;margin-bottom:16px">Your week</div>
 <div class="eq20">${eqT20(money(L),'left')}<span class="op">÷</span>${eqT20(dl+(dl===1?' day':' days'),'to go')}<span class="op">=</span>${eqT20(money(L/dl),'a day',1)}</div>
 <div style="margin:18px 0 6px">${bar20(L,W)}</div><div class="row sp sm"><span>Spent</span><span>${money(W)} this week</span></div>
 <div class="col" style="gap:10px;margin-top:20px">${['ok','fast','out'].map(k=>`<div class="row" style="gap:10px;align-items:center">${chip20(k)}<span class="sm">${{ok:'Spending at a good speed',fast:'Faster than the week allows',out:'Nothing left this week'}[k]}</span></div>`).join('')}</div>
 <div class="row sp" style="margin-top:22px;align-items:center"><button class="lnk" data-a="why|bar">Why a bar?</button><button class="btn s" style="width:auto;padding:0 22px" data-a="closesheet">OK</button></div>`};
const eqT20=(v,l,hi)=>`<span class="eqt${hi?' hi':''}"><b>${v}</b><small>${l}</small></span>`;

/* ---------- Home: suggestions (action) and insights (information) look different ---------- */
const sec20=(t,r)=>`<div class="row sp sec20"><span>${t}</span>${r||''}</div>`;
limitsHome17=function(){if(!planned())return '';const now=S.now.getTime();
 const wk=catTotals(now-7*DAY,now+1),wT=sumAmt(wk)||1,recIds=new Set(suggestions().filter(x=>x.scope==='cat').map(x=>x.ref));
 const cats=wk.filter(r=>r.id!=='_u'&&r.amt>0&&!(S.limits||[]).some(l=>l.scope==='cat'&&l.ref===r.id)).sort((a,b)=>(recIds.has(b.id)-recIds.has(a.id))||b.amt-a.amt).slice(0,2);
 const shops=shopList().filter(l=>l.n>=3&&!(S.limits||[]).some(x=>x.scope==='shop'&&x.ref===l.payee)).slice(0,1);
 const card=(k,col,t,line,a,b)=>`<div class="sg20"><button class="x17" data-a="limno|${k}" aria-label="Not now">×</button><span class="ic20" style="background:${col}26"><i style="background:${col}"></i></span><b>${esc(t)}</b>${line?`<span class="sb">${line}</span>`:''}<button class="btn s" data-a="${a}">${b}</button></div>`;
 const out=[];cards17().filter(x=>x.tag==='Now'||x.tag==='Next'||x.tag==='Savings').slice(0,1).forEach(x=>out.push({k:'n'+x.a,h:card('n'+x.a,'#9AA4B0',x.t,x.sub||'',x.a,x.cta||'Open')}));cats.forEach(r=>out.push({k:'c'+r.id,h:card('c'+r.id,r.col||catCol(catIdx(r.id)),catName(r.id),`${money(r.amt)} this week · ${pct0(r.amt/wT)}% of spending`,`limset|cat|${r.id}|amt`,'Set a limit')}));
 shops.forEach(l=>out.push({k:'s'+l.payee,h:card('s'+l.payee,'#9AA4B0',l.payee,`${l.n} visits in 30 days`,`limset|shop|${esc(l.payee)}|times`,'Limit visits')}));
 const shown=out.filter(o=>!S.limNo[o.k]).map(o=>o.h);if(!shown.length)return '';
 return sec20('Suggestions')+`<div class="car17" id="car17b">${shown.join('')}</div>${shown.length>1?`<div class="dots17" id="dots17b">${shown.map((_,i)=>`<i class="${i?'':'on'}"></i>`).join('')}</div>`:''}`};
carousel17=function(){const k=new Set(awareList17().map(x=>x.k)),map={'Time of day':'hour','Day':'day','Month':'month'};
 const c=cards17().filter(x=>x.tag!=='Heads-up'&&x.tag!=='Limit'&&x.tag!=='Now'&&x.tag!=='Next'&&x.tag!=='Savings'&&!(map[x.tag]&&k.has(map[x.tag])));if(!c.length)return '';
 return sec20('Insights',`<button class="lnk" data-a="push|insall">See all ›</button>`)+`<div class="car17" id="car17">${c.map(x=>`<button class="in20" data-a="${x.a}">${x.mini?`<span class="mn">${x.mini}</span>`:''}<b>${esc(x.t)}</b>${x.sub?`<span class="sb">${esc(x.sub)}</span>`:''}<i class="cv">›</i></button>`).join('')}</div>${c.length>1?`<div class="dots17" id="dots17">${c.map((_,i)=>`<i class="${i?'':'on'}"></i>`).join('')}</div>`:''}`};

/* ---------- Add money: plain question, no gift option ---------- */
{const _i=FLOWS.inc;FLOWS.inc=F=>{let h=_i(F);if(F.step===0){h=h.replace('How much money do you get?','How much money came in?').replace(/<div class="sub"([^>]*)>Rough is fine\.[^<]*<\/div>/,'<div class="sub"$1>Pocket money, salary, anything. Next, you choose what to keep aside.</div>').replace(/<button class="btn q" data-a="amkind\|one">[^<]*<\/button>/,'')}return h}}
{const _o=FLOWS.onb;FLOWS.onb=F=>_o(F).replace('How much money do you get?','How much money do you have now?').replace('>Rough is fine.<','>Pocket money, salary, anything. Rough is fine.<')}

/* ---------- Plan: draw the sum. Keep aside | To spend → ÷ days → a week, and the weeks up to the end date ---------- */
function weeks20(n){const out=[],thisSun=wk0()+6*DAY;let s=n.t0,e=Math.min(thisSun,n.end),g=0;while(s<=n.end&&g++<60){const d=daysIn(s,e);out.push({s,d,amt:r5b(n.sp/n.days*d)});s=e+DAY;e=Math.min(s+6*DAY,n.end)}return out}
function eqHtml20(n){const w=weeks20(n);
 return `<div class="eq20">${eqT20(money(n.sp),'to spend')}<span class="op">÷</span>${eqT20(n.days+' days','until '+shortD(n.end))}<span class="op">=</span>${eqT20(money(n.wk),'each week',1)}</div>
 <div class="wk20">${w.map((b,i)=>`<i style="flex:${b.d}"></i>`).join('')}</div>
 <div class="row sp sm" style="margin-top:7px"><span>${w[0]&&w[0].d<7?`This week ${money(w[0].amt)}, then ${money(n.wk)} a week`:`${money(n.wk)} every week`}</span><span>${w.length} wk</span></div>`}
{const _inc=FLOWS.inc;FLOWS.inc=F=>{if(F.step===0)return _inc(F);
 const d=F.d,n=planNums18(d);if(!d.dur&&!d.cal)d.dur='1';const sel=d.cal?'cal':(d.dur||'1');
 return `<div class="mbody"><button class="back" data-a="incback">‹ Back</button><div class="steps"><i class="on"></i><i class="on"></i></div>
 <div class="title" style="margin-top:14px">Plan your ${money(n.a)}</div>
 <div class="lab20" style="margin-top:22px">Keep some aside?</div>
 <input type="range" class="split18" min="0" max="100" step="1" value="${n.pct}" data-i="incpct20" style="--p:${n.pct}%" aria-label="How much to keep aside">
 <div class="row sp"><button class="tapamt18" data-a="incedit|sav"><span class="k20"><i style="background:${SAVE}"></i>Keep aside</span><b id="inc-sav">${money(n.sav)}</b></button><button class="tapamt18 r" data-a="incedit|sp"><span class="k20"><i style="background:${SPEND}"></i>To spend</span><b id="inc-sp">${money(n.sp)}</b></button></div>
 <div class="lab20" style="margin-top:26px" id="inc-q">How long should ${money(n.sp)} last?</div>
 <div class="selwrap"><select class="sel18" data-i="incdur" aria-label="How long it lasts">${PRESETS.map((p,i)=>`<option value="${i}" ${sel===String(i)?'selected':''}>${p[0]}</option>`).join('')}<option value="cal" ${sel==='cal'?'selected':''}>Pick a date…</option></select></div>
 ${d.cal?calHtml(d,n.t0,n.end):''}
 <div id="eq20" style="margin-top:22px">${eqHtml20(n)}</div></div>
 <div class="mfoot"><div class="col" style="gap:8px"><button class="btn" data-a="incfinish">${planned()?'Update my week':'Start my week'}</button><button class="btn q" data-a="incdone">Just add the money</button></div></div>`}}
HI.incpct20=(a,el)=>{const d=UI.flow.d;d.pct=+el.value;d.savX=null;const n=planNums18(d);el.style.setProperty('--p',n.pct+'%');$('#inc-sav').textContent=money(n.sav);$('#inc-sp').textContent=money(n.sp);$('#inc-q').textContent=`How long should ${money(n.sp)} last?`;$('#eq20').innerHTML=eqHtml20(n);return false};

/* ---------- Pay: confirm, hand-off and result use the Home card and bar, and say "Paid" ---------- */
const left20=(L,W,minus,col,arrow)=>`<div class="mini20"><div class="row sp" style="align-items:baseline"><span class="sm">Left this week</span><span class="sm">of ${money(W)}</span></div><div style="font-size:30px;font-weight:700;margin:4px 0 12px;letter-spacing:-.02em">${arrow?`<span style="color:var(--ink3)">${money(L)}</span> <span style="color:var(--ink3);font-weight:500">→</span> `:''}${money(Math.max(0,L-(minus||0)))}</div>${bar20(L,W,{minus,col})}</div>`;
scanConfirm=function(F){const d=F.d,amt=amtOf(d.kp),pl=planned(),W=Math.max(1,flexW()),L=Math.max(0,flexL()),over=Math.max(0,amt-L),sel=d.target&&d.target.id,col=ST20[hsNow20()].c;
 const ids=S.cats.map(c=>c.id),order=[...(sel?[sel]:[]),...ids.filter(x=>x!==sel)].slice(0,8);
 const chips=order.map(id=>{const c=S.cats.find(x=>x.id===id),on=id===sel;return `<button class="chip ${on?'on':''}" data-a="scancat|${id}"><i style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${catCol(catIdx(id))};margin-right:7px"></i>${esc(c.name)}</button>`}).join('')+`<button class="chip" data-a="scanmore">More or new</button>`;
 const warn=sel?limWarn(sel,d.payee,amt):'';
 return `<div class="mbody"><button class="back" data-a="pclose">‹ Close</button><div class="sm">Paying ${esc(d.payee||'someone')}</div><div class="hero" style="font-size:52px;margin-top:2px">${money(amt)}</div>
 <div class="lab20" style="margin-top:20px">What was it for?</div><div class="row wrap" style="gap:8px">${chips}</div>
 ${pl?`<div style="margin-top:24px">${left20(L,W,Math.min(amt,L),col,1)}</div>${over>0?`<div class="note20"><i style="background:${ST20.fast.c}"></i>${money(over)} more than is left. It comes from your savings.</div>`:''}`:''}
 ${warn?`<div class="note20"><i style="background:${ST20.fast.c}"></i>${esc(warn)}</div>`:''}</div>
 <div class="mfoot"><button class="btn ${sel?'':'d'}" data-a="${sel?'scango':'x'}">${sel?'Open UPI app':'Pick what it was for'}</button></div>`};
{const _p=FLOWS.pay;FLOWS.pay=F=>{const d=F.d,amt=amtOf(d.kp);
 if(d.scan&&d.scanned&&F.step===2)return `<div class="mbody"><button class="back" data-a="pclose">‹ Close</button><div class="title" style="margin-top:8px">Pay ${money(amt)} in your UPI app</div><div class="sub" style="margin-top:6px">To ${esc(d.payee||'someone')}. Then come back here.</div>
  <div class="card" style="margin-top:22px"><div class="sm">Your UPI app (simulated)</div><div class="h2" style="margin-top:8px">${money(amt)} to ${esc(d.payee||'Someone')}</div><button class="btn s" style="margin-top:14px;width:100%" data-a="scanreturn">Back to Trickle</button></div></div>`;
 if(F.step===3&&d.result&&!d.fail&&planned()&&d.target&&d.target.type==='cat'){const R=d.result,res=R.res||{},W=Math.max(1,flexW()),L=Math.max(0,flexL()),sv=savWhere(res),col=ST20[hsNow20()].c,before=Math.min(W,(d.before!=null?d.before:L+amt)),warn=limWarn(d.target.id,d.payee,amt);
  return `<div class="mbody" style="text-align:center;padding-top:56px"><svg class="okring" width="84" height="84" viewBox="0 0 92 92" aria-hidden="true"><circle cx="46" cy="46" r="42" fill="rgba(111,211,174,.10)" stroke="#6FD3AE" stroke-width="3"/><path d="M28 47l12 12 24-27" fill="none" stroke="#6FD3AE" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <div class="title" style="font-size:24px;margin-top:16px">${d.scan?'Paid':'Spent'} ${money(amt)}</div><div class="sub" style="margin-top:6px">${esc(d.payee||'Someone')} · ${esc(tgtName(d.target))}</div>
  <div style="text-align:left;margin-top:28px">${left20(before,W,Math.min(amt,before),col)}</div>
  ${sv.length?`<div class="note20" style="text-align:left"><i style="background:${ST20.fast.c}"></i>${money(res.savings)} came from your savings.</div>`:''}
  ${warn?`<div class="note20" style="text-align:left"><i style="background:${ST20.fast.c}"></i>${esc(warn)}</div>`:''}</div>
  <div class="mfoot"><div class="col" style="gap:8px"><button class="btn" data-a="pclose">Done</button>${d.scan?`<button class="btn q" data-a="scanremove">Didn't pay? Remove</button>`:''}</div></div>`}
 return _p(F)}}

/* ===== v20.1 (10 Oct, Tarun): how long = weeks you add with + (or a calendar), not a dropdown. Plan screen in numbered blocks with one result ===== */
const sun20=()=>wk0()+6*DAY;
const wkCount20=end=>Math.max(1,Math.round((snapEnd(end)-sun20())/(7*DAY))+1);
function setWeeks20(d,k){k=Math.max(1,Math.min(52,k));d.end=sun20()+(k-1)*7*DAY;d.dur='w';d.cal=false;const e=new Date(d.end),n=new Date(day0());d.cm=(e.getFullYear()-n.getFullYear())*12+e.getMonth()-n.getMonth()}
H.incwk=a=>{const d=UI.flow.d,k=wkCount20(planNums18(d).end);setWeeks20(d,k+(+a[0]))};
H.inccal20=()=>{const d=UI.flow.d;d.cal=!d.cal};
function res20(n){return `<div class="sm">${money(n.sp)} ÷ ${n.days} days</div><div class="row" style="align-items:baseline;gap:8px;margin-top:4px"><span class="hero" style="font-size:46px;line-height:1">${money(n.wk)}</span><span style="font-size:17px;color:var(--ink2)">every week</span></div>${n.left<7?`<div class="sm" style="margin-top:6px">This week ${money(n.share)}, for the ${n.left} day${n.left>1?'s':''} left</div>`:''}`}
function strip20(n){const w=weeks20(n);return `<div class="wk20">${w.map((b,i)=>`<i style="flex:${b.d}" class="${i===0?'now':''}"></i>`).join('')}</div><div class="row sp sm" style="margin-top:7px"><span>Today</span><span>Sun ${shortD(n.end)}</span></div>`}
{const _inc=FLOWS.inc;FLOWS.inc=F=>{if(F.step===0)return _inc(F);
 const d=F.d;if(!d.end)setWeeks20(d,5);const n=planNums18(d),k=wkCount20(n.end);
 return `<div class="mbody"><button class="back" data-a="incback">‹ Back</button><div class="steps"><i class="on"></i><i class="on"></i></div>
 <div class="title" style="margin-top:14px">Plan your ${money(n.a)}</div>
 <div class="blk20"><div class="lab20"><span class="n20">1</span>Keep some aside?</div>
  <input type="range" class="split18" min="0" max="100" step="1" value="${n.pct}" data-i="incpct20" style="--p:${n.pct}%" aria-label="How much to keep aside">
  <div class="row sp"><button class="tapamt18" data-a="incedit|sav"><span class="k20"><i style="background:${SAVE}"></i>Keep aside</span><b id="inc-sav">${money(n.sav)}</b></button><button class="tapamt18 r" data-a="incedit|sp"><span class="k20"><i style="background:${SPEND}"></i>To spend</span><b id="inc-sp">${money(n.sp)}</b></button></div></div>
 <div class="blk20"><div class="lab20"><span class="n20">2</span><span id="inc-q">How long should ${money(n.sp)} last?</span></div>
  ${d.cal?`<div class="sm" style="margin-bottom:8px">Until Sunday ${fmtDate(n.end)}</div>${calHtml(d,n.t0,n.end)}`:`<div class="stp20"><button data-a="incwk|-1" aria-label="One week less" ${k<=1?'disabled':''}>−</button><div><b>${k} week${k>1?'s':''}</b><small>until Sun ${shortD(n.end)}</small></div><button data-a="incwk|1" aria-label="One more week">+</button></div>${strip20(n)}`}
  <button class="lnk" style="margin-top:12px;font-size:14px" data-a="inccal20">${d.cal?'Count in weeks instead':'Pick a date on a calendar'}</button></div>
 <div class="res20" id="eq20">${res20(n)}</div><div style="height:150px"></div></div>
 <div class="mfoot"><div class="col" style="gap:8px"><button class="btn" data-a="incfinish">${planned()?'Update my week':'Start my week'}</button><button class="btn q" data-a="incdone">Just add the money</button></div></div>`}}
HI.incpct20=(a,el)=>{const d=UI.flow.d;d.pct=+el.value;d.savX=null;const n=planNums18(d);el.style.setProperty('--p',n.pct+'%');$('#inc-sav').textContent=money(n.sav);$('#inc-sp').textContent=money(n.sp);$('#inc-q').textContent=`How long should ${money(n.sp)} last?`;$('#eq20').innerHTML=res20(n);return false};
{const _n=H.incnext;H.incnext=a=>{_n(a);setWeeks20(UI.flow.d,5)}}

/* plain-word tips (testers: "why are you riddling people") */
TIPDEF.income={cap:'Money added',t:'Some kept aside. The rest is to spend.',b:()=>`You can spend ${money(S.W)} each week.`,c:ACC.b};
TIPDEF.plan={cap:'Your week',t:'Your week is set.',b:()=>`${money(S.W)} to spend each week. Every spend comes out of it.`,c:ACC.g};
TIPDEF.paid={cap:'Your first spend',t:'Logged.',b:'It comes off what is left this week.',c:ACC.g};
