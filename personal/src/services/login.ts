import http from '../utils/http'

/**
 * 手机号码登录
 */
export const mobileLogin = (data) => {
  return http({
    url: '/public/wxAccounts/login',
    method: 'POST',
    data,
  })
}

/**
 * 刷新token
 * @returns promise
 */
export const refreshToken = () => {
  return http({
    url: '/auth/refresh_token',
  })
}
