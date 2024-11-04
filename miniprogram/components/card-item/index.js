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
    spot: {
      type: Object,
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
         background: item.bg_card_image,
         preview: item.show_image,
         subtitle: item.description || "暂无描述",
        }
      })
    this.setData({
      _products,
      showProducts: _products.length > 1,
      title: this.properties.spot.name,
    })
    this.setCommonState(_products[0])
  },

  methods: {
    onProductClick(e) {
      const id = this.data.selectId
      const owner = this.properties.owner
      if (!owner) {
        wx.navigateTo({
          url: `/pages/detail/index?id=${id}`
        });
      } else {
        wx.navigateTo({
          url: `/pages/osd-ar/index?id=${this.data.id}&videoUrl=${encodeURIComponent(this.data.resource)}&osd=${encodeURIComponent(this.data.osd)}`
        });
      }
    },
    onFind() {
      this.triggerEvent('onFind')
    },

    setCommonState(data) {
      const {
        background,
        preview,
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
      this.setCommonState(current)
    }
  },
})