const app = getApp()

Page({
  onShareAppMessage() {
    return {
      title: '福鱼文创',
      path: 'pages/home/index',
      imageUrl: 'https://7072-production-6gycngib97dae447-1327253936.tcb.qcloud.la/assets/common/share.png?sign=48f82e518b68aeeb1dd71ebf6a7d3ee6&t=1726127274'
    }
  },

  onShow: function() {
    // this.setTabBar()
  },

  async onReady() {
    await this.getInitData()
    // this.getTabBar().setData({
    //   isShow: true
    // })
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
    showLoading: true,
    titleBarVisible: false
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
      await this.getPoducts()
      this.setData({ showLoading: false })
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
    const hasMore = this.data.fetchProductsInit || this.data.total <= this.data.card.length
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
    let cardData = productsData.map((item) => {
      return { ...item.card, id: item?.pid, ocr: item?.osd?.picture, videoUrl: item?.osd?.videoUrl, bind: this?.bindProductsIds?.includes(item?.pid) }
    })
    cardData.sort((a, b) => a.id / 1 - b.id / 1)
    console.log('sort products', cardData)
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

  authSetting() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success(res) {
          console.log('res.authSetting', res.authSetting['scope.camera'])
          if (!res.authSetting['scope.camera']) {
            wx.authorize({
              scope: 'scope.camera',
              success: resolve,
              fail: () => {
                wx.showModal({
                  title: '请先授权摄像机权限',
                  content: '否则无法使用',
                  success (res) {
                    if (res.confirm) {
                      wx.openSetting()
                    } else if (res.cancel) {
                      reject("取消授权")
                    }
                  }
                })               
              },
            })
          } else {
            resolve()
          }
        }
      })
    })
  },

  async ocrClick(e) {
    const { id, ocr, videoUrl } = e.detail
    console.log('ocr click', e.detail)
    const { bind } = e.detail
    const url = bind
      ? `/pages/detail/index?pid=${id}&bind=${bind}}`
      : `/pages/osd-ar/index?pid=${id}&videoUrl=${encodeURIComponent(videoUrl)}&url=${encodeURIComponent(ocr)}`
    if (!bind) {
      try {
        await this.authSetting()
      } catch (err) {
        wx.showToast({
          icon: 'error',
          title: '授权失败'
        })
        return
      }
    }
    wx.navigateTo({
      url
    });
  },

  bindscrolltoupper() {
    this.setData({ titleBarVisible: false })
  },

  bindscroll(e) {
    const { scrollTop } = e.detail
    if (scrollTop > 80) {
      this.setData({ titleBarVisible: true })
    }
    if (scrollTop < 80) {
      this.setData({ titleBarVisible: false })
    }
  }
});
