/* ===== v15: three questions, three tabs, one thing per screen =====
   Home = am I okay?   Spending = where did it go?   Money = what comes in and what is saved?
   Density budget (checked by archive/session-workfiles/audit/density.js): <=25 words, <=3 numbers, <=4 taps, one visual. */
window.TABS=[['home','Home'],['spending','Spending'],['money','Money'],['insights','Insights']];
window.TABALIAS={income:['money','inc'],savings:['money','sav']};
TABGLOW.spending='rose';TABGLOW.money='blue';TABGLOW.insights='violet';
const SEG=(opts,cur,act)=>`<div class="tabs2">${opts.map(o=>`<button class="${cur===o[0]?'on':''}" data-a="${act}|${o[0]}">${o[1]}</button>`).join('')}</div>`;
const planned=()=>S.planSet&&S.flexW>0;
const boxVal=t=>Math.max(1,Math.round(t/100));

/* ---------- Home: am I okay? ---------- */
function nextThing(){
 if(S.flags&&S.flags.linkLost)return {t:'Refresh your UPI link',a:'settings|acct',c:'amber'};
 if(S.pending.length)return {t:'Last week is ready',a:'openweek',c:'amber'};
 if(S.credits&&S.credits.length){const c=S.credits[0];return {t:money(c.amt)+' came in from '+c.from,a:'assign|'+c.id,c:'green'}}
 if(S.unsorted.length)return {t:S.unsorted.length+(S.unsorted.length>1?' payments need':' payment needs')+' a category',a:'push|sort',c:'amber'};
 const b=billSoon()[0];if(b)return {t:b,a:'goto|spending',c:'amber'};
 const pl=planned()?planLines()[0]:null;if(pl)return {html:pl};
 if(!planned())return {t:'Set your weekly amount',a:'startplan',c:'plan'};
 return null}
SCREENS.home=()=>{const nt=nextThing();let title,grid,cap;
 if(planned()){const [a]=homeSentence();const empty=flexL()<=0,r=flexL()/flexW();title=a;
  grid=gridHtml(empty?0:r*100,(typeof paceHex==='function')?paceHex():SPEND,0,SPEND,{w:300})+(empty?`<div style="height:3px;background:${AMBER};margin:8px 4px 0;border-radius:2px;box-shadow:0 0 14px ${AMBER}"></div>`:'');
  cap=`<span class="row sp" style="align-items:flex-end"><span><span class="hero" style="font-size:34px">${money(Math.max(0,flexL()))}</span><span class="sub" style="margin-left:8px">left</span></span><button class="chip" data-a="gridhow">1 box ≈ ${money(boxVal(flexW()))} ⓘ</button></span>`}
 else{const tot=wkTot(0),prev=wkTot(1);const scale=Math.max(100,Math.ceil(Math.max(tot,prev)/50)*50);const parts=S.cats.map((c,i)=>({amt:wkCat(c,0),color:catCol(i)})).filter(p=>p.amt>0);
  title=tot?money(tot)+' so far.':'A fresh week.';grid=parts.length?multiGrid(parts,scale,{w:300}):gridHtml(0,SPEND,0,0,{w:300});cap=tot?`<span class="row sp" style="align-items:flex-end"><span class="sub">spent this week</span><button class="chip" data-a="gridhow">1 box ≈ ${money(boxVal(scale))} ⓘ</button></span>`:''}
 const row=!nt?'':nt.html?nt.html:nt.c==='plan'?`<button class="li" style="padding:17px 18px;background:linear-gradient(135deg,rgba(140,243,206,.26),rgba(61,187,148,.2));border:1.5px solid #62DCB4;box-shadow:0 0 26px rgba(98,220,180,.3)" data-a="${nt.a}"><span class="n" style="font-size:18px;color:#8CF3CE"><b>Make your plan</b></span><span class="t" style="color:#8CF3CE">›</span></button>`
  :`<button class="li" data-a="${nt.a}"><span class="d" style="background:${nt.c==='green'?SAVE:'var(--amber)'}"></span><span class="n">${esc(nt.t)}</span><span class="t">›</span></button>`;
 return `<div class="row sp" style="margin-top:2px"><span class="cap">${fmtDay(S.now)}</span><button class="chip" data-a="settings">⚙</button></div>
 <div class="title" style="margin-top:12px;font-size:36px">${title}</div>
 <div style="margin:20px 8px 12px" data-a="gridhow">${grid}</div><div style="margin:0 10px 16px">${cap}</div>
 ${row}
 <div style="position:sticky;bottom:0;margin-top:22px;padding-top:10px;background:transparent"><button class="btn" data-a="pay">${payLabel()}</button></div>`};

