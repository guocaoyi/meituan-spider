#!/usr/bin/env node

import process from 'node:process'
import args from 'args'

args
  .option('port', 'The port', 3000)

  //
  .option('biz', '搜索店铺类型，默认搜索茶饮', 'yp')

  // store
  .option('sort', '搜索排序类型，默认按距离', 2)
  .option('limit', '限制')
  .option('timeout', '单次滚动事件超时（单位：秒）', 10)
  .option('pnumber', '店铺页搜索页数（默认页 10 条，滚动页 20 条）', 1)
  .option('range', 'POI 搜索圈范围（单位：米）, 0 - 2000 m', 1000)

/**
 * env
 */
const env = args.parse(process.argv)

args.showHelp()
