import { registerAccount } from '../../utils/auth';
const app = getApp();

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
  },

  data: {
    background: '',
    preview: '',
    title: '',
    subtitle: '',
    selectId: -1,
    showProducts: false,
    light: true,
    _products: [],
    isLogined: false,
    owned: false,
    tags: [],
  },

  observers: {
    'products': function(products) {
      this.onInit()
    }
  },

  ready: function () {
    const isLogined = app?.globalData?.user?.token
    console.log('isLogined', isLogined)
    this.setData({ isLogined: !!isLogined })
    this.onInit()
  },

  methods: {
    onScenicClcik() {
      wx.navigateTo({
        url: `/pages/spot-detail/index?spot_id=${this.properties.spot.id}&province=beijing}`
      });
    },

    onInit() {
      if (this.properties.products.length === 0) {
        this.setData({ background: this.properties.spot.bg_image })
        return
      }
      const _products = this.properties.products
        .sort((a, b) => a.sort / 1 - b.sort / 1)
        .map(item => {
          return {
           ...item,
           background: item.bg_card_image,
           preview: item.show_image,
           subtitle: item.name,
          }
        })
      this.setData({
        showProducts: this.properties.products.length > 1,
        title: this.properties.spot.name,
        _products,
      })
      this.setCommonState(_products[0])
    },

    async onRegisterAccount(e) {
      const code = e.detail.code;
      if (!code) {
        wx.showToast({
          icon: 'error',
          title: '登陆失败，请重试'
        })
        return
      } 
      await registerAccount(code);
      this.onProductClick()
    },

    async onProductClick(e) {
      const id = this.data.selectId
      if (!this.data.owned) {
        wx.navigateTo({
          url: `/pages/detail/index?id=${id}`
        });
      } else {
        wx.navigateTo({
          url: `/pages/osd-ar/index?id=${id}&videoUrl=${encodeURIComponent(this.data.resource)}&osd=${encodeURIComponent(this.data.osd)}`
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
        owned,
        tags
      } = data
      console.log('resource', data.tags)
      this.setData({
        background,
        preview,
        subtitle,
        selectId: id,
        light: style === 'light',
        resource,
        osd,
        owned,
        tags
      })
    },
    onSelect(e) {
      const selectId = e.currentTarget.dataset.id
      const current = this.data._products.find(({ id }) => (selectId === id))
      this.setCommonState(current)
    }
  },
})