const env = {
  // phone number
  tel: 13000000000,

  // proxy ip server
  proxy: '0.0.0.0',
};

/**
 * 通过地址查询附近店铺信息
 * @query {string} poi 地址（详细地址：市区 + 街道乡镇 + 详细地址）
 */
export const poi = async () => {};

/**
 * get poi list
 * 获取城市（区）的兴趣点（街道、商圈、单位、学校、景点）
 */
export const pois = async () => {};

/**
 * 通过经纬度查询附近店铺信息
 * @query lat 纬度
 * @query lng 经度
 */
export const geo = async () => {
  // 根据经纬度获取详细地址信息（省市区街道乡镇），并格式化
};

/**
 * 结构化地址信息（根据详细地址查坐标）
 * @query {string} address 地址（详细地址：市区 + 街道乡镇 + 详细地址）
 */
export const degeoAddress = async () => {};

/**
 * 结构化地址信息（根据坐标查详细地址）
 * @query {number} lat 纬度
 * @query {number} lng 经度
 */
export const degeoPoint = async () => {};
