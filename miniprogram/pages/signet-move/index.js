import { getSignetBooks, getBookInfo, addToPage, movePage } from '../../service/signet/index';
import loginBehavior from '../../behaviors/login/index';
import { useCoupon } from '../../service/coupons/index';

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
    curBookIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.options = options;
    if (this.data.isLogined) {
      this.initValue();
    }

    const ec = this.getOpenerEventChannel();
    ec.on('stampInfo', data => {
      this.setData({
        cardInfo: data
      });
    })
  },
  onLogined() {
    this.initValue();
  },

  async initValue() {
    const data = await getSignetBooks();
    this.setData({
      books: data
    });
    this.getCurrentBook(data[0].user_product_id);
  },

  async getCurrentBook(id) {
    const data = await getBookInfo(id);
    const config = data.BookInfo.content.book_config;
    const pages = data.Pages || [];

    const map = pages.reduce((prev, page) => {
      return {
        ...prev,
        [page.page_num - 1]: page
      };
    }, {});
    const curCards = new Array(config.page_num).fill(0).map((item, idx) => {
      return map[idx] ? {
        ...map[idx]
      } : undefined;
    });
    this.setData({
      curBook: data,
      curBookConfig: config,
      curCards,
      curIndex: curCards.findIndex(item => !item)
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
    // 已经站位的 不能选中
    if (this.data.curCards[index]) {
      return;
    }
    this.setData({
      curIndex: index
    });
  },
  onBookSelect(e) {
    const index = e.currentTarget.dataset.index;
    const book = this.data.books[index];
    this.setData({
      curIndex: -1,
      curBookIndex: index,
    });
    this.getCurrentBook(book.user_product_id)
  },

  async onConfirm() {
    if (this.data.curIndex < 0) {
      wx.showToast({
        icon: 'none',
        title: '请选择一个添加印章的页面',
      });
      return;
    }

    // 移动的逻辑
    if (!this.options.stamp_pid) {
      await movePage({
        from_book_id: +this.options.from_book_id,
        from_page_num: +this.options.from_page_num,
        to_book_id: this.data.curBook.book_id,
        to_page_num: this.data.curIndex + 1
      });
      
      const ev = this.getOpenerEventChannel();
      ev.emit('refresh');
      wx.navigateBack();
      return;
    }
    else {
      // 添加到逻辑
      const cardInfo = this.data.cardInfo;
      const key = this.options.key;
      await addToPage({
        book_id: this.data.curBook.book_id,
        page_num: this.data.curIndex + 1,
        location: cardInfo.location.name,
        loc_lat: cardInfo.location.loc_lat,
        loc_long: cardInfo.location.loc_long,
        name: cardInfo.name,
        image_url: cardInfo.image_url,
        stamp_pid: +cardInfo.stamp_pid,
        source: key,
        couponId: this.options.couponId
      });

      wx.reLaunch({
        url: '/pages/signet-detail/index?book_id=' + this.data.curBook.book_id,
      });
    }
  },
  onCancel() {
    wx.navigateBack();
  },
})