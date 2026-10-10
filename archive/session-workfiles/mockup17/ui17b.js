/* ===== v17.1 (9 Oct): second round of user feedback.
   Insights and recommendations live on Home as swipeable cards; a tap opens the graph.
   Spending is for managing: compact categories, recent spends, subscriptions, limits.
   Money tab is gone: Savings is the third tab; "Add money" is a button on Home and in the widget.
   Time-of-day chart rebuilt; month insight is a calendar. ===== */
window.TABS=[['home','Home'],['spending','Spending'],['savings','Savings']];
window.TABALIAS={income:['savings'],money:['savings'],insights:['spending']};

/* ---------- Home: swipeable insight cards ---------- */
const mini17=(vals,sel)=>{const mx=Math.max(1,...vals);return `<span class="mini17">${vals.map((v,i)=>`<i style="height:${Math.max(3,Math.round(v/mx*34))}px;background:${i===sel?'#6FD3AE':'#4A525C'}"></i>`).join('')}</span>`};
function cards17(){const out=[];
 suggestions().slice(0,2).forEach(s=>out.push({tag:'Limit',t:s.short,sub:s.text,a:'limsug|'+s.key,cta:'Set a limit'}));
 const n=nextAct();if(n&&!n.low&&!n.html&&n.c!=='plan')out.push({tag:'Now',t:n.t,sub:'',a:n.a,cta:'Open',hot:n.c==='amber'});
 else if(n&&n.c==='plan')out.push({tag:'Next',t:n.t,sub:'',a:n.a,cta:'Start'});
 const aw=awareness();if(aw)out.push({tag:'Heads-up',t:aw.t,sub:aw.s,a:'insgo|'+aw.k,cta:'See graph',hot:true});
 const h=statsHour(),d=statsDay(),m=statsMonth();
 if(!aw||aw.k!=='hour'){if(h.n>=8)out.push({tag:'Time of day',t:`You spend most around ${bandLabel(h.pk)}`,sub:`${pct0(h.share)}% of your spending`,mini:mini17(h.vals,h.pk),a:'insgo|hour',cta:'See graph'})}
 if(!aw||aw.k!=='day'){if(d.n>=8)out.push({tag:'Day',t:`${FULLDAY[d.pk]}s are your biggest day`,sub:`${money(d.vals[d.pk])} on a typical one`,mini:mini17(d.vals,d.pk),a:'insgo|day',cta:'See graph'})}
 if(!aw||aw.k!=='month'){if(m.ok)out.push({tag:'Month',t:`${PHASE[m.pk]} is when you spend most`,sub:`${money(m.vals[m.pk])} a day`,mini:mini17(m.vals,m.pk),a:'insgo|month',cta:'See calendar'})}
 const rep=shopList()[0];if(rep&&rep.n>=3)out.push({tag:'Repeat',t:`${rep.payee}: ${rep.n} visits`,sub:'in the last 30 days',a:'push|prep',cta:'See places'});
 const cmp=cmpNow();if(cmp)out.push({tag:'This week',t:cmp==='About the same'?'About the same as last week':cmp+' than last week',sub:'Same days, both weeks',a:'push|ptrend',cta:'See graph'});
 if(!out.length)out.push({tag:'Soon',t:'Patterns show up after a week of spends',sub:'Log a few. Trickle finds your busy times.',a:'x',cta:''});
 return out.slice(0,7)}
function carousel17(){const c=cards17();
 return `<div class="car17" id="car17">${c.map(x=>`<button class="cd17${x.hot?' hot':''}" data-a="${x.a}"><span class="tg">${x.tag}</span><b>${esc(x.t)}</b>${x.sub?`<span class="sb">${esc(x.sub)}</span>`:''}${x.mini||''}${x.cta?`<span class="go">${x.cta} ›</span>`:''}</button>`).join('')}</div>${c.length>1?`<div class="dots17" id="dots17">${c.map((_,i)=>`<i class="${i?'':'on'}"></i>`).join('')}</div>`:''}`}
{const _ar=window.afterRender;window.afterRender=()=>{if(_ar)_ar();const car=document.getElementById('car17');if(!car)return;const dots=document.querySelectorAll('#dots17 i');if(!dots.length)return;car.addEventListener('scroll',()=>{const w=car.firstElementChild?car.firstElementChild.getBoundingClientRect().width+10:1,i=Math.round(car.scrollLeft/w);dots.forEach((d,k)=>d.classList.toggle('on',k===i))},{passive:true})}}
H.insgo=a=>{UI.rh=a[0];UI.rhSel=null;UI.mcSel=null;UI.mcOff=0;push('pwhen',{});return false};
H.addmoney17=()=>{openFlow('inc',{step:0,kp:''});return false};
{const _fi=FLOWS.inc;FLOWS.inc=F=>{let h=_fi(F);if(F.step===0&&h.indexOf('data-a="amkind|one"')<0)h=h.replace('<button class="btn q" data-a="pclose">Not now</button>','<button class="btn q" data-a="amkind|one">A gift or a friend paid back</button><button class="btn q" data-a="pclose">Not now</button>');return h}}

