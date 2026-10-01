const {chromium}=require('playwright');const fs=require('fs');
const STUB=`(function(){function P(v){return{value:v,setValueAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){},setTargetAtTime(){}}}
function N(){return{connect(){},disconnect(){},start(){},stop(){},gain:P(1),frequency:P(440),Q:P(1),threshold:P(0),ratio:P(1),attack:P(0),type:'',buffer:null}}
window.__snd=0;class AC{constructor(){this.state='running';this.currentTime=0;this.sampleRate=8000;this.destination=N()}resume(){return Promise.resolve()}
createGain(){window.__snd++;return N()}createOscillator(){return N()}createBiquadFilter(){return N()}createDynamicsCompressor(){return N()}createBufferSource(){return N()}
createBuffer(c,l){return{getChannelData(){return new Float32Array(l)}}}}window.AudioContext=AC;})();`;
(async()=>{const b=await chromium.launch({executablePath:fs.existsSync('/opt/pw-browsers')?undefined:undefined});
for(const [w,sch] of [[1200,'dark'],[400,'light']]){const p=await b.newPage({viewport:{width:w,height:1000},colorScheme:sch});const errs=[];
p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/fonts|ERR_/.test(m.text()))errs.push(m.text())});
await p.route(/fonts\./,r=>r.abort());await p.addInitScript(STUB);await p.goto('file://'+__dirname+'/t.html');await p.waitForTimeout(400);
await p.mouse.click(5,5);
const ord=await p.evaluate(()=>__lab.ORDER);
for(const k of ord){await p.evaluate(k=>__lab.setMoment(k,true),k);await p.waitForTimeout(700);
 if(w===1200||['pay','goal','income'].includes(k)){const pn=await p.$('#panes');await pn.screenshot({path:`s_${w}_${k}_mid.png`});}
 await p.waitForTimeout(4200);if(w===1200){const pn=await p.$('#panes');await pn.screenshot({path:`s_${w}_${k}_end.png`});}}
const logs=await p.evaluate(()=>[...document.querySelectorAll('.log')].map(e=>e.textContent));
const ov=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
const sc=await p.evaluate(()=>window.__snd);
// reduced
await p.check('#red');await p.evaluate(()=>__lab.setMoment('pay',true));await p.waitForTimeout(300);
const run=await p.evaluate(()=>document.querySelector('#panes').getAnimations({subtree:true}).filter(a=>a.playState==='running').length);
await p.screenshot({path:`s_${w}_page.png`,fullPage:false});
console.log(w,'errs',errs,'overflow',ov,'gains',sc,'runningAfterReduced',run,'logs',logs);await p.close();}
await b.close();})();
