<template>
  <view>
    <u-cell-group>
      <u-cell>
        <view
          slot="icon"
          class="user_avatar"
        >
          <u-avatar :src="avatar" />
          <view>{{ userName }}</view>
        </view>

      </u-cell>
    </u-cell-group>
    <u-cell-group>
      <u-cell
        icon="lock-fill"
        title="修改密码"
        :is-link="true"
      />
      <u-cell
        title="切换语言"
        :is-link="true"
      >
        <i
          slot="icon"
          class="ibps-icon-language"
        />
      </u-cell>
    </u-cell-group>
    <view class="divider" />
    <u-cell-group>
      <u-cell
        icon="question"
        title="帮助中心"
        :is-link="true"
      />
      <u-cell
        title="关于我们"
        :is-link="true"
      >
        <i
          slot="icon"
          class="ibps-icon-logo"
        />
      </u-cell>
    </u-cell-group>
    <u-modal
      ref="uModal"
      :title="title"
      :content="message"
      :show="show"
      :show-cancel-button="true"
      :async-close="true"
      @confirm="confirm"
      @cancel="cancel"
    />
    <u-button @click="handleLogout">
      退出登录
    </u-button>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import { getFile } from '@/utils/image'
export default {
  components: {
  },
  data() {
    return {
      tabbar: 0,
      title: this.$t('common.dialog.title'),
      message: this.$t('platform.my.logoutMessage'),
      show: false,
      defaultImage: ''
    }
  },
  onLoad(option) {
    console.log(this.$slots.getters.userInfo)
  },
  computed: {
    ...mapState('chain/user', [
      'info'
    ]),
    avatar() {
      console.log(this.info, 'this.info')
      const photo = this.info && this.employsee ? this.info.employsee.photo : null
      if (this.$utils.isEmpty(photo)) {
        return this.errorImage
      }
      return getFile(photo)
    },
    errorImage() {
      return this.defaultImage
    },
    userName() {
      return this?.info?.user?.fullname || ''
    }
  },
  methods: {
    handleLogout() {
      // eslint-disable-next-line no-undef
      // plus.runtime.openUrl('http://localhost:9528/#/dashboard')
      this.show = true
    },
    confirm() {
      console.log(this.$store, 'this.$store')
      this.$store.dispatch('chain/account/logout', { vm: this }).then(() => {
        this.show = false
        uni.$e.route({ type: 'redirectTo',
          url: '/pages/login/index' })
      })
    },
    cancel() {
      this.show = false
    }
  }
}
</script>

<style>
 .user_avatar{
  display: flex;
  justify-content: center;
  align-items: center;
 }
</style>
