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
function runPop(){var st=document.querySelector('.paystage');if(st)st.classList.add('go');shapeNotes(S._payNotes||[],200,90);if(S._soft){S._soft=0;play('soft',500);}var ov=document.querySelectorAll('.paystage i.ov');ov.forEach(function(t,i){t.style.animationDelay=(700+i*60)+'ms';t.classList.add('pop');});}
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
  var pay=Math.min(amt,left),full=breakdown(left),stay=left-pay>=5?breakdown(left-pay):[],go=pay>=5?breakdown(pay):[],cnt=function(a){var o={};a.forEach(function(l){if(!l.hollow)o[l.k]=(o[l.k]||0)+1;});return o;},cf=cnt(full),cs=cnt(stay),cg=cnt(go),broke=[],fresh={};
  LAD.forEach(function(l){var need=(cs[l.k]||0)+(cg[l.k]||0),have=cf[l.k]||0;if(have>need)for(var q=0;q<have-need;q++)broke.push(l);if(need>have)fresh[l.k]=need-have;});
  var all=stay.map(function(l){return {l:l,go:0};}).concat(go.map(function(l){return {l:l,go:1};})).sort(function(x,y){return y.l.v-x.l.v||x.go-y.go;}),gi=0,fr=Object.assign({},fresh);
  var sp=all.map(function(x){var o=Object.assign(ct(c),{sh:x.l.k});if(x.l.hollow)o.hollow=1;if(fr[x.l.k]>0&&broke.length){fr[x.l.k]--;o.cls='brk';}if(x.go){o.cls=(o.cls||'')+' ch';o.d=Math.min(600,gi++*90);}return o;});
  if(left<5&&left>0)sp=[{sh:'dot',c:catColor(c),hollow:1}];
  var overN=0;if(over>=5){var ob=pileSpecs(over,{cls:'ov'});overN=ob.length;sp=sp.concat(ob);}else if(over>0)overN=1;
  S._payNotes=go.map(function(l){return l.k;}).slice(0,6);S._broke=broke.length;
  var nT=Math.max(sp.length,1),cols=Math.min(8,nT),u=0;
  var rpt=s.payee?weekCount(s.payee.n):0;
  b='<h2>'+(log?'':'Paying '+esc(s.payee.n)+' ')+fmt(amt)+'</h2><div class="stage paystage" aria-live="polite">'+(sp.length?tg(sp,cols,Math.min(30,Math.max(18,Math.floor(270/cols)-6)),6,{center:1,attr:'data-a="reveal" data-v="'+c+' has '+fmt(left)+'" aria-label="'+c+' has '+fmt(left)+', shapes by amount"'}):'<p class="muted">'+c+' is empty</p>')+(broke.length?'<p class="brkline">'+G(broke[0].k,catColor(c),16)+' A '+fmt(broke[0].v)+' '+broke[0].n.toLowerCase()+' breaks into change</p>':'')+'<p class="muted" style="text-align:center"><span class="cdot '+catK(c)+'" style="background:'+catColor(c)+'"></span> '+c+' has '+fmt(left)+' · outlined shapes leave</p>'+pkey(left+Math.max(0,over))+'</div>'+
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
 (s.people.length?'<div class="stage">'+tg(rep(s.people.length+1,{c:catColor(t.cat)}).map(function(x,i){return i===0?{c:'var(--text)'}:x;}),s.people.length+1,30,8,{center:1})+'<p class="muted">You and '+s.people.length+' '+(s.people.length===1?'friend':'friends')+', as shapes</p></div>':''),
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
SHEETS.subs=function(){return sheetWrap(shHead('Subscriptions'),'<h2>Things that renew</h2><p class="muted">Shown as shapes. They come out of the category they belong to.</p>'+SUBS.map(function(s){return '<div class="tx" style="cursor:default"><span class="ico" style="color:'+catColor(s.cat)+'">'+ic('music',18)+'</span><span class="m"><b>'+s.name+'</b><small>'+s.cat+' · every month on the '+s.day+'th</small></span><span class="amt">'+fmt(s.amt)+'</span></div>';}).join(''),'<button class="btn sec" data-a="close">Close</button>');};
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
 if(s.step===2)b='<h2>How much?</h2><p class="muted">'+ukey(TILE)+'.</p><div class="chips">'+[1,2,3,5].map(function(n){return '<button class="chip" data-a="mv" data-x="amt:'+n+'"'+((p.b[s.from]||0)<n*TILE?' disabled style="opacity:.35"':'')+'>'+tg(rep(n,{sh:'tri',c:catColor(s.from)}),n,10,3)+' '+n+'</button>';}).join('')+'</div>';
 return sheetWrap(shHead('',3,s.step),b,'');};
