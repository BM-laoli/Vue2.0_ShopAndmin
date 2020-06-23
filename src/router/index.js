import Vue from 'vue'
import VueRouter from 'vue-router'
// 开始业务逻辑
const login = () => import('../views/login')
const home = () => import('../views/layout')
const welcome = () => import('../views/home/welcome')




Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect:'home'
  },
  {
    path:'/login',
    name:'login',
    component:login
  },
  {
    path:'/home',
    name:'home',
    component:home,
    children:[
      {
        path: '/',
        redirect:'/home/welcome',
      },
      {
        path: '/home/welcome',
        name: 'welcome',
        component:welcome,
        meta:{levelOne:'站点统计',levelTow:''},
      },
    ]
  },
  

]

// 解决路由重复报错

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}


const router = new VueRouter({
    routes,
})


// 路由拦截方案1
// 这个方案是保存了token，在下次访问的时候去拿这个token判断就好了，有的就放行，没令牌的就不放行
router.beforeEach( (to,from,next)  => {
    if( to.path === '/login' ){
      return next()
    }
    // 注意，在服务器上，使用的是打标识的方式，如果我们登录了，服务器就记住我们，然后给我们
    // 返回一个字符串 ‘ var isLogin = true; var userId=id   || var isLogin = false  ’
    const status = window.sessionStorage.getItem('status')
    
    if( top.path === '/login' ) { return next('/home') }
    if( !status || to.path === '/login' ){
        return next('/login')
    }  
    next()
} )


// 路由拦截方案2 给路由打标签，如果是pubinc就公开的，允许访问，否则就需要验证
// 这里不纤细的列举出来 

export default router
