/* ===== v17.18 (10 Oct): piggy banks, a better hero, a way into all insights ===== */
function piggyPanel17(){const act=S.goals.filter(g=>g.state!=='done');if(!act.length&&S.free<=0)return '';
 const T=savedTotal(S),_M=savingsSeries().M,thisM=_M[_M.length-1];
 return `<div class="viz17" style="margin:4px 0 22px"><div class="cap" style="margin:0">Total saved</div><div style="font-size:40px;font-weight:700;margin-top:4px;line-height:1.1">${money(T)}</div>${thisM>0?`<div class="sm" style="margin-top:6px">Up ${money(thisM)} this month</div>`:''}</div>`}
/* hero */
function heroHome17(){const W=Math.max(1,flexW()),L=Math.max(0,flexL()),hs=homeState(),col=STATECOL[hs],dl=daysToGo(),ideal=weekIdeal(),rec=Math.round(ideal*W),aw=awareness();
 const st=hs==='out'?(S.touched?'Over budget':'Budget used'):hs==='fast'?'Spending fast':'On track';
 return `<div class="hero17" style="border-color:${hs==='ok'?'#3B4553':col}">
 <div class="row sp" style="align-items:center"><span class="pill17" style="color:${col};background:${col}22"><i style="background:${col}"></i>${st}</span><button class="chip" data-a="gridhow">?</button></div>
 <div style="margin-top:14px"><span class="hero" style="font-size:72px;line-height:1;color:${hs==='out'?col:'var(--ink)'}">${money(L)}</span></div>
 <div style="font-size:18px;color:var(--ink2);margin-top:4px">left of ${money(W)} this week</div>
 <div class="row sp sm" style="margin:22px 0 8px"><span>₹0</span><span>${money(W)}</span></div>
 <div data-a="gridhow">${battery(L,W,{col,tick:ideal,label:'Recommended '+money(rec)})}</div>
 <div class="row" style="gap:12px;margin-top:46px;padding-top:14px;border-top:1px solid #3B4553"><div style="flex:1.1"><div style="font-size:18px;font-weight:700;white-space:nowrap">${dl===1?'Last day':dl+' days to go'}</div><div class="sm">${dl===1?'of this week':'this week'}</div></div><div style="flex:1.4">${L>0?`<div style="font-size:18px;font-weight:700;white-space:nowrap">${money(L/dl)} a day</div><div class="sm">to stay within budget</div>`:`<div style="font-size:18px;font-weight:700">Nothing to spend</div><div class="sm">until next week</div>`}</div></div>
 ${aw?`<button class="hu17" data-a="insgo|${aw.k}"><b>Heads-up</b><span>${esc(aw.t)} ${esc(aw.s)}</span><i>›</i></button>`:''}</div>`}
/* the heads-up lives in the hero, not in the cards */
{const _c6=cards17;cards17=function(){return _c6().filter(x=>x.tag!=='Heads-up')}}
/* a way into all the insights */
{const _car2=carousel17;carousel17=function(){const h=_car2();if(!h)return '';return `<div class="row sp" style="align-items:center;margin:0 0 10px"><span class="cap" style="margin:0">Insights</span><button class="navi17" data-a="push|insall">All insights <i>›</i></button></div>`+h}}
SCREENS.insall=()=>back17('Home')+`<div class="title" style="margin-bottom:6px">Insights</div>`+SCREENS.insights();
