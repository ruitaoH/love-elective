import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import fastclick from 'fastclick'
fastclick.attach(document.body)

// 引入全局样式
import 'common/stylus/index.styl'

// 移动端适配
document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
