import axios from 'axios';

import type { AxiosRequestConfig } from 'axios';

/**
 * sleep (promise)
 * @param {number} ms 毫秒
 */
export const sleep = async (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

/**
 * get
 *
 * @param {string} path
 */
export const get = <R extends unknown>(
  path: string,
  opts?: AxiosRequestConfig<unknown>
) => {
  axios.defaults.headers.get['x-budibase-api-key'] = '';

  return axios.get<R>(`${path}`, opts);
};
