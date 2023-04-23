import store from '@/store/index.js'
import util from '@/utils/util.js'
import { ENABLE_SSO, SSO_MODE, SSO_LOGIN_URL, SSO_LOGOUT_URL } from '@/constant'
/**
 *  跳转到登录/或退出登录
 * @param {*} next
 * @param {*} redirect
 * @param {*} directLogin
 */
function toLogin(next, redirect, directLogin = false) {
  if (ENABLE_SSO) {
    const url = directLogin ? SSO_LOGIN_URL : SSO_LOGOUT_URL
    // TODO:如果有地址替换,在这里处理
    if (SSO_MODE === 'iframe') { // iframe方式
      uni.$e.route({ type: 'redirectTo',
        url: `/pages/ifame/index?url=${url}` })
    } else {
      uni.$e.route({ type: 'redirectTo',
        url: `/pages/ifame/index?url=${url}` })
    }
  } else {
    let url = next
    console.log(next, 'next')
    if (util.isNotEmpty(next)) {
      url = 'next'
    } else {
      url = '/pages/login/index'
    }
    uni.$e.route({ type: 'redirectTo',
      url: url })
  }
}
/**
 * 登出
 * @param {*} next
 * @param {*} to
 */
export function exitLogout(next, to, directLogin = false) {
  // 前台登出
  store.dispatch('chain/account/fedLogout').then(() => {
    toLogin(next, to, directLogin)
  }).catch((err) => {
    console.error(err)
    toLogin(next, to, directLogin)
  })
}

/**
 * 前端强制登出
 * @param {*} callback
 */
export function fedLogout(callback) {
  // 前台登出
  store.dispatch('ibps/account/fedLogout').then(() => {
    callback()
    toLogin()
  }).catch((err) => {
    console.error(err)
    callback()
    toLogin()
  })
}

