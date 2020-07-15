// 引入mockjs
import Mock from 'mockjs'
// 引入模板函数类
import ratings from './modules/ratings'
import businiess from './modules/lsz'
// import businiess from './modules/lsz'
// console.log(businiess);
import cuz from './modules/cuz'
import orders from './modules/order'
import prodcut from './modules/product'
import zjc from './modules/zjc'

// Mock函数
const { mock } = Mock

// 设置延时
Mock.setup({
  timeout: 400,
})

// 使用拦截规则拦截命中的请求，mock(url, post/get, 返回的数据);
mock(/\/api\/ratings\/list/, 'post', ratings.list)
// mock(/\/rest\/public_shop_base\/  all/, 'get', businiess.shonelist)
mock(/\/rest\/peronale/, 'get', businiess.getPersinalData)

// 李仕增的mock数据

// 推广列表请求
mock(/\/api\/cuz\/userList/, 'get', cuz.userList)
mock(/\/api\/cuz\/shopList/, 'get', cuz.shopList)
mock(/\/api\/orders\/orderList/, 'get', orders.orderList)
mock(/\/api\/product\/form/, 'get', prodcut.form)
mock(/\/api\/product\/cateForm/, 'get', prodcut.cateForm)
mock(/\/api\/zjc\/material/, 'get', zjc.materialManag)
mock(/\/api\/zjc\/classMaterial/, 'get', zjc.getMaterialClass)
