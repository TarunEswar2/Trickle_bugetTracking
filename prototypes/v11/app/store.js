/* ===== Trickle v11 — money store + ledger checks (one store; screens never compute their own totals) =====
   Model: Money in -> Savings + Spending money; Spending money = Subscriptions (set aside) + Jars.
   Reuses the v7/v8 ledger idea (store + validator + splits/owed + subscriptions); v7 unallocated buckets removed. */
var CATS=['Food','Travel','Study','Fun','Other'];
var MIX={Hostel:{Food:.45,Travel:.15,Study:.10,Fun:.20,Other:.10},'Day scholar':{Food:.30,Travel:.30,Study:.10,Fun:.20,Other:.10},
 Renting:{Food:.40,Travel:.15,Study:.10,Fun:.20,Other:.15},Earning:{Food:.35,Travel:.20,Study:.10,Fun:.25,Other:.10}};
var MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
var DOW=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
function r100(x){return Math.round(x/100)*100;}
function fmt(n){return '₹'+Math.round(n).toLocaleString('en-IN');}
var _id=1;function nid(){return 'x'+(_id++);}

function emptyCats(){var c={};CATS.forEach(function(k){c[k]={budget:0,moveIn:0,moveOut:0,spent:0,back:0};});return c;}
function newLedger(){return {month:8,day:1,monthLen:30,type:'Hostel',incomes:[],savingsSplit:0,budgetTotal:0,subs:[],cats:emptyCats(),
 pays:[],moves:[],owed:[],goals:[],bank:0,fromSavings:0,lighter:0,nextLighter:0,history:[],keepLeftover:false,lastSaveRatio:0.1556,log:[]};}
var L=newLedger();

/* ---------- derived reads ---------- */
function left(c){var k=L.cats[c];return k.budget+k.moveIn-k.moveOut-k.spent+k.back;}
function catsTotal(){return CATS.reduce(function(s,c){return s+L.cats[c].budget;},0);}
function subsTotal(){return L.subs.reduce(function(s,x){return s+x.amt;},0);}
function subsSetAside(){return L.subs.filter(function(s){return s.state==='reserved';}).reduce(function(a,s){return a+s.amt;},0);}
function incomeIn(){return L.incomes.reduce(function(s,i){return s+i.amt;},0);}
function spentAll(){return CATS.reduce(function(s,c){return s+L.cats[c].spent-L.cats[c].back;},0);}
function leftAll(){return CATS.reduce(function(s,c){return s+left(c);},0);}
function savingsTotal(){return L.bank+L.savingsSplit-L.fromSavings;}
function goalSaved(){return L.goals.reduce(function(s,g){return s+g.saved;},0);}
function mostLeft(except){var b=null;CATS.forEach(function(c){if(c!==except&&(b===null||left(c)>left(b)))b=c;});return b;}
function owedOpen(){return L.owed.reduce(function(s,o){return s+o.amt-o.back;},0);}
function paceWord(){var budget=catsTotal();if(!budget)return 'Calm';var sp=CATS.reduce(function(s,c){return s+L.cats[c].spent-L.cats[c].back;},0);
 var r=(sp/budget)/Math.max(.05,L.day/L.monthLen);return r<0.9?'Calm':r<=1.1?'Steady':'Slow down a little';}
function weekSpend(offset){var hi=L.day-offset*7,lo=hi-7;return L.pays.filter(function(p){return p.day>lo&&p.day<=hi;}).reduce(function(s,p){return s+p.amt;},0);}
function repeatCount(payee,day){return L.pays.filter(function(p){return p.payee===payee&&p.day>day-7&&p.day<=day;}).length;}
function monthName(){return MONTHS[L.month];}
function dowOf(day){return DOW[(day+0)%7];} /* Sep 2026: the 1st is a Tuesday -> index offset */
function dueWord(d){if(d<L.day)return 'earlier this month';if(d===L.day)return 'today';if(d===L.day+1)return 'tomorrow';if(d-L.day<7)return DOW[(d)%7];return 'later this month';}

