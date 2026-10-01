/* ===== Trickle v9 — data helpers, 20 widgets, Sankey ===== */
function spendsIn(a,b,f){return TX.filter(function(t){return t.type==='spend'&&!t.goalFunded&&t.ts>=a&&t.ts<b&&t.ts<=NOW&&(!f||f(t));});}
function mStart(m){return at(m,1);}function mEnd(m){return at(m+1,1);}
function sumAmt(a){return a.reduce(function(x,t){return x+t.amt;},0);}
function curM(){return new Date(NOW).getMonth();}
function dayStart(ts){var d=new Date(ts);d.setHours(0,0,0,0);return d.getTime();}
function ordinal(n){var s=['th','st','nd','rd'],v=n%100;return n+(s[(v-20)%10]||s[v]||s[0]);}
function glist(a){return a.length<=1?a.join(''):a.slice(0,-1).join(', ')+' and '+a[a.length-1];}

/* ---- repeat buys: same place (or same kind) bought N+ times in 30 days, any amount; subs + transfers excluded ---- */
var KIND={'Chai Tapri':'Chai','Campus Coffee':'Coffee'};
var REPEAT_N=3;
function rkey(t){return t.merchant;}
function repeatGroups(a,b){a=a||NOW-30*DAY;b=b||NOW+1;var g={};spendsIn(a,b,function(t){return !t.sub&&t.cat!=='Unsorted'&&t.amt<1000;}).forEach(function(t){var k=rkey(t);(g[k]=g[k]||{name:k,cat:t.cat,list:[],amt:0}).list.push(t);g[k].amt+=t.amt;});
 return Object.keys(g).map(function(k){return g[k];}).filter(function(x){return x.list.length>=REPEAT_N;}).sort(function(x,y){return y.list.length-x.list.length||y.amt-x.amt;});}
function repeatSpends(a,b){var o=[];repeatGroups(a,b).forEach(function(g){o=o.concat(g.list);});return o.sort(function(x,y){return x.ts-y.ts;});}
function weekCount(merchant){return spendsIn(NOW-7*DAY,NOW+1,function(t){return t.merchant===merchant;}).length;}

/* ---- widget registry ---- */
var WIDGETS={goal:'Goal jar',month:'This month',flow:'Money flow',where:'Where it went',range:'Spend range',rbsum:'Repeat buys',rbfreq:'Repeat buys: how often',rbrep:'Repeat buys: per place',rbtrend:'Repeat buys: trend',sizes:'Purchase sizes',vs:'This vs last month',mbm:'Month by month',saved:'Savings growing',rate:'Savings rate',tod:'When you spend',week:'Weekday pattern',top:'Top places',subs:'Subscriptions',owed:'Owed to you',eta:'Goal ETA'};
var WSIZE={goal:'S',month:'W',flow:'L',where:'W',range:'W',rbsum:'W',rbfreq:'S',rbrep:'W',rbtrend:'S',sizes:'W',vs:'W',mbm:'W',saved:'W',rate:'S',tod:'S',week:'W',top:'W',subs:'W',owed:'W',eta:'W'};
var ALLW=Object.keys(WIDGETS);
var WF={};
/* each returns {body,cap,key,attr,aria} */
WF.goal=function(o){var g=topGoal();return {body:waffle(g,11,o.home?{noReveal:1}:null),cap:esc(g.name)+' is '+goalWords(g),key:tkey('1 tile = 1%','sv'),attr:'data-a="goal" data-x="'+g.id+'"',aria:esc(g.name)+' jar, each tile 1 percent'};};
WF.month=function(){var m=curM(),ms=[m-2,m-1,m],all=[],days={};
 ms.forEach(function(mm){spendsIn(mStart(mm),mEnd(mm)).forEach(function(t){var k=dayStart(t.ts);days[k]=(days[k]||0)+t.amt;});});
 Object.keys(days).forEach(function(k){all.push(days[k]);});all.sort(function(a,b){return a-b;});
 function q(v){if(!v)return 0;var i=all.indexOf(v)/Math.max(1,all.length-1);return i<.25?1:i<.5?2:i<.75?3:4;}
 var today=dayStart(NOW),h='<div class="dm">';ms.forEach(function(mm){var n=new Date(2026,mm+1,0).getDate();h+='<div class="dmm"><div class="dml">'+MON[(mm+12)%12]+'</div><div class="dmg">';for(var d=1;d<=n;d++){var ts=at(mm,d),v=days[ts]||0,fut=ts>today,lv=fut?-1:q(v);
  h+='<i class="lv'+(lv<0?'f':lv)+(ts===today?' td':'')+'" style="--i:'+(d+ (mm-ms[0])*31)+'"'+(fut?'':' data-a="reveal" data-v="'+d+' '+MON[mm]+' · '+(v?fmt(v):'no spends')+'"')+'></i>';}h+='</div></div>';});h+='</div>';
 var pc=pace();return {body:h,cap:(pc.state==='ok'?'On pace':'A bit fast')+'. Brighter dots were bigger spend days.',key:tkey('1 dot = 1 day','dot'),aria:'Three months of spend days as dots'};};
