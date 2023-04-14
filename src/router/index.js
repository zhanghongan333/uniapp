import route from './route'
import { getToken, getRefreshToken } from '@/utils/auth'
// 处理登出
import { exitLogout } from './tools/index'
import store from '@/store/index.js'
import util from '@/utils/util.js'
// 配置白名单
const whiteList = [
  '/pages/login/index',
  '/pages/ifame/index'
]

function handleLogout(next, to, directLogin = false) {
  exitLogout(next, to, directLogin)
}
const handleOverwirteRoute = () => {
  // 重写switchTab、navigateBack
  const methodToPatch = ['switchTab', 'navigateBack']
  methodToPatch.map((type) => {
    // 通过遍历的方式分别取出，uni.switchTab、uni.navigateBack
    // 并且对相应的方法做重写
    const original = uni[type]
    uni[type] = function(options = {}) {
      const { url: path } = options
      console.log(getToken(), '2')
      if (!whiteList.includes(path) && !getToken()) {
        // 判断是否存在token，不存在重定向到登录页
        uni.$e.route({ type: 'redirectTo',
          url: '/pages/login/index' })
      } else {
        return original.call(this, options)
      }
    }
  })
}

const install = function(Vue, options) {
  uni.$e = { route }
  Vue.prototype.route = route
  // 重写uni方法
  handleOverwirteRoute()
  // 路由拦截器
  uni.$e.routeIntercept = async(routeConfig, resolve) => {
    const path = routeConfig.url.split('?')[0]
    // 当前页面
    // eslint-disable-next-line no-undef
    const pages = getCurrentPages()
    const hasToken = getToken()
    console.log(path, pages, 'pages')
    if (hasToken && hasToken !== 'undefined') {
      if (path === '/pages/login/index') {
        uni.$e.route({ type: 'redirectTo',
          url: '/views/layout/layout' })
        return
      } else if (path === '/pages/locking/index') {
        resolve(true)
      } else {
        // 在免登录白名单，直接进入
        if (whiteList.includes(path)) {
          resolve(true)
        } else if (util.isEmpty(store.getters.userInfo)) {
          store.dispatch('chain/user/load').then(res => {
            resolve(true)
          }).catch((e) => [
            store.dispatch('chain/account/fedLogout').then(() => {
              uni.$e.route({ type: 'redirectTo',
                url: '/pages/login/index' })
              resolve(true)
            }).catch((err) => {
              console.error(err)
            })
          ])
        } else {
          resolve(true)
        }
      }
    } else {
      const refreshToken = getRefreshToken()
      if (util.isNotEmpty(refreshToken)) {
        // 刷新token
        await store.dispatch('chain/account/refreshToken').then((response) => {
          if (util.isNotEmpty(response)) {
            resolve(true)
          }
        }).catch(e => {
          handleLogout(pages, routeConfig.url)
        })
      } else {
        // 在免登录白名单，直接进入
        if (whiteList.includes(path)) {
          resolve(true)
        } else {
          handleLogout(pages, routeConfig.url, true)
        }
      }
    }
    // if (!whiteList.includes(path) && !getToken()) {
    //   uni.$e.route({ type: 'redirectTo',
    //     url: '/pages/login/index' })
    //   return
    // }
  }
}
export default {
  install
}
