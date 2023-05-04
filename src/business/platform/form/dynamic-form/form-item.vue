<template>
  <view>
    <form-table
      v-if="field.field_type==='table'"
    />
    <form-combination v-else-if="isCombinationFieldType" />
    <form-field
      v-else
      :field="field"
    />
  </view>
</template>

<script>
export default {
  components: {
  },
  props: {
    field: Object, // 字段
    models: [String, Number, Object, Array] // 字段数据
  },
  data() {
    return {

    }
  },
  onLoad() {

  },
  computed: {
    isCombinationFieldType() {
      const dataType = ['dataTemplate', 'detailForm']
      return dataType.includes(this.fieldType)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
