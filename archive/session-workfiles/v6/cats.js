/* ===== Categories (Share + Monthly), detail, budget / category sheets ===== */
function elapsed(p){return p==='day'?(NOW-TODAY)/DAY:p==='week'?(NOW-weekStart())/(7*DAY):(NOW-monthStart())/(DIM*DAY);}
function catStatus(n,p){var r=range(p),sp=sum(txIn(r[0],r[1],function(t){return t.cat===n;})),b=budget(n,p);return {sp:sp,b:b,k:statusOf(b?sp/b:0,b?sp/elapsed(p)/b:0)};}
function miniBullet(n,p,W){var st=catStatus(n,p);return bullet([{val:st.sp,color:col(n),label:n+' spent '+PLABEL[p]}],st.b,{w:W||120,h:18,bh:8,pace:elapsed(p)});}
function setPeriod(p){S.period=p;closeSheet();if(S.cur==='categories'||S.cur==='categoryDetail')rerender();}
function seg(opts,cur,fn){return '<div class="seg">'+opts.map(function(o){return '<button class="'+(o[0]===cur?'on':'')+'" onclick="'+fn+'(\''+o[0]+'\')">'+o[1]+'</button>';}).join('')+'</div>';}
function setCatView(v){S.catView=v;rerender();}
function openCat(n){S.selCat=n;go('categoryDetail');}
FR.categories=function(el){var p=S.period,r=range(p),by=spendBy(r[0],r[1],'cat'),tot=sum(Object.keys(by).map(function(k){return by[k];}));
 var h=topbar('Categories',null,'<button class="pill" onclick="openSheet(\'budgetSheet\')">Edit budget</button><button class="pill" onclick="openSheet(\'editCatsSheet\')">Edit</button>')+'<div class="pad">';
 h+='<div class="between" style="margin-bottom:12px">'+(S.catView==='share'?seg([['day','Day'],['week','Week'],['month','Month']],p,'setPeriod'):'<button class="pill" onclick="openSheet(\'periodSheet\')">Apr – Sep</button>')+seg([['share','Share'],['monthly','Monthly']],S.catView,'setCatView')+'</div>';
 if(S.catView==='share'){
  var items=CATS.map(function(c){return {name:c.name,val:by[c.name]||0,color:SLOT[c.slot],icon:c.icon,dbl:'cat:'+c.name};});if(by.Other)items.push({name:'Other',val:by.Other,color:SLOT.other,icon:'other'});
  var top=items.slice().sort(function(a,b){return b.val-a.val;})[0];
  h+='<div class="card">'+cardH('Share of spending · '+PLABEL[p],tot?esc(top.name)+' took '+pct(top.val,tot)+'% of '+money(tot):'Nothing spent '+PLABEL[p]+' yet')+'<div style="width:320px;max-width:100%;margin:0 auto">'+radialArcs(items.filter(function(i){return i.val>0;}),{w:320,r:150,sw:10,gap:4,center:money(tot),center2:PLABEL[p],period:PLABEL[p]})+'</div>'+foot('Every ring uses the same scale: a full 270° sweep = 100% · tap a ring, double-tap to open · UPI + manual')+'</div>';
  h+='<div class="card" style="padding:6px 16px">'+CATS.map(function(c){var st=catStatus(c.name,p);return '<button class="row" onclick="openCat(\''+esc(c.name)+'\')">'+icon(c.icon,18,SLOT[c.slot])+'<div class="m"><div class="t">'+esc(c.name)+'</div><div class="s">'+money(st.sp)+' of '+money(st.b)+'</div></div><div style="width:110px">'+miniBullet(c.name,p,110)+'</div><span style="width:22px;text-align:center;color:'+STATUS[st.k].c+'" title="'+STATUS[st.k].w+'" aria-label="'+STATUS[st.k].w+'">'+STATUS[st.k].i+'</span></button>';}).join('')
   +'<div class="foot" style="padding-bottom:8px">'+['good','warning','serious','critical'].map(function(k){return '<span style="color:'+STATUS[k].c+'">'+STATUS[k].i+'</span> '+STATUS[k].w;}).join('   ')+' · dashed tick = even pace</div></div>';
 } else {
  var ms=monthStart(),mby=spendBy(ms,NOW,'cat'),mt=sum(Object.keys(mby).map(function(k){return mby[k];}));
  var pit=CATS.map(function(c){return {name:c.name,val:mby[c.name]||0,color:SLOT[c.slot],icon:c.icon,dbl:'cat:'+c.name};});if(mby.Other)pit.push({name:'Other',val:mby.Other,color:SLOT.other,icon:'other'});
  h+='<div class="card">'+cardH('This month · '+MON[8],money(mt)+' across '+pit.filter(function(x){return x.val;}).length+' categories')+pieCallouts(pit,{h:220,r:66,period:'Sep (to date)'})+foot('Top 5 labelled, the rest fold into Other · tap a slice')+'</div>';
  var mlabels=MONTHS.map(function(m){return MON[m];}),cols=CATS.slice(0,8).map(function(c){return {name:c.name,color:SLOT[c.slot]||SLOT.other,icon:c.icon,share:pct(mby[c.name]||0,mt),cells:MONTHS.map(function(m){var rr=monthRange(m);return {spent:sum(txIn(rr[0],rr[1],function(t){return t.cat===c.name;})),budget:c.monthly*(m===8?DOM/DIM:1)};})};});
  var overN=0;cols.forEach(function(c){c.cells.forEach(function(v){if(v.spent>v.budget)overN++;});});
  h+='<div class="card">'+cardH('Six months, budget by budget',overN+' category-months went over budget')+fillJars(cols,mlabels)+foot('Each cell fills to that month’s budget (Sep prorated to day '+DOM+') · ▲ = over · % on top = share of '+MON[8]+' spend')+'</div>';
 }
 el.innerHTML=h+'</div>';};

