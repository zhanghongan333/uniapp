<template>
  <view>
    <u--form
      ref="form"
    >
      <template v-for="(field,index) in fields">
        <form-grid
          v-if="isNestedField(field.field_type)"
          :key="field.name+index"
          :ref="'formItem'+field.name"
          :name="field.name+index"
          :models="models"
          :field="field"
        />
        <form-item
          v-else
          :ref="'formItem'+field.name"
          :key="field.name+index"
          :name="field.name+index"
          :models="models"
          :field="field"
        />
      </template>
    </u--form>
  </view>
</template>

<script>
export const NESTED_FIELD_TYPES = [
  'grid',
  'tabs',
  'steps',
  'collapse',
  'fieldset',
  'card',
  'section_break',
  'kit'
]
// import dynamicFormGrid from '@/business/platform/form/dynamic-form/form-grid'
// import dynamicFormItem from '@/business/platform/form/dynamic-form/form-item'
export default {
  components: {
    // dynamicFormGrid,
    // dynamicFormItem
  },
  props: {
    formDef: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      NESTED_FIELD_TYPES,
      fields: [],
      models: {} // 表单model对象数据
    }
  },
  watch: {
    formDef: {
      handler(val, oldVal) {
        if (this.$utils.valueEquals(val, oldVal)) {
          return
        }
        this.initResponseFields()
      },
      deep: true,
      immediate: true
    }
  },
  onLoad() {
  },
  methods: {
    async initResponseFields() {
      console.log(this.formDef, 'this.forDef.fields')
      const fields = this.formDef.fields
      if (!fields) { return }
      this.fields = fields
      // await this.generateModles(fields)
    },
    isNestedField(fieldType) {
      return NESTED_FIELD_TYPES.includes(fieldType)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
