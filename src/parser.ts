/**
 * 获取城市
 * @description 这次已经前置处理，并同 china region 合并处理；过滤了一些非真实、港台、兵团的城市
 * @see https://www.meituan.com/changecity
 */
export const cities = () => {
  const city = [];
  try {
    const container = document.getElementsByClassName('alphabet-city-area')[0];
    const nodes = container.getElementsByClassName('link city') as any;
    for (let node of nodes) {
      let cityInfo = { name: '', alias: '', url: '' };
      let uri = node.href;
      cityInfo.name = node.innerHTML;
      cityInfo.alias = uri
        .replace(/(https?:)?\/\//gi, (m) => '')
        .replace(/\.meituan.com(\/)?/gi, (m) => '');
      cityInfo.url = uri;
      city.push(cityInfo);
    }
  } catch (error) {
    console.error(error);
  } finally {
    return city;
  }
};

/**
 * 获取 POI 列表
 * @sign true
 * @see https://nj.meituan.com/meishi/
 */
export const pois = () => {
  const city = [];
  const container = document.getElementsByClassName('alphabet-city-area')[0];
  const nodes = container.getElementsByClassName('link city') ?? [];
  for (let node of nodes) {
    let cityInfo = { name: '', alias: '', url: '' };
    let cityAlpha = node.parentElement.parentElement.id ?? 'city-A';
    let uri = node.href;
    cityInfo.name = node.innerHTML;
    cityInfo.alias = uri
      .replace(/(https?:)?\/\//gi, (m) => '')
      .replace(/\.meituan.com(\/)?/gi, (m) => '');
    cityInfo.url = uri;
    city.push(cityInfo);
  }
  return city;
};

/**
 * sms
 */
export const sms = (phone: string) => {
  // phone num
  document.getElementById('login-mobile')?.setAttribute('value', phone);
  document.getElementsByName('commit')[1].click(); // send sms

  document.getElementById('J-verify-btn')?.click(); // check user protocol
  document.getElementById('user-input-checked')?.click(); // commit
};

/**
 * stores
 */
export const stores = () => {
  document.getElementById('poilist-item-info');
};
