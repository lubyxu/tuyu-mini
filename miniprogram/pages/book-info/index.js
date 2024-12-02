const app = getApp()
import { getUser } from '../../utils/auth'
import { request } from '../../utils/req';


Page({
  async onReady() {
    this.getInitData()
  },

  data: {
    preview: 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/book-preview.png',
    name: '',
    navBarHeight: app.globalData.navBarHeight,
  },

  async getInitData() {
    if (!app.globalData?.user?.token) {
      await getUser()
    }
    await request({
      method: 'POST',
      url: '/fuyu/spot/list',
      data: {
        province: "beijing"
      }
    }); 

    this.setData({ showLoading: false, name: '蛇年限定款' })
  },

  gotoProtral() {
    wx.navigateTo({
      url: '/pages/protral/index',
    })
  }
});