A.mv=function(x){var s=S.sheet,k=x.split(':');if(k[0]==='from'){s.from=k[1];s.step=1;}else if(k[0]==='to'){s.to=k[1];s.step=2;}else{var a=+k[1]*TILE;xfer(NOW,[{ref:'budget:'+s.from,amt:a}],[{ref:'budget:'+s.to,amt:a}],'move',{note:'Moved '+s.from+' → '+s.to});S.sheet=null;toast('Moved '+fmt(a)+' from '+s.from+' to '+s.to+'.');}render();};
/* ---------- INCOME ---------- */
A.addincome=function(){sheet('addinc',{amt:''});};
SHEETS.addinc=function(){var s=S.sheet;return sheetWrap(shHead('Add income'),'<h2>How much came in?</h2><div class="amt-big">₹'+(s.amt||'0')+'</div><div class="chips" style="justify-content:center">'+['500','1500','3000'].map(function(v){return '<button class="chip" data-a="quick" data-x="'+v+'">₹'+v+'</button>';}).join('')+'</div><div class="keys">'+['1','2','3','4','5','6','7','8','9','','0','del'].map(function(k){return k?'<button data-a="key" data-x="'+k+'">'+(k==='del'?'⌫':k)+'</button>':'<span></span>';}).join('')+'</div>','<button class="btn" data-a="incok">Add and sort it</button>');};
A.incok=function(){var a=+S.sheet.amt;if(!(a>0))return;incomeArrives(a,'Added income','Manual');};
A.cafe=function(){incomeArrives(1500,'Café shift','UPI');};
function incomeArrives(amt,name,src){NOW+=60e3;var inc=push({type:'income',ts:NOW,amt:amt,merchant:name,source:src,account:src==='UPI'?UPI_IDS[0]:null,incomeCat:'Part-time'});var r=autoSplit(inc);S.lastIncome=inc.id;S.drawer=false;S.tab='money';S.open='income';S.sheet={k:'incconf',id:inc.id,fill:r.fill,save:r.save,goal:r.goal.id,amt:amt,name:name};S.after=runIncome;render();}
SHEETS.incconf=function(){var s=S.sheet,g=goalById(s.goal),u=s.u=unitFor([s.amt],30),n=Math.max(1,tcount(s.amt,u)),nf=Math.min(n,Math.round(s.fill/u)),ns=n-nf;
 return sheetWrap(shHead(''),'<h2>'+esc(s.name)+' arrived</h2><div class="stage incstage"><div>'+tg(rep(n,{sh:SH[u],c:'var(--calm)'}),Math.min(n,9),18,5,{center:1,attr:'id="inctiles"'})+'<div class="split3" style="margin-top:6px"><div class="lab">'+tkey(ukey(u))+'</div></div></div><div class="split3">'+(nf?'<div>'+tg(rep(nf,{sh:SH[u],}),Math.min(nf,6),18,5,{attr:'id="incb"'})+'<div class="lab">Budget</div></div>':'')+'<div>'+tg(rep(Math.max(ns,1),{sh:SH[u]}),Math.min(Math.max(ns,1),6),18,5,{attr:'id="incs"'})+'<div class="lab">'+esc(g.name)+'</div></div></div></div>'+
  '<p class="big" style="font-family:var(--display);font-size:24px">'+(s.fill?'Budget topped up. ':'Your budget was already full. ')+fmt(s.save)+' went to '+esc(g.name)+'.</p><p class="muted">'+esc(g.name)+' is now '+goalWords(g)+'.</p>',
  '<button class="btn" data-a="close">Got it</button><button class="btn ghost" data-a="incundo">Undo, I’ll sort it myself</button>','data-sheet="incconf"');};
function runIncome(){var src=document.querySelectorAll('#inctiles i'),b=document.querySelectorAll('#incb i'),sv=document.querySelectorAll('#incs i'),s=S.sheet;if(!s)return;var nf=b.length;play('income');var k0=(src[0]&&(src[0].className.match(/s-(\w+)/)||[])[1])||'tri';shapeNotes(Array(Math.min(6,src.length)).fill(k0),300,110);if(sv.length&&s.save!==0)play('save',Math.min(1400,300+src.length*80));
 src.forEach(function(t,i){setTimeout(function(){t.style.transform='scale(0)';t.style.opacity='0';var tgt=i<nf?b[i]:sv[i-nf];if(tgt){var col=i<nf?'var(--fillg)':'var(--save)',k=(tgt.className.match(/s-(\w+)/)||[])[1]||'tri';tgt.style.color=col;var sv0=tgt.querySelector('svg');if(sv0)sv0.innerHTML=ginner(k,'currentColor',0);}},isReduced()?0:250+Math.min(i*80,900));});}
