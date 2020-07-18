import http from '../../plugins/http'
import { Nesthttp } from '../../plugins/http'

export const getAllCategroy = data => {
    return Nesthttp.get('/shopmanage/shoplist/queryallcategoryto', { params: data })
}
export const getParentCategroy = data => {
    return Nesthttp.get('/shopmanage/shoplist/queryallcategory', { params: data })
}
export const getCategroyByName = data => {
    return Nesthttp.get('/shopmanage/shoplist/queryPublicCategrory', { params: data })
}
export const addOneCategroy = data => {
    return Nesthttp.post('/shopmanage/shoplist/createOneProductCategtoy', data)
}
//子分类
export const selectTowCategroy = id => {
    return Nesthttp.get(`/shopmanage/shoplist/queryCategrorytobyfather?id=${id}`)
}