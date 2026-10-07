/* ===== Trickle mockup engine: profiles, seeded history, ledger actions ===== */
const DAY=86400000;
function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const CATLIB={
 'Food':{m:['Canteen','Mess','Biryani House','Maggi Point'],h:[12,13,14,20],avg:70},
 'Travel':{m:['Metro Card','Auto','Uber','Bus Pass'],h:[8,9,17,18],avg:55},
 'Phone & data':{m:['Jio Recharge','Airtel'],h:[11,19],avg:240},
 'College & study':{m:['Xerox Shop','Stationery Mart','Print Hub'],h:[10,11,15],avg:70},
 'Personal care':{m:['Salon','Pharmacy'],h:[11,17],avg:150},
 'Other basics':{m:['General Store'],h:[18],avg:90},
 'Chai & coffee':{m:['Sharma Tea Stall','Cafe Coffee Corner'],h:[8,11,16,17],avg:25},
 'Snacks':{m:['Snack Corner','Bakery'],h:[16,17,21],avg:40},
 'Outings':{m:['Campus Cafe','PVR Cinemas','City Mall'],h:[19,20,21],avg:240},
 'Groceries':{m:['Fresh Mart','BigBasket'],h:[10,18],avg:260},
 'Eating out':{m:['Pizza Hub','Dosa Plaza','Dragon Wok'],h:[13,20,21],avg:240},
 'Food delivery':{m:['Swiggy','Zomato'],h:[21,22,23],avg:230},
 'Petrol':{m:['HP Petrol Pump'],h:[8,18],avg:250},
 'Bike upkeep':{m:['Bike Garage'],h:[11],avg:180},
 'Wi-Fi & data':{m:['Hathway'],h:[10],avg:120},
 'Laundry':{m:['Wash Express'],h:[9],avg:70},
 'Movies':{m:['PVR Cinemas','BookMyShow'],h:[19,20],avg:250},
 'Games':{m:['Steam Wallet','Google Play'],h:[22],avg:100},
 'Gadgets':{m:['Croma','Amazon'],h:[16],avg:400},
 'Clothes':{m:['Westside','Myntra'],h:[17],avg:450}
};
const COLORS=['#5AA9FF','#CDB6FF','#FF7EB6','#F2D65B','#4FD1E6'],REST='#F6B27C',BUFC='#9AA4B0',FIXC='#8D7A66',SPEND='#F4A261',SAVE='#62DCB4',AMBER='#EDB458',GG=['#62DCB4','#3FAE8C','#9BE8CF'];
const catColor=i=>i<5?COLORS[i]:REST;
const PROFILES={
 V:{key:'V',name:'Vaishak',blurb:'₹3k a month · 2 categories · tracks by hand',mode:'manual',income:3000,savingsShare:300,lasts:4.3,bal:2100,weeks:12,
   cats:[['Food',400],['Travel',150]],W:600,
   bills:[],goals:[['Phone',6000,2400,20,6]],free:0},
 G:{key:'G',name:'Gautham',blurb:'₹4k a month · week 1, nothing tracked yet',mode:'upi',income:4000,savingsShare:400,lasts:4.3,bal:3500,weeks:0,
   cats:[['Food',300],['Travel',150],['Phone & data',60],['College & study',100],['Snacks',60]],W:750,
   bills:[],goals:[['Headphones',3000,0,12,0]],free:0},
 T:{key:'T',name:'Tarun',blurb:'₹6k a month · 7 categories · month 6',mode:'upi',income:6000,savingsShare:600,lasts:4.3,bal:3900,weeks:12,
   cats:[['Food',300],['Travel',120],['Chai & coffee',140],['Outings',150],['Phone & data',100],['College & study',100],['Snacks',60]],W:1100,
   bills:[['Spotify',119,'month',5]],goals:[['Concert',5000,1800,10,5]],free:0},
 Y:{key:'Y',name:'Yash',blurb:'₹9k a month · 7 categories · 2 goals',mode:'upi',income:9000,savingsShare:1800,lasts:4.3,bal:6200,weeks:12,
   cats:[['Food',450],['Travel',200],['Phone & data',100],['College & study',100],['Chai & coffee',150],['Snacks',150],['Outings',300]],W:1700,
   bills:[['Spotify',119,'month',5],['Netflix',199,'month',9]],goals:[['Laptop',30000,10500,26,9],['Trip',6000,4200,12,5]],free:0},
 N:{key:'N',name:'Nishad',blurb:'₹25k a month · 12 categories · big bills',mode:'upi',income:25000,savingsShare:5000,lasts:4.3,bal:17800,weeks:12,
   cats:[['Food',700],['Travel',350],['Phone & data',150],['College & study',300],['Chai & coffee',250],['Snacks',200],['Groceries',300],['Eating out',350],['Movies',150],['Gadgets',200],['Clothes',150],['Outings',250]],W:4650,
   bills:[['Hostel fee',4000,'month',1],['Spotify',119,'month',5],['Gym',800,'month',3]],goals:[['MacBook',90000,30000,24,8],['Europe trip',60000,12000,18,6]],free:600},
 H:{key:'H',name:'Harsh',blurb:'₹12k a month · 18 categories · 3 goals',mode:'upi',income:12000,savingsShare:3000,lasts:4.3,bal:7400,weeks:12,
   cats:[['Food',300],['Travel',150],['Phone & data',90],['College & study',100],['Personal care',60],['Other basics',50],['Chai & coffee',100],['Snacks',120],['Groceries',160],['Eating out',150],['Food delivery',100],['Petrol',120],['Bike upkeep',60],['Wi-Fi & data',60],['Laundry',50],['Movies',70],['Games',50],['Outings',80]],W:2100,
   bills:[['Wi-Fi',399,'month',12],['Prime',179,'month',20]],goals:[['Bike',60000,12000,40,8],['Laptop',40000,18000,38,7],['Trip',10000,6000,0,6]],free:0}
};
const GOAL_STARTMONTHS={};
const weeksPer=4.3;
const r5=x=>Math.round(x/5)*5;
const startOfWeek=d=>{const x=new Date(d);x.setHours(0,0,0,0);const k=(x.getDay()+6)%7;return new Date(x.getTime()-k*DAY)};
const NOW0=new Date(2026,9,2,17,30,0); // Fri 2 Oct 2026, 5:30 pm
function billWeekly(b){if(b.paused)return 0;const per=b.every==='week'?1:b.every==='month'?weeksPer:b.every==='3 months'?13:52;return b.amt/per}
function nextDueAfter(b){const d=new Date(b.nextDue);if(b.every==='week')return new Date(d.getTime()+7*DAY);if(b.every==='3 months')return new Date(d.getFullYear(),d.getMonth()+3,d.getDate());if(b.every==='year')return new Date(d.getFullYear()+1,d.getMonth(),d.getDate());return new Date(d.getFullYear(),d.getMonth()+1,b.dueDay||d.getDate())}
function newState(key){
 const P=PROFILES[key],rnd=mulberry(key.charCodeAt(0)*977+13);let id=1;const S={key,p:P,now:new Date(NOW0),idc:1,
  cats:P.cats.map((c,i)=>({id:'c'+i,name:c[0],amt:c[1],left:c[1],order:i})),
  bills:P.bills.map((b,i)=>({id:'b'+i,name:b[0],amt:b[1],every:b[2],dueDay:b[3],reserve:Math.round(billWeekly({amt:b[1],every:b[2]})*3),nextDue:null,paid:[]})),
  goals:P.goals.map((g,i)=>({id:'g'+i,name:g[0],target:g[1],saved:g[2],byMonths:g[3],createdMonthsAgo:g[4],state:'active',hist:[],celebrated:false})),
  free:P.free,txns:[],unsorted:[],credits:[],pending:[],log:[],celebrate:[],toasts:[],flags:{bankDecline:false,bankSlow:false,lowBalance:false,linkLost:false},
  weekEndDone:false,moneyIn:[],memory:{},lastSplit:null,history:[]};
 S.fixedWeekly=()=>S.bills.reduce((a,b)=>a+billWeekly(b),0);
 S.W=P.W;S.fixedW=Math.round(S.fixedWeekly());S.flexW=S.W-S.fixedW;S.bufAmt=S.flexW-S.cats.reduce((a,c)=>a+c.amt,0);S.bufLeft=S.bufAmt;
 // bills next due
 S.bills.forEach((b,bi)=>{if(P.bills[bi]&&P.bills[bi][4]){b.nextDue=new Date(P.bills[bi][4]);return}const d=new Date(S.now);let t=new Date(d.getFullYear(),d.getMonth(),b.dueDay);if(t<=S.now)t=new Date(d.getFullYear(),d.getMonth()+1,b.dueDay);b.nextDue=t});
 // seed transactions
 const ws=startOfWeek(S.now),elapsed=((S.now-ws)/DAY)/7;
 const weeks=P.weeks;const hist=[];
 for(let w=weeks;w>=0;w--){const wk=new Date(ws.getTime()-w*DAY*7);const frac=w===0?elapsed:1;
  S.cats.forEach(c=>{const lib=CATLIB[c.name]||{m:[c.name+' Store'],h:[12,18],avg:80};
   const target=c.amt*(w===0?rnd()*.35+.6:rnd()*.45+.55)*frac*(w===0?1.1:1);const spend=Math.min(c.amt*1.0,target);
   let n=Math.max(1,Math.round(spend/lib.avg));if(c.amt<lib.avg*.8)n=rnd()<c.amt/lib.avg?1:0;let acc=0;const list=[];
   for(let i=0;i<n;i++){let a=r5(Math.max(5,lib.avg*(.6+rnd()*.8)));list.push(a)}
   const sum=list.reduce((x,y)=>x+y,0)||1;const sc=spend/sum;
   list.forEach(a0=>{const a=Math.max(5,r5(a0*sc));const day=Math.floor(rnd()*7*frac);const dd=new Date(wk.getTime()+day*DAY);const hr=lib.h[Math.floor(rnd()*lib.h.length)];dd.setHours(hr,Math.floor(rnd()*60));if(dd>S.now)return;
    S.txns.push({id:'t'+(id++),t:dd.getTime(),payee:lib.m[Math.floor(rnd()*lib.m.length)],amt:a,kind:'cat',ref:c.id,via:'detected',src:null,week:w});
    if(w===0)c.left-=a})});
  // bills
  S.bills.forEach(b=>{if(w>0&&w%4===0){const dd=new Date(wk.getTime()+3*DAY);dd.setHours(10);S.txns.push({id:'t'+(id++),t:dd.getTime(),payee:b.name,amt:b.amt,kind:'fixed',ref:b.id,via:'detected',src:null,week:w});b.paid.push(dd.getTime())}})
 }
 S.cats.forEach(c=>{c.left=Math.max(0,c.left)});
 S.txns.sort((a,b)=>b.t-a.t);S.idc=id+1;
 // goal histories: 12 months of additions (+) and takeouts (-)
 S.goals.forEach((g,i)=>{const r=mulberry(i*31+key.charCodeAt(0));const m=Math.min(12,g.createdMonthsAgo||0);const base=Math.round((g.saved/Math.max(1,m))/10)*10;g.hist=[];for(let k=0;k<12;k++){if(k<12-m){g.hist.push(0);continue}let v=base*(.5+r()*1.2);if(r()<.12)v=-base*(.2+r()*.4);g.hist.push(Math.round(v/10)*10)}});
 S.cats.sort((a,b)=>b.amt-a.amt);S.cats.forEach((c,i)=>c.order=i);
 if(P.fresh){S.txns=[];S.bills.forEach(b=>b.paid=[])}
 /* v16: one weekly allowance. Categories are tags, not pots; limits are optional and per category or per shop */
 S.wallet=true;S.limits=[];S.limNo={};S.cats.forEach(c=>{c.amt=0;c.full=0;c.left=0});S.bufAmt=S.flexW;S.bufFull=S.flexW;S.bufLeft=P.fresh?S.flexW:Math.max(0,S.flexW-spentThisWeek(S));
 const byName=n=>(S.cats.find(c=>c.name===n)||{}).id;const L=(scope,ref,kind,cap)=>{if(ref)S.limits.push({id:'l'+(S.idc++),scope,ref,kind,cap})};
 if(key==='T')L('cat',byName('Chai & coffee'),'amt',150);if(key==='Y')L('shop','Maggi Point','times',3);if(key==='N')L('cat',byName('Eating out'),'amt',400);
 return S}
