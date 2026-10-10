/* ===== v16.1: an allowance bar instead of the grid; timing insights (hour, weekday, part of month);
   awareness: heads-ups at the user's own busy times, a daily guide, a weekly guess check.
   Every insight has a "Why this?" sheet with the research behind it and how strong it is. ===== */

/* ---------- allowance bar (a battery: green is what is left) ---------- */
function weekIdeal(){const from=S.weekFrom||wk0(),end=wk0()+7*DAY;return Math.max(0,Math.min(1,(end-S.now.getTime())/Math.max(DAY,end-from)))}
function battery(L,W,o){o=o||{};const f=W>0?Math.max(0,Math.min(1,L/W)):0,col=o.col||'#5FE3B8',prev=o.prev==null?f:Math.max(0,Math.min(1,o.prev));const goes=o.goes?Math.min(f,o.goes/W):0;
 return `<div class="batt${o.sm?' sm':''}"><i class="bfill" style="--from:${(prev*100).toFixed(1)}%;--to:${(f*100).toFixed(1)}%;width:${(f*100).toFixed(1)}%;background:${boxBg(col)};box-shadow:0 0 26px ${col}55,inset 0 1px 0 rgba(255,255,255,.4)"></i>${goes?`<i class="bgo" style="left:${((f-goes)*100).toFixed(1)}%;width:${(goes*100).toFixed(1)}%"></i>`:''}${o.ms?[25,50,75].map(p=>`<i class="bms" style="left:${p}%"></i>`).join(''):''}${o.tick!=null?`<i class="btick" style="left:${(o.tick*100).toFixed(1)}%"><b>${o.label||'Recommended'}</b></i>`:''}</div>`}

/* ---------- timing statistics ---------- */
const bandLabel=i=>{const s=(6+2*i)%24,e=(s+2)%24,h=x=>(x%12)||12,sf=x=>(x>=12&&x<24)?'pm':'am';return `${h(s)}${sf(s)===sf(e)?'':' '+sf(s)}–${h(e)} ${sf(e)}`};
function spendsIn(days){const now=S.now.getTime();return txIn(now-days*DAY,now+1)}
function statsHour(){const list=spendsIn(28),vals=Array(12).fill(0);list.forEach(t=>{const d=new Date(t.t);const h=d.getHours();vals[Math.floor(((h-6+24)%24)/2)]+=t.amt});
 const tot=vals.reduce((a,v)=>a+v,0),pk=vals.indexOf(Math.max(...vals));return {vals,tot,pk,n:list.length,share:tot?vals[pk]/tot:0,ok:list.length>=8&&tot>0&&vals[pk]/tot>=.2}}
function statsDay(){const list=spendsIn(28),vals=Array(7).fill(0);list.forEach(t=>{vals[dowIdx(t.t)]+=t.amt});const avg=vals.map(v=>Math.round(v/4)),tot=avg.reduce((a,v)=>a+v,0),pk=avg.indexOf(Math.max(...avg));
 return {vals:avg,tot,pk,n:list.length,ok:list.length>=8&&tot>0&&avg[pk]>=1.25*tot/7}}
function statsMonth(){const now=S.now.getTime(),ts=S.txns.filter(isSp);if(!ts.length)return {ok:false,vals:[0,0,0],cnt:[0,0,0]};const first=Math.max(Math.min(...ts.map(t=>t.t)),now-90*DAY);
 const sum=[0,0,0],cnt=[0,0,0],b=d=>d<=10?0:d<=20?1:2;for(let t=new Date(first).setHours(0,0,0,0);t<=now;t+=DAY)cnt[b(new Date(t).getDate())]++;
 ts.filter(t=>t.t>=first).forEach(t=>{sum[b(new Date(t.t).getDate())]+=t.amt});const vals=sum.map((s,i)=>cnt[i]?Math.round(s/cnt[i]):0),pk=vals.indexOf(Math.max(...vals)),oth=vals.filter((_,i)=>i!==pk),m=oth.reduce((a,v)=>a+v,0)/2;
 return {vals,cnt,pk,oth:Math.round(m),ok:cnt.filter(c=>c>=5).length>=2&&cnt.reduce((a,c)=>a+c,0)>=21&&vals[pk]>=1.2*m&&m>0}}
