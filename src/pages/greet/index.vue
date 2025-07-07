<template>
  <div class="message">
    <!-- 留言模块 -->
    <scroll-view scroll-y v-if="magic" class="box">
      <p class="place"></p>
      <div class="item" v-for="(item, index) in messageList" :key="index">
        <image class="left" :src="item.visitor.avatarUrl" />
        <div class="right">
          <div class="top">
            <uni-tag v-if="item.customIndex === 0" text="⬆️" type="success" @click="copy(item)" />
            <div class="delete">
              <image src="../../static/images/close.png" class="delete_icon" @click="deleteMessage(item)"
                v-if="isAdmin" />
            </div>
            <span class="top-l">{{ item.visitor.name }}</span>
            <span class="top-r">{{ formatDateTime(item.createdAt) }}</span>
          </div>
          <p class="con">{{ item.message }}</p>
        </div>
      </div>
      <p class="place-end"></p>
    </scroll-view>
    <div class="dialog" v-show="isOpen">
      <textarea class="desc" placeholder="在这里输入您想要说的话" placeholder-style="color:#ccc;" v-model="desc" />
      <div class="btn">
        <button class="left" @tap="sendMessage">发送留言</button>
        <button class="right" @tap="cancel">取消</button>
      </div>
    </div>
  </div>
  <div class="greet">
    <!-- <image class="head" src="../../static/images/heart-animation.gif" /> -->
    <p class="count">已收到{{ userList.length }}位好友送来的祝福</p>
    <scroll-view scroll-y class="image-box">
      <div class="image-item" v-for="(item, index) in userList" :key="index">
        <view class="cu-avatar round lg" :style="{
          'background-image': `url(${item.avatarUrl})`
        }"></view>
        <!-- <p>{{ item.user.nickName }}</p> -->
      </div>
    </scroll-view>

    <view class="cu-modal" :class="modalName === 'Modal' ? 'show' : ''">
      <view class="cu-dialog">
        <view class="cu-bar bg-white justify-end">
          <view class="content">怎么称呼您？</view>
          <view class="action" @tap="hideModal">
            <text class="cuIcon-close text-red"></text>
          </view>
        </view>
        <view class="padding-sm">
          <form>
            <view class="cu-form-group margin-top">
              <view class="title">头像</view>

              <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
                <view class="cu-avatar round lg" :style="{
                  'background-image': `url(${avatarUrl})`
                }"></view>
              </button>
            </view>
            <view class="cu-form-group margin-top">
              <view class="title">昵称</view>
              <input type="nickname" placeholder="请选择或输入昵称" @blur="onInput" v-model="nickname" />
            </view>
          </form>
        </view>
        <view class="cu-bar bg-white justify-end">
          <view class="action">
            <button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
            <button class="cu-btn bg-green margin-left" @tap="onConfirm">确定</button>
          </view>
        </view>
      </view>
    </view>
  </div>
  <div class="bottom">
    <button class="left" lang="zh_CN" open-type="getUserInfo" @getuserinfo="sendGreet">送上祝福</button>
    <button v-if="magic" class="right" lang="zh_CN" open-type="getUserInfo" @getuserinfo="toMessage">说点啥吧</button>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref, computed, getCurrentInstance } from 'vue'
import { showToast } from '@src/utils'
import { GlobalData } from '@src/types'
import UniTag from '@src/component/uni-tag.vue'
import {
  addMessage,
  addOrUpdateUser,
  getAllMessageList,
  getFriendUserList,
  getCommonConfig,
  getUserByOpenId,
  uploadAvatar,
  deleteMessage as deleteMessageApi,
} from '@src/api/happy-wedding'
import { onShareAppMessage, onShareTimeline, onShow } from '@dcloudio/uni-app'

const isOpen = ref(false)
const desc = ref('')
const messageList = ref([])
const userInfo = ref(null)
const isForm = ref(false)
const isVideo = ref(false)
const isFormlist = ref(false)
const formList = ref([])
const url = ref('')
const poster = ref('')
const adminsIds = ref([])
const musicPlay = ref(false)
const nickname = ref('')
const formRef = ref(null)
const userList = ref([])

const modalName = ref(null)
const instance = getCurrentInstance()
const globalData: GlobalData = instance.appContext.config.globalProperties.globalData

const openId = globalData.mpUserInfo.openId

