import { useCoupon } from "../../service/coupons/index";

// pages/order-input/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editable: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.options = options;

    const evt =  this.getOpenerEventChannel();
    evt.on('initValue', info => {
      const val = info.extraData.shipping_info;
      if (val.name) {
        this.setData({
          name: val.name,
          phone: val.phone,
          address: val.address,
          shopping_code: val.shipping_code,
          editable: false,
        })
      }
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
  onNameChange(e) {
    this.setData({
      name: e.detail.value
    });
  },
  onPhoneChange(e) {
    this.setData({
      phone: e.detail.value
    });
  },
  onAddressChange(e) {
    this.setData({
      address: e.detail.value
    });
  },
  async onConfirm() {
    const { name, phone, address } = this.data;
    if (!name.trim()) {
      wx.showToast({
        icon: 'none',
        title: '请填写姓名',
      });
      return;
    }
    if (!phone.trim()) {
      wx.showToast({
        icon: 'none',
        title: '请填写电话',
      });
      return;
    }
    if (!address.trim()) {
      wx.showToast({
        icon: 'none',
        title: '请填写地址',
      });
      return;
    }
    await useCoupon({
      user_coupon_id: +this.options.coupon_id,
      use_coupon_req: {
        shipping_info: {
          name,
          phone,
          address
        }
      }
    });
    const evc = this.getOpenerEventChannel();
    evc.emit('refresh');
    wx.navigateBack();
  }
})