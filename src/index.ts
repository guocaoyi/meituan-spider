import process from 'node:process'
import args from 'args'

import { monitoringTool } from './utils'

args
  .option(['port', 'p'], 'The port', 3000)
  .option(['reload', 'r'], 'Enable')
  .option(['serve', 's'], 'Enable')

const flags = args.parse(process.argv)

process.on('uncaughtException', (err, origin) => {
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
