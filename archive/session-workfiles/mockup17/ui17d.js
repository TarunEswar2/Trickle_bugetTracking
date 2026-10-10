/* ===== v17.4 (9 Oct): savings that need action. Newly saved money that is not in a goal is the only savings number shown on Home.
   A new user is nudged to start a goal; with no goal the suggestion is an emergency fund. ===== */
const efTarget=()=>Math.max(2000,Math.round((S.W||1500)*13/500)*500);
const activeGoals=()=>S.goals.filter(g=>g.state!=='done');
H.efund=()=>{openSheet('addgoal',{name:'Emergency fund',kp:String(efTarget()),by:12});return false};
H.choosegoal=()=>{const g=activeGoals();if(!g.length)return H.efund();if(g.length===1){openSheet('fundgoal',{id:g[0].id});return false}openSheet('pickgoal',{});return false};
SHEETS.pickgoal=()=>`<div class="title" style="font-size:24px;margin-bottom:12px">Which savings goal?</div><div class="col" style="gap:8px">${activeGoals().map(g=>`<button class="li" data-a="fundpick|${g.id}"><span class="n">${esc(g.name)}</span><span class="t">${money(g.saved)} of ${money(g.target)} ›</span></button>`).join('')}</div>`;
H.fundpick=a=>{openSheet('fundgoal',{id:a[0]});return false};
SHEETS.fundgoal=({id})=>{const g=S.goals.find(x=>x.id===id);if(!g)return '';const free=Math.max(0,Math.floor(S.free)),amt=Math.min(free,Math.max(0,g.target-g.saved)||free);
 return `<div class="cap">${money(free)} saved, not in a savings goal</div><div class="title" style="font-size:26px;margin:4px 0 8px">Put ${money(amt)} in ${esc(g.name)}?</div><div class="sub" style="margin-bottom:16px">It stays your money. It just goes in a savings goal.</div><div class="col" style="gap:8px"><button class="btn" data-a="fundgo|${g.id}|${amt}">Put ${money(amt)} in</button><button class="btn q" data-a="closesheet">Not now</button></div>`};
H.fundgo=a=>{const amt=+a[1];if(amt>0)moveMoney(S,{type:'free'},{type:'goal',id:a[0]},amt);UI.sheet=null;say(money(amt)+' is in your savings goal.');return false};
/* after a new goal is added, offer the free money straight away */
{const _ga=H.goaladd;H.goaladd=()=>{const n=S.goals.length;_ga();if(S.goals.length>n&&S.free>=1){const g=S.goals[S.goals.length-1];openSheet('fundgoal',{id:g.id})}}}
/* the goal sheet offers an emergency fund first */
{const _ag=SHEETS.addgoal;SHEETS.addgoal=p=>_ag(p).replace(`<button class="chip ${p.name==='Trip'?'on':''}" data-a="gname|Trip">Trip</button>`,`<button class="chip ${p.name==='Emergency fund'?'on':''}" data-a="gname|Emergency fund">Emergency fund</button><button class="chip ${p.name==='Trip'?'on':''}" data-a="gname|Trip">Trip</button>`)}
/* Savings tab: the action first */
{const _ms=mnSav;mnSav=function(){const free=Math.floor(S.free),g=activeGoals();let top='';
  if(free>=1&&g.length===0)top=`<div class="card" style="margin-bottom:28px"><div class="cap">Needs a savings goal</div><div style="font-weight:650;font-size:17px;margin-top:4px">${money(free)} is saved. Put it in a savings goal.</div><div class="sub" style="margin-top:4px">Start with an emergency fund, about 3 months of spending: ${money(efTarget())}. You can skip the amount.</div><button class="btn" style="margin-top:12px" data-a="efund">Open an emergency fund</button></div>`;
  else if(free>=1)top=`<div class="card" style="margin-bottom:28px"><div class="cap">Needs a savings goal</div><div style="font-weight:650;font-size:17px;margin-top:4px">${money(free)} is saved. Put it in a savings goal.</div><button class="btn" style="margin-top:12px" data-a="choosegoal">Choose a savings goal</button></div>`;
  else if(g.length===0&&S.goals.length===0)top=`<div class="card" style="margin-bottom:28px"><div style="font-weight:650;font-size:17px">Start with an emergency fund.</div><div class="sub" style="margin-top:4px">A small pot for surprises. ${money(efTarget())} is about 3 months.</div><button class="btn" style="margin-top:12px" data-a="efund">Start it</button></div>`;
  return top+_ms()}}
/* Home: the only savings number is money that needs a decision */
{const _c=cards17;cards17=function(){const out=_c(),free=Math.floor(S.free),g=activeGoals();let c=null;
  if(free>=1)c={tag:'Savings',t:`${money(free)} is saved. Put it in a savings goal.`,sub:g.length?'Pick one.':'Start with an emergency fund.',a:g.length?'choosegoal':'efund',cta:'Choose',hot:true};
  else if(planned()&&S.goals.length===0)c={tag:'Savings',t:'Open a savings goal for surprises',sub:`An emergency fund. About 3 months of spending: ${money(efTarget())}.`,a:'efund',cta:'Open one'};
  if(c){const rest=out.filter(x=>x.tag!=='Soon');return [c,...rest].slice(0,7)}return out}}

