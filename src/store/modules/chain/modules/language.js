// 设置文件
import { I18N_LOCALE } from '@/constant'

export default {
  namespaced: true,
  state: {
    value: ''
  },
  actions: {
    /**
     * @description 设置国际化
     * @param {Object} state vuex state
     * @param {String} lang 国际化
     */
    set({ state, dispatch }, lang) {
      return new Promise(async resolve => {
        // store 赋值
        state.value = lang
        // 持久化
        await dispatch('chain/db/set', {
          dbName: 'sys',
          path: 'language.value',
          value: state.value,
          user: false
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * @description 从持久化数据读取国际化设置
     * @param {Object} state vuex state
     */
    load({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.value = await dispatch('chain/db/get', {
          dbName: 'sys',
          path: 'language.value',
          defaultValue: I18N_LOCALE,
          user: false
        }, { root: true })
        // end
        resolve()
      })
    }
  }
}
