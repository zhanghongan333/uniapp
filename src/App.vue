<script>
// import { getToken } from '@/utils/auth'
import { setLang } from '@/utils/auth'
export default {
  onLaunch: function() {
    uni.$e.route({ type: 'redirectTo',
      url: '/views/layout/layout' })
    // console.log(getToken(), 'getToken()')
    // if (!getToken()) {
    //   uni.$e.route({ url: '/pages/login/index' })
    // } else {
    //   uni.$e.route({ type: 'redirectTo',
    //     url: '/views/layout/layout' })
    //   // uni.redirectTo({ url: '/views/layout/layout' })
    // }
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  },
  watch: {
    '$i18n.locale': 'i18nHandle'
  },
  created() {
    this.i18nHandle(this.$i18n.locale)
  },
  methods: {
    i18nHandle(val, oldVal) {
      setLang(val)
    }
  }
}
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "uview-ui/index.scss";
    /*每个页面公共css */
</style>
