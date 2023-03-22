import { login } from '@/api/oauth2/user'

export default {
  namespaced: true,
  actions: {
    login({ dispatch }, { form } = {}) {
      return new Promise(async(resolve, reject) => {
        console.log(form, 'form')
        login(form).then(async response => {
          const data = response.data
          console.log(data, 'data')
        })
      })
    },
    load({ dispatch }) {
      return new Promise(async resolve => {
        await dispatch('chain/user/init', null, { root: true })
        resolve()
      })
    }
  }
}
