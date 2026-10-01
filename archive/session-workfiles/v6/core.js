/* ===== core: state, navigation, sheets, tooltips, aggregations ===== */
var ACCOUNTS=[],CATS=[],TXNS=[],GOALS=[],SUBS=[],FR={},SH={},S={};
function freshState(){return {cur:null,tracking:null,pin:'',pinA:'',pinB:'',allowance:ALLOWANCE,chosen:DEFAULT_CATS.map(function(c){return c.name;}),extraCats:[],alloc:{},
 perms:{notif:true,contacts:true,camera:true},alertThreshold:80,alertDaily:true,alertRepeat:true,balanceHidden:false,period:'month',catView:'share',
 txFilter:'All',txSearch:'',selCat:null,selTxn:null,selMerchant:null,selGoal:null,selSub:null,scanCat:'Food',payCat:'Food',manualCat:null,pending:null,history:[],hpAcct:0};}
function $(id){return document.getElementById(id);}
function dayStart(ts){var d=new Date(ts);d.setHours(0,0,0,0);return d.getTime();}
var TODAY=dayStart(NOW);
function weekStart(){var d=new Date(TODAY);var w=(d.getDay()+6)%7;return TODAY-w*DAY;}
function monthStart(ts){var d=new Date(ts||NOW);return new Date(d.getFullYear(),d.getMonth(),1).getTime();}
var DIM=new Date(2026,9,0).getDate(); /* days in Sep */
var DOM=new Date(NOW).getDate();
function fmtD(ts,y){var d=new Date(ts);return d.getDate()+' '+MON[d.getMonth()]+(y?' '+d.getFullYear():'');}
function fmtDay(ts){var d=dayStart(ts);if(d===TODAY)return 'Today';if(d===TODAY-DAY)return 'Yesterday';return DOW[new Date(ts).getDay()]+', '+fmtD(ts);}
function fmtT(ts){var d=new Date(ts),h=d.getHours(),m=d.getMinutes();return (h%12||12)+':'+(m<10?'0':'')+m+(h<12?' am':' pm');}
function cat(n){for(var i=0;i<CATS.length;i++)if(CATS[i].name===n)return CATS[i];return null;}
function col(n){var c=cat(n);return c&&SLOT[c.slot]?SLOT[c.slot]:SLOT.other;}
function cicon(n){var c=cat(n);return c?c.icon:'other';}
function budget(n,p){var c=cat(n);if(!c)return 0;return p==='day'?c.monthly/DIM:p==='week'?c.monthly*7/DIM:c.monthly;}
function totalBudget(p){return CATS.reduce(function(a,c){return a+budget(c.name,p);},0);}
function range(p){return p==='day'?[TODAY,NOW]:p==='week'?[weekStart(),NOW]:[monthStart(),NOW];}
var PLABEL={day:'today',week:'this week',month:'this month'};
function txIn(a,b,f){return TXNS.filter(function(t){return t.ts>=a&&t.ts<=b&&(!f||f(t));});}
function sum(arr){return arr.reduce(function(a,t){return a+(t.amt!=null?t.amt:t);},0);}
function spendBy(a,b,key,f){var o={};txIn(a,b,f).forEach(function(t){var k=t[key];o[k]=(o[k]||0)+t.amt;});return o;}
function daily(n,f,end){end=end||TODAY;var out=[];for(var i=n-1;i>=0;i--){var d=end-i*DAY;out.push({ts:d,v:sum(txIn(d,d+DAY-1,f))});}return out;}
var MONTHS=[3,4,5,6,7,8];
function monthRange(m){return [new Date(2026,m,1).getTime(),Math.min(NOW,new Date(2026,m+1,1).getTime()-1)];}
function balance(){var credits=ALLOWANCE*6,spent=sum(TXNS),contrib=GOALS.reduce(function(a,g){return a+sum(g.hist.map(function(h){return h.amt;}));},0);return 6000+credits-spent-contrib;}
function goalSaved(g){return sum(g.hist.map(function(h){return h.amt;}));}
function subMonthly(s){return s.amt/(s.cycle==='monthly'?1:s.cycle==='quarterly'?3:12);}

/* ---------- navigation ---------- */
var ONB=['splash','method','upiSetup','onbCategories','onbAllocate','pin','permissions','allSet'];
var NOTAB=ONB.concat(['payConfirm','goalReached']);
var TABOF={home:'home',accumulation:'home',accumulationDetail:'home',transactions:'home',transactionDetail:'home',manualEntry:'home',scan:'home',payAnyone:'home',bankTransfer:'home',payAmount:'home',
 categories:'categories',categoryDetail:'categories',insight:'insight',savings:'savings',goalCreate:'savings',goalDetail:'savings',subDetail:'savings',subAdd:'savings',
 settings:'settings',alerts:'settings',pinChange:'settings',permissionsSettings:'settings'};
