import { refreshToken } from './../services/login'
import { request, showModal, redirectTo } from '@tarojs/taro'
import BaseConfig from '../config'
import { setToken, getToken } from './storage'

interface OptionsType {
  url?: string
  data?: any
  method?: keyof request.method
}

let timer: any

/**
 * 网络请求
 * @param options 请求参数
 * @return promise
 */
function http(options: OptionsType = { method: 'GET', data: {} }) {
  const { noConsole, baseUrl } = BaseConfig
  const token = getToken()
  clearTimeout(timer)
  if (!noConsole) {
    console.log(`【 M=${options.url} 】P=${JSON.stringify(options.data)}`)
  }
  const requestOption = {
    url: baseUrl + options.url,
    data: options.data,
    header: {
      'accept-language': 'zh-cn,zh;q=0.5',
      'Content-Type': 'application/json',
    },
    method: options.method,
  }

  if (token) {
    requestOption.header['X-ACCESS-TOKEN'] = token
  }

  return request(requestOption)
    .then((res) => {
      const { statusCode, data, header } = res
      // 请求成功!
      if (statusCode >= 200 && statusCode < 300) {
        const _token = header['X-ACCESS-TOKEN'] || header['x-access-token']
        if (_token) {
          setToken(_token)
        }
        if (!noConsole) {
          console.log(`【 M=${options.url} 】【接口响应：】`, res.data)
        }
        return data
      } else if (statusCode === 401) {
        // 重新授权
        if (token) {
          // 延迟3秒 重新授权
          timer = setTimeout(() => {
            refreshToken()
          }, 3000)
        } else {
          showModal({
            title: '提示',
            content: '登录超时，请重新登录！',
            showCancel: false,
          }).then(() => {
            redirectTo({ url: '/pages/login/index' })
          })
        }
      } else if (statusCode === 404) {
        showModal({
          title: '提示',
          content: '网络连接错误，请稍后再试！',
          showCancel: false,
        })
      } else {
        throw new Error(`网络请求错误，状态码${statusCode}`)
      }
    })
    .catch((error) => {
      throw new Error(error)
    })
}

export default http
