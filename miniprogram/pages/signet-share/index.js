import dayjs from 'dayjs';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bgImage: 'https://oss-whale-peach.meetwhale.com/wos%2Fharbor%2FRuerzq27ilivYaCJKlOYh%2F%E7%AB%A0.svg',
    name: '财神庙',
    timeStr: '',
    nickName: '小富裕',
    doneCount: 0,
    totalCount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const date = dayjs();
    this.setData({
      state: options.state,
      time: date.unix(),
      timeStr: date.format('YYYY年YY月DD日 HH:mm:ss')
    })
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
  onAccept() {}
})