import http from '../../plugins/http'

export const getUserList = (params) => {
    return http.get('/api/cuz/userList')
}

export const getShopListById = (params) => {
    return http.get(`/api/cuz/shopList/${params.id}`)
}
