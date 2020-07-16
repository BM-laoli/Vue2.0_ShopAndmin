// 01 引入moke
import Mock from 'mockjs'
let financeList = Mock.mock(
  {
    'data|20': [
      {
        'id|+1': 1,
        "type|1": ['店铺提现', '用户提现'],
        "shopName": "@cname",
        "userName": "@cname",
        "orderNumber|10000-50000": 50000,
        "money|10000-50000": 50000,
        "ordertime": "@datetime",
        "state|1": ['待处理', '已提现'],
        "time": "@datetime",
        "remake|1": ['棒棒哒', '老板好', '牛逼', '今天发财了']
      }
    ]
  }
)

function finance(res) {
  // res是一个请求对象，包含: url, type, body
  return {
    code: 200,
    data: financeList.data,
    message: '请求成功',
    total: 20,
    pagesize: 10,
    pagenum: 10

  }
}
export default { finance }
