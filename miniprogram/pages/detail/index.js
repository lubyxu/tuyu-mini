const { envList } = require('../../envList.js');
const app = getApp()

Page({
  data: {
    background: '',
    nodes:[],
    title: '',
    topImage: '',
    pid: "",
    bind: false,
    showLoading: true
  },

  onLoad: function (options) {
    this.setData({
      pid: options.pid,
      bind: options.bind,
    })
  },

  onReady() {
    this.getInitData()
  },

  async getInitData() {
    try {
      await this.getUserInfo()
      await this.getPoduct()
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

  getNodes(content) {
    const children = content.map((item) => {
      return {
        name: 'div',
        children: item.map(({ text, type }) => {
          return {
            name: 'span',
            attrs: type === 'keyword' ? { class: 'detail-content-box-keyword' } : {},
            children: [{
              text,
              type: 'text'
            }]
          }
        })
      }
    })

    const nodes = [{
      name: 'div',
      attrs: { class: 'detail-content-box' },
      children: children
    }]
    return nodes
  },

  async getPoduct() {
    const data = await wx.cloud.callFunction({
      name: 'getProduct',
      data: {
        pid: this.data.pid
      },
    })
    const { detail } = data.result
    const { background = '', content = [], title = '', topImage = '' } = detail
    const nodes = this.getNodes(content)
    this.setData({
      background,
      nodes,
      title,
      topImage
    })
    console.log('products', data)
  },

  chooseOrPreviewImageTap() {
    if (this.data.bind) {
      wx.navigateTo({
        url: `/pages/photo/index?pid=${this.data.pid}`,
      });
      return
    }
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
      wx.showLoading()
      const uploadResult = await Promise.all(uploadPromises)
      console.log('uploadResult', uploadResult)
      await this.bind(uploadResult)
      wx.showToast({
        icon: 'success',
        title: '上传图片成功～'
      })
      setTimeout(() => {
        wx.navigateTo({
          url: `/pages/photo/index?pid=${this.data.pid}`,
        });
      }, 1000);
    } catch (err) {
      console.log(err)
      wx.showToast({
        icon: 'error',
        title: '上传图片失败～'
      })
    } finally {
      wx.hideLoading()
    }
  },

  async bind(uploadResult) {
    const imageList = uploadResult.map(({ fileID }) => {
      return fileID
    })
    await wx.cloud.callFunction({
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
      console.log('cloudpath', `user-image/${app.globalData.openid}_${this.data.pid}_${index}.${fileType}`)
      wx.cloud.uploadFile({
        cloudPath: `user-image/${app.globalData.openid}_${this.data.pid}_${index}.${fileType}`,
        filePath,
        success: resolve,
        fail: reject
      })
    })
  }
});
