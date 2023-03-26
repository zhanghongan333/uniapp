const LOCKING = false
export default {
  namespaced: true,
  state: {
    value: LOCKING,
    redirect: ''
  },
  getters: {
    /**
     * @description
     * @param {Object} state state
     */
    redirect(state) {
      return state.redirect || '/'
    }
  },
  actions: {
    set({ state, dispatch }, { lock, redirect = '/' }) {
      return new Promise(async resolve => {
        state.value = lock
        state.redirect = redirect
        resolve()
      })
    }
  }
}
