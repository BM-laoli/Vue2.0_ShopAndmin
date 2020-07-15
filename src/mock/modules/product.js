const Mock = require('mockjs');
const { Random } = require('mockjs');
const industry = Mock.mock({
    "array|5": [
        {
            uname: () => Random.cword(2),
            uid: () => Random.increment(100)
        }
    ]
})
const categroy = Mock.mock({
    "array|5": [
        {
            cateName: () => Random.cword(2),
            cateId: () => Random.increment(100),
            'children|5': [{
                cateName: () => Random.cword(2),
                cateId: () => Random.increment(200),
                cateChildNum: () => Random.increment(2),
            }]
        }
    ]
})
function form(res) {
    // res是一个请求对象，包含: url, type, body
    return {
        code: 200,
        data: industry.array,
        message: '请求成功'
    }
}
function cateForm(res) {
    // res是一个请求对象，包含: url, type, body
    return {
        code: 200,
        data: categroy.array,
        message: '请求成功'
    }
}

export default { form, cateForm }