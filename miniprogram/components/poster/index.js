import { getData } from './data'

Component({
  properties: {
    background: {
      type: String,
      value: '#000000',
    },
    time: {
      type: String,
      value: [],
    },
    isVideo: {
      type: Boolean,
      value: false,
    },
    photos: {
      type: [Object],
      value: [],
    },
    description: {
      type: [Object],
      value: [],
    },
  },

  lifetimes: {
    attached: function () {
      const photos = this.properties.photos
      const photo = this.properties.isVideo
        ? `${photos[0].url}?x-oss-process=video/snapshot,t_1000,f_jpg,w_198,h_260,rm_fast`
        : photos[0].url
      this.setData({
        posterData: getData({
          time: this.properties.time,
          photo,
          description: this.properties.description,
        })
      })
    }
  },

  data: {
    image: "",
    use2D: true,
    showDoawnload: false,
    posterData: []
  },
  methods: {
    onImgOK(e) {
      console.log('onimgok')
      this.imagePath = e.detail.path;
      this.setData({
        image: this.imagePath,
        showDoawnload: true
      });
    },

    authSetting() {
      return new Promise((resolve, reject) => {
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.writePhotosAlbum']) {
              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success: resolve,
                fail: () => {
                  wx.showModal({
                    title: '请先授权保存到相册',
                    content: '否则无法使用',
                    success (res) {
                      if (res.confirm) {
                        wx.openSetting()
                      } else if (res.cancel) {
                        reject("取消授权")
                      }
                    }
                  })               
                },
              })
            } else {
              resolve()
            }
          }
        })
      })
    },

    onClose() {
      this.triggerEvent('closePoister')
    },

    async download() {
      try {
        await this.authSetting()
        if (this.imagePath && typeof this.imagePath === 'string') {
          wx.saveImageToPhotosAlbum({
            filePath: this.imagePath,
            success: () => {
              wx.showToast({
                title: '下载图片成功'
              })
            },
            fail: (err) => {
              console.log('err', err)
              wx.showToast({
                icon: 'error',
                title: '下载图片失败'
              })
            }
          });
        }
      } catch (err) {
        console.log('err', err)
        wx.showToast({
          icon: 'error',
          title: '下载图片失败'
        })
        return
      }
    }
  },
})