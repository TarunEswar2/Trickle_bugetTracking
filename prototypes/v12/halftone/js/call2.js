const JOBS=[["17:54", ["#CFE3FF", "#5D8BC8", "#6C6FD1", "#3E4B8A", "#121420"], 9], ["17:58", ["#4F7A93", "#2E4756", "#222224", "#4F5A66", "#0E0E10"], 9], ["17:62", ["#FFDB45", "#FF457E", "#8721FF", "#4694FF", "#121218"], 9], ["17:66", ["#FFDB45", "#FF457E", "#8721FF", "#4694FF", "#121218"], 6], ["17:70", ["#FFDB45", "#FF457E", "#8721FF", "#4694FF", "#121218"], 14], ["17:74", ["#F6FC5A", "#3CEFA3", "#42F5E1", "#00A55F", "#10201A"], 9]];
const S=560;
const hx=s=>[1,3,5].map(i=>parseInt(s.slice(i,i+2),16)/255);
function crcT(){const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0;}return t}const CT=crcT();
function crc(b,s,e){let c=0xFFFFFFFF;for(let i=s;i<e;i++)c=CT[(c^b[i])&255]^(c>>>8);return (c^0xFFFFFFFF)>>>0}
function png(w,h,rgba){const row=w*4+1,raw=new Uint8Array(row*h);for(let y=0;y<h;y++){raw[y*row]=0;raw.set(rgba.subarray(y*w*4,(y+1)*w*4),y*row+1);}
const nb=Math.ceil(raw.length/65535),zl=2+raw.length+nb*5+4,out=new Uint8Array(8+25+12+zl+12);let p=0;
const u32=v=>{out[p++]=v>>>24;out[p++]=v>>>16&255;out[p++]=v>>>8&255;out[p++]=v&255};
out.set([137,80,78,71,13,10,26,10],0);p=8;
u32(13);let s=p;out.set([73,72,68,82],p);p+=4;u32(w);u32(h);out.set([8,6,0,0,0],p);p+=5;u32(crc(out,s,p));
u32(zl);s=p;out.set([73,68,65,84],p);p+=4;out[p++]=0x78;out[p++]=1;let a=1,b=0;
for(let i=0;i<raw.length;i++){a=(a+raw[i])%65521;b=(b+a)%65521;}
for(let k=0;k<nb;k++){const st=k*65535,len=Math.min(65535,raw.length-st);out[p++]=k==nb-1?1:0;out[p++]=len&255;out[p++]=len>>8;out[p++]=~len&255;out[p++]=(~len>>8)&255;out.set(raw.subarray(st,st+len),p);p+=len;}
u32(((b<<16)|a)>>>0);u32(crc(out,s,p));u32(0);s=p;out.set([73,69,78,68],p);p+=4;u32(crc(out,s,p));return out}
function render(stops,pitch){const st=stops.map(hx),P=[[0,0,.55],[.85,.05,.6],[.95,.5,.45],[.75,.72,.5],[.35,1.25,.4]];
const px=new Uint8Array(S*S*4),a1=Math.PI/4,a2=Math.PI/3,c1=Math.cos(a1),s1=Math.sin(a1),c2=Math.cos(a2),s2=Math.sin(a2);
for(let j=0;j<S;j++)for(let i=0;i<S;i++){const x=(i+.5)/S,y=(j+.5)/S;let ws=0,r=0,g=0,bb=0;
for(let k=0;k<5;k++){const q=P[k],w=Math.exp(-((x-q[0])**2+(y-q[1])**2)/(2*q[2]*q[2]*.35))+1e-6;ws+=w;r+=w*st[k][0];g+=w*st[k][1];bb+=w*st[k][2];}
r/=ws;g/=ws;bb/=ws;const lum=.299*r+.587*g+.114*bb,sat=Math.max(r,g,bb)-Math.min(r,g,bb);
const fade=Math.pow(Math.min(1,Math.max(0,(1-y)/.16)),1.5);
const cov=Math.min(1,Math.max(0,.35+.6*sat+.25*(1-lum)))*(.12+.88*fade);const R=Math.sqrt(cov/Math.PI)*pitch*1.05;
const X=i,Y=j;const sc=(c,s)=>{const U=X*c+Y*s,V=-X*s+Y*c,du=(U/pitch-Math.round(U/pitch))*pitch,dv=(V/pitch-Math.round(V/pitch))*pitch;return Math.min(1,Math.max(0,R-Math.hypot(du,dv)+.5))};
const m=Math.max(sc(c1,s1),.55*sc(c2,s2));const t=.18*fade,dm=1-.35*Math.max(0,lum-.55);
const pr=[1-(1-r)*t,1-(1-g)*t,1-(1-bb)*t];const gr=[.42,.43,.45];const dc=[r,g,bb].map((v,k)=>v*dm*fade+gr[k]*(1-fade));
const u=Math.abs(x*2-1),v=Math.abs(y*2-1),sq=Math.pow(u**4+v**4,.25),al=Math.min(1,Math.max(0,(1-sq)*S/2+.5));
const o=(j*S+i)*4;for(let k=0;k<3;k++)px[o+k]=Math.round(255*(Math.min(1,pr[k]*(1-m)+dc[k]*m)));px[o+3]=Math.round(255*al);}
return png(S,S,px)}
const out=[];for(const [id,stops,pitch] of JOBS){const n=await figma.getNodeByIdAsync(id);const img=figma.createImage(render(stops,pitch));n.resize(280,280);n.cornerRadius=78;n.cornerSmoothing=0.6;n.clipsContent=true;n.fills=[{type:'IMAGE',imageHash:img.hash,scaleMode:'FILL'}];
for(const t of n.parent.children)if(t.type==='TEXT')t.resize(280,t.height);out.push(id)}
return {mutated:out}
