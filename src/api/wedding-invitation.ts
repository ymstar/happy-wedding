import { showToast } from '@src/utils'
import { http } from './service'
/**
 * 获取通用配置
 * @returns
 */
export function getCommonConfig() {
  return http.request({
    url: '/api/wedding-invitation/getCommonConfig',
    method: 'GET',
    params: {
      userId: import.meta.env.VITE_VUE_APP_USERID as string
    }
  })
}

/**
 * 获取资源配置
 * @returns
 */
export function getResouces(type: 'music' | 'photo-banner' | 'index-banner') {
  return http.request({
    url: '/api/wedding-invitation/getResouces',
    method: 'GET',
    params: {
      type,
      userId: import.meta.env.VITE_VUE_APP_USERID as string
    }
  })
}

/**
 * 获取留言板数据列表
 * @returns
 */
export function getAllMessageList() {
  return http.request({
    url: '/api/wedding-invitation/getMessageList',
    method: 'GET',
    params: {
      userId: import.meta.env.VITE_VUE_APP_USERID as string
    }
  })
}

/**
 * 添加留言
 * @param data
 * @returns
 */
export function addMessage(data) {
  return http.request({
    url: '/api/wedding-invitation/addMessage',
    method: 'POST',
    data,
    params: {
      userId: import.meta.env.VITE_VUE_APP_USERID as string
    }
  })
}

/**
 * 删除留言
 * @param data
 * @returns
 */
export function deleteMessage(id) {
  return http.request({
    url: '/api/wedding-invitation/deleteMessage',
    method: 'POST',
    params: {
      id,
      userId: import.meta.env.VITE_VUE_APP_USERID as string
    }
  })
}

/**
 * 通过 openId 获取用户
 * @returns
 */
export function getUserByOpenId(openid) {
  return http.request({
    url: '/api/wedding-invitation/getUserByOpenId',
    method: 'GET',
    params: {
      userId: import.meta.env.VITE_VUE_APP_USERID as string,
      openid
    }
  })
}

/**
 * 通过 openId 获取用户
 * @returns
 */
export function addOrUpdateUser(data) {
  return http.request({
    url: '/api/wedding-invitation/addOrUpdateUser',
    data,
    method: 'POST',
    params: {
      userId: import.meta.env.VITE_VUE_APP_USERID as string
    }
  })
}

/**
 * 获取用户列表
 * @returns
 */
export function getFriendUserList() {
  return http.request({
    url: '/api/wedding-invitation/getUserList',
    method: 'GET',
    params: {
      userId: import.meta.env.VITE_VUE_APP_USERID as string
    }
  })
}

/**
 * 获取出席数据列表
 * @returns
 */
export function getPresentList(openid?) {
  return http.request({
    url: '/api/wedding-invitation/getPresentList',
    method: 'GET',
    params: {
      openid,
      userId: import.meta.env.VITE_VUE_APP_USERID as string
    }
  })
}

/**
 * 增加或者更新出席数据
 * @returns
 */
export function addOrUpdatePresent(data) {
  return http.request({
    url: '/api/wedding-invitation/addOrUpdatePresent',
    method: 'POST',
    data,
    params: {
      userId: import.meta.env.VITE_VUE_APP_USERID as string
    }
  })
}
/**
 * 根据 jsCode 换取用户 openId
 * @param jsCodeMP
 * @returns
 */
export function code2Session(jsCodeMP: string) {
  return http.request({
    url: '/api/wechat/code2Session',
    method: 'GET',
    params: {
      jsCodeMP,
      userId: import.meta.env.VITE_VUE_APP_USERID as string
    }
  })
}

/**
 * 上传头像
 * @param data
 * @param openId
 * @returns
 */
export function uploadAvatar(filePath, formData) {
  return http.upload('/api/wedding-invitation/uploadAvatar', {
    filePath,
    name: 'file',
    formData,
    params: {
      userId: import.meta.env.VITE_VUE_APP_USERID as string
    }
  })
}