const PHASE=['Start of the month','Mid-month','End of the month'],PHASE_R=['Days 1–10','Days 11–20','Days 21–end'];
const phaseNow=()=>{const d=S.now.getDate();return d<=10?0:d<=20?1:2};
const perDayLeft=()=>{const L=Math.max(0,flexL()),dl=daysToGo();return L/dl};

/* ---------- awareness: one calm heads-up on Home, only at the user's own busy times ---------- */
function awareness(){if(S.nudgeOff||!planned())return null;const L=Math.max(0,flexL()),pd=Math.round(perDayLeft()),tail=L<=0?"This week's amount is used up.":`About ${money(pd)} a day left.`;
 const h=statsHour();if(h.ok){const sN=6+2*h.pk,hh=S.now.getHours()+S.now.getMinutes()/60,hN=hh<6?hh+24:hh;if(hN>=sN-1&&hN<sN+2)return {k:'hour',t:`${bandLabel(h.pk)} is when you spend most.`,s:tail}}
 const d=statsDay();if(d.ok&&dowIdx(S.now.getTime())===d.pk)return {k:'day',t:`${FULLDAY[d.pk]}s are your biggest day.`,s:`Typical: ${money(d.vals[d.pk])}. ${tail}`};
 const m=statsMonth();if(m.ok&&phaseNow()===m.pk)return {k:'month',t:`${PHASE[m.pk]} is when you spend most.`,s:`Typically ${money(m.vals[m.pk])} a day. ${tail}`};return null}
function awCard(){const a=awareness();if(!a)return '';return `<div class="card aw"><div class="row sp"><span class="cap" style="color:#CDB6FF">Heads-up</span><button class="lnk" style="font-size:13px" data-a="why|${a.k}|home">Why?</button></div><div style="font-weight:700;font-size:17px;margin-top:6px;line-height:1.25">${esc(a.t)}</div><div class="sm" style="margin-top:4px">${esc(a.s)}</div></div>`}

/* ---------- guess check (a weekly awareness exercise; it also measures O1 in the research plan) ---------- */
const guessDue=()=>planned()&&dowIdx(S.now.getTime())>=2&&!(S.guesses||[]).some(g=>g.w===wk0())&&txIn(wk0(),S.now.getTime()+1).length>=3;
SHEETS.guess=p=>{const W=Math.max(50,Math.round(flexW()/10)*10),mx=Math.ceil(W*1.6/50)*50,v=p.v!=null?p.v:Math.round(W/2/10)*10;const act=Math.round(txIn(wk0(),S.now.getTime()+1).reduce((a,t)=>a+t.amt,0));
 if(p.rev){const g=p.v,diff=g-act,close=Math.abs(diff)<=Math.max(30,act*.2);return `<div class="cap">This week</div><div class="title" style="font-size:26px;margin:4px 0 12px">${close?'Close. You know your week.':diff<0?'A bit more than you thought.':'A bit less than you thought.'}</div><div class="row sp" style="margin:6px 0 16px"><span><span class="cap">You said</span><div class="h2">${money(g)}</div></span><span style="text-align:right"><span class="cap">It was</span><div class="h2">${money(act)}</div></span></div><div class="sub" style="margin-bottom:16px">${close?'Within 20%.':'Spending is easy to lose track of. Nothing wrong here.'}</div><button class="btn" data-a="guessdone">Done</button>`}
 return `<div class="cap">A quick check</div><div class="title" style="font-size:26px;margin:4px 0 10px">How much have you spent this week?</div><div class="sub">Guess first. Then see.</div><div style="margin:18px 0 6px;text-align:center"><span class="hero" id="gv" style="font-size:44px">${money(v)}</span></div><input type="range" min="0" max="${mx}" step="10" value="${v}" data-i="guessv" style="margin:6px 0 18px"><div class="col" style="gap:8px"><button class="btn" data-a="guessgo">Show me</button><button class="btn q" data-a="closesheet">Not now</button></div>`};
HI.guessv=(a,el)=>{UI.sheet.p.v=+el.value;$('#gv').textContent=money(+el.value);return false};
H.guess=()=>{openSheet('guess',{});return false};
H.guessgo=()=>{const p=UI.sheet.p;if(p.v==null)p.v=Math.round(Math.max(50,Math.round(flexW()/10)*10)/2/10)*10;const act=Math.round(txIn(wk0(),S.now.getTime()+1).reduce((a,t)=>a+t.amt,0));(S.guesses=S.guesses||[]).push({w:wk0(),guess:p.v,actual:act});p.rev=true};
H.guessdone=()=>{UI.sheet=null};

