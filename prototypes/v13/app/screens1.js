/* ===== Trickle v12 — frames part 1: onboarding, intros, Home, bell, Pay ===== */
var FR={};
function F(id,o){o.id=id;FR[id]=o;}

/* ---------- Onboarding: Starter month (P5-Q1 B) ---------- */
F('O-00',{kind:'ob',title:'Splash',r:function(){return zt({g:'grove',cls:'splash',attr:' data-a="obsplash" aria-label="Trickle. Tap to start"',h:'Money you can<br><em>see</em>',sub:'Every rupee becomes a dot. Watch the month trickle, calmly.',
  foot:zbtn('Get started','obsplash')+'<a class="zlink" href="#demo" data-a="demo">See a demo month instead</a>'});},
  after:function(){var id=S.scr;clearTimeout(S.splT);S.splT=setTimeout(function(){if(S.scr===id&&id==='O-00')go('O-01',{},true);},reduced()?500:1400);fx('splash.trickle',document.querySelector('.zlogo'));}});
F('O-01',{kind:'ob',title:'Link UPI',r:function(){var apps=['GPay','PhonePe','Paytm','BHIM'],on=S.ob.apps;
  return zt({g:'cool',step:1,steps:3,h:'Link the UPI apps<br><em>you pay with</em>',sub:'Trickle sees payments from the apps you link. Nothing else on your phone.',
  mid:'<div class="chips" role="group" aria-label="UPI apps">'+apps.map(function(a){return '<button class="chip" data-a="obapp" data-v="'+a+'" aria-pressed="'+(on.indexOf(a)>=0)+'">'+a+'</button>';}).join('')+'</div>',
  foot:zbtn(on.length?'Link '+on.join(' + '):'Pick an app to link','oblink')+zlink('I’ll add spends myself','obmanual')});}});
F('O-01m',{kind:'ob',title:'Manual income',r:function(){var v=S.ob.inc;return zt({g:'payday',cls:'tall',back:1,step:1,steps:3,h:'What comes in<br><em>each month?</em>',sub:'Pocket money, allowance, stipend or pay. You can add more sources later.',
  mid:'<p class="amtv" aria-live="polite">'+(v?inr(v):'₹0')+'</p>'+pad('obk')+(S.ob.err?'<p class="small" role="alert">'+S.ob.err+'</p>':'')+
  '<p class="eyb">Usually arrives</p><div class="chips" role="group" aria-label="Usual day">'+[[1,'Start of month'],[10,'Mid-month'],[25,'End of month']].map(function(d){return '<button class="chip" data-a="obday" data-v="'+d[0]+'" aria-pressed="'+(S.ob.day===d[0])+'">'+d[1]+'</button>';}).join('')+'</div>',
  foot:zbtn('Next','obinc')});}});
function pad(a){return '<div class="pad" role="group" aria-label="Amount keypad">'+['1','2','3','4','5','6','7','8','9','00','0','⌫'].map(function(k){return '<button data-a="'+a+'" data-v="'+k+'" aria-label="'+(k==='⌫'?'Delete':k)+'">'+k+'</button>';}).join('')+'</div>';}
F('O-02',{kind:'ob',title:'Student type',r:function(){return zt({g:'ember',cls:'tall',back:1,step:2,steps:3,h:'Which one<br><em>sounds like you?</em>',sub:'We’ll build a starter month from it. You can change anything after.',
  mid:'<div class="choice">'+[['Hostel','Mess food, chai runs, trips home'],['Day scholar','Travel each day, lunch out'],['Renting','Rent, bills, cooking'],['Earning','Part-time work or stipend']].map(function(t){return '<button class="opt" data-a="obtype" data-v="'+t[0]+'"><span class="grow"><b>'+t[0]+'</b><small>'+t[1]+'</small></span>'+ic('chev','')+'</button>';}).join('')+'</div>'});}});
