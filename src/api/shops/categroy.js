import http from '../../plugins/http'

export const getAllCategroy = data => {
    return http.get('/shopmanage/shoplist/queryallcategoryto', { params: data })
}
export const getCategroyByName = data => {
    return http.get('​/shopmanage/shoplist/queryPublicCategrory', { params: data })
}
