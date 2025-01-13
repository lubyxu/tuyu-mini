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
  },

  /**
   * 组件的初始数据
   */
  data: {
    showImg: '',
    mode: ''
  },
})