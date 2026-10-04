const fs=require('fs');const cap=JSON.parse(fs.readFileSync('captured.json'));const batches=JSON.parse(fs.readFileSync('batches.json'));const bi=+process.argv[2];const ids=batches[bi];const b=fs.readFileSync('builder.js','utf8');
const sel=ids.map(i=>cap.find(c=>c.id===i));
const pre=bi===0?"for(const s of figma.currentPage.children.filter(c=>c.type==='SECTION'))s.remove();\n":"";
const body=`const FRS=${JSON.stringify(sel.map(c=>[c.sec,c.name,c.D]))};\nconst res=[];for(const f of FRS)res.push(await addFrame(f[0],f[1],f[2]));return res.map(r=>r.id+(r.errs.length?'!'+r.errs.join(';'):'')).join(' ');`;
fs.writeFileSync('call.js',pre+b+body);console.log(bi,ids.join(','),fs.statSync('call.js').size)
