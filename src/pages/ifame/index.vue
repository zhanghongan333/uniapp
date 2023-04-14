<template>
  <view>
    <web-view :src="src" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      src: ''
    }
  },
  onLoad(option) {
    if (option && option.url) {
      this.src = option.url
    }
  }
}
</script>
