<template>
  <view>
    <template v-for="(col,colIndex) in field.field_options.columns">
      <template v-for="(item,index) in col.fields">
        <form-grid
          v-if="isNestedField(item.field_type)"
          :key="item.name+colIndex+index"
          :ref="'formItem'+item.name"
          :name="item.name+colIndex+index"
          :models="models"
          :field="item"
        />
        <form-item
          v-else
          :ref="'formItem'+item.name"
          :key="item.name+colIndex+index"
          :name="item.name+colIndex+index"
          :models="models"
          :field="item"
        />
      </template>
    </template>
  </view>
</template>

<script>
const NESTED_FIELD_TYPES = [
  'grid',
  'tabs',
  'steps',
  'collapse',
  'fieldset',
  'card',
  'section_break',
  'kit'
]
// import chainFormGrid from '@/components/dynamic-form/form-grid'
// import chainFormItem from '@/components/dynamic-form/form-item'
export default {
  components: {
    // chainFormGrid,
    // chainFormItem
  },
  props: {
    field: Object,
    models: [String, Number, Object, Array] // 字段数据
  },
  data() {
    return {
      NESTED_FIELD_TYPES
    }
  },
  onLoad() {

  },
  methods: {
    isNestedField(fieldType) {
      return NESTED_FIELD_TYPES.includes(fieldType)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
