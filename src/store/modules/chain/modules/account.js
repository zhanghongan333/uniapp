import { login, logout as userLogout, refreshAccessToken } from '@/api/oauth2/user'
import { getToken, updateToken, removeToken, removeRefreshToken, removeUuid, setUuid } from '@/utils/auth'

export default {
  namespaced: true,
  actions: {
    login({ dispatch }, { form } = {}) {
      return new Promise(async(resolve, reject) => {
        login(form).then(async response => {
          const data = response.data
          // 设置 用户解锁
          await dispatch('chain/lock/set', { lock: false }, { root: true })
          // 更新token 信息
          await dispatch('updataTokenInfo', data)
          // 设置 vuex 用户信息
          await dispatch('chain/user/setAccount', form.username, { root: true })
          // 结束
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    load({ dispatch }) {
      return new Promise(async resolve => {
        // DB -> store 加载用户名
        await dispatch('chain/user/get', null, { root: true })
        // DB -> store 加载用户初始化配置
        await dispatch('chain/user/init', null, { root: true })
        resolve()
      })
    },
    /**
     * 更新token 用户信息
     * @param {*} param0
     * @param {*} data
     */
    updataTokenInfo({ commit, dispatch }, data) {
      // 设置 cookie 一定要存 uuid 和 token 两个 cookie
      // 整个系统依赖这两个数据进行校验和存储
      // uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
      // token 代表用户当前登录状态 建议在网络请求中携带 token
      // 如有必要 token 需要定时更新，默认保存一天
      updateToken(data)
      setUuid(data ? data.uid : null)
    },
    // 前台登出
    fedLogout({
      commit,
      dispatch
    }, vm) {
      return new Promise(async(resolve, reject) => {
        dispatch('chain/user/setAccount', '', { root: true })
        dispatch('chain/user/set', {}, { root: true })

        // 删除一系列cookie
        removeToken()
        removeUuid()
        removeRefreshToken()

        // 删除用户信息
        resolve(vm)
      })
    },
    logout({
      commit,
      dispatch
    }, {
      vm,
      comfirm = false
    }) {
      return new Promise(async(resolve, reject) => [
        dispatch('logoff', { vm }).then(() => {
          resolve(vm)
        }).catch(() => {
          reject(vm)
        })
      ])
    },
    logoff({ dispatch }, { vm }) {
      const token = getToken()
      return new Promise(async(resolve, reject) => {
        // 如果token过期直接登出
        if (token === null || token === '') {
          dispatch('fedLogout', { vm }).then(() => {
            resolve(vm)
          }).catch(() => {
            reject(vm)
          })
        } else {
          userLogout(token).then(() => {
            dispatch('fedLogout', { vm }).then(() => {
              resolve(vm)
            }).catch(() => {
              reject(vm)
            })
          }).catch(() => {
            dispatch('fedLogout', { vm }).then(() => {
              resolve(vm)
            }).catch(() => {
              reject(vm)
            })
          })
        }
      })
    },
    // 刷新token
    refreshToken({
      commit,
      dispatch
    }) {
      return new Promise(async(resolve, reject) => {
        await refreshAccessToken().then(response => {
          const data = response.data
          updateToken(data)
          resolve(data)
        }).catch(err => {
          console.error('refreshAccessToken-err: ', err)
          removeRefreshToken()
          reject(err)
        })
      })
    }
  }
}
