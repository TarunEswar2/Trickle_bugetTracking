/* ===== v19: style revamp (Tarun's references, 10 Oct). Structure unchanged except: quick-action tiles on Home, pastel donut on Spending ===== */
window.NAV17='bar';
function donut19(rows){const T=rows.reduce((a,r)=>a+r.amt,0)||1,R=88,C=2*Math.PI*R,gap=rows.length>1?9:0;let off=0;
 const seg=rows.map(r=>{const len=Math.max(4,C*r.amt/T-gap);const s=`<circle r="${R}" cx="115" cy="115" fill="none" stroke="${r.col}" stroke-width="26" stroke-linecap="round" stroke-dasharray="${len} ${C-len}" stroke-dashoffset="${-off}" transform="rotate(-90 115 115)"/>`;off+=C*r.amt/T;return s}).join('');
 const lg=rows.slice(0,8).map(r=>`<span><i style="background:${r.col}"></i><em style="font-style:normal;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(r.name)}</em><b>${Math.round(100*r.amt/T)}%</b></span>`).join('');
 return `<div class="dn19"><div style="position:relative"><svg viewBox="0 0 230 230">${seg}</svg><div class="ctr"><div class="hero" style="font-size:32px">${money(T)}</div><div class="sm">${(UI.sc||'week')==='week'?'this week':'spent'}</div></div></div></div><div class="lg19">${lg}</div>`}
{const _sb=stackBar;stackBar=function(rows,h){return window.__dn19?donut19(rows):_sb(rows,h)}}
{const _sp=cats17;cats17=function(){window.__dn19=1;try{return _sp().replace(/^<div class="row" style="align-items:baseline[\s\S]*?<\/span><\/div>/,'')}finally{window.__dn19=0}}}

/* ===== v19.3 (10 Oct, from Tarun's Gemini screenshots): centre + button in the tab bar opens Log expense / Add money / Move money; category icons in tinted circles ===== */
const ICO19=[[/food|lunch|meal|dinner|eat|canteen|mess/,'🍔'],[/chai|coffee|tea|cafe/,'☕'],[/snack/,'🍿'],[/travel|transport|auto|uber|bus|metro|fuel|petrol|cab/,'🚌'],[/phone|data|recharge|mobile|internet|wifi/,'📱'],[/college|study|book|stationer|educat|course|fee|print/,'🎓'],[/rent|room|hostel|laundry/,'🏠'],[/shop|cloth|fashion/,'🛍️'],[/fun|movie|game|entertain|outing|party|trip/,'🎬'],[/health|medic|pharma|doctor/,'💊'],[/subscri|netflix|spotify|prime/,'🔁'],[/gym|sport/,'🏋️'],[/gift/,'🎁'],[/saving|goal|bought/,'💰'],[/other|unsorted|uncategor/,'✨']];
const ico19=n=>{n=(n||'').toLowerCase();for(const [r,e] of ICO19)if(r.test(n))return e;return '🏷️'};
function icSpan19(name,cssCol){let bg='rgba(255,255,255,.08)';const m=/rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(cssCol||'');if(m&&!/rgba\(0, 0, 0, 0\)/.test(cssCol))bg=`rgba(${m[1]},${m[2]},${m[3]},.2)`;const s=document.createElement('span');s.className='ic19';s.style.background=bg;s.textContent=ico19(name);return s}
SHEETS.plus19=()=>{const r=(a,e,t,s)=>`<button class="li pl19" data-a="plus19go|${a}"><span class="ic19" style="background:rgba(111,211,174,.16)">${e}</span><span class="n">${t}<span class="mut" style="display:block;font-weight:500;font-size:12.5px">${s}</span></span><span class="t">›</span></button>`;
 return `<div class="title" style="font-size:22px;margin-bottom:14px">Add</div><div class="col" style="gap:8px">${r(scanOn()?'payscan':'pay','💸','Log expense','Scan a shop QR or type it')}${r('addmoney17','📥','Add money','Pocket money or income')}${r('movefrom|free','🔄','Move money','Savings to spend, or to a goal')}</div>`};
H.plus19=()=>{openSheet('plus19');return false};
H.plus19go=a=>{UI.sheet=null;const n=a[0];if(H[n])H[n](a.slice(1));render();return false};
{const _a=window.afterRender;window.afterRender=()=>{if(_a)_a();
 const c=document.getElementById('cta17');if(c)c.remove();
 const tb=document.getElementById('tabbar');
 if(tb&&!tb.querySelector('.plus19')){const b=tb.querySelectorAll('button[data-a^="tab|"]');if(b.length>=3){const p=document.createElement('button');p.className='plus19';p.dataset.a='plus19';p.setAttribute('aria-label','Add');p.innerHTML='<b>+</b>';b[1].after(p);
   const g=document.createElement('button');g.className='gear19';g.dataset.a='settings';g.setAttribute('aria-label','Settings');g.innerHTML=window.GEAR18+'<span>Settings</span>';tb.appendChild(g)}}
 document.querySelectorAll('.cr17 > i').forEach(i=>{const nm=i.parentElement.querySelector('.nm');const n=nm&&nm.firstChild?nm.firstChild.textContent:'';i.replaceWith(icSpan19(n,getComputedStyle(i).backgroundColor))});
 document.querySelectorAll('.tx17 > .d').forEach(d=>{const m=d.parentElement.querySelector('.mut');const n=m?m.textContent.split(' · ')[0]:'';d.replaceWith(icSpan19(n,getComputedStyle(d).backgroundColor))})}}