function squarify(items,x,y,w,h){ /* simple slice-and-dice alternating by aspect */
 var out=[];(function rec(it,x,y,w,h){if(!it.length)return;if(it.length===1){out.push({it:it[0],x:x,y:y,w:w,h:h});return;}
  var tot=sum(it.map(function(i){return i.val;})),acc=0,k=0;while(k<it.length-1&&acc+it[k].val<=tot/2){acc+=it[k].val;k++;}if(k===0){acc=it[0].val;k=1;}
  var a=it.slice(0,k),b=it.slice(k),f=acc/tot;if(w>=h){rec(a,x,y,w*f,h);rec(b,x+w*f,y,w*(1-f),h);}else{rec(a,x,y,w,h*f);rec(b,x,y+h*f,w,h*(1-f));}})(items,x,y,w,h);return out;}
function treemap(items,color,o){o=o||{};var W=o.w||348,H=o.h||150,s=svgOpen(W,H),tones=[1,.8,.65,.52,.4,.3];
 squarify(items,0,0,W,H).forEach(function(r,i){var g=gid();s+='<rect x="'+P(r.x+1)+'" y="'+P(r.y+1)+'" width="'+P(Math.max(0,r.w-2))+'" height="'+P(Math.max(0,r.h-2))+'" rx="4" fill="'+color+'" fill-opacity="'+tones[items.indexOf(r.it)]+'" data-g="'+g+'"'+T(r.it.name+' · '+money(r.it.val)+' · '+r.it.share+'% of category · double-tap to filter')+' data-merch="'+esc(r.it.name)+'"/>';
  if(r.w>54&&r.h>30)s+='<text x="'+P(r.x+7)+'" y="'+P(r.y+16)+'" font-size="11" fill="var(--text)" pointer-events="none">'+esc(trunc(r.it.name,Math.floor(r.w/6.2)))+'</text><text x="'+P(r.x+7)+'" y="'+P(r.y+29)+'" font-size="11" font-weight="600" fill="var(--text)" pointer-events="none">'+money(r.it.val)+'</text>';});
 return '<div class="chart">'+s+'</svg></div>';}
