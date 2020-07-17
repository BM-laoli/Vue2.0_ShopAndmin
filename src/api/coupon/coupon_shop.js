import { Nesthttp } from '../../plugins/http'

export const getShopCouponListApi = params => {
  return Nesthttp({
    method: 'get',
    url: '/coupon/getCouponListShop',
    params
  })
}

export const getQueryShopCouponApi = params => {
  return Nesthttp({
    method: 'get',
    url: '/coupon/getCouponListShopQuery',
    params
  })
}