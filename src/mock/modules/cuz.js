// 引入随机函数
import { Random } from 'mockjs';
// 引入Mock
const Mock = require('mockjs');

// 用户列表
const userListData = Mock.mock({
    'data|10': [
        {
            id: () => Random.id(),
            nickName: () => Random.cword('零一二三四五六七八九十', 3),
            phone: () => Random.integer(11111111111, 99999999999),
            tgCount: () => Random.integer(0, 200),
            earnings: () => Random.float(2000, 10000, 0, 2),
        },
    ],
});

function userList(res) {
    return {
        code: 200,
        data: userListData.data,
        message: '获取成功',
        total: 20,
        size: 10,
        user_count: 20,
        shop_count: 20,
    };
}

// 店铺列表
const shopListData = Mock.mock({
    'data|10': [
        {
            shop_id: () => Random.id(),
            shop_name: () => Random.cword('零一二三四五六七八九十', 3),
            address: () => Random.city(true),
            shop_tel: () => Random.integer(11111111111, 99999999999),
            open_date: () => Random.date(),
            earnings: () => Random.float(2000, 10000, 0, 2),
        },
    ],
});
function shopList(res) {
    return {
        code: 200,
        data: shopListData.data,
        message: '获取推广店铺成功',
        total: 20,
        size: 10,
        earnings_count: 20000,
        shopCount: 20,
    };
}

// 参数获取
const paramsListData = Mock.mock({
    'data|2': {
        shop_money: () => Random.integer(0, 100),
        user_money: () => Random.integer(0, 100),
    },
});

function paramsList() {
    return {
        code: 200,
        data: paramsListData.data,
        message: '获取参数设置成功',
    };
}

// 参数设置
function saveParams(data) {
    return {
        code: 200,
        data: data,
        message: '保存参数设置成功',
    };
}

export default {
    userList,
    shopList,
    paramsList,
    saveParams,
};