/* ---------- research behind each insight (strength is stated; limits are stated) ---------- */
const SRC={
 wood:['Wood, Quinn & Kashy (2002)','Habits in everyday life: thought, emotion, and action. Journal of Personality and Social Psychology 83(6), 1281–1297.'],
 jit:['Nahum-Shani et al. (2018)','Just-in-time adaptive interventions in mobile health. Annals of Behavioral Medicine 52(6), 446–462.'],
 impl:['Gollwitzer & Sheeran (2006)','Implementation intentions and goal achievement: a meta-analysis. Advances in Experimental Social Psychology 38, 69–119. Average effect d = 0.65 over 94 tests.'],
 fresh:['Dai, Milkman & Riis (2014)','The fresh start effect: temporal landmarks motivate aspirational behavior. Management Science 60(10).'],
 steph:['Stephens (2003)','"3rd of tha month": do Social Security recipients smooth consumption between checks? American Economic Review 93(1), 406–422.'],
 shap:['Shapiro (2005)','Is there a daily discount rate? Evidence from the food stamp nutrition cycle. Journal of Public Economics 89(2–3), 303–325. Food intake fell 10 to 15 percent over the benefit month.'],
 karlan:['Karlan, McConnell, Mullainathan & Zinman (2016)','Getting to the top of mind: how reminders increase saving. Management Science 62(12), 3393–3411.'],
 karls:['Karlsson, Loewenstein & Seppi (2009)','The ostrich effect: selective attention to information. Journal of Risk and Uncertainty.'],
 fran:['Franconeri, Padilla, Shah, Zacks & Hullman (2021)','The science of visual data communication: what works. Psychological Science in the Public Interest 22(3), 110–161.'],
 spence:['Spence & Lewandowsky (1991)','Displaying proportions and percentages. Applied Cognitive Psychology 5. Bar and pie displays both beat a table.'],
 clev:['Cleveland & McGill (1984)','Graphical perception. Journal of the American Statistical Association 79(387), 531–554. (Not re-checked in this session.)']};
const EVID={
 hour:{t:'Why time of day?',lvl:'Indirect',pts:['A large share of everyday behaviour is habit, and habits attach to a time and a place. The same hour tends to repeat.','Support works best when it arrives at the moment it is needed, not after it (the "just-in-time" idea).','An if-then plan ("if it is lunchtime, I check what is left") makes people more likely to follow through.'],src:['wood','jit','impl'],lim:'These studies are not about students and money. The hours shown are yours, from your own spends.'},
 day:{t:'Why the day of the week?',lvl:'Indirect',pts:['The same habit-and-context idea: weekly routines repeat on the same days.','A Monday or a new week works as a fresh start, when people act on goals more.'],src:['wood','fresh','jit'],lim:'Habit and fresh-start studies are about other behaviours. The days shown are yours.'},
 month:{t:'Why the part of the month?',lvl:'Indirect',pts:['When regular money arrives, spending jumps on that day, even though people knew it was coming (Stephens).','Across a benefit month, how much people consumed slid by 10 to 15 percent (Shapiro).','The start of a month is a fresh start for goals (Dai and others).'],src:['steph','shap','fresh'],lim:'Both spending studies are about adults on regular benefit payments, not students. Treat the pattern as a prompt to look, not a rule.'},
 repeat:{t:'Why repeats?',lvl:'Indirect',pts:['Repeats are habits: the same place, again and again, often without a decision each time.','Seeing how often you go is the first step. A limit on times is an if-then plan.'],src:['wood','impl'],lim:'The studies are not about shops or students.'},
 trend:{t:'Why a running total?',lvl:'Design reasoning',pts:['A line is the clearest way to show something that changes over time.','Comparing the same days of two weeks is a fair comparison. Last week would otherwise look bigger because it is finished.'],src:['fran'],lim:'The chart choice is backed by research. The same-days comparison is our own design.'},
 bar:{t:'Why a bar?',lvl:'Good, untested here',pts:['Length and position are among the most accurately read visual encodings.','The allowance and what is left are written next to the bar, so nobody has to guess a value from the picture.'],src:['clev','fran'],lim:'We have not tested whether this reads faster than the old grid. Test A will.'},
 spend:{t:'Why one stacked bar?',lvl:'Good',pts:['A single bar split by share shows "where it went" at a glance, and beats a table of numbers.','The finding is written above it, so the picture only has to confirm it.'],src:['spence','fran'],lim:'Bars and pies score about the same in the study. We use a bar because it needs no key.'},
 calm:{t:'Why the wording is calm',lvl:'Good',pts:['Investors checked their accounts less often when markets were falling. People avoid news that feels bad, so Trickle never scolds.','A reminder works better when it is specific. Heads-ups name the day or the hour and give one number.'],src:['karls','karlan'],lim:'Reminder studies are about saving accounts. Effects on spending are not shown.'},
 guess:{t:'Why guess first?',lvl:'Untested here',pts:['Guessing, then seeing the real number, shows how far your feel for spending is from the facts.','Whether it changes anything is something Trickle will measure (see the research plan).'],src:['karlan'],lim:'This is a method we are testing, not a proven one.'}};
