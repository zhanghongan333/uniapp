import Vue from 'vue'
import App from './App.vue'
import uView from 'uview-ui'
import store from './store/index.js'

Vue.use(uView)
App.mpType = 'app'
Vue.config.productionTip = false

const app = new Vue({
  store,
  ...App
})
app.$mount()
