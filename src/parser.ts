/**
 * 获取 POI 列表
 * @sign false
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
