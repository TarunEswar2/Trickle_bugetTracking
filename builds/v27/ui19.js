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
}}

/* ===== v19.4 (10 Oct): hero card with no repeated numbers. Budget shown once, pace carried by the bar colour and tick alone (no status pill), days as 7 dots ===== */
heroHome17=function(){const W=Math.max(1,flexW()),L=Math.max(0,flexL()),hs=homeState(),col=STATECOL[hs],dl=Math.max(1,Math.min(7,daysToGo())),ideal=weekIdealEod(),rec=Math.round(ideal*W),aw=awareList17();
 const word=hs==='out'?(S.touched?'Over budget':'Budget used'):hs==='fast'?'Spending fast':'On track';
 const dots=Array.from({length:7},(_,i)=>`<i class="${i<dl?'on':''}"></i>`).join('');
 return `<div class="hero17 h19"><div class="row sp" style="align-items:center"><span class="cap" style="margin:0">Left this week</span><button class="chip" data-a="gridhow" aria-label="How to read this">?</button></div>
 <div style="margin-top:8px;display:flex;align-items:baseline;gap:10px;flex-wrap:wrap"><span class="hero" style="font-size:68px;line-height:1;color:${hs==='out'?col:'var(--ink)'}">${money(L)}</span><span style="font-size:17px;color:var(--ink2)">of ${money(W)}</span></div>
 <div data-a="gridhow" style="margin-top:20px">${battery(L,W,{col,tick:ideal,label:' '})}<div style="position:relative;height:26px;margin-top:6px"><span style="position:absolute;left:${(ideal*100).toFixed(1)}%;transform:translateX(-${(ideal*100).toFixed(1)}%);font-size:12.5px;font-weight:600;white-space:nowrap;color:${hs==='ok'?'var(--ink3)':col}">${hs==='ok'?'':word+' · '}${money(rec)} by tonight</span></div></div>
 <div class="row" style="gap:12px;margin-top:10px;padding-top:14px;border-top:1px solid rgba(255,255,255,.08);align-items:center"><div style="flex:1"><div class="wd19" role="img" aria-label="${dl} of 7 days left">${dots}</div><div class="sm" style="margin-top:6px">${dl===1?'Last day':dl+' days left'}</div></div><div style="flex:1;text-align:right">${L>0?`<div style="font-size:18px;font-weight:700;white-space:nowrap">${money(L/dl)} a day</div><div class="sm">to stay on budget</div>`:`<div style="font-size:18px;font-weight:700">Nothing to spend</div><div class="sm">until next week</div>`}</div></div>
 ${aw.length?`<div class="hu17box"><div class="cap" style="margin:0 0 6px;color:#E6B24F">Heads-up</div>${aw.map(x=>`<button class="hu17" data-a="insgo|${x.k}"><span>${esc(x.t)}${x.s?' '+esc(x.s):''}</span><i>›</i></button>`).join('')}</div>`:''}</div>`};
