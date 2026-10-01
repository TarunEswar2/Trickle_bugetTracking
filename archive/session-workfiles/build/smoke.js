const { chromium } = require('/opt/node-tools/node_modules/playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 460, height: 1000 } });
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push('PAGEERROR: ' + err.message));

  const file = 'file://' + path.resolve(__dirname, 'trickle-explorations-2.html');
  await page.goto(file);
  await page.waitForTimeout(300);
  console.log('EARLY_ERRORS:', JSON.stringify(errors));
  console.log('mockup count:', await page.evaluate(() => document.querySelectorAll('.mockup').length));

  const mockups = ['d','e','f','g','h','i'];
  for (const mk of mockups) {
    await page.evaluate((k) => enterMockup(k), mk);
    await page.waitForTimeout(150);
    // walk onboarding quickly to home
    await page.evaluate((k) => {
      go(k,'method'); go(k,'upi'); go(k,'cats'); go(k,'pin'); go(k,'perm'); go(k,'allset');
      window['enter'+k.toUpperCase()]();
    }, mk);
    await page.waitForTimeout(200);

    // overflow check
    const overflow = await page.evaluate((k) => {
      const root = document.querySelector('.mockup[data-mockup="'+k+'"] .phone');
      return root.scrollWidth > root.clientWidth + 2;
    }, mk);

    await page.screenshot({ path: `shot_${mk}_main.png`, clip: await page.evaluate((k)=>{
      const el=document.querySelector('.mockup[data-mockup="'+k+'"] .phone');
      const r=el.getBoundingClientRect(); return {x:r.x,y:r.y,width:r.width,height:r.height};
    }, mk) });

    console.log(mk, 'overflow:', overflow);
    await page.evaluate((k) => exitMockup(), mk);
    await page.waitForTimeout(100);
  }

  console.log('CONSOLE_ERRORS:', JSON.stringify(errors));
  await browser.close();
})();
