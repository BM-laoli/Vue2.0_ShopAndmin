import http from '../../plugins/http'

export const getMaterial = (params) => {
  return http.get('/api/zjc/material')
}

export const getclassMaterial = (params) => {
  return http.get('/api/zjc/classMaterial')
}
