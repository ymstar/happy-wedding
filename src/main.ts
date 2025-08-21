import { createSSRApp, ref } from 'vue'
import 'miniprogram-api-typings'
import './animate.scss'
import App from './App.vue'
import { GlobalData } from './types'

let innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.autoplay = true

const globalData: GlobalData = {
  innerAudioContext,
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

wx.setInnerAudioOption({
  obeyMuteSwitch: false,

  success: function (res) {
    console.log('开启静音模式下播放音乐的功能')
  },

  fail: function (err) {
    console.log('静音设置失败')
  }
})

export function createApp() {
  const app = createSSRApp(App)

  app.config.globalProperties.globalData = globalData

  return {
    app
  }
}
