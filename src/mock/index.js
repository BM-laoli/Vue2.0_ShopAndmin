// 引入mockjs
import Mock from 'mockjs'
// 引入模板函数类
import ratings from './modules/ratings'
import hwm from './modules/hwm'
import businiess from './modules/lsz'
import cuz from './modules/cuz'
import orders from './modules/order'
import prodcut from './modules/product'
import shop_discount from './modules/shop_discount'
import zjc from './modules/zjc'
import tsl from './modules/tsl'

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
mock(/\/api\/rest\/shopCoupon/, 'get', shop_discount.getShopCouPonList)

mock(/\/rest\/peronale/, 'get', businiess.getPersinalData)
mock(/\/rest\/peronale\/gethehe/, 'get', businiess.getpaersonalCousData)
// 李仕增的mock数据

// 推广列表请求
mock(/\/api\/cuz\/userList/, 'get', cuz.userList)
mock(/\/api\/cuz\/shopList/, 'get', cuz.shopList)
mock(/\/api\/orders\/orderList/, 'get', orders.orderList)
mock(/\/api\/orders\/detailedData/, 'get', orders.detailedData)
mock(/\/api\/orders\/calculationData/, 'get', orders.calculationData)
mock(/\/api\/product\/form/, 'get', prodcut.form)
mock(/\/api\/product\/cateForm/, 'get', prodcut.cateForm)
mock(/\/api\/zjc\/material/, 'get', zjc.materialManag)
mock(/\/api\/zjc\/classMaterial/, 'get', zjc.getMaterialClass)
mock(/\/api\/tsl\/finance/, 'get', tsl.finance)