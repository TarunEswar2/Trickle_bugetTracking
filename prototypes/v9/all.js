/* ===== Trickle v8 — ledger (v7 model, renamed): every rupee lives in exactly one pool =====
   Pools: new_money · budget:<cat> · goal:<id>.  new_money + Σbudget + Σsavings == balance == Σflows.
   Owed-to-you (IOUs) is outside the balance until a 'settle' txn. Tracking = linked UPI IDs or manual entry only. */
var MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var MONL=['January','February','March','April','May','June','July','August','September','October','November','December'];
var DOWS=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var DAY=864e5;
var NOW=new Date(2026,8,21,18,30).getTime();
var TILE=100, BIG=500;
var CAT_DEF={Food:{c:'#DC6A30',i:'food',w:.40},Travel:{c:'#3F8CE6',i:'bus',w:.15},Fun:{c:'#D55181',i:'star',w:.1333},Essentials:{c:'#9085E9',i:'bag',w:.2334},Laundry:{c:'#4FB6C4',i:'bag',w:.08},Books:{c:'#B98B5E',i:'book',w:.08}};
var CATS=['Food','Travel','Fun','Essentials'];
var FIXED={Food:2400,Travel:900,Fun:800,Essentials:1400};
var ALLOW=9000;
var TX=[],IOUS=[],GOALS=[],SUBS=[],SEQ=0,PERIOD='month',SWEEP='auto',TRACK='upi',UPI_IDS=['tarun@oksbi'];
function at(m,d,h,mi){return new Date(2026,m,d,h||0,mi||0).getTime();}
function nid(p){return (p||'t')+(++SEQ);}
var CATVAR={Food:'var(--food)',Travel:'var(--travel)',Fun:'var(--fun)',Essentials:'var(--ess)',Laundry:'var(--laundry)',Books:'var(--books)'};
function catColor(c){return CATVAR[c]||'var(--uns)';}
function catK(c){return 'k'+(['Food','Travel','Fun','Essentials','Laundry','Books'].indexOf(c)+1);}
function goalById(id){for(var i=0;i<GOALS.length;i++)if(GOALS[i].id===id)return GOALS[i];return null;}
function refAdd(p,ref,a){
 if(ref==='new_money')p.nm+=a;
 else if(ref.indexOf('budget:')===0){var c=ref.slice(7);p.b[c]=(p.b[c]||0)+a;}
 else if(ref.indexOf('goal:')===0){var g=ref.slice(5);p.g[g]=(p.g[g]||0)+a;}
 else throw new Error('bad ref '+ref);}
function applyTx(p,t){
 if(t.type==='opening'||t.type==='income')refAdd(p,'new_money',t.amt);
 else if(t.type==='spend')refAdd(p,'budget:'+(t.cat||'Unsorted'),-t.amt);
 else if(t.type==='transfer'){t.src.forEach(function(x){refAdd(p,x.ref,-x.amt);});t.dst.forEach(function(x){refAdd(p,x.ref,x.amt);});}
 else if(t.type==='settle')t.returns.forEach(function(x){refAdd(p,x.ref,x.amt);});}
function sumObj(o){var s=0;for(var k in o)s+=o[k];return s;}
function POOLS(){var p={nm:0,b:{},g:{}};TX.forEach(function(t){applyTx(p,t);});p.budget=sumObj(p.b);p.savings=sumObj(p.g);p.balance=p.nm+p.budget+p.savings;return p;}
function flowBalance(){var s=0;TX.forEach(function(t){if(t.type==='opening'||t.type==='income'||t.type==='settle')s+=t.amt;else if(t.type==='spend')s-=t.amt;});return s;}
function owedOpen(){return IOUS.filter(function(i){return !i.settledTs;}).reduce(function(a,i){return a+i.amt;},0);}
var INV_LOG=[];
function checkInvariant(label){
 var p=POOLS(),fb=flowBalance(),ok=Math.abs(p.nm+p.budget+p.savings-p.balance)<.01&&Math.abs(p.balance-fb)<.01;
 TX.forEach(function(t){if(t.type==='transfer'){var a=t.src.reduce(function(x,y){return x+y.amt;},0),b=t.dst.reduce(function(x,y){return x+y.amt;},0);if(Math.abs(a-b)>.01)ok=false;}
  if(t.type==='settle'){var r=t.returns.reduce(function(x,y){return x+y.amt;},0);if(Math.abs(r-t.amt)>.01)ok=false;}});
 var rec={label:label||'',ok:ok,new_money:p.nm,budget:p.budget,savings:p.savings,balance:p.balance,flow:fb,owed:owedOpen()};
 INV_LOG.push(rec);
 if(!ok)console.error('INVARIANT FAILED '+JSON.stringify(rec));
 var d=document.getElementById('inv');if(d){d.textContent=JSON.stringify(rec);d.setAttribute('data-ok',ok?'1':'0');}
 return rec;}

/* ---- period helpers ---- */
function periodStart(ts){ts=ts||NOW;var d=new Date(ts);if(PERIOD==='week'){var dow=(d.getDay()+6)%7;return new Date(d.getFullYear(),d.getMonth(),d.getDate()-dow).getTime();}return new Date(d.getFullYear(),d.getMonth(),1).getTime();}
function periodEnd(ts){var s=new Date(periodStart(ts));if(PERIOD==='week')return s.getTime()+7*DAY;return new Date(s.getFullYear(),s.getMonth()+1,1).getTime();}
function monthStart(ts){var d=new Date(ts);return new Date(d.getFullYear(),d.getMonth(),1).getTime();}
function inMonth(t,ts){return t.ts>=monthStart(ts)&&t.ts<new Date(new Date(ts).getFullYear(),new Date(ts).getMonth()+1,1).getTime();}
/* funded this month per category (fills + covers in, minus moved out) */
function fundedThisMonth(c){var s=monthStart(NOW),f=0;TX.forEach(function(t){if(t.type!=='transfer'||t.ts<s||t.ts>NOW+1||t.reason==='goal_spend')return;t.dst.forEach(function(x){if(x.ref==='budget:'+c&&t.reason!=='sweep')f+=x.amt;});t.src.forEach(function(x){if(x.ref==='budget:'+c&&t.reason!=='sweep')f-=x.amt;});});return f;}
function spentMonth(c,ts){ts=ts||NOW;var s=0;TX.forEach(function(t){if(t.type==='spend'&&!t.goalFunded&&inMonth(t,ts)&&(!c||t.cat===c))s+=t.amt;});return s;}
function pace(){
 var ps=periodStart(),pe=periodEnd(),el=Math.max(.02,(NOW-ps)/(pe-ps));
 var spent=0;TX.forEach(function(t){if(t.type==='spend'&&t.ts>=ps&&t.ts<=NOW&&!t.goalFunded)spent+=t.amt;});
 var bud=sumObj(FIXED)*(PERIOD==='week'?7/30:1);
 var r=spent/bud;return {ratio:r,elapsed:el,state:(FORCE_PACE||(r<=el+.05?'ok':'fast'))};}
var FORCE_PACE=null;
function saveDst(amt){var g=topGoal(),p=POOLS(),have=p.g[g.id]||0,room=g.general?amt:Math.max(0,g.target-have);if(room>=amt)return [{ref:'goal:'+g.id,amt:amt}];var d=[];if(room>0)d.push({ref:'goal:'+g.id,amt:room});d.push({ref:'goal:general',amt:amt-room});return d;}
function topGoal(){var gs=GOALS.filter(function(g){return !g.general&&!g.reachedTs;});return gs[0]||goalById('general');}

/* ---- ledger mutations ---- */
function push(t){t.id=t.id||nid();TX.push(t);return t;}
function xfer(ts,src,dst,reason,extra){var amt=dst.reduce(function(a,x){return a+x.amt;},0);if(amt<=0)return null;var t={type:'transfer',ts:ts,amt:amt,src:src,dst:dst,reason:reason};for(var k in extra||{})t[k]=extra[k];return push(t);}
/* income rule: fill each category to its fixed amount for this month, rest → top goal */
function autoSplit(inc){
 var left=inc.amt,fills=[];
 CATS.forEach(function(c){var need=Math.max(0,FIXED[c]-fundedThisMonthAt(c,inc.ts));var a=Math.min(need,left);if(a>0){fills.push({ref:'budget:'+c,amt:a});left-=a;}});
 var out={fill:0,save:0,goal:topGoal()};
 if(fills.length){xfer(inc.ts+1000,[{ref:'new_money',amt:inc.amt-left}],fills,'fill',{incomeId:inc.id});out.fill=inc.amt-left;}
 if(left>0){xfer(inc.ts+2000,[{ref:'new_money',amt:left}],saveDst(left),'save',{incomeId:inc.id});out.save=left;}
 return out;}
function fundedThisMonthAt(c,ts){var s=monthStart(ts),f=0;TX.forEach(function(t){if(t.type!=='transfer'||t.ts<s)return;if(t.reason==='sweep'||t.reason==='goal_spend')return;t.dst.forEach(function(x){if(x.ref==='budget:'+c)f+=x.amt;});t.src.forEach(function(x){if(x.ref==='budget:'+c)f-=x.amt;});});return f;}
function undoIncomeSplit(incId){TX=TX.filter(function(t){return t.incomeId!==incId;});}
function txById(id){for(var i=0;i<TX.length;i++)if(TX[i].id===id)return TX[i];return null;}
function settleIou(iou,ts){
 var sp=txById(iou.spendId),ref='new_money';
 if(sp&&sp.ts>=monthStart(ts))ref='budget:'+sp.cat;
 var t=push({type:'settle',ts:ts,amt:iou.amt,person:iou.person,iouId:iou.id,spendId:iou.spendId,returns:[{ref:ref,amt:iou.amt}],merchant:iou.person+' paid you back',source:'UPI'});
 iou.settledTs=ts;
 if(ref==='new_money'){var g=topGoal();xfer(ts+1000,[{ref:'new_money',amt:iou.amt}],saveDst(iou.amt),'save',{settleId:t.id});}
 return {ref:ref,t:t};}

/* ---- deterministic seed ---- */
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
var MERCH={
 Food:[['JD Canteen',60,160,[12,14,20,22]],['Kameng Mess',90,200,[13,14,19,21]],['Swiggy',180,360,[20,23]],['Chai Tapri',15,40,[16,19]],['Campus Coffee',25,60,[8,10]]],
 Travel:[['Metro card',20,60,[8,9,18,19]],['Rapido',40,90,[8,10,17,20]],['Uber',110,240,[21,23]]],
 Fun:[['BookMyShow',150,320,[18,21]],['Maggi Point',30,70,[21,24]],['Game zone',100,200,[16,20]]],
 Essentials:[['Hostel laundry',60,120,[9,12]],['Medical store',70,220,[10,20]],['Xerox point',10,60,[9,18]],['Campus store',40,150,[11,19]]],
 Laundry:[['Hostel laundry',60,120,[9,12]]],Books:[['Higginbothams',120,380,[11,18]]]};
var SUB_SEED=[{id:'spotify',name:'Spotify',amt:119,day:24,cat:'Fun'},{id:'coursera',name:'Coursera',amt:399,day:14,cat:'Essentials'},{id:'cloud',name:'Cloud storage',amt:130,day:26,cat:'Essentials'}];
function seedLedger(opts){
 opts=opts||{};
 var R=mulberry32(42);function rr(a,b){return a+R()*(b-a);}
 SEQ=0;TX=[];IOUS=[];NOW=new Date(2026,8,21,18,30).getTime();
 var gName=opts.goalName||'Goa trip',gTarget=opts.goalTarget||8000;
 GOALS=[{id:'hp',name:'Headphones',target:3000,createdTs:at(5,20),reachedTs:null,icon:'head'},
  {id:'general',name:'Rainy-day jar',target:0,general:true,icon:'jar'},
  {id:'goa',name:gName,target:gTarget,createdTs:at(7,1),icon:'sun'}];
 SUBS=SUB_SEED.map(function(s){return JSON.parse(JSON.stringify(s));});
 var spends=[];
 function genMonth(m,lastDay,fr){
  CATS.forEach(function(c){var tgt=FIXED[c]*fr[c]||FIXED[c]*fr._,s=(HS[m]&&HS[m][c])||0,list=MERCH[c]||MERCH.Essentials,guard=0;
   SUBS.forEach(function(sb){if(sb.cat===c&&sb.day<=lastDay){spends.push({type:'spend',ts:at(m,sb.day,9),merchant:sb.name,cat:c,amt:sb.amt,source:'UPI',account:UPI_IDS[0],sub:sb.id});s+=sb.amt;}});
   while(s<tgt&&guard++<200){var mm=list[Math.floor(R()*list.length)],a=Math.round(rr(mm[1],mm[2])/5)*5;if(s+a>tgt+40)a=Math.max(10,Math.round((tgt-s)/5)*5);if(a<10)break;
    var d=1+Math.floor(R()*lastDay),hi=Math.floor(R()*(mm[3].length/2))*2,h=rr(mm[3][hi],mm[3][hi+1]);var ts=Math.round((at(m,d)+h*3600e3)/6e4)*6e4;if(ts>NOW-3600e3)ts=NOW-Math.round(rr(2,20))*3600e3;
    var cash=R()<.25&&TRACK!=='manual_only';spends.push({type:'spend',ts:ts,merchant:mm[0],cat:c,amt:a,source:(TRACK==='manual'||cash)?'Manual':'UPI',account:(TRACK==='manual'||cash)?null:UPI_IDS[0]});s+=a;}});}
 /* v9: repeat habits (same place 3+ times a month) */
 var HS={};
 var HAB=[['Chai Tapri','Food',20,30,[16,19],{6:[2,4,7,9,11,15,18,22,25,29],7:[1,3,5,8,10,12,14,17,20,24,26,28,31],8:[2,4,7,9,11,14,16,19]}],
  ['Campus Coffee','Food',40,60,[8,10],{6:[6,13,20,27],7:[3,10,17,21,24,31],8:[1,8,10,15,18]}],
  ['Metro card','Travel',30,50,[8,9],{6:[3,10,17],7:[7,14,21,28],8:[4,11,17,20]}]];
 HAB.forEach(function(hb){[6,7,8].forEach(function(m){(hb[5][m]||[]).forEach(function(d){var a=Math.round(rr(hb[2],hb[3])/5)*5,h=rr(hb[4][0],hb[4][1]),ts=Math.round((at(m,d)+h*3600e3)/6e4)*6e4;if(ts<NOW-3600e3){HS[m]=HS[m]||{};HS[m][hb[1]]=(HS[m][hb[1]]||0)+a;}if(ts<NOW-3600e3)spends.push({type:'spend',ts:ts,merchant:hb[0],cat:hb[1],amt:a,source:'UPI',account:UPI_IDS[0]});});});});
 genMonth(6,31,{_:.93,Fun:.96});genMonth(7,31,{_:.91,Food:.87});genMonth(8,21,{_:.55,Food:.25,Fun:.4,Essentials:.3});
 spends.sort(function(a,b){return a.ts-b.ts;});
 /* events in time order */
 var ev=[];function E(ts,fn){ev.push({ts:ts,fn:fn,k:ev.length});}
 E(at(6,1,0,5),function(){push({type:'opening',ts:at(6,1,0,5),amt:1000,merchant:'Opening balance',source:'Manual'});xfer(at(6,1,0,6),[{ref:'new_money',amt:1000}],[{ref:'goal:general',amt:1000}],'move',{note:'Opening balance to Rainy-day jar'});});
 [6,7,8].forEach(function(m){E(at(m,1,9),function(){var inc=push({type:'income',ts:at(m,1,9),amt:ALLOW,merchant:'Allowance',from:'Amma & Appa',source:'UPI',account:UPI_IDS[0],incomeCat:'Allowance'});
  if(m===6){xfer(inc.ts+1000,[{ref:'new_money',amt:sumObj(FIXED)}],CATS.map(function(c){return {ref:'budget:'+c,amt:FIXED[c]};}),'fill',{incomeId:inc.id});xfer(inc.ts+2000,[{ref:'new_money',amt:ALLOW-sumObj(FIXED)}],[{ref:'goal:hp',amt:ALLOW-sumObj(FIXED)}],'save',{incomeId:inc.id});}
  else autoSplit(inc);});});
 E(at(7,1,8),function(){xfer(at(7,1,8),[{ref:'goal:general',amt:200}],[{ref:'goal:goa',amt:200}],'headstart',{note:'Head start for '+gName});});
 /* headphones reached + bought */
 E(at(6,18,20),function(){var g=goalById('hp');g.reachedTs=at(6,18,20);xfer(at(6,18,20),[{ref:'goal:hp',amt:3000}],[{ref:'budget:Fun',amt:3000}],'goal_spend',{note:'Headphones goal reached'});push({type:'spend',ts:at(6,18,20,5),merchant:'Croma',cat:'Fun',amt:2999,source:'UPI',account:UPI_IDS[0],goalFunded:true,note:'Bought with the Headphones jar'});});
 /* café shift pay */
 E(at(7,12,20,30),function(){var inc=push({type:'income',ts:at(7,12,20,30),amt:1200,merchant:'Café shift',from:'Brew Lab',source:'UPI',account:UPI_IDS[0],incomeCat:'Part-time'});autoSplit(inc);});
 /* older split, settled */
 var dom={type:'spend',ts:at(7,14,21),merchant:'Dominos',cat:'Food',amt:800,source:'UPI',account:UPI_IDS[0]};
 E(dom.ts,function(){push(dom);dom.split={shares:[['You',400],['Meera',400]]};var i={id:nid('i'),person:'Meera',amt:400,spendId:dom.id,createdTs:dom.ts};IOUS.push(i);});
 E(at(7,16,12),function(){settleIou(IOUS[0],at(7,16,12));});
 /* pending split */
 var pz={type:'spend',ts:at(8,18,21),merchant:'Pizza Hut',cat:'Food',amt:1200,source:'UPI',account:UPI_IDS[0]};
 E(pz.ts,function(){push(pz);pz.split={shares:[['You',300],['Arjun',300],['Meera',300],['Kabir',300]]};['Arjun','Meera','Kabir'].forEach(function(n){IOUS.push({id:nid('i'),person:n,amt:300,spendId:pz.id,createdTs:pz.ts});});});
 /* Sep: charger overflow covered from Rainy-day jar */
 E(at(8,9,17),function(){xfer(at(8,9,17),[{ref:'goal:general',amt:300}],[{ref:'budget:Essentials',amt:300}],'cover',{note:'Laptop charger: taken from Rainy-day jar'});push({type:'spend',ts:at(8,9,17,5),merchant:'Laptop charger',cat:'Essentials',amt:1050,source:'UPI',account:UPI_IDS[0]});});
 /* uncategorised */
 E(at(8,21,13,10),function(){push({type:'spend',ts:at(8,21,13,10),merchant:'Paytm QR payment',cat:'Unsorted',amt:85,source:'UPI',account:UPI_IDS[0],auto:'Food'});});
 /* month-end sweeps Jul, Aug → goal */
 [6,7].forEach(function(m){E(at(m+1,1,0,1)-120e3,function(){var p=POOLS(),parts=[];CATS.forEach(function(c){if((p.b[c]||0)>.5)parts.push({ref:'budget:'+c,amt:Math.round(p.b[c])});});var tot=parts.reduce(function(a,x){return a+x.amt;},0);
  var to=m===6?'general':'goa';if(tot>0)xfer(at(m+1,1)-120e3,parts,[{ref:'goal:'+to,amt:tot}],'sweep',{auto:true,period:MONL[m]});});});
 spends.forEach(function(t){E(t.ts,function(){push(t);});});
 /* Goa train tickets calibrates Goa ≈ 4,200 */
 E(at(8,5,11),function(){var p=POOLS(),g=p.g.goa||0,want=Math.round(gTarget*.525/100)*100,amt=Math.max(0,Math.round((g+ (ALLOW-sumObj(FIXED))*0 - want)));
  if(amt>0){xfer(at(8,5,11),[{ref:'goal:goa',amt:amt}],[{ref:'budget:Travel',amt:amt}],'goal_spend',{note:'Hostel booking from '+gName});push({type:'spend',ts:at(8,5,11,5),merchant:'Goa hostel booking',cat:'Travel',amt:amt,source:'UPI',account:UPI_IDS[0],goalFunded:true,note:'Paid from the '+gName+' jar'});}});
 ev.sort(function(a,b){return a.ts-b.ts||a.k-b.k;});
 ev.forEach(function(e){e.fn();});
 TX.sort(function(a,b){return a.ts-b.ts;});
 if(TRACK==='manual')TX.forEach(function(t){if(t.type==='spend'||t.type==='income'){t.source='Manual';t.account=null;}});
 return checkInvariant('seed');}

