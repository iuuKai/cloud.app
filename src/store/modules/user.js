import api from '@/utils/api'
import router from '@/router'
import Cookie from 'js-cookie'

export default {
  namespaced: true,
  state: () => ({
    user: null,
    token: ''
  }),
  mutations: {
    setUser (state, val) {
      state.user = val
      Cookie.set('user', JSON.stringify(val), { expires: 1 })
    },
    getUser (state) {
      if (Cookie.get('user')) {
        state.user = JSON.parse(Cookie.get('user'))
      }
    },
    clearUser (state) {
      state.user = ''
      Cookie.remove('user')
    },
    setToken (state, val) {
      state.token = val
      Cookie.set('token', val, { expires: 1 })
    },
    getToken (state) {
      state.token = Cookie.get('token')
    },
    clearToken (state) {
      state.token = ''
      Cookie.remove('token')
    }
  },
  actions: {
    // 发送验证码
    sendCode ({ state, getters, commit, dispatch }, params) {
      return new Promise((resolve, reject) => {
        api.user.sendCode(params).then(res => {
          const { status, data: { eid, data, msg } } = res
          if (status === 200 && eid === 200) {
            resolve(data)
          } else {
            reject(msg)
          }
        })
      })
    },
    // 注册
    userRegister ({ state, getters, commit, dispatch }, params) {
      return new Promise((resolve, reject) => {
        api.user.register(params).then(res => {
          const { status, data: { eid, data, msg } } = res
          if (status === 200 && eid === 200) {
            resolve(data)
          } else {
            reject(msg)
          }
        })
      })
    },
    // 登录
    userLogin ({ state, getters, commit, dispatch }, params) {
      return new Promise((resolve, reject) => {
        api.user.login(params).then(res => {
          const { status, data: { eid, data, msg } } = res
          if (status === 200 && eid === 200) {
            commit('setUser', data)
            // 无 token
            commit('setToken', data.phone)
            // 路由跳转
            router.push({ name: 'Home' })
            resolve(data)
          } else {
            reject(msg)
          }
        })
      })
    }
  }
}
