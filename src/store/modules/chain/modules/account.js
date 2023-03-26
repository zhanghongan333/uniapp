import { login } from '@/api/oauth2/user'
import { updateToken, setUuid } from '@/utils/auth'

export default {
  namespaced: true,
  actions: {
    login({ dispatch }, { form } = {}) {
      return new Promise(async(resolve, reject) => {
        login(form).then(async response => {
          const data = response.data
          await dispatch('chain/lock/set', { lock: false }, { root: true })
          await dispatch('updataTokenInfo', data)
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
        await dispatch('chain/user/init', null, { root: true })
        resolve()
      })
    },
    updataTokenInfo({ commit, dispatch }, data) {
      updateToken(data)
      setUuid(data ? data.uid : null)
    }
  }
}
