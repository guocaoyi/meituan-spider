import * as fs from 'fs';
import * as path from 'path';
import puppeteer from 'puppeteer';

import host from './data/uri';

import type { Browser, Protocol } from 'puppeteer';

let browser: Browser;
const options = {
  headless: false,
  slowMo: 250,
  defaultViewport: {
    width: 1000,
    height: 800,
  },
};

/**
 * @param {number} ms 毫秒
 */
const sleep = async (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

/**
 * 模拟器（Puppeteer Browser）
 */
export class simulator {
  private browser?: Browser;

  /** 启动浏览器 */
  public async launch() {
    let browser = await puppeteer.launch();
    this.browser = browser;
  }
}

interface ScrollOpt {
  /** 页数 @default 1 */
  pageNum: number;
  /** scroll 次数 */
  limit: number;
  /** 单次滚动间隔时间 @default 2 (s) */
  singletonTime: number;
  /** scroll rerender 总时长 */
  timeout: number;
}

/**
 * 每个点位拉 5 - 10 个分页
 */
export const scrollPage = (data: ScrollOpt) => {
  // 每次滚动刷新预留 2 - 5 秒的时间
  setTimeout(() => {}, data.pageNum * 2 * 1000);
  window.scrollTo(0, document.body.scrollHeight);
};

/**
 * 扫描器（访问页面、设置定位、获取页面内容）
 */
class Wrapper {
  // /** 美团外卖首页 */
  // readonly #waimaiHomePage = 'https://h5.waimai.meituan.com/waimai/mindex/home';
  // /** 美团外卖页 */
  // readonly #waimaiPage = 'https://h5.waimai.meituan.com/waimai/mindex/kingkong';
  // /** 美团外卖店铺页 */
  // readonly #shopPage =
  //   'https://h5.waimai.meituan.com/waimai/mindex/menu?mtShopId=';

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

    // window handle
    const windowHandle = await page.evaluateHandle(() => window);

    page.setRequestInterception(true);
    page.on('response', (response) => {
      let url = response.url();
      if (/shopList/gi.test(url)) {
        response?.json?.()?.then((data) => {
          console.info('data', data);
        });
      }
    });

    const cookies = await page.cookies();

    // 访问页面
    await page.goto(
      `${meituan.waimai}?navigateType=19&index=3&resource_id=10638`,
      {
        waitUntil: 'networkidle2',
      }
    );

    // 修改定位
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
    };

    const res = await page.evaluate((poi) => {
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
    return res;
  }

  /** 销毁浏览器 */
  public destory() {
    this.browser!.close?.();
  }
}
