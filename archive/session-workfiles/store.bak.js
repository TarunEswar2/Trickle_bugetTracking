/* ===== Trickle v12 — store: one ledger, derived reads, actions, 12 invariants, seeds =====
   Screens never compute their own totals; they call the reads below.
   Money arrives from linked UPI IDs or is typed in by hand. */
var L = null, UNDO = [], ACTN = 0;
var MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var MONL = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var DOW = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var JCLS = ['j0','j1','j2']; // amber, blue, plum; 4th jar reuses j0 + stripe pattern
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function mk(y,m){return y+'-'+(m<9?'0':'')+(m+1);}
function clone(o){return JSON.parse(JSON.stringify(o));}
function inr(n){n=Math.round(n);var neg=n<0;n=Math.abs(n);var s=String(n);if(s.length>3){var h=s.slice(0,-3);h=h.replace(/\B(?=(\d{2})+(?!\d))/g,',');s=h+','+s.slice(-3);}return (neg?'−':'')+'₹'+s;}
function dim(y,m){return new Date(y,m+1,0).getDate();}
function curKey(){return mk(L.today.y,L.today.m);}
function cur(){return L.months[curKey()];}
function monthKeys(){return Object.keys(L.months).sort();}
function prevKey(k){var i=monthKeys().indexOf(k||curKey());return i>0?monthKeys()[i-1]:null;}
function uid(p){L.seq=(L.seq||0)+1;return (p||'x')+L.seq;}

/* ---------- derived reads ---------- */
function jarNames(m){m=m||cur();return Object.keys(m.jars);}
function jarSpent(j,m){m=m||cur();var s=0;m.spends.forEach(function(x){if(x.jar===j&&x.fund!=='lighter')s+=x.amt;});return s;}
function left(j,m){m=m||cur();var J=m.jars[j];return J.budget+J.moveIn-J.moveOut-jarSpent(j,m)+J.back;}
function jarCap(j,m){m=m||cur();var J=m.jars[j];return J.budget+J.moveIn-J.moveOut+J.back;}
function jarsTotal(m){m=m||cur();var s=0;jarNames(m).forEach(function(j){s+=m.jars[j].budget;});return s;}
function liveSubs(m){m=m||cur();return m.subs.filter(function(s){return s.state!=='stopped';});}
function subsTotal(m){return liveSubs(m).reduce(function(a,s){return a+s.amt;},0);}
function subsHeld(m){return liveSubs(m).filter(function(s){return s.state==='held';}).reduce(function(a,s){return a+s.amt;},0);}
function subsPaid(m){return subsTotal(m)-subsHeld(m);}
function spentAll(m){m=m||cur();return m.spends.reduce(function(a,x){return a+x.amt;},0);}
function backAll(m){m=m||cur();return jarNames(m).reduce(function(a,j){return a+m.jars[j].back;},0);}
function leftAll(m){m=m||cur();return jarNames(m).reduce(function(a,j){return a+left(j,m);},0);}
function capAll(m){m=m||cur();return jarNames(m).reduce(function(a,j){return a+jarCap(j,m);},0);}
function goalSaved(g){return g.saved;}
function savingsTotal(){return L.goals.reduce(function(a,g){return a+g.saved;},0)+L.general;}
function owedOpen(){return L.owed.reduce(function(a,o){return a+o.amt-o.back;},0);}
function incomeIn(m){m=m||cur();return m.incomes.reduce(function(a,i){return a+i.amt;},0);}
function daysLeft(){return dim(L.today.y,L.today.m)-L.today.d+1;}
function daySpread(j){var d=daysLeft();return Math.floor(left(j)/d);} // re-spread remaining days (P2e-Q5)
function paceFrac(){var m=cur(),cap=capAll(m);return cap?1-leftAll(m)/cap:0;}
function timeFrac(){return (L.today.d-0.5)/dim(L.today.y,L.today.m);}
function paceWord(){var d=paceFrac()-timeFrac();return d>0.12?'Quick':d<-0.12?'Easy':'Steady';}
function paceLine(){var w=paceWord();return w==='Quick'?'Spending a little quicker than the days':w==='Easy'?'Plenty of room for the days ahead':'Spending in step with the days';}
function repeatCount(payee,days){var m=cur(),d0=L.today.d-(days||7)+1,n=0;m.spends.forEach(function(x){if(x.payee===payee&&x.day>=d0&&x.day<=L.today.d)n++;});return n;}
function weekSpend(off){var m=cur(),e=L.today.d-7*(off||0),s=e-6,t=0;
  if(s<1&&off){var pk=prevKey();if(pk){var pm=L.months[pk],pd=dim(+pk.slice(0,4),+pk.slice(5)-1);pm.spends.forEach(function(x){if(x.day>=pd+s)t+=x.amt;});}}
  m.spends.forEach(function(x){if(x.day>=s&&x.day<=e)t+=x.amt;});return t;}
function topRepeat(){var m=cur(),c={};m.spends.forEach(function(x){if(x.amt<100)c[x.payee]=(c[x.payee]||0)+1;});var b=null;Object.keys(c).forEach(function(k){if(!b||c[k]>c[b])b=k;});return b;}
function equivalent(amt){var p=topRepeat()||'Ramu Tea Stall',u=L.payees[p]&&L.payees[p].unit||20;return {n:Math.round(amt/u),what:L.payees[p]&&L.payees[p].thing||'chais'};}
function ghost(j,k){var pk=prevKey(k);if(!pk)return null;var pm=L.months[pk];if(!pm.jars[j])return null;
  var s=0;pm.spends.forEach(function(x){if(x.jar===j&&x.day<=L.today.d&&x.fund!=='lighter')s+=x.amt;});return s;}
