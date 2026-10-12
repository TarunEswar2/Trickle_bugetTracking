/* ===== v18 (10 Oct): visuals and structure after the "generic, not familiar, repeats" review.
   Research notes: docs/claude/v18_research.md. Changes: Manrope type and tonal surfaces; savings in indigo, mint kept for actions and good state;
   tab icons and a gear in the header; one floating Log expense button by default; the money split and how long it lasts are one screen. ===== */
window.NAV17='fab';
window.GEAR18='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>';
window.TABICON18=id=>{const p={home:'<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9.5h13V10"/><path d="M10 19.5v-5h4v5"/>',spending:'<path d="M5 3.5h14v17l-2.3-1.6-2.4 1.6-2.3-1.6-2.4 1.6-2.3-1.6L5 20.5z"/><path d="M8.5 8.5h7M8.5 12h7"/>',savings:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v9M9.5 10c0-1 1.1-1.7 2.5-1.7s2.5.7 2.5 1.7-1 1.5-2.5 1.8-2.5.8-2.5 1.8 1.1 1.7 2.5 1.7 2.5-.7 2.5-1.7"/>'}[id];return p?`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`:''};

/* ---------- Add money: amount, then one screen for the split and how long it lasts ---------- */
function planNums18(d){const a=amtOf(d.kp),pct=d.pct===undefined?20:d.pct,sav=savCalc(d,a,pct),sp=a-sav,t0=day0(),end=snapEnd(d.end||presetEnd(PRESETS[1])),days=daysIn(t0,end),wk=Math.max(5,r5b(sp/days*7)),left=daysIn(t0,wk0()+6*DAY),share=r5b(sp/days*left);return {a,pct,sav,sp,t0,end,days,wk,left,share}}
{const _inc=FLOWS.inc;FLOWS.inc=F=>{
 if(F.step===0)return _inc(F).replace(/<div class="steps">[\s\S]*?<\/div>/,'<div class="steps"><i class="on"></i><i></i></div>');
 const d=F.d,n=planNums18(d);if(!d.dur&&!d.cal)d.dur='1';
 const sel=d.cal?'cal':(d.dur||'1');
 return `<div class="mbody"><button class="back" data-a="incback">‹ Back</button><div class="steps"><i class="on"></i><i class="on"></i></div>
 <div class="title" style="margin-top:14px">Plan your ${money(n.a)}</div>
 <div class="cap" style="margin:22px 0 10px">Split</div>
 <input type="range" class="split18" min="0" max="100" step="1" value="${n.pct}" data-i="incpct18" style="--p:${n.pct}%" aria-label="Save share">
 <div class="row sp" style="margin-top:12px"><button class="tapamt18" data-a="incedit|sav"><span class="cap" style="margin:0;color:${SAVE}">Save · <span id="inc-pct">${n.pct}%</span></span><b id="inc-sav">${money(n.sav)}</b></button><button class="tapamt18 r" data-a="incedit|sp"><span class="cap" style="margin:0;color:${SPEND}">Spend</span><b id="inc-sp">${money(n.sp)}</b></button></div>
 <div class="cap" style="margin:24px 0 8px">Lasts</div>
 <div class="selwrap"><select class="sel18" data-i="incdur" aria-label="How long it lasts">${PRESETS.map((p,i)=>`<option value="${i}" ${sel===String(i)?'selected':''}>${p[0]}</option>`).join('')}<option value="cal" ${sel==='cal'?'selected':''}>Pick a date…</option></select></div>
 ${d.cal?`<div class="sm" style="margin:8px 0">Until Sunday ${fmtDate(n.end)}</div>${calHtml(d,n.t0,n.end)}`:`<div class="sm" style="margin-top:8px">Until Sunday ${fmtDate(n.end)} · ${n.days} days</div>`}
 <div class="allow18"><div class="cap" style="margin:0">Your weekly allowance</div><div style="display:flex;align-items:baseline;gap:8px;margin-top:6px"><span class="hero" id="wk18" style="font-size:40px">${money(n.wk)}</span><span class="sub">a week</span></div><div class="sm" id="wksub18" style="margin-top:4px">${money(n.sp)} over ${n.days} days.${n.left<7?` This week gets ${money(n.share)} for the ${n.left} day${n.left>1?'s':''} left.`:''}</div></div></div>
 <div class="mfoot"><div class="col" style="gap:8px"><button class="btn" data-a="incfinish">${planned()?'Update my week':'Start my week'}</button><button class="btn q" data-a="incdone">Just add the money</button></div></div>`}}
HI.incpct18=(a,el)=>{const d=UI.flow.d;d.pct=+el.value;d.savX=null;const n=planNums18(d);el.style.setProperty('--p',n.pct+'%');$('#inc-pct').textContent=n.pct+'%';$('#inc-sav').textContent=money(n.sav);$('#inc-sp').textContent=money(n.sp);$('#wk18').textContent=money(n.wk);$('#wksub18').textContent=`${money(n.sp)} over ${n.days} days.`+(n.left<7?` This week gets ${money(n.share)} for the ${n.left} day${n.left>1?'s':''} left.`:'');return false};
HI.incdur=(a,el)=>{const d=UI.flow.d,v=el.value;if(v==='cal'){d.cal=true;d.dur='cal'}else{d.cal=false;d.dur=v;d.end=presetEnd(PRESETS[+v]);const e=new Date(d.end),n=new Date(day0());d.cm=(e.getFullYear()-n.getFullYear())*12+e.getMonth()-n.getMonth()}};
H.incnext=()=>{const d=UI.flow.d;UI.flow.step=1;d.pct=20;d.savX=null;if(!d.end){d.end=presetEnd(PRESETS[1]);d.dur='1';d.cal=false;const e=new Date(d.end),n=new Date(day0());d.cm=(e.getFullYear()-n.getFullYear())*12+e.getMonth()-n.getMonth()}};
/* the typed amounts update the one slider too */
{const _ad=H.amtdone;H.amtdone=a=>{_ad(a)}}
