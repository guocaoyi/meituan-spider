import * as fs from 'fs';
import * as path from 'path';

const citiesStr = fs.readFileSync(path.join(__dirname, './cities.json'), {
  encoding: 'utf-8',
});

interface City {
  /** 城市名称（无行政区域级别） */ name: string;
  /** 城市名称 */ fullname: string;
  /** 城市拼音（简拼 或 全拼） */ alias: string;

  /** 行政编号 */ regionId: string;
  /** 行政级别 */ regionType: 'province' | 'city' | 'area';

  /** 所在省 */ province: string;
  /** 所在市 */ city: string;
  /** 所在区县 */ area?: string;

  /** 城市主页 */
  url: string;
}

/**
 * city 城市信息
 * @date 2022.08.10 16:49:00
 */
export const cities = JSON.parse(citiesStr) as City[];

/**
 * d
 */
export const regions = () => {
  let x = './poi';
  import(x).then(({ pois }: any) => {});
};