SHEETS.why=({k,from})=>{const e=EVID[k];if(!e)return '';
 return `<div class="cap">Evidence: ${e.lvl}</div><div class="title" style="font-size:25px;margin:4px 0 12px">${e.t}</div><div class="col" style="gap:8px">${e.pts.map(x=>`<div class="sub">• ${x}</div>`).join('')}</div>
 <div class="cap" style="margin:30px 0 10px">Sources</div><div class="col" style="gap:6px">${e.src.map(s=>`<div class="sm"><b style="color:var(--ink)">${SRC[s][0]}.</b> ${SRC[s][1]}</div>`).join('')}</div><div class="sm" style="margin-top:12px;color:var(--ink3)">${e.lim}</div>
 <div class="col" style="gap:8px;margin-top:16px">${from==='home'?`<button class="btn q" data-a="nudgeoff">Stop heads-ups</button>`:''}<button class="btn" data-a="closesheet">Got it</button></div>`};
H.why=a=>{openSheet('why',{k:a[0],from:a[1]});return false};
H.nudgeoff=()=>{S.nudgeOff=true;UI.sheet=null;say('Heads-ups are off. Turn them back on in Insights.')};
H.nudgeon=()=>{S.nudgeOff=false;say('Heads-ups are on.')};

/* ---------- Home: allowance and what is left, together; then one heads-up; then one thing to do ---------- */
function nextAct(){
 if(S.flags&&S.flags.linkLost)return {t:'Refresh your UPI link',a:'settings|acct',c:'amber'};
 if(S.pending.length)return {t:'Last week is ready',a:'openweek',c:'amber'};
 if(S.credits&&S.credits.length){const c=S.credits[0];return {t:money(c.amt)+' came in from '+c.from,a:'assign|'+c.id,c:'green'}}
 if(S.unsorted.length)return {t:S.unsorted.length+(S.unsorted.length>1?' payments need':' payment needs')+' a category',a:'push|sort',c:'amber'};
 const b=billSoon()[0];if(b)return {t:b,a:'goto|spending',c:'amber'};
 const ov=(S.limits||[]).find(l=>limState(l)==='over'||limState(l)==='at');if(ov)return {t:`${limName(ov)}: ${limText(ov)}`,a:'limedit|'+ov.id,c:'amber'};
 if(!planned())return {t:'Add your money',a:'startplan',c:'plan'};
 const pl=planLines()[0];if(pl)return {html:pl,low:true};
 const sg=suggestions()[0];if(sg)return {t:sg.short,a:'limsug|'+sg.key,c:'violet',low:true};
 if(guessDue())return {t:"Guess this week's spending",a:'guess',c:'violet',low:true};
 return null}
