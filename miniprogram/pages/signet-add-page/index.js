// pages/signet-add-page/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bgImage: 'https://oss-whale-peach.meetwhale.com/wos%2Fharbor%2FRuerzq27ilivYaCJKlOYh%2F%E7%AB%A0.svg',
    src: '',
    name: '',
    time: '',
    location: '',

    isEdit: false,
    modalValue: ''
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
  onEdit() {
    this.setData({
      isEdit: true,
      modalValue: this.data.name
    });
  },
  onNameModalClick(e) {
    const detail = e.detail;
    if (e.detail.index == 0) {
      this.setData({
        isEdit: false,
      });
    }
    else {
      this.setData({
        isEdit: false,
        name: this.data.modalValue,
      });
    }
  },
  onNameChange(e) {
    this.setData({
      modalValue: e.detail.value
    });
  }
})