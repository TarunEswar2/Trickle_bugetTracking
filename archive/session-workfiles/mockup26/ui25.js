/* ===== v25 (11 Oct, Tarun): one money model where the BALANCE is the master. Rules: docs/claude/v25_money_model.md =====
   Everything shown (week, later weeks, savings, to spend) is worked out from the ledger every time; nothing is stored twice.
   R1 Balance = start + money in − money out. Only "money in" or a sync can raise it.
   R2 Savings ≤ Balance. To spend = Balance − Savings.
   R3 To spend = in your weeks (plans) + not in your weeks. Plans only divide money that exists; they never create any.
   R4 This week = each plan's money left ÷ its weeks left, worked out at the start of the week or when money comes in.
   R5 A spend comes out of this week; past this week it comes out of later weeks; past all of to-spend it comes out of savings.
   R6 Sync: the typed number becomes the balance; savings stay inside it (lowered only if the bank has less); everything else is one new plan from today. */

const WK=7*DAY;
const sow=ts=>startOfWeek(new Date(ts)).getTime();
const wksLeft25=(from,end)=>Math.max(1,Math.round((sow(end)-sow(from))/WK)+1);
const outOf25=t=>isSp(t)||t.kind==='fixed'||t.kind==='goal'||!!t.bought;
const fromSav25=t=>{if(t.kind==='goal'||t.bought)return t.amt;const sd=(t.src&&t.src.savingsDetail)||{};return Object.keys(sd).reduce((a,k)=>a+(sd[k]||0),0)};
const _flexLeft0=flexLeft;

/* ---------- the ledger ---------- */
function init25(){const now=S.now.getTime(),sv=Math.max(0,savedTotal(S)),run=(S.incomes||[]).filter(i=>i.sp>0&&(!i.end||i.end+DAY>now));
 /* a person who planned money (onboarding or Add to balance): the plans are their incomes */
 if(run.length){const t0=Math.min(...run.map(i=>i.start));S.m25={t0,ids:new Set(S.txns.filter(t=>t.t<t0).map(t=>t.id)),a:Math.round(sv+run.reduce((x,i)=>x+i.sp,0)),ins:0,
  pools:run.map(i=>({id:i.id,amt:i.sp,start:i.start,end:i.end||null,label:'Added '+shortD(i.start)})),adj:[],reset:t0,seed:null};return}
 /* a demo profile with no incomes: its bank balance (or savings + this week's money) becomes one 4-week plan */
 const left0=Math.max(0,_flexLeft0(S)),W0=Math.max(0,S.flexW||0),B0=Math.max(sv+left0,Math.round(+(S.p&&S.p.bal)||0));
 S.m25={t0:now,ids:new Set(S.txns.map(t=>t.id)),a:B0,ins:0,pools:[],adj:[],reset:now,seed:planned()?{wk:wk0(),budget:W0}:null};
 if(B0-sv>0)S.m25.pools.push({id:'p0',amt:B0-sv,start:now,end:planned()?sow(now)+6*DAY+3*WK:null,label:'Your money',seed:1})}
