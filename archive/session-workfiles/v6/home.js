/* ===== Home, accumulation, transactions, manual entry ===== */
function safeToday(){var ms=monthStart(),before=sum(txIn(ms,TODAY-1)),left=DIM-DOM+1,tb=totalBudget('month');var safe=Math.max(0,(tb-before)/left),today=sum(txIn(TODAY,NOW));return {safe:safe,today:today,before:before,left:left,tb:tb};}
function txRow(t,onclick){return '<button class="row" onclick="'+(onclick||'openTxn(\''+t.id+'\')')+'"><span class="dot" style="background:'+col(t.cat)+'"></span><div class="m"><div class="t">'+esc(t.merchant)+'</div><div class="s">'+esc(t.cat)+' · '+(dayStart(t.ts)===TODAY?'':fmtD(t.ts)+', ')+fmtT(t.ts)+'</div></div><span class="badge">'+(t.source==='UPI'?'UPI':'Manual')+'</span><span class="v">'+money(t.amt)+'</span></button>';}
function openTxn(id){S.selTxn=id;go('transactionDetail');}
function sankey(){
 var ms=monthStart(),tx=txIn(ms,NOW),tot=sum(tx),by={};tx.forEach(function(t){by[t.cat]=(by[t.cat]||0)+t.amt;});
 var cats=Object.keys(by).sort(function(a,b){return by[b]-by[a];}),main=cats.slice(0,5),restV=sum(cats.slice(5).map(function(c){return by[c];}));
 var nodes=main.map(function(c){var mm={};tx.filter(function(t){return t.cat===c;}).forEach(function(t){mm[t.merchant]=(mm[t.merchant]||0)+t.amt;});var top=Object.keys(mm).sort(function(a,b){return mm[b]-mm[a];})[0];return {c:c,v:by[c],m:top,mv:mm[top],color:col(c)};});
 if(restV>0)nodes.push({c:'Other',v:restV,color:SLOT.other});
 var W=348,H=236,gap=6,avail=H-gap*(nodes.length-1),k=avail/tot,x0=0,x1=112,x2=236,nw=8,s=svgOpen(W,H),ys=0,yc=0;
 var mnodes=nodes.filter(function(n){return n.m;});var mTot=sum(mnodes.map(function(n){return n.mv;})),mk=Math.min(k,(H-gap*(mnodes.length-1))/mTot),ym=0;
 nodes.forEach(function(n){var h=n.v*k,g=gid();
  s+='<path d="M'+(x0+nw)+' '+P(ys)+'C'+(x1*.5)+' '+P(ys)+','+(x1*.5)+' '+P(yc)+','+x1+' '+P(yc)+'V'+P(yc+h)+'C'+(x1*.5)+' '+P(yc+h)+','+(x1*.5)+' '+P(ys+h)+','+(x0+nw)+' '+P(ys+h)+'Z" fill="'+n.color+'" fill-opacity=".35" data-g="'+g+'"'+T(n.c+' · '+money(n.v)+' · '+pct(n.v,tot)+'% of this month')+(n.c!=='Other'?' data-dbl="cat:'+esc(n.c)+'"':'')+'/>';
  s+='<rect x="'+x1+'" y="'+P(yc)+'" width="'+nw+'" height="'+P(Math.max(2,h))+'" rx="2" fill="'+n.color+'" data-g="'+g+'"/>';
  if(n.m){var mh=n.mv*mk,g2=gid();
   s+='<path d="M'+(x1+nw)+' '+P(yc)+'C'+(x1+nw+60)+' '+P(yc)+','+(x2-60)+' '+P(ym)+','+x2+' '+P(ym)+'V'+P(ym+mh)+'C'+(x2-60)+' '+P(ym+mh)+','+(x1+nw+60)+' '+P(yc+n.mv*k)+','+(x1+nw)+' '+P(yc+n.mv*k)+'Z" fill="'+n.color+'" fill-opacity=".22" data-g="'+g2+'"'+T(n.m+' · '+money(n.mv)+' · '+pct(n.mv,n.v)+'% of '+n.c)+'/>';
   s+='<rect x="'+x2+'" y="'+P(ym)+'" width="'+nw+'" height="'+P(Math.max(2,mh))+'" rx="2" fill="'+n.color+'" data-g="'+g2+'"/>';
   var words=n.m,l1=words,l2='';if(words.length>18){var cut=words.lastIndexOf(' ',18);if(cut<0)cut=18;l1=words.slice(0,cut);l2=words.slice(cut).trim();}
   var my=ym+mh/2;s+='<text x="'+(x2+nw+5)+'" y="'+P(my+(l2?-2:3.5))+'" font-size="9.5" fill="var(--text2)" data-g="'+g2+'">'+esc(l1)+'</text>'+(l2?'<text x="'+(x2+nw+5)+'" y="'+P(my+9)+'" font-size="9.5" fill="var(--text2)" data-g="'+g2+'">'+esc(l2)+'</text>':'');
   ym+=mh+gap;}
  s+='<text x="'+(x1+nw+5)+'" y="'+P(yc+Math.max(h,10)/2+3.5)+'" font-size="9.5" fill="var(--text)" data-g="'+g+'">'+esc(trunc(n.c.split('/')[0],13))+' '+kfmt(n.v)+'</text>';
  ys+=h;yc+=h+gap;});
 s+='<rect x="0" y="0" width="'+nw+'" height="'+P(ys)+'" rx="2" fill="var(--accent)"/>';
 return {html:'<div class="chart">'+s+'</svg></div>',tot:tot};}
