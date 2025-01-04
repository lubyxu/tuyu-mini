import { chooseImage, uploadPhotos } from '../../../utils/upload';

Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    canCorpStamp: Boolean,
    book: Object,
    signetSrc: {
      type: String,
      value: 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/user-photos/4/4/4/1733237670470/1733237670470.jpg'
    },
    signet: Object,
    bgImage: String,
    time: String,
    location: Object,
    title: String,
    showFinishIcon: Boolean,
    isHorizontal: Boolean,

    isStampOrigin: {
      value: true,
      type: Boolean
    },
  },
  observers: {
    signet: function (signet) {
      if (!signet) {
        this.setData({
          fetching: false
        });
        return;
      }
      const src = signet.image_url;
      if (!src) {
        this.setData({
          fetching: false
        });
        return;
      }
      this.setData({
        fetching: true,
      });
      wx.getImageInfo({
        src,
        success: (res) => {
          this.setShowImage(res.width > res.height, this.data.isStampOrigin);
        }
      })
    }
  },


  /**
   * 组件的初始数据
   */
  data: {
    fetching: true,
    corppedStamp: '',
    showImage: ''
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setShowImage(isHorizontal, isStampOrigin) {
      if (isStampOrigin) {
        this.setData({
          fetching: false,
          isHorizontal,
          showImage: this.data.signet.image_url
        });
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
      this.setData({
        signetSrc
      });
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
    }
  }
});