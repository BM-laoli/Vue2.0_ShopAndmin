import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutation'
import actions from './actions'
import getters from './getters'

// 模块
import moduleA from './modules/modules'

// 安装
Vue.use(Vuex)


// 使用
const store = new Vuex.Store({
    state: {
        loading: false
    },
    mutations,
    actions,
    getters,
    modules: {
        a: moduleA,
    }
})

// 倒出
export default store