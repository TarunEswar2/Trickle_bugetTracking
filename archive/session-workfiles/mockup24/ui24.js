/* ===== v24 (11 Oct, Tarun): v22's first onboarding picture ("Plan out your budget and tackle it in weeks"); a Balance screen with every
   running balance and its dates; Sync with your bank; goal completed screen; Completed goals with "I bought it" taking the money off the balance ===== */

/* ---------- onboarding picture (from v22, in v21's dark look) ---------- */
const EX24=6000,LET24=['M','T','W','T','F','S','S'];
function exSplit24(){const d={kp:String(EX24),pct:20};setWeeks20(d,5);const n=planNums18(d);let w=weeks20(n).map(x=>Object.assign({},x));
 if(w.length){const s=w.slice(1).reduce((a,x)=>a+x.amt,0);w[0].amt=Math.max(0,n.sp-s)}
 if(w.length>1&&w[0].d<=2)w=[{s:w[0].s,d:w[0].d+w[1].d,amt:w[0].amt+w[1].amt,fold:1}].concat(w.slice(2));return {n,rows:w}}
function pic24(){const sp=exSplit24();
 const cal=`<div class="cal22"><div class="cap22">${money(sp.n.sp)} to spend, shared over the weeks</div><div class="hd">${LET24.map(l=>`<small>${l}</small>`).join('')}<span></span></div>
  ${sp.rows.map((r,ri)=>{const lead=ri===0?dowIdx(r.s):0,days=r.fold?Math.min(7,r.d):r.d;return `<div class="rw">${[0,1,2,3,4,5,6].map(k=>k<lead?'<i class="n"></i>':k<lead+days?'<i></i>':'<i class="n"></i>').join('')}<em><b>${money(r.amt)}</b> ${r.d>=7&&!r.fold?'a week':r.d+' days'}</em></div>`}).join('')}</div>`;
 return `<div class="pic22 go f3" role="img" aria-label="Example: ₹6,000 splits into ₹1,200 to save and ₹4,800 to spend, shared over the weeks from today. A short first week gets less.">
  <div class="lab" style="height:20px">Say you have ${money(EX24)} in the bank <span class="mut" style="font-size:12px">(an example)</span></div>
  <div class="bar" style="margin-top:6px"><i class="sv"></i><i class="sp"></i><span class="bt22">${money(EX24)}</span></div>
  <div class="ends"><b style="color:var(--save)">Save ${money(EX24*.2)}</b><b>To spend ${money(EX24*.8)}</b></div>${cal}
  <p class="foot">Each week gets its share. Short weeks get less.</p></div>`}
{const _o=FLOWS.onb;FLOWS.onb=F=>{if(F.d.s!=='title')return _o(F);
 return `<div class="mbody" style="padding-top:64px"><div style="font-family:var(--display);font-weight:800;font-size:26px;color:var(--accent);letter-spacing:-.02em">Trickle</div><div class="title" style="margin-top:6px;font-size:30px;line-height:1.15">Plan out your budget and tackle it in weeks</div>${pic24()}<button class="lnk" style="font-size:14px;margin-top:4px" data-a="replay24">Play again</button></div>`+obFoot(obBtn('Get started','obgo|link')+obBtn('Just start tracking','obquick','q'))}}
H.replay24=()=>{const el=document.querySelector('.pic22');if(el){el.classList.remove('go');void el.offsetWidth;el.classList.add('go')}return false};

/* ---------- balance: what is running, and the total (Tarun) ---------- */
const running24=()=>{const t=S.now.getTime();return (S.incomes||[]).filter(i=>i.end&&i.end+DAY>t&&!i.stopped&&i.sp>0)};
const perWeek24=i=>Math.round(i.sp/Math.max(1,daysIn(i.start,i.end))*7);
incomeRow17=function(){const b=bal23(),run=running24();if(!planned()&&b==null)return '';
 return `<div class="bal23"><button class="l" data-a="push|bal24"><span class="sm">Balance</span><b>${b==null?'Not added yet':money(b)}</b>${run.length?`<small class="mut" style="font-size:12.5px;margin-top:2px">${run.length} running · ${money(S.W)} a week</small>`:''}</button><button class="add" data-a="addmoney17">${PLUS21}<span>Add</span></button></div>`};
