<template>
  <view>
    <u-cell-group>
      <u-cell>
        <view
          slot="icon"
          class="user_avatar"
        >
          <u-avatar />
          <view>{{ title }}</view>
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

    <u-button @click="handleURL">
      退出登录
    </u-button>
  </view>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      tabbar: 0,
      title: '管理员'
    }
  },
  onLoad(option) {
  },
  methods: {
    handleURL() {
      // eslint-disable-next-line no-undef
      plus.runtime.openUrl('http://localhost:9528/#/dashboard')
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
