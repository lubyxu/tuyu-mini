const app = getApp()
const { parseServerDate } = require('../../utils/cloud.js')

Page({
  data: {
    pid: "",
    topBackgroundImage: '',
    bottomImage: '',
    name: '',
    photos: [],
    date: '',
  },

  onLoad: function (options) {
    this.setData({
      pid: options.pid,
    })
  },

  onReady() {
    this.getInitData()
  },

  async getInitData() {
    try {
      wx.showLoading({
        title: '加载中',
      })
      await this.getUserInfo()
      await Promise.all([this.getBind(), this.getPoduct()])
      wx.hideLoading()
    } catch (err) {
      wx.hideLoading()
      console.log('err', err)
    }
  },

  async getUserInfo() {
    if (app.globalData.openid) {
      return
    }
    const data = await wx.cloud.callFunction({
      name: 'getOpenId',
    })
    const { openid } = data?.result
    app.globalData.openid = openid
  },

  async getBind() {
    const data = await wx.cloud.callFunction({
      name: 'getBind',
      data: {
        pid: `${this.data.pid}`,
        openid: `${app.globalData.openid}`
      },
    })
    const { imageList: photos = [],  date: serverDate } = data?.result?.data
    console.log('products', data)
    console.log('photos', photos)
    const formatData = serverDate ? parseServerDate(serverDate) : ''
    this.setData({
      photos,
      date: formatData
    })
  },

  async getPoduct() {
    const data = await wx.cloud.callFunction({
      name: 'getProduct',
      data: {
        pid: this.data.pid
      },
    })
    const { photoPage } = data.result
    const { topBackgroundImage = '', bottomImage = [], name = '' } = photoPage
    this.setData({
      topBackgroundImage,
      bottomImage,
      name,
    })
    console.log('products', data)
  },
});
