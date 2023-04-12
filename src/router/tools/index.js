import store from '@/store/index.js'
import router from '@/router'
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
      window.top.location.href = url
    } else {
      window.location.href = url
    }
  } else {
    const nextPath = {
      name: 'login'
    }
    if (redirect) {
      nextPath['query'] = {
        redirect
      }
    }
    if (next) {
      next(nextPath)
    } else {
      router.push(nextPath)
    }
  }
}
/**
 * 登出
 * @param {*} next
 * @param {*} to
 */
export function exitLogout(next, to, directLogin = false) {
  // 前台登出
  store.dispatch('ibps/account/fedLogout').then(() => {
    toLogin(next, to.fullPath, directLogin)
  }).catch((err) => {
    console.error(err)
    toLogin(next, to.fullPath, directLogin)
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

