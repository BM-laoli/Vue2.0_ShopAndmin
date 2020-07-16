import { Random } from 'mockjs'
const Mock = require('mockjs')

const materialManage = Mock.mock({
  'data|10': [
    {
      name: () => Random.cname(),
      image: () => Random.image('200x100'),
      sort1: () => Random.cname(),
      price: () => Random.increment(100),
      date: () => Random.date(),
    },
  ],
})
const classMaterialManage = Mock.mock({
  'data|1-10': [
    {
      'id|+1': 1,
      label: '@CNAME',
      'children|1-3': [
        {
          'id|+1': 10,
          label: '@CNAME',
        },
      ],
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

function getMaterialClass(res) {
  return {
    code: 200,
    message: '获取成功',
    data: classMaterialManage.data,
  }
}

export default {
  materialManag,
  getMaterialClass,
}
