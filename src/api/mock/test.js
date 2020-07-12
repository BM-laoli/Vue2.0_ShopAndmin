import http from '../../plugins/http'

export const testMock =  options => {
  let result =  http.post('/api/ratings/list'); 
  return result 
};

