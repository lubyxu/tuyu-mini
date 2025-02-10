const app = getApp()
import { getUser, registerAccount } from '../../utils/auth'
import { request } from '../../utils/req';

Page({
  data: {
    rating: 5,
    showLoading: true,
    suggestions: [],
    suggestValue: '',
  },

  async onLoad(options) {
    this.path_id = options.path_id / 1 || 12
    this.reply_to = options.reply_to / 1 || 0
    await this.getInitData()
  },

  async getInitData() {
    const { data } = await request({
      method: 'POST',
      url: '/fuyu/path/addcomment/suggest',
      data: {
        path_id: this.path_id,
      },
    });
    this.setData({ suggestions: data })
  },
    
  onChose(e) {
    const selectId = e.currentTarget.dataset.id
    const suggestValue = this.data.suggestions[selectId]
    this.setData({ suggestValue })  
  },

  handleInput(e) {
    const suggestValue = e.detail.value;
    this.setData({ suggestValue })  
  },


  onStar(e) {
    const rating = e.currentTarget.dataset.index;
    this.setData({
      rating: rating + 1
    });
  },

  async onSubmit() {
    const path_id = this.path_id
    const reply_to = this.reply_to
    const rating = this.data.rating
    const content = this.data.suggestValue
    if (!content) {
      wx.showToast({
        title: '请先输入您的评价',
        icon: 'error',
      })
      return
    }
    // TODO
    try {
      await request({
        method: 'POST',
        url: '/fuyu/path/addcomment',
        data: {
          path_id,
          start: rating,
          content,
          reply_to
        },
      });
      wx.navigateBack({
        delta: 1
      })
    } catch(err) {
      wx.showToast({
        title: '评论失败',
        icon: 'error',
      })
    }
  }
});
