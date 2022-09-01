const cheerio = require('cheerio')
const cp = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')
const readline = require('node:readline')
const debug = require('debug')
const puppeteer = require('puppeteer')

const ua = require('./ua')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const name = 'pc-pois'
const opt = {
  address: '南京市',
  lat: '31',
  lng: 118,
}
const poi = {
  address: opt.address,
  addressName: opt.address,
  geoPOI: {
    lat: opt.lat,
    lng: opt.lng,
    geotype: 2,
    poi: opt.address,
  },
  geotype: 2,
  initialLat: opt.lat,
  initialLng: opt.lng,
  lat: opt.lat,
  lng: opt.lng,
  pickedPOI: {
    lat: opt.lat,
    lng: opt.lng,
    geotype: 2,
    poi: opt.address,
    address: opt.address,
  },
}
let step = 0

cp.execSync(`rm -rf ./snap/${name}*`)

const sleep = async (ms) =>
  new Promise((resolve) => {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      resolve()
    }, ms)
  })

/**
 * 测试 PC 登录
 */
;(async () => {
  const browser = await puppeteer.launch()
  const iPhone = puppeteer.devices['iPhone 6']
  const page = await browser.newPage()

  // await page.setUserAgent(ua())
  await page.emulate(iPhone)
  await page.setRequestInterception(true)
  page.setDefaultTimeout(30 * 1000)

  page.on('error', (error) => {
    console.error('error>', error)
  })

  page.on('request', (req) => {
    const url = (req.url() ?? '').toLowerCase()
    if (/channel\/shoplist/gi.test(url)) {
      console.info('url >', url)
      // cached
    }
    req.continue()
  })

  // 访问页面
  await page.goto('http://i.meituan.com/', { waitUntil: 'networkidle2' })
  await page.screenshot({
    path: path.resolve(__dirname, `./snap/${name}-${step++}-redirect.png`),
  })
  console.info('redirect done!')

  const listWrapHandle = await page.$('.category-list-wrap')
  const divHandle = await listWrapHandle.$$('div')
  await divHandle[4].click()

  await page.screenshot({
    path: path.resolve(__dirname, `./snap/${name}-${step++}-waimai.png`),
  })

  console.info('click waimai!')

  await sleep(5 * 1000)

  await page.screenshot({
    path: path.resolve(__dirname, `./snap/${name}-${step++}-success.png`),
  })

  browser.close()

  process.exit(1)
})()
