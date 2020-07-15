// 引入mockjs
import Mock from 'mockjs'
// 引入模板函数类
import ratings from './modules/ratings'
import hwm from './modules/hwm'

// Mock函数
const { mock } = Mock

// 设置延时
Mock.setup({
  timeout: 400
})

// 使用拦截规则拦截命中的请求，mock(url, post/get, 返回的数据);
mock(/\/api\/ratings\/list/, 'post', ratings.list)
mock(/\/api\/rest\/coupons/, 'post', hwm.addCouPon)
mock(/\/api\/rest\/coupons\/single/, 'get', hwm.getCoupon)
mock(/\/api\/rest\/coupons/, 'get', hwm.list)
mock(/\/api\/rest\/coupons/, 'put', hwm.updateCoupon)
mock(/\/api\/rest\/coupons/, 'delete', hwm.deleteCoupon)
