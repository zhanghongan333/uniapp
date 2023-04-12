import { getUserInfo, getEncrypt } from '@/api/oauth2/user'
import { setUuid } from '@/utils/auth'

const ENABLE_PASSWORD_ENCRYPT = true

export default {
  namespaced: true,
  state: {
    // 用户信息
    info: {},
    // 账号
    account: '',
    // 切换的账号
    switchAccount: '',
    // 是否开启注册
    regOpen: null,
    // 是否开启租户模式
    tenantOpen: null,
    // 设置的关联租户ID
    designTenantid: '',

    encrypt: null,

    encryption: ''
  },
  actions: {
    set({ state, dispatch }, info) {
      return new Promise(async resolve => {
        // store 赋值
        state.info = info
        // 持久化
        await dispatch('chain/db/set', {
          dbName: 'sys',
          path: 'user.info',
          value: info,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    async init({
      state,
      dispatch
    }) {
      await dispatch('loadEncrypt')
    },
    /**
     * @description 从数据库取用户数据
     * @param {Object} state vuex state
     */
    get({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.info = await dispatch('chain/db/get', {
          dbName: 'sys',
          path: 'user.info',
          defaultValue: {},
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },

    load({ state, dispatch }) {
      return new Promise(async(resolve, reject) => {
        // 获取当前用户账号
        await dispatch('getAccount')

        await getUserInfo().then(async response => {
          if (!response) {
            reject(response)
          }
          const useInfo = response.data
          const user = useInfo.user
          // 更新token信息
          await setUuid(user.id)
          // 设置用户信息
          dispatch('setAccount', user.account)
          // 设置当前
          await dispatch('set', useInfo)

          resolve(useInfo)
        })
      })
    },

    async loadEncrypt({
      state, dispatch
    }) {
      if (!ENABLE_PASSWORD_ENCRYPT) {
        await dispatch('setEncrypt', {
          encrypt: false,
          encryption: ''
        })
        return
      }
      // 从数据库取加密方式
      await dispatch('getEncrypt')
    },
    async getEncrypt({ state, dispatch }) {
      await getEncrypt().then(async response => {
        const data = response.data
        await dispatch('setEncrypt', {
          encrypt: data.encrypt,
          encryption: data.encryptName
        })
      }).catch(async error => {
        console.error('loadEncrypt:', error)
        await dispatch('setEncrypt', {
          encrypt: null,
          encryption: ''
        })
      })
    },
    /**
     * 设置加密方式
     * @param {*} param0
     */
    async setEncrypt({
      state,
      dispatch
    }, {
      encrypt,
      encryption
    }) {
      state.encrypt = encrypt
      state.encryption = encryption
    },
    getAccount({ state, dispatch }) {
      return new Promise(async resolve => {
        state.account = await dispatch('chain/db/get', {
          dbName: 'sys',
          path: 'account',
          defaultValue: '',
          user: true
        }, { root: true })
        resolve()
      })
    },
    setAccount({ state, dispatch }, account) {
      return new Promise(async resolve => {
        state.account = account
        // 持久化
        await dispatch('chain/db/set', {
          dbName: 'sys',
          path: 'account',
          value: account,
          user: false
        }, { root: true })
        resolve()
      })
    }
  }
}
