import loginBehavior from '../../behaviors/login/index';
import { getBookInfo, deletePage } from '../../service/signet/index';
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
    focusedId: 'js-book-over'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.options = options;
    if (!this.data.isLogined) return;
    this.getBookInfo(this.options.book_id);
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
    const index = this.data.curIndex;
    const page = this.data.signets[index];
    return {
      title: page.name,
      path: `/pages/signet-share/index?user_stamp_id=${page.user_stamp_id}`,
      imageUrl: page.image_url,
    };
  },
  onLogined() {
    this.getBookInfo(this.options.book_id);
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
    this.selectComponent('#signet-container').onReset();
    this.setData({
      curIndex: index,
    });
  },
  onPageAdd(e) {
    const { curIndex, book } = this.data;
    const { imageUrl } = e.detail;
    wx.navigateTo({
      url: `/pages/signet-add-page/index?image=${imageUrl}&pageNum=${curIndex + 1}&book_id=${book.book_id}`,
      events: {
        refresh: () => {
          this.getBookInfo(+this.options.book_id);
        }
      }
    });
  },
  onPageDelete() {
    wx.showModal({
      title: '确认删除本页印章？',
      content: '删除后可以重新添加',
      success: async (res) => {
        if (res.cancel) return;
        await deletePage({ book_id: +this.options.book_id, page_num: this.data.curIndex + 1});

        const curIndex = this.data.curIndex;
        const signets = [...this.data.signets];
        signets[curIndex] = undefined;
        this.setData({
          signets
        });
      },
    })
  },

  // 移动印章
  onMovePage() {
    const curIndex = this.data.curIndex;
    const query = [
      `from_book_id=${this.options.book_id}`,
      `from_page_num=${this.data.curIndex + 1}`,
    ];
    wx.navigateTo({
      url: '/pages/signet-move/index?' + query.join('&'),
      events: {
        refresh: () => {
          this.getBookInfo(+this.options.book_id);
        }
      }
    })
  },
  onPageGo(e) {
    const path = e.detail.path + '&book_id=' + this.options.book_id + '&pageNum=' + (this.data.curIndex + 1);
    wx.navigateTo({
      url: path,
      events: {
        refresh: () => {
          this.getBookInfo(+this.options.book_id);
        }
      }
    })
  },
  onIndexChange(e) {
    this.setData({
      curIndex: e.detail
    });
    this.onSetFocuseId(+e.detail);
  },

  onSetFocuseId(index) {
    this.setData({
      focusedId: index < 3 ? 'js-book-cover' : `js-card-${index - 3}`
    })
  }
})