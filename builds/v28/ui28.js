/* ===== v28 (13 Oct, Tarun): a new visual language. "Paper": warm paper, ink outlines, sticker shadows, a soft serif for numbers,
   handwriting for small notes, and things that press and spring. Nothing about the money model changes (v27).
   Tokens and reasons: docs/claude/v28_visual_language.md ===== */

/* fonts: Fraunces (soft serif, numbers and titles), Figtree (reading), Caveat (handwritten notes) */
document.head.insertAdjacentHTML('beforeend',`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,500..800,0..100,0..1&family=Caveat:wght@500;700&family=Figtree:wght@400;500;600;700&display=swap">`);

const PAPER28=`
:root{
 --paper:#F5EDDD;--paper2:#FFFAEE;--paper3:#EDE2CC;--ink:#2A241C;--ink2:#5F5546;--ink3:#8F8472;--line:#2A241C;
 --leaf:#39A56F;--leaf2:#BFE6CF;--sun:#F5B73C;--sun2:#FBE3A6;--tomato:#E8573F;--tomato2:#F6C3B8;--berry:#4E78D8;--berry2:#C6D6F6;--peach:#F7CDAA;--blush:#F6C6D4;
 --bg0:var(--paper);--bg1:var(--paper2);--bg2:var(--paper2);--bg3:var(--paper3);
 --ink3:#8F8472;--accent:var(--leaf);--mint:var(--leaf);--spend:#EE9440;--save:var(--berry);--amber:var(--sun);--buf:#A89C86;--fix:#9A7B5C;
 --display:"Fraunces","Georgia",serif;--body:"Figtree",system-ui,-apple-system,"Segoe UI",sans-serif;--hand:"Caveat","Segoe Script",cursive;
 --card-a:var(--paper2);--rec-b:var(--paper2);--viz-c:var(--paper2);
 --sh:3px 4px 0 var(--ink);--sh-s:2px 3px 0 var(--ink);--spring:cubic-bezier(.34,1.56,.64,1);
 color-scheme:light}
html,body{background:#E4D9C3 !important}
#phone,#frame{background:var(--paper) !important}
#view,.home17,#cta17,.mbody{background-color:var(--paper) !important;color:var(--ink)}
#view{background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' seed='4'/><feColorMatrix values='0 0 0 0 .35  0 0 0 0 .27  0 0 0 0 .15  0 0 0 .09 0'/></filter><rect width='160' height='160' filter='url(%23n)'/></svg>") !important}
body,button,input,select,textarea{font-family:var(--body) !important;color:var(--ink)}
.title,.h2,.hero,.hero17 .hero,.big,[class*="hero"] b,.sv21 b,.sec20,h1,h2{font-family:var(--display) !important;font-variation-settings:"SOFT" 100,"WONK" 1;letter-spacing:-.01em}
.title,.h2{font-weight:700 !important}
.mut,.sm,small,.sub{color:var(--ink2) !important}
.status,.status *{color:var(--ink) !important}
.notch{background:var(--ink) !important}

/* ---------- tiles and cards: paper cut-outs with an ink line and a hard shadow ---------- */
.hero17,.sg20,.gc21,.nd21,.sv21,.card,.li,.panelC,.viz17,.mini20,.blk20,.res20,.in20,.toast,#toast23,.hs-wid,.bub21,.eqt{
 background:var(--paper2) !important;border:2px solid var(--ink) !important;box-shadow:var(--sh) !important;color:var(--ink) !important}
.hero17{border-radius:30px 34px 28px 32px/32px 28px 34px 30px !important;background:var(--leaf2) !important;padding-top:22px}
.hero17[class*="st-fast"],.hero17.fast{background:var(--sun2) !important}
.sg20{border-radius:26px 24px 28px 22px !important}
.in20{border-radius:26px 22px 28px 24px !important;background:var(--paper2) !important}
.in20:nth-child(3n+1){background:var(--peach) !important}.in20:nth-child(3n+2){background:var(--berry2) !important}.in20:nth-child(3n){background:var(--sun2) !important}
.gc21{border-radius:24px 28px 22px 26px !important;background:var(--paper2) !important}
.sv21{background:var(--berry2) !important;border-radius:30px 26px 32px 28px !important}
.nd21{background:var(--sun2) !important;border:2px dashed var(--ink) !important;box-shadow:none !important;border-radius:24px !important}
.card,.li,.panelC,.viz17,.blk20{border-radius:22px !important}
.li{box-shadow:var(--sh-s) !important}
.res20{background:var(--sun2) !important;border-radius:24px !important}
.mini20,.eqt{background:var(--paper2) !important;border-radius:18px !important;box-shadow:var(--sh-s) !important}
.eqt.hi{background:var(--sun) !important}
.sheet,.modal{background:var(--paper) !important;border:2px solid var(--ink) !important;border-bottom:0 !important;box-shadow:0 -4px 0 var(--ink) !important;border-radius:34px 30px 0 0 !important;color:var(--ink)}
.modal{border:0 !important;box-shadow:none !important;border-radius:0 !important}
.scrim{background:rgba(42,36,28,.42) !important}
.dim21{background:rgba(42,36,28,.5) !important}
.bub21{background:var(--paper2) !important;border-radius:22px 26px 24px 20px !important;color:var(--ink) !important}
.bub21 *{color:var(--ink) !important}
.toast,#toast23{background:var(--ink) !important;color:var(--paper2) !important;border-color:var(--ink) !important;box-shadow:3px 4px 0 var(--tomato) !important;border-radius:16px !important}
.toast *,#toast23 *{color:var(--paper2) !important}
#toast23 button{color:var(--sun) !important;font-weight:700}

/* ---------- buttons: they press down ---------- */
.btn,button.btn{background:var(--leaf) !important;color:var(--ink) !important;border:2px solid var(--ink) !important;box-shadow:var(--sh) !important;font-weight:700 !important;letter-spacing:0 !important;border-radius:999px !important;transition:transform .12s var(--spring),box-shadow .12s var(--spring) !important}
.btn.q,.btn.d{background:var(--paper2) !important;color:var(--ink) !important}
.btn.d{opacity:.55;box-shadow:none !important}
.btn.red27{background:var(--tomato) !important;color:#fff !important}
.btn:active{transform:translate(3px,4px) !important;box-shadow:0 0 0 var(--ink) !important}
.btn.s{padding:10px 14px !important}
.chip{background:var(--paper2) !important;color:var(--ink) !important;border:2px solid var(--ink) !important;border-radius:999px !important;box-shadow:var(--sh-s) !important;font-weight:600 !important;transition:transform .15s var(--spring)}
.chip.on{background:var(--sun) !important;transform:rotate(-2deg) scale(1.04)}
.chip:active{transform:translate(2px,3px) !important;box-shadow:none !important}
.icon18,.hs-btn,.hs-close{background:var(--paper2) !important;border:2px solid var(--ink) !important;box-shadow:var(--sh-s) !important;color:var(--ink) !important;border-radius:50% !important}
.icon18 svg{stroke:var(--ink) !important}
.lnk,.back{color:var(--ink) !important;text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:3px;text-decoration-color:var(--tomato);font-weight:600}
input,.inp23,.field{background:var(--paper2) !important;border:2px solid var(--ink) !important;border-radius:16px !important;color:var(--ink) !important;box-shadow:inset 2px 3px 0 rgba(42,36,28,.12)}

/* ---------- the week bar and dots: marker and stickers ---------- */
.bar20{background:var(--paper3) !important;border:2px solid var(--ink) !important;border-radius:999px !important;height:18px !important}
.bar20 > i,.bar20 .i{border-radius:999px 8px 8px 999px !important;border-right:2px solid var(--ink)}
.bar20w{padding:0 !important}
.wk21 i,.d21 i{border:2px solid var(--ink) !important;box-shadow:1px 2px 0 var(--ink)}
.wk21 i.on,.wk21 .today{transform:scale(1.18) rotate(-4deg)}
.st20,.pill17{background:var(--paper2) !important;border:2px solid var(--ink) !important;color:var(--ink) !important;border-radius:999px !important;box-shadow:var(--sh-s);transform:rotate(-2deg);font-weight:700}
.st20 *,.pill17 *{color:var(--ink) !important}
.hero17 .sm,.hero17 small{font-family:var(--hand) !important;font-size:19px !important;font-weight:600 !important;color:var(--ink2) !important}

/* ---------- tab bar ---------- */
#tabbar{background:var(--paper2) !important;border:2px solid var(--ink) !important;box-shadow:var(--sh) !important;border-radius:999px !important;backdrop-filter:none !important}
#tabbar button{color:var(--ink2) !important}
#tabbar button.on{color:var(--ink) !important;font-weight:700}
#tabbar button.on svg{background:var(--sun);border:2px solid var(--ink);border-radius:50%;padding:5px;stroke:var(--ink) !important;box-shadow:var(--sh-s)}
#tabbar svg{stroke:var(--ink) !important;stroke-width:2.2 !important}
.cta21 .btn:first-child{background:var(--leaf) !important}
.cta21 .btn:last-child{background:var(--paper2) !important}

/* ---------- onboarding picture and steps ---------- */
.steps i{background:var(--paper3) !important;border:2px solid var(--ink)}
.steps i.on{background:var(--sun) !important}.steps i.cur{background:var(--tomato) !important}
.pic27 .bar27 i{border:2px solid var(--ink);box-shadow:var(--sh-s)}
.pic27 .lab,.pic27 .foot{font-family:var(--hand);font-size:20px;color:var(--ink) !important}
.pic27 .sub27{background:repeating-linear-gradient(135deg,var(--sun) 0 7px,var(--sun2) 7px 14px) !important}

/* ---------- details ---------- */
.keypad button,.kp button{background:var(--paper2) !important;border:2px solid var(--ink) !important;border-radius:20px !important;box-shadow:var(--sh-s) !important;font-family:var(--display) !important;font-weight:700;transition:transform .1s var(--spring)}
.keypad button:active,.kp button:active{transform:translate(2px,3px) !important;box-shadow:none !important}
.sec20,.cap,.cap20,.lab20{color:var(--ink2) !important;font-weight:700;text-transform:none}
hr,.hr{border-color:var(--ink) !important}
.ic20{border:2px solid var(--ink) !important;border-radius:50% !important}
.gc21 .pic,.pic{background:var(--sun2) !important;border:2px solid var(--ink) !important;border-radius:20px !important;transform:rotate(-3deg)}
.gc21 svg,.pic svg{stroke:var(--ink) !important}
.gb,.mbar,.tl24{background:var(--paper3) !important;border:2px solid var(--ink);border-radius:999px}
.ln25{border-bottom:2px dotted var(--ink3)}
::selection{background:var(--sun)}


/* stronger specificity: older layers use #phone and !important */
#phone .hero17,#phone .hero17.h20,#phone .hero17.h19{background:color-mix(in srgb,var(--st,#39A56F) 30%,#FFFAEE) !important;border:2px solid var(--ink) !important;box-shadow:var(--sh) !important;border-radius:30px 34px 28px 32px/32px 28px 34px 30px !important}
#phone .hero17 .pill17,#phone .hero17 .chip{background:var(--paper2) !important;color:var(--ink) !important}
#phone .viz17,#phone .panelC,#phone .tx17,#phone .li,#phone .sheet,#phone .card{border:2px solid var(--ink) !important}
#phone .tx17{background:var(--paper2) !important}
.status{background:linear-gradient(180deg,var(--paper) 55%,transparent) !important}
.mfoot{background:linear-gradient(180deg,transparent,var(--paper) 34%) !important}
#cta17{background:var(--paper) !important;border-top:2px solid var(--ink) !important}
.stp20 button{background:var(--paper2) !important;border:2px solid var(--ink) !important;color:var(--ink) !important;box-shadow:var(--sh-s) !important;font-family:var(--display) !important;font-weight:700;transition:transform .1s var(--spring)}
.stp20 button:active{transform:translate(2px,3px) !important;box-shadow:none !important}
.stp20 b{font-family:var(--display) !important;font-size:26px !important}
.wk21 small,.d21 small{font-family:var(--hand) !important;font-size:15px !important;font-style:normal !important;color:var(--ink2) !important}
.hero17 .hero{font-weight:800 !important}
#phone .tl24 i,#phone .gb i{background:var(--berry) !important;border-radius:999px;border-right:2px solid var(--ink)}
#phone .nd21 b{font-family:var(--display) !important}
.mbody .field,.hero.mut{color:var(--ink3) !important}

/* ---------- motion: only when a screen first appears ---------- */
@keyframes grow28{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes pop28{0%{transform:scale(.6);opacity:0}70%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
@keyframes rise28{from{transform:translateY(14px);opacity:0}to{transform:none;opacity:1}}
#view.enter28 .bar20 > i,#view.enter28 .bar20 .i{transform-origin:left center;animation:grow28 .9s var(--spring) both}
#view.enter28 .wk21 i{animation:pop28 .5s var(--spring) both}
#view.enter28 .wk21 i:nth-child(2){animation-delay:.05s}#view.enter28 .wk21 i:nth-child(3){animation-delay:.1s}#view.enter28 .wk21 i:nth-child(4){animation-delay:.15s}#view.enter28 .wk21 i:nth-child(5){animation-delay:.2s}#view.enter28 .wk21 i:nth-child(6){animation-delay:.25s}#view.enter28 .wk21 i:nth-child(7){animation-delay:.3s}
#view.enter28 .hero17,#view.enter28 .in20,#view.enter28 .gc21,#view.enter28 .sg20,#view.enter28 .card,#view.enter28 .sv21{animation:rise28 .45s var(--spring) both}
.sheet{animation:rise28 .4s var(--spring) both}
#toast23,.toast{animation:pop28 .45s var(--spring) both}
@media (prefers-reduced-motion:reduce){#view.enter28 *,.sheet,#toast23,.toast{animation:none !important}}
`;
document.head.insertAdjacentHTML('beforeend','<style id="paper28">'+PAPER28+'</style>');
const PAPER28B=`
#phone .gcat23 button{background:#FFFAEE;border:2px solid var(--ink);color:var(--ink);box-shadow:2px 3px 0 var(--ink);border-radius:14px 12px 15px 12px}
#phone .gcat23 button.on{background:var(--sun2);transform:rotate(-2deg)}
#phone .gcat23 button small{color:var(--ink)}
#phone .cel24{background:color-mix(in srgb,var(--gc) 22%,#F5EDDD);color:var(--ink)}
#phone .cel24 .pic{background:var(--sun2);border:3px solid var(--ink);box-shadow:var(--sh);color:var(--ink);transform:rotate(-4deg)}
#phone .cel24 .sm{color:var(--ink2)}#phone .cel24 .title{color:var(--ink);font-family:var(--display)}
#phone .cel24 .gb{background:#FFFAEE;border:2px solid var(--ink)}#phone .cel24 .gb i{background:var(--leaf)}
#phone .cel24 .btn{box-shadow:var(--sh)}
#phone .insbar i,#phone .bars i,#phone .mon i{background:var(--berry)}
`;
document.head.insertAdjacentHTML('beforeend','<style id="paper28b">'+PAPER28B+'</style>');


