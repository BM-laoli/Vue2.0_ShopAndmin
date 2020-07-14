// 引入随机函数
import { Random } from 'mockjs'
// 引入Mock
import Mock from 'mockjs'

// 商户详情
let shopbaselist =  Mock.mock( 
  {
    'data|6-15':[ 
      {"_id|+1" : 1,
      " shop_name|1 ":'美佳宜',
      "shop_level_name|1":'保利店',
      " industry|1 ":'行业1',
       " address|1 ":"岳麓区保利保利保利保利保利保利波阿里",
       "phone|1":1837661755,
       "t_id |2-3":"464a81",
     "leval|1":['一级权限','二级权限','三级权限'],
      "many|500-2000.1-2":1,
      }
    ]
  }
)

function getShopBaseList (res) {
  // res是一个请求对象，包含: url, type, body
  return {
    code: 200,
    data: shopbaselist,
    message: '请求成功'
  }
}


// 数据白标个人分析
Random.clast()
let personalData = Mock.mock({
  'data|10':[
    {

      '_id|+1':1,
      'username|3':'@clast()',
      'phone':/^1[3456789]\d{9}$/,
      'business_district|100-200':100,
      'order|100-200':100,
      'consumption|100-200':100,
      'frequency|5-15':100,
    }
  ]
})  

function getPersinalData(res) {
  return {
    code: 200,
    data: personalData,
    message: '请求成功'
  }
}

export default {getShopBaseList,getPersinalData}