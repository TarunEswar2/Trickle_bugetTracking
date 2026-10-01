/* ===== Trickle v13 — id13.js: identity (gradient library, mark, Zentra-style template, pace glow) =====
   Gradient library is built from Tarun's Figma "Color Scheme" (9:2): three hero mesh gradients (image 2 —
   Grove yellow→green→teal, Ember orange→yellow, Tide warm→blue) + his "Glow"/"Dot depth" pairs.
   Stops: [top-left, top-right, mid-right, low] + accent (button / key phrase). No red: Tide's coral corner
   is moved to his "a bit fast" orange #F68E4F. */
var GRAD={
  grove:  {n:'Grove',     use:'Brand · On pace · Home',            s:['#F3E650','#1FA35C','#2A9A94','#2C6B50'],acc:'#C9EC6A'},
  ember:  {n:'Ember',     use:'A bit fast (pace) · warm moments',  s:['#F68E4F','#F3C03F','#F1E14B','#8F6444'],acc:'#F6B04A'},
  tide:   {n:'Tide',      use:'Insights · month story · night',    s:['#F68E4F','#7F7A8E','#2E6E9E','#2D5B6E'],acc:'#7FB0EA'},
  payday: {n:'Payday',    use:'Income arrives · Income tab',       s:['#FCDC45','#F6FC5A','#3CEFA3','#5B6B3A'],acc:'#EEF06A'},
  savings:{n:'Savings Grove',use:'Savings tab · kept money',       s:['#F6FC5A','#3CEFA3','#00A55F','#0E5A4A'],acc:'#4BE3A0'},
  cool:   {n:'Cool',      use:'Spending tab · linking UPI · time', s:['#42F5E1','#4694FF','#5D8BC8','#0052C3'],acc:'#62B4FF'},
  goal:   {n:'Goal Reached',use:'Goal complete · milestones',      s:['#F6FC5A','#3CEFA3','#42F5E1','#00A55F'],acc:'#7EF0C4'},
  fresh:  {n:'Fresh Start',use:'Welcome back · new month',         s:['#CFF6E6','#9FE7D8','#4F7A93','#2E4756'],acc:'#9FE7D8'},
  story:  {n:'Month Story',use:'Month story cards',                s:['#FFDB45','#FF457E','#8721FF','#4694FF'],acc:'#FF8FB8'},
  bw:     {n:'B&W',       use:'B&W look (any moment)',             s:['#F2F2F2','#A0A0A0','#848585','#5A5A5A'],acc:'#F2F2F2'}
};
/* pace scale (green → amber): position along it = how far spending runs ahead of the days */
var PACE=[['Easy','#3CEFA3'],['Steady','#9BE36A'],['Quick','#F3C03F'],['Quicker','#F68E4F']];
function gradOf(k){var p=document.getElementById('app');if(p&&p.classList.contains('bw'))return GRAD.bw;return GRAD[k]||GRAD.grove;}
function gvars(k){var g=gradOf(k);return '--g1:'+g.s[0]+';--g2:'+g.s[1]+';--g3:'+g.s[2]+';--g4:'+g.s[3]+';--acc:'+g.acc;}
/* mark: the dot ladder trickling down — pill (₹1,000) → dot (₹100) → half-dot crumb (₹50), Grove→Ember */
var MKN=0;
function mark(sz,mono){var id='mk'+(++MKN);sz=sz||22;return '<svg class="mk" viewBox="0 0 32 32" width="'+sz+'" height="'+sz+'" aria-hidden="true">'+
  (mono?'':'<defs><linearGradient id="'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F3E650"/><stop offset=".45" stop-color="#3CEFA3"/><stop offset="1" stop-color="#1FA35C"/></linearGradient></defs>')+
  '<g style="fill:'+(mono?'currentColor':'url(#'+id+')')+'"><rect x="5" y="5" width="22" height="7" rx="3.5"/><circle cx="16" cy="18.5" r="3.8"/><path d="M12.6 25.2a3.4 3.4 0 0 0 6.8 0z"/></g></svg>';}
function lockup(){return '<span class="zlogo">'+mark(22)+'<b>Trickle</b></span>';}
/* Zentra-style template: glow (top ~half) → logo → 2-line headline (accent phrase) → grey subline → step dots → accent button → text link */
function zt(o){var dotsH='';if(o.steps){dotsH='<div class="zdots" role="img" aria-label="Step '+o.step+' of '+o.steps+'">';for(var i=1;i<=o.steps;i++)dotsH+='<i'+(i===o.step?' class="on"':'')+'></i>';dotsH+='</div>';}
  return '<div class="zt'+(o.cls?' '+o.cls:'')+'" data-grad="'+o.g+'"'+(o.attr||'')+' style="'+gvars(o.g)+'">'+(o.back?'<button class="ib back zback" data-a="back" aria-label="Back">'+ic('back')+'</button>':'')+
   '<div class="zglow" aria-hidden="true"><i></i><i></i><i></i><i></i></div>'+
   '<div class="zbody">'+(o.vis?'<div class="zvis">'+o.vis+'</div>':'<div class="zspace"></div>')+lockup()+'<h1 class="zh">'+o.h+'</h1>'+(o.sub?'<p class="zsub">'+o.sub+'</p>':'')+(o.mid||'')+dotsH+
   '<div class="zfoot">'+(o.foot||'')+'</div></div></div>';}
function zbtn(label,a,o){o=o||{};return '<button class="btn zbtn block'+(o.primary===false?'':' primary')+'" '+(o.go?'data-go="'+o.go+'"':'data-a="'+a+'"')+(o.v!=null?' data-v="'+esc(o.v)+'"':'')+'>'+label+'</button>';}
function zlink(label,a,o){o=o||{};return '<button class="zlink" '+(o.go?'data-go="'+o.go+'"':'data-a="'+a+'"')+(o.v!=null?' data-v="'+esc(o.v)+'"':'')+'>'+label+'</button>';}
/* Home pace glow (v10 look): big soft glow behind the header — green on pace, amber when a bit fast */
function paceGrad(){var w=paceWord();return w==='Quick'?'ember':'grove';}
function homeGlow(){return '<div class="hglow" data-pace="'+paceWord()+'" style="'+gvars(paceGrad())+'" aria-hidden="true"><i></i><i></i><i></i></div>';}
/* gradient fills for marks (Tarun's "Dot depth": highlight top-left → base → shade) */
var GRDEFS=['j0','j1','j2','sv','inc','ink'].map(function(c){return '<linearGradient id="gr-'+c+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:color-mix(in srgb,var(--'+c+') 72%,#fff)"/><stop offset=".55" style="stop-color:var(--'+c+')"/><stop offset="1" style="stop-color:color-mix(in srgb,var(--'+c+') 80%,#000)"/></linearGradient>';}).join('');
PATDEFS=PATDEFS.replace('<defs>','<defs>'+GRDEFS);
