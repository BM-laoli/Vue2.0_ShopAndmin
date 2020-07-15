import http from '../../plugins/http'

export const testMock = options => {
  let result = http.post('/api/ratings/list');
  return result
};

export const industryData = options => {
  let result = http.get('/api/product/form');
  return result
};
export const categroyData = options => {
  let result = http.get('/api/product/cateForm');
  return result
};

export const orderMock = (options) => {
  let result = http.get('/api/orders/orderList')
  return result
}

export const detailedMock = (options) => {
  let result = http.get('/api/orders/detailedData')
  return result
}
export const calculationMock = (options) => {
  let result = http.get('/api/orders/calculationData')
  return result
}
