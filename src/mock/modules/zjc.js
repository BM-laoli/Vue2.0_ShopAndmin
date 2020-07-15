import { Random } from 'mockjs'
const Mock = require('mockjs')

const materialManage = Mock.mock({
  'data|10': [
    {
      name: () => Random.cname(),
      image: () => Random.image('200x100'),
      sort: () => Random.cname(),
      sort1: () => Random.cname(),
      price: () => Random.increment(100),
      date: () => Random.date(),
    },
  ],
})

function materialManag(res) {
  return {
    code: 200,
    data: materialManage.data,
    message: '获取成功',
    total: 20,
    size: 10,
  }
}

export default {
  materialManag,
}