function smallBuys(m){m=m||cur();return m.spends.filter(function(x){return x.amt<100;});}
function catShare(m){m=m||cur();return jarNames(m).map(function(j){return {j:j,amt:jarSpent(j,m)};});}
function cashNow(m){m=m||cur();var inc=m.incomes.reduce(function(a,i){return a+(i.intent==='split'?i.amt:0);},0);
  return inc+m.fromSavings-m.savingsSplit-spentAll(m)-subsPaid(m)+backAll(m)+m.lighter-m.lighterIn+lighterFunded(m)*0;}
function lighterFunded(m){return m.spends.filter(function(x){return x.fund==='lighter';}).reduce(function(a,x){return a+x.amt;},0);}
function jcls(j,m){m=m||cur();return m.jars[j]?m.jars[j].c:'j0';}
function jpat(j,m){m=m||cur();return m.jars[j]&&m.jars[j].pat;}
function nextIncome(){var src=L.sources.filter(function(s){return s.kind==='regular';})[0];if(!src)return null;var d=src.day,t=L.today;
  var nm=t.m+1,ny=t.y;if(nm>11){nm=0;ny++;}var total=dim(t.y,t.m)-t.d+d;return {src:src,days:total,frac:1-total/dim(t.y,t.m),label:d+' '+MON[nm]};}
function goalEta(g){var per=1000;var need=g.target-g.saved;if(need<=0)return {months:0};var mths=Math.ceil(need/per);var m=L.today.m+mths,y=L.today.y+Math.floor(m/12);m%=12;return {months:mths,label:MON[m]+' '+y,onTime:true};}

/* ---------- invariants (12) ---------- */
function checkLedger(){var E=[];if(!L)return E;
  monthKeys().forEach(function(k){var m=L.months[k];
    var incSplit=m.incomes.reduce(function(a,i){return a+(i.intent==='split'?i.amt:0);},0);
    if(incSplit+m.fromSavings!==m.savingsSplit+m.budget)E.push('1 '+k+' income '+incSplit+'+'+m.fromSavings+' ≠ '+m.savingsSplit+'+'+m.budget);
    m.incomes.forEach(function(i){if(i.intent==='owed')E.push('1 '+k+' friend payback counted as income');});
    if(m.budget!==subsTotal(m)+jarsTotal(m)+m.lighterIn)E.push('2 '+k+' budget '+m.budget+' ≠ subs '+subsTotal(m)+' + jars '+jarsTotal(m)+' + lighter '+m.lighterIn);
    var mv=jarNames(m).reduce(function(a,j){return a+m.jars[j].moveIn-m.jars[j].moveOut;},0);if(mv!==0)E.push('2 '+k+' moves net '+mv);
    jarNames(m).forEach(function(j){if(left(j,m)<0)E.push('3 '+k+' '+j+' below zero '+left(j,m));});
    if(subsHeld(m)>m.budget-jarsTotal(m))E.push('4 '+k+' held subs exceed space');
    if(!m.closed){if(cashNow(m)!==leftAll(m)+subsHeld(m))E.push('6 '+k+' balance '+cashNow(m)+' ≠ left '+leftAll(m)+' + held '+subsHeld(m));}
    m.spends.forEach(function(x){if(x.refund&&x.refund>x.amt)E.push('7 refund > spend '+x.id);
      if(x.split){var s=x.split.own+x.split.friends.reduce(function(a,f){return a+f.share;},0);if(s!==x.amt)E.push('8 split '+x.id+' '+s+'≠'+x.amt);}});
    if(m.closed){if(!m.leftover||m.leftover.amt!==leftAll(m))E.push('9 '+k+' leftover '+(m.leftover&&m.leftover.amt)+' ≠ left '+leftAll(m));}
  });
  L.goals.forEach(function(g){var s=g.contribs.reduce(function(a,c){return a+c.amt;},0);if(s!==g.saved)E.push('5 goal '+g.name+' contribs '+s+' ≠ '+g.saved);if(g.saved<0)E.push('5 goal negative');});
  if(L.general<0)E.push('5 general savings negative');
  var gs=L.genLog.reduce(function(a,c){return a+c.amt;},0);if(gs!==L.general)E.push('5 general log '+gs+' ≠ '+L.general);
  L.owed.forEach(function(o){if(o.back>o.amt||o.back<0)E.push('6 owed '+o.friend+' back out of range');});
  L.needs.forEach(function(n){if(n.done)E.push('11 acted need still listed '+n.id);});
  /* 12: rendered marks — checked by dots.js self-test + DOM audit */
  if(window.__dotErr&&window.__dotErr.length)E.push('12 '+window.__dotErr.join(','));
  return E;}

/* ---------- actions: every action snapshots (undo), logs once to the bell, re-checks ---------- */
function act(kind,tab,text,amt,fn,opts){var snap=JSON.stringify(L);var r=fn();if(r===false)return false;
  var e={ts:stamp(),tab:tab,kind:kind,text:text,amt:amt};L.log.unshift(e);UNDO.push({snap:snap,label:text});if(UNDO.length>20)UNDO.shift();ACTN++;
  var err=checkLedger();if(err.length){window.__ledgerErr=(window.__ledgerErr||[]).concat(kind+': '+err.join('; '));}
  try{localStorage.setItem('trickle12',JSON.stringify(L));}catch(x){}
  return true;}
