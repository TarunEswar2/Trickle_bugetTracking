/* ===== core: state, navigation, sheets, drawer, toasts with undo, tooltips ===== */
var ACCOUNTS=[],CATS=[],FR={},SH={},S={};
function freshState(){return {cur:null,tracking:null,pin:'',pinA:'',pinB:'',allowance:8000,chosen:DEFAULT_CATS.map(function(c){return c.name;}),alloc:{},ruleB:85,
 period:'monthly',paydayDay:1,sweep:'manual',splitMode:'equal',remindDays:3,incomeSel:['Allowance','Part-time'],customIncome:[],incomeAmt:{Allowance:8000,'Part-time':1000},
 perms:{notif:true,contacts:true,camera:true},alertThreshold:80,
 pins:['W26','W03','W02','W04','W05'],hidden:{W14:1,W15:1,W44:1,W27:1,W22:1},order:null,snooze:{},done:[],subMarked:{},ackOver:{},sweeps:[],savedFromBudget:0,
 filter:'All',moneyRange:'this',txFilter:'All',txSearch:'',selCat:null,selTxn:null,selGoal:null,selSub:null,selPool:null,flow:null,pending:null,editMode:false,insFilter:'All',remindOn:false,importNotify:false,
 undo:null,catRules:{}};}
function $(id){return document.getElementById(id);}
function dayStart(ts){var d=new Date(ts);d.setHours(0,0,0,0);return d.getTime();}
var TODAY=dayStart(NOW);
function monthStart(ts){var d=new Date(ts||NOW);return new Date(d.getFullYear(),d.getMonth(),1).getTime();}
var PSTART=monthStart(NOW),PEND=monthEnd(8),DIM=30,DOM=24,DAYS_LEFT=DIM-DOM+1;
function fmtD(ts,y){var d=new Date(ts);return d.getDate()+' '+MON[d.getMonth()]+(y?' '+d.getFullYear():'');}
function fmtDay(ts){var d=dayStart(ts);if(d===TODAY)return 'Today';if(d===TODAY-DAY)return 'Yesterday';return DOW[new Date(ts).getDay()]+', '+fmtD(ts);}
function fmtT(ts){var d=new Date(ts),h=d.getHours(),m=d.getMinutes();return (h%12||12)+':'+(m<10?'0':'')+m+(h<12?' am':' pm');}
function cat(n){for(var i=0;i<CATS.length;i++)if(CATS[i].name===n)return CATS[i];return null;}
function col(n){var c=cat(n);return c&&SLOT[c.slot]?SLOT[c.slot]:SLOT.other;}
function cicon(n){var c=cat(n);return c?c.icon:'other';}
function sum(arr){return arr.reduce(function(a,t){return a+(t.amt!=null?t.amt:t);},0);}
function spends(a,b,f){return TX.filter(function(t){return t.type==='spend'&&t.ts>=a&&t.ts<=b&&(!f||f(t));});}
function spendIn(a,b,f){return sum(spends(a,b,f));}
function daily(n,f,end){end=end||TODAY;var out=[];for(var i=n-1;i>=0;i--){var d=end-i*DAY;out.push({ts:d,v:spendIn(d,d+DAY-1,f)});}return out;}
function monthRange(m){return [new Date(2026,m,1).getTime(),Math.min(NOW+DAY,monthEnd(m))];}
var MONTHS=[3,4,5,6,7,8];
function subMonthly(s){return s.amt/(s.cycle==='monthly'?1:s.cycle==='quarterly'?3:12);}
var NOWSEQ=0;function nowTs(){return NOW+(++NOWSEQ)*1000;}
/* category money for the current period */
function allotted(c){return TX.filter(function(t){return t.type==='transfer'&&t.ts>=PSTART;}).reduce(function(a,t){t.dst.forEach(function(x){if(x.ref==='budget:'+c)a+=x.amt;});t.src.forEach(function(x){if(x.ref==='budget:'+c)a-=x.amt;});return a;},0)
 +TX.filter(function(t){return t.type==='settle'&&t.ts>=PSTART;}).reduce(function(a,t){t.returns.forEach(function(x){if(x.ref==='budget:'+c)a+=x.amt;});return a;},0);}
