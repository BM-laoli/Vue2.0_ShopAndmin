import moment from 'moment'

import Vue from 'vue'

Vue.filter('timer', (value, layout) => {
  return moment(value).format(layout)
})

Vue.filter('orderStatus', (value) => {
  switch (value) {
    case 0:
      return '待支付'
    case 1:
      return '已支付,待配送'
    case 2:
      return '待发货'
    case 3:
      return '已发货,待收货'
    case 4:
      return '已收货'
    case 5:
      return '确认收货'
    case 6:
      return '申请退款'
    case 7:
      return '已退款'
    case 9:
      return '订单完成'
    default:
      return '已取消'
  }
})