function streak(){var tb=totalBudget('day'),d=daily(14),n=0;for(var i=d.length-2;i>=0;i--){if(d[i].v<=tb)n++;else break;}
 var W=348,st=W/14,s=svgOpen(W,40);d.forEach(function(x,i){var cx=st*i+st/2,under=x.v<=tb,today=i===13,g=gid();
  s+='<circle cx="'+P(cx)+'" cy="14" r="7" fill="'+(today?'none':under?'var(--accent)':'var(--surface3)')+'" stroke="'+(today?'var(--accent)':'none')+'" stroke-width="2" stroke-dasharray="'+(today?'3 2':'')+'" data-g="'+g+'"/>';
  s+='<rect x="'+P(cx-st/2)+'" y="0" width="'+P(st)+'" height="40" fill="transparent" data-g="'+g+'"'+T(fmtDay(x.ts)+' · '+money(x.v)+' · '+(today?'in progress':under?'under':'over')+' daily budget '+money(tb))+'/>';
  if(i%2===1||today)s+='<text x="'+P(cx)+'" y="36" text-anchor="middle" font-size="9.5" fill="var(--text3)">'+(today?'Today':new Date(x.ts).getDate())+'</text>';});
 return {html:'<div class="chart">'+s+'</svg></div>',n:n};}
function repeatMerch(days,minN){var a=TODAY-(days-1)*DAY,m={};txIn(a,NOW,function(t){return t.payeeType==='merchant'&&!t.sub;}).forEach(function(t){(m[t.merchant]=m[t.merchant]||{n:t.merchant,cat:t.cat,tx:[]}).tx.push(t);});
 return Object.keys(m).map(function(k){var o=m[k];o.total=sum(o.tx);o.count=o.tx.length;return o;}).filter(function(o){return o.count>=minN;}).sort(function(a,b){return b.count-a.count;});}
function pictoRow(o,max,W){W=W||200;var gs=10,gp=3,per=Math.floor(W/(gs+gp)),rows=Math.ceil(o.tx.length/per),s=svgOpen(W,rows*(gs+gp));
 o.tx.slice().sort(function(a,b){return a.ts-b.ts;}).forEach(function(t,i){var x=(i%per)*(gs+gp),y=Math.floor(i/per)*(gs+gp),g=gid();s+='<rect x="'+x+'" y="'+y+'" width="'+gs+'" height="'+gs+'" rx="3" fill="'+col(t.cat)+'" data-g="'+g+'"/><rect x="'+(x-1)+'" y="'+(y-1)+'" width="'+(gs+gp)+'" height="'+(gs+gp)+'" fill="transparent" data-g="'+g+'"'+T(t.merchant+' · '+money(t.amt)+' · '+fmtDay(t.ts)+' '+fmtT(t.ts))+'/>';});
 return '<div class="chart">'+s+'</svg></div>';}