SCREENS.bal24=()=>{const b=bal23()||0,sv=Math.min(b,savedTotal(S)),run=running24(),t=S.now.getTime(),old=(S.incomes||[]).filter(i=>!run.includes(i)).slice(-4).reverse();
 const row=i=>{const tot=Math.max(1,i.end-i.start),pr=Math.max(0,Math.min(1,(t-i.start)/tot)),wl=Math.max(0,Math.ceil((i.end-t)/(7*DAY)));
  return `<div class="rb24"><div class="row sp" style="align-items:baseline"><b>${money(i.sp)}</b><span class="sm">${money(perWeek24(i))} a week</span></div>
  <div class="sm" style="margin-top:2px">${shortD(i.start)} – Sun ${shortD(i.end)}${i.synced?' · from a sync':''}</div>
  <div class="tl24"><i style="width:${(pr*100).toFixed(1)}%"></i></div><div class="row sp mut" style="font-size:12.5px;margin-top:5px"><span>Started</span><span>${wl>0?wl+' week'+(wl>1?'s':'')+' to go':'Last week'}</span></div></div>`};
 return back17('Home')+`<div class="title" style="margin-bottom:4px">Balance</div><div class="sm">What should be in your bank</div>
 <div class="hero" style="font-size:52px;margin-top:10px">${money(b)}</div>
 <div class="sb24"><i style="flex:${Math.max(sv,1)};background:${SAVE}"></i><i style="flex:${Math.max(b-sv,1)};background:${SPEND}"></i></div>
 <div class="row sp sm" style="margin-top:6px"><span><i class="kd24" style="background:${SAVE}"></i>Savings ${money(sv)}</span><span><i class="kd24" style="background:${SPEND}"></i>To spend ${money(Math.max(0,b-sv))}</span></div>
 ${sec20('Running now')}${run.length?`<div class="col" style="gap:10px">${run.map(row).join('')}</div>`:`<div class="sm">Nothing running. Add money and plan it into weeks.</div>`}
 ${old.length?sec20('Finished')+`<div class="col" style="gap:6px">${old.map(i=>`<div class="row sp sm" style="padding:8px 2px;border-bottom:1px solid var(--line)"><span>${money(i.sp)} · ${shortD(i.start)} – ${shortD(i.end)}</span><span>${i.stopped?'replaced by a sync':'done'}</span></div>`).join('')}</div>`:''}
 <div class="col" style="gap:10px;margin-top:26px"><button class="btn" data-a="sync24">Sync with my bank</button><button class="btn q" data-a="addmoney17">Add to balance</button></div>
 <div class="sm" style="margin-top:10px">Stopped tracking for a while? Type what is in your bank now and start again.</div><div style="height:40px"></div>`};

/* ---------- sync: type the real balance; savings stay, the rest is planned again into weeks ---------- */
H.sync24=()=>{openFlow('sync24',{step:0,kp:''});return false};
function syncNums24(d){const X=amtOf(d.kp),sv=savedTotal(S),keep=Math.min(sv,X),sp=Math.max(0,X-keep);if(!d.end)setWeeks20(d,Math.max(1,running24().length?wkCount20(Math.max(...running24().map(i=>i.end))):5));
 const t0=day0(),end=snapEnd(d.end),days=daysIn(t0,end),wk=r5b(sp/days*7),was=bal23();return {X,sv,keep,cut:sv-keep,sp,end,days,wk,was,diff:was==null?null:X-was}}
