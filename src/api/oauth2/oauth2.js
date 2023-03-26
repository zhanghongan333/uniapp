
import { OAUTH2_URL } from '@/api/baseUrl'
import { merge } from 'lodash'
import request from '@/utils/request'

const GRANT_TYPE = 'authorization_code'
var AccessToken = function(data) {
  if (!(this instanceof AccessToken)) {
    return new AccessToken(data)
  }
  this.data = data
}
/*!
 * 检查AccessToken是否有效，检查规则为当前时间和过期时间进行对比
 *
 * Examples:
 * ```
 * token.isValid();
 * ```
 */
AccessToken.prototype.isValid = function() {
  return !!this.data.access_token && (new Date().getTime()) < (this.data.create_at + this.data.expires_in * 1000)
}
var wrapper = function(callback) {
  return function(err, data, res) {
    callback = callback || function() {}
    if (err) {
      err.name = 'IBPSAPI' + err.name
      return callback(err, data, res)
    }
    callback(null, data, res)
  }
}
/*!
 * 处理token，更新过期时间
 */
var processToken = function(that, callback) {
  const createAt = new Date().getTime()

  return function(err, data = {}, res) {
    if (err) {
      return callback(err, data, res)
    }
    data.create_at = createAt
    // 存储token
    that.saveToken(data.uid, data, function(err) {
      callback(err, new AccessToken(data))
    })
  }
}

var OAuth = function(clientId, clientSecret, getToken, saveToken) {
  this.clientId = clientId
  this.clientSecret = clientSecret
  this.store = {}

  this.getToken = getToken || function(uid, callback) {
    callback(null, this.store[uid])
  }
  this.saveToken = saveToken || function(uid, token, callback) {
    this.store[uid] = token
    callback(null)
  }
  this.defaults = {}
}

OAuth.prototype.request = function(opts, callback) {
  const options = {}
  merge(options, this.defaults)
  if (typeof opts === 'function') {
    callback = opts
    opts = {}
  }
  for (const key in opts) {
    if (key !== 'headers') {
      options[key] = opts[key]
    } else {
      if (opts.headers) {
        options.headers = options.headers || {}
        merge(options.headers, opts.headers)
      }
    }
  }
  const allowStates = []
  request.request(options).then((response = {}) => {
    const { state } = response
    if (allowStates.includes(state)) {
      const err = new Error(response.message)
      err.state = state
      err.cause = response.cause
      callback(err, response.data, response)
    } else {
      callback(null, response.data, response)
    }
  }).catch(error => {
    callback(error, error.data)
  })
}

OAuth.prototype.authorize = function(data, callback) {
  const url = OAUTH2_URL() + '/authorize/apply'
  if (typeof data !== 'object') {
    data = {
      login_state: data
    }
  }
  data.client_id = this.clientId

  const args = {
    url,
    data: data,
    method: 'post'
  }
  this.request(args, wrapper(callback))
}

OAuth.prototype.userLogin = function(data, callback) {
  const args = {
    url: OAUTH2_URL() + '/user/login/apply',
    data: data,
    method: 'post'
  }
  this.request(args, wrapper(callback))
}

OAuth.prototype.getLoginCode = function(options, callback) {
  const that = this
  /**
   * 用户登录
   */
  this.userLogin(options, function(err, data) {
    if (err) {
      return callback(err, data)
    }
    // 没有token数据
    if (!data) {
      const message = '没有传回用户信息'
      const error = new Error(message)
      err.state = 'NoOAuthTokenError'
      return callback(error)
    }

    that.authorize(data, function(err1, data1) {
      if (err1) {
        return callback(err1, data1)
      }
      that.getAccessTokenByCode(data1, callback)
    })
  })
}

OAuth.prototype.getAccessTokenByCode = function(code, callback) {
  const args = {
    url: OAUTH2_URL() + '/authentication/apply',
    data: {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      authorize_code: code,
      grant_type: GRANT_TYPE
    },
    method: 'post'
  }
  this.request(args, wrapper(processToken(this, callback)))
}

OAuth.prototype.getAccessTokenByPassword = function({ username, password }, callback) {
  const args = {
    url: OAUTH2_URL() + '/authentication/apply',
    data: {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      username: username,
      password: password,
      grant_type: GRANT_TYPE
    },
    method: 'post'
  }
  this.request(args, wrapper(processToken(this, callback)))
}
export default OAuth
