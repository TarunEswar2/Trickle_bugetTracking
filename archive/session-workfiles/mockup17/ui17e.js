/* ===== v17.8 (9 Oct): Move money from savings. Spend (this week, or spread to a date) or another goal. No categories.
   A goal that reaches its target is nudged: buy your item, or raise the goal. ===== */
const topUp=x=>{S.bufAmt+=x;if(S.bufFull!=null)S.bufFull+=x;S.flexW=(S.flexW||0)+x;S.weekTop=(S.weekTop||0)+x};
function releaseSched(){(S.sched=S.sched||[]).forEach(s=>{if(s.held<=0)return;const r=Math.min(s.per,s.held);s.held-=r;S.bufLeft+=r;topUp(r)});S.sched=S.sched.filter(s=>s.held>0)}
{const _ad=advanceDays;advanceDays=function(S0,n){for(let i=0;i<n;i++){const cur=startOfWeek(S0.now).getTime(),nxt=startOfWeek(new Date(S0.now.getTime()+DAY)).getTime();
  if(nxt!==cur&&S0.weekTop){S0.bufFull=(S0.bufFull==null?null:S0.bufFull-S0.weekTop);S0.flexW-=S0.weekTop;S0.weekTop=0}
  _ad(S0,1);if(nxt!==cur)releaseSched()}}}
const MV_END=()=>snapEnd(day0()+27*DAY);
const _mvOld=FLOWS.move;
FLOWS.move=F=>{if(F.step===1)return _mvOld(F);const d=F.d,src=d.from;if(!d.dest){d.dest='spend';d.when='week';d.tab='s'}
 const have=Math.floor(src.type==='free'?S.free:S.goals.find(g=>g.id===src.id).saved),sname=src.type==='free'?'Free savings':S.goals.find(g=>g.id===src.id).name,amt=amtOf(d.kp),over=amt>have;
 const end=snapEnd(d.end||MV_END()),weeks=Math.max(1,Math.round((end+DAY-wk0())/(7*DAY))),per=amt?Math.max(1,Math.round(Math.min(amt,have)/weeks)):0,t0=day0();
 const goals=moveTiles({from:src,tab:'s'});
 const where=d.dest==='spend'?`<div class="cap" style="margin:12px 0 6px">When</div><div class="row" style="gap:8px"><button class="chip ${d.when==='week'?'on':''}" data-a="mwhen|week">This week</button><button class="chip ${d.when==='date'?'on':''}" data-a="mwhen|date">Spread to a date</button></div>
   ${d.when==='date'?`<div class="sub" style="margin:10px 0 8px">Until <b style="color:var(--ink)">${fmtDate(end)}</b>${amt?`. About ${money(per)} a week.`:''}</div>${calHtml(d,t0,end)}`:`<div class="sub" style="margin:10px 0">All of it is added to this week.</div>`}`
  :`<div class="cap" style="margin:12px 0 6px">Which goal?</div><div class="tgrid">${goals.map(t=>{const on=d.toK===t.k;return `<button class="tile ${on?'on':''}" style="${on?`border-color:${t.col}`:''}" data-a="mto|${t.k}|s"><b><i style="background:${t.col}"></i>${esc(t.n)}</b><small style="color:${SAVE}">${t.w}</small></button>`}).join('')||'<div class="sm">No other goals yet.</div>'}</div>`;
 const ok=amt&&(d.dest==='spend'||d.toK);
 return `<div class="mbody"><button class="back" data-a="mclose">‹ Close</button><div class="cap">Move money</div>
 <div class="card" style="padding:10px 14px;margin:6px 0 10px"><div class="cap" style="font-size:10.5px">From</div><b><i style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${SAVE};margin-right:8px"></i>${esc(sname)} · ${money(have)} saved</b></div>
 <div class="title" style="font-size:44px">₹ ${d.kp||'0'}</div><div class="sm" style="margin-bottom:10px;${over?'color:var(--amber);font-weight:700':''}">${over?`${esc(sname)} has ${money(have)} saved.`:`Most you can move: ${money(have)}`}</div>
 <div class="cap" style="margin:8px 0 6px">Move it to</div><div class="row" style="gap:8px"><button class="chip ${d.dest==='spend'?'on':''}" data-a="mdest|spend">Spend</button><button class="chip ${d.dest==='goal'?'on':''}" data-a="mdest|goal">Another goal</button></div>
 ${where}<div style="height:12px"></div>${keypad('kp')}</div><div class="mfoot"><button class="btn ${ok?'':'d'}" ${ok?'data-a="mdo"':''}>${over&&have?'Move '+money(have):'Move '+(amt?money(amt):'')}</button></div>`};
