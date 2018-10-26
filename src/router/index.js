import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

const Index =()=>import('@/view/index')
const Login =()=>import('@/view/login')
const bin =()=>import('@/view/bin')

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta:{
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/bin',
      name: 'bin',
      component: bin,
    },
    {
      path: '**',   // 错误路由
      redirect: '/'   //重定向
    },
  ]
})

router.beforeEach((to, from, next)=>{
  if (to.matched.some(record => record.meta.requireAuth)){  // 判断该路由是否需要登录权限
     
     if (store.state.token) {  // 判断当前的token是否存在
       next();
     }
     else {
       next({
         path: '/login',
         query: {redirect: to.fullPath}  // 将跳转的路由path作由为参数，登录成功后跳转到该路
       })
     }
   }
   else {
     next();
   }
})

export default router