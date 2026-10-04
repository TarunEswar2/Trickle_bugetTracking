const fs=require('fs');const cap=JSON.parse(fs.readFileSync('captured2.json'));const b=fs.readFileSync('builder.js','utf8');
const clone=`async function addClone(secName,name,D,baseId){const sec=figma.currentPage.children.find(c=>c.type==='SECTION'&&c.name===secName);const base=await figma.getNodeByIdAsync(baseId);const fr=base.clone();sec.appendChild(fr);fr.name=name;const m=fr.children.find(c=>c.name==='modal');if(m)m.remove();const ids={err:[]};for(const c of D.n)await build(c,fr,D,ids);
 const kids=sec.children.filter(c=>c.type==='FRAME');let x=80;for(const c of kids){c.x=x;c.y=100;x+=c.width+80}let mh=0;for(const c of kids)mh=Math.max(mh,c.height);sec.resizeWithoutConstraints(x,mh+200);return {id:fr.id,errs:ids.err}}\n`;
function trim(c){const D=JSON.parse(JSON.stringify(c.D));const i=D.n.length-1;const m=D.n[i];if(D.N[m[13]]!=='modal')throw new Error('no modal '+c.id);D.n=[m];return D}
const mk=(ids,out,opts)=>{opts=opts||{};const sel=ids.map(i=>cap.find(c=>c.id===i));
 let body;
 if(opts.clones){const base=sel[0];const rest=sel.slice(1);
  body=`const FRS=${JSON.stringify([[base.sec,base.name,base.D]])};const RS=${JSON.stringify(rest.map(c=>[c.sec,c.name,trim(c)]))};\nconst res=[];for(const f of FRS)res.push(await addFrame(f[0],f[1],f[2]));for(const f of RS)res.push(await addClone(f[0],f[1],f[2],res[0].id));return res.map(r=>r.id+(r.errs.length?'!'+r.errs.join(';'):'')).join(' ');`}
 else body=`const FRS=${JSON.stringify(sel.map(c=>[c.sec,c.name,c.D]))};\nconst res=[];for(const f of FRS)res.push(await addFrame(f[0],f[1],f[2]));return res.map(r=>r.id+(r.errs.length?'!'+r.errs.join(';'):'')).join(' ');`;
 fs.writeFileSync(out,b+clone+body);console.log(out,fs.statSync(out).size)};
mk(['k01','k02','k03','k04','k05','k06','k07','k08','k09','k10','k11'],'callK.js',{clones:true});
mk(['o23','o24'],'callO2.js');
mk(['r01','r02','r03','r04','r05','r06','r07','r08','r09','r10'],'callR.js');
