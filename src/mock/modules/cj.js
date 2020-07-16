// 引入Mock
const Mock = require('mockjs')

// 根据商铺id获取该商铺的商品列表
const productList = Mock.mock({
  "data|5": [{
    "uid|1000000-9999999": 1,
    'productId|100-1000': 1,
    'shopname': '保利店',
    "productType": "食品/肉类",
    "name": "大猪蹄子500g",
    "images": ["http://img4.imgtn.bdimg.com/it/u=7306521,1141497139&fm=26&gp=0.jpg", "http://img1.imgtn.bdimg.com/it/u=149624683,68321136&fm=26&gp=0.jpg", "http://img5.imgtn.bdimg.com/it/u=3428073971,1612252162&fm=26&gp=0.jpg"
    ],
    "description": "这是一只，非常美味的大猪蹄子",
    "cost|1-100": 2,
    "o_price|1-100": 15,
    "price|1-100": 16,
    "stock|1-100": 66,
    "active": {
      "is_active": false,
      "second_kill|1": false,
      "kill_limit": 4,
      "kill_price": 14,
      "kill_time": "09:00:00-21:00:00",
      "is_discount|1": true,
      "discount_price": 0.8,
      "is_first": true
    },
    "is_temporary|1": false,
    "is_temporary_time": "09:00:00-21:00:00",
    "is_recommed|1": true,
    "is_hot|1": true,
    "is_discount|1": true,
    "month_sales|50-100": 45,
    "month_price|1000-10000": 4500,
    "total_sales|100-1000": 333,
    "total_price|1000-10000": 66300,
    "is_public|1-5": false,
    "parent": "5ee83cae21335a4c6810d497"
  }]
})

function productListc(res) {
  return {
    code: 200,
    data: productList.data,
    message: '获取推广店铺成功',
    total: 20,
    size: 10,
    earnings_count: 20000,
    shopCount: 20,
  }
}

export default {
  productListc
}