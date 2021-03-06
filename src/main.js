// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import store from './store'
import router from './router'
import VueScroller from 'vue-scroller'
// import VueI18n from 'vue-i18n'
// // import ElementUI from 'element-ui'
// // import 'element-ui/lib/theme-chalk/index.css'
// // Vue.use(ElementUI)
// Vue.use(VueI18n)

Vue.config.productionTip = false

const app = new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  data: {
    eventHub: new Vue(),
    user: {
      avatar: 'https://cdn.xingkwh.com/%E6%8A%96%E4%B8%AA%E8%B5%9E%E9%BB%98%E8%AE%A4%E5%A4%B4%E5%83%8F.png',
      nickname: '未登录',
      score: 0,
      price: 0,
      need_deal_num: 0,
      username: null,
      user_id: null,
      phone: null,
      min_num: 0,
      credit_num: 300
    },
    noticeDown: null,
    notice: '',
    must_info: null,
    channel: '老用户',
    serverCache: {
      service_ratio: 0.2,
      ret: []
    }
  }
})

export function getuser() {
  if (!app) {
    return false
  }
  return app.user.username
}

export function getapp() {
  if (!app) {
    return {}
  }
  return app
}

export function getEventHub() {
  if (!app) {
    return false
  }
  return app.eventHub
}
export function loading(loading) {
  if (!app) {
    return false
  }
  app.eventHub.$emit('loading', loading)
}