/* ---------- charts: bars with a baseline, an average line and aligned labels ---------- */
function barsChart(vals,labels,sel,o){o=o||{};const n=vals.length,mx=Math.max(1,...vals),H0=o.h||150,avg=vals.reduce((a,v)=>a+v,0)/n;
 const cols=vals.map((v,i)=>{const h=v>0?Math.max(6,Math.round(v/mx*H0)):2,on=i===sel;return `<button class="c17" data-a="inssel|${i}" style="height:${H0}px"><i style="height:${h}px;background:${on?'#6FD3AE':v>0?'#E9A15C':'#2A313A'}"></i></button>`}).join('');
 const labs=labels.map((l,i)=>l?`<span class="${o.today===i?'td':''}" style="left:${(o.edge?i/n:(i+.5)/n)*100}%;${o.edge?'':'transform:translateX(-50%)'}">${l}</span>`:'').join('');
 return `<div class="viz17"><div class="ch17"><div class="plot" style="height:${H0}px;grid-template-columns:repeat(${n},1fr)">${cols}<u style="bottom:${Math.round(avg/mx*H0)}px"></u></div><div class="axis">${labs}</div><div class="sm" style="margin-top:6px">Dashed line is your average.</div></div></div>`}

/* ---------- month insight: a calendar ---------- */
function spendByDay(){const m={};S.txns.filter(isSp).forEach(t=>{const d=new Date(t.t);const k=d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate();m[k]=(m[k]||0)+t.amt});return m}
function monthCal(){const off=UI.mcOff||0,m0=new Date(S.now.getFullYear(),S.now.getMonth()+off,1),dim=new Date(m0.getFullYear(),m0.getMonth()+1,0).getDate(),first=(m0.getDay()+6)%7,by=spendByDay(),key=n=>m0.getFullYear()+'-'+m0.getMonth()+'-'+n;
 const tdy=new Date(S.now);tdy.setHours(0,0,0,0);let mx=1,pk=0,tot=0;for(let n=1;n<=dim;n++){const v=by[key(n)]||0;tot+=v;if(v>mx){mx=v}if(v>(by[key(pk||1)]||0))pk=n}
 const sel=UI.mcSel!=null&&UI.mcSel>=1&&UI.mcSel<=dim?UI.mcSel:(pk||null);
 let cells='';for(let i=0;i<first;i++)cells+='<i></i>';
 for(let n=1;n<=dim;n++){const v=by[key(n)]||0,fut=new Date(m0.getFullYear(),m0.getMonth(),n).getTime()>tdy.getTime(),isT=new Date(m0.getFullYear(),m0.getMonth(),n).getTime()===tdy.getTime();
  const a=v?(.16+.7*v/mx):0;cells+=`<button class="cl17${sel===n?' sel':''}${isT?' td':''}${fut?' fut':''}" style="${v?`background:rgba(233,161,92,${a.toFixed(2)})`:''}" data-a="${fut?'x':'mcsel|'+n}">${n}</button>`}
 const day=new Date(m0.getFullYear(),m0.getMonth(),sel||1),list=S.txns.filter(t=>isSp(t)&&new Date(t.t).toDateString()===day.toDateString());
 const dtxt=sel?`<div class="row sp" style="margin-top:14px;align-items:baseline"><b>${fmtDay(day)}</b><span class="hero" style="font-size:26px">${money(by[key(sel)]||0)}</span></div><div class="sm" style="margin-top:4px">${list.length?list.slice(0,3).map(t=>esc(t.payee)+' '+money(t.amt)).join(' · ')+(list.length>3?` · ${list.length-3} more`:''):'No spends.'}</div>`:'';
 return `<div class="row sp" style="margin:14px 0 8px;align-items:center"><button class="chip" style="${off<=-3?'opacity:.3;pointer-events:none':''}" data-a="mcnav|-1">‹</button><b>${m0.toLocaleDateString('en-IN',{month:'long',year:'numeric'})}</b><button class="chip" style="${off>=0?'opacity:.3;pointer-events:none':''}" data-a="mcnav|1">›</button></div>
 <div class="viz17"><div class="cal17">${['M','T','W','T','F','S','S'].map(x=>`<span class="cap">${x}</span>`).join('')}${cells}</div></div><div class="sm" style="margin-top:8px">Darker means you spent more that day. ${money(tot)} this month.</div>${dtxt}`}