/* ---------- Spending: where did it go? ---------- */
H.spseg=a=>{UI.sp=a[0];UI.pat=0;UI.spAll=false};
H.spall=()=>{UI.spAll=true};
H.v15bills=()=>{openSheet('billsum');return false};
function spCats(){const rows=S.cats.map((c,i)=>({c,i,v:wkCat(c,0)})).sort((a,b)=>b.v-a.v||a.i-b.i);const show=UI.spAll?rows:rows.slice(0,7);
 const mx=Math.max(1,...rows.map(r=>r.c.amt||r.v));
 const li=show.map(r=>{const c=r.c,col=catCol(r.i),pl=planned()&&c.amt>0;const pct=pl?Math.min(100,(c.amt-c.left)/c.amt*100):Math.min(100,r.v/mx*100);
  return `<button class="li" style="display:block;padding:12px 16px" data-a="push|${pl?'cat':'tcat'}|${J({id:c.id})}"><span class="row sp"><span class="n" style="flex:none"><i style="width:10px;height:10px;border-radius:50%;background:${col};display:inline-block;margin-right:10px"></i>${esc(c.name)}</span><span class="t">${pl?wordLeft(c.left,c.amt)+' left':r.v?money(r.v):''}</span></span><span style="display:block;height:5px;border-radius:3px;background:#171C25;margin-top:9px"><span style="display:block;height:5px;width:${Math.max(r.v||pl?4:0,pct)}%;border-radius:3px;background:${boxBg(col)}"></span></span></button>`}).join('');
 const more=rows.length>7&&!UI.spAll?`<button class="li" data-a="spall"><span class="n mut">Show all ${rows.length}</span><span class="t">›</span></button>`:'';
 const edit=planned()&&!S.wallet?`<button class="li" data-a="push|budget"><span class="n mut">Change how much each gets</span><span class="t">›</span></button>`:'';
 const bills=S.bills.length?`<button class="li" data-a="v15bills"><span class="d" style="background:${FIXC}"></span><span class="n">Subscriptions</span><span class="t">${S.bills.length} ›</span></button>`:'';
 return `<div class="col" style="gap:8px">${li}${more}${bills}${edit}</div>`}
var spHist=function(){const list=S.txns.slice(0,40);if(!list.length)return `<div class="title" style="font-size:22px">Nothing yet.</div>`;const groups={};list.forEach(t=>{const k=new Date(t.t).toDateString();(groups[k]=groups[k]||[]).push(t)});
 return Object.keys(groups).map(k=>{const d=new Date(k);const dl=Math.floor((new Date(S.now.toDateString())-d)/DAY);const name=dl===0?'Today':dl===1?'Yesterday':fmtDay(d);
  return `<div class="cap" style="margin:14px 0 6px">${name}</div><div class="col" style="gap:6px">${groups[k].map(t=>`<button class="li" data-a="push|txn|${J({id:t.id}).replace(/\|/g,'')}"><span class="d" style="${t.kind==='unsorted'?`border:1.5px dashed ${AMBER};background:none`:`background:${t.kind==='fixed'?FIXC:t.kind==='goal'?SAVE:t.kind==='oneoff'?'#B48CFF':catColor2(t.ref)}`}"></span><span class="n">${esc(t.payee)}${t.kind==='oneoff'?' <span class="mut" style="font-weight:500">· one-off</span>':''}</span><span class="a">${money(t.amt)}</span></button>`).join('')}</div>`}).join('')}
