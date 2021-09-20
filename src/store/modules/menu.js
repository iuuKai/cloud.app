// import api from '@/utils/api'
// import router from '@/router'
// import Cookie from 'js-cookie'

export default {
  namespaced: true,
  state: () => ({
    menuList: [
      { title: '首页', path: '' },
      { title: '应用', path: '' },
      { title: '测试', path: '' }
    ]
  }),
  mutations: {
    addMenu (state, item) {
      state.menuList.push(item)
    },
    removeMenu (state, item) {
      const index = state.menuList.findIndex(({ title }) => title === item)
      state.menuList.splice(index, 1)
    }
  },
  actions: {
  }
}
