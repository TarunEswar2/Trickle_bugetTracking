// node mk27b.js -> call27_1.js (stores the builder in the file, then builds a few frames) and call27_N.js (small loader + data)
const fs=require('fs'),zlib=require('zlib');const cap=JSON.parse(fs.readFileSync('captured27.json'));
const SKIP=+(process.env.SKIP||0),LIM=+(process.env.LIM||9000);
const head=fs.readFileSync('builder27.js','utf8')+fs.readFileSync('inflate.js','utf8')+'\nreturn {addFrame,layoutAll,inflateRaw,utf8};';
const enc=arr=>{const txt=JSON.stringify(arr);const z=zlib.deflateRawSync(Buffer.from(txt),{level:9}).toString('base64');let cs=0;for(let i=0;i<txt.length;i++)cs=(cs+txt.charCodeAt(i))%1000003;return {z,cs}};
const batches=[];let cur=[];
for(const c of cap.slice(SKIP)){const lim=(batches.length===0&&!process.env.NOHELPER)?3000:LIM;const t=[...cur,[c.sec,c.name,c.D]];if(cur.length&&enc(t).z.length>lim){batches.push(cur);cur=[]}cur.push([c.sec,c.name,c.D])}if(cur.length)batches.push(cur);
const run=e=>`const raw=H.utf8(H.inflateRaw(figma.base64Decode('${e.z}')));let cs=0;for(let i=0;i<raw.length;i++)cs=(cs+raw.charCodeAt(i))%1000003;if(cs!==${e.cs})throw new Error('checksum mismatch: data altered in transit (got '+cs+', want ${e.cs})');
const made=[],errs=[];for(const f of JSON.parse(raw)){const r=await H.addFrame(f[0],f[1],f[2],page);made.push(r.id);if(r.errs.length)errs.push(f[1]+': '+r.errs.join(';'))}H.layoutAll(page);return {count:made.length,errs,last:made[made.length-1]};`;
const AF="const AF=Object.getPrototypeOf(async function(){}).constructor;";
batches.forEach((b,i)=>{const e=enc(b);let code;
 if(i===0&&!process.env.NOHELPER){code=`const SRC=${JSON.stringify(head)};const page=figma.root.children.find(p=>p.name==='v27 · all screens');await figma.setCurrentPageAsync(page);${AF}
let hn=page.findOne(n=>n.type==='TEXT'&&n.name==='HELPER_SRC');if(!hn){hn=figma.createText();hn.name='HELPER_SRC';await figma.loadFontAsync({family:'Inter',style:'Regular'});hn.fontName={family:'Inter',style:'Regular'};hn.x=-2000;hn.y=0;page.appendChild(hn)}hn.characters=SRC;hn.visible=false;
const H=await (new AF(SRC))();${run(e)}`}
 else code=`const page=figma.root.children.find(p=>p.name==='v27 · all screens');await figma.setCurrentPageAsync(page);${AF}const hn=page.findOne(n=>n.type==='TEXT'&&n.name==='HELPER_SRC');const H=await (new AF(hn.characters))();${run(e)}`;
 fs.writeFileSync(`call27_${i+1}.js`,code);console.log(`call27_${i+1}.js`,b.length,'frames',code.length,'chars:',b.map(f=>f[1].slice(0,12)).join('|').slice(0,80))});
