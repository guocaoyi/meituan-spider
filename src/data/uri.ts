/**
 * meituan
 */
export const uri = {
  /** 美团外卖页 */
  waimai: 'https://h5.waimai.meituan.com/waimai/mindex/kingkong',

  /** 美团外卖店铺页 */
  shop: 'https://h5.waimai.meituan.com/waimai/mindex/menu?mtShopId=',

  /** 美团外卖首页 */
  pcHome: 'https://meituan.com',

  /** 美团登录 */
  pcLogin: 'https://passport.meituan.com/account/unitivelogin',

  /** 美团选择城市页 */
  pcCities: 'https://www.meituan.com/changecity/',

  /** 美团城市首页 */
  pcCity: (city: string) => `https://${city}.meituan.com/`,

  /** 美团城市美食页 */
  pcMeishi: (city: string) => `https://${city}.meituan.com/meishi/`,
};

export default uri;