function go(name,keepScroll){
 hideTip();if(!FR[name]){console.error('no frame '+name);return;}
 var el=document.querySelector('[data-frame="'+name+'"]');
 document.querySelectorAll('.frame.active').forEach(function(f){f.classList.remove('active');});
 S.cur=name;el.classList.add('active');
 try{FR[name](el);}catch(e){console.error(name,e);}
 if(!keepScroll)el.scrollTop=0;
 document.body.classList.toggle('with-nav',NOTAB.indexOf(name)<0);
 document.querySelectorAll('.tab').forEach(function(t){t.classList.toggle('on',t.dataset.tab===TABOF[name]);});
}
function rerender(){var el=document.querySelector('.frame.active');if(el){var st=el.scrollTop;FR[S.cur](el);el.scrollTop=st;}}
var curSheet=null;
function openSheet(name,arg){hideTip();if(!SH[name]){console.error('no sheet '+name);return;}curSheet=name;var sh=$('sheet');sh.innerHTML='<div class="grab"></div>'+SH[name](arg);$('scrim').classList.add('show');}
function refreshSheet(){if(curSheet){var sh=$('sheet'),st=sh.scrollTop;sh.innerHTML='<div class="grab"></div>'+SH[curSheet]();sh.scrollTop=st;}}
function closeSheet(){hideTip();$('scrim').classList.remove('show');curSheet=null;}
function toast(m){var t=$('toast');t.textContent=m;t.style.display='block';clearTimeout(toast._t);toast._t=setTimeout(function(){t.style.display='none';},1800);}
function topbar(title,back,right){return '<div class="topbar">'+(back?'<button class="back" aria-label="Back" onclick="'+back+'">❮</button>':'<span style="width:6px"></span>')+'<h1 style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+esc(title)+'</h1>'+(right||'')+'</div>';}
function cardH(kick,head,link){return '<div class="card-h'+(link?' link" onclick="'+link+'"':'"')+'><div style="min-width:0"><div class="kick">'+kick+'</div>'+(head?'<div class="h2" style="margin-top:3px">'+head+'</div>':'')+'</div>'+(link?'<span class="chev">›</span>':'')+'</div>';}
function foot(t){return '<div class="foot">'+t+'</div>';}

/* ---------- tooltip layer (tap a mark: siblings dim, chip above) ---------- */
var tipOn=null,lastTap={el:null,t:0};
function hideTip(){var t=$('tip');if(t)t.style.display='none';document.querySelectorAll('.chart.dim').forEach(function(c){c.classList.remove('dim');c.querySelectorAll('.on').forEach(function(x){x.classList.remove('on');});});document.querySelectorAll('.card.lift').forEach(function(c){c.classList.remove('lift');});tipOn=null;}
function showTipAt(rect,html,cardEl){var tip=$('tip'),ph=document.querySelector('.phone').getBoundingClientRect();tip.innerHTML=html;tip.style.display='block';
 var tw=tip.offsetWidth,th=tip.offsetHeight,x=rect.left+rect.width/2-ph.left-tw/2,y=rect.top-ph.top-th-8;
 var ctop=cardEl?cardEl.getBoundingClientRect().top-ph.top:0;
 if(y<ctop-30||y<32)y=rect.bottom-ph.top+8;
 x=Math.max(8,Math.min(ph.width-tw-8,x));tip.style.left=x+'px';tip.style.top=y+'px';}
document.addEventListener('click',function(e){
 var m=e.target.closest&&e.target.closest('[data-t]');
 if(!m){if(!e.target.closest('.tip'))hideTip();return;}
 var now=Date.now();
 if(m.dataset.dbl&&lastTap.el===m&&now-lastTap.t<400){hideTip();var d=m.dataset.dbl.split(':');if(d[0]==='cat'){S.selCat=d[1];go('categoryDetail');}lastTap={el:null,t:0};return;}
 lastTap={el:m,t:now};
 if(tipOn===m){hideTip();return;}
 hideTip();tipOn=m;var ch=m.closest('.chart');if(!m.dataset.t)return;
 if(ch&&m.dataset.g){ch.classList.add('dim');ch.querySelectorAll('[data-g="'+m.dataset.g+'"]').forEach(function(x){x.classList.add('on');});}
 var card=m.closest('.card');if(card)card.classList.add('lift');
 var parts=m.dataset.t.split(' · ');
 showTipAt(m.getBoundingClientRect(),'<b>'+esc(parts[0])+'</b>'+(parts.length>1?' · '+esc(parts.slice(1).join(' · ')):''),card);
 if(m.dataset.focus){var f=$(m.dataset.focus);if(f){f.focus();f.scrollIntoView({block:'nearest'});}}
},true);
/* scrub on line charts */
function scrubMove(e){var svg=e.target.closest&&e.target.closest('svg[data-scrub]');if(!svg)return;var sc=SCRUB[svg.getAttribute('data-scrub')];if(!sc||!e.target.classList.contains('sh'))return;
 var r=svg.getBoundingClientRect(),vx=(e.clientX-r.left)/r.width*sc.W,i=Math.round((vx-sc.pl)/(sc.W-sc.pl-sc.pr)*(sc.n-1));i=Math.max(0,Math.min(sc.n-1,i));
 var v=sc.val?sc.val(i):null;if(v==null)return;var x=sc.X(i),y=sc.Y(v),g=svg.querySelector('.sg'),d=svg.querySelector('.sd');
 g.setAttribute('x1',x);g.setAttribute('x2',x);g.style.display='';d.setAttribute('cx',x);d.setAttribute('cy',y);d.style.display='';
 var card=svg.closest('.card');showTipAt(d.getBoundingClientRect(),sc.txt(i),card);tipOn=d;e.stopPropagation();}
document.addEventListener('pointermove',function(e){if(e.pointerType==='mouse'&&e.buttons===0&&!(e.target.classList&&e.target.classList.contains('sh')))return;scrubMove(e);});
document.addEventListener('pointerdown',scrubMove);
document.addEventListener('click',function(e){if(e.target.classList&&e.target.classList.contains('sh')){scrubMove(e);e.stopPropagation();}},true);