FLOWS.sync24=F=>{const d=F.d;
 if(F.step===0){const a=amtOf(d.kp),was=bal23();return `<div class="mbody"><button class="back" data-a="pclose">‹ Close</button><div class="steps"><i class="on"></i><i></i></div>
  <div class="title" style="margin-top:14px">How much is in your bank now?</div><div class="sub" style="margin-top:6px">Check your bank app and type it. Trickle never sees your bank.</div>
  <div class="hero" style="font-size:46px;margin:14px 0 4px;text-align:center;${a?'':'color:var(--ink3)'}">${a?money(a):'₹0'}</div>${was!=null?`<div class="sm" style="text-align:center">Trickle thinks ${money(was)}</div>`:''}${keypad('kp')}</div>
  <div class="mfoot"><button class="btn ${a?'':'d'}" data-a="${a?'sync24next':'x'}">Next</button></div>`}
 const n=syncNums24(d),k=wkCount20(n.end);
 return `<div class="mbody"><button class="back" data-a="sync24back">‹ Back</button><div class="steps"><i class="on"></i><i class="on"></i></div>
  <div class="title" style="margin-top:14px">Start again from ${money(n.X)}</div>
  ${n.diff!=null&&Math.abs(n.diff)>=1?`<div class="sm" style="margin-top:6px">${money(Math.abs(n.diff))} ${n.diff<0?'less':'more'} than Trickle thought.</div>`:''}
  <div class="sb24" style="margin-top:18px;height:40px"><i style="flex:${Math.max(n.keep,1)};background:${SAVE}"></i><i style="flex:${Math.max(n.sp,1)};background:${SPEND}"></i></div>
  <div class="row sp" style="margin-top:8px"><span><span class="k20"><i style="background:${SAVE}"></i>Savings stay</span><b style="font-size:20px">${money(n.keep)}</b></span><span style="text-align:right"><span class="k20" style="justify-content:flex-end"><i style="background:${SPEND}"></i>To spend</span><b style="font-size:20px">${money(n.sp)}</b></span></div>
  ${n.cut>0?`<div class="note20"><i style="background:${ST20.fast.c}"></i>Your bank has less than your savings, so Savings go down by ${money(n.cut)}.</div>`:''}
  <div class="lab20" style="margin-top:24px">How long should ${money(n.sp)} last?</div>
  <div class="stp20"><button data-a="syncwk24|-1" ${k<=1?'disabled':''} aria-label="One week less">−</button><div><b>${k} week${k>1?'s':''}</b><small>until Sun ${shortD(n.end)}</small></div><button data-a="syncwk24|1" aria-label="One more week">+</button></div>
  <div class="res20"><div class="sm">${money(n.sp)} ÷ ${n.days} days</div><div class="row" style="align-items:baseline;gap:8px;margin-top:4px"><span class="hero" style="font-size:42px;line-height:1">${money(n.wk)}</span><span style="font-size:17px;color:var(--ink2)">every week</span></div><div class="sm" style="margin-top:6px">This week starts fresh from today.</div></div><div style="height:150px"></div></div>
  <div class="mfoot"><button class="btn" data-a="sync24go">Start again</button></div>`};
H.sync24next=()=>{UI.flow.step=1};H.sync24back=()=>{UI.flow.step=0};
H.syncwk24=a=>{const d=UI.flow.d,k=wkCount20(syncNums24(d).end);setWeeks20(d,Math.max(1,k+(+a[0])))};
H.sync24go=()=>{const d=UI.flow.d,n=syncNums24(d),t=S.now.getTime();
 /* savings: only lowered when the bank has less than them (free money first, then goals) */
 let cut=n.cut;if(cut>0){const f=Math.min(S.free,cut);S.free-=f;cut-=f;S.goals.filter(g=>g.state!=='done').forEach(g=>{const c=Math.min(g.saved,cut);g.saved-=c;cut-=c})}
 /* running money is replaced by one new running balance from today */
 (S.incomes||[]).forEach(i=>{if(i.end&&i.end+DAY>t){i.stopped=true;i.end=day0()-DAY}});
 (S.incomes=S.incomes||[]).push({id:'in'+(S.idc++),amt:n.sp,sav:0,sp:n.sp,start:day0(),end:snapEnd(d.end),synced:true});
 S.b23=n.X;S.b23ids=new Set(S.txns.map(x=>x.id));S.b23add=0;S.syncFrom=t;
 S.moneyIn.unshift({id:'m'+(S.idc++),t,label:'Synced with bank',amt:n.X,note:`${money(n.keep)} savings, ${money(n.sp)} to spend`});
 S.planSet=true;S.track=false;recomputePlan(true);if(!S.wallet){S.bufLeft=S.bufAmt;S.cats.forEach(c=>c.left=c.amt)}
 logE(S,`Synced with bank: ${money(n.X)}; ${money(n.wk)} a week`);closeFlow();UI.tab='home';UI.stack=[];say(`Synced. ${money(S.W)} a week from now.`);return false};