/* ===== ledger helpers ===== */
const goalNeeded=(g)=>g.byMonths?Math.ceil(g.target/g.byMonths/10)*10:null;
function weekStart(S){return startOfWeek(S.now)}
function spentThisWeek(S){const ws=weekStart(S).getTime();return S.txns.filter(t=>t.t>=ws&&t.kind!=='fixed'&&t.kind!=='oneoff').reduce((a,t)=>a+t.amt,0)}
function flexLeft(S){return S.cats.reduce((a,c)=>a+c.left,0)+S.bufLeft}
function savedTotal(S){return S.goals.filter(g=>g.state!=='done').reduce((a,g)=>a+g.saved,0)+S.free}
function logE(S,t){S.log.unshift({t:new Date(S.now),text:t})}
function toast(S,t){S.toasts.push(t)}
/* ===== the cascade (O-23, D-22) ===== */
function cascade(S,amt,target){ // target {type:'cat'|'fixed'|'goal',id}
 const res={amt,target:0,buffer:0,others:0,savings:0,unfunded:0,othersDetail:{},savingsDetail:{}};let rem=amt;
 const take=(obj,key,x)=>{const t=Math.min(x,obj[key]);obj[key]-=t;return t};
 if(target.type==='cat'){const c=S.cats.find(x=>x.id===target.id);const t=take(c,'left',rem);res.target=t;rem-=t}
 else if(target.type==='fixed'){const b=S.bills.find(x=>x.id===target.id);const t=take(b,'reserve',rem);res.target=t;rem-=t}
 else if(target.type==='goal'){const g=S.goals.find(x=>x.id===target.id);const t=take(g,'saved',rem);res.target=t;rem-=t}
 else if(target.type==='buffer'){const t=take(S,'bufLeft',rem);res.target=t;rem-=t}
 else if(target.type==='free'){const t=take(S,'free',rem);res.target=t;rem-=t}
 else if(target.type==='unsorted'){const t=take(S,'bufLeft',rem);res.target=0;res.buffer=t;rem-=t;if(rem>0){/* continue cascade below */}}
 if(rem>0&&target.type!=='unsorted'||(rem>0&&target.type==='unsorted')){const b=Math.min(rem,S.bufLeft);if(target.type!=='unsorted'){S.bufLeft-=b;res.buffer+=b;rem-=b}}
 if(rem>0){ // savings: free first, then goals in proportion
  const f=Math.min(rem,S.free);S.free-=f;rem-=f;res.savings+=f;if(f)res.savingsDetail.free=f;
  if(rem>0){const gs=S.goals.filter(g=>g.state!=='done'&&!(target.type==='goal'&&g.id===target.id)&&g.saved>0);const tot=gs.reduce((a,g)=>a+g.saved,0);
   if(tot>0){const need=Math.min(rem,tot);let given=0;gs.forEach((g,i)=>{let t=i===gs.length-1?need-given:Math.floor(need*g.saved/tot);t=Math.min(t,g.saved);g.saved-=t;given+=t;res.savingsDetail[g.id]=t});res.savings+=given;rem-=given}}
 }
 res.unfunded=rem;return res}
