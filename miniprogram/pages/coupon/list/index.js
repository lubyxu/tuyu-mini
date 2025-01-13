import { getCouponList } from "../../../service/coupons/index";

// pages/coupon/list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 1,
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getList(1)
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  onTabClick(e) {
    const index = e.target.dataset?.index || 1;
    this.setData({
      activeTab: index,
      list: []
    });
    this.getList(index);
  },
  async getList(tab) {
    tab = tab || this.data.activeTab;
    const data = await getCouponList({ status: +tab });
    this.setData({
      list: data.list
    });
  },
  onCouponAccept(e) {
    const { type, source, id } = e.detail;
    // 1 印章 2 印章页 3 实物
    switch (type) {
      case '1':
        this.goToSignetAdd(e.detail);
        break;
      case '2':
        this.goToSelectBook();
        break;
      case '3':
        this.goToFillInfo();
        break;
    }
  },
  goToSignetAdd({ source, productId }) {
    wx.navigateTo({
      url: `/pages/signet-add-page/index?stamp_pid=${productId}&key=${source}`,
      events: {
        refresh: () => {
          this.getList(this.data.activeTab);
        }
      }
    });
  },
  goToSelectBook() {},
  goToFillInfo() {}
})