<template>
  <div class="photo">
    <image class="bg-image" :src="background" />
    <swiper current=0 indicator-dots=true class="banner_style" autoplay=true interval=2600 duration=1200>
      <block v-for="(item, index) in bannerList" :key="index">
        <swiper-item>
          <image :src="item.url" class="banner_image_style" mode="aspectFill" />
        </swiper-item>
      </block>
    </swiper>
    <div class="grid-container">
      <div v-for="(item, index) in list" :key="index" class="grid-item" :style="{ animationDelay: `${index * 0.1}s` }"
        @click="previewImage(index)">
        <image mode="aspectFill" class="grid-image" :src="item.url" />
      </div>
    </div>
  </div>
  <!-- <div class="video-dialog" @tap="toVideo" v-if="url !== '' && url !== undefined && url !== null">
    <image src="../../static/images/video1.png" />
  </div>
  <div class="video" v-if="isVideo">
    <h-video @closeVideo="closeVideo" :url="url" :poster="poster"></h-video>
  </div> -->
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from 'vue'
import HSwiper from '@src/component/swiper.vue'
import HVideo from '@src/component/video.vue'
import { onHide, onShareAppMessage, onShareTimeline, onShow } from '@dcloudio/uni-app'
import { getResouces, getCommonConfig } from '@src/api/happy-wedding'
import { GlobalData } from '@src/types'

const bannerList = ref([])
const list = ref([])
const isGif = ref(false)
const background = ref('')
const autoplay = ref(false)
const musicPlay = ref(false)
const url = ref('')
const isVideo = ref(false)
const poster = ref('')

const instance = getCurrentInstance()
const globalData: GlobalData = instance.appContext.config.globalProperties.globalData

onMounted(() => {
  getList()
  getCommonConfig().then(res => {
    background.value = res.data.background
  })
})

onShow(() => {
  autoplay.value = true
  getVideoUrl()
})

onHide(() => {
  autoplay.value = false
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

const getList = () => {
  getResouces('photo').then(res => {
    let result = []
    for (let i = 0; i < res.data.length; i++) {
      let show = i === 0
      result.push({
        url: res.data[i].url,
        show: show
      })
    }
    list.value = result
  })
  getResouces('photo-banner').then(res => {
    let result = []
    for (let i = 0; i < res.data.length; i++) {
      let show = i === 0
      result.push({
        url: res.data[i].url,
        show: show
      })
    }
    bannerList.value = result
  })
}

const previewImage = (index: number) => {
  uni.previewImage({
    current: index,
    urls: list.value.map(item => item.url)
  })
}

const toVideo = () => {
  isVideo.value = true
  musicPlay.value = false
  if (!globalData.innerAudioContext.paused) {
    musicPlay.value = true
    globalData.innerAudioContext.pause()
  }
}

const closeVideo = () => {
  isVideo.value = false
  if (musicPlay.value) {
    globalData.innerAudioContext.play()
  }
}

const getVideoUrl = () => {
  getCommonConfig().then(res => {
    url.value = res.data.videoUrl
    poster.value = res.data.poster
  })
}
</script>

<style lang="scss" scoped>
.photo {
  height: 100%;
  // padding: 20rpx;

  .grid-container {
    column-count: 2;
    column-gap: 20rpx;
    min-height: 80vh;
    position: relative;
    padding: 20rpx;

    .click-guard {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 0;
    }

    .grid-item {
      break-inside: avoid;
      margin-bottom: 20rpx;
      width: 100%;
      height: 300rpx;
      animation: scaleUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      position: relative;
      z-index: 1;

      .grid-image {
        width: 100%;
        height: 100%;
        border-radius: 16rpx;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
        transition: transform 0.3s ease;
      }

      &:active .grid-image {
        transform: scale(0.95);
      }
    }
  }

  .banner_style {
    padding: 20rpx;
    height: 300px;
    border-radius: 10px;
  }

  .banner_image_style {
    width: 100%;
    height: 100%;
    border-radius: 10px;
}

  @keyframes scaleUp {
    from {
      transform: scale(0.8);
    }

    to {
      opacity: 1;
      transform: scale(1);
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
  z-index: 9999;

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
</style>
