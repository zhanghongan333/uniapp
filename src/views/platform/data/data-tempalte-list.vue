<template>
  <view>
    {{ dataTemplateId }}
    <view @click="handleForm">去表单</view>
  </view>
</template>

<script>
import { getBuildDataById } from '@/api/platform/data/dataTemplate'
import { getFormDataByFormKey } from '@/api/platform/form/formDef'
export default {
  data() {
    return {
      dataTemplateId: '',
      dataTemplate: {}
    }
  },
  onLoad(option) {
    console.log(option, 'option')
    if (option && option.id) {
      this.dataTemplateId = option.id
      this.loadDataTemplateById()
    }
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
        if (data && data.attrs && this.$utils.isNotEmpty(data.attrs.form_key)) {
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

    }
  }

}
</script>
