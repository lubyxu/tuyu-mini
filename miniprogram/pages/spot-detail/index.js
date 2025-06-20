// pages/spot-detail/index.js
import { getPathBySpot, getSpotDetail } from '../../service/path-note/path-detail';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    paths: [],
    image: 'https://oss-whale-peach.meetwhale.com/wos%2Fharbor%2FUQzX7HeDjHSdZmUR-zeuE%2F46048aeab0fbe67c1d5e1e96df6f06d6.png',
    images: [
      "https://fuyuoss.oss-cn-shanghai.aliyuncs.com/product/1/a8522ada-bfbd-461e-85e8-05e251887d96.png",
      "https://fuyuoss.oss-cn-shanghai.aliyuncs.com/product/1/cb56d8b7-1c8c-4f59-91b0BG2.png"
  ]
  },

  onShareAppMessage(res) {
    if (res.from === 'button') {
      const { id, name, trigger } = res.target.dataset;
      if (trigger === 'product') {
        return {
          title: '拾光坊',
          path: `/pages/store-list/index?activity_id=${id}&name=${name}&from=share`,
          imageUrl: 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/share-mini.png'
        }
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const detail = await getSpotDetail(options.spot_id);
    const paths = await getPathBySpot({ spot_id: options.spot_id, province: options.province });
    this.setData({
      info: detail,
      paths
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

})