document.addEventListener('dblclick',function(e){var m=e.target.closest&&e.target.closest('[data-merch]');if(m){S.txSearch=m.dataset.merch;S.txFilter='All';go('transactions');}});
FR.categoryDetail=function(el){var n=S.selCat||CATS[0].name,c=cat(n)||{name:n,slot:'other',icon:'other',monthly:0},p=S.period,st=catStatus(n,p),color=col(n);
 var d=daily(21,function(t){return t.cat===n;}),db=budget(n,'day'),ms=monthStart(),mm={};txIn(ms,NOW,function(t){return t.cat===n;}).forEach(function(t){mm[t.merchant]=(mm[t.merchant]||0)+t.amt;});
 var mt=sum(Object.keys(mm).map(function(k){return mm[k];})),mk=Object.keys(mm).sort(function(a,b){return mm[b]-mm[a];}),items=mk.slice(0,5).map(function(k){return {name:k,val:mm[k],share:pct(mm[k],mt)};});
 if(mk.length>5){var rv=sum(mk.slice(5).map(function(k){return mm[k];}));items.push({name:'Other',val:rv,share:pct(rv,mt)});}
 var over=d.filter(function(x){return x.v>db;}).length;
 el.innerHTML=topbar(n,'go(\'categories\')')+'<div class="pad"><div class="between" style="margin-bottom:12px">'+seg([['day','Day'],['week','Week'],['month','Month']],p,'setPeriod')+statusTag(st.k)+'</div>'
 +'<div class="card"><div class="triad">'+[[PLABEL[p],money(st.sp)],['Budget',money(st.b)],[st.sp>st.b?'Over by':'Left',money(Math.abs(st.b-st.sp))]].map(function(x){return '<div class="tile" style="cursor:default"><div class="kick">'+x[0]+'</div><div class="v">'+x[1]+'</div></div>';}).join('')+'</div><div style="margin-top:12px">'+bullet([{val:st.sp,color:color,label:'Spent '+PLABEL[p]}],st.b,{pace:elapsed(p),axis:true})+'</div><button class="btn ghost" style="margin-top:12px" onclick="openSheet(\'budgetSheet\',\''+esc(n)+'\')">Edit budget</button></div>'
 +'<div class="card">'+cardH('Last 21 days',over+' of 21 days went over the daily budget')+lineChart([{vals:d.map(function(x){return x.v;}),color:color,area:true,ao:.22,endDot:true}],d.map(function(x){return fmtD(x.ts);}),{ref:db,refLabel:'daily budget '+money(db),scrubVal:function(i){return d[i].v;},scrubText:function(i){return '<b>'+fmtDay(d[i].ts)+'</b> · '+money(d[i].v)+' · budget '+money(db);}})+foot('Drag across the chart to read any day')+'</div>'
 +'<div class="card">'+cardH('Where '+esc(n)+' goes · '+MON[8],items.length?esc(items[0].name)+' is '+items[0].share+'% of it':'No spends yet')+(items.length?treemap(items,color):'')+foot('Area = rupees · double-tap a tile to filter transactions')+'</div>'
 +'<div class="card">'+cardH('Transactions','')+TXNS.filter(function(t){return t.cat===n;}).slice(0,10).map(function(t){return txRow(t);}).join('')+'</div></div>';};

/* budget sheet: monthly/weekly/daily linked + live allocation 100% bar */
function bsSel(n){S.bsCat=n;S.bsDraft=cat(n).monthly;refreshSheet();}
function bsInput(kind,v){v=parseFloat(v)||0;S.bsDraft=Math.round(kind==='m'?v:kind==='w'?v*DIM/7:v*DIM);['m','w','d'].forEach(function(k){if(k!==kind){var e=$('bs-'+k);e.value=Math.round(k==='m'?S.bsDraft:k==='w'?S.bsDraft*7/DIM:S.bsDraft/DIM);}});$('bs-bar').innerHTML=bsBar();}
function bsBar(){var segs=CATS.map(function(c){var v=c.name===S.bsCat?S.bsDraft:c.monthly;return {val:v,color:SLOT[c.slot]||SLOT.other,label:c.name,hi:c.name===S.bsCat,onclick:'bsSel(\''+esc(c.name)+'\')'};});var t=sum(segs.map(function(s){return s.val;}));
 return hundredBar(segs,{h:22})+'<div class="foot">Total '+money(t)+' of '+money(S.allowance)+' allowance'+(t>S.allowance?' · ▲ '+money(t-S.allowance)+' over':'')+' · tap a segment to switch</div>';}
