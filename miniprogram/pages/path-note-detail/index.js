// pages/path-note-detail/index.js
import { getPathDetail } from '../../service/path-note/path-detail';


Page({
  options: {
    addGlobalClass: true
  },

  /**
   * 页面的初始数据
   */
  data: {
    id: 1,
    path_info: {},
    place_details: [],
    product_map: [],
    place_visited: {},
    modal: null,
    btnClass: 'fixed',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const data = await getPathDetail({ user_path_id: 1 });
    const { path_detail_info, place_visited } = data;
    this.setData({
      id: 1,
      path_info: path_detail_info.path_info,
      place_details: path_detail_info.place_details,
      product_map: path_detail_info.product_map,
      place_visited,
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
  onPageScroll(e) {
    console.log('scrollTop', e.scrollTop)
    const scrollTop = e.scrollTop;
    if (scrollTop > 10 && this.data.btnClass === 'fixed') {
      this.setData({
        btnClass: 'moving'
      });

      setTimeout(() => {
        this.setData({
          btnClass: 'done'
        });
      }, 1 * 1000);
    }
  },
  onPrivilege(e) {
    const info = e.detail;
    this.setData({
      modal: {
        type: 'privilege',
        props: {
          desc: info.details
        }
      }
    });
  },
  onModalClose(e) {
    this.setData({
      modal: null
    });
  },
  onImageClick(e) {
    const detail = e.detail;
    this.setData({
      modal: {
        type: 'place-images',
        props: {
          images: detail.images,
          index: detail.index
        }
      }
    });
  }
})