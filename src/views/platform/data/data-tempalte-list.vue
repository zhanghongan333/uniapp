<template>
  <view>
    <u-button @click="handleForm">去表单</u-button>
    <formrender-dialog
      :dialog-visible="visible"
      :params="formrenderParams"
    />
  </view>
</template>

<script>
import { getBuildDataById } from '@/api/platform/data/dataTemplate'
import { getFormDataByFormKey } from '@/api/platform/form/formDef'
import FormrenderDialog from '@/views/platform/form'
export default {
  components: {
    FormrenderDialog
  },
  data() {
    return {
      dataTemplateId: '',
      dataTemplate: {},
      visible: false,
      formrenderParams: {},
      formKey: '',
      pkValue: '',
      editButtons: {},
      readonly: false,
      templateKey: ''
    }
  },
  onLoad(option) {
    console.log(option, 'option')
    if (option && option.id) {
      this.dataTemplateId = option.id
      this.loadDataTemplateById()
    }
    uni.$on('close', this.handleClose)
  },
  methods: {
    loadDataTemplateById() {
      this.loadDataTemplate(getBuildDataById, {
        dataTemplateId: this.dataTemplateId,
        isFilterForm: true,
        isRightsFilter: true
      })
    },
    loadDataTemplate(methodName, params) {
      this.dataTemplate = {}
      methodName(params).then(response => {
        // 从后台获取数据
        const data = this.$utils.parseData(response.data)
        this.templateKey = data.key || ''
        if (data && data.attrs && this.$utils.isNotEmpty(data.attrs.form_key)) {
          this.formKey = data.attrs.form_key
          getFormDataByFormKey({
            formKey: data.attrs.form_key
          }).then(response => {
            const formData = this.$utils.parseData(response.data)
            // const datasets = buildFelds2(formData, data)
            console.log(formData, data, 'formData, data')
            const datasets = []
            data.datasets = datasets
            this.dataTemplate = data
          }).catch(() => {
          })
        } else {
          this.dataTemplate = data
        }
      }).catch(() => {
      })
    },
    handleForm() {
      this.formrenderParams = {
        templateKey: this.templateKey,
        formKey: this.formKey,
        pkValue: this.pkValue,
        toolbars: this.editButtons,
        readonly: this.readonly
      }
      this.visible = true
    },
    handleClose(val) {
      console.log(val, 'val')
      this.visible = val
    }
  }

}
</script>
