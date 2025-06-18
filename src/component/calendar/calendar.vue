<template>
    <view class="calendar">
        <view class="calendar-year">{{ year }}</view>
        <view class="calendar-main">
            <view class="calendar-month-day">
                {{ month }}
                <text class="calendar-month-day-sep">/</text>
                {{ day }}
            </view>
            <view class="calendar-line calendar-week">
                <text class="calendar-item">日</text>
                <text class="calendar-item">一</text>
                <text class="calendar-item">二</text>
                <text class="calendar-item">三</text>
                <text class="calendar-item">四</text>
                <text class="calendar-item">五</text>
                <text class="calendar-item">六</text>
            </view>
            <view class="calendar-line" v-for="(week, index) in list" :key="index">
                <text class="calendar-item" v-for="(item, index1) in week" :key="index1">
                    <block v-if="item === day">
                        <text class="calendar-current">{{ item }}</text>
                        <text class="calendar-current-dot"></text>
                    </block>

                    <text v-else>{{ item }}</text>
                </text>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
// const lunisolar = require('../../common/lunisolar');
import { addZero, getMonthDayCount } from '@src/common/utils';
import { onMounted, ref } from 'vue';

const list = ref([]);
const year = ref(2025);
const month = ref(10);
const day = ref(2);

const props = defineProps({
  date: String
})
onMounted(() => {
    attached();
})

const attached = () => {
    const date = new Date(props.date);
    year.value = date.getFullYear();
    month.value = date.getMonth() + 1;
    day.value = date.getDate();

    const dayOfWeek = date.getDay();

    // 生成日历表
    // 先计算出当月1号是星期几
    let beginDayOfWeek = day.value === 1 ? dayOfWeek : (dayOfWeek - day.value + 1) % 7;
    if (beginDayOfWeek < 0) {
        beginDayOfWeek += 7;
    } // 生成首周
    const weeks = [];
    let curDay = 1;
    const firstWeek = new Array(beginDayOfWeek).fill('');
    for (let i = beginDayOfWeek; i < 7; i++) {
        firstWeek.push(curDay++);
    }
    weeks.push(firstWeek);

    // 继续生成后面的日历数据
    let otherWeek = [];
    let end = getMonthDayCount(year.value, month.value);
    for (end; curDay <= end; curDay++) {
        if (otherWeek.length === 7) {
            weeks.push(otherWeek);
            otherWeek = [];
        }
        otherWeek.push(curDay);
    }
    weeks.push(otherWeek);
    list.value = weeks;
}
</script>
<style>
.calendar {
    width: 576rpx;
    border: 20rpx solid rgb(133, 22, 14);
    margin: 0 auto 60rpx;
    padding: 72rpx;
    color: rgb(133, 22, 14);
    line-height: 1;
    box-sizing: border-box;
    position: relative;
    letter-spacing: 0;
    text-align: center;
}

.calendar-year {
    position: absolute;
    font-size: 130rpx;
    opacity: 0.1;
    font-weight: 600;
    left: 50%;
    top: 314rpx;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    z-index: 1;
}

.calendar-main {
    position: relative;
    z-index: 10;
}

.calendar-month-day {
    font-size: 72rpx;
    text-align: left;
    margin-bottom: 60rpx;
}

.calendar-month-day .calendar-month-day-sep {
    font-size: 32rpx;
}

.calendar-week {
    font-weight: 600;
}

.calendar-line {
    display: flex;
    font-size: 24rpx;
    margin-top: 16rpx;
}

.calendar-line .calendar-item {
    width: 56rpx;
    height: 44rpx;
    line-height: 44rpx;
    position: relative;
}

.calendar-current {
    position: relative;
    z-index: 20;
    color: white;
}

.calendar-line .calendar-current-dot {
    position: absolute;
    display: block;
    width: 56rpx;
    height: 56rpx;
    background-color: rgb(133, 22, 14);
    top: -6rpx;
    border-radius: 50%;
    z-index: 11;
    -webkit-animation: jumpheart 0.8s ease infinite alternate;
    animation: jumpheart 0.8s ease infinite alternate;
}
</style>