H.mdest=a=>{const d=UI.flow.d;d.dest=a[0];d.toK=null;d.to=null;d.tab='s'};
H.mwhen=a=>{const d=UI.flow.d;d.when=a[0];if(a[0]==='date'&&!d.end){d.end=MV_END();const e=new Date(d.end),n=new Date(day0());d.cm=(e.getFullYear()-n.getFullYear())*12+e.getMonth()-n.getMonth()}};
{const _mdo=H.mdo;H.mdo=()=>{const F=UI.flow,d=F.d;if(d.dest!=='spend')return _mdo();const src=d.from,have=Math.floor(src.type==='free'?S.free:S.goals.find(g=>g.id===src.id).saved),amt=Math.min(amtOf(d.kp),have);if(!amt)return false;
 const got=moveMoney(S,src,{type:'buffer'},amt),lines=[];let toName;
 if(d.when==='date'){const end=snapEnd(d.end||MV_END()),weeks=Math.max(1,Math.round((end+DAY-wk0())/(7*DAY))),per=Math.max(1,Math.round(got/weeks)),now=Math.min(per,got),held=got-now;
  S.bufLeft-=held;topUp(now);if(held>0)(S.sched=S.sched||[]).push({id:'sc'+(S.idc++),held,per,until:end});toName='Spending until '+fmtDate(end);lines.push(`${money(per)} a week until ${fmtDate(end)}.`);lines.push(`This week gets ${money(now)}.`)}
 else{topUp(got);toName='Spending this week';lines.push(`This week has ${money(got)} more.`)}
 if(src.type==='goal'){const g=S.goals.find(x=>x.id===src.id);lines.push(gThere(g))}
 d.res={got,toName,lines};d.to={type:'buffer'};F.step=1}}
/* a goal is moved from, not added to */
{const _sg2=SCREENS.goal;SCREENS.goal=p=>{let h=_sg2(p);const g=S.goals.find(x=>x.id===p.id);if(!g)return h;
 h=h.replace('data-a="movefrom|'+g.id+'">Add money</button>','data-a="movefrom|'+g.id+'">Move money</button>');
 if(g.state==='reached')h=h.replace('data-a="gdone|'+g.id+'">Mark done</button>','data-a="gdone|'+g.id+'">I bought it</button><button class="btn q" data-a="sheet|goaledit|'+J({id:g.id}).replace(/\|/g,'')+'">Raise the goal</button>');
 if(g.state==='reached')h=h.replace('You saved it all.</div>','You saved it all. Buy your item, or raise the goal.</div>');
 h=h.replace('‹ Money','‹ Savings');
 if(!(g.target>0))h=h.replace('<div class="col" style="gap:10px"><button class="btn" data-a="movefrom','<button class="li" style="margin-bottom:14px" data-a="sheet|goaledit|'+J({id:g.id,tgt:1}).replace(/\|/g,'')+'"><span class="n">Set a target</span><span class="t">optional ›</span></button><div class="col" style="gap:10px"><button class="btn" data-a="movefrom');
 return h}}
/* Home: a reached goal comes first */
{const _c3=cards17;cards17=function(){const out=_c3(),r=S.goals.filter(g=>g.state==='reached');if(!r.length)return out;const g=r[0];
  return [{tag:'Goal reached',t:`${g.name}: you saved ${money(g.target)}.`,sub:'Buy your item, or raise the goal.',a:'push|goal|'+J({id:g.id}).replace(/\|/g,''),cta:'Choose',hot:true},...out].slice(0,7)}}

/* savings tab: money that is on its way to spending */
{const _ms2=mnSav;mnSav=function(){const held=(S.sched||[]).reduce((a,x)=>a+x.held,0);return (held>0?`<div class="sm" style="margin:0 2px 12px">${money(held)} is waiting to be added to spending, week by week.</div>`:'')+_ms2()}}

/* ===== v17.9 (10 Oct): tap the save or spend amount and type it ===== */
{const _fi3=FLOWS.inc;FLOWS.inc=F=>{let h=_fi3(F);if(F.step!==1)return h;
  h=h.replace(/<div id="inc-sav" class="h2">([^<]*)<\/div>/,'<button id="inc-sav" class="h2 tapamt" data-a="incedit|sav">$1</button>').replace(/<div id="inc-sp" class="h2">([^<]*)<\/div>/,'<button id="inc-sp" class="h2 tapamt" data-a="incedit|sp">$1</button>');
  return h.replace('<span>Nothing</span><span>All of it</span></div>','<span>Nothing</span><span>All of it</span></div><div class="sm" style="text-align:center;margin-top:10px">Tap an amount to type it.</div>')}}
H.incedit=a=>{UI.flow.d.ev='';openSheet('amtedit',{which:a[0]});return false};
SHEETS.amtedit=p=>{const d=UI.flow.d,t=amtOf(d.kp),sav=savCalc(d,t,d.pct===undefined?20:d.pct),cur=p.which==='sav'?sav:t-sav,v=amtOf(d.ev);
 return `<div class="cap">Of ${money(t)}</div><div class="title" style="font-size:26px;margin:2px 0 6px">${p.which==='sav'?'How much to save?':'How much to spend?'}</div><div class="field" style="font-size:32px">₹ ${d.ev||`<span style="color:var(--ink3)">${cur}</span>`}</div>${v>t?`<div class="sm" style="color:var(--amber);margin-top:6px">That is more than ${money(t)}. It will be ${money(t)}.</div>`:`<div class="sm" style="margin-top:6px">${v?(p.which==='sav'?`Then ${money(t-v)} is for spending.`:`Then ${money(t-v)} is saved.`):'Type a number, or tap Cancel.'}</div>`}${keypad('ev')}<div class="col" style="gap:8px;margin-top:10px"><button class="btn ${d.ev!==''?'':'d'}" data-a="${d.ev!==''?'amtdone|'+p.which:'x'}">Done</button><button class="btn q" data-a="closesheet">Cancel</button></div>`};
