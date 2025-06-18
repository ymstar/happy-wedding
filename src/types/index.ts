export type GlobalData = {
	magic: boolean,
	mpUserInfo: {
		openId: string,
		id: string,
		userId: string,
		openid: string,
		user: {
			nickName: string,
			avatarUrl: string
		},
		createdAt: string,
		updatedAt: string
	},
	innerAudioContext: WechatMiniprogram.InnerAudioContext
	musicList: Array<{
		id: string
		url: string
	}>
	musicIndex: number
	animations: Array<
		| `bounce`
		| `flash`
		| `pulse`
		| `rubberBand`
		| `shake`
		| `headShake`
		| `swing`
		| `tada`
		| `wobble`
		| `jello`
		| `bounceIn`
		| `bounceInDown`
		| `bounceInLeft`
		| `bounceInRight`
		| `bounceInUp`
		| `fadeIn`
		| `fadeInDown`
		| `fadeInDownBig`
		| `fadeInLeft`
		| `fadeInLeftBig`
		| `fadeInRight`
		| `fadeInRightBig`
		| `fadeInUp`
		| `fadeInUpBig`
		| `flipInX`
		| `flipInY`
		| `lightSpeedIn`
		| `rotateIn`
		| `rotateInDownLeft`
		| `rotateInDownRight`
		| `rotateInUpLeft`
		| `rotateInUpRight`
		| `jackInTheBox`
		| `rollIn`
		| `zoomIn`
		| `zoomInDown`
		| `zoomInLeft`
		| `zoomInRight`
		| `zoomInUp`
		| `slideInDown`
		| `slideInLeft`
		| `slideInRight`
		| `slideInUp`
		| `heartBeat`
	>
}
