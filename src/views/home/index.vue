<template>
  <view class="content">
    <view>
      2
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {
  },
  data() {
    return {
      title: '工作台',
      userInfo: this.$store.getters.userInfo,
      tabbar: 0
    }
  },
  onLoad(option) {
  },
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
