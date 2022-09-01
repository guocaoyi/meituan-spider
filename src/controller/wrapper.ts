import fs from 'node:fs'
import path from 'node:path'
import cp from 'node:child_process'
import cluster from 'node:cluster'
import debug from 'debug'
import puppeteer from 'puppeteer'
import { EventEmitter } from 'node:events'

import uris from '../constant/uri'
import { sleep } from '../utils'

import type { Browser, Protocol } from 'puppeteer'
import type { ScrollOpt } from '../types'

const logger = debug('WRAP')

/**
 * 扫描器（访问页面、设置定位、获取页面内容）
 */
export class Wrapper extends EventEmitter {
  private browser?: Browser

  constructor(props: any) {
    super(props)
  }

  /** 启动浏览器 */
  public async launch() {
    let browser = await puppeteer.launch()
    this.browser = browser
  }

  /**
   * 账号登录
   */
  public async sign(): Promise<Protocol.Network.Cookie[]> {
    const page = await this.browser!.newPage()
    return page.cookies()
  }

  /**
   * 访问页面并获取页面内容
   */
  public async parser(opt: {
    lat: string | number
    lng: string | number
    address?: string
  }) {
    const page = await this.browser!.newPage()
    await page.setViewport({ width: 390, height: 844 * 2 })

    // window handle
    const windowHandle = await page.evaluateHandle(() => window)

    page.setRequestInterception(true)
    page.on('response', (response) => {
      let url = response.url()
      if (/shopList/gi.test(url)) {
        response?.json?.()?.then((data) => {
          logger('INFO:', data)
        })
      }
    })

    // cookies
    const cookies = await page.cookies()

    // 访问页面
    await page.goto(`${uris.h5}?navigateType=19&index=3&resource_id=10638`, {
      waitUntil: 'networkidle2',
    })

    // 修改定位（美团可以通过主动搜索点击，也可以通过修改 session 来篡改定位）
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

    const res = await page.evaluate((poi) => {
      localStorage.setItem('param', JSON.stringify(poi))

      // 选择排序（打开排序面板）
      //@ts-ignore
      // document.getElementsByClassName('out-item-info-tit')[0].click();

      // //@ts-ignore
      // document.getElementsByClassName('sort-wrapper')[0].children[2].click(); // 选择距离优先

      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        deviceScaleFactor: window.devicePixelRatio,
      }
    }, poi)

    // 设置 GEO 信息后，刷新页面（重新请求店铺信息）
    await page.reload()
    await sleep(10 * 1000)

    await page.screenshot({
      path: path.resolve(
        __dirname,
        `../public/meituan_${opt.lat}_${opt.lng}.png`,
      ),
    }) // snapshot

    // 获取页面内容
    const content = await page.content()

    fs.writeFileSync(
      path.resolve(__dirname, `../public/meituan_${opt.lat}_${opt.lng}.html`),
      content,
      {
        encoding: 'utf-8',
      },
    )
    return res
  }

  /** 销毁浏览器 */
  public destory() {
    this.browser!.close?.()
  }
}