WF.where=function(){var m=curM(),v=CATS.map(function(c){return spentMonth(c);}),u=unitFor(v,50);
 var h='<div class="rows">'+CATS.map(function(c,i){return '<div class="rw"><span class="rl"><span class="cdot" style="background:'+catColor(c)+'"></span>'+c+'</span>'+tg(tiles(v[i],u,ct(c)),0,13,3,{attr:'data-a="reveal" data-v="'+c+' · '+fmt(v[i])+'"'})+'</div>';}).join('')+'</div>';
 return {body:h,cap:'What '+MONL[m]+' went on so far',key:tkey(ukey(u)),u:u,n:v.reduce(function(a,x){return a+tcount(x,u);},0)};};
WF.rbsum=function(o){var r=repeatSpends(),tot=sumAmt(r),u=unitFor([tot],o.home?30:50),gs=repeatGroups();
 return {body:tg(tiles(tot,u,{c:'var(--text2)'}),0,14,3,{cls:'pour',attr:'data-a="reveal" data-v="Added up to '+fmt(tot)+' in 30 days"'}),cap:(gs.length?glist(gs.slice(0,3).map(function(g){return esc(g.name);}))+', again and again':'Nothing repeats yet')+' <button class="link inl" data-a="rbopen">See all</button>',key:tkey(ukey(u),'g2'),u:u,n:tcount(tot,u),aria:'Repeat buys added up'};};
WF.rbfreq=function(){var h='<div class="frq">';for(var w=3;w>=0;w--){var a=NOW-(w+1)*7*DAY,b=NOW-w*7*DAY+1,r=repeatSpends(NOW-30*DAY,NOW+1).filter(function(t){return t.ts>=a&&t.ts<b;});
  h+='<div class="frr"><span>'+(w===0?'This wk':w===1?'Last wk':w+' wks ago')+'</span>'+tg(r.map(function(t){return {c:catColor(t.cat),k:catK(t.cat),cls:w===0?'gl':'',v:esc(t.merchant)+' · '+fmt(t.amt)};}),0,7,3,{cls:'dots'})+'</div>';}
 return {body:h+'</div>',cap:'Repeat buys, week by week',key:tkey('1 dot = 1 buy','dot')};};
WF.rbrep=function(){var gs=repeatGroups().slice(0,4);if(!gs.length)return {body:'<p class="muted">Nothing repeats yet.</p>',cap:'',key:''};
 var h='<div class="rows">'+gs.map(function(g){return '<div class="rw" data-a="reveal" data-v="'+esc(g.name)+' · '+g.list.length+' times · '+fmt(g.amt)+'"><span class="rl">'+esc(g.name)+'</span>'+tg(rep(g.list.length,ct(g.cat)),0,11,3)+'</div>';}).join('')+'</div>';
 return {body:h,cap:'The places you keep going back to',key:tkey('1 tile = 1 visit')};};
WF.rbtrend=function(){var m=curM(),d=new Date(NOW).getDate(),ms=[m-2,m-1,m],v=ms.map(function(mm){return sumAmt(repeatSpends(mStart(mm),Math.min(mEnd(mm),mm===m?NOW+1:mEnd(mm))));}),u=unitFor(v,30);
 var prevPace=v[1]/new Date(2026,m,0).getDate()*d,word=v[2]<prevPace*.95?'Fewer than '+MONL[m-1]+' so far':v[2]>prevPace*1.05?'More than '+MONL[m-1]+' so far':'About the same as '+MONL[m-1];
 return {body:'<div class="cols">'+ms.map(function(mm,i){return '<div class="col">'+tg(tiles(v[i],u,{c:'var(--text2)',cls:i===2?'gl':''}),3,11,3,{cls:'up',attr:'data-a="reveal" data-v="'+MON[mm]+' · '+fmt(v[i])+'"'})+'<small>'+MON[mm]+'</small></div>';}).join('')+'</div>',cap:word,key:tkey(ukey(u),'g2'),n:v.reduce(function(a,x){return a+tcount(x,u);},0)};};
