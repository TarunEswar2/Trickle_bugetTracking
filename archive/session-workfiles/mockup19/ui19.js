/* ===== v19: style revamp (Tarun's references, 10 Oct). Structure unchanged except: quick-action tiles on Home, pastel donut on Spending ===== */
window.NAV17='fab';
{const _h=heroHome17;heroHome17=function(){const h=_h().replace('<button class="chip" data-a="addmoney17">+ Add money</button>','');
 const t=(a,l,b,ic)=>`<button data-a="${a}"><i>${ic}</i><small>${l}</small><b>${b}</b></button>`;
 return h+`<div class="qa19">${t(scanOn()?'payscan':'pay','Add','Expense','−')}${t('addmoney17','Add','Money','+')}${t('tab|spending','See','Spends','✓')}</div>`}}
/* Home has the tiles, so no floating button there */
{const _a=window.afterRender;window.afterRender=()=>{if(_a)_a();if(UI.tab==='home'&&document.querySelector('.qa19')){const e=document.getElementById('cta17');if(e)e.remove();const v=document.getElementById('view');if(v)v.classList.remove('fab17v')}}}
function donut19(rows){const T=rows.reduce((a,r)=>a+r.amt,0)||1,R=88,C=2*Math.PI*R,gap=rows.length>1?9:0;let off=0;
 const seg=rows.map(r=>{const len=Math.max(4,C*r.amt/T-gap);const s=`<circle r="${R}" cx="115" cy="115" fill="none" stroke="${r.col}" stroke-width="26" stroke-linecap="round" stroke-dasharray="${len} ${C-len}" stroke-dashoffset="${-off}" transform="rotate(-90 115 115)"/>`;off+=C*r.amt/T;return s}).join('');
 const lg=rows.slice(0,8).map(r=>`<span><i style="background:${r.col}"></i><em style="font-style:normal;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(r.name)}</em><b>${Math.round(100*r.amt/T)}%</b></span>`).join('');
 return `<div class="dn19"><div style="position:relative"><svg viewBox="0 0 230 230">${seg}</svg><div class="ctr"><div class="hero" style="font-size:32px">${money(T)}</div><div class="sm">${(UI.sc||'week')==='week'?'this week':'spent'}</div></div></div></div><div class="lg19">${lg}</div>`}
{const _sb=stackBar;stackBar=function(rows,h){return window.__dn19?donut19(rows):_sb(rows,h)}}
{const _sp=cats17;cats17=function(){window.__dn19=1;try{return _sp().replace(/^<div class="row" style="align-items:baseline[\s\S]*?<\/span><\/div>/,'')}finally{window.__dn19=0}}}
