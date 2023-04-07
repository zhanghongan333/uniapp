<template>
  <view class="content">
    <view>
      <text class="title">{{ '加载页...' }}</text>
    </view>
  </view>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {}
  },
  onLoad() {
    if (!getToken()) {
      uni.redirectTo({ url: '/pages/login/index' })
    } else {
      uni.redirectTo({ url: '/views/layout/layout' })
    }
  }
}
</script>