WF.sizes=function(){var B=[[50,'Up to ₹50'],[150,'₹50–150'],[300,'₹150–300'],[600,'₹300–600'],[1e9,'Over ₹600']],c=[0,0,0,0,0],r=spendsIn(mStart(curM()),NOW+1);
 r.forEach(function(t){for(var i=0;i<B.length;i++)if(t.amt<=B[i][0]){c[i]++;break;}});var tot=c.reduce(function(a,b){return a+b;},0),u=[1,2,5,10].filter(function(x){return c.reduce(function(a,b){return a+Math.ceil(b/x);},0)<=50;})[0]||10;
 return {body:'<div class="rows">'+B.map(function(b,i){return '<div class="rw" data-a="reveal" data-v="'+c[i]+' buys"><span class="rl">'+b[1]+'</span>'+tg(rep(Math.ceil(c[i]/u),{c:i<2?'var(--text)':'var(--text3)'}),0,11,3)+'</div>';}).join('')+'</div>',cap:'Most of your buys are small ones',key:tkey(u===1?'1 tile = 1 buy':'1 tile = '+u+' buys')};};
WF.vs=function(){var m=curM(),d=new Date(NOW).getDate(),lastEnd=at(m-1,d+1),vT=CATS.map(function(c){return spentMonth(c);}),vL=CATS.map(function(c){return sumAmt(spendsIn(mStart(m-1),lastEnd,function(t){return t.cat===c;}));}),u=unitFor(vT.concat(vL),50);
 return {body:'<div class="rows">'+CATS.map(function(c,i){return '<div class="rw2"><span class="rl"><span class="cdot" style="background:'+catColor(c)+'"></span>'+c+'<small>'+(vT[i]<vL[i]*.95?'less':vT[i]>vL[i]*1.05?'more':'same')+'</small></span><div class="st">'+tg(tiles(vL[i],u,{cls:'ol'}),0,10,2,{attr:'data-a="reveal" data-v="'+MON[m-1]+' · '+fmt(vL[i])+'"'})+tg(tiles(vT[i],u,ct(c)),0,10,2,{attr:'data-a="reveal" data-v="'+MON[m]+' · '+fmt(vT[i])+'"'})+'</div></div>';}).join('')+'</div>',
  cap:'Outlined is '+MONL[m-1]+' up to the same day, filled is '+MONL[m],key:tkey(ukey(u)),n:vT.concat(vL).reduce(function(a,x){return a+tcount(x,u);},0)};};
WF.mbm=function(){var m=curM(),ms=[m-2,m-1,m],vv=ms.map(function(mm){return CATS.map(function(c){return spentMonth(c,at(mm,5));});}),flat=[].concat.apply([],vv),u=unitFor(flat,50);
 return {body:'<div class="cols">'+ms.map(function(mm,i){var a=[];CATS.forEach(function(c,j){a=a.concat(tiles(vv[i][j],u,Object.assign(ct(c),{cls:i===2?'gl':''})));});return '<div class="col">'+tg(a,4,11,3,{cls:'up',attr:'data-a="reveal" data-v="'+MON[mm]+' · '+fmt(vv[i].reduce(function(x,y){return x+y;},0))+'"'})+'<small>'+MON[mm]+'</small></div>';}).join('')+'</div>'+legend(CATS),cap:'Since you started Trickle in '+MONL[m-2],key:tkey(ukey(u)),n:flat.reduce(function(a,x){return a+tcount(x,u);},0)};};
WF.saved=function(){var m=curM(),ms=[m-2,m-1,m],v=ms.map(savedIn),cum=v.reduce(function(a,b){return a+b;},0),u=unitFor(v.concat([cum]),50);
 return {body:'<div class="cols">'+ms.map(function(mm,i){return '<div class="col">'+tg(tiles(v[i],u,{c:'var(--save)',cls:i===2?'gl':''}),3,11,3,{cls:'up',attr:'data-a="reveal" data-v="'+MON[mm]+' · '+fmt(v[i])+' kept"'})+'<small>'+MON[mm]+'</small></div>';}).join('')+'<div class="col">'+tg(tiles(cum,u,{cls:'ol'}),4,11,3,{cls:'up',attr:'data-a="reveal" data-v="All together · '+fmt(cum)+'"'})+'<small>Together</small></div></div>',cap:'It keeps piling up',key:tkey(ukey(u),'sv'),n:v.concat([cum]).reduce(function(a,x){return a+tcount(x,u);},0)};};
function incomeIn(m){return sumAmt(TX.filter(function(t){return t.type==='income'&&t.ts>=mStart(m)&&t.ts<mEnd(m);}));}
WF.rate=function(){var m=curM(),inc=incomeIn(m),sv=savedIn(m),pct=inc?Math.min(100,Math.round(sv/inc*100)):0,a=[];for(var i=0;i<100;i++)a.push(i<pct?{c:'var(--save)'}:{});
 return {body:tg(a,10,11,3,{attr:'data-a="reveal" data-v="'+pct+'% of '+MON[m]+' income kept"'}),cap:pct>=30?'You kept a big share':'You kept some',key:tkey('1 tile = 1% of income','sv')};};
