<template>
  <view>
    <u-cell
      icon="wifi"
      :title="$t('platform.my.switchEnvironment')"
      :is-link="true"
      @click="onOpen"
    />

    <u-action-sheet
      :actions="actions"
      :show="show"
      :cancel-text="$t('common.button.cancel')"
      :round="30"
      class="chain-switch-environment"
      @select="onSelect"
      @close="handleClose"
    />
  </view>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { SINGLE_APP, BASE_API } from '@/api/baseUrl'
export default {
  data() {
    return {
      show: false,
      customForm: {
        name: '',
        baseUrl: '',
        customSingle: false
      },
      baseUrl: this.base,
      baseSingle: this.single
    }
  },
  computed: {
    ...mapState('chain/api', [
      'base',
      'single'
    ]),
    ...mapGetters('chain/api', [
      'options'
    ]),
    actions() {
      return this.options.map((option) => {
        option.name = this.getTitle(option.name)
        option.subname = option.value
        option.disabled = this.base === option.value
        return option
      })
    }
  },
  methods: {
    ...mapActions('chain/api', {
      baseUrlCustom: 'custom',
      baseUrlSet: 'set',
      baseUrlOptionRemove: 'remove'
    }),
    handleClose() {
      this.show = false
    },
    onOpen() {
      this.customForm = {
        name: '自定义',
        baseUrl: BASE_API(),
        single: SINGLE_APP()
      }
      this.baseUrl = this.base
      this.baseSingle = this.single
      this.show = true
    },
    onSelect(action) {
      const { value, single } = action
      this.baseUrl = value
      this.baseSingle = single

      this.customForm = {
        name: '自定义',
        baseUrl: value,
        single: single
      }

      this.baseUrlSet({
        baseUrl: value,
        single: single,
        vm: this
      })
      this.show = false
    },
    getTitle(name) {
      const nameLower = name.toLowerCase()
      if (this.$te('common.env.' + nameLower)) {
        return this.$t('common.env.' + nameLower)
      }
      return name
    }
  }
}
</script>

<style lang="scss">
  .chain-switch-environment{
    ::v-deep.u-slide-up-enter-to{
      height: 80%;
      overflow: scroll;
      border-radius: 30px 30px 0 0;
    }

    // ::v-deep.u-action-sheet__cancel-text{

    // }
  }
   .u-slide-up-enter-to{
      height: 80%;
      overflow: scroll;
      border-radius: 30px 30px 0 0;
    }
</style>
