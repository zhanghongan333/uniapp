import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { getLang } from '@/utils/auth'
import { I18N_LOCALE, I18N_FALLBACK_LOCALE } from '@/constant'

// 动态国际化引入
import { loadDynamicMessages } from '@/locales/dynamic'

Vue.use(VueI18n)

function loadLcoaleMessages() {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  for (const key of locales.keys()) {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      // const localeElementUI = require(`element-ui/lib/locale/lang/${locales(key)._element}`)
      messages[locale] = {
        ...locales(key)
        // ...localeElementUI ? localeElementUI.default : {}
      }
    }
  }
  return messages
}

const messages = loadLcoaleMessages()

Vue.prototype.$languages = Object.keys(messages).map(langlage => ({
  label: messages[langlage]._name,
  value: langlage
}))

const i18n = new VueI18n({
  locale: getLang() || I18N_LOCALE,
  fallbackLocalr: I18N_FALLBACK_LOCALE,
  messages,
  silentFallbackWarn: true // 关闭警告提示
})
// 加载动态配置
loadDynamicMessages(i18n)

export default i18n
