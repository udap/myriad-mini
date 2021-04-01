import http from '../utils/http'

export const queryIntegralPage = data => {
  return http({
    url: '/certificates',
    data
  })
}
