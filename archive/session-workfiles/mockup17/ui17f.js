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
