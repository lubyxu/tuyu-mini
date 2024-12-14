import loginBehavior from '../../behaviors/login/index';
import { getBookInfo } from '../../service/signet/index';
import dayjs from 'dayjs';
Page({

  behaviors: [loginBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    book: {},
    bookConfig: {},
    signets: [],
    bgImage: '',
    curIndex: 0,
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getBookInfo(27)
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
    this.getBookInfo(27)
  },
  async getBookInfo(id) {
    const data = await getBookInfo(id);

    const bookInfo = data.BookInfo;
    const pages = data.Pages;
    const bookConfig = bookInfo.content.book_config;
    wx.setNavigationBarTitle({
      title: bookConfig.title,
    });

    const map = pages.reduce((prev, page) => {
      return {
        ...prev,
        [page.page_num - 1]: page
      };
    }, {});

    this.setData({
      bookConfig,
      book: { ...bookInfo, book_id: data.book_id },
      bgImage: bookConfig.page_bg_img,
      signets: new Array(bookConfig.page_num).fill(0).map((item, idx) => {
        return map[idx] ? {
          ...map[idx],
          time: dayjs(map[idx].create_time * 1000).format('YYYY年MM月DD日 HH:mm:ss')
        } : undefined;
      })
    });
  },
  onCardSelect(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      curIndex: index,
    });
  },
  onPageAdd(e) {
    const { curIndex, book } = this.data;
    const { imageUrl } = e.detail;
    wx.navigateTo({
      url: `/pages/signet-add-page/index?image=${imageUrl}&pageNum=${curIndex}&book_id=${book.book_id}`,
      events: {
        refresh: () => {
          this.getBookInfo(27);
        }
      }
    });
  }
})