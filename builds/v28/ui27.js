/* ===== v27 (11 Oct, Tarun): no balance on screen. Trickle shows the weekly allowance and the money you added with how long
   it lasts; it does not talk about your bank balance. Savings have no deadline. "Start again" asks what you have now and
   lets you split it into savings and spending again: savings stay as they are if the new split leaves room for them,
   otherwise they go down (money not in a goal first, then each goal by its share). Explained in docs/claude/v27_money_model.md ===== */

/* ---------- words: no "balance" ---------- */
const WORDS27=[['Add to balance','Add income'],['What’s your bank balance?','How much money do you have to plan?'],['Type it in. Trickle never sees your bank.','Pocket money, stipend, anything. Trickle never sees your bank.'],['off your balance','out of your savings']];
{const _o=FLOWS.onb;FLOWS.onb=F=>{let h=_o(F);WORDS27.forEach(([a,b])=>{h=h.split(a).join(b)});return h}}
{const _a=window.afterRender;window.afterRender=()=>{if(_a)_a();const w=document.createTreeWalker(document.getElementById('phone')||document.body,NodeFilter.SHOW_TEXT);let n;
 while((n=w.nextNode())){let t=n.nodeValue,o=t;WORDS27.forEach(([a,b])=>{if(t.includes(a))t=t.split(a).join(b)});t=t.replace(/Ready (₹[\d,]+ to go)/,'$1').replace(/Ready whenever you like\.?/,'It just grows');if(t!==o)n.nodeValue=t}}}

/* ---------- savings have no deadline: no "Ready Aug 2027", no "by when", no "needs ₹X a month" ---------- */
goalEta=function(g){const rem=Math.max(0,(g.target||0)-g.saved);if(!(g.target>0))return 'whenever you like';return rem<=0?'Reached':money(rem)+' to go'};
{const _r=render;render=function(){if(S&&S.goals)S.goals.forEach(g=>{g.byMonths=0});return _r.apply(this,arguments)}}
{const _sg=SCREENS.goal;SCREENS.goal=p=>_sg(p).replace(/Ready (₹[\d,]+ to go|Reached)\.?/,'')}
{const _ge=SHEETS.goaledit;SHEETS.goaledit=p=>{const h=_ge(p);p.by=0;return h.replace(/<div class="cap"[^>]*>By when \(optional\)<\/div><div class="row wrap">[\s\S]*?<\/div>/,'')}}

/* ---------- Home: what you have to spend and how long it lasts, not a balance ---------- */
const until27=m=>m.active.length?Math.max(...m.active.map(p=>p.end)):null;
incomeRow17=function(){const m=M25();if(!m||(!planned()&&m.Sp<=0))return '';const e=until27(m),wl=e?wksLeft25(S.now.getTime(),e):0;
 return `<div class="bal23"><button class="l" data-a="push|bal24"><span class="sm">Money to last</span><b>${m.Sp<0?'−'+money(-m.Sp):money(m.Sp)}</b><small class="mut" style="font-size:12.5px;margin-top:2px">${e?`until Sun ${shortD(e)} · ${wl} week${wl>1?'s':''}`:'No plan yet'}</small></button><button class="add" data-a="addmoney17">${PLUS21}<span>Add</span></button></div>`};

