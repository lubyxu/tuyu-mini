import { authCamera } from '../../utils/auth'
import { request } from '../../utils/req';

const app = getApp()

Page({
  data: {
    background: '',
    nodes:[],
    title: '',
    topImage: '',
    id: "",
    bind: false,
    osd: '',
    resource: '',
    showLoading: true
  },

  onLoad: function (options) {
    this.setData({
      id: options.id,
      // bind: options.bind === 'false' ? false : true,
      // videoUrl: options.videoUrl,
      // url: options.url,
    })
  },

  onReady() {
    this.getInitData()
  },

  async getInitData() {
    try {
      // await this.getUserInfo()
      await this.getPoduct()
      this.setData({ showLoading: false })
    } catch (err) {
      console.log('err', err)
    }
  },

  async getPoduct () {
    const { data } = await request({
      method: 'POST',
      url: '/fuyu/product/detail',
      data: {
        product_id: 2
      }
    });
    const { product_info = {}} = data
    const {
      bg_img = '',
      content = [],
      ar_config: {
        resource,
        osd
      },
      title = '',
      top_img = 'https://636c-cloud1-0gq8f3qi3903d318-1327253936.tcb.qcloud.la/gulou/gulou-detail-top.png?sign=92cf4765a73ab156ee4f0c1bd37f9ad7&t=1718693020'
    } = product_info
    const nodes = this.getNodes(content.content)
    this.setData({
      background: bg_img,
      nodes,
      title,
      topImage: top_img,
      resource,
      osd
    })
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

  // chooseOrPreviewImageTap() {
  //   if (this.data.bind) {
  //     wx.navigateTo({
  //       url: `/pages/photo/index?pid=${this.data.pid}`,
  //     });
  //     return
  //   }
  //   wx.chooseImage({
  //     count: 2,
  //     sizeType: ['original', 'compressed'],
  //     sourceType: ['album', 'camera'],
  //     success: this.chooseImageSuccess
  //   })
  // },

  // async chooseImageSuccess(res) {
  //   const tempFilePaths = res.tempFilePaths
  //   const uploadPromises = []
  //   for (let i = 0; i < tempFilePaths.length; i++) {
  //     uploadPromises.push(this.uploadImageToCloud(tempFilePaths[i], i))
  //   }
  //   try {
  //     wx.showLoading()
  //     const uploadResult = await Promise.all(uploadPromises)
  //     console.log('uploadResult', uploadResult)
  //     await this.bind(uploadResult)
  //     wx.showToast({
  //       icon: 'success',
  //       title: '上传图片成功～'
  //     })
  //     setTimeout(() => {
  //       wx.navigateTo({
  //         url: `/pages/photo/index?pid=${this.data.pid}`,
  //       });
  //     }, 1000);
  //   } catch (err) {
  //     console.log(err)
  //     wx.showToast({
  //       icon: 'error',
  //       title: '上传图片失败～'
  //     })
  //   } finally {
  //     wx.hideLoading()
  //   }
  // },

  // async bind(uploadResult) {
  //   const imageList = uploadResult.map(({ fileID }) => {
  //     return fileID
  //   })
  //   await wx.cloud.callFunction({
  //     name: 'bind',
  //     data: {
  //       openid: app.globalData.openid,
  //       pid: this.data.pid,
  //       imageList,
  //     },
  //   })
  // },

  // uploadImageToCloud(filePath, index) {
  //   return new Promise((resolve, reject) => {
  //     const fileType = filePath.split('.')[1]
  //     console.log('cloudpath', `user-image/${app.globalData.openid}_${this.data.pid}_${index}.${fileType}`)
  //     wx.cloud.uploadFile({
  //       cloudPath: `user-image/${app.globalData.openid}_${this.data.pid}_${index}.${fileType}`,
  //       filePath,
  //       success: resolve,
  //       fail: reject
  //     })
  //   })
  // },

  async gotoAR() {
    try {
      await authCamera()
    } catch (err) {
      wx.showToast({
        icon: 'error',
        title: '授权失败'
      })
      return
    }
    console.log('osd', this.data.osd)
    wx.navigateTo({
      url: `/pages/osd-ar/index?id=${this.data.id}&videoUrl=${encodeURIComponent(this.data.resource)}&osd=${encodeURIComponent(this.data.osd)}`
    });
  },
});
