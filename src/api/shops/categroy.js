import http from '../../plugins/http'

export const getAllCategroy = data => {
  return http.get('/shopmanage/shoplist/queryallcategoryto', { params: data })
}
export const getParentCategroy = data => {
  return http.get('/shopmanage/shoplist/queryallcategory', { params: data })
}
export const getCategroyByName = data => {
  return http.get('/shopmanage/shoplist/queryPublicCategrory', { params: data })
}
export const addOneCategroy = data => {
  return http.post('/shopmanage/shoplist/createOneProductCategtoy', data)
}
//子分类
export const selectTowCategroy = id => {
  return http.get(`/shopmanage/shoplist/queryCategrorytobyfather?id=${id}`)
}