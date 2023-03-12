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
    designTenantid: ''
  },
  actions: {
    set({ state, dispatch }, info) {
      state.info = info
    }
  }
}