WF.tod=function(){var hrs=[];for(var i=0;i<24;i++)hrs.push(0);spendsIn(mStart(curM()),NOW+1).forEach(function(t){hrs[new Date(t.ts).getHours()]+=t.amt;});var mx=Math.max.apply(null,hrs)||1,pk=hrs.indexOf(mx);
 var W=150,c=W/2,R=58,s='<svg viewBox="0 0 '+W+' '+W+'" class="ring" role="img" aria-label="Spending by hour">';
 hrs.forEach(function(v,h){var an=(h/24)*Math.PI*2-Math.PI/2,x=c+R*Math.cos(an),y=c+R*Math.sin(an),o=v?.25+.75*v/mx:.12;s+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(h===pk?6:4.5)+'" fill="var(--text)" fill-opacity="'+o.toFixed(2)+'" class="rd'+(h===pk?' pk':'')+'" style="--i:'+h+'" data-a="reveal" data-v="'+(h%12||12)+(h<12?' am':' pm')+' · '+fmt(v)+'"/>';});
 [['12a',c,c-R+16],['6a',c+R-16,c+4],['12p',c,c+R-10],['6p',c-R+16,c+4]].forEach(function(l){s+='<text x="'+l[1]+'" y="'+l[2]+'" text-anchor="middle" font-size="9" fill="var(--text3)">'+l[0]+'</text>';});
 var word=pk<11?'Mornings':pk<16?'Afternoons':pk<21?'Evenings':'Late nights';
 s+='<text x="'+c+'" y="'+(c+4)+'" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">'+word+'</text></svg>';
 return {body:s,cap:word+' are when money moves',key:tkey('1 dot = 1 hour','dot')};};
WF.week=function(){var d=[0,0,0,0,0,0,0];spendsIn(NOW-28*DAY,NOW+1).forEach(function(t){d[(new Date(t.ts).getDay()+6)%7]+=t.amt;});var u=unitFor(d,50),L=['M','T','W','T','F','S','S'],mx=d.indexOf(Math.max.apply(null,d));
 return {body:'<div class="cols c7">'+d.map(function(v,i){return '<div class="col">'+tg(tiles(v,u,{c:i===mx?'var(--text)':'var(--text3)'}),2,11,3,{cls:'up',attr:'data-a="reveal" data-v="'+DOWS[(i+1)%7]+'s · '+fmt(v)+'"'})+'<small>'+L[i]+'</small></div>';}).join('')+'</div>',cap:DOWS[(mx+1)%7]+'s are the busiest, last four weeks',key:tkey(ukey(u)),n:d.reduce(function(a,x){return a+tcount(x,u);},0)};};
WF.top=function(){var g={};spendsIn(mStart(curM()),NOW+1,function(t){return t.cat!=='Unsorted';}).forEach(function(t){(g[t.merchant]=g[t.merchant]||{n:t.merchant,c:t.cat,v:0}).v+=t.amt;});var r=Object.keys(g).map(function(k){return g[k];}).sort(function(a,b){return b.v-a.v;}).slice(0,5),u=unitFor(r.map(function(x){return x.v;}),50);
 return {body:'<div class="rows">'+r.map(function(x){return '<div class="rw" data-a="reveal" data-v="'+esc(x.n)+' · '+fmt(x.v)+'"><span class="rl">'+esc(x.n)+'</span>'+tg(tiles(x.v,u,ct(x.c)),0,11,3)+'</div>';}).join('')+'</div>',cap:'Where '+MONL[curM()]+' went most',key:tkey(ukey(u)),n:r.reduce(function(a,x){return a+tcount(x.v,u);},0)};};
function subRing(size,r,dotR){var c=size/2,s='<svg viewBox="0 0 '+size+' '+size+'" width="'+size+'" height="'+size+'" class="ring" aria-hidden="true">',td=new Date(NOW).getDate();for(var d=1;d<=30;d++){var an=((d-1)/30)*Math.PI*2-Math.PI/2,sub=SUBS.filter(function(x){return x.day===d;})[0],x=c+r*Math.cos(an),y=c+r*Math.sin(an);
  s+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(sub?dotR*1.5:dotR)+'" fill="'+(sub?catColor(sub.cat):d===td?'var(--text)':'var(--text3)')+'" fill-opacity="'+(sub?1:d<td?.5:.2)+'"'+(sub?' class="sg'+(sub.day>=td&&sub.day-td<4?' soon':'')+'"':'')+(sub?' data-a="reveal" data-v="'+esc(sub.name)+' · '+fmt(sub.amt)+' on the '+ordinal(sub.day)+'"':'')+'/>';}
 return s+'</svg>';}