F('O-03',{kind:'ob',title:'Starter month',r:function(){if(!L||!S.ob.built){obBuild();}var m=cur();
  var rows=jarNames().map(function(j){return '<div class="row"><span class="jarname" style="width:86px">'+jsw(j)+j+'</span><span class="grow">'+dots([{amt:m.jars[j].budget,c:jcls(j),pat:jpat(j),st:'solid',name:j}],{size:'widget'})+'</span></div>';}).join('');
  var subs=liveSubs(m);
  return zt({g:'grove',cls:'tall',step:3,steps:3,h:'Your<br><em>starter month</em>',sub:'Built for '+esc(L.type.toLowerCase())+' life from '+inr(incomeIn())+' coming in.',
  mid:key()+'<section class="card" aria-label="Savings first"><h3>Savings go first</h3><div class="sv-drop">'+dots([{amt:m.savingsSplit,c:'sv',st:'solid',name:'Savings'}],{size:'widget'})+'</div></section>'+
  '<section class="card" aria-label="Jars"><h3>Jars for the month</h3>'+rows+'</section>'+
  (subs.length?'<section class="card" aria-label="Held for subscriptions"><h3>Held for subscriptions</h3><p class="sub">'+subs.map(function(s){return s.name;}).join(' · ')+'</p>'+dots([{amt:subsTotal(m),c:'inc',st:'held',name:'Held'}],{size:'widget'})+'</section>':''),
  foot:zbtn('Looks right','obok')+zlink('Change one thing','',{go:'O-04'})});},
  after:function(){fx('savings.drop',document.querySelector('.sv-drop'));}});
F('O-04',{kind:'ob',title:'Change one thing',r:function(){if(!L)obBuild();var m=cur(),line=S.ctx.line;
  if(!line){return zt({g:'grove',cls:'tall',back:1,step:3,steps:3,h:'What would<br><em>you change?</em>',sub:'One line at a time. Everything else stays as it is.',mid:'<div class="list">'+
   li({t:'Savings share',s:'How much goes to savings first',a:'obline',v:'save'})+jarNames().map(function(j){return li({lead:jsw(j),t:j,s:'Jar',a:'obline',v:'jar:'+j});}).join('')+
   liveSubs(m).map(function(s){return li({t:s.name,s:'Subscription',a:'obline',v:'sub:'+s.id});}).join('')+'</div>'});}
  var amt,label,note='';if(line==='save'){amt=m.savingsSplit;label='Savings share';note='The difference comes from or goes to your biggest jar.';}
  else if(line.indexOf('jar:')===0){var j=line.slice(4);amt=m.jars[j].budget;label=j;note='The difference comes from or goes to your biggest other jar.';}
  else{var s=m.subs.filter(function(s){return 'sub:'+s.id===line;})[0];return zt({g:'grove',back:1,step:3,steps:3,h:'Hold<br><em>'+esc(s.name)+'?</em>',sub:'Trickle holds its price inside your budget until it is due.',foot:zbtn('Don’t hold this one','obsubrm',{v:s.id})});}
  return zt({g:'grove',back:1,step:3,steps:3,h:'Change<br><em>'+esc(label)+'</em>',sub:note,mid:'<p class="amtv">'+inr(amt)+'</p><div class="row" style="justify-content:center;gap:16px">'+
   '<button class="chip" data-a="obstep" data-v="-100" aria-label="Less by one hundred">− ₹100</button><button class="chip" data-a="obstep" data-v="100" aria-label="More by one hundred">+ ₹100</button></div>',
   foot:zbtn('Done','obdone')});}});
function obBuild(){seedFresh({type:S.ob.type,apps:S.ob.apps,manual:S.ob.manual,inc:S.ob.manual?S.ob.inc:0,day:S.ob.day});S.ob.built=true;}

/* ---------- tab intros (one page each; reopen via ?) ---------- */
var TGRAD={H:'grove',I:'payday',S:'cool',V:'savings',N:'tide'};
function intro(t,title,body,vis){return {kind:'intro',tab:t,title:title.replace(/<[^>]+>/g,' ').replace(/\s+/g,' '),r:function(){var ix=TABS.map(function(x){return x[0];}).indexOf(t)+1;
  return zt({g:TGRAD[t],cls:'tall',vis:vis(),h:title,sub:body,step:ix,steps:5,foot:zbtn('Got it','introok',{v:t})});}};}
F('H-00',intro('H','Your month<br><em>at a glance</em>','Home shows how the month is going without numbers. Tap any card to see more. The bell keeps everything that happened, and anything that needs you sits on top.',
  function(){return '<section class="card"><p class="eyb">Pace</p>'+glowTrack(0.45,{label:'Where the month is today'})+'<p class="sub">The glow is today. Glow only ever means time or position.</p></section>'+key();}));
