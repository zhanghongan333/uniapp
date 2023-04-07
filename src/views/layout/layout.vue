<template>
  <view>
    <appMain :tabbar="tabbar" />
    <tabbar :name="name" />
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
      tabbar: 'home',
      name: 0
    }
  },
  onLoad(option) {
    this.init()
    this.setTabbar(option)
    this.updateTabbar()
  },
  methods: {
    // 初始化资源
    init() {

    },
    // 设置栏目
    setTabbar(option) {
      if (option && option.name) {
        this.name = Number(option.name)
      }
    },
    // 更新栏目
    updateTabbar() {
      uni.$on('updateTabbar', data => {
        this.tabbar = data
      })
    }
  }

}
</script>

<style>

</style>
