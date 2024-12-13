import { request } from '../../../utils/req'

// pages/path-note-detail/share-modal/index.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    placeDetails: {
      type: Object,
      value: []
    },
    pathId: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [],
    readOnly: true,
    nickname: '小福鱼',
    avatar: 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/home-icon.png',
    totlaNumber: 0,
    visitedNumber: 0,
  },

  ready() {
    this.init()
    const placeDetails = this.properties.placeDetails || []
    const visitedNumber = placeDetails.filter(item => item.visited)?.length
    this.setData({
      totlaNumber: placeDetails.length,
      visitedNumber
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async init() {
      const { data } = await request({
        method: 'GET',
        url: '/fuyu/getuserinfo',
      });
  
      const { user } = data;
      const {
        avatar,
        nickname,
      } = user

      this.setData({
        avatar: avatar || 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/home-icon.png',
        nickname: nickname || '小福鱼',
      })
    },

    onPrivilege(info) {

    },

    gotoPathDetail() {
      wx.navigateTo({
        url: `/pages/path-note-detail/index?path_id=${this.data.pathId / 1}`,
      });
    }
  }
})