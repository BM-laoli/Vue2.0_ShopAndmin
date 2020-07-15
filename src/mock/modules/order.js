import Mock from 'mockjs'
var data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'array|10': [
    {
      'id|1': /\d{10}/,
      'name|1': `美佳宜-${Mock.Random.cword(3)}`,
      'orderId|1': /\d{15}/,
      'orderList|2-5': [
        {
          'commodity|1': Mock.Random.cword(3),
          'count|1-100': 1
        }
      ],
      orderTime: Mock.Random.datetime(),
      'total|100-4000': 1,
      'distribution|+1': ['电动车', '汽车', '轮船', '飞机', '人肉配送'],
      address: `${Mock.Random.county(true)} ${Mock.Random.cname()}`,
      'orderStatus|+1': ['已收货', '待发货', '已发货', '申请退款', '已取消']
    }
  ]
})
var detailed = Mock.mock({
  'array|1': [
    {
      'id|1': /\d{10}/,
      'name|1': `美佳宜-${Mock.Random.cword(3)}`,
      'orderId|1': /\d{15}/,
      'orderList|2-5': [
        {
          'commodity|1': Mock.Random.cword(3),
          'count|1-100': 1,
          'orderImg|1': Mock.Random.dataImage('50x50', 'Hello Mock.js!')
        }
      ],
      orderTime: Mock.Random.datetime(),
      'total|100-4000': 1,
      'distribution|+1': ['电动车', '汽车', '轮船', '飞机', '人肉配送'],
      address: `${Mock.Random.county(true)} ${Mock.Random.cname()}`,
      'orderStatus|+1': ['已收货', '待发货', '已发货', '申请退款', '已取消'],
      'packing|1-10': 1,
      'discounts|1-10': 1,
      'coupon|1-20': 1,
      'shippingFee|1-20': 1
    }
  ]
})
var orderStatistics = Mock.mock({
  'data|10': [
    {
      'id|1': /\d{10}/,
      'name|1': `美佳宜-${Mock.Random.cword(3)}`,
      'business|+1': [
        '便利百货',
        '电竞外设',
        '生活用品',
        '家用电器',
        '生鲜水果'
      ],
      'orderCount|1-500': 1,
      'orderTotal|1000-5000': 1,
      'reimburseCount|1-10': 1,
      'affirmReimburse|1-10': 1,
      'reimburseTotal|100-1000': 1
    }
  ]
})
function orderList(res) {
  // res是一个请求对象，包含: url, type, body
  return {
    code: 200,
    data,
    message: '请求成功'
  }
}
function detailedData(res) {
  return {
    code: 200,
    data: detailed,
    message: '请求成功'
  }
}
function calculationData(res) {
  return {
    code: 200,
    data: orderStatistics,
    message: '请求成功'
  }
}

export default {
  orderList,
  detailedData,
  calculationData
}