function carryIn(c){var s=0;TX.forEach(function(t){if(t.type==='carry'&&t.ts>=PSTART&&t.ts<PEND&&(!c||t.cat===c))s+=t.amt;});return s;}
function catLeft(c){return POOLS().b[c]||0;}
function catSpent(c){return spendIn(PSTART,NOW+DAY*9,function(t){return t.cat===c;});}
function catBudget(c){return catSpent(c)+catLeft(c);} /* what this period's category had to spend, net of carry */
function budgetLeft(){return POOLS().budget;}
function todaySpent(){return spendIn(TODAY,TODAY+DAY*9);}
function safeToday(){var perDay=(budgetLeft()+todaySpent())/DAYS_LEFT;return {perDay:perDay,safe:Math.max(0,perDay-todaySpent()),spent:todaySpent()};}

/* ---------- navigation ---------- */
var ONB=['splash','method','upiSetup','period','income','onbCategories','onbAllocate','sweepSplit','pin','permissions','allSet'];
var NOTAB=ONB.concat(['upiHandoff','payConfirm','goalReached']);
var TABOF={home:'home',subsList:'home',subDetail:'home',subAdd:'home',scan:'home',payContact:'home',bankTransfer:'home',payAmount:'home',coverSheet:'home',transactions:'money',transactionDetail:'money',categoryDetail:'insights',
 money:'money',poolDetail:'money',owedList:'money',incomeSources:'money',
 actions:'actions',assignIncome:'actions',sweepLeftover:'actions',settleSplit:'actions',overspendResolve:'actions',subDue:'actions',categorise:'actions',logSpend:'actions',addIncome:'actions',moveMoney:'actions',importExcel:'actions',
 savings:'savings',goalCreate:'savings',goalDetail:'savings',insights:'insights',insightsEdit:'insights',widgetLibrary:'insights',accumulationDetail:'insights',
 settingsPeriod:'',settingsCategories:'',settingsIncome:'',settingsRules:'',settingsAccounts:'',settingsSplits:'',alerts:'',pinChange:'',permissionsSettings:''};
var BACK=[];
function go(name,keep){
 hideTip();if(!FR[name]){console.error('no frame '+name);return;}
 var el=document.querySelector('[data-frame="'+name+'"]');
 if(S.cur&&S.cur!==name&&!keep&&ONB.indexOf(name)<0){BACK.push(S.cur);if(BACK.length>30)BACK.shift();}
 document.querySelectorAll('.frame.active').forEach(function(f){f.classList.remove('active');});
 S.cur=name;el.classList.add('active');
 try{FR[name](el);}catch(e){console.error(name,e);}
 el.scrollTop=0;
 document.body.classList.toggle('with-nav',NOTAB.indexOf(name)<0);
 document.querySelectorAll('.tab').forEach(function(t){t.classList.toggle('on',t.dataset.tab===TABOF[name]);});
 updateBadge();closeDrawer(true);}
