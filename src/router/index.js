import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/Auth/CloudAuth'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/Auth/CloudLogin')
      },
      {
        path: 'reg',
        name: 'Reg',
        component: () => import('@/views/Auth/CloudReg')
      }
    ]
  },
  {
    path: '/',
    // redirect: '/cloud_home',
    component: () => import('@/views/Main'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home/CloudHome')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 获取 token
  store.commit('user/getToken')
  // 获取 user
  store.commit('user/getUser')

  const isToken = store.state.user.token
  const toLogin = to.path.indexOf('/auth') > -1
  let isNext = true

  // 无token并且非登录页面
  if (!isToken && !toLogin) {
    // 强制前往登录
    isNext = { name: 'Login' }
  } else if (isToken && toLogin) {
    // 已登录无法前往登录页面
    isNext = false
  }

  next(isNext)
})

export default router
