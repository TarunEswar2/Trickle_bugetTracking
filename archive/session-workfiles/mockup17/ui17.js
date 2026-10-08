/* three states: green on track, amber below the Recommended line, red nothing left or savings touched */
function homeState(){const p=typeof paceInfo==='function'?paceInfo():null;if(S.touched||flexL()<=0)return 'out';return p&&p.over?'fast':'ok'}
const STATECOL={ok:'#6FD3AE',fast:'#E6B24F',out:'#F26B6B'};
/* ===== v17: from the first user-testing reviews (8 Oct): the structure was bad, too many tabs, too much "AI look", sentences too complex.
   Three tabs. Each tab is a short list that leads to detail screens (two levels, no tabs inside tabs). Flat visual style. Plain words. ===== */
window.TABS=[['home','Home'],['spending','Spending'],['money','Money']];
window.TABALIAS={income:['money','inc'],savings:['money','sav'],insights:['spending','cat']};
const back17=(label)=>`<button class="back" data-a="back">‹ ${label}</button>`;
const row17=(label,value,act,o)=>{o=o||{};return `<button class="li" style="padding:13px 16px;${o.dim?'opacity:.6':''}" data-a="${act||'x'}"><span class="n" style="line-height:1.25"><span class="mut" style="display:block;font-weight:500;font-size:13px">${label}</span>${value}</span><span class="t">›</span></button>`};
const sec17=t=>`<div class="cap" style="margin:22px 0 8px">${t}</div>`;

/* ---------- Home ---------- */
function nextAct17(){const n=nextAct();if(n&&!n.low)return n;const a=awareness();if(a)return {t:a.t,a:'why|'+a.k+'|home',c:'tip'};return n}
SCREENS.home=()=>{const nt=nextAct17(),pl=planned();let top,viz,cap='';
 if(pl){const W=Math.max(1,flexW()),L=Math.max(0,flexL()),empty=L<=0,f=L/W,hs=homeState(),col=STATECOL[hs],dl=daysToGo();const st=hs==='out'?(S.touched?'Over this week. Savings used.':'Nothing left this week.'):hs==='fast'?'Spending a bit fast.':'';
  top=`<div class="hero" style="font-size:52px;line-height:1.05;color:${hs==='out'?col:'var(--ink)'}">${money(L)}</div><div class="sub" style="margin-top:6px;font-size:16px">left of ${money(W)} this week</div>${st?`<div style="margin-top:6px;color:${col};font-weight:600">${st}</div>`:''}`;
  viz=`<div style="margin:22px 0 30px" data-a="gridhow">${battery(L,W,{col,tick:weekIdeal(),label:'Recommended'})}</div>`;
  cap=empty?'':`<div class="row sp" style="align-items:center;margin:0 0 16px"><span class="sub">${money(L/dl)} a day for ${dl===1?'today':dl+' days'}</span><button class="chip" data-a="gridhow">?</button></div>`}
 else{const tot=wkTot(0);top=tot?`<div class="hero" style="font-size:52px;line-height:1.05">${money(tot)}</div><div class="sub" style="margin-top:6px;font-size:16px">spent this week</div>`:`<div class="title" style="font-size:28px">Nothing logged yet.</div>`;viz=`<div style="margin:22px 0 30px"><div class="batt idle"></div></div>`}
 const row=!nt?'':nt.html?nt.html:nt.c==='plan'?`<button class="li cta" data-a="${nt.a}"><span class="n"><b>${nt.t}</b></span><span class="t">›</span></button>`:`<button class="li" data-a="${nt.a}"><span class="d" style="background:${nt.c==='green'?SAVE:nt.c==='tip'?'#8D97A3':'var(--amber)'}"></span><span class="n">${esc(nt.t)}</span><span class="t">›</span></button>`;
 return `<div class="row sp" style="margin-top:2px"><span></span><button class="chip" data-a="settings">Settings</button></div><div style="margin-top:14px">${top}</div>${viz}${cap}${row}
 <div style="position:sticky;bottom:0;margin-top:22px;padding-top:10px"><button class="btn" data-a="${scanOn()?'payscan':'pay'}">Log expense</button></div>`};
