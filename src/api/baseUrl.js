import store from '@/store'
// /oauth2/v3
const API_OAUTH2_BASE_URL = ''

const API_PLATFORM_BASE_URL = ''

const SINGLE = false

const baseApi = ''

const MULTIPLE_DOMAIN = false

const API_DOMAIN_NAMES = []

// 默认url
export const BASE_API = function(i) {
  const api = store && store.getters.baseApi ? store.getters.baseApi : baseApi
  return MULTIPLE_DOMAIN ? getApi(api, i) : api
}
const getApi = (api, i) => {
  if (i === null || i === undefined) {
    i = 0
  }
  const domainName = API_DOMAIN_NAMES[i] || API_DOMAIN_NAMES[0] || ''
  return api.replace('{DOMAIN}', domainName)
}
export const SINGLE_APP = () => {
  if (!store || typeof (store.getters.single) === 'undefined') {
    return SINGLE
  }
  return store.getters.single
}
export const OAUTH2_URL = () => {
  return OAUTH2_BASE_URL()
}

export const OAUTH2_BASE_URL = () => {
  return SINGLE_APP() ? '' : API_OAUTH2_BASE_URL
}

export const PLATFORM_BASE_URL = () => {
  return SINGLE_APP() ? '' : API_PLATFORM_BASE_URL
}

export const SYSTEM_URL = () => {
  return PLATFORM_BASE_URL()
}
