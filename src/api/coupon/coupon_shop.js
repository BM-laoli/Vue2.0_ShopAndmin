import http from '../../plugins/http'

export const getShopCouponListApi = params => {
  return http({
    method: 'get',
    url: '/coupon/getCouponListShop',
    params
  })
}

export const getQueryShopCouponApi = params => {
  return http({
    method: 'get',
    url: '/coupon/getCouponListShopQuery',
    params
  })
}