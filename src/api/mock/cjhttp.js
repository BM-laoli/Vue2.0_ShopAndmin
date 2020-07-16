import http from '../../plugins/http'

// 获取所有商铺的商品列表
export const getProductList = (data) => {
  return http.get('/rest/products/byid', {
    params: data
  })
  // return http.get('/shopmanage/shoplist/getallproduct', {
  //   params: data
  // })
}

// 获取所有商品类别
export const getProductType = () => {
  return http.get('/rest/product/type')
}

// 根据商品信息查询商品
export const getProductByName = (form) => {
  return http.get('/rest/product/byname', {
    params: data
  })
}