import { request, SUCCESS_CODE } from '../../utils/req.js';
import { getUser } from '../../utils/auth.js';
import { uploadPhotos, formatTime } from '../../utils/upload.js'


const app = getApp()
Page({
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 500,
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
    isVideo: true,
    shareLink: ''
  },

  onLoad: function (options) {
    this.setData({
      pid: options.pid / 1,
    })
  },

  onReady() {
    this.getInitData()
  },

  onUnload() {
    console.log('onUnload')
    wx.navigateBack({
      delta: 1
    });
  },

  async getInitData() {
    try {
      if (!app.globalData?.user?.token) {
        await getUser()
      }
      const res = await request({ url: `/fuyu/product/memory/info`, data: { product_id: this.data.pid } })
      const { data, errno } = res
      if (errno!== SUCCESS_CODE) {
        throw res
      }
      let { memory: { data: memoryData, type }, bg_img, product_show_img, spot_name, product_name, shar_config } = data
      const { product_mem_bg_img: topBackgroundImage, product_share_bg_img, user_mem_desc = '' } = shar_config
      memoryData = memoryData.map(({ create_time, text, file }) => {
        const [url] = file.split(',')
        return { url, createTime: formatTime(create_time), text }
      })
      const isVideo = type === 'video'
      this.setData({
        photos: memoryData,
        time: memoryData?.[0]?.createTime || 12.11,
        description: user_mem_desc.split('\n'),
        product_img: product_show_img,
        showLoading: false,
        topBackgroundImage,
        product_share_bg_img,
        isVideo,
        shareLink: this.formatUrl(isVideo, memoryData[0]?.url)
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
    wx.chooseMedia({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: this.chooseImageSuccess
    })
  },

  uploadPhotosServer(uploadResult, type) {
    const body = {
      product_id: 2,
      mem_data: uploadResult.map(({ filePath, createTime }) => ({
        file: filePath,
        create_time: createTime,
      })),
      type
    }
    return request({ url: '/fuyu/product/memory/update', data: body })
  },

  formatUrl (isVideo, url) {
    return isVideo
      ? `${url}?x-oss-process=video/snapshot,t_1000,f_jpg,w_198,h_260,rm_fast`
      : url
  },

  async chooseImageSuccess(res) {
    console.log('res', res)
    const type = res.type
    const isVideo = type === 'video'
    if (isVideo && res.tempFiles.length > 1) {
      wx.showToast({
        title: '暂不支持上传多个视频',
        icon: 'none',
        duration: 2000
      })
      return
    }

    const tempFilePaths = res.tempFiles.map((item) => item.tempFilePath)
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
      const data = await this.uploadPhotosServer(uploadResult, type)
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
      console.log('url', this.formatUrl(isVideo, formaPhotos[0]?.url))
      this.setData({
        shareLink: this.formatUrl(isVideo, uploadResult[0]?.filePath),
        photos: formaPhotos,
        tiem: formatTime(Math.floor(new Date().getTime() / 1000)),
        isVideo
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
