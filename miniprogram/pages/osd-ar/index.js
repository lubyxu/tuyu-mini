import getBehavior from './behavior'
import yuvBehavior from './yuvBehavior'

const NEAR = 0.001
const FAR = 1000
const app = getApp()

Component({
  behaviors: [getBehavior(), yuvBehavior],
  data: {
    options: {
      "alphaDirection": "left",
      "mode": "Fill",
      "useMetaData": true,
      "loop": true,
      "useFrameCache": false,
      "useVideoDBCache": false,
      "mute": true,
      "forceBlob": false,
      "showVideo": false,
      "showPlayerInfo": true,
      "useAccurate": true,
      "logLevel": "info",
      "renderType": "webgl",
      videoUrl: 'https://7072-production-6gycngib97dae447-1327253936.tcb.qcloud.la/assets/%E9%BC%93%E6%A5%BC/gulou.mp4?sign=57d77f82d80478c42222392ee97e880d&t=1725428557'
    },
    theme: 'light',
    url: '',
    pid: '',
    frameShow: false,
    frameX: 0,
    frameY: 0,
    frameWidth: 0,
    frameHeight: 0,
  },
  lifetimes: {
    ready: function () {
      const pages = getCurrentPages()
      const page = pages[pages.length - 1]
      console.log(';options', page.options.url, page.options.pid)
      this.setData({
        url: decodeURI(page?.options?.url),
        // url: 'https://7072-production-6gycngib97dae447-1327253936.tcb.qcloud.la/assets/%E9%BC%93%E6%A5%BC/gulou-photo-1.png?sign=07a243f1e3a64bdc91ba1b22041e3dd7&t=1725431444',
        pid: page?.options?.pid,
      })
    }
  },
  methods: {
    async init() {
      this.initGL()
    },
    afterVKSessionCreated() {
      console.log('all osk', this.session.getAllOSDMarker())
      this.session.on('addAnchors', anchors => {
        const anchor = anchors[0]
        console.log('anchor==', anchor, anchor.id, anchor.markerId)
        const {
          width,
          height
        } = this.data
        console.log('app?.globalData?.ocr?.[this.data.pid]', app?.globalData?.ocr?.[this.data.pid])
        if (anchor && app?.globalData?.ocr?.[this.data.pid]) {
          this.setData({
            frameShow: true,
            frameX: anchor.origin.x * width,
            frameY: anchor.origin.y * height,
            frameWidth: anchor.size.width * width,
            frameHeight: anchor.size.height * height,
          })

          // setTimeout(() => {
          //   wx.navigateTo({
          //     url: `/pages/detail/index?pid=${this.data.pid}`,
          //   });
          // }, 1500);
        }
      })
      this.session.on('updateAnchors', anchors => {
        const anchor = anchors[0]
        const {
          width,
          height
        } = this.data
        if (anchor) {
          this.setData({
            frameX: anchor.origin.x * width,
            frameY: anchor.origin.y * height,
            frameWidth: anchor.size.width * width,
            frameHeight: anchor.size.height * height,
          })
        }
      })
      this.session.on('removeAnchors', anchors => {
        this.setData({
          frameShow: false,
        })
      })
    },
    render(frame) {
      this.renderGL(frame)

      const camera = frame.camera

      // 相机
      if (camera) {
        this.camera.matrixAutoUpdate = false
        this.camera.matrixWorldInverse.fromArray(camera.viewMatrix)
        this.camera.matrixWorld.getInverse(this.camera.matrixWorldInverse)

        const projectionMatrix = camera.getProjectionMatrix(NEAR, FAR)
        this.camera.projectionMatrix.fromArray(projectionMatrix)
        this.camera.projectionMatrixInverse.getInverse(this.camera.projectionMatrix)
      }

      this.renderer.autoClearColor = false
      this.renderer.render(this.scene, this.camera)
      this.renderer.state.setCullFace(this.THREE.CullFaceNone)
    },
    addOSDMarker() {
      // this.removeOSDMarker()
      const fs = wx.getFileSystemManager()
      const filePath = `${wx.env.USER_DATA_PATH}/${this.data.pid}.png`
      // fs.unlinkSync(filePath)

      const download = callback => wx.downloadFile({
          // 此处设置为osd识别对象的地址
          url: this.data.url,
          success(res) {
              fs.saveFile({
                  filePath,
                  tempFilePath: res.tempFilePath,
                  success: callback,
              })
          },
          fail(err) {
            console.log('download 图片失败')
            console.log(err)
          }
      })

      const add = () => {
        const markerId = this.session.addOSDMarker(filePath)
        if (!app.globalData.ocr) {
          app.globalData.ocr = {}
        }
        app.globalData.ocr = {
          ...app.globalData.ocr,
          [this.data.pid]: markerId
        }
        console.log('[addMarker] --> ', filePath, markerId)   
        this.setData({
          "filePathNow": filePath,
        })
      }
      download(add)
      
    },
    removeOSDMarker() {
      if (app?.globalData?.ocr?.[this.data.pid]) {
        this.session.removeOSDMarker( app?.globalData?.ocr?.[this.data.pid])
      }
    },
  },
})