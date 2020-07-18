import http from '../../plugins/http'

export const getFinanceList = params => {
  let result = http.get('/api/tsl/finance');
  return result
}
export const getFinanceListById = (params) => {
  return http.get(`/api/tsl/finance/${params.id}`)
}
