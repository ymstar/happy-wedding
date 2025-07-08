<template>
	<view class="index">
		<view class="title">
			<view>好久不见，婚礼见丨{{ couple.groom.name }}&{{ couple.bride.name }}</view>
			<view>我们结婚啦~</view>
		</view>

		<view class="desc">
			<text class="author">{{ publisher }}</text>
			<text class="date">{{ weddingTimeStr[0] }}</text>
		</view>

		<view class="cover-wrap">
			<image class="img-cover-word"
				src="https://h5cdn.hunbei.com/editorCustomPic/2023-5-5-XpF8Q3dtRTsbfzTY8WwBwFWpDhiGPe5k?imageMogr2/auto-orient/thumbnail/747x693>"
				mode="aspectFit" />
			<view class="cover">
				<image class="img-invitation"
					src="https://h5cdn.hunbei.com/editorCustomPic/2022-11-4-N87SPKmaSQW7kZ3i7ZH4QHeMXpYhZzDs.png?imageMogr2/auto-orient/crop/!1455x384a457a363/quality/90|imageMogr2/thumbnail/659x174>"
					mode="aspectFit" />
				<image class="img-cover" :src="imgs.cover" mode="aspectFit" />
			</view>
			<view class="lh15">斯人若如虹，遇上方知有</view>
		</view>

		<view class="music">
			<view :class="'music-controls ' + (musicIsPaused ? 'paused' : '')" @tap="toggleMusic">
				<image src="../../static/images/icon/music.png" mode="aspectFit" />
			</view>
			<view class="music-left">
				<view class="music-title">{{ music.name }} - {{ music.singer }}</view>
				<view class="music-desc">已为您播放了歌曲</view>
			</view>
			<view class="music-right">
				<image class="music-status"
					src="https://h5cdn.hunbei.com/editorCustomPic/2022-5-25-dcdPDnJmTyZs5FbjdeWdXShEEYRkN6A4.gif?imageMogr2/auto-orient/thumbnail/48x34>"
					mode="aspectFit" />
				<image class="music-poster" :src="imgs.poster" mode="aspectFit" />
			</view>
		</view>

		<view class="tc lh21 mb58">
			<view>hi~亲爱的你~</view>
			<view>当收到这封请柬的时候</view>
			<view class="mb58">我们的婚礼已经在倒计时啦</view>
			<view>以前觉得婚礼是一则官方公告</view>
			<view>现在才明白</view>
			<view>这是一场为数不多的相聚</view>
			<view>是千里迢迢的奔赴</view>
			<view class="mb58">是不计得失的支持</view>
			<view>好久不见，婚礼见</view>
			<view>❤</view>
		</view>

		<view class="tc lh21 mb58">
			<image class="img-introduce"
				src="https://h5cdn.hunbei.com/editorCustomPic/2022-8-22-WNhBXi3ty4fw7dwFBxSZneDKYtz754ya.png?imageMogr2/auto-orient/thumbnail/542.00x58.84>"
				mode="aspectFit" />
		</view>

		<view class="husband lh21 mb58">
			<image class="img-husband" :src="imgs.husband" mode="aspectFit" />
			<view class="husband-desc">
				<view>/</view>
				<view>他有 最暖的真心</view>
				<view>细腻的心思</view>
				<view>我一百分的男孩</view>
			</view>
		</view>

		<view class="wife lh21 mb58">
			<view class="wife-desc">
				<view>/</view>
				<view>{{ anniversary }}</view>
				<view>一见钟情</view>
				<view>是灵魂认出了你</view>
			</view>
			<image class="img-wife" :src="imgs.wife" mode="aspectFit" />
		</view>

		<view class="tc lh21 mb58">
			<view>我常常觉得也许这辈子</view>
			<view>不会得到所谓的爱情了</view>
			<view>直到</view>
			<view>你出现了</view>
		</view>

		<view class="tc lh21 mb58">
			<image class="img-separate mb58"
				src="https://h5cdn.hunbei.com/editorCustomPic/2022-1-26-rx4ZZi3KdMErdNk4E2X3EHh3EiB3bPdY.gif?imageMogr2/auto-orient/thumbnail/864x27>"
				mode="aspectFit" />
			<image class="img-wedding mb58"
				src="https://h5cdn.hunbei.com/editorCustomPic/2022-8-22-HsinmKrKbjrjeSYWDBi7JYMjxrNeeXtj.png?imageMogr2/auto-orient/thumbnail/507x99>/format/webp"
				mode="aspectFit" />
			<swiper class="swiper-western mb58" autoplay circular interval="2500" easing-function="linear"
				indicator-dots>
				<swiper-item v-for="(item, index) in imgs.swiper1" :key="index">
					<image class="img-full-width" :src="item" mode="widthFix" />
				</swiper-item>
			</swiper>
			<view>人们从诗人的字句里，</view>
			<view>选取自己心爱的意义。</view>
			<view>但诗句的最终意义是指向你。</view>
			<view>                            ——泰戈尔《吉檀迦利》</view>
		</view>

		<view class="tc lh21 mb100">
			<view class="img-list mb58">
				<image class="img-full-width" :src="item" mode="widthFix" v-for="(item, index) in imgs.series"
					:key="index"></image>
			</view>
			<view>人生其实只要两次幸运就好</view>
			<view>一次遇见你，一次是走到底</view>
			<view>如今，我们决定开启人生新的篇章</view>
			<view>让爱以夫妻之名延续</view>
		</view>

		<view class="leaf lh21 mb100">
			<view class="img-row mb28">
				<image class="img-leaf-left" :src="imgs.leftUp" mode="aspectFit" />
				<image class="img-leaf"
					src="https://h5cdn.hunbei.com/editorCustomPic/2022-8-2-k8yzidKa4XYnCZdMDQWfGmaxzXreeAeP.png?imageMogr2/auto-orient/thumbnail/624x493>/format/webp"
					mode="aspectFit" />
			</view>
			<view class="img-row tc pr40">
				<image class="img-leaf-left-down" :src="imgs.leftDown" mode="aspectFit" />
				<view class="text">
					<view class="line"></view>
					<view>始于初见，</view>
					<view>止于终老。</view>
				</view>
			</view>
		</view>

		<view class="tc lh21 mb100">
			<view class="img-map mb100">
				<view class="img-map-row">
					<image class="img-map-item" :src="imgs.map[0]" mode="aspectFit" />
					<image class="img-map-item" :src="imgs.map[1]" mode="aspectFit" />
				</view>
				<view class="img-map-row">
					<image class="img-map-item" :src="imgs.map[2]" mode="aspectFit" />
					<image class="img-map-item" :src="imgs.map[3]" mode="aspectFit" />
				</view>
			</view>
			<view>不管外面的世界风雨飘摇也罢</view>
			<view>希望我们总能以最简单的方式相伴</view>
			<view>家人闲坐，灯火可亲</view>
			<view>世上最有趣的事</view>
			<view>就是和最爱的人一起虚度光阴</view>
		</view>

		<view class="tc lh21 mb58">
			<swiper class="swiper-outdoor" autoplay circular interval="2500" easing-function="linear" indicator-dots>
				<swiper-item v-for="(item, index) in imgs.swiper2" :key="index">
					<image class="img-full-width" :src="item" mode="widthFix" />
				</swiper-item>
			</swiper>

			<image class="img-swiper-float" :src="imgs.swiper2Static" mode="aspectFit" />
			<view>我们将成为彼此紧紧依靠的家人</view>
			<view>银河系浪漫的搭车客</view>
			<view>共同去探索广阔遥远的世界</view>
		</view>

		<view class="tc lh21 mb58">
			<image class="img-separate mb58"
				src="https://h5cdn.hunbei.com/editorCustomPic/2022-1-26-rx4ZZi3KdMErdNk4E2X3EHh3EiB3bPdY.gif?imageMogr2/auto-orient/thumbnail/864x27>"
				mode="aspectFit" />
			<image class="img-you mb58"
				src="https://h5cdn.hunbei.com/editorCustomPic/2022-8-22-PZQCrTaWTKSdJKe2Gd5FzatfyQWzZyjA.png?imageMogr2/auto-orient/thumbnail/603x118>/format/webp"
				mode="aspectFit" />
			<view>人的一生有三万多天</view>
			<view>很开心这一天</view>
			<view>你专为我们而来</view>
			<view>请准备好你的好心情和好胃口</view>
			<view>来奔赴这场{{ weddingTimeStr[1] }}日的聚会叭~</view>
		</view>

		<view class="tc lh21 mb58">
			<view class="love mb58">囍</view>
			<!-- 			<swiper class="swiper-chinese mb58" autoplay circular interval="2500" easing-function="linear"
				indicator-dots>
				<swiper-item v-for="(item, index) in imgs.swiper3" :key="index">
					<image class="img-full-width" :src="item" mode="widthFix" />
				</swiper-item>
			</swiper> -->
			<view class="mb58">{{ couple.groom.name }} & {{ couple.bride.name }}</view>
			<view>携同我们的父母</view>
			<view>邀请您出席我们的婚礼仪式</view>
			<view>见证和分享我们的幸福时刻</view>
		</view>

		<image class="img-separate mb58"
			src="https://h5cdn.hunbei.com/editorCustomPic/2022-1-26-rx4ZZi3KdMErdNk4E2X3EHh3EiB3bPdY.gif?imageMogr2/auto-orient/thumbnail/864x27>"
			mode="aspectFit" />
		<image class="img-calendar-title mb58"
			src="https://h5cdn.hunbei.com/editorCustomPic/2022-8-22-wybCS45p5fFnRhTpQB5x48WhY4bjEDj8.png?imageMogr2/auto-orient/thumbnail/511x117>/format/webp"
			mode="aspectFit" />

		<view class="countdown">
			<view class="countdown-item" v-for="(item, index) in countdown" :key="index">
				<view class="number animate__animated" :class="item.animate" :key="item.value.value">{{ item.value
				}}
				</view>
				<text class="label">{{ item.label }}</text>
			</view>
		</view>
		<view class="tc lh21 mb58">
			<calendar id="calendar" :date="weddingTimeStr[0]"></calendar>
			<view>{{ weddingTimeStr[2] }}</view>
			<view>{{ weddingTimeStr[3] }}</view>
		</view>

		<view class="location mb58">
			<view>
				<view>{{ location.name }}</view>
				<view>{{ location.address }}</view>
			</view>
			<map :longitude="location.longitude" :latitude="location.latitude" :enable-zoom="false"
				:enable-scroll="false" :markers="location.markers" />
			<view class="location-mask" @tap="openLocation"></view>
		</view>

		<!-- <button form-type="submit" open-type="getUserInfo" @tap="goPresent">我要出席</button> -->

		<view class="tc lh21 mb58">
			<image class="img-separate mb58"
				src="https://h5cdn.hunbei.com/editorCustomPic/2022-1-26-rx4ZZi3KdMErdNk4E2X3EHh3EiB3bPdY.gif?imageMogr2/auto-orient/thumbnail/864x27>"
				mode="aspectFit" />
			<image class="img-full-width mb58" :src="imgs.end1" mode="widthFix" />
			<view class="tl">
				<view class="tips">温馨tips：</view>
				<view>请预留好{{ weddingTimeStr[4] }}这一天的行程</view>
				<view>如果被事务牵绊或临时有变化</view>
				<view class="mb58">请提前告知新郎/新娘</view>
				<view>许久未见 ，甚是想念</view>
				<view>我们，婚礼见</view>
			</view>
		</view>

		<view class="tc lh21 mb100">
			<image class="img-end"
				src="https://h5cdn.hunbei.com/editorCustomPic/2022-8-19-niYXMwfBrA5bCeRQSFnXRRKRmcSnmfEC.png?imageMogr2/auto-orient/thumbnail/519x264>/format/webp"
				mode="aspectFit" />
		</view>

		<!-- 彩蛋板块视乎个人情况决定要不要 -->
		<view v-if="showEggs" class="egg tc">
			<view class="egg-title">
				彩蛋
				<image src="/static/images/icon/egg.png" mode="aspectFit" />
			</view>
			<view class="mb28">
				此小程序由新郎哥本人独立完成开发😜，如果有 bug 的话敬请谅解，如果能反馈给我的话就更好了😍
			</view>

			<view class="mb28">
				小程序前端代码以开源，感兴趣的小伙伴可以上 github 自取：https://github.com/ymstar/happy-wedding
			</view>

			<view class="mb28">最后放上我们的三生三世视频✿✿ヽ(°▽°)ノ✿☺️</view>

			<view v-if="magic" class="mb58">
				<channel finder-user-name="sphnQSkTBRwbRTK"
					feed-id="export/UzFfAgtgekIEAQAAAAAAwXcqT9uO3AAAAAstQy6ubaLX4KHWvLEZgBPElaBoJkt9KpyIzNPgMJoaUAjdYlpRj52z8YxKBNxQ"
					poster="https://happy-wedding.sym930302.xyz/public/happy-wedding/yangming/image/%E8%A7%86%E9%A2%91%E5%B0%81%E9%9D%A2.jpg"
					nickname="杨明"></channel>
			</view>

			<view class="mb28">好啦，狗粮撒到这里就差不多啦，我们婚礼上见哦~💒👫🏻</view>
			<view>未完，待续</view>
			<view>爱，我们一直在路上</view>
		</view>


		<view v-if="magic" class="greetings">
			<view class="greetings-list">
				<view :class="'greetings-item ' + (activeIdx === index ? 'active' : '')" @animationend="onAnimationend"
					v-for="(item, index) in greetings" :key="index">
					<text class="greetings-name">{{ item.visitor.name }}：</text>

					{{ item.message || '新婚快乐' }}
				</view>
			</view>
			<view class="controller">
				<view class="controller-btn">
					<image @tap="goPhone" src="/static/images/icon/phone.png" mode="widthFix" />
				</view>
				<view class="controller-btn">
					<image @tap="goGreet" src="/static/images/icon/write.png" mode="widthFix" />
				</view>
				<view class="controller-btn">
					<image @tap="openLocation" src="/static/images/icon/go.png" mode="widthFix" />
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { onLoad, onReady, onShareAppMessage, onShareTimeline, onShow, onUnload } from '@dcloudio/uni-app';
import { getAllMessageList, getCommonConfig } from '@src/api/happy-wedding';
import calendar from '@src/component/calendar/calendar.vue';
import channel from '@src/component/channel/channel.vue';
import { GlobalData } from '@src/types';
import { showToast } from '@src/utils';
import { computed, getCurrentInstance, inject, onMounted, reactive, ref } from 'vue';

