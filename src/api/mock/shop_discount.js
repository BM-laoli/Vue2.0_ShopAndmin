import http from '@/plugins/http.js'

export const getShopCouponAPI = () => {
  return http({
    method: 'get',
    url: '/api/rest/shopCoupon'
  })
}