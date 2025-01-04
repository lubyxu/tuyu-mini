// components/signet/signet-book/index.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    isBook: Boolean,
    isFilled: Boolean,
    img: String,
    fallbackImg: String,
    bordered: {
      type: Boolean,
      value: true
    },
    mode: ''
  },

  observers: {
    img(src) {
      if (src === this.curImage) return;
      if (!src) {
        this.setShowImage(this.data.fallbackImg, 'widthFix');
        return;
      }
      wx.getImageInfo({
        src,
        success: (res) => {
          this.curImage = src;
          this.setShowImage(src, res.width > res.height ? 'widthFix' : 'heightFix');
        },
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showImg: '',
    mode: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setShowImage(img, mode) {
      this.setData({
        showImg: img,
        mode
      })
    }
  }
})