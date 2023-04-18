import _ZHANG_ from '../public/config.js'

const __ZHANG_CONFIG__ = window ? window._ZHANG_ : _ZHANG_

export default __ZHANG_CONFIG__

export const STORE_LANG_KEY = 'lang'
export const I18N_LOCALE = 'zh-CN'
export const I18N_ENABLE = true
export const I18N_FALLBACK_LOCALE = 'zh-CN'

function replaceStr(...args) {
  const string = `${args[0]}`
  return args.length < 3 ? string : string.replace(args[1], args[2])
}
import env from '@/env'
const version = '1.0'

export const STORE_TOKEN_ADAPTER = 'storage'
export const STORE_GLOBAL_KEY = replaceStr('zhan-${version}', '${version}', version)

export const HEADER_TOKEN_KEY = 'X-Authorization-access_token'

export const ENABLE_SSO = false

export const SSO_MODE = 'url'

export const SSO_LOGIN_URL = ''

export const SSO_LOGOUT_URL = ''

// 基础url
export const BASE_URL = '/'
export const BASE_API = env.VUE_APP_BASE_API
export const SINGLE = false

// 浏览器标题栏格式['platform', 'company']
export const TITLE_FORMAT = ['platform', 'company']
// 浏览器标题-平台名称【设置后就不能国际化】
export const TITLE_PLATFORM = ''
// 浏览器标题-公司名称【设置后就不能国际化】
export const TITLE_COMPANY = ''

// ================API基础地址=====================
// oauth2
export const API_OAUTH2_BASE_URL = __ZHANG_CONFIG__.API_OAUTH2_BASE_URL || '/oauth2/v3'
// platform
export const API_PLATFORM_BASE_URL = __ZHANG_CONFIG__.API_PLATFORM_BASE_URL || '/platform/v3'
// business
export const API_BUSINESS_BASE_URL = __ZHANG_CONFIG__.API_BUSINESS_BASE_URL || '/business/v3'