/* ===== Trickle v8 — UI helpers ===== */
var IC={
 home:'<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
 money:'<rect x="3" y="6" width="18" height="13" rx="3"/><path d="M3 10h18M16 15h2"/>',
 inbox:'<path d="M4 13l2.5-7h11L20 13v6H4z"/><path d="M4 13h5l1 2h4l1-2h5"/>',
 grid:'<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
 scan:'<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16"/>',
 cash:'<rect x="3" y="7" width="18" height="11" rx="2"/><circle cx="12" cy="12.5" r="2.5"/>',
 back:'<path d="M15 5l-7 7 7 7"/>',close:'<path d="M6 6l12 12M18 6L6 18"/>',chev:'<path d="M6 9l6 6 6-6"/>',next:'<path d="M9 5l7 7-7 7"/>',
 food:'<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 2-2 6 0 8v10"/>',bus:'<rect x="5" y="4" width="14" height="13" rx="3"/><path d="M5 11h14M8 20v-3M16 20v-3"/>',
 star:'<path d="M12 4l2.4 5 5.6.6-4.2 3.8 1.2 5.5L12 16l-5 2.9 1.2-5.5L4 9.6 9.6 9z"/>',bag:'<path d="M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2"/>',
 book:'<path d="M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
 jar:'<path d="M8 3h8M7 6h10v2a4 4 0 0 1 1 3v7a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-7a4 4 0 0 1 1-3z"/>',head:'<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
 check:'<path d="M5 12l5 5 9-10"/>',plus:'<path d="M12 5v14M5 12h14"/>',users:'<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 11a3 3 0 1 0 0-6M21 20a6 6 0 0 0-4-5.6"/>',
 bell:'<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4"/>',music:'<path d="M9 18V6l11-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
 up:'<path d="M6 15l6-6 6 6"/>',down:'<path d="M6 9l6 6 6-6"/>',pin:'<path d="M9 4h6l-1 6 3 3H7l3-3zM12 13v7"/>',eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
 sort:'<path d="M4 7h10M4 12h7M4 17h4M17 5v14M14 16l3 3 3-3"/>',leaf:'<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15M5 19l7-7"/>',upload:'<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',
 link:'<path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1"/>',pen:'<path d="M4 20l4-1 11-11-3-3L5 16z"/>',
 cal:'<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M4 10h16M9 3v4M15 3v4"/>',spark:'<path d="M12 3v5M12 16v5M3 12h5M16 12h5"/>',moon:'<path d="M20 14a8 8 0 1 1-10-10 7 7 0 0 0 10 10z"/>',
 sliders:'<path d="M7 4v6M7 14v6M17 4v2M17 10v10"/><circle cx="7" cy="12" r="2"/><circle cx="17" cy="8" r="2"/>',addw:'<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/><path d="M16.5 4v7M13 7.5h7"/>',sound:'<path d="M4 10v4h4l5 4V6L8 10z"/><path d="M16 9a4 4 0 0 1 0 6"/>',contrast:'<circle cx="12" cy="12" r="8"/><path d="M12 4v16a8 8 0 0 0 0-16z" fill="currentColor"/>',move:'<path d="M4 8h13l-3-3M20 16H7l3 3"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>'};
function ic(n,s){return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"'+(s?' style="width:'+s+'px;height:'+s+'px"':'')+'>'+(IC[n]||IC.spark)+'</svg>';}
function fmt(n){n=Math.round(n);return (n<0?'−':'')+'₹'+Math.abs(n).toLocaleString('en-IN');}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function catIc(c){return (CAT_DEF[c]&&CAT_DEF[c].i)||'sort';}
/* tiles: specs = array of {c:color, cls:'', k:'k1', p:partial 0..1, d:delay} ; empty slot if no c. cols=0 → wrap */
function tg(specs,cols,size,gap,extra){var g=(gap==null?Math.max(2,Math.round(size*.25)):gap),h='<div class="tg'+(cols?'':' wrap')+(extra&&extra.center?' center':'')+(extra&&extra.cls?' '+extra.cls:'')+'" style="'+(cols?'--c:'+cols+';':'')+'--s:'+size+'px;--g:'+g+'px"'+(extra&&extra.attr?' '+extra.attr:'')+'>';
 specs.forEach(function(s,i){var st='--i:'+i+';',cl=s.cls||'';if(s.c){st+='--tc:'+s.c+';';if(s.p!=null&&s.p<1){cl+=' pt';st+='--p:'+s.p+';';}else{st+='background-color:'+s.c+';';cl+=' f';}if(s.c==='var(--save)')cl+=' sv';}if(s.k)cl+=' '+s.k;if(s.d!=null)st+='--d:'+s.d+'ms;animation-delay:'+s.d+'ms;';h+='<i class="'+cl.trim()+'" style="'+st+'"'+(s.v?' data-a="reveal" data-v="'+s.v+'"':'')+'></i>';});return h+'</div>';}
function rep(n,spec){var a=[];for(var i=0;i<n;i++)a.push(Object.assign({},spec));return a;}
/* ---- v9 tile unit engine ---- */
var UNITS=[10,50,100,250,500,1000,2500];
function tcount(v,u){if(!(v>0))return 0;var f=Math.floor(v/u+1e-9),r=v/u-f;return f+(r>=.1?1:0);}
function unitFor(vals,cap){vals=vals.filter(function(v){return v>0;});for(var i=0;i<UNITS.length;i++){var u=UNITS[i],n=0;vals.forEach(function(v){n+=tcount(v,u);});if(n<=cap)return u;}return 2500;}
function quarter(r){var q=Math.round(r*4)/4;return q<.25?.25:q;}
/* value → tile specs (full tiles + one partial tile) */
function tiles(v,u,spec){spec=spec||{};if(!(v>0))return [];var f=Math.floor(v/u+1e-9),r=v/u-f,a=rep(f,spec);if(r>=.1){var q=quarter(r);if(q>=1)a.push(Object.assign({},spec));else a.push(Object.assign({},spec,{p:q}));}return a;}
function ukey(u){return '1 tile = '+fmt(u);}
function tkey(txt,sw){return '<span class="tkey"><i class="'+(sw||'')+'"></i>'+txt+'</span>';}
function ct(c){return {c:catColor(c),k:catK(c)};}
/* a category's budget grid in unit u */
function budgetUnit(p){p=p||POOLS();return unitFor([Math.max.apply(null,CATS.map(function(c){return Math.max(FIXED[c],fundedThisMonth(c));}))],30);}
function catSpecs(c,p,u){p=p||POOLS();u=u||budgetUnit(p);var left=Math.round(p.b[c]||0),fund=Math.max(FIXED[c],fundedThisMonth(c),left),T=Math.max(1,tcount(fund,u));
 var a=tiles(Math.max(0,left),u,ct(c)).slice(0,T);a=a.concat(rep(Math.max(0,T-a.length),{}));
 var over=left<0?tcount(-left,u):0;return {specs:a,left:left,over:over,T:T,u:u};}
function colsFor(n){return n<=10?n:n<=24?6:n<=40?8:10;}
function waffle(g,size,extra){var p=POOLS(),s=Math.max(0,p.g[g.id]||0),pct=g.target?Math.min(100,Math.floor(s/g.target*100)):0;
 var a=[];for(var i=0;i<100;i++)a.push(i<pct?{c:'var(--save)'}:{});if(extra&&extra.highlight){for(var j=Math.max(0,pct-extra.highlight);j<pct;j++)a[j].cls='pop';}
 return tg(a,10,size,Math.max(2,Math.round(size*.22)),{attr:(extra&&extra.noReveal?'':'data-a="reveal" ')+' data-v="'+fmt(s)+' of '+fmt(g.target)+'" role="img" aria-label="'+esc(g.name)+' '+pct+' percent full"'});}
function goalPct(g){var s=POOLS().g[g.id]||0;return g.target?Math.min(100,Math.floor(s/g.target*100)):0;}
function goalWords(g){var p=goalPct(g);return p>=100?'full':p>=75?'almost there':p>=50?'over half full':p>=25?'a quarter full':'on its way';}
function relDay(ts){var d0=new Date(NOW);d0.setHours(0,0,0,0);var diff=Math.floor((d0.getTime()-new Date(ts).setHours(0,0,0,0))/DAY);if(diff===0)return 'Today';if(diff===1)return 'Yesterday';if(diff<7&&diff>0)return DOWS[new Date(ts).getDay()];return new Date(ts).getDate()+' '+MON[new Date(ts).getMonth()];}
function timeStr(ts){var d=new Date(ts),h=d.getHours(),m=d.getMinutes();return (h%12||12)+':'+(m<10?'0':'')+m+(h<12?' am':' pm');}
function glowHTML(){var pc=pace(),col=glowCol(pc.state),o=[.9,.5,.75,.35,.8,.55,.4,.85,.6,.95,.45,.7,.3,.65,.5,.8,.4,.6,.2,.4,.3,.5,.25,.35],h='';
 o.forEach(function(x){h+='<i style="opacity:'+x+'"></i>';});return '<div class="glow'+(S.fresh?' reset':'')+'" id="glow" style="--gc:'+col+'" aria-hidden="true">'+h+'</div>';}
function glowCol(st){if(S.look==='bw')return st==='ok'?'rgba(255,255,255,.46)':'rgba(255,255,255,.16)';return st==='ok'?'rgba(79,209,139,.55)':'rgba(242,169,59,.6)';}
function paceChip(){var pc=pace();return pc.state==='ok'?'<span class="pill calm">'+ic('leaf',15)+'On pace</span>':'<span class="pill warm">'+ic('spark',15)+'A bit fast</span>';}
function periodWord(){return PERIOD==='week'?'week':'month';}
function nextPeriodWord(){if(PERIOD==='week')return 'Next week';return MONL[(new Date(NOW).getMonth()+1)%12];}
function thisPeriodName(){return PERIOD==='week'?'This week':MONL[new Date(NOW).getMonth()];}

function relWord(ts){var r=relDay(ts);return /\d/.test(r)?'Earlier':r;}
var SHEETS={};
var A={};

/* ===== Trickle v9 — sound (WebAudio, soft, ≤0.15 per voice) + motion helpers ===== */
var SND={on:true,ctx:null,ready:false,last:{},tileN:0,log:[]};
try{SND.on=localStorage.getItem('trickle9snd')!=='0';}catch(e){}
var PEAK_MAX=0.15;
function sndUnlock(){if(!SND.ctx){var AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;try{SND.ctx=new AC();var c=SND.ctx;SND.lp=c.createBiquadFilter();SND.lp.type='lowpass';SND.lp.frequency.value=2400;SND.master=c.createGain();SND.master.gain.value=1;SND.comp=c.createDynamicsCompressor();SND.lp.connect(SND.master);SND.master.connect(SND.comp);SND.comp.connect(c.destination);}catch(e){SND.ctx=null;return;}}
 try{var r=SND.ctx.resume();if(r&&r.then)r.then(function(){SND.ready=true;}).catch(function(){});else SND.ready=true;}catch(e){}SND.ready=SND.ctx.state==='running'||SND.ready;}
document.addEventListener('pointerdown',sndUnlock,true);document.addEventListener('keydown',sndUnlock,true);
function env(g,t0,a,peak,d){peak=Math.min(PEAK_MAX,peak);g.gain.setValueAtTime(0.0001,t0);g.gain.linearRampToValueAtTime(peak,t0+a);g.gain.exponentialRampToValueAtTime(0.0001,t0+a+d);return peak;}
function voice(f,type,t0,a,d,peak,sparkle){var c=SND.ctx,o=c.createOscillator(),g=c.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,t0);var p=env(g,t0,a,peak,d);o.connect(g);g.connect(SND.lp);o.start(t0);o.stop(t0+a+d+.05);SND.log.push(p);
 if(sparkle){var o2=c.createOscillator(),g2=c.createGain();o2.type='triangle';o2.frequency.setValueAtTime(f*2,t0);SND.log.push(env(g2,t0,a,peak*.3,d));o2.connect(g2);g2.connect(SND.lp);o2.start(t0);o2.stop(t0+a+d+.05);}}
var PENTA=[523,587,659,784,880,1047];
var RECIPES={
 tap:function(t){voice(880,'sine',t,.005,.06,.05);},
 toggle:function(t){voice(1200,'sine',t,.003,.04,.03);},
 tile:function(t){voice(PENTA[SND.tileN++%PENTA.length],'triangle',t,.003,.09,.018);},
 pour:function(t){[660,784,988].forEach(function(f,i){voice(f,'sine',t+i*.04,.004,.08,.05);});},
 pay:function(t){voice(784,'sine',t,.01,.18,.08);voice(523,'sine',t+.09,.01,.18,.08);},
 save:function(t){[523,659,784,1047].forEach(function(f,i){voice(f,'sine',t+i*.07,.008,.6,i===3?.12:.09,true);});},
 income:function(t){voice(262,'sine',t,.02,.5,.1);voice(392,'sine',t,.02,.5,.08);voice(659,'sine',t+.22,.01,.4,.06,true);},
 goal:function(t){RECIPES.save(t);[1047,1319,1568,2093].forEach(function(f,i){voice(f,'sine',t+.35+i*.07,.008,.6,.1,true);});},
 soft:function(t){voice(330,'sine',t,.01,.25,.05);},
 flow:function(t){var c=SND.ctx,len=c.sampleRate*.7,b=c.createBuffer(1,len,c.sampleRate),d=b.getChannelData(0);for(var i=0;i<len;i++)d[i]=Math.random()*2-1;var s=c.createBufferSource();s.buffer=b;var bp=c.createBiquadFilter();bp.type='bandpass';bp.Q.value=1.2;bp.frequency.setValueAtTime(600,t);bp.frequency.exponentialRampToValueAtTime(2400,t+.7);var g=c.createGain();SND.log.push(env(g,t,.2,.03,.5));s.connect(bp);bp.connect(g);g.connect(SND.lp);s.start(t);s.stop(t+.75);}};
var THROTTLE={tile:45,save:1500,goal:1500,tap:40,toggle:40,pour:200,flow:600,income:800,pay:400,soft:300};
function play(name,delay){if(!SND.on||!SND.ctx||SND.ctx.state!=='running'||!RECIPES[name])return false;if(name==='flow'&&isReduced())return false;var now=performance.now()+(delay||0);if(SND.last[name]&&now-SND.last[name]<(THROTTLE[name]||0))return false;SND.last[name]=now;
 try{RECIPES[name](SND.ctx.currentTime+(delay||0)/1000+.01);}catch(e){}SND.played=(SND.played||[]);SND.played.push(name);return true;}
function isReduced(){return S.reduced||(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);}
/* tile tick train for popping tiles (very quiet, throttled) */
function tileTicks(n){n=Math.min(n,8);SND.tileN=0;for(var i=0;i<n;i++)(function(i){setTimeout(function(){play('tile');},60+i*70);})(i);}
/* count-up for [data-count] */
function countUps(root){(root||document).querySelectorAll('[data-count]').forEach(function(el){var v=+el.getAttribute('data-count'),pre=el.getAttribute('data-pre')||'';if(isReduced()){el.textContent=pre+fmt(v);return;}var t0=performance.now();el.classList.add('counting');
 (function f(){var k=Math.min(1,(performance.now()-t0)/700),e=1-Math.pow(1-k,3);el.textContent=pre+fmt(Math.round(v*e/10)*10*(k<1?1:0)+(k<1?0:v));if(k<1)requestAnimationFrame(f);else el.classList.remove('counting');})();});}
A.snd=function(x){SND.on=x==='1';try{localStorage.setItem('trickle9snd',SND.on?'1':'0');}catch(e){}if(SND.on){sndUnlock();setTimeout(function(){play('toggle');},30);}render();};

/* ===== Trickle v9 — data helpers, 20 widgets, Sankey ===== */
function spendsIn(a,b,f){return TX.filter(function(t){return t.type==='spend'&&!t.goalFunded&&t.ts>=a&&t.ts<b&&t.ts<=NOW&&(!f||f(t));});}
function mStart(m){return at(m,1);}function mEnd(m){return at(m+1,1);}
function sumAmt(a){return a.reduce(function(x,t){return x+t.amt;},0);}
function curM(){return new Date(NOW).getMonth();}
function dayStart(ts){var d=new Date(ts);d.setHours(0,0,0,0);return d.getTime();}
function ordinal(n){var s=['th','st','nd','rd'],v=n%100;return n+(s[(v-20)%10]||s[v]||s[0]);}
function glist(a){return a.length<=1?a.join(''):a.slice(0,-1).join(', ')+' and '+a[a.length-1];}

/* ---- repeat buys: same place (or same kind) bought N+ times in 30 days, any amount; subs + transfers excluded ---- */
var KIND={'Chai Tapri':'Chai','Campus Coffee':'Coffee'};
var REPEAT_N=3;
function rkey(t){return t.merchant;}
function repeatGroups(a,b){a=a||NOW-30*DAY;b=b||NOW+1;var g={};spendsIn(a,b,function(t){return !t.sub&&t.cat!=='Unsorted'&&t.amt<1000;}).forEach(function(t){var k=rkey(t);(g[k]=g[k]||{name:k,cat:t.cat,list:[],amt:0}).list.push(t);g[k].amt+=t.amt;});
 return Object.keys(g).map(function(k){return g[k];}).filter(function(x){return x.list.length>=REPEAT_N;}).sort(function(x,y){return y.list.length-x.list.length||y.amt-x.amt;});}
function repeatSpends(a,b){var o=[];repeatGroups(a,b).forEach(function(g){o=o.concat(g.list);});return o.sort(function(x,y){return x.ts-y.ts;});}
function weekCount(merchant){return spendsIn(NOW-7*DAY,NOW+1,function(t){return t.merchant===merchant;}).length;}

/* ---- widget registry ---- */
var WIDGETS={goal:'Goal jar',month:'This month',flow:'Money flow',where:'Where it went',range:'Spend range',rbsum:'Repeat buys',rbfreq:'Repeat buys: how often',rbrep:'Repeat buys: per place',rbtrend:'Repeat buys: trend',sizes:'Purchase sizes',vs:'This vs last month',mbm:'Month by month',saved:'Savings growing',rate:'Savings rate',tod:'When you spend',week:'Weekday pattern',top:'Top places',subs:'Subscriptions',owed:'Owed to you',eta:'Goal ETA'};
var WSIZE={goal:'S',month:'W',flow:'L',where:'W',range:'W',rbsum:'W',rbfreq:'S',rbrep:'W',rbtrend:'S',sizes:'W',vs:'W',mbm:'W',saved:'W',rate:'S',tod:'S',week:'W',top:'W',subs:'W',owed:'W',eta:'W'};
var ALLW=Object.keys(WIDGETS);
var WF={};
/* each returns {body,cap,key,attr,aria} */
WF.goal=function(o){var g=topGoal();return {body:waffle(g,11,o.home?{noReveal:1}:null),cap:esc(g.name)+' is '+goalWords(g),key:tkey('1 tile = 1%','sv'),attr:'data-a="goal" data-x="'+g.id+'"',aria:esc(g.name)+' jar, each tile 1 percent'};};
WF.month=function(){var m=curM(),ms=[m-2,m-1,m],all=[],days={};
 ms.forEach(function(mm){spendsIn(mStart(mm),mEnd(mm)).forEach(function(t){var k=dayStart(t.ts);days[k]=(days[k]||0)+t.amt;});});
 Object.keys(days).forEach(function(k){all.push(days[k]);});all.sort(function(a,b){return a-b;});
 function q(v){if(!v)return 0;var i=all.indexOf(v)/Math.max(1,all.length-1);return i<.25?1:i<.5?2:i<.75?3:4;}
 var today=dayStart(NOW),h='<div class="dm">';ms.forEach(function(mm){var n=new Date(2026,mm+1,0).getDate();h+='<div class="dmm"><div class="dml">'+MON[(mm+12)%12]+'</div><div class="dmg">';for(var d=1;d<=n;d++){var ts=at(mm,d),v=days[ts]||0,fut=ts>today,lv=fut?-1:q(v);
  h+='<i class="lv'+(lv<0?'f':lv)+(ts===today?' td':'')+'" style="--i:'+(d+ (mm-ms[0])*31)+'"'+(fut?'':' data-a="reveal" data-v="'+d+' '+MON[mm]+' · '+(v?fmt(v):'no spends')+'"')+'></i>';}h+='</div></div>';});h+='</div>';
 var pc=pace();return {body:h,cap:(pc.state==='ok'?'On pace':'A bit fast')+'. Brighter dots were bigger spend days.',key:tkey('1 dot = 1 day','dot'),aria:'Three months of spend days as dots'};};