function undo(){var u=UNDO.pop();if(!u)return false;L=JSON.parse(u.snap);ACTN++;return u.label;}
function stamp(){return {d:L.today.d,m:L.today.m,h:L.clock||19};}
function needDone(id){L.needs=L.needs.filter(function(n){return n.id!==id;});}
function findSpend(id){var r=null;monthKeys().forEach(function(k){L.months[k].spends.forEach(function(x){if(x.id===id)r=x;});});return r;}

var A = {
 pay:function(o){ // o:{amt,jar,payee,src,split:[names]}
  var m=cur();if(!m.jars[o.jar])return false;if(o.amt<=0)return false;
  if(o.fund!=='lighter'&&left(o.jar)<o.amt)return false; // empty-jar flow must run first
  var payee=o.payee||'Payee';
  return act(o.src==='cash'?'cash':'pay','S',(o.src==='cash'?'Logged cash ':'Paid ')+inr(o.amt)+' · '+payee+' · '+o.jar,o.amt,function(){
   var x={id:uid('s'),day:L.today.d,hour:L.clock||19,payee:payee,amt:o.amt,jar:o.jar,src:o.src||'upi'};if(o.fund)x.fund=o.fund;
   if(o.split&&o.split.length){var n=o.split.length+1,sh=Math.floor(o.amt/n),own=o.amt-sh*o.split.length;x.split={own:own,friends:o.split.map(function(f){return {name:f,share:sh};})};
     o.split.forEach(function(f){L.owed.push({id:uid('o'),friend:f,spendId:x.id,amt:sh,back:0,what:payee});});}
   m.spends.push(x);var p=L.payees[payee]||(L.payees[payee]={jar:o.jar,kind:'shop',count:0});p.count++;});},
 take:function(from,to,amt){var m=cur();if(left(from)<amt)return false;
  return act('move','S','Moved '+inr(amt)+' from '+from+' to '+to,amt,function(){m.jars[from].moveOut+=amt;m.jars[to].moveIn+=amt;});},
 lighter:function(amt,jar,payee){var m=cur();
  return act('lighter','S','Next month starts '+inr(amt)+' lighter',amt,function(){m.lighter+=amt;L.nextLighter=(L.nextLighter||0)+amt;
   m.spends.push({id:uid('s'),day:L.today.d,hour:L.clock||19,payee:payee||'Payee',amt:amt,jar:jar,src:'upi',fund:'lighter'});});},
 useSavings:function(amt,jar){var m=cur();if(L.general+L.goals.reduce(function(a,g){return a+g.saved;},0)<amt)return false;
  return act('withdraw','V','Used '+inr(amt)+' from savings for '+jar,amt,function(){takeSavings(amt);m.fromSavings+=amt;m.budget+=amt;m.jars[jar].budget+=amt;});},
 income:function(amt,src,kind,intent,ow){var m=cur();
  if(intent==='owed'){var o=L.owed.filter(function(o){return o.id===ow;})[0];if(!o)return false;return A.payback(o.id,amt);}
  return act('income','I',(intent==='later'?'Kept for later ':'Split ')+inr(amt)+' from '+src,amt,function(){
   var i={id:uid('i'),src:src,kind:kind,amt:amt,day:L.today.d,intent:intent};m.incomes.push(i);
   if(intent==='later'){L.general+=amt;L.genLog.push({ts:stamp(),amt:amt,src:src});i.intent='later';return;}
   var sv=Math.round(amt*L.saveShare/100/100)*100,rest=amt-sv;m.savingsSplit+=sv;m.budget+=rest;i.split={save:sv,budget:rest};
   if(sv){var g=L.goals.filter(function(g){return !g.reachedTs;})[0];if(g){g.saved+=sv;g.contribs.push({ts:stamp(),amt:sv,src:'split'});}else{L.general+=sv;L.genLog.push({ts:stamp(),amt:sv,src:'split'});}}
   var names=jarNames(m),jt=jarsTotal(m)||1,given=0;names.forEach(function(j,ix){var add=ix===names.length-1?rest-given:Math.floor(rest*m.jars[j].budget/jt/10)*10;m.jars[j].budget+=add;given+=add;});});},
 sort:function(spendId,jar,remember,needId){var x=findSpend(spendId);if(!x)return false;var m=cur();if(jar!==x.jar&&left(jar)<x.amt)return false;
  return act('sort','S','Sorted '+inr(x.amt)+' '+x.payee+' → '+jar,x.amt,function(){x.jar=jar;x.sorted=true;if(remember){L.payees[x.payee]={jar:jar,kind:'shop',count:1};}if(needId)needDone(needId);});},
 refund:function(spendId,needId){var x=findSpend(spendId);if(!x)return false;var amt=x.refundPending||x.amt;
  return act('refund','S',inr(amt)+' back from '+x.payee+' → '+x.jar,amt,function(){x.refund=amt;delete x.refundPending;cur().jars[x.jar].back+=amt;if(needId)needDone(needId);});},
 split:function(spendId,friends,needId){var x=findSpend(spendId);if(!x||x.split)return false;
  return act('split','S','Split '+inr(x.amt)+' '+x.payee+' with '+friends.join(', '),x.amt,function(){var n=friends.length+1,sh=Math.floor(x.amt/n);
   x.split={own:x.amt-sh*friends.length,friends:friends.map(function(f){return {name:f,share:sh};})};friends.forEach(function(f){L.owed.push({id:uid('o'),friend:f,spendId:x.id,amt:sh,back:0,what:x.payee});});if(needId)needDone(needId);});},
 remind:function(oid){var o=L.owed.filter(function(o){return o.id===oid;})[0];if(!o)return false;
  return act('remind','S','Reminded '+o.friend+' about '+inr(o.amt-o.back),o.amt-o.back,function(){o.remindedTs=stamp();});},
 payback:function(oid,amt){var o=L.owed.filter(function(o){return o.id===oid;})[0];if(!o)return false;amt=Math.min(amt||o.amt-o.back,o.amt-o.back);if(amt<=0)return false;
  var x=findSpend(o.spendId);var j=x&&cur().jars[x.jar]?x.jar:jarNames()[0];
  return act('payback','S',o.friend+' paid back '+inr(amt)+' → '+j,amt,function(){o.back+=amt;cur().jars[j].back+=amt;});},
 move:function(from,to,amt){return A.take(from,to,amt);},
 setJar:function(j,amt){var m=cur(),J=m.jars[j];var diff=amt-J.budget;if(!diff)return false;
  var src=jarNames().filter(function(x){return x!==j;}).sort(function(a,b){return left(b)-left(a);})[0];
  if(diff>0&&left(src)<diff)return false;if(diff<0&&left(j)<-diff)return false;
  return act('jar','S',j+' set to '+inr(amt)+' ('+(diff>0?'from ':'to ')+src+')',Math.abs(diff),function(){J.budget=amt;m.jars[src].budget-=diff;});},
 addJar:function(name){var m=cur();if(!name||m.jars[name])return false;var n=jarNames().length;
  return act('jar','S','Added jar '+name,0,function(){m.jars[name]={budget:0,moveIn:0,moveOut:0,back:0,c:JCLS[n%3],pat:n>=3?(n>=6?'dot':'stripe'):null};});},
 renameJar:function(a,b){var m=cur();if(!b||m.jars[b]||!m.jars[a])return false;
  return act('jar','S','Renamed '+a+' to '+b,0,function(){var o={};jarNames().forEach(function(k){o[k===a?b:k]=m.jars[k];});m.jars=o;m.spends.forEach(function(x){if(x.jar===a)x.jar=b;});});},
 removeJar:function(j){var m=cur();var names=jarNames();if(names.length<2)return false;if(jarSpent(j)>0||m.jars[j].back||m.jars[j].moveIn||m.jars[j].moveOut)return false;var to=names[0]===j?names[1]:names[0];
  return act('jar','S','Removed jar '+j+' · its money went to '+to,m.jars[j].budget,function(){m.jars[to].budget+=m.jars[j].budget;delete m.jars[j];});},
 copyLast:function(){var m=cur(),pk=prevKey();if(!pk)return false;var pm=L.months[pk];var tgt={};var ok=true;
  jarNames().forEach(function(j){tgt[j]=pm.jars[j]?pm.jars[j].budget:m.jars[j].budget;});var tot=jarsTotal(),nt=0;jarNames().forEach(function(j){nt+=tgt[j];});
  var first=jarNames()[0];tgt[first]+=tot-nt;jarNames().forEach(function(j){if(m.jars[j].budget-tgt[j]>left(j))ok=false;});if(!ok||tgt[first]<0)return false;
  return act('jar','S','Copied last month’s jars',0,function(){jarNames().forEach(function(j){m.jars[j].budget=tgt[j];});});},
 addSub:function(name,amt,due){var m=cur();var src=jarNames().sort(function(a,b){return left(b)-left(a);})[0];if(left(src)<amt)return false;
  return act('sub','S','Holding '+inr(amt)+' for '+name+' (from '+src+')',amt,function(){m.subs.push({id:uid('u'),name:name,amt:amt,due:due,state:due<=L.today.d?'paid':'held'});m.jars[src].budget-=amt;});},
 subPrice:function(id,amt){var m=cur(),s=m.subs.filter(function(s){return s.id===id;})[0];if(!s||s.state!=='held')return false;var d=amt-s.amt;var j=jarNames()[0];if(d>0&&left(j)<d)return false;
  return act('sub','S',s.name+' now '+inr(amt),Math.abs(d),function(){s.amt=amt;m.jars[j].budget-=d;});},
 stopSub:function(id){var m=cur(),s=m.subs.filter(function(s){return s.id===id;})[0];if(!s||s.state==='stopped')return false;var j=jarNames()[0];
  return act('sub','S','Stopped tracking '+s.name+(s.state==='held'?' · '+inr(s.amt)+' back to '+j:''),s.amt,function(){if(s.state==='held'){m.jars[j].budget+=s.amt;s.state='stopped';}else{s.ended=true;}});},
 cancelReminder:function(id){var m=cur(),s=m.subs.filter(function(s){return s.id===id;})[0];if(!s)return false;return act('sub','S','Reminder set to cancel '+s.name,0,function(){s.cancelRemind=true;});},
 newGoal:function(name,target,by){if(!name||!target)return false;return act('goal','V','New goal '+name+' · '+inr(target),target,function(){L.goals.push({id:uid('g'),name:name,target:target,saved:0,by:by,contribs:[]});});},
 addGoal:function(gid,amt){var m=cur(),g=L.goals.filter(function(g){return g.id===gid;})[0];if(!g)return false;
  if(leftAll()<amt)return false;var j=jarNames().sort(function(a,b){return left(b)-left(a);})[0];
  return act('save','V','Added '+inr(amt)+' to '+g.name+' (from '+j+(left(j)<amt?' and others':'')+')',amt,function(){var need=amt;jarNames().sort(function(a,b){return left(b)-left(a);}).forEach(function(x){var t=Math.min(need,left(x));m.jars[x].budget-=t;need-=t;});m.budget-=amt;m.savingsSplit+=amt;g.saved+=amt;g.contribs.push({ts:stamp(),amt:amt,src:'add'});
   if(g.saved>=g.target&&!g.reachedTs)g.reachedTs=stamp();});},
 withdraw:function(gid,amt){var m=cur(),g=L.goals.filter(function(g){return g.id===gid;})[0];if(!g||g.saved<amt)return false;var j=jarNames()[0];
  return act('withdraw','V','Took '+inr(amt)+' from '+g.name+' → '+j,amt,function(){g.saved-=amt;g.contribs.push({ts:stamp(),amt:-amt,src:'withdraw'});m.fromSavings+=amt;m.budget+=amt;m.jars[j].budget+=amt;});},
 goalOrder:function(ids){return act('goal','V','Goal order changed',0,function(){L.goals.sort(function(a,b){return ids.indexOf(a.id)-ids.indexOf(b.id);});});},
 monthEnd:function(to){var m=cur();if(m.closed)return false;var amt=leftAll(m);
  return act('monthend','V',to==='savings'?'Moved '+inr(amt)+' leftover to Savings':'Kept '+inr(amt)+' for next month',amt,function(){m.closed=true;m.leftover={amt:amt,to:to};
   if(to==='savings'&&amt){var g=L.goals.filter(function(g){return !g.reachedTs;})[0];if(g){g.saved+=amt;g.contribs.push({ts:stamp(),amt:amt,src:'leftover'});}else{L.general+=amt;L.genLog.push({ts:stamp(),amt:amt,src:'leftover'});}}
   else L.carry=amt;});},
 lateNote:function(choice,needId){return act('late','I',choice==='date'?'Usual day for Allowance moved to the 3rd':'Late income noted',0,function(){if(choice==='date')L.sources[0].day=3;if(needId)needDone(needId);});},
 setPref:function(k,v,label){return act('pref','G',label||('Changed '+k),0,function(){L.prefs[k]=v;});},
 checkin:function(){return act('checkin','N','Started the new week',0,function(){L.lastCheckin=stamp();});},
 tick:function(){var m=cur();if(L.today.d>=dim(L.today.y,L.today.m))return false;return act('tick','S','A new day',0,function(){L.today.d++;m.subs.forEach(function(s){if(s.state==='held'&&s.due<=L.today.d){s.state='paid';L.log.unshift({ts:stamp(),tab:'S',kind:'sub',text:s.name+' '+inr(s.amt)+' paid from held money',amt:s.amt});}});});},
 welcome:function(){return act('welcome','H','Started from today',0,function(){L.lapse=0;});},
 homeSet:function(ids){return act('board','H','Home board updated',0,function(){L.prefs.home=ids.slice(0,6);});},
 pinInsight:function(id){return act('pin','N',(L.prefs.insightsPins.indexOf(id)<0?'Pinned ':'Unpinned ')+INS_NAME(id),0,function(){var p=L.prefs.insightsPins,i=p.indexOf(id);if(i<0)p.push(id);else p.splice(i,1);});},
 saveShare:function(pct){return act('share','I','Savings share set to '+pct+'%',0,function(){L.saveShare=pct;});},
 source:function(name,day,kind){return act('source','I','Added source '+name,0,function(){L.sources.push({name:name,day:day,kind:kind||'regular'});});},
 upi:function(id,on){return act('upi','G',(on?'Linked ':'Unlinked ')+id,0,function(){var u=L.upiIds.filter(function(u){return u.id===id;})[0];if(u)u.linked=on;else L.upiIds.push({app:'Other',id:id,linked:on});L.manualOnly=!L.upiIds.some(function(u){return u.linked;});});}
};
function INS_NAME(id){var x=(typeof LIB!=='undefined'?LIB:[]).filter(function(l){return l.id===id;})[0];return x?x.name:id;}
function takeSavings(amt){var t=Math.min(L.general,amt);if(t){L.general-=t;L.genLog.push({ts:stamp(),amt:-t,src:'use'});}amt-=t;
  for(var i=L.goals.length-1;i>=0&&amt>0;i--){var g=L.goals[i],x=Math.min(g.saved,amt);if(x){g.saved-=x;g.contribs.push({ts:stamp(),amt:-x,src:'use'});amt-=x;}}}