function patterns(){const out=[];const lim=S.now.getTime()-30*DAY;const tx=S.txns.filter(t=>t.t>=lim&&t.kind!=='fixed'&&t.kind!=='goal');
 if(tx.length>=5){const B=[['Morning',5,12,'in the morning'],['Afternoon',12,17,'in the afternoon'],['Evening',17,21,'in the evening'],['Night',21,29,'at night']];
  const sums=B.map(b=>tx.filter(t=>{let h=new Date(t.t).getHours();if(h<5)h+=24;return h>=b[1]&&h<b[2]}).reduce((a,t)=>a+t.amt,0));const mx=Math.max(...sums),i=sums.indexOf(mx);
  out.push({title:`Most of it goes out ${B[i][3]}.`,vis:`<div class="col" style="gap:12px;margin:26px 4px">${B.map((b,j)=>`<div><div class="row sp sm"><span style="${j===i?'color:var(--ink);font-weight:700':''}">${b[0]}</span></div><div style="height:12px;border-radius:6px;background:#171C25;margin-top:5px"><div style="height:12px;border-radius:6px;width:${Math.max(3,sums[j]/mx*100)}%;background:${j===i?boxBg(SPEND):'#3b4350'}"></div></div></div>`).join('')}</div>`})}
 const h=habits()[0];if(h){const sum=h.list.reduce((a,t)=>a+t.amt,0);out.push({title:`${esc(h.payee)}, ${h.n} times this month.`,sub:`${money(sum)} so far.`,vis:`<div class="row wrap" style="gap:8px;margin:30px 6px;justify-content:center">${h.list.slice(0,24).map(()=>`<i style="width:34px;height:34px;border-radius:8px;background:${boxBg(SPEND)}"></i>`).join('')}</div>`})}
 const frac=Math.min(1,((S.now-startOfWeek(S.now))/DAY+1)/7);const tw=Math.round(weekSpentAll(S,0,1)),lw=Math.round(weekSpentAll(S,1,frac));
 if(lw>0&&tw>0){const diff=tw-lw;const mx=Math.max(tw,lw,100);const t=Math.abs(diff)<Math.max(20,lw*.08)?'About the same as last week.':diff>0?money(diff)+' more than last week.':money(-diff)+' less than last week.';
  out.push({title:t,sub:'Same days, this week and last.',vis:`<div class="row" style="gap:14px;justify-content:center;margin:22px 0"><div style="width:130px;opacity:.5">${gridHtml(lw/mx*100,SPEND,0,SPEND,{fade:.5})}</div><div style="width:130px">${gridHtml(tw/mx*100,SPEND,0,SPEND)}</div></div>`})}
 return out}
function spPat(){const P=patterns();if(!P.length)return `<div class="title" style="font-size:24px">Not enough yet.</div><div class="sub" style="margin-top:8px">Patterns show after a few days of spending.</div>`;
 const i=(UI.pat||0)%P.length,p=P[i];return `<div class="title" style="font-size:26px;line-height:1.15">${p.title}</div>${p.sub?`<div class="sub" style="margin-top:6px">${p.sub}</div>`:''}${p.vis}${P.length>1?`<button class="btn q" data-a="patnext">Next ›</button>`:''}`}
H.patnext=()=>{UI.pat=(UI.pat||0)+1};
SCREENS.spending=()=>{const v=UI.sp||'cat';return `<div class="sec">${SEG([['cat','Categories'],['hist','History']],v,'spseg')}${v==='cat'?spCats():spHist()}</div>`};

