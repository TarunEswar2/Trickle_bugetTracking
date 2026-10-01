/* ===== Trickle v7 — data model & deterministic seed (seed 42) =====
   Tracking = linked UPI IDs or manual entry. Nothing else. */
var RUPEE='₹';
var MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var DOW=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var NOW=new Date(2026,8,24,18,30).getTime();      /* fixed "today" for stable screenshots */
var START=new Date(2026,3,1).getTime();
var DAY=864e5;
var SLOT={s1:'#3987e5',s2:'#d95926',s3:'#199e70',s4:'#c98500',s5:'#d55181',s6:'#9085e9',s7:'#e66767',other:'#6b6c70'};
var SLOTS=['s1','s2','s3','s4','s5','s6','s7'];
var STATUS={good:{c:'#0ca30c',i:'✓',w:'On track'},warning:{c:'#fab219',i:'◐',w:'Near limit'},serious:{c:'#ec835a',i:'▲',w:'Will exceed'},critical:{c:'#d03b3b',i:'●',w:'Over'}};
var DEFAULT_CATS=[
 {name:'Food',slot:'s1',icon:'food',w:28},{name:'Snacks',slot:'s2',icon:'cup',w:12},
 {name:'Groceries',slot:'s3',icon:'bag',w:16},{name:'Transport',slot:'s4',icon:'bus',w:12},
 {name:'Necessities',slot:'s5',icon:'plus',w:14},{name:'Stationery',slot:'s6',icon:'pen',w:6},
 {name:'Buffer',slot:'s7',icon:'shield',w:12}];
var RECOMMENDED=['Travel','Entertainment','Rent','Health','Laundry','Mobile recharge','Gifts','Books','Fitness','Printouts','Chai'];
var ALLOWANCE=8000;

function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
var R=mulberry32(42);
function rr(a,b){return a+R()*(b-a);}
function ri(a,b){return Math.round(rr(a,b));}
function pickW(arr,key){var s=0,i;for(i=0;i<arr.length;i++)s+=arr[i][key];var x=R()*s;for(i=0;i<arr.length;i++){x-=arr[i][key];if(x<=0)return arr[i];}return arr[arr.length-1];}

/* merchant hour profiles: [fromHour, toHour, weight] */
var MERCH=[
 {n:'JD Canteen',c:'Food',w:5,a:[60,160],h:[[12,14,5],[20,22,4],[9,10,1]]},
 {n:'Kameng Mess',c:'Food',w:3,a:[90,220],h:[[13,14,3],[19,21,3]]},
 {n:'Swiggy',c:'Food',w:1.3,a:[180,360],h:[[20,23,3],[13,14,1]]},
 {n:'RV Shop',c:'Snacks',w:6,a:[15,55],h:[[17,22,6],[22,23,.8],[23,24,.3]]},
 {n:'Campus Coffee',c:'Snacks',w:5,a:[20,55],h:[[8,10,5],[16,17,4]]},
 {n:'Maggi Point',c:'Snacks',w:1.6,a:[30,70],h:[[20,22,3],[22,24,1.5],[0,1,.5]]},
 {n:'Zepto',c:'Groceries',w:3,a:[110,360],h:[[18,22,5],[22,23,1]]},
 {n:'BigBasket',c:'Groceries',w:1,a:[280,650],h:[[10,13,1]],wkend:1},
 {n:'Campus Store',c:'Groceries',w:2,a:[40,150],h:[[11,19,1]]},
 {n:'Metro Card',c:'Transport',w:5,a:[20,60],h:[[8,9,5],[18,19,5]]},
 {n:'Uber',c:'Transport',w:1.2,a:[90,240],h:[[9,11,1],[21,23,2]]},
 {n:'Rapido',c:'Transport',w:1.5,a:[40,90],h:[[8,10,1],[17,20,1]]},
 {n:'Hostel Laundry',c:'Necessities',w:2,a:[60,120],h:[[9,12,1]]},
 {n:'Medical Store',c:'Necessities',w:1.2,a:[70,240],h:[[10,20,1]]},
 {n:'Core 1 Stationery',c:'Stationery',w:3,a:[30,150],h:[[10,17,1]]},
 {n:'Xerox Point',c:'Stationery',w:3,a:[10,60],h:[[9,18,1]]},
 {n:'BookMyShow',c:'Buffer',w:1,a:[150,350],h:[[18,21,1]]},
 {n:'Chai Tapri',c:'Buffer',w:2,a:[10,30],h:[[16,19,2],[22,23,.5]]}];
var CONTACTS=['Yash Raina','Gautham S','Priya D','Mess Secretary','Harsh P','Rohit (cab share)','Vaishak M','Amma'];
var ACC_SEED=[{handle:'nishad@oksbi',bank:'SBI'},{handle:'nishad@ybl',bank:'PhonePe · Yes Bank'}];

