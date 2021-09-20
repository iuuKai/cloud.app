import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 第三方
import ElementUI from 'element-ui'
import api from '@/utils/api'
import qs from 'qs'

// 全局配置
import '@/assets/scss/reset.scss'
import '@/assets/scss/common.scss'
import 'element-ui/lib/theme-chalk/index.css'
// 图标库
import 'font-awesome/css/font-awesome.css'

// 全局实例属性
Vue.prototype.$api = api
Vue.prototype.$qs = qs

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
