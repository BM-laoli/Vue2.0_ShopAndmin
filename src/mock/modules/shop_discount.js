const Mock = require('mockjs')


function getShopCouPonList () {
  return {
    code: 200,
    message: '获取成功',
    data: Mock.mock({
      'data|10-20': [{
        'id|+1': 100,               // 店铺id
        shop_name: '@CTITLE',       // 店铺名称
        coupon_name: '@CTITLE',     // 优惠券名称
        'coupon_price|1-100': 1,    // 优惠券金额
        'price_limit|1': ['', '1元', '30元'], //使用金额限制
        'coupon_day|1': ['1天', '7天', '15天', '30天', ''], //使用时限
        'coupon_count|1-100': 1,   //发放总数量
      }]
    })
  }
}

export default {
  getShopCouPonList
}