const instance = getCurrentInstance()
const globalData: GlobalData = instance.appContext.config.globalProperties.globalData

const openId = globalData.mpUserInfo.openId

const adminsIds = ref([])
const isAdmin = computed(() => {
	return adminsIds.value.indexOf(openId) !== -1
})

const musicIsPaused = false;
const activeIdx = ref(0);

const weddingTimeStr = [
	'2025-10-02 11:30',
	'秋',
	'2025 年 10 月 2号  11:30',
	'农历八月十一',
	' 10 月 2 号 '
]
const showEggs = true;
const greetings = ref([])

const innerAudioContext = globalData.innerAudioContext
const music = ref({
	src: 'https://happy-wedding.sym930302.xyz/public/happy-wedding/yangming/music/%E4%BD%A0%E6%98%AF%E5%AF%B9%E7%9A%84%E4%BA%BA.flac',
	name: '你是对的人',
	singer: '戚薇&俊昊'
})
const isPlaying = ref(false)
const location = {
	name: '维艾OL婚宴艺术中心',
	address: '河北省张家口市张北县永春南大街88号',
	longitude: 114.72214179003208,
	latitude: 41.1343623956274,
	markers: [{
		iconPath: '../../static/images/nav.png',
		id: 1,
		width: 50,
		height: 50,
		longitude: 114.72214179003208,
		latitude: 41.1343623956274
	}]
}
const publisher = '杨沙组合'
const anniversary = '2021.06.12'

