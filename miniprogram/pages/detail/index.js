const { envList } = require('../../envList.js');
const app = getApp()

Page({
  data: {
    backgroud: '',
    nodes:[],
    title: '',
    topImage: '',
    openid: '',
    pid: "",
  },

  onLoad: function (options) {
    this.setData({
      pid: app.globalData.pid,
      openid: app.globalData.openid,
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
      await this.getPoduct()
      wx.hideLoading()
    } catch (err) {
      wx.hideLoading()
      console.log('err', err)
    }
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
        _id: this.data._id
      },
    })
    const { detail } = data.result
    const { backgroud = '', content = [], title = '', topImage = '' } = detail
    const nodes = this.getNodes(content)
    console.log('nodes', nodes)
    this.setData({
      backgroud,
      nodes,
      title,
      topImage
    })
    console.log('products', data)
  },

  chooseImageTap() {
    wx.chooseImage({
      count: 2,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: this.chooseImageSuccess
    })
  },

  async chooseImageSuccess(res) {
    const tempFilePaths = res.tempFilePaths
    console.log('tempFilePaths', tempFilePaths)
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
        openid: this.data.openid,
        pid: this.data.pid,
        imageList,
      },
    })
  },

  uploadImageToCloud(filePath, index) {
    return new Promise((resolve, reject) => {
      const fileType = filePath.split('.')[1]
      console.log('cloudpath', `user-image/${this.data.openid}_${this.data.pid}_${index}.${fileType}`)
      wx.cloud.uploadFile({
        cloudPath: `user-image/${this.data.openid}_${this.data.pid}_${index}.${fileType}`,
        filePath,
        success: resolve,
        fail: reject
      })
    })
  }
});