var SUBS_SEED=[
 {id:'coursera',name:'Coursera',icon:'book',amt:399,cycle:'monthly',anchorDay:14,cat:'Necessities',startTs:new Date(2026,0,14).getTime(),priceHistory:[{ts:new Date(2026,0,14).getTime(),amt:399}]},
 {id:'spotify',name:'Spotify',icon:'music',amt:119,cycle:'monthly',anchorDay:27,cat:'Buffer',startTs:new Date(2025,6,3).getTime(),priceHistory:[{ts:new Date(2025,6,3).getTime(),amt:99},{ts:new Date(2026,6,27).getTime(),amt:119}]},
 {id:'cloud',name:'Cloud storage',icon:'cloud',amt:130,cycle:'monthly',anchorDay:22,cat:'Buffer',startTs:new Date(2025,10,22).getTime(),priceHistory:[{ts:new Date(2025,10,22).getTime(),amt:130}]},
 {id:'prime',name:'Amazon Prime',icon:'box',amt:1499,cycle:'yearly',anchorDay:8,anchorMonth:10,cat:'Buffer',startTs:new Date(2025,10,8).getTime(),priceHistory:[{ts:new Date(2025,10,8).getTime(),amt:1499}]},
 {id:'gym',name:'Gym',icon:'gym',amt:1800,cycle:'quarterly',anchorDay:1,anchorMonth:0,cat:'Buffer',startTs:new Date(2026,0,1).getTime(),priceHistory:[{ts:new Date(2026,0,1).getTime(),amt:1800}]}];

function priceAt(s,ts){var a=s.priceHistory[0].amt;s.priceHistory.forEach(function(p){if(p.ts<=ts)a=p.amt;});return a;}
/* all charge dates for a sub between t0 and t1 */
function subCharges(s,t0,t1){
  var out=[],step=s.cycle==='monthly'?1:s.cycle==='quarterly'?3:12;
  var d=new Date(s.startTs);d=new Date(d.getFullYear(),d.getMonth(),s.anchorDay,9,0);
  while(d.getTime()<=t1){if(d.getTime()>=t0&&d.getTime()>=s.startTs)out.push(d.getTime());d=new Date(d.getFullYear(),d.getMonth()+step,s.anchorDay,9,0);}
  return out;}
function nextDue(s,from){var c=subCharges(s,from||NOW,(from||NOW)+400*DAY);return c[0];}

function hourFrom(m){var b=pickW(m.h.map(function(x){return{x:x,w:x[2]};}),'w').x;return rr(b[0],b[1]);}

function genSeed(budgets){
  R=mulberry32(42);
  var tx=[],id=1;
  function push(o){o.id='t'+(id++);tx.push(o);}
  function acct(){var r=R();if(r<.22)return null;return r<.22+.78*.7?'nishad@oksbi':'nishad@ybl';}
  function mkTs(dayTs,h){var t=dayTs+h*3600e3;if(t>NOW){t=dayTs+rr(8,Math.max(8.2,(NOW-dayTs)/3600e3-.2))*3600e3;}return Math.round(t/6e4)*6e4;}
  for(var mo=3;mo<=8;mo++){
    var m0=new Date(2026,mo,1).getTime(),mdays=new Date(2026,mo+1,0).getDate();
    var lastDay=mo===8?24:mdays,frac=lastDay/mdays;
    function randDay(wk){for(var k=0;k<20;k++){var d=ri(1,lastDay);var t=new Date(2026,mo,d).getTime();var w=new Date(t).getDay();if(!wk||w===0||w===6)return t;}return new Date(2026,mo,ri(1,lastDay)).getTime();}
    var target={};
    DEFAULT_CATS.forEach(function(c){
      var f=rr(.66,.86);
      if(mo===4&&c.name==='Stationery')f=2.5;
      if(mo===5&&c.name==='Food')f*=.6;
      if(mo===5&&c.name==='Transport')f=1.45;
      if(mo===7&&c.name==='Groceries')f=1.2;
      if(mo===8&&c.name==='Snacks')f=.9;if(mo===7&&c.name==='Snacks')f=.95;
      if(mo===6&&c.name==='Snacks')f=1.08;
      target[c.name]=budgets[c.name]*f*frac;});
    /* subscription charges */
    SUBS_SEED.forEach(function(s){subCharges(s,m0,Math.min(NOW,new Date(2026,mo+1,1).getTime()-1)).forEach(function(t){
      var a=priceAt(s,t);push({merchant:s.name,cat:s.cat,amt:a,ts:t,source:'UPI',account:'nishad@oksbi',payeeType:'merchant',sub:s.id,note:'Autopay'});
      if(s.id!=='gym')target[s.cat]-=a;});});
    /* contacts (P2P) */
    var nC=ri(6,10);
    for(var k=0;k<nC;k++){var who=CONTACTS[ri(0,CONTACTS.length-1)];var cat=who.indexOf('cab')>=0?'Transport':'Buffer';
      var a=who==='Mess Secretary'?ri(15,30)*10:ri(5,30)*10;if(cat==='Buffer'&&target.Buffer<a)continue;
      var ac=acct()||'nishad@oksbi';
      push({merchant:who,cat:cat,amt:a,ts:mkTs(randDay(),rr(10,22)),source:'UPI',account:ac,payeeType:'contact'});target[cat]-=a;}
    /* one bank transfer */
    push({merchant:'Hostel dues (bank)',cat:'Necessities',amt:300,ts:mkTs(randDay(),11),source:'UPI',account:'nishad@oksbi',payeeType:'bank'});target.Necessities-=300;
    /* merchants */
    DEFAULT_CATS.forEach(function(c){
      var ms=MERCH.filter(function(m){return m.c===c.name;}),left=target[c.name],guard=0;
      while(left>15&&guard++<400){var m=pickW(ms,'w');var a=ri(m.a[0],m.a[1]);if(a>left)a=Math.round(left);
        var d=randDay(m.wkend);var ac=acct();
        push({merchant:m.n,cat:c.name,amt:a,ts:mkTs(d,hourFrom(m)),source:ac?'UPI':'Manual',account:ac,payeeType:'merchant'});left-=a;}});
  }
  tx.sort(function(a,b){return b.ts-a.ts;});
  return tx;}

