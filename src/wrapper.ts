import * as fs from 'fs';
import * as path from 'path';
import puppeteer from 'puppeteer';
import * as cluster from 'cluster';

import { sleep } from './utils';
import { Poi, GeoPOI, PickedPOI } from './types';

import type { Browser, Protocol } from 'puppeteer';

/**
 * 扫描器（访问页面、设置定位、获取页面内容）
 */
export class Wrapper {
  /** 美团外卖首页 */
  readonly #waimaiHomePage = 'https://h5.waimai.meituan.com/waimai/mindex/home';
  /** 美团外卖页 */
  readonly #waimaiPage = 'https://h5.waimai.meituan.com/waimai/mindex/kingkong';
  /** 美团外卖店铺页 */
  readonly #shopPage =
    'https://h5.waimai.meituan.com/waimai/mindex/menu?mtShopId=';

  private browser?: Browser;

  /** 启动浏览器 */
  public async launch() {
    let browser = await puppeteer.launch();
    this.browser = browser;
  }

  /**
   * 账号登录
   */
  public async sign(): Promise<Protocol.Network.Cookie[]> {
    const page = await this.browser!.newPage();
    return page.cookies();
  }

  /**
   * 访问页面并获取页面内容
   */
  public async parser(opt: {
    lat: string | number;
    lng: string | number;
    address?: string;
  }) {
    const page = await this.browser!.newPage();
    await page.setViewport({ width: 390, height: 844 * 2 });

    page.setCookie();

    const cookies = await page.cookies();

    // 访问页面
    await page.goto(
      `${this.#waimaiPage}?navigateType=19&index=3&resource_id=10638`,
      {
        waitUntil: 'networkidle2',
      }
    );

    // 修改定位
    const poi = new Poi();
    poi.lat = opt.lat;
    poi.lng = opt.lng;
    poi.address = opt.address;
    poi.addressName = opt.address;
    const geoPOI = new GeoPOI();
    geoPOI.lat = opt.lat;
    geoPOI.lng = opt.lng;
    geoPOI.poi = opt.address;
    poi.geoPOI = geoPOI;
    const pickedPOI = new PickedPOI();
    pickedPOI.lat = opt.lat;
    pickedPOI.lng = opt.lng;
    pickedPOI.poi = opt.address;
    pickedPOI.address = opt.address;
    poi.pickedPOI = pickedPOI;

    let res = await page.evaluate((poi) => {
      localStorage.setItem('param', JSON.stringify(poi));

      // 选择排序（打开排序面板）
      //@ts-ignore
      // document.getElementsByClassName('out-item-info-tit')[0].click();

      // //@ts-ignore
      // document.getElementsByClassName('sort-wrapper')[0].children[2].click(); // 选择距离优先

      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        deviceScaleFactor: window.devicePixelRatio,
      };
    }, poi);

    // 设置 GEO 信息后，刷新页面（重新请求店铺信息）
    await page.reload();
    await sleep(10 * 1000);

    await page.screenshot({
      path: path.resolve(
        __dirname,
        `../public/meituan_${opt.lat}_${opt.lng}.png`
      ),
    }); // snapshot

    // 获取页面内容
    const content = await page.content();

    fs.writeFileSync(
      path.resolve(__dirname, `../public/meituan_${opt.lat}_${opt.lng}.html`),
      content,
      {
        encoding: 'utf-8',
      }
    );

    // 解析地址

    return res;
  }

  /** 销毁浏览器 */
  public destory() {
    this.browser!.close?.();
  }
}
