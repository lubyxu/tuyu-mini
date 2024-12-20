import { addToPage } from '../../../service/signet/index';
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
    isHorizontal: Boolean
  },
  observers: {
    signet: function (signet) {
      if (!signet) return;
      const src = signet.image_url;
      if (!src) return;
      wx.getImageInfo({
        src,
        success: (res) => {
          this.setData({
            isHorizontal: res.width > res.height
          })
        }
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
        error() {
          wx.showToast({
            icon: 'none',
            title: '扫码失败',
          });
        }
      })
    },
    async onMapOpen() { 
    }
  }
});