F('I-00',intro('I','Where money<br><em>comes from</em>','When money arrives, Trickle asks once how to split it, and you can undo. Income stays plain ink until it is split. Then savings turn green and jars take their colours.',
  function(){return '<section class="card">'+dots([{amt:900,c:'inc',st:'solid',name:'Arrives'}],{zoomable:false})+'<p class="sub">Arrives in ink</p>'+dots([{amt:200,c:'sv',st:'solid',name:'Savings'},{amt:400,c:'j0',st:'solid',name:'Food'},{amt:300,c:'j1',st:'solid',name:'Travel'}],{zoomable:false})+'<p class="sub">Split into savings and jars</p></section>'+key();}));
F('S-00',intro('S','One dot is<br><em>always ₹100</em>','Everything you spend is drawn with the same dot. Solid is money left. Outlined is money spent. Ten dots join into a pill, ten pills into a block. Less than a dot is a slice, filled clockwise from the top.',
  function(){var e=function(a,c,st,t){return '<div class="row"><span style="width:118px;flex:none">'+dots([{amt:a,c:c||'ink',st:st||'solid'}],{zoomable:false,size:'widget'})+'</span><span class="small muted">'+t+'</span></div>';};
   return '<section class="card" aria-label="Full key">'+e(100,'ink','solid','one dot · ₹100')+e(50,'ink','solid','a slice · less than ₹100')+e(1000,'ink','solid','a pill · ₹1,000')+e(10000,'ink','solid','a block · ₹10,000')+
   e(300,'j0','solid','solid · left in a jar')+e(300,'j0','out','outlined · spent')+e(300,'inc','held','dashed · held or owed')+e(300,'sv','solid','green · savings only').replace('aria-label="','aria-label="Savings ')+'</section>'+key();}));
F('V-00',intro('V','Green is only<br><em>for savings</em>','Green dots are money you kept. Solid green is saved, outlined green is still to go. The glow shows when a goal should be reached.',
  function(){var g=L.goals[0];return '<section class="card">'+dots([{amt:g.saved,c:'sv',st:'solid',name:'Saved'},{amt:Math.max(0,g.target-g.saved),c:'sv',st:'out',name:'To go'}],{zoomable:false})+'</section>'+key();}));
F('N-00',intro('N','Four cards,<br><em>more on tap</em>','Insights starts with four cards: what changed, where it went, small buys, and your month story. Twelve more views wait in the library. Pin the ones you like.',
  function(){return '<section class="card"><p class="eyb">What changed</p>'+dots([{amt:900,c:'ink',st:'ghost',name:'Last week'}],{zoomable:false})+'<p class="sub">Dotted outline is last time, for comparison.</p></section>'+key();}));