/* ---------- "Your money": the income you added and how long it lasts ---------- */
SCREENS.bal24=()=>{const m=M25(),now=S.now.getTime(),e=until27(m);
 const row=p=>{const tot=Math.max(1,p.end-p.start),pr=Math.max(0,Math.min(1,(now-p.start)/tot)),wl=wksLeft25(now,p.end);
  return `<div class="rb24"><div class="row sp" style="align-items:baseline"><b>${money(p.rem)} <span class="sm" style="font-weight:500">left of ${money(p.amt)}</span></b></div>
  <div class="sm" style="margin-top:2px">${esc((p.label||'Plan').replace('From your bank','Started again'))} · until Sun ${shortD(p.end)} · ${wl} week${wl>1?'s':''} left</div>
  <div class="tl24"><i style="width:${(pr*100).toFixed(1)}%"></i></div><div class="row sp mut" style="font-size:12.5px;margin-top:5px"><span>${shortD(p.start)}</span><span>about ${money(p.rem/wl)} a week</span></div></div>`};
 const line=(c,l,v,s)=>`<div class="ln25"><i style="background:${c}"></i><span>${l}${s?`<small>${s}</small>`:''}</span><b>${money(v)}</b></div>`,LATER=`color-mix(in srgb,${SPEND} 45%,#2A2D33)`;
 return back17('Home')+`<div class="title" style="margin-bottom:2px">Your money</div><div class="sm">What you added, and how long it lasts</div>
 <div class="hero" style="font-size:52px;margin-top:10px">${m.Sp<0?'−'+money(-m.Sp):money(m.Sp)}</div><div class="sm">${m.Sp<0?'':e?`to last until Sun ${shortD(e)}`:'not planned yet'}</div>
 ${m.Sp<0?`<div class="note20"><i style="background:${ST20.out.c}"></i>You have spent ${money(-m.Sp)} more than you had. The next money you add pays it back first.</div>`:''}
 ${m.Sp>0?`<div class="sb24"><i style="flex:${Math.max(m.left,1)};background:${SPEND}"></i>${m.later?`<i style="flex:${m.later};background:${LATER}"></i>`:''}${m.held?`<i style="flex:${m.held};background:#B9A57A"></i>`:''}${m.loose?`<i style="flex:${m.loose};background:#5A606A"></i>`:''}</div>`:''}
 <div class="col" style="margin-top:14px">${line(SPEND,'Left this week',m.left,`of ${money(m.budget)}`)}${line(LATER,'Later weeks',m.later)}${m.held?line('#B9A57A','Held for subscriptions',m.held,'due before your plan ends'):''}${m.loose?line('#5A606A','Not in any week yet',m.loose):''}</div>
 ${m.loose>=1?`<div class="nd21" style="margin-top:16px"><b>${money(m.loose)} isn't in any week</b><div class="sm" style="margin-top:4px">From a plan that ended, or money added without a plan.</div><div class="row" style="gap:8px;margin-top:12px"><button class="btn s q" data-a="loose25|save">Put in savings</button><button class="btn s q" data-a="loose25|plan">Spread over 4 weeks</button></div></div>`:''}
 ${sec20('Running')}${m.active.length?`<div class="col" style="gap:10px">${m.active.map(row).join('')}</div>`:`<div class="sm">Nothing planned. Add income, or start again.</div>`}
 <div class="col" style="gap:10px;margin-top:26px"><button class="btn" data-a="addmoney17">Add income</button><button class="btn q" data-a="sync24">Start again</button></div>
 <div class="sm" style="margin-top:10px">Lost track? Start again with what you have now, and split it again.</div><div style="height:40px"></div>`};

/* paying more than you have to spend: say where the rest comes from, without a balance */
{const _sc=scanConfirm;scanConfirm=function(F){const m=M25(),a=amtOf(F.d.kp);let h=_sc(F);
 return h.replace(/That is more than your balance \([^)]*\)\./,()=>a>Math.max(m.B,0)?'That is more than you have, savings included.':'')
  .replace('<div class="mfoot">',m&&a>Math.max(m.Sp,0)&&a<=Math.max(m.B,0)&&!h.includes('note27')?`<div class="note20 note27" style="position:absolute;left:22px;right:22px;bottom:96px"><i style="background:${ST20.fast.c}"></i>${money(a-Math.max(m.Sp,0))} of it comes from savings.</div><div class="mfoot">`:'<div class="mfoot">')}}

/* ---------- Start again: what you have now → keep some aside? → how long? ---------- */
function syncNums24(d){const m=M25(),X=amtOf(d.kp),sv=Math.max(0,Math.round(savedTotal(S))),keep=d.keep==null?Math.min(sv,X):Math.max(0,Math.min(X,Math.round(d.keep))),sp=X-keep;
 if(!d.end)setWeeks20(d,m&&m.active.length?wksLeft25(S.now.getTime(),Math.max(...m.active.map(p=>p.end))):4);
 const end=snapEnd(d.end),wl=wksLeft25(S.now.getTime(),end),days=daysIn(day0(),end),held=Math.min(sp,reserve26(S.now.getTime(),end)),wk=Math.round((sp-held)/wl);return {X,sv,keep,cut:sv-keep,sp,end,days,wk,held,was:null,diff:null}}
const steps27=i=>`<div class="steps">${[0,1,2].map(k=>`<i class="${k<=i?'on':''}"></i>`).join('')}</div>`;
function keepNote27(n){if(n.cut>0)return `Savings go down by ${money(n.cut)}. Money not in a goal goes first, then each goal by its share.`;
 if(n.cut<0)return `Your savings stay, and ${money(-n.cut)} more goes in.`;return n.sv>0?'Your savings stay as they are.':''}
FLOWS.sync24=F=>{const d=F.d;
 if(F.step===0){const a=amtOf(d.kp);return `<div class="mbody"><button class="back" data-a="pclose">‹ Close</button>${steps27(0)}
  <div class="title" style="margin-top:14px">How much do you have now?</div><div class="sub" style="margin-top:6px">All of it, savings too. Trickle never sees your bank.</div>
  <div class="hero" style="font-size:46px;margin:14px 0 4px;text-align:center;${a?'':'color:var(--ink3)'}">${a?money(a):'₹0'}</div>${keypad('kp')}</div>
  <div class="mfoot"><button class="btn ${a?'':'d'}" data-a="${a?'sync24next':'x'}">Next</button></div>`}
 const n=syncNums24(d),pct=n.X?Math.round(n.keep/n.X*100):0;
 if(F.step===1){const asNow=Math.min(n.sv,n.X),ch=[[0,'None'],[10,'10%'],[20,'20%'],[30,'30%']];
  return `<div class="mbody"><button class="back" data-a="sync24back">‹ Back</button>${steps27(1)}
  <div class="title" style="margin-top:14px">Keep some aside?</div><div class="sub" style="margin-top:6px">Out of ${money(n.X)}. It goes to Savings.</div>
  <div class="row wrap" style="gap:8px;margin-top:20px">${n.sv>0?`<button class="chip ${n.keep===asNow?'on':''}" data-a="keep27|now">As now, ${money(asNow)}</button>`:''}${ch.map(([v,l])=>`<button class="chip ${n.keep===Math.round(n.X*v/100)&&!(n.sv>0&&n.keep===asNow)?'on':''}" data-a="keep27|${v}">${l}</button>`).join('')}</div>
  <div class="blk20" style="margin-top:18px"><input type="range" class="split18" min="0" max="100" step="1" value="${pct}" data-i="keep27" style="--p:${pct}%" aria-label="How much to keep aside">
  <div class="row sp"><span class="tapamt18"><span class="k20"><i style="background:${SAVE}"></i>Keep aside</span><b id="k27-sav">${money(n.keep)}</b></span><span class="tapamt18 r"><span class="k20" style="justify-content:flex-end"><i style="background:${SPEND}"></i>To spend</span><b id="k27-sp">${money(n.sp)}</b></span></div></div>
  <div class="note20" id="k27-note" style="margin-top:14px;${keepNote27(n)?'':'display:none'}"><i style="background:${n.cut>0?ST20.fast.c:SAVE}"></i><span>${keepNote27(n)}</span></div></div>
  <div class="mfoot"><button class="btn" data-a="sync27next">Next</button></div>`}
 const k=wkCount20(n.end);
 return `<div class="mbody"><button class="back" data-a="sync27back">‹ Back</button>${steps27(2)}
  ${n.sp>0?`<div class="title" style="margin-top:14px">How long should ${money(n.sp)} last?</div>
  <div class="stp20" style="margin-top:18px"><button data-a="syncwk24|-1" ${k<=1?'disabled':''} aria-label="One week less">−</button><div><b>${k} week${k>1?'s':''}</b><small>until Sun ${shortD(n.end)}</small></div><button data-a="syncwk24|1" aria-label="One more week">+</button></div>
  <div class="res20" style="margin-top:18px"><div class="sm">${n.held?`${money(n.sp)} − ${money(n.held)} for subscriptions, ÷ ${k} week${k>1?'s':''}`:`${money(n.sp)} ÷ ${k} week${k>1?'s':''}`}</div><div class="row" style="align-items:baseline;gap:8px;margin-top:4px"><span class="hero" style="font-size:42px;line-height:1">${money(n.wk)}</span><span style="font-size:17px;color:var(--ink2)">every week</span></div><div class="sm" style="margin-top:6px">This week gets a full share.</div></div>`
  :`<div class="title" style="margin-top:14px">Nothing to spend</div><div class="sub" style="margin-top:6px">All ${money(n.X)} goes to Savings. Add income when more comes in.</div>`}<div style="height:150px"></div></div>
  <div class="mfoot"><button class="btn" data-a="sync24go">Start again</button></div>`};
H.sync24=()=>{openFlow('sync24',{step:0,kp:''});return false};
H.sync24next=()=>{UI.flow.step=1;const d=UI.flow.d;if(d.keep==null)d.keep=syncNums24(d).keep};
H.sync24back=()=>{UI.flow.step=0};H.sync27next=()=>{UI.flow.step=2};H.sync27back=()=>{UI.flow.step=1};
H.keep27=a=>{const d=UI.flow.d,X=amtOf(d.kp);d.keep=a[0]==='now'?Math.min(Math.max(0,Math.round(savedTotal(S))),X):Math.round(X*(+a[0])/100)};
HI.keep27=(a,el)=>{const d=UI.flow.d,X=amtOf(d.kp);d.keep=Math.round(X*(+el.value)/100);const n=syncNums24(d);el.style.setProperty('--p',el.value+'%');
 $('#k27-sav').textContent=money(n.keep);$('#k27-sp').textContent=money(n.sp);const no=$('#k27-note'),t=keepNote27(n);if(no){no.style.display=t?'':'none';no.querySelector('span').textContent=t}
 document.querySelectorAll('[data-a^="keep27|"]').forEach(b=>b.classList.remove('on'));return false};
/* a split that keeps more than the savings now: the extra goes to savings (not in a goal) */
{const _go=H.sync24go;H.sync24go=()=>{const n=syncNums24(UI.flow.d);const r=_go();if(n.cut<0)S.free+=-n.cut;S.cp26=[];render();return r}}
{const _s=H.sync24go;H.sync24go=()=>{const r=_s();const m=M25();say(`Started again. ${money(m.budget)} for this week.`);return r}}
/* the old week-end "Does your balance still look right?" step is skipped: Trickle does not ask about the bank */
{const _ow=H.openweek;if(_ow)H.openweek=a=>{const r=_ow(a);if(UI.popup&&UI.popup.step==='bal')UI.popup.step=1;return r}}

/* ===== v27.1 (12 Oct, Tarun): very simple. No "Money to last" and no Your money screen. Settings is full screen with one red
   button at the bottom, "Restart budgeting": a warning, then the onboarding questions again. Past spends stay logged.
   If savings do not fit the new split, every pot keeps the same share (free money and each goal shrink by the same percentage).
   Adding, editing, pausing or cancelling a subscription takes it out of the money to spend now and works the week out again. ===== */
document.head.insertAdjacentHTML('beforeend',`<style>
.sheet:has(.fs27){top:0;max-height:none;border-radius:0;border-top:0;padding-top:58px;display:flex;flex-direction:column}
.fs27{display:flex;flex-direction:column;min-height:100%}
.btn.red27{background:#E5534B;color:#fff}
.rs27{margin-top:auto;padding-top:28px}
.fs27>.back{align-self:flex-start}
</style>`);

/* Home: nothing about money to last. Only if some money sits outside every week, one small card asks what to do with it */
incomeRow17=function(){const m=M25();if(!m||m.loose<1)return '';
 return `<div class="nd21" style="margin-top:6px"><b>${money(m.loose)} isn't in any week</b><div class="row" style="gap:8px;margin-top:12px"><button class="btn s q" data-a="loose25|save">Put in savings</button><button class="btn s q" data-a="loose25|plan">Spread over 4 weeks</button></div></div>`};

/* Settings: full screen; Restart budgeting at the bottom, the only red button */
{const _s=SHEETS.settings;SHEETS.settings=p=>{const h=_s(p);if(p&&p.sub)return `<div class="fs27">${h}</div>`;
 return `<div class="fs27"><button class="back" data-a="closesheet">‹ Back</button>${h}<div class="rs27"><button class="btn red27" data-a="restart27">Restart budgeting</button><div class="sm" style="margin-top:8px;text-align:center">Set your money and weeks again. Past spends stay.</div></div></div>`}}
SHEETS.restart27=()=>`<div class="title" style="font-size:26px">Restart your budget?</div>
 <div class="sub" style="margin-top:8px">You will answer the first questions again: how much you have, what to keep aside, how long it lasts.</div>
 <div class="sub" style="margin-top:8px">Your past spends stay logged. Your savings stay if they fit.</div>
 <div class="col" style="gap:10px;margin-top:22px"><button class="btn red27" data-a="restart27go">Continue</button><button class="btn q" data-a="settings">Cancel</button></div>`;
H.restart27=()=>{openSheet('restart27',{});return false};
H.restart27go=()=>{UI.sheet=null;H.sync24();return false};

/* when savings do not fit, every pot keeps the same share (Tarun): not-in-a-goal money and each goal shrink by the same percentage */
function cutSavings26(cut){const gs=S.goals.filter(g=>g.state!=='done'&&g.saved>0),tot=S.free+gs.reduce((a,g)=>a+g.saved,0);if(!(cut>0)||tot<=0)return;
 const keep=Math.max(0,tot-cut),f=keep/tot;let given=0;gs.forEach(g=>{g.saved=Math.round(g.saved*f);given+=g.saved});S.free=Math.max(0,Math.round(keep-given))}
function keepNote27(n){if(n.cut>0)return `Your savings (${money(n.sv)}) don't fit. All of it goes down by ${Math.round(n.cut/n.sv*100)}%, so each goal keeps its share.`;
 if(n.cut<0)return n.sv>0?`Your savings (${money(n.sv)}) fit. They stay, and ${money(-n.cut)} more goes in.`:'';return n.sv>0?'Your savings fit. They stay as they are.':''}

/* the restart questions are the onboarding questions */
{const _f=FLOWS.sync24;FLOWS.sync24=F=>{let h=_f(F);const d=F.d;
 if(F.step===0){const ch=[3000,6000,10000,15000];h=h.replace('How much do you have now?','How much money do you have to plan?').replace('All of it, savings too. Trickle never sees your bank.','All of it, savings too. Trickle never sees your bank.')
.replace(/(<div class="hero")/,`<div class="row wrap" style="gap:8px;margin-top:14px">${ch.map(v=>`<button class="chip" data-a="kp27|${v}">${money(v)}</button>`).join('')}</div>$1`)}
 if(F.step===2)h=h.replace('>Start again</button>','>Restart my budget</button>');
 return h.replace('‹ Close</button>','‹ Cancel</button>')}}
H.kp27=a=>{UI.flow.d.kp=String(a[0])};
{const _go=H.sync24go;H.sync24go=()=>{const r=_go();const m=M25();say(`Restarted. ${money(m.budget)} for this week.`);return r}}

/* subscriptions: added, changed, paused, cancelled or removed → out of the money to spend now, and the week is worked out again */
function subRecalc27(name,what){if(!S.m25)return;S.m25.reset=stamp26();render();const m=M25();say(`${name?name+' ':''}${what}. Your week is now ${money(m.budget)}.`)}
['sfsave','addbill','subended','subpause','subremove'].forEach(k=>{const f=H[k];if(!f)return;H[k]=a=>{const n0=S.bills.length,ids=S.bills.map(b=>b.id+':'+b.amt+':'+(b.ended?1:0)+':'+(b.paused?1:0)).join();
 const inOnb=UI.flow&&UI.flow.id==='onb';const r=f(a);if(inOnb)return r;
 const ids1=S.bills.map(b=>b.id+':'+b.amt+':'+(b.ended?1:0)+':'+(b.paused?1:0)).join();if(ids1===ids)return r;
 const b=S.bills.length>n0?S.bills[S.bills.length-1]:(a&&a[0]&&S.bills.find(x=>x.id===a[0]));
 subRecalc27(b&&b.name,k==='subended'?'cancelled':k==='subpause'?(b&&b.paused?'paused':'back on'):k==='subremove'?'removed':S.bills.length>n0?'added':'changed');return false}});
/* demo profiles: their plan lasts as many weeks as their money covers at their weekly amount, so the first recalculation
   (a subscription, money in, Monday) gives about the same week instead of jumping */
{const _i=init25;init25=function(){_i();const A=S.m25,p0=A&&A.pools.find(p=>p.seed);if(p0&&A.seed&&A.seed.budget>0){const k=Math.max(1,Math.round(p0.amt/A.seed.budget));p0.end=sow(A.t0)+6*DAY+(k-1)*WK}}}

/* ===== v27.2 (12 Oct, Tarun): the onboarding picture shows the sum itself.
   To spend − subscriptions = what is left; what is left ÷ weeks = the weekly amount. Same boxes as the "Your week" sheet. ===== */
document.head.insertAdjacentHTML('beforeend',`<style>
.pic27{position:relative;margin-top:24px}
.pic27 .st{opacity:0}
.pic27.go .s1{animation:op22 .3s ease-out .2s forwards}
.pic27.go .s2{animation:dn22 .35s ease-out .9s forwards}
.pic27.go .s3{animation:dn22 .35s ease-out 1.7s forwards}
.pic27.go .s4{animation:dn22 .35s ease-out 2.5s forwards}
.pic27.go .s5{animation:op22 .3s ease-out 3.2s forwards}
.pic27 .lab{font-size:14px;color:var(--ink2)}
.pic27 .bar27{display:flex;gap:3px;height:44px;margin-top:6px}
.pic27 .bar27 i{display:flex;align-items:center;padding:0 10px;border-radius:8px;font-style:normal;font-weight:700;font-size:14px;white-space:nowrap;overflow:hidden}
.pic27 .ends{display:flex;justify-content:space-between;margin-top:6px;font-size:14px;font-weight:600}
.pic27 .sub27{background:repeating-linear-gradient(135deg,#B9A57A 0 6px,#a8946a 6px 12px);color:#1B1206}
.pic27 .wk27{display:flex;gap:4px;margin-top:10px;height:34px}
.pic27 .wk27 i{flex:1;background:color-mix(in srgb,var(--spend) 70%,#22252B);border-radius:8px;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12.5px;font-weight:700;color:#1B1206}
.pic27 .foot{margin-top:14px;font-size:15px;line-height:21px;color:var(--ink)}
#layer.still .pic27 .st{opacity:1}
@media (prefers-reduced-motion:reduce){.pic27 .st{opacity:1}}
</style>`);
function pic24(){const B=6000,sv=1200,sp=B-sv,subs=400,left=sp-subs,wks=4,wk=left/wks;
 return `<div class="pic27 go" role="img" aria-label="Example: ₹6,000. Save ₹1,200, ₹4,800 to spend. Subscriptions ₹400 come off first, leaving ₹4,400. ₹4,400 ÷ 4 weeks = ₹1,100 a week.">
 <div class="st s1"><div class="lab">Say you have ${money(B)} <span class="mut" style="font-size:12px">(an example)</span></div>
  <div class="bar27"><i style="flex:${sv};background:var(--save);color:#14161A">${money(sv)}</i><i style="flex:${sp};background:var(--spend);color:#1B1206">${money(sp)}</i></div>
  <div class="ends"><span style="color:var(--save)">Save</span><span>To spend</span></div></div>
 <div class="st s2" style="margin-top:16px"><div class="lab">Subscriptions come off first</div>
  <div class="bar27"><i style="flex:${left};background:var(--spend);color:#1B1206">${money(left)} left</i><i class="sub27" style="flex:${subs*2}">−${money(subs)}</i></div>
  <div class="ends"><span class="mut" style="font-weight:500">${money(sp)} − subscriptions</span><span class="mut" style="font-weight:500">Netflix, Spotify</span></div></div>
 <div class="st s3" style="margin-top:16px"><div class="eq20">${eqT20(money(left),'left')}<span class="op">÷</span>${eqT20(wks+' weeks','to last')}<span class="op">=</span>${eqT20(money(wk),'a week',1)}</div></div>
 <div class="st s4"><div class="wk27">${Array.from({length:wks},()=>`<i>${money(wk)}</i>`).join('')}</div></div>
 <p class="st s5 foot">Your weekly amount. Change a subscription and it is worked out again.</p></div>`}
H.replay24=()=>{const el=document.querySelector('.pic27,.pic22');if(el){el.classList.remove('go');void el.offsetWidth;el.classList.add('go')}return false};
