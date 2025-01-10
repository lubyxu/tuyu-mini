const app = getApp()
import { getUser, registerAccount } from '../../utils/auth'
import { request } from '../../utils/req';

Page({
  data: {
    rating: 3,
    showLoading: true,
    suggestions: [],
    inputValue: '',
  },

  async onLoad() {
    await this.getInitData()
  },

  async getInitData() {
    const suggestions = ["提示词"]
    this.setData({ suggestions })
  },
    
  onChose(e) {
    const selectId = e.currentTarget.dataset.id
    const inputValue = this.data.suggestions[selectId]
    this.setData({ inputValue })  
  },

  handleInput(e) {
    const inputValue = e.detail.value;
    this.setData({ inputValue })  
  }

  
});