WF.subs=function(){var u=unitFor(SUBS.map(function(s){return s.amt;}),30);
 return {body:'<div style="display:flex;gap:14px;align-items:center">'+subRing(96,40,3)+'<div class="rows" style="flex:1;min-width:0">'+SUBS.map(function(s){return '<div class="rw" data-a="reveal" data-v="'+esc(s.name)+' · '+fmt(s.amt)+' a month"><span class="rl">'+esc(s.name)+'</span>'+tg(tiles(s.amt,u,ct(s.cat)),0,10,3)+'</div>';}).join('')+'</div></div>',cap:'Glowing dots are renewal days',key:tkey(ukey(u)),n:SUBS.reduce(function(a,s){return a+tcount(s.amt,u);},0)};};
WF.owed=function(){var o=IOUS.filter(function(i){return !i.settledTs;});if(!o.length)return {body:'<p class="muted">Everyone has paid you back.</p>',cap:'All square',key:''};var u=unitFor(o.map(function(i){return i.amt;}),30);
 return {body:'<div class="rows">'+o.map(function(i){return '<div class="rw" data-a="reveal" data-v="'+i.person+' · '+fmt(i.amt)+'"><span class="rl">'+i.person+'</span>'+tg(tiles(i.amt,u,{cls:'ol'}),0,12,3)+'</div>';}).join('')+'</div><div class="chips" style="margin-top:8px"><button class="chip" data-a="remind">'+ic('bell',16)+'Remind</button><button class="chip" data-a="settle">'+ic('check',16)+'Paid back</button></div>',cap:'Outlined: not in your balance until they pay',key:tkey(ukey(u),'ol'),n:o.reduce(function(a,i){return a+tcount(i.amt,u);},0)};};
function goalRate(){var m=curM(),v=[m-2,m-1].map(savedIn);return Math.max(200,(v[0]+v[1])/2/4.33);}
function goalEta(g){var have=POOLS().g[g.id]||0,rem=Math.max(0,g.target-have),w=Math.ceil(rem/goalRate());return {weeks:w,ts:NOW+w*7*DAY,rem:rem};}
WF.eta=function(o){var g=(o&&o.g)||topGoal(),e=goalEta(g),start=g.createdTs||NOW-8*7*DAY,past=Math.max(1,Math.round((NOW-start)/(7*DAY))),tot=past+e.weeks,step=1;while(tot/step>40)step++;var n=Math.ceil(tot/step),pn=Math.round(past/step),a=[];
 for(var i=0;i<n;i++)a.push(i<pn?{c:'var(--save)',cls:i===pn-1?'gl':''}:{cls:i===n-1?'tgt':''});
 return {body:tg(a,0,9,4,{cls:'path',attr:'data-a="reveal" data-v="About '+e.weeks+' weeks to go"'}),cap:esc(g.name)+' around '+MONL[new Date(e.ts).getMonth()]+' at this pace',key:tkey(step===1?'1 dot = 1 week':'1 dot = '+step+' weeks','sv')};};
