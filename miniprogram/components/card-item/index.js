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
    light: true
  },

  ready: function () {
    const { background, preview, title, subtitle, id, style } = this.properties.products[0]
    this.setData({
      background,
      preview,
      title,
      subtitle,
      selectId: id,
      light: style === 'light',
      showProducts: this.properties.products.length > 1 
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
      const { background, preview, title, subtitle, id, style } = this.properties.products.find(({ id }) => (selectId === id))
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