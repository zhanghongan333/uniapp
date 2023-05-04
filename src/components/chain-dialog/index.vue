<template>
  <view>
    <u-popup
      :show="show"
      mode="center"
      :custom-style="chainDialog"
      :closeable="true"
      @close="close"
      @open="open"
    >
      <view>
        <slot />
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  name: 'ChainDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
      chainDialog: { height: '100%',
        width: '100%' }
    }
  },
  watch: {
    visible: {
      handler: function(val, oldVal) {
        this.show = val
      },
      immediate: true
    }
  },
  methods: {
    open() {
      uni.$emit('chain')
    },
    close() {
      this.show = false
      uni.$emit('close', false)
    }
  }
}
</script>

<style lang="scss">
  .chain-dialog{
    height: 100%;
    width: 100%;
  }
</style>