function back(def){var b=BACK.pop();while(b&&b===S.cur)b=BACK.pop();go(b||def||'home',true);}
function tabGo(n){BACK=[];go(n,true);}
function rerender(){var el=document.querySelector('.frame.active');if(el){var st=el.scrollTop;try{FR[S.cur](el);}catch(e){console.error(S.cur,e);}el.scrollTop=st;}updateBadge();}
var curSheet=null,sheetArg=null;
function openSheet(name,arg){hideTip();if(!SH[name]){console.error('no sheet '+name);return;}curSheet=name;sheetArg=arg;var sh=$('sheet');sh.innerHTML='<div class="grab"></div>'+SH[name](arg);$('scrim').classList.add('show');sh.scrollTop=0;}
function refreshSheet(){if(curSheet){var sh=$('sheet'),st=sh.scrollTop;sh.innerHTML='<div class="grab"></div>'+SH[curSheet](sheetArg);sh.scrollTop=st;}}
function closeSheet(){hideTip();$('scrim').classList.remove('show');curSheet=null;}
function openDrawer(){$('drawer').innerHTML=drawerHtml();$('drawer').classList.add('show');$('dscrim').classList.add('show');}
function closeDrawer(){var d=$('drawer');if(d){d.classList.remove('show');$('dscrim').classList.remove('show');}}
/* toast + undo */
function toast(m,undo){var t=$('toast');t.innerHTML='<span>'+esc(m)+'</span>'+(undo?'<button onclick="doUndo()">Undo</button>':'');t.style.display='flex';clearTimeout(toast._t);toast._t=setTimeout(function(){t.style.display='none';if(undo)S.undo=null;},undo?5000:1800);}
function snapshot(){return JSON.stringify({TX:TX,IOUS:IOUS,GOALS:GOALS,SUBS:SUBS,CATS:CATS,S:{snooze:S.snooze,done:S.done,subMarked:S.subMarked,ackOver:S.ackOver,sweeps:S.sweeps,savedFromBudget:S.savedFromBudget,catRules:S.catRules,pins:S.pins,hidden:S.hidden,order:S.order}});}
function restore(js){var o=JSON.parse(js);TX=o.TX;IOUS=o.IOUS;GOALS=o.GOALS;SUBS=o.SUBS;CATS=o.CATS;for(var k in o.S)S[k]=o.S[k];}
/* every money-changing action runs through commit(): snapshot → act → invariant check → toast with Undo */
function commit(label,fn,opts){var snap=snapshot();var r;try{r=fn();}catch(e){console.error(e);restore(snap);toast('Can’t do that: '+e.message);return false;}
 if(r===false){restore(snap);return false;}
 var inv=checkInvariant(label);S.undo=snap;if(opts&&opts.done)S.done.unshift({title:opts.done,ts:NOW});
 if(!(opts&&opts.silent))toast(label,true);updateBadge();return true;}
function doUndo(){if(!S.undo)return;restore(S.undo);S.undo=null;checkInvariant('undo');$('toast').style.display='none';closeSheet();rerender();toast('Undone');}
function pushTx(t){t.id=t.id||nid();if(!t.ts)t.ts=nowTs();TX.push(t);return t;}
function transfer(src,dst,reason,extra){var t={type:'transfer',src:src,dst:dst,amt:dst.reduce(function(a,x){return a+x.amt;},0),reason:reason,source:'Manual',account:null};for(var k in extra)t[k]=extra[k];return pushTx(t);}
function poolAmt(ref){var p=POOLS();if(ref==='to_assign')return p.ta;if(ref.indexOf('budget:')===0)return p.b[ref.slice(7)]||0;if(ref.indexOf('goal:')===0)return p.g[ref.slice(5)]||0;return 0;}

