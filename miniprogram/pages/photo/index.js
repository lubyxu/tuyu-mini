const app = getApp()
const { parseServerDate } = require('../../utils/cloud.js')

Page({
  data: {
    pid: "",
    topBackgroundImage: '',
    topBackgroundImage2: '',
    bottomImage: '',
    name: '',
    photos: [],
    date: '',
    showLoading: true,
    showPoster: false,
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
      await this.getUserInfo()
      await Promise.all([this.getBind(), this.getPoduct()])
      this.setData({ showLoading: false })
    } catch (err) {
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
    console.log('data=>', data)
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
    const {
      topBackgroundImage = '',
      topBackgroundImage2 = 'https://636c-cloud1-0gq8f3qi3903d318-1327253936.tcb.qcloud.la/app-assets/photo-tiny-bg.png?sign=a01574f986bf50a15dbe5cd9ec97b899&t=1718937514',
      bottomImage = [],
      name = ''
    } = photoPage
    this.setData({
      topBackgroundImage,
      topBackgroundImage2,
      bottomImage,
      name,
    })
    console.log('products', data)
  },

  jumpMap() {
    wx.switchTab({
      url: '/pages/map/index/index'
    })
  },

  async bind(uploadResult) {
    const imageList = uploadResult.map(({ fileID }) => {
      return fileID
    })
    return await wx.cloud.callFunction({
      name: 'bind',
      data: {
        openid: app.globalData.openid,
        pid: this.data.pid,
        imageList,
      },
    })
  },

  uploadImageToCloud(filePath, index) {
    return new Promise((resolve, reject) => {
      const fileType = filePath.split('.')[1]
      const cloudPath = `user-image/${app.globalData.openid}_${this.data.pid}_${index}_${`${Math.random()}`.slice(2,6)}.${fileType}`
      wx.cloud.uploadFile({
        cloudPath,
        filePath,
        success: resolve,
        fail: reject
      })
    })
  },

  updateImage() {
    wx.chooseImage({
      count: 2,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: this.chooseImageSuccess
    })
  },

  async chooseImageSuccess(res) {
    const tempFilePaths = res.tempFilePaths
    const uploadPromises = []
    for (let i = 0; i < tempFilePaths.length; i++) {
      uploadPromises.push(this.uploadImageToCloud(tempFilePaths[i], i))
    }
    try {
      wx.showToast({
        icon: 'loading',
        title: '上传图片中',
      })
      const uploadResult = await Promise.all(uploadPromises)
      console.log('uploadResult', uploadResult)
      await this.bind(uploadResult)
      wx.showToast({
        icon: 'success',
        title: '上传图片成功～',
        duration: 2000
      })
      this.setData({
        photos: tempFilePaths,
      })
    } catch (err) {
      console.log(err)
      wx.showToast({
        icon: 'error',
        title: '上传图片失败～',
        duration: 2000
      })
    } finally {
      wx.hideLoading()
    }
  },

  showPoster() {
    this.setData({
      showPoster: true
    })
  }
});
