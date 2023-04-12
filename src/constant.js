export const I18N_LOCALE = 'zh-CN'
export const I18N_ENABLE = true
export const I18N_FALLBACK_LOCALE = 'zh-CN'

function replaceStr(...args) {
  const string = `${args[0]}`
  return args.length < 3 ? string : string.replace(args[1], args[2])
}
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
