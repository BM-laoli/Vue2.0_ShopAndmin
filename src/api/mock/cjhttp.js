import { Nesthttp } from '../../plugins/http'
console.log('Nesthttp', Nesthttp);
// 获取所有店铺列表
export const getShopList = (data) => {
  console.log('shoplist');
  return Nesthttp.get('/shopmanage/shoplist', {
    params: data
  })
}
// 获取所有行业
export const getAllIndustry = () => {
  return Nesthttp.get('/shopmanage/shoplist/queryallindustry')
}
// 根据商铺名和行业查询商铺ju
export const getIndustry = (form) => {
  console.log('hhh');
  return Nesthttp.get('/shopmanage/shoplist/queryinfo', {
    params: form
  })
}
// 根据商铺id查询商铺详情
export const getShopDetail = (id) => {
  return Nesthttp.get('/shopmanage/shoplist/queryinfobyid', {
    params: {
      id
    }
  })
}
// 根据商铺id查询该商铺经营分析
export const getAnalysis = id => {
  return Nesthttp.get('/shopmanage/shoplist/queryjinyin', {
    params: {
      id
    }
  })
}
// 根据商铺id查询该商铺的商品列表
export const getProductById = data => {
  return Nesthttp.get('/shopmanage/shoplist/queryproduct', {
    params: data
  })
}
// 获取所有商铺的商品列表
export const getProductList = (data) => {
  // return Nesthttp.get('/rest/products/byid', {
  //   params: data
  // })
  console.log('2321', data);
  return Nesthttp.get('/shopmanage/shoplist/getallproduct', {
    params: data
  })
}

// 获取所有商品一级分类
export const getProductType1 = () => {
  return Nesthttp.get('/shopmanage/shoplist/queryallcategory')
}

// 获取所有商品二级分类
export const getProductType2 = () => {
  return Nesthttp.get('/shopmanage/shoplist/queryallcategoryto')
}

// 根据商品信息查询商品
export const getProductByName = (form) => {
  return Nesthttp.get('/shopmanage/shoplist/queryallprodut', {
    params: form
  })
}