WF.range=function(){var ws=(new Date(NOW).getDay()+6)%7,w0=dayStart(NOW)-ws*DAY,weeks=[];for(var i=5;i>=0;i--){var a=w0-i*7*DAY,d={};spendsIn(a,a+7*DAY).forEach(function(t){var k=dayStart(t.ts);d[k]=(d[k]||0)+t.amt;});var v=Object.keys(d).map(function(k){return d[k];}).sort(function(x,y){return x-y;});weeks.push({a:a,v:v,cur:i===0});}
 var mx=Math.max.apply(null,weeks.map(function(w){return w.v[w.v.length-1]||0;}))||1,step=[50,100,200,250,500,1000].filter(function(s){return mx/s<=5;})[0]||1000,top=Math.ceil(mx/step)*step,W=340,H=150,pl=8,pb=20,cw=(W-pl)/6,Y=function(v){return 8+(H-pb-8)*(1-v/top);};
 var s='<svg viewBox="0 0 '+W+' '+H+'" class="rng" role="img" aria-label="Daily spend range per week">';for(var g=0;g<=top;g+=step)s+='<line x1="0" x2="'+W+'" y1="'+Y(g).toFixed(1)+'" y2="'+Y(g).toFixed(1)+'" stroke="var(--border)" stroke-width="1"/>';
 weeks.forEach(function(w,i){var x=pl+cw*i+cw/2;if(w.v.length){s+='<line x1="'+x+'" x2="'+x+'" y1="'+Y(w.v[0]).toFixed(1)+'" y2="'+Y(w.v[w.v.length-1]).toFixed(1)+'" stroke="var(--text3)" stroke-width="1.5" class="rail"/>';
  w.v.forEach(function(v,j){s+='<circle cx="'+x+'" cy="'+Y(v).toFixed(1)+'" r="4" fill="'+(w.cur?'var(--text)':'var(--text2)')+'" stroke="var(--surface)" stroke-width="2" class="rdot'+(w.cur?' gl':'')+'" style="--i:'+(i*7+j)+'"/>';});
  var md=w.v[Math.floor(w.v.length/2)];s+='<line x1="'+(x-9)+'" x2="'+(x+9)+'" y1="'+Y(md).toFixed(1)+'" y2="'+Y(md).toFixed(1)+'" stroke="var(--text)" stroke-width="2"/>';}
  var dd=new Date(w.a);s+='<text x="'+x+'" y="'+(H-5)+'" text-anchor="middle" font-size="10" fill="'+(w.cur?'var(--text)':'var(--text3)')+'">'+(w.cur?'This wk':dd.getDate()+' '+MON[dd.getMonth()])+'</text>';
  s+='<rect x="'+(x-cw/2)+'" y="0" width="'+cw+'" height="'+H+'" fill="transparent" data-a="reveal" data-v="Week of '+dd.getDate()+' '+MON[dd.getMonth()]+' · '+(w.v.length?fmt(w.v[0])+' to '+fmt(w.v[w.v.length-1])+' a day':'no spends')+'"/>';});
 var rg=function(w){return w.v.length?w.v[w.v.length-1]-w.v[0]:0;},cur=rg(weeks[5]),prev=weeks.slice(0,5).map(rg).reduce(function(a,b){return a+b;},0)/5;
 return {body:s+'</svg>',cap:cur<prev?'Steadier than earlier weeks':'A few big days this week',key:tkey('gridline = '+fmt(step),'ln')};};
WF.flow=function(o){var sk=sankeyData();return {body:sankeySVG(sk,o),cap:'Where '+MONL[curM()]+'’s money went. Tap a block.',key:tkey(ukey(sk.u)+' · band width = ₹','g2')};};

/* ---- card chrome ---- */
function widget(w,where){var home=where==='home',o={home:home},r=WF[w](o),size=WSIZE[w];
 var gear='<button class="gear" data-a="wset" data-x="'+w+'" aria-label="'+WIDGETS[w]+' settings">'+ic('sliders',18)+'</button>';
 var tapBody=r.attr&&home;
 return '<section class="wc '+size+'" data-w="'+w+'" aria-label="'+WIDGETS[w]+(r.aria?', '+r.aria:'')+'">'+
  '<div class="wh"><span class="wt">'+WIDGETS[w]+'</span>'+gear+'</div>'+
  '<div class="wb"'+(r.attr?' '+r.attr+' role="button" tabindex="0" style="cursor:pointer"':'')+'>'+r.body+'</div>'+
  (r.cap?'<p class="wcap">'+r.cap+'</p>':'')+'<div class="wf">'+(r.key||'')+'<span class="wtip" aria-live="polite"></span></div></section>';}
function addTile(){return '<button class="wc S addw" data-a="wlib" aria-label="Add widget">'+ic('addw',30)+'<span>Add widget</span></button>';}