const couple = {
	groom: {
		name: '',
		phone: ''
	},
	bride: {
		name: '',
		phone: ''
	}
}

const magic = ref(true);

const imgs = {
	// 封面图
	cover: 'https://happy-wedding.sym930302.xyz/public/happy-wedding/yangming/other/%E5%B0%81%E9%9D%A2%E5%9B%BE1.jpg',
	// 音乐封面
	poster: 'https://happy-wedding.sym930302.xyz/public/happy-wedding/yangming/image/%E9%9F%B3%E4%B9%90%E5%B0%81%E9%9D%A2.jpg',
	// 新郎独照
	husband: 'https://happy-wedding.sym930302.xyz/public/happy-wedding/yangming/image/%E6%96%B0%E9%83%8E%E7%8B%AC%E7%85%A7.jpg',
	// 新娘独照
	wife: 'https://happy-wedding.sym930302.xyz/public/happy-wedding/yangming/image/%E6%96%B0%E5%A8%98%E7%8B%AC%E7%85%A7.jpg',
	// 轮播图1
	swiper1: [
		'https://happy-wedding.sym930302.xyz/public/happy-wedding/yangming/image/%E8%BD%AE%E6%92%AD%E5%9B%BE%201-1.jpg',
		'https://happy-wedding.sym930302.xyz/public/happy-wedding/yangming/image/%E8%BD%AE%E6%92%AD%E5%9B%BE%201-2.jpg',
		'https://happy-wedding.sym930302.xyz/public/happy-wedding/yangming/image/%E8%BD%AE%E6%92%AD%E5%9B%BE1-3.jpg'
	],
	// 连续图
	series: [
		'https://happy-wedding.sym930302.xyz/public/happy-wedding/yangming/image/%E8%BF%9E%E7%BB%AD%E5%9B%BE%201.jpg',
		'https://happy-wedding.sym930302.xyz/public/happy-wedding/yangming/image/%E8%BF%9E%E7%BB%AD%E5%9B%BE%202.jpg',
		'https://happy-wedding.sym930302.xyz/public/happy-wedding/yangming/image/%E8%BF%9E%E7%BB%AD%E5%9B%BE%203.jpg'
	],
	// 左上图
	leftUp: 'https://happy-wedding.sym930302.xyz/public/happy-wedding/yangming/image/%E5%B7%A6%E4%B8%8A%E5%9B%BE.jpg',
	// 左下图
	leftDown: 'https://happy-wedding.sym930302.xyz/public/happy-wedding/yangming/image/9Z7A1035.jpg',
	// 四宫图
	map: [
		'https://happy-wedding.sym930302.xyz/public/happy-wedding/yangming/image/%E5%9B%9B%E5%AE%AB%E6%A0%BC%201.jpg',
		'https://happy-wedding.sym930302.xyz/public/happy-wedding/yangming/image/%E5%9B%9B%E5%AE%AB%E6%A0%BC%202.jpg',
		'https://happy-wedding.sym930302.xyz/public/happy-wedding/yangming/image/%E5%9B%9B%E5%AE%AB%E6%A0%BC%204.jpg',
		'https://happy-wedding.sym930302.xyz/public/happy-wedding/yangming/image/%E5%9B%9B%E5%AE%AB%E6%A0%BC%203.jpg'
	],
	// 轮播图2
	swiper2: [
		'https://happy-wedding.sym930302.xyz/public/happy-wedding/yangming/image/%E8%BD%AE%E6%92%AD%E5%9B%BE%202-1.jpg',
		'https://happy-wedding.sym930302.xyz/public/happy-wedding/yangming/image/%E8%BD%AE%E6%92%AD%E5%9B%BE%202-2.jpg',
		'https://happy-wedding.sym930302.xyz/public/happy-wedding/yangming/image/%E8%BD%AE%E6%92%AD%E5%9B%BE%202-3.jpg'
	],
	// 轮播图2下方常驻图
	swiper2Static: 'https://happy-wedding.sym930302.xyz/public/happy-wedding/yangming/image/9Z7A0687.jpg',
	// 轮播图3
	swiper3: [
		'https://res.wx.qq.com/t/fed_upload/77b990f0-6f16-4fa2-8163-ad0eac3e40da/swiper3-1.jpg',
		'https://res.wx.qq.com/t/fed_upload/77b990f0-6f16-4fa2-8163-ad0eac3e40da/swiper3-2.jpg',
		'https://res.wx.qq.com/t/fed_upload/77b990f0-6f16-4fa2-8163-ad0eac3e40da/swiper3-3.jpg'
	],
	// 结尾图1
	end1: 'https://happy-wedding.sym930302.xyz/public/happy-wedding/yangming/image/%E7%BB%93%E5%B0%BE%E5%9B%BE.jpg',
	// 结尾图2
	end2: 'https://res.wx.qq.com/t/fed_upload/9b5bad9c-216b-4fd5-a3da-01bdb3a5e832/end2.jpg'
}
const timer = ref(null);