WF.where=function(){var m=curM(),v=CATS.map(function(c){return spentMonth(c);}),u=unitFor(v,50);
 var h='<div class="rows">'+CATS.map(function(c,i){return '<div class="rw"><span class="rl"><span class="cdot" style="background:'+catColor(c)+'"></span>'+c+'</span>'+tg(tiles(v[i],u,ct(c)),0,13,3,{attr:'data-a="reveal" data-v="'+c+' · '+fmt(v[i])+'"'})+'</div>';}).join('')+'</div>';
 return {body:h,cap:'What '+MONL[m]+' went on so far',key:tkey(ukey(u)),u:u,n:v.reduce(function(a,x){return a+tcount(x,u);},0)};};
WF.rbsum=function(o){var r=repeatSpends(),tot=sumAmt(r),u=unitFor([tot],o.home?30:50),gs=repeatGroups();
 return {body:tg(tiles(tot,u,{c:'var(--text2)'}),0,14,3,{cls:'pour',attr:'data-a="reveal" data-v="Added up to '+fmt(tot)+' in 30 days"'}),cap:(gs.length?glist(gs.slice(0,3).map(function(g){return esc(g.name);}))+', again and again':'Nothing repeats yet')+' <button class="link inl" data-a="rbopen">See all</button>',key:tkey(ukey(u),'g2'),u:u,n:tcount(tot,u),aria:'Repeat buys added up'};};
WF.rbfreq=function(){var h='<div class="frq">';for(var w=3;w>=0;w--){var a=NOW-(w+1)*7*DAY,b=NOW-w*7*DAY+1,r=repeatSpends(NOW-30*DAY,NOW+1).filter(function(t){return t.ts>=a&&t.ts<b;});
  h+='<div class="frr"><span>'+(w===0?'This wk':w===1?'Last wk':w+' wks ago')+'</span>'+tg(r.map(function(t){return {c:catColor(t.cat),k:catK(t.cat),cls:w===0?'gl':'',v:esc(t.merchant)+' · '+fmt(t.amt)};}),0,7,3,{cls:'dots'})+'</div>';}
 return {body:h+'</div>',cap:'Repeat buys, week by week',key:tkey('1 dot = 1 buy','dot')};};
WF.rbrep=function(){var gs=repeatGroups().slice(0,4);if(!gs.length)return {body:'<p class="muted">Nothing repeats yet.</p>',cap:'',key:''};
 var h='<div class="rows">'+gs.map(function(g){return '<div class="rw" data-a="reveal" data-v="'+esc(g.name)+' · '+g.list.length+' times · '+fmt(g.amt)+'"><span class="rl">'+esc(g.name)+'</span>'+tg(rep(g.list.length,ct(g.cat)),0,11,3)+'</div>';}).join('')+'</div>';
 return {body:h,cap:'The places you keep going back to',key:tkey('1 tile = 1 visit')};};
WF.rbtrend=function(){var m=curM(),d=new Date(NOW).getDate(),ms=[m-2,m-1,m],v=ms.map(function(mm){return sumAmt(repeatSpends(mStart(mm),Math.min(mEnd(mm),mm===m?NOW+1:mEnd(mm))));}),u=unitFor(v,30);
 var prevPace=v[1]/new Date(2026,m,0).getDate()*d,word=v[2]<prevPace*.95?'Fewer than '+MONL[m-1]+' so far':v[2]>prevPace*1.05?'More than '+MONL[m-1]+' so far':'About the same as '+MONL[m-1];
 return {body:'<div class="cols">'+ms.map(function(mm,i){return '<div class="col">'+tg(tiles(v[i],u,{c:'var(--text2)',cls:i===2?'gl':''}),3,11,3,{cls:'up',attr:'data-a="reveal" data-v="'+MON[mm]+' · '+fmt(v[i])+'"'})+'<small>'+MON[mm]+'</small></div>';}).join('')+'</div>',cap:word,key:tkey(ukey(u),'g2'),n:v.reduce(function(a,x){return a+tcount(x,u);},0)};};
WF.sizes=function(){var B=[[50,'Up to ₹50'],[150,'₹50–150'],[300,'₹150–300'],[600,'₹300–600'],[1e9,'Over ₹600']],c=[0,0,0,0,0],r=spendsIn(mStart(curM()),NOW+1);
 r.forEach(function(t){for(var i=0;i<B.length;i++)if(t.amt<=B[i][0]){c[i]++;break;}});var tot=c.reduce(function(a,b){return a+b;},0),u=[1,2,5,10].filter(function(x){return c.reduce(function(a,b){return a+Math.ceil(b/x);},0)<=50;})[0]||10;
 return {body:'<div class="rows">'+B.map(function(b,i){return '<div class="rw" data-a="reveal" data-v="'+c[i]+' buys"><span class="rl">'+b[1]+'</span>'+tg(rep(Math.ceil(c[i]/u),{c:i<2?'var(--text)':'var(--text3)'}),0,11,3)+'</div>';}).join('')+'</div>',cap:'Most of your buys are small ones',key:tkey(u===1?'1 tile = 1 buy':'1 tile = '+u+' buys')};};
WF.vs=function(){var m=curM(),d=new Date(NOW).getDate(),lastEnd=at(m-1,d+1),vT=CATS.map(function(c){return spentMonth(c);}),vL=CATS.map(function(c){return sumAmt(spendsIn(mStart(m-1),lastEnd,function(t){return t.cat===c;}));}),u=unitFor(vT.concat(vL),50);
 return {body:'<div class="rows">'+CATS.map(function(c,i){return '<div class="rw2"><span class="rl"><span class="cdot" style="background:'+catColor(c)+'"></span>'+c+'<small>'+(vT[i]<vL[i]*.95?'less':vT[i]>vL[i]*1.05?'more':'same')+'</small></span><div class="st">'+tg(tiles(vL[i],u,{cls:'ol'}),0,10,2,{attr:'data-a="reveal" data-v="'+MON[m-1]+' · '+fmt(vL[i])+'"'})+tg(tiles(vT[i],u,ct(c)),0,10,2,{attr:'data-a="reveal" data-v="'+MON[m]+' · '+fmt(vT[i])+'"'})+'</div></div>';}).join('')+'</div>',
  cap:'Outlined is '+MONL[m-1]+' up to the same day, filled is '+MONL[m],key:tkey(ukey(u)),n:vT.concat(vL).reduce(function(a,x){return a+tcount(x,u);},0)};};
WF.mbm=function(){var m=curM(),ms=[m-2,m-1,m],vv=ms.map(function(mm){return CATS.map(function(c){return spentMonth(c,at(mm,5));});}),flat=[].concat.apply([],vv),u=unitFor(flat,50);
 return {body:'<div class="cols">'+ms.map(function(mm,i){var a=[];CATS.forEach(function(c,j){a=a.concat(tiles(vv[i][j],u,Object.assign(ct(c),{cls:i===2?'gl':''})));});return '<div class="col">'+tg(a,4,11,3,{cls:'up',attr:'data-a="reveal" data-v="'+MON[mm]+' · '+fmt(vv[i].reduce(function(x,y){return x+y;},0))+'"'})+'<small>'+MON[mm]+'</small></div>';}).join('')+'</div>'+legend(CATS),cap:'Since you started Trickle in '+MONL[m-2],key:tkey(ukey(u)),n:flat.reduce(function(a,x){return a+tcount(x,u);},0)};};
WF.saved=function(){var m=curM(),ms=[m-2,m-1,m],v=ms.map(savedIn),cum=v.reduce(function(a,b){return a+b;},0),u=unitFor(v.concat([cum]),50);
 return {body:'<div class="cols">'+ms.map(function(mm,i){return '<div class="col">'+tg(tiles(v[i],u,{c:'var(--save)',cls:i===2?'gl':''}),3,11,3,{cls:'up',attr:'data-a="reveal" data-v="'+MON[mm]+' · '+fmt(v[i])+' kept"'})+'<small>'+MON[mm]+'</small></div>';}).join('')+'<div class="col">'+tg(tiles(cum,u,{cls:'ol'}),4,11,3,{cls:'up',attr:'data-a="reveal" data-v="All together · '+fmt(cum)+'"'})+'<small>Together</small></div></div>',cap:'It keeps piling up',key:tkey(ukey(u),'sv'),n:v.concat([cum]).reduce(function(a,x){return a+tcount(x,u);},0)};};
function incomeIn(m){return sumAmt(TX.filter(function(t){return t.type==='income'&&t.ts>=mStart(m)&&t.ts<mEnd(m);}));}
WF.rate=function(){var m=curM(),inc=incomeIn(m),sv=savedIn(m),pct=inc?Math.min(100,Math.round(sv/inc*100)):0,a=[];for(var i=0;i<100;i++)a.push(i<pct?{c:'var(--save)'}:{});
 return {body:tg(a,10,11,3,{attr:'data-a="reveal" data-v="'+pct+'% of '+MON[m]+' income kept"'}),cap:pct>=30?'You kept a big share':'You kept some',key:tkey('1 tile = 1% of income','sv')};};
WF.tod=function(){var hrs=[];for(var i=0;i<24;i++)hrs.push(0);spendsIn(mStart(curM()),NOW+1).forEach(function(t){hrs[new Date(t.ts).getHours()]+=t.amt;});var mx=Math.max.apply(null,hrs)||1,pk=hrs.indexOf(mx);
 var W=150,c=W/2,R=58,s='<svg viewBox="0 0 '+W+' '+W+'" class="ring" role="img" aria-label="Spending by hour">';
 hrs.forEach(function(v,h){var an=(h/24)*Math.PI*2-Math.PI/2,x=c+R*Math.cos(an),y=c+R*Math.sin(an),o=v?.25+.75*v/mx:.12;s+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(h===pk?6:4.5)+'" fill="var(--text)" fill-opacity="'+o.toFixed(2)+'" class="rd'+(h===pk?' pk':'')+'" style="--i:'+h+'" data-a="reveal" data-v="'+(h%12||12)+(h<12?' am':' pm')+' · '+fmt(v)+'"/>';});
 [['12a',c,c-R+16],['6a',c+R-16,c+4],['12p',c,c+R-10],['6p',c-R+16,c+4]].forEach(function(l){s+='<text x="'+l[1]+'" y="'+l[2]+'" text-anchor="middle" font-size="9" fill="var(--text3)">'+l[0]+'</text>';});
 var word=pk<11?'Mornings':pk<16?'Afternoons':pk<21?'Evenings':'Late nights';
 s+='<text x="'+c+'" y="'+(c+4)+'" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">'+word+'</text></svg>';
 return {body:s,cap:word+' are when money moves',key:tkey('1 dot = 1 hour','dot')};};
WF.week=function(){var d=[0,0,0,0,0,0,0];spendsIn(NOW-28*DAY,NOW+1).forEach(function(t){d[(new Date(t.ts).getDay()+6)%7]+=t.amt;});var u=unitFor(d,50),L=['M','T','W','T','F','S','S'],mx=d.indexOf(Math.max.apply(null,d));
 return {body:'<div class="cols c7">'+d.map(function(v,i){return '<div class="col">'+tg(tiles(v,u,{c:i===mx?'var(--text)':'var(--text3)'}),2,11,3,{cls:'up',attr:'data-a="reveal" data-v="'+DOWS[(i+1)%7]+'s · '+fmt(v)+'"'})+'<small>'+L[i]+'</small></div>';}).join('')+'</div>',cap:DOWS[(mx+1)%7]+'s are the busiest, last four weeks',key:tkey(ukey(u)),n:d.reduce(function(a,x){return a+tcount(x,u);},0)};};
WF.top=function(){var g={};spendsIn(mStart(curM()),NOW+1,function(t){return t.cat!=='Unsorted';}).forEach(function(t){(g[t.merchant]=g[t.merchant]||{n:t.merchant,c:t.cat,v:0}).v+=t.amt;});var r=Object.keys(g).map(function(k){return g[k];}).sort(function(a,b){return b.v-a.v;}).slice(0,5),u=unitFor(r.map(function(x){return x.v;}),50);
 return {body:'<div class="rows">'+r.map(function(x){return '<div class="rw" data-a="reveal" data-v="'+esc(x.n)+' · '+fmt(x.v)+'"><span class="rl">'+esc(x.n)+'</span>'+tg(tiles(x.v,u,ct(x.c)),0,11,3)+'</div>';}).join('')+'</div>',cap:'Where '+MONL[curM()]+' went most',key:tkey(ukey(u)),n:r.reduce(function(a,x){return a+tcount(x.v,u);},0)};};
function subRing(size,r,dotR){var c=size/2,s='<svg viewBox="0 0 '+size+' '+size+'" width="'+size+'" height="'+size+'" class="ring" aria-hidden="true">',td=new Date(NOW).getDate();for(var d=1;d<=30;d++){var an=((d-1)/30)*Math.PI*2-Math.PI/2,sub=SUBS.filter(function(x){return x.day===d;})[0],x=c+r*Math.cos(an),y=c+r*Math.sin(an);
  s+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(sub?dotR*1.5:dotR)+'" fill="'+(sub?catColor(sub.cat):d===td?'var(--text)':'var(--text3)')+'" fill-opacity="'+(sub?1:d<td?.5:.2)+'"'+(sub?' class="sg'+(sub.day>=td&&sub.day-td<4?' soon':'')+'"':'')+(sub?' data-a="reveal" data-v="'+esc(sub.name)+' · '+fmt(sub.amt)+' on the '+ordinal(sub.day)+'"':'')+'/>';}
 return s+'</svg>';}
WF.subs=function(){var u=unitFor(SUBS.map(function(s){return s.amt;}),30);
 return {body:'<div style="display:flex;gap:14px;align-items:center">'+subRing(96,40,3)+'<div class="rows" style="flex:1;min-width:0">'+SUBS.map(function(s){return '<div class="rw" data-a="reveal" data-v="'+esc(s.name)+' · '+fmt(s.amt)+' a month"><span class="rl">'+esc(s.name)+'</span>'+tg(tiles(s.amt,u,ct(s.cat)),0,10,3)+'</div>';}).join('')+'</div></div>',cap:'Glowing dots are renewal days',key:tkey(ukey(u)),n:SUBS.reduce(function(a,s){return a+tcount(s.amt,u);},0)};};
WF.owed=function(){var o=IOUS.filter(function(i){return !i.settledTs;});if(!o.length)return {body:'<p class="muted">Everyone has paid you back.</p>',cap:'All square',key:''};var u=unitFor(o.map(function(i){return i.amt;}),30);
 return {body:'<div class="rows">'+o.map(function(i){return '<div class="rw" data-a="reveal" data-v="'+i.person+' · '+fmt(i.amt)+'"><span class="rl">'+i.person+'</span>'+tg(tiles(i.amt,u,{cls:'ol'}),0,12,3)+'</div>';}).join('')+'</div><div class="chips" style="margin-top:8px"><button class="chip" data-a="remind">'+ic('bell',16)+'Remind</button><button class="chip" data-a="settle">'+ic('check',16)+'Paid back</button></div>',cap:'Outlined: not in your balance until they pay',key:tkey(ukey(u),'ol'),n:o.reduce(function(a,i){return a+tcount(i.amt,u);},0)};};
function goalRate(){var m=curM(),v=[m-2,m-1].map(savedIn);return Math.max(200,(v[0]+v[1])/2/4.33);}
function goalEta(g){var have=POOLS().g[g.id]||0,rem=Math.max(0,g.target-have),w=Math.ceil(rem/goalRate());return {weeks:w,ts:NOW+w*7*DAY,rem:rem};}
WF.eta=function(o){var g=(o&&o.g)||topGoal(),e=goalEta(g),start=g.createdTs||NOW-8*7*DAY,past=Math.max(1,Math.round((NOW-start)/(7*DAY))),tot=past+e.weeks,step=1;while(tot/step>40)step++;var n=Math.ceil(tot/step),pn=Math.round(past/step),a=[];
 for(var i=0;i<n;i++)a.push(i<pn?{c:'var(--save)',cls:i===pn-1?'gl':''}:{cls:i===n-1?'tgt':''});
 return {body:tg(a,0,9,4,{cls:'path',attr:'data-a="reveal" data-v="About '+e.weeks+' weeks to go"'}),cap:esc(g.name)+' around '+MONL[new Date(e.ts).getMonth()]+' at this pace',key:tkey(step===1?'1 dot = 1 week':'1 dot = '+step+' weeks','sv')};};
WF.range=function(){var ws=(new Date(NOW).getDay()+6)%7,w0=dayStart(NOW)-ws*DAY,weeks=[];for(var i=5;i>=0;i--){var a=w0-i*7*DAY,d={};spendsIn(a,a+7*DAY).forEach(function(t){var k=dayStart(t.ts);d[k]=(d[k]||0)+t.amt;});var v=Object.keys(d).map(function(k){return d[k];}).sort(function(x,y){return x-y;});weeks.push({a:a,v:v,cur:i===0});}
 var mx=Math.max.apply(null,weeks.map(function(w){return w.v[w.v.length-1]||0;}))||1,step=[50,100,200,250,500,1000].filter(function(s){return mx/s<=5;})[0]||1000,top=Math.ceil(mx/step)*step,W=340,H=150,pl=8,pb=20,cw=(W-pl)/6,Y=function(v){return 8+(H-pb-8)*(1-v/top);};
 var s='<svg viewBox="0 0 '+W+' '+H+'" class="rng" role="img" aria-label="Daily spend range per week">';for(var g=0;g<=top;g+=step)s+='<line x1="0" x2="'+W+'" y1="'+Y(g).toFixed(1)+'" y2="'+Y(g).toFixed(1)+'" stroke="var(--border)" stroke-width="1"/>';
 weeks.forEach(function(w,i){var x=pl+cw*i+cw/2;if(w.v.length){s+='<line x1="'+x+'" x2="'+x+'" y1="'+Y(w.v[0]).toFixed(1)+'" y2="'+Y(w.v[w.v.length-1]).toFixed(1)+'" stroke="var(--text3)" stroke-width="1.5" class="rail"/>';
  w.v.forEach(function(v,j){s+='<circle cx="'+x+'" cy="'+Y(v).toFixed(1)+'" r="4" fill="'+(w.cur?'var(--text)':'var(--text2)')+'" stroke="var(--surface)" stroke-width="2" class="rdot'+(w.cur?' gl':'')+'" style="--i:'+(i*7+j)+'"/>';});
  var md=w.v[Math.floor(w.v.length/2)];s+='<line x1="'+(x-9)+'" x2="'+(x+9)+'" y1="'+Y(md).toFixed(1)+'" y2="'+Y(md).toFixed(1)+'" stroke="var(--text)" stroke-width="2"/>';}
  var dd=new Date(w.a);s+='<text x="'+x+'" y="'+(H-5)+'" text-anchor="middle" font-size="10" fill="'+(w.cur?'var(--text)':'var(--text3)')+'">'+(w.cur?'This wk':dd.getDate()+' '+MON[dd.getMonth()])+'</text>';
  s+='<rect x="'+(x-cw/2)+'" y="0" width="'+cw+'" height="'+H+'" fill="transparent" data-a="reveal" data-v="Week of '+dd.getDate()+' '+MON[dd.getMonth()]+' · '+(w.v.length?fmt(w.v[0])+' to '+fmt(w.v[w.v.length-1])+' a day':'no spends')+'"/>';});
 var rg=function(w){return w.v.length?w.v[w.v.length-1]-w.v[0]:0;},cur=rg(weeks[5]),prev=weeks.slice(0,5).map(rg).reduce(function(a,b){return a+b;},0)/5;
 return {body:s+'</svg>',cap:cur<prev?'Steadier than earlier weeks':'A few big days this week',key:tkey('gridline = '+fmt(step),'ln')};};
