const fs=require('fs');const cap=JSON.parse(fs.readFileSync('captured3.json'));const b=fs.readFileSync('builder.js','utf8');
const clone=`async function addClone(secName,name,D,baseId){const sec=figma.currentPage.children.find(c=>c.type==='SECTION'&&c.name===secName);const base=await figma.getNodeByIdAsync(baseId);const fr=base.clone();sec.appendChild(fr);fr.name=name;const m=fr.children.find(c=>c.name==='modal');if(m)m.remove();const ids={err:[]};for(const c of D.n)await build(c,fr,D,ids);
 const kids=sec.children.filter(c=>c.type==='FRAME');let x=80;for(const c of kids){c.x=x;c.y=100;x+=c.width+80}let mh=0;for(const c of kids)mh=Math.max(mh,c.height);sec.resizeWithoutConstraints(x,mh+200);return {id:fr.id,errs:ids.err}}\n`;
const trim=c=>{const D=JSON.parse(JSON.stringify(c.D));const m=D.n[D.n.length-1];if(D.N[m[13]]!=='modal')throw new Error('no modal '+c.id);D.n=[m];return D};
const secs=[...new Set(cap.map(c=>c.sec))];const plan=[];let y=0;
secs.forEach(s=>{const fr=cap.filter(c=>c.sec===s);const mh=Math.max(...fr.map(c=>c.D.h));plan.push({sec:s,y});y+=mh+200+200});
// batches
const batches=[];let n=0;
secs.forEach(sec=>{const fr=cap.filter(c=>c.sec===sec);
 if(sec==='13 Pop-ups'){const base=fr[0],rest=fr.slice(1);const body=`const FRS=${JSON.stringify([[base.sec,base.name,base.D]])};const RS=${JSON.stringify(rest.map(c=>[c.sec,c.name,trim(c)]))};\nconst res=[];for(const f of FRS)res.push(await addFrame(f[0],f[1],f[2]));for(const f of RS)res.push(await addClone(f[0],f[1],f[2],res[0].id));return res.map(r=>r.id+(r.errs.length?'!'+r.errs.join(';'):'')).join(' ');`;const f=`call3_${++n}.js`;fs.writeFileSync(f,b+clone+body);batches.push({file:f,sec,frames:fr.length,size:fs.statSync(f).size});return}
 let cur=[],size=0;const flush=()=>{if(!cur.length)return;const body=`const FRS=${JSON.stringify(cur.map(c=>[c.sec,c.name,c.D]))};\nconst res=[];for(const f of FRS)res.push(await addFrame(f[0],f[1],f[2]));return res.map(r=>r.id+(r.errs.length?'!'+r.errs.join(';'):'')).join(' ');`;const f=`call3_${++n}.js`;fs.writeFileSync(f,b+body);batches.push({file:f,sec,frames:cur.length,size:fs.statSync(f).size});cur=[];size=0};
 fr.forEach(c=>{const sz=JSON.stringify([c.sec,c.name,c.D]).length;if(size+sz>36000&&cur.length)flush();cur.push(c);size+=sz});flush()});
fs.writeFileSync('plan3.json',JSON.stringify({plan,batches}));
console.log(plan.map(p=>p.sec+'@'+p.y).join(' | '));console.log(batches.map(x=>x.file+' '+x.sec+' '+x.frames+'f '+x.size).join('\n'));
