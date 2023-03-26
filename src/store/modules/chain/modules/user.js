import { getEncrypt } from '@/api/oauth2/user'

const ENABLE_PASSWORD_ENCRYPT = true

export default {
  namespaced: true,
  state: {
    // 用户信息
    info: { id: '1' },
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
      state.info = info
    },
    async init({
      state,
      dispatch
    }) {
      await dispatch('loadEncrypt')
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
