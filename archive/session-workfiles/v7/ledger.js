/* ===== Trickle v7 — ledger: every rupee lives in exactly one pool =====
   Pools: to_assign · budget:<cat> · goal:<id>.  Balance = to_assign + Σbudget + Σsavings.
   Owed-to-you (IOUs) is never a pool; it enters the balance only through a 'settle' txn. */
var INCOME_CATS=[{n:'Allowance',i:'home'},{n:'Stipend',i:'book'},{n:'Part-time',i:'cup'},{n:'Freelance',i:'pen'},{n:'Scholarship',i:'flag'},{n:'Gift',i:'box'},{n:'Refund',i:'swap'},{n:'Other',i:'coin'}];
var ALLOT={Food:1900,Snacks:800,Groceries:1100,Transport:800,Necessities:950,Stationery:400,Buffer:850}; /* = 6,800 */
var FRIENDS=['Arjun','Meera','Kabir','Riya','Yash Raina','Priya D'];
var TX=[],IOUS=[],GOALS=[],SUBS=[],SEQ=0,CAL={ta:0,goa:0,gen:0,aug:0,sep:0};
function at(m,d,h,mi){return new Date(2026,m,d,h||0,mi||0).getTime();}
function nid(p){return (p||'x')+(++SEQ);}
function refName(r){if(r==='to_assign')return 'To assign';if(r.indexOf('budget:')===0)return r.slice(7);if(r.indexOf('goal:')===0){var g=goalById(r.slice(5));return g?g.name:r.slice(5);}return r;}
function goalById(id){for(var i=0;i<GOALS.length;i++)if(GOALS[i].id===id)return GOALS[i];return null;}
function refAdd(p,ref,a){
 if(ref==='to_assign')p.ta+=a;
 else if(ref.indexOf('budget:')===0){var c=ref.slice(7);p.b[c]=(p.b[c]||0)+a;}
 else if(ref.indexOf('goal:')===0){var g=ref.slice(5);p.g[g]=(p.g[g]||0)+a;}
 else throw new Error('bad ref '+ref);}
function newPools(){return {ta:0,b:{},g:{}};}
function applyTx(p,t){
 if(t.type==='opening'||t.type==='income')refAdd(p,'to_assign',t.amt);
 else if(t.type==='spend')refAdd(p,'budget:'+(t.cat||'Uncategorised'),-t.amt);
 else if(t.type==='transfer'){t.src.forEach(function(x){refAdd(p,x.ref,-x.amt);});t.dst.forEach(function(x){refAdd(p,x.ref,x.amt);});}
 else if(t.type==='settle')t.returns.forEach(function(x){refAdd(p,x.ref,x.amt);});}
function poolsAt(upto){var p=newPools();for(var i=0;i<TX.length;i++){if(upto!=null&&TX[i].ts>upto)continue;applyTx(p,TX[i]);}return p;}
function sumObj(o){var s=0;for(var k in o)s+=o[k];return s;}
function POOLS(){var p=poolsAt();p.budget=sumObj(p.b);p.savings=sumObj(p.g);p.balance=p.ta+p.budget+p.savings;return p;}
/* independent check: balance from flows only */
function flowBalance(){var s=0;TX.forEach(function(t){if(t.type==='opening'||t.type==='income')s+=t.amt;else if(t.type==='spend')s-=t.amt;else if(t.type==='settle')s+=t.amt;});return s;}
function owedOpen(){return IOUS.filter(function(i){return !i.settledTs;}).reduce(function(a,i){return a+i.amt;},0);}
function checkInvariant(label){
 var p=POOLS(),fb=flowBalance(),ok=Math.abs(p.ta+p.budget+p.savings-p.balance)<.01&&Math.abs(p.balance-fb)<.01;
 /* each split's shares sum to the spend */
 TX.forEach(function(t){if(t.type==='spend'&&t.split&&t.split.shares&&t.split.status!=='pending_setup'){var s=t.split.shares.reduce(function(a,x){return a+x.amt;},0);if(Math.abs(s-t.amt)>.01)ok=false;}
  if(t.type==='transfer'){var a=t.src.reduce(function(x,y){return x+y.amt;},0),b=t.dst.reduce(function(x,y){return x+y.amt;},0);if(Math.abs(a-b)>.01)ok=false;}});
 var rec={label:label||'',ok:ok,to_assign:p.ta,budget:p.budget,savings:p.savings,balance:p.balance,flow:fb,owed:owedOpen()};
 if(typeof INV_LOG!=='undefined'){INV_LOG.push(rec);}
 console.assert(ok,'INVARIANT FAILED '+JSON.stringify(rec));
 if(typeof document!=='undefined'){var d=document.getElementById('inv');if(d){d.textContent=JSON.stringify(rec);d.setAttribute('data-ok',ok?'1':'0');}}
 return rec;}
