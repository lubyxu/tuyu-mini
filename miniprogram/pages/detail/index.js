import { authCamera } from '../../utils/auth'
import { request } from '../../utils/req';
import { registerAccount } from '../../utils/auth';

const app = getApp()

Page({
  data: {
    background: '',
    nodes:[],
    title: '',
    topImage: '',
    id: "",
    bind: false,
    osd: '',
    resource: '',
    showLoading: true,
    isLogined: false,
    appid: '',
    productId: '',
  },

  onLoad: function (options) {
    const isLogined = app?.globalData?.user?.token
    this.setData({
      id: options.id / 1,
      isLogined
    })
  },

  onReady() {
    this.getInitData()
  },

  async getInitData() {
    try {
      await this.getPoduct()
      this.setData({ showLoading: false })
    } catch (err) {
      console.log('err', err)
    }
  },

  async getPoduct () {
    const { data } = await request({
      method: 'POST',
      url: '/fuyu/product/detail',
      data: {
        product_id: this.data.id
      }
    });
    const { product_info = {}} = data
    const {
      bg_img = '',
      content,
      ar_config: {
        resource,
        osd
      },
      title = '',
      shop_config: {
        app_id: appid,
        item_code: productId
      }
    } = product_info
    const nodes = this.getNodes(content.content)
    this.setData({
      background: bg_img,
      nodes,
      title,
      topImage: content.top_img,
      resource,
      osd,
      appid,
      productId
    })
  },

  getNodes(content) {
    const children = content.map((item) => {
      return {
        name: 'div',
        children: item.map(({ text, type }) => {
          return {
            name: 'span',
            attrs: type === 'keyword' ? { class: 'detail-content-box-keyword' } : {},
            children: [{
              text,
              type: 'text'
            }]
          }
        })
      }
    })

    const nodes = [{
      name: 'div',
      attrs: { class: 'detail-content-box' },
      children: children
    }]
    return nodes
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
    this.gotoAR()
  },

  async gotoAR() {
    try {
      await authCamera()
    } catch (err) {
      wx.showToast({
        icon: 'error',
        title: '授权失败'
      })
      return
    }
    console.log('osd', this.data.osd)
    wx.navigateTo({
      url: `/pages/osd-ar/index?id=${this.data.id}&videoUrl=${encodeURIComponent(this.data.resource)}&osd=${encodeURIComponent(this.data.osd)}`
    });
  },

  onBuy() {
    wx.navigateTo({ url: '/pages/shope/index' })
  }
});
