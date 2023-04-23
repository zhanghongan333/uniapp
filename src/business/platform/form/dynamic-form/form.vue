<template>
  <view>
    <u--form
      ref="form"
    >
      <template v-for="(field,index) in fields">
        {{ field }}
        <dynamic-form-grid
          v-if="isNestedField(field.field_type)"
          :key="field.name+index"
          :ref="'formItem'+field.name"
          :models="modles"
          :field="field"
        />
        <dynamic-form-item
          v-else
          :ref="'formItem'+field.name"
          :key="field.name+index"
          :models="models"
          :field="field"
        />
      </template>
    </u--form>
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
export default {
  props: {
    forDef: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      fields: [],
      models: {} // 表单model对象数据
    }
  },
  watch: {
    forDef: {
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
      console.log(this.forDef, 'this.forDef.fields')
      const fields = this.forDef.fields
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
