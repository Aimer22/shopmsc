import Vue from 'vue'
import VueRouter from 'vue-router'
import jwt from 'jsonwebtoken'

Vue.use(VueRouter)

// 懒加载
const CsLogin = () => import('@/views/CsLogin')
const CsAdmin = () => import('@/views/CsAdmin')
const CsContorl = () => import('@/views/CsControl')
const CsDashBoard = () => import('@/views/CsDashBoard')
const CsEditPass = () => import('@/views/CsEditPass')
const CsNotFound = () => import('@/views/CsNotFound')
const CsProduct = () => import('@/views/CsProduct')
const CsProductcate = () => import('@/views/CsProductcate')

const router = new VueRouter({
  linkActiveClass: 'active',
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: CsLogin },
    {
      path: '/control',
      component: CsContorl,
      meta: {requireAuth: true},
      children: [
        { path: 'dashboard', component: CsDashBoard },
        { path: 'admin', component: CsAdmin },
        { path: 'editpass', component: CsEditPass},
        { path: 'productcate', component: CsProductcate},
        { path: 'product', component: CsProduct},
        { path: '*', component: CsNotFound}
      ]
    },
  ]
})

// 验证meta是否包含requireAuth属性，如果为true则表示需要验证
const checkRequireAuth = to => {
  return to.matched.some( item => item.meta.requireAuth );
}

// 全局前置守卫
router.beforeEach((to, from, next) => {
  console.log(to);
  // 从本地存储得到token授权码
  let token = localStorage.getItem('CS-Token');

  // 默认token无效
  let valid = false;

  //如果token为真
  if( token ){
    try {
      jwt.verify(token, '1030'); // 验证token
      valid = true;              // 标注token有效
    } catch ( err ) {
      console.error( err );
    }
  }

  //是否token有效？
  if ( valid ) {
    if( to.path === '/login' ){
      //如果token有效，当前是登陆页面，那么直接跳转到管理首页
      next('/control')
    }else{
      //如果不是登录页面，然后token又有效，那么直接放行
      next()
    }
  }else{
    if ( checkRequireAuth(to) ) {
      //如果需要登录验证，就直接跳转重新登录
      next('/login');
    }else{
      //不需要需要登录验证，直接放行
      next();
    }
  }
})

export default router
