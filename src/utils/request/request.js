import { requestConfig } from './requestConfig.js'

export default class Request {
  constructor(config = {}, reqInterceptor = null, resInterceptor = null, successHandler = null, failHandler = null,
    completeHandler = null) {
    this.baseUrl = config.baseUrl
    this.header = config.header || {
      'Content-Type': 'application/json;charset=UTF-8'
    }
    this.success = successHandler
    this.fail = failHandler
    this.complete = completeHandler

    // 请求拦截
    this.requestInterceptor = reqInterceptor
    this.responseInterceptor = resInterceptor
  }

  async request(options, successHandler = null, failHandler = null, completeHandler = null) {
    const task = options.task || false
    const type = options.type || 'request'
    // 删除任务
    let config = null

    try {
      config = await requestConfig(this, options, successHandler, failHandler, completeHandler)
    } catch (e) {
      return Promise.reject(e)
    }

    if (!config || typeof config !== 'object') {
      return Promise.reject({})
    }

    const that = this
    if (task) {
      config['success'] = (response) => {
        if (that.responseInterceptor) {
          this.responseInterceptor(response, config)
        }
        that.success && that.success(response)
        successHandler && successHandler(response)
      }
      config['fail'] = (response) => {
        that.fail && that.fail(response)
        failHandler && failHandler(response)
      }
      config['complete'] = (response) => {
        that.complete && that.complete(response)
        completeHandler && that.completeHandler(response)
      }

      if (type === 'request') {
        return uni.request(config)
      } else if (type === 'upload') {
        return uni.uploadFile(config)
      } else {
        return uni.downloadFile(config)
      }
    }
    return new Promise((resolve, reject) => {
      config['success'] = (response) => {
        let _res = null
        if (that.responseInterceptor) {
          _res = that.responseInterceptor(response, config)
        }
        that.success && that.success(response)
        successHandler && successHandler(response)

        if (_res.wakaryReqToReject) {
          delete _res.wakaryReqToReject
          reject(_res)
        } else {
          resolve(_res)
        }
      }
      config['fail'] = (error) => {
        that.fail && that.fail(error)
        failHandler && failHandler(error)
        reject(error)
      }

      config['complete'] = (response) => {
        that.complete && that.complete(response)
        completeHandler && completeHandler(response)
      }
      console.log(config)
      if (type === 'request') {
        return uni.request(config)
      } else if (type === 'upload') {
        return uni.uploadFile(config)
      } else {
        return uni.downloadFile(config)
      }
    })
  }
}
