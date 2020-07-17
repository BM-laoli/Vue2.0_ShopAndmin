import http from '../../plugins/http'

// 获取所有的共享商圈数据
export const getBusinessListPublic =  options => {
  let result =  http.get('/shopmanage/shoplist',{params:options}); 
  return result 
};

export const getPersinalData =  options => {
  let result =  http.get('/rest/peronale',{params:options}); 
  return result
};

// 获取所有行业
export const getPersinaCategrory =  options => {
  let result =  http.get('/shopmanage/shoplist/queryallindustry',{params:options}); 
  return result
};

// 查询所有行业根据指定字段
export const getPersinaCategroryByQueryinfo =  options => {
  let result =  http.get('/shopmanage/shoplist/queryinfo',{params:options}); 
  return result
};
