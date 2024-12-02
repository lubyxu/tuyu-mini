// components/signet/signet-container/index.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    signetSrc: String,
    bgImage: String,
    time: String,
    location: Object,
    title: String,
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
    onUpload() {

      const image = 'https://oss-whale-peach.meetwhale.com/wos%2Fharbor%2F9JzXqqDeclgPPDlRZVeN8%2F%E6%88%91%E5%9C%A8%E9%BC%93%E6%A5%BC.svg';
      this.setData({
        signetSrc: image
      });
    },
    onScan() {},
    onMapOpen() {}
  }
})