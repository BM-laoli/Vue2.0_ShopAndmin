import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from './plugins/http'


Vue.use( ElementUI )

// 演示初始化
import './assets/sass/style.scss'
// ele样式配置


// 自定义命名空间,请在这个项目下 放在全局的资源或者库
import {deleteMessage} from './lib/utils'
Vue.prototype.name_space = { 
    deleteMessage
}

// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
Vue.use(VueQuillEditor, /* { default global options } */)


// http
Vue.prototype.$http = http


// filter
import './filters/LSZ-text-abbreviation'

// mock
import '@/mock'

// animateCSS
import animated from 'animate.css'

// ecahrs
import Echarts from 'echarts'
Vue.prototype.$echarts = Echarts

Vue.use(animated)
Vue.config.productionTip = false
const vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

export default vm

