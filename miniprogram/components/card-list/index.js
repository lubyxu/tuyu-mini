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
    products: [{
      id: 1,
      title: '北京鼓楼',
      subtitle:'我在鼓楼',
      background: 'https://636c-cloud1-0gq8f3qi3903d318-1327253936.tcb.qcloud.la/gulou/gulou-home-card.png?sign=29fa3605110eb72800133f785268a8bf&t=1718692990', 
      preview: 'https://636c-cloud1-0gq8f3qi3903d318-1327253936.tcb.qcloud.la/gulou/gulou-detail-top.png?sign=92cf4765a73ab156ee4f0c1bd37f9ad7&t=1718693020',
    }, {
      id: 2,
      title: '北京鼓楼',
      subtitle:'我在鼓楼',
      background: 'https://636c-cloud1-0gq8f3qi3903d318-1327253936.tcb.qcloud.la/gulou/gulou-home-card.png?sign=29fa3605110eb72800133f785268a8bf&t=1718692990', 
      preview: 'https://636c-cloud1-0gq8f3qi3903d318-1327253936.tcb.qcloud.la/gulou/gulou-detail-top.png?sign=92cf4765a73ab156ee4f0c1bd37f9ad7&t=1718693020',
    }],
  },

  methods: {
    ocrClick(e) {
      const item = e.currentTarget.dataset.item
      // this.triggerEvent('ocrClick', item)
    },
    onFind() {
      this.triggerEvent('onFind')
    }
  },

  lifetimes: {
    // 组件所在页面的生命周期函数
    attached: function () {
      console.log(this.data.cardData)
    },
  }
})