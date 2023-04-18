<template>
  <view>
    <u-loading-page :loading="loading" />
    <u-tabbar
      :value="tabbar"
      :placeholder="false"
      :border="true"
      :fixed="true"
      :safe-area-inset-bottom="true"
      @change="handlechangeTabbar"
    >
      <u-tabbar-item
        v-for="item in tabbarData"
        :key="item.icon"
        :text="item.text"
        :icon="item.icon"
      />
    </u-tabbar>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    name: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      loading: false,
      tabbarData: [
        {
          text: '工作台',
          key: 'dashboard',
          icon: 'home'
        },
        {
          text: '公告',
          key: 'notice',
          icon: 'volume'
        },
        {
          text: '通讯录',
          key: 'contacts',
          icon: 'chat'
        }, {
          text: '我的',
          key: 'my',
          icon: 'account'
        }
      ],
      tabbar: 0
    }
  },
  watch: {
    name: {
      handler: function(val, oldVal) {
        this.tabbar = Number(val)
        this.handlechangeTabbar(this.tabbar)
      },
      immediate: true
    },
    data: {
      handler: function(val, oldVal) {
        // this.tabbarData = val
      },
      immediate: true
    }
  },
  methods: {
    handlechangeTabbar(name) {
      this.loading = true
      let tabbar = 'home'
      switch (name) {
        case 0:
          tabbar = 'home'
          break
        case 1:
          tabbar = 'notice'
          break
        case 2:
          tabbar = 'contacts'
          break
        case 3:
          tabbar = 'my'
          break
        default:
          tabbar = 'home'
          break
      }
      // uni.redirectTo({ url: `/views/${tabbar}/index?name=${name}`, animationType: 'none' })
      this.tabbar = name
      uni.$emit('updateTabbar', tabbar)
      setTimeout(() => {
        this.loading = false
      }, 1000)
    }

  }

}
</script>

<style>

</style>