var INV_LOG=[];

/* period helpers (monthly default) */
function mOf(ts){return new Date(ts).getMonth();}
function monthEnd(m){return new Date(2026,m+1,1).getTime()-1;}

/* ---------- seed ---------- */
var GOAL_SEED=[
 {id:'goa',name:'Goa trip',icon:'sun',target:8000,byDate:at(11,15),createdTs:at(3,1),isDefaultSweep:true},
 {id:'moto',name:'Motorcycle',icon:'bike',target:25000,byDate:new Date(2027,2,31).getTime(),createdTs:at(3,1)},
 {id:'general',name:'General',icon:'piggy',target:0,createdTs:at(3,1),general:true},
 {id:'hp',name:'Headphones',icon:'head',target:3500,byDate:at(7,1),createdTs:at(4,2),reachedTs:at(6,20,21)}];
var SPLITS_SEED=[
 {ts:at(3,18,20,10),merchant:'Dominos',cat:'Food',amt:800,mode:'equal',shares:[['You',200],['Arjun',200],['Meera',200],['Kabir',200]],settle:{Arjun:at(3,19,12),Meera:at(3,21,18),Kabir:at(3,25,9)}},
 {ts:at(4,10,7,40),merchant:'Uber',cat:'Transport',amt:600,mode:'equal',shares:[['You',300],['Riya',300]],settle:{Riya:at(5,3,19)}},
 {ts:at(6,12,19,0),merchant:'BookMyShow',cat:'Buffer',amt:1500,mode:'equal',shares:[['You',500],['Arjun',500],['Meera',500]],settle:{Arjun:at(6,16,13),Meera:at(6,20,20)},goalCover:'goa'},
 {ts:at(7,2,21,0),merchant:'Pizza Hut',cat:'Food',amt:1200,mode:'equal',shares:[['You',300],['Arjun',300],['Kabir',300],['Riya',300]],settle:{Arjun:at(7,3,10),Kabir:at(7,5,15),Riya:at(7,9,11)}},
 {ts:at(7,20,11,0),merchant:'BigBasket',cat:'Groceries',amt:900,mode:'equal',shares:[['You',450],['Meera',450]],settle:{Meera:at(7,29,17)}},
 {ts:at(8,9,21,0),merchant:'Swiggy',cat:'Food',amt:640,mode:'equal',shares:[['You',320],['Kabir',320]],settle:{Kabir:at(8,12,9)}},
 {ts:at(8,17,20,30),merchant:'Pizza Hut',cat:'Food',amt:1400,mode:'custom',shares:[['You',400],['Arjun',400],['Meera',360],['Kabir',240]]},
 {ts:at(8,20,22,15),merchant:'Uber',cat:'Transport',amt:320,mode:'equal',shares:[['You',160],['Riya',160]]},
 {ts:at(8,22,21,0),merchant:'Pizza Hut',cat:'Food',amt:960,pending:true}];
