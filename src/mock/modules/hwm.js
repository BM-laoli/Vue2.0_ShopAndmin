// 引入Mock
const Mock = require('mockjs')

const listData = Mock.mock({
  'data|20': [{
    'id|+1': 100,
    name: '@ctitle',
    'price|1-100': 1,
    'priceRestrict|1': ['', '1元', '30元'],
    'time|1': ['1天', '7天', '15天', '30天', ''],
    'countRestrict|1': ['', '1张', '2张', '3张'],
    'count|1-100': 1,
  }]
})

const getCouponData = Mock.mock({
  'data|1': [{
    'id|1000-2000': 1,
    name: '@ctitle',
    'price|1-100': 1,
    'priceRestrict|1': ['', '1元', '30元'],
    'time|1': ['1天', '7天', '15天', '30天', ''],
    'countRestrict|1': ['', '1张', '2张', '3张'],
    'count|1-100': 1,
  }]
})

function list(res) {
  return {
    code: 200,
    data: listData.data,
    message: '请求成功'
  }
}

// 添加优惠券
function addCouPon(res) {
  return {
    code: 200,
    message: '请求成功'
  }
}

// 更新优惠券
function updateCoupon(res) {
  return {
    code: 200,
    message: '更新成功'
  }
}

// 查询优惠券
function getCoupon(res) {
  return {
    code: 200,
    data: getCouponData.data,
    message: '获取成功'
  }
}

// 删除优惠券
function deleteCoupon(res) {
  return {
    code: 200,
    message: '删除成功'
  }
}


export default {
  list,
  addCouPon,
  updateCoupon,
  getCoupon,
  deleteCoupon
}