/* spends before a sync are already out of the bank, so they do not count against the fresh week */
{const _ws=walletSpent;walletSpent=function(){if(!S.syncFrom)return _ws();const ws=Math.max(startOfWeek(S.now).getTime(),S.syncFrom);return S.txns.filter(t=>t.t>=ws&&(t.kind==='cat'||t.kind==='unsorted')).reduce((a,t)=>a+(t.src&&t.src.buffer!=null?t.src.buffer:t.amt),0)}}
{const _rp=recomputePlan;recomputePlan=function(f){const r=_rp(f);if(S.syncFrom&&S.wallet)S.bufLeft=Math.max(0,S.bufAmt-walletSpent());return r}}

/* ---------- bought goals leave the balance ---------- */


/* ---------- goal completed screen (replaces the old grid celebration) ---------- */
POPUPS.cele=P=>{const g=S.goals.find(x=>x.id===P.gid);if(!g)return '';const c=gcol21(g),days=Math.max(1,(g.createdMonthsAgo||0)*30+(S.now.getDate()||1)),amt=g.target>0?g.target:g.saved;
 return `<div class="cel24" style="--gc:${c}"><div class="pic">${gpic21(g,96)}</div><div class="sm" style="margin-top:28px">Goal reached</div><div class="title" style="font-size:36px;margin-top:4px">${esc(g.name)}</div>
 <div class="hero" style="font-size:44px;margin-top:14px">${money(amt)}</div><div class="sub" style="margin-top:4px">saved in ${days} days</div>
 <div class="gb"><i></i></div></div>
 <div style="position:absolute;left:22px;right:22px;bottom:30px" class="col"><div class="col" style="gap:10px">${P.done?`<button class="btn" data-a="celedone">Done</button>`:`<button class="btn" data-a="celebuy24|${g.id}">I bought it</button><button class="btn q" data-a="celeraise24|${g.id}">Raise the target</button><button class="btn q" data-a="celedone">Not yet, keep it saved</button>`}</div><div class="sm" style="text-align:center;margin-top:10px">“I bought it” takes ${money(g.saved)} off your balance.</div></div>`};
H.celebuy24=a=>{UI.popup=null;H.goalbought(a);setTimeout(checkCele,50);render();return false};
H.celeraise24=a=>{UI.popup=null;openSheet('goaledit',{id:a[0]});return false};

/* ---------- Savings: Completed goals ---------- */
{const _s=SCREENS.savings;SCREENS.savings=()=>{let h=_s();const done=S.goals.filter(g=>g.state==='done'||g.state==='reached');if(!done.length)return h;
 const card=g=>{const bought=g.state==='done';return `<div class="gc21 dn24" style="--gc:${gcol21(g)}"><span class="pic">${gpic21(g,30)}</span><span class="bd"><b>${esc(g.name)}</b>
  <span class="eta">${bought?(g.boughtOn?'Bought '+shortD(g.boughtOn):'Done'):'Saved '+money(g.saved)+' · ready to buy'}</span></span>${bought?'<span class="tick24">✓</span>':`<button class="btn s" data-a="goalbought|${g.id}">I bought it</button>`}</div>`};
 return h+sec20('Completed')+`<div class="col" style="gap:10px">${done.map(card).join('')}</div>`}}
/* reached goals leave the active list */
activeGoals=()=>S.goals.filter(g=>g.state!=='done'&&g.state!=='reached');

