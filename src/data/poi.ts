import * as fs from 'fs';
import * as path from 'path';

import type { City } from '../types';

const citiesStr = fs.readFileSync(path.join(__filename, './cities.json'), {
  encoding: 'utf-8',
});

/**
 * city 城市信息
 */
export const cities = JSON.parse(citiesStr) as City[];
