interface BaseConfigFace {
  noConsole: boolean
  baseUrl: string
  appId: string
}

const BaseConfig: BaseConfigFace = {
  noConsole: false,
  baseUrl: '',
  appId: 'wx822e3baec6b94400',
}

if (process.env.NODE_ENV === 'development') {
  BaseConfig.noConsole = false
  BaseConfig.baseUrl = 'https://points.xinongtech.com/support'
} else {
  BaseConfig.baseUrl = 'https://points.xinongtech.com/prod'
  BaseConfig.noConsole = true
}

export default BaseConfig