WF.flow=function(o){var sk=sankeyData();return {body:sankeySVG(sk,o),cap:'Where '+MONL[curM()]+'’s money went. Tap a block.',key:tkey(ukey(sk.u)+' · band width = ₹','g2')};};

/* ---- card chrome ---- */
function widget(w,where){var home=where==='home',o={home:home},r=WF[w](o),size=WSIZE[w];
 var gear='<button class="gear" data-a="wset" data-x="'+w+'" aria-label="'+WIDGETS[w]+' settings">'+ic('sliders',18)+'</button>';
 var tapBody=r.attr&&home;
 return '<section class="wc '+size+'" data-w="'+w+'" aria-label="'+WIDGETS[w]+(r.aria?', '+r.aria:'')+'">'+
  '<div class="wh"><span class="wt">'+WIDGETS[w]+'</span>'+gear+'</div>'+
  '<div class="wb"'+(r.attr?' '+r.attr+' role="button" tabindex="0" style="cursor:pointer"':'')+'>'+r.body+'</div>'+
  (r.cap?'<p class="wcap">'+r.cap+'</p>':'')+'<div class="wf">'+(r.key||'')+'<span class="wtip" aria-live="polite"></span></div></section>';}
function addTile(){return '<button class="wc S addw" data-a="wlib" aria-label="Add widget">'+ic('addw',30)+'<span>Add widget</span></button>';}

/* ---- Sankey ---- */
function sankeyData(){var ms=monthStart(NOW),N={},L=[],inM=function(t){return t.ts>=ms&&t.ts<=NOW+1;};
 function node(id,label,col,color,extra){if(!N[id])N[id]=Object.assign({id:id,label:label,col:col,color:color,in:0,out:0},extra||{});return N[id];}
 function link(s,t,v,cls){if(v<=0.5)return;v=Math.round(v);L.push({s:s,t:t,v:v,cls:cls||''});N[s].out+=v;N[t].in+=v;}
 node('budget','Budget',1,'var(--fillg)');node('savings','Savings',1,'var(--save)');
 TX.filter(function(t){return t.type==='income'&&inM(t);}).forEach(function(inc){var id='src:'+inc.merchant;node(id,inc.merchant,0,'var(--bone)');var tr=TX.filter(function(t){return t.incomeId===inc.id;}),f=0,sv=0;tr.forEach(function(t){if(t.reason==='fill')f+=t.amt;else sv+=t.amt;});
  link(id,'budget',f);link(id,'savings',sv);var rest=inc.amt-f-sv;if(rest>0.5){node('new','New money',1,'var(--bone)');link(id,'new',rest);}});
 TX.filter(function(t){return t.type==='settle'&&inM(t);}).forEach(function(st){node('src:paid','Paid back',0,'var(--bone)');var r=st.returns[0].ref;if(r.indexOf('budget:')===0)link('src:paid','budget',st.amt);else if(TX.some(function(t){return t.settleId===st.id;}))link('src:paid','savings',st.amt);else{node('new','New money',1,'var(--bone)');link('src:paid','new',st.amt);}});
 var cov=0;TX.forEach(function(t){if(t.type==='transfer'&&inM(t)&&t.reason==='cover')cov+=t.amt;});if(cov>0){node('src:jar','From jars',0,'var(--bone)');link('src:jar','budget',cov);}
 var spent=0;CATS.forEach(function(c){var v=spentMonth(c);node('c:'+c,c,2,catColor(c),{k:catK(c)});spent+=v;});var uns=spentMonth('Unsorted');
 var need=spent+uns-N.budget.in;if(need>0.5){node('src:earlier','Earlier money',0,'var(--bone)');link('src:earlier','budget',need);}
 CATS.forEach(function(c){link('budget','c:'+c,spentMonth(c));});if(uns>0.5){node('c:Unsorted','No category',2,'var(--uns)');link('budget','c:Unsorted',uns);}
 var left=N.budget.in-N.budget.out;if(left>0.5){node('left','Left in budget',2,'var(--text3)',{faint:1});link('budget','left',left,'left');}
 TX.filter(function(t){return t.type==='transfer'&&inM(t)&&t.reason==='save';}).forEach(function(t){t.dst.forEach(function(x){var g=goalById(x.ref.slice(5));node('g:'+g.id,g.name,2,'var(--save)',{save:1});});});
 var sdst={};TX.filter(function(t){return t.type==='transfer'&&inM(t)&&t.reason==='save';}).forEach(function(t){t.dst.forEach(function(x){sdst[x.ref]=(sdst[x.ref]||0)+x.amt;});});
 var sIn=N.savings.in,sOut=0;Object.keys(sdst).forEach(function(r){sOut+=sdst[r];});var scale=sOut?sIn/sOut:0;Object.keys(sdst).forEach(function(r){link('savings','g:'+r.slice(5),sdst[r]*scale,'save');});
 if(N['new']){node('wait','Waiting to sort',2,'var(--bone)');link('new','wait',N['new'].in);}
 var nodes=Object.keys(N).map(function(k){return N[k];}).filter(function(n){return n.in>0.5||n.out>0.5;});
 var T=Math.max.apply(null,[0,1,2].map(function(c){return nodes.filter(function(n){return n.col===c;}).reduce(function(a,n){return a+Math.max(n.in,n.out);},0);}));
 return {nodes:nodes,links:L,T:T,u:unitFor([T],24)};}
function sankeyCheck(){var sk=sankeyData(),bad=[];sk.nodes.forEach(function(n){if(n.col===1&&Math.abs(n.in-n.out)>1)bad.push(n.id+' in '+n.in+' out '+n.out);});var c0=sk.nodes.filter(function(n){return n.col===0;}).reduce(function(a,n){return a+n.out;},0),c2=sk.nodes.filter(function(n){return n.col===2;}).reduce(function(a,n){return a+n.in;},0);if(Math.abs(c0-c2)>1)bad.push('cols '+c0+' vs '+c2);return {ok:!bad.length,bad:bad,total:c0,links:sk.links.length};}
var SKN=0;
function sankeySVG(sk,o){o=o||{};var W=340,H=o.h||300,nw=12,gap=10,X=[70,158,246],id='sk'+(++SKN);
 var cols=[0,1,2].map(function(c){return sk.nodes.filter(function(n){return n.col===c;});});
 /* fold tiny right-column nodes into Other */
 var maxN=Math.max.apply(null,cols.map(function(c){return c.length;})),k=(H-(maxN-1)*gap)/sk.T;
 var small=cols[2].filter(function(n){return n.in*k<6&&!n.save;});if(small.length>1){var oth={id:'other',label:'Other',col:2,color:'var(--uns)',in:0,out:0};small.forEach(function(n){oth.in+=n.in;sk.links.forEach(function(l){if(l.t===n.id)l.t='other';});});cols[2]=cols[2].filter(function(n){return small.indexOf(n)<0;}).concat([oth]);}
 var pos={};cols.forEach(function(c,ci){var tot=c.reduce(function(a,n){return a+Math.max(n.in,n.out);},0)*k+(c.length-1)*gap,y=(H-tot)/2;c.forEach(function(n){var h=Math.max(n.in,n.out)*k;pos[n.id]={n:n,x:X[ci],y:y,h:h,oy:y,iy:y};y+=h+gap;});});
 var tpx=sk.u*k,s='<svg viewBox="-2 0 '+(W+4)+' '+H+'" class="sk" id="'+id+'" role="img" aria-label="Money flow: sources, pots and where it went, each tile '+fmt(sk.u)+'">',bands='',nodesH='';
 var order=sk.links.map(function(l,i){var a=pos[l.s],b=pos[l.t];return {l:l,a:a,b:b,i:i};}).filter(function(x){return x.a&&x.b;});
 order.forEach(function(x){var l=x.l,a=x.a,b=x.b,h=l.v*k,y0=a.oy+h/2,y1=b.iy+h/2,x0=a.x+nw,x1=b.x,mx=(x0+x1)/2;a.oy+=h;b.iy+=h;
  var grp=a.n.col===0?0:(l.cls==='save'?2:1),col=l.cls==='save'||l.t==='savings'?'var(--save)':b.n.color,delay=grp===0?300:grp===1?560:820;
  bands+='<path d="M'+x0.toFixed(1)+' '+y0.toFixed(1)+'C'+mx.toFixed(1)+' '+y0.toFixed(1)+','+mx.toFixed(1)+' '+y1.toFixed(1)+','+x1.toFixed(1)+' '+y1.toFixed(1)+'" pathLength="1" class="band g'+grp+(l.cls==='left'?' lf':'')+'" data-s="'+l.s+'" data-t="'+l.t+'" data-v="'+l.v+'" stroke="'+col+'" stroke-width="'+Math.max(1,h-1).toFixed(1)+'" style="animation-delay:'+delay+'ms" fill="none"/>'+
   '<path d="M'+x0.toFixed(1)+' '+y0.toFixed(1)+'C'+mx.toFixed(1)+' '+y0.toFixed(1)+','+mx.toFixed(1)+' '+y1.toFixed(1)+','+x1.toFixed(1)+' '+y1.toFixed(1)+'" stroke="transparent" stroke-width="'+Math.max(12,h).toFixed(1)+'" fill="none" data-a="reveal" data-v="'+esc(a.n.label)+' → '+esc(b.n.label)+' · '+fmt(l.v)+'"/>';});
 Object.keys(pos).forEach(function(kk,i){var p=pos[kk],n=p.n,v=Math.max(n.in,n.out),cls='node'+(n.save||n.id==='savings'?' sn':'')+(n.faint?' fnt':'');
  nodesH+='<g class="'+cls+'" style="animation-delay:'+(n.col*60+i*20)+'ms" data-a="skn" data-x="'+id+'|'+n.id+'" data-v="'+esc(n.label)+' · '+fmt(v)+'">';
  nodesH+='<rect x="'+p.x+'" y="'+p.y.toFixed(1)+'" width="'+nw+'" height="'+Math.max(1.5,p.h).toFixed(1)+'" rx="2.5" fill="'+(n.faint?'none':n.color)+'" stroke="'+(n.faint?'var(--text3)':'none')+'" stroke-dasharray="'+(n.faint?'3 2':'')+'"/>';
  for(var t=tpx;t<p.h-1;t+=tpx)nodesH+='<line x1="'+p.x+'" x2="'+(p.x+nw)+'" y1="'+(p.y+t).toFixed(1)+'" y2="'+(p.y+t).toFixed(1)+'" stroke="var(--surface)" stroke-width="1.2"/>';
  var lx=n.col===0?p.x-6:n.col===2?p.x+nw+6:p.x+nw/2,anc=n.col===0?'end':n.col===2?'start':'middle',last1=n.col===1&&cols[1][cols[1].length-1]===n&&cols[1].length>1,ly=n.col===1?(last1?p.y+p.h+13:p.y-5):p.y+Math.min(p.h/2,p.h)+4;
  nodesH+='<text x="'+lx+'" y="'+ly.toFixed(1)+'" text-anchor="'+anc+'" font-size="11" fill="'+(n.faint?'var(--text3)':'var(--text)')+'">'+esc(n.label)+'</text>';
  nodesH+='<rect x="'+(n.col===0?0:p.x-4)+'" y="'+(p.y-4).toFixed(1)+'" width="'+(n.col===0?p.x+nw+4:n.col===2?W-p.x+4:nw+8)+'" height="'+(Math.max(p.h,10)+8).toFixed(1)+'" fill="transparent"/></g>';});
 return s+'<g class="bands">'+bands+'</g>'+nodesH+'</svg>';}
A.skn=function(x,el){var p=x.split('|'),svg=document.getElementById(p[0]);if(!svg)return;var on=svg.getAttribute('data-hl')===p[1];svg.setAttribute('data-hl',on?'':p[1]);svg.classList.toggle('hl',!on);
 svg.querySelectorAll('.band').forEach(function(b){b.classList.toggle('on',!on&&(b.getAttribute('data-s')===p[1]||b.getAttribute('data-t')===p[1]));});if(!on)A.reveal(null,el);play('tap');};

/* ===== Trickle v8 — app ===== */
var DEF_ORDER=['flow','where','rbsum','rbrep','range','vs','tod','saved','goal','month','rbfreq','rbtrend','sizes','mbm','rate','week','top','subs','owed','eta'];
var S={onb:1,od:{track:null,period:'month',budget:6000,cats:['Food','Travel','Fun','Essentials'],goal:'Goa trip'},tab:'home',open:'savings',sheet:null,drawer:false,reduced:false,look:'color',
 order:DEF_ORDER.slice(),pins:['goal','month','rbsum'],hidden:DEF_ORDER.slice(8),done:{},checkinDone:false,rules:{},fresh:false,lastIncome:null,anim:true};
try{var sv=JSON.parse(localStorage.getItem('trickle9')||'null');if(sv&&sv.order&&sv.order.length===DEF_ORDER.length){S.order=sv.order;S.pins=sv.pins;S.hidden=sv.hidden;}if(sv&&sv.look)S.look=sv.look;if(sv&&sv.rn)REPEAT_N=sv.rn;}catch(e){}
function persist(){try{localStorage.setItem('trickle9',JSON.stringify({order:S.order,pins:S.pins,hidden:S.hidden,look:S.look,rn:REPEAT_N}));}catch(e){}}
var $=function(s){return document.querySelector(s);};

function render(){
 var app=$('#app');document.documentElement.setAttribute('data-look',S.look);app.classList.toggle('rm',S.reduced);app.classList.toggle('noanim',!S.anim);var k=(S.sheet?S.sheet.k:'')+'|'+S.drawer;app.classList.toggle('still',k===S._lastOv);S._lastOv=k;
 if(S.onb){app.innerHTML='<div class="viewport" id="vp">'+onbScreen()+'</div>'+ovHTML();afterRender();return;}
 var body={home:homeScr,money:moneyScr,actions:actionsScr,insights:insightsScr}[S.tab]();
 var nAct=actionItems().length;
 app.innerHTML='<div class="viewport" id="vp"><div class="scr" data-screen="'+S.tab+'">'+body+'</div></div>'+
  '<nav class="tabs" aria-label="Main">'+[['home','Home','home'],['money','Money','money'],['actions','Actions','inbox'],['insights','Insights','grid']].map(function(t){return '<button data-a="tab" data-x="'+t[0]+'"'+(S.tab===t[0]?' aria-current="page"':'')+'>'+ic(t[2])+t[1]+(t[0]==='actions'&&nAct?'<span class="dot" aria-label="has items"></span>':'')+'</button>';}).join('')+'</nav>'+ovHTML();
 afterRender();}
function ovHTML(){var h='';if(S.sheet)h+=SHEETS[S.sheet.k]();if(S.drawer)h+='<div class="scrim" data-a="drawer" data-x="0"></div>'+drawerHTML();if(S.toast)h+='<div class="toast" role="status"><span class="t">'+S.toast.t+'</span>'+(S.toast.undo?'<button class="link" data-a="'+S.toast.undo+'">Undo</button>':'')+'</div>';return h;}
function afterRender(){var app=$('#app');if(S.anim){var n=app.querySelectorAll('.viewport .tg i.f, .sheet .tg i.f, .story .tg i.f').length;if(n&&!S.onb)tileTicks(Math.ceil(n/10));countUps(app);if(app.querySelector('.sk')&&(!S.sheet||S._flow))skSound();if(S._pour)play('pour',450);if(S._chime)play('save',500);}S._pour=S._chime=S._flow=0;S.anim=true;glowShift();if(S.after){var f=S.after;S.after=null;requestAnimationFrame(function(){requestAnimationFrame(f);});}checkInvariant(S.tab+(S.sheet?':'+S.sheet.k:''));}
function toast(t,undo,ms){S.toast={t:t,undo:undo};clearTimeout(S._tt);S._tt=setTimeout(function(){S.toast=null;render();},ms||4200);}
var STILL=['reveal','wpin','wmove','whide','wshow','wset','wlib','look','snd','rm','sweep','fp','period','bud','rn','txf','catset2','sppick','key','quick','skn','open','remind','obb','obc'];
document.addEventListener('click',function(e){var el=e.target.closest('[data-a]');if(!el)return;var k=el.getAttribute('data-a'),f=A[k];if(f){e.preventDefault();if(STILL.indexOf(k)>=0)S.anim=false;if(el.classList.contains('btn')||el.classList.contains('opt'))play('tap');else if(el.classList.contains('chip')||el.closest('.seg'))play('toggle');f(el.getAttribute('data-x'),el);}});
document.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target.matches('[role=button][data-a]')){e.preventDefault();e.target.click();}});
function glowShift(){var g=$('#glow');if(!g)return;var nc=g.style.getPropertyValue('--gc');if(S._gc&&S._gc!==nc&&!isReduced()){g.style.setProperty('--gc',S._gc);requestAnimationFrame(function(){requestAnimationFrame(function(){g.style.setProperty('--gc',nc);});});}S._gc=nc;}
var _skT;function skSound(){clearTimeout(_skT);play('flow',300);_skT=setTimeout(function(){play('save');},isReduced()?0:1200);}
A.tab=function(x){S.tab=x;S.sheet=null;S.edit=false;render();$('#vp').scrollTop=0;};
A.drawer=function(x){S.drawer=x==='1';render();};
A.close=function(){S.sheet=null;render();};
A.reveal=function(x,el){var v=el.getAttribute('data-v');if(!v)return;play('tap');var wc=el.closest('.wc,.skcard'),tip=wc&&wc.querySelector('.wtip');if(tip){tip.innerHTML='<span class="tagv">'+esc(v)+'</span>';clearTimeout(tip._t);tip._t=setTimeout(function(){tip.innerHTML='';},3000);return;}var old=el.parentNode.querySelector('.tagv');if(old){old.remove();return;}var t=document.createElement('span');t.className='tagv';t.textContent=v;el.insertAdjacentElement('afterend',t);setTimeout(function(){t.remove();},3000);};
A.open=function(x){S.open=S.open===x?null:x;var accs=document.querySelectorAll('.acc');accs.forEach(function(a){a.setAttribute('data-open',a.getAttribute('data-id')===S.open?'1':'0');a.querySelector('button').setAttribute('aria-expanded',a.getAttribute('data-id')===S.open);});};
function sheet(k,d){S.sheet=Object.assign({k:k},d||{});render();}

/* ================= HOME ================= */
function homeScr(){
 var pc=pace(),recent=TX.filter(function(t){return t.type==='spend'&&t.ts<=NOW;}).slice(-3).reverse();
 var h=glowHTML()+
 '<div class="top"><button class="avatar" data-a="drawer" data-x="1" aria-label="Open settings">T</button><div style="flex:1"><div class="hello">'+greet()+', Tarun</div></div>'+paceChip()+'</div>'+
 '<div style="padding:34px 0 6px"><h1>'+(pc.state==='ok'?'You’re moving at a calm pace this '+periodWord()+'.':'This '+periodWord()+' is moving a little fast.')+'</h1><p class="muted" style="margin-top:8px">'+(pc.state==='ok'?'Nothing needs you right now.':'Small spends slow it down fastest.')+'</p></div>'+
 (TRACK==='manual'?'<div class="row2"><button class="btn" data-a="pay" data-x="log">'+ic('plus')+'Add a spend</button><button class="btn sec" data-a="pay" data-x="upi">'+ic('scan')+'Pay</button></div>':'<div class="row2"><button class="btn" data-a="pay" data-x="upi">'+ic('scan')+'Pay</button><button class="btn sec" data-a="pay" data-x="log">'+ic('cash')+'Log cash</button></div>')+
 '<section class="card" aria-label="Recent spends"><div class="hd"><span class="lbl">Recent</span><span class="tkey sz">'+sizeDots(3)+' more dots, bigger spend</span><button class="link" data-a="txlist">All spends</button></div><div>'+recent.map(txRowTiles).join('')+'</div></section>'+
 subsCard()+
 '<div class="board" aria-label="Pinned">'+S.pins.map(function(w){return widget(w,'home');}).join('')+addTile()+'</div>';
 return h;}
