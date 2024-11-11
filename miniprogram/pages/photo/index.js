import { request, SUCCESS_CODE } from '../../utils/req.js';
import { uploadPhotos, formatTime } from '../../utils/upload.js'

Page({
  data: {
    pid: "",
    topBackgroundImage: '',
    topBackgroundImage2: 'https://636c-cloud1-0gq8f3qi3903d318-1327253936.tcb.qcloud.la/app-assets/photo-tiny-bg.png?sign=a01574f986bf50a15dbe5cd9ec97b899&t=1718937514',
    product_share_bg_img: '',
    bottomImage: '',
    name: '北京鼓楼',
    photos: [],
    description: [],
    date: '',
    time: '',
    showLoading: true,
    showPoster: false,
    product_img: '',
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
      const res = await request({ url: `/fuyu/product/memory/info`, data: { product_id: 2 } })
      const { data, errno } = res
      if (errno!== SUCCESS_CODE) {
        throw res
      }
      let { memory: { data: memoryData }, bg_img, product_show_img, spot_name, product_name, shar_config } = data
      const { product_mem_bg_img: topBackgroundImage, product_share_bg_img, user_mem_desc = '' } = shar_config
      memoryData = memoryData.map(({ create_time, text, file }) => {
        const [url] = file.split(',')
        return { url, createTime: formatTime(create_time), text }
      })
      this.setData({
        photos: memoryData,
        time: memoryData?.[0]?.createTime || 12.11,
        description: user_mem_desc.split('\n'),
        product_img: product_show_img,
        showLoading: false,
        topBackgroundImage,
        product_share_bg_img
      })
    } catch (err) {
      console.log('err', err)
    }
  },

  jumpMap() {
    wx.switchTab({
      url: '/pages/map/index/index'
    })
  },


  updateImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: this.chooseImageSuccess
    })
  },

  uploadPhotosServer(uploadResult) {
    const body = {
      product_id: 2,
      mem_data: uploadResult.map(({ filePath, createTime }) => ({
        file: filePath,
        create_time: createTime,
      }))
    }
    return request({ url: '/fuyu/product/memory/update', data: body })
  },

  async chooseImageSuccess(res) {
    const tempFilePaths = res.tempFilePaths
    const uploadPromises = []
    for (let i = 0; i < tempFilePaths.length; i++) {
      uploadPromises.push(uploadPhotos({ filePath: tempFilePaths[i], id: i }))
    }
    try {
      wx.showToast({
        icon: 'loading',
        title: '上传图片中',
      })
      const uploadResult = await Promise.all(uploadPromises)
      console.log('uploadResult', uploadResult)
      const data = await this.uploadPhotosServer(uploadResult)
      console.log('data', data)
      wx.showToast({
        icon: 'success',
        title: '上传图片成功～',
        duration: 2000
      })
      const formaPhotos = tempFilePaths.map((url) => {
        return {
          url,
        }
      })
      this.setData({
        photos: formaPhotos,
        tiem: formatTime(Math.floor(new Date().getTime() / 1000))
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
  },

  onClose() {
    this.setData({
      showPoster: false
    })
  },

  scrollToBottom: function () {
    const query = wx.createSelectorQuery().in(this);
    query.select('#scrollView').boundingClientRect(function (rect) {
      const scrollTop = rect.height; // 获取滚动视图的总高度
      wx.pageScrollTo({
        scrollTop: scrollTop, // 滚动到底部
        duration: 300 // 滚动动画的持续时间
      });
    }).exec();
  }
});
