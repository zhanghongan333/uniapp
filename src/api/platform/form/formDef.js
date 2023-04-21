import request from '@/utils/request'
import { FORM_URL } from '@/api/baseUrl'

/**
 * 通过formkey获取表单定义数据
 * @param {*} params
 */
export function getFormDataByFormKey(params) {
  return request.request({
    url: FORM_URL() + '/form/def/getFormDataByFormKey',
    method: 'get',
    params
  })
}

/**
 * 获取表单定义数据
 * @param {*} params
 */
export function getFormData(params) {
  return request.request({
    url: FORM_URL() + '/form/def/getFormData',
    method: 'post',
    params
  })
}

/**
 * 获取数据库类型
 * @param {*} params
 */
export function getDatabaseType(params) {
  return request.request({
    url: FORM_URL() + '/form/info/business/table/case',
    method: 'get',
    params: params
  })
}