/* ===== actions ===== */
function reachedCheck(S){S.goals.forEach(g=>{if(g.state==='active'&&g.saved>=g.target&&g.target>0){g.state='reached';g.reachedOn=new Date(S.now);if(!g.celebrated){g.celebrated=true;S.celebrate.push(g.id)}}})}
function doPay(S,{amt,target,payee,paid}){ // target: {type,id}
 const res=cascade(S,amt,target);
 const t={id:'t'+(S.idc++),t:S.now.getTime(),payee:payee||'Payment',amt,kind:target.type==='buffer'?'cat':target.type,ref:target.id,via:paid?'manual':'trickle',src:res};S.txns.unshift(t);
 if(res.savings>0){S.touched=true;S.touchedAmt=(S.touchedAmt||0)+res.savings}reachedCheck(S);logE(S,`Paid ₹${amt} for ${labelOf(S,target)}${res.buffer||res.others||res.savings?` (buffer ₹${res.buffer}, others ₹${res.others}, savings ₹${res.savings})`:''}`);
 return {txn:t,res}}
function labelOf(S,t){if(t.type==='cat')return S.cats.find(c=>c.id===t.id)?.name;if(t.type==='goal')return S.goals.find(g=>g.id===t.id)?.name;if(t.type==='fixed')return S.bills.find(b=>b.id===t.id)?.name;if(t.type==='buffer')return 'Buffer';return 'Unsorted'}
function detectPayment(S,payee,amt){const mem=S.memory[payee];const t={id:'t'+(S.idc++),t:S.now.getTime(),payee,amt,kind:mem?'cat':'unsorted',ref:mem||null,via:'detected',src:null};
 if(mem){const r=cascade(S,amt,{type:'cat',id:mem});t.src=r}else{const r=cascade(S,amt,{type:'unsorted'});t.src=r;S.unsorted.push(t.id)}
 if(t.src&&t.src.savings>0)S.touched=true;S.txns.unshift(t);logE(S,mem?`Detected ₹${amt} at ${payee}, filed under ${labelOf(S,{type:'cat',id:mem})}`:`Detected ₹${amt} at ${payee}: needs a category (charged to buffer for now)`);return t}
