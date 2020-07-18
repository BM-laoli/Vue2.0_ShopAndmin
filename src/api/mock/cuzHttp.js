import http from '../../plugins/http';
import { Nesthttp } from '../../plugins/http';

// 查询用户
export const getUserList = () => {
    return Nesthttp.get('/promote/getPromoteList');
};

// 根据字段查询用户
export const findUser = (params) => {
    return Nesthttp.get('/promote/getPromoteListByName', { params });
};

// 根据用户id查询所有推广信息
export const getShopListById = (params) => {
    return Nesthttp.get(`/promote/getPromoteMessage?id=${params.id}`);
};

// 根据字段查询推广人具体推广信息
export const getPromoteByName = (params) => {
    return Nesthttp.get('/promote/getPromoteMessageByName', { params });
};

// 获取参数设置
export const getParamsList = () => {
    return http.get('/api/cuz/paramsList');
};

// 保存参数设置
export const saveParamsSetting = (data) => {
    return http.post('/api/cuz/saveParams', data);
};
