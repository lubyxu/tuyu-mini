import { getSignetBooks } from '../../service/signet/index';
import loginBehavior from '../../behaviors/login/index';
import { useCoupon } from '../../service/coupons/index';
Page({
  behaviors: [loginBehavior],

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    curIndex: 0
  },
  onLogined() {
    this.initValue();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.options = options;
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

  async initValue() {
    const books = await getSignetBooks();
    this.setData({
      books
    })
  },
  onBookClick(e) {
    console.log(e)
    const index = e.currentTarget.dataset.index;
    const book = this.data.books[index];
    this.setData({
      curIndex: index,
    });
  },
  async onConfirm() {
    const id = this.options.coupon_id;
    await useCoupon({
      user_coupon_id: +id,
      use_coupon_req: {
        book_id: this.data.books[this.data.curIndex].user_product_id
      }
    });
    const evc = this.getOpenerEventChannel();
    evc.emit('refresh');
    wx.navigateBack();
  }
})