/* ---------- Money: what comes in, what is saved ---------- */
H.mnseg=a=>{UI.mn=a[0]};
H.v15goal=()=>{openSheet('addgoal',{});return false};
SHEETS.v15inc=()=>`<div class="h2">Your incomes</div>${incomesHtml()}`;
H.v15incs=()=>{openSheet('v15inc');return false};
function mnInc(){const l=S.incomes||[];const now=S.now.getTime();const run=l.filter(i=>!i.end||i.end+DAY>now);
 const one=`<button class="li" data-a="oneoff"><span class="n mut">One-off money</span><span class="t">›</span></button>`;
 if(!l.length&&!planned())return `<div class="title">Pocket money & income.</div><div class="sub" style="margin:8px 0 22px">Money you get, like pocket money or a stipend.</div><button class="btn" data-a="v15addinc">Add income</button><div style="margin-top:12px">${one}</div>`;
 if(!l.length)return `<div class="title">${money(S.W)} a week to spend.</div><div class="sub" style="margin:8px 0 22px">Planned by hand.</div><button class="btn" data-a="v15addinc">Add income</button><div style="margin-top:12px">${one}</div>`;
 if(!run.length)return `<div class="title">Your income ended.</div><div class="sub" style="margin:8px 0 22px">Add more to keep a plan going.</div><button class="btn" data-a="v15addinc">Add income</button><div class="col" style="gap:8px;margin-top:12px"><button class="li" data-a="v15incs"><span class="n">Your incomes</span><span class="t">${l.length} ›</span></button>${one}</div>`;
 const wk=planned()?S.W:Math.round(planRate());const sav=run.reduce((a,i)=>a+i.sav,0),sp=run.reduce((a,i)=>a+i.sp,0),tot=Math.max(1,sav+sp),pct=Math.round(sav/tot*100);
 return `<div class="title">${wk>0?money(wk)+' a week to spend.':money(sp)+' to spend.'}</div><div style="margin:18px 12px 8px">${multiGrid([{amt:Math.max(0,sav),color:SAVE},{amt:Math.max(1,sp),color:SPEND}],tot,{w:250})}</div>
 <div class="row sp sm" style="margin:8px 12px 20px"><span><i style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${SAVE};margin-right:6px"></i>Saving ${pct}%</span><span><i style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${SPEND};margin-right:6px"></i>Spending ${100-pct}%</span></div>
 <button class="btn" data-a="v15addinc">Add income</button><div class="col" style="gap:8px;margin-top:12px"><button class="li" data-a="v15incs"><span class="n">Your incomes</span><span class="t">${l.length} ›</span></button>${one}</div>`}
function mnSav(){const act=S.goals.filter(g=>g.state!=='done');
 if(!act.length&&S.free<=0)return `<div class="title" style="margin-top:6px">Saving for something?</div><div class="sub" style="margin:8px 0 22px">Name it. Pick an amount.</div><button class="btn" data-a="v15goal">Add a goal</button>`;
 const sv=act.reduce((a,g)=>a+Math.min(g.saved,g.target),0)+Math.max(0,S.free);
 return `<div class="title">${money(sv)} saved.</div>${act.length?`<div style="display:flex;justify-content:center;margin:12px 0">${segRing(S.goals,240)}</div>`:''}<div class="col" style="gap:8px">${act.slice(0,3).map(g=>`<button class="li" data-a="push|goal|${J({id:g.id})}"><span class="n">${esc(g.name)}</span><span class="t">${Math.round(Math.min(1,g.saved/g.target)*100)}%</span></button>`).join('')}<button class="btn q" data-a="v15goal">+ Add a goal</button></div>`}
SCREENS.money=()=>{const v=UI.mn||'inc';return `<div class="sec">${SEG([['inc','Income'],['sav','Savings']],v,'mnseg')}${v==='inc'?mnInc():mnSav()}</div>`};

