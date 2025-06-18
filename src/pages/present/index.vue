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
import { getPresentList, addOrUpdatePresent } from '@src/api/wedding-invitation'
import { onShow } from '@dcloudio/uni-app'
import { GlobalData } from '@src/types'

const formRef = ref(null)
const isFormlist = ref(false)
const formList = ref([])
const instance = getCurrentInstance()
const globalData: GlobalData = instance.appContext.config.globalProperties.globalData
const openId = globalData.mpUserInfo.openId

const magic = globalData.magic;

const getIsPresentExist = () => {
  getPresentList(openId).then(res => {
    const formData: any = {
      dataFlag: false,
      id: '',
      name: instance.appContext.config.globalProperties.$MpUserData?.user.nickName
    }
    if (res?.data?.length) {
      formData.name = res.data?.[0]?.name
      formData.phone = res.data?.[0]?.phone
      formData.count = res.data?.[0]?.count
      formData.phoneFlag = true
      formData.id = res.data?.[0]?.id
      formData.desc = res.data?.[0]?.desc
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