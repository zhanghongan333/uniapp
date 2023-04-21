/**
 * 全局的工具类
 * <pre>
 * 作者:hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2018-07-02-下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 *
 * 可以使用 this.$utils.xx
 *  如: 判断是否为空
 *   this.$utils.isEmpty()
 */

// import log from './util.log.js'
const rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
const wd = window
// import storages from './util.storage'

const util = {
  // storages,
  // storage: storages,
  // log,
  /**
   * 判断是否为空
   * @param {*} obj
   */
  isEmpty: function(obj, allowBlank = false) {
    // null or undefined
    if (util.isNull(obj)) return true
    // 字符串
    if (util.isString(obj)) return (!(allowBlank || obj.length > 0))
    // 数组
    if (util.isArray(obj)) return obj.length === 0
    // 对象
    if (util.isObject(obj)) return util.isEmptyObject(obj)
    for (var key in obj) if (obj.hasOwnProperty(key)) return false
    return obj === undefined || (!allowBlank ? obj === '' : false)
  },
  /**
   * 判断是否不为空
   * @param {*} obj
   */
  isNotEmpty: function(obj, allowBlank = false) {
    return !util.isEmpty(obj, allowBlank)
  },
  /**
   * 判断是否为空对象
   * @param {*} obj
   */
  isEmptyObject: function(obj) {
    if (!obj) return true
    for (const name in obj) {
      return false
    }
    return true
  },
  /**
   * 判断是否为不空对象
   * @param {*} obj
   */
  isNotEmptyObject: function(obj) {
    return util.isNotEmptyObject(obj)
  },
  /**
   * 是否是对象
   * @param {*} input
   */
  isObject: function(input) {
    return Object.prototype.toString.call(input) === '[object Object]'
  },
  /**
   * 是否是数组
   * @param {*} input
   */
  isArray: function(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]'
  },
  isDate: function(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]'
  },
  isNumber: function(input) {
    return input instanceof Number || Object.prototype.toString.call(input) === '[object Number]'
  },
  isString: function(input) {
    return input instanceof String || Object.prototype.toString.call(input) === '[object String]'
  },
  isBoolean: function(input) {
    return typeof input === 'boolean'
  },
  isFunction: function(input) {
    return typeof input === 'function'
  },
  isNull: function(input) {
    return input === undefined || input === null
  },
  isNum: function(input) {
    if (util.isEmpty(input)) {
      return false
    }
    if (util.isString(input) && (input.substr(input.length - 1, 1) !== '.')) { // 避免最后一位为小数
      input = Number(input)
    }
    if (isNaN(input)) {
      return false
    } else {
      return util.isNumber(input)
    }
  },
  isValidNumber: function(t) {
    return typeof t === 'number' && !isNaN(t) && isFinite(t)
  },
  looseEqual: function(a, b) {
    const isObjectA = util.isObject(a)
    const isObjectB = util.isObject(b)
    if (isObjectA && isObjectB) {
      return JSON.stringify(a) === JSON.stringify(b)
    } else if (!isObjectA && !isObjectB) {
      return String(a) === String(b)
    } else {
      return false
    }
  },
  arrayEquals: function(arrayA, arrayB) {
    arrayA = arrayA || []
    arrayB = arrayB || []

    if (arrayA.length !== arrayB.length) {
      return false
    }

    for (let i = 0; i < arrayA.length; i++) {
      if (!util.looseEqual(arrayA[i], arrayB[i])) {
        return false
      }
    }
    return true
  },
  /**
   * 是否相等
   * @param {*} value1
   * @param {*} value2
   * @returns
   */
  isEqual: function(value1, value2) {
    if (Array.isArray(value1) && Array.isArray(value2)) {
      return util.arrayEquals(value1, value2)
    }
    return util.looseEqual(value1, value2)
  },
  /**
   * 比较2个对象是否相等
   * @param {*} value1
   * @param {*} value2
   * @returns
   */
  valueEquals: function(value1, value2) {
    if (util.isNull(value1) && util.isNull(value2)) return true
    return util.isEqual(value1, value2)
  },
  isPlainObject: function(obj) {
    if (obj && Object.prototype.toString.call(obj) === '[object Object]' && obj.constructor === Object && !hasOwnProperty.call(obj, 'constructor')) {
      var key
      for (var k in obj) {
        key = k
      }
      return key === undefined || hasOwnProperty.call(obj, key)
    }
    return false
  },
  isJSON: function(str) {
    if (util.isString(str)) {
      try {
        const obj = JSON.parse(str)
        return util.isPlainObject(obj) || util.isArray(obj)
      } catch (e) {
        return false
      }
    }
    return false
  },
  trim: function(text) {
    return text == null ? '' : (text + '').replace(rtrim, '')
  },
  /**
   * 判断参数是否是其中之一
   */
  oneOf: function(value, validList) {
    for (let i = 0; i < validList.length; i++) {
      if (value === validList[i]) {
        return true
      }
    }
    return false
  },
  /**
   * 判断参数是否是数组对象其中之一
   */
  oneOfObj: function(value, validList, key) {
    for (let i = 0; i < validList.length; i++) {
      if (value === validList[i][key]) {
        return true
      }
    }
    return false
  },
  /**
   * 全局唯一标识符
   */
  guid: function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  },
  /**
   * 转boolean 值
   * @param {*} obj
   * @param {*} defaultValue
   */
  toBoolean: function(obj, defaultValue = false) {
    if (util.isEmpty(obj)) {
      return defaultValue
    }
    return util.oneOf(obj, [true, 'True', 'Yes', 'true', '1', 1, 'yes', 'Y', 'y', 'T', 't'])
  },
  /**
 * 创建新数据，避免对象引用
 * @param {*} data
 * @param {*} defaultValue
 */
  newData: function(data, defaultValue) {
    return util.isNotEmpty(data) ? JSON.parse(JSON.stringify(data)) : (defaultValue || data)
  },
  /**
 * 转换json字符串的转换
 * @param {*} data
 * @param {*} defaultValue
 */
  parseData: function(data, defaultValue) {
    if (util.isNotEmpty(data)) {
      // eslint-disable-next-line no-eval
      return util.isPlainObject(data) || util.isArray(data) ? data : window ? window.eval('(' + data + ')') : JSON.parse(data)
    } else {
      return (defaultValue || data)
    }
  },
  /**
 * 转换json字符串的转换
 * @param {*} data
 * @param {*} defaultValue
 */
  parseJSON: function(data, defaultValue) {
    if (util.isNotEmpty(data)) {
      return util.isJSON(data) ? JSON.parse(data) : data
    } else {
      return (defaultValue || data)
    }
  },
  /**
  * eval 数据
  */
  evalData: function(data) {
    // eslint-disable-next-line no-eval
    return window ? window.eval(data) : data
  },
  /**
   * 格式化文件大小, 输出成带单位的字符串
   * @method formatSize
   * @grammar util.formatSize( size ) => String
   * @grammar util.formatSize( size, pointLength ) => String
   * @grammar util.formatSize( size, pointLength, units ) => String
   * @param {Number} size 文件大小
   * @param {Number} [pointLength=2] 精确到的小数点数。
   * @param {Array} [units=[ 'B', 'K', 'M', 'G', 'TB' ]] 单位数组。从字节，到千字节，一直往上指定。如果单位数组里面只指定了到了K(千字节)，同时文件大小大于M, 此方法的输出将还是显示成多少K.
   * @example
   * console.log( util.formatSize( 100 ) );    // => 100B
   * console.log( util.formatSize( 1024 ) );    // => 1.00K
   * console.log( util.formatSize( 1024, 0 ) );    // => 1K
   * console.log( util.formatSize( 1024 * 1024 ) );    // => 1.00M
   * console.log( util.formatSize( 1024 * 1024 * 1024 ) );    // => 1.00G
   * console.log( util.formatSize( 1024 * 1024 * 1024, 0, ['B', 'KB', 'MB'] ) );    // => 1024MB
   */
  formatSize: function(size, pointLength, units) {
    units = units || ['B', 'K', 'M', 'G', 'TB']
    let unit
    while ((unit = units.shift()) && size > 1024) {
      size = size / 1024
    }
    return (unit === 'B' ? size : size.toFixed(pointLength || 2)) + unit
  },
  /**
   * 格式化文本
   * @param {*} text
   */
  formatText: function(text) {
    return text !== null ? ('' + text).replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br />' + '$2') : ''
  },
  format: (str, args) => {
    if (args.length < 1) {
      return str
    }

    let data = args // 如果模板参数是数组
    if (args.length === 1 && typeof (args) === 'object') {
      // 如果模板参数是对象
      data = args
    }
    for (var key in data) {
      var value = data[key]
      if (undefined !== value) {
        str = str.replace('{' + key + '}', value)
      }
    }
    return str
  },
  /**
   * @description 打开新页面
   * @param {String} url 地址
   */
  open: function(url, target = '_blank') {
    var a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('target', target)
    a.setAttribute('id', 'ibps-open-link')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(document.getElementById('ibps-open-link'))
  },
  /**
 * 将array递归为一维数组。
 * @param {*} ary
 * @param {*} predicate
 * @param {*} result
 */
  flatten: function(ary, predicate, result) {
    result = result || []
    if (ary) {
      for (let i = 0; i < ary.length; i++) {
        const value = ary[i]
        if (Array.isArray(value)) {
          util.flatten(value, predicate, result)
        } else {
          (predicate && !predicate(value)) || result.push(value)
        }
      }
    }
    return result
  },
  requestAnimationFrame(callbak, time = 50) {
    let raf = window && window.requestAnimationFrame
    if (!raf) {
      raf = (fn) => setTimeout(fn, time)
    }
    raf(() => {
      setTimeout(callbak, time)
    })
  },
  /**
   * 动态加载样式
   * @param {*} styleText
   */
  createStyles(styleText, id, appendToEl = 'head') {
    const style = document.createElement('style')
    style.setAttribute('type', 'text/css')
    if (id) {
      const styleTag = document.getElementById(id)
      if (styleTag) {
        styleTag.parentNode.removeChild(styleTag)
      }
      style.setAttribute('id', id)
    }
    if (style.styleSheet) {
      style.styleSheet.cssText = styleText
    } else {
      style.appendChild(document.createTextNode(styleText))
    }

    (document.querySelector(appendToEl || 'body') || document.body).appendChild(style)
    return style
  },
  updateUrl: function(url, key) {
    key = (key || 't') + '=' // 默认key是"t",可以传入key自定义
    const reg = new RegExp(key + '\\d+') // 正则：t=1472286066028
    const timestamp = +new Date()
    if (url.indexOf(key) > -1) { // 有时间戳，直接更新
      return url.replace(reg, key + timestamp)
    } else { // 没有时间戳，加上时间戳
      if (url.indexOf('\?') > -1) {
        var urlArr = url.split('\?')
        if (urlArr[1]) {
          return urlArr[0] + '?' + key + timestamp + '&' + urlArr[1]
        } else {
          return urlArr[0] + '?' + key + timestamp
        }
      } else {
        if (url.indexOf('#') > -1) {
          return url.split('#')[0] + '?' + key + timestamp + location.hash
        } else {
          return url + '?' + key + timestamp
        }
      }
    }
  },
  reload: function() {
    if (wd) {
      wd.location.href = this.updateUrl(wd.location.href)
    }
  },
  getNumByFieldOptions(val, fieldOptions) {
    if (util.isEmpty(val)) {
      return val
    }
    if (util.isEmpty(fieldOptions) ||
    util.isEmpty(fieldOptions.number_format)) return val
    val = Number(val)
    if (fieldOptions.number_format === 'percent') {
      val = val * 100
      val = util.getNumByDecimals(val, fieldOptions)
      val += '%'
    } else {
      val = util.getNumByDecimals(val, fieldOptions)
      if (fieldOptions.thousands) {
        val = util.comdify(val)
      }
    }
    return val
  },
  getNumByDecimals(val, fieldOptions) {
    if (fieldOptions.keep_decimals) {
      if (util.isNotEmpty(fieldOptions.decimal_places)) {
        if (fieldOptions.decimal_scale) {
          val = val.toFixed(fieldOptions.decimal_places)
        } else {
          const multiple = Math.pow(10, fieldOptions.decimal_places)
          val = ((Math.round(val * multiple)) / multiple).toString()
        }
      }
    }
    return val
  },
  // 金额添加千分位
  comdify(n) {
    if (util.isEmpty(n)) return n
    const str = n.toString().split('.')
    const re = /\d{1,3}(?=(\d{3})+$)/g
    str[0] = str[0].replace(re, '$&,')
    return str.join('.')
  },
  // 去除千分位中的‘，’
  delcommafy(num) {
    if (util.isEmpty(num)) return num
    num = num.toString()
    num = num.replace(/,/gi, '')
    return num
  },
  /**
   * 转换数据
   * @param {*} text 格式文本
   * @param {*} data 对象数据
   */
  getDataByCustom(text, data) {
    if (util.isEmpty(text)) { return '' }
    const d = text.split(new RegExp('(\\$[0-9a-zA-Z._]+#)', 'g'))
    const rtn = []
    d.forEach(n => {
      let a = n
      if (/^\$(_widget_)/.test(n)) { // 对字段进行处理
        const f = n.replace('$_widget_', '').split('#')
        a = f ? util.isNotEmpty(data[f[0]]) ? data[f[0]] : '' : ''
      }
      rtn.push(a)
    })
    return rtn.join('')
  },
  // 递归获取数据
  getConfigurationData(msg, items, type, isJson) {
    let result = {}
    if (util.isEmpty(items)) return result
    for (let k = 0; k < items.length; k++) {
      const item = items[k]
      if (util.isEmpty(item.name)) continue
      let _data

      let desc = ''
      if (util.isFunction(msg)) {
        desc = msg(type, item.name, item.dataType)
      }
      if (item.dataType === 'string') {
        _data = item.defaultValue
      } else if (item.dataType === 'number') {
        if (util.isNum(item.defaultValue)) {
          _data = Number(item.defaultValue)
        } else {
          console.warn(desc)
          console.warn(item.defaultValue)
        }
      } else if (item.dataType === 'boolean') {
        if (['true', 'false'].includes(item.defaultValue)) {
          _data = Boolean(item.defaultValue)
        } else {
          console.warn(desc)
          console.warn(item.defaultValue)
        }
      } else if (item.dataType === 'date') {
        _data = item.defaultValue
      } else if (item.dataType === 'object') {
        _data = util.getConfigurationData(msg, item.children, type)
      } else if (item.dataType === 'bind') {
        if (util.isNotEmpty(item.defaultValue)) {
          try {
            // eslint-disable-next-line no-eval
            _data = eval(item.defaultValue)
          } catch (error) {
            console.warn(desc)
            console.warn(item.defaultValue)
          }
        }
      } else {
        _data = item.defaultValue
      }
      if (isJson && items.length === 1) {
        result = _data
      } else {
        result[item.name] = _data
      }
    }
    return result
  },
  getKebabCase(str, symbol = '_') {
    return str.replace(/([A-Z])|([0-9]{1,})/g, function(item) {
      return symbol + item.toLowerCase()
    })
  }
}

export default util
