/** 任务类型枚举 */
export enum TaskEnum {
  /** poi */ poi = 0,
  /** 店铺 */ shop = 1,
  /** 商品 */ goods = 2,
}

/**
 * 排序（店铺列表页）类型枚举
 * @default ShopSortEnum.range
 */
export enum ShopSortEnum {
  /** 综合 */ nomal = 0,
  /** 销量优先 */ sale = 1,
  /** 距离优先 */ range = 2,
  /** 速度优先 */ speed = 3,
  /** 评分优先 */ rate = 4,
  /** 起送价最低 */ price = 5,
  /** 配送费最低 */ delivery = 6,
  /** 人均高到低 */ aveh = 7,
  /** 人均低到高 */ avel = 8,
}

/** 美食枚举 */
export enum MeishiEnum {
  /** 美食：饺子馄饨、韩国料理、粥粉面馆、江浙菜系、口味川湘 */
  ms = '美食',
  /** 生鲜果蔬：新鲜蔬菜、火锅炒烤、水果 */
  sx = '生鲜果蔬',
  /** 甜点饮品：冰凉甜品、奶茶果汁、醒脑咖啡、面包蛋糕 */
  yp = '甜点饮品',
  /** 鲜花蛋糕：浪漫鲜花、生日蛋糕、烘焙甜品 */
  xh = '鲜花蛋糕',
  /** 晚餐优选：热门小炒、龙虾烧烤、炸鸡汉堡、西北菜、粥粉面馆 */
  wc = '晚餐优选',
  /** 快食简餐：快食盖饭、黄焖鸡米饭、石锅拌饭、香浓排骨饭 */
  jc = '快食简餐',
  /** 汉堡披萨：肉堡鸡肉卷、汉堡薯条、意面披萨 */
  hb = '汉堡披萨',
  /** 异国料理：韩式简餐、韩式炸鸡、日本料理、日式简称、意面披萨 */
  ll = '异国料理',
  /** 小吃馆：胡辣汤、麻辣烫、饺子馄饨、米粉面馆、汉堡薯条 */
  xc = '小吃馆',
}

export interface env {
  /** phone number */
  tel: number

  /**
   * proxy ip server
   * @default 0.0.0.0
   */
  proxy: string
}

/** scroll options */
export interface ScrollOpt {
  /** 页数 */
  pageNum: number

  /** scroll 次数 */
  limit: number

  /** 单次滚动间隔时间 */
  singletonTime: number

  /** scroll rerender 总时长 */
  timeout: number
}

/** meituan cities */
export interface City {
  /** 城市名称 */
  name: string
  /** 城市拼音（简拼 或 全拼） */
  alias: string

  /** 城市名称 */
  region: string
  /** 行政编号 */
  regionId: string
  /** 行政级别 */
  regionType: 'province' | 'city' | 'area'
  /** 所在省 */
  province: string
  /** 所在市 */
  city: string

  /** 城市主页 */
  url: string
}
