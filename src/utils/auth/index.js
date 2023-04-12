import Cookies from './util.cookies.js'
import Storages from './util.storage.js'
import { STORE_TOKEN_ADAPTER } from '@/constant'

export const TOKEN_STORE_PREFIX = 'default'
export const TOKEN_STORE = 'default'
export const TOKEN_DOMAIN = 'bpmhome.cn'
export const TOKEN_STORE_KEY = 'token'
export const TOKEN_STORE_REFRESH_KEY = 'refresh_token'
export const STORE_UUID_KEY = 'uuid'

// 存储
const Storage = STORE_TOKEN_ADAPTER === 'cookie' ? Cookies : Storages
// 是否需要前缀
const isPrefix = TOKEN_STORE_PREFIX !== 'custom'

/**
 * 获取token
 */
export function getToken() {
  return Storage.get(TOKEN_STORE_KEY, null, isPrefix)
}
/**
 * 设置token
 */
export function setToken(token, optins) {
  console.log(token, optins, 'token, optins')
  return Storage.set(TOKEN_STORE_KEY, token, optins, isPrefix)
}
/**
 * 删除token
 */
export function removeToken() {
  return Storage.remove(TOKEN_STORE_KEY, isPrefix)
}
/**
 * 更新tonken（包含token和 refreshToken）
 */
export function updateToken(data) {
  const domain = TOKEN_STORE === 'domain' ? TOKEN_DOMAIN : null
  // tonken 过期时间提前1分钟 前端不处理过期时间，后端处理过期时间
  // data.expires_in ? new Date(new Date().getTime() + ((parseInt(data.expires_in, 10) + 60) * 1000)) : 7
  setToken(data ? data.access_token : null, {
    expires: null,
    domain: domain
  })
  // 刷新tonken过期时间提前2分钟
  setRefreshToken(data ? data.refresh_token || null : null, {
    expires: null,
    domain: domain
  })
}
// ===========刷新token==========
/**
 * 获取刷新token
 */
export function getRefreshToken() {
  return Storage.get(TOKEN_STORE_REFRESH_KEY, '', isPrefix)
}
/**
 * 设置刷新token
 */
export function setRefreshToken(token, optins) {
  return Storage.set(TOKEN_STORE_REFRESH_KEY, token, optins, isPrefix)
}
/**
 * 删除刷新token
 */
export function removeRefreshToken() {
  return Storage.remove(TOKEN_STORE_REFRESH_KEY, isPrefix)
}

export function getUuid() {
  return Storage.get(STORE_UUID_KEY, '', isPrefix)
}

export function setUuid(uuid, optins) {
  return Storage.set(STORE_UUID_KEY, uuid, optins, isPrefix)
}

export function removeUuid() {
  return Storage.remove(STORE_UUID_KEY, isPrefix)
}
