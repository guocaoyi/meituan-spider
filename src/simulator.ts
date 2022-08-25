import puppeteer from 'puppeteer';

import type { Browser, Protocol } from 'puppeteer';

/**
 * 模拟器
 * @description Puppeteer browser
 */
export class simulator {
  private browser?: Browser;

  /**
   * 启动浏览器
   */
  async launch() {
    let browser = await puppeteer.launch();
    this.browser = browser;
  }

  /**
   * 账号登录
   */
  async sign(): Promise<Protocol.Network.Cookie[]> {
    const page = await this.browser!.newPage();
    return page.cookies();
  }

  /**
   * 销毁浏览器
   */
  async destory() {
    await this.browser!.close?.();
  }
}
