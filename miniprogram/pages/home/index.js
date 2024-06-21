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
    swiper: [],
    card: [],
    pageSize: 10,
    pageNo: 0,
    total: 0,
    fetchProductsInit: true,
    defaultData: {
      title: "我的主页", // 导航栏标题
    },
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 500,
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
      await this.getSwiperData()
      await this.getPoducts()
    } catch (err) {
      console.log('err', err)
    }
  },

  async getSwiperData() {
    let swiperData = await wx.cloud.callFunction({
      name: 'getSwiper',
      data: {},
    })
    console.log('swiperData', swiperData)
    swiperData = swiperData?.result?.data
    this.setData({
      swiper: swiperData,
    })
  },

  async getPoducts() {
    const hasMore = this.data.fetchProductsInit || this.data.total > this.data.card.length
    if (!hasMore) {
      return
    }
    const data = await wx.cloud.callFunction({
      name: 'getProducts',
      data: {
        pageNo: this.data.pageNo,
        pageSize: this.data.pageSize
      },
    })
    console.log('products', data)
    const { total, data: productsData } = data?.result
    const cardData = productsData.map((item) => {
      return item.card
    })
    this.setData({
      pageNo: this.data.pageNo + 1,
      card: [...this.data.card, ...cardData],
      total,
      fetchProductsInit: false
    })
    return data
  },

  scrollBottom() {
    this.getPoducts()
  }
});