/* ---------- Home ---------- */
var WLIB={pace:{n:'Pace',wide:1},jar:{n:'Jar left'},little:{n:'Little things'},subs:{n:'Subscriptions next due'},next:{n:'Next money in'},goal:{n:'Goal progress',wide:1},owed:{n:'Owed to you'},repeat:{n:'Repeat buys'},week:{n:'This week'},story:{n:'Month story'}};
function widget(id){var m=cur(),h='',go='';
 if(id==='pace'){go='S-01';h='<p class="eyb">Pace</p><p class="lead">'+paceWord()+'</p>'+glowTrack(timeFrac(),{label:'Today in the month',marks:[{f:paceFrac()}]})+'<p class="sub">'+paceLine()+'. The glow is today; the line is where spending has reached.</p>';}
 if(id==='jar'){go='S-01';h='<p class="eyb">Jar left</p>'+jarNames().map(function(j){return '<div><p class="small jarname">'+jsw(j)+j+'</p>'+dots([{amt:left(j),c:jcls(j),pat:jpat(j),st:'solid',name:j+' left'}],{size:'widget'})+'</div>';}).join('');}
 if(id==='little'){go='N-01';var sb=smallBuys().reduce(function(a,x){return a+x.amt;},0);h='<p class="eyb">Little things</p>'+dots([{amt:sb,c:'ink',st:'out',name:'Small buys this month'}],{size:'widget'})+'<p class="sub">Chai, xerox and mess snacks, added up</p>';}
 if(id==='subs'){go='S-01';var nx=liveSubs(m).filter(function(s){return s.state==='held';}).sort(function(a,b){return a.due-b.due;})[0];
   h='<p class="eyb">Subscriptions</p>'+(nx?'<p class="lead">'+esc(nx.name)+'</p><p class="sub">'+(nx.due-L.today.d===1?'Due tomorrow':nx.due===L.today.d?'Due today':'Due later this month')+' · money held</p>'+glowTrack(nx.due/dim(L.today.y,L.today.m),{n:16,w:140,label:'When it is due'}):'<p class="sub">All paid this month</p>');}
 if(id==='next'){go='I-01';var ni=nextIncome();h='<p class="eyb">Next money in</p><p class="lead">'+(ni?esc(ni.src.name):'None set')+'</p>'+(ni?glowTrack(1-ni.days/31,{n:16,w:140,label:'How close the next money is'})+'<p class="sub">Start of next month</p>':'');}
 if(id==='goal'){go='V-01';var g=L.goals.filter(function(g){return !g.reachedTs;})[0]||L.goals[0];h='<p class="eyb">Goal</p><p class="lead">'+esc(g.name)+'</p>'+dots([{amt:g.saved,c:'sv',st:'solid',name:'Saved'},{amt:Math.max(0,g.target-g.saved),c:'sv',st:'out',name:'To go'}],{size:'widget'})+'<p class="sub">Solid is saved, outline is still to go</p>';}
 if(id==='owed'){go='S-01';h='<p class="eyb">Owed to you</p>'+dots([{amt:owedOpen(),c:'inc',st:'owed',name:'Owed'}],{size:'widget'})+'<p class="sub">'+L.owed.filter(function(o){return o.back<o.amt;}).map(function(o){return o.friend;}).join(', ')+'</p>';}
 if(id==='repeat'){go='S-01';var p=topRepeat();h='<p class="eyb">Repeat buys</p><p class="lead">'+esc(p||'None yet')+'</p><p class="sub">Your most frequent small buy</p>';}
 if(id==='week'){go='N-01';h='<p class="eyb">This week</p>'+dots([{amt:weekSpend(1),c:'ink',st:'ghost',name:'Last week'}],{size:'widget'})+'<p class="sub">Dotted is last week</p>';}
 if(id==='story'){go='N-04';h='<p class="eyb">Month story</p><p class="lead">'+MONL[(L.today.m+11)%12]+'</p><p class="sub">Five cards, ready to read</p>';}
 return '<button class="card tile'+(WLIB[id].wide?' wide':'')+'" data-go="'+go+'" aria-label="'+WLIB[id].n+'">'+h+'</button>';}
F('H-01',{tab:'H',kind:'tab',title:'Home',r:function(){var ids=L.prefs.home;
  var empty=spentAll()===0?'<section class="card"><p class="lead">All your dots are here.</p><p class="sub">Pay with UPI or log cash and watch them change.</p></section>':'';
  return homeGlow()+hd('Home',{wm:1,bell:1,gear:'H-03',avatar:1,help:'H-00'})+'<main class="scr">'+empty+'<div class="grid">'+ids.map(widget).join('')+(ids.length<6?'<button class="card addw" data-go="H-04" aria-label="Add a widget">'+ic('plus','')+'<span class="small">Add widget</span></button>':'')+'</div>'+key()+'<button class="link" data-go="H-03" style="align-self:center">Edit board</button></main>';}});
F('H-03',{tab:'H',kind:'push',title:'Edit board',r:function(){var ids=L.prefs.home;
  return hd('Edit board',{back:1})+'<main class="scr"><p class="muted">Up to six widgets. Home never shows amounts.</p><div class="card list">'+ids.map(function(id,i){return '<div class="li"><span class="t"><b>'+WLIB[id].n+'</b></span>'+
   '<button class="ib" data-a="wup" data-v="'+id+'" aria-label="Move '+WLIB[id].n+' up"'+(i===0?' disabled':'')+'>'+ic('up')+'</button><button class="ib" data-a="wdown" data-v="'+id+'" aria-label="Move '+WLIB[id].n+' down">'+ic('down')+'</button><button class="chip" data-a="whide" data-v="'+id+'">Hide</button></div>';}).join('')+'</div>'+
   (ids.length<6?btn('Add a widget','',{go:'H-04'}):'<p class="small muted">Board is full. Hide one to add another.</p>')+'</main>';}});
