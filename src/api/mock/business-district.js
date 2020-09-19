import http from '../../plugins/http'
// 获取所有的共享商圈数据
export const getBusinessListPublic = options => {
  let result = http.get('/shopmanage/shoplist', { params: options });
  return result
};

export const getPersinalData = options => {
  let result = http.get('/rest/peronale', { params: options });
  return result
};

// 获取所有行业
export const getPersinaCategrory = options => {
  let result = http.get('/shopmanage/shoplist/queryallindustry', { params: options });
  return result
};

// 查询所有行业根据指定字段
export const getPersinaCategroryByQueryinfo = options => {
  let result = http.get('/shopmanage/shoplist/queryinfo', { params: options });
  return result
};


// 获取所有个人商圈列表
export const getPersinaBusinessList = options => {
  let result = http.get('business/Consumptionrecording', { params: options })
  return result
}

// 根据字段查询个人商圈数据
export const getConsumpPersonQuery = options => {
  let result = http.get('business/ConsumpPersonQuery', { params: options })
  return result
}

// 根据id获取数据分析
export const getConsumpPersonById = options => {
  let result = http.get('business/ConsumpPersonById', { params: options })
  return result
}
