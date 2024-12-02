import loginBehavior from '../../behaviors/login/index';
import { getBookInfo } from '../../service/signet/index';
Page({

  behaviors: [loginBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    book: {},
    signets: [{ isFilled: true },{ isFilled: true },{ isFilled: true },{ isFilled: true },{ isFilled: true }],
    bgImage: 'https://oss-whale-peach.meetwhale.com/wos%2Fharbor%2FRuerzq27ilivYaCJKlOYh%2F%E7%AB%A0.svg'
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
  onLogined() {
    getBookInfo(27);
  }
})