F('H-04',{tab:'H',kind:'sheet',base:'H-03',title:'Add a widget',r:function(){var ids=L.prefs.home;var av=Object.keys(WLIB).filter(function(k){return ids.indexOf(k)<0;});
  return '<h2>Add a widget</h2><p class="muted small">Every Home widget is drawn without amounts.</p><div class="choice">'+av.map(function(k){return '<button class="opt" data-a="wadd" data-v="'+k+'"><span class="grow"><b>'+WLIB[k].n+'</b></span>'+ic('plus','')+'</button>';}).join('')+'</div>';}});

/* ---------- Bell ---------- */
function needRow(n){var x=findSpend(n.ref);if(!x)return '';
 if(n.kind==='sort'){var g=guessJars(x);return '<section class="card" aria-label="Sort a payment"><p class="eyb">Sort payment</p><p><b>'+inr(x.amt)+'</b> to '+esc(x.payee)+'. Which jar?</p><div class="chips" role="group" aria-label="Pick a jar">'+g.map(function(j){return '<button class="chip" data-a="sortjar" data-v="'+j+'" data-ctx=\''+JSON.stringify({id:x.id,need:n.id})+'\'>'+jsw(j)+j+'</button>';}).join('')+'</div></section>';}
 if(n.kind==='refund'){return '<section class="card" aria-label="Refund"><p class="eyb">Refund</p><p><b>'+inr(x.refundPending)+'</b> back from '+esc(x.payee)+'.</p><div class="chips"><button class="chip on" data-a="refund" data-ctx=\''+JSON.stringify({id:x.id,need:n.id})+'\'>Return it to '+x.jar+'</button></div></section>';}
 if(n.kind==='split'){return '<section class="card" aria-label="Split"><p class="eyb">Split it?</p><p><b>'+inr(x.amt)+'</b> at '+esc(x.payee)+' looks shared.</p><div class="chips"><button class="chip" data-go="S-04" data-ctx=\''+JSON.stringify({id:x.id,split:1,need:n.id})+'\'>Split it</button><button class="chip" data-a="dismiss" data-v="'+n.id+'">Just mine</button></div></section>';}
 if(n.kind==='late'){return '<section class="card"><p class="eyb">Late income</p><p>Allowance is later than usual.</p><div class="chips"><button class="chip" data-go="R-05">See note</button></div></section>';}
 return '';}
function guessJars(x){var g=[];var p=L.payees[x.payee];if(p)g.push(p.jar);['Food','Fun','Travel','Study'].forEach(function(j){if(cur().jars[j]&&g.indexOf(j)<0)g.push(j);});return g.slice(0,3);}
F('H-02',{tab:'H',kind:'push',title:'Bell',exempt:1,r:function(){var f=S.ctx.f||'all';var lg=L.log.filter(function(e){return f==='all'||e.tab===f;});
  return hd('Bell',{back:1})+'<main class="scr">'+(L.needs.length?'<p class="eyb">Needs you</p>'+L.needs.map(needRow).join(''):'<p class="muted">Nothing needs you right now.</p>')+
  '<p class="eyb">Activity</p><div class="chips" role="group" aria-label="Filter by tab">'+[['all','All'],['I','Income'],['S','Spending'],['V','Savings'],['N','Insights']].map(function(c){return '<button class="chip" data-go="H-02" data-ctx=\'{"f":"'+c[0]+'"}\' aria-pressed="'+(f===c[0])+'">'+c[1]+'</button>';}).join('')+'</div>'+
  '<div class="card list">'+lg.slice(0,40).map(function(e){return '<div class="li"><span class="t"><b>'+esc(e.text)+'</b><small>'+dd(e.ts.d,e.ts.m)+' · '+(TABS.filter(function(t){return t[0]===e.tab;})[0]||['','App'])[1]+'</small></span></div>';}).join('')+'</div><p class="small muted">Activity is kept for ninety days.</p></main>';}});

