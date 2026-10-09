#!/usr/bin/env node
/* Audit a rendered page for the common "AI-generated interface" tells.
   Usage:  node audit.js <url-or-file> [--states states.js] [--shots dir] [--root '#phone']
   states.js exports: async (page, snap) => { await ...navigate...; await snap('home'); ... }
   Without --states it audits the page as loaded.
   Needs playwright (set PLAYWRIGHT_MODULE=/path/to/node_modules/playwright if not resolvable). */
const path=require('path');
const pw=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const args=process.argv.slice(2);const arg=n=>{const i=args.indexOf(n);return i>=0?args[i+1]:null};
const target=args.find(a=>!a.startsWith('--')&&args[args.indexOf(a)-1]!=='--states'&&args[args.indexOf(a)-1]!=='--shots'&&args[args.indexOf(a)-1]!=='--root');
const statesFile=arg('--states'),shots=arg('--shots'),ROOT=arg('--root')||'body';

/* runs in the page: returns [{rule,detail}] for what is visible now */
function inPage(rootSel){
  const BAD_FONTS=['inter','geist','space grotesk'];const out=[],seen=new Set(),hues=new Set();
  const add=(rule,detail)=>{const k=rule+'|'+detail;if(!seen.has(k)){seen.add(k);out.push({rule,detail})}};
  const hsl=c=>{const m=c.match(/rgba?\(([\d.]+)[, ]+([\d.]+)[, ]+([\d.]+)(?:[, /]+([\d.]+))?/);if(!m)return null;const a=m[4]===undefined?1:+m[4];if(a<.3)return null;let [r,g,b]=[+m[1]/255,+m[2]/255,+m[3]/255];const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,d=mx-mn;let h=0,s=0;if(d){s=d/(1-Math.abs(2*l-1));h=mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4;h=(h*60+360)%360}return {h,s,l}};
  const name=e=>(e.tagName.toLowerCase()+(e.className&&typeof e.className==='string'?'.'+e.className.trim().split(/\s+/)[0]:''));
  const emoji=/[\p{Extended_Pictographic}✓✔✨★]/u;
  const root=document.querySelector(rootSel)||document.body;for(const e of root.querySelectorAll('*')){
    const r=e.getBoundingClientRect();if(r.width<2||r.height<2)continue;
    const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity===0)continue;
    if(/gradient/.test(cs.backgroundImage))add('1 gradient',name(e));
    if(cs.boxShadow!=='none'){const ins=/inset/.test(cs.boxShadow);add(ins?'5 shadow (inset ring)':'5 drop shadow',name(e))}
    if(cs.textShadow!=='none')add('5 drop shadow',name(e)+' text');
    if((cs.backdropFilter&&cs.backdropFilter!=='none')||/blur/.test(cs.filter))add('8 glass or blur',name(e));
    const br=parseFloat(cs.borderTopLeftRadius)||0;const circle=Math.abs(r.width-r.height)<3&&br>=Math.min(r.width,r.height)/2-1;
    if(br>14&&!circle&&!e.closest('#phone,.phone,.frame')&&r.width<900)add('19 soft corner radius',name(e)+' '+br+'px');
    if(parseFloat(cs.borderLeftWidth)>=3&&parseFloat(cs.borderTopWidth)<1&&parseFloat(cs.borderLeftWidth)>parseFloat(cs.borderRightWidth))add('11 coloured left stripe',name(e));
    if(cs.animationName&&cs.animationName!=='none')add('25/28 animation',name(e)+' '+cs.animationName);
    const ff=cs.fontFamily.split(',')[0].replace(/["']/g,'').trim().toLowerCase();if(BAD_FONTS.includes(ff))add('10 default AI font',ff);
    for(const prop of ['color','backgroundColor','borderTopColor']){const c=hsl(cs[prop]);if(!c||c.s<.25||c.l<.12||c.l>.9)continue;
      if(c.h>=255&&c.h<=300)add('20 purple',name(e)+' '+prop);
      if(c.s>.72&&c.l>.5&&c.l<.7)add('29 neon colour',name(e)+' '+prop+' '+cs[prop]);
      if(prop!=='borderTopColor'&&r.width*r.height>40)hues.add(Math.round(c.h/30)%12)}
    if(e.children.length===0&&e.textContent){const t=e.textContent;if(t.includes('—'))add('9 em dash',JSON.stringify(t.slice(0,40)));if(emoji.test(t))add('7/16/24 emoji, check or sparkle',JSON.stringify(t.slice(0,30)));
      if(/\b(it'?s not|this isn'?t|not just)\b[^.]{0,40}\b(it'?s|but)\b/i.test(t))add("15 \"it's not X, it's Y\"",JSON.stringify(t.slice(0,60)))}
  }
  if(hues.size>=5)add('4/30 rainbow colouring',hues.size+' hue families on one screen');
  for(const ss of document.styleSheets){let rules;try{rules=ss.cssRules}catch(e){continue}for(const r of rules){if(r.selectorText&&/:hover/.test(r.selectorText)&&/(transform|animation|transition)/.test(r.cssText))add('28 hover animation',r.selectorText)}}
  return out}
(async()=>{
  const browser=await pw.chromium.launch();const page=await (await browser.newContext({viewport:{width:1280,height:1000}})).newPage();
  const url=/^https?:|^file:/.test(target)?target:'file://'+path.resolve(target);await page.goto(url);await page.waitForTimeout(800);
  const all={};let n=0;
  const snap=async label=>{await page.waitForTimeout(150);if(shots)await page.screenshot({path:path.join(shots,(label||'s'+n)+'.png')});for(const v of await page.evaluate(inPage,ROOT)){const k=v.rule+' | '+v.detail;(all[k]=all[k]||new Set()).add(label||'s'+n)}n++};
  if(statesFile)await require(path.resolve(statesFile))(page,snap);else await snap('page');
  const keys=Object.keys(all).sort();
  if(!keys.length)console.log('No tells found in '+n+' states.');
  else{console.log(keys.length+' findings in '+n+' states:');for(const k of keys)console.log(' '+k+'   ['+[...all[k]].slice(0,4).join(', ')+([...all[k]].length>4?', ...':'')+']')}
  await browser.close();process.exit(keys.length?1:0)})();
