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

  onShow: function() {
 
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
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
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 500,
    card: [{
      url: 'https://636c-cloud1-0gq8f3qi3903d318-1327253936.tcb.qcloud.la/app-assets/item-gulou.png?sign=a81ca215a44a3ef1b0acd8efc12863bb&t=1718609830',
      title: '北京',
      subTitle: '鼓楼·冬季之美'
    }, {
      url: 'https://636c-cloud1-0gq8f3qi3903d318-1327253936.tcb.qcloud.la/app-assets/item-gulou.png?sign=a81ca215a44a3ef1b0acd8efc12863bb&t=1718609830',
      title: '北京',
      subTitle: '鼓楼·冬季之美'
    }]
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
