import http from '../../plugins/http'

// 获取所有店铺列表
export const getShopList = (data) => {
  return http.get('/shopmanage/shoplist', {
    params: data
  })
}
// 根据商铺id查询商铺详情
export const getShopDetail = (id) => {
  return http.get('/shopmanage/shoplist/queryinfobyid', {
    params: {
      id
    }
  })
}
// 根据商铺id查询该商铺经营分析
export const getAnalysis = id => {
  return http.get('/shopmanage/shoplist/queryjinyin', {
    params: {
      id
    }
  })
}
// 根据商铺id查询该商铺的商品列表
export const getProductById = data => {
  return http.get('/shopmanage/shoplist/queryproduct', {
    params: data
  })
}
// 获取所有商铺的商品列表
export const getProductList = (data) => {
  // return http.get('/rest/products/byid', {
  //   params: data
  // })
  console.log('2321', data);
  return http.get('/shopmanage/shoplist/getallproduct', {
    params: data
  })
}

// 获取所有商品类别
export const getProductType = () => {
  return http.get('/rest/product/type')
}

// 根据商品信息查询商品
export const getProductByName = (form) => {
  return http.get('/rest/product/byname', {
    params: form
  })
}