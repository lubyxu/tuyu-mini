import { registerAccount } from '../../utils/auth';

// components/notification/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    list: {
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
      // this.triggerEvent('ocrClick', item)
    },
    async onFind(e) {
      const code = e.detail.code;
      if (!code) {
        wx.showToast({
          icon: 'error',
          title: '登陆失败，请重试'
        })
        return
      } 
      await registerAccount(code);
      this.triggerEvent('onFind')
    }
  },

  lifetimes: {
    // 组件所在页面的生命周期函数
    attached: function () {
      // const data = this.data.list.map(({ products, ...rest }) => {
      //   const _products = products
      //   .sort((a, b) => a.sort / 1 - b.sort / 1)
      //   .map(item => {
      //     return {
      //      ...item,
      //       title: item.title || '北京鼓楼',
      //       subtitle: item.subtitle || '我在鼓楼',
      //       background: item.background || 'https://636c-cloud1-0gq8f3qi3903d318-1327253936.tcb.qcloud.la/gulou/gulou-home-card.png?sign=29fa3605110eb72800133f785268a8bf&t=1718692990',
      //       preview: item.preview || 'https://636c-cloud1-0gq8f3qi3903d318-1327253936.tcb.qcloud.la/gulou/gulou-detail-top.png?sign=92cf4765a73ab156ee4f0c1bd37f9ad7&t=1718693020',
      //     }
      //   })
      //   return { ...rest, products: _products }
      // })
      // this.setData({ cardData: data })
    },
  }
})