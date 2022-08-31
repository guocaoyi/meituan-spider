import process from 'node:process'

import { monitoringTool } from './utils'
import { MeishiEnum } from './types'

process.on('uncaughtException', (err, origin) => {
  //
  monitoringTool(err)
})

process.on('uncaughtExceptionMonitor', (err, origin) => {
  //
})

process.on('unhandledRejection', (reason, promise) => {
  //
  console.log('Undandled Rejection at:', promise, 'reason:', reason)
})

process.on('beforeExit', () => {
  //
})