function sortTxn(S,id,catId){const t=S.txns.find(x=>x.id===id);if(!t||t.kind!=='unsorted')return;
 // refund buffer charge, then charge category
 const ref=t.src||{};S.bufLeft=Math.min(S.bufAmt,S.bufLeft+(ref.buffer||0));
 t.kind='cat';t.ref=catId;t.src=cascade(S,t.amt,{type:'cat',id:catId});S.memory[t.payee]=catId;S.unsorted=S.unsorted.filter(x=>x!==id);logE(S,`Sorted ${t.payee} into ${labelOf(S,{type:'cat',id:catId})}`)}
function addCredit(S,from,amt){S.credits.push({id:'cr'+(S.idc++),t:S.now.getTime(),from,amt});logE(S,`A credit of ₹${amt} from ${from} arrived (waits in Income, unsorted)`)}
function moveMoney(S,from,to,amt){ // from {type:'goal'|'free'|'buffer'|'cat',id} to similar
 const give=()=>{if(from.type==='goal'){const g=S.goals.find(x=>x.id===from.id);const t=Math.min(amt,g.saved);g.saved-=t;g.hist[11]=(g.hist[11]||0)-t;return t}
  if(from.type==='free'){const t=Math.min(amt,S.free);S.free-=t;return t}
  if(from.type==='buffer'){const t=Math.min(amt,S.bufLeft);S.bufLeft-=t;return t}
  if(from.type==='cat'){const c=S.cats.find(x=>x.id===from.id);const t=Math.min(amt,c.left);c.left-=t;return t}return 0};
 const got=give();if(!got)return 0;
 if(to.type==='goal'){const g=S.goals.find(x=>x.id===to.id);g.saved+=got;g.hist[11]=(g.hist[11]||0)+got}
 else if(to.type==='free')S.free+=got;
 else if(to.type==='buffer'){S.bufLeft+=got}
 else if(to.type==='cat'){const c=S.cats.find(x=>x.id===to.id);c.left+=got}
 reachedCheck(S);logE(S,`Moved ₹${got} from ${labelOf2(S,from)} to ${labelOf2(S,to)}`);return got}
