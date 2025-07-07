import { showToast } from '@src/utils'
import { http } from './service'
/**
 * 获取通用配置
 * @returns
 */
export function getCommonConfig() {
  return http.request({
    url: '/api/happy-wedding/business/getCommonConfig',
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
export function getResouces(type: 'music' | 'photo-banner' | 'photo') {
  return http.request({
    url: '/api/happy-wedding/business/getResources',
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
    url: '/api/happy-wedding/business/getMessageList',
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
export function addMessage(message:string, openId:string) {
  return http.request({
    url: '/api/happy-wedding/business/addMessage',
    method: 'POST',
    params: {
      userId: import.meta.env.VITE_VUE_APP_USERID as string,
      message: message,
      openId: openId
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
    url: '/api/happy-wedding/business/deleteMessage',
    method: 'POST',
    params: {
      messageId: id,
      userId: import.meta.env.VITE_VUE_APP_USERID as string
    }
  })
}

/**
 * 通过 openId 获取访客信息
 * @returns
 */
export function getUserByOpenId(openid) {
  return http.request({
    url: '/api/happy-wedding/business/getVisitorByOpenId',
    method: 'GET',
    params: {
      userId: import.meta.env.VITE_VUE_APP_USERID as string,
      openId: openid
    }
  })
}

/**
 * 新增访客
 * @returns
 */
export function addOrUpdateUser(data) {
  return http.request({
    url: '/api/happy-wedding/business/addOrUpdateVisitor',
    method: 'POST',
    params: {
      userId: import.meta.env.VITE_VUE_APP_USERID as string,
      openId: data.openid,
      nickName: data.user.nickName,
      avatarUrl: data.user.avatarUrl
    }
  })
}

/**
 * 获取访客列表
 * @returns
 */
export function getFriendUserList() {
  return http.request({
    url: '/api/happy-wedding/business/getVisitorList',
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
    url: '/api/happy-wedding/business/getPresent',
    method: 'GET',
    params: {
      openId: openid,
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
    url: '/api/happy-wedding/business/addPresent',
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
    url: '/api/happy-wedding/wechat/code2Session',
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
export function uploadAvatar(filePath, openid) {
  return http.upload('/api/happy-wedding/business/uploadAvatar', {
    filePath,
    name: 'file',
    params: {
      userId: import.meta.env.VITE_VUE_APP_USERID as string, 
      openId: openid
    }
  })
}
