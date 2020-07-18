import { Nesthttp } from '../../plugins/http'
export const getOrder = (data) => {
  return Nesthttp.get('/ordermange/getorderlist', { params: data })
}
