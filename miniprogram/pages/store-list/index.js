import { authCamera } from '../../utils/auth'
import { request } from '../../utils/req';
import { registerAccount } from '../../utils/auth';

const app = getApp()

Page({
  data: {
    showLoading: true,
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

  async getPoduct () {
    const { data } = await request({
      method: 'POST',
      url: '/fuyu/product/detail',
      data: {
        product_id: 2
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
      productId,
      showLoading: false,
    })

  },

  onBuy() {
    wx.navigateTo({ url: '/pages/shope/index' })
  }
});
