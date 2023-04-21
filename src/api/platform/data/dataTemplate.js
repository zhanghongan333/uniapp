import request from '@/utils/request'
import { DATA_URL } from '@/api/baseUrl'
/**
 * 查询列表数据
 * @param {*} params
 */
export function queryPageList(data) {
  return request.request({
    url: DATA_URL() + '/data/template/query',
    method: 'post',
    data: data
  })
}
/**
 * 删除数据
 * @param {*} params
 */
export function remove(params) {
  return request.request({
    url: DATA_URL() + '/data/template/remove',
    method: 'post',
    isLoading: true,
    params: params
  })
}
/**
 * 逻辑删除
 * @param {*} params
 */
export function logicRemove(data) {
  return request.request({
    url: DATA_URL() + '/data/template/remove/formData/logic',
    method: 'post',
    isLoading: true,
    data: data
  })
}
/**
 * 保存数据
 * @param {*} params
 */
export function save(params) {
  return request.request({
    url: DATA_URL() + '/data/template/save/vo',
    method: 'post',
    isLoading: true,
    data: params
  })
}

/**
 * 获取数据
 * @param {*} params
 */
export function get(params) {
  return request.request({
    url: DATA_URL() + '/data/template/get',
    method: 'get',
    params: params
  })
}

/**
 * 获取数据(通过ID转换为名称)
 * @param {*} params
 */
export function transfer(params) {
  return request.request({
    url: DATA_URL() + '/data/template/transfer',
    method: 'post',
    data: params
  })
}

/**
 * 获取数据(通过ID转换为名称)
 * @param {*} params
 */
export function transferObject(params) {
  return request.request({
    url: DATA_URL() + '/data/template/transfer/object',
    method: 'post',
    data: params
  })
}

/**
 * 获取数据(通过ID转换为名称)
 * @param {*} params
 */
export function transferByIds(params) {
  return request.request({
    url: DATA_URL() + '/data/template/transferByIds',
    method: 'post',
    data: params
  })
}

/**
 * 判断模版key是否存在
 * @param {*} params
 */
export function isKeyExists(params) {
  return request.request({
    url: DATA_URL() + '/data/template/isKeyExists',
    method: 'post',
    params: params
  })
}

/**
 * 获取数据
 * @param {*} params
 */
export function getByKey(params) {
  return request.request({
    url: DATA_URL() + '/data/template/getByKey',
    method: 'get',
    params: params
  })
}

/**
 * 通过id获取数据
 * @param {*} params
 */
export function getById(params) {
  return request.request({
    url: DATA_URL() + '/data/template/getById',
    method: 'get',
    params: params
  })
}

/**
 * 通过id获取数据
 * @param {*} params
 */
export function getBuildDataById(params) {
  return request.request({
    url: DATA_URL() + '/data/template/getBuildDataById',
    method: 'get',
    params: params
  })
}

/**
 * 通过Key获取数据
 * @param {*} params
 */
export function getBuildDataByKey(params) {
  return request.request({
    url: DATA_URL() + '/data/template/getBuildDataByKey',
    method: 'get',
    params: params
  })
}
/**
 * 获取列表数据
 * @param {*} params
 */
export function queryDataByKey(params, isLoading = true) {
  return request.request({
    url: DATA_URL() + '/data/template/queryDataByKey',
    method: 'post',
    data: params,
    isLoading
  })
}

/**
 * 获取列表数据
 * @param {*} params
 */
export function queryDataTable(params, isLoading = true) {
  return request.request({
    url: DATA_URL() + '/data/template/queryDataTable',
    method: 'post',
    data: params,
    isLoading
  })
}

/**
 * 获取列表数据
 * @param {*} params
 */
export function queryTreeData(params) {
  return request.request({
    url: DATA_URL() + '/data/template/queryTreeData',
    method: 'post',
    data: params
  })
}

/**
 * 通过key，获取关联的数据
 * @param {*} data
 */
export function queryLinkageData(data, isLoading = true) {
  return request.request({
    url: DATA_URL() + '/data/template/queryLinkageData',
    method: 'post',
    data,
    isLoading
  })
}
/*
* 获取列表数据
* @param {*} params
*/
export function queryLinkData(params) {
  return request.request({
    url: DATA_URL() + '/data/template/queryLinkData',
    method: 'post',
    data: params
  })
}

/**
 * 保存表单数据
 * @param {*} params
 */
export function saveFormData(params) {
  return request.request({
    url: DATA_URL() + '/data/template/saveFormData/vo',
    method: 'post',
    isLoading: true,
    data: params
  })
}

/**
 * 删除表单数据
 * @param {*} params
 */
export function removeFormData(params) {
  return request.request({
    url: DATA_URL() + '/data/template/removeFormData',
    method: 'post',
    isLoading: true,
    params: params
  })
}

