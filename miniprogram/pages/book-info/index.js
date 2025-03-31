const app = getApp()
import { getUser, registerAccount } from '../../utils/auth'
import { request, SUCCESS_CODE } from '../../utils/req';

Page({
  onLoad(options) {
    this.options = options
  },

  async onReady() {
    if (!app.globalData?.user?.token) {
      await getUser()
    }
    const isLogined = app?.globalData?.user?.token
    this.setData({ isLogined: !!isLogined })
    this.getInitData()
  },

  data: {
    preview: '',
    name: '',
    navBarHeight: app.globalData.navBarHeight,
    isLogined: false,
  },

  async getInitData() {
    if (!app.globalData?.user?.token) {
      await getUser()
    }
    try {
      const { errno, data } = await request({
        method: 'POST',
        url: '/fuyu/product/code',
        data: {
          code: this.options.code / 1
        }
      }); 
      const { show_image, name  } = data?.product
      if (SUCCESS_CODE != errno) {
        wx.showToast({
          icon: 'error',
          title: '获取失败，请重试',
        })
        return
      }
      this.setData({ showLoading: false, preview: show_image, name })
    } catch (error) {
      wx.showToast({
        icon: 'error',
        title: '获取失败，请重试',
      })
      console.log(error)
    }
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
    await registerAccount(code);
    this.setData({ isLogined: true })
    this.bindBook(code);
  },

  async bindBook() {
    try {
      const { errno, data } = await request({
        method: 'POST',
        url: '/fuyu/product/userbind/code',
        data: {
          code: this.options.code / 1
        }
      }); 
      if (SUCCESS_CODE != errno) {
        wx.showToast({
          icon: 'error',
          title: '绑定失败，请重试',
        })
        return
      }
      wx.switchTab({
        url: '/pages/protral/index',
      })
    } catch (error) {
      wx.showToast({
        icon: 'error',
        title: '绑定失败，请重试',
      })
      console.log(error)
    }
  }
});