SCREENS.home=()=>{const nt=nextAct(),pl=planned();let top,viz,cap='';
 if(pl){const W=Math.max(1,flexW()),L=Math.max(0,flexL()),empty=L<=0,sig=S.key+'|'+wk0(),f=L/W,prev=(UI._bw&&UI._bw.sig===sig)?UI._bw.f:f;UI._bw={sig,f};
  const col=(typeof paceHex==='function')?paceHex():'#5FE3B8',dl=daysToGo();let st='';if(typeof paceInfo==='function'){const p=paceInfo();if(S.touched||empty)st="This week's amount is used up.";else if(p&&p.over)st='Spending fast this week.'}
  top=`<span class="hero cu" data-v="${Math.round(L)}" style="font-size:56px">${money(L)}</span><span class="sub" style="margin-left:10px;font-size:18px">left</span><div class="sub" style="margin-top:6px;font-size:16px">of your ${money(W)} weekly allowance</div>${st?`<div class="sub" style="margin-top:6px;color:${AMBER}">${st}</div>`:''}`;
  viz=`<div style="margin:24px 2px 32px" data-a="gridhow">${battery(L,W,{col,prev,tick:weekIdeal()})}</div>`;
  cap=`<div class="row sp" style="align-items:center;margin:0 4px 16px"><span class="sub">${empty?'Nothing left to spend':'About '+money(L/dl)+' a day for '+(dl===1?'today':dl+' days')}</span><button class="chip" data-a="gridhow">ⓘ</button></div>`}
 else{const tot=wkTot(0);top=tot?`<span class="hero" style="font-size:56px">${money(tot)}</span><div class="sub" style="margin-top:6px;font-size:16px">spent this week</div>`:`<span class="title" style="font-size:30px">Nothing logged yet.</span>`;
  viz=`<div style="margin:24px 2px 32px" data-a="gridhow"><div class="batt idle"></div></div>`}
 const aw=pl?awCard():'';const row=(!nt||(nt.low&&aw))?'':nt.html?nt.html:nt.c==='plan'?`<button class="li cta" data-a="${nt.a}"><span class="n"><b>${nt.t}</b></span><span class="t">›</span></button>`
  :`<button class="li" data-a="${nt.a}"><span class="d" style="background:${nt.c==='green'?SAVE:nt.c==='violet'?'#B48CFF':'var(--amber)'}"></span><span class="n">${esc(nt.t)}</span><span class="t">›</span></button>`;
 return `<div class="row sp" style="margin-top:2px"><span class="greet">${greet()}</span><button class="chip" data-a="settings">⚙</button></div>
 <div style="margin-top:14px">${top}</div>${viz}${aw?'':cap}${aw}${row?`<div style="margin-top:12px">${row}</div>`:''}
 <div style="position:sticky;bottom:0;margin-top:22px;padding-top:10px;background:transparent"><button class="btn" data-a="${scanOn()?'payscan':'pay'}">Log expense</button></div>`};
const scanOn=()=>window.HOMEBTN==='scan'&&(window.PLATFORM||'android')==='android';
SHEETS.gridhow=()=>{const pl=planned(),W=Math.max(1,flexW());
 return `<div class="cap">How to read it</div><div class="title" style="font-size:26px;margin:4px 0 16px">${pl?'Green is what is left.':'This fills once you add your money.'}</div>
 <div style="margin:6px 2px 30px">${battery(W*.62,W,{tick:.45,sm:false})}</div>
 <div class="col" style="gap:8px"><div class="sub">• The full bar is your weekly allowance${pl?', '+money(W):''}.</div><div class="sub">• The white tick is where an even pace would be today.</div><div class="sub">• If green ends before the tick, you are spending faster than the week. The bar turns amber.</div></div>
 <div class="row sp" style="margin-top:18px"><button class="lnk" data-a="why|bar">Why a bar?</button><button class="btn s" data-a="closesheet" style="width:auto">Got it</button></div>`};

