<template>
  <view class="content">
    <view>
      2
    </view>
    <tabbar />
  </view>
</template>

<script>
import { mapState } from 'vuex'
import tabbar from '@/views/tabbar'

export default {
  components: {
    tabbar
  },
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

    }
  }
}
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