function toggleBal(){S.balanceHidden=!S.balanceHidden;rerender();}
FR.home=function(el){
 var st=safeToday(),remain=st.safe-st.today,f=st.safe?st.today/st.safe:1,sk=f>1?'critical':f>.8?'warning':'good';
 var wk=weekStart(),ms=monthStart(),tdy=sum(txIn(TODAY,NOW)),wks=sum(txIn(wk,NOW)),mos=sum(txIn(ms,NOW));
 var d7=daily(7).map(function(x){return x.v;}),w7=[];for(var i=6;i>=0;i--)w7.push(sum(txIn(wk-i*7*DAY,wk-i*7*DAY+7*DAY-1)));var m6=MONTHS.map(function(m){var r=monthRange(m);return sum(txIn(r[0],r[1]));});
 var acct=S.tracking==='upi'?(ACCOUNTS[S.hpAcct]||ACCOUNTS[0]).handle:'Manual tracking';
 var sk2=streak(),sn=sankey(),rep=repeatMerch(7,3).slice(0,3),mxc=rep.length?rep[0].count:1;
 var subs=SUBS.map(function(s){return {s:s,d:nextDue(s)};}).sort(function(a,b){return a.d-b.d;}).slice(0,3);
 var h='<div class="hdr-home"><button class="avatar" onclick="go(\'settings\')" aria-label="Profile">'+icon('user',20)+'</button><button class="search" onclick="go(\'transactions\')">'+icon('search',14)+' Search transactions</button></div><div class="pad">';
 h+='<div class="card"><div class="between"><button class="pill" onclick="openSheet(\'accountSheet\')">'+(S.tracking==='upi'?icon('qr',12):icon('edit',12))+esc(acct)+' ▾</button><button class="pill" onclick="toggleBal()" aria-label="Show or hide balance">'+(S.balanceHidden?'Show':'Hide')+'</button></div>'
  +'<div class="kick" style="margin-top:12px">Balance</div><div class="hero">'+(S.balanceHidden?'₹ ••••':money(balance()))+'</div>'
  +'<div class="triad" style="margin-top:12px">'+[['Today',tdy,d7,'last 7 days'],['This week',wks,w7,'last 7 weeks'],['This month',mos,m6,'last 6 months']].map(function(x){return '<button class="tile" onclick="go(\'insight\')"><div class="kick">'+x[0]+'</div><div class="v">'+money(x[1])+'</div>'+sparkline(x[2],{w:90,h:26})+'<div class="foot" style="margin-top:2px;font-size:9.5px">'+x[3]+'</div></button>';}).join('')+'</div></div>';
 h+='<div class="card">'+cardH('Safe to spend today',remain>=0?money(remain)+' left for today':money(-remain)+' over today’s safe amount')+'<div style="width:250px;margin:0 auto">'+halfDonut(st.today,st.safe,{w:250,r:96,sw:16,color:f>1?STATUS.critical.c:'var(--accent)',hero:money(Math.max(0,remain)),sub:'left of '+money(st.safe),l1:money(st.safe),tip:'Spent today · '+money(st.today)+' · safe amount '+money(st.safe)+' · '+pct(st.today,st.safe)+'% used'})+'</div>'
  +'<div style="text-align:center;margin-top:4px">'+statusTag(sk)+'</div>'+foot('Safe = (monthly budgets '+money(st.tb)+' − spent before today '+money(st.before)+') ÷ '+st.left+' days left · UPI + manual')+'</div>';
 if(S.tracking==='upi'){h+='<div class="paytiles" style="margin-bottom:12px">'+[['scan','qr','Scan QR','camera'],['payAnyone','user','Pay Anyone','contacts'],['bankTransfer','bankI','Bank Transfer',null]].map(function(x){var off=x[3]&&!S.perms[x[3]];return '<button class="paytile '+(off?'off':'')+'" onclick="'+(off?'toast(\'Turn on '+(x[3]==='camera'?'Camera':'Contacts')+' in Settings\')':'go(\''+x[0]+'\')')+'">'+icon(x[1],26)+x[2]+'</button>';}).join('')+'</div>'
  +'<button class="btn ghost" style="margin-bottom:12px" onclick="go(\'manualEntry\')">+ Log a cash spend</button>';}
 else h+='<button class="btn" style="height:64px;font-size:18px;margin-bottom:12px" onclick="go(\'manualEntry\')">+ Enter Transaction</button>';
 if(S.perms.notif&&st.today>st.safe*.8)h+='<div class="card" style="display:flex;gap:10px;align-items:center;padding:12px">'+icon('bell',18)+'<span style="font-size:13px">Heads up: today is at '+pct(st.today,st.safe)+'% of your safe amount.</span></div>';
 h+='<div class="card">'+cardH('Streak',sk2.n+'-day streak under your daily budget')+sk2.html+foot('Filled = day under '+money(totalBudget('day'))+' (sum of daily budgets) · last 14 days')+'</div>';
 h+='<div class="card">'+cardH('Small purchases adding up',rep.length?rep[0].count+' buys at '+esc(rep[0].n)+' this week':'No repeat buys this week','go(\'accumulation\')')
  +(rep.length?rep.map(function(o){return '<div class="between" style="padding:8px 0;border-bottom:1px solid var(--border);cursor:pointer" onclick="S.selMerchant=\''+esc(o.n)+'\';go(\'accumulationDetail\')"><div style="width:96px;flex:none"><div style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+esc(o.n)+'</div><div class="foot" style="margin:0">'+o.count+' buys</div></div><div style="flex:1;min-width:0">'+pictoRow(o,mxc,170)+'</div><b class="num" style="width:56px;text-align:right">'+money(o.total)+'</b></div>';}).join(''):'')+foot('One square = one purchase · last 7 days')+'</div>';
 h+='<div class="card">'+cardH('Where this month went',money(sn.tot)+' spent so far in '+MON[8],'go(\'categories\')')+'<div class="foot" style="margin:0 0 6px">This month → category → top merchant</div>'+sn.html+foot('Tap a flow for its value · double-tap a category to open it')+'</div>';
 h+='<div class="card">'+cardH('Subscriptions due','Next: '+esc(subs[0].s.name)+' in '+Math.ceil((subs[0].d-NOW)/DAY)+' days','go(\'savings\')')+'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">'+subs.map(function(x){var dl=Math.ceil((x.d-NOW)/DAY),cyc=x.s.cycle==='monthly'?30:x.s.cycle==='quarterly'?91:365;
  return '<button class="tile" style="display:flex;flex-direction:column;align-items:center;gap:4px" onclick="S.selSub=\''+x.s.id+'\';go(\'subDetail\')">'+iconRing(1-dl/cyc,{s:40,sw:4,icon:x.s.icon,is:15})+'<div style="font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%">'+esc(x.s.name)+'</div><div class="foot" style="margin:0">'+fmtD(x.d)+' · '+dl+'d</div><div class="num" style="font-size:13px">'+money(x.s.amt)+'</div></button>';}).join('')+'</div>'+foot('Ring fills as the due date approaches')+'</div>';
 h+='<div class="card">'+cardH('Transaction history','Latest spends','go(\'transactions\')')+TXNS.slice(0,5).map(function(t){return txRow(t);}).join('')+'</div></div>';
 el.innerHTML=h;};

FR.accumulation=function(el){var rep=repeatMerch(30,3),tot=sum(rep.map(function(o){return o.total;}));
 el.innerHTML=topbar('Small purchases','go(\'home\')')+'<div class="pad"><div class="card">'+cardH('Repeat buys · last 30 days',rep.length+' places you visit 3+ times add up to '+money(tot))
  +rep.map(function(o){return '<div style="padding:10px 0;border-bottom:1px solid var(--border)"><div class="between" style="cursor:pointer" onclick="S.selMerchant=\''+esc(o.n)+'\';go(\'accumulationDetail\')"><span style="display:flex;gap:8px;align-items:center;min-width:0">'+icon(cicon(o.cat),15,col(o.cat))+'<span style="font-size:14px">'+esc(o.n)+'</span><span class="foot" style="margin:0">'+o.count+'×</span></span><span style="text-align:right"><b class="num">'+money(o.total)+'</b> <span class="chev" style="color:var(--text3)">›</span></span></div>'
  +'<div style="margin-top:6px">'+pictoRow(o,0,316)+'</div><div class="foot" style="margin-top:4px">≈ '+money(o.total/30*365)+'/yr at this pace</div></div>';}).join('')+foot('One square = one purchase, colour = category · tap a square for its date and amount')+'</div></div>';};

FR.accumulationDetail=function(el){var n=S.selMerchant,all=TXNS.filter(function(t){return t.merchant===n;}),m30=all.filter(function(t){return t.ts>=TODAY-29*DAY;}),ms=all.filter(function(t){return t.ts>=monthStart();});
 var hrs=[];for(var i=0;i<24;i++)hrs.push(0);all.forEach(function(t){hrs[new Date(t.ts).getHours()]++;});
 var avg=all.length?sum(all)/all.length:0,c=all[0]?all[0].cat:'Other',pace=ms.length/DOM*DIM*avg*12,cb=budget(c,'month')*12;
 var W=348,H=120,mx=Math.max.apply(null,hrs)||1,X=function(h){return 12+h/23*(W-24);},s=svgOpen(W,H+18);
 var pts=hrs.map(function(v,i){return [X(i),H-4-v/mx*54];});s+='<path d="M'+X(0)+' '+(H-4)+'L'+pts.map(function(p){return P(p[0])+' '+P(p[1]);}).join('L')+'L'+X(23)+' '+(H-4)+'Z" fill="'+col(c)+'" fill-opacity=".3"/><path d="M'+pts.map(function(p){return P(p[0])+' '+P(p[1]);}).join('L')+'" stroke="'+col(c)+'" stroke-width="2" fill="none"/>';
 hrs.forEach(function(v,i){s+='<rect x="'+P(X(i)-7)+'" y="54" width="14" height="'+(H-54)+'" fill="transparent" data-g="h'+i+'"'+T(i+':00–'+(i+1)+':00 · '+v+' purchases · 6 months')+'/>';});
 var lanes={};m30.forEach(function(t){var d=new Date(t.ts),h=d.getHours()+d.getMinutes()/60,k=Math.round(h);lanes[k]=(lanes[k]||0)+1;var y=Math.max(5,44-(lanes[k]-1)*9),g=gid();s+='<circle cx="'+P(12+h/23.99*(W-24))+'" cy="'+y+'" r="3.5" fill="var(--accent)" data-g="'+g+'"/><circle cx="'+P(12+h/23.99*(W-24))+'" cy="'+y+'" r="9" fill="transparent" data-g="'+g+'"'+T(fmtDay(t.ts)+' · '+fmtT(t.ts)+' · '+money(t.amt))+'/>';});
 [0,6,12,18,23].forEach(function(h){s+='<text x="'+X(h)+'" y="'+(H+12)+'" text-anchor="middle" font-size="9.5" fill="var(--text3)">'+(h===0?'12am':h===12?'12pm':h===23?'11pm':h>12?(h-12)+'pm':h+'am')+'</text>';});
 s+='<line x1="0" x2="'+W+'" y1="'+(H-4)+'" y2="'+(H-4)+'" stroke="var(--grid)"/>';
 var peak=hrs.indexOf(mx);
 el.innerHTML=topbar(n,'go(\'accumulation\')')+'<div class="pad"><div class="card"><div class="triad">'+[['30 days',money(sum(m30))],['Purchases',m30.length],['Average',money(avg)]].map(function(x){return '<div class="tile" style="cursor:default"><div class="kick">'+x[0]+'</div><div class="v">'+x[1]+'</div></div>';}).join('')+'</div></div>'
 +'<div class="card">'+cardH('When you buy here','Usually around '+(peak%12||12)+(peak<12?' am':' pm'))+'<div class="chart">'+s+'</svg></div>'+foot('Area = purchases by hour, 6 months · dots = last 30 days (tap one)')+'</div>'
 +'<div class="card">'+cardH('At this pace','≈ '+money(pace)+' a year here')+bullet([{val:pace,color:col(c),label:'This month’s pace × 12'}],cb,{h:26,axis:true})+foot(ms.length+' buys this month × avg '+money(avg)+' × 12 vs '+esc(c)+' budget × 12 ('+money(cb)+')')+'</div>'
 +'<div class="card">'+cardH('Every purchase','')+all.slice(0,12).map(function(t){return txRow(t);}).join('')+'</div></div>';};

/* transactions */
function txFiltered(){var q=S.txSearch.toLowerCase();return TXNS.filter(function(t){return (S.txFilter==='All'||t.cat===S.txFilter)&&(!q||t.merchant.toLowerCase().indexOf(q)>=0||t.cat.toLowerCase().indexOf(q)>=0);});}
function txList(){var list=txFiltered(),h='',last=null;list.slice(0,150).forEach(function(t){var d=dayStart(t.ts);if(d!==last){h+='<div class="kick" id="day-'+d+'" style="margin:14px 0 2px">'+fmtDay(t.ts)+'</div>';last=d;}h+=txRow(t);});if(!list.length)h='<p class="body2" style="padding:20px 0">Nothing matches.</p>';return h;}
function txStrip(){var list=txFiltered(),vals=[];for(var i=29;i>=0;i--){var d=TODAY-i*DAY;var v=sum(list.filter(function(t){return dayStart(t.ts)===d;}));vals.push({v:v,color:S.txFilter==='All'?'var(--text3)':col(S.txFilter),tip:fmtDay(d)+' · '+money(v)+' · tap to jump',onclick:'jumpDay('+d+')',l:(i%7===0?(i===0?'Today':fmtD(d)):'')});}
 return columns(vals,{h:80,gap:2,grid:true});}
function jumpDay(d){var e=$('day-'+d);if(e)e.scrollIntoView({block:'start',behavior:'smooth'});else toast('No spends that day');}
function txUpdate(){$('tx-strip').innerHTML=txStrip();$('tx-list').innerHTML=txList();}
FR.transactions=function(el){var chips=['All'].concat(CATS.map(function(c){return c.name;}));
 el.innerHTML=topbar('Transactions','go(\'home\')')+'<div class="pad"><input class="field" placeholder="Search merchant or category" value="'+esc(S.txSearch)+'" oninput="S.txSearch=this.value;txUpdate()"><div class="chips" style="margin:10px 0;flex-wrap:nowrap;overflow-x:auto;padding-bottom:4px">'+chips.map(function(c){return '<button class="pill '+(S.txFilter===c?'on':'')+'" onclick="S.txFilter=\''+esc(c)+'\';rerender()">'+(c!=='All'?'<span class="sw" style="background:'+col(c)+'"></span>':'')+esc(c)+'</button>';}).join('')+'</div>'
 +'<div class="card" style="padding:12px">'+cardH('Daily totals · last 30 days',S.txFilter==='All'?'All categories':esc(S.txFilter))+'<div id="tx-strip">'+txStrip()+'</div>'+foot('Tap a column to jump to that day')+'</div><div id="tx-list">'+txList()+'</div></div>';};

function clockTicks(hours,mark,o){o=o||{};var S2=o.s||120,c=S2/2,r=S2/2-14,s='<svg width="'+S2+'" height="'+S2+'" viewBox="0 0 '+S2+' '+S2+'" style="overflow:visible"><circle cx="'+c+'" cy="'+c+'" r="'+r+'" fill="none" stroke="var(--surface3)" stroke-width="2"/>';
 hours.forEach(function(h){var a=pol(c,c,r-4,h*15),b=pol(c,c,r+4,h*15);s+='<path d="M'+P(a[0])+' '+P(a[1])+'L'+P(b[0])+' '+P(b[1])+'" stroke="var(--text3)" stroke-width="1.5" opacity=".7"/>';});
 var a=pol(c,c,r-10,mark*15),b=pol(c,c,r+10,mark*15);s+='<path d="M'+P(a[0])+' '+P(a[1])+'L'+P(b[0])+' '+P(b[1])+'" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" data-g="mk"/><circle cx="'+P(b[0])+'" cy="'+P(b[1])+'" r="12" fill="transparent" data-g="mk"'+T(o.tip||'')+'/>';
 [['12a',0],['6a',6],['12p',12],['6p',18]].forEach(function(x){var p=pol(c,c,r-18,x[1]*15);s+='<text x="'+P(p[0])+'" y="'+P(p[1]+3)+'" text-anchor="middle" font-size="9.5" fill="var(--text3)">'+x[0]+'</text>';});
 return '<div class="chart" style="width:'+S2+'px">'+s+'</svg></div>';}
function quantile(a,q){a=a.slice().sort(function(x,y){return x-y;});var i=(a.length-1)*q,lo=Math.floor(i);return a[lo]+(a[Math.ceil(i)]-a[lo])*(i-lo);}
FR.transactionDetail=function(el){var t=TXNS.filter(function(x){return x.id===S.selTxn;})[0]||TXNS[0];S.selTxn=t.id;if(S.txCat==null||S.txCatFor!==t.id){S.txCat=t.cat;S.txCatFor=t.id;}
 var hist=TXNS.filter(function(x){return x.merchant===t.merchant;}),amts=hist.map(function(x){return x.amt;}),med=quantile(amts,.5),diff=med?Math.round((t.amt-med)/med*100):0;
 var h=new Date(t.ts),hr=h.getHours()+h.getMinutes()/60,ms=monthStart(t.ts),me=Math.min(NOW,new Date(new Date(t.ts).getFullYear(),new Date(t.ts).getMonth()+1,1).getTime()-1),catM=sum(txIn(ms,me,function(x){return x.cat===t.cat&&x.id!==t.id;})),cb=budget(t.cat,'month');
 el.innerHTML=topbar('Transaction','go(\'transactions\')')+'<div class="pad"><div class="hero" style="margin:4px 0 2px">'+money(t.amt)+'</div><div class="body2">'+esc(t.merchant)+' · '+fmtDay(t.ts)+', '+fmtT(t.ts)+'</div>'
 +'<div class="card" style="margin-top:12px;padding:4px 16px">'+[['Logged by',t.source==='UPI'?'UPI':'Manual entry'],['Account',t.account||'—'],['Paid to',t.payeeType==='contact'?'Contact':t.payeeType==='bank'?'Bank account':'Merchant'],['Category',t.cat]].map(function(r){return '<div class="row" style="cursor:default"><div class="m body2">'+r[0]+'</div><div class="v" style="font-weight:500">'+esc(r[1])+'</div></div>';}).join('')+'</div>'
 +'<div class="card">'+cardH('Compared with your usual here',hist.length>1?money(t.amt)+' is '+Math.abs(diff)+'% '+(diff>=0?'above':'below')+' your usual here':'First purchase here')+(hist.length>1?rangeStrip(Math.min.apply(null,amts),med,Math.max.apply(null,amts),t.amt,{q1:quantile(amts,.25),q3:quantile(amts,.75),what:'purchases',markTip:'This one · '+money(t.amt)+' · '+Math.abs(diff)+'% '+(diff>=0?'above':'below')+' median'}):'')+foot(hist.length+' purchases at '+esc(t.merchant)+' · 6 months')+'</div>'
 +'<div class="card" style="display:flex;gap:14px;align-items:center">'+clockTicks(hist.map(function(x){var d=new Date(x.ts);return d.getHours()+d.getMinutes()/60;}),hr,{tip:'This purchase · '+fmtT(t.ts)})+'<div><div class="kick">Time of day</div><div class="h2" style="margin-top:3px">'+fmtT(t.ts)+'</div><div class="foot">Grey ticks = your other visits here</div></div></div>'
 +'<div class="card">'+cardH('Share of '+esc(t.cat)+' budget',pct(t.amt,cb)+'% of the '+MON[new Date(t.ts).getMonth()]+' budget')+bullet([{val:catM,color:col(t.cat),label:'Rest of '+t.cat+' that month'},{val:t.amt,color:'var(--accent)',label:'This transaction'}],cb,{axis:true})+'</div>'
 +'<div class="kick" style="margin:6px 0 8px">Recategorise</div><div class="chips" style="margin-bottom:14px">'+CATS.map(function(c){return '<button class="pill '+(S.txCat===c.name?'on':'')+'" onclick="S.txCat=\''+esc(c.name)+'\';rerender()"><span class="sw" style="background:'+SLOT[c.slot]+'"></span>'+esc(c.name)+'</button>';}).join('')+'</div><button class="btn" onclick="saveTxnCat()">Save</button></div>';};
function saveTxnCat(){var t=TXNS.filter(function(x){return x.id===S.selTxn;})[0];t.cat=S.txCat;toast('Saved to '+t.cat);go('transactions');}

/* manual entry with live budget-impact bullet */
function impactBullet(c,amt,o){var ms=monthStart(),sp=sum(txIn(ms,NOW,function(t){return t.cat===c;})),b=budget(c,'month');
 return bullet([{val:sp,color:col(c),label:'Spent before this'},{val:amt,color:'var(--accent)',label:'This entry'}],b,{pace:DOM/DIM,axis:true,h:o&&o.h||30});}
function meUpdate(){var a=parseFloat($('me-amt').value)||0,c=S.manualCat;$('me-impact').innerHTML=c?impactSummary(c,a):'<p class="body2">Pick a category to see the impact.</p>';}
function impactSummary(c,a){var ms=monthStart(),sp=sum(txIn(ms,NOW,function(t){return t.cat===c;})),b=budget(c,'month'),proj=(sp+a)/DOM*DIM,k=statusOf((sp+a)/b,proj/b);
 return '<div class="between" style="margin-bottom:6px"><span class="kick">'+esc(c)+' · this month</span>'+statusTag(k)+'</div>'+impactBullet(c,a)+'<div class="foot">Spent before this: '+money(sp)+' · this entry '+money(a)+' · left '+money(Math.max(0,b-sp-a))+' · dashed tick = even pace</div>';}
FR.manualEntry=function(el){el.innerHTML=topbar('Enter transaction','go(\'home\')')+'<div class="pad"><div class="stack"><input class="field" id="me-amt" inputmode="decimal" placeholder="Amount (₹)" oninput="meUpdate()" style="font-size:22px;font-weight:700;height:56px"><input class="field" id="me-merch" placeholder="Paid to (shop, person, app)">'
 +'<div><div class="kick" style="margin-bottom:8px">Category</div><div class="chips" id="me-cats">'+CATS.map(function(c){return '<button class="pill '+(S.manualCat===c.name?'on':'')+'" onclick="S.manualCat=\''+esc(c.name)+'\';document.querySelectorAll(\'#me-cats .pill\').forEach(function(p){p.classList.remove(\'on\')});this.classList.add(\'on\');meUpdate()"><span class="sw" style="background:'+SLOT[c.slot]+'"></span>'+esc(c.name)+'</button>';}).join('')+'</div></div>'
 +'<div class="between"><span class="body2">Source</span><span class="badge" style="font-size:11px">'+icon('edit',11)+' Manual · Today, '+fmtT(NOW)+'</span></div>'
 +'<div class="card" id="me-impact"><p class="body2">Pick a category to see the impact.</p></div><p class="err" id="me-err">Enter an amount and pick a category</p><button class="btn" onclick="submitManual()">Add transaction</button></div></div>';
 if(S.manualCat)setTimeout(meUpdate,0);};
function submitManual(){var a=parseFloat($('me-amt').value),c=S.manualCat;if(!(a>0)||!c){$('me-err').classList.add('show');return;}
 TXNS.unshift({id:'m'+Date.now(),merchant:$('me-merch').value.trim()||'Cash spend',cat:c,amt:Math.round(a),ts:NOW,source:'Manual',account:null,payeeType:'merchant'});S.manualCat=null;toast('Added '+money(a)+' to '+c);go('home');}