H.mcnav=a=>{UI.mcOff=Math.max(-3,Math.min(0,(UI.mcOff||0)+(+a[0])));UI.mcSel=null};
H.mcsel=a=>{UI.mcSel=+a[0]};

function insWhen(){const m=UI.rh||'hour';let body='';
 const chips=`<div class="row" style="gap:8px;margin:14px 0 10px">${[['hour','Time of day'],['day','Day'],['month','Month']].map(c=>`<button class="chip ${m===c[0]?'on':''}" data-a="rhmode|${c[0]}">${c[1]}</button>`).join('')}</div>`;
 const foot=`<div class="row sp" style="margin-top:14px"><button class="lnk" style="font-size:14px" data-a="why|${m}">Why this?</button><button class="lnk" style="font-size:14px;color:var(--ink3)" data-a="${S.nudgeOff?'nudgeon':'nudgeoff'}">Heads-ups: ${S.nudgeOff?'off':'on'}</button></div>`;
 const none=t=>`<div class="title" style="font-size:24px">Not enough yet.</div><div class="sub" style="margin-top:8px">${t}</div>${chips}`;
 const tip=t=>`<div class="card" style="margin-top:16px"><div class="cap">Try this</div><div style="margin-top:4px">${t}</div></div>`;
 if(m==='hour'){const h=statsHour();if(h.n<8)return none('Time patterns show after a week or two of spends.');const sel=UI.rhSel!=null?UI.rhSel:h.pk,lab=h.vals.map((_,i)=>i%3===0?['6am','12pm','6pm','12am'][i/3]:'');
  body=`<div class="title" style="font-size:26px;line-height:1.15">You spend most around ${bandLabel(h.pk)}.</div><div class="sub" style="margin-top:6px">${pct0(h.share)}% of your spending, over the last 4 weeks.</div>${chips}<div style="margin:2px 0 4px"><span class="hero" style="font-size:34px">${money(h.vals[sel])}</span><span class="sub" style="margin-left:8px">${bandLabel(sel)}</span></div>${barsChart(h.vals,lab,sel,{edge:true,today:Math.floor(((S.now.getHours()-6+24)%24)/2)})}${tip(`Around ${bandLabel(h.pk)}, check what is left before you pay.`)}`}
 else if(m==='day'){const d=statsDay();if(d.n<8)return none('Day patterns show after a week or two of spends.');const sel=UI.rhSel!=null?UI.rhSel:d.pk;
  body=`<div class="title" style="font-size:26px;line-height:1.15">${FULLDAY[d.pk]}s are your biggest day.</div><div class="sub" style="margin-top:6px">${money(d.vals[d.pk])} on a typical one. ${money((d.tot-d.vals[d.pk])/6)} on the others.</div>${chips}<div style="margin:2px 0 4px"><span class="hero" style="font-size:34px">${money(d.vals[sel])}</span><span class="sub" style="margin-left:8px">${FULLDAY[sel]} on average</span></div>${barsChart(d.vals,DOW.map(x=>x[0]),sel,{today:dowIdx(S.now.getTime())})}${tip(`On ${FULLDAY[d.pk]}s, pick a number before you go out.`)}`}
 else{const s=statsMonth(),head=s.ok?`<div class="title" style="font-size:26px;line-height:1.15">${PHASE[s.pk]} is when you spend most.</div><div class="sub" style="margin-top:6px">${money(s.vals[s.pk])} a day. ${money(s.oth)} in the other parts.</div>`:`<div class="title" style="font-size:26px;line-height:1.15">Your spending, day by day.</div><div class="sub" style="margin-top:6px">Tap a day to see what it was.</div>`;
  body=head+chips+monthCal()}
 return body+foot}

