<template>
  <view>
    <appMain :tabbar="tabbar" />
    <tabbar />
  </view>
</template>

<script>
import tabbar from './tabbar.vue'
import appMain from './app-main.vue'
export default {
  components: {
    appMain,
    tabbar
  },
  data() {
    return {
      tabbar: 'home'
    }
  },
  onLoad() {
    uni.$on('updateTabbar', data => {
      console.log(data, 'data')
      this.tabbar = data
    })
  }

}
</script>

<style>

</style>
