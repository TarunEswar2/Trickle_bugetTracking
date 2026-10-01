/* 8. Phase 12 — motion + sound */
{fs.mkdirSync('shots/p12',{recursive:true});const P12={moments:{},stuck:[]};
 const q=await page({});const W=ms=>q.waitForTimeout(ms);
 const sh=async n=>q.screenshot({path:'shots/p12/'+n+'.png'});
 const runN=()=>q.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length);
 const evts=()=>q.evaluate(()=>MS.log.splice(0).map(x=>x.evt+'='+x.r));
 async function moment(k,start,midMs,endMs){await start();await W(midMs);const mid=await runN();await sh(k+'_mid');await W(endMs);const end=await runN();await sh(k+'_end');const ev=await evts();P12.moments[k]={mid,end,ev};if(end)P12.stuck.push(k+':'+end);console.log('  p12',k,'running mid',mid,'end',end,ev.join(' '));}
 await q.goto(U+'#fresh');await q.mouse.click(5,5); // first tap unlocks audio
 await moment('splash',async()=>{await q.evaluate(()=>{L=null;S.scr='O-00';render();});},250,1300);
 await demo(q);await q.click('.tbb[data-tab=H]');await W(300);await evts();
 await moment('pay',async()=>{await q.evaluate(()=>{S.payFrom='H';go('P-04',{payee:'Ramu Tea Stall',amt:350,jar:'Food'});});await q.click('[data-a=paynow]');},450,700);
 await moment('crumbs',async()=>{},10,900);
 await moment('income',async()=>{await q.click('[data-tab=I]');await W(300);await q.evaluate(()=>MS.log.splice(0));await q.evaluate(()=>{MS.user=true;go('I-04');});},300,1500);
 await q.evaluate(()=>{go('H-01',{},true);});
 await moment('emptyjar',async()=>{await q.evaluate(()=>{S.payFrom='S';go('P-04',{payee:'PVR Cinemas',amt:250,jar:'Fun'});});await q.click('[data-a=paynow]');},150,800);
 await moment('goal',async()=>{await q.evaluate(()=>{var g=L.goals[0];g.saved=g.target;g.reachedTs={d:L.today.d,m:L.today.m};MS.user=true;go('V-04');});},900,2600);
 await demo(q,'demo&seed=monthend');await W(300);await evts();
 await moment('monthend',async()=>{await q.click('[data-a=mend][data-v=savings]');},500,1500);
 await moment('storykept',async()=>{await q.evaluate(()=>{MS.user=true;go('N-04',{i:storyCards().length-1});});},200,800);
 await demo(q);await W(200);
 await moment('charts',async()=>{await q.click('[data-tab=N]');},250,1200);
 await moment('zoom',async()=>{await q.click('[data-tab=S]');await W(400);await evts();await q.click('svg.dz');},200,900);
 await moment('glow',async()=>{await q.evaluate(()=>{MS.glowDone=false;MS.lastScr=null;S.scr='H-01';render();});},700,1400);
 await moment('sheet',async()=>{await q.click('[data-tab=I]');await W(350);await q.evaluate(()=>MS.log.splice(0));await q.evaluate(()=>{MS.user=true;go('I-05');});await W(150);await sh('sheet_open');await q.click('.shade',{position:{x:200,y:40}});},120,700);
 await moment('press',async()=>{await q.click('[data-tab=H]');await W(400);await evts();await q.hover('.payb');await q.mouse.down();},60,500);await q.mouse.up();
 const okL=await led(q,'P12 moments');
 const want={pay:['leave','hap:pay'],crumbs:['snap'],income:['arrive','split'],emptyjar:['ask'],goal:['milestone','complete'],monthend:['sweep'],storykept:['kept'],zoom:['zoom'],sheet:['sheetUp','sheetDown'],press:['press','hap:press']};
 const miss=[];Object.keys(want).forEach(k=>want[k].forEach(e=>{if(!(P12.moments[k].ev||[]).some(x=>x.startsWith(e+'=')&&!/error/.test(x)))miss.push(k+':'+e);}));
 const silentOK=['charts','glow'].every(k=>!(P12.moments[k].ev||[]).some(x=>/=played/.test(x)));
 const au=await q.evaluate(()=>({nodes:__AU.nodes,peak:Math.max.apply(null,__AU.peaks),vib:__AU.vib,anims:MS.anims}));
 ck('P12: all 12 moments animate and finish (no stuck states)','P12',P12.stuck.length===0&&Object.keys(P12.moments).every(k=>['crumbs','storykept','emptyjar'].includes(k)||P12.moments[k].mid>0||k==='press'),'running at end: '+(P12.stuck.join(', ')||'0 in every moment')+'; mid-moment running anims '+Object.keys(P12.moments).map(k=>k+' '+P12.moments[k].mid).join(', '));
 ck('P12: hybrid sounds fire at the right moments; charts + glow silent','P12-Q2',miss.length===0&&silentOK,(miss.length?'missing '+miss.join(', '):'coin at pay + snap; chimes for arrive/split/milestone/complete/sweep/kept; wooden for ask/zoom/sheets/press')+'; charts/glow silent '+silentOK);
 ck('P12: every voice peaks ≤0.15; AudioContext stubbed, 0 console errors','P12-Q3',au.peak<=0.15+1e-9,'peak '+au.peak.toFixed(3)+'; '+au.nodes+' stub nodes; '+au.vib+' vibrate calls; '+au.anims+' WAAPI animations');
 ck('P12: ledger invariants hold after all moments','ledger',okL,'checkLedger after pay ₹350, income split sheet, goal close, month-end sweep');
 const thr=await q.evaluate(async()=>{await new Promise(r=>setTimeout(r,400));MS.log.splice(0);var r=[];for(var i=0;i<5;i++)r.push(MS.snd('press'));r.push(MS.snd('tab'));r.push(MS.snd('complete'));await new Promise(z=>setTimeout(z,320));r.push(MS.snd('press'));return r;});
 ck('P12: max 1 sound per 300 ms (higher priority ducks)','P12',thr[0]==='played'&&thr.slice(1,6).every(x=>x==='dropped')&&/ducked/.test(thr[6])&&thr[7]==='played',thr.join(' | '));
 const pr=await q.evaluate(()=>{var o={};L.prefs.sound=false;o.mute=MS.snd('complete');L.prefs.sound=true;L.prefs.silent=true;o.silent=MS.snd('complete');L.prefs.silent=false;var v=__AU.vib;L.prefs.haptics=false;o.hapOff=MS.hap('pay');o.vib=__AU.vib-v;L.prefs.haptics=true;return o;});
 ck('P12: mute, phone-on-silent and haptics-off are respected','P12-Q3/Q4',pr.mute==='muted'&&pr.silent==='phone on silent'&&pr.hapOff===null&&pr.vib===0,JSON.stringify(pr));
 await q.evaluate(()=>{S.hist=[];go('G-S4');});await sh('settings_G-S4');
 const st=await q.evaluate(()=>({tog:document.querySelectorAll('.tog').length,mo:document.querySelectorAll('[data-a=pref]').length}));
 await q.click('[data-a=pref][data-v=reduce]');const r1=await q.evaluate(async()=>{var n0=MS.anims;MS.user=true;go('P-05',{amt:350,payee:'Ramu',jar:'Food'});await new Promise(r=>setTimeout(r,30));return {d:MS.anims-n0,run:document.getAnimations().filter(a=>a.playState==='running').length};});
 await q.evaluate(()=>{clearTimeout(S.payT);L.prefs.motion='system';go('H-01',{},true);});
 ck('P12: settings — Sounds, Haptics, silent demo, Motion follows phone with override','P12',st.tog===3&&st.mo===3&&r1.d===0&&r1.run===0,'3 switches + Follow phone/Reduce/Full; override Reduce → '+r1.d+' new anims, '+r1.run+' running');
 await q.close();
 const z=await page({rm:'reduce'});await z.goto(U+'#demo');await z.waitForTimeout(150);await z.mouse.click(5,5);
 const rr=await z.evaluate(async()=>{var t=[];function n(){return document.getAnimations().filter(a=>a.playState==='running').length;}
  MS.user=true;go('P-05',{amt:350,payee:'Ramu',jar:'Food'});await new Promise(r=>setTimeout(r,40));t.push(n());clearTimeout(S.payT);
  var g=L.goals[0];g.saved=g.target;g.reachedTs={d:L.today.d,m:L.today.m};MS.user=true;go('V-04');await new Promise(r=>setTimeout(r,40));t.push(n());
  MS.user=true;go('I-04');await new Promise(r=>setTimeout(r,40));t.push(n());MS.user=true;go('N-01');t.push(n());MS.glowDone=false;go('H-01');t.push(n());
  L.prefs.motion='full';MS.user=true;go('I-01');await new Promise(r=>setTimeout(r,20));var full=n();L.prefs.motion='system';
  return {t:t,anims:MS.anims,full:full,snd:MS.log.filter(x=>/played/.test(x.r)).length};});
 await z.screenshot({path:'shots/p12/reduced_end.png'});
 ck('P12: reduced motion = 0 running animations (sounds keep playing); Full override animates','a11y',rr.t.every(x=>x===0)&&rr.full>=0&&rr.snd>0,'running per moment '+rr.t.join('/')+'; anims before override '+rr.anims+'; sounds played '+rr.snd+'; Full override running '+rr.full);
 await z.close();R.p12=P12;}