function greet(){var h=new Date(NOW).getHours();return h<12?'Good morning':h<17?'Good afternoon':'Good evening';}
function sizeN(a){return a<=50?1:a<=100?2:a<=250?3:a<=500?4:5;}
function sizeDots(n,c){var h='<span class="szd">';for(var i=0;i<5;i++)h+='<i'+(i<n?' style="background:'+(c||'var(--text2)')+'"':'')+'></i>';return h+'</span>';}
function txRowTiles(t){var n=sizeN(t.amt),c=catColor(t.cat);
 return '<button class="tx" data-a="txd" data-x="'+t.id+'"><span class="ico" style="color:'+c+'">'+ic(catIc(t.cat),20)+'</span><span class="m"><b>'+esc(t.merchant)+'</b><small>'+(t.cat==='Unsorted'?'Needs a category':t.cat)+' · '+relWord(t.ts)+'</small></span>'+sizeDots(n,c)+'</button>';}
function subsCard(){var nx=nextSub();if(!nx)return '';var n=SUBS.length;
 return '<button class="card tap" data-a="subs" style="flex-direction:row;align-items:center;gap:12px">'+subRing(36,14,1.6)+'<span style="flex:1"><b>'+nx.s.name+'</b> renews '+nx.when+'</span>'+ic('bell',18)+'</button>';}
function nextSub(){var best=null;SUBS.forEach(function(s){var d=new Date(NOW),due=new Date(d.getFullYear(),d.getMonth(),s.day,9).getTime();if(due<NOW-DAY/2)due=new Date(d.getFullYear(),d.getMonth()+1,s.day,9).getTime();if(!best||due<best.due)best={s:s,due:due};});if(!best)return null;var days=Math.round((best.due-new Date(NOW).setHours(0,0,0,0))/DAY);best.when=days<=0?'today':days===1?'tomorrow':days<7?'on '+DOWS[new Date(best.due).getDay()]:'later this month';return best;}

function legend(cs){return '<div class="lgd">'+cs.map(function(c){return '<span><span class="cdot '+catK(c)+'" style="background:'+catColor(c)+'"></span>'+c+'</span>';}).join('')+'</div>';}
function savedIn(m){var s=0;TX.forEach(function(t){if(t.type==='transfer'&&new Date(t.ts).getMonth()===m&&(t.reason==='save'||t.reason==='sweep'))s+=t.amt;});return s;}
A.wpin=function(w){var i=S.pins.indexOf(w);if(i>=0)S.pins.splice(i,1);else S.pins.push(w);persist();S.sheet=null;toast(i>=0?WIDGETS[w]+' removed from Home':WIDGETS[w]+' pinned to Home');render();};
A.whide=function(w){if(S.hidden.indexOf(w)<0)S.hidden.push(w);persist();S.sheet=null;render();};
A.wshow=function(w){S.hidden.splice(S.hidden.indexOf(w),1);var i=S.order.indexOf(w);S.order.splice(i,1);var firstHidden=S.order.filter(function(x){return S.hidden.indexOf(x)<0;}).length;S.order.splice(firstHidden,0,w);persist();S.sheet=null;toast(WIDGETS[w]+' added to Insights');render();};
A.wmove=function(x){var p=x.split(':'),vis=S.order.filter(function(w){return S.hidden.indexOf(w)<0;}),i=vis.indexOf(p[0]),j=i+(+p[1]);if(i<0||j<0||j>=vis.length)return;var a=S.order.indexOf(vis[i]),b=S.order.indexOf(vis[j]);S.order[a]=vis[j];S.order[b]=vis[i];persist();render();};
A.wset=function(w){sheet('wset',{w:w});};
A.wlib=function(){sheet('wlib',{});};
SHEETS.wset=function(){var w=S.sheet.w,pinned=S.pins.indexOf(w)>=0,onBoard=S.hidden.indexOf(w)<0;
 return sheetWrap(shHead(WIDGETS[w]),'<div class="wprev">'+widget(w,'board')+'</div>'+
 '<button class="opt" data-a="wpin" data-x="'+w+'">'+ic('pin')+'<span class="t"><b>'+(pinned?'Unpin from Home':'Pin to Home')+'</b></span></button>'+
 (onBoard?'<div class="row2" style="grid-template-columns:1fr 1fr"><button class="btn sec" data-a="wmove" data-x="'+w+':-1">'+ic('up',18)+'Move earlier</button><button class="btn sec" data-a="wmove" data-x="'+w+':1">'+ic('down',18)+'Move later</button></div><button class="opt" data-a="whide" data-x="'+w+'">'+ic('eye')+'<span class="t"><b>Hide from Insights</b><small>It stays in Add widget</small></span></button>':'<button class="opt" data-a="wshow" data-x="'+w+'">'+ic('plus')+'<span class="t"><b>Add to Insights</b></span></button>')+
 '<div class="set" style="cursor:default"><span class="t">Look<small>Colour or black and white, for every card</small></span><div class="seg"><button data-a="look" data-x="color" aria-pressed="'+(S.look==='color')+'">Colour</button><button data-a="look" data-x="bw" aria-pressed="'+(S.look==='bw')+'">B&amp;W</button></div></div>','<button class="btn" data-a="close">Done</button>','data-sheet="wset"');};
SHEETS.wlib=function(){var h=S.hidden.filter(function(w){return true;});return sheetWrap(shHead('Add widget'),'<p class="muted">Tap one to add it to Insights. Pin it to Home from its settings.</p>'+(h.length?h.map(function(w){return '<button class="opt" data-a="wshow" data-x="'+w+'"><span class="wsz">'+WSIZE[w]+'</span><span class="t"><b>'+WIDGETS[w]+'</b></span>'+ic('plus',18)+'</button>';}).join(''):'<p class="muted">Every widget is already on your board.</p>'),'','data-sheet="wlib"');};
A.look=function(x){S.look=x;persist();render();};
/* ================= INSIGHTS ================= */
function insightsScr(){var vis=S.order.filter(function(w){return S.hidden.indexOf(w)<0;});
 return '<div class="top"><button class="avatar" data-a="drawer" data-x="1" aria-label="Open settings">T</button><h2 style="flex:1">Insights</h2><button class="iconbtn" data-a="wlib" aria-label="Add widget">'+ic('addw',20)+'</button></div><p class="muted">Tap tiles for the amount. Settings on each card pin it to Home.</p>'+
  '<div class="board">'+vis.map(function(w){return widget(w,'board');}).join('')+addTile()+'</div>'+
  '<button class="btn sec" data-a="story">'+ic('cal')+'See '+thisPeriodName()+'’s story</button>';}

/* ================= MONEY ================= */
function moneyScr(){var p=POOLS(),g=topGoal();
 var inc=TX.filter(function(t){return t.type==='income';}),last=inc[inc.length-1];
 var h='<div class="top"><button class="avatar" data-a="drawer" data-x="1" aria-label="Open settings">T</button><h2 style="flex:1">Money</h2></div>'+
 '<section class="card"><span class="lbl">In your account</span><div style="display:flex;align-items:baseline;gap:10px;flex-wrap:wrap"><span style="font-family:var(--display);font-size:34px" data-testid="balance">'+fmt(p.balance)+'</span></div><p class="muted" style="font-size:13px">Budget, jars and any new money together. Money friends owe you joins once they pay.</p></section>';
 if(p.nm>0.5){var nu=unitFor([p.nm],12);h+='<section class="card" style="border-color:var(--accent)"><div class="hd"><span><b>New money</b> is waiting</span>'+tg(tiles(p.nm,nu,{c:'var(--bone)'}),6,12,3)+'</div>'+tkey(ukey(nu))+'<button class="btn sm" data-a="sortnew">Sort it: budget first, rest to '+esc(g.name)+'</button></section>';}
 h+=acc('income','Income',last?esc(last.merchant)+' landed '+(relDay(last.ts)==='Today'?'today':'this '+periodWord()):'Nothing yet',tg(rep(3,{c:'var(--bone)'}),3,10,3),incomeBody(last))+
  acc('budget','Budget',paceWordLong(),tg(CATS.map(function(c){return {c:catColor(c)};}),4,10,3),budgetBody(p))+
  acc('savings','Savings',esc(g.name)+' is '+goalWords(g),tg(rep(3,{c:'var(--save)'}),3,10,3),savingsBody(p));
 return h;}
function paceWordLong(){return pace().state==='ok'?'On pace for '+thisPeriodName():'A bit fast this '+periodWord();}
function acc(id,t,sub,glyph,body){var o=S.open===id;return '<section class="acc" data-id="'+id+'" data-open="'+(o?1:0)+'"><button data-a="open" data-x="'+id+'" aria-expanded="'+o+'">'+glyph+'<span class="t"><b>'+t+'</b><small>'+sub+'</small></span><span class="chev">'+ic('chev')+'</span></button><div class="body"><div><div class="inner">'+body+'</div></div></div></section>';}
function incomeBody(last){var h='';if(last&&!TX.some(function(t){return t.incomeId===last.id;}))h+='<p class="muted">'+esc(last.merchant)+' is not sorted yet. It waits as new money above.</p>';
 var sk=sankeyData();h+='<div class="skcard"><span class="lbl">Where '+MONL[curM()]+'’s money went</span>'+sankeySVG(sk,{h:260})+'<div class="wf">'+tkey(ukey(sk.u)+' · band width = ₹','g2')+'<span class="wtip" aria-live="polite"></span></div></div>';
 h+='<div>'+TX.filter(function(t){return t.type==='income'||t.type==='settle';}).slice(-3).reverse().map(function(t){return '<button class="tx" data-a="txd" data-x="'+t.id+'"><span class="ico" style="color:var(--save)">'+ic('plus',18)+'</span><span class="m"><b>'+esc(t.merchant)+'</b><small>'+relDay(t.ts)+'</small></span><span class="amt in">+'+fmt(t.amt)+'</span></button>';}).join('')+'</div><button class="btn sec" data-a="addincome">'+ic('plus')+'Add income</button>';return h;}
function budgetBody(p){var h='',u=budgetUnit(p);CATS.forEach(function(c){var cs=catSpecs(c,p,u),st=cs.left<0?'<span class="pill warm">'+ic('spark',14)+'Over, '+nextPeriodWord()+' starts lighter</span>':'';
  h+='<div><div class="hd"><span style="display:flex;align-items:center;gap:8px"><span class="cdot '+catK(c)+'" style="background:'+catColor(c)+'"></span><b>'+c+'</b></span>'+st+'</div>'+tg(cs.specs.concat(rep(cs.over,{cls:'ov'})),12,15,4,{attr:'data-a="reveal" data-v="'+(cs.left>=0?fmt(cs.left)+' left':fmt(-cs.left)+' over')+'"'})+'</div>';});
 if((p.b.Unsorted||0)<-.5)h+='<p class="muted" style="font-size:13px">One spend still needs a category. It’s in Actions.</p>';
 return h+'<div class="wf">'+tkey(ukey(u))+'<span class="faint" style="font-size:12px">Tap a row for what’s left</span></div><button class="btn sec" data-a="move">'+ic('move')+'Move between categories</button>';}
function savingsBody(p){var h='';GOALS.filter(function(g){return !g.general&&!g.reachedTs;}).forEach(function(g){h+='<button class="card tap" data-a="goal" data-x="'+g.id+'" style="flex-direction:row;align-items:center;gap:14px">'+waffle(g,7,{noReveal:1})+'<span style="flex:1"><b>'+esc(g.name)+'</b><br><span class="muted" style="font-size:13px">'+goalWords(g)+'</span><br>'+tkey('1 tile = 1%','sv')+'</span></button>';});
 var gen=goalById('general'),gv=p.g.general||0,gu=unitFor([gv],30);h+='<div><div class="hd"><b>Rainy-day jar</b>'+tkey(ukey(gu),'sv')+'</div>'+tg(tiles(gv,gu,{c:'var(--save)'}),10,12,3,{attr:'data-a="reveal" data-v="'+fmt(gv)+'"'})+'</div>';
 h+='<div class="board">'+widget('rate','board')+widget('saved','board').replace('wc W','wc W')+'</div>';
 h+='<div class="board">'+widget('owed','board')+'</div>';
 var done=GOALS.filter(function(g){return g.reachedTs;});if(done.length)h+='<p class="muted" style="font-size:13px">'+ic('check',16)+' Reached: '+done.map(function(g){return esc(g.name);}).join(', ')+'</p>';
 h+='<div class="hd"><span><b>Leftover at '+periodWord()+' end</b><br><span class="muted" style="font-size:12.5px">'+(SWEEP==='auto'?'Goes to '+esc(topGoal().name)+' by itself':'We ask you first')+'</span></span><div class="seg" role="group" aria-label="Leftover"><button data-a="sweep" data-x="auto" aria-pressed="'+(SWEEP==='auto')+'">Auto</button><button data-a="sweep" data-x="manual" aria-pressed="'+(SWEEP==='manual')+'">Ask me</button></div></div>';
 return h+'<button class="btn sec" data-a="goalnew">'+ic('plus')+'New goal</button>';}
A.sweep=function(x){SWEEP=x;render();};
A.remind=function(){var o=IOUS.filter(function(i){return !i.settledTs;});var msg='Hey! Your share for Pizza Hut is ₹300. UPI: '+UPI_IDS[0];try{navigator.clipboard.writeText(msg).catch(function(){});}catch(e){}toast('Reminder copied for '+o.map(function(i){return i.person;}).join(', ')+'. Paste it in your chat.');render();};
A.sortnew=function(){var p=POOLS();var inc={id:nid('x'),ts:NOW,amt:Math.round(p.nm)};var r=autoSplitFromNM(inc.amt);S.lastIncome=null;toast(fmt(r.save)+' went to '+esc(r.goal.name));S.tab='money';S.open='savings';render();};
function autoSplitFromNM(amt){var fake={id:'nm'+(++SEQ),ts:NOW,amt:amt};return autoSplit(fake);}

/* ================= ACTIONS ================= */
function actionItems(){var it=[],o=IOUS.filter(function(i){return !i.settledTs;});
 if(o.length)it.push('split');
 var un=TX.filter(function(t){return t.type==='spend'&&t.cat==='Unsorted';});if(un.length)it.push('cat');
 var ns=nextSub();if(ns&&!S.done['sub'+ns.s.id+new Date(NOW).getMonth()]&&(ns.due-NOW)<4*DAY)it.push('sub');
 if(new Date(NOW).getDay()===1&&!S.checkinDone)it.push('checkin');
 if(S.pendingLeft)it.push('left');
 return it;}
function actionsScr(){var it=actionItems();
 var h='<div class="top"><button class="avatar" data-a="drawer" data-x="1" aria-label="Open settings">T</button><h2 style="flex:1">Actions</h2></div>';
 if(!it.length)return h+'<div class="moment" style="padding-top:60px">'+tg(rep(9,{c:'var(--calm)'}),3,22,6,{center:1})+'<p class="big">Nothing needs you.</p><p class="muted">New things land here, one at a time.</p><button class="btn sec" data-a="tab" data-x="home">Back to Home</button></div>';
 h+='<p class="muted">'+(it.length===1?'One small thing.':'A few small things. Each one is a tap.')+'</p><div class="inbox">';
 it.forEach(function(k){h+=AITEM[k]();});return h+'</div><button class="btn sec" data-a="logspend">'+ic('cash')+'Log a cash spend</button>';}
var AITEM={
 split:function(){var o=IOUS.filter(function(i){return !i.settledTs;}),sp=txById(o[0].spendId);return '<section class="card" data-item="split"><div class="hd"><span style="display:flex;gap:10px;align-items:center">'+ic('users')+'<b>'+esc(sp?sp.merchant:'Split')+' split</b></span>'+tg(rep(o.length,{cls:'ol'}),o.length,12,3,{attr:'data-a="reveal" data-v="'+fmt(owedOpen())+' owed"'})+'</div>'+tkey('1 tile = 1 friend','ol')+'<p class="muted">'+o.map(function(i){return i.person;}).join(', ').replace(/, ([^,]*)$/,' and $1')+' still owe you their share.</p><button class="btn sm" data-a="settle" style="width:100%">Someone paid back</button><div class="more"><button class="link" data-a="remind">Remind share</button></div></section>';},
 cat:function(){var t=TX.filter(function(t){return t.type==='spend'&&t.cat==='Unsorted';})[0];var sug=t.auto||'Food';return '<section class="card" data-item="cat"><div class="hd"><span style="display:flex;gap:10px;align-items:center">'+ic('sort')+'<b>'+esc(t.merchant)+'</b></span><span class="faint" style="font-size:12.5px">'+relDay(t.ts)+'</span></div><p class="muted">Looks like '+sug+'. We’ll remember this payee.</p><button class="btn sm" data-a="catset" data-x="'+t.id+':'+sug+'" style="width:100%">Yes, '+sug+'</button><div class="more">'+CATS.filter(function(c){return c!==sug;}).map(function(c){return '<button class="chip" data-a="catset" data-x="'+t.id+':'+c+'"><span class="cdot" style="background:'+catColor(c)+'"></span>'+c+'</button>';}).join('')+'</div></section>';},
 sub:function(){var ns=nextSub();return '<section class="card" data-item="sub"><div class="hd"><span style="display:flex;gap:10px;align-items:center">'+ic('music')+'<b>'+ns.s.name+' renews '+ns.when+'</b></span></div><p class="muted">It comes out of '+ns.s.cat+'. Fun still has room for it.</p><button class="btn sm" data-a="subkeep" data-x="'+ns.s.id+'" style="width:100%">Keep it</button><div class="more"><button class="link" data-a="subdrop" data-x="'+ns.s.id+'">I’ll cancel it</button></div></section>';},
 checkin:function(){return '<section class="card" data-item="checkin"><div class="hd"><span style="display:flex;gap:10px;align-items:center">'+ic('cal')+'<b>Your Monday check-in</b></span>'+'</div><p class="muted">Four cards about last week, repeat buys included. Under a minute.</p><button class="btn sm" data-a="checkin" style="width:100%">Open check-in</button></section>';},
 left:function(){var a=S.pendingLeft;return '<section class="card" data-item="left"><div class="hd"><span style="display:flex;gap:10px;align-items:center">'+ic('jar')+'<b>Leftover from '+a.name+'</b></span>'+tg(tiles(a.amt,unitFor([a.amt],20),{c:'var(--save)'}),8,10,3)+'</div>'+tkey(ukey(unitFor([a.amt],20)),'sv')+'<p class="muted">It’s sitting as new money.</p><button class="btn sm" data-a="leftsave" style="width:100%">Save it to '+esc(topGoal().name)+'</button><div class="more"><button class="link" data-a="leftkeep">Keep for spending</button></div></section>';}};
A.catset=function(x){var p=x.split(':'),t=txById(p[0]);t.cat=p[1];S.rules[t.merchant]=p[1];toast(esc(t.merchant)+' is now '+p[1]+'. Next time it’s automatic.');render();};
A.subkeep=function(id){S.done['sub'+id+new Date(NOW).getMonth()]=1;toast('Kept. It comes out of '+SUBS.filter(function(s){return s.id===id;})[0].cat+' as usual.');render();};
A.subdrop=function(id){var s=SUBS.filter(function(x){return x.id===id;})[0];SUBS=SUBS.filter(function(x){return x.id!==id;});S.done['sub'+id+new Date(NOW).getMonth()]=1;toast(s.name+' removed from your subscriptions. Cancel it in the app too.');render();};
A.leftsave=function(){var a=S.pendingLeft,g=topGoal();xfer(NOW,[{ref:'new_money',amt:a.amt}],saveDst(a.amt),'sweep',{period:a.name});S.pendingLeft=null;toast(fmt(a.amt)+' went to '+esc(g.name));render();};
A.leftkeep=function(){S.pendingLeft=null;toast('Kept as new money. Sort it any time in Money.');render();};
A.subs=function(){sheet('subs');};

