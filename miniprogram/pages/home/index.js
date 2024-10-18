const app = getApp()
import { authCamera } from '../../utils/auth'

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
    navBarHeight: app.globalData.navBarHeight,
    menuRight: app.globalData.menuRight,
    menuBotton: app.globalData.menuBotton,
    menuHeight: app.globalData.menuHeight,
    menuTop: app.globalData.menuTop,
    position: "北京",
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
    titleBarVisible: false,
    selected: 0,
    selectList: [
      {
        text: "首页",
        iconPath: "../../images/icons/icon-1.svg",
        selectedIconPath: "../../images/icons/icon-1-active.svg",
        index: 0,
      },
      {
        text: "地图",
        iconPath: "../../images/icons/icon-2.svg",
        selectedIconPath: "../../images/icons/icon-2-active.svg",
        index: 1,
      }
    ]
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


  async ocrClick(e) {
    const { id, ocr, videoUrl } = e.detail
    console.log('ocr click', e.detail)
    const { bind } = e.detail

    const url = bind
      ? `/pages/detail/index?pid=${id}&bind=${bind}&videoUrl=${encodeURIComponent(videoUrl)}&url=${encodeURIComponent(ocr)}`
      : `/pages/osd-ar/index?pid=${id}&videoUrl=${encodeURIComponent(videoUrl)}&url=${encodeURIComponent(ocr)}`
    if (!bind) {
      try {
        await authCamera()
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
  },

  switchTab(event) {
    const idx = event.currentTarget.dataset.id
    this.setData({
      selected: idx
    })
  },

  onFind() {
    wx.navigateTo({
      url: '/pages/area/index',
    });
  },
});