/* ---------- setup (Phase 5: A + F + E hybrid) ---------- */
function planCats(spendable,type,lighter){var mix=MIX[type]||MIX.Hostel,out={},sum=0;
 CATS.forEach(function(c){if(c==='Other')return;out[c]=r100(spendable*mix[c]);sum+=out[c];});out.Other=spendable-sum;
 if(lighter){var t=Math.min(lighter,out.Other);out.Other-=t;}return out;}
function setupMonth(o){ /* o:{income,type,save,subs} */
 L=newLedger();L.type=o.type;L.day=o.day||1;L.bank=o.bank||0;
 L.subs=(o.subs||[]).map(function(s){return {id:nid(),name:s.name,amt:s.amt,due:s.due,state:'reserved'};});
 receiveIncome(o.income,'Pocket money from home',o.save);return L;}
function receiveIncome(amt,src,saveOverride){
 var first=!L.incomes.length,save;
 if(saveOverride!=null)save=saveOverride;else save=Math.min(amt,r100(amt*L.lastSaveRatio));
 var budget=amt-save,rec={id:nid(),amt:amt,src:src,save:save,budget:budget,catAdds:{}};
 if(first){var subs=subsTotal();var spend=budget-subs;var plan=planCats(spend,L.type,L.nextLighter);
  var trimmed=spend-CATS.reduce(function(s,c){return s+plan[c];},0);
  CATS.forEach(function(c){L.cats[c].budget+=plan[c];rec.catAdds[c]=plan[c];});
  if(trimmed){L.cats.Other.budget+=trimmed;rec.catAdds.Other+=trimmed;L.cats.Other.spent+=trimmed;L.pays.push({id:nid(),payee:'Started lighter',amt:trimmed,cat:'Other',day:L.day,item:'start'});L.nextLighter=0;}
 } else {var base=catsTotal()||1,sum=0;CATS.forEach(function(c){if(c==='Other')return;var a=r100(budget*L.cats[c].budget/base);a=Math.min(a,budget-sum);rec.catAdds[c]=a;sum+=a;L.cats[c].budget+=a;});
  rec.catAdds.Other=budget-sum;L.cats.Other.budget+=budget-sum;}
 L.savingsSplit+=save;L.budgetTotal+=budget;L.incomes.push(rec);if(amt>0)L.lastSaveRatio=save/amt;return rec;}
function undoIncome(id){var i=L.incomes.findIndex(function(x){return x.id===id;});if(i<0)return false;var r=L.incomes[i];
 if(savingsTotal()-r.save<goalSaved())return false;var ok=CATS.every(function(c){return left(c)>=(r.catAdds[c]||0);});if(!ok)return false;
 CATS.forEach(function(c){L.cats[c].budget-=r.catAdds[c]||0;});L.savingsSplit-=r.save;L.budgetTotal-=r.budget;L.incomes.splice(i,1);return true;}

/* ---------- paying ---------- */
function canPay(cat,amt){return left(cat)>=amt;}
function pay(o){var p={id:nid(),payee:o.payee,item:o.item||o.payee,amt:o.amt,cat:o.cat,day:L.day,upi:!!o.upi,vpa:o.vpa||''};L.cats[o.cat].spent+=o.amt;L.pays.push(p);return p;}
function undoPay(id){var i=L.pays.findIndex(function(p){return p.id===id;});if(i<0)return;var p=L.pays[i];
 L.owed=L.owed.filter(function(o){if(o.pay===id){L.cats[o.cat].back-=o.back;return false;}return true;});
 L.cats[p.cat].spent-=p.amt;L.pays.splice(i,1);}