var PT_DATES=[[3,12],[3,26],[4,15],[5,6],[5,21],[6,4],[6,25],[7,14],[7,28],[8,11],[8,23]];
var POLICY={'3-Buffer':'ta','4-Stationery':'cat:Food','5-Transport':'cat:Food','6-Snacks':'ta','6-Buffer':'ta','7-Groceries':'cat:Transport','7-Snacks':'letgo','8-Snacks':'letgo'};

function catsWeights(){return Object.keys(ALLOT).map(function(c){return [c,ALLOT[c]/6800];});}
function splitBudget(total){var out=[],acc=0;catsWeights().forEach(function(w,i,a){var v=i===a.length-1?total-acc:Math.round(total*w[1]);acc+=v;if(v>0)out.push({ref:'budget:'+w[0],amt:v});});return out;}
function ruleSplit(amt,rule){rule=rule||{b:85};var b=Math.round(amt*rule.b/100),s=amt-b,g=Math.round(s*2/3);return splitBudget(b).concat([{ref:'goal:goa',amt:g},{ref:'goal:moto',amt:s-g}]).filter(function(x){return x.amt>0;});}

function seedLedger(cal){
 CAL=cal||CAL;SEQ=0;TX=[];IOUS=[];GOALS=JSON.parse(JSON.stringify(GOAL_SEED));
 var _k=0,spends=genSeed(SPEND_BASE).filter(function(t){return !(mOf(t.ts)===8&&!t.sub&&(_k++)%3===0);}).map(function(t){t.type='spend';return t;}).sort(function(a,b){return a.ts-b.ts;});
 var ev=[],p=newPools(),minTa=1e9;
 function E(ts,pri,fn){ev.push({ts:ts,pri:pri,fn:fn,k:ev.length});}
 function push(t){t.id=t.id||nid();TX.push(t);applyTx(p,t);if(p.ta<minTa)minTa=p.ta;return t;}
 function xfer(ts,src,dst,reason,extra){var amt=dst.reduce(function(a,x){return a+x.amt;},0);if(amt<=0)return null;var t={type:'transfer',ts:ts,amt:amt,src:src,dst:dst,reason:reason,source:'Manual',account:null};for(var k in extra)t[k]=extra[k];return push(t);}
 function income(ts,amt,ic,from,assign,extra){var t={type:'income',ts:ts,amt:amt,incomeCat:ic,from:from,source:'UPI',account:'nishad@oksbi'};for(var k in extra)t[k]=extra[k];push(t);
  if(assign&&assign.length)xfer(ts+60e3,[{ref:'to_assign',amt:assign.reduce(function(a,x){return a+x.amt;},0)}],assign,'assign',{incomeId:t.id,rule:extra&&extra.rule});return t;}
 /* opening */
 E(at(3,1,0,5),0,function(){push({type:'opening',ts:at(3,1,0,5),amt:6000,source:'Manual',account:null,merchant:'Opening balance'});
  xfer(at(3,1,0,6),[{ref:'to_assign',amt:1000}],[{ref:'goal:general',amt:1000}],'assign',{note:'Opening balance'});});
 /* allowance */
 for(var m=3;m<=8;m++)(function(m){E(at(m,1,9,0),1,function(){income(at(m,1,9,0),8000,'Allowance','Amma & Appa',splitBudget(6800).concat([{ref:'goal:goa',amt:400},{ref:'goal:moto',amt:600},{ref:'goal:general',amt:200}]),{recurringId:'allow',rule:'85/15'});});})(m);
 /* part-time */
 var Rp=mulberry32(99);
 PT_DATES.forEach(function(d,i){var last=i===PT_DATES.length-1,amt=last?1500:Math.round((600+Rp()*900)/50)*50;
  E(at(d[0],d[1],last?21:20,30),1,function(){income(at(d[0],d[1],last?21:20,30),amt,'Part-time','Café shift',last?null:ruleSplit(amt),last?{unassigned:1500}:{rule:'85/15'});});});
 E(at(5,14,10),1,function(){income(at(5,14,10),2000,'Gift','Birthday',[{ref:'goal:moto',amt:1000}]);});
 E(at(7,9,12),1,function(){income(at(7,9,12),1000,'Gift','Raksha Bandhan',[{ref:'goal:goa',amt:500}]);});
 E(at(6,18,16),1,function(){income(at(6,18,16),3000,'Freelance','Logo job',[{ref:'goal:moto',amt:1500},{ref:'goal:goa',amt:500}]);});
 E(at(6,8,11),1,function(){income(at(6,8,11),5000,'Scholarship','Merit scholarship',[{ref:'goal:moto',amt:3000}]);});
 E(at(7,11,15),1,function(){income(at(7,11,15),349,'Refund','Zepto',[{ref:'budget:Groceries',amt:349}]);});
 /* headphones goal */
 [[4,4,500],[5,2,1000],[6,1,1200],[6,20,800]].forEach(function(h){E(at(h[0],h[1],10),2,function(){xfer(at(h[0],h[1],10),[{ref:'to_assign',amt:h[2]}],[{ref:'goal:hp',amt:h[2]}],'assign');});});
 E(at(6,21,11),3,function(){xfer(at(6,21,11),[{ref:'goal:hp',amt:3500}],[{ref:'budget:Buffer',amt:3500}],'withdraw',{note:'Goal reached: Headphones'});
  push({type:'spend',ts:at(6,21,11,5),merchant:'Croma',cat:'Buffer',amt:3499,source:'UPI',account:'nishad@oksbi',payeeType:'merchant',funded:true,note:'Headphones (goal)'});});
 /* four June moves Savings -> Budget */
 [[5,5,300,'Transport'],[5,12,250,'Transport'],[5,19,300,'Food'],[5,26,null,'Transport']].forEach(function(mv){E(at(mv[0],mv[1],12),2,function(){var a=mv[2]==null?CAL.gen:mv[2];if(a>0)xfer(at(mv[0],mv[1],12),[{ref:'goal:general',amt:a}],[{ref:'budget:'+mv[3],amt:a}],'move');});});
 /* calibration moves on 1 Sep */
 E(at(8,1,10),2,function(){if(CAL.ta>0)xfer(at(8,1,10),[{ref:'to_assign',amt:CAL.ta}],[{ref:'goal:moto',amt:CAL.ta}],'assign',{note:'Kept money → Motorcycle'});
  if(CAL.goa>0)xfer(at(8,1,10,5),[{ref:'goal:goa',amt:CAL.goa}],[{ref:'goal:moto',amt:CAL.goa}],'move',{note:'Rebalanced goals'});
  if(CAL.goa<0)xfer(at(8,1,10,5),[{ref:'goal:moto',amt:-CAL.goa}],[{ref:'goal:goa',amt:-CAL.goa}],'move',{note:'Rebalanced goals'});});
 /* snack top-ups (calibrate the carried overspends) */
 E(at(7,31,21),5,function(){if(CAL.aug>0)push({type:'spend',ts:at(7,31,21),merchant:'RV Shop',cat:'Snacks',amt:CAL.aug,source:'UPI',account:'nishad@oksbi',payeeType:'merchant',note:'Birthday treats'});});
 E(at(8,21,21,30),5,function(){if(CAL.sep>0)push({type:'spend',ts:at(8,21,21,30),merchant:'Maggi Point',cat:'Snacks',amt:CAL.sep,source:'UPI',account:'nishad@ybl',payeeType:'merchant',note:'Late-night order'});});
 /* splits: spends join the normal spend stream (so cover look-ahead sees them) */
 SPLITS_SEED.forEach(function(sp){
  var t={type:'spend',ts:sp.ts,merchant:sp.merchant,cat:sp.cat,amt:sp.amt,source:'UPI',account:'nishad@oksbi',payeeType:'merchant',_sp:sp};
  if(sp.pending)t.split={status:'pending_setup',mode:'equal',shares:[]};
  else{t.split={status:sp.settle&&Object.keys(sp.settle).length===sp.shares.length-1?'settled':'open',mode:sp.mode,shares:sp.shares.map(function(s){return {person:s[0],amt:s[1]};})};
   t.split.shares.forEach(function(s){if(s.person==='You')return;var iou={id:nid('i'),person:s.person,amt:s.amt,spendTxnId:null,createdTs:sp.ts,_t:t};IOUS.push(iou);s.iouId=iou.id;
    if(sp.settle&&sp.settle[s.person]){var st=sp.settle[s.person];E(st,6,function(){settleIou(iou,st,push);});}});}
  if(sp.goalCover){t.funded=true;E(sp.ts-60e3,4,function(){var c=xfer(sp.ts-60e3,[{ref:'goal:'+sp.goalCover,amt:sp.amt}],[{ref:'budget:'+sp.cat,amt:sp.amt}],'cover',{note:'Covered '+sp.merchant});t.coveredBy=[{from:'goal:'+sp.goalCover,amt:sp.amt}];t._cv=c;});}
  spends.push(t);});
 spends.sort(function(a,b){return a.ts-b.ts;});
 /* uncategorised UPI spend today */
 E(at(8,24,13,10),5,function(){push({type:'spend',ts:at(8,24,13,10),merchant:'PAYTM*QR7731',cat:null,amt:85,source:'UPI',account:'nishad@ybl',payeeType:'merchant'});});
 /* month-end sweeps + carries */
 for(var mm=3;mm<=7;mm++)(function(m){E(monthEnd(m)-5*60e3,8,function(){
  var parts=[];Object.keys(p.b).forEach(function(c){if(p.b[c]>0.5)parts.push({ref:'budget:'+c,amt:Math.round(p.b[c]*100)/100});});
  var tot=parts.reduce(function(a,x){return a+x.amt;},0);
  if(tot>0){if(m<=4)xfer(monthEnd(m)-5*60e3,parts,[{ref:'goal:goa',amt:tot}],'sweep',{auto:true,period:MON[m]});
   else{xfer(monthEnd(m)-5*60e3,parts,[{ref:'to_assign',amt:tot}],'sweep',{auto:false,period:MON[m],savedFromBudget:true});
    var asg=m<7?Math.round(tot*.5):Math.max(0,Math.round(tot-Math.max(0,-CAL.ta)));
    xfer(monthEnd(m)+10*3600e3,[{ref:'to_assign',amt:asg}],[{ref:'goal:moto',amt:asg}],'assign',{note:'Assigned '+MON[m]+' sweep',sweepOf:MON[m]});}}
  Object.keys(p.b).forEach(function(c){if(p.b[c]<-0.5)push({type:'carry',ts:monthEnd(m)+60e3,cat:c,amt:Math.round(-p.b[c]),fromPeriod:MON[m],toPeriod:MON[m+1],source:'Manual',account:null});});
 });})(mm);
 spends.forEach(function(t){E(t.ts,5,function(){push(t);if(t._cv)t._cv.spendId=t.id;IOUS.forEach(function(i){if(i._t===t){i.spendTxnId=t.id;}});});});
 /* walk: covers are decided at the moment a spend would overdraw its category */
 ev.sort(function(a,b){return a.ts-b.ts||a.pri-b.pri||a.k-b.k;});
 var covered={},covers=0;
 var origPush=push;
 push=function(t){
  if(t.type==='spend'&&t.cat&&!t.funded){var key=mOf(t.ts)+'-'+t.cat,left=p.b[t.cat]||0,pol=POLICY[key]||'ta';
   if(t.amt>left+.5&&pol!=='letgo'&&!covered[key]){
    var ahead=0;spendsAhead(t,function(x){ahead+=x.amt;});
    var need=Math.round(t.amt-Math.max(0,left)+ahead);covered[key]=1;covers++;var src=[];
    if(pol.indexOf('cat:')===0){var oc=pol.slice(4),oa=0;spendsAheadCat(t,oc,function(x){oa+=x.amt;});var can=Math.max(0,Math.floor((p.b[oc]||0)-oa-50));var take=Math.min(need,can);if(take>0)src.push({ref:'budget:'+oc,amt:take});if(need-take>0)src.push({ref:'to_assign',amt:need-take});}
    else src.push({ref:'to_assign',amt:need});
    var cv=xfer(t.ts-60e3,src,[{ref:'budget:'+t.cat,amt:need}],'cover',{note:'Covered '+t.cat+' overspend'});
    t.coveredBy=src.map(function(s){return {from:s.ref,amt:s.amt};});t.id=nid();cv.spendId=t.id;}}
  return origPush(t);};
 function spendsAhead(t,f){var m=mOf(t.ts);spends.forEach(function(x){if(x!==t&&!x.funded&&x.cat===t.cat&&x.ts>t.ts&&mOf(x.ts)===m)f(x);});}
 function spendsAheadCat(t,c,f){var m=mOf(t.ts);spends.forEach(function(x){if(x.cat===c&&x.ts>t.ts&&mOf(x.ts)===m)f(x);});}
 ev.forEach(function(e){e.fn();});
 return {minTa:minTa,covers:covers,p:p};}

