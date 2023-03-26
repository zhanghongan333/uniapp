/**
 * 缓存处理
 * 存储到localStorage或sessionStorage中，避免刷新页面数据丢失
 * <pre>
 * 作者:hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2015-11-02-下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */
import { STORE_GLOBAL_KEY } from '@/constant'

const globalKey = STORE_GLOBAL_KEY + '-'

const storage = {
  /**
   * 存储localStorage
   */
  set: (key, value, options = {}, isPrefix = true) => {
    const obj = {
      dataType: typeof (value),
      value: value,
      type: options.type,
      datetime: options.datetime || new Date().getTime()
    }
    key = isPrefix ? globalKey + key : key
    uni.setStorageSync(key, JSON.stringify(obj))
  },
  /**
   * 获取Storage
   */
  get: (key, defaultValue, isPrefix = true) => {
    let obj = {}
    let value
    key = isPrefix ? globalKey + key : key

    obj = uni.getStorageSync(key)
    if (obj === null || obj === undefined)obj = uni.getStorageSync(key)
    if (obj === null || obj === undefined || obj === '') return defaultValue
    obj = JSON.parse(obj)
    if (obj.dataType === undefined) {
      return defaultValue
    } else if (obj.dataType === 'string') {
      value = obj.value
    } else if (obj.dataType === 'number') {
      value = Number(obj.value)
    } else if (obj.dataType === 'boolean') {
      value = Boolean(obj.value)
    } else if (obj.dataType === 'object') {
      value = obj.value
    }
    return value
  },
  /**
   * 删除Storage
   */
  remove: (key) => {
    key = globalKey + key
    uni.removeStorageSync(key)
  },
  getAll: () => {
    uni.getStorageInfo()
  },
  /**
   * 清空Storage
   */
  clear: () => {
    uni.clearStorageSync()
  }

}

export default storage
