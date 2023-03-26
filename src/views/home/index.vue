<template>
  <view class="content">
    <view>
      <text class="title">{{ title }}</text>
    </view>
  </view>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  data() {
    return {
      title: '工作台',
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
      uni.redirectTo({ url: '/views/home/index' })
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
