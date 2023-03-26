/**
 * Cookies工具类
 * <pre>
 * 作者:hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2018-07-02-下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */
import JsCookies from 'js-cookie'
import { merge } from 'lodash'
import { STORE_GLOBAL_KEY } from '@/constant'

const globalKey = STORE_GLOBAL_KEY + '-'
const cookies = {
  /**
 * @description 存储 cookie 值
 * @param {String} name cookie name
 * @param {String} value cookie value
 * @param {Object} setting cookie setting
 * @param {Boolean} Whether the prefix
 *
 */
  set: (name = 'default', value = '', options = {}, isPrefix = true) => {
    const defaultOptions = {
      expires: null
    }
    merge(defaultOptions, options)
    JsCookies.set(isPrefix ? globalKey + name : name, value || '', options)
  },
  /**
 * @description 获取 cookie 值
 * @param {String} name cookie name
 * @param {Boolean} Whether the prefix
 */
  get: function(name = 'default', defaultValue, isPrefix = true) {
    const val = JsCookies.get(isPrefix ? globalKey + name : name)
    if (val === undefined || val === null || val === '') return defaultValue
    return val
  }
}

export default cookies