/* settle one IOU: money returns where the spend was paid from (pro-rata), or To assign if that period has closed */
function settleIou(iou,ts,pushFn,source){
 var sp=txById(iou.spendTxnId),rets=[],goalAmt=0;
 if(sp&&sp.coveredBy)sp.coveredBy.forEach(function(c){if(c.from.indexOf('goal:')===0){var a=Math.round(iou.amt*c.amt/sp.amt);if(a>0){rets.push({ref:c.from,amt:a});goalAmt+=a;}}});
 var rest=iou.amt-goalAmt;
 if(rest>0){var same=sp&&mOf(sp.ts)===mOf(ts)&&sp.cat;rets.push({ref:same?'budget:'+sp.cat:'to_assign',amt:rest});}
 var t={type:'settle',ts:ts,amt:iou.amt,from:iou.person,iouId:iou.id,returns:rets,source:source||'UPI',account:source==='Manual'?null:'nishad@oksbi',merchant:iou.person};
 (pushFn||function(x){x.id=nid();TX.push(x);})(t);iou.settledTs=ts;iou.settleTxnId=t.id;return t;}
function txById(id){for(var i=0;i<TX.length;i++)if(TX[i].id===id)return TX[i];return null;}

var SPEND_BASE={};Object.keys(ALLOT).forEach(function(k){SPEND_BASE[k]=Math.round(ALLOT[k]*1.2);});
var TARGET={ta:1820,goa:5120,gen:760,aug:-240,sep:-240};
function calibrate(){
 var cal={ta:0,goa:0,gen:0,aug:0,sep:0},r;
 for(var it=0;it<5;it++){
  r=seedLedger(cal);
  var augEnd=0;TX.forEach(function(t){if(t.type==='carry'&&t.cat==='Snacks'&&t.fromPeriod==='Aug')augEnd=-t.amt;});
  var pAug=poolsAt(monthEnd(7)-6*60e3);augEnd=pAug.b.Snacks||0;
  var pNow=poolsAt();
  cal.aug=Math.max(0,Math.round(cal.aug+(augEnd-TARGET.aug)));
  cal.sep=Math.max(0,Math.round(cal.sep+((pNow.b.Snacks||0)-TARGET.sep)));
  cal.gen=Math.max(0,Math.round(cal.gen+((pNow.g.general||0)-TARGET.gen)));
  cal.ta=Math.round(cal.ta+(pNow.ta-TARGET.ta));
  cal.goa=Math.round(cal.goa+((pNow.g.goa||0)-TARGET.goa));}
 r=seedLedger(cal);return r;}
