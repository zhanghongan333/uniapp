import request from '@/utils/request/index.js'
import { AUTH_URL, BPMN_URL } from '@/api/baseUrl'

/**
 * 获取菜单数据
 * @param {*} params
 */
export function getMenuData(params) {
  return request.request({
    url: AUTH_URL() + '/auth/appres/getMenuData',
    method: 'get',
    params: params
  })
}

export function getInfoCount(params) {
  return request.request({
    url: BPMN_URL() + '/bpm/initiated/find/dashboard/mobile',
    method: 'get',
    params: params
  })
}
