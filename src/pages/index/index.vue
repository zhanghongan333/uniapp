<template>
  <view class="content">
    <image
      class="logo"
      src="../../static/logo.png"
    />
    <view>
      <text class="title">{{ title }}</text>
      <u-button @click="handleClick">默认按钮</u-button>
      <u-button type="primary">主要按钮</u-button>
      <u-button type="success">成功按钮</u-button>
      <u-button type="info">信息按钮</u-button>
      <u-button type="warning">警告按钮</u-button>
      <u-button type="error">危险按钮</u-button>
      {{ userInfo.id }}--{{ info.id }}
    </view>
  </view>
</template>

<script>
import Vue from 'vue'
import { apiGetBanner } from '@/apis/index.js'
import { mapState } from 'vuex'

export default Vue.extend({
  data() {
    return {
      title: 'Hello',
      userInfo: this.$store.getters.userInfo
    }
  },
  onLoad() {},
  computed: {
    // ...mapState({
    //   userInfo: state => state.chain.user.info
    // })
    ...mapState('chain/user', [
      'info'
    ])
  },
  methods: {
    handleClick() {
      apiGetBanner().then((res) => {
        console.log(res)
      })
    }
  }
})
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
