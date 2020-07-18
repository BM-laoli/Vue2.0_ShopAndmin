import {Nesthttp} from '../../plugins/http'

// 获取所有订单
export const getOrder = (data) => {
  return Nesthttp.get('/ordermange/getorderlist', { params: data })
}

// 修改订单的状态
export const changeOrderStatus = (id, v) => {
  return Nesthttp.put(`/ordermange/editOrderStatus/?id=${id}`, {
    package: v
  })
}

// 获取所有的店铺名称及id
export const getAllShopList = () => {
  return Nesthttp.get('/shopmanage/shoplist')
}

// 根据id获取店铺下面所有的商品信息
export const getProducts = (id) => {
  return Nesthttp.get(`/shopmanage/shoplist/queryproduct?id=${id}`)
}

// 增加手工单
export const addOrder = (data) => {
  return Nesthttp.post('/ordermange/createOrder', data)
}

// 根据id获取订单的所有数据
export const getOrderData = (id) => {
  return Nesthttp.get(`/ordermange/getOrderById?id=${id}`)
}

// 根据状态获取不同数据
export const getOrderByStatus = (data) => {
  return Nesthttp.get('/ordermange/queryStatus', {
    params: data
  })
}