/* ---------- seed: Tarun, hostel, Chennai — today Wed 14 Oct 2026, 4 months ---------- */
function newMonth(){return {incomes:[],savingsSplit:0,budget:0,subs:[],jars:{},spends:[],moves:[],leftover:null,lighter:0,lighterIn:0,fromSavings:0,closed:false};}
function baseJars(m,lighterIn){var J=[['Food',3600,'j0',null],['Travel',1200,'j1',null],['Fun',1000,'j2',null],['Study',652,'j0','stripe']];
  J.forEach(function(r,i){m.jars[r[0]]={budget:r[1]-(i===0?lighterIn:0),moveIn:0,moveOut:0,back:0,c:r[2],pat:r[3]};});}
function baseSubs(m,today,y,mo){[['Spotify',119,5],['Google One',130,15],['Prime Video',299,22]].forEach(function(s,i){m.subs.push({id:'u'+i+mo,name:s[0],amt:s[1],due:s[2],state:s[2]<=today?'paid':'held'});});}
var PLACES={Food:[['Ramu Tea Stall',20,20,'chai'],['Mess canteen',30,60],['Swiggy',180,340],['Zomato',150,320],['Saravana Bhavan',120,260],['Fruit cart',30,60]],
  Travel:[['Rapido',45,120],['Metro card',200,300],['Auto',60,120],['Uber',150,260]],
  Fun:[['PVR Cinemas',200,480],['Steam',150,400],['Café Coffee Day',120,220],['Gaming zone',100,250]],
  Study:[['Xerox shop',20,60],['Stationery',60,212],['Book Palace',150,320]]};
