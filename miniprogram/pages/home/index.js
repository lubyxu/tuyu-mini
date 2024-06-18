const { envList } = require('../../envList.js');
const { callCloudDataBaseCallback } = require('../../utils/cloud.js')

Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },

  onShow: function() {
    this.setTabBar()
    this.getInitData()
  },

  data: {
    pageSize: 10,
    pageNo: 0,
    swiper: [],
    products: [],
    defaultData: {
      title: "我的主页", // 导航栏标题
    },
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 500,
    card: []
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
  },

  setTabBar() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  async getInitData() {
    try {
      const data = await Promise.all([this.getSwiperData(), this.getPoducts()])
      const swiperData = await callCloudDataBaseCallback(data[0])
      const productsData = await callCloudDataBaseCallback(data[1])
      const cardData = productsData.map((item) => {
        return item.card
      })
      console.log('productsData', productsData)
      this.setData({
        swiper: swiperData,
        card: cardData
      })
    } catch (err) {
      console.log('err', err)
    }
  },

  getSwiperData() {
    return wx.cloud.callFunction({
      name: 'getSwiper',
      data: {},
    })
  },

  async getPoducts() {
    const data = await wx.cloud.callFunction({
      name: 'getProducts',
      data: {
        pageNo: this.data.pageNo,
        pageSize: this.data.pageSize
      },
    })
    this.setData({
      pageSize: this.data.pageSize + 1
    })
    return data
  },
});
