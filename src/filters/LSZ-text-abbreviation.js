// 全局过滤器
import Vue from 'vue';

/**
 * 文本的过滤器
 * @param  { value,agr1,arg2 } '顾虑的值，大于几的时候要被过滤，要截取多少个'
 * @param  {}
 */
Vue.filter('reduceText', (value, agr1, arg2) => {
    if (value.length >= agr1) {
        return value.slice(0, arg2) + '...';
    }
});

// 去掉返回数据里images的_id键值对
export const filterImg = (records) => {
  records.forEach((v) => {
    let imgs = v.image
    let arr = []

    for (var k in imgs) {
      if (!(k === '_id')) {
        arr.push(imgs[k])
      }
    }
    console.log(arr, '1123123')
    return (v.image = arr)
  })
}

// 商铺字段的过滤器，要过滤的参数放在第一个，,
Vue.filter('totalFilter', (value, agr1, arg2) => {
  let arr = value.filter((v) => {
    return v[agr1] == arg2
  })

  return arr.length
})

// 计数器计算和
Vue.filter('copTotal', (value, agr1) => {
  // return value.reduce( ( pre,next)=>{ return pre. },0 )
})

// 时间格式化过滤器
Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