/* ---- Sankey ---- */
function sankeyData(){var ms=monthStart(NOW),N={},L=[],inM=function(t){return t.ts>=ms&&t.ts<=NOW+1;};
 function node(id,label,col,color,extra){if(!N[id])N[id]=Object.assign({id:id,label:label,col:col,color:color,in:0,out:0},extra||{});return N[id];}
 function link(s,t,v,cls){if(v<=0.5)return;v=Math.round(v);L.push({s:s,t:t,v:v,cls:cls||''});N[s].out+=v;N[t].in+=v;}
 node('budget','Budget',1,'var(--fillg)');node('savings','Savings',1,'var(--save)');
 TX.filter(function(t){return t.type==='income'&&inM(t);}).forEach(function(inc){var id='src:'+inc.merchant;node(id,inc.merchant,0,'var(--bone)');var tr=TX.filter(function(t){return t.incomeId===inc.id;}),f=0,sv=0;tr.forEach(function(t){if(t.reason==='fill')f+=t.amt;else sv+=t.amt;});
  link(id,'budget',f);link(id,'savings',sv);var rest=inc.amt-f-sv;if(rest>0.5){node('new','New money',1,'var(--bone)');link(id,'new',rest);}});
 TX.filter(function(t){return t.type==='settle'&&inM(t);}).forEach(function(st){node('src:paid','Paid back',0,'var(--bone)');var r=st.returns[0].ref;if(r.indexOf('budget:')===0)link('src:paid','budget',st.amt);else if(TX.some(function(t){return t.settleId===st.id;}))link('src:paid','savings',st.amt);else{node('new','New money',1,'var(--bone)');link('src:paid','new',st.amt);}});
 var cov=0;TX.forEach(function(t){if(t.type==='transfer'&&inM(t)&&t.reason==='cover')cov+=t.amt;});if(cov>0){node('src:jar','From jars',0,'var(--bone)');link('src:jar','budget',cov);}
 var spent=0;CATS.forEach(function(c){var v=spentMonth(c);node('c:'+c,c,2,catColor(c),{k:catK(c)});spent+=v;});var uns=spentMonth('Unsorted');
 var need=spent+uns-N.budget.in;if(need>0.5){node('src:earlier','Earlier money',0,'var(--bone)');link('src:earlier','budget',need);}
 CATS.forEach(function(c){link('budget','c:'+c,spentMonth(c));});if(uns>0.5){node('c:Unsorted','No category',2,'var(--uns)');link('budget','c:Unsorted',uns);}
 var left=N.budget.in-N.budget.out;if(left>0.5){node('left','Left in budget',2,'var(--text3)',{faint:1});link('budget','left',left,'left');}
 TX.filter(function(t){return t.type==='transfer'&&inM(t)&&t.reason==='save';}).forEach(function(t){t.dst.forEach(function(x){var g=goalById(x.ref.slice(5));node('g:'+g.id,g.name,2,'var(--save)',{save:1});});});
 var sdst={};TX.filter(function(t){return t.type==='transfer'&&inM(t)&&t.reason==='save';}).forEach(function(t){t.dst.forEach(function(x){sdst[x.ref]=(sdst[x.ref]||0)+x.amt;});});
 var sIn=N.savings.in,sOut=0;Object.keys(sdst).forEach(function(r){sOut+=sdst[r];});var scale=sOut?sIn/sOut:0;Object.keys(sdst).forEach(function(r){link('savings','g:'+r.slice(5),sdst[r]*scale,'save');});
 if(N['new']){node('wait','Waiting to sort',2,'var(--bone)');link('new','wait',N['new'].in);}
 var nodes=Object.keys(N).map(function(k){return N[k];}).filter(function(n){return n.in>0.5||n.out>0.5;});
 var T=Math.max.apply(null,[0,1,2].map(function(c){return nodes.filter(function(n){return n.col===c;}).reduce(function(a,n){return a+Math.max(n.in,n.out);},0);}));
 return {nodes:nodes,links:L,T:T,u:unitFor([T],24)};}
