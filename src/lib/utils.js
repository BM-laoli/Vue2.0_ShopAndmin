// 规范说明====> 我们使用，这个东西去做规范 对于拿到vm实例，如果有任何实例上的操作，我们都丢到vm上
// import vm from '@/main'
import Vue from 'vue'
import moment from 'moment'

const REG_CHECK_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const REG_CHECK_MOBLIE = /^[1][3,4,5,7,8][0-9]{9}$/

// 表单验证器
export let checkEmail = (rule, value, callback) => {
    if (REG_CHECK_EMAIL.test(value)) {
        return callback()
    } else {
        callback(new Error('请输入正确的邮箱'))
    }
}

export let checkMoblie = (rule, value, callback) => {
    if (REG_CHECK_MOBLIE.test(value)) {
        return callback()
    } else {
        callback(new Error('请输入正确的手机'))
    }
}


// 通用删除确认提示框
export let deleteMessage = async(options) => {

    let { value, cb } = options

    let confirmResult = await Vue.prototype.$confirm(value, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).catch((err) => { err })

    // 如果点击了确认 返回的值是 confirm
    // 如果点击了取消 返回的值是 cance
    if (confirmResult !== 'confirm') {
        Vue.prototype.$message({
            type: 'info',
            message: '已取消删除'
        });
    } else {
        Vue.prototype.$message({
            type: 'success',
            message: '删除成功!'
        });

        cb()
    }
}

// 时间格式化 使用第三方的插件
Vue.prototype.datefomate = (value,dateStyle) => {
    return moment(value).format(dateStyle)
}