// node mk27c.js id,id,...  -> call27_N.js (small loader + compressed frame data; overlay frames clone a Home base in Figma)
const fs=require('fs'),zlib=require('zlib');const cap=JSON.parse(fs.readFileSync('captured27.json'));
const ids=process.argv[2].split(',');const LIM=+(process.env.LIM||3200);
const enc=arr=>{const txt=JSON.stringify(arr);const z=zlib.deflateRawSync(Buffer.from(txt),{level:9}).toString('base64');let cs=0;for(let i=0;i<txt.length;i++)cs=(cs+txt.charCodeAt(i))%1000003;return {z,cs}};
const frames=ids.map(i=>cap.find(c=>c.id===i)).filter(Boolean);const batches=[];let cur=[];
for(const c of frames){const t=[...cur,[c.sec,c.name,c.D]];if(cur.length&&enc(t).z.length>LIM){batches.push(cur);cur=[]}cur.push([c.sec,c.name,c.D])}if(cur.length)batches.push(cur);
const AF="const AF=Object.getPrototypeOf(async function(){}).constructor;";
const OV="async function ov(sn,nm,D){let sec=page.children.find(c=>c.type==='SECTION'&&c.name===sn);if(!sec){sec=figma.createSection();sec.name=sn;page.appendChild(sec);sec.resizeWithoutConstraints(200,200)}const base=page.findAll(n=>n.type==='FRAME'&&n.name===D.base&&n.parent&&n.parent.type==='SECTION')[0];const fr=base.clone();sec.appendChild(fr);fr.name=nm;const ids={err:[]};for(const c of D.n)await H.build(c,fr,D,ids);return {id:fr.id,errs:ids.err}}";
batches.forEach((b,i)=>{const e=enc(b);const code=`const page=figma.root.children.find(p=>p.name==='v27 · all screens');await figma.setCurrentPageAsync(page);${AF}const hn=page.findOne(n=>n.type==='TEXT'&&n.name==='HELPER_SRC');const H=await (new AF(hn.characters.replace('return {addFrame,','return {build,addFrame,')))();${OV}
const raw=H.utf8(H.inflateRaw(figma.base64Decode('${e.z}')));let cs=0;for(let i=0;i<raw.length;i++)cs=(cs+raw.charCodeAt(i))%1000003;if(cs!==${e.cs})throw new Error('checksum mismatch (got '+cs+', want ${e.cs})');
const made=[],errs=[];for(const f of JSON.parse(raw)){const r=f[2].over?await ov(f[0],f[1],f[2]):await H.addFrame(f[0],f[1],f[2],page);made.push(r.id);if(r.errs.length)errs.push(f[1]+': '+r.errs.join(';'))}H.layoutAll(page);return {count:made.length,errs};`;
 fs.writeFileSync(`call27_${i+1}.js`,code);console.log(`call27_${i+1}.js`,b.length,'frames',code.length,'chars:',b.map(f=>f[1].slice(0,10)).join('|').slice(0,90))});
