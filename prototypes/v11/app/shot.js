const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(async()=>await chromium.launch());
const theme=process.argv[2]||'dark',look=process.argv[3]||'color',dir='shots/'+theme+'-'+look;require('fs').mkdirSync(dir,{recursive:true});
const p=await b.newPage({viewport:{width:412,height:860},colorScheme:theme});const errs=[];p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});p.on('pageerror',e=>errs.push(e.message));
const U='file://'+__dirname+'/t11.html';
await p.goto(U);await p.waitForTimeout(500);await p.screenshot({path:dir+'/S-00.png'});
await p.goto('about:blank');await p.goto(U+'#demo');await p.waitForTimeout(400);
await p.evaluate(l=>{S.look=l;render()},look);
const frames=['S-01','S-02','S-03','S-04','H-01','P-01','P-02','P-03','P-04','M-01','M-02','M-03','M-04','M-05','M-06','I-01','I-02','I-03','X-01'];
for(const f of frames){await p.evaluate(f=>{S.sheet=null;S.toast=null;if(f[0]=='P'&&!S.pay){S.pay={payee:'Auto',item:'auto',amt:60,cat:'Travel',vpa:'ramesh.auto@okhdfc',upi:true};}
 if(f=='P-03'){S.pay.before=left('Travel')+60;}if(f=='P-04'){S.pay={payee:'Dinner at Anand',item:'dinner',amt:800,cat:'Food',vpa:'x@ybl',upi:true}}
 S.scr=f;render()},f);await p.waitForTimeout(f=='P-03'?350:900);await p.screenshot({path:dir+'/'+f+'.png'});}
const sheets={'P-05':{id:'P-05',take:200,src:'Food',short:150},'P-06':{id:'P-06'},'N-01':{id:'N-01',amt:1500},'N-02':{id:'N-02'},'N-03':{id:'N-03'},add:{id:'add'}};
for(const k in sheets){await p.evaluate(([k,s])=>{S.scr='H-01';S.pay={payee:'PVR tickets',item:'movie',amt:950,cat:'Fun',vpa:'pvr@axl',upi:true};S.sheet=s;render()},[k,sheets[k]]);await p.waitForTimeout(500);await p.screenshot({path:dir+'/'+k+'.png'});}
console.log(JSON.stringify(errs));await b.close();})();