/* ---------- Making a plan is adding income ---------- */
const _incFlow=FLOWS.inc;
FLOWS.inc=F=>{const d=F.d;
 if(F.step===2){const a=amtOf(d.kp),pct=d.pct===undefined?20:d.pct,sp=a-savCalc(d,a,pct);const t0=day0(),end=snapEnd(d.end||presetEnd(PRESETS[1])),days=daysIn(t0,end),wk=Math.max(5,r5b(sp/days*7));
  return `<div class="mbody"><button class="back" data-a="incback">‹ Back</button><div class="title" style="margin-top:8px">How many days should this money last?</div>
  <div class="row wrap" style="gap:8px;margin:16px 0 10px">${PRESETS.map((p,i)=>`<button class="chip ${!d.cal&&end===presetEnd(p)?'on':''}" data-a="incpre|${i}">${p[0]}</button>`).join('')}<button class="chip ${d.cal?'on':''}" data-a="v15cal">Pick a date</button></div>
  ${d.cal?`<div class="sub" style="text-align:center;margin:0 0 8px">${money(wk)} a week · until ${fmtDate(end)}</div>${calHtml(d,t0,end)}`:`<div style="text-align:center;margin-top:30px"><div style="display:flex;justify-content:center">${amtDots(money(wk))}</div><div class="sub">a week to spend</div></div>`}</div>
  <div class="mfoot"><button class="btn" data-a="incfinish">Done</button></div>`}
 let h=_incFlow(F);return h.replace(/<p class="sub">The rest is for spending\. Change it any time\.<\/p>/,'')};
H.v15cal=()=>{const d=UI.flow.d;d.cal=!d.cal};
H.incpre=(_p=>a=>{UI.flow.d.cal=false;return _p(a)})(H.incpre);
function makePlanFromIncome(r){const wk=Math.max(5,r5b(r.sp/daysIn(day0(),r.end)*7));UI.flow=null;
 startUpgrade({s:'done',qW:wk,balN:Math.round(wk*4.3),lasts:4.3,sav:0,fromInc:true,share:'eq',amts:{},bills:S.bills.map(b=>[b.name,b.amt,b.every,b.dueDay,b.nextDue]),qB:S.bills.map(b=>b.name),limits:true,noBal:true,method:'none',pin:APP_PIN||''});H.obfinish()}
H.incfinish=()=>{const d=UI.flow.d;if(!d.end)d.end=presetEnd(PRESETS[1]);const r=addIncome(d,true);
 if(planned()){recomputePlan(true);closeFlow();say('Added. Your week is '+money(S.W)+' a week.')}else{makePlanFromIncome(r);say('Your week is '+money(S.W)+' a week.')}return false};
H.startplan=()=>{openFlow('inc',{step:0,kp:''});return false};

/* ---------- onboarding is two questions; everything else is asked when it matters ---------- */
H.obverify=a=>{const d=obD();if(a[0]==='fail'){d.fail=true;return}d.fail=false;d.s='cats'};
const _ar=window.afterRender;
window.afterRender=()=>{if(_ar)_ar();
 if(!S||!UI||UI.flow||UI.popup||UI.sheet||UI.stack.length||UI.tab!=='home')return;
 if(S.p.key==='O'&&!APP_PIN&&S.txns.length>=3&&!(S.asked&&S.asked.pin)&&!(S.askedAt&&S.askedAt.pin))openAsk('pin')};

