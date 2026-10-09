/* ===== v17.4 (9 Oct): savings that need action. Newly saved money that is not in a goal is the only savings number shown on Home.
   A new user is nudged to start a goal; with no goal the suggestion is an emergency fund. ===== */
const efTarget=()=>Math.max(2000,Math.round((S.W||1500)*13/500)*500);
const activeGoals=()=>S.goals.filter(g=>g.state!=='done');
H.efund=()=>{openSheet('addgoal',{name:'Emergency fund',kp:String(efTarget()),by:12});return false};
H.choosegoal=()=>{const g=activeGoals();if(!g.length)return H.efund();if(g.length===1){openSheet('fundgoal',{id:g[0].id});return false}openSheet('pickgoal',{});return false};
SHEETS.pickgoal=()=>`<div class="title" style="font-size:24px;margin-bottom:12px">Which goal?</div><div class="col" style="gap:8px">${activeGoals().map(g=>`<button class="li" data-a="fundpick|${g.id}"><span class="n">${esc(g.name)}</span><span class="t">${money(g.saved)} of ${money(g.target)} ›</span></button>`).join('')}</div>`;
H.fundpick=a=>{openSheet('fundgoal',{id:a[0]});return false};
SHEETS.fundgoal=({id})=>{const g=S.goals.find(x=>x.id===id);if(!g)return '';const free=Math.max(0,Math.floor(S.free)),amt=Math.min(free,Math.max(0,g.target-g.saved)||free);
 return `<div class="cap">${money(free)} saved, not in a goal</div><div class="title" style="font-size:26px;margin:4px 0 8px">Put ${money(amt)} in ${esc(g.name)}?</div><div class="sub" style="margin-bottom:16px">It stays your money. It just gets a job.</div><div class="col" style="gap:8px"><button class="btn" data-a="fundgo|${g.id}|${amt}">Put ${money(amt)} in</button><button class="btn q" data-a="closesheet">Not now</button></div>`};
H.fundgo=a=>{const amt=+a[1];if(amt>0)moveMoney(S,{type:'free'},{type:'goal',id:a[0]},amt);UI.sheet=null;say(money(amt)+' is in your goal.');return false};
/* after a new goal is added, offer the free money straight away */
{const _ga=H.goaladd;H.goaladd=()=>{const n=S.goals.length;_ga();if(S.goals.length>n&&S.free>=1){const g=S.goals[S.goals.length-1];openSheet('fundgoal',{id:g.id})}}}
/* the goal sheet offers an emergency fund first */
{const _ag=SHEETS.addgoal;SHEETS.addgoal=p=>_ag(p).replace(`<button class="chip ${p.name==='Trip'?'on':''}" data-a="gname|Trip">Trip</button>`,`<button class="chip ${p.name==='Emergency fund'?'on':''}" data-a="gname|Emergency fund">Emergency fund</button><button class="chip ${p.name==='Trip'?'on':''}" data-a="gname|Trip">Trip</button>`)}
/* Savings tab: the action first */
{const _ms=mnSav;mnSav=function(){const free=Math.floor(S.free),g=activeGoals();let top='';
  if(free>=1&&g.length===0)top=`<div class="card" style="margin-bottom:14px"><div class="cap">Needs a job</div><div style="font-weight:650;font-size:17px;margin-top:4px">${money(free)} is saved but not in a goal.</div><div class="sub" style="margin-top:4px">Most people start with an emergency fund, about 3 months of spending: ${money(efTarget())}.</div><button class="btn" style="margin-top:12px" data-a="efund">Start an emergency fund</button></div>`;
  else if(free>=1)top=`<div class="card" style="margin-bottom:14px"><div class="cap">Needs a job</div><div style="font-weight:650;font-size:17px;margin-top:4px">${money(free)} is saved but not in a goal.</div><button class="btn" style="margin-top:12px" data-a="choosegoal">Put it in a goal</button></div>`;
  else if(g.length===0&&S.goals.length===0)top=`<div class="card" style="margin-bottom:14px"><div style="font-weight:650;font-size:17px">Start with an emergency fund.</div><div class="sub" style="margin-top:4px">A small pot for surprises. ${money(efTarget())} is about 3 months.</div><button class="btn" style="margin-top:12px" data-a="efund">Start it</button></div>`;
  return top+_ms()}}
/* Home: the only savings number is money that needs a decision */
{const _c=cards17;cards17=function(){const out=_c(),free=Math.floor(S.free),g=activeGoals();let c=null;
  if(free>=1)c={tag:'Savings',t:`${money(free)} is saved. Give it a job.`,sub:g.length?'Put it in a goal.':'Start an emergency fund.',a:g.length?'choosegoal':'efund',cta:'Choose',hot:true};
  else if(planned()&&S.goals.length===0)c={tag:'Savings',t:'Start an emergency fund',sub:`About 3 months of spending: ${money(efTarget())}.`,a:'efund',cta:'Add a goal'};
  if(c){const rest=out.filter(x=>x.tag!=='Soon');return [c,...rest].slice(0,7)}return out}}
