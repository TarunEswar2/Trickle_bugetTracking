/* ===== v17.18 (10 Oct): savings goals, a better hero, a way into all insights ===== */
function savingsPanel17(){const act=S.goals.filter(g=>g.state!=='done');if(!act.length&&S.free<=0)return '';
 const T=savedTotal(S),_M=savingsSeries().M,thisM=_M[_M.length-1];
 return `<div class="viz17" style="margin:4px 0 22px"><div class="cap" style="margin:0">Total saved</div><div style="font-size:40px;font-weight:700;margin-top:4px;line-height:1.1">${money(T)}</div><div style="margin-top:12px;padding-top:10px;border-top:1px solid #2A3846;display:flex;justify-content:space-between;align-items:baseline"><span class="sm">Saved this month</span><b style="font-size:18px">${thisM>0?money(thisM):'₹0'}</b></div></div>`}
function incomeRow17(){const l=S.incomes||[],now=S.now.getTime(),run=l.filter(i=>!i.end||i.end+DAY>now);if(!planned()&&!l.length)return '';
 const inTxt=run.length?`${money(run.reduce((a,i)=>a+i.amt,0))} · ${run.length===1?(run[0].end?'until '+shortD(run[0].end):'added'):run.length+' running'}`:'Not added yet';
 return `<div style="margin-top:22px">${row17('Pocket money & income',inTxt,'push|incomes')}</div>`}
/* hero */
function awareList17(){const out=[];if(S.nudgeOff||!planned())return out;const L=Math.max(0,flexL()),dl=daysToGo(),tail=L<=0?"This week's amount is used up.":`${money(L)} left for ${dl===1?'today':dl+' days'}.`;
 const h=statsHour();if(h.ok){const sN=6+2*h.pk,hh=S.now.getHours()+S.now.getMinutes()/60,hN=hh<6?hh+24:hh;if(hN>=sN-1&&hN<sN+2){const w=Math.max(1,Math.round(sN-hN));out.push({k:'hour',t:hN<sN?`In about ${w} hour${w>1?'s':''}, ${bandLabel(h.pk)} is when you spend most.`:`${bandLabel(h.pk)} is when you spend most.`})}}
 const d=statsDay();if(d.ok&&dowIdx(S.now.getTime())===d.pk)out.push({k:'day',t:`${FULLDAY[d.pk]}s are your biggest day.`});
 const m=statsMonth();if(m.ok&&phaseNow()===m.pk)out.push({k:'month',t:`${PHASE[m.pk]} is when you spend most.`});
 const r=out.slice(0,2);if(r.length)r[r.length-1].s=tail;return r}
function weekIdealEod(){const from=S.weekFrom||wk0(),end=wk0()+7*DAY,d=new Date(S.now);d.setHours(0,0,0,0);const eod=d.getTime()+DAY;return Math.max(0,Math.min(1,(end-eod)/Math.max(DAY,end-from)))}
function heroHome17(){const W=Math.max(1,flexW()),L=Math.max(0,flexL()),hs=homeState(),col=STATECOL[hs],dl=daysToGo(),ideal=weekIdealEod(),rec=Math.round(ideal*W),aw=awareList17();
 const st=hs==='out'?(S.touched?'Over budget':'Budget used'):hs==='fast'?'Spending fast':'On track';
 return `<div class="hero17" style="border-color:${hs==='ok'?'#3B4553':col}">
 <div class="row sp" style="align-items:center"><span class="pill17" style="color:${col};background:${col}22"><i style="background:${col}"></i>${st}</span><span style="display:flex;gap:8px">${window.NAV17==='fab'?'<button class="chip" data-a="addmoney17">+ Add money</button>':''}<button class="chip" data-a="gridhow">?</button></span></div>
 <div style="margin-top:14px"><span class="hero" style="font-size:72px;line-height:1;color:${hs==='out'?col:'var(--ink)'}">${money(L)}</span></div>
 <div style="font-size:18px;color:var(--ink2);margin-top:4px">left of ${money(W)} this week</div>
 <div class="row sp sm" style="margin:22px 0 8px"><span>₹0</span><span>${money(W)}</span></div>
 <div data-a="gridhow">${battery(L,W,{col,tick:ideal,label:' '})}<div style="position:relative;height:30px;margin-top:6px"><span style="position:absolute;left:${(ideal*100).toFixed(1)}%;transform:translateX(-${(ideal*100).toFixed(1)}%);font-size:12.5px;font-weight:600;font-style:italic;color:var(--ink3);white-space:nowrap">Recommended ${money(rec)} by end of day</span></div></div>
 <div class="row" style="gap:12px;margin-top:14px;padding-top:14px;border-top:1px solid #3B4553"><div style="flex:1.1"><div style="font-size:18px;font-weight:700;white-space:nowrap">${dl===1?'Last day':dl+' days to go'}</div><div class="sm">${dl===1?'of this week':'this week'}</div></div><div style="flex:1.4">${L>0?`<div style="font-size:18px;font-weight:700;white-space:nowrap">${money(L/dl)} a day</div><div class="sm">to stay within budget</div>`:`<div style="font-size:18px;font-weight:700">Nothing to spend</div><div class="sm">until next week</div>`}</div></div>
 ${aw.length?`<div class="hu17box"><div class="cap" style="margin:0 0 6px;color:#E6B24F">Heads-up</div>${aw.map(x=>`<button class="hu17" data-a="insgo|${x.k}"><span>${esc(x.t)}${x.s?' '+esc(x.s):''}</span><i>›</i></button>`).join('')}</div>`:''}</div>`}