/* ---------- Spending: manage. Compact categories, recent spends, subscriptions, limits ---------- */
function recent17(n){return S.txns.filter(t=>t.kind==='cat'||t.kind==='unsorted'||t.kind==='fixed'||t.bought).slice(0,n)}
const txRow17=t=>{const cn=t.kind==='cat'?catName(t.ref):t.kind==='unsorted'?'Needs a category':t.bought?'Bought':'Subscription',dl=Math.floor((new Date(S.now.toDateString())-new Date(new Date(t.t).toDateString()))/DAY),when=dl===0?fmtTime(new Date(t.t)):dl===1?'Yesterday':fmtDay(new Date(t.t));
 return `<button class="li tx17" data-a="push|txn|${J({id:t.id}).replace(/\|/g,'')}"><span class="d" style="${t.kind==='unsorted'?`border:1.5px dashed ${AMBER};background:none`:`background:${t.bought?SAVE:t.kind==='fixed'?FIXC:catColor2(t.ref)}`}"></span><span class="n" style="line-height:1.25">${esc(t.payee)}<span class="mut" style="display:block;font-weight:500;font-size:12px">${cn} · ${when}</span></span><span class="a">${money(t.amt)}</span></button>`};
function cats17(){const sc=UI.sc||'week',[f,t]=inWin(sc),rows=catTotals(f,t),T=sumAmt(rows);
 const chips=`<div class="row" style="gap:8px;margin:12px 0 12px">${SCOPES.map(s=>`<button class="chip ${sc===s[0]?'on':''}" data-a="spscope|${s[0]}">${s[1]}</button>`).join('')}</div>`;
 if(!rows.length)return `<div class="sub" style="margin-top:6px">Nothing logged ${sc==='week'?'yet':'then'}.</div>${chips}`;
 const show=UI.spAll?rows:rows.slice(0,4),sugs=suggestions().filter(x=>x.scope==='cat'),firstNamed=rows.find(r=>r.id!=='_u');
 const li=show.map(r=>{const l=(S.limits||[]).find(x=>x.scope==='cat'&&x.ref===r.id),go=r.id==='_u'?'push|sort':`push|cat|${J({id:r.id})}`,tone=l&&sc==='week'?limTone(l):'';
  const rec=sc==='week'&&!l&&r.id!=='_u'&&!S.limNo['c'+r.id]&&(sugs.some(x=>x.ref===r.id)||(firstNamed&&firstNamed.id===r.id&&r.share>=.25));
  return `<button class="cr17" data-a="${go}"><i style="background:${r.col}"></i><span class="nm">${esc(r.name)}${rec?`<span class="rec17" data-a="limset|cat|${r.id}|amt">Recommended: set a limit ›</span>`:''}</span>${l&&sc==='week'?`<span class="lm" style="${tone?'color:'+tone:''}">${limText(l)}</span>`:''}<b>${money(r.amt)}</b></button>`}).join('');
 return `<div class="row" style="align-items:baseline;gap:8px;margin-top:6px"><span class="hero" style="font-size:38px">${money(T)}</span><span class="sub">${sc==='week'?'this week':sc==='last'?'last week':'in 30 days'}</span></div><div style="margin:12px 0 0">${stackBar(rows)}</div>${chips}<div class="panelC">${li}</div>${rows.length>4&&!UI.spAll?`<button class="lnk" style="margin-top:6px" data-a="spall">All ${rows.length} categories ›</button>`:''}`}
SCREENS.spending=()=>{const rec=recent17(5),mo=S.bills.filter(b=>!b.ended&&!b.paused&&!(b.trialUntil&&S.now.getTime()<b.trialUntil)).reduce((a,b)=>a+perMonth(b),0),nb=S.bills.filter(b=>!b.ended).length;
 const nxt=S.bills.filter(b=>!b.ended&&b.nextDue).sort((a,b)=>new Date(a.nextDue)-new Date(b.nextDue))[0];
 return `<div class="title" style="margin-bottom:2px">Spending</div>${cats17()}
 <div class="row sp" style="margin:38px 0 10px;align-items:center;padding-top:22px;border-top:1px solid var(--line)"><span class="cap" style="margin:0">Recent</span><button class="lnk" style="font-size:14px" data-a="push|history">See all ›</button></div>
 <div class="col" style="gap:6px">${rec.length?rec.map(txRow17).join(''):'<div class="sub">Nothing yet.</div>'}</div>
 <div class="col" style="gap:8px;margin-top:34px">${row17('Subscriptions',nb?`${money(mo)} a month${nxt?' · '+esc(nxt.name)+' '+shortD(new Date(nxt.nextDue).getTime()):''}`:'None yet','v15bills')}${(S.limits||[]).length?row17('Limits',`${S.limits.length} set`,'v16limits'):''}</div>`};

