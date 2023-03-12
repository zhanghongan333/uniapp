import Request from './request.js'

const baseUrl = 'http://localhost:3000'

// #ifdef APP-PLUS || MP-WEIXIN
// baseUrl = 'http://192.158.31.45'
// #endif

const config = {
  baseUrl: baseUrl
}

// 请求拦截
const reqInterceptor = async options => {
  uni.showLoading({
    title: '加载中...'
  })
  return options
}
// 响应拦截
const resInterceptor = (response, config = {}) => {
  uni.hideLoading()
  const statusCode = response.statusCode
  if (statusCode >= 200 && statusCode < 300) {
    return response.data
  } else if (statusCode === 500) {
    uni.showToast({
      icon: 'none',
      title: '服务器错误'
    })
    return {
      wakaryReqToReject: true, // 判断当前字段是否是reject
      msg: '服务器错误',
      res: response
    }
  } else {
    uni.showToast({
      icon: 'none',
      title: '服务器异常'
    })
    return {
      wakaryReqToReject: true,
      msg: response.data.msg,
      res: response
    }
  }
}

const req = new Request(config, reqInterceptor, resInterceptor)

export default req
