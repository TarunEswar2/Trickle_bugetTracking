// node mk27d.js id,id,...  -> call27_N.js : plain JSON (reliable to copy) + loader, overlay frames clone a Home base
const fs=require('fs');const cap=JSON.parse(fs.readFileSync('captured27.json'));const ids=process.argv[2].split(',');const LIM=+(process.env.LIM||6000);
const cks=txt=>{let cs=0;for(let i=0;i<txt.length;i++)cs=(cs+txt.charCodeAt(i))%1000003;return cs};
const frames=ids.map(i=>cap.find(c=>c.id===i)).filter(Boolean).map(c=>[c.sec,c.name,c.D]);const batches=[];let cur=[];
for(const f of frames){if(cur.length&&JSON.stringify([...cur,f]).length>LIM){batches.push(cur);cur=[]}cur.push(f)}if(cur.length)batches.push(cur);
const AF="const AF=Object.getPrototypeOf(async function(){}).constructor;";
const OV="async function ov(sn,nm,D){let sec=page.children.find(c=>c.type==='SECTION'&&c.name===sn);if(!sec){sec=figma.createSection();sec.name=sn;page.appendChild(sec);sec.resizeWithoutConstraints(200,200)}const base=page.findAll(n=>n.type==='FRAME'&&n.name===D.base&&n.parent&&n.parent.type==='SECTION')[0];const fr=base.clone();sec.appendChild(fr);fr.name=nm;const ids={err:[]};for(const c of D.n)await H.build(c,fr,D,ids);return {id:fr.id,errs:ids.err}}";
batches.forEach((b,i)=>{const txt=JSON.stringify(b);const code=`const page=figma.root.children.find(p=>p.name==='v27 · all screens');await figma.setCurrentPageAsync(page);${AF}const hn=page.findOne(n=>n.type==='TEXT'&&n.name==='HELPER_SRC');const H=await (new AF(hn.characters.replace('return {addFrame,','return {build,addFrame,')))();${OV}
const FR=${txt};let cs=0;const tx=JSON.stringify(FR);for(let i=0;i<tx.length;i++)cs=(cs+tx.charCodeAt(i))%1000003;if(cs!==${cks(txt)})throw new Error('checksum mismatch (got '+cs+', want ${cks(txt)})');
const made=[],errs=[];for(const f of FR){const r=f[2].over?await ov(f[0],f[1],f[2]):await H.addFrame(f[0],f[1],f[2],page);made.push(r.id);if(r.errs.length)errs.push(f[1]+': '+r.errs.join(';'))}H.layoutAll(page);return {count:made.length,errs};`;
 fs.writeFileSync(`call27_${i+1}.js`,code);console.log(`call27_${i+1}.js`,b.length,'frames',code.length,'chars:',b.map(f=>f[1].slice(0,10)).join('|').slice(0,90))});