function labelOf2(S,t){if(t.type==='free')return 'free savings';if(t.type==='buffer')return 'the buffer';return labelOf(S,t)}
function addToCategory(S,catId,amt){const c=S.cats.find(x=>x.id===catId);c.left+=amt;S.bufAmt+=0;logE(S,`₹${amt} added back into ${c.name}`)}
function applyNewIncome(S,{amount,lasts,savings,cats,goalsShare}){ // cats: {id:amt}, goalsShare {id:amt/month}
 const budget=amount-savings;const wks=lasts;const wk=Math.round(budget/wks/5)*5;S.income={amount,lasts};
 S.W=wk;S.flexW=S.W-S.fixedW;const sum=Object.values(cats).reduce((a,b)=>a+b,0);S.cats.forEach(c=>{c.amt=cats[c.id]||0;c.left=c.amt});S.bufAmt=Math.max(0,S.flexW-sum);S.bufLeft=S.bufAmt;
 const per=Object.keys(goalsShare).length?goalsShare:{};let given=0;Object.keys(per).forEach(id=>{const g=S.goals.find(x=>x.id===id);const a=Math.min(per[id],savings-given);g.saved+=a;g.hist[11]=(g.hist[11]||0)+a;given+=a});S.free+=Math.max(0,savings-given);
 S.moneyIn.unshift({id:'m'+(S.idc++),t:S.now.getTime(),label:'New income',amt:amount,note:`${Math.round(amount-savings)} to budget, ${Math.round(savings)} to savings`});
 reachedCheck(S);logE(S,`New income ₹${amount}: budget ₹${budget}, savings ₹${savings}, lasts ${wks} weeks`)}
