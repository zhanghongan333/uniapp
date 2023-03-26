import store from '@/store'

const API_OAUTH2_BASE_URL = '/oauth2/v3'

const SINGLE = false
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