/* ---------- pay confirm: the same bar, with the part that leaves hatched ---------- */
function walletConfirm(F){const d=F.d,amt=amtOf(d.kp),W=Math.max(1,flexW()),L=Math.max(0,flexL()),over=Math.max(0,amt-L),lowbal=S.flags.lowBalance&&S.p.mode==='upi',col=(typeof paceHex==='function')?paceHex():'#5FE3B8';
 const warn=limWarn(d.target&&d.target.id,d.payee,amt),aw=awareness();
 return `<div class="mbody"><button class="back" data-a="pclose">‹ Close</button><div class="cap">${esc(tgtName(d.target))} · ${esc(d.payee||'Someone')}</div><div style="margin-top:6px"><span class="hero" style="font-size:44px">${money(amt)}</span></div>
 <div style="margin:30px 2px 30px">${battery(L,W,{col:over>0?AMBER:col,goes:Math.min(amt,L),prev:L/W})}</div>
 <div class="row sp"><span><span class="cap">Left now</span><div class="h2">${money(L)}</div></span><span style="text-align:right"><span class="cap">Left after</span><div class="h2" style="${over>0?'color:var(--amber)':''}">${money(Math.max(0,L-amt))}</div></span></div>
 ${over<=0&&L>0?`<div class="sub" style="margin-top:14px;text-align:center">${amt<=L/daysToGo()?`That is ${Math.max(1,Math.round(amt/(L/daysToGo())*100))}% of today's ${money(L/daysToGo())}.`:`More than today's ${money(L/daysToGo())}.`}</div>`:''} ${over>0?`<div class="title" style="font-size:26px;color:var(--amber);margin-top:16px">${money(over)} over.</div><div class="sub" style="margin-top:4px">More than you have left. Savings cover it.</div>`:''}
 ${warn?`<div class="banner" style="margin-top:14px"><span style="color:var(--amber);font-weight:700">${esc(warn)}</span></div>`:''}${aw&&!warn?`<div class="banner" style="margin-top:14px;border-color:rgba(205,182,255,.4);background:rgba(205,182,255,.08)"><span style="color:#CDB6FF;font-weight:700">${esc(aw.t)}</span></div>`:''}
 ${lowbal?`<div class="banner" style="margin-top:12px"><b style="color:var(--amber)">Your account shows ${money(40)}.</b> <span class="sub">This may not go through.</span></div>`:''}</div>
 <div class="mfoot"><div class="row" style="gap:10px"><button class="btn o" style="flex:1" data-a="pback">Back</button><button class="btn" style="flex:1.3" data-a="pgo">Add ${money(amt)}</button></div></div>`}

/* ---------- Insights: When (hour, day, part of the month), Repeats, Trend; each with its evidence ---------- */
H.rhmode=a=>{UI.rh=a[0];UI.rhSel=null};H.inssel=a=>{UI.rhSel=+a[0]};
function barsChart(vals,labels,sel,o){o=o||{};const mx=Math.max(1,...vals),H0=o.h||170;return `<div class="dbars" style="height:${H0+40}px">${vals.map((v,i)=>{const h=Math.max(v>0?8:3,Math.round(v/mx*H0));const on=i===sel;return `<button class="db ${on?'on':''}" data-a="inssel|${i}"><span class="bar" style="height:${h}px;${v>0?`background:${boxBg(on?'#5FE3B8':SPEND)}`:''}"></span><span class="lab ${o.today===i?'td':''}">${labels[i]||''}</span></button>`}).join('')}</div>`}
function insWhen(){const m=UI.rh||'hour';let body='';
 const chips=`<div class="row" style="gap:8px;margin:14px 0 6px">${[['hour','Time of day'],['day','Day'],['month','Month']].map(c=>`<button class="chip ${m===c[0]?'on':''}" data-a="rhmode|${c[0]}">${c[1]}</button>`).join('')}</div>`;
 const foot=`<div class="row sp" style="margin-top:6px"><button class="lnk" style="font-size:14px" data-a="why|${m}">Why this?</button><button class="lnk" style="font-size:14px;color:var(--ink3)" data-a="${S.nudgeOff?'nudgeon':'nudgeoff'}">Heads-ups: ${S.nudgeOff?'off':'on'}</button></div>`;
 const none=(t)=>`<div class="title" style="font-size:24px">Not enough yet.</div><div class="sub" style="margin-top:8px">${t}</div>${chips}`;
 if(m==='hour'){const h=statsHour();if(h.n<8)return none('Time patterns show after a week or two of spends.');const sel=UI.rhSel!=null?UI.rhSel:h.pk,lab=Array.from({length:12},(_,i)=>i%3===0?['6am','12pm','6pm','12am'][i/3]:'');
  body=`<div class="title" style="font-size:26px;line-height:1.15">You spend most around ${bandLabel(h.pk)}.</div><div class="sub" style="margin-top:6px">${pct0(h.share)}% of your spending, over the last 4 weeks.</div>${chips}<div style="margin:6px 0 0"><span class="hero" style="font-size:34px">${money(h.vals[sel])}</span><span class="sub" style="margin-left:8px">${bandLabel(sel)}</span></div>${barsChart(h.vals,lab,sel,{today:Math.floor(((S.now.getHours()-6+24)%24)/2)})}`}
 else if(m==='day'){const d=statsDay();if(d.n<8)return none('Day patterns show after a week or two of spends.');const sel=UI.rhSel!=null?UI.rhSel:d.pk;
  body=`<div class="title" style="font-size:26px;line-height:1.15">${FULLDAY[d.pk]}s are your biggest day.</div><div class="sub" style="margin-top:6px">${money(d.vals[d.pk])} on a typical one. ${money((d.tot-d.vals[d.pk])/6)} on the others.</div>${chips}<div style="margin:6px 0 0"><span class="hero" style="font-size:34px">${money(d.vals[sel])}</span><span class="sub" style="margin-left:8px">${FULLDAY[sel]} on average</span></div>${barsChart(d.vals,DOW.map(x=>x[0]),sel,{today:dowIdx(S.now.getTime())})}`}
 else{const s=statsMonth();if(!s.ok){const days=s.cnt.reduce((a,c)=>a+c,0);return none(days<21?'Month patterns need about three weeks of spends.':'Your spending is even across the month.')}const sel=UI.rhSel!=null?UI.rhSel:s.pk;
  body=`<div class="title" style="font-size:26px;line-height:1.15">${PHASE[s.pk]} is when you spend most.</div><div class="sub" style="margin-top:6px">${money(s.vals[s.pk])} a day. ${money(s.oth)} in the other parts.</div>${chips}<div style="margin:6px 0 0"><span class="hero" style="font-size:34px">${money(s.vals[sel])}</span><span class="sub" style="margin-left:8px">a day · ${PHASE_R[sel]}</span></div>${barsChart(s.vals,PHASE_R,sel,{h:150,today:phaseNow()})}`}
 return body+foot}
{const _rep=insRep,_cmp=insCmp;insRep=function(){return _rep()+`<div style="margin-top:14px"><button class="lnk" style="font-size:14px" data-a="why|repeat">Why this?</button></div>`};insCmp=function(){return _cmp()+`<div style="margin-top:6px"><button class="lnk" style="font-size:14px" data-a="why|trend">Why this?</button></div>`}}
SCREENS.insights=()=>{const v=UI.ins||'when';return `${SEG([['when','When'],['rep','Repeats'],['cmp','Trend']],v,'insseg')}${v==='when'?insWhen():v==='rep'?insRep():insCmp()}`};

