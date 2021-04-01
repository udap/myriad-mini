import http from '../utils/http'

/**
 * 获取兑换记录
 * @param data
 */
export const queryExchangeApi = (data) => {
  return http({
    url: '/certificates',
    data
  })
}

