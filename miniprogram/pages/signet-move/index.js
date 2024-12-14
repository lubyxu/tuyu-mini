import { getSignetBooks, getBookInfo, addToPage } from '../../service/signet/index';
import loginBehavior from '../../behaviors/login/index';

Page({
  behaviors: [loginBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    cardInfo: {},
    books: [],
    curBook: {},
    curBookConfig: {},
    curCards: [],
    curIndex: -1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.options = options;
  },
  async onLogined() {
    const data = await getSignetBooks();

    this.setData({
      books: data
    });

    this.getCurrentBook(data[0].user_product_id);
  },

  async getCurrentBook(id) {
    const data = await getBookInfo(id);
    const config = data.BookInfo.content.book_config;
    this.setData({
      curBook: data,
      curBookConfig: config,
      curCards: new Array(config.page_num).fill(0).map(item => ({
        img: data.BookInfo.bg_card_image
      }))
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  onCardSelect(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      curIndex: index
    });
  },

  async onCofirm() {
    await addToPage({
      book_pid: this.data.curBook.book_id,
      page_num: this.curIndex,
      location: cardInfo.location,
      loc_lat: cardInfo.loc_lat,
      loc_long: cardInfo.loc_long,
      name: cardInfo.name,
      image_url: cardInfo.imageUrl,
      stamp_pid: cardInfo.stamp_pid,
    });
    wx.navigateBack();
  },
  onCancel() {
    wx.navigateBack();
  }
})