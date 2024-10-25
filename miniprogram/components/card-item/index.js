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
    owner: {
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
      _products,
      showProducts: _products.length > 1,
    })
    this.setCommonSatae(_products[0])
  },

  methods: {
    onProductClick(e) {
      const id = this.data.selectId
      const owner = this.properties.owner
      if (!owner) {
        wx.navigateTo({
          url: `/pages/osd-ar/index?id=${this.data.id}&videoUrl=${encodeURIComponent(this.data.resource)}&osd=${encodeURIComponent(this.data.osd)}`
        });
      } else {
        wx.navigateTo({
          url: `/pages/detail/index?id=${id}`
        });
      }
    },
    onFind() {
      this.triggerEvent('onFind')
    },

    setCommonSatae(data) {
      const {
        background,
        preview,
        title,
        subtitle,
        id,
        style,
        ar_config: {
          resource,
          osd
        },
      } = data
      this.setData({
        background,
        preview,
        title,
        subtitle,
        selectId: id,
        light: style === 'light',
        resource,
        osd,
      })
    },
    onSelect(e) {
      const selectId = e.currentTarget.dataset.id
      const current = this.data._products.find(({ id }) => (selectId === id))
      this.setCommonSatae(current)
    }
  },
})