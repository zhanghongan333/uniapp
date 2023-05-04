<template>
  <view>
    {{ fieldType }}
    <template v-if="fieldType==='text'">
      {{ fieldType }}
    </template>
    <template v-else-if="fieldType==='number'">
      {{ fieldType }}
    </template>

  </view>
</template>

<script>
export default {
  props: {
    field: Object, // 字段
    models: [String, Number, Object, Array] // 字段数据
  },
  data() {
    return {

    }
  },
  computed: {
    fieldType() {
      return this.field.field_type || ''
    }
  },
  onLoad() {

  }
}
</script>

<style lang="scss" scoped>

</style>
