<template>
  <div class="form">
    <image class="head-img" src="../../static/images/green-flower.png" />
    <p class="title"><span class="span">* </span>姓名</p>
    <input type="text" placeholder="怎么称呼您呢？" v-model="name" maxlength="20" />
    <p class="title"><span class="span">* </span>电话</p>
    <input type="number" placeholder="请填写有效的手机号码" v-model="phone" @input="checkPhone" maxlength="11" />
    <p class="title">几人出席</p>
    <radio-group @change="radioChange" class="group">
      <label class="radio" v-for="(item, index) in list" :key="index">
        <radio :value="item.name" :checked="item.checked" />
        {{ item.value }}
      </label>
    </radio-group>
    <p class="title">备注</p>
    <textarea class="desc" placeholder="请填写您的备注需求，例如您是否提前一天到达，是否需要高铁站接送等" placeholder-style="color:#ccc;"
      v-model="desc" />
    <div class="btn">
      <button class="left" @tap="submit">确认提交</button>
      <!-- <button class="right" @tap="cancel">取消</button> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { addOrUpdatePresent } from '@src/api/happy-wedding'
import { showToast } from '@src/utils'
import { getCurrentInstance, ref } from 'vue'
const list = ref([
  {
    name: '自己出席',
    value: '自己出席',
    checked: true
  },
  {
    name: '两人出席',
    value: '两人出席',
    checked: false
  },
  {
    name: '三人出席',
    value: '三人出席',
    checked: false
  },
  {
    name: '三人以上',
    value: '三人以上',
    checked: false
  }
])
const desc = ref('')
const name = ref('')
const phone = ref('')
const count = ref('自己出席')
const phoneFlag = ref(false)
const _id = ref('')

const instance = getCurrentInstance()
const $emit = defineEmits(['closeForm'])
const openId = instance.appContext.config.globalProperties.$MpUserData?.openId

const cancel = () => {
  $emit('closeForm')
}

const radioChange = e => {
  count.value = e.detail.value
  list.value.forEach(item => {
    if (item.name === count.value) {
      item.checked = true
    } else {
      item.checked = false
    }
  })
}

const submit = () => {
  if (name.value) {
    if (phoneFlag.value) {
      addPresent()
    } else {
      showToast('请正确输入您的手机号码')
    }
  } else {
    showToast('请填写您的姓名')
  }
}

const checkPhone = () => {
  let reg = /^1[3456789]\d{9}$/
  if (phone.value.length === 11) {
    if (reg.test(phone.value)) {
      phoneFlag.value = true
    } else {
      phoneFlag.value = false
      showToast('手机号码格式不正确')
    }
  }
}

const addPresent = () => {
  addOrUpdatePresent({
    name: name.value,
    phone: phone.value,
    count: count.value,
    description: desc.value,
    openid: openId
  }).then(res => {
    showToast('登记成功！期待您的到临~')
    $emit('closeForm')
  })
}

const updateForm = formData => {
  name.value = formData.name
  phone.value = formData.phone
  phoneFlag.value = formData.phoneFlag
  _id.value = formData.id
  desc.value = formData.desc

  list.value.forEach(item => {
    item.checked = formData.count === item.name
  })
}

Object.assign(instance.proxy, {
  updateForm
})
</script>

<style lang="scss" scoped>
.form {
  position: absolute;
  top: 20rpx;
  width: 690rpx;
  margin-left: 30rpx;
  box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
  background: #fff;
  border-radius: 16rpx;

  .head-img {
    height: 180rpx;
    width: 100%;
  }

  .desc {
    margin-left: 20rpx;
  }

  .title {
    height: 60rpx;
    // background: #f5f5f5;
    line-height: 60rpx;
    color: #333;
    font-size: 24rpx;
    margin-left: 20rpx;

    .span {
      color: red;
    }
  }

  input {
    height: 80rpx;
    padding: 0 20rpx;
    // background: #f5f5f5;
    color: #333;
    font-size: 24rpx;
  }

  .group {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;

    .radio {
      width: 45%;
      margin-left: 5%;
      font-size: 24rpx;
      margin-bottom: 20rpx;
    }
  }

  textarea {
    height: 140rpx;
    line-height: 42rpx;
    font-size: 24rpx;
    color: #333;
    resize: none;
    outline: none;
    padding: 20rpx;
    width: 650rpx;
    background: #f5f5f5;

    &::-webkit-input-placeholder {
      font-size: 30rpx;
      color: #999;
    }
  }

  .btn {
    height: 120rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    .left,
    .right {
      height: 80rpx;
      line-height: 80rpx;
      font-size: 28rpx;
      flex: 2;
      color: #fff;
      background: #ed695d;
      margin: 0 20rpx 0 30rpx;
    }

    .right {
      flex: 1;
    }
  }
}
</style>
