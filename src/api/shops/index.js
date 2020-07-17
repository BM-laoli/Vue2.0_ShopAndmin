import http from '../../plugins/http'

export const updateRight = data => {
  return http.post('/rest/public_right', data)
}
export const getRight = data => {
  return http.get('/rest/public_right', data)
}
export const getShopAudit = params => {
  return http.get('/shopmanage/shoplist', params)
}
export const searchShopAudit = params => {
  return http.get('/shopmanage/shoplist/queryinfo', params)
}
export const shopAuditDetail = id => {
  return http.get(`/shopmanage/shoplist/queryinfobyid?id=${id}`)
}
export const passShopAudit = (id, query) => {
  return http.put(`/shopmanage/shoplist/queryshopstatus?id=${id}`, query)
}