/* ---------- Pay: one question per screen (how much, then for what, then confirm) ---------- */
const _payFlow=FLOWS.pay;
FLOWS.pay=F=>{const d=F.d;if(F.step>0)return _payFlow(F);
 const amt=amtOf(d.kp),back=`<button class="back" data-a="pclose">‹ Close</button>`;
 if(!d.ask)return `<div class="mbody">${back}<div class="cap">${payLabel()}</div><div class="title" style="margin-top:4px">How much?</div><div style="margin:10px 0;display:flex;justify-content:center">${amtDots('₹'+(d.kp||'0'))}</div>${keypad('kp')}</div><div class="mfoot"><button class="btn ${amt?'':'d'}" data-a="${amt?'payask':'x'}">Next</button></div>`;
 const pl=planned(),sav=pl&&d.tab==='s';const cid=d.cid||(d.target&&d.target.id);
 const tiles=(pl?payTiles(d).filter(x=>sav||S.cats.some(c=>c.id===x.k)||x.k==='__more'):[]);
 const ok=pl?!!d.target:!!cid;
 const grid=pl?tiles.map(x=>{const on=d.toK===x.k;return `<button class="tile ${on?'on':''}" style="${on?`border-color:${x.col};background:${x.col}22`:''}" data-a="pto|${x.k}"><b><i style="background:${x.col}"></i>${esc(x.n)}</b></button>`}).join('')
  :S.cats.map((c,i)=>`<button class="tile ${cid===c.id?'on':''}" style="${cid===c.id?`border-color:${catCol(i)};background:${catCol(i)}18`:''}" data-a="tpick|${c.id}"><b><i style="background:${boxBg(catCol(i))}"></i>${esc(c.name)}</b></button>`).join('')+`<button class="tile" data-a="tmore"><b>+ Other</b></button>`;
 return `<div class="mbody"><button class="back" data-a="payback">‹ Back</button><div class="cap">${money(amt)}</div><div class="title" style="margin-top:4px">For what?</div><div class="tgrid" data-sc style="margin-top:14px;max-height:430px;overflow:auto">${grid}</div>${pl&&(S.goals.length||S.free>0)?`<div style="margin-top:12px"><button class="chip" data-a="ptab|${sav?'b':'s'}">${sav?'From my week':'From savings'}</button></div>`:''}<div style="height:90px"></div></div>
 <div class="mfoot"><button class="btn ${ok?'':'d'}" data-a="${ok?(pl?'pnext':'tadd'):'x'}">${ok?(pl?'Next':'Add '+money(amt)):'Pick one'}</button></div>`};
H.payask=()=>{UI.flow.d.ask=true};H.payback=()=>{UI.flow.d.ask=false};
H.tmore=()=>{openSheet('catpick',{act:'tpay',arg:'x'});return false};

/* ---------- Week review: what happened, then (if you want) by category ---------- */
POPUPS.weekreview=P=>{const w0=P.week,w1=w0+7*DAY;const tx=S.txns.filter(t=>t.t>=w0&&t.t<w1&&t.kind!=='fixed'&&t.kind!=='oneoff');
 const ideal=P.snap.reduce((a,s)=>a+s[2],0)+(P.bufAmt||0)||1,act=Math.round(tx.reduce((a,t)=>a+t.amt,0)),over=act>ideal*1.1;
 if(P.cat){const rows=P.snap.map(s=>({name:s[1],ideal:s[2],act:Math.round(tx.filter(t=>t.kind==='cat'&&t.ref===s[0]).reduce((a,t)=>a+t.amt,0))})).filter(r=>r.ideal>0||r.act>0).sort((a,b)=>Math.max(b.ideal,b.act)-Math.max(a.ideal,a.act)).slice(0,6);
  const bar=r=>{const m=Math.max(r.ideal,r.act,1);const g=Math.min(r.act,r.ideal)/m*100,a=Math.max(0,r.act-r.ideal)/m*100,t=r.ideal/m*100;return `<div style="position:relative;height:10px;border-radius:5px;background:#171C25;margin-top:6px"><span style="position:absolute;left:0;top:0;bottom:0;width:${g}%;border-radius:5px 0 0 5px;background:${boxBg('#5FE3B8')}"></span><span style="position:absolute;left:${g}%;top:0;bottom:0;width:${a}%;border-radius:0 5px 5px 0;background:${boxBg('#F4A261')}"></span><span style="position:absolute;left:calc(${t}% - 1px);top:-3px;bottom:-3px;width:2px;background:#F5F7FA;border-radius:1px"></span></div>`};
  return `${blobs('blue','bottom',.7)}<div class="mbody" style="padding-top:58px"><button class="back" data-a="wrback">‹ Back</button><div class="title" style="font-size:28px;margin:6px 0 4px">Plan and actual.</div><div class="sub">The white line is your plan.</div><div class="col" style="gap:14px;margin-top:20px">${rows.map(r=>`<div><div class="row sp"><span style="font-weight:600">${esc(r.name)}</span></div>${bar(r)}</div>`).join('')}</div></div><div class="mfoot"><button class="btn" data-a="wrdone">Done</button></div>`}
 const sub=P.moved>0?money(P.moved)+' moved to savings.':over?'Savings covered the rest.':'';
 return `${blobs('blue','bottom',.7)}<div class="mbody" style="padding-top:70px"><div class="title" style="font-size:32px">${over?'A bit over this week.':'You stayed within your week.'}</div>${sub?`<div class="sub" style="margin-top:6px">${sub}</div>`:''}<div style="margin:24px 10px 0">${gridHtml(Math.min(100,act/ideal*100),over?'#F4A261':'#5FE3B8',0,'#5FE3B8',{w:260})}</div></div><div class="mfoot"><div class="col" style="gap:10px"><button class="btn" data-a="wrdone">Done</button><button class="btn q" data-a="wrcat">By category</button></div></div>`};
