import store from '@/store/index.js'
import Utils from '@/utils/util'
import { URL_TOKEN_KEY, URL_SYSTEM_ID, URL_TENANT_ID } from '@/constant'

// 验权
import {
  getToken, updateToken,
  getUrlToken, setUrlToken, removeUrlToken
} from '@/utils/auth'

/**
 * 获取url数据
 * @param {*} accessToken
 */
function handleData(accessToken) {
  setUrlToken(accessToken)
  if (Utils.isEmpty(accessToken)) {
    return
  }
  // 更新token
  updateToken({
    access_token: accessToken
  })
}

export async function handleURL(to) {
  const token = getToken()
  const query = to.query || {}
  const accessToken = query[URL_TOKEN_KEY]
  if (Utils.isEmpty(token)) {
    handleData(accessToken)
  } else {
    // 如果切换用户过来
    const urlToken = getUrlToken()
    if (Utils.isNotEmpty(accessToken) && accessToken !== urlToken) {
      removeUrlToken()
      // 清用户缓存
      await store.dispatch('ibps/account/fedLogout')
      handleData(accessToken)
    }
  }
  const params = {
    systemId: '',
    tenantId: ''
  }
  if (Utils.isNotEmpty(query)) {
    params['systemId'] = query[URL_SYSTEM_ID]
    params['tenantId'] = query[URL_TENANT_ID]
  }
  return params
}
