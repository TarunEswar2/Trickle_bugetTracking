/* ===== Trickle v12 — motion.js (Phase 12): motion + sound + haptics behind fx() =====
   Motion: Calm base (cubic-bezier(.4,0,.2,1), 480 ms, stagger 60) + Tactile springs only where the finger acts
   (pay, crumb snap, zoom, sheets, press). Sound: hybrid — coin at pay + crumb snap, chimes only for good news,
   wooden clicks for UI; charts, glow and story cards silent. WAAPI only (transform / opacity / stroke-dashoffset),
   the rendered DOM is always the FINAL state and animations only run from a start state (fill:'backwards'),
   so a cancelled or skipped animation can never leave a stuck state. Reduced motion → nothing animates. */
var MS=(function(){
 function spring(k,c){var x=0,v=0,dt=1/120,t=0,s=[0],n=0;while(t<3){var a=-k*(x-1)-c*v;v+=a*dt;x+=v*dt;t+=dt;n++;if(n%4===0)s.push(+x.toFixed(4));if(Math.abs(1-x)<0.001&&Math.abs(v)<0.01&&t>0.15)break;}
  s.push(1);return{e:'linear('+s.join(',')+')',d:Math.round(t*1000)};}
 var SPT=spring(320,26);
 var linOK=window.CSS&&CSS.supports&&CSS.supports('transition-timing-function',SPT.e);
 var CALM='cubic-bezier(.4,0,.2,1)',ENTER='cubic-bezier(.2,.8,.2,1)',GRAV='cubic-bezier(.55,0,1,.45)',TACT=linOK?SPT.e:'cubic-bezier(.2,.9,.25,1.12)',TD=linOK?SPT.d:420;
 var M={log:[],anims:0,lastScr:null,user:false,glowDone:false,swept:false,timers:[],MAXMARKS:30};
 function P(){return (window.L&&L.prefs)||{sound:true,haptics:true,motion:'system'};}
 /* ---------- motion ---------- */
 function an(el,kf,o){if(!el||reduced()||!el.animate)return null;try{var a=el.animate(kf,{duration:o.d,easing:o.e||CALM,delay:o.delay||0,fill:o.fill||'backwards'});M.anims++;return a;}catch(e){return null;}}
 function later(fn,ms){if(reduced())ms=0;var id=setTimeout(fn,ms);M.timers.push(id);return id;}
 function clearLater(){M.timers.forEach(clearTimeout);M.timers=[];}
 function marks(root,n){return Array.prototype.slice.call(root.querySelectorAll('svg.dots .m:not(.ring), svg.dots .crumb')).filter(function(m){return !(m.classList.contains('m')&&m.parentNode.classList.contains('crumb'));}).slice(0,n||M.MAXMARKS);}
 /* ---------- sound ---------- */
 var A={ctx:null,last:-1e9,lastPri:0,lastBus:null,noise:null,nodes:0};
 function unlock(){if(!A.ctx){var C=window.AudioContext||window.webkitAudioContext;if(!C)return;try{var c=new C();A.ctx=c;A.master=c.createGain();A.master.gain.value=.9;A.lp=c.createBiquadFilter();A.lp.type='lowpass';A.lp.frequency.value=5000;
  A.comp=c.createDynamicsCompressor();A.comp.threshold.value=-24;A.comp.ratio.value=4;A.lim=c.createDynamicsCompressor();A.lim.threshold.value=-3;A.lim.ratio.value=20;A.lim.attack.value=.002;
  A.master.connect(A.lp);A.lp.connect(A.comp);A.comp.connect(A.lim);A.lim.connect(c.destination);
  var len=c.sampleRate,b=c.createBuffer(1,len,c.sampleRate),d=b.getChannelData(0);for(var i=0;i<len;i++)d[i]=Math.random()*2-1;A.noise=b;}catch(e){A.ctx=null;return;}}
  try{var r=A.ctx.resume();if(r&&r.catch)r.catch(function(){});}catch(e){}}
 var PK=0.15;
 function env(g,t,a,pk,d){pk=Math.min(PK,pk);g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(pk,t+a);g.gain.exponentialRampToValueAtTime(0.0001,t+a+d);}
 function osc(bus,t,f,type,a,d,pk,f2){var c=A.ctx,o=c.createOscillator(),g=c.createGain();A.nodes++;o.type=type;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+a+d);env(g,t,a,pk,d);o.connect(g);g.connect(bus);o.start(t);o.stop(t+a+d+.05);}
 function bell(bus,t,f,d,pk){osc(bus,t,f,'sine',.006,d,pk);osc(bus,t,f*2,'triangle',.004,d*.6,pk*.28);osc(bus,t,f*3.01,'sine',.003,d*.35,pk*.1);}
 function noiseb(bus,t,type,fc,q,a,d,pk,fc2){var c=A.ctx,s=c.createBufferSource();s.buffer=A.noise;var f=c.createBiquadFilter();f.type=type;f.frequency.setValueAtTime(fc,t);if(fc2)f.frequency.exponentialRampToValueAtTime(fc2,t+a+d);f.Q.value=q;var g=c.createGain();A.nodes++;env(g,t,a,pk,d);s.connect(f);f.connect(g);g.connect(bus);s.start(t,Math.random()*.5);s.stop(t+a+d+.05);}
 function wood(bus,t,f,pk){noiseb(bus,t,'bandpass',f*2.2,7,.001,.045,pk);osc(bus,t,f,'sine',.002,.09,pk*.8,f*.92);}
 function plink(bus,t,f,pk){[[1,1,.22],[2.76,.5,.14],[5.4,.25,.08],[8.93,.12,.05]].forEach(function(p){osc(bus,t,f*p[0],'sine',.001,p[2],pk*p[1]);});}
 function rustle(bus,t,d,pk){noiseb(bus,t,'highpass',2600,.7,.04,d,pk);noiseb(bus,t+.03,'bandpass',4200,1.5,.02,d*.7,pk*.6,2600);}
 /* hybrid palette: coin = money leaves / crumbs snap; chimes = good news only; wooden = UI */
 var SND={
  leave:function(b,t){plink(b,t,1760,.08);plink(b,t+.07,2350,.06);rustle(b,t+.02,.16,.03);},
  snap:function(b,t){plink(b,t,2500,.08);plink(b,t+.04,2500,.04);},
  arrive:function(b,t){bell(b,t,392,.6,.07);bell(b,t,523,.6,.06);bell(b,t+.18,784,.5,.05);},
  split:function(b,t){[523,659,784].forEach(function(f,i){bell(b,t+i*.08,f,.4,.07);});},
  milestone:function(b,t){bell(b,t,784,.45,.07);},
  complete:function(b,t){[523,659,784,1046].forEach(function(f,i){bell(b,t+i*.07,f,.7,i===3?.11:.08);});},
  sweep:function(b,t){bell(b,t,659,.3,.06);bell(b,t+.09,880,.35,.06);},
  kept:function(b,t){bell(b,t,784,.6,.08);bell(b,t+.05,1046,.6,.07);},
  splash:function(b,t){bell(b,t,523,.5,.06);bell(b,t+.14,784,.6,.06);},
  press:function(b,t){wood(b,t,900,.05);},tab:function(b,t){wood(b,t,1100,.035);},drop:function(b,t){wood(b,t,420,.07);},
  ask:function(b,t){wood(b,t,300,.06);},zoom:function(b,t){wood(b,t,1000,.04);},
  sheetUp:function(b,t){wood(b,t,640,.04);},sheetDown:function(b,t){wood(b,t,520,.035);}};
 var PRI={complete:5,kept:5,leave:4,arrive:4,split:4,milestone:4,sweep:4,snap:3,ask:3,splash:3,zoom:2,sheetUp:2,sheetDown:2,drop:2,press:1,tab:1};
 function snd(evt){var p=P(),r;
  if(!SND[evt])r='silent-by-design';else if(p.sound===false)r='muted';else if(p.silent)r='phone on silent';
  else{var now=performance.now(),pri=PRI[evt]||1;
   if(now-A.last<300&&pri<=A.lastPri)r='dropped';
   else if(!A.ctx||A.ctx.state!=='running'){r='locked';}
   else{try{var c=A.ctx,t=c.currentTime+.01;if(now-A.last<300&&A.lastBus){A.lastBus.gain.setTargetAtTime(.3,t,.013);r='played (ducked previous)';}else r='played';
     var bus=c.createGain();A.nodes++;bus.gain.value=1;bus.connect(A.master);SND[evt](bus,t);A.lastBus=bus;A.last=now;A.lastPri=pri;}catch(e){r='error';}}}
  M.log.push({evt:evt,r:r,t:Math.round(performance.now())});if(M.log.length>200)M.log.shift();return r;}
 /* ---------- haptics (Android pattern; light, key moments only) ---------- */
 var HAP={pay:[8,60,8,60,14],snap:[4,30,4,30,4,30,18],income:[10],ask:[6],milestone:[8],complete:[20,80,20],monthend:[10],zoom:[8],sheet:[6],press:[8]};
 function hap(k){var p=HAP[k];if(!p||P().haptics===false)return null;if(navigator.vibrate){try{navigator.vibrate(p);}catch(e){}}M.log.push({evt:'hap:'+k,r:'['+p.join(',')+']',t:Math.round(performance.now())});return p;}
 /* ---------- the 12 moments ---------- */
 var MO={};
 MO['splash.trickle']=function(el){var sp=el&&el.closest('.splash');if(!sp)return;snd('splash');
  an(sp.querySelector('.zh')||sp.querySelector('.wm'),[{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{d:500,e:ENTER});
  Array.prototype.forEach.call(el.children,function(d,i){an(d,[{opacity:0,transform:'translateY(-14px)'},{opacity:1,transform:'none'}],{d:520,e:CALM,delay:300+i*120});});
  an(sp.querySelector('p'),[{opacity:0},{opacity:1}],{d:480,delay:900});};
 MO['pay.hourglass']=function(el){if(!el)return;snd('leave');hap('pay');
  an(el.querySelector('.hgi'),[{opacity:0,transform:'scale(.9)'},{opacity:1,transform:'none'}],{d:180,e:CALM});
  var ms=marks(el,4);ms.forEach(function(m,i){
   an(m,[{opacity:0,transform:'translateY(-30px)'},{opacity:1,transform:'translateY(0) scaleY(.8)',offset:.82},{opacity:1,transform:'none'}],{d:620,e:GRAV,delay:180+i*90});
   var s=m.querySelector?m.querySelector('path')||m:m;an(s,[{fillOpacity:1,strokeWidth:0},{fillOpacity:0,strokeWidth:1.6}],{d:260,e:CALM,delay:840+i*60,fill:'forwards'});});};
 MO['crumbs.snap']=function(el){if(!el)return;var cs=Array.prototype.slice.call(el.querySelectorAll('svg.dots .crumb')).slice(0,4);if(!cs.length)return;
  later(function(){snd('snap');hap('snap');},reduced()?0:300);
  cs.forEach(function(c){an(c,[{opacity:.2,transform:'scale(.55) rotate(-60deg)'},{opacity:1,transform:'scale(1.12)',offset:.6},{opacity:1,transform:'none'}],{d:Math.max(420,TD),e:TACT,delay:260});});};
 MO['dots.merge']=function(el){if(!el)return;snd('zoom');hap('zoom');
  marks(el,M.MAXMARKS).forEach(function(m,i){an(m,[{opacity:0,transform:'scale(.4)'},{opacity:1,transform:'none'}],{d:TD,e:TACT,delay:i*14});});
  an(el.querySelector('.zoomcap'),[{opacity:0},{opacity:1}],{d:320,delay:200});};
 MO['savings.drop']=function(el){if(!el)return;var host=el.closest('main,.ob,.sheet')||el.parentNode;var svgs=Array.prototype.slice.call(host.querySelectorAll('svg.dots'));
  var k0=svgs.indexOf(el.querySelector('svg.dots'));if(k0>0){svgs.splice(k0,1);svgs.unshift(el.querySelector('svg.dots'));}
  snd('arrive');hap('income');later(function(){snd('split');},480);var budget=M.MAXMARKS;
  svgs.slice(0,3).forEach(function(s,k){var ms=marks(s,Math.min(14,budget));budget-=ms.length;
   ms.forEach(function(m,i){an(m,[{opacity:0,transform:'translateY(-12px)'},{opacity:1,transform:'none'}],{d:460,e:ENTER,delay:k*480+i*20});});});};
 MO['income.split']=function(){snd('split');hap('income');};
 MO['jar.ask']=function(){snd('ask');hap('ask');};
 MO['jar.respread']=function(){snd('drop');};
 MO['goal.bangle']=function(el){if(!el)return;var fg=el.querySelector('.fg');if(!fg)return;var C=+fg.getAttribute('stroke-dasharray'),off=+fg.getAttribute('stroke-dashoffset'),f=Math.max(0,Math.min(1,1-off/C));
  var stops=[.25,.5,.75].filter(function(m){return m<f-1e-6;}),seg=480,close=f>=0.999?900:480,tot=stops.length*seg+close,kf=[{strokeDashoffset:String(C),offset:0}],t=0;
  stops.forEach(function(m){t+=seg;kf.push({strokeDashoffset:String(C*(1-m)),offset:t/tot,easing:CALM});(function(tt){later(function(){snd('milestone');hap('milestone');},tt);})(t);});
  kf[0].easing=CALM;kf.push({strokeDashoffset:String(off),offset:1});
  an(fg,kf,{d:tot,e:'linear',delay:200});
  if(f>=0.999){later(function(){snd('complete');hap('complete');},200+tot);
   an(el,[{transform:'none'},{transform:'scale(1.04)',offset:.4},{transform:'none'}],{d:1100,e:CALM,delay:200+tot});
   var h=el.closest('main');if(h)an(h.querySelector('h2'),[{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{d:480,e:ENTER,delay:200+tot});}};
 MO['goal.add']=function(el,o){o=o||{};var cross=[.25,.5,.75,1].some(function(m){return o.from<m&&o.to>=m;});if(cross&&o.to<1){snd('milestone');hap('milestone');}else if(!cross)snd('drop');};
 MO['monthend.sweep']=function(){M.swept=true;snd('sweep');hap('monthend');};
 MO['story.frame']=function(el){if(!el)return;an(el,[{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'none'}],{d:420,e:ENTER});
  var i=(S.ctx&&S.ctx.i)||0,n=typeof storyCards==='function'?storyCards().length:5;
  if(M.swept&&i===0){var sv=Array.prototype.slice.call(el.querySelectorAll('svg.dots .m.sv')).slice(0,M.MAXMARKS);if(!sv.length)sv=marks(el,M.MAXMARKS);sv.forEach(function(m,k){an(m,[{opacity:0,transform:'translateX(-18px)'},{opacity:1,transform:'none'}],{d:480,e:CALM,delay:300+k*60});});M.swept=false;}
  if(i===n-1){later(function(){snd('kept');},300);}};
 MO['owed.fill']=function(){snd('drop');};MO['refund.return']=function(){snd('drop');};
 MO['week.fresh']=function(){};MO['pay.undo']=function(){};MO['pay.done']=function(){};
 /* ---------- screen transitions, charts, glow (driven by render) ---------- */
 var CHART=/^(N-0[1-9]|N-1|S-01|S-03|V-01|V-02|I-01)/;
 function charts(main){var svgs=Array.prototype.slice.call(main.querySelectorAll('svg.dots')).slice(0,8);if(!svgs.length)return;var budget=M.MAXMARKS-svgs.length;
  svgs.forEach(function(s,k){var ms=k===0?marks(s,Math.min(20,budget)):[];budget-=ms.length;
   if(ms.length)ms.forEach(function(m,i){an(m,[{opacity:0,transform:'scale(.6)'},{opacity:1,transform:'none'}],{d:480,e:CALM,delay:120+i*18});});
   else an(s,[{opacity:0},{opacity:1}],{d:700,e:CALM,delay:120+k*60});});}
 function glow(main){var w=main.querySelector('svg.glow');if(!w)return;var now=w.querySelector('.gd.now');
  an(now,[{opacity:.25,transform:'translateX(-30px)'},{opacity:1,transform:'none'}],{d:1600,e:'cubic-bezier(.45,0,.55,1)',delay:200});
  Array.prototype.forEach.call(w.querySelectorAll('.gm'),function(g){an(g,[{opacity:0},{opacity:1}],{d:1600,e:'cubic-bezier(.45,0,.55,1)',delay:200});});}
 function stripClone(n){n.setAttribute('aria-hidden','true');n.setAttribute('inert','');n.classList.add('fxclone');
  Array.prototype.forEach.call(n.querySelectorAll('*'),function(e){['id','data-a','data-go','data-tab','data-v','data-ctx','role','tabindex','aria-label','aria-live'].forEach(function(a){e.removeAttribute(a);});e.classList.remove('primary','tog','dz');});n.removeAttribute('data-a');}
 var oldShade=null;
 M.before=function(){var ph=document.getElementById('app');var sh=ph&&ph.querySelector('.shade:not(.fxclone)');oldShade=(M.user&&sh)?sh.cloneNode(true):null;};
 M.after=function(){var id=S.scr,f=FR[id]||{},prev=M.lastScr,pf=FR[prev]||{},user=M.user,key=id+'|'+JSON.stringify(S.ctx||{});M.same=(key===M.lastKey);M.lastKey=key;M.lastScr=id;M.user=false;if(id===prev)return;clearLater();
  var ph=document.getElementById('app');var main=ph.querySelector('.sheet')||ph.querySelector('main,.ob');
  if(f.kind==='sheet'){if(user||pf.kind!=='sheet'){var calmSheet=/^(P-06|R-02)/.test(id);
     if(pf.base!==f.base||pf.kind!=='sheet')an(ph.querySelector('.shade'),[{opacity:0},{opacity:1}],{d:200,e:CALM});
     an(ph.querySelector('.sheet'),[{transform:'translateY(100%)'},{transform:'none'}],{d:calmSheet?320:TD,e:calmSheet?ENTER:TACT});
     snd(/^P-06/.test(id)?'ask':'sheetUp');hap(/^P-06/.test(id)?'ask':'sheet');}
   return;}
  if(pf.kind==='sheet'&&oldShade&&!reduced()){var c=oldShade;oldShade=null;stripClone(c);c.style.pointerEvents='none';ph.appendChild(c);snd('sheetDown');
   var a1=an(c,[{opacity:1},{opacity:0}],{d:240,e:GRAV,fill:'forwards'});an(c.querySelector('.sheet')||c.firstElementChild,[{transform:'none'},{transform:'translateY(100%)'}],{d:240,e:GRAV,fill:'forwards'});
   var rm=function(){if(c.parentNode)c.parentNode.removeChild(c);};if(a1)a1.finished.then(rm,rm);setTimeout(rm,600);}
  if(user&&main&&pf.kind!=='sheet'){if(f.kind==='tab'||f.kind==='intro'||(f.tab&&pf.tab&&f.tab!==pf.tab)){an(main,[{opacity:0,transform:'translateY(4px)'},{opacity:1,transform:'none'}],{d:200,e:CALM,delay:60});if(f.kind==='tab')snd('tab');}
   else if(f.kind==='push'){an(main,[{opacity:0,transform:'translateX(16px)'},{opacity:1,transform:'none'}],{d:TD,e:TACT});}}
  if(main&&CHART.test(id)&&user&&pf.kind!=='sheet')charts(main);
  if(id==='H-01'&&!M.glowDone&&main){M.glowDone=true;glow(main);}};
 /* press: tactile .94 spring back; wooden click; light tick */
 var PRESS='.btn,.payb,.tbb,.li[data-a],.li[data-go],.chip,.ib,.tog,.opt,.pad button,.link';
 document.addEventListener('pointerdown',function(e){unlock();var b=e.target.closest&&e.target.closest(PRESS);if(!b||b.closest('.fxclone'))return;M.user=true;snd('press');hap('press');
  an(b,[{transform:'none'},{transform:'scale(.94)',offset:.25},{transform:'none'}],{d:Math.max(300,TD),e:TACT,fill:'none'});},true);
 document.addEventListener('keydown',function(e){unlock();if(e.key==='Enter'||e.key===' '||e.key==='Escape')M.user=true;},true);
 document.addEventListener('click',function(){M.user=true;},true);
 var BOUND={'splash.trickle':1,'pay.hourglass':1,'savings.drop':1,'goal.bangle':1,'story.frame':1};
 M.fx=function(name,el,o){if(BOUND[name]&&el&&M.same)return;if(MO[name])try{MO[name](el,o);}catch(e){console.warn('fx '+name,e);}};
 M.snd=snd;M.hap=hap;M.A=A;M.SPT=SPT;M.unlock=unlock;
 M.running=function(){return document.getAnimations().filter(function(a){return a.playState==='running';}).length;};
 return M;})();
var FXLOG=[];
function reduced(){var m=(window.L&&L.prefs&&L.prefs.motion)||'system';if(window.L&&L.prefs&&L.prefs.reduced&&!L.prefs.motion)m='reduce';if(m==='reduce')return true;if(m==='full')return false;return !!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);}
function fx(name,el,o){FXLOG.push(name);MS.fx(name,el,o);}
