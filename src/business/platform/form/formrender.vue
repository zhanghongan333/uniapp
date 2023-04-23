<template>
  <view>
    {{ formDef }}
    <dynamic-form
      :form-def="formDef"
    />
  </view>
</template>

<script>
import dynamicForm from './dynamic-form/form.vue'
export default {
  components: {
    dynamicForm
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

    }
  },
  onLoad() {

  }
}
</script>

<style lang="scss" scoped>

</style>