H.amtdone=a=>{const d=UI.flow.d,t=amtOf(d.kp),v=Math.min(t,amtOf(d.ev)),sav=a[0]==='sav'?v:t-v;d.savX=sav;d.pct=t?Math.round(sav/t*100):0;d.ev='';UI.sheet=null};

/* ===== v17.10 (10 Oct): limits live under the insight cards: recommended limits (one tap) and quick limits ===== */
{const _car=carousel17;carousel17=function(){const c=cards17().filter(x=>x.tag!=='Limit');if(!c.length)return '';
  return `<div class="car17" id="car17">${c.map(x=>`<button class="cd17${x.hot?' hot':''}" data-a="${x.a}"><span class="tg">${x.tag}</span><b>${esc(x.t)}</b>${x.sub?`<span class="sb">${esc(x.sub)}</span>`:''}${x.mini||''}${x.cta?`<span class="go">${x.cta} ›</span>`:''}</button>`).join('')}</div>${c.length>1?`<div class="dots17" id="dots17">${c.map((_,i)=>`<i class="${i?'':'on'}"></i>`).join('')}</div>`:''}`}}
const limLabel17=(kind,cap)=>kind==='times'?`${cap} ${cap===1?'visit':'visits'} a week`:`${money(cap)} a week`;
function limitsHome17(){if(!planned())return '';const now=S.now.getTime(),sg=suggestions(),shopSg=sg.filter(x=>x.scope==='shop').slice(0,1);
 const wk=catTotals(now-7*DAY,now+1),mo=catTotals(now-30*DAY,now+1),wT=sumAmt(wk)||1,mT=sumAmt(mo)||1,byM={};mo.forEach(r=>byM[r.id]=r.amt);
 const recIds=new Set(sg.filter(x=>x.scope==='cat').map(x=>x.ref));
 const rows=wk.filter(r=>r.id!=='_u'&&r.amt>0&&!(S.limits||[]).some(l=>l.scope==='cat'&&l.ref===r.id)&&!S.limNo['c'+r.id]).sort((a,b)=>(recIds.has(b.id)-recIds.has(a.id))||b.amt-a.amt).slice(0,3);
 const cat=rows.map(r=>{const m=byM[r.id]||r.amt;return `<div class="card" style="padding:12px 14px;margin-top:10px"><div class="cap" style="margin:0 0 4px">Recommended</div><b style="font-size:17px">${esc(catName(r.id))}: set a limit</b>
  <div class="row" style="gap:10px;margin-top:10px"><div style="flex:1"><div class="cap" style="margin:0">This week</div><div style="font-weight:700;font-size:17px">${money(r.amt)}</div><div class="sm">${pct0(r.amt/wT)}% of spending</div></div><div style="flex:1"><div class="cap" style="margin:0">This month</div><div style="font-weight:700;font-size:17px">${money(m)}</div><div class="sm">${pct0(m/mT)}% of spending</div></div></div>
  <div class="row" style="gap:8px;margin-top:12px"><button class="btn s" style="flex:2" data-a="limset|cat|${r.id}|amt">Set a limit</button><button class="btn q s" style="flex:1" data-a="limno|c${r.id}">Not now</button></div></div>`}).join('');
 const shop=shopSg.map(s=>{const cap=limDefault(s.scope,s.ref,s.kind);return `<div class="card" style="padding:12px 14px;margin-top:10px"><div class="cap" style="margin:0 0 4px">Recommended</div><b style="font-size:17px">${esc(s.ref)}: set a limit</b><div class="sm" style="margin-top:2px">${esc(s.text)}</div><div class="row" style="gap:8px;margin-top:10px"><button class="btn s" style="flex:2" data-a="limquick|${s.key}">Set ${limLabel17(s.kind,cap)}</button><button class="btn q s" style="flex:1" data-a="limsug|${s.key}">Change</button></div></div>`}).join('');
 return cat||shop?`<div style="margin-top:6px">${cat}${shop}</div>`:''}
H.limquick=a=>{const s=suggestions().find(x=>x.key===a[0]);if(!s)return false;S.limits=S.limits.filter(l=>!(l.scope===s.scope&&l.ref===s.ref));S.limits.push({id:'l'+(S.idc++),scope:s.scope,ref:s.ref,kind:s.kind,cap:limDefault(s.scope,s.ref,s.kind)});say('Limit set.');return false};
H.limquickc=a=>{const id=a[0];if(!S.cats.some(c=>c.id===id))return false;S.limits=S.limits.filter(l=>!(l.scope==='cat'&&l.ref===id));S.limits.push({id:'l'+(S.idc++),scope:'cat',ref:id,kind:'amt',cap:limDefault('cat',id,'amt')});say(`Limit set for ${catName(id)}.`);return false};
