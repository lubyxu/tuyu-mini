// pages/path-note-detail/info-modal/index.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    show: Boolean,
    desc: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    lines: []
  },

  observers: {
    desc(val) {
      const lines = val.split(/\\n/g);
      this.setData({
        lines
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})