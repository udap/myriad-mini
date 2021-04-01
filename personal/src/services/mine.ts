import http from '../utils/http'

/**
 * 我的关注分页
 * @param data
 */
export const queryMineFollowApi = (data) => {
  return http({
    url: '/accounts/me/watchlist',
    data
  })
}
