import http from '../../plugins/http';

// 查询用户
export const getUserList = () => {
  return http.get('/promote/getPromoteList');
};

// 根据字段查询用户
export const findUser = (params) => {
  return http.get('/promote/getPromoteListByName', { params });
};

// 根据用户id查询所有推广信息
export const getShopListById = (params) => {
  return http.get(`/promote/getPromoteMessage?id=${params.id}`);
};

// 根据字段查询推广人具体推广信息
export const getPromoteByName = (params) => {
  return http.get('/promote/getPromoteMessageByName', { params });
};

// 获取参数设置
export const getParamsList = () => {
  return http.get('/api/cuz/paramsList');
};

// 保存参数设置
export const saveParamsSetting = (data) => {
  return http.post('/api/cuz/saveParams', data);
};