/* ---------- Pay ---------- */
F('P-01',{tab:'P',kind:'full',title:'Scan',r:function(){return '<div class="cam"><header class="hd" style="color:#f4f4f5"><h1>Scan to pay</h1><button class="ib" data-a="payclose" aria-label="Close" style="color:#f4f4f5">'+ic('close')+'</button></header>'+
  '<button class="vf" data-a="scanned" aria-label="Simulate scanning Ramu Tea Stall QR"><i></i><i></i><i></i><i></i></button><p style="text-align:center;color:#b4b4ba" class="small">Point at any UPI QR. In this prototype, tap the frame to scan.</p>'+
  '<div class="chips" style="justify-content:center;margin-top:auto;padding:0 16px 32px"><button class="chip" data-go="P-02">Pay UPI ID</button><button class="chip" data-go="P-03">Log cash</button></div></div>';}});
F('P-02',{tab:'P',kind:'full',title:'Pay UPI ID',r:function(){var rec=['Ramu Tea Stall','Rapido','Swiggy','Xerox shop','Arjun'];return hd('Pay UPI ID',{back:1})+'<main class="scr nobar"><label class="eyb" for="upiid">UPI ID or number</label><input class="inp" id="upiid" placeholder="name@bank" autocomplete="off">'+btn('Continue','upinext',{block:true})+
  '<p class="eyb">Recent</p><div class="card list">'+rec.map(function(r){return li({t:r,a:'payee',v:r});}).join('')+'</div></main>';}});
F('P-03',{tab:'P',kind:'full',title:'Log cash',r:function(){var c=S.ctx;var j=c.jar||'Food';return hd('Log cash',{back:1})+'<main class="scr nobar"><p class="muted small">Cash spends are saved without UPI.</p><p class="amtv" aria-live="polite">'+inr(c.amt||0)+'</p>'+pad('cashk')+
  '<div class="chips" role="group" aria-label="Jar">'+jarNames().map(function(x){return '<button class="chip" data-a="cashjar" data-v="'+x+'" aria-pressed="'+(x===j)+'">'+jsw(x)+x+'</button>';}).join('')+'</div>'+btn('Save','cashsave',{primary:true})+'</main>';}});
F('P-04',{tab:'P',kind:'full',title:'Amount',r:function(){var c=S.ctx;var payee=c.payee||'Ramu Tea Stall';var p=L.payees[payee];var j=c.jar||(p&&p.jar)||'Food';var amt=c.amt==null?(p&&p.unit)||0:c.amt;S.ctx.payee=payee;S.ctx.jar=j;S.ctx.amt=amt;
  var lines=[];var rc=repeatCount(payee,7);if(rc>=2&&amt<100)lines.push(ordw(rc+1)+' '+(p&&p.thing?p.thing.replace(/s$/,''):'buy')+' this week');
  if(left(j)-amt<daySpread(j)*3)lines.push(jarLowLine(j,amt));
  var spl=c.split&&c.split.length?'<p class="small muted">Split with '+c.split.join(', ')+'</p>':'';
  return hd(payee,{back:1})+'<main class="scr nobar"><p class="amtv" aria-live="polite">'+inr(amt)+'</p>'+
   '<div class="chips" role="group" aria-label="Jar" style="justify-content:center"><button class="chip on" data-a="jarcycle" aria-label="Jar: '+j+'. Tap to change">'+jsw(j)+j+' '+ic('down','')+'</button></div>'+
   (S.ctx.pick?'<div class="chips" role="group" aria-label="Pick a jar" style="justify-content:center">'+jarNames().filter(function(x){return x!==j;}).map(function(x){return '<button class="chip" data-a="payjar" data-v="'+x+'">'+jsw(x)+x+'</button>';}).join('')+'</div>':'')+
   lines.map(function(l){return '<p class="small muted" style="text-align:center">'+l+'</p>';}).join('')+spl+pad('payk')+
   '<div class="row"><span class="grow small">Split with friends</span><button class="tog" role="switch" data-a="splittog" aria-checked="'+!!spl+'" aria-label="Split with friends"></button></div>'+
   btn('Pay '+inr(amt)+' with UPI','paynow',{primary:true})+'</main>';}});
