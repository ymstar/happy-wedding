<template>
  <div v-if="magic" class="present">
    <div class="form">
      <h-form ref="formRef" @getFromlist="getFromlist"></h-form>
    </div>
    <div class="form-list" v-show="isFormlist">
      <h-formlist @closeFormlist="closeFormlist" :formList="formList"></h-formlist>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import HForm from '@src/component/form.vue'
import HFormlist from '@src/component/formlist.vue'
import { getPresentList, addOrUpdatePresent } from '@src/api/happy-wedding'
import { onShareAppMessage, onShareTimeline, onShow } from '@dcloudio/uni-app'
import { GlobalData } from '@src/types'

const formRef = ref(null)
const isFormlist = ref(false)
const formList = ref([])
const instance = getCurrentInstance()
const openId = instance.appContext.config.globalProperties.$MpUserData?.openId

const magic = instance.appContext.config.globalProperties.$magic;

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

const getIsPresentExist = () => {
  getPresentList(openId).then(res => {
    const formData: any = {
      dataFlag: false,
      id: '',
      name: instance.appContext.config.globalProperties.$MpUserData?.name
    }
    if (res?.data) {
      formData.name = res.data?.name
      formData.phone = res.data?.phone
      formData.count = res.data?.count
      formData.phoneFlag = true
      formData.id = res.data?.id
      formData.desc = res.data?.description
    }
    formRef.value.updateForm(formData)
  })
}

const getFromlist = () => {
  isFormlist.value = true
}

const closeFormlist = () => {
  isFormlist.value = false
}

onShow(() => {
  getIsPresentExist()
})
</script>