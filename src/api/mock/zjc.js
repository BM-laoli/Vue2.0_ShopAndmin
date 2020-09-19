import http from '../../plugins/http'

export const getMaterial = (params) => {
  return http.get('/material/getStyleList', { params })
}

export const getclassMaterial = (params) => {
  return http.get('/api/zjc/classMaterial')
}

export const createStyleQuery = (data) => {
  return http.post('/material/createStyleQuery', data)
}
export const getStyleQuery = (params) => {
  return http.get('/material/getStyleQuery', { params })
}
export const getStyleEdit = (id, data) => {
  return http.put(`/material/getStyleEdit?id=${id}`, data)
}
