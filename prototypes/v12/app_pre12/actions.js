/* ===== Trickle v12 — UI actions (data-a) ===== */
function rr(keep){if(keep){var sc=document.querySelector('.scr');S.keepScroll=sc?sc.scrollTop:null;}render();}
function done(ok,text,undoable){if(ok){toast(text,undoable!==false);}else toast('That didn’t fit. Nothing changed.',false);}
function keyIn(v,cur_){cur_=cur_||0;if(v==='⌫')return Math.floor(cur_/10);var n=parseInt(String(cur_)+v,10);return n>99999?cur_:n;}
var ACT={
 back:function(){back();},shadeclose:function(){back();},
 demo:function(){location.hash='demo';boot();},
 unzoom:function(el){var z=el.closest('.zoomed');z.previousElementSibling.style.display='';z.remove();},
 undo:function(){var l=undo();S.toast=null;if(l){toast('Undone: '+l,false);}fx('pay.undo');render();},
 introok:function(el,t){L.seen[t]=1;S.hist=[];go(tabRoot(t),{},true);},
 /* onboarding */
 obsplash:function(){go('O-01',{},true);},
 obapp:function(el,v){var a=S.ob.apps,i=a.indexOf(v);if(i<0)a.push(v);else a.splice(i,1);render();},
 oblink:function(){if(!S.ob.apps.length)return;S.ob.manual=false;S.ob.taps++;S.ob.built=false;go('O-02');},
 obmanual:function(){S.ob.manual=true;S.ob.taps++;S.ob.built=false;go('O-01m');},
 obk:function(el,v){S.ob.inc=keyIn(v,S.ob.inc);S.ob.err=null;render();},
 obday:function(el,v){S.ob.day=+v;render();},
 obinc:function(){if(!S.ob.inc){S.ob.err='Type an amount above ₹0.';render();return;}S.ob.taps++;go('O-02');},
 obtype:function(el,v){S.ob.type=v;S.ob.taps++;S.ob.built=false;L=null;go('O-03');},
 obline:function(el,v){go('O-04',{line:v});},
 obstep:function(el,v){var d=+v,m=cur(),line=S.ctx.line;var big=function(ex){return jarNames().filter(function(x){return x!==ex;}).sort(function(a,b){return m.jars[b].budget-m.jars[a].budget;})[0];};
   if(line==='save'){var b=big();if(m.savingsSplit+d<0||m.jars[b].budget-d<0)return;m.savingsSplit+=d;m.budget-=d;m.jars[b].budget-=d;var g=L.goals[0];g.saved+=d;g.contribs[0].amt+=d;}
   else{var j=line.slice(4),o=big(j);if(m.jars[j].budget+d<0||m.jars[o].budget-d<0)return;m.jars[j].budget+=d;m.jars[o].budget-=d;}render();},
 obsubrm:function(el,v){var m=cur(),s=m.subs.filter(function(s){return s.id===v;})[0];if(s&&s.state!=='stopped'){s.state='stopped';m.jars[jarNames()[0]].budget+=s.amt;}go('O-03',{},true);S.hist.pop();},
 obdone:function(){S.hist=S.hist.filter(function(h){return h.scr!=='O-04';});go('O-03',{},true);},
 obok:function(){S.ob.taps++;window.__ob={taps:S.ob.taps,ms:Date.now()-S.ob.t0,manual:S.ob.manual};L.seen={};S.hist=[];toTab('H');},
 /* home board */
 wup:function(el,v){var h=L.prefs.home.slice(),i=h.indexOf(v);if(i>0){h.splice(i,1);h.splice(i-1,0,v);A.homeSet(h);}rr(1);},
 wdown:function(el,v){var h=L.prefs.home.slice(),i=h.indexOf(v);if(i<h.length-1){h.splice(i,1);h.splice(i+1,0,v);A.homeSet(h);}rr(1);},
 whide:function(el,v){A.homeSet(L.prefs.home.filter(function(x){return x!==v;}));toast('Hidden from Home',true);rr(1);},
 wadd:function(el,v){if(L.prefs.home.length>=6)return;A.homeSet(L.prefs.home.concat([v]));S.hist.pop();S.scr='H-03';toast('Added to Home',true);render();},
 /* bell + sorting */
 sortjar:function(el,v,c){var ok=A.sort(c.id,v,c.rem!==false,c.need);if(FR[S.scr].kind==='sheet')back();else render();done(ok,'Sorted into '+v);},
 remtog:function(){S.ctx.rem=S.ctx.rem===false;render();},
 refund:function(el,v,c){var ok=A.refund(c.id,c.need);fx('refund.return');if(FR[S.scr].kind==='sheet')back();else render();done(ok,'Returned to the jar');},
 dismiss:function(el,v){act('dismiss','S','Kept as just mine',0,function(){needDone(v);});render();},
 /* pay */
 payclose:function(){S.hist=[];go(tabRoot(S.payFrom||'H'),{},true);},
 scanned:function(){go('P-04',{payee:'Ramu Tea Stall'});},
 payee:function(el,v){go('P-04',{payee:v,amt:(L.payees[v]&&L.payees[v].unit)||0});},
 upinext:function(){var v=(document.getElementById('upiid')||{}).value||'';if(!/^[\w.\-]+@[\w]+$/.test(v.trim())){toast('Type a UPI ID like name@bank',false);render();return;}go('P-04',{payee:v.trim(),amt:0,jar:'Food'});},
 payk:function(el,v){S.ctx.amt=keyIn(v,S.ctx.amt);render();},
 jarcycle:function(){S.ctx.pick=!S.ctx.pick;render();},
 payjar:function(el,v){S.ctx.jar=v;S.ctx.pick=false;render();},
 paynow:function(){var c=S.ctx;if(!c.amt){toast('Type an amount first',false);render();return;}
   if(left(c.jar)>=c.amt){go('P-05',c);return;}
   var need=c.amt-left(c.jar);var can=jarNames().some(function(x){return x!==c.jar&&left(x)>=need;});go(can?'P-06':'P-06b',c);},
 takepay:function(el,v){var c=S.ctx,need=c.amt-left(c.jar);var ok=A.take(v,c.jar,need);fx('jar.respread');if(!ok){done(false);return;}S.hist.pop();go('P-05',c,true);},
 lighterpay:function(){var c=Object.assign({},S.ctx,{fund:'lighter'});var j=c.jar;var l=left(j);if(l>0){c.amt2=c.amt;}
   /* pay what the jar holds normally, the rest from next month */
   if(l>0){var ok=A.pay({amt:l,jar:j,payee:c.payee,src:'upi'});c.amt=c.amt-l;}
   S.hist.pop();go('P-05',c,true);},
 savingspay:function(){var c=S.ctx,need=c.amt-left(c.jar);var ok=A.useSavings(need,c.jar);if(!ok){done(false);return;}S.hist.pop();go('P-05',c,true);},
 splitf:function(el,v){var s=S.ctx.split=S.ctx.split||[];var i=s.indexOf(v);if(i<0)s.push(v);else s.splice(i,1);render();},
 splitdone:function(){back();},
 splittog:function(){go('P-07',S.ctx);},
 cashk:function(el,v){S.ctx.amt=keyIn(v,S.ctx.amt);render();},
 cashjar:function(el,v){S.ctx.jar=v;render();},
 cashsave:function(){var c=S.ctx,j=c.jar||'Food';if(!c.amt){toast('Type an amount first',false);render();return;}if(left(j)<c.amt){go('P-04',{payee:'Cash',amt:c.amt,jar:j,cash:1});return;}
   var ok=A.pay({amt:c.amt,jar:j,payee:'Cash',src:'cash'});S.hist=[];go(tabRoot(S.payFrom||'H'),{},true);done(ok,'Logged '+inr(c.amt)+' cash · '+j);},
 /* income */
 incsplit:function(){var ok=A.income(9000,'Allowance','regular','split');var m=cur();S.lastIncome=m.incomes[m.incomes.length-1].id;fx('savings.drop');back();done(ok,'Split '+inr(9000)+' · savings first');},
 irrpick:function(el,v){S.ctx.pick=v;render();},
 irrdone:function(){var p=S.ctx.pick||'owed';var ok;var ow=L.owed.filter(function(o){return o.friend==='Arjun'&&o.back<o.amt;})[0];
   if(p==='owed'){if(!ow){toast('Arjun owes nothing right now',false);render();return;}ok=A.payback(ow.id,300);fx('owed.fill');}
   else ok=A.income(300,'Arjun','irregular',p==='later'?'later':'split');back();done(ok,p==='owed'?'Arjun’s share is settled':p==='later'?'Kept for later':'Added to this month');},
 srcadd:function(el,v){var n=(document.getElementById('srcname')||{}).value;if(!n||!n.trim()){toast('Give the source a name',false);render();return;}A.source(n.trim(),v==='regular'?1:null,v);rr();toast('Source added',true);},
 sharestep:function(el,v){var p=(S.ctx.p==null?L.saveShare:S.ctx.p)+(+v);S.ctx.p=Math.max(0,Math.min(60,p));render();},
 sharesave:function(el,v){A.saveShare(+v);back();toast('Savings share saved',true);},
 period:function(el,v){act('period','I','Period set to '+v,0,function(){L.period=v;});render();},
 gup:function(el,v){var ids=L.goals.map(function(g){return g.id;}),i=ids.indexOf(v);if(i>0){ids.splice(i,1);ids.splice(i-1,0,v);A.goalOrder(ids);}rr(1);},
 late:function(el,v){A.lateNote(v);back();toast(v==='date'?'Usual day moved':'Noted',true);},
 /* spending */
 expand:function(el,v){S.exp=S.exp===v?null:v;rr(1);},
 s4jar:function(el,v){var x=findSpend(S.ctx.id);var ok=A.sort(x.id,v,false);render();done(ok,'Moved to '+v);},
 s4f:function(el,v){var s=S.ctx.sel=S.ctx.sel||[];var i=s.indexOf(v);if(i<0)s.push(v);else s.splice(i,1);render();},
 s4split:function(){var s=S.ctx.sel||[];if(!s.length){toast('Pick at least one friend',false);render();return;}var ok=A.split(S.ctx.id,s,S.ctx.need);S.ctx.split=0;render();done(ok,'Split with '+s.join(', '));},
 subremind:function(el,v){var ok=A.cancelReminder(v);render();done(ok,'Reminder set');},
 substop:function(el,v){var ok=A.stopSub(v);if(FR[S.scr].kind==='sheet')back();else render();done(ok,'Stopped tracking');},
 subprice:function(el,v){var ok=A.subPrice(v,349);back();done(ok,'Holding the new price');},
 subadd:function(el,v){var s=JSON.parse(v);var ok=A.addSub(s[0],s[1],s[2]);go('S-S5',{},true);S.hist.pop();done(ok,'Holding '+inr(s[1])+' for '+s[0]);},
 remind:function(el,v){A.remind(v);S.ctx.share=1;render();toast('Reminder ready to send',false);},
 copy:function(el,v){try{navigator.clipboard.writeText(v).then(function(){toast('Link copied',false);render();},function(){toast('Select the link to copy it',false);render();});}catch(e){toast('Select the link to copy it',false);render();}},
 paidback:function(el,v){var ok=A.payback(v);fx('owed.fill');render();done(ok,'Paid back · dots filled in');},
 addjar:function(){var n=((document.getElementById('jarname')||{}).value||'').trim();if(!n){S.ctx.err='Type a name for the jar.';render();return;}var ok=A.addJar(n);S.ctx.err=ok?null:'A jar with that name already exists.';render();if(ok)toast('Added '+n,true);},
 jstep:function(el,v){var j=S.ctx.j||'Food',b=cur().jars[j].budget;S.ctx.v=Math.max(0,(S.ctx.v==null?b:S.ctx.v)+(+v));render();},
 jsave:function(){var j=S.ctx.j||'Food';var v=S.ctx.v==null?cur().jars[j].budget:S.ctx.v;var ok=A.setJar(j,v);if(ok){back();}else render();done(ok,j+' updated');},
 jrename:function(){var j=S.ctx.j;var n=((document.getElementById('jren')||{}).value||'').trim();var ok=A.renameJar(j,n);if(ok){S.ctx.j=n;S.ctx.err=null;}else S.ctx.err='Pick a new name that no other jar has.';render();if(ok)toast('Renamed',true);},
 jremove:function(){var ok=A.removeJar(S.ctx.j);if(ok){back();toast('Jar removed',true);}else{S.ctx.err='Only an unused jar can be removed. Move its dots first.';render();}},
 mvto:function(el,v){S.ctx.to=v;render();},
 mvstep:function(el,v){S.ctx.amt=Math.max(100,(S.ctx.amt||100)+(+v));render();},
 mvgo:function(){var c=S.ctx;if(!c.to)return;var ok=A.take(c.from||'Food',c.to,c.amt||100);fx('jar.respread');if(ok)back();else render();done(ok,'Moved '+inr(c.amt||100)+' to '+c.to);},
 copylast:function(){var ok=A.copyLast();back();done(ok,'Copied last month’s jars');},
 payeejar:function(el,v,c){act('payee','S',c.p+' → '+v,0,function(){L.payees[c.p].jar=v;});rr(1);},
 /* savings */
 gadd:function(el,v,c){var ok=A.addGoal(c.g,+v);fx('savings.drop');var g=L.goals.filter(function(x){return x.id===c.g;})[0];if(ok&&g.reachedTs&&g.reachedTs.d===L.today.d&&g.saved>=g.target){go('V-04',{g:g.id});}else render();done(ok,'Added '+inr(+v)+' to '+g.name);},
 withdraw:function(el,v,c){var ok=A.withdraw(c.g,c.a);back();done(ok,'Took out '+inr(c.a));},
 ng1:function(el,v){S.ctx={step:2,name:v};render();},
 ng1t:function(){var n=((document.getElementById('gname')||{}).value||'').trim();if(!n){toast('Type a name or pick one',false);render();return;}S.ctx={step:2,name:n};render();},
 ng2:function(el,v){S.ctx.step=3;S.ctx.amt=+v;render();},
 ng3:function(el,v){var ok=A.newGoal(S.ctx.name,S.ctx.amt,v==='No date'?null:v);S.hist=[];go('V-02',{},true);done(ok,'Goal added');},
 lrule:function(el,v){A.setPref('leftoverRule',v,'Leftover rule: '+(v==='savings'?'Savings':'next month'));render();},
 mend:function(el,v){var ok=A.monthEnd(v);S.hist=[];go('N-04',{},true);done(ok,v==='savings'?'Moved to Savings':'Kept for next month');},
 /* insights */
 pin:function(el,v){A.pinInsight(v);rr(1);},
 checkin:function(){A.checkin();fx('week.fresh');back();toast('New week started',false);},
 cday:function(el,v){var c=Object.assign({},L.prefs.checkin,{dow:+v});A.setPref('checkin',c,'Check-in day changed');render();},
 ctime:function(el,v){var c=Object.assign({},L.prefs.checkin,{time:v});A.setPref('checkin',c,'Check-in time changed');render();},
 share:function(){toast('Poster ready to share',false);render();},
 /* app settings */
 pref:function(el,v,c){A.setPref(c.k,v,(c.k==='look'?'Look: ':'Appearance: ')+el.textContent);render();},
 ptog:function(el,v){A.setPref(v,!L.prefs[v],(L.prefs[v]?'Turned off ':'Turned on ')+v);render();},
 nch:function(el,v){act('notif','G','Notification channel '+v+' changed',0,function(){L.notif.channels[v]=!L.notif.channels[v];});render();},
 upitog:function(el,v){var u=L.upiIds.filter(function(u){return u.id===v;})[0];A.upi(v,!u.linked);render();},
 upiadd:function(){var v=((document.getElementById('newupi')||{}).value||'').trim();if(!/^[\w.\-]+@[\w]+$/.test(v)){toast('Type a UPI ID like name@bank',false);render();return;}A.upi(v,true);render();toast('Linked '+v,true);},
 csv:function(){var m=cur();S.ctx.csv='day,payee,jar,source,amount\n'+m.spends.map(function(x){return [x.day,x.payee,x.jar,x.src,x.amt].join(',');}).join('\n');try{navigator.clipboard.writeText(S.ctx.csv).catch(function(){});}catch(e){}render();},
 reset:function(){seedDemo();['H','I','S','V','N'].forEach(function(t){L.seen[t]=1;});S.hist=[];go('H-01',{},true);toast('Demo month restored',false);},
 nact:function(el,v){if(v==='income'){var ok=A.income(9000,'Allowance','regular','split');var m=cur();S.lastIncome=m.incomes[m.incomes.length-1].id;S.hist=[];go('I-01',{},true);done(ok,'Split '+inr(9000)+' · savings first');}
  else if(v==='subTomorrow'){var s=cur().subs.filter(function(s){return s.name==='Google One';})[0];go('S-05',{id:s.id});}
  else if(v==='checkin'){A.checkin();S.hist=[];go('N-01',{},true);toast('New week started',false);}
  else if(v==='story'){go('N-04');}else if(v==='welcome'){A.welcome();S.hist=[];go('H-01',{},true);}},
 welcome:function(){A.welcome();S.hist=[];go('H-01',{},true);}
};
/* payFrom: which tab the Pay button was pressed on */
document.addEventListener('click',function(e){var t=e.target.closest('.payb');if(t&&FR[S.scr])S.payFrom=FR[S.scr].tab==='P'?S.payFrom:FR[S.scr].tab;},true);
/* notifications simulation: calm few (P7-Q1) */
function notifSim(days){var sent=[],ch=L.notif.channels;var cand=[];for(var d=1;d<=days;d++){var dow=(d+2)%7;
  if(d===1||d===31)cand.push({d:d,h:9,type:'income'});if(d===14||d===21)cand.push({d:d,h:18,type:'subTomorrow'});if(dow===L.prefs.checkin.dow)cand.push({d:d,h:19.5,type:'checkin'});
  if(d===2)cand.push({d:d,h:20,type:'story'});if(d===12)cand.push({d:d,h:23,type:'welcome'});if(d===13)cand.push({d:d,h:10,type:'welcome'});}
  var pri={income:0,subTomorrow:1,welcome:2,checkin:3,story:4};cand.sort(function(a,b){return a.d-b.d||pri[a.type]-pri[b.type];});
  cand.forEach(function(c){if(!ch[c.type])return;var h=c.h;if(h>=22||h<8){c.h=h>=22?8:8;c.d+=h>=22?1:0;}
    if(sent.some(function(s){return s.d===c.d;}))return;var wk=Math.floor((c.d-1)/7);if(sent.filter(function(s){return Math.floor((s.d-1)/7)===wk;}).length>=3)return;sent.push(c);});
  return sent;}
