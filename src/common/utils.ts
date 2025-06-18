// 格式化定位信息，加上markers
function genLocation(location) {
    location.map((item) =>
        Object.assign(item, {
            markers: [
                {
                    id: 1,
                    latitude: item.latitude,
                    longitude: item.longitude,
                    iconPath: '../../images/icon/marker.png',
                    width: 32,
                    height: 32
                }
            ]
        })
    );
}

// 日期时间补0
function addZero(num) { (num >= 10 ? num : `0${num}`); }

// 获取指定月份的天数
function getMonthDayCount(year, month) {
    // 置闰规则不考虑1582年以前的
    let isLeapYear = false;
    if (year % 400 === 0) {
        isLeapYear = true;
    } else if (year % 4 === 0) {
        isLeapYear = true;
    }
    return [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
};

export { genLocation, addZero, getMonthDayCount }