function sankeyCheck(){var sk=sankeyData(),bad=[];sk.nodes.forEach(function(n){if(n.col===1&&Math.abs(n.in-n.out)>1)bad.push(n.id+' in '+n.in+' out '+n.out);});var c0=sk.nodes.filter(function(n){return n.col===0;}).reduce(function(a,n){return a+n.out;},0),c2=sk.nodes.filter(function(n){return n.col===2;}).reduce(function(a,n){return a+n.in;},0);if(Math.abs(c0-c2)>1)bad.push('cols '+c0+' vs '+c2);return {ok:!bad.length,bad:bad,total:c0,links:sk.links.length};}
var SKN=0;
function sankeySVG(sk,o){o=o||{};var W=340,H=o.h||300,nw=12,gap=10,X=[70,158,246],id='sk'+(++SKN);
 var cols=[0,1,2].map(function(c){return sk.nodes.filter(function(n){return n.col===c;});});
 /* fold tiny right-column nodes into Other */
 var maxN=Math.max.apply(null,cols.map(function(c){return c.length;})),k=(H-(maxN-1)*gap)/sk.T;
 var small=cols[2].filter(function(n){return n.in*k<6&&!n.save;});if(small.length>1){var oth={id:'other',label:'Other',col:2,color:'var(--uns)',in:0,out:0};small.forEach(function(n){oth.in+=n.in;sk.links.forEach(function(l){if(l.t===n.id)l.t='other';});});cols[2]=cols[2].filter(function(n){return small.indexOf(n)<0;}).concat([oth]);}
 var pos={};cols.forEach(function(c,ci){var tot=c.reduce(function(a,n){return a+Math.max(n.in,n.out);},0)*k+(c.length-1)*gap,y=(H-tot)/2;c.forEach(function(n){var h=Math.max(n.in,n.out)*k;pos[n.id]={n:n,x:X[ci],y:y,h:h,oy:y,iy:y};y+=h+gap;});});
 var tpx=sk.u*k,s='<svg viewBox="-2 0 '+(W+4)+' '+H+'" class="sk" id="'+id+'" role="img" aria-label="Money flow: sources, pots and where it went, each tile '+fmt(sk.u)+'">',bands='',nodesH='';
 var order=sk.links.map(function(l,i){var a=pos[l.s],b=pos[l.t];return {l:l,a:a,b:b,i:i};}).filter(function(x){return x.a&&x.b;});
 order.forEach(function(x){var l=x.l,a=x.a,b=x.b,h=l.v*k,y0=a.oy+h/2,y1=b.iy+h/2,x0=a.x+nw,x1=b.x,mx=(x0+x1)/2;a.oy+=h;b.iy+=h;
  var grp=a.n.col===0?0:(l.cls==='save'?2:1),col=l.cls==='save'||l.t==='savings'?'var(--save)':b.n.color,delay=grp===0?300:grp===1?560:820;
  bands+='<path d="M'+x0.toFixed(1)+' '+y0.toFixed(1)+'C'+mx.toFixed(1)+' '+y0.toFixed(1)+','+mx.toFixed(1)+' '+y1.toFixed(1)+','+x1.toFixed(1)+' '+y1.toFixed(1)+'" pathLength="1" class="band g'+grp+(l.cls==='left'?' lf':'')+'" data-s="'+l.s+'" data-t="'+l.t+'" data-v="'+l.v+'" stroke="'+col+'" stroke-width="'+Math.max(1,h-1).toFixed(1)+'" style="animation-delay:'+delay+'ms" fill="none"/>'+
   '<path d="M'+x0.toFixed(1)+' '+y0.toFixed(1)+'C'+mx.toFixed(1)+' '+y0.toFixed(1)+','+mx.toFixed(1)+' '+y1.toFixed(1)+','+x1.toFixed(1)+' '+y1.toFixed(1)+'" stroke="transparent" stroke-width="'+Math.max(12,h).toFixed(1)+'" fill="none" data-a="reveal" data-v="'+esc(a.n.label)+' → '+esc(b.n.label)+' · '+fmt(l.v)+'"/>';});
 Object.keys(pos).forEach(function(kk,i){var p=pos[kk],n=p.n,v=Math.max(n.in,n.out),cls='node'+(n.save||n.id==='savings'?' sn':'')+(n.faint?' fnt':'');
  nodesH+='<g class="'+cls+'" style="animation-delay:'+(n.col*60+i*20)+'ms" data-a="skn" data-x="'+id+'|'+n.id+'" data-v="'+esc(n.label)+' · '+fmt(v)+'">';
  nodesH+='<rect x="'+p.x+'" y="'+p.y.toFixed(1)+'" width="'+nw+'" height="'+Math.max(1.5,p.h).toFixed(1)+'" rx="2.5" fill="'+(n.faint?'none':n.color)+'" stroke="'+(n.faint?'var(--text3)':'none')+'" stroke-dasharray="'+(n.faint?'3 2':'')+'"/>';
  for(var t=tpx;t<p.h-1;t+=tpx)nodesH+='<line x1="'+p.x+'" x2="'+(p.x+nw)+'" y1="'+(p.y+t).toFixed(1)+'" y2="'+(p.y+t).toFixed(1)+'" stroke="var(--surface)" stroke-width="1.2"/>';
  var lx=n.col===0?p.x-6:n.col===2?p.x+nw+6:p.x+nw/2,anc=n.col===0?'end':n.col===2?'start':'middle',last1=n.col===1&&cols[1][cols[1].length-1]===n&&cols[1].length>1,ly=n.col===1?(last1?p.y+p.h+13:p.y-5):p.y+Math.min(p.h/2,p.h)+4;
  nodesH+='<text x="'+lx+'" y="'+ly.toFixed(1)+'" text-anchor="'+anc+'" font-size="11" fill="'+(n.faint?'var(--text3)':'var(--text)')+'">'+esc(n.label)+'</text>';
  nodesH+='<rect x="'+(n.col===0?0:p.x-4)+'" y="'+(p.y-4).toFixed(1)+'" width="'+(n.col===0?p.x+nw+4:n.col===2?W-p.x+4:nw+8)+'" height="'+(Math.max(p.h,10)+8).toFixed(1)+'" fill="transparent"/></g>';});
 return s+'<g class="bands">'+bands+'</g>'+nodesH+'</svg>';}
A.skn=function(x,el){var p=x.split('|'),svg=document.getElementById(p[0]);if(!svg)return;var on=svg.getAttribute('data-hl')===p[1];svg.setAttribute('data-hl',on?'':p[1]);svg.classList.toggle('hl',!on);
 svg.querySelectorAll('.band').forEach(function(b){b.classList.toggle('on',!on&&(b.getAttribute('data-s')===p[1]||b.getAttribute('data-t')===p[1]));});if(!on)A.reveal(null,el);play('tap');};
