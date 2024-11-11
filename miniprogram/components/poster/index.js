import { getData } from './data'

Component({
  properties: {
    background: {
      type: String,
      value: '#000000',
    },
    shareLink: {
      type: String,
    },
    time: {
      type: String,
      value: [],
    },
    description: {
      type: [Object],
      value: [],
    },
  },

  lifetimes: {
    attached: function () {
      this.setData({
        posterData: getData({
          time: this.properties.time,
          photo: this.properties.shareLink,
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