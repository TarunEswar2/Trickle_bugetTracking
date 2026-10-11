/* ===== v26 (11 Oct, Tarun): events are the truth; the bank balance is a check, not the master.
   Logic gaps from the review of "Trickle money model: system plan", closed here. Explained in docs/claude/v26_money_model.md ===== */

/* gap 1: subscriptions. Money for bills due before the plans end is held back, and the charge does not count against the week */
function reserve26(from,to){if(!(to>from))return 0;let r=0;(S.bills||[]).forEach(b=>{if(b.ended||b.paused||!b.nextDue)return;let d=new Date(b.nextDue),g=0;
 while(d.getTime()<=to&&g++<60){if(d.getTime()>from&&!(b.trialUntil&&d.getTime()<b.trialUntil))r+=b.amt;d=nextDueAfter(Object.assign({},b,{nextDue:d}))}});return Math.round(r)}

/* gap 5: which goal shrinks. Money not in a goal goes first, then every goal in proportion to what it holds */
function cutSavings26(cut){const f=Math.min(S.free,cut);S.free-=f;cut-=f;const gs=S.goals.filter(g=>g.state!=='done'&&g.saved>0),tot=gs.reduce((a,g)=>a+g.saved,0);
 if(cut>0&&tot>0){let left=cut;gs.forEach((g,i)=>{const c=i===gs.length-1?Math.min(g.saved,left):Math.min(g.saved,Math.round(cut*g.saved/tot));g.saved-=c;left-=c})}}

/* the bank check: a sync records the difference as one "untracked" entry instead of quietly overwriting */
{const _go=H.sync24go;H.sync24go=()=>{const m=M25(),X=amtOf(UI.flow.d.kp),now=S.now.getTime(),prev=(S.cp26||[]).slice(-1)[0];
 const entry={t:now,expected:m.B,stated:X,diff:X-m.B,from:prev?prev.t:(S.m25?S.m25.t0:now)};const r=_go();(S.cp26=S.cp26||[]).push(entry);return r}}

/* untracked weeks: a week that closes with no entries is unknown, so its "leftover" is not swept into savings, and Insights skip it */
const wkHasEntry26=w0=>S.txns.some(t=>t.t>=w0&&t.t<w0+7*DAY&&(isSp(t)||t.kind==='fixed'));
{const _ap=applyPending;applyPending=function(S0,p,o){if(o&&o.to==='savings'&&p&&p.week&&!wkHasEntry26(new Date(p.week).getTime()))o=Object.assign({},o,{to:'next'});return _ap(S0,p,o)}}
{const _sd=statsDay;statsDay=function(){const r=_sd();const ws=wk0(),tracked=[1,2,3,4].filter(k=>wkHasEntry26(ws-k*7*DAY)).length||1;if(tracked<4){r.vals=r.vals.map(v=>Math.round(v*4/tracked));r.pk=r.vals.indexOf(Math.max(...r.vals))}return r}}

/* Balance screen: say plainly that this is what Trickle expects, and show held money and the checks with the bank */
{const _b=SCREENS.bal24;SCREENS.bal24=()=>{const m=M25();let h=_b();
 if(m.held>0)h=h.replace('<div class="ln25 tot">',`<div class="ln25"><i style="background:#B9A57A"></i><span>Held for subscriptions<small>due before your plans end</small></span><b>${money(m.held)}</b></div><div class="ln25 tot">`);
 const cps=(S.cp26||[]).slice().reverse();
 if(cps.length)h=h.replace('<div class="col" style="gap:10px;margin-top:26px">',sec20('Checks with your bank')+`<div class="col" style="gap:0">${cps.map(c=>`<div class="ln25"><span>${shortD(c.t)}<small>Trickle expected ${money(c.expected)}, your bank had ${money(c.stated)}</small></span><b>${Math.abs(c.diff)<1?'matched':(c.diff>0?'+':'−')+money(Math.abs(c.diff))+' untracked'}</b></div>`).join('')}</div><div class="col" style="gap:10px;margin-top:26px">`);
 return h.replace('<div class="sm">What should be in your bank</div>','<div class="sm">What Trickle expects in your bank. Your bank is the real number.</div>')}}

/* order, not just time: the mockup clock stands still between taps, so a reset is stamped just after the last entry,
   and any entry made after a reset is stamped at or after it. A spend made before money came in can never count against the new week. */
function stamp26(){const n=S.now.getTime();return Math.max(n,...S.txns.slice(0,8).map(t=>t.t),(S.m25&&S.m25.reset)||0)+1}
function restamp26(np){if(!S.m25)return;const st=stamp26();S.m25.reset=st;S.m25.pools.slice(np).forEach(p=>{if(p.start>=S.now.getTime()-1)p.start=st})}
{const _ai=addIncome;addIncome=function(d,w){const np=S.m25?S.m25.pools.length:0;const r=_ai(d,w);restamp26(np);return r}}
{const _mm=moveMoney;moveMoney=function(S0,f,t,a){const np=S0.m25?S0.m25.pools.length:0;const r=_mm(S0,f,t,a);if(S0.m25&&S0.m25.pools.length>np)restamp26(np);return r}}
{const _go=H.sync24go;H.sync24go=()=>{const r=_go();if(S.m25){const st=stamp26();S.m25.t0=st;S.m25.reset=st;S.m25.pools.forEach(p=>p.start=st)}return r}}
{const _lo=H.loose25;H.loose25=a=>{const np=S.m25?S.m25.pools.length:0;const r=_lo(a);if(S.m25&&S.m25.pools.length>np)restamp26(np);return r}}
{const _dp=doPay;doPay=function(S0,o){const r=_dp(S0,o);if(S0.m25&&r&&r.txn&&r.txn.t<S0.m25.reset)r.txn.t=S0.m25.reset;return r}}
