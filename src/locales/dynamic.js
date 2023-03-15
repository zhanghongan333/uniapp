
import { I18N_ENABLE } from '@/constant'
import { getLocales } from '../utils/locales/index'
/**
 * 加载动态国际化信息
 * @returns 国际化资源对象 {"zh-CN": {}, "en": {}}
 */
export function loadDynamicMessages(i18n) {
  return new Promise(resolve => {
    if (!I18N_ENABLE) {
      resolve()
      return
    }
    getLocales().then(response => {
      const locales = response?.data
      if (typeof locales === 'object') {
        Object.keys(locales).map(lang => {
          i18n.mergeLocaleMessage(lang, locales[lang])
        })
        resolve(locales)
      }
    }).catch(err => {
      console.error(err)
    })
  })
}
