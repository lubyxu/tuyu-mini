const app = getApp()
import { getUser, registerAccount } from '../../utils/auth'
import { request } from '../../utils/req';

Page({
  onShareAppMessage(res) {
    if (res.from === 'button') {
      const { id, name, trigger, img } = res.target.dataset;
      if (trigger === 'product') {
        return {
          title: name,
          path: `/pages/store-list/index?activity_id=${id}&name=${name}&from=share`,
          imageUrl: img
        }
      }
    }
    return {
      title: '拾光坊',
      path: 'pages/home/index',
      imageUrl: 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/share-mini.png'
    }
  },

  async onLoad() {
    this.firstRender = true
    if (!app.globalData?.user?.token) {
      try {
        await getUser()
      } catch(err) {

      }
    }
    await Promise.all([this.getBanners()])
    const isLogined = app?.globalData?.user?.token
    this.setData({ isLogined: !!isLogined })
    this.setData({ showLoading: false })
    await this.getUserInfo()
    this.firstRender = false
  },

  async onShow() {
    if (!this.firstRender) {
      if (!app.globalData?.user?.token) {
        await getUser()
      }
      this.getUserInfo()
    }
    const isLogined = app?.globalData?.user?.token
    this.setData({ isLogined: !!isLogined })
  },

  async getUserInfo() {
    const { data } = await request({
      method: 'GET',
      url: '/fuyu/getuserinfo',
    });

    const { user: { avatar } } = data;
    avatar && this.setData({ avatar })
  },

  data: {
    navBarHeight: app.globalData.navBarHeight,
    menuRight: app.globalData.menuRight,
    menuBotton: app.globalData.menuBotton,
    menuHeight: app.globalData.menuHeight,
    menuTop: app.globalData.menuTop,
    position: "北京",
    isLogined: false,
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
        text: "文创",
        iconPath: "../../images/icons/icon-2.png",
        selectedIconPath: "../../images/icons/icon-2-active.png",
        index: 1,
      },
    ],
    list: [],
    avatar: 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/home-icon.png',
  },

  async onRegisterAccount(e) {
    const code = e.detail.code;
    if (!code) {
      wx.showToast({
        icon: 'error',
        title: '登陆失败，请重试'
      })
      return
    } 
    this.setData({ isLogined: true })
    await registerAccount(code);
    this.gotoProtral()
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
        province: "beijing",
        from: 'mall'
      }
    });
    let { list = []} = data
    list = list.map(({ banner_img }) => {
      return { url: banner_img }
    })
    this.setData({ banners: list })
  },

  onLoginSuccess() {
    this.setData({ isLogined: true })
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

  gotoProtral() {
    wx.switchTab({
      url: `/pages/protral/index`,
    });
  }
});
