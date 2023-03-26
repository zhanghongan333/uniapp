
import low from 'lowdb'
import Memory from 'lowdb/adapters/Memory'
import { getUuid } from '@/utils/auth'
import { cloneDeep } from 'lodash'
import { STORE_GLOBAL_KEY } from '@/constant'

const adapter = new Memory(STORE_GLOBAL_KEY)
console.log(adapter, 'adapter')
const db = low(adapter)

const ghostUuid = 'ghost-uuid'
const StorageDefaults = uni.getStorageSync(STORE_GLOBAL_KEY)
const defaults = {
  sys: {
    public: {},
    user: {
      [ghostUuid]: {}
    }
  },
  database: {}
}

db.defaults(StorageDefaults === '' ? defaults : StorageDefaults)
  .write()

export default db

/**
 * @description 检查路径是否存在 不存在的话初始化
 * @param {Object} payload dbName {String} 数据库名称
 * @param {Object} payload path {String} 路径
 * @param {Object} payload user {Boolean} 区分用户
 * @param {Object} payload validator {Function} 数据校验钩子 返回 true 表示验证通过
 * @param {Object} payload defaultValue {*} 初始化默认值
 * @returns {String} 可以直接使用的路径
 */
export function pathInit({
  dbName = 'database',
  path = '',
  user = true,
  validator = () => true,
  defaultValue = ''
}) {
  let uuid = getUuid()
  uuid = uuid === undefined || uuid === null || uuid === '' ? ghostUuid : (uuid + '')

  const currentPath = `${dbName}.${user ? `user.${uuid}` : 'public'}${path ? `.${path}` : ''}`
  const value = db.get(currentPath).value()
  if (!(value !== undefined && validator(value))) {
    db.set(currentPath, defaultValue)
      .write()
  }
  return currentPath
}

/**
 * @description 将数据存储到指定位置 | 路径不存在会自动初始化
 * @description 效果类似于取值 dbName.path = value
 * @param {Object} payload dbName {String} 数据库名称
 * @param {Object} payload path {String} 存储路径
 * @param {Object} payload value {*} 需要存储的值
 * @param {Object} payload user {Boolean} 是否区分用户
 */
export function dbSet({
  dbName = 'database',
  path = '',
  value = '',
  user = false
}) {
  db.set(pathInit({
    dbName,
    path,
    user
  }), value).write()
  uni.setStorageSync(STORE_GLOBAL_KEY, adapter.defaultValue)
}

/**
 * @description 获取数据
 * @description 效果类似于取值 dbName.path || defaultValue
 * @param {Object} payload dbName {String} 数据库名称
 * @param {Object} payload path {String} 存储路径
 * @param {Object} payload defaultValue {*} 取值失败的默认值
 * @param {Object} payload user {Boolean} 是否区分用户
 */
export function dbGet({
  dbName = 'database',
  path = '',
  defaultValue = '',
  user = false
}) {
  return cloneDeep(db.get(pathInit({
    dbName,
    path,
    user,
    defaultValue
  })).value())
}

/**
 * @description 获取存储数据库对象
 * @param {Object} payload user {Boolean} 是否区分用户
 */
export function database({
  dbName = 'database',
  path = '',
  user = false,
  validator = () => true,
  defaultValue = ''
} = {}) {
  return db.get(pathInit({
    dbName, path, user, validator, defaultValue
  }))
}