SH.budgetSheet=function(arg){if(arg&&cat(arg)){S.bsCat=arg;S.bsDraft=cat(arg).monthly;}if(!S.bsCat||!cat(S.bsCat)){S.bsCat=CATS[0].name;S.bsDraft=CATS[0].monthly;}if(S.bsDraft==null)S.bsDraft=cat(S.bsCat).monthly;var m=S.bsDraft;
 return '<h3>Budget</h3><div class="chips" style="margin-bottom:12px">'+CATS.map(function(c){return '<button class="pill '+(S.bsCat===c.name?'on':'')+'" onclick="bsSel(\''+esc(c.name)+'\')"><span class="sw" style="background:'+SLOT[c.slot]+'"></span>'+esc(c.name)+'</button>';}).join('')+'</div>'
 +'<div class="kick" style="margin-bottom:6px">Allocation across categories</div><div id="bs-bar">'+bsBar()+'</div>'
 +[['m','Monthly',m],['w','Weekly',m*7/DIM],['d','Daily',m/DIM]].map(function(x){return '<div class="between" style="margin-top:10px"><span class="body2">'+x[1]+' budget</span><input class="field sm" id="bs-'+x[0]+'" inputmode="decimal" style="width:120px;text-align:right" value="'+Math.round(x[2])+'" oninput="bsInput(\''+x[0]+'\',this.value)"></div>';}).join('')
 +'<div class="foot">Change one and the others follow (weekly = monthly × 7 ÷ '+DIM+').</div><button class="btn" style="margin-top:14px" onclick="saveBudget()">Save budget</button>';};
function saveBudget(){var c=cat(S.bsCat);c.monthly=S.bsDraft;toast(c.name+' budget '+money(c.monthly)+'/month');S.bsDraft=null;closeSheet();rerender();}
SH.editCatsSheet=function(){var used=CATS.map(function(c){return c.slot;}),free=SLOTS.filter(function(s){return used.indexOf(s)<0;})[0];
 return '<h3>Edit categories</h3><div class="chips" style="margin-bottom:12px">'+CATS.map(function(c){return '<button class="pill" onclick="rmCat(\''+esc(c.name)+'\')"><span class="sw" style="background:'+(SLOT[c.slot])+'"></span>'+esc(c.name)+' ×</button>';}).join('')+'</div>'
 +'<div class="frow"><input class="field" id="ec-in" placeholder="Add a category" onkeydown="if(event.key===\'Enter\')addCat()"><button class="btn sm" style="height:48px" onclick="addCat()">Add</button></div>'
 +'<div class="foot" style="display:flex;align-items:center;gap:6px">Next category takes <span class="sw" style="display:inline-block;width:10px;height:10px;border-radius:3px;background:'+(free?SLOT[free]:SLOT.other)+'"></span> '+(free?'the free colour slot':'grey (folds into Other in charts)')+'. Removing moves its spends to Other.</div><button class="btn ghost" style="margin-top:14px" onclick="closeSheet()">Done</button>';};
function addCat(){var v=$('ec-in').value.trim();if(!v||cat(v))return;var used=CATS.map(function(c){return c.slot;}),free=SLOTS.filter(function(s){return used.indexOf(s)<0;})[0]||'other';CATS.push({name:v,slot:free,icon:iconFor(v),monthly:200});toast('Added '+v);refreshSheet();rerender();}
function rmCat(n){if(CATS.length<=1)return;CATS=CATS.filter(function(c){return c.name!==n;});TXNS.forEach(function(t){if(t.cat===n)t.cat='Other';});toast('Removed '+n);refreshSheet();rerender();}
SH.periodSheet=function(){return '<h3>Show spending for</h3>'+[['day','Today'],['week','This week'],['month','This month']].map(function(x){var r=range(x[0]);return '<button class="row" onclick="S.catView=\'share\';setPeriod(\''+x[0]+'\')"><div class="m"><div class="t">'+x[1]+'</div></div><span class="v">'+money(sum(txIn(r[0],r[1])))+'</span>'+(S.period===x[0]?'<span>✓</span>':'')+'</button>';}).join('');};
SH.quickCatSheet=function(){return '<h3>Quick category</h3><div class="chips">'+CATS.map(function(c){return '<button class="pill '+(S.scanCat===c.name?'on':'')+'" onclick="S.scanCat=\''+esc(c.name)+'\';closeSheet();rerender()"><span class="sw" style="background:'+SLOT[c.slot]+'"></span>'+esc(c.name)+'</button>';}).join('')+'</div>';};
