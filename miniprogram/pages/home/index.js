const app = getApp()
import { authCamera } from '../../utils/auth'
import { request } from '../../utils/req';

Page({
  onShareAppMessage() {
    return {
      title: '福鱼文创',
      path: 'pages/home/index',
      imageUrl: 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/share-mini.png'
    }
  },

  onShow: function() {
    // this.setTabBar()
    wx.login({
      success: (res) => {
        console.log('res', res)
      },
    });
  },

  async onReady() {
    await Promise.all([this.getInitData(), this.getBanners()])
    this.setData({ showLoading: false })
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
    banners: [],
    latitude: 23.096994,
    longitude: 113.324520,
    selectList: [
      {
        text: "路书",
        iconPath: "../../images/icons/icon-1.png",
        selectedIconPath: "../../images/icons/icon-1-active.png",
        index: 0,
      },
      {
        text: "景点",
        iconPath: "../../images/icons/icon-2.png",
        selectedIconPath: "../../images/icons/icon-2-active.png",
        index: 1,
      },
    ],
    list: []
  },

  async getInitData() {
    const { data } = await request({
      method: 'POST',
      url: '/fuyu/spot/list',
      data: {
        province: "beijing"
      }
    });
    let { list = [], center_geo: { loc_long, loc_lat } } = data
    list = list.sort((a, b) => (a.sort - b.sort))
    this.setData({ list, latitude: loc_lat, longitude: loc_long })
  },

  async getBanners() {
    const { data } = await request({
      method: 'POST',
      url: '/fuyu/banner',
      data: {
        province: "beijing"
      }
    });
    let { list = []} = data
    list = list.map(({ banner_img }) => {
      return { url: banner_img }
    })
    this.setData({ banners: list })
  },

  scrollBottom() {
    // this.getPoducts()
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
      url: `/pages/scenic-map/index?longitude=${this.data.longitude}&latitude=${this.data.latitude}`,
    });
  },
});