/* ===== Trickle v8 — sheets & flows ===== */
function shHead(title,steps,cur,back){var st='';if(steps){st='<div class="steps" aria-label="Step '+(cur+1)+' of '+steps+'">';for(var i=0;i<steps;i++)st+='<i class="'+(i<=cur?'on':'')+'"></i>';st+='</div>';}
 return '<div class="sh">'+(back?'<button class="iconbtn" data-a="'+back+'" aria-label="Back">'+ic('back')+'</button>':'')+(st||'<b style="flex:1;padding-left:6px">'+(title||'')+'</b>')+'<button class="iconbtn" data-a="close" aria-label="Close">'+ic('close')+'</button></div>';}
function sheetWrap(head,body,foot,attr){return '<div class="sheet" role="dialog" aria-modal="true" '+(attr||'')+'>'+head+'<div class="sb">'+body+'</div>'+(foot?'<div class="sf">'+foot+'</div>':'')+'</div>';}

/* ---------- PAY / LOG ---------- */
var PAYEES=[['Chai Tapri','Food','chaitapri@ybl'],['BookMyShow','Fun','bookmyshow@icici'],['Rapido','Travel','rapido@axl'],['Medical store','Essentials','medplus@paytm']];
A.pay=function(mode){S.drawer=false;sheet('pay',{mode:mode,step:mode==='log'?'amt':'who',amt:'',payee:null,cat:null});};
A.logspend=function(){A.pay('log');};
A.payee=function(i){var s=S.sheet;if(i==='scan'){s.payee={n:'Chai Tapri',c:'Food',id:'chaitapri@ybl',scanned:1};}else{var p=PAYEES[+i];s.payee={n:p[0],c:p[1],id:p[2]};}s.step='amt';render();};
A.key=function(k){var s=S.sheet;if(k==='del')s.amt=s.amt.slice(0,-1);else if(s.amt.length<6&&!(s.amt===''&&k==='0'))s.amt+=k;render();};
A.quick=function(v){S.sheet.amt=v;render();};
A.pstep=function(st){var s=S.sheet;if(st==='cat'&&!(+s.amt>0))return;s.step=st;if(st==='tiles')S.after=runPop;render();};
A.pcat=function(c){S.sheet.cat=c;S.sheet.step='tiles';S.after=runPop;render();};
A.pback=function(){var s=S.sheet,o=s.mode==='log'?['amt','cat','tiles']:['who','amt','cat','tiles','upi'];var i=o.indexOf(s.step);if(i<=0){A.close();return;}s.step=o[i-1];s.cover=null;render();};
function runPop(){var st=document.querySelector('.paystage');if(st)st.classList.add('go');if(S._soft){S._soft=0;play('soft',500);}var ov=document.querySelectorAll('.paystage i.ov');ov.forEach(function(t,i){t.style.animationDelay=(700+i*60)+'ms';t.classList.add('pop');});}
function coverOptions(s){var p=POOLS(),left=Math.max(0,Math.round(p.b[s.cat]||0)),over=+s.amt-left,opts=[];
 opts.push({k:'next',t:'Take it from '+nextPeriodWord(),d:nextPeriodWord()+' starts a little lighter'});
 var rich=CATS.filter(function(c){return c!==s.cat&&(p.b[c]||0)-over>=200;}).sort(function(a,b){return (p.b[b]||0)-(p.b[a]||0);})[0];
 if(rich)opts.push({k:'cat:'+rich,t:'Take it from '+rich,d:rich+' has room to spare'});
 var gen=p.g.general||0;if(gen>=over)opts.push({k:'goal:general',t:'Take it from Rainy-day jar',d:'Your '+esc(topGoal().name)+' jar stays as it is'});
 else opts.push({k:'goal:'+topGoal().id,t:'Take it from '+esc(topGoal().name),d:'It moves a little further away'});
 return {opts:opts,over:over,left:left};}
SHEETS.pay=function(){var s=S.sheet,log=s.mode==='log',steps=log?3:5,order=log?['amt','cat','tiles']:['who','amt','cat','tiles','upi'],idx=order.indexOf(s.step),head=shHead('',s.step==='done'?0:steps,idx,s.step==='done'?null:'pback'),b='',f='';
 if(s.step==='who'){b='<h2>Pay whom?</h2><button class="opt def" data-a="payee" data-x="scan">'+ic('scan')+'<span class="t"><b>Scan a QR code</b><small>Camera opens in your UPI app</small></span></button><span class="lbl">Recent</span>'+PAYEES.map(function(p,i){return '<button class="opt" data-a="payee" data-x="'+i+'"><span class="ico" style="color:'+catColor(p[1])+'">'+ic(catIc(p[1]),20)+'</span><span class="t"><b>'+p[0]+'</b><small>'+p[2]+'</small></span></button>';}).join('');}
 if(s.step==='amt'){b='<h2>'+(log?'How much did you spend?':'How much to '+esc(s.payee.n)+'?')+'</h2><div class="amt-big" aria-live="polite">₹'+(s.amt||'0')+'</div><div class="chips" style="justify-content:center">'+['50','180','600'].map(function(v){return '<button class="chip" data-a="quick" data-x="'+v+'">₹'+v+'</button>';}).join('')+'</div><div class="keys">'+['1','2','3','4','5','6','7','8','9','','0','del'].map(function(k){return k?'<button data-a="key" data-x="'+k+'" aria-label="'+(k==='del'?'Delete':k)+'">'+(k==='del'?'⌫':k)+'</button>':'<span></span>';}).join('')+'</div>';
  f='<button class="btn" data-a="pstep" data-x="cat"'+(+s.amt>0?'':' disabled style="opacity:.4"')+'>Next</button>';}
 if(s.step==='cat'){var sug=s.payee?(S.rules[s.payee.n]||s.payee.c):'Food';b='<h2>What’s it for?</h2><p class="muted">'+(s.payee?'We guessed from '+esc(s.payee.n)+'.':'Pick one. We’ll learn your usual ones.')+'</p><div style="display:flex;flex-direction:column;gap:8px">'+[sug].concat(CATS.filter(function(c){return c!==sug;})).map(function(c,i){var cs=catSpecs(c);return '<button class="opt'+(i===0?' def':'')+'" data-a="pcat" data-x="'+c+'"><span class="ico" style="color:'+catColor(c)+'">'+ic(catIc(c),20)+'</span><span class="t"><b>'+c+'</b><small>'+(i===0?'Suggested':'&nbsp;')+'</small></span>'+tg(cs.specs.slice(0,24),12,7,2)+'</button>';}).join('')+'</div>';}
 if(s.step==='tiles'){var p=POOLS(),c=s.cat,amt=+s.amt,left=Math.max(0,Math.round(p.b[c]||0)),over=Math.max(0,amt-left),u=unitFor([left,over],30);
  var sp=tiles(left,u,ct(c)),take=Math.min(sp.length,tcount(Math.min(amt,left),u)),overN=tcount(over,u);
  for(var i=0;i<take;i++){var j=sp.length-1-i;sp[j].cls=(sp[j].cls||'')+' ch';sp[j].d=Math.min(600,i*60);}
  sp=sp.concat(rep(overN,{cls:'ov'}));var nT=Math.max(sp.length,1),cols=colsFor(Math.max(nT,10));
  var rpt=s.payee?weekCount(s.payee.n):0;
  b='<h2>'+(log?'':'Paying '+esc(s.payee.n)+' ')+fmt(amt)+'</h2><div class="stage paystage" aria-live="polite">'+(sp.length?tg(sp,cols,Math.min(30,Math.max(16,Math.floor(270/cols)-6)),6,{center:1,attr:'aria-label="'+c+' left, each tile '+fmt(u)+'"'}):'<p class="muted">'+c+' is empty</p>')+'<p class="muted" style="text-align:center"><span class="cdot '+catK(c)+'" style="background:'+catColor(c)+'"></span> '+c+' left · '+ukey(u)+'</p></div>'+
   (rpt>=2?'<p class="rptline" data-testid="repeat">'+ordinal(rpt+1)+' time at '+esc(s.payee.n)+' this week</p>':'');
  if(!overN){b+='<p style="font-size:17px;font-weight:600">'+ic('check',18)+' '+c+' can cover this.</p>';f='<button class="btn" data-a="'+(log?'pdone':'pstep')+'" data-x="upi">'+(log?'Save spend':'Pay '+fmt(amt))+'</button>';}
  else{var co=coverOptions(s);S._soft=1;b+='<p style="font-size:17px;font-weight:600;color:var(--warm)">'+ic('spark',18)+' '+c+' can cover '+(co.left>0?fmt(co.left)+' of this':'none of this')+'.</p><p class="muted">Where should the rest come from?</p><div style="display:flex;flex-direction:column;gap:8px" data-testid="cover">'+co.opts.map(function(o,i){return '<button class="opt'+(i===0?' def':'')+'" data-a="pcover" data-x="'+o.k+'"><span class="t"><b>'+o.t+'</b><small>'+o.d+'</small></span>'+ic('next',18)+'</button>';}).join('')+'</div>';}}
 if(s.step==='upi'){b='<div class="moment" style="padding-top:40px">'+ic('scan',44)+'<p class="big">Finish in your UPI app</p><p class="muted">'+esc(s.payee.n)+' · '+esc(s.payee.id)+'<br>From '+(UPI_IDS[0]||'your UPI ID')+'</p></div>';f='<button class="btn" data-a="pdone">I’ve paid</button><button class="btn ghost" data-a="pback">Go back</button>';}
 if(s.step==='done'){var g=topGoal(),fromG=s.cover&&s.cover.indexOf('goal:'+g.id)===0;b='<div class="moment" style="padding-top:18px">'+waffle(g,14)+'<p class="big">'+(fromG?esc(g.name)+' gave a little. It’s still '+goalWords(g)+'.':s.cover==='goal:general'?'Rainy-day jar covered it. '+esc(g.name)+' is still '+goalWords(g)+'.':'Done. '+esc(g.name)+' is still '+goalWords(g)+'.')+'</p><p class="muted">'+(s.cover==='next'?nextPeriodWord()+' will start a little lighter.':s.cover&&s.cover.indexOf('cat:')===0?'Moved from '+s.cover.slice(4)+' to '+s.cat+'.':'Every rupee you don’t spend can go here.')+'</p></div>';
  f=(s.split?'':'<button class="btn sec" data-a="splitit" data-x="'+s.txId+'">'+ic('users')+'Split it with friends</button>')+'<button class="btn" data-a="close">Done</button>';}
 return sheetWrap(head,b,f,'data-sheet="pay"');};
A.pcover=function(k){S.sheet.cover=k;if(S.sheet.mode==='log')A.pdone();else{S.sheet.step='upi';render();}};
A.pdone=function(){var s=S.sheet,amt=+s.amt,p=POOLS(),left=Math.max(0,Math.round(p.b[s.cat]||0)),over=amt-left;
 if(over>0&&s.cover&&s.cover!=='next'){var src=s.cover.indexOf('cat:')===0?'budget:'+s.cover.slice(4):s.cover;xfer(NOW,[{ref:src,amt:over}],[{ref:'budget:'+s.cat,amt:over}],'cover',{note:'Covered '+s.cat});}
 NOW+=60e3;var t=push({type:'spend',ts:NOW,merchant:s.mode==='log'?'Cash · '+s.cat:s.payee.n,cat:s.cat,amt:amt,source:s.mode==='log'?'Manual':'UPI',account:s.mode==='log'?null:UPI_IDS[0],carryNext:s.cover==='next'||undefined});
 if(s.payee)S.rules[s.payee.n]=s.cat;s.txId=t.id;s.step='done';play('pay');play('save',450);render();};
/* split after pay / from detail */
A.splitit=function(id){sheet('split',{txId:id,people:[]});};
SHEETS.split=function(){var s=S.sheet,t=txById(s.txId);return sheetWrap(shHead('Split '+esc(t.merchant)),'<h2>Who was with you?</h2><p class="muted">Everyone pays an equal share. Their part shows under Owed to you.</p><div class="chips">'+['Arjun','Meera','Kabir','Riya'].map(function(n){return '<button class="chip" data-a="sppick" data-x="'+n+'" aria-pressed="'+(s.people.indexOf(n)>=0)+'">'+n+'</button>';}).join('')+'</div>'+
 (s.people.length?'<div class="stage">'+tg(rep(s.people.length+1,{c:catColor(t.cat)}).map(function(x,i){return i===0?{c:'var(--text)'}:x;}),s.people.length+1,30,8,{center:1})+'<p class="muted">You and '+s.people.length+' '+(s.people.length===1?'friend':'friends')+', one tile each</p></div>':''),
 '<button class="btn" data-a="spok"'+(s.people.length?'':' disabled style="opacity:.4"')+'>Split equally</button>');};
A.sppick=function(n){var a=S.sheet.people,i=a.indexOf(n);if(i>=0)a.splice(i,1);else a.push(n);render();};
A.spok=function(){var s=S.sheet,t=txById(s.txId),n=s.people.length+1,share=Math.floor(t.amt/n);t.split={shares:[['You',t.amt-share*(n-1)]].concat(s.people.map(function(p){return [p,share];}))};
 s.people.forEach(function(p){IOUS.push({id:nid('i'),person:p,amt:share,spendId:t.id,createdTs:NOW});});S.sheet=null;toast('Split. '+s.people.join(', ')+' owe you their share.');render();};
/* ---------- SETTLE ---------- */
A.settle=function(){sheet('settle',{step:'who'});};
SHEETS.settle=function(){var s=S.sheet,o=IOUS.filter(function(i){return !i.settledTs;});
 if(s.step==='who')return sheetWrap(shHead('Paid back'),'<h2>Who paid you back?</h2>'+o.map(function(i){var sp=txById(i.spendId);return '<button class="opt" data-a="settleone" data-x="'+i.id+'"><span class="avatar" style="width:38px;height:38px">'+i.person[0]+'</span><span class="t"><b>'+i.person+'</b><small>'+esc(sp?sp.merchant:'')+' share</small></span>'+ic('next',18)+'</button>';}).join(''),'');
 var r=s.res,g=topGoal();return sheetWrap(shHead(''),'<div class="moment" style="padding-top:30px">'+tg(tiles(r.amt,unitFor([r.amt],12),{c:r.ref.indexOf('budget:')===0?catColor(r.ref.slice(7)):'var(--save)',cls:'pop'}),6,26,6,{center:1})+tkey(ukey(unitFor([r.amt],12)))+'<p class="big">'+r.person+' paid you back.</p><p class="muted">'+(r.ref.indexOf('budget:')===0?'It went back into '+r.ref.slice(7)+', where the pizza came from.':'It went to '+esc(g.name)+'.')+' '+esc(g.name)+' is '+goalWords(g)+'.</p></div>','<button class="btn" data-a="close">Done</button>');};
A.settleone=function(id){var iou=IOUS.filter(function(i){return i.id===id;})[0];NOW+=60e3;var r=settleIou(iou,NOW);play('save',200);S.sheet={k:'settle',step:'done',res:{amt:iou.amt,person:iou.person,ref:r.ref}};render();};
/* ---------- SUBS ---------- */
SHEETS.subs=function(){return sheetWrap(shHead('Subscriptions'),'<h2>Things that renew</h2><p class="muted">One tile each. They come out of the category they belong to.</p>'+SUBS.map(function(s){return '<div class="tx" style="cursor:default"><span class="ico" style="color:'+catColor(s.cat)+'">'+ic('music',18)+'</span><span class="m"><b>'+s.name+'</b><small>'+s.cat+' · every month on the '+s.day+'th</small></span><span class="amt">'+fmt(s.amt)+'</span></div>';}).join(''),'<button class="btn sec" data-a="close">Close</button>');};
/* ---------- TRANSACTIONS ---------- */
A.txlist=function(){sheet('txlist',{f:'all'});};
A.txf=function(f){S.sheet.f=f;render();};
SHEETS.txlist=function(){var f=S.sheet.f,list=TX.filter(function(t){if(t.ts>NOW)return false;if(f==='all')return t.type!=='transfer'&&t.type!=='opening';if(f==='spend')return t.type==='spend';if(f==='in')return t.type==='income'||t.type==='settle';return t.type==='transfer';}).slice().reverse().slice(0,80);
 var h='<div class="chips">'+[['all','All'],['spend','Spends'],['in','Money in'],['moved','Moved']].map(function(x){return '<button class="chip" data-a="txf" data-x="'+x[0]+'" aria-pressed="'+(f===x[0])+'">'+x[1]+'</button>';}).join('')+'</div>',day='';
 list.forEach(function(t){var d=relDay(t.ts);if(d!==day){day=d;h+='<div class="lbl" style="margin-top:8px">'+d+'</div>';}h+=txRow(t);});
 return sheetWrap(shHead('All activity'),h,'');};
function txRow(t){var inn=t.type==='income'||t.type==='settle',mv=t.type==='transfer',c=t.cat?catColor(t.cat):inn||mv?'var(--save)':'var(--text2)';
 var name=mv?moveName(t):t.merchant,sub=mv?'Moved':t.type==='spend'?(t.cat==='Unsorted'?'Needs a category':t.cat)+(t.source==='Manual'?' · added by you':''):'Money in';
 return '<button class="tx" data-a="txd" data-x="'+t.id+'"><span class="ico" style="color:'+c+'">'+ic(mv?'move':inn?'plus':catIc(t.cat),18)+'</span><span class="m"><b>'+esc(name)+'</b><small>'+sub+' · '+timeStr(t.ts)+'</small></span><span class="amt'+(inn?' in':'')+'">'+(inn?'+':'')+fmt(t.amt)+'</span></button>';}
function refName(r){if(r==='new_money')return 'New money';if(r.indexOf('budget:')===0)return r.slice(7);var g=goalById(r.slice(5));return g?g.name:r;}
function moveName(t){return t.note||(refName(t.src[0].ref)+' → '+refName(t.dst[0].ref)+(t.dst.length>1?' +'+(t.dst.length-1):''));}
A.txd=function(id){sheet('txd',{id:id,from:S.sheet});};
SHEETS.txd=function(){var t=txById(S.sheet.id),h='';if(!t)return '';
 h+='<div style="text-align:center;display:flex;flex-direction:column;gap:6px;align-items:center"><span class="ico" style="width:54px;height:54px;color:'+(t.cat?catColor(t.cat):'var(--save)')+'">'+ic(t.type==='spend'?catIc(t.cat):'plus',26)+'</span><h2>'+esc(t.type==='transfer'?moveName(t):t.merchant)+'</h2><div class="amt-big" style="font-size:40px;min-height:0">'+fmt(t.amt)+'</div><p class="muted">'+relDay(t.ts)+', '+timeStr(t.ts)+' · '+(t.source==='Manual'||!t.account?'Added by you':'UPI · '+t.account)+'</p></div>';
 if(t.type==='spend'){h+='<div><span class="lbl">Category</span><div class="chips" style="margin-top:8px">'+CATS.map(function(c){return '<button class="chip" data-a="catset2" data-x="'+t.id+':'+c+'" aria-pressed="'+(t.cat===c)+'"><span class="cdot" style="background:'+catColor(c)+'"></span>'+c+'</button>';}).join('')+'</div></div>';
  if(t.split)h+='<div class="card"><b>Split</b>'+t.split.shares.map(function(sh){var iou=IOUS.filter(function(i){return i.spendId===t.id&&i.person===sh[0];})[0];return '<div class="hd"><span>'+sh[0]+'</span><span>'+fmt(sh[1])+(iou?(iou.settledTs?' · paid back':' · owes you'):'')+'</span></div>';}).join('')+'</div>';
  else h+='<button class="btn sec" data-a="splitit" data-x="'+t.id+'">'+ic('users')+'Split this</button>';
  if(t.goalFunded||t.note)h+='<p class="muted">'+esc(t.note||'')+'</p>';
  if(t.carryNext)h+='<p class="muted">'+ic('spark',16)+' Taken from next '+periodWord()+'.</p>';}
 if(t.type==='transfer')h+='<div class="card">'+t.src.map(function(x){return '<div class="hd"><span>From '+esc(refName(x.ref))+'</span><span>'+fmt(x.amt)+'</span></div>';}).join('')+t.dst.map(function(x){return '<div class="hd"><span>To '+esc(refName(x.ref))+'</span><span>'+fmt(x.amt)+'</span></div>';}).join('')+'</div>';
 if(t.type==='settle')h+='<p class="muted">Went back to '+esc(refName(t.returns[0].ref))+'.</p>';
 return sheetWrap(shHead('Details',0,0,'txback'),h,'');};