function genHistory(m,y,mo,targets,R){var D=dim(y,mo);
  jarNames(m).forEach(function(j){var need=jarCap(j,m)-targets[j];var guard=0;
    while(need>0&&guard++<400){var pl=PLACES[j][Math.floor(R()*PLACES[j].length)];var a=Math.round((pl[1]+R()*(pl[2]-pl[1]))/5)*5;if(a>need)a=need;
      var day=1+Math.floor(R()*D),hr=[8,9,11,13,14,17,19,20,21,22][Math.floor(R()*10)];m.spends.push({id:'h'+y+mo+'_'+m.spends.length,day:day,hour:hr,payee:pl[0],amt:a,jar:j,src:R()<0.12?'cash':'upi'});need-=a;}});
  m.spends.sort(function(a,b){return a.day-b.day;});}
function seedDemo(opt){opt=opt||{};var R=mulberry32(42);
  L={v:12,user:'Tarun',upi:'tarun@okaxis',type:'Hostel',city:'Chennai',today:{y:2026,m:9,d:14},clock:19,period:'month',seq:100,saveShare:22,
   upiIds:[{app:'GPay',id:'tarun@okaxis',linked:true},{app:'PhonePe',id:'9840xxxxxx@ybl',linked:false}],manualOnly:false,
   sources:[{name:'Allowance',day:1,kind:'regular',from:'Appa'},{name:'Freelance design',day:null,kind:'irregular'}],
   months:{},goals:[],general:0,genLog:[],payees:{'Ramu Tea Stall':{jar:'Food',kind:'shop',count:11,unit:20,thing:'chais'},'Rapido':{jar:'Travel',kind:'shop',count:4},'Swiggy':{jar:'Food',kind:'shop',count:3},'Xerox shop':{jar:'Study',kind:'shop',count:3}},
   owed:[],notif:{caps:{day:1,week:3},quiet:[22,8],channels:{income:true,subTomorrow:true,checkin:true,story:true,welcome:true},sent:[]},
   prefs:{look:'colour',mode:'system',motion:'system',sound:true,haptics:true,silent:false,checkin:{dow:0,time:'19:30'},leftoverRule:'savings',home:['pace','jar','little','subs','next','goal'],insightsPins:['changed','share','small','story'],tabHidden:{}},
   log:[],needs:[],seen:{},lapse:0,nextLighter:0,carry:0,lastCheckin:null};
  var goa={id:'g1',name:'Goa trip',target:8000,saved:0,by:'Jan 2027',contribs:[]},ph={id:'g2',name:'New phone',target:15000,saved:0,by:'Jun 2027',contribs:[]};L.goals=[goa,ph];
  var hist=[[6,0,250],[7,600,0],[8,640,0]];
  hist.forEach(function(h,ix){var mo=h[0],m=newMonth();var k=mk(2026,mo);L.months[k]=m;var lin=ix===1?250:0;
    m.incomes.push({id:'i'+mo,src:'Allowance',kind:'regular',amt:9000,day:mo===8?3:1,intent:'split'});m.savingsSplit=2000;m.budget=7000;m.lighterIn=lin;
    baseJars(m,lin);baseSubs(m,31,2026,mo);
    goa.saved+=1000;goa.contribs.push({ts:{d:1,m:mo},amt:1000,src:'split'});ph.saved+=1000;ph.contribs.push({ts:{d:1,m:mo},amt:1000,src:'split'});
    if(ix===1){m.jars.Food.moveOut+=250;m.jars.Fun.moveIn+=250;m.moves.push({from:'Food',to:'Fun',amt:250,day:19});}
    var tg={Food:0,Travel:0,Fun:0,Study:0};if(h[1]){tg.Food=Math.round(h[1]*0.5);tg.Travel=Math.round(h[1]*0.25);tg.Study=h[1]-tg.Food-tg.Travel;}
    genHistory(m,2026,mo,tg,R);
    if(h[2]){m.lighter=250;m.spends.push({id:'hl'+mo,day:28,hour:20,payee:'Birthday treat',amt:250,jar:'Fun',src:'upi',fund:'lighter'});}
    m.closed=true;m.leftover={amt:leftAll(m),to:'savings'};
    if(h[1]){goa.saved+=h[1];goa.contribs.push({ts:{d:31,m:mo},amt:h[1],src:'leftover'});}
  });
  // October (open)
  var m=newMonth();L.months['2026-10']=m;m.incomes.push({id:'i9',src:'Allowance',kind:'regular',amt:9000,day:1,intent:'split',split:{save:2000,budget:7000}});
  m.incomes.push({id:'i9b',src:'Freelance design',kind:'irregular',amt:1500,day:9,intent:'later'});
  m.savingsSplit=2000;m.budget=7000;baseJars(m,0);baseSubs(m,14,2026,9);
  goa.saved+=1000;goa.contribs.push({ts:{d:1,m:9},amt:1000,src:'split'});ph.saved+=1000;ph.contribs.push({ts:{d:1,m:9},amt:1000,src:'split'});
  L.general=1500;L.genLog.push({ts:{d:9,m:9},amt:1500,src:'Freelance design'});
  var S=[];function sp(day,hour,payee,amt,jar,src,extra){var x={id:'s'+(S.length+1),day:day,hour:hour,payee:payee,amt:amt,jar:jar,src:src||'upi'};if(extra)for(var k in extra)x[k]=extra[k];S.push(x);return x;}
  [1,2,3,5,6,7,8,9,12,13,14].forEach(function(d,i){sp(d,i%3?8:17,'Ramu Tea Stall',20,'Food');});
  sp(2,13,'Mess canteen',45,'Food');sp(4,21,'Mess canteen',45,'Food');sp(8,21,'Mess canteen',45,'Food');sp(11,13,'Mess canteen',45,'Food');
  sp(3,21,'Swiggy',180,'Food');sp(7,22,'Swiggy',260,'Food');var sw=sp(13,21,'Swiggy',340,'Food');
  sp(2,9,'Rapido',45,'Travel');sp(6,18,'Rapido',70,'Travel');sp(9,10,'Rapido',95,'Travel');sp(12,23,'Rapido',120,'Travel');
  sp(5,11,'Metro card',300,'Travel');sp(11,19,'Auto',80,'Travel','cash');
  sp(3,15,'Xerox shop',40,'Study');sp(7,15,'Xerox shop',40,'Study');sp(12,15,'Xerox shop',40,'Study');sp(6,16,'Stationery',212,'Study');
  sp(10,20,'PVR Cinemas',480,'Fun');var amz=sp(8,14,'Amazon',499,'Fun',null,{refundPending:499});
  var din=sp(10,21,'Saravana Bhavan',1200,'Food',null,{split:{own:300,friends:[{name:'Arjun',share:300},{name:'Meera',share:300},{name:'Kiran',share:300}]}});
  var unk=sp(13,18,'PAYTM*QR7731',150,'Food',null,{sorted:false});
  m.spends=S.sort(function(a,b){return a.day-b.day||a.hour-b.hour;});
  L.owed=[{id:'o1',friend:'Arjun',spendId:din.id,amt:300,back:0,what:'Saravana Bhavan'},{id:'o2',friend:'Meera',spendId:din.id,amt:300,back:0,what:'Saravana Bhavan'},{id:'o3',friend:'Kiran',spendId:din.id,amt:300,back:300,what:'Saravana Bhavan'}];
  m.jars.Food.back=300;
  L.needs=[{id:'n1',kind:'sort',ref:unk.id},{id:'n2',kind:'refund',ref:amz.id},{id:'n3',kind:'split',ref:sw.id}];
  // bell log (newest first)
  var lg=[[13,18,'S','pay','Paid ₹150 · PAYTM*QR7731 · not sorted yet',150],[13,21,'S','pay','Paid ₹340 · Swiggy · Food',340],[12,15,'S','pay','Paid ₹40 · Xerox shop · Study',40],
   [12,11,'S','refund','₹499 back from Amazon · waiting for you',499],[12,10,'S','payback','Kiran paid back ₹300 → Food',300],[11,19,'S','cash','Logged cash ₹80 · Auto · Travel',80],
   [10,21,'S','split','Split ₹1,200 Saravana Bhavan with Arjun, Meera, Kiran',1200],[10,20,'S','pay','Paid ₹480 · PVR Cinemas · Fun',480],
   [9,12,'I','income','Kept ₹1,500 from Freelance design for later',1500],[7,19,'N','checkin','Started the new week',0],[5,9,'S','sub','Spotify ₹119 paid from held money',119],
   [1,9,'I','income','Split ₹9,000 Allowance · Savings ₹2,000 · Budget ₹7,000',9000],[1,8,'V','monthend','Moved ₹640 September leftover to Savings',640]];
  L.log=lg.map(function(r){return {ts:{d:r[0],m:9,h:r[1]},tab:r[2],kind:r[3],text:r[4],amt:r[5]};});
  L.log.push({ts:{d:30,m:8,h:19},tab:'N',kind:'story',text:'September story ready · You kept ₹640',amt:640},{ts:{d:3,m:8,h:10},tab:'I',kind:'late',text:'Allowance came on the 3rd, 2 days later than usual',amt:9000});
  if(opt.seed==='day1')seedDay1();
  if(opt.seed==='lapse'){L.lapse=14;L.today.d=28;autoSortLapse();}
  if(opt.seed==='monthend'){L.today.d=31;}
  if(opt.seed==='bigincome')seedBig();
  if(opt.seed==='emptyjars'){var mm=cur();['Food','Travel','Fun','Study'].forEach(function(j){var l=left(j);if(l>0)mm.spends.push({id:uid('s'),day:14,hour:12,payee:'Spend',amt:l,jar:j,src:'upi'});});}
  UNDO=[];return L;}
