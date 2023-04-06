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
        v-for="item in data"
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
      tabbar: 0
    }
  },
  watch: {
    name: {
      handler: function(val, oldVal) {
        this.tabbar = val
      },
      immediate: true
    }
  },
  methods: {
    handlechangeTabbar(name) {
      if (name === 1) {
        return uni.$u.toast('请您先登录')
      } else {
        this.tabbar = name
        uni.$emit('update-tabbar', name)
        // uni.$e.route({
        //   type: 'tab',
        //   url: '/pages/login/index'
        // })
      }
    }

  }

}
</script>

<style>

</style>
