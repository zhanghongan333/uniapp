import Request from './request.js'
import Utils from '@/utils/util'
import store from '@/store'
import I18n from '@/utils/i18n' // Internationalization 国际化
// 验权
import { getToken, updateToken, removeRefreshToken } from '@/utils/auth'
import { refreshAccessToken } from '@/api/oauth2/user'
import { HEADER_TOKEN_KEY, ENABLE_SSO, SSO_LOGOUT_URL } from '@/constant'
import requestState from '@/constants/state'
import { BASE_API } from '@/api/baseUrl'
const baseUrl = 'http://lcvpn.f3322.net:3380/v355_singel'
// http://lcvpn.f3322.net:3380/v353_singel
// 'https://192.168.3.230:20000/gateway/ibps'

// #ifdef APP-PLUS || MP-WEIXIN
// baseUrl = 'http://192.158.31.45'
// #endif

// 是否正在刷新的标记
let isRefreshing = false

// 取消请求
let cancelRequest = false

let cancelRequestTime = 0
// 重试队列，每一项将是一个待执行的函数形式
let requests = []
console.log(BASE_API())
const config = {
  baseUrl: baseUrl
}

const defaultAllowStates = [
  requestState.SUCCESS,
  requestState.WARNING,
  requestState.WARN
]

// 请求拦截
const reqInterceptor = async options => {
  options.baseUrl = BASE_API()
  console.log(options)
  uni.showLoading({
    title: '加载中...'
  })
  options.headers = {}
  options.headers[HEADER_TOKEN_KEY] = getToken()
  return options
}
// 响应拦截
const resInterceptor = (response, config = {}) => {
  uni.hideLoading()
  // console.log(response, config, 'resInterceptor')
  if (config.type === 'none' && config.type === 'arraybuffer' && config.type === 'blob') {
    return response
  }
  // 判断是否直接返回数据
  const directReturn = Utils.toBoolean(config.directReturn)
  if (directReturn) {
    return response
  }
  const resData = response.data
  const { state, message } = resData
  if (state === undefined) {
    showErrorMessage(`接口异常，接口未返回[state]参数</br>接口地址:${config.url}`)
    return response
  }
  const allowStates = [...new Set(defaultAllowStates.concat(config.allowStates || []))]
  // state为200是正确的请求  或者  验证码问题,或者警告类型的错误 自行处理
  if (allowStates.includes(state)) {
    return resData
  }
  // 处理刷新tonken问题,说明token过期了,刷新token
  if (state === requestState.TOKEN_EXPIRED) {
    if (!isRefreshing) {
      isRefreshing = true
      return refreshAccessToken().then(res => {
        const data = res.data
        updateToken(data)
        const token = getToken()
        config.headers[HEADER_TOKEN_KEY] = token
        // 已经刷新了token，将所有队列中的请求进行重试
        requests.forEach(cb => cb(token))
        requests = []
        return req(config)
      }).catch(res => {
        console.error('refreshtoken error =>', res)
        removeRefreshToken()
        uni.$e.route({ type: 'redirectTo',
          url: `/pages/login/index` })
      }).finally(() => {
        isRefreshing = false
      })
    } else {
      return new Promise(resolve => {
        requests.push((token) => {
          config.headers[HEADER_TOKEN_KEY] = token
          resolve(req(config))
        })
      })
    }
  } else if (state === requestState.ILLEGAL_TOKEN ||
    state === requestState.OTHER_CLIENTS) {
    if (!cancelRequest) {
      cancelRequest = false
      const nowTime = Date.now()
      // 防止添加重复的时间，当添加间隔小于1000ms时，则取消判断
      if (cancelRequestTime + 1000 > nowTime) {
        return
      }
      cancelRequestTime = nowTime
      store.dispatch('chain/account/fedLogout').then(() => {
        cancelRequest = true
        // 退出到登录页
        if (ENABLE_SSO) {
          uni.$e.route({ type: 'redirectTo',
            url: `/pages/ifame/index?url=${SSO_LOGOUT_URL}` })
        } else {
          uni.$e.route({ type: 'redirectTo',
            url: '/pages/login/index' })
        }
      })
    }
    return Promise.reject(new Error(message))
  } else if (state === requestState.ILLEGAL_ACCOUNT_EXPIRED_CREDENTIALS || state === requestState.ILLEGAL_ACCOUNT_LENGTH_NOT_MEET_REQUIREMENTS) {
    // 密码过期，跳转密码过期页面
    uni.$e.route({ type: 'redirectTo',
      url: '/pages/reset/index' })
    return Promise.reject(resData)
  } else {
    const errData = handleErrorMessage(response)
    showErrorMessage(errData.message)
    const err = new Error(errData.message)
    err.state = errData.state
    err.cause = errData.cause
    err.data = errData.data || {}
    return Promise.reject(err)
  }
  // if (state >= 200 && state < 300) {
  //   return resData
  // } else if (state === 500) {
  //   uni.showToast({
  //     icon: 'none',
  //     title: '服务器错误'
  //   })
  //   return {
  //     wakaryReqToReject: true, // 判断当前字段是否是reject
  //     msg: '服务器错误',
  //     res: response
  //   }
  // } else {
  //   uni.showToast({
  //     icon: 'none',
  //     title: '服务器异常'
  //   })
  //   return {
  //     wakaryReqToReject: true,
  //     msg: response.data.msg,
  //     res: response
  //   }
  // }
}
// 错误请求
const failHandler = async(error) => {
  uni.hideLoading()
  await httpErrorStatusHandle(error)
  return Promise.reject(error)
}
// 处理各种状态错误请求
function httpErrorStatusHandle(error) {
  let errorMsg = ''
  if (error && error.message && error.message.includes('Network')) {
    uni.getNetworkType({
      success: (res) => {
        const isConnected = true
        if (res.networkType === 'none') {
          this.isConnected = false
        } else {
          this.isConnected = true
        }
        errorMsg = isConnected ? I18n.t('error.network') : I18n.t('error.networkOff')
        showErrorMessage(errorMsg)
      }
    })
  } else if (error && error.message && error.message.includes('timeout')) {
    errorMsg = I18n.t('error.timeout')
    showErrorMessage(errorMsg)
  } else {
    const errData = handleErrorMessage(error.response)
    errorMsg = errData.message
    showErrorMessage(errorMsg)
  }
}

