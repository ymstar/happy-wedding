import { createSSRApp, ref } from 'vue'
import 'miniprogram-api-typings'
import './animate.scss'

import App from './App.vue'
import { GlobalData } from './types'
import { code2Session, getCommonConfig, getResouces, getUserByOpenId } from './api/happy-wedding'

wx.setInnerAudioOption({
  obeyMuteSwitch: false,

  success: function (res) {
    console.log('开启静音模式下播放音乐的功能')
  },

  fail: function (err) {
    console.log('静音设置失败')
  }
})

const userInfo = ref({
  openId: null,
  id: null,
  userId: null,
  openid: null,
  name: null,
  avatarUrl: null,
  createdAt: null,
  updatedAt: null
})

uni.login({
  provider: 'weixin',
  success: res => {
    code2Session(res.code).then(res => {
      const openId = res.data.openid
      userInfo.value.openId = openId

      getUserByOpenId(openId).then(res => {
        if (res?.data?.length > 0) {
          userInfo.value = {
            openId,
            ...res.data[0]
          }
        }
      })
    })
  }
})

let innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.autoplay = true

const globalData: GlobalData = {
  magic: false,
  mpUserInfo: userInfo.value,
  innerAudioContext,
  musicList: [],
  musicIndex: 1,
  animations: [
    `bounce`,
    `flash`,
    `pulse`,
    `rubberBand`,
    `shake`,
    `headShake`,
    `swing`,
    `tada`,
    `wobble`,
    `jello`,
    `bounceIn`,
    `bounceInDown`,
    `bounceInLeft`,
    `bounceInRight`,
    `bounceInUp`,
    `fadeIn`,
    `fadeInDown`,
    `fadeInDownBig`,
    `fadeInLeft`,
    `fadeInLeftBig`,
    `fadeInRight`,
    `fadeInRightBig`,
    `fadeInUp`,
    `fadeInUpBig`,
    `flipInX`,
    `flipInY`,
    `lightSpeedIn`,
    `rotateIn`,
    `rotateInDownLeft`,
    `rotateInDownRight`,
    `rotateInUpLeft`,
    `rotateInUpRight`,
    `jackInTheBox`,
    `rollIn`,
    `zoomIn`,
    `zoomInDown`,
    `zoomInLeft`,
    `zoomInRight`,
    `zoomInUp`,
    `slideInDown`,
    `slideInLeft`,
    `slideInRight`,
    `slideInUp`,
    `heartBeat`
  ]
}

getResouces('music').then(res => {
  globalData.musicList = res.data as any[]
  // innerAudioContext.src = globalData.musicList[0].url
})
getCommonConfig().then(res => {
  globalData.magic = !res.data.magicSwitch as boolean
})

export function createApp() {
  const app = createSSRApp(App)

  app.config.globalProperties.globalData = globalData

  return {
    app
  }
}
