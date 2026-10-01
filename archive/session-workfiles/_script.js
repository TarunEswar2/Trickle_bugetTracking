
/* =========================================================
   TRICKLE — visual-first exploration
   Data model conventions ported from trickle-v2.html
   ========================================================= */
var RUPEE='₹';
var CAT_DEFS=[
  {name:'Food',        daily:220, color:'var(--coral)'},
  {name:'Snacks',      daily:90,  color:'var(--amber)'},
  {name:'Groceries',   daily:180, color:'var(--lime)'},
  {name:'Transport',   daily:100, color:'var(--sky)'},
  {name:'Stationery',  daily:60,  color:'var(--violet)'},
  {name:'Necessities', daily:200, color:'var(--rose)'},
  {name:'Buffer',      daily:70,  color:'var(--slate)'}
];
var CAT_HEX={ // resolved hex for SVG (CSS vars don't work in some SVG attrs reliably across contexts, but do in fill; keep both)
  'Food':'#fb7c6b','Snacks':'#f3b562','Groceries':'#c4e26a','Transport':'#7dc4ff',
  'Stationery':'#b69dfb','Necessities':'#f596c0','Buffer':'#93a1b8'
};
var MERCHANTS=[
  {name:'RV Shop',cat:'Snacks',min:15,max:45,perWeek:7},
  {name:'Campus Coffee',cat:'Snacks',min:20,max:40,perWeek:6},
  {name:'JD Canteen',cat:'Food',min:60,max:160,perWeek:5},
  {name:'Kameng Mess',cat:'Food',min:90,max:240,perWeek:3},
  {name:'Zepto',cat:'Groceries',min:110,max:380,perWeek:2},
  {name:'BigBasket',cat:'Groceries',min:280,max:720,perWeek:1},
  {name:'Core1 Stationery',cat:'Stationery',min:30,max:150,perWeek:1.5},
  {name:'Metro Card',cat:'Transport',min:20,max:60,perWeek:4},
  {name:'Uber',cat:'Transport',min:90,max:240,perWeek:1.5},
  {name:'Hostel Laundry',cat:'Necessities',min:60,max:120,perWeek:1},
  {name:'Medical Store',cat:'Necessities',min:70,max:260,perWeek:0.6}
];
var CONTACTS=['Nishad K','Yash Raina','Gautham S','Amma','Hostel Warden','Priya D'];

