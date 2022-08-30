const fs = require('fs');
const path = require('path');
const readline = require('readline');
const debug = require('debug');
const puppeteer = require('puppeteer');
const process = require('process');
const cp = require('child_process');

const ua = require('./ua');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const tel = process.argv[2];
const name = 'pc-pois';
let step = 0;

cp.execSync(`rm -rf ./dist/${name}*`);

const sleep = async (ms) =>
  new Promise((resolve) => {
    let timer = setTimeout(() => {
      clearTimeout(timer);
      resolve();
    }, ms);
  });

const question = () =>
  new Promise((resolve, reject) => {
    rl.question('Which code your phone receipted?\n', (answer) => {
      resolve(answer);
      rl.close();
    });
  });

/**
 * 测试 PC 登录
 */
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 844 });
  await page.setUserAgent(ua());
  page.setDefaultTimeout(30 * 1000);

  page.on('error', (error) => {
    console.error('error>', error);
  });

  // 访问页面
  await page.goto('https://passport.meituan.com/account/unitivelogin', {
    waitUntil: 'networkidle2',
  });

  // window handle
  console.info('page handle!');

  await page.screenshot({
    path: path.resolve(__dirname, `./dist/${name}-${step++}-init.png`),
  });

  await page.evaluate((tel) => {
    // 验证码登录模式；账号密码模式，账号容易出发风控异常
    document.getElementById('J-mobile-link').click();

    // 输入手机 & check 协议
    document.getElementById('login-mobile').value = tel;
    document.getElementById('J-verify-btn').click();
    document.getElementById('user-input-checked').click();
  }, tel);

  await sleep(1 * 1000);
  await page.screenshot({
    path: path.resolve(__dirname, `./dist/${name}-${step++}-send-code.png`),
  });

  let res = await question();
  console.log(`verify code is: ${res}`);

  await page.evaluate((code) => {
    if (!!code) {
      // 输入验证码
      document.getElementById('login-verify-code').value = code;

      document
        .getElementsByClassName('form-field form-field--ops')[1]
        .children[2].click();
    }
  }, res);

  await sleep(1 * 1000);
  await page.screenshot({
    path: path.resolve(__dirname, `./dist/${name}-${step++}-success.png`),
  });

  await page.goto('https://nj.meituan.com/meishi/', {
    waitUntil: ['domcontentloaded'],
  });

  await page.screenshot({
    path: path.resolve(__dirname, `./dist/${name}-${step++}-pois.png`),
  });

  page.$('');

  const areas = await page.evaluate(() => {
    if (
      window._appState &&
      window._appState.filters &&
      window._appState.filters.areas
    ) {
      return window._appState.filters.areas;
    } else {
      return [];
    }
  });

  fs.writeFileSync('./output/an.json', JSON.stringify(areas, null, 2), {
    encoding: 'utf8',
  });

  browser.close();

  process.exit(1);
})();
