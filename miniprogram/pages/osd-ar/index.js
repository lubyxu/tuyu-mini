import getBehavior from './behavior'
import yuvBehavior from './yuvBehavior'

const NEAR = 0.001
const FAR = 1000

Component({
  behaviors: [getBehavior(), yuvBehavior],
  data: {
    theme: 'light',
    frameShow: false,
    frameX: 0,
    frameY: 0,
    frameWidth: 0,
    frameHeight: 0,
  },
  lifetimes: {
      /**
      * 生命周期函数--监听页面加载
      */
      detached() {
      console.log("页面detached")
      if (wx.offThemeChange) {
        wx.offThemeChange()
      }
      },
      ready() {
      console.log("页面准备完全")
        this.setData({
          theme: wx.getSystemInfoSync().theme || 'light'
        })

        if (wx.onThemeChange) {
          wx.onThemeChange(({theme}) => {
            this.setData({theme})
          })
        }
      },
  },
  methods: {
    init() {
      this.initGL()
      this.addOSDMarker()
    },
    afterVKSessionCreated() {
      this.session.on('addAnchors', anchors => {
        const anchor = anchors[0]
        console.log('anchor==', anchor, anchor.id, anchor.markerId, this.markerId )
        const {
          width,
          height
        } = this.data
        if (anchor && this.markerId) {
          this.setData({
            frameShow: true,
            frameX: anchor.origin.x * width,
            frameY: anchor.origin.y * height,
            frameWidth: anchor.size.width * width,
            frameHeight: anchor.size.height * height,
          })

          setTimeout(() => {
            wx.navigateTo({
              url: `/map/pages/index/index`,
            });
          }, 1500);
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
      if (this.markerId) return
      const fs = wx.getFileSystemManager()
      const filePath = `${wx.env.USER_DATA_PATH}/osd-ar.jpg`

      const download = callback => wx.downloadFile({
          // 此处设置为osd识别对象的地址
          url: 'https://636c-cloud1-0gq8f3qi3903d318-1327253936.tcb.qcloud.la/card-asstes/guaishou.jpg?sign=b7eee6bd0139165644231c2e0d1c4fa9&t=1718354148',
          success(res) {
              fs.saveFile({
                  filePath,
                  tempFilePath: res.tempFilePath,
                  success: callback,
              })
          }
      })

      const add = () => {
        console.log('[addMarker] --> ', filePath)
        this.markerId = this.session.addOSDMarker(filePath)
        this.setData({
          "filePathNow": filePath
        })
      }

      const getFilePathNow = () => {
        return this.data.filePathNow;
      }
      fs.stat({
        path: filePath,
        success(res) {
          let path = getFilePathNow()
          if (path != filePath) {
            if (res.stats.isFile() && path) {
              fs.unlinkSync(path)
            }
            download(add)
          } else {
            add()
          }
        },
        fail: (res) => {
          console.error(res)
          download(add)
        }
      })
    },
    removeOSDMarker() {
      if (this.markerId) {
        this.session.removeOSDMarker(this.markerId)
        this.markerId = null
      }
    },
    getAllOSDMarker() {
      console.log(this.session.getAllOSDMarker())
    },
  },
})