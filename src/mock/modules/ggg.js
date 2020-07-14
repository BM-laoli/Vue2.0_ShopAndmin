// 使用 Mock
var Mock = require('mockjs')
var data = Mock.mock({
  "array|10": [
    {
      // 店铺编号
      "shop_num|1000000-9999999": 100,
      // 店铺名称
      "shop_name": '@ctitle(3, 5)',
      // 店铺行业
      "shop_type": '@csentence(3, 5)',
      // 店铺地址
      "shop_address": '@county(true)',
      // 联系电话
      "shop_phone": /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/,
      // 推广人ID
      "shop_id": '@zip()',
      // 状态
      "shop_state": '待审核',
      // 备注
      "shop_com": '审核备注'
    }
  ]
})
// 输出结果
// console.log(JSON.stringify(data, null, 4))
export default data