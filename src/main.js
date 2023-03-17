import Vue from 'vue'
import App from './App.vue'
import uView from 'uview-ui'
import store from './store/index.js'

import i18n from './i18n'
// #ifndef VUE3
Vue.use(uView)
App.mpType = 'app'
Vue.config.productionTip = false

const app = new Vue({
  store,
  i18n,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
