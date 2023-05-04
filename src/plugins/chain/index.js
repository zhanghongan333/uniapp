import '@/components'
// 平台配置文件
import { BASE_URL } from '@/constant'
import env from '@/env'
export default {
  async install(Vue, options) {
    // 设置为 false 以阻止 vue 在启动时生成生产提示。
    // https://cn.vuejs.org/v2/api/#productionTip
    Vue.config.productionTip = false
    // 当前环境
    Vue.prototype.$nodeEnv = env.NODE_ENV
    // 当前环境变量
    Vue.prototype.$env = env

    // 当前的 baseUrl 简化代码中 env.VUE_APP_PUBLIC_PATH 取值
    Vue.prototype.$baseUrl = BASE_URL
  }
}
