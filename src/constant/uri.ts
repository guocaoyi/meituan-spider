// h5 host
export const h5 = {
  /** 首页 */
  home: 'https://i.meituan.com',

  /** 美团选择城市页 */
  cities: 'https://i.meituan.com/index/changecity',

  /** 城市首页 */
  cityHome: (city: string) => `https://i.meituan.com/${city}`,

  /** 选择城市 */
  pickCity: 'https://h5.waimai.meituan.com/waimai/mindex/citypicker',

  /** 选择地址 */
  pickPoi: 'https://h5.waimai.meituan.com/waimai/mindex/poipicker',

  /** 美团外卖首页 */
  waimai: 'https://h5.waimai.meituan.com/waimai/mindex/home',

  /** 美团外卖页（分类） */
  waimaiHome: 'https://h5.waimai.meituan.com/waimai/mindex/kingkong',

  /** 美团外卖店铺页 */
  shopHome: (shop: string) =>
    `https://h5.waimai.meituan.com/waimai/mindex/menu?mtShopId=${shop}`,
}

// pc host
export const pc = {
  /** 美团外卖首页 */
  home: 'https://meituan.com',

  /** 美团登录（优先使用） */
  login: 'https://passport.meituan.com/account/unitivelogin',

  /** 美团会员登录 */
  userLogin: 'https://passport.meituan.com/useraccount/login',

  /** 美团选择城市页 */
  cities: 'https://www.meituan.com/changecity',

  /** 美团城市首页 */
  city: (city: string) => `https://${city}.meituan.com`,

  /** 美团城市美食页 */
  meishi: (city: string) => `https://${city}.meituan.com/meishi`,
}

export default { h5, pc }
