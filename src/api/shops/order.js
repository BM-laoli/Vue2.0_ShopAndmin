import http from '../../plugins/http'

export const getOrder = (data) => {
  return http.get('/ordermange/getorderlist', { params: data })
}
