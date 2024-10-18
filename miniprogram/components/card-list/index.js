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
    ocrClick(e) {
      const item = e.currentTarget.dataset.item
      this.triggerEvent('ocrClick', item)
    },
    onFind() {
      this.triggerEvent('onFind')
    }
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      console.log(this.data.cardData)
    },
  }
})