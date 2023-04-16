// import request from '@/utils/request/index.js'
import { getToken } from '@/utils/auth'
import { BASE_API, SYSTEM_URL } from '@/api/baseUrl'

/**
 * 获取图片地址
 * @param {*} attachmentId
 */
export function getImage(attachmentId) {
  return BASE_API() + SYSTEM_URL() + '/file/getImage?attachmentId=' +
  attachmentId + '&access_token=' + getToken()
}

/**
 * 获取照片地址
 * @param {*} attachmentId
 */
export function getPhoto(photo) {
  return BASE_API() + SYSTEM_URL() + photo + '&access_token=' + getToken()
}
