import http from '../../plugins/http'

export const getMaterial = (params) => {
  return http.get('/material/getStyleList', params)
}

export const getclassMaterial = (params) => {
  return http.get('/api/zjc/classMaterial')
}