const isAdmin = computed(() => {
  return adminsIds.value.indexOf(openId) !== -1
})
const magic = ref(true);

const avatarUrl = ref(
  'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
)

onShow(() => {
  getVideoUrl()
  getUserList()
  isVideo.value = false
  isForm.value = false
  isFormlist.value = false
  getMessageList()
})

onMounted(() => {
  magic.value = globalData.magic;
})

// 分享到会话
onShareAppMessage(() => {
  return {
    title: '好久不见，婚礼见٩(๑^o^๑)۶',
    imageUrl: '../../static/images/shareAppMsg.jpg'
  };
})

// 分享到朋友圈
onShareTimeline(() => {
  return {
    title: '好久不见，婚礼见٩(๑^o^๑)۶',
    imageUrl: '../../static/images/shareTimeline.jpg'
  };
})

const formatDateTime = dateTimeString => {
  const dateObject = new Date(dateTimeString)
  const formattedDateTime = `${dateObject.toISOString().slice(0, 19).replace('T', ' ')}`
  return formattedDateTime
}

const onInput = e => {
  nickname.value = e.detail.value
}

const hideModal = e => {
  modalName.value = null
}
const onConfirm = e => {
  if (nickname.value === null || nickname.value === '') {
    showToast('请选择或输入昵称~')
    return
  }

  if (avatarUrl.value === null || avatarUrl.value === '') {
    showToast('请选择或上传头像~')
    return
  }
  modalName.value = null

  const openId = instance.appContext.config.globalProperties.$MpUserData.openId
  uploadAvatar(avatarUrl.value, openId)
  .then(res => {
    addOrUpdateUser({
      openid: openId,
      user: {
        nickName: nickname.value,
        avatarUrl: res.data
      }
    }).then(res => {
      showToast('祝福成功~')
      if (magic.value) {
        isOpen.value = true
      }
      getUserList()
      getUserByOpenId(openId).then(res => {
        if (res?.data?.length > 0) {
          instance.appContext.config.globalProperties.$MpUserData = {
            openId,
            ...res.data[0]
          }
        }
      })
    })
  })
}

const sendGreet = e => {

  if (instance.appContext.config.globalProperties.$MpUserData?.name) {
    showToast('您已经送过祝福了~')
  } else {
    addUser()
  }
}

const onChooseAvatar = e => {
  avatarUrl.value = e.detail.avatarUrl
}

const getVideoUrl = () => {
  getCommonConfig().then(res => {
    url.value = res.data.videoUrl
    poster.value = res.data.poster
    adminsIds.value = res.data.adminOpenIds
  })
}

const copy = item => {
  if (typeof item.customIndex === 'number') {
    uni.setClipboardData({
      data: item.desc,
      success: function () {
        showToast('复制成功')
      }
    })
  }
}

const toMessage = e => {
  if (instance.appContext.config.globalProperties.$MpUserData?.name) {
    isOpen.value = true
  } else {
    modalName.value = 'Modal'
  }
}

const cancel = () => {
  isOpen.value = false
}

const sendMessage = () => {
  if (desc.value) {
    addMessage(desc.value,
      instance.appContext.config.globalProperties.$MpUserData.openId
    ).then(res => {
      isOpen.value = false
      desc.value = ''
      getMessageList()
    })
  } else {
    showToast('说点什么吧~')
  }
}

const deleteMessage = item => {
  wx.showModal({
    title: '提示',
    content: '确认删除？',
    success(res) {
      if (res.confirm) {
        deleteMessageApi(item.id).then(res => {
          desc.value = ''
          getMessageList()
        })
      } else if (res.cancel) {
      }
    }
  })
}

const getNowFormatDate = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const hh = now.getHours()
  const mm = now.getMinutes()
  const ss = now.getSeconds()
  let clock = year + '-'
  if (month < 10) {
    clock += '0'
  }
  clock += month + '-'
  if (day < 10) {
    clock += '0'
  }
  clock += day + ' '
  if (hh < 10) {
    clock += '0'
  }
  clock += hh + ':'
  if (mm < 10) {
    clock += '0'
  }
  clock += mm + ':'
  if (ss < 10) {
    clock += '0'
  }
  clock += ss
  return clock
}

const getMessageList = () => {
  getAllMessageList().then(res => {
    messageList.value = res.data
  })
}

const addUser = () => {
  modalName.value = 'Modal'
}


