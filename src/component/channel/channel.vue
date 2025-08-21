<template>
    <view>
        <!-- 使用官方的channel-video组件 -->
        <block v-if="useChannelVideo">
            <!-- 需要加上单页模式的判断，单页模式下不会渲染视频号卡片，而且连个占位都没有，要自行实现占位，也就是下面的.channel-video-placeholder -->
            <!-- 另外再吐槽一句，开发者工具里居然跟单页模式一样也不会渲染视频号卡片，也是醉了 -->
            <channel-video v-if="!isSinglePage" :finder-user-name="finderUserName" :feed-id="feedId"
                :feed-token="feedToken"></channel-video>
            <view v-else class="channel channel-video-placeholder">请点击底部「前往小程序」按钮来查看</view>
        </block>

        <!-- 使用自行实现的视频号模拟组件 -->
        <view v-else class="channel" @tap="openChannel">
            <image class="channel-poster" :src="poster" mode="aspectFit" />
            <image class="channel-play" src="/static/images/icon/play.png" mode="aspectFit" />
            <view class="channel-nickname">
                <image class="channel-logo" src="/static/images/icon/channel.png" mode="aspectFit" />
                <text>{{ nickname }}</text>
            </view>
        </view>
    </view>
</template>

<script>

export default {
    data() {
        return {
            isSinglePage: false
        };
    },
    props: {
        useChannelVideo: {
            // 是否使用官方的channel-video组件（小程序个人号无法使用feed-token）
            type: Boolean,
            default: false
        },
        finderUserName: {
            // useChannelVideo为false时必填
            type: String,
            default: ''
        },
        feedId: {
            // useChannelVideo为false时必填
            type: String,
            default: ''
        },
        poster: {
            // 封面图，封面比例建议使用4:3，useChannelVideo为false时生效
            type: String,
            default: ''
        },
        nickname: {
            // 视频号昵称，useChannelVideo为false时生效
            type: String,
            default: '视频号'
        },
        feedToken: {
            // useChannelVideo为false时忽略该字段
            type: String,
            default: ''
        }
    },
    methods: {
        // 页面展示时，更新是否单页模式
        handlePageShow() {
            const isSinglePage = app.globalData.isSinglePage;
            if (this.isSinglePage !== isSinglePage) {
                this.setData({
                    isSinglePage
                });
            }
        },

        // 打开视频号视频
        openChannel() {
            uni.openChannelsActivity({
                finderUserName: this.finderUserName,
                feedId: this.feedId
            });
        }
    },
    created: function () { }
};
</script>
<style>
.channel {
    width: 480rpx;
    height: 360rpx;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    position: relative;
}

.channel-video-placeholder {
    border: 2rpx solid #b8b8b8;
    align-items: center;
}

.channel-poster {
    width: 100%;
    height: 100%;
    background-color: black;
}

.channel-play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80rpx;
    height: 80rpx;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
}

.channel-nickname {
    position: absolute;
    bottom: 0;
    left: 0;
    color: white;
    line-height: 80rpx;
    padding: 0 30rpx;
    display: flex;
    align-items: center;
}

.channel-logo {
    width: 32rpx;
    height: 32rpx;
    margin-right: 14rpx;
}
</style>