/* ---------- Savings is the third tab; income lives inside it ---------- */
SCREENS.savings=()=>{const l=S.incomes||[],now=S.now.getTime(),run=l.filter(i=>!i.end||i.end+DAY>now);
 const inTxt=run.length?`${money(run.reduce((a,i)=>a+i.amt,0))} · ${run.length===1?(run[0].end?'until '+shortD(run[0].end):'added'):run.length+' running'}`:planned()?'Not added yet':'Add what you get';
 return `<div class="title" style="margin-bottom:12px">Savings</div>`+mnSav()+`<div class="col" style="gap:8px;margin-top:18px">${row17('Pocket money & income',inTxt,'push|incomes')}</div>`};
SCREENS.incomes=()=>back17('Savings')+`<div class="title" style="margin-bottom:12px">Pocket money & income</div>`+mnInc();
SCREENS.pwhen=()=>back17('Home')+insWhen();
SCREENS.prep=()=>back17('Home')+insRep();
SCREENS.ptrend=()=>back17('Home')+insCmp();
SCREENS.history=()=>back17('Spending')+`<div class="title" style="margin-bottom:4px">All spends</div>`+spHist();

/* ---------- category screen: "Where" rows say visits plainly ---------- */
{const _cat=SCREENS.cat;SCREENS.cat=SCREENS.tcat=p=>_cat(p).replace(/<span class="t">(\d+)× · /g,(_,n)=>`<span class="t">${n} ${n==='1'?'visit':'visits'} · `).replace('<div class="cap" style="margin:30px 0 10px">Where</div>','<div class="cap" style="margin:18px 0 2px">Where you went</div><div class="sm" style="margin-bottom:8px">Tap a place to limit how often.</div>')}

