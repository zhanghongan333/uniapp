import Vue from 'vue'
import App from './App.vue'
import uView from 'uview-ui'
import store from './store/index.js'
import router from './router'
import i18n from './i18n'
import utils from './utils/util' // utils 帮助类
import '@/assets/fonts/ibps-icon.scss'
import chain from './plugins/chain'
import formGrid from './business/platform/form/dynamic-form/form-grid'
import formItem from './business/platform/form/dynamic-form/form-item'
import formField from './business/platform/form/dynamic-form/form-field'
import switchEnvironment from './views/system/switch-environment'
Vue.component('form-grid', formGrid)
Vue.component('form-item', formItem)
Vue.component('form-field', formField)
Vue.component('switch-environment', switchEnvironment)
// #ifndef VUE3
Vue.use(chain)

Vue.use(router)
Vue.use(uView)

Vue.prototype.$utils = utils
Vue.config.productionTip = false

// let instance = null
// 页面渲染
function render({ container } = {}) {
  new Vue({
    store,
    i18n,
    ...App,
    async created() {
      // 加载接口配置
      await this.$store.dispatch('chain/api/load')
    },
    async mounted() {
      await this.$store.dispatch('chain/account/load')
    }
  }).$mount(container ? container.querySelector('#app') : '#app')
}

Vue.config.productionTip = false

App.mpType = 'app'

render()
// const app = new Vue({
//   store,
//   i18n,
//   ...App
// })
// app.$mount() // 挂载 Vue 实例
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

// #endif

// #ifdef VUE3
// import { createSSRApp } from 'vue'
// export function createApp() {
//   const app = createSSRApp(App)
//   return {
//     app
//   }
// }
// #endif
