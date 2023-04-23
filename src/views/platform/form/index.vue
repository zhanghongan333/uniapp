<template>
  <view>
    <ChainDialog :visible="visible">
      <Formrender
        :form-def="formDef"
      />
    </ChainDialog>
  </view>
</template>

<script>
import ChainDialog from '@/components/chain-dialog'
import { getFormData } from '@/api/platform/form/formDef'

import Formrender from '@/business/platform/form/formrender.vue'
export default {
  components: {
    ChainDialog,
    Formrender
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object,
      default: () => {
        return {}
      }
    }

  },
  data() {
    return {
      visible: false,

      templateKey: '',
      formKey: '',
      pkValue: '',
      toolbars: '',
      readonly: '',
      rightsScope: '',

      formDef: {}
    }
  },
  watch: {
    dialogVisible: {
      handler: function(val, oldVal) {
        this.visible = val
      },
      immediate: true
    }
  },
  onLoad() {
    uni.$on('close', this.handleClose)
    uni.$on('open', this.handleOpen)
  },
  methods: {
    handleClose(val) {
      this.visible = val
      uni.$emit('close', false)
    },
    handleOpen() {
      this.templateKey = this.params.templateKey
      this.formKey = this.params.formKey
      this.pkValue = this.params.pkValue
      this.toolbars = this.params.toolbars
      this.readonly = this.params.readonly
      this.rightsScope = this.params.rightsScope || 'data'
      getFormData({
        templateKey: this.templateKey || '',
        formKey: this.formKey,
        pk: this.pkValue,
        rightsScope: this.rightsScope
      }).then(response => {
        const data = response.data
        // 从后台获取表单定义数据

        this.formDef = this.$utils.parseData(data.form) || {}
        console.log(this.formDef, data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
