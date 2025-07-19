// pages/sign-in/point/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    id: Number,
    name: String,
    value: Number,
    isCompeleted: Boolean
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
    onShare() {
      this.triggerEvent('share', { id: this.properties.id })
    }
  }
})