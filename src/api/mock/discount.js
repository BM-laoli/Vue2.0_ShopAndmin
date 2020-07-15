// 优惠券
import http from '@/plugins/http.js'

// 获取优惠券列表
export const getCouponApi = data => {
  return http({
    method: 'get',
    url: '/rest/coupons',
    params: {
      uid: data
    }
  })
}
// 添加优惠券
export const addCouponApi = (id, data) => {
  return http({
    method: 'post',
    url: '/rest/coupons',
    params: {
      uid: id
    },
    data: {
      name: data.name,
      coupon_price: data.price,
      coupon_limit: data.isPriceRestrict,
      coupon_time: data.time
    }
  })
}

// 修改优惠券
export const updateCouponApi = id => {
  return http({
    method: 'put',
    url: '/rest/coupons',
    params: {
      uid: id
    }
  })
}

export const deleteCouponApi = id => {
  return http({
    method: 'delete',
    url: '/rest/coupons',
    params: {
      uid: id
    }
  })
}

// 查询优惠券
export const detailCoupon = id => {
  return http({
    method: 'get',
    url: '/rest/coupons/single',
    params: {
      uid: id
    }
  })
}