const app = getApp()
import { getUser } from '../../utils/auth'
import { request } from '../../utils/req';

Page({

  onShow: function() {

  },

  async onReady() {
    this.getInitData()
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
    nickname: '小福鱼',
    avatar: 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/home-icon.png',
  },

  async getInitData() {
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

    const books = [{
      img: 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/default-book.png',
      used: 5,
      total: 5,
      free: true,
      id: 1,
    }, {
      img: 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/default-book.png',
      used: 5,
      total: 5,
      id: 2,
    },{
      img: 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/default-book.png',
      used: 5,
      total: 5,
      id: 2,
    }, {
      img: 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/add-book.png',
      used: 5,
      total: 5,
      type: 'add',
      id: 2,
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

    console.log('avatar', user, avatar)
    this.setData({
      showLoading: false,
      avatar: avatar || 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/home-icon.png',
      nickname: nickname || '小福鱼',
      countList: statusList,
      books,
      products,
      stamp_count
    })
  },

  switchTab(event) {
    const idx = event.currentTarget.dataset.id
    this.setData({
      selected: idx
    })
  },

  onBookClick(event) {
    const id = event.currentTarget.dataset.id
    const type = event.currentTarget.dataset.type
    consosle.log('id,type=', id, type)
  },

  onProductClick(event) {
    const id = event.currentTarget.dataset.id
    consosle.log('id=', id)
  },
});
