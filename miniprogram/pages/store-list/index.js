const app = getApp()
import { request, SUCCESS_CODE } from '../../utils/req';

const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

Page({
  onLoad(options) {
    this.options = options
    this.getProduct()
    this.debouncedSearch = debounce(this.handleSearch, 500);
    this.setData({
      title: options?.name || '',
    });
  },

  data: {
    searchValue: '',
    showLoading: false,
    navBarHeight: app.globalData.navBarHeight,
    customStyle: {
      card: {
        'background-color': '#FAFAFA',
      }
    },
    list: [],
    title: '',
  },

  async getProduct() {
    try {
      const { data, errno } = await request({
        method: 'POST',
        url: '/fuyu/product/list/new',
        data: {
          activity_id: this.options?.activity_id / 1 || 0,
          province: "",
          name: this.data.searchValue
        }
      });

      if (SUCCESS_CODE != errno) {
        wx.showToast({
          icon: 'error',
          title: '调用失败，请重试',
        })
        return
      }

      console.log('data', data)
      this.setData({ showLoading: false,  list: data.list })

    } catch (error) {
      this.setData({ showLoading: false })
      wx.showToast({
        icon: 'error',
        title: '调用失败，请重试',
      })
      console.log('error', error)
    }
  },

  handleInput(e) {
    const value = e.detail.value;
    this.setData({ searchValue: value });
    
    if (!value.trim()) {
      this.setData({ list: [] });
      return;
    }

    this.debouncedSearch(value);
  },

  // 实际执行搜索的函数
  handleSearch() {
    this.getProduct();
  },

  onClear() {
    this.setData({
      searchValue: ""
    });
    this.getProduct();
  }
});
