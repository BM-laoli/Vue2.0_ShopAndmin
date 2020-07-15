import http from '../../plugins/http'

export const getBusinessListPublic =  options => {
  let result =  http.get('/rest/public_shop_base/all',{params:options}); 
  return result 
};

export const getPersinalData =  options => {
  let result =  http.get('/rest/peronale',{params:options}); 
  return result
};