/* ---------- widget: log a spend or add money, never opens the app ---------- */
const HSDUR=[['Just add it',null],['1 week',0],['1 month',1],['3 months',2],['6 months',3]];
const _qc=quickChips;quickChips=function(){return _qc().slice(0,2)};
const _wid=POPUPS.homescreen;
POPUPS.homescreen=P=>{const mo=UI.hsMoney;let h=_wid(P);
 if(!mo){
  /* replace the single "+ Add" with two buttons; keep two quick chips */
  h=h.replace('<button class="hs-btn pri" style="flex:.8" data-a="hsadd">+ Add</button></div></div>','</div><div class="hs-row" style="margin-top:8px"><button class="hs-btn pri" style="height:44px" data-a="hsadd">+ Spend</button><button class="hs-btn" style="height:44px;border:1px solid var(--accent);color:var(--accent)" data-a="hsmoney">+ Money</button></div></div>');
  if(UI.hsNote)h=h.replace('<div class="hs-row">',`<div class="hs-note"><span>${esc(UI.hsNote)}</span></div><div class="hs-row">`);
  return h}
 const hide=UI.hsHide,amt=amtOf(mo.kp),pct=mo.pct,sav=savCalc(mo,amt,pct),sp=amt-sav,ok=amt>0;
 const wid=`<div class="hs-wid"><div class="row sp"><span class="cap">Add money</span><button class="hs-eye" data-a="hseye">${hide?'Show amounts':'Hide amounts'}</button></div>
  <div class="hero" style="font-size:40px;margin-top:2px">${hide?'₹•••':'₹'+(mo.kp||'0')}</div>
  <div class="hs-chips">${[500,1000,2000,5000].map(v=>`<button class="hs-c ${amt===v?'on':''}" data-a="hsmamt|${v}">₹${v}</button>`).join('')}</div>
  <div class="hs-kp">${['1','2','3','4','5','6','7','8','9','','0','⌫'].map(k=>k?`<button data-a="hsmk|${k}">${k}</button>`:'<span></span>').join('')}</div>
  <div class="cap" style="margin-top:8px">Save or spend</div>
  <div class="sbar" style="height:12px;margin-top:6px"><i id="hsm-bs" style="flex:${Math.max(pct,.001)} 1 0;background:${SAVE}"></i><i id="hsm-bp" style="flex:${Math.max(100-pct,.001)} 1 0;background:${SPEND}"></i></div>
  <input type="range" min="0" max="100" step="5" value="${pct}" data-i="hsmslider" style="margin:10px 0 2px;width:100%">
  <div class="row sp sm"><span>Save <b id="hsm-pct" style="color:var(--ink)">${pct}%</b> <b id="hsm-sv" style="color:var(--ink)">${hide?'':money(sav)}</b></span><span>Spend <b id="hsm-sp" style="color:var(--ink)">${hide?'':money(sp)}</b></span></div>
  <div class="cap" style="margin-top:8px">For how long</div><div class="hs-chips" style="margin-top:4px">${HSDUR.map((d,i)=>`<button class="hs-c ${mo.dur===d[1]?'on':''}" data-a="hsmdur|${i}">${d[0]}</button>`).join('')}</div>
  ${mo.dur!=null&&S.planSet&&!S.planFromIncome?`<div class="sm" style="color:var(--amber);margin-top:8px">This replaces your weekly amount of ${hide?'₹•••':money(S.W)}.</div>`:''}<div class="hs-row"><button class="hs-btn" style="flex:.6;height:46px" data-a="hsmcancel">Cancel</button><button class="hs-btn pri ${ok?'':'dis'}" style="height:46px" data-a="${ok?'hsmsave':'x'}">Add ${ok?money(amt):''}</button></div></div>`;
 return `<div class="hs"><div class="hs-top"><span>${fmtTime(S.now)}</span><span>5G ▮</span></div>${wid}<button class="hs-close" data-a="hsclose">Leave the home screen</button><div class="sm" style="text-align:center;margin-top:6px">Simulated Android home screen. The widget never opens Trickle.</div></div>`};
H.hsmoney=()=>{UI.hsMoney={kp:'',pct:20,dur:null};UI.hsNote=null};
H.hsmcancel=()=>{UI.hsMoney=null};
H.hsmk=a=>{const k=a[0],mo=UI.hsMoney;let v=mo.kp||'';if(k==='⌫')v=v.slice(0,-1);else if(v.length<6)v=(v==='0'?'':v)+k;mo.kp=v};
H.hsmamt=a=>{UI.hsMoney.kp=String(a[0])};
H.hsmpct=a=>{UI.hsMoney.pct=+a[0]};
HI.hsmslider=(a,el)=>{const mo=UI.hsMoney;mo.pct=+el.value;const t=amtOf(mo.kp),sv=savCalc(mo,t,mo.pct),hide=UI.hsHide;$('#hsm-pct').textContent=mo.pct+'%';$('#hsm-sv').textContent=hide?'':money(sv);$('#hsm-sp').textContent=hide?'':money(t-sv);$('#hsm-bs').style.flex=Math.max(mo.pct,.001)+' 1 0';$('#hsm-bp').style.flex=Math.max(100-mo.pct,.001)+' 1 0';return false};
H.hsmdur=a=>{UI.hsMoney.dur=HSDUR[+a[0]][1]};
H.hsmsave=()=>{const mo=UI.hsMoney,amt=amtOf(mo.kp);if(!amt)return false;const withEnd=mo.dur!=null,d={kp:mo.kp,pct:mo.pct};if(withEnd)d.end=presetEnd(PRESETS[mo.dur]);
 const before=Math.max(0,flexL()),r=addIncome(d,withEnd);if(withEnd&&S.planSet)recomputePlan(true);UI.hsMoney=null;
 UI.hsNote=`Added ${money(amt)} · ${money(r.sav)} saved${withEnd&&S.planSet?' · weekly amount '+money(S.W):''}`;clearTimeout(H._hsN);H._hsN=setTimeout(()=>{UI.hsNote=null;if(UI.popup&&UI.popup.id==='homescreen')render()},7000)};
{const _hc=H.hsclose;H.hsclose=()=>{UI.hsMoney=null;UI.hsNote=null;return _hc()}}