// 处理错误消息
export function handleErrorMessage(response) {
  let errorState
  let errorMsg = ''
  let errorCause = ''
  if (!response) {
    errorMsg = '服务器君开小差了，请稍后再试'
    errorState = 500
    errorCause = errorMsg
    return {
      state: errorState,
      message: errorMsg,
      cause: errorCause
    }
  }
  if (response.data) {
    const config = response.config || {}
    let resData = response.data || {}
    if (config.responseType === 'arraybuffer' || config.responseType === 'blob') {
      try {
        const enc = new TextDecoder('utf-8')
        resData = JSON.parse(enc.decode(new Uint8Array(resData))) // 转化成json对象
      } catch (e) { console.error(e) }
    }
    if (resData.status) {
      errorState = resData.status
    } else {
      errorState = resData.state
      errorMsg = resData.message
      errorCause = resData.cause
    }
    if (Utils.isNotEmpty(errorMsg)) { // 有错误消息
      errorMsg = Utils.isNotEmpty(errorCause) ? I18n.t('error.messageCause', {
        message: errorMsg,
        cause: errorCause
      }) : I18n.t('error.message', {
        message: errorMsg
      })
    } else if (Utils.isNotEmpty(errorCause)) { // 只有错误原因
      errorMsg = I18n.t('error.cause', {
        cause: errorCause
      })
    } else if (I18n.te('error.status.' + errorState)) { // 有错误编码
      errorMsg = I18n.t('error.status.' + errorState, {
        url: config.url
      })
    } else { // 未知状态
      errorMsg = errorMsg || I18n.t('error.unknown', {
        errorState
      })
    }
  } else {
    errorState = response.status
    errorMsg = response.statusText
    if (I18n.te('error.status.' + errorState)) {
      const config = response.config || {}
      errorMsg = I18n.t('error.status.' + errorState, {
        url: config.url
      })
    } else {
      errorMsg = errorMsg || I18n.t('error.unknown', {
        state: errorState
      })
    }
  }
  return {
    state: errorState,
    message: errorMsg,
    cause: errorCause,
    data: response.data || {}
  }
}

// 显示错误消息
export function showErrorMessage(errorMsg) {
  errorMsg = errorMsg !== null ? ('' + errorMsg).replace(/<\/?br\/?>/ig, '\n').replace(/<[^>]+>/g, '') : ''
  uni.showToast({
    icon: 'none',
    title: errorMsg
  })
}

const req = new Request(config, reqInterceptor, resInterceptor, null, failHandler)

export default req