A.txback=function(){var f=S.sheet.from;S.sheet=f||null;render();};
A.catset2=function(x){var p=x.split(':'),t=txById(p[0]);t.cat=p[1];S.rules[t.merchant]=p[1];render();};
/* ---------- MOVE between categories (one choice per step) ---------- */
A.move=function(){sheet('move',{step:0});};
SHEETS.move=function(){var s=S.sheet,p=POOLS(),b='';
 if(s.step===0)b='<h2>Take from which category?</h2>'+CATS.map(function(c){return '<button class="opt" data-a="mv" data-x="from:'+c+'"><span class="cdot" style="background:'+catColor(c)+'"></span><span class="t"><b>'+c+'</b></span>'+tg(catSpecs(c,p).specs.slice(0,24),12,7,2)+'</button>';}).join('');
 if(s.step===1)b='<h2>Give it to?</h2>'+CATS.filter(function(c){return c!==s.from;}).map(function(c){return '<button class="opt" data-a="mv" data-x="to:'+c+'"><span class="cdot" style="background:'+catColor(c)+'"></span><span class="t"><b>'+c+'</b></span></button>';}).join('');
 if(s.step===2)b='<h2>How many tiles?</h2><p class="muted">'+ukey(TILE)+'.</p><div class="chips">'+[1,2,3,5].map(function(n){return '<button class="chip" data-a="mv" data-x="amt:'+n+'"'+((p.b[s.from]||0)<n*TILE?' disabled style="opacity:.35"':'')+'>'+tg(rep(n,{c:catColor(s.from)}),n,10,3)+' '+n+'</button>';}).join('')+'</div>';
 return sheetWrap(shHead('',3,s.step),b,'');};
A.mv=function(x){var s=S.sheet,k=x.split(':');if(k[0]==='from'){s.from=k[1];s.step=1;}else if(k[0]==='to'){s.to=k[1];s.step=2;}else{var a=+k[1]*TILE;xfer(NOW,[{ref:'budget:'+s.from,amt:a}],[{ref:'budget:'+s.to,amt:a}],'move',{note:'Moved '+s.from+' → '+s.to});S.sheet=null;toast('Moved '+fmt(a)+' from '+s.from+' to '+s.to+'.');}render();};
/* ---------- INCOME ---------- */
A.addincome=function(){sheet('addinc',{amt:''});};
SHEETS.addinc=function(){var s=S.sheet;return sheetWrap(shHead('Add income'),'<h2>How much came in?</h2><div class="amt-big">₹'+(s.amt||'0')+'</div><div class="chips" style="justify-content:center">'+['500','1500','3000'].map(function(v){return '<button class="chip" data-a="quick" data-x="'+v+'">₹'+v+'</button>';}).join('')+'</div><div class="keys">'+['1','2','3','4','5','6','7','8','9','','0','del'].map(function(k){return k?'<button data-a="key" data-x="'+k+'">'+(k==='del'?'⌫':k)+'</button>':'<span></span>';}).join('')+'</div>','<button class="btn" data-a="incok">Add and sort it</button>');};
A.incok=function(){var a=+S.sheet.amt;if(!(a>0))return;incomeArrives(a,'Added income','Manual');};
A.cafe=function(){incomeArrives(1500,'Café shift','UPI');};
function incomeArrives(amt,name,src){NOW+=60e3;var inc=push({type:'income',ts:NOW,amt:amt,merchant:name,source:src,account:src==='UPI'?UPI_IDS[0]:null,incomeCat:'Part-time'});var r=autoSplit(inc);S.lastIncome=inc.id;S.drawer=false;S.tab='money';S.open='income';S.sheet={k:'incconf',id:inc.id,fill:r.fill,save:r.save,goal:r.goal.id,amt:amt,name:name};S.after=runIncome;render();}
SHEETS.incconf=function(){var s=S.sheet,g=goalById(s.goal),u=s.u=unitFor([s.amt],30),n=Math.max(1,tcount(s.amt,u)),nf=Math.min(n,Math.round(s.fill/u)),ns=n-nf;
 return sheetWrap(shHead(''),'<h2>'+esc(s.name)+' arrived</h2><div class="stage incstage"><div>'+tg(rep(n,{c:'var(--bone)'}),Math.min(n,9),18,5,{center:1,attr:'id="inctiles"'})+'<div class="split3" style="margin-top:6px"><div class="lab">'+tkey(ukey(u))+'</div></div></div><div class="split3">'+(nf?'<div>'+tg(rep(nf,{}),Math.min(nf,6),18,5,{attr:'id="incb"'})+'<div class="lab">Budget</div></div>':'')+'<div>'+tg(rep(Math.max(ns,1),{}),Math.min(Math.max(ns,1),6),18,5,{attr:'id="incs"'})+'<div class="lab">'+esc(g.name)+'</div></div></div></div>'+
  '<p class="big" style="font-family:var(--display);font-size:24px">'+(s.fill?'Budget topped up. ':'Your budget was already full. ')+fmt(s.save)+' went to '+esc(g.name)+'.</p><p class="muted">'+esc(g.name)+' is now '+goalWords(g)+'.</p>',
  '<button class="btn" data-a="close">Got it</button><button class="btn ghost" data-a="incundo">Undo, I’ll sort it myself</button>','data-sheet="incconf"');};
function runIncome(){var src=document.querySelectorAll('#inctiles i'),b=document.querySelectorAll('#incb i'),sv=document.querySelectorAll('#incs i'),s=S.sheet;if(!s)return;var nf=b.length;play('income');if(sv.length&&s.save!==0)play('save',Math.min(1400,300+src.length*80));
 src.forEach(function(t,i){setTimeout(function(){t.style.transform='scale(0)';t.style.opacity='0';var tgt=i<nf?b[i]:sv[i-nf];if(tgt){tgt.style.backgroundColor=i<nf?'var(--fillg)':'var(--save)';tgt.style.boxShadow='none';}},isReduced()?0:250+Math.min(i*80,900));});}
A.incundo=function(){var s=S.sheet;undoIncomeSplit(s.id);S.sheet=null;S.open='income';toast('Undone. It’s waiting as new money.');render();};
/* ---------- GOALS ---------- */
A.goal=function(id){sheet('goal',{id:id});};
SHEETS.goal=function(){var g=goalById(S.sheet.id),p=POOLS(),s=p.g[g.id]||0,src=p.nm>0?'new money':'Rainy-day jar';
 var moves=TX.filter(function(t){return t.type==='transfer'&&(t.dst.some(function(x){return x.ref==='goal:'+g.id;})||t.src.some(function(x){return x.ref==='goal:'+g.id;}));}).slice(-5).reverse();
 return sheetWrap(shHead(esc(g.name)),'<div style="display:flex;justify-content:center">'+waffle(g,22,{highlight:S.sheet.hl||0})+'</div><p style="text-align:center"><span style="font-family:var(--display);font-size:26px">'+fmt(s)+'</span> <span class="muted">of '+fmt(g.target)+'</span></p><p class="muted" style="text-align:center">Each tile is 1% of the goal. '+esc(g.name)+' is '+goalWords(g)+'.</p>'+
  '<div class="card"><b>Add to it</b><p class="muted" style="font-size:13px">From your '+src+'.</p><div class="chips">'+[100,500,1000].map(function(v){return '<button class="chip" data-a="gadd" data-x="'+v+'">+'+fmt(v)+'</button>';}).join('')+'</div></div>'+
  goalExtras(g)+'<details class="card"><summary style="cursor:pointer;min-height:32px"><b>Moves</b></summary>'+moves.map(txRow).join('')+'</details>','');};
A.gadd=function(v){v=+v;var g=goalById(S.sheet.id),p=POOLS(),src=p.nm>=v?'new_money':'goal:general';if(src==='goal:general'&&(p.g.general||0)<v){toast('Not enough in your Rainy-day jar for that.');render();return;}
 xfer(NOW,[{ref:src,amt:v}],[{ref:'goal:'+g.id,amt:v}],'save',{note:'Added to '+g.name});S.sheet.hl=Math.max(1,Math.round(v/g.target*100));
 if((POOLS().g[g.id]||0)>=g.target){S.sheet={k:'reached',id:g.id};play('goal');}else{play('save');toast(fmt(v)+' went to '+esc(g.name));}render();};
SHEETS.reached=function(){var g=goalById(S.sheet.id);return sheetWrap(shHead(''),'<div class="moment" style="padding-top:20px">'+waffle(g,18)+'<p class="big">'+esc(g.name)+' is full.</p><p class="muted">Every tile, filled by you. What now?</p></div>','<button class="btn" data-a="gspend">Use it for '+esc(g.name)+'</button><button class="btn ghost" data-a="close">Keep saving</button>');};
A.gspend=function(){var g=goalById(S.sheet.id),a=Math.round(POOLS().g[g.id]||0);xfer(NOW,[{ref:'goal:'+g.id,amt:a}],[{ref:'budget:Travel',amt:a}],'goal_spend',{note:g.name+' goal reached'});g.reachedTs=NOW;
 if(!GOALS.some(function(x){return !x.general&&!x.reachedTs;})){GOALS.push({id:'g'+(++SEQ),name:'Next adventure',target:5000,icon:'sun'});xfer(NOW,[{ref:'goal:general',amt:Math.min(200,Math.floor(POOLS().g.general||0))}],[{ref:'goal:'+GOALS[GOALS.length-1].id,amt:Math.min(200,Math.floor(POOLS().g.general||0))}],'headstart');}
 S.sheet=null;toast(fmt(a)+' is ready to spend on '+esc(g.name)+'. Pay for it from Travel.');render();};
A.goalnew=function(){sheet('goalnew',{step:0});};
SHEETS.goalnew=function(){var s=S.sheet,b='';
 if(s.step===0)b='<h2>What are you saving for?</h2><div style="display:flex;flex-direction:column;gap:8px">'+[['New phone','spark'],['Concert tickets','music'],['Laptop','money'],['Trip home','bus']].map(function(x){return '<button class="opt" data-a="gn" data-x="name:'+x[0]+'">'+ic(x[1])+'<span class="t"><b>'+x[0]+'</b></span></button>';}).join('')+'</div><input class="fld" id="gname" placeholder="Or type your own" aria-label="Goal name"><button class="btn sec" data-a="gnown">Use my own</button>';
 if(s.step===1)b='<h2>How big is '+esc(s.name)+'?</h2><div style="display:flex;flex-direction:column;gap:8px">'+[2000,5000,10000,20000].map(function(v){return '<button class="opt" data-a="gn" data-x="amt:'+v+'"><span class="t"><b>'+fmt(v)+'</b><small>Each tile will be '+fmt(v/100)+'</small></span></button>';}).join('')+'</div>';
 if(s.step===2){var g=goalById(s.id);b='<div class="moment" style="padding-top:20px">'+waffle(g,18,{highlight:goalPct(g)})+'<p class="big">'+esc(g.name)+' starts with a head start.</p><p class="muted">'+fmt(s.hs)+' moved from your Rainy-day jar. Leftovers and extra income can go here too.</p></div>';}
 return sheetWrap(shHead('',3,s.step),b,s.step===2?'<button class="btn" data-a="close">Lovely</button>':'');};
A.gnown=function(){var v=(document.getElementById('gname').value||'').trim();if(v)A.gn('name:'+v);};
A.gn=function(x){var s=S.sheet,i=x.indexOf(':'),k=x.slice(0,i),v=x.slice(i+1);if(k==='name'){s.name=v;s.step=1;}else{var id='g'+(++SEQ),t=+v,gen=POOLS().g.general||0,hs=Math.min(Math.round(t*.05/10)*10,Math.floor(gen));GOALS.splice(GOALS.length,0,{id:id,name:s.name,target:t,createdTs:NOW,icon:'spark'});if(hs>0)xfer(NOW,[{ref:'goal:general',amt:hs}],[{ref:'goal:'+id,amt:hs}],'headstart',{note:'Head start for '+s.name});s.id=id;s.hs=hs;s.step=2;}render();};

function goalExtras(g){var src={'From income':0,'Leftovers':0,'Head starts':0,'Added by you':0},col={'From income':'var(--save)','Leftovers':'var(--bone)','Head starts':'var(--text3)','Added by you':'var(--text)'};
 TX.forEach(function(t){if(t.type!=='transfer')return;t.dst.forEach(function(x){if(x.ref!=='goal:'+g.id)return;var k=t.reason==='sweep'?'Leftovers':t.reason==='headstart'?'Head starts':t.incomeId||t.settleId?'From income':t.reason==='save'?'Added by you':null;if(k)src[k]+=x.amt;});});
 var ks=Object.keys(src).filter(function(k){return src[k]>0;}),u=unitFor(ks.map(function(k){return src[k];}),30),a=[];ks.forEach(function(k){a=a.concat(tiles(src[k],u,{c:col[k],v:k+' · '+fmt(src[k])}));});
 var e=WF.eta.call(null,{g:g});
 return '<section class="card"><b>Where it came from</b>'+tg(a,0,14,3)+'<div class="lgd">'+ks.map(function(k){return '<span><span class="cdot" style="background:'+col[k]+'"></span>'+k+'</span>';}).join('')+'</div>'+tkey(ukey(u))+'</section>'+
  '<section class="card"><b>When it’s done</b>'+e.body+'<p class="muted" style="font-size:13px">'+e.cap+'</p>'+e.key+'</section>';}

/* ===== Trickle v8 — rhythm: Monday check-in, period story, drawer, onboarding ===== */
A.checkin=function(){S.drawer=false;sheet('checkin',{i:0});};
SHEETS.checkin=function(){var s=S.sheet,g=topGoal(),w0=NOW-7*DAY,b='',prog='<div class="prog">'+[0,1,2,3].map(function(i){return '<i class="'+(i<=s.i?'on':'')+'"></i>';}).join('')+'</div>';
 if(s.i===0){var a=[];CATS.forEach(function(c){var v=0;TX.forEach(function(t){if(t.type==='spend'&&t.cat===c&&t.ts>w0&&t.ts<=NOW&&!t.goalFunded)v+=t.amt;});a.push([c,v]);});var cu=unitFor(a.map(function(x){return x[1];}),40),sp=[];a.forEach(function(x){sp=sp.concat(tiles(x[1],cu,Object.assign(ct(x[0]),{cls:'pop'})));});sp.forEach(function(x,i){x.d=Math.min(600,i*18);});
  b='<span class="lbl">Last week</span><h1>Here’s where last week went.</h1>'+tg(sp,8,24,6)+legend(CATS)+tkey(ukey(cu));}
 if(s.i===1){var sv=0;S._chime=1;TX.forEach(function(t){if(t.type==='transfer'&&t.ts>monthStart(NOW)&&t.dst.some(function(x){return x.ref.indexOf('goal:')===0&&x.ref!=='goal:general';})&&t.reason!=='headstart')sv+=t.amt;});
  b='<span class="lbl">Savings</span><h1>'+esc(g.name)+' is '+goalWords(g)+'.</h1><div style="display:flex;justify-content:center">'+waffle(g,20,{highlight:Math.round(sv/g.target*100)})+'</div><p class="muted">The glowing tiles were added this '+'month.</p>';}
 if(s.i===2){var big=CATS.slice().sort(function(x,y){return spentMonth(y)-spentMonth(x);})[0];
  b='<span class="lbl">This week</span><h1>'+big+' is the busy one. Keep an eye on it?</h1>'+tg(catSpecs(big).specs,12,18,5)+''+tkey(ukey(budgetUnit()))+'<p class="muted">No rules to set. We’ll show you '+big+'’s tiles when you pay.</p>';}
 if(s.i===3){var r=repeatSpends().filter(function(t){return t.ts>NOW-7*DAY;}),gs=repeatGroups();b='<span class="lbl">Repeat buys</span><h1>'+(gs.length?esc(gs[0].name)+' was a regular last week.':'Nothing repeated last week.')+'</h1>'+weekDots(r)+'<p class="muted">Tap the dots to see what added up.</p><button class="btn sec" data-a="rbopen">See repeat buys</button>';}
 return '<div class="story" role="dialog" aria-modal="true" data-sheet="checkin">'+prog+'<div class="sh" style="justify-content:flex-end;display:flex;padding:8px 12px"><button class="iconbtn" data-a="close" aria-label="Close">'+ic('close')+'</button></div><div class="sb">'+b+'</div><div class="sf" style="padding:14px 18px 18px">'+(s.i<3?'<button class="btn" data-a="cinext">Next</button>':'<button class="btn" data-a="cidone">Sounds good</button>')+'</div></div>';};
A.cinext=function(){S.sheet.i++;render();};
A.cidone=function(){S.checkinDone=true;S.sheet=null;var g=topGoal();toast(esc(g.name)+' is '+goalWords(g)+'. See you next Monday.');render();};
/* ---------- period-end story ---------- */
A.story=function(){S.drawer=false;sheet('story',{i:0});};
function leftoverNow(){var p=POOLS(),t=0;CATS.forEach(function(c){if((p.b[c]||0)>.5)t+=Math.round(p.b[c]);});return t;}
SHEETS.story=function(){var s=S.sheet,g=topGoal(),m=new Date(NOW).getMonth(),b='',n=5,prog='<div class="prog">'+[0,1,2,3,4].map(function(i){return '<i class="'+(i<=s.i?'on':'')+'"></i>';}).join('')+'</div>';
 if(s.i===0){var v=CATS.map(function(c){return spentMonth(c);}),u=unitFor(v,50),a=[];CATS.forEach(function(c,i){a=a.concat(tiles(v[i],u,Object.assign(ct(c),{cls:'pop'})));});b='<span class="lbl">'+MONL[m]+' in tiles</span><h1>This is everything you spent.</h1>'+tg(a,10,20,5,{attr:'data-a="reveal" data-v="'+fmt(spentMonth())+'"'})+legend(CATS)+tkey(ukey(u));}
 if(s.i===1){var r=repeatSpends(mStart(m),NOW+1),tot=sumAmt(r),u2=unitFor([tot],30),gs=repeatGroups(mStart(m),NOW+1);b='<span class="lbl">The little things</span><h1>'+(gs.length?glist(gs.slice(0,3).map(function(x){return esc(x.name);})):'Nothing')+'. Again and again.</h1><div class="jar">'+tg(tiles(tot,u2,{c:'var(--text2)'}),6,22,5,{cls:'pour',center:1})+'</div><p class="big" style="font-family:var(--display);font-size:24px;text-align:center">Added up to <span data-count="'+tot+'">'+fmt(tot)+'</span></p>'+tkey(ukey(u2),'g2');S._pour=1;}
 if(s.i===2){var sk=sankeyData();b='<span class="lbl">Where '+MONL[m]+' went</span><h1>From allowance to everything else.</h1><div class="skcard">'+sankeySVG(sk,{h:280})+'<div class="wf">'+tkey(ukey(sk.u)+' · band width = ₹','g2')+'<span class="wtip"></span></div></div>';S._flow=1;}
 if(s.i===3){var lo=leftoverNow(),lu=unitFor([lo],40);b='<span class="lbl">Leftover</span><h1>'+(lo?'What’s left '+(SWEEP==='auto'?'goes to '+esc(g.name)+'.':'waits for you to decide.'):'Everything got used. That’s fine too.')+'</h1>'+tg(tiles(lo,lu,{c:'var(--save)',cls:'pop'}).map(function(x,i){x.d=Math.min(600,i*25);return x;}),10,18,4)+(lo?tkey(ukey(lu),'sv'):'')+'<p class="muted">'+nextPeriodWord()+' starts fresh with a full budget'+(CATS.some(function(c){return (POOLS().b[c]||0)<-.5;})?', a little lighter where you went over.':'.')+'</p>';}
 if(s.i===4){var sv=savedIn(m)+leftoverNow()*(SWEEP==='auto'?1:0);b='<div class="moment">'+waffle(g,18)+tkey('1 tile = 1%','sv')+'<span class="lbl">'+MONL[m]+'</span><p class="big">You saved <span data-count="'+sv+'">'+fmt(sv)+'</span>.</p><p class="muted">'+esc(g.name)+' is '+goalWords(g)+'.</p></div>';S._chime=1;}
 return '<div class="story" role="dialog" aria-modal="true" data-sheet="story">'+prog+'<div class="sh" style="justify-content:flex-end;display:flex;padding:8px 12px"><button class="iconbtn" data-a="close" aria-label="Close">'+ic('close')+'</button></div><div class="sb">'+b+'</div><div class="sf" style="padding:14px 18px 18px">'+(s.i<n-1?'<button class="btn" data-a="stnext">Next</button>':'<button class="btn" data-a="fresh">'+(PERIOD==='week'?'Start the new week':'Start '+nextPeriodWord())+'</button>')+'</div></div>';};