/* ---------- a short week says its own amount (this week gets only the days left) ---------- */
{const _h=heroHome17;heroHome17=function(){let h=_h();const wk=S.cats.reduce((a,c)=>a+(c.amt||0),0)+(S.bufAmt||0),W=Math.max(1,flexW());
 if(planned()&&wk>0&&wk<W-5){const dl=Math.max(1,7-dowIdx(S.now.getTime()));h=h.replace(`of ${money(W)} left this week`,`of ${money(wk)} left this week <span class="mut" style="font-size:13px">· ${dl}-day week</span>`).replace(/<div class="bar20w[\s\S]*?<\/div><\/div>/,bar20(Math.max(0,flexL()),wk,{col:ST20[hsNow20()].c}))}return h}}

/* ===== v24.1 (11 Oct, Tarun): balance = savings + all spendable money left. Worked out from the plan every time, never stored,
   so it cannot drift (the old "starting number + added − spent" could show ₹0 while savings were ₹175). ===== */
function future24(){const t=S.now.getTime(),nx=wk0()+7*DAY;return running24().reduce((a,i)=>{const s=Math.max(i.start,nx);return a+(i.end>=s?perDay(i)*daysIn(s,i.end):0)},0)}
function parts24(){const sv=Math.max(0,savedTotal(S)),wk=planned()?Math.max(0,flexL()):0,fut=planned()?Math.max(0,future24()):0;return {sv,wk,fut,sp:wk+fut,tot:Math.round(sv+wk+fut)}}
/* The balance is a ledger: it starts at savings + spendable money (so the two always add up at the start), then
   + money added − spends − bought goals. Savings + to spend = balance, always: "to spend" is balance − savings.
   Sync with the bank sets it again from scratch. */
bal23=function(){if(!S.l24){if(!planned()&&savedTotal(S)<=0)return null;const P=parts24();S.l24={a:Math.round(P.sv+P.sp),ids:new Set(S.txns.map(t=>t.id)),add:0}}
 const out=S.txns.filter(t=>!S.l24.ids.has(t.id)&&(isSp(t)||t.kind==='fixed'||t.bought)).reduce((x,t)=>x+t.amt,0);return Math.max(0,Math.round(S.l24.a+S.l24.add-out))};
balAdd23=function(v){if(S.l24)S.l24.add+=v};
{const _f=H.incfinish;H.incfinish=a=>{bal23();return _f(a)}}
{const _d=H.incdone;H.incdone=a=>{bal23();return _d(a)}}
const split24=()=>{const b=bal23()||0,sv=Math.max(0,Math.round(savedTotal(S))),P=parts24();return {b,sv:Math.min(sv,b),sp:Math.max(0,b-sv),plan:Math.round(P.sp),wk:Math.round(P.wk),fut:Math.round(P.fut)}};
/* the Balance screen shows the three parts */
{const _b=SCREENS.bal24;SCREENS.bal24=()=>{const P=split24(),gap=P.sp-P.plan-((S.l24&&S.l24.g0)||0);return _b().replace('<div class="sm">What should be in your bank</div>','<div class="sm">Savings + money left to spend</div>')
 .replace(/<div class="sb24">[\s\S]*?<\/div>/,`<div class="sb24"><i style="flex:${Math.max(P.sv,1)};background:${SAVE}"></i><i style="flex:${Math.max(P.sp,1)};background:${SPEND}"></i></div>`)
 .replace(/<div class="row sp sm" style="margin-top:6px">[\s\S]*?<\/div>/,`<div class="row sp sm" style="margin-top:6px"><span><i class="kd24" style="background:${SAVE}"></i>Savings ${money(P.sv)}</span><span><i class="kd24" style="background:${SPEND}"></i>To spend ${money(P.sp)}</span></div>
 <div class="sm mut" style="margin-top:6px;text-align:right">In your weeks: ${money(P.wk)} this week + ${money(P.fut)} later</div>
 ${Math.abs(gap)>=50?`<div class="note20"><i style="background:${ST20.fast.c}"></i>${gap>0?`${money(gap)} of it isn't in your weeks yet.`:`Your weeks plan ${money(-gap)} more than you have.`} Sync with your bank to start again from the real number.</div>`:''}`)}}
/* sync starts from scratch: the typed balance replaces everything; savings stay inside it; the rest is planned again from today */
{const _go=H.sync24go;H.sync24go=()=>{const X=amtOf(UI.flow.d.kp);const r=_go();if(!(S.incomes||[]).some(i=>i.synced&&i.sp>0&&i.end+DAY>S.now.getTime())){S.W=0;S.flexW=0;S.bufFull=0;S.bufAmt=0;S.bufLeft=0;S.cats.forEach(c=>{c.amt=0;c.full=0;c.left=0})}S.l24={a:X,ids:new Set(S.txns.map(t=>t.id)),add:0};const P=split24();S.l24.g0=P.sp-P.plan;return r}}