function topbar(title,right,isBack){return '<div class="topbar">'+(isBack?'<button class="back" aria-label="Back" onclick="back()">❮</button>':'<button class="av" aria-label="Open menu" onclick="openDrawer()">N</button><span style="width:6px"></span>')+'<h1 style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+esc(title)+'</h1>'+(right||'')+'</div>';}
function subbar(title,right){return topbar(title,right,true);}
function cardH(kick,head,link){return '<div class="card-h'+(link?' link" onclick="'+link+'"':'"')+'><div style="min-width:0"><div class="kick">'+kick+'</div>'+(head?'<div class="h2" style="margin-top:3px">'+head+'</div>':'')+'</div>'+(link?'<span class="chev">›</span>':'')+'</div>';}
function foot(t){return '<div class="foot">'+t+'</div>';}
function q(s){return esc(s).replace(/'/g,"\\'");}

/* ---------- tooltip layer: tap a mark → siblings dim, value chip ---------- */
var tipOn=null,lastTap={el:null,t:0};
function hideTip(){var t=$('tip');if(t)t.style.display='none';document.querySelectorAll('.chart.dim').forEach(function(c){c.classList.remove('dim');c.querySelectorAll('.on').forEach(function(x){x.classList.remove('on');});});tipOn=null;}
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
 var card=m.closest('.card,.w');
 var parts=m.dataset.t.split(' · ');
 showTipAt(m.getBoundingClientRect(),'<b>'+esc(parts[0])+'</b>'+(parts.length>1?' · '+esc(parts.slice(1).join(' · ')):''),card);
},true);
function scrubMove(e){var svg=e.target.closest&&e.target.closest('svg[data-scrub]');if(!svg)return;var sc=SCRUB[svg.getAttribute('data-scrub')];if(!sc||!e.target.classList.contains('sh'))return;
 var r=svg.getBoundingClientRect(),vx=(e.clientX-r.left)/r.width*sc.W,i=Math.round((vx-sc.pl)/(sc.W-sc.pl-sc.pr)*(sc.n-1));i=Math.max(0,Math.min(sc.n-1,i));
 var v=sc.val?sc.val(i):null;if(v==null)return;var x=sc.X(i),y=sc.Y(v),g=svg.querySelector('.sg'),d=svg.querySelector('.sd');
 g.setAttribute('x1',x);g.setAttribute('x2',x);g.style.display='';d.setAttribute('cx',x);d.setAttribute('cy',y);d.style.display='';
 var card=svg.closest('.card,.w');showTipAt(d.getBoundingClientRect(),sc.txt(i),card);tipOn=d;e.stopPropagation();}
document.addEventListener('pointermove',function(e){if(e.pointerType==='mouse'&&e.buttons===0&&!(e.target.classList&&e.target.classList.contains('sh')))return;scrubMove(e);});
document.addEventListener('pointerdown',scrubMove);
document.addEventListener('click',function(e){if(e.target.classList&&e.target.classList.contains('sh')){scrubMove(e);e.stopPropagation();}},true);

/* ---------- drawer ---------- */
var DRAWER=[['settingsPeriod','cal','Budget & period',function(){return S.period==='monthly'?'Monthly':S.period==='weekly'?'Weekly':'Payday';}],['settingsCategories','pie','Categories',function(){return CATS.length+'';}],['settingsIncome','coin','Income sources'],['settingsRules','rule','Rules',function(){return '3 active';}],
 ['settingsAccounts','wallet','Linked accounts',function(){return S.tracking==='upi'?ACCOUNTS.length+' UPI':'Manual';}],['settingsSplits','split','Splits & reminders'],['alerts','bell','Alerts'],['pinChange','lock','PIN & security'],['permissionsSettings','phone','Permissions'],['importExcel','file','Import (soon)']];
function drawerHtml(){return '<div style="display:flex;gap:12px;align-items:center;padding:4px 8px 16px"><span class="av" style="width:48px;height:48px;font-size:20px">N</span><div style="min-width:0"><div class="h2">Nishad</div><div class="foot" style="margin:2px 0 0">'+(S.tracking==='upi'?ACCOUNTS.map(function(a){return esc(a.handle);}).join(' · '):'Manual entry')+'</div></div><button class="iconbtn" style="margin-left:auto" aria-label="Close menu" onclick="closeDrawer()">'+icon('x',18)+'</button></div>'
 +DRAWER.map(function(d){return '<button class="drow" onclick="go(\''+d[0]+'\')">'+icon(d[1],18,'var(--text2)')+d[2]+'<span class="s">'+(d[3]?d[3]():'')+' ›</span></button>';}).join('')
 +'<div style="height:1px;background:var(--border);margin:8px 0"></div><button class="drow" onclick="closeDrawer();toast(\'Help centre opens in the full app\')">'+icon('help',18,'var(--text2)')+'Help</button><button class="drow" onclick="restart()">'+icon('out',18,'var(--text2)')+'Log out</button>'
 +'<div class="foot" style="padding:16px 8px 0">Trickle tracks through linked UPI IDs or what you log by hand. It never reads your messages.</div>';}
function restart(){location.hash='';location.reload();}
/* pools cache keyed by a version bumped on every mutation */
var VER=0,_POOLS_RAW=POOLS,_pk='',_pc=null;
POOLS=function(){var k=VER+':'+TX.length;if(k!==_pk){_pc=_POOLS_RAW();_pk=k;}return _pc;};
(function(){var c0=commit;commit=function(l,fn,o){return c0(l,function(){var r=fn();VER++;if(r!==false){var p=POOLS(),bad=p.ta<-.5?'To assign':null;Object.keys(p.g).forEach(function(k){if(p.g[k]<-.5)bad=refName('goal:'+k);});if(bad)throw new Error('not enough in '+bad);}return r;},o);};var r0=restore;restore=function(j){r0(j);VER++;};})();
