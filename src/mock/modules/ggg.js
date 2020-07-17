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
var ruleForm = Mock.mock({
  ruleForm: {
    right1: {
      "all_public_num|100-999": 100,
      "price|100-999": 100,
      "cheapPrice|100-999": 100,
      level: 1
    },
    right2: {
      "all_public_num|100-999": 100,
      "price|100-999": 100,
      "cheapPrice|100-999": 100,
      "level": 2
    },
    right3: {
      "all_public_num|100-999": 100,
      "price|100-999": 100,
      "cheapPrice|100-999": 100,
      level: 3
    },
  },
})
// 输出结果
// console.log(ruleForm)
export default ruleForm