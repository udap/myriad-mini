import http from '../utils/http'

/**
 * 获取首页礼品
 * @param params 分页参数
 * @returns
 */
export const getHomeGifts = (params) => {
  return http({
    url: '/gifts',
    data: Object.assign(
      {},
      {
        q: 'watchlist',
      },
      params
    ),
  })
}
