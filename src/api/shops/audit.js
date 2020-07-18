import http from '../../plugins/http'
import { Nesthttp } from '../../plugins/http'

// mock数据
export const updateRight = data => {
  return http.post('/rest/public_right', data)
}
export const getRight = data => {
  return http.get('/rest/public_right', data)
}

// 线上数据
export const getShopAudit = params => {
  return Nesthttp.get('/shopmanage/shoplist', params)
}
export const searchShopAudit = params => {
  return Nesthttp.get('/shopmanage/shoplist/queryinfo', params)
}
export const shopAuditDetail = id => {
  return Nesthttp.get(`/shopmanage/shoplist/queryinfobyid?id=${id}`)
}
export const passShopAudit = (id, query) => {
  return Nesthttp.put(`/shopmanage/shoplist/queryshopstatus?id=${id}`, query)
}