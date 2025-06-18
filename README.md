
## happy-wedding 是一个基于 uniapp + vue3 + ts + vite 的婚礼邀请函微信小程序


## 巨人的肩膀
> 本项目基于 [wedding-invitation](https://github.com/zouyaoji/wedding-invitation.git) 项目 Fork 而来，并融合了 [wedding-invitation](https://github.com/JaminQ/wedding-invitation.git)(这是不同的项目) 的代码，在此向前辈 [zouyaoji](https://github.com/zouyaoji) 和 [JaminQ](https://github.com/JaminQ) 致敬。

## 小程序主要功能 & 改动点
- 包含婚礼邀请函、甜蜜相册、酒店导航、好友祝福和出席登记五个页面
- 婚礼邀请函（即首页）替换成了 [wedding-invitation](https://github.com/JaminQ/wedding-invitation.git) 的 H5 形式，是婚贝上的一个模板
- 甜蜜相册样式调整为双列静态展示，简约大气
- 酒店导航页面调整为婚礼大厅导航和住宿酒店导航两个 Marker 点，其中住宿酒店导航只有在登记出席后显示
- 将原来的 “祝福” 和 “留言” 两个页面，融合为一个 “好友祝福” 页面，并重新布局
- 新增 “出席登记” 页面，支持用户登记是否出席
- 新增了 “小程序过审魔法开关”，可通过这个开关快速隐藏一些会影响小程序过审的功能，审核通过后再从后端关闭

## 主要功能展示



## 开发步骤说明

### 前端

前往微信公众平台申请小程序，并进行相关开发配置。完成之后将你的微信小程序 appid 填写到 manifest.json 中。

本地开发运行：
```bash
pnpm install
pnpm dev:mp-weixin
```
打包部署：
```bash
pnpm build:mp-weixin
```

### 后端


## 其他

其他问题请查看 uniapp 官方文档。
