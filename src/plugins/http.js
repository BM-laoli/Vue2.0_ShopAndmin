// 注意，由于这个阿里佰秀的服务器没有登录tokne的校验功能！！！不必设置拦截器
import axios from 'axios' 
import Vue from 'vue'


const http  = axios.create( {
  baseURL:'http://localhost:3000'
} )




// 请求拦截 两个错误
http.interceptors.request.use((config) => {
    return config;
  },
  (err) => {
    console.log(err)
    return Promise.reject(err);
  }
  );

// 拦截调请求

//我们在这里全局捕获错误，进行统一的错误处理,定义一个拦截器,response
http.interceptors.response.use(res => {
  return res
  // 什么情况下 是会跑去err?只要不是正常的状态码
}, err => {
  if (err.response.data.message) {
      Vue.prototype.$message({
          type: 'error',
          message: err.response.data.message
      })
  }
  // 这里我们约定一个规则，有错就放回一个message,这个message里的就是我们要回显式的信息
  // console.log(err.response.data.message);
  // 我们把讯息挂在到vue原行上,message是ele-ui上的一个方法，可以弹出一些错误讯息 
  if(err.response.status === 401){ 
     router.push('/login')
      
  }

  return Promise.reject(err)
})

export default http