const weddingDate = new Date(weddingTimeStr[0]).getTime();
const days = computed(() => {
	const diff = weddingDate - now.value;
	return Math.floor(diff / (1000 * 60 * 60 * 24));
});
const hours = computed(() => {
	const diff = weddingDate - now.value;
	return Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
})
const minutes = computed(() => {
	const diff = weddingDate - now.value;
	return Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
})
const seconds = computed(() => {
	const diff = weddingDate - now.value;
	return Math.floor((diff % (1000 * 60)) / 1000);
})

const now = ref(Date.now());

const countdown = computed(() => {
	// 计算天数、小时、分钟、秒
	return [
		{ value: days, label: '天', animate: 'bounce' },
		{ value: hours, label: '时', animate: 'bounce' },
		{ value: minutes, label: '分', animate: 'bounce' },
		{ value: seconds, label: '秒', animate: 'bounce' }
	];
});

const getMessageList = () => {
	getAllMessageList().then(res => {
		greetings.value = res.data
	})
}

onMounted(() => {
	magic.value = globalData.magic;
	getCommonConfig().then(res => {
		adminsIds.value = res.data.adminOpenIds
		couple.groom = res.data.groom
		couple.bride = res.data.bride
	})
	setInterval(() => now.value = Date.now(), 1000)
})
onLoad(() => {
	timer.value = null;
	getMessageList();
	setInterval(() => getMessageList(), 20000)
	innerAudioContext.onEnded(onEnded)
	innerAudioContext.onPlay(onPlay)
	innerAudioContext.onPause(onPause)
	innerAudioContext.src = music.value.src
	innerAudioContext.loop = true
})