const getUserList = () => {
  getFriendUserList().then(res => {
    userList.value = res.data.reverse()
  })
}
</script>

<style lang="scss" scoped>
.message {
  height: 70%;
  width: 100%;

  .box {
    height: 100%;
    background: #f9e0d9;
    width: 100%;

    .place {
      height: 20rpx;
    }

    .place-end {
      height: 160rpx;
    }

    .item {
      width: 695rpx;
      margin-left: 30rpx;
      border-radius: 16rpx;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 30rpx;
      margin-bottom: 20rpx;

      .left {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50rpx;
      }

      .right {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        min-height: 100rpx;
        align-items: flex-start;
        width: 480rpx;
        margin-left: 20rpx;

        .top {
          height: 40rpx;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .top-l {
            height: 50rpx;
            line-height: 50rpx;
            color: #444;
            font-size: 28rpx;
          }

          .top-r {
            height: 50rpx;
            line-height: 50rpx;
            color: #999;
            font-size: 24rpx;
          }
        }

        .con {
          line-height: 50rpx;
          color: #666;
          font-size: 28rpx;
          white-space: pre-wrap;
          width: 450rpx;
        }

        .delete {
          display: flex;
          line-height: 50rpx;
          width: 48rpx;

          .delete_icon {
            width: 36rpx;
            height: 36rpx;
          }
        }
      }
    }
  }

  .dialog {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 30rpx;
    z-index: 6669;
    background: #fff;
    width: 100%;

    .avatar-wrapper {
      padding: 0;
      width: 56px !important;
      border-radius: 8px;
      margin-top: 40px;
      margin-bottom: 40px;
    }

    .avatar {
      display: block;
      width: 56px;
      height: 56px;
    }

    textarea {
      height: 200rpx;
      line-height: 42rpx;
      font-size: 30rpx;
      color: #333;
      resize: none;
      outline: none;
      padding: 30rpx;
      width: 690rpx;
      background: #f5f5f5;

      &::-webkit-input-placeholder {
        font-size: 30rpx;
        color: #999;
      }
    }

    .btn {
      height: 120rpx;
      display: flex;
      justify-content: center;
      align-items: center;

      .left,
      .right {
        height: 80rpx;
        line-height: 80rpx;
        font-size: 28rpx;
        flex: 2;
        color: #fff;
        background: #ed695d;
        margin: 0 20rpx 0 30rpx;
      }

      .right {
        flex: 1;
      }
    }
  }

  .video-dialog {
    position: fixed;
    right: 10rpx;
    top: 200rpx;
    width: 100rpx;
    height: 100rpx;
    box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
    background: #fff;
    border-radius: 16rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .form-dialog {
    position: fixed;
    right: 10rpx;
    top: 320rpx;
    width: 100rpx;
    height: 100rpx;
    box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
    background: #fff;
    border-radius: 50rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .video,
  .form,
  .form-list {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 99;
  }

  .form-list {
    background: rgba(0, 0, 0, 0.5);
  }
}

.greet {
  width: 100%;
  height: 20%;

  .head {
    height: 150rpx;
    width: 200rpx;
    margin: 0 auto;
  }

  .cu-form-group .title {
    min-width: calc(4em + 15px);
  }

  .image-box {
    height: 100%;
    width: 100%;
    margin-left: 10rpx;
    border-radius: 16rpx;
    // box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;

    .image-item {
      width: 180rpx;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding: 25rpx;
      float: left;

      image {
        width: 180rpx;
        height: 180rpx;
        border-radius: 90rpx;
      }

      p {
        height: 90rpx;
        line-height: 60rpx;
        font-size: 24rpx;
        color: #444;
        width: 90rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
      }
    }
  }

  .count {
    height: 60rpx;
    line-height: 60rpx;
    background: rgba(255, 255, 255, 0.5);
    position: fixed;
    bottom: 130rpx;
    left: 0;
    font-size: 28rpx;
    color: #444;
    text-align: center;
    width: 100%;
  }
}

.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 120rpx;
  background: rgba(255, 255, 255, 0.75);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .left,
  .right {
    height: 80rpx;
    line-height: 80rpx;
    font-size: 28rpx;
    width: 300rpx;
    color: #fff;
    background: #ed695d;
    margin: 0 20rpx 0 0;
  }

  .right {
    margin: 0;
  }
}
</style>