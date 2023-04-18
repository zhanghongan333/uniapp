<template>
  <view>
    <u-cell
      :title="$t('platform.my.lang-select.title')"
      :value="language"
      :is-link="true"
      @click="show = true"
    >
      <i
        slot="icon"
        class="ibps-icon-language"
      />
    </u-cell>
    <u-action-sheet
      :actions="actions"
      :show="show"
      :cancel-text="$t('common.button.cancel')"
      @select="handleSetLanguage"
      @close="handleClose"
    />
  </view>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      show: false,
      actions: [{
        lang: 'zh-CN',
        name: '简体中文',
        disabled: this.$i18n.locale === 'zh-CN'
      },
      {
        lang: 'zh-TW',
        name: '繁体中文',
        disabled: this.$i18n.locale === 'zh-TW'
      },
      {
        lang: 'en-US',
        name: 'English',
        disabled: this.$i18n.locale === 'en-US'
      }]
    }
  },
  computed: {
    language() {
      return this.$t('_name')
    }
  },
  methods: {
    ...mapActions({
      languageSet: 'chain/language/set'
    }),
    handleClose() {
      this.show = false
    },
    handleSetLanguage({ lang }) {
      this.$i18n.locale = lang
      this.show = false
      this.languageSet(lang)
      uni.navigateTo({
        url: '/views/layout/layout?name=3',
        animationType: 'zoom-out'
      })
    }
  }
}
</script>

<style lang = "scss" scoped>

</style>
