
import lang from '@/i18n' // Internationalization 国际化
import { TITLE_FORMAT, TITLE_PLATFORM, TITLE_COMPANY } from '@/constant'

const i18n = {
  /**
    * 设置标题
    */
  setTitle: (name, title) => {
    title = i18n.generateTitle(name, title)
    title = i18n.te(title) ? i18n.t(title) : title
    const ts = []
    if (title) {
      ts.push(title)
    }
    if (TITLE_FORMAT.includes('platform')) {
      ts.push(TITLE_PLATFORM || i18n.t('common.platform'))
    }
    if (TITLE_FORMAT.includes('company')) {
      ts.push(TITLE_COMPANY || i18n.t('common.company'))
    }
    i18n.setBrowserTitle(ts.join('-'))
  },

  /**
    * 设置标题
    * 单页应用在iOS系统下部分APP的webview中 标题不能通过 document.title = xxx 的方式修改 该插件只为解决该问题而生(兼容安卓)
    * @param {*} title
    * @param {*} img
    */
  setBrowserTitle: (title, img) => {
    if (title === undefined || window.document.title === title) {
      return
    }
    document.title = title
    const userAgent = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(userAgent)) {
      const iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      // 替换成站标favicon路径或者任意存在的较小的图片即可
      iframe.setAttribute('src', img || '/favicon.ico')
      const iframeCallback = function() {
        setTimeout(function() {
          iframe.removeEventListener('load', iframeCallback)
          document.body.removeChild(iframe)
        }, 0)
      }
      iframe.addEventListener('load', iframeCallback)
      document.body.appendChild(iframe)
    }
  },
  /**
  * 翻译router.meta.title，用于面包屑(breadcrumb)、侧边栏(sidebar)、tagsview
  * @param {*} path
  * @param {*} title
  */
  generateTitle: (name, title, ...values) => {
    if (!name && !title) return
    const hasKey = lang.te('route.' + name)
    if (hasKey) {
      return lang.t('route.' + name, ...values) // $t :this method from vue-i18n, inject in @/lang/index.js
    }
    if (title) { return title }
    name = name.substring(name.lastIndexOf('.') + 1, name.length)
    return name
  },
  /**
  * 跟vue-i8n的 t  类似
  * 如果不存在则取最后一个 值
  * @param {*} path
  * @param {*} values
  */
  t: (path, ...values) => {
    const hasKey = lang.te(path)
    if (hasKey) {
      return lang.t(path, ...values)
    }
    path = path.substring(path.lastIndexOf('.') + 1, path.length)
    return path
  },
  $t: (path, ...values) => {
    return i18n.t(path, values)
  },

  /**
  * 跟vue-i8n的 te 一致
  * @param {*} path
  */
  te: (path) => {
    return lang.te(path)
  },
  $te: (path) => {
    return i18n.te(path)
  },
  getLanguage: () => {
    return lang.locale || 'zh-CN'
  }
}

export default i18n
