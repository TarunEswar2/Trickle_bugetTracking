const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:require('fs').readdirSync('/opt/pw-browsers').filter(d=>d.startsWith('chromium'))[0]?undefined:undefined});
})();