/* colours written inline by older code: dark greys become paper tones; keeps the old files untouched */
function lum28(r,g,b){const mx=Math.max(r,g,b)/255,mn=Math.min(r,g,b)/255;return {l:(mx+mn)/2,s:mx===mn?0:(mx-mn)/(1-Math.abs(mx+mn-1))}}
const NEUT28=(()=>{const m={};return c=>m[c]||(m[c]=(()=>{const x=c.match(/rgba?\(([^)]+)\)/);if(!x)return null;const p=x[1].split(/[ ,\/]+/).filter(Boolean).map(parseFloat);const {l,s}=lum28(p[0],p[1],p[2]);if(s>.3||l>.55||(p.length>3&&p[3]===0))return null;const L=Math.min(.95,.97-l*.55),R=Math.round(255*(L+.04)),G=Math.round(255*L),B=Math.round(255*(L-.07));return `rgba(${R},${G},${B},${p.length>3?p[3]:1})`})())})();
function recolor28(){const ph=document.getElementById('phone');if(!ph)return;ph.querySelectorAll('i,span,div,b,button,em').forEach(e=>{if(e.closest('#paper28')||e.id==='tabbar'||/(^| )(btn|chip|bub21|hero17|sheet|modal|scrim|dim21|notch|toast|st20)( |$)/.test(typeof e.className==='string'?e.className:''))return;
 const cs=getComputedStyle(e),bg=cs.backgroundColor,n=NEUT28(bg);if(n&&e.style&&e.style.background!==undefined&&(e.getAttribute('style')||'').match(/background/))e.style.backgroundColor=n})}
{const _a=window.afterRender;let last='';window.afterRender=()=>{if(_a)_a();recolor28();
 const key=(UI.tab||'')+'|'+(UI.stack||[]).map(s=>s.id).join('>');const v=document.getElementById('view');if(v&&key!==last){last=key;v.classList.add('enter28');setTimeout(()=>{if(v)v.classList.remove('enter28')},1300)}}}
