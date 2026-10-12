// Captures every state in frames27.js: a screenshot (to /tmp) and a compact tree (captured27.json).
// Run from this folder after `python3 ../build.py`:  node cap27.js [id,id,...]
const {chromium}=require('/opt/node-tools/node_modules/playwright');const fs=require('fs'),path=require('path');const pack=require('./pack.js');
const FR=require('./frames27.js');const SHOTS=process.env.SHOTS||'/tmp/claude-0/v27/fig';fs.mkdirSync(SHOTS,{recursive:true});
(async()=>{const only=process.argv[2]?process.argv[2].split(','):null;const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:1280,height:1000},ignoreHTTPSErrors:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+path.resolve(__dirname,'../mockup27.html'));await p.waitForTimeout(1500);await p.addScriptTag({path:path.resolve(__dirname,'extract.js')});
 const out=[],bad=[];
 for(const f of FR){if(only&&!only.includes(f.id))continue;
  try{await p.evaluate(f.setup)}catch(e){bad.push(f.id+': '+String(e.message).split('\n')[0]);continue}
  await p.waitForTimeout(420);
  if(f.over){const r=await p.evaluate(()=>__extract(['#layer','#coach21','#toast23']));out.push({id:f.id,sec:f.sec,name:f.name,D:Object.assign(pack(r),{over:1,base:f.base||'Home \u00b7 Tarun, a bit fast'})});await (await p.$('#frame')).screenshot({path:path.join(SHOTS,f.id+'.png')});continue}
  if(f.sel){const ok=await p.evaluate(sel=>!!document.querySelector(sel),f.sel);if(!ok){bad.push(f.id+': selector not found '+f.sel);continue}
   const r=await p.evaluate(sel=>{const o=__extract(sel);return o},f.sel);r.el=1;out.push({id:f.id,sec:f.sec,name:f.name,D:Object.assign(pack(r),{el:1})});
   await (await p.$(f.sel)).screenshot({path:path.join(SHOTS,f.id+'.png')});continue}
  const r=await p.evaluate(()=>{const ph=document.querySelector('#phone'),v=document.querySelector('#view'),fr=document.querySelector('#frame');const lay=document.querySelector('#layer').children.length>0;const mb=document.querySelector('#layer .mbody');
   const tall=lay?Math.max(844,mb?mb.scrollHeight+4:844):Math.max(844,v.scrollHeight);ph.style.height=tall+'px';fr.style.height=tall+'px';v.style.overflow='visible';window.__maxY=lay?850:0;
   const o=__extract();window.__maxY=0;ph.style.height='';fr.style.height='';v.style.overflow='';return o});
  out.push({id:f.id,sec:f.sec,name:f.name,D:pack(r)});
  await (await p.$('#frame')).screenshot({path:path.join(SHOTS,f.id+'.png')});}
 const fp=path.join(__dirname,'captured27.json');let all=fs.existsSync(fp)?JSON.parse(fs.readFileSync(fp)):[];for(const o of out){const i=all.findIndex(x=>x.id===o.id);if(i>=0)all[i]=o;else all.push(o)}const order=FR.map(f=>f.id);all=all.filter(x=>order.includes(x.id)).sort((a,b)=>order.indexOf(a.id)-order.indexOf(b.id));fs.writeFileSync(fp,JSON.stringify(all));
 console.log(out.length,'frames captured; failed:',bad,'page errors:',errs.slice(0,5));
 console.log(out.map(o=>o.id+':'+JSON.stringify(o.D).length+'b').join(' '));await b.close()})()
