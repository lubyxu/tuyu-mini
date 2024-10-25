// components/notification/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    fontColor: {
      type: String,
      value: '#000000',
    },
    products: {
      type: [Object],
      value: [],
    },
    isVisited: {
      type: Boolean,
    },
  },

  data: {
    background: '',
    preview: '',
    title: '',
    subtitle: '',
    selectId: -1,
    showProducts: false,
    light: true,
    _products: []
  },

  ready: function () {
    const _products = this.properties.products
      .sort((a, b) => a.sort / 1 - b.sort / 1)
      .map(item => {
        return {
        ...item,
          title: item.title || '北京鼓楼',
          subtitle: item.subtitle || '我在鼓楼',
          background: item.background || 'https://636c-cloud1-0gq8f3qi3903d318-1327253936.tcb.qcloud.la/gulou/gulou-home-card.png?sign=29fa3605110eb72800133f785268a8bf&t=1718692990',
          preview: item.preview || 'https://636c-cloud1-0gq8f3qi3903d318-1327253936.tcb.qcloud.la/gulou/gulou-detail-top.png?sign=92cf4765a73ab156ee4f0c1bd37f9ad7&t=1718693020',
        }
      })
    this.setData({
      _products
    })
    const { background, preview, title, subtitle, id, style } = _products[0]
    this.setData({
      background,
      preview,
      title,
      subtitle,
      selectId: id,
      light: style === 'light',
      showProducts: _products.length > 1 
    })
    console.log(background, preview, title, subtitle)
  },

  methods: {
    ocrClick(e) {
      const item = e.currentTarget.dataset.item
      this.triggerEvent('ocrClick', item)
    },
    onFind() {
      this.triggerEvent('onFind')
    },
    onSelect(e) {
      const selectId = e.currentTarget.dataset.id
      const { background, preview, title, subtitle, id, style } = this.data._products.find(({ id }) => (selectId === id))
      this.setData({
        background,
        preview,
        title,
        subtitle,
        selectId: id,
        light: style === 'light',
      })
    }
  },
})