function M25(){if(!S)return null;if(!S.m25)init25();const A=S.m25,now=S.now.getTime(),ws=wk0();
 const outs=S.txns.filter(t=>!A.ids.has(t.id)&&outOf25(t)).slice().sort((a,b)=>a.t-b.t);
 const B=Math.round(A.a+A.ins-outs.reduce((x,t)=>x+t.amt,0));
 const Sv=Math.min(Math.max(B,0),Math.max(0,Math.round(savedTotal(S)))),Sp=B-Sv;
 /* allocate every spend (minus what came from savings) to the plans, in time order, earliest-ending plan first.
    A spend that no plan can cover is a debt; the next money in pays it first. */
 const P=A.pools.map(p=>Object.assign({},p,{rem:p.amt,remAtReset:p.amt,adjAtStart:0}));
 const reset=Math.max(ws,A.reset);
 const evs=outs.filter(t=>!t.bought&&t.kind!=='goal').map(t=>({t:t.t,amt:t.amt-fromSav25(t),k:1})).concat(A.adj.map(e=>({t:e.t,amt:e.amt,k:1}))).concat(P.map(p=>({t:p.start,p,k:0}))).sort((a,b)=>a.t-b.t||a.k-b.k);
 let debt=0;
 evs.forEach(e=>{if(e.k===0){const c=Math.min(debt,e.p.rem);e.p.rem-=c;debt-=c;if(e.t<reset)e.p.remAtReset-=c;else e.p.adjAtStart+=c;return}
  let x=e.amt;const live=P.filter(p=>p.start<=e.t&&p.rem>0).sort((a,b)=>((a.end==null||a.end+DAY<=e.t)?1:0)-((b.end==null||b.end+DAY<=e.t)?1:0)||((a.end||9e15)-(b.end||9e15)));
  for(const p of live){if(x<=0)break;const c=Math.min(x,p.rem);p.rem-=c;if(e.t<reset)p.remAtReset-=c;x-=c}
  debt+=Math.max(0,x)});
 /* this week's money (R4) */
 const active=P.filter(p=>p.end!=null&&p.end+DAY>now&&p.start<=Math.max(now,A.reset));
 let budget;
 if(A.seed&&A.seed.wk===ws&&A.reset===A.t0){budget=A.seed.budget}
 else{const bases=active.map(p=>Math.max(0,p.start>=reset?p.amt-p.adjAtStart:p.remAtReset)),bt=bases.reduce((x,v)=>x+v,0)||1,R=reserve26(reset,Math.max(0,...active.map(p=>p.end)))+S.txns.filter(t=>t.kind==='fixed'&&t.t>=reset&&!A.ids.has(t.id)).reduce((x,t)=>x+t.amt,0);
  /* subscriptions due before the plans end are held back first, shared across the plans by size (gap 1) */
  budget=Math.round(active.reduce((x,p,i)=>x+Math.max(0,bases[i]-R*bases[i]/bt)/wksLeft25(Math.max(reset,p.start),p.end),0))}
 const spentFrom=(A.seed&&A.seed.wk===ws&&A.reset===A.t0)?ws:reset;
 const spent=Math.round(S.txns.filter(t=>t.t>=spentFrom&&outOf25(t)&&!t.bought&&t.kind!=='fixed'&&(t.t>=A.t0||spentFrom<A.t0)).reduce((x,t)=>x+t.amt-fromSav25(t),0)+A.adj.filter(e=>e.t>=spentFrom).reduce((x,e)=>x+e.amt,0));
 const inWeeks=Math.round(active.reduce((x,p)=>x+p.rem,0));
 let left=Math.max(0,Math.min(budget-spent,inWeeks,Sp));
 const room=Math.max(0,Math.min(inWeeks,Math.max(Sp,0))-left),held=Math.min(room,active.length?reserve26(now,Math.max(...active.map(p=>p.end))):0),later=room-held,loose=Math.max(0,Sp-inWeeks);
 return {B,Sv,Sp,budget,spent,left,inWeeks,later,held,loose,pools:P,active,reset,ok:Math.abs(Sv+Sp-B)<1}}

/* every screen reads the same numbers */
{const _r=render;render=function(){if(S&&S.cats){const m=M25();if(m){S.planSet=S.planSet||m.active.length>0;S.wallet=true;S.cats.forEach(c=>{c.amt=0;c.left=0;c.full=0});
 S.flexW=S.W=S.bufAmt=S.bufFull=m.budget;S.bufLeft=m.left;S.weekFrom=m.reset>wk0()?m.reset:wk0()}}return _r.apply(this,arguments)}}
flexLeft=function(S0){const m=M25();return m?m.left:0};

/* money in: every add becomes a plan (or loose money if no end date), and this week is worked out again (R4) */
{const _ai=addIncome;addIncome=function(d,withEnd){if(!S.m25)init25();const r=_ai(d,withEnd);const A=S.m25,now=S.now.getTime();A.ins+=r.a;
 if(r.sp>0)A.pools.push({id:'p'+(S.idc++),amt:r.sp,start:now,end:r.end||null,label:'Added '+shortD(now)});A.reset=now;return r}}
/* a spend: before the engine charges it, it may use all of to-spend, so savings are only touched past that (R5) */
{const _dp=doPay;doPay=function(S0,o){const m=M25();if(m){S0.bufLeft=Math.max(0,m.Sp);S0.cats.forEach(c=>c.left=0)}return _dp(S0,o)}}
/* moving money between savings and spending keeps the balance the same */
{const _mm=moveMoney;moveMoney=function(S0,from,to,amt){const m=M25();if(m&&from.type==='buffer'){S0.bufLeft=Math.max(0,m.Sp)}const sv0=savedTotal(S0);const r=_mm(S0,from,to,amt);const dv=savedTotal(S0)-sv0,now=S0.now.getTime();
 if(dv>0&&from.type==='buffer')S0.m25.adj.push({t:now,amt:dv});
 if(dv<0&&(to.type==='buffer'||to.type==='cat')){S0.m25.pools.push({id:'p'+(S0.idc++),amt:-dv,start:now,end:sow(now)+6*DAY,label:'From savings'});S0.m25.reset=now}
 return r}}