/* ---------- a goal is a bar too ---------- */
SCREENS.goal=({id})=>{const g=S.goals.find(x=>x.id===id);if(!g)return '';const i=Math.max(0,S.goals.filter(x=>x.state!=='done').indexOf(g)),col=GG[i%3];
 return `<button class="back" data-a="back">‹ Money</button><div class="title">${esc(g.name)}</div><div class="sub" style="margin-top:6px">${g.state==='reached'?'You saved it all.':'Ready '+goalEta(g)+'.'}</div>
 <div style="margin:26px 2px 12px">${battery(Math.min(g.saved,g.target),g.target,{col})}</div><div class="row sp" style="margin-bottom:22px"><span class="h2">${money(g.saved)}</span><span class="sub">of ${money(g.target)}</span></div>
 <div class="col" style="gap:10px">${g.state==='reached'?`<button class="btn g" data-a="gdone|${g.id}">Mark done</button>`:`<button class="btn" data-a="movefrom|${g.id}">Add money</button>`}<button class="btn q" data-a="sheet|goaledit|${J({id:g.id})}">Edit</button></div>`};

/* ---------- words ---------- */
TIPDEF.paid={cap:'Your first spend',t:'That is one spend.',b:'The bar shrinks by that amount.',c:ACC.g};
TIPDEF.cat={cap:'A category',t:'Eight weeks of one category.',b:'The last bar is this week. A limit is optional.',c:ACC.g};
TIPDEF.insights={cap:'Insights',t:'When your money goes.',b:'The hour, the day and the part of the month you spend most. Tap Why this? for the research.',c:ACC.v};
TIPDEF.spending={cap:'Spending',t:'Where it went.',b:'Every spend has a category. Tap one to see more.',c:ACC.a};

function greet(){const h=S.now.getHours();return h<5?'Late night':h<12?'Good morning':h<17?'Good afternoon':h<21?'Good evening':'Good night'}
