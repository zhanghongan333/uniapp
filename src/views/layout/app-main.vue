<template>
  <view>
    <view class="transition">
      <home v-if="tabbar==='home'" />
      <notice v-else-if="tabbar==='notice'" />
      <contacts v-else-if="tabbar==='contacts'" />
      <my v-else-if="tabbar==='my'" />
    </view>
  </view>
</template>

<script>
import contacts from '@/views/contacts/index'
import home from '@/views/home/index'
import my from '@/views/my/index'
import notice from '@/views/notice/index'
export default {
  components: {
    contacts,
    home,
    my,
    notice
  },
  props: {
    tabbar: {
      type: String,
      default: 'home'
    }
  },
  data() {
    return {
      show: true
    }
  },
  onload() {

  }
}
</script>

<style>

</style>