A.stnext=function(){S.sheet.i++;render();};
/* fresh start: sweep leftover, move clock to the new period, allowance arrives and auto-splits */
A.fresh=function(){var p=POOLS(),parts=[],g=topGoal(),name=thisPeriodName();CATS.forEach(function(c){if((p.b[c]||0)>.5)parts.push({ref:'budget:'+c,amt:Math.round(p.b[c]*100)/100});});
 var tot=parts.reduce(function(a,x){return a+x.amt;},0),end=periodEnd();
 if(tot>0){if(SWEEP==='auto')xfer(end-60e3,parts,saveDst(tot),'sweep',{auto:true,period:name});else{xfer(end-60e3,parts,[{ref:'new_money',amt:tot}],'sweep',{auto:false,period:name});S.pendingLeft={amt:tot,name:name};}}
 NOW=end+9*3600e3;S.checkinDone=false;var r={save:0,goal:g};
 var inc=null;if(new Date(NOW).getDate()===1){inc=push({type:'income',ts:NOW,amt:ALLOW,merchant:'Allowance',from:'Amma & Appa',source:'UPI',account:UPI_IDS[0],incomeCat:'Allowance'});r=autoSplit(inc);}
 FORCE_PACE=null;S.sheet=null;S.tab='home';S.fresh=true;setTimeout(function(){S.fresh=false;},1600);
 if(inc){S.sheet={k:'incconf',id:inc.id,fill:r.fill,save:r.save,goal:r.goal.id,amt:ALLOW,name:thisPeriodName()+' allowance',fresh:1};S.after=runIncome;}else toast(thisPeriodName()+' starts fresh.',null,5000);render();};
/* ---------- drawer ---------- */
function drawerHTML(){var budget=Object.keys(FIXED).reduce(function(a,c){return a+FIXED[c];},0);
 return '<aside class="drawer" role="dialog" aria-label="Settings"><div class="sh" style="display:flex;align-items:center;gap:10px;padding:14px"><span class="avatar">T</span><b style="flex:1">Tarun</b><button class="iconbtn" data-a="drawer" data-x="0" aria-label="Close settings">'+ic('close')+'</button></div><div class="sb" style="flex:1;overflow-y:auto;padding:0 14px 20px">'+
 '<span class="lbl">Tracking</span>'+(TRACK==='upi'?UPI_IDS.map(function(u){return '<div class="set">'+ic('link')+'<span class="t">'+u+'<small>Linked UPI ID · spends appear by themselves</small></span></div>';}).join('')+'<button class="set" data-a="linkmore">'+ic('plus')+'<span class="t">Link another UPI ID</span></button>':'<div class="set">'+ic('pen')+'<span class="t">Manual entry<small>You add spends with Log cash</small></span></div><button class="set" data-a="linkmore">'+ic('link')+'<span class="t">Link a UPI ID instead</span></button>')+
 '<button class="set" data-a="import">'+ic('upload')+'<span class="t">Import a bank statement<small>Coming soon</small></span></button>'+
 '<span class="lbl" style="margin-top:14px;display:block">Budget</span><div class="set" style="cursor:default"><span class="t">Budget period</span><div class="seg"><button data-a="period" data-x="week" aria-pressed="'+(PERIOD==='week')+'">Weekly</button><button data-a="period" data-x="month" aria-pressed="'+(PERIOD==='month')+'">Monthly</button></div></div>'+
 '<div class="set" style="cursor:default"><span class="t">Fixed budget<small>'+fmt(budget)+' a month</small></span><button class="iconbtn" data-a="bud" data-x="-500" aria-label="Lower budget">−</button><button class="iconbtn" data-a="bud" data-x="500" aria-label="Raise budget">+</button></div>'+
 '<div class="set" style="cursor:default"><span class="t">Categories<small>'+CATS.join(', ')+'</small></span></div>'+
 '<div class="set" style="cursor:default"><span class="t">Leftover at '+periodWord()+' end</span><div class="seg"><button data-a="sweep" data-x="auto" aria-pressed="'+(SWEEP==='auto')+'">Auto</button><button data-a="sweep" data-x="manual" aria-pressed="'+(SWEEP==='manual')+'">Ask me</button></div></div>'+
 '<span class="lbl" style="margin-top:14px;display:block">Look and sound</span>'+
 '<div class="set" style="cursor:default">'+ic('contrast')+'<span class="t">Look<small>Black and white uses patterns and words</small></span><div class="seg"><button data-a="look" data-x="color" aria-pressed="'+(S.look==='color')+'">Colour</button><button data-a="look" data-x="bw" aria-pressed="'+(S.look==='bw')+'">B&amp;W</button></div></div>'+
 '<div class="set" style="cursor:default">'+ic('sound')+'<span class="t">Sounds<small>Soft chimes for savings and payments</small></span><div class="seg"><button data-a="snd" data-x="1" aria-pressed="'+SND.on+'">On</button><button data-a="snd" data-x="0" aria-pressed="'+!SND.on+'">Off</button></div></div>'+
 '<div class="set" style="cursor:default"><span class="t">Count as a repeat buy<small>Same place, within 30 days</small></span><div class="seg">'+[3,4,5].map(function(n){return '<button data-a="rn" data-x="'+n+'" aria-pressed="'+(REPEAT_N===n)+'">'+n+'×</button>';}).join('')+'</div></div>'+
 '<div class="set" style="cursor:default"><span class="t">Reduce motion</span><div class="seg"><button data-a="rm" data-x="0" aria-pressed="'+!S.reduced+'">Off</button><button data-a="rm" data-x="1" aria-pressed="'+S.reduced+'">On</button></div></div>'+
 '<button class="set" data-a="replay">'+ic('back')+'<span class="t">Replay onboarding</span></button>'+
 '<span class="lbl" style="margin-top:14px;display:block">Prototype controls</span>'+
 '<div class="set" style="cursor:default"><span class="t">Glow</span><div class="seg"><button data-a="fp" data-x="" aria-pressed="'+!FORCE_PACE+'">Real</button><button data-a="fp" data-x="ok" aria-pressed="'+(FORCE_PACE==='ok')+'">Calm</button><button data-a="fp" data-x="fast" aria-pressed="'+(FORCE_PACE==='fast')+'">Fast</button></div></div>'+
 '<button class="set" data-a="cafe">'+ic('plus')+'<span class="t">Café shift pay arrives</span></button>'+
 '<button class="set" data-a="checkin">'+ic('cal')+'<span class="t">Open Monday check-in</span></button>'+
 '<button class="set" data-a="story">'+ic('moon')+'<span class="t">End this '+periodWord()+' (story)</span></button>'+
 '</div></aside>';}
A.period=function(x){PERIOD=x;render();};
A.bud=function(x){var tot=Object.keys(FIXED).reduce(function(a,c){return a+FIXED[c];},0),nt=Math.max(2000,tot+(+x));CATS.forEach(function(c){FIXED[c]=Math.round(FIXED[c]/tot*nt/100)*100;});render();};
A.rn=function(x){REPEAT_N=+x;persist();render();};
A.rm=function(x){S.reduced=x==='1';render();};
A.fp=function(x){FORCE_PACE=x||null;render();};
A.import=function(){toast('Statement import is coming soon. Upload a PDF or CSV from your bank here.');render();};
A.linkmore=function(){if(TRACK!=='upi'){TRACK='upi';}else if(UPI_IDS.indexOf('tarun@ybl')<0)UPI_IDS.push('tarun@ybl');toast('UPI ID linked. New spends will appear by themselves.');render();};
A.replay=function(){S.drawer=false;S.onb=1;S.od={track:null,period:'month',budget:6000,cats:['Food','Travel','Fun','Essentials'],goal:'Goa trip'};render();};
/* ---------- onboarding ---------- */
function onbScreen(){var o=S.od,st=S.onb,b='',f='',dots='';var total=8;
 dots='<div class="steps" aria-label="Step '+st+' of '+total+'">';for(var i=1;i<=total;i++)dots+='<i class="'+(i<=st?'on':'')+'"></i>';dots+='</div>';
 var head='<div class="sh" style="display:flex;align-items:center;gap:8px;padding:14px 12px 0">'+(st>1&&st<8?'<button class="iconbtn" data-a="ob" data-x="'+(st===4&&o.track==='manual'?3:st-1)+'" aria-label="Back">'+ic('back')+'</button>':'<span style="width:44px"></span>')+dots+'<span style="width:44px"></span></div>';
 if(st===1){var a=[];for(var k=0;k<36;k++)a.push({c:k<22?['var(--food)','var(--travel)','var(--fun)','var(--ess)'][k%4]:'var(--save)',cls:'pop',d:k*30});a.forEach(function(x){x.cls='pop';});
  b='<div class="moment" style="padding-top:40px">'+tg(a,6,30,7,{center:1,cls:'pour',attr:'id="welcome"'})+'<h1>Money as tiles.</h1><p class="muted" style="max-width:30ch">Spend some, save the rest. Trickle shows it without a wall of numbers.</p><p class="faint" style="font-size:12.5px">'+ic('sound',14)+' Sounds on. Mute them in settings.</p></div>';f='<button class="btn" data-a="ob" data-x="2">Start</button><button class="btn ghost" data-a="skip">Skip, show me the demo</button>';}
 if(st===2){b='<h1>How should Trickle see your spends?</h1><button class="opt def" data-a="obt" data-x="upi">'+ic('link')+'<span class="t"><b>Link my UPI ID</b><small>Spends show up by themselves</small></span></button><button class="opt" data-a="obt" data-x="manual">'+ic('pen')+'<span class="t"><b>I’ll add them myself</b><small>Two taps per spend</small></span></button><p class="faint" style="font-size:12.5px">You can import a bank statement later from settings.</p>';}
 if(st===3&&o.track==='upi'){b='<h1>Link your UPI ID</h1><p class="muted">We only read payments made from this ID.</p><label class="lbl" for="upiid">UPI ID</label><input class="fld" id="upiid" value="tarun@oksbi" autocomplete="off">';f='<button class="btn" data-a="oblink">Link it</button>';}
 if(st===3&&o.track==='manual'){b='<h1>Adding a spend takes two taps.</h1><div class="stage">'+tg(rep(3,{c:'var(--food)',cls:'pop'}),3,34,8,{center:1})+'<p class="muted">Amount, then what it was for.</p></div><button class="opt" data-a="import">'+ic('upload')+'<span class="t"><b>Import a bank statement</b><small>Coming soon</small></span></button>';f='<button class="btn" data-a="ob" data-x="4">Sounds good</button>';}
 if(st===4){b='<h1>How often do you get money?</h1><p class="muted">Your budget follows it, and so does the glow on Home.</p><button class="opt" data-a="obp" data-x="week">'+ic('cal')+'<span class="t"><b>Every week</b><small>Pocket money, weekly pay</small></span></button><button class="opt def" data-a="obp" data-x="month">'+ic('cal')+'<span class="t"><b>Every month</b><small>Allowance, stipend</small></span></button>';}
 if(st===5){var n=o.budget/BIG;b='<h1>How much do you want to spend each month?</h1><p class="muted">Rent and fees aside.</p><div class="stage">'+tg(rep(n,{c:'var(--fillg)'}),6,26,6,{center:1})+'<div class="amt-big" style="font-size:40px;min-height:0">'+fmt(o.budget)+'</div><div style="display:flex;gap:12px"><button class="iconbtn" data-a="obb" data-x="-500" aria-label="Less">−</button><button class="iconbtn" data-a="obb" data-x="500" aria-label="More">+</button></div>'+tkey(ukey(BIG))+'</div>';f='<button class="btn" data-a="ob" data-x="6">That’s my budget</button>';}
 if(st===6){var all=['Food','Travel','Fun','Essentials','Laundry','Books'];b='<h1>What do you usually spend on?</h1><p class="muted">We split your budget across these. Change it any time.</p><div class="chips">'+all.map(function(c){return '<button class="chip" data-a="obc" data-x="'+c+'" aria-pressed="'+(o.cats.indexOf(c)>=0)+'"><span class="cdot" style="background:'+catColor(c)+'"></span>'+c+'</button>';}).join('')+'</div><div class="stage" style="min-height:0">'+tg(obFixedSpecs(),12,16,4,{center:1})+'</div>';f='<button class="btn" data-a="ob" data-x="7"'+(o.cats.length?'':' disabled style="opacity:.4"')+'>Next</button>';}
 if(st===7){b='<h1>What’s your first thing to save for?</h1><p class="muted">We’ll give it a head start.</p>'+[['Goa trip','sun'],['New phone','spark'],['Rainy day','jar'],['Concert','music']].map(function(x){return '<button class="opt'+(x[0]==='Goa trip'?' def':'')+'" data-a="obg" data-x="'+x[0]+'">'+ic(x[1])+'<span class="t"><b>'+x[0]+'</b></span></button>';}).join('');}
 if(st===8){var nb=o.budget/BIG,ns=(ALLOW-o.budget)/BIG;b='<h1>Here’s your '+(o.period==='week'?'first week':'allowance')+', sorted.</h1><div class="stage incstage">'+tg(rep(ALLOW/BIG,{c:'var(--bone)'}),9,18,5,{center:1,attr:'id="inctiles"'})+'<div class="split3"><div>'+tg(rep(nb,{}),6,18,5,{attr:'id="incb"'})+'<div class="lab">Budget</div></div><div>'+tg(rep(Math.max(1,ns),{}),Math.min(6,Math.max(1,ns)),18,5,{attr:'id="incs"'})+'<div class="lab">'+esc(o.goal)+'</div></div></div></div><p class="big" style="font-family:var(--display);font-size:26px">'+fmt(ALLOW-o.budget)+' went to '+esc(o.goal)+'.</p><p class="muted">Budget fills first, the rest is saved. Every month, by itself.</p>'+tkey(ukey(BIG),'sv');f='<button class="btn" data-a="obdone">Open Trickle</button>';}
 return '<div data-screen="onb'+st+(st===3?o.track:'')+'" style="min-height:100%;display:flex;flex-direction:column">'+head+'<div class="scr" style="flex:1;min-height:0">'+b+'</div>'+(f?'<div class="sf" style="padding:12px 18px 18px;display:flex;flex-direction:column;gap:8px">'+f+'</div>':'')+'</div>';}
function obFixedSpecs(){var o=S.od,ws=o.cats.reduce(function(a,c){return a+CAT_DEF[c].w;},0),sp=[];o.cats.forEach(function(c){sp=sp.concat(rep(Math.round(o.budget*CAT_DEF[c].w/ws/TILE),ct(c)));});return sp;}
A.ob=function(x){S.onb=+x;if(S.onb===8){S.sheet=null;S.after=function(){S.sheet={fill:S.od.budget,save:1};runIncome();S.sheet=null;};}render();};
A.obt=function(x){S.od.track=x;A.ob(3);};
A.oblink=function(){var v=(document.getElementById('upiid').value||'').trim();if(!/^[\w.\-]+@[\w]+$/.test(v)){toast('That doesn’t look like a UPI ID. It should look like name@bank.');render();return;}S.od.upi=v;A.ob(4);};
A.obp=function(x){S.od.period=x;A.ob(5);};
A.obb=function(x){S.od.budget=Math.min(8500,Math.max(2000,S.od.budget+(+x)));render();};
A.obc=function(c){var a=S.od.cats,i=a.indexOf(c);if(i>=0)a.splice(i,1);else a.push(c);render();};
A.obg=function(x){S.od.goal=x;A.ob(8);};
A.obdone=function(){var o=S.od;TRACK=o.track||'upi';PERIOD=o.period;if(o.upi)UPI_IDS=[o.upi];
 CATS=o.cats.slice();var ws=CATS.reduce(function(a,c){return a+CAT_DEF[c].w;},0);FIXED={};var acc=0;CATS.forEach(function(c,i){var v=i===CATS.length-1?o.budget-acc:Math.round(o.budget*CAT_DEF[c].w/ws/100)*100;FIXED[c]=v;acc+=v;});
 seedLedger({goalName:o.goal});S.onb=null;S.tab='home';S.fresh=true;setTimeout(function(){S.fresh=false;},1600);render();};
A.skip=function(){S.od.track='upi';A.obdone();};

/* ---------- repeat buys detail ---------- */
function weekDots(r){var d=[[],[],[],[],[],[],[]];r.forEach(function(t){d[Math.min(6,Math.floor((t.ts-(dayStart(NOW)-6*DAY))/DAY))].push(t);});
 return '<div class="wk7">'+d.map(function(x,i){var ts=dayStart(NOW)-(6-i)*DAY;return '<div><div class="stk">'+x.map(function(t){return '<i style="background:'+catColor(t.cat)+'" class="'+catK(t.cat)+'" data-a="reveal" data-v="'+esc(t.merchant)+' · '+fmt(t.amt)+'"></i>';}).join('')+'</div><small>'+DOWS[new Date(ts).getDay()].slice(0,2)+'</small></div>';}).join('')+'</div>'+tkey('1 dot = 1 buy','dot');}
A.rbopen=function(){S.drawer=false;sheet('rb',{});};
SHEETS.rb=function(){var r=repeatSpends(),tot=sumAmt(r),u=unitFor([tot],50),gs=repeatGroups(),g=topGoal(),top=gs[0];
 var sooner='';if(top){var avg=top.amt/top.list.length,rate=goalRate()*1,e=goalEta(g),wNew=Math.ceil(e.rem/(rate+2*avg)),diff=e.weeks-wNew;if(diff>=1)sooner='<div class="card"><p>Skipping two '+esc(top.name)+' visits a week ≈ '+esc(g.name)+' '+(diff===1?'a week':diff+' weeks')+' sooner.</p><p class="faint" style="font-size:12.5px">Just a thought. No judgement.</p></div>';}
 var tr=WF.rbtrend(),fq=WF.rbfreq(),rp=WF.rbrep();S._pour=1;
 return sheetWrap(shHead('Repeat buys'),'<p class="muted">Same place, '+REPEAT_N+' or more times in 30 days. Any amount.</p><div class="jar">'+tg(tiles(tot,u,{c:'var(--text2)'}),10,18,4,{cls:'pour',center:1})+'</div><p class="big" style="font-family:var(--display);font-size:26px;text-align:center">Added up to <span data-count="'+tot+'">'+fmt(tot)+'</span></p>'+tkey(ukey(u),'g2')+
  '<section class="card"><b>Per place</b>'+rp.body+rp.key+'</section><section class="card"><b>How often</b>'+fq.body+fq.key+'</section><section class="card"><b>Trend</b>'+tr.body+'<p class="muted" style="font-size:13px">'+tr.cap+'</p>'+tr.key+'</section>'+sooner,'','data-sheet="rb"');};