/* ===== goals do not need an amount or a date (Tarun, 9 Oct). An emergency fund can just grow. ===== */
function gThere(g){return g.target>0?`${g.name} is now ${Math.round(Math.min(1,g.saved/g.target)*100)}% there.`:`${g.name} now has ${money(g.saved)}.`}
{const _ge=goalEta;goalEta=function(g){return g.target>0?_ge(g):'whenever you like'}}
H.efund=()=>{openSheet('addgoal',{name:'Emergency fund',open:true,kp:'',by:0});return false};
SHEETS.addgoal=p=>{p.name=p.name||'Emergency fund';if(p.open===undefined)p.open=p.name==='Emergency fund';if(p.by===undefined)p.by=0;if(p.kp===undefined)p.kp=p.open?'':'6000';const a=amtOf(p.kp),need=a&&p.by?Math.ceil(a/p.by/10)*10:0;
 return `<div class="h2">Add a savings goal</div><div class="row wrap" style="margin:10px 0">${['Emergency fund','Trip','Laptop','Phone','Bike','Course'].map(n=>`<button class="chip ${p.name===n?'on':''}" data-a="gname|${n}">${n}</button>`).join('')}</div>
 <div class="cap" style="margin:6px 0 6px">Amount (optional)</div><div class="row wrap"><button class="chip ${p.open?'on':''}" data-a="gopen|1">No set amount</button><button class="chip ${p.open?'':'on'}" data-a="gopen|0">Set an amount</button></div>
 ${p.open?`<div class="sub" style="margin:10px 0">${p.name==='Emergency fund'?`It just grows. A common target is about 3 months of spending, ${money(efTarget())}.`:'It just grows. You can set an amount later.'}</div>`:`<div class="field" style="font-size:30px;margin-top:10px">₹ ${esc(p.kp||'0')}</div><div class="cap" style="margin:12px 0 6px">By when (optional)</div><div class="row wrap">${[[0,'No date'],[6,'6 months'],[12,'1 year'],[24,'2 years']].map(o=>`<button class="chip ${p.by===o[0]?'on':''}" data-a="gby|${o[0]}">${o[1]}</button>`).join('')}</div><div class="sub" style="margin:10px 0">${need?`Save about ${money(need)} a month to get there.`:'No date, so it takes what is left.'}</div>${keypad('kp')}`}
 <div style="height:8px"></div><button class="btn ${p.open||a?'':'d'}" data-a="${p.open||a?'goaladd':'x'}">Add savings goal</button>`};
H.gopen=a=>{const p=UI.sheet.p;p._set=true;p.open=a[0]==='1';if(!p.open&&!p.kp)p.kp=p.name==='Emergency fund'?String(efTarget()):'6000'};
{H.gname=a=>{const p=UI.sheet.p;p.name=a[0];if(!p._set)p.open=a[0]==='Emergency fund'}}
H.goaladd=()=>{const p=UI.sheet.p,t=p.open?0:amtOf(p.kp);if(!p.open&&!t)return false;const n=S.goals.length;addGoal(S,{name:p.name,target:t,byMonths:t?(p.by||0):0});UI.sheet=null;say(`${p.name} added.`);if(S.goals.length>n&&S.free>=1){const g=S.goals[S.goals.length-1];openSheet('fundgoal',{id:g.id})};return false};
{const _sg=SCREENS.goal;SCREENS.goal=p=>{const g=S.goals.find(x=>x.id===p.id);if(!g||g.target>0)return _sg(p);const col=goalCol(g);
 return `<button class="back" data-a="back">‹ Savings</button><div class="title" style="font-size:30px">${esc(g.name)}</div><div class="sub" style="margin-top:6px">No set amount. It just grows.</div><div style="margin-top:20px"><span class="hero" style="font-size:42px">${money(g.saved)}</span><span class="sub" style="margin-left:8px">saved</span></div><div class="cap" style="margin:30px 0 10px">Added each month</div>${weeksBars((g.hist||[]).map(v=>Math.max(0,v)),col)}<div class="row sp sm" style="margin:8px 0 22px"><span>A year ago</span><span>This month</span></div><div class="col" style="gap:10px"><button class="btn" data-a="movefrom|${g.id}">Add money</button><button class="btn q" data-a="sheet|goaledit|${J({id:g.id})}">Edit</button></div>`}}

