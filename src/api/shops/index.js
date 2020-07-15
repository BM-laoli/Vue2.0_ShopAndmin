import http from '../../plugins/http'

export const updateRight = data => {
  return http.post('/rest/public_right', data)
}