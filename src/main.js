import Vue from 'vue'
import App from './App.vue'
import uView from 'uview-ui'
import store from './store/index.js'
import router from './router'

import i18n from './i18n'
// #ifndef VUE3
Vue.use(router)
Vue.use(uView)

App.mpType = 'app'
Vue.config.productionTip = false

// let instance = null
// 页面渲染
function render({ container } = {}) {
  new Vue({
    store,
    i18n,
    async mounted() {
      await this.$store.dispatch('chain/account/load')
    },
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}
// const app = new Vue({
//   store,
//   i18n,
//   async mounted() {
//     await this.$store.dispatch('chain/account/load')
//     console.log(this.$store, 'this.$store')
//   },
//   render: h => h(App)
// })
// app.$mount()
render()
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
