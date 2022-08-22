type Status =
  | /** 正常 */ 0
  | /** 服务器内部错误 */ 1
  | /** 请求参数非法 */ 2
  | /** 权限校验失败 */ 3
  | /** 配额校验失败 */ 4
  | /** ak不存在或者非法 */ 5
  | /** 服务禁用 */ 101
  | /** 不通过白名单或者安全码不对 */ 102
  | /** 无权限 */ `${2}${number}`
  | /** 配额错误 */ `${3}${number}`;

interface Location {
  /** 纬度值 */
  lng: number;
  /** 经度值 */
  lat: number;
}

export namespace Geocoding {
  export interface Region {
    /** 经纬度坐标 */
    location: Location;
    /**
     * 位置的附加信息
     * @description 0： 为模糊打点；1：准确打点
     */
    precise: 0 | 1;
    /** 打点绝对精度 */
    confidence: 75;
    /** 描述地址理解程度 */
    comprehension: 100;
    /** 真实地址结构 */
    level: '楼号';
  }

  export interface Query {
    address: string;
    ak: string;
    city?: string;
    ret_coordtype?: string;
    sn?: string;
    output?: string;
    callback?: string;
    extension_analys_level?: number;
  }

  export interface Response<T> {
    /** 返回结果状态值 */
    status:
      | /** 正常 */ 0
      | /** 服务器内部错误 */ 1
      | /** 请求参数非法 */ 2
      | /** 权限校验失败 */ 3
      | /** 配额校验失败 */ 4
      | /** ak不存在或者非法 */ 5
      | /** 服务禁用 */ 101
      | /** 不通过白名单或者安全码不对 */ 102
      | /** 无权限 */ `${2}${number}`
      | /** 配额错误 */ `${3}${number}`;
  }
}

export namespace GeocodingAbroad {
  export interface Query {
    /** 根据经纬度坐标获取地址 */
    location: `${number},${number}`;
    /** 用户申请注册的key */
    ak: string;
    /** 坐标的类型 */
    coordtype?: string;
    /** 国测局经纬度坐标或百度米制坐标 */
    ret_coordtype?: string;
    /** poi召回半径 */
    radius?: number;
    /** 校验方式 */
    sn?: string;
    /** 输出格式为json或者xml */
    output?: string;
    /** 将json格式的返回值通过callback函数返回以实现jsonp功能 */
    callback?: string;
    /** 选择poi类型召回不同类型的po */
    poi_types?: string;
    /** 是否召回 pois 数据 */
    extensions_poi?: string;
    /** 召回坐标周围最近的3条道路数据 */
    extensions_road?: string;
    /** 行政区划是否返回乡镇级数据 */
    extensions_town?: string;
    /** 指定召回的行政区划语言类型 */
    language?: string;
    /** 是否自动填充行政区划 */
    language_auto?: string;
  }

  export interface AddressComponent {
    /** 国家 */
    country: string;
    /** 国家编码 */
    country_code: number;
    /** 国家英文缩写（三位） */
    country_code_iso: string;
    /** 国家英文缩写（两位） */
    country_code_iso2: string;
    /** 省名 */
    province: string;
    /** 城市名 */
    city: string;
    /** 城市所在级别 */
    city_level: number;
    /** 区县名 */
    district: string;
    /** 乡镇名，需设置extensions_town=true时才会返回 */
    town: string;
    /** 乡镇id */
    town_code: string;
    /** 街道名（行政区划中的街道层级） */
    street: string;
    /** 街道门牌号 */
    street_number: string;
    /** 行政区划代码，前往下载 */
    adcode: number;
    /** 相对当前坐标点的方向，当有门牌号的时候返回数据 */
    direction: string;
    /** 相对当前坐标点的距离，当有门牌号的时候返回数据 */
    distance: string;
  }

  export interface Pois {
    /** 地址信息 */
    addr: string;
    /** 数据来源（已废弃） */
    cp: string;
    /** 和当前坐标点的方向 */
    direction: string;
    /** 离坐标点距离 */
    distance: number;
    /** poi名称 */
    name: string;
    /** poi类型 */
    tag: string;
    /** poi坐标 {x,y} */
    point: number;
    /** 电话 */
    tel: number;
    /** poi唯一标识 */
    uid: string;
    /** 邮编 */
    zip: number;
    /** poi对应的主点poi */
    parent_poi: string;
  }

  export interface Response {
    /** 返回结果状态值 */
    status: Status;
    /** 经纬度坐标 */
    location: Location;
    /** 结构化地址信息 */
    formatted_address: string;
    /** 坐标所在商圈信息 */
    business: string;
    /** 行政区划 */
    addressComponent: AddressComponent;
    /** 周边poi数组 */
    pois: Pois;
    /** roads */
    roads: {
      /** 周边道路名称 */
      name: string;
      /** 传入的坐标点距离道路的大概距离 */
      distance: string;
    };
    /**  */
    poiRegions: {
      /** 请求中的坐标与所归属区域面的相对位置关系 */
      direction_desc: string;
      /** 归属区域面名称 */
      name: string;
      /** 归属区域面类型 */
      tag: string;
    };
    /** 当前位置结合POI的语义化结果描述 */
    sematic_description: string;
    /** 百度定义的城市id */
    cityCode: number;
  }
}

/**
 * 地址查询（坐标与地址间的相互转换）
 * HACK:
 */
export class Geocoder {
  /** 百度开放平台应用编号 */
  private readonly appId = 111111;
  /** 百度开放平台应用密码 */
  private readonly appKey = 'xxxxxx';

  /**
   * @see https://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding
   */
  poi2Region(poi: string = '') {}

  /**
   * @see https://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding-abroad
   */
  geo2Region() {}
}
