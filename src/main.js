import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载ele组件库
import 'element-ui/lib/theme-chalk/index.css';
// import ElementUI from 'element-ui';
// Vue.use( ElementUI )
import './plugins/element-ui'



// 演示初始化
import './assets/sass/style.scss'

// 自定义命名空间,请在这个项目下 放在全局的资源或者库
import { deleteMessage } from './lib/utils'
Vue.prototype.name_space = {
  deleteMessage
}


// filter
import './filters/LSZ-text-abbreviation'
import './filters/date-dispose'
import './filters/order-filters'

// mock
import '@/mock'

// animateCSS
import animated from 'animate.css'
Vue.use(animated)



Vue.config.productionTip = false
const vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

export default vm