function moveTiles(from,to,amt){amt=Math.min(amt,left(from));if(amt<=0||from===to)return 0;L.cats[from].moveOut+=amt;L.cats[to].moveIn+=amt;L.moves.push({from:from,to:to,amt:amt});return amt;}
function startLighter(cat,amt){L.cats[cat].moveIn+=amt;L.nextLighter+=amt;L.lighter+=amt;}
function useSavings(cat,amt){amt=Math.min(amt,Math.max(0,savingsTotal()-goalSaved()));L.cats[cat].moveIn+=amt;L.fromSavings+=amt;}
/* splits: friends' share sits outside spending money; paying back returns it to the jar it came from */
function splitPay(payId,friends){var p=L.pays.find(function(x){return x.id===payId;});if(!p)return;var n=friends.length+1,share=Math.floor(p.amt/n);
 friends.forEach(function(f){L.owed.push({id:nid(),pay:payId,friend:f,amt:share,cat:p.cat,back:0});});p.split=friends.length;}
function payBack(owedId){var o=L.owed.find(function(x){return x.id===owedId;});if(!o||o.back>=o.amt)return 0;var a=o.amt-o.back;o.back=o.amt;L.cats[o.cat].back+=a;return a;}

/* ---------- subscriptions ---------- */
function subDue(id){var s=L.subs.find(function(x){return x.id===id;});if(s&&s.state==='reserved'){s.state='spent';s.paidDay=L.day;}return s;}
function subPriceChange(id,newAmt,fromCat){var s=L.subs.find(function(x){return x.id===id;});var d=newAmt-s.amt;
 /* spending money total stays the same: the difference moves out of a jar's budget into the subscription */
 L.cats[fromCat].budget-=d;s.was=s.amt;s.amt=newAmt;return d;}
function addSub(name,amt,due){var from=mostLeft();L.cats[from].budget-=amt;var s={id:nid(),name:name,amt:amt,due:due,state:due<L.day?'spent':'reserved'};if(s.state==='spent')s.paidDay=due;L.subs.push(s);return {sub:s,from:from};}
function stopSub(id){var i=L.subs.findIndex(function(x){return x.id===id;});var s=L.subs[i];if(s.state==='reserved'){L.cats.Other.budget+=s.amt;L.subs.splice(i,1);return true;}return false;}

/* ---------- goals ---------- */
function goalAdd(goalId,amt){var g=L.goals.find(function(x){return x.id===goalId;});var free=savingsTotal()-goalSaved();amt=Math.min(amt,free,g.target-g.saved);
 var before=Math.floor(g.saved/(g.target/10));g.saved+=amt;var after=Math.floor(g.saved/(g.target/10));return {amt:amt,row:after>before?after:0};}

/* ---------- month end: left over goes to savings (default), fresh start ---------- */
function closeMonth(){L.subs.forEach(function(s){if(s.state==='reserved'){s.state='spent';s.paidDay=L.monthLen;}});
 var lo=leftAll(),saved=L.savingsSplit+(L.keepLeftover?0:lo);
 var rec={month:monthName(),income:incomeIn(),saved:saved,leftover:lo,kept:L.keepLeftover};
 var keep=L.keepLeftover?lo:0;var prev=L;
 var nl=newLedger();nl.history=prev.history.concat([rec]);nl.bank=prev.bank+prev.savingsSplit-prev.fromSavings+(prev.keepLeftover?0:lo);
 nl.month=(prev.month+1)%12;nl.type=prev.type;nl.goals=prev.goals;nl.keepLeftover=prev.keepLeftover;nl.lastSaveRatio=prev.lastSaveRatio;nl.nextLighter=prev.nextLighter;
 nl.subs=prev.subs.map(function(s){return {id:nid(),name:s.name,amt:s.amt,due:s.due,state:'reserved'};});nl.owed=prev.owed.filter(function(o){return o.back<o.amt;});
 nl.carryIn=keep;nl.prevCats={};CATS.forEach(function(c){nl.prevCats[c]=prev.cats[c].budget;});
 L=nl;return rec;}
/* month 2+: "same as last month" (approach E) — used when income arrives after a fresh start */
function receiveMonthIncome(amt){var save=r100(amt*L.lastSaveRatio);var rec=receiveIncome(amt,'Pocket money from home',save);
 if(L.carryIn){L.cats.Other.budget+=0;} return rec;}

