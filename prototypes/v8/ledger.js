/* ===== Trickle v8 — ledger (v7 model, renamed): every rupee lives in exactly one pool =====
   Pools: new_money · budget:<cat> · goal:<id>.  new_money + Σbudget + Σsavings == balance == Σflows.
   Owed-to-you (IOUs) is outside the balance until a 'settle' txn. Tracking = linked UPI IDs or manual entry only. */
var MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var MONL=['January','February','March','April','May','June','July','August','September','October','November','December'];
var DOWS=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var DAY=864e5;
var NOW=new Date(2026,8,21,18,30).getTime();
var TILE=100, BIG=500;
var CAT_DEF={Food:{c:'#E8743B',i:'food',w:.40},Travel:{c:'#3F8CE6',i:'bus',w:.15},Fun:{c:'#D55181',i:'star',w:.1333},Essentials:{c:'#9085E9',i:'bag',w:.2334},Laundry:{c:'#4FB6C4',i:'bag',w:.08},Books:{c:'#B98B5E',i:'book',w:.08}};
var CATS=['Food','Travel','Fun','Essentials'];
var FIXED={Food:2400,Travel:900,Fun:800,Essentials:1400};
var ALLOW=9000;
var TX=[],IOUS=[],GOALS=[],SUBS=[],SEQ=0,PERIOD='month',SWEEP='auto',TRACK='upi',UPI_IDS=['tarun@oksbi'];
function at(m,d,h,mi){return new Date(2026,m,d,h||0,mi||0).getTime();}
function nid(p){return (p||'t')+(++SEQ);}
function catColor(c){return (CAT_DEF[c]&&CAT_DEF[c].c)||'#8a8b90';}
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
  CATS.forEach(function(c){var tgt=FIXED[c]*fr[c]||FIXED[c]*fr._,s=0,list=MERCH[c]||MERCH.Essentials,guard=0;
   SUBS.forEach(function(sb){if(sb.cat===c&&sb.day<=lastDay){spends.push({type:'spend',ts:at(m,sb.day,9),merchant:sb.name,cat:c,amt:sb.amt,source:'UPI',account:UPI_IDS[0],sub:sb.id});s+=sb.amt;}});
   while(s<tgt&&guard++<200){var mm=list[Math.floor(R()*list.length)],a=Math.round(rr(mm[1],mm[2])/5)*5;if(s+a>tgt+40)a=Math.max(10,Math.round((tgt-s)/5)*5);if(a<10)break;
    var d=1+Math.floor(R()*lastDay),hi=Math.floor(R()*(mm[3].length/2))*2,h=rr(mm[3][hi],mm[3][hi+1]);var ts=Math.round((at(m,d)+h*3600e3)/6e4)*6e4;if(ts>NOW-3600e3)ts=NOW-Math.round(rr(2,20))*3600e3;
    var cash=R()<.25&&TRACK!=='manual_only';spends.push({type:'spend',ts:ts,merchant:mm[0],cat:c,amt:a,source:(TRACK==='manual'||cash)?'Manual':'UPI',account:(TRACK==='manual'||cash)?null:UPI_IDS[0]});s+=a;}});}
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