A.incundo=function(){var s=S.sheet;undoIncomeSplit(s.id);S.sheet=null;S.open='income';toast('Undone. It’s waiting as new money.');render();};
/* ---------- GOALS ---------- */
A.goal=function(id){sheet('goal',{id:id});};
SHEETS.goal=function(){var g=goalById(S.sheet.id),p=POOLS(),s=p.g[g.id]||0,src=p.nm>0?'new money':'Rainy-day jar';
 var moves=TX.filter(function(t){return t.type==='transfer'&&(t.dst.some(function(x){return x.ref==='goal:'+g.id;})||t.src.some(function(x){return x.ref==='goal:'+g.id;}));}).slice(-5).reverse();
 return sheetWrap(shHead(esc(g.name)),'<div style="display:flex;justify-content:center">'+waffle(g,22,{highlight:S.sheet.hl||0})+'</div><p style="text-align:center"><span style="font-family:var(--display);font-size:26px">'+fmt(s)+'</span> <span class="muted">of '+fmt(g.target)+'</span></p><p class="muted" style="text-align:center">Filled shapes are saved, outlines still to go. '+esc(g.name)+' is '+goalWords(g)+'.</p>'+
  '<div class="card"><b>Add to it</b><p class="muted" style="font-size:13px">From your '+src+'.</p><div class="chips">'+[100,500,1000].map(function(v){return '<button class="chip" data-a="gadd" data-x="'+v+'">+'+fmt(v)+'</button>';}).join('')+'</div></div>'+
  goalExtras(g)+'<details class="card"><summary style="cursor:pointer;min-height:32px"><b>Moves</b></summary>'+moves.map(txRow).join('')+'</details>','');};
A.gadd=function(v){v=+v;var g=goalById(S.sheet.id),p=POOLS(),src=p.nm>=v?'new_money':'goal:general';if(src==='goal:general'&&(p.g.general||0)<v){toast('Not enough in your Rainy-day jar for that.');render();return;}
 xfer(NOW,[{ref:src,amt:v}],[{ref:'goal:'+g.id,amt:v}],'save',{note:'Added to '+g.name});S.sheet.hl=Math.max(1,Math.round(v/g.target*100));
 if((POOLS().g[g.id]||0)>=g.target){S.sheet={k:'reached',id:g.id};play('goal');}else{play('save');toast(fmt(v)+' went to '+esc(g.name));}render();};
SHEETS.reached=function(){var g=goalById(S.sheet.id);return sheetWrap(shHead(''),'<div class="moment" style="padding-top:20px">'+waffle(g,18)+'<p class="big">'+esc(g.name)+' is full.</p><p class="muted">Every shape, put there by you. What now?</p></div>','<button class="btn" data-a="gspend">Use it for '+esc(g.name)+'</button><button class="btn ghost" data-a="close">Keep saving</button>');};
A.gspend=function(){var g=goalById(S.sheet.id),a=Math.round(POOLS().g[g.id]||0);xfer(NOW,[{ref:'goal:'+g.id,amt:a}],[{ref:'budget:Travel',amt:a}],'goal_spend',{note:g.name+' goal reached'});g.reachedTs=NOW;
 if(!GOALS.some(function(x){return !x.general&&!x.reachedTs;})){GOALS.push({id:'g'+(++SEQ),name:'Next adventure',target:5000,icon:'sun'});xfer(NOW,[{ref:'goal:general',amt:Math.min(200,Math.floor(POOLS().g.general||0))}],[{ref:'goal:'+GOALS[GOALS.length-1].id,amt:Math.min(200,Math.floor(POOLS().g.general||0))}],'headstart');}
 S.sheet=null;toast(fmt(a)+' is ready to spend on '+esc(g.name)+'. Pay for it from Travel.');render();};
A.goalnew=function(){sheet('goalnew',{step:0});};
SHEETS.goalnew=function(){var s=S.sheet,b='';
 if(s.step===0)b='<h2>What are you saving for?</h2><div style="display:flex;flex-direction:column;gap:8px">'+[['New phone','spark'],['Concert tickets','music'],['Laptop','money'],['Trip home','bus']].map(function(x){return '<button class="opt" data-a="gn" data-x="name:'+x[0]+'">'+ic(x[1])+'<span class="t"><b>'+x[0]+'</b></span></button>';}).join('')+'</div><input class="fld" id="gname" placeholder="Or type your own" aria-label="Goal name"><button class="btn sec" data-a="gnown">Use my own</button>';
 if(s.step===1)b='<h2>How big is '+esc(s.name)+'?</h2><div style="display:flex;flex-direction:column;gap:8px">'+[2000,5000,10000,20000].map(function(v){return '<button class="opt" data-a="gn" data-x="amt:'+v+'"><span class="t"><b>'+fmt(v)+'</b><small>Each shape will be '+fmt(v/100)+'</small></span></button>';}).join('')+'</div>';
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
