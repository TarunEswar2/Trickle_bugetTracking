/* ===== v17.18 (10 Oct): savings goals, a better hero, a way into all insights ===== */
function savingsPanel17(){const act=S.goals.filter(g=>g.state!=='done');if(!act.length&&S.free<=0)return '';
 const T=savedTotal(S),_M=savingsSeries().M,thisM=_M[_M.length-1];
 return `<div class="viz17" style="margin:4px 0 22px"><div class="cap" style="margin:0">Saved this month</div><div style="font-size:40px;font-weight:700;margin-top:4px;line-height:1.1">${thisM>0?money(thisM):'₹0'}</div><div class="sm" style="margin-top:6px">${money(T)} saved in total</div></div>`}
function incomeRow17(){const l=S.incomes||[],now=S.now.getTime(),run=l.filter(i=>!i.end||i.end+DAY>now);if(!planned()&&!l.length)return '';
 const inTxt=run.length?`${money(run.reduce((a,i)=>a+i.amt,0))} · ${run.length===1?(run[0].end?'until '+shortD(run[0].end):'added'):run.length+' running'}`:'Not added yet';
 return `<div style="margin-top:22px">${row17('Pocket money & income',inTxt,'push|incomes')}</div>`}
/* hero */
function awareList17(){const out=[];if(S.nudgeOff||!planned())return out;const L=Math.max(0,flexL()),dl=daysToGo(),tail=L<=0?"This week's amount is used up.":`${money(L)} left for ${dl===1?'today':dl+' days'}.`;
 const h=statsHour();if(h.ok){const sN=6+2*h.pk,hh=S.now.getHours()+S.now.getMinutes()/60,hN=hh<6?hh+24:hh;if(hN>=sN-1&&hN<sN+2){const w=Math.max(1,Math.round(sN-hN));out.push({k:'hour',t:hN<sN?`In about ${w} hour${w>1?'s':''}, ${bandLabel(h.pk)} is when you spend most.`:`${bandLabel(h.pk)} is when you spend most.`})}}
 const d=statsDay();if(d.ok&&dowIdx(S.now.getTime())===d.pk)out.push({k:'day',t:`${FULLDAY[d.pk]}s are your biggest day.`});
 const m=statsMonth();if(m.ok&&phaseNow()===m.pk)out.push({k:'month',t:`${PHASE[m.pk]} is when you spend most.`});
 const r=out.slice(0,2);if(r.length)r[r.length-1].s=tail;return r}
function heroHome17(){const W=Math.max(1,flexW()),L=Math.max(0,flexL()),hs=homeState(),col=STATECOL[hs],dl=daysToGo(),ideal=weekIdeal(),rec=Math.round(ideal*W),aw=awareList17();
 const st=hs==='out'?(S.touched?'Over budget':'Budget used'):hs==='fast'?'Spending fast':'On track';
 return `<div class="hero17" style="border-color:${hs==='ok'?'#3B4553':col}">
 <div class="row sp" style="align-items:center"><span class="pill17" style="color:${col};background:${col}22"><i style="background:${col}"></i>${st}</span><button class="chip" data-a="gridhow">?</button></div>
 <div style="margin-top:14px"><span class="hero" style="font-size:72px;line-height:1;color:${hs==='out'?col:'var(--ink)'}">${money(L)}</span></div>
 <div style="font-size:18px;color:var(--ink2);margin-top:4px">left of ${money(W)} this week</div>
 <div class="row sp sm" style="margin:22px 0 8px"><span>₹0</span><span>${money(W)}</span></div>
 <div data-a="gridhow">${battery(L,W,{col,tick:ideal,label:'Recommended '+money(rec)})}</div>
 <div class="row" style="gap:12px;margin-top:46px;padding-top:14px;border-top:1px solid #3B4553"><div style="flex:1.1"><div style="font-size:18px;font-weight:700;white-space:nowrap">${dl===1?'Last day':dl+' days to go'}</div><div class="sm">${dl===1?'of this week':'this week'}</div></div><div style="flex:1.4">${L>0?`<div style="font-size:18px;font-weight:700;white-space:nowrap">${money(L/dl)} a day</div><div class="sm">to stay within budget</div>`:`<div style="font-size:18px;font-weight:700">Nothing to spend</div><div class="sm">until next week</div>`}</div></div>
 ${aw.length?`<div class="hu17box"><div class="cap" style="margin:0 0 6px;color:#E6B24F">Heads-up</div>${aw.map(x=>`<button class="hu17" data-a="insgo|${x.k}"><span>${esc(x.t)}${x.s?' '+esc(x.s):''}</span><i>›</i></button>`).join('')}</div>`:''}</div>`}
/* the heads-up lives in the hero, not in the cards */
{const _c6=cards17;cards17=function(){return _c6().filter(x=>x.tag!=='Heads-up')}}
/* a way into all the insights */
{const _car2=carousel17;carousel17=function(){const h=_car2();if(!h)return '';return `<div class="row sp" style="align-items:center;margin:0 0 10px"><span class="cap" style="margin:0">Insights</span><button class="navi17" data-a="push|insall">All insights <i>›</i></button></div>`+h}}
SCREENS.insall=()=>back17('Home')+`<div class="title" style="margin-bottom:6px">Insights</div>`+SCREENS.insights();
