<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { getCurrentInstance } from 'vue'
import { code2Session, getCommonConfig, getResouces, getUserByOpenId } from './api/happy-wedding'

onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})

const instance = getCurrentInstance()

uni.login({
  provider: 'weixin',
  success: res => {
    code2Session(res.code).then(res => {
      const openId = res.data.openid
      console.log('code2Session openId:', openId)
      instance.appContext.config.globalProperties.$MpUserData = {
        openId
      }

      getUserByOpenId(openId).then(res => {
        console.log('getUserByOpenId:', res)
        if (res?.data) {
          instance.appContext.config.globalProperties.$MpUserData = {
            openId,
            ...res.data
          }
        }
        console.log('globalProperties.$MpUserData:', instance.appContext.config.globalProperties.$MpUserData)
      })
    })
  },
  fail: err => {
    console.log('login fail:', err)
  }
})

uni.getSystemInfo({
  success: function (e) {
    instance.appContext.config.globalProperties.$StatusBar = e.statusBarHeight
    if (e.platform === 'android') {
      instance.appContext.config.globalProperties.$CustomBar = e.statusBarHeight! + 50
    } else {
      instance.appContext.config.globalProperties.$CustomBar = e.statusBarHeight! + 45
    }

    // #ifdef MP-WEIXIN
    instance.appContext.config.globalProperties.$StatusBar = e.statusBarHeight
    const custom = uni.getMenuButtonBoundingClientRect()
    instance.appContext.config.globalProperties.$Custom = custom
    instance.appContext.config.globalProperties.$CustomBar = custom.bottom + custom.top - e.statusBarHeight!
    // #endif

    // #ifdef MP-ALIPAY
    instance.appContext.config.globalProperties.$StatusBar = e.statusBarHeight
    instance.appContext.config.globalProperties.$CustomBar = e.statusBarHeight! + e.titleBarHeight!
    // #endif
  },
  fail: function (e) {
    console.log(e)
  }
})

getCommonConfig().then(res => {
  instance.appContext.config.globalProperties.$magic = !res.data.magicSwitch as boolean
})

getResouces('music').then(res => {
  instance.appContext.config.globalProperties.$musicList = res.data as any[]
})
</script>
<style lang="scss">
@import 'common/colorui/main.css';
@import 'common/colorui/icon.css';
@import 'common/colorui/animation.css';

page {
  height: 100%;
}

image {
  display: block;
}

.animate-ele-warp {
  width: 100%;
  height: 100%;
  transform-origin: center top;
  position: absolute;
  z-index: 3;
  transform: translate3d(0px, 0px, 3px);
  pointer-events: none;

  .animate-ele {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 20rpx;
    top: 20rpx;
    z-index: 3;
    pointer-events: none;

    .animate-img {
      position: absolute;
    }
  }
}

.bg-image {
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>