H.wrcat=()=>{UI.popup.cat=true};H.wrback=()=>{UI.popup.cat=false};

/* ---------- Category screens: one gauge, one sentence, one action ---------- */
SCREENS.tcat=({id})=>{const c=S.cats.find(x=>x.id===id);if(!c)return '';const i=catIdx(id),a=wkCat(c,0);const scale=Math.max(100,Math.ceil(Math.max(a,wkCat(c,1),c.amt)/50)*50);
 return `<button class="back" data-a="back">‹ Spending</button><div class="title">${esc(c.name)}</div><div class="sub" style="margin-top:6px">${a?money(a)+' this week.':'Nothing this week.'}</div><div style="margin:20px 8px 10px">${gridHtml(a/scale*100,catCol(i),0,0,{w:290})}</div><div class="sub" style="text-align:center;margin-bottom:18px">box ≈ ${money(boxVal(scale))}</div><button class="btn q" data-a="tlimit|${id}">${c.amt?'Change the limit':'Set a limit'}</button>`};

/* ---------- Subscriptions: which one, how much, when (one question each) ---------- */
FLOWS.subadd=F=>{const d=F.d,sf=d.sf;if(sf.editId&&!d.init){d.init=1;F.step=1;d.sk=sf.amt}
 const back=`<button class="back" data-a="${F.step?'sfback':'sfcancel'}">‹ ${F.step?'Back':'Close'}</button>`;
 if(F.step===0)return `<div class="mbody" style="padding-top:60px">${back}<div class="title" style="margin-top:8px">Which one?</div><div class="row wrap" style="gap:8px;margin:18px 0">${SUBREC.map((r,i)=>`<button class="chip" data-a="sfpick|${i}">${r[0]}</button>`).join('')}</div><input class="field" style="width:100%;font-size:18px;font-family:var(--body);color:#E9E5DC" placeholder="Or type a name" value="${esc(sf.name)}" data-i="sfname" autocomplete="off"></div><div class="mfoot"><button class="btn ${sf.name.trim()?'':'d'}" data-a="${sf.name.trim()?'sfnext0':'x'}">Next</button></div>`;
 if(F.step===1){const a=amtOf(d.sk);return `<div class="mbody" style="padding-top:60px">${back}<div class="cap">${esc(sf.name)}</div><div class="title" style="margin-top:4px">How much?</div><div style="margin:8px 0;display:flex;justify-content:center">${amtDots('₹'+(d.sk||'0'))}</div><div class="row wrap" style="gap:8px;justify-content:center;margin-bottom:6px">${EVERY.map(e=>`<button class="chip ${sf.every===e[1]?'on':''}" data-a="sfevery|${e[1]}">${e[0]}</button>`).join('')}</div>${keypad('sk')}</div><div class="mfoot"><button class="btn ${a?'':'d'}" data-a="${a?'sfnext1':'x'}">Next</button></div>`}
 const a=amtOf(sf.amt),wk=a>0?Math.round(billWeekly({amt:a,every:sf.every})):0,crowd=planned()&&wk>0&&S.fixedW+wk>S.W*0.6;const t0=day0();
 const opts=[['Today',0],['Tomorrow',1],['In a week',7]];
 return `<div class="mbody" style="padding-top:60px">${back}<div class="title" style="margin-top:8px">When is it due?</div><div class="row wrap" style="gap:8px;margin:18px 0">${opts.map(o=>`<button class="chip ${!d.cal&&sf.due===t0+o[1]*DAY?'on':''}" data-a="sfwhen|${o[1]}">${o[0]}</button>`).join('')}<button class="chip ${d.cal?'on':''}" data-a="sfcal">Pick a date</button></div>${d.cal?calPick(sf):''}${crowd?`<div class="sub" style="color:var(--amber);font-weight:600;margin-top:12px">Takes ${money(wk)} a week of your money.</div>`:''}</div><div class="mfoot"><button class="btn" data-a="sfsave">${sf.editId?'Save':'Add '+esc(sf.name)}</button></div>`};
