<template>
  <view class="content">
    <view>
      <text class="title">{{ title }}</text>
      <u-form
        ref="uForm"
        :model="form"
      >
        <u-form-item label="账号">
          <u-input v-model="form.username" />
        </u-form-item>
        <u-form-item label="密码">
          <u-input v-model="form.password" />
        </u-form-item>
      </u-form>
      <u-button @click="submit">提交</u-button>
    </view>
  </view>
</template>

<script>
import { apiGetBanner } from '@/api/index.js'
import { mapActions, mapState } from 'vuex'
import { encryptData } from '@/plugins/encrypt'

export default {
  data() {
    return {
      title: '登录',
      form: {
        username: 'admin',
        password: '1'
      },
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
    ...mapActions({
      'login': 'chain/account/login'
    }),
    handleClick() {
      apiGetBanner().then((res) => {
        console.log(res)
      })
    },
    submit() {
      const data = { username: this.form.username }
      data.password = encryptData(this.form.password)
      this.login({ form: data }).then(res => {
        uni.redirectTo({ url: '/views/layout/layout' })
      })
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