function unspentNow(S){return S.cats.reduce((a,c)=>a+c.left,0)+S.bufLeft}
function weekEnd(S,{to,goalIds}){ // to: 'savings'|'next'
 const un=unspentNow(S);let detail={};
 if(to==='savings'){const ids=(goalIds&&goalIds.length?goalIds:S.goals.filter(g=>g.state!=='done').map(g=>g.id));
  if(!ids.length){S.free+=un}else{const share=Math.floor(un/ids.length);let given=0;ids.forEach((id,i)=>{const g=S.goals.find(x=>x.id===id);const a=i===ids.length-1?un-given:share;g.saved+=a;g.hist[11]=(g.hist[11]||0)+a;given+=a;detail[id]=a})}}
 // new week
 S.cats.forEach(c=>{if(c.full!=null)c.amt=c.full;c.left=c.amt});if(S.bufFull!=null)S.bufAmt=S.bufFull;S.bufLeft=S.bufAmt;S.weekScale=1;S.weekFrom=null;
 if(to==='next'&&un>0){const n=S.cats.length+1;const share=Math.floor(un/n);let g2=0;S.cats.forEach(c=>{c.left+=share;g2+=share});S.bufLeft+=un-g2}
 S.weekEndDone=true;S.touched=false;S.touchedAmt=0;reachedCheck(S);logE(S,`Week closed: ₹${un} unspent → ${to==='savings'?'savings':'next week'}`);return {un,detail}}
function addGoal(S,{name,target,byMonths}){const g={id:'g'+(S.idc++),name,target,saved:0,byMonths:byMonths||0,createdMonthsAgo:0,state:'active',hist:new Array(12).fill(0),celebrated:false};S.goals.push(g);logE(S,`Goal added: ${name}`);return g}
function markDone(S,id){const g=S.goals.find(x=>x.id===id);if(!g)return;if(g.saved>0){S.free+=g.saved}g.saved=0;g.state='done';g.doneOn=new Date(S.now);logE(S,`${g.name} marked done`)}
function advanceDays(S,n){for(let i=0;i<n;i++){const before=startOfWeek(S.now).getTime();S.now=new Date(S.now.getTime()+DAY);S.now.setHours(9,0);
  S.bills.forEach(b=>{if(S.now>=b.nextDue){if(b.paused){b.nextDue=nextDueAfter(b);return}if(S.p.mode==='upi'){const r=cascade(S,b.amt,{type:'fixed',id:b.id});S.txns.unshift({id:'t'+(S.idc++),t:b.nextDue.getTime()+36e5*10,payee:b.name,amt:b.amt,kind:'fixed',ref:b.id,via:'detected',src:r});b.paid.push(b.nextDue.getTime());b.nextDue=nextDueAfter(b);logE(S,`${b.name} was paid (₹${b.amt})`)}else{b.dueNow=true}}});
  if(startOfWeek(S.now).getTime()!==before){const un=unspentNow(S);S.pending.push({un,week:new Date(before),touched:!!S.touched,touchedAmt:S.touchedAmt||0,snap:S.cats.map(c=>[c.id,c.name,c.amt]),bufAmt:S.bufAmt,from:S.weekFrom||null});S.touched=false;S.touchedAmt=0;S.cats.forEach(c=>{if(c.full!=null)c.amt=c.full;c.left=c.amt});if(S.bufFull!=null)S.bufAmt=S.bufFull;S.bufLeft=S.bufAmt;S.weekScale=1;S.weekFrom=null;S.bills.forEach(b=>{b.reserve=Math.min(b.reserve+Math.round(billWeekly(b)),b.amt*1.2)});logE(S,'A new week began')}}}
