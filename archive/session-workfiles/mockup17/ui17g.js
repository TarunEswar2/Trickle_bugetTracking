/* ===== v17.18 (10 Oct): piggy banks, a better hero, a way into all insights ===== */
let _pg=0;
function piggySvg(frac,col,size){const id='pg'+(++_pg),f=Math.max(0,Math.min(1,frac)),top=70-f*50;
 const body='M20 52c0-17 14-28 34-28h12c6 0 11 2 15 5l10-4-1 12c4 4 6 9 6 15 0 9-6 15-14 18v10h-12v-7H46v7H34V70C25 66 20 60 20 52z';
 return `<svg viewBox="0 0 104 92" width="${size}" height="${Math.round(size*.885)}" style="flex:none" aria-hidden="true"><defs><clipPath id="${id}"><path d="${body}"/></clipPath></defs><path d="${body}" fill="#1B2128" stroke="#8D97A3" stroke-width="2.5" stroke-linejoin="round"/><rect x="0" y="${top.toFixed(1)}" width="104" height="92" fill="${col}" clip-path="url(#${id})"/><path d="${body}" fill="none" stroke="#8D97A3" stroke-width="2.5" stroke-linejoin="round"/><rect x="44" y="28" width="18" height="4" rx="2" fill="#0F1215"/><circle cx="84" cy="46" r="2.8" fill="#E8ECF0"/></svg>`}
function piggyPanel17(){const _M=savingsSeries().M,thisM=_M[_M.length-1];const act=S.goals.filter(g=>g.state!=='done');if(!act.length&&S.free<=0)return '';
 const T=savedTotal(S),tg=act.filter(g=>g.target>0),sumT=tg.reduce((a,g)=>a+g.target,0),inT=tg.reduce((a,g)=>a+Math.min(g.saved,g.target),0),ref=sumT>0?sumT:efTarget(),frac=Math.min(1,(sumT>0?inT:T)/Math.max(1,ref));
  return `<div class="viz17 pig17">${piggySvg(frac,'#6FB08F',112)}<div style="min-width:0"><div class="cap" style="margin:0">Total saved</div><div style="font-size:30px;font-weight:700;margin-top:4px;line-height:1.1">${money(T)}</div><div class="sm" style="margin-top:4px">${sumT>0?`${Math.round(frac*100)}% of what they are saving for`:`${Math.round(frac*100)}% of an emergency fund of ${money(ref)}`}</div>${thisM>0?`<div class="sm">Up ${money(thisM)} this month</div>`:''}</div></div>`}
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
