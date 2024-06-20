const { envList } = require('../../envList.js');

Page({
  data: {
    backgroud: '',
    nodes:[],
    title: '',
    topImage: '',
  },

  onShareAppMessage() {

  },

  onReady() {
    this.getInitData()
  },

  async getInitData() {
    try {
      wx.showLoading({
        title: '加载中',
      })      
      await this.getPoduct()
      wx.hideLoading()
    } catch (err) {
      wx.hideLoading()
      console.log('err', err)
    }
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

  async getPoduct() {
    const data = await wx.cloud.callFunction({
      name: 'getProduct',
      data: {
        _id: "9fe3c0fd6671418a031d41200ae36081"
      },
    })
    const { detail } = data.result
    const { backgroud = '', content = [], title = '', topImage = '' } = detail
    const nodes = this.getNodes(content)
    console.log('nodes', nodes)
    this.setData({
      backgroud,
      nodes,
      title,
      topImage
    })
    console.log('products', data)
  },
});
