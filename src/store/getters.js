export default {
  // =====用户相关
  userInfo: state => state.chain.user.info,
  encrypt: state => state.chain.user.encrypt,
  encryption: state => state.chain.user.encryption,

  baseApi: state => state.chain.api.base // baseAPI地址
}
