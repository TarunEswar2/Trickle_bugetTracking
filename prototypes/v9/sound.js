/* ===== Trickle v9 — sound (WebAudio, soft, ≤0.15 per voice) + motion helpers ===== */
var SND={on:true,ctx:null,ready:false,last:{},tileN:0,log:[]};
try{SND.on=localStorage.getItem('trickle9snd')!=='0';}catch(e){}
var PEAK_MAX=0.15;
function sndUnlock(){if(!SND.ctx){var AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;try{SND.ctx=new AC();var c=SND.ctx;SND.lp=c.createBiquadFilter();SND.lp.type='lowpass';SND.lp.frequency.value=2400;SND.master=c.createGain();SND.master.gain.value=1;SND.comp=c.createDynamicsCompressor();SND.lp.connect(SND.master);SND.master.connect(SND.comp);SND.comp.connect(c.destination);}catch(e){SND.ctx=null;return;}}
 try{var r=SND.ctx.resume();if(r&&r.then)r.then(function(){SND.ready=true;}).catch(function(){});else SND.ready=true;}catch(e){}SND.ready=SND.ctx.state==='running'||SND.ready;}
document.addEventListener('pointerdown',sndUnlock,true);document.addEventListener('keydown',sndUnlock,true);
function env(g,t0,a,peak,d){peak=Math.min(PEAK_MAX,peak);g.gain.setValueAtTime(0.0001,t0);g.gain.linearRampToValueAtTime(peak,t0+a);g.gain.exponentialRampToValueAtTime(0.0001,t0+a+d);return peak;}
function voice(f,type,t0,a,d,peak,sparkle){var c=SND.ctx,o=c.createOscillator(),g=c.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,t0);var p=env(g,t0,a,peak,d);o.connect(g);g.connect(SND.lp);o.start(t0);o.stop(t0+a+d+.05);SND.log.push(p);
 if(sparkle){var o2=c.createOscillator(),g2=c.createGain();o2.type='triangle';o2.frequency.setValueAtTime(f*2,t0);SND.log.push(env(g2,t0,a,peak*.3,d));o2.connect(g2);g2.connect(SND.lp);o2.start(t0);o2.stop(t0+a+d+.05);}}
var PENTA=[523,587,659,784,880,1047];
var RECIPES={
 tap:function(t){voice(880,'sine',t,.005,.06,.05);},
 toggle:function(t){voice(1200,'sine',t,.003,.04,.03);},
 tile:function(t){voice(PENTA[SND.tileN++%PENTA.length],'triangle',t,.003,.09,.018);},
 pour:function(t){[660,784,988].forEach(function(f,i){voice(f,'sine',t+i*.04,.004,.08,.05);});},
 pay:function(t){voice(784,'sine',t,.01,.18,.08);voice(523,'sine',t+.09,.01,.18,.08);},
 save:function(t){[523,659,784,1047].forEach(function(f,i){voice(f,'sine',t+i*.07,.008,.6,i===3?.12:.09,true);});},
 income:function(t){voice(262,'sine',t,.02,.5,.1);voice(392,'sine',t,.02,.5,.08);voice(659,'sine',t+.22,.01,.4,.06,true);},
 goal:function(t){RECIPES.save(t);[1047,1319,1568,2093].forEach(function(f,i){voice(f,'sine',t+.35+i*.07,.008,.6,.1,true);});},
 soft:function(t){voice(330,'sine',t,.01,.25,.05);},
 flow:function(t){var c=SND.ctx,len=c.sampleRate*.7,b=c.createBuffer(1,len,c.sampleRate),d=b.getChannelData(0);for(var i=0;i<len;i++)d[i]=Math.random()*2-1;var s=c.createBufferSource();s.buffer=b;var bp=c.createBiquadFilter();bp.type='bandpass';bp.Q.value=1.2;bp.frequency.setValueAtTime(600,t);bp.frequency.exponentialRampToValueAtTime(2400,t+.7);var g=c.createGain();SND.log.push(env(g,t,.2,.03,.5));s.connect(bp);bp.connect(g);g.connect(SND.lp);s.start(t);s.stop(t+.75);}};
var THROTTLE={tile:45,save:1500,goal:1500,tap:40,toggle:40,pour:200,flow:600,income:800,pay:400,soft:300};
function play(name,delay){if(!SND.on||!SND.ctx||SND.ctx.state!=='running'||!RECIPES[name])return false;if(name==='flow'&&isReduced())return false;var now=performance.now()+(delay||0);if(SND.last[name]&&now-SND.last[name]<(THROTTLE[name]||0))return false;SND.last[name]=now;
 try{RECIPES[name](SND.ctx.currentTime+(delay||0)/1000+.01);}catch(e){}SND.played=(SND.played||[]);SND.played.push(name);return true;}
function isReduced(){return S.reduced||(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);}
/* tile tick train for popping tiles (very quiet, throttled) */
function tileTicks(n){n=Math.min(n,8);SND.tileN=0;for(var i=0;i<n;i++)(function(i){setTimeout(function(){play('tile');},60+i*70);})(i);}
/* count-up for [data-count] */
function countUps(root){(root||document).querySelectorAll('[data-count]').forEach(function(el){var v=+el.getAttribute('data-count'),pre=el.getAttribute('data-pre')||'';if(isReduced()){el.textContent=pre+fmt(v);return;}var t0=performance.now();el.classList.add('counting');
 (function f(){var k=Math.min(1,(performance.now()-t0)/700),e=1-Math.pow(1-k,3);el.textContent=pre+fmt(Math.round(v*e/10)*10*(k<1?1:0)+(k<1?0:v));if(k<1)requestAnimationFrame(f);else el.classList.remove('counting');})();});}
A.snd=function(x){SND.on=x==='1';try{localStorage.setItem('trickle9snd',SND.on?'1':'0');}catch(e){}if(SND.on){sndUnlock();setTimeout(function(){play('toggle');},30);}render();};
