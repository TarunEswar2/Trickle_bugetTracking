const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 460, height: 980 } });
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push('pageerror: ' + err.message));

  const file = 'file://' + path.resolve(__dirname, 'trickle-final-v5.html');
  await page.goto(file);
  await page.waitForTimeout(300);

  // onboarding: manual path quickly to reach app
  await page.click("button:has-text('Swipe up')");
  await page.click("button[onclick=\"chooseTracking('manual')\"]");
  await page.waitForTimeout(150);
  // categories step - continue with defaults
  await page.click("button[onclick='finishCategories()']");
  await page.waitForTimeout(150);
  await page.fill('#pin1', '1234');
  await page.fill('#pin2', '1234');
  await page.click("button[onclick='submitPin()']");
  await page.waitForTimeout(150);
  await page.click("button[onclick=\"go('allSet')\"]");
  await page.waitForTimeout(150);
  await page.click("button[onclick='enterApp()']");
  await page.waitForTimeout(400);

  await page.screenshot({ path: 'v5_home.png' });

  await page.click("button[data-tab='categories']");
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'v5_categories.png' });

  // category detail
  const catRow = await page.$('.cat-row');
  if (catRow) { await catRow.click(); await page.waitForTimeout(300); await page.screenshot({ path: 'v5_catdetail.png' }); await page.click(".frame.active button.chev-back"); await page.waitForTimeout(200); }

  await page.click("button[data-tab='insight']");
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'v5_insight1.png' });
  await page.evaluate(() => document.querySelector('.frame.active').scrollTo(0, 1200));
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'v5_insight2.png' });
  await page.evaluate(() => document.querySelector('.frame.active').scrollTo(0, 2600));
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'v5_insight3.png' });
  await page.evaluate(() => document.querySelector('.frame.active').scrollTo(0, 4000));
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'v5_insight4.png' });
  await page.evaluate(() => document.querySelector('.frame.active').scrollTo(0, 5400));
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'v5_insight5.png' });

  await page.click("button[data-tab='savings']");
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'v5_savings.png' });
  const goalCard = await page.$('.goal-card');
  if (goalCard) { await goalCard.click(); await page.waitForTimeout(300); await page.screenshot({ path: 'v5_goaldetail.png' }); await page.click(".frame.active button.chev-back"); await page.waitForTimeout(200); }

  await page.click("button[data-tab='settings']");
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'v5_settings.png' });

  // check horizontal overflow on a couple frames
  const overflow = await page.evaluate(() => {
    const f = document.querySelector('.frame.active');
    return f.scrollWidth > f.clientWidth + 2;
  });

  console.log('CONSOLE_ERRORS:', JSON.stringify(errors));
  console.log('OVERFLOW:', overflow);

  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
