import Taro, { request } from '@tarojs/taro'
import getConfig from '../config'

const { noConsole, baseUrl } = getConfig()

interface OptionsType {
  url?: string,
  data?: any,
  method?: keyof request.method
}

/**
 * 网络请求
 * @param options 请求参数
 * @return promise
 */
function http (options: OptionsType = { method: 'GET', data: {} }) {
  if (!noConsole) {
    console.log(`【 M=${options.url} 】P=${JSON.stringify(options.data)}`)
  }
  return Taro.request({
    url: baseUrl + options.url,
    data: options.data,
    header: {
      'Content-Type': 'application/json'
    },
    method: options.method
  }).then((res) => {
    const { statusCode, data } = res
    if (statusCode >= 200 && statusCode < 300) {
      if (!noConsole) {
        console.log(`【 M=${options.url} 】【接口响应：】`, res.data)
      }
      if (data.status !== 'ok') {
        Taro.showToast({
          title: `${res.data.error.message}~` || res.data.error.code,
          icon: 'none',
          mask: true
        })
      }
      return data
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`)
    }
  }).catch(error => {
    throw new Error(error)
  })
}

export default http
