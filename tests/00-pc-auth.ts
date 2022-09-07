import cp from 'node:child_process'
import path from 'node:path'
import debug from 'debug'
import puppeteer from 'puppeteer'

import { ua } from '../src/constant/ua'
import { sleep, question } from '../src/utils'

const name = 'pc-auth'
const logger = debug(name.toUpperCase())
const tel = process.argv[2]
let step = 0

beforeAll(async () => {
  // auth before all testing
  cp.execSync(`rm -rf ./snap/${name}*`)

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.setViewport({ width: 1280, height: 844 })
  await page.setUserAgent(ua())

  // 访问页面
  await page.goto('https://passport.meituan.com/account/unitivelogin', {
    timeout: 3 * 1000,
    waitUntil: 'networkidle2',
  })

  // window handle
  logger(`INFO: page handle!`)
  const windowHandle = await page.evaluateHandle(() => window)

  await page.screenshot({
    path: path.resolve(__dirname, `./snap/${name}-${step++}-init.png`),
  })

  await page.evaluate(
    (window, tel) => {
      // 验证码登录模式；账号密码模式，账号容易出发风控异常
      document.getElementById('J-mobile-link').click()

      // 输入手机 & check 协议
      document.getElementById('login-mobile').value = tel
      document.getElementById('J-verify-btn').click()
      document.getElementById('user-input-checked').click()
    },
    windowHandle,
    tel,
  )

  await sleep(1 * 1000)
  await page.screenshot({
    path: path.resolve(__dirname, `./snap/${name}-${step++}-send-code.png`),
  })

  let res = await question('Which code your phone receipted?')
  logger(`INFO: verify code is: ${res}`)

  await page.evaluate((code) => {
    if (!!code) {
      // 输入验证码
      document.getElementById('login-verify-code').value = code

      document
        .getElementsByClassName('form-field form-field--ops')[1]
        .children[2].click()
    }
  }, res)

  await page.screenshot({
    path: path.resolve(__dirname, `./snap/${name}-${step++}-submit.png`),
  })

  await sleep(1 * 1000)

  await page.screenshot({
    path: path.resolve(__dirname, `./snap/${name}-${step++}-success.png`),
  })

  browser.close()
})