/* ---------- ledger checks (1-8 from Phase 5) ---------- */
function checkLedger(){var e=[];function t(ok,m){if(!ok)e.push(m);}
 var inc=incomeIn();
 t(inc===L.savingsSplit+L.budgetTotal,'1 income = savings + spending money ('+inc+' vs '+(L.savingsSplit+L.budgetTotal)+')');
 /* before the month's money arrives, subscriptions wait and nothing is set aside yet */
 if(L.incomes.length)t(L.budgetTotal===subsTotal()+catsTotal(),'2 spending money = subscriptions + jars ('+L.budgetTotal+' vs '+(subsTotal()+catsTotal())+')');
 CATS.forEach(function(c){var k=L.cats[c];t(left(c)>=0,'3 '+c+' left >= 0 ('+left(c)+')');
  var sp=L.pays.filter(function(p){return p.cat===c;}).reduce(function(s,p){return s+p.amt;},0);t(sp===k.spent,'3 '+c+' spent matches payments');});
 var mi=CATS.reduce(function(s,c){return s+L.cats[c].moveIn;},0),mo=CATS.reduce(function(s,c){return s+L.cats[c].moveOut;},0);
 t(mi-mo===L.lighter+L.fromSavings,'4 moves balance ('+(mi-mo)+')');
 L.subs.forEach(function(s){t(s.state==='reserved'||s.state==='spent','5 '+s.name+' state');});
 var backs=CATS.reduce(function(s,c){return s+L.cats[c].back;},0),ob=L.owed.reduce(function(s,o){return s+o.back;},0);
 t(backs===ob,'6 paid-back returns to its jar');L.owed.forEach(function(o){t(o.back<=o.amt&&o.back>=0,'6 owed range');});
 t(goalSaved()<=savingsTotal(),'goals within savings');t(savingsTotal()>=0,'savings >= 0');
 var nums=[inc,L.savingsSplit,L.budgetTotal];L.pays.forEach(function(p){nums.push(p.amt);});L.subs.forEach(function(s){nums.push(s.amt);});
 CATS.forEach(function(c){var k=L.cats[c];nums.push(k.budget,k.spent,k.moveIn,k.moveOut,k.back);});
 nums.forEach(function(n){t(Number.isInteger(n)&&n>=0,'8 whole rupees ('+n+')');});
 return e;}

/* ---------- seed: Tarun, hostel, ₹9,000, 12 September ---------- */
function seedDemo(){setupMonth({income:9000,type:'Hostel',save:1400,day:12,bank:4000,
  subs:[{name:'Spotify',amt:119,due:18},{name:'Google One',amt:130,due:5},{name:'Coursera',amt:399,due:24}]});
 L.subs[1].state='spent';L.subs[1].paidDay=5;
 L.goals=[{id:'g1',name:'Goa trip',target:8000,saved:4160}];
 var P=[[1,'Mess extras','Food',240],[2,'Auto','Travel',60],[2,'Swiggy','Food',350],[3,'Stationery','Study',150],[4,'Movie','Fun',300],[5,'Metro card','Travel',200],
  [6,'Chai Point','Food',20],[6,'Canteen','Food',90],[7,'Blinkit','Other',200],[8,'Auto','Travel',60],[8,'Chai Point','Food',20],[9,'Zomato','Food',310],
  [9,'Bowling','Fun',300],[10,'Chai Point','Food',20],[10,'Auto','Travel',100],[4,'Canteen','Food',230],[11,'Chai Point','Food',20]];
 P.forEach(function(x){L.day=x[0];pay({payee:x[1],item:x[1]==='Chai Point'?'chai':x[1].toLowerCase(),amt:x[3],cat:x[2],upi:true});});
 L.day=12;
 /* earlier this month: a dinner split with Rahul, Rahul hasn't paid back yet */
 var d=L.pays.find(function(p){return p.payee==='Zomato';});splitPay(d.id,['Rahul']);
 return L;}
