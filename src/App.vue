<script>
import { getToken } from '@/utils/auth'
export default {
  onLaunch: function() {
    if (!getToken()) {
      uni.redirectTo({ url: '/pages/login/index' })
    } else {
      uni.redirectTo({ url: '/views/layout/layout' })
    }
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "uview-ui/index.scss";
    /*每个页面公共css */
</style>
