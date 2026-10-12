// node mk27.js -> call27_N.js (builder + inflate + compressed frames), each under the 50k limit of use_figma
const fs=require('fs'),zlib=require('zlib');const cap=JSON.parse(fs.readFileSync('captured27.json'));
const head=fs.readFileSync('builder27.js','utf8')+fs.readFileSync('inflate.js','utf8');
const SKIP=+(process.env.SKIP||0),LIMIT=+(process.env.LIM||9000);const batches=[];let cur=[];
const enc=arr=>{const txt=JSON.stringify(arr);const z=zlib.deflateRawSync(Buffer.from(txt),{level:9}).toString('base64');let cs=0;for(let i=0;i<txt.length;i++)cs=(cs+txt.charCodeAt(i))%1000003;return {z,cs,len:txt.length}};
const flush=()=>{if(cur.length){batches.push(cur);cur=[]}};
for(const c of cap.slice(SKIP)){const t=[...cur,[c.sec,c.name,c.D]];if(enc(t).z.length>LIMIT){flush()}cur.push([c.sec,c.name,c.D])}flush();
batches.forEach((b,i)=>{const e=enc(b);const body=`const DATA='${e.z}';const raw=utf8(inflateRaw(figma.base64Decode(DATA)));let cs=0;for(let i=0;i<raw.length;i++)cs=(cs+raw.charCodeAt(i))%1000003;if(cs!==${e.cs})throw new Error('checksum mismatch: data was altered in transit (got '+cs+', want ${e.cs})');
const FR=JSON.parse(raw);const page=figma.root.children.find(p=>p.name===PG);await figma.setCurrentPageAsync(page);const made=[],errs=[];for(const f of FR){const r=await addFrame(f[0],f[1],f[2],page);made.push(r.id);if(r.errs.length)errs.push(f[1]+': '+r.errs.join(';'))}layoutAll(page);return {count:made.length,ids:made,errs};`;
 fs.writeFileSync(`call27_${i+1}.js`,head+body);console.log(`call27_${i+1}.js`,b.length,'frames',(head+body).length,'chars:',b.map(f=>f[1].slice(0,14)).join(' | ').slice(0,100))});
