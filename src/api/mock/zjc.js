import http from '../../plugins/http'

export const getMaterial = (params) => {
  return http.get('/api/zjc/material')
}