function jarLowLine(j,amt){var d=daysLeft(),l=Math.max(0,left(j)-amt);return 'Then '+j+' has '+inr(Math.floor(l/d))+' a day';}
F('P-05',{tab:'P',kind:'full',dctx:{amt:60,payee:'Ramu Tea Stall',jar:'Food'},title:'Paying',r:function(){var c=S.ctx;return '<div class="ob" style="align-items:center;justify-content:center;text-align:center"><div class="hg drop">'+ic('hg','hgi')+dots([{amt:c.amt||60,c:jcls(c.jar||'Food'),pat:jpat(c.jar||'Food'),st:'solid',name:'Paying'}],{size:'hero',zoomable:false})+'</div>'+
  '<h1>Opening '+esc(L.upiIds.filter(function(u){return u.linked;}).map(function(u){return u.app;})[0]||'UPI')+'…</h1><p class="muted">Paying '+esc(c.payee||'')+'. Your dots move when the payment goes through.</p></div>';},
  after:function(){var el=document.querySelector('.hg');fx('pay.hourglass',el);var id=S.scr,c=S.ctx;clearTimeout(S.payT);S.payT=setTimeout(function(){if(S.scr!==id)return;payCommit(c);},reduced()?200:1100);}});
F('P-06',{tab:'P',kind:'sheet',dctx:{amt:250,payee:'PVR Cinemas',jar:'Fun'},base:'P-04',title:'Jar is low',r:function(){var c=S.ctx,j=c.jar,need=c.amt-left(j);var src=jarNames().filter(function(x){return x!==j&&left(x)>=need;}).sort(function(a,b){return left(b)-left(a);});
  return '<h2>'+j+' has '+inr(left(j))+'. Take '+inr(need)+' from '+src[0]+'?</h2><p class="muted">Asked once, before UPI opens. The days ahead re-spread a little; nothing else changes.</p>'+
  btn('Take from '+src[0],'takepay',{primary:true,v:src[0]})+(src.length>1?'<div class="chips" role="group" aria-label="Another jar">'+src.slice(1).map(function(x){return '<button class="chip" data-a="takepay" data-v="'+x+'">From '+x+'</button>';}).join('')+'</div>':'');}});
F('P-06b',{tab:'P',kind:'sheet',dctx:{amt:250,payee:'Birthday treat',jar:'Fun'},base:'P-04',title:'All jars used',r:function(){var c=S.ctx;var need=Math.max(0,(c.amt||250)-left(c.jar||'Fun'));
  return '<h2>Your jars are used for this month</h2><p class="muted">Pick how to pay this '+inr(c.amt||250)+'.</p><div class="choice"><button class="opt def" data-a="lighterpay"><span class="grow"><b>Start next month '+inr(c.amt||250)+' lighter</b><small>Default. Next month’s jars begin a little smaller.</small></span></button>'+
  '<button class="opt" data-a="savingspay"><span class="grow"><b>Use savings</b><small>Taken from general savings first</small></span></button></div>';}});
F('P-07',{tab:'P',kind:'sheet',dctx:{amt:1200,payee:'Saravana Bhavan',jar:'Food'},base:'P-04',title:'Split at pay',r:function(){var sel=S.ctx.split||[];var fr=['Arjun','Meera','Kiran','Rohan'];
  return '<h2>Split '+inr(S.ctx.amt||0)+' equally</h2><p class="muted small">You pay the whole bill. Friends’ shares wait as owed, outside your balance.</p><div class="chips" role="group" aria-label="Friends">'+fr.map(function(f){return '<button class="chip" data-a="splitf" data-v="'+f+'" aria-pressed="'+(sel.indexOf(f)>=0)+'">'+f+'</button>';}).join('')+'</div>'+btn(sel.length?'Split with '+sel.length+(sel.length>1?' friends':' friend'):'Pick friends','splitdone',{primary:true});}});
function payCommit(c){var ok;if(c.fund==='lighter')ok=A.lighter(c.amt,c.jar,c.payee);else ok=A.pay({amt:c.amt,jar:c.jar,payee:c.payee,src:'upi',split:c.split});
  fx('pay.done');var tab=S.payFrom||'H';S.hist=[];go(tabRoot(tab),{},true);if(ok&&c.amt%100)fx('crumbs.snap',document.querySelector('main'));toast(ok?'Paid '+inr(c.amt)+' · '+c.jar:'Payment not saved',ok);}
