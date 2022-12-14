import debug from 'debug'
import { ShopSortEnum } from '../types'

import type { ScrollOpt } from '../types'

const logger = debug('PARSER')

/**
 * 获取城市
 * @description 这次已经前置处理，并同
 */
export const cities = () => {
  const city = []
  try {
    const container = document.getElementsByClassName('alphabet-city-area')[0]
    const nodes = container.getElementsByClassName('link city') as any
    for (let node of nodes) {
      let cityInfo = { name: '', alias: '', url: '' }
      let uri = node.href
      cityInfo.name = node.innerHTML
      cityInfo.alias = uri
        .replace(/(https?:)?\/\//gi, () => '')
        .replace(/\.meituan.com(\/)?/gi, () => '')
      cityInfo.url = uri
      city.push(cityInfo)
    }
  } catch (error) {
    logger('Error', error)
  } finally {
    return city
  }
}

/**
 * 获取 POI 列表
 */
export const pois = () => {
  //@ts-ignore
  return window._appState
}

/**
 *
 * @param {window.jQuery} $ jQuerry
 */
export const auth = ($: any) => {
  $('.login-background').click()
}

export const pcSms = () => {
  //
}

/**
 * 短信验证码
 */
export const sms = (phone: string) => {
  // phone num
  document.getElementById('login-mobile')?.setAttribute('value', phone)
  document.getElementsByName('commit')[1].click() // send sms

  document.getElementById('J-verify-btn')?.click() // check user protocol
  document.getElementById('user-input-checked')?.click() // commit
}

/**
 * 短信验证码（PC）
 */
export const pcsms = (phone: string) => {
  // phone num
  document.getElementById('login-mobile')?.setAttribute('value', phone)
  document.getElementsByName('commit')[1].click() // send sms

  document.getElementById('J-verify-btn')?.click() // check user protocol
  document.getElementById('user-input-checked')?.click() // commit
}

/**
 * 获取店铺列表数据
 */
export const shops = () => {
  document.getElementById('poilist-item-info')
}

/**
 * 商品信息（店铺内）
 */
export const goods = () => {
  //
}

/**
 * 排序（综合、销量、距离、速度、评分、起送价、配送费、人均高到低、人均低到高）
 * @param {ShopSortEnum} sort 排序
 */
export const sortByDis = (sort: ShopSortEnum = ShopSortEnum.nomal) => {
  // 选择排序（打开排序面板）
  //@ts-ignore
  document.getElementsByClassName('out-item-info-tit')[0].click()

  //@ts-ignore
  document.getElementsByClassName('sort-wrapper')[0].children[sort].click()
}

/** fileterArea */
export const fileterAreas = () => {
  ;[].filter(() => {
    // 全部、全区、全镇、全县
  })

  // 数据修正逻辑，如果 subareas 只有一个且为「全部」则，不返回 sub
}

/**
 * 每个点位拉 5 - 10 个分页
 * @param {number} data data
 */
export const scrollPage = (data: ScrollOpt) => {
  // 每次滚动刷新预留 2 - 5 秒的时间
  setTimeout(() => {}, data.pageNum * 2 * 1000)
  window.scrollTo(0, document.body.scrollHeight)
}
