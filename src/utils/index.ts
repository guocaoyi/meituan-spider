import readline from 'node:readline'

export * from './monitor'

/**
 * sleep
 * @param {number} ms 毫秒
 * @return {Promise<void>}
 */
export const sleep = async (ms: number): Promise<void> =>
  new Promise((resolve) => {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      resolve()
    }, ms)
  })

/**
 * repl question & system.in
 * @param {string} asks question
 * @param {number} timeout timeout(s); default = 30s
 * @return {Promise<string | void>}
 */
export const question = (asks: string, timeout = 30): Promise<string | void> =>
  new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    rl.question(`${asks}\n`, (answer) => {
      rl.write('Ans:')
      resolve(answer)
      rl.close()
    })

    // timeout and reject
    let timer = setTimeout(() => {
      rl.close()
      clearTimeout(timer)
      reject('timeout')
    }, timeout * 1000)
  })

/**
 *
 * @param {string} str
 * @param {number} start
 * @param {number} end
 */
export const decrease = (str: string, start: number, end: number) => {
  //
}
