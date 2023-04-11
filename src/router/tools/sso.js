import store from '@/store/index.js'
import Utils from '@/utils/util'
import { SSO_TOKEN_KEY, SSO_SYSTEM_ID, SSO_TENANT_ID, SSO_TOKEN_MODE } from '@/constant'

// 验权
import {
  getToken, updateToken,
  getSSOToken, setSSOToken, removeSSOToken
} from '@/utils/auth'

/**
 * 更新ibps的token
 * @param {*} accessToken
 * @returns
 */
function updateIbpsToken(accessToken) {
  // 需要转换成IBPS平台的token
  return new Promise((resolve, reject) => {
    // 需要转换成IBPS平台的token
    store.dispatch('ibps/account/loginBySSO', accessToken).then((data) => {
      // 更新token
      updateToken({
        access_token: data.access_token
      })
      resolve(data)
    }).catch((e) => {
      reject(e)
    })
  })
}

// ===================【URL方式】====================

/**
 * 获取sso数据【URL方式】
 * @param {*} query
 */
async function handleUrlData(accessToken) {
  setSSOToken(accessToken)
  if (Utils.isEmpty(accessToken)) {
    return
  }
  await updateIbpsToken(accessToken)
}

/**
 * 处理token 【URL方式】
 * @param {*} query
 * @returns
 */
async function handleUrlSSO(accessToken) {
  const token = getToken()
  if (Utils.isEmpty(token)) {
    await handleUrlData(accessToken)
  } else {
    // 如果切换用户过来
    const ssoToken = getSSOToken()
    if (Utils.isNotEmpty(accessToken) && accessToken !== ssoToken) {
      removeSSOToken()
      // 清用户缓存
      await store.dispatch('ibps/account/fedLogout')
      //  再更新下 IBPS的token
      await handleUrlData(accessToken)
    }
  }
}

// ===================【URL方式】END====================
// ===================【Cookie方式】====================

/**
 * 获取sso数据【Cookie方式】
 */
async function handleCookieData() {
  const accessToken = getSSOToken()
  if (Utils.isEmpty(accessToken)) {
    return
  }
  await updateIbpsToken(accessToken)
}

async function handleCookieSSO() {
  // IBPS的token
  const token = getToken()
  if (Utils.isEmpty(token)) {
  // 单点登录验证。不能存在则更新ibps验证
    await handleCookieData()
  }
}
// ===================【Cookie方式】END====================

export async function handleSSO(to) {
  const query = to.query || {}
  if (SSO_TOKEN_MODE === 'cookie') {
    await handleCookieSSO()
  } else {
    const accessToken = query[SSO_TOKEN_KEY]
    await handleUrlSSO(accessToken)
  }
  const params = {
    systemId: '',
    tenantId: ''
  }

  if (Utils.isNotEmpty(query)) {
    params['systemId'] = query[SSO_SYSTEM_ID]
    params['tenantId'] = query[SSO_TENANT_ID]
  }
  return params
}
