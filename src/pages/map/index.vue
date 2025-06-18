<template>
  <view class="map">
    <!-- <image mode="aspectFit" class="head-img" src="../../static/images/t1.png" /> -->
    <view class="locations mb100" v-if="!presentExist">
      <view>
        <view>维艾OL婚宴艺术中心</view>
        <view>河北省张家口市张北县永春南大街88号</view>
      </view>
      <map class="content" id="map" :longitude="markers[0].longitude" :latitude="markers[0].latitude" :markers="markers"
        scale="18" @markertap="toNav">
      </map>
    </view>

    <div v-if="presentExist" class="locations">
      <div class="switch-buttons">
        <div class="switch-btn" :class="{ active: activeTab === 0 }" @tap="switchLocation(0)">婚礼大厅</div>
        <div class="switch-btn" :class="{ active: activeTab === 1 }" @tap="switchLocation(1)">住宿酒店</div>
      </div>
      <view v-if="activeTab === 0">
        <view>维艾OL婚宴艺术中心</view>
        <view>河北省张家口市张北县永春南大街88号</view>
      </view>
      <view v-if="activeTab === 1">
        <view>泰然酒店</view>
        <view>河北省张家口市张北县永春南大街82号万正商厦一楼</view>
      </view>
      <map class="content" id="map" :longitude="activeMarker.longitude" :latitude="activeMarker.latitude"
        :markers="markers" :enable-zoom="false" scale="18" @markertap="toNav"></map>
    </div>
    <div class="call">
      <div class="btn-group">
        <div class="btn" @tap="linkHe">
          <image src="../../static/images/he.png" />
          <span>呼叫新郎</span>
        </div>
        <div class="btn" @tap="linkShe">
          <image src="../../static/images/she.png" />
          <span>呼叫新娘</span>
        </div>
      </div>
      <div class="btn-group">
        <div class="btn" @tap="linkHotel">
          <image src="../../static/images/hotel.png" />
          <span>酒店前台</span>
        </div>
        <div class="btn" @tap="linkTransport">
          <image src="../../static/images/car.png" />
          <span>接送服务</span>
        </div>
      </div>
    </div>
    <image class="footer" src="../../static/images/grren-flower-line.png" />
  </view>
</template>
<script setup lang="ts">
import { getCommonConfig, getPresentList } from '@src/api/wedding-invitation'
import { GlobalData } from '@src/types'
import { getCurrentInstance, onMounted, ref } from 'vue'

const markers = ref([
  {
    iconPath: '../../static/images/nav.png',
    id: 0,
    width: 50,
    height: 50,
    latitude: '30',
    longitude: '104'
  },
  {
    iconPath: '../../static/images/nav.png',
    id: 1,
    width: 50,
    height: 50,
    latitude: '31.2304',
    longitude: '121.4737'
  }
])

const heNumber = ref('')
const sheNumber = ref('')
const hotelNumber = ref('')
const transportNumber = ref('')
const activeTab = ref(0)
const activeMarker = ref(markers.value[activeTab.value])
const presentExist = ref(false)

const instance = getCurrentInstance()
const globalData: GlobalData = instance.appContext.config.globalProperties.globalData
const openId = globalData.mpUserInfo.openId

onMounted(() => {
  getPresentList(openId).then(res => {
    if (res?.data?.length) {
      presentExist.value = true
    }
  })
  getCommonConfig().then(res => {
    heNumber.value = res.data.heNumber
    sheNumber.value = res.data.sheNumber
    markers.value[0].latitude = res.data.location.latitude
    markers.value[0].longitude = res.data.location.longitude
    if (presentExist.value) {
      markers.value[1].latitude = res.data.location.hotelLatitude
      markers.value[1].longitude = res.data.location.hotelLongitude
    }
    hotelNumber.value = res.data.info.hotelNumber
    transportNumber.value = res.data.info.transportNumber
  })
})

const toNav = res => {
  console.log(res)
  wx.openLocation({
    latitude: Number(markers.value[0].latitude),
    longitude: Number(markers.value[0].longitude),
    scale: 18
  })
}

const linkHe = () => {
  wx.makePhoneCall({
    phoneNumber: heNumber.value
  })
}
const linkShe = () => {
  wx.makePhoneCall({
    phoneNumber: sheNumber.value
  })
}

const linkHotel = () => {
  wx.makePhoneCall({
    phoneNumber: hotelNumber.value
  })
}

const linkTransport = () => {
  wx.makePhoneCall({
    phoneNumber: hotelNumber.value
  })
}

const switchLocation = (index) => {
  activeTab.value = index
  wx.createMapContext('map').moveToLocation({
    latitude: Number(markers.value[index].latitude),
    longitude: Number(markers.value[index].longitude)
  })
}
</script>

<style lang="scss" scoped>
.map {
  position: relative;
  height: 600px;
  background: #fff;

  .head-img {
    width: 100%;
    height: 180rpx;
    margin-bottom: 50rpx;
  }

  .content {
    width: 100%;
    // margin-left: 30rpx;
    height: 500rpx;
    // margin-bottom: 10rpx;
    border-radius: 20rpx;
  }

  .locations {
    position: relative;
    border-radius: 20rpx;
    box-shadow: rgb(153, 153, 153) 0 0 10rpx;
    padding: 20rpx;
    margin-left: 40rpx;
    margin-right: 40rpx;
    line-height: 1.5;
    font-size: 24rpx;

    .switch-buttons {
      position: relative;
      padding-bottom: 10px;
      display: flex;
      gap: 40rpx;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;

      .switch-btn {
        width: 200rpx;
        padding: 12rpx 40rpx;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 40rpx;
        font-size: 28rpx;
        text-align: center;
        color: #6b4f4e;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
        transition: all 0.3s;

        &.active {
          background: #f5e1da;
          color: #8a6d6b;
        }
      }
    }
  }

  .call {
    display: flex;
    flex-direction: column;
    gap: 30rpx;
    padding: 0 30rpx;

    .btn-group {
      display: flex;
      justify-content: space-between;

      .btn {
        flex: 0 0 48%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20rpx;
        background: #f8f5f3;
        border-radius: 16rpx;

        image {
          height: 80rpx;
          width: 80rpx;
          margin-bottom: 15rpx;
        }

        span {
          font-size: 28rpx;
          color: #6b4f4e;
        }
      }
    }
  }

  .footer {
    height: 80rpx;
    width: 716rpx;
    margin-left: 17rpx;
  }
}
</style>