onShow(()=>{
	innerAudioContext.play()
})

const onPlay = () => {
	isPlaying.value = true
}
const onPause = () => {
	isPlaying.value = false
}
const onEnded = () => {
	if (globalData.musicIndex >= globalData.musicList.length) {
		globalData.musicIndex = 0
	}
	globalData.innerAudioContext.src = globalData.musicList[globalData.musicIndex].url
	globalData.musicIndex += 1
}

// 小程序卸载时，取消自动拉取祝福语定时器，销毁背景音乐
onUnload(() => {
	if (timer.value !== null) {
		clearInterval(timer.value);
		timer.value = null;
	}
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

const toggleMusic = () => {
	if (innerAudioContext.paused) {
		innerAudioContext.play()
		showToast('背景音乐已开启~')
	} else {
		innerAudioContext.pause()
		showToast('您已暂停音乐播放~')
	}
}
const openLocation = () => {
	wx.openLocation({
		latitude: Number(location.latitude),
		longitude: Number(location.longitude),
		scale: 18
	})
}

// 轮播动画结束时切换到下一个
const onAnimationend = () => {
	activeIdx.value = activeIdx.value === greetings.value.length - 1 ? 0 : activeIdx.value + 1;
}

// 跳转到联系新郎新娘板块
const goPhone = () => {
	uni.switchTab({
		url: '../map/index'
	})
}

// 跳转到写表单板块
const goGreet = () => {
	uni.switchTab({
		url: '../greet/index'
	})
}

</script>
<style lang="scss" scoped>
@import '../../common/base.css';
@import '../../common/animation.css';

.index {
	height: 100%;
	// width: 100%;
	position: relative;
	margin-left: 5%;
	margin-right: 5%;
}

.title {
	font-size: 36rpx;
	margin-bottom: 28rpx;
	letter-spacing: 4rpx;
	line-height: 1.5;
}

.desc {
	font-size: 28rpx;
	margin-bottom: 44rpx;
}

.author {
	color: rgb(91, 106, 145);
	margin-right: 20rpx;
}

.date {
	color: rgb(178, 178, 178);
}

.cover-wrap {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}

.img-cover-word {
	position: absolute;
	left: 20rpx;
	bottom: 0;
	width: 498rpx;
	height: 462rpx;
	z-index: 999;
}

.cover {
	display: flex;
	flex-direction: column;
	margin-bottom: 186rpx;
}

.img-invitation {
	width: 436rpx;
	height: 116rpx;
	margin-bottom: 16rpx;
}

.img-cover {
	width: 454rpx;
	height: 652rpx;
}

.music {
	display: flex;
	align-items: center;
	margin: 60rpx 40rpx 88rpx;
	padding: 20rpx;
	box-shadow: rgb(194, 194, 194) 0 0 10rpx;
	border-radius: 10rpx;
}

.music-controls {
	position: fixed;
	z-index: 99999999;
	top: 20rpx;
	right: 20rpx;
	background-color: rgba(165, 165, 165, 0.2);
	border-radius: 50%;
	border: 4rpx solid white;
	width: 56rpx;
	height: 56rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	-webkit-animation: mrotate 5s linear infinite;
	animation: mrotate 5s linear infinite;
	overflow: hidden;
}

.music-controls.paused {
	-webkit-animation: none;
	animation: none;
}

.music-controls.paused::after {
	content: '';
	width: 56rpx;
	height: 0;
	position: absolute;
	top: 26rpx;
	left: 0;
	border-top: 4rpx solid white;
	-webkit-transform: rotate(45deg);
	transform: rotate(45deg);
}

.music-controls image {
	width: 40rpx;
	height: 40rpx;
}

.music-left {
	display: flex;
	flex-direction: column;
	flex: 1;
}

.music-title {
	font-size: 28rpx;
	line-height: 1;
	font-weight: bold;
	padding: 12rpx 10rpx;
}

.music-desc {
	font-size: 24rpx;
	line-height: 1;
	font-weight: normal;
	opacity: 0.5;
	padding: 12rpx 10rpx;
}

.music-right {
	height: 116rpx;
	display: flex;
	gap: 12rpx;
	align-items: flex-end;
}

.music-status {
	width: 32rpx;
	height: 22rpx;
}

.music-poster {
	width: 116rpx;
	height: 116rpx;
}

.img-introduce {
	width: 677rpx;
	height: 60rpx;
}

.moon {
	position: relative;
	display: flex;
	gap: 20rpx;
	justify-content: center;
	margin: 60rpx 0 88rpx 0;
}

.img-moon {
	width: 310rpx;
	height: 460rpx;
}

.birthday {
	position: absolute;
	display: flex;
	gap: 20rpx;
	justify-content: center;
	bottom: 28rpx;
	color: white;
	font-size: 32rpx;
}

.birthday text {
	width: 310rpx;
}

.husband,
.wife {
	display: flex;
}

.img-husband,
.img-wife {
	width: 390rpx;
	height: 308rpx;
}

.husband-desc,
.wife-desc {
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	padding: 0 24rpx 24rpx;
	width: 390rpx;
	box-sizing: border-box;
}

.wife-desc {
	text-align: right;
}

.img-wedding {
	width: 100%;
	height: 66rpx;
}

.swiper-western {
	height: 986rpx;
}

.img-list {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 14rpx;
}

.leaf {
	padding-right: 0;
}

.img-row {
	display: flex;
	position: relative;
	align-items: flex-end;
	overflow: hidden;
}

.img-row .text {
	width: 240rpx;
	box-sizing: border-box;
	padding-right: 20rpx;
	padding-bottom: 24rpx;
	text-align: right;
	position: relative;
}

.img-leaf-left {
	width: 448rpx;
	height: 600rpx;
}

.img-leaf {
	width: 416rpx;
	height: 328rpx;
	transform: rotate(162deg);
	opacity: 0.3;
	position: absolute;
	top: 80rpx;
	right: -120rpx;
}

.img-leaf-left-down {
	width: 358rpx;
	height: 232rpx;
}

.line {
	border-top: 2rpx solid black;
	width: 114rpx;
	-webkit-transform: rotate(333deg);
	transform: rotate(333deg);
	position: absolute;
	top: -60rpx;
	left: 62rpx;
}

.img-map {
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.img-map-row {
	display: flex;
	gap: 12rpx;
}

.img-map-item {
	width: 384rpx;
	height: 444rpx;
}

.swiper-outdoor {
	height: 452rpx;
}

.img-swiper-float {
	box-sizing: content-box;
	width: 418rpx;
	height: 280rpx;
	border: 10rpx solid white;
	position: relative;
	top: -80rpx;
}

.img-you {
	width: 100%;
	height: 78rpx;
}

.love {
	font-family: 微软雅黑;
	font-size: 196rpx;
	line-height: 1;
	font-weight: bold;
	writing-mode: lr-tb;
	color: rgb(133, 22, 14);
}

.swiper-chinese {
	height: 910rpx;
}

.img-calendar-title {
	width: 100%;
	height: 78rpx;
}

.location {
	border-radius: 20rpx;
	box-shadow: rgb(153, 153, 153) 0 0 10rpx;
	padding: 20rpx;
	margin-left: 40rpx;
	margin-right: 40rpx;
	line-height: 1.5;
	font-size: 24rpx;
	position: relative;
}

.location>view {
	padding: 10rpx;
}

.location-mask {
	position: absolute;
	width: 100%;
	height: 260rpx;
	top: 122rpx;
	left: -10rpx;
}

.phone {
	display: flex;
	justify-content: center;
}

.phone-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 50%;
}

.phone button {
	background-color: rgba(133, 22, 14, 0.9);
	border-radius: 20rpx;
	font-size: 24rpx;
	color: white;
	width: 196rpx !important;
	height: 56rpx;
	line-height: 1;
	font-weight: normal;
	margin-top: -30rpx;
	padding: 16rpx 0;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 8rpx;
}

.phone button:active {
	background-color: rgba(133, 22, 14, 1);
}

.phone button image {
	width: 32rpx;
	height: 32rpx;
}

.form {
	padding: 0 40rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 40rpx;
}

.form view {
	position: relative;
}

.form text {
	position: absolute;
	top: 4rpx;
	left: 16rpx;
	color: #ed5566;
	line-height: 64rpx;
}

.form input {
	box-sizing: border-box;
	width: 448rpx;
	height: 64rpx;
	line-height: 64rpx;
	background-color: white;
	border-radius: 28rpx;
	border: 2rpx solid rgb(153, 153, 153);
	text-align: left;
	padding: 0 40rpx !important;
	font-size: 24rpx;
	font-weight: normal;
	color: black;
}

.form textarea {
	box-sizing: border-box;
	width: 448rpx;
	background-color: white;
	border-radius: 28rpx;
	border: 2rpx solid rgb(153, 153, 153);
	text-align: left;
	padding: 20rpx 40rpx !important;
	font-size: 24rpx;
	font-weight: normal;
	color: black;
}

.form-input-placeholder {
	font-size: 24rpx;
	font-weight: normal;
	color: rgb(110, 110, 110);
}

.form button {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 448rpx !important;
	height: 64rpx;
	background-color: rgba(133, 22, 14, 0.9);
	border-radius: 28rpx;
	line-height: 1;
	color: white;
	font-size: 28rpx;
	font-weight: normal;
	text-align: center;
}

.form button:active {
	background-color: rgba(133, 22, 14, 1);
}

.tips {
	font-size: 32rpx;
	line-height: 1;
	padding: 10rpx;
	background-color: #999999;
	display: inline-block;
	margin-bottom: 40rpx;
}

.img-end {
	width: 100%;
	height: 176rpx;
}

.egg {
	line-height: 1.6;
	color: rgb(134, 134, 134);
	font-size: 22rpx;
	margin-bottom: 180rpx;
}

.egg-title {
	font-size: 32rpx;
	position: relative;
	display: inline-block;
	margin: 0 auto 28rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	width: fit-content;
}

.egg-title::before,
.egg-title::after {
	position: absolute;
	top: 50%;
	left: -20rpx;
	transform: translate3D(-100%, -50%, 0);
	content: '';
	width: 80rpx;
	border-top: 2rpx dashed rgb(134, 134, 134);
}

.egg-title::after {
	left: 100%;
	transform: translate3D(20rpx, -50%, 0);
}

.egg-title image {
	width: 40rpx;
	height: 40rpx;
}

.greetings {
	position: fixed;
	bottom: 60rpx;
	padding: 0 40rpx;
	display: flex;
	align-items: flex-end;
	width: 100%;
	box-sizing: border-box;
}

.greetings-list {
	display: flex;
	flex-direction: column;
	gap: 16rpx;
	pointer-events: none;
	width: 66%;
	position: relative;
}

.greetings-item {
	padding: 14rpx 20rpx;
	color: white;
	background: linear-gradient(90deg, rgba(133, 22, 14, 0.8) 0%, rgba(133, 22, 14, 0.5) 100%);
	border-radius: 10rpx;
	width: fit-content;
	word-wrap: break-word;
	word-break: break-all;
	position: absolute;
	left: 0;
	bottom: 0;
	transform: translateX(calc(-100% - 40rpx));
}

.greetings-item.active {
	-webkit-animation: fadeInOutLeft 5s linear;
	animation: fadeInOutLeft 5s linear;
}

.greetings-name {
	font-weight: 600;
}

.controller {
	display: flex;
	gap: 16rpx;
	margin-left: auto;
	margin-bottom: 2rpx;
}

.controller-btn {
	width: 60rpx;
	height: 60rpx;
	background-color: rgba(133, 22, 14, 1);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0.7;
}

.controller-btn:active {
	opacity: 1;
}

.controller image {
	width: 40rpx;
}

.manager {
	position: fixed;
	top: 50%;
	left: 20rpx;
	padding: 0;
	transform: translateY(-50%);
	z-index: 99999999;
}

.manager image {
	width: 120rpx;
	height: 120rpx;
}

.countdown {
	display: flex;
	justify-content: center;
	margin: 20px 0;
}

.countdown-item {
	border-color: rgb(153, 153, 153);
	border-radius: 5px;
	border-style: solid;
	border-width: 0px;
	text-align: center;
	background-color: rgb(174, 62, 52);
	min-width: 50px;
	height: auto;
	margin: 5px;
	padding: 5px 0 5px;
	// width: 80px;
}

.number {
	font-size: 18px;
	font-weight: bold;
	color: rgb(255, 255, 255);
	// margin-bottom: 5px;
	animation: bounce 0.5s;
	transition: all 0.3s;
}

.label {
	font-size: 12px;
	color: rgb(255, 255, 255);
}
</style>
