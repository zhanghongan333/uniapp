<template>
  <view>
    <u-tabbar
      :value="tabbar"
      :placeholder="false"
      :border="true"
      :fixed="true"
      :safe-area-inset-bottom="true"
      @change="handlechangeTabbar"
    >
      <u-tabbar-item
        text="首页"
        icon="home"
      />
      <u-tabbar-item
        text="放映厅"
        icon="photo"
      />
      <u-tabbar-item
        text="直播"
        icon="play-right"
      />
      <u-tabbar-item
        text="我的"
        icon="account"
      />
    </u-tabbar>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tabbar: 0
    }
  },
  methods: {
    handlechangeTabbar(name) {
      if (name === 1) {
        return uni.$u.toast('请您先登录')
      } else {
        this.tabbar = name
      }
    }

  }

}
</script>

<style>

</style>