/* ---------- Home and Balance read the model ---------- */
bal23=function(){const m=M25();if(!m)return null;if(!planned()&&m.B===0)return null;return m.B};
balAdd23=function(){};
running24=()=>{const m=M25();return m?m.active.filter(p=>p.amt>0):[]};
incomeRow17=function(){const m=M25();if(!m||(!planned()&&m.B<=0))return '';
 return `<div class="bal23"><button class="l" data-a="push|bal24"><span class="sm">Balance</span><b>${money(m.B)}</b><small class="mut" style="font-size:12.5px;margin-top:2px">Savings ${money(m.Sv)} · To spend ${money(m.Sp)}</small></button><button class="add" data-a="addmoney17">${PLUS21}<span>Add</span></button></div>`};
SCREENS.bal24=()=>{const m=M25(),now=S.now.getTime();
 const row=p=>{const tot=Math.max(1,p.end-p.start),pr=Math.max(0,Math.min(1,(now-p.start)/tot)),wl=wksLeft25(now,p.end);
  return `<div class="rb24"><div class="row sp" style="align-items:baseline"><b>${money(p.rem)} <span class="sm" style="font-weight:500">left of ${money(p.amt)}</span></b></div>
  <div class="sm" style="margin-top:2px">${esc(p.label||'Plan')} · until Sun ${shortD(p.end)} · ${wl} week${wl>1?'s':''} left</div>
  <div class="tl24"><i style="width:${(pr*100).toFixed(1)}%"></i></div><div class="row sp mut" style="font-size:12.5px;margin-top:5px"><span>${shortD(p.start)}</span><span>about ${money(p.rem/wl)} a week</span></div></div>`};
 const line=(c,l,v,s)=>`<div class="ln25"><i style="background:${c}"></i><span>${l}${s?`<small>${s}</small>`:''}</span><b>${money(v)}</b></div>`;
 return back17('Home')+`<div class="title" style="margin-bottom:2px">Balance</div><div class="sm">What should be in your bank</div>
 <div class="hero" style="font-size:52px;margin-top:10px">${m.B<0?'−'+money(-m.B):money(m.B)}</div>${m.B<0?`<div class="note20"><i style="background:${ST20.out.c}"></i>You have spent ${money(-m.B)} more than you had. Add money or sync with your bank.</div>`:''}
 <div class="sb24"><i style="flex:${Math.max(m.Sv,1)};background:${SAVE}"></i><i style="flex:${Math.max(m.left,1)};background:${SPEND}"></i>${m.later?`<i style="flex:${m.later};background:color-mix(in srgb,${SPEND} 45%,#2A2D33)"></i>`:''}${m.loose?`<i style="flex:${m.loose};background:#5A606A"></i>`:''}</div>
 <div class="col" style="margin-top:14px">${line(SAVE,'Savings',m.Sv)}${line(SPEND,'Left this week',m.left,`of ${money(m.budget)}`)}${line(`color-mix(in srgb,${SPEND} 45%,#2A2D33)`,'Later weeks',m.later)}${m.loose?line('#5A606A','Not in any week yet',m.loose):''}
 <div class="ln25 tot"><span>Balance</span><b>${money(m.B)}</b></div></div>
 ${m.loose>=1?`<div class="nd21" style="margin-top:16px"><b>${money(m.loose)} isn't in any week</b><div class="sm" style="margin-top:4px">From a plan that ended, or money added without a plan.</div><div class="row" style="gap:8px;margin-top:12px"><button class="btn s q" data-a="loose25|save">Put in savings</button><button class="btn s q" data-a="loose25|plan">Spread over 4 weeks</button></div></div>`:''}
 ${sec20('Running plans')}${m.active.length?`<div class="col" style="gap:10px">${m.active.map(row).join('')}</div>`:`<div class="sm">Nothing planned. Add money, or sync with your bank.</div>`}
 <div class="col" style="gap:10px;margin-top:26px"><button class="btn" data-a="sync24">Sync with my bank</button><button class="btn q" data-a="addmoney17">Add to balance</button></div>
 <div class="sm" style="margin-top:10px">Bank shows a different number? Sync, and Trickle starts again from it.</div><div style="height:40px"></div>`};
H.loose25=a=>{const m=M25(),now=S.now.getTime(),A=S.m25;let moved=0;
 /* take it out of the plans that hold it (ended plans, or money added without a plan) */
 A.pools.forEach(p=>{const mp=m.pools.find(q=>q.id===p.id);if(!mp||(p.end!=null&&p.end+DAY>now))return;const c=Math.max(0,mp.rem);p.amt-=c;moved+=c});
 moved=Math.round(moved);if(moved<1)return false;
 if(a[0]==='save'){S.free+=moved;say(`${money(moved)} put in savings.`)}else{A.pools.push({id:'p'+(S.idc++),amt:moved,start:now,end:sow(now)+6*DAY+3*WK,label:'Spread '+shortD(now)});A.reset=now;say(`${money(moved)} spread over 4 weeks.`)}
 return true};

/* ---------- sync (R6): start again from the bank's number ---------- */
function syncNums24(d){const m=M25(),X=amtOf(d.kp),sv=Math.max(0,savedTotal(S)),keep=Math.min(sv,X),sp=X-keep;
 if(!d.end)setWeeks20(d,m&&m.active.length?wksLeft25(S.now.getTime(),Math.max(...m.active.map(p=>p.end))):4);
 const end=snapEnd(d.end),wl=wksLeft25(S.now.getTime(),end),days=daysIn(day0(),end),wk=Math.round(sp/wl);return {X,sv,keep,cut:sv-keep,sp,end,days,wk,was:m?m.B:null,diff:m?X-m.B:null}}
H.sync24go=()=>{const d=UI.flow.d,n=syncNums24(d),now=S.now.getTime();
 let cut=n.cut;if(cut>0)cutSavings26(cut);
 S.m25={t0:now,ids:new Set(S.txns.map(t=>t.id)),a:n.X,ins:0,pools:n.sp>0?[{id:'p'+(S.idc++),amt:n.sp,start:now,end:n.end,label:'From your bank, '+shortD(now)}]:[],adj:[],reset:now,seed:null};
 S.planSet=true;S.touched=false;S.moneyIn.unshift({id:'m'+(S.idc++),t:now,label:'Synced with bank',amt:n.X,note:`${money(n.keep)} savings, ${money(n.sp)} to spend`});
 logE(S,`Synced with bank: ${money(n.X)}`);closeFlow();UI.tab='home';UI.stack=[];render();say(`Synced. ${money(M25().budget)} for this week.`);return false};
/* the sync plan screen says the weekly amount the model will use */
{const _f=FLOWS.sync24;FLOWS.sync24=F=>_f(F).replace(/(\d|,)+ ÷ \d+ days/,m=>m).replace('This week starts fresh from today.','This week gets a full share. Spends before today are already out of your bank.')}

/* onboarding: a new person starts from nothing; their bank balance is the first money in */
{const _o=H.obm;H.obm=a=>{const r=_o(a);const now=S.now.getTime();S.free=0;S.goals.forEach(g=>{g.saved=0});S.m25={t0:now,ids:new Set(S.txns.map(t=>t.id)),a:0,ins:0,pools:[],adj:[],reset:now,seed:null};return r}}

/* ---------- self-check, shown in the side panel (and used by tests) ---------- */
function check25(){const m=M25();if(!m)return [];const e=[];const near=(a,b)=>Math.abs(a-b)<=1.5;
 if(!near(m.Sv+m.Sp,m.B))e.push('savings + to spend ≠ balance');
 if(m.Sv>Math.max(m.B,0)+1)e.push('savings > balance');
 if(m.left>Math.max(m.Sp,0)+1)e.push('this week > to spend');
 if(m.Sp>=0&&!near(m.left+m.later+(m.held||0)+m.loose,m.Sp))e.push('week + later + held + loose ≠ to spend');
 if(m.inWeeks>Math.max(m.Sp,0)+1)e.push('plans hold more than to spend');
 if(m.Sv<0||m.left<0)e.push('negative');if(m.B<0&&m.Sv>0)e.push('overdrawn but savings left');return e}
window.check25=check25;

/* other ways savings can change: the week-end "save what's left", one-off money, an old-style income */
function svMove25(fn){return function(){const sv0=savedTotal(S),r=fn.apply(this,arguments),dv=savedTotal(S)-sv0;if(S.m25&&dv>0)S.m25.adj.push({t:S.now.getTime(),amt:dv});return r}}
applyPending=svMove25(applyPending);weekEnd=svMove25(weekEnd);
{const _oo=H.oosave;if(_oo)H.oosave=a=>{const v=amtOf(UI.flow.d.kp);if(S.m25)S.m25.ins+=v;return _oo(a)}}
{const _ni=applyNewIncome;applyNewIncome=function(S0,o){const r=_ni(S0,o);if(S0.m25){const now=S0.now.getTime();S0.m25.ins+=o.amount;const sp=o.amount-o.savings;if(sp>0)S0.m25.pools.push({id:'p'+(S0.idc++),amt:sp,start:now,end:sow(now)+6*DAY+Math.max(0,Math.round(o.lasts)-1)*WK,label:'New income'});S0.m25.reset=now}return r}}
/* paying more than the balance: say so before it happens */
{const _sc=scanConfirm;scanConfirm=function(F){let h=_sc(F);const m=M25(),a=amtOf(F.d.kp);if(m&&a>Math.max(m.B,0))h=h.replace('<div class="mfoot">',`<div class="note20" style="position:absolute;left:22px;right:22px;bottom:96px"><i style="background:${ST20.out.c}"></i>That is more than your balance (${money(Math.max(m.B,0))}).</div><div class="mfoot">`);return h}}
