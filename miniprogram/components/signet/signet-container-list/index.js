import { chooseImage, uploadPhotos } from '../../../utils/upload';

Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    book: Object,
    curIndex: Number,
    signets: Object,
    bgImage: String,
    time: String,
    location: Object,
    title: String,
    showFinishIcon: false,
    isStampOrigin: true,
    positionX: 0,
  },
  observers: {
    signet: function (signet) {
      if (!signet) {
        this.setData({
          showImage: '',
          fetching: false
        });
        return;
      }
      const src = signet.image_url;
      if (!src) {
        this.setData({
          showImage: '',
          fetching: false
        });
        return;
      }
      this.setData({
        fetching: true,
      });
      this.setShowImage(this.data.isStampOrigin);
    }
  },


  /**
   * 组件的初始数据
   */
  data: {
    fetching: true,
    corppedStamp: '',
    showImage: '',
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setShowImage(isStampOrigin) {
      if (this.timer1) {
        clearTimeout(this.timer1);
        this.timer1 = null;
      }
      if (isStampOrigin) {
        this.setData({
          showImage: this.data.signet.image_url,
        });

        this.timer1 = setTimeout(() => {
          this.setData({
            fetching: false
          })
        }, 200)
      }
      else {
        this.setData({
          fetching: false,
          showImage: this.data.signet.corppedStamp
        });
      }
    },
    async onUpload() {
      const files = await chooseImage();
      const data = await uploadPhotos({
        filePath: files[0].tempFilePath,
        id: +Date.now(),
        productId: this.data.book.book_id,
      });
      const signetSrc = data.filePath;
      this.triggerEvent('onPageAdd', { imageUrl: signetSrc });
    },
    onScan() {
      wx.scanCode({
        success: (res) => {
          const path = res.path;
          if (!path) {
            wx.showToast({
              icon: 'none',
              title: '扫码失败',
            });
            return;
          }
          this.triggerEvent('onPageGo', { path: '/' + path });
        },
        fail() {
          wx.showToast({
            icon: 'none',
            title: '扫码失败',
          });
        },
      })
    },
    async onStampChange() {
      const val = !this.data.isStampOrigin
      this.setData({
        isStampOrigin: val,
        showImage: val ? this.data.signet.image_url : this.data.signet.corppedStamp
      });

      this.triggerEvent('isStampOrigin', { isStampOrigin: val });
    },
    onReset() {
      this.setData({
        showImage: '',
        fetching: true,
      });
    },
    onIndexChange(e) {
      this.triggerEvent('onIndexChange', e.detail.current)

    }
  }
});