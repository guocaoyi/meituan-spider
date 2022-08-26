import * as fs from 'fs';
import * as path from 'path';

const citiesStr = fs.readFileSync(path.join(__filename, './cities.json'), {
  encoding: 'utf-8',
});

interface City {
  /** 城市名称 */
  name: string;
  /** 城市拼音（简拼 或 全拼） */
  alias: string;

  /** 城市名称 */
  region: string;
  /** 行政编号 */
  regionId: string;
  /** 行政级别 */
  regionType: 'province' | 'city' | 'area';
  /** 所在省 */
  province: string;
  /** 所在市 */
  city: string;

  /** 城市主页 */
  url: string;
}

/**
 * city 城市信息
 */
export const cities = JSON.parse(citiesStr) as City[];