var ACCOUNTS=[], CATS=[], TXNS=[], GOALS=[], SUBS=[];
var state={};
function freshState(){
  return {current:'splash', pin:'', pinTarget:'', period:'monthly',
    payAmt:'', payTo:'', payCat:'Food', manCat:'Food', selectedCat:null, selectedGoal:null};
}
function $(id){return document.getElementById(id);}
function money(n){ n=Math.round(Number(n)||0); return RUPEE+n.toLocaleString('en-IN'); }
function rnd(a,b){ return Math.round(a+Math.random()*(b-a)); }
function dayStart(d){ var x=new Date(d); x.setHours(0,0,0,0); return x; }
function daysAgo(n){ var x=dayStart(new Date()); x.setDate(x.getDate()-n); return x; }
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function fmtDate(ts){
  var d=new Date(ts), t=dayStart(new Date()).getTime(), dd=dayStart(d).getTime();
  if(dd===t) return 'Today';
  if(dd===daysAgo(1).getTime()) return 'Yesterday';
  return d.getDate()+' '+['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()];
}
function toast(msg){
  var t=$('toast'); t.textContent=msg; t.classList.add('show');
  clearTimeout(window._tt); window._tt=setTimeout(function(){t.classList.remove('show');},2000);
}
function catColor(name){ return CAT_HEX[name] || '#93a1b8'; }
function findCat(name){ for(var i=0;i<CATS.length;i++) if(CATS[i].name===name) return CATS[i]; return null; }
function catBudget(name,days){ var c=findCat(name); return c ? c.daily*days : 100*days; }

/* ---------- seeding ---------- */
function seedAll(){
  ACCOUNTS=['tarun.k@okhdfc'];
  CATS=CAT_DEFS.map(function(c){ return {name:c.name, daily:c.daily}; });
  TXNS=[]; var id=1;
  for(var d=29; d>=0; d--){
    var date=daysAgo(d);
    for(var m=0;m<MERCHANTS.length;m++){
      var mm=MERCHANTS[m], chance=mm.perWeek/7;
      var times=Math.floor(chance)+(Math.random()<(chance%1)?1:0);
      for(var k=0;k<times;k++){
        var ts=new Date(date); ts.setHours(rnd(8,22),rnd(0,59),0,0);
        TXNS.push({id:id++, merchant:mm.name, cat:mm.cat, amt:rnd(mm.min,mm.max), ts:ts.getTime()});
      }
    }
  }
  TXNS.sort(function(a,b){return b.ts-a.ts;});
  GOALS=[
    {id:1,name:'Motorcycle down payment',target:25000,saved:rnd(9000,14000)},
    {id:2,name:'Trip to Goa',target:8000,saved:rnd(2000,5000)}
  ];
  SUBS=[
    {id:1,name:'Coursera',amt:2500,day:14},
    {id:2,name:'Spotify',amt:119,day:3},
    {id:3,name:'Cloud storage',amt:130,day:22}
  ];
}
function resetDemo(){ seedAll(); renderAll(); go('home'); toast('Demo data reset'); }

/* ---------- queries ---------- */
function txnsSince(days){ var cut=daysAgo(days-1).getTime(); return TXNS.filter(function(t){return t.ts>=cut;}); }
function sum(list){ return list.reduce(function(a,t){return a+t.amt;},0); }
function byCat(list,name){ return list.filter(function(t){return t.cat===name;}); }
function monthSoFarDays(){ var d=new Date(); return d.getDate(); }
function monthTotalDays(){ var d=new Date(); return new Date(d.getFullYear(),d.getMonth()+1,0).getDate(); }

/* ---------- nav ---------- */
var TAB_FRAMES=['home','categories','insight','savings','settings'];
var STEP_OF={welcome:1, onbCats:2, pin:3};
function go(name){
  var frames=document.querySelectorAll('.frame');
  for(var i=0;i<frames.length;i++) frames[i].classList.remove('active');
  var f=document.querySelector('.frame[data-frame="'+name+'"]');
  if(!f) return;
  f.classList.add('active'); f.scrollTop=0;
  state.current=name; closeSheet();
  var scr=f.querySelector('.scr'); if(scr) scr.scrollTop=0;
  renderDots(name);
  renderAll();
}
function renderDots(name){
  var step=STEP_OF[name]; var box=$('dots-'+name); if(!box) return;
  var html=''; for(var i=1;i<=3;i++) html+='<i style="width:6px;height:6px;border-radius:50%;display:inline-block;background:'+(i===step?'var(--accent)':'var(--line)')+'"></i>';
  box.innerHTML=html;
}
function openSheet(name){
  var scrim=$('scrim'); var sheets=document.querySelectorAll('.sheet');
  for(var i=0;i<sheets.length;i++) sheets[i].style.display=(sheets[i].getAttribute('data-sheet')===name)?'block':'none';
  scrim.classList.add('show');
  if(name==='accountSheet') renderSheetAccounts();
  if(name==='quickCatSheet') renderQuickCats();
}
function closeSheet(){
  $('scrim').classList.remove('show');
  var sheets=document.querySelectorAll('.sheet');
  for(var i=0;i<sheets.length;i++) sheets[i].style.display='none';
}
function closeSheetIfScrim(e){ if(e.target && e.target.id==='scrim') closeSheet(); }

/* =========================================================
   PIN
   ========================================================= */
function pinTap(d){
  if(state.pin.length>=4) return;
  state.pin+=String(d);
  renderPinDots();
  if(state.pin.length===4) setTimeout(function(){ go('home'); },260);
}
function pinBack(){ state.pin=state.pin.slice(0,-1); renderPinDots(); }
function renderPinDots(){
  var dots=document.querySelectorAll('#pin-dots .pin-d');
  for(var i=0;i<dots.length;i++){
    dots[i].style.background = i<state.pin.length ? 'var(--accent)' : 'transparent';
    dots[i].style.borderColor = i<state.pin.length ? 'var(--accent)' : 'var(--line)';
  }
}

/* =========================================================
   SVG HELPERS
   ========================================================= */
var SVGNS='http://www.w3.org/2000/svg';
function svgEl(tag,attrs){
  var e=document.createElementNS(SVGNS,tag);
  for(var k in attrs) e.setAttribute(k,attrs[k]);
  return e;
}
function polarPoint(cx,cy,r,angleDeg){
  var a=(angleDeg-90)*Math.PI/180;
  return {x:cx+r*Math.cos(a), y:cy+r*Math.sin(a)};
}
function arcPath(cx,cy,r,a0,a1){
  var p0=polarPoint(cx,cy,r,a0), p1=polarPoint(cx,cy,r,a1);
  var large=(a1-a0)%360>180?1:0;
  return 'M '+p0.x+' '+p0.y+' A '+r+' '+r+' 0 '+large+' 1 '+p1.x+' '+p1.y;
}

/* ---------- GAUGE (radial arc, 240deg sweep like a speedometer) ---------- */
function drawGauge(svg, pct, label, colorGood){
  svg.innerHTML='';
  var cx=110, cy=112, r=88;
  var start=-120, end=120; // 240deg sweep
  var track=svgEl('path',{d:arcPath(cx,cy,r,start,end),fill:'none',stroke:'#232a37','stroke-width':16,'stroke-linecap':'round'});
  svg.appendChild(track);
  var p=Math.max(0,Math.min(1,pct));
  var color = pct>1 ? '#f0685f' : pct>0.85 ? '#f3b562' : (colorGood||'#5eead4');
  var sweepEnd = start + (end-start)*Math.min(p,1);
  var fillArc=svgEl('path',{d:arcPath(cx,cy,r,start,sweepEnd),fill:'none',stroke:color,'stroke-width':16,'stroke-linecap':'round'});
  svg.appendChild(fillArc);
  // ticks at 0/25/50/75/100
  for(var i=0;i<=4;i++){
    var ang=start+(end-start)*(i/4);
    var p1=polarPoint(cx,cy,r-12,ang), p2=polarPoint(cx,cy,r-4,ang);
    svg.appendChild(svgEl('line',{x1:p1.x,y1:p1.y,x2:p2.x,y2:p2.y,stroke:'#3a4252','stroke-width':2}));
  }
  // needle
  var needleAng=start+(end-start)*Math.min(p,1.08);
  var tip=polarPoint(cx,cy,r-24,needleAng);
  svg.appendChild(svgEl('line',{x1:cx,y1:cy,x2:tip.x,y2:tip.y,stroke:'#eef1f6','stroke-width':3,'stroke-linecap':'round'}));
  svg.appendChild(svgEl('circle',{cx:cx,cy:cy,r:5,fill:'#eef1f6'}));
  var t1=svgEl('text',{x:cx,y:cy-24,'text-anchor':'middle','font-size':26,'font-weight':800,fill:'#eef1f6'});
  t1.textContent=Math.round(p*100)+'%';
  svg.appendChild(t1);
  var t2=svgEl('text',{x:cx,y:cy-6,'text-anchor':'middle','font-size':10.5,'font-weight':700,fill:'#6d7688','letter-spacing':'.04em'});
  t2.textContent=(label||'of budget').toUpperCase();
  svg.appendChild(t2);
}

/* ---------- ROAD (journey path with today marker + spend milestones) ---------- */
function drawRoad(svg, dayOfMonth, totalDays, milestoneDays){
  svg.innerHTML='';
  var w=320,h=74, y=40, x0=14, x1=w-14;
  var path='M '+x0+' '+y+' L '+x1+' '+y;
  svg.appendChild(svgEl('path',{d:path,stroke:'#232a37','stroke-width':6,'stroke-linecap':'round',fill:'none'}));
  var travelled = x0+(x1-x0)*(dayOfMonth/totalDays);
  svg.appendChild(svgEl('path',{d:'M '+x0+' '+y+' L '+travelled+' '+y,stroke:'#5eead4','stroke-width':6,'stroke-linecap':'round',fill:'none'}));
  // milestones = days with a purchase above threshold
  milestoneDays.forEach(function(d){
    var mx=x0+(x1-x0)*(d/totalDays);
    var c=svgEl('circle',{cx:mx,cy:y,r:4,fill: d<=dayOfMonth ? '#fb7c6b' : '#3a4252'});
    svg.appendChild(c);
  });
  // today marker (pin)
  svg.appendChild(svgEl('circle',{cx:travelled,cy:y,r:8,fill:'#0b0e13',stroke:'#5eead4','stroke-width':3}));
  var lbl=svgEl('text',{x:travelled,y:y-16,'text-anchor':'middle','font-size':10,'font-weight':800,fill:'#eef1f6'});
  lbl.textContent='today';
  svg.appendChild(lbl);
  svg.appendChild(svgEl('text',{x:x0,y:h-2,'font-size':9,fill:'#6d7688'})).textContent='';
  var s=svgEl('text',{x:x0,y:h-2,'font-size':9,fill:'#6d7688'}); s.textContent='day 1'; svg.appendChild(s);
  var e=svgEl('text',{x:x1,y:h-2,'text-anchor':'end','font-size':9,fill:'#6d7688'}); e.textContent='day '+totalDays; svg.appendChild(e);
}

/* ---------- TREEMAP (simple slice-and-dice, size = spend share) ---------- */
function drawTreemap(svg, data, W, H){
  // data: [{name, value, color}] sorted desc
  svg.innerHTML='';
  var total=data.reduce(function(a,d){return a+d.value;},0)||1;
  var items=data.slice().sort(function(a,b){return b.value-a.value;});
  var x=0,y=0,w=W,h=H;
  var horizontal=true;
  var remaining=items.slice();
  var rem=total;
  remaining.forEach(function(d,i){
    var frac=d.value/rem;
    var thisArea = horizontal ? {x:x,y:y,w:w*frac,h:h} : {x:x,y:y,w:w,h:h*frac};
    var rect=svgEl('rect',{x:thisArea.x+2,y:thisArea.y+2,width:Math.max(0,thisArea.w-4),height:Math.max(0,thisArea.h-4),
      rx:10, fill:d.color,'fill-opacity':0.9, style:'cursor:pointer'});
    rect.addEventListener('click', d.onclick||function(){});
    svg.appendChild(rect);
    if(thisArea.w>46 && thisArea.h>30){
      var lbl=svgEl('text',{x:thisArea.x+12,y:thisArea.y+22,'font-size':11,'font-weight':800,fill:'#0b0e13'});
      lbl.textContent=d.name; svg.appendChild(lbl);
      var pct=svgEl('text',{x:thisArea.x+12,y:thisArea.y+thisArea.h-10,'font-size':10,'font-weight':700,fill:'#0b0e13','fill-opacity':.75});
      pct.textContent=Math.round(d.value/total*100)+'%'; svg.appendChild(pct);
    }
    if(horizontal){ x+=thisArea.w; w-=thisArea.w; } else { y+=thisArea.h; h-=thisArea.h; }
    rem-=d.value;
    horizontal=!horizontal;
  });
}

/* ---------- ISOTYPE ROW (icon per txn, sized+colored by category) ---------- */
function renderIsotype(container, txns){
  container.innerHTML='';
  var maxAmt=Math.max.apply(null, txns.map(function(t){return t.amt;}).concat([1]));
  txns.slice(0,42).forEach(function(t){
    var size=10+Math.round(14*Math.min(1,t.amt/maxAmt));
    var d=document.createElement('div');
    d.className='iso-dot';
    d.style.width=size+'px'; d.style.height=size+'px';
    d.style.background=catColor(t.cat);
    d.title=t.merchant+' · '+money(t.amt);
    container.appendChild(d);
  });
}

/* ---------- COIN STACK (pictogram, one coin ≈ fixed value) ---------- */
function drawCoinStack(svg, days, values, unit){
  svg.innerHTML='';
  var w=320,h=90, n=values.length, colW=w/n;
  var maxCoins=8;
  values.forEach(function(v,i){
    var coins=Math.min(maxCoins, Math.round(v/unit));
    var cx=colW*i+colW/2;
    for(var k=0;k<coins;k++){
      var cy=h-8-k*9;
      svg.appendChild(svgEl('circle',{cx:cx,cy:cy,r:6.5,fill:'#f3b562',stroke:'#0b0e13','stroke-width':1}));
    }
    var lbl=svgEl('text',{x:cx,y:h+0,'text-anchor':'middle','font-size':8,fill:'#6d7688'});
  });
  // day labels every 3rd
  values.forEach(function(v,i){
    if(i%3!==0) return;
    var cx=colW*i+colW/2;
    var t=svgEl('text',{x:cx,y:h+8,'text-anchor':'middle','font-size':7.5,fill:'#6d7688'});
    t.textContent=days[i]; svg.appendChild(t);
  });
}

/* ---------- THERMOMETER / MOUNTAIN for goal progress ---------- */
function drawMountain(svg, pct, W, H){
  svg.innerHTML='';
  var p=Math.max(0,Math.min(1,pct));
  var baseY=H-14, peakY=18, peakX=W*0.62;
  // mountain silhouette
  var path='M 10 '+baseY+' L '+(W*0.28)+' '+(baseY-H*0.32)+' L '+(W*0.42)+' '+(baseY-H*0.5)+' L '+peakX+' '+peakY+' L '+(W*0.8)+' '+(baseY-H*0.38)+' L '+(W-10)+' '+baseY+' Z';
  svg.appendChild(svgEl('path',{d:path, fill:'#1f2531', stroke:'#2c3444','stroke-width':2}));
  // snow cap
  svg.appendChild(svgEl('path',{d:'M '+peakX+' '+peakY+' L '+(peakX-16)+' '+(peakY+22)+' L '+(peakX+16)+' '+(peakY+22)+' Z', fill:'#eef1f6'}));
  // climber marker along the ascent line proportional to pct, from base to peak
  var mx = 10 + (peakX-10)*p;
  var my = baseY - (baseY-peakY)*p;
  svg.appendChild(svgEl('line',{x1:10,y1:baseY,x2:peakX,y2:peakY,stroke:'#5eead4','stroke-width':2,'stroke-dasharray':'1 6','stroke-linecap':'round'}));
  svg.appendChild(svgEl('circle',{cx:mx,cy:my,r:8,fill:'#5eead4'}));
  svg.appendChild(svgEl('circle',{cx:mx,cy:my,r:8,fill:'none',stroke:'#0b0e13','stroke-width':2}));
  var flagT=svgEl('text',{x:peakX,y:peakY-8,'text-anchor':'middle','font-size':14}); flagT.textContent='🚩'; svg.appendChild(flagT);
  var pctT=svgEl('text',{x:mx,y:my-14,'text-anchor':'middle','font-size':12,'font-weight':800,fill:'#eef1f6'});
  pctT.textContent=Math.round(p*100)+'%'; svg.appendChild(pctT);
}

/* ---------- FUNNEL (money in -> categories out, sankey-lite) ---------- */
function drawFunnel(svg, total, stages){
  // stages: [{name,value,color}]
  svg.innerHTML='';
  var W=320,H=140, top=20;
  var maxV=stages.reduce(function(a,s){return a+s.value;},0)||1;
  var cx=W/2, y=top, bandH=(H-top-10)/stages.length;
  stages.forEach(function(s,i){
    var wTop = 60 + 220*(1 - i/stages.length);
    var wBot = 60 + 220*(1 - (i+1)/stages.length);
    var y0=y, y1=y+bandH;
    var pts = [ [cx-wTop/2,y0],[cx+wTop/2,y0],[cx+wBot/2,y1],[cx-wBot/2,y1] ];
    var d='M '+pts.map(function(p){return p[0]+' '+p[1];}).join(' L ')+' Z';
    svg.appendChild(svgEl('path',{d:d, fill:s.color, 'fill-opacity':.88}));
    var t=svgEl('text',{x:cx,y:(y0+y1)/2+4,'text-anchor':'middle','font-size':10.5,'font-weight':800,fill:'#0b0e13'});
    t.textContent=s.name+' · '+Math.round(s.value/maxV*100)+'%';
    svg.appendChild(t);
    y=y1;
  });
}

/* ---------- CLOCK FACE (time-of-day radial histogram) ---------- */
function drawClock(svg, buckets){ // buckets: array of 24 values
  svg.innerHTML='';
  var cx=110,cy=110,rBase=40, rMax=78;
  var maxV=Math.max.apply(null,buckets.concat([1]));
  svg.appendChild(svgEl('circle',{cx:cx,cy:cy,r:rBase,fill:'none',stroke:'#232a37','stroke-width':1}));
  svg.appendChild(svgEl('circle',{cx:cx,cy:cy,r:rMax,fill:'none',stroke:'#232a37','stroke-width':1}));
  buckets.forEach(function(v,h){
    var a0=h*15, a1=(h+1)*15-2;
    var r=rBase+(rMax-rBase)*(v/maxV);
    var p0i=polarPoint(cx,cy,rBase,a0), p1i=polarPoint(cx,cy,rBase,a1);
    var p1o=polarPoint(cx,cy,r,a1), p0o=polarPoint(cx,cy,r,a0);
    var d='M '+p0i.x+' '+p0i.y+' L '+p0o.x+' '+p0o.y+' A '+r+' '+r+' 0 0 1 '+p1o.x+' '+p1o.y+' L '+p1i.x+' '+p1i.y+' Z';
    var color = (h>=7&&h<11)?'#7dc4ff':(h>=11&&h<15)?'#f3b562':(h>=15&&h<19)?'#c4e26a':(h>=19&&h<23)?'#fb7c6b':'#5b6577';
    svg.appendChild(svgEl('path',{d:d, fill:color, 'fill-opacity':v>0?0.92:0.15}));
  });
  [0,6,12,18].forEach(function(h){
    var p=polarPoint(cx,cy,rMax+10,h*15);
    var t=svgEl('text',{x:p.x,y:p.y+3,'text-anchor':'middle','font-size':9,fill:'#6d7688'});
    t.textContent=h===0?'12am':h===6?'6am':h===12?'12pm':'6pm';
    svg.appendChild(t);
  });
}

/* ---------- STAIRCASE (week over week) ---------- */
function drawStaircase(svg, weeks){ // [{label,value}]
  svg.innerHTML='';
  var W=320,H=110, padL=8, padB=18;
  var maxV=Math.max.apply(null, weeks.map(function(w){return w.value;}).concat([1]));
  var colW=(W-padL*2)/weeks.length;
  weeks.forEach(function(w,i){
    var barH=(H-padB-14)*(w.value/maxV);
    var x=padL+i*colW+6, y=H-padB-barH, bw=colW-12;
    var color = i===weeks.length-1 ? '#5eead4' : '#2c3444';
    svg.appendChild(svgEl('rect',{x:x,y:y,width:bw,height:barH,rx:6,fill:color}));
    var vt=svgEl('text',{x:x+bw/2,y:y-6,'text-anchor':'middle','font-size':9.5,'font-weight':700,fill:'#eef1f6'});
    vt.textContent=money(w.value); svg.appendChild(vt);
    var lt=svgEl('text',{x:x+bw/2,y:H-4,'text-anchor':'middle','font-size':9,fill:'#6d7688'});
    lt.textContent=w.label; svg.appendChild(lt);
  });
}

/* ---------- ICEBERG (visible one-off vs hidden recurring) ---------- */
function drawIceberg(svg, visiblePct){
  svg.innerHTML='';
  var W=320,H=140, waterY=54;
  svg.appendChild(svgEl('rect',{x:0,y:0,width:W,height:waterY,fill:'#12161f'}));
  svg.appendChild(svgEl('rect',{x:0,y:waterY,width:W,height:H-waterY,fill:'#0e2a33'}));
  svg.appendChild(svgEl('line',{x1:0,y1:waterY,x2:W,y2:waterY,stroke:'#5eead4','stroke-width':1.5,'stroke-dasharray':'3 4'}));
  var cx=W/2;
  var topH=waterY-14, botH=H-waterY-10;
  svg.appendChild(svgEl('path',{d:'M '+(cx-34)+' '+waterY+' L '+(cx-10)+' '+(waterY-topH)+' L '+(cx+14)+' '+waterY+' Z', fill:'#dfe6f0'}));
  svg.appendChild(svgEl('path',{d:'M '+(cx-50)+' '+waterY+' L '+cx+' '+(waterY+botH)+' L '+(cx+52)+' '+waterY+' Z', fill:'#9fb6c9','fill-opacity':.85}));
  var t1=svgEl('text',{x:16,y:20,'font-size':10,'font-weight':800,fill:'#eef1f6'}); t1.textContent='visible spends'; svg.appendChild(t1);
  var t2=svgEl('text',{x:16,y:H-8,'font-size':10,'font-weight':800,fill:'#7dc4ff'}); t2.textContent='recurring, out of sight'; svg.appendChild(t2);
}

/* ---------- BUBBLE (top merchants) ---------- */
function drawBubbles(svg, items){ // [{name,value}]
  svg.innerHTML='';
  var W=320,H=130;
  var maxV=Math.max.apply(null, items.map(function(i){return i.value;}));
  var positions=[[60,60],[150,42],[240,62],[100,100],[200,102],[270,100]];
  items.slice(0,6).forEach(function(it,i){
    var r=14+34*Math.sqrt(it.value/maxV);
    var pos=positions[i]||[60+i*40,70];
    svg.appendChild(svgEl('circle',{cx:pos[0],cy:pos[1],r:r,fill:'#7dc4ff','fill-opacity':.85}));
    var t=svgEl('text',{x:pos[0],y:pos[1]-2,'text-anchor':'middle','font-size':9,'font-weight':800,fill:'#0b0e13'});
    t.textContent=it.name.length>9?it.name.slice(0,8)+'…':it.name; svg.appendChild(t);
    var v=svgEl('text',{x:pos[0],y:pos[1]+10,'text-anchor':'middle','font-size':8,fill:'#0b0e13','fill-opacity':.7});
    v.textContent=money(it.value); svg.appendChild(v);
  });
}

/* =========================================================
   RENDERERS PER SCREEN
   ========================================================= */
function renderTabbar(active){
  var tabs=[
    {k:'home',icon:'M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1z'},
    {k:'categories',icon:'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z'},
    {k:'insight',icon:'M4 19V9M11 19V4M18 19v-7'},
    {k:'savings',icon:'M12 3l2.5 6H21l-5 4 2 7-6-4.2L6 20l2-7-5-4h6.5z'},
    {k:'settings',icon:'M12 8a4 4 0 100 8 4 4 0 000-8zM4 12h2M18 12h2M12 4v2M12 18v2'}
  ];
  TAB_FRAMES.forEach(function(name){
    var bar=$('tabbar-'+name); if(!bar) return;
    bar.innerHTML=tabs.map(function(t){
      return '<button class="tab '+(t.k===active?'on':'')+'" onclick="go(\''+t.k+'\')">'+
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="'+t.icon+'"/></svg>'+
        '<span>'+t.k.charAt(0).toUpperCase()+t.k.slice(1)+'</span></button>';
    }).join('');
  });
}

function renderOnbTreemap(){
  var svg=$('onb-treemap'); if(!svg) return;
  var data=CAT_DEFS.map(function(c){ return {name:c.name, value:c.daily, color:catColor(c.name)}; });
  drawTreemap(svg, data, 354, 210);
}

function renderHome(){
  if(state.current!=='home') return;
  var today=new Date();
  $('home-dateline').textContent = today.toLocaleDateString('en-IN',{month:'short',day:'numeric'})+' · day '+monthSoFarDays()+' of '+monthTotalDays();
  $('home-acct-count').textContent = ACCOUNTS.length;
  var monthDays=monthSoFarDays();
  var totalBudget = CATS.reduce(function(a,c){return a+c.daily;},0)*monthTotalDays();
  var spent = sum(txnsSince(monthDays));
  drawGauge($('home-gauge'), spent/totalBudget, 'of month\'s budget');
  $('home-spent').textContent=money(spent);
  $('home-left').textContent=money(Math.max(0,totalBudget-spent));
  $('home-road-day').textContent='day '+monthDays+' / '+monthTotalDays();
  var dailyTotals=[]; var milestoneDays=[];
  for(var d=1;d<=monthTotalDays();d++){
    var dayTxns = TXNS.filter(function(t){ var dt=new Date(t.ts); return dt.getDate()===d && dt.getMonth()===today.getMonth(); });
    var s=sum(dayTxns);
    if(s>350) milestoneDays.push(d);
  }
  drawRoad($('home-road'), monthDays, monthTotalDays(), milestoneDays);
  var week=txnsSince(7);
  $('home-iso-count').textContent=week.length+' purchases';
  renderIsotype($('home-isotype'), week);
  var byC={};
  week.forEach(function(t){ byC[t.cat]=(byC[t.cat]||0)+1; });
  $('home-iso-legend').innerHTML = Object.keys(byC).map(function(c){
    return '<span><i style="background:'+catColor(c)+'"></i>'+c+' ('+byC[c]+')</span>';
  }).join('');
}

function renderCategories(){
  if(state.current!=='categories') return;
  var month=txnsSince(monthSoFarDays());
  var total=sum(month);
  $('cat-total').textContent=money(total);
  var data=CATS.map(function(c){
    var v=sum(byCat(month,c.name));
    return {name:c.name, value:v||1, color:catColor(c.name), onclick:(function(nm){return function(){ openCatDetail(nm); };})(c.name)};
  });
  drawTreemap($('cat-treemap'), data, 354, 230);
  var box=$('cat-bars'); box.innerHTML='';
  CATS.forEach(function(c){
    var spent=sum(byCat(month,c.name));
    var budget=c.daily*monthSoFarDays();
    var pct=Math.min(1.2, spent/(budget||1));
    var row=document.createElement('div');
    row.className='card tap'; row.style.padding='12px 14px'; row.onclick=(function(nm){return function(){openCatDetail(nm);};})(c.name);
    row.innerHTML =
      '<div class="row between" style="margin-bottom:8px"><span style="font-size:12.5px;font-weight:700">'+esc(c.name)+'</span>'+
      '<span class="tag numeric">'+money(spent)+' / '+money(budget)+'</span></div>'+
      '<div style="height:8px;border-radius:5px;background:#1f2531;overflow:hidden">'+
      '<div style="height:100%;width:'+Math.min(100,pct*100)+'%;border-radius:5px;background:'+(pct>1?'#f0685f':pct>0.85?'#f3b562':catColor(c.name))+'"></div></div>';
    box.appendChild(row);
  });
}

function openCatDetail(name){
  state.selectedCat=name; go('catDetail');
}
function renderCatDetail(){
  if(state.current!=='catDetail') return;
  var name=state.selectedCat || CATS[0].name;
  var c=findCat(name);
  $('cd-name').textContent=name;
  var month=txnsSince(monthSoFarDays());
  var spent=sum(byCat(month,name));
  var budget=(c?c.daily:100)*monthSoFarDays();
  drawGauge($('cd-gauge'), spent/(budget||1), 'of budget', catColor(name));
  $('cd-sub').textContent = money(spent)+' of '+money(budget)+' this month';
  var days=[], vals=[];
  for(var i=13;i>=0;i--){
    var d=daysAgo(i);
    var dayTxns=byCat(TXNS.filter(function(t){return dayStart(new Date(t.ts)).getTime()===d.getTime();}), name);
    days.push(['S','M','T','W','T','F','S'][d.getDay()]);
    vals.push(sum(dayTxns));
  }
  drawCoinStack($('cd-coins'), days, vals, Math.max(20,Math.round((c?c.daily:100)/4)));
  var list=byCat(month,name).slice(0,8);
  $('cd-txns').innerHTML = list.length ? list.map(function(t){
    return '<div class="row between"><span style="font-size:12.5px">'+esc(t.merchant)+'</span>'+
      '<span class="tag numeric">'+money(t.amt)+' · '+fmtDate(t.ts)+'</span></div>';
  }).join('') : '<span class="hint">No spends yet this month.</span>';
}

function renderInsight(){
  if(state.current!=='insight') return;
  var month=txnsSince(monthSoFarDays());
  var totalBudget=CATS.reduce(function(a,c){return a+c.daily;},0)*monthTotalDays();
  var spent=sum(month);
  var pace = spent / (totalBudget * (monthSoFarDays()/monthTotalDays()));

  // clock buckets
  var buckets=new Array(24).fill(0);
  txnsSince(30).forEach(function(t){ buckets[new Date(t.ts).getHours()]+=t.amt; });

  // week over week (last 4 weeks)
  var weeks=[];
  for(var w=3;w>=0;w--){
    var list=TXNS.filter(function(t){ var days=Math.floor((Date.now()-t.ts)/86400000); return days>=w*7 && days<(w+1)*7; });
    weeks.push({label: w===0?'this wk': (w+1)+'w ago', value: sum(list)});
  }

  // iceberg: recurring (subs) vs one-off visible
  var subTotal=SUBS.reduce(function(a,s){return a+s.amt;},0);
  var visiblePct = Math.max(0.25, Math.min(0.85, spent/(spent+subTotal*3)));

  // funnel: total balance-ish -> top 3 categories
  var catTotals=CATS.map(function(c){return {name:c.name, value:sum(byCat(month,c.name)), color:catColor(c.name)};})
    .sort(function(a,b){return b.value-a.value;}).slice(0,4);

  // bubble: top merchants
  var byM={};
  month.forEach(function(t){ byM[t.merchant]=(byM[t.merchant]||0)+t.amt; });
  var merchantList=Object.keys(byM).map(function(k){return {name:k,value:byM[k]};}).sort(function(a,b){return b.value-a.value;});

  // goal mountain snapshot (best goal)
  var topGoal = GOALS.slice().sort(function(a,b){ return (b.saved/b.target)-(a.saved/a.target); })[0];

  var cards=[];

  cards.push(
    '<div class="card"><div class="row between" style="margin-bottom:6px"><h2 style="margin:0">pace vs budget</h2><span class="tag">speedometer</span></div>'+
    '<div class="center"><svg id="ins-gauge" width="220" height="140" viewBox="0 0 220 130"></svg></div>'+
    '<p class="hint center" style="margin:4px 0 0">'+(pace>1?'running hot for this point in the month':'comfortably under pace')+'</p></div>'
  );

  cards.push(
    '<div class="card"><div class="row between" style="margin-bottom:6px"><h2 style="margin:0">when money leaves</h2><span class="tag">24h clock</span></div>'+
    '<div class="center"><svg id="ins-clock" width="220" height="220" viewBox="0 0 220 220"></svg></div>'+
    '<div class="legend" style="justify-content:center;margin-top:6px">'+
    '<span><i style="background:#7dc4ff"></i>morning</span><span><i style="background:#f3b562"></i>midday</span>'+
    '<span><i style="background:#c4e26a"></i>evening</span><span><i style="background:#fb7c6b"></i>night</span></div></div>'
  );

  cards.push(
    '<div class="card"><div class="row between" style="margin-bottom:6px"><h2 style="margin:0">week over week</h2><span class="tag">staircase</span></div>'+
    '<svg id="ins-stairs" width="100%" viewBox="0 0 320 110"></svg></div>'
  );

  cards.push(
    '<div class="card"><div class="row between" style="margin-bottom:6px"><h2 style="margin:0">visible vs hidden spend</h2><span class="tag">iceberg</span></div>'+
    '<svg id="ins-iceberg" width="100%" viewBox="0 0 320 140"></svg>'+
    '<p class="hint" style="margin:6px 0 0">'+SUBS.length+' subscriptions total '+money(subTotal)+'/mo below the surface</p></div>'
  );

  cards.push(
    '<div class="card"><div class="row between" style="margin-bottom:6px"><h2 style="margin:0">where it flows</h2><span class="tag">funnel</span></div>'+
    '<svg id="ins-funnel" width="100%" viewBox="0 0 320 150"></svg></div>'
  );

  cards.push(
    '<div class="card"><div class="row between" style="margin-bottom:6px"><h2 style="margin:0">top merchants</h2><span class="tag">bubbles</span></div>'+
    '<svg id="ins-bubbles" width="100%" viewBox="0 0 320 130"></svg></div>'
  );

  if(topGoal){
    cards.push(
      '<div class="card tap" onclick="openGoal('+topGoal.id+')"><div class="row between" style="margin-bottom:6px"><h2 style="margin:0">closest goal · '+esc(topGoal.name)+'</h2><span class="tag">mountain</span></div>'+
      '<svg id="ins-mountain" width="100%" viewBox="0 0 330 150"></svg></div>'
    );
  }

  $('insight-feed').innerHTML = cards.join('');

  drawGauge($('ins-gauge'), spent/totalBudget, 'spent this month');
  drawClock($('ins-clock'), buckets);
  drawStaircase($('ins-stairs'), weeks);
  drawIceberg($('ins-iceberg'), visiblePct);
  drawFunnel($('ins-funnel'), spent, catTotals);
  drawBubbles($('ins-bubbles'), merchantList);
  if(topGoal) drawMountain($('ins-mountain'), topGoal.saved/topGoal.target, 330, 150);
}

function renderSavings(){
  if(state.current!=='savings') return;
  var box=$('goal-cards'); box.innerHTML='';
  GOALS.forEach(function(g){
    var pct=Math.min(1,g.saved/g.target);
    var el=document.createElement('div');
    el.className='card tap'; el.onclick=(function(id){return function(){openGoal(id);};})(g.id);
    el.innerHTML =
      '<div class="row between" style="margin-bottom:6px"><span style="font-weight:700;font-size:13.5px">'+esc(g.name)+'</span>'+
      '<span class="tag numeric">'+Math.round(pct*100)+'%</span></div>'+
      '<svg width="100%" viewBox="0 0 330 110" data-sv></svg>'+
      '<div class="row between" style="margin-top:6px"><span class="tag numeric">'+money(g.saved)+' saved</span><span class="tag numeric">'+money(g.target)+' goal</span></div>';
    box.appendChild(el);
    drawMountain(el.querySelector('[data-sv]'), pct, 330, 110);
  });
  drawSubBelt();
  var lg=$('sub-legend');
  lg.innerHTML = SUBS.map(function(s){
    return '<span><i style="background:#7dc4ff"></i>'+esc(s.name)+' · '+money(s.amt)+' on the '+s.day+'th</span>';
  }).join('');
}
function drawSubBelt(){
  var svg=$('sub-belt'); if(!svg) return;
  svg.innerHTML='';
  var W=330,H=108, beltY=70;
  svg.appendChild(svgEl('line',{x1:14,y1:beltY,x2:W-14,y2:beltY,stroke:'#2c3444','stroke-width':4,'stroke-linecap':'round'}));
  var sorted=SUBS.slice().sort(function(a,b){return a.day-b.day;});
  var today=new Date().getDate();
  sorted.forEach(function(s,i){
    var x=30+i*((W-60)/Math.max(1,sorted.length-1||1));
    var daysAway=(s.day-today+31)%31;
    var upcoming = daysAway<=7;
    svg.appendChild(svgEl('rect',{x:x-16,y:beltY-30,width:32,height:32,rx:8,fill:upcoming?'#f3b562':'#232a37',stroke:'#0b0e13','stroke-width':1}));
    var t=svgEl('text',{x:x,y:beltY-11,'text-anchor':'middle','font-size':13}); t.textContent='₹'; t.setAttribute('fill', upcoming?'#0b0e13':'#aab2c2'); t.setAttribute('font-weight','800');
    svg.appendChild(t);
    svg.appendChild(svgEl('line',{x1:x,y1:beltY-14,x2:x,y2:beltY,stroke:'#2c3444','stroke-width':2}));
    var lab=svgEl('text',{x:x,y:beltY+16,'text-anchor':'middle','font-size':8.5,'font-weight':700,fill:'#eef1f6'});
    lab.textContent=s.name.length>9?s.name.slice(0,8)+'…':s.name; svg.appendChild(lab);
    var dlab=svgEl('text',{x:x,y:beltY+27,'text-anchor':'middle','font-size':8,fill:'#6d7688'});
    dlab.textContent='in '+daysAway+'d'; svg.appendChild(dlab);
  });
}

function openGoal(id){ state.selectedGoal=id; go('goalDetail'); }
function renderGoalDetail(){
  if(state.current!=='goalDetail') return;
  var g=GOALS.filter(function(x){return x.id===state.selectedGoal;})[0] || GOALS[0];
  $('gd-name').textContent=g.name;
  drawMountain($('gd-mountain'), g.saved/g.target, 330, 190);
  $('gd-saved').textContent=money(g.saved);
  $('gd-target').textContent=money(g.target);
}
function addToGoal(){
  var g=GOALS.filter(function(x){return x.id===state.selectedGoal;})[0]; if(!g) return;
  g.saved=Math.min(g.target, g.saved+500);
  renderGoalDetail(); toast('Added ₹500');
}
function createGoal(){
  var name=$('goal-name').value.trim(), amt=Number($('goal-amt').value);
  if(!name || !amt) { toast('Fill both fields'); return; }
  GOALS.push({id:Date.now(), name:name, target:amt, saved:0});
  $('goal-name').value=''; $('goal-amt').value='';
  closeSheet(); renderAll(); toast('Goal created');
}

function renderSettings(){
  if(state.current!=='settings') return;
  $('settings-accounts').innerHTML = ACCOUNTS.map(function(a){
    return '<div class="row between"><span style="font-size:13.5px">'+esc(a)+'</span>'+
      '<button class="txt-btn" onclick="removeAccount(\''+esc(a)+'\')">Remove</button></div>';
  }).join('') || '<span class="hint">No accounts linked.</span>';
  $('settings-cats').innerHTML = CATS.map(function(c){
    return '<div class="row between"><span style="font-size:13.5px">'+esc(c.name)+'</span>'+
      '<span class="tag numeric">'+money(c.daily)+'/day</span></div>';
  }).join('');
}
function removeAccount(a){ ACCOUNTS=ACCOUNTS.filter(function(x){return x!==a;}); renderAll(); }
function renderSheetAccounts(){
  $('sheet-accounts').innerHTML = ACCOUNTS.length ? ACCOUNTS.map(function(a){
    return '<div class="pill on" onclick="removeAccount(\''+esc(a)+'\')">'+esc(a)+' ✕</div>';
  }).join('') : '<span class="hint">No accounts yet.</span>';
}
function validUpi(v){ return /^[\w.\-]{2,}@[a-z]{2,}$/i.test(v); }
function addUpiFromSheet(){
  var el=$('sheet-upi-input'), v=el.value.trim();
  if(!validUpi(v)){ $('err-sheet-upi').classList.add('show'); return; }
  if(ACCOUNTS.indexOf(v)===-1) ACCOUNTS.push(v);
  el.value=''; $('err-sheet-upi').classList.remove('show');
  renderAll(); toast('Account added');
}
function renderQuickCats(){
  $('sheet-quickcats').innerHTML = CATS.map(function(c){
    return '<span class="pill '+(c.name===state.payCat?'on':'')+'" onclick="pickCat(\''+esc(c.name)+'\')" style="border-left:4px solid '+catColor(c.name)+'">'+esc(c.name)+'</span>';
  }).join('');
}
function pickCat(name){ state.payCat=name; closeSheet(); renderConfirm(); }

/* ---------- payment flow ---------- */
function renderContactList(){
  var box=$('contact-list'); if(!box) return;
  box.innerHTML = CONTACTS.map(function(c){
    return '<div class="card tap row between" onclick="startPayTo(\''+esc(c)+'\')"><span>'+esc(c)+'</span><span>›</span></div>';
  }).join('');
}
function simulateScan(){ startPayTo('RV Shop'); }
function startPayTo(name){ state.payTo=name; state.payAmt=''; go('amount'); }
function renderAmount(){
  $('amt-to').textContent='to '+ (state.payTo||'—');
  $('amt-display').textContent = RUPEE + (state.payAmt||'0');
}
function amtTap(d){
  if(d==='.' && state.payAmt.indexOf('.')!==-1) return;
  if(state.payAmt.length>8) return;
  state.payAmt=(state.payAmt||'')+d;
  renderAmount();
}
function amtBack(){ state.payAmt=(state.payAmt||'').slice(0,-1); renderAmount(); }
function renderConfirm(){
  $('cf-to').textContent=state.payTo||'—';
  $('cf-amt').textContent=money(Number(state.payAmt||0));
  $('cf-cat').textContent=state.payCat;
  $('cf-cat').style.borderLeft='4px solid '+catColor(state.payCat);
}
function confirmPayment(){
  var amt=Number(state.payAmt||0);
  TXNS.unshift({id:Date.now(), merchant:state.payTo||'Payment', cat:state.payCat, amt:amt||1, ts:Date.now()});
  $('succ-amt').textContent=money(amt);
  $('succ-line').textContent='Paid to '+(state.payTo||'—')+' · logged under '+state.payCat;
  go('paySuccess');
}
function renderManualCats(){
  var box=$('man-cats'); if(!box) return;
  box.innerHTML = CATS.map(function(c){
    return '<span class="pill '+(c.name===state.manCat?'on':'')+'" onclick="pickManCat(\''+esc(c.name)+'\')" style="border-left:4px solid '+catColor(c.name)+'">'+esc(c.name)+'</span>';
  }).join('');
}
function pickManCat(name){ state.manCat=name; renderManualCats(); }
function submitManual(){
  var amt=Number($('man-amt').value), merch=$('man-merchant').value.trim()||'Manual entry';
  if(!amt){ toast('Enter an amount'); return; }
  TXNS.unshift({id:Date.now(), merchant:merch, cat:state.manCat||'Buffer', amt:amt, ts:Date.now()});
  $('man-amt').value=''; $('man-merchant').value='';
  $('succ-amt').textContent=money(amt);
  $('succ-line').textContent='Logged '+merch+' under '+(state.manCat||'Buffer');
  go('paySuccess');
}

/* =========================================================
   MASTER RENDER
   ========================================================= */
function renderAll(){
  renderTabbar(state.current);
  if(state.current==='onbCats') renderOnbTreemap();
  if(state.current==='home') renderHome();
  if(state.current==='categories') renderCategories();
  if(state.current==='catDetail') renderCatDetail();
  if(state.current==='insight') renderInsight();
  if(state.current==='savings') renderSavings();
  if(state.current==='goalDetail') renderGoalDetail();
  if(state.current==='settings') renderSettings();
  if(state.current==='payTo') renderContactList();
  if(state.current==='amount') renderAmount();
  if(state.current==='confirmPay') renderConfirm();
  if(state.current==='manualEntry') renderManualCats();
}

/* ---------- boot ---------- */
state=freshState();
seedAll();
go('splash');
