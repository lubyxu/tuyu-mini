// components/notification/index.js
Component({
  data: {
    image: "",
    use2D: true,
    showDoawnload: false,
    posterData: {
      "width": "310px",
      "height": "440px",
      "background": "#f8f8f8",
      "borderRadius": "8px",
      "views": [
        {
          "type": "image",
          "url": "https://7072-production-6gycngib97dae447-1327253936.tcb.qcloud.la/assets/common/%E6%88%91%E5%9C%A8%E9%BC%93%E6%A5%BC.png?sign=b2c98a49072512532279d4c2665e4b3c&t=1727420192",
          "css": {
            "width": "310px",
            "height": "440px",
            "top": "0px",
            "left": "0px",
            "rotate": "0",
            "borderRadius": "",
            "borderWidth": "",
            "borderColor": "#000000",
            "shadow": "",
            "mode": "scaleToFill"
          }
        },
        {
          "type": "text",
          "text": "10.01",
          "css": {
            "color": "#000000",
            "width": "80px",
            "height": "48.62px",
            "top": "33px",
            "left": "36px",
            "rotate": "-5.7",
            "borderRadius": "",
            "borderWidth": "",
            "borderColor": "#000000",
            "shadow": "",
            "padding": "0px",
            "fontSize": "34px",
            "fontWeight": "normal",
            "maxLines": "2",
            "lineHeight": "49px",
            "textStyle": "fill",
            "textDecoration": "none",
            "textAlign": "left"
          }
        },
        {
          "type": "image",
          "url": "https://7072-production-6gycngib97dae447-1327253936.tcb.qcloud.la/assets/common/poster-logo.png?sign=4d870644a8ed2de57fb176687d4ac125&t=1727421568",
          "css": {
            "width": "100px",
            "height": "50px",
            "top": "13px",
            "left": "140px",
            "rotate": "0",
            "borderRadius": "",
            "borderWidth": "",
            "borderColor": "#000000",
            "shadow": "",
            "mode": "scaleToFill"
          }
        },
        {
          "type": "image",
          "url": "https://7072-production-6gycngib97dae447-1327253936.tcb.qcloud.la/user-image/opCoW7Q2fxSC_3BOrc_XNc-6xHUk_000001_0.jpg?sign=cdeccec8b7e6c892715af5f0054f8259&t=1727421793",
          "css": {
            "width": "198px",
            "height": "209px",
            "top": "64px",
            "left": "51px",
            "rotate": "-5.7",
            "borderRadius": "5px",
            "borderWidth": "",
            "borderColor": "#000000",
            "shadow": "",
            "mode": "scaleToFill"
          }
        },
        {
          "type": "image",
          "url": "https://7072-production-6gycngib97dae447-1327253936.tcb.qcloud.la/assets/%E9%BC%93%E6%A5%BC/poster-gulou-text.png?sign=c5651cb03cc24733b03e3990b2774cf2&t=1727422161",
          "css": {
            "width": "128px",
            "height": "52px",
            "top": "281px",
            "left": "63px",
            "mode": "scaleToFill"
          }
        },
        {
          "type": "image",
          "url": "https://7072-production-6gycngib97dae447-1327253936.tcb.qcloud.la/assets/%E9%BC%93%E6%A5%BC/posster-gulou-item.png?sign=65094d6ac62e9d579f7b5e68b10b4adb&t=1727422441",
          "css": {
            "width": "70px",
            "height": "80px",
            "top": "246px",
            "left": "192px",
          }
        },
        {
          "type": "image",
          "url": "https://7072-production-6gycngib97dae447-1327253936.tcb.qcloud.la/assets/%E9%BC%93%E6%A5%BC/posster-gulou-item.png?sign=65094d6ac62e9d579f7b5e68b10b4adb&t=1727422441",
          "css": {
            "width": "70px",
            "height": "80px",
            "top": "246px",
            "left": "192px",
          }
        },
        {
          "type": "image",
          "url": "https://7072-production-6gycngib97dae447-1327253936.tcb.qcloud.la/assets/common/qrcodee.png?sign=66a087fc0ee7df982c51ea62bdc34889&t=1727665669",
          "css": {
            "width": "60px",
            "height": "60px",
            "borderRadius": "5px",
            "top": "345px",
            "left": "68px",
          }
        },
        {
          "type": "text",
          "text": "钟鼓楼|老街旧巷,",
          "css": {
            "color": "#000000",
            "width": "300px",
            "height": "48.62px",
            "top": "337px",
            "left": "132px",
            "rotate": "-5.7",
            "fontSize": "14px",
            "fontFamily": "FZKai-Z03S"
          }
        },
        {
          "type": "text",
          "text": "可可可钟鼓楼|老街旧巷,",
          "css": {
            "color": "#000000",
            "width": "300px",
            "height": "48.62px",
            "top": "360px",
            "left": "132px",
            "rotate": "-5.7",
            "fontSize": "14px",
            "fontFamily": "FZKai-Z03S"
          }
        },
      ]
    }
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
            debugger
            if (!res.authSetting['scope.writePhotosAlbum']) {
              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success: resolve,
                fail: () => {
                  debugger
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