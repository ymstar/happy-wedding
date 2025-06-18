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
        <div class="ele-img eles active" data-id="1659431174001" data-pid="" data-type="image" data-show="true" pid=""
          type="image" sign="true" signsort="6"
          style="left: 52.5px; top: 719.5px; width: 86px; height: 86px; transform: rotate(0deg);">
          <div class="ani-wrap"><!---->
            <div class="rotate-wrap"
              style="-webkit-mask-box-image-source: url('https://wedding.sym930302.xyz/public/wedding-invitation/yangming/index-banner/_VqyrvQi6do.jpg');">
              <div class="ele-img-bg"
                style="font-family: 微软雅黑; font-size: 12px; color: rgb(0, 0, 0); opacity: 1; border-radius: 43px; border-width: 0px; border-style: solid; border-color: rgb(153, 153, 153); box-shadow: rgb(153, 153, 153) 0px 0px 0px; transform: none;">
                <div class="ele-bg-wrap"
                  style="background-image: url('https://wedding.sym930302.xyz/public/wedding-invitation/yangming/index-banner/_VqyrvQi6do.jpg');">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ele-img eles" data-id="1659426704775" data-pid="" data-type="image" data-show="true" pid=""
          type="image" signsort="1"
          style="left: 171px; top: 745.5px; width: 34px; height: 34px; transform: rotate(0deg);">
          <div class="ani-wrap"><!---->
            <div class="rotate-wrap">
              <div class="ele-img-bg"
                style="font-family: 微软雅黑; font-size: 12px; color: rgb(0, 0, 0); opacity: 1; border-radius: 0px; border-width: 0px; border-style: solid; border-color: rgb(153, 153, 153); box-shadow: rgb(153, 153, 153) 0px 0px 0px; transform: none;">
                <div class="ele-bg-wrap"
                  style="background-image: url('https://h5cdn.hunbei.com/editorCustomPic/2023-2-28-ZejaRXtxjM75edGTaxMTmsHWzDYiTZPc.png');">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ele-img eles active" data-id="1659431174001" data-pid="" data-type="image" data-show="true" pid=""
          type="image" sign="true" signsort="6"
          style="left: 52.5px; top: 719.5px; width: 86px; height: 86px; transform: rotate(0deg);">
          <div class="ani-wrap"><!---->
            <div class="rotate-wrap"
              style="-webkit-mask-box-image-source: url('https://wedding.sym930302.xyz/public/wedding-invitation/yangming/index-banner/_VqyrvQi6do.jpg');">
              <div class="ele-img-bg"
                style="font-family: 微软雅黑; font-size: 12px; color: rgb(0, 0, 0); opacity: 1; border-radius: 43px; border-width: 0px; border-style: solid; border-color: rgb(153, 153, 153); box-shadow: rgb(153, 153, 153) 0px 0px 0px; transform: none;">
                <div class="ele-bg-wrap"
                  style="background-image: url('https://wedding.sym930302.xyz/public/wedding-invitation/yangming/index-banner/_VqyrvQi6do.jpg');">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-group">
        <div class="bohao eles" data-id="1659427885570" data-pid="" data-type="bohao" data-show="true" pid=""
          type="bohao" tel="18888888888" sign="true" signsort="8"
          style="left: 50px; top: 859px; width: 91px; height: 22px; transform: rotate(0deg);">
          <div class="ani-wrap"
            style="background-color: rgb(174, 62, 52); border-radius: 5px; border-color: rgb(153, 153, 153); border-style: solid; border-width: 0px; box-shadow: rgb(153, 153, 153) 0px 0px 0px; opacity: 1;">
            <div class="btn" @tap="linkHe" style="font-size: 12px; color: rgb(255, 255, 255);">
              <image class="call-icon" src="../../static/images/call.png" />
              <span class="btn-text">联系新郎</span>
            </div>
          </div>
        </div>
        <div class="bohao eles" data-id="1659427885570" data-pid="" data-type="bohao" data-show="true" pid=""
          type="bohao" tel="18888888888" sign="true" signsort="8"
          style="left: 50px; top: 859px; width: 91px; height: 22px; transform: rotate(0deg);">
          <div class="ani-wrap"
            style="background-color: rgb(174, 62, 52); border-radius: 5px; border-color: rgb(153, 153, 153); border-style: solid; border-width: 0px; box-shadow: rgb(153, 153, 153) 0px 0px 0px; opacity: 1;">
            <div class="btn" @tap="linkShe" style="font-size: 12px; color: rgb(255, 255, 255);">
              <image class="call-icon" src="../../static/images/call.png" />
              <span class="btn-text">联系新娘</span>
            </div>
          </div>
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
    margin-top: 10rpx;
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
    margin-top: 30rpx;
    gap: 30rpx;
    padding: 0 30rpx;

    .btn-group {
      display: flex;
      margin-left: 80rpx;
      margin-right: 80rpx;
      justify-content: space-between;
      // -webkit-box-align: center;
      // -ms-flex-align: center;
      align-items: center;
      // -webkit-box-pack: center;
      // -ms-flex-pack: center;
      // justify-content: center;

      .btn {
        // flex: 0 0 48%;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 5rpx;
        // background: #f8f5f3;
        border-radius: 16rpx;
        background-color: rgb(174, 62, 52);
        border-radius: 5px;
        border-color: rgb(153, 153, 153);
        border-style: solid;
        border-width: 0px;
        box-shadow: rgb(153, 153, 153) 0px 0px 0px;
        opacity: 1;
        justify-content: center;

        .call-icon {
          margin-top: 10rpx;
          margin-right: 15rpx;
          height: 35rpx;
          width: 35rpx;
        }

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

    .ele-img .ele-bg-wrap {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-clip: border-box;
    }

    .ele-img .ani-wrap {
      width: 100%;
      height: 100%;
    }

    .ele-img .rotate-wrap {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }

    .ele-img .ele-img-bg,
    .ele-img .rotate-wrap .img-wrap {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .iconfont {
      font-family: "iconfont" !important;
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .hb-tel:before {
      content: "\e6ae";
    }
  }

  .footer {
    height: 80rpx;
    width: 716rpx;
    margin-left: 17rpx;
    margin-top: 100rpx;
  }
}
</style>