/* the heads-up lives in the hero, not in the cards */
{const _c6=cards17;cards17=function(){const k=new Set(awareList17().map(x=>x.k)),map={'Time of day':'hour','Day':'day','Month':'month'};return _c6().filter(x=>x.tag!=='Heads-up'&&!(map[x.tag]&&k.has(map[x.tag])))}}
/* a way into all the insights */
{const _car2=carousel17;carousel17=function(){const h=_car2();if(!h)return '';return `<div class="row sp" style="align-items:center;margin:0 0 10px"><span class="cap" style="margin:0">Insights</span><button class="navi17" data-a="push|insall">All insights <i>›</i></button></div>`+h}}
SCREENS.insall=()=>back17('Home')+`<div class="title" style="margin-bottom:6px">Insights</div>`+SCREENS.insights();

/* ===== v17.23: the home-screen widget is the hero card, smaller, with Log expense and Add money ===== */
function idleWidget17(P){const W=Math.max(1,flexW()),L=Math.max(0,flexL()),hide=UI.hsHide,am=v=>hide?'₹•••':money(v),hs=homeState(),col=STATECOL[hs],dl=daysToGo(),ideal=weekIdeal(),dlt=UI.hsDelta;
 const st=hs==='out'?(S.touched?'Over budget':'Budget used'):hs==='fast'?'Spending fast':'On track';
 const last=UI.hsLast?S.txns.find(t=>t.id===UI.hsLast):null;
 return `<div class="hs"><div class="hs-top"><span>${fmtTime(S.now)}</span><span>5G ▮</span></div><div class="hs-clock"><b>${fmtTime(S.now)}</b><span>${fmtDay(S.now)}</span></div>
 <div class="hs-wid hw17"><div class="row sp" style="align-items:center"><span class="pill17" style="color:${col};background:${col}22;font-size:12px;padding:4px 10px"><i style="background:${col}"></i>${st}</span><button class="hs-eye" data-a="hseye">${hide?'Show amounts':'Hide amounts'}</button></div>
 <div style="display:flex;align-items:baseline;gap:8px;margin-top:8px"><span class="hero" style="font-size:44px;line-height:1;color:${hs==='out'?col:'var(--ink)'}">${am(L)}</span><span style="font-size:14px;color:var(--ink2)">left of ${am(W)}</span>${dlt&&!hide?`<span class="hs-delta">−${money(dlt)}</span>`:''}</div>
 ${hide?'<div style="height:12px"></div>':`<div style="margin:12px 0 4px">${battery(L,W,{col,sm:true,tick:ideal,label:' ',prev:dlt?Math.min(1,(L+dlt)/W):undefined})}</div>`}
 <div class="sm" style="margin-top:6px">${dl===1?'Last day':dl+' days to go'}${L>0?` · ${am(L/dl)} a day`:''}</div>
 ${last?`<div class="hs-note"><span>Added ${hide?'':money(last.amt)+' · '}${esc(last.payee||'')}</span><button data-a="hsundo">Undo</button></div>`:''}${UI.hsNote?`<div class="hs-note"><span>${esc(UI.hsNote)}</span></div>`:''}
 <div class="hs-row" style="margin-top:12px"><button class="hs-btn pri" style="height:44px" data-a="hsadd">Log expense</button><button class="hs-btn" style="height:44px;border:1px solid var(--line)" data-a="hsmoney">Add money</button></div></div>
 <div class="hs-apps">${['Phone','Messages','Camera','Photos'].map(n=>`<span><i style="background:#2A313A"></i>${n}</span>`).join('')}</div>
 <button class="hs-close" data-a="hsclose">Leave the home screen</button><div class="sm" style="text-align:center;margin-top:6px">Simulated Android home screen. The widget never opens Trickle.</div></div>`}
{const _hs3=POPUPS.homescreen;POPUPS.homescreen=P=>{if(UI.hsAdd||UI.hsMoney)return _hs3(P).replace('Add a spend','Log expense');return idleWidget17(P)}}

/* ===== v17.24: widget. Place chips back under the buttons; "Other" for food delivery, shopping and anything else ===== */
{const _ih=idleWidget17;idleWidget17=function(P){let h=_ih(P);const chips=quickChips(),hide=UI.hsHide;
  if(!chips.length)return h;
  return h.replace('</div></div>\n <div class="hs-apps">',`</div><div class="hs-row" style="margin-top:8px">${chips.map((c,i)=>`<button class="hs-btn" data-a="hschip|${i}"><b>${esc(shortN(c.payee))}</b><i>${hide?'':money(c.amt)}</i></button>`).join('')}</div></div>\n <div class="hs-apps">`)}}
