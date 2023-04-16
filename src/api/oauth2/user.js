import request from '@/utils/request'
import { getRefreshToken } from '@/utils/auth'
import { OAUTH2_URL } from '@/api/baseUrl'

// 1、引入ibps-oauth包
import IbpsOAuth from './oauth2'

const GRANT_TYPE = 'authorization_code'

const CLIENT_ID = '23ef4e3585436167'

const CLIENT_SECRET = '34114e44e3bca741e0ee02d4bc42dfc08ca0b60149daefbacac9b53503f4edeea6e81e8509d5c854'

const oathApi = new IbpsOAuth(CLIENT_ID, CLIENT_SECRET)
/**
 * 获取当前加密方式
 */
export function getEncrypt() {
  return request.request({
    url: OAUTH2_URL() + '/user/client/encrypt/get',
    method: 'get'
  })
}
/**
 *  根据用户名， 获取用户上下文信息
 * @param {*} token
 */
export function getUserInfo(username) {
  return request.request({
    url: OAUTH2_URL() + '/user/context/default',
    method: 'post'
  })
}
export function login(params) {
  if (GRANT_TYPE === 'password_credentials') {
    return loginByPassword(params)
  } else {
    return loginByCode(params)
  }
}
/**
 * 用户登出
 *
 */
export function logout(accessToken) {
  return request.request({
    url: OAUTH2_URL() + '/user/logout',
    method: 'post',
    params: {
      access_token: accessToken
    }
  })
}

export function loginByPassword(params) {
  return new Promise((resolve, reject) => {
    oathApi.getAccessTokenByPassword(params, (error, res) => {
      if (error) {
        return reject(res || error)
      }
      resolve(res)
    })
  })
}

export function loginByCode(params) {
  return new Promise((resolve, reject) => {
    oathApi.getLoginCode(params, (error, res) => {
      if (error) {
        return reject(res || error)
      }
      resolve(res)
    })
  })
}

/**
 * 刷新tonken
 */
export function refreshAccessToken() {
  return new Promise((resolve, reject) => {
    oathApi.refreshAccessToken(getRefreshToken(), function(error, res) {
      if (error) {
        return reject(res || error)
      }
      resolve(res)
    })
  })
}
