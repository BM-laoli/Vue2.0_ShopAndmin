import http from '../../plugins/http'

// 获取所有商铺的商品列表
export const getProductList = () => {
  return http.get('/rest/products/byid')
}