function autoSortLapse(){var m=cur();for(var d=15;d<=27;d+=3){var j=['Food','Travel','Food','Study','Food'][(d-15)/3];if(left(j)>=60)m.spends.push({id:uid('s'),day:d,hour:13,payee:j==='Travel'?'Rapido':'Ramu Tea Stall',amt:j==='Travel'?60:20,jar:j,src:'upi',auto:true});}}
function seedDay1(){var m=cur();m.spends=[];jarNames().forEach(function(j){m.jars[j].back=0;m.jars[j].moveIn=0;m.jars[j].moveOut=0;});L.owed=[];L.needs=[];L.today.d=1;m.subs.forEach(function(s){s.state=s.due<=1?'paid':'held';});
  m.incomes=m.incomes.filter(function(i){return i.intent==='split';});L.general=0;L.genLog=[];L.log=L.log.slice(-1);}
function seedBig(){var m=cur();m.incomes[0].amt=45000;m.savingsSplit=12000;m.budget=33000;var g=L.goals[0];
  m.jars.Food.budget+=12000;m.jars.Travel.budget+=6000;m.jars.Fun.budget+=5000;m.jars.Study.budget+=3000;g.saved+=10000;g.contribs.push({ts:{d:1,m:9},amt:10000,src:'split'});L.goals[1].saved+=0;
  m.savingsSplit=2000+10000;L.goals[1].target=150000;}

