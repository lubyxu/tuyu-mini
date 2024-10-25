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
    }
  },

  data: {
    background: '',
    preview: '',
    title: '',
    subtitle: '',
    selectId: -1,
    showProducts: false,
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

  ready: function () {
    const { background, preview, title, subtitle, id } = this.properties.products[0]
    this.setData({
      background,
      preview,
      title,
      subtitle,
      selectId: id,
      showProducts: this.properties.products.length > 1 
    })
    console.log(background, preview, title, subtitle)
  },

  methods: {
    onSelect(e) {
      const selectId = e.currentTarget.dataset.id
      const { background, preview, title, subtitle, id } = this.properties.products.find(id == selectId)
      this.setData({
        background,
        preview,
        title,
        subtitle,
        selectId: id,
      })
    }
  }
})