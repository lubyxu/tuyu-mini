
// components/map/index.js
import { request } from '../../utils/req';
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    markers: {
      type: Array,
      value: []
    },
    latitude: {
      type: Number,
      value: 0,
    },
    longitude: {
      type: Number,
      value: 0,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    products: [],
    spot: {},
    isVisited: false,
    showScenicBox: false,
    showScenicCard: true,
    scale: 16,
    registerIcon: 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/product/1/register.png',
  },

  lifetimes: {
    attached() {
      this.mapCtx = wx.createMapContext('myMap')
      this.getInitData()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getInitData() {
      // const markers = this.data.markers;
      // this.setData({
      //   // markers: markers,
      //   latitude: markers[0].latitude,
      //   longitude: markers[0].longitude,
      // })
    },
  
    markertap(e) {
      console.log('@@@ markertap111', e)
      this.triggerEvent('markertap', e.detail)
    },
    callouttap(e) {
      this.triggerEvent('markertap', e.detail)
      return;
      const { markerId } = e
      const current = this.data.markers.find(item => item.id === markerId)
      const currentScenic = this.data.list.find(item => item.spot.id === markerId)
      const { products, is_visited, spot } = currentScenic
      const { latitude, longitude } = current
      this.setData({
        products,
        spot,
        is_visited,
        latitude,
        longitude,
        scale: 32,
        showScenicBox: true
      })
      console.log('@@@ callouttap', products)
    },
    labeltap(e) {
      console.log('@@@ labeltap', e)
    },

  
    onChange() {
    }
  },
})