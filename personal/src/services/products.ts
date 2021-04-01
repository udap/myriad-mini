import http from '../utils/http'

/**
 * 获取商品详情
 * @param id 商品id
 */
export const getProductInfoApi = (id) => {
  return http({
    url: `/products/${id}`
  })
}