/* ===== v17.7 (9 Oct): editable goal name and target; custom categories back on the pay screen; clearer first nudge ===== */
HI.gnametxt=(a,el)=>{UI.sheet.p.name=el.value;return false};
{const _as=SHEETS.addgoal;SHEETS.addgoal=p=>{let h=_as(p);
  h=h.replace('<div class="cap" style="margin:6px 0 6px">Amount (optional)</div>',`<input class="field" style="width:100%;font-size:18px;margin:2px 0 8px" placeholder="Name your savings goal" value="${esc(p.name||'')}" data-i="gnametxt" maxlength="24" autocomplete="off"><div class="cap" style="margin:6px 0 6px">Amount (optional)</div>`);
  return h.replace(/<div class="h2">Add a goal<\/div>/,'<div class="h2">Add a goal</div>')}}
{const _ga2=H.goaladd;H.goaladd=()=>{const p=UI.sheet.p;p.name=(p.name||'').trim();if(!p.name){say('Give the savings goal a name.');return false}return _ga2()}}
/* edit: name, amount and date can all change later */
SHEETS.goaledit=p=>{const g=S.goals.find(x=>x.id===p.id);if(!g)return '';if(p.name===undefined){p.name=g.name;p.open=!(g.target>0);p.kp=g.target>0?String(g.target):'';p.by=g.byMonths||0}
 if(p.tgt){p.open=false;if(!p.kp)p.kp='6000';p.tgt=0}
 const a=amtOf(p.kp),need=a&&p.by?Math.ceil(a/p.by/10)*10:0;
 return `<div class="h2">Edit savings goal</div><input class="field" style="width:100%;font-size:18px;margin:10px 0 8px" value="${esc(p.name)}" data-i="gnametxt" maxlength="24" autocomplete="off">
 <div class="cap" style="margin:6px 0 6px">Amount (optional)</div><div class="row wrap"><button class="chip ${p.open?'on':''}" data-a="geopen|1">No set amount</button><button class="chip ${p.open?'':'on'}" data-a="geopen|0">Set an amount</button></div>
 ${p.open?'':`<div class="field" style="font-size:30px;margin-top:10px">₹ ${esc(p.kp||'0')}</div><div class="cap" style="margin:12px 0 6px">By when (optional)</div><div class="row wrap">${[[0,'No date'],[6,'6 months'],[12,'1 year'],[24,'2 years']].map(o=>`<button class="chip ${p.by===o[0]?'on':''}" data-a="geby|${o[0]}">${o[1]}</button>`).join('')}</div><div class="sub" style="margin:10px 0">${need?`Save about ${money(need)} a month to get there.`:''}</div>${keypad('kp')}`}
 <div class="col" style="gap:8px;margin-top:12px"><button class="btn ${p.open||a?'':'d'}" data-a="${p.open||a?'gesave':'x'}">Save</button><button class="btn q" data-a="gdone|${g.id}">Mark done</button><button class="btn o" data-a="gdel|${g.id}">Delete savings goal</button><div class="sm">Deleting returns its money to free savings.</div></div>`};
H.geopen=a=>{const p=UI.sheet.p;p.open=a[0]==='1';if(!p.open&&!p.kp)p.kp='6000'};
H.geby=a=>{UI.sheet.p.by=+a[0]};
H.gesave=()=>{const p=UI.sheet.p,g=S.goals.find(x=>x.id===p.id);if(!g)return false;const nm=(p.name||'').trim();if(!nm){say('Give the savings goal a name.');return false}g.name=nm;g.target=p.open?0:amtOf(p.kp);g.byMonths=g.target?(p.by||0):0;if(g.target>0&&g.saved<g.target&&g.state==='reached')g.state='active';reachedCheck(S);UI.sheet=null;say('Goal saved.');return false};
/* the goal screen shows the open-goal "Set an amount" next to Edit through the same sheet; nothing else to change */
/* pay screen: "+ New" opens the category search, where a new name can be created */
{const _ap=applyPick;applyPick=function(act,arg,id){if(act==='scan'){const d=UI.flow.d;d.cid=id;d.target={type:'cat',id};d.toK=id;d.catWhy='';UI.sheet=null;return}return _ap(act,arg,id)}}
{const _sc=scanConfirm;scanConfirm=function(F){let h=_sc(F);if(h.indexOf('data-a="scanmore"')>=0)return h.replace('data-a="scanmore">More</button>','data-a="scanmore">More or new</button>');
  const i=h.lastIndexOf('data-a="scancat|');if(i<0)return h;const j=h.indexOf('</button>',i)+9;return h.slice(0,j)+'<button class="chip" data-a="scanmore">+ New</button>'+h.slice(j)}}
/* first nudge for someone with no money added yet */
{const _c2=cards17;cards17=function(){const out=_c2();if(planned())return out;const rest=out.filter(x=>x.tag!=='Next'&&x.tag!=='Soon');
  return [{tag:'Start here',t:'Add the money you have',sub:'Split it into spending and saving. Then choose how long it should last.',a:'addmoney17',cta:'Add money',hot:true},...rest].slice(0,7)}}
{const _fi2=FLOWS.inc;FLOWS.inc=F=>{const h=_fi2(F);return F.step===0?h.replace('<div class="sub" style="margin-top:6px">Rough is fine.</div>','<div class="sub" style="margin-top:6px">Rough is fine. You will split it into spending and saving, then choose how long it lasts.</div>'):h}}
