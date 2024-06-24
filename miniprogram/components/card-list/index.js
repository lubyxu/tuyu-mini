// components/notification/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    cardData: {
      type: [Object],
      value: [],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  methods: {
    bindscrolltolower() {
      this.triggerEvent('scrollBottom')
    },
    ocrClick(e) {
      const item = e.currentTarget.dataset.item
      this.triggerEvent('ocrClick', item)
    },
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      console.log(this.data.cardData)
    },
  }
})