function billsRefill(S){S.bills.forEach(b=>{b.reserve=Math.round(billWeekly(b)*3)})}
/* derived views */
function weekSpentBy(S,catId,wAgo,uptoFrac){const ws=startOfWeek(S.now).getTime()-wAgo*7*DAY;const end=wAgo===0?S.now.getTime():ws+7*DAY*(uptoFrac==null?1:uptoFrac);return S.txns.filter(t=>t.ref===catId&&t.kind==='cat'&&t.t>=ws&&t.t<(wAgo===0?end+1:ws+7*DAY*(uptoFrac==null?1:uptoFrac))).reduce((a,t)=>a+t.amt,0)}
function weekSpentAll(S,wAgo,frac){const ws=startOfWeek(S.now).getTime()-wAgo*7*DAY;const end=wAgo===0?S.now.getTime()+1:ws+7*DAY*frac;return S.txns.filter(t=>t.kind!=='fixed'&&t.kind!=='oneoff'&&t.t>=ws&&t.t<end).reduce((a,t)=>a+t.amt,0)}
/* ===== engine additions ===== */
function refileTxn(S,id,newCat){const t=S.txns.find(x=>x.id===id);if(!t||t.kind==='fixed'||t.kind==='goal')return;
 if(t.kind==='cat'){const c=S.cats.find(x=>x.id===t.ref);if(c)c.left=Math.min(c.amt,c.left+((t.src&&t.src.target)||0))}
 if(t.kind==='unsorted'){S.bufLeft=Math.min(S.bufAmt,S.bufLeft+((t.src&&t.src.buffer)||0));S.unsorted=S.unsorted.filter(x=>x!==id)}
 t.kind='cat';t.ref=newCat;t.src=cascade(S,t.amt,{type:'cat',id:newCat});S.memory[t.payee]=newCat;logE(S,`Re-filed ${t.payee} under ${labelOf(S,{type:'cat',id:newCat})}`)}
function removeTxn(S,id){const t=S.txns.find(x=>x.id===id);if(!t)return;if(t.kind==='oneoff'&&t.src&&t.src.fromSavings)S.free+=t.src.fromSavings;if(t.kind==='cat'){const c=S.cats.find(x=>x.id===t.ref);if(c)c.left=Math.min(c.amt,c.left+((t.src&&t.src.target)||t.amt))}
 if(t.src&&t.src.buffer)S.bufLeft=Math.min(S.bufAmt,S.bufLeft+t.src.buffer);S.txns=S.txns.filter(x=>x.id!==id);S.unsorted=S.unsorted.filter(x=>x!==id);logE(S,`Removed ${t.payee}`)}
function previewCascade(S,amt,target){const T={cats:JSON.parse(JSON.stringify(S.cats)),bills:JSON.parse(JSON.stringify(S.bills)),goals:JSON.parse(JSON.stringify(S.goals)),free:S.free,bufLeft:S.bufLeft};return cascade(T,amt,target)}
function targetLeft(S,t){if(t.type==='cat')return S.cats.find(c=>c.id===t.id).left;if(t.type==='goal')return S.goals.find(g=>g.id===t.id).saved;if(t.type==='fixed')return S.bills.find(b=>b.id===t.id).reserve;if(t.type==='free')return S.free;return 0}
function targetBase(S,t){if(t.type==='cat')return S.cats.find(c=>c.id===t.id).amt;if(t.type==='goal')return S.goals.find(g=>g.id===t.id).target;if(t.type==='fixed')return S.bills.find(b=>b.id===t.id).amt;return 1}

function applyPending(S,p,{to,goalIds}){const un=p.un;if(un>0){if(to==='savings'){const ids=(goalIds&&goalIds.length?goalIds:S.goals.filter(g=>g.state!=='done').map(g=>g.id));if(!ids.length)S.free+=un;else{const share=Math.floor(un/ids.length);let given=0;ids.forEach((id,i)=>{const g=S.goals.find(x=>x.id===id);const a=i===ids.length-1?un-given:share;g.saved+=a;g.hist[11]=(g.hist[11]||0)+a;given+=a})}}
 else{const n=S.cats.length+1;const share=Math.floor(un/n);let g2=0;S.cats.forEach(c=>{c.left+=share;g2+=share});S.bufLeft+=un-g2}}
 S.pending=S.pending.filter(x=>x!==p);reachedCheck(S);logE(S,`Last week closed: ₹${un} → ${to==='savings'?'savings':'this week'}`)}
