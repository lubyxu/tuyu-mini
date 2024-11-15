import getBehavior from './behavior'
import yuvBehavior from './yuvBehavior'
import { request } from '../../utils/req';

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
      "loop": false,
      "useFrameCache": false,
      "useVideoDBCache": false,
      "mute": true,
      "forceBlob": false,
      "showVideo": false,
      "showPlayerInfo": true,
      "useAccurate": true,
      "logLevel": "info",
      "renderType": "webgl",
      videoUrl: ''
    },
    theme: 'light',
    osd: '',
    id: '',
    frameShow: false,
    frameX: 0,
    frameY: 0,
    frameWidth: 0,
    frameHeight: 0,
    routing: false,
    replace: false
  },

  lifetimes: {
    ready: function () {
      const pages = getCurrentPages()
      const page = pages[pages.length - 1]
      console.log(';options', page?.options)
      this.setData({
        osd: decodeURIComponent(page?.options?.osd),
        osd: "https://636c-cloud1-0gq8f3qi3903d318-1327253936.tcb.qcloud.la/app-assets/gulou.jpg?sign=03bca79246ea0b8b2b1f22b7185f3994&t=1719304890",
        id: page?.options?.id,
      })
      if (page?.options?.videoUrl && page?.options?.videoUrl !== 'undefined') {
        this.setData({
          options: {
            ...this.data.options,
            videoUrl: (decodeURIComponent(page?.options?.videoUrl))
          }
        })
      }
    },
  },
  pageLifetimes: {
    hide() {
      console.log('moved')
      this.removeOSDMarker()
    },
  },
  methods: {
    onStart() {
      console.log('onStart')
    },
    async onRouter() {
      const res = await this.onBind()
      console.log('绑定成功', res)
      wx.navigateTo({
        url: `/pages/photo/index?pid=${this.data.id}`
      });
    },
    onEnd() {
      this.onRouter()
    },
    async init() {
      this.initGL()
    },

    onBind() {
      return request({
        url: '/fuyu/product/userbind',
        data: {
          product_id: this.data.id / 1
        }
      });
    },

    onSuccess(anchors) {
      try {
        if (this.routing) return
        this.setData({
          routing: true
        })
        const videoUrl = this.data?.options?.videoUrl
        if (!videoUrl) {
          this.onRouter()
        } else {
          this.setData({
            frameShow: true,
          })
        }
        this.setData({
          routing: false
        })
      } catch(err) {
        console.error(err)
      }
     
    },
    afterVKSessionCreated() {
      console.log('all==' , this.session.getAllOSDMarker())
      this.session.on('addAnchors', this.onSuccess.bind(this))
      this.session.on('updateAnchors', this.onSuccess.bind(this))
      this.session.on('removeAnchors', anchors => {
        // this.setData({
        //   frameShow: false,
        // })
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
      if (this.markerId) return
      const fs = wx.getFileSystemManager()
      const filePath = `${wx.env.USER_DATA_PATH}/${this.data.id}.png`

      const download = callback => wx.downloadFile({
          // 此处设置为osd识别对象的地址
          url: this.data.osd,
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
          [this.data.id]: markerId
        }
        console.log('[addMarker] --> ', filePath, markerId)   
        console.log('all=1=' , this.session.getAllOSDMarker())
        this.setData({
          "filePathNow": filePath,
        })
      }
      download(add)
    },
    removeOSDMarker() {
      if (this.markerId) {
        this.session.removeOSDMarker(this.markerId)
        this.markerId = null
      }
    },
  },
})