const app = getApp()

Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },

  onShow: function() {
    this.setTabBar()
  },

  onReady() {
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
      await Promise.all([this.getSwiperData(), this.getBind()])
      this.getPoducts()
    } catch (err) {
      console.log('err', err)
    }
  },

  async getUserInfo() {
    console.log('app.globalData.openid', app.globalData.openid)
    if (app.globalData.openid) {
      return app.globalData.openid
    }
    const data = await wx.cloud.callFunction({
      name: 'getOpenId',
    })
    console.log('data?.result', data?.result)
    const { openid } = data?.result
    app.globalData.openid = openid
    return openid
  },

  async getBind() {
    const openid = await this.getUserInfo()
    console.log('openid', openid)
    const data = await wx.cloud.callFunction({
      name: 'getBind',
      data: {
        openid
      },
    })
    console.log('bind data =>', data)
    const { data: list = [] } = data?.result
    this.bindProductsIds = list.map(({ pid }) => pid) || []
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
      return { ...item.card, id: item?.pid, ocr: item?.osd?.picture, bind: this?.bindProductsIds?.includes(item?.pid) }
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
  },

  ocrClick(e) {
    const { id, ocr } = e.detail
    console.log('ocr click', e.detail)
    const { bind } = e.detail
    const url = bind
      ? `/pages/detail/index?pid=${id}&bind=${bind}}`
      : `/pages/osd-ar/index?pid=${id}&url=${encodeURIComponent(ocr)}`
    wx.navigateTo({
      url
    });
  }
});