H.sfpick=a=>{const r=SUBREC[+a[0]],sf=UI.flow.d.sf;sf.name=r[0];sf.amt=String(r[1]);sf.every=r[2];UI.flow.d.sk=String(r[1]);UI.flow.step=1};
H.sfnext0=()=>{const d=UI.flow.d;d.sk=d.sk||d.sf.amt||'';UI.flow.step=1};
H.sfnext1=()=>{const d=UI.flow.d;d.sf.amt=d.sk;UI.flow.step=2};
H.sfback=()=>{UI.flow.step=Math.max(0,UI.flow.step-1)};
H.sfwhen=a=>{const d=UI.flow.d;d.cal=false;d.sf.due=day0()+(+a[0])*DAY};H.sfcal=()=>{UI.flow.d.cal=!UI.flow.d.cal};

/* ---------- One gauge, one sentence, two actions ---------- */
SCREENS.cat=({id})=>{const c=S.cats.find(x=>x.id===id);if(!c)return '';const col=catCol(catIdx(id));const r=c.amt?c.left/c.amt:0;const lvl=r*100;
 const words=c.left<=0?'Used up this week.':r>.6?'Plenty left.':r>.3?'Some left.':'Running low.';
 return `<button class="back" data-a="back">‹ Spending</button><div class="title">${esc(c.name)}</div><div class="sub" style="margin-top:6px">${words}</div><div style="margin:20px 8px 10px">${gridHtml(lvl,col,0,col,{w:290})}${c.left<=0?`<div style="height:3px;background:${AMBER};margin:8px 4px 0;border-radius:2px;box-shadow:0 0 14px ${AMBER}"></div>`:''}</div><div class="sub" style="text-align:center;margin-bottom:18px">${money(c.left)} left · box ≈ ${money(boxVal(c.amt))}</div><div class="col" style="gap:10px"><button class="btn" data-a="pay|${id}">Pay</button><button class="btn q" data-a="push|budget">Change limit</button></div>`};
SCREENS.goal=({id})=>{const g=S.goals.find(x=>x.id===id);if(!g)return '';const i=Math.max(0,S.goals.filter(x=>x.state!=='done').indexOf(g));const col=GG[i%3];
 return `<button class="back" data-a="back">‹ Money</button><div class="title">${esc(g.name)}</div><div class="sub" style="margin-top:6px">${g.state==='reached'?'You saved it all.':'Ready '+goalEta(g)+'.'}</div><div style="margin:20px 8px 10px">${gridHtml(Math.min(100,g.saved/g.target*100),col,0,col,{w:290})}</div><div class="sub" style="text-align:center;margin-bottom:18px">${money(g.saved)} of ${money(g.target)}</div><div class="col" style="gap:10px">${g.state==='reached'?`<button class="btn g" data-a="gdone|${g.id}">Mark done</button>`:`<button class="btn" data-a="movefrom|${g.id}">Add money</button>`}<button class="btn q" data-a="sheet|goaledit|${J({id:g.id})}">Edit</button></div>`};
/* history shows the latest few, the rest on request */
const _spHist=spHist;spHist=function(){const full=UI.spAll;const keep=S.txns;const save=S.txns;if(!full)S.txns=S.txns.slice(0,8);let h;try{h=_spHist()}finally{S.txns=save}return h+(!full&&save.length>8?`<button class="li" style="margin-top:12px" data-a="spall"><span class="n mut">Show all</span><span class="t">›</span></button>`:'')};
