/* ===== v17.16 (10 Oct): visual hierarchy. Three greys for three kinds of information, and the two main buttons snap to the bar above the tab bar ===== */
/* 1. Log expense and Add money: a fixed bar sitting on the tab bar (Home only) */
{const _ar6=window.afterRender;window.afterRender=()=>{if(_ar6)_ar6();const ph=document.getElementById('phone'),view=document.getElementById('view');if(!ph||!view)return;
  const show=UI.tab==='home'&&!(UI.stack&&UI.stack.length)&&!UI.flow&&!UI.popup&&!UI.sheet&&S&&S.cats;let el=document.getElementById('cta17');
  view.classList.toggle('home17',!!show);
  if(!show){if(el)el.remove();return}
  const tb=document.getElementById('tabbar');const h=tb?tb.offsetHeight:84;
  if(!el){el=document.createElement('div');el.id='cta17';ph.appendChild(el)}
  el.style.bottom=h+'px';
  el.innerHTML=`<div class="row" style="gap:10px"><button class="btn" style="flex:3" data-a="${scanOn()?'payscan':'pay'}">Log expense</button><button class="btn q" style="flex:2;white-space:nowrap" data-a="addmoney17">Add money</button></div>`}}
/* 2. graphs sit on their own surface */
{const _sb=stackBar;stackBar=function(rows,h){return `<div class="viz17">${_sb(rows,h)}</div>`}}
{const _as=areaSvg;areaSvg=function(v,c){return `<div class="viz17">${_as(v,c)}</div>`}}
{const _wb=weeksBars;weeksBars=function(v,c){return `<div class="viz17">${_wb(v,c)}</div>`}}
{const _ts=trendSvg;trendSvg=function(){return `<div class="viz17">${_ts.apply(null,arguments)}</div>`}}

/* ===== v17.17 (10 Oct): the top of Home is the hero widget ===== */
function heroHome17(){const W=Math.max(1,flexW()),L=Math.max(0,flexL()),hs=homeState(),col=STATECOL[hs],dl=daysToGo(),ideal=weekIdeal(),rec=Math.round(ideal*W);
 const st=hs==='out'?(S.touched?'Over this week. Savings used.':'Nothing left this week.'):hs==='fast'?'Spending a bit fast.':hs==='ok'?'On track.':'';
 return `<div class="hero17" style="border-color:${hs==='ok'?'#343C47':col}">
 <div class="row sp" style="align-items:center"><span class="cap" style="margin:0">Left this week</span><button class="chip" data-a="gridhow">?</button></div>
 <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span class="hero" style="font-size:68px;line-height:1;color:${hs==='out'?col:'var(--ink)'}">${money(L)}</span><span style="font-size:18px;color:var(--ink2)">of ${money(W)}</span></div>
 <div style="margin-top:6px;font-weight:650;color:${hs==='ok'?'var(--ink2)':col}">${st}</div>
 <div class="row sp sm" style="margin:18px 0 6px"><span>₹0</span><span>${money(W)} = full budget</span></div>
 <div data-a="gridhow">${battery(L,W,{col,tick:ideal,label:'Recommended '+money(rec)})}</div>
 <div class="row" style="gap:12px;margin-top:44px;padding-top:14px;border-top:1px solid #353D48"><div style="flex:1.1"><div style="font-size:18px;font-weight:700;white-space:nowrap">${dl===1?'Last day':dl+' days to go'}</div><div class="sm">${dl===1?'of this week':'this week'}</div></div><div style="flex:1.4">${L>0?`<div style="font-size:19px;font-weight:700">${money(L/dl)} a day</div><div class="sm">to stay within budget</div>`:`<div style="font-size:19px;font-weight:700">Budget used</div><div class="sm">wait for next week</div>`}</div></div></div>`}
SHEETS.gridhow=()=>{const W=Math.max(1,flexW());return `<div class="title" style="font-size:24px;margin-bottom:14px">How to read this</div><div class="col" style="gap:10px"><div class="sub">The big number is what is left of your budget for the week.</div><div class="sub">The bar runs from ₹0 to your budget for the week, ${money(W)}.</div><div class="sub">The line is the recommended amount to have left by today. Below the line means you are spending faster than the week allows.</div></div><div style="margin:22px 0 40px">${battery(W*.62,W,{tick:.45,label:'Recommended'})}</div><div class="row sp" style="margin-top:18px"><button class="lnk" data-a="why|bar">Why a bar?</button><button class="btn s" data-a="closesheet" style="width:auto">OK</button></div>`};