/* ---------- onboarding starter months (P5-Q1 B) ---------- */
var STARTER={Hostel:{inc:9000,save:2000,jars:[['Food',3600],['Travel',1200],['Fun',1000],['Study',652]],subs:[['Spotify',119,5],['Google One',130,15],['Prime Video',299,22]]},
 'Day scholar':{inc:6000,save:1200,jars:[['Food',1800],['Travel',1600],['Fun',800],['Study',600]],subs:[['Spotify',119,5]]},
 Renting:{inc:15000,save:2500,jars:[['Rent & bills',7000],['Food',3200],['Travel',1200],['Fun',1100]],subs:[['Netflix',199,10]]},
 Earning:{inc:22000,save:5000,jars:[['Food',6000],['Travel',3000],['Fun',3500],['Study',4000]],subs:[['Spotify',119,5],['Google One',130,15]]}};
function seedFresh(o){var t=STARTER[o.type||'Hostel'];var inc=o.inc||t.inc;var scale=inc/t.inc;
  L={v:12,user:'Tarun',upi:'tarun@okaxis',type:o.type||'Hostel',city:'Chennai',today:{y:2026,m:9,d:1},clock:9,period:'month',seq:100,saveShare:Math.round(t.save/t.inc*100),
   upiIds:o.manual?[]:o.apps.map(function(a,i){return {app:a,id:i===0?'tarun@okaxis':'tarun@'+a.toLowerCase(),linked:true};}),manualOnly:!!o.manual,
   sources:[{name:o.manual?'Money in':'Allowance',day:o.day||1,kind:'regular'}],months:{},goals:[],general:0,genLog:[],payees:{},owed:[],
   notif:{caps:{day:1,week:3},quiet:[22,8],channels:{income:true,subTomorrow:true,checkin:true,story:true,welcome:true},sent:[]},
   prefs:{look:'colour',mode:'system',motion:'system',sound:true,haptics:true,silent:false,checkin:{dow:0,time:'19:30'},leftoverRule:'savings',home:['pace','jar','little','subs','next','goal'],insightsPins:['changed','share','small','story'],tabHidden:{}},
   log:[],needs:[],seen:{},lapse:0,nextLighter:0,carry:0};
  var m=newMonth();L.months['2026-10']=m;var save=Math.round(t.save*scale/100)*100;var subs=o.manual?[]:t.subs;var st=subs.reduce(function(a,s){return a+s[1];},0);
  var budget=inc-save;m.incomes.push({id:'i1',src:L.sources[0].name,kind:'regular',amt:inc,day:1,intent:'split'});m.savingsSplit=save;m.budget=budget;
  var jt=t.jars.reduce(function(a,j){return a+j[1];},0),room=budget-st,given=0;
  t.jars.forEach(function(j,i){var b=i===t.jars.length-1?room-given:Math.round(j[1]/jt*room/10)*10;given+=b;m.jars[j[0]]={budget:b,moveIn:0,moveOut:0,back:0,c:JCLS[i%3],pat:i>=3?'stripe':null};});
  subs.forEach(function(s,i){m.subs.push({id:'u'+i,name:s[0],amt:s[1],due:s[2],state:'held'});});
  L.goals=[{id:'g1',name:'Savings',target:Math.max(5000,save*4),saved:save,by:'Feb 2027',contribs:[{ts:{d:1,m:9},amt:save,src:'split'}]}];
  if(o.changes)o.changes.forEach(function(c){c(L);});
  L.log=[{ts:{d:1,m:9,h:9},tab:'H',kind:'setup',text:'Starter month set · '+(o.manual?'manual entry':'UPI linked'),amt:0}];UNDO=[];return L;}