SHEETS.gridhow=()=>{const W=Math.max(1,flexW());return `<div class="title" style="font-size:24px;margin-bottom:14px">How to read the bar</div><div style="margin:6px 0 34px">${battery(W*.62,W,{tick:.45,label:'Recommended'})}</div><div class="col" style="gap:10px"><div class="sub">The bar is what you have left this week.</div><div class="sub">The line is what we recommend you have left by now.</div><div class="sub"><b style="color:#6FD3AE">Green</b>: on track. <b style="color:#E6B24F">Yellow</b>: below the line, spending fast. <b style="color:#F26B6B">Red</b>: nothing left.</div></div><div class="row sp" style="margin-top:18px"><button class="lnk" data-a="why|bar">Why a bar?</button><button class="btn s" data-a="closesheet" style="width:auto">OK</button></div>`};

/* ---------- Spending: one list. Patterns and records are one tap down ---------- */
function cmpNow(){const now=S.now.getTime(),ws=wk0(),td=dowIdx(now),day=(f,k)=>txIn(f+k*DAY,f+(k+1)*DAY).reduce((a,x)=>a+x.amt,0);let c=0,l=0;for(let k=0;k<=td;k++){c+=day(ws,k);l+=day(ws-7*DAY,k)}if(!c||!l)return null;const d=c-l;return Math.abs(d)<Math.max(20,l*.08)?'About the same':d>0?money(d)+' more':money(-d)+' less'}
SCREENS.spending=()=>{const h=statsHour(),rep=shopList()[0],cmp=cmpNow();
 return `<div class="title" style="margin-bottom:16px">Spending</div>${spCats()}
 ${sec17('Patterns')}<div class="col" style="gap:8px">${row17('Busiest time',h.n>=8?bandLabel(h.pk):'Needs a week of spends',h.n>=8?'push|pwhen':'x',{dim:h.n<8})}${row17('Most visited',rep?`${esc(rep.payee)} · ${rep.n} visits`:'Nothing repeats yet',rep?'push|prep':'x',{dim:!rep})}${row17('This week and last',cmp||'Needs two weeks of spends',cmp?'push|ptrend':'x',{dim:!cmp})}</div>
 ${sec17('Records')}<div class="col" style="gap:8px">${row17('All spends',`${S.txns.filter(isSp).length} spends`,'push|history')}${(S.limits||[]).length?row17('Limits',`${S.limits.length} set`,'v16limits'):''}</div>`};
SCREENS.pwhen=()=>back17('Spending')+insWhen();
SCREENS.prep=()=>back17('Spending')+insRep();
SCREENS.ptrend=()=>back17('Spending')+insCmp();
SCREENS.history=()=>back17('Spending')+`<div class="title" style="margin-bottom:4px">All spends</div>`+spHist();

/* ---------- Money: one list ---------- */
SCREENS.money=()=>{const l=S.incomes||[],now=S.now.getTime(),run=l.filter(i=>!i.end||i.end+DAY>now),mo=S.bills.filter(b=>!b.ended&&!b.paused&&!(b.trialUntil&&now<b.trialUntil)).reduce((a,b)=>a+perMonth(b),0),sav=savedTotal(S);
 const inTxt=run.length?`${money(run.reduce((a,i)=>a+i.amt,0))} · ${run.length===1?'until '+shortD(run[0].end):run.length+' running'}`:planned()?'Not added yet':'Add what you get';
 return `<div class="title" style="margin-bottom:8px">Money</div>${planned()?`<div class="hero" style="font-size:40px;margin-top:12px">${money(S.W)}</div><div class="sub" style="margin:4px 0 4px">to spend each week</div>`:`<div class="sub" style="margin:8px 0">Add your money. Trickle works out your week.</div>`}
 <div class="col" style="gap:8px;margin-top:18px">${row17('Pocket money & income',inTxt,'push|incomes')}${row17('Savings',money(sav)+(S.goals.filter(g=>g.state!=='done').length?` · ${S.goals.filter(g=>g.state!=='done').length} goal${S.goals.filter(g=>g.state!=='done').length>1?'s':''}`:''),'push|savings')}${row17('Subscriptions',S.bills.filter(b=>!b.ended).length?`${money(mo)} a month`:'None yet','v15bills')}${row17('One-off money','A friend pays back, a gift','oneoff')}</div>`};
SCREENS.incomes=()=>back17('Money')+`<div class="title" style="margin-bottom:12px">Pocket money & income</div>`+mnInc();
SCREENS.savings=()=>back17('Money')+`<div class="title" style="margin-bottom:12px">Savings</div>`+mnSav();
H.mnseg=()=>{};