function otherList17(){const a=UI.hsAdd,q=(a.q||'').trim().toLowerCase(),top=new Set(topCats().slice(0,5));
 const rows=S.cats.filter(c=>!top.has(c.id)&&(!q||c.name.toLowerCase().includes(q)));const exact=S.cats.some(c=>c.name.toLowerCase()===q);
 return rows.map(c=>`<button class="hs-c ${a.cat===c.id?'on':''}" data-a="hscat|${c.id}"><i style="background:${catCol(catIdx(c.id))}"></i>${esc(c.name)}</button>`).join('')+(q&&!exact?`<button class="hs-c" data-a="hsnewcat">+ Use “${esc(a.q.trim())}”</button>`:'')||'<span class="sm">Type a name above.</span>'}
{const _hs4=POPUPS.homescreen;POPUPS.homescreen=P=>{const add=UI.hsAdd;if(!add||UI.hsMoney)return _hs4(P);
  const W=Math.max(1,flexW()),L=Math.max(0,flexL()),hide=UI.hsHide,am=v=>hide?'₹•••':money(v),amt=amtOf(add.kp),after=Math.max(0,L-amt),cats=topCats().slice(0,5),sel=add.cat,warn=sel&&amt?limWarn(sel,'Quick add',amt):'';
  const selName=sel?(S.cats.find(c=>c.id===sel)||{}).name:'';
  return `<div class="hs"><div class="hs-top"><span>${fmtTime(S.now)}</span><span>5G ▮</span></div><div class="hs-wid"><div class="row sp"><span class="cap">Log expense</span><button class="hs-eye" data-a="hseye">${hide?'Show amounts':'Hide amounts'}</button></div>
  <div class="row sp" style="align-items:baseline;margin-top:4px"><span class="hero" style="font-size:44px">${hide?'₹•••':'₹'+(add.kp||'0')}</span><span class="sm" style="text-align:right">${amt?`<span style="color:var(--ink3)">${am(L)}</span> → <b style="color:var(--ink)">${am(after)}</b> left`:`${am(L)} left`}</span></div>
  <div class="hs-chips">${[10,20,50,100].map(v=>`<button class="hs-c ${amt===v?'on':''}" data-a="hsamt|${v}">₹${v}</button>`).join('')}</div>
  <div class="hs-kp">${['1','2','3','4','5','6','7','8','9','','0','⌫'].map(k=>k?`<button data-a="hsk|${k}">${k}</button>`:'<span></span>').join('')}</div>
  <div class="cap" style="margin-top:10px">What for</div><div class="hs-chips" style="margin-top:4px">${cats.map(id=>{const c=S.cats.find(x=>x.id===id),i=catIdx(id);return `<button class="hs-c ${sel===id?'on':''}" data-a="hscat|${id}"><i style="background:${catCol(i)}"></i>${esc(c.name)}</button>`}).join('')}<button class="hs-c ${add.other?'on':''}" data-a="hsother">Other ›</button></div>
  ${add.other?`<input class="field" style="width:100%;font-size:15px;margin-top:8px" placeholder="Type a name: Zomato, Amazon, Rent" value="${esc(add.q||'')}" data-i="hscatq" autocomplete="off"><div class="hs-chips" id="hs-ol" style="margin-top:6px;max-height:84px;overflow:auto">${otherList17()}</div>`:''}
  ${sel&&!cats.includes(sel)?`<div class="sm" style="margin-top:6px">Selected: <b style="color:var(--ink)">${esc(selName)}</b></div>`:''}${warn?`<div class="sm" style="color:var(--amber);margin-top:8px">${esc(warn)}</div>`:''}
  <div class="hs-row"><button class="hs-btn" style="flex:.6;height:46px" data-a="hscancel">Cancel</button><button class="hs-btn pri ${amt&&sel?'':'dis'}" style="height:46px" data-a="${amt&&sel?'hslog':'x'}">Log ${amt?money(amt):''}</button></div></div></div>`}}
H.hsother=()=>{UI.hsAdd.other=!UI.hsAdd.other;UI.hsAdd.q=''};
HI.hscatq=(a,el)=>{UI.hsAdd.q=el.value;const o=document.getElementById('hs-ol');if(o)o.innerHTML=otherList17();return false};
H.hsnewcat=()=>{const a=UI.hsAdd,id=addCategory(a.q);if(id){a.cat=id;a.other=false;a.q=''}};
{const _hc=H.hscat;H.hscat=a=>{_hc(a);if(UI.hsAdd&&UI.hsAdd.other&&!topCats().slice(0,5).includes(a[0])){UI.hsAdd.other=false;UI.hsAdd.q=''}}}
