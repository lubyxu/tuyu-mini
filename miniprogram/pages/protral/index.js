const app = getApp()
import { getUser } from '../../utils/auth'
import { request, SUCCESS_CODE } from '../../utils/req';

const BOOK_TYPE = 3 // 印章本
const CARD_TYPE = 1 // 冰箱贴

Page({

  onShow: function() {

  },

  async onReady() {
    try {
      await Promise.all([
        this.getUserData(),
        this.getUserProductData(BOOK_TYPE)
      ])
      this.setData({ showLoading: false })
    } catch (error) {
      console.log('error', error)
      this.setData({ showLoading: false })
      wx.showToast({
        icon: 'error',
        title: '获取失败，请重试',
      })
      console.log(error)
    }
  },

  data: {
    showLoading: true,
    navBarHeight: app.globalData.navBarHeight,
    selected: 0,
    countList: [],
    stamp_count: 0,
    selectList: [
      {
        text: "我的印章本",
        index: 0,
      },
      {
        text: "我的文创",
        index: 1,
      },
    ],
    books: [],
    products: [],
    showProductEmpty: false,
    nickname: '小福鱼',
    avatar: 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/home-icon.png',
  },

  async getUserData() {
    if (!app.globalData?.user?.token) {
      await getUser()
    }
    const { data } = await request({
      method: 'GET',
      url: '/fuyu/getuserinfo',
    });

    const { user, user_stats } = data;
    const {
      avatar,
      nickname,
    } = user
    const { product_count, stamp_count, visit_count } = user_stats

    const statusList = [{
      title: '印章',
      value: stamp_count
    }, {
      title: '文创',
      value: product_count
    }, {
      title: '足迹',
      value: visit_count
    }]

    const products = [{
      img: 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/p1.png',
      name: '我在鼓楼',
      id: 1,
    }, {
      img: 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/p1.png',
      name: '我在鼓楼',
      id: 1,
    }, {
      img: 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/p1.png',
      name: '我在鼓楼',
      id: 1,
    }, {
      img: 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/p1.png',
      name: '我在鼓楼',
      id: 1,
    }]

    this.setData({
      avatar: avatar || 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/home-icon.png',
      nickname: nickname || '小福鱼',
      countList: statusList,
      products,
      stamp_count
    })
  },

  async getUserProductData(type) {
    if (!app.globalData?.user?.token) {
      await getUser()
    }
    const { data, errno } = await request({
      method: 'POST',
      url: '/fuyu/product/user/list',
      data: {
        type,
        province: ''
      }
    });

    if (SUCCESS_CODE != errno) {
      wx.showToast({
        icon: 'error',
        title: '获取失败，请重试',
      })
      return
    }
    
    if (type === BOOK_TYPE) {
      const books = data.map((item) => {
        const { page_num, stamp_num } = item?.all_content?.book_config || {}
        return {
          img: item.show_image,
          used: page_num,
          total: stamp_num,
          id: item.id,
        }
      })
      books.push({
        img: 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/add-book.png',
        type: 'add',
      })
      this.setData({ books })
    } else {
      const products = data.map((item) => {
        return {
          img: item.show_image,
          name: item.name,
          id: item.id,
        }
      })
      this.setData({
        products,
        showProductEmpty: products.length === 0
      })
    }
  },

  switchTab(event) {
    const idx = event.currentTarget.dataset.id
    this.setData({
      selected: idx
    })
    this.getUserProductData(idx === 0 ? BOOK_TYPE : CARD_TYPE)
  },

  onBookClick(event) {
    const id = event.currentTarget.dataset.id
    const type = event.currentTarget.dataset.type
    console.log('id,type=', id, type)
    if (type === 'add') {
      wx.navigateTo({
        url: `/pages/book-list/index`
      });
    }
  },

  onProductClick(event) {
    const id = event.currentTarget.dataset.id
    console.log('id=', id)
  },
});
