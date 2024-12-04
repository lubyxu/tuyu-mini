import loginBehavior from '../../behaviors/login/index';
import { getBookInfo } from '../../service/signet/index';
Page({

  behaviors: [loginBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    book: {},
    bookConfig: {},
    signets: [{ isFilled: true },{ isFilled: true },{ isFilled: true },{ isFilled: true },{ isFilled: true }],
    bgImage: ''
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
  async onLogined() {
    const data = await getBookInfo(27);

    const bookInfo = data.BookInfo;
    const bookConfig = bookInfo.content.book_config;
    wx.setNavigationBarTitle({
      title: bookConfig.title,
    });

    this.setData({
      bookConfig,
      book: { ...bookInfo, book_id: data.book_id },
      bgImage: bookConfig.page_bg_img || 'https://oss-whale-peach.meetwhale.com/wos%2Fharbor%2FRuerzq27ilivYaCJKlOYh%2F%E7%AB%A0.svg'
    });
  }
})