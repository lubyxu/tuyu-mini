// index.js
// const app = getApp()
const { envList } = require('../../envList.js');

Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },

  data: {
    defaultData: {
      title: "我的主页", // 导航栏标题
    },
    background: [
      'https://636c-cloud1-0gq8f3qi3903d318-1327253936.tcb.qcloud.la/app-assets/banner%20(1).png?sign=1fb30d417f9c1c1ac840157f136f42c6&t=1718604950',
      'https://636c-cloud1-0gq8f3qi3903d318-1327253936.tcb.qcloud.la/app-assets/bg.png?sign=c85d97c2636daecf2ed1ad1fac89ec8a&t=1718605109',
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500
  },

  jumpMapPage(e) {
    wx.navigateTo({
      url: `/map/pages/index/index`,
    });
  },

  jumpOSDPage(e) {
    wx.navigateTo({
      url: `/pages/osd-ar/index`,
    });
  }
});
