import http from '../../plugins/http'
import { Nesthttp } from '../../plugins/http'

export const getMaterial = (params) => {
  return Nesthttp.get('/material/getStyleList', { params })
}

export const getclassMaterial = (params) => {
  return Nesthttp.get('/api/zjc/classMaterial')
}

export const createStyleQuery = (data) => {
  return Nesthttp.post('/material/createStyleQuery', data)
}
export const getStyleQuery = (params) => {
  return Nesthttp.get('/material/getStyleQuery', { params })
}
export const getStyleEdit = (id, data) => {
  return Nesthttp.put(`/material/getStyleEdit?id=${id}`, data)
}
