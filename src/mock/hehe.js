// 引入Mock
const Mock = require('mockjs')

// 根据商铺id获取该商铺的商品列表
const productList = Mock.mock({


  uid: "5ee77d61ca8c9a7398261dc7",
  shop_name: "美佳宜",
  shop_level_name: "保利店",
  phone: 18376621755,
  industry: "航天制造业",
  saleSituation: {
    total_order: 1234,
    total_money: 3425789,
    start_date: "2019-07-14T03:13:17.821Z",
    end_date: "2020-07-14T03:13:17.821Z",
    shopType: {
      '男装|1-1000.1-10': 100,
      '女装|1-1000.1-10': 20,
      '男鞋|1-1000.1-10': 151,
      '女鞋|1-1000.1-10': 4541
    }
  },
  consumSituation: {
    '模板费|1-1000.1-10': 100.0,
    '素材费|1-1000.1-10': 200.0,
    '收益费|1-1000.1-10': 300.0
  }

})



