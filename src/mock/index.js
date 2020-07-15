// 引入mockjs
import Mock from 'mockjs'
// 引入模板函数类
import ratings from './modules/ratings'
import orders from './modules/order'

// Mock函数
const { mock } = Mock

// 设置延时
Mock.setup({
  timeout: 400
})

// 使用拦截规则拦截命中的请求，mock(url, post/get, 返回的数据);
mock(/\/api\/ratings\/list/, 'post', ratings.list)
mock(/\/api\/orders\/orderList/, 'get', orders.orderList)
mock(/\/api\/orders\/detailedData/, 'get', orders.detailedData)
mock(/\/api\/orders\/calculationData/, 'get', orders.calculationData)
