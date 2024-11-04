import { request } from '../../utils/req';

Page({
  data: {
    markers: [],
    list: [],
    products: [],
    spot: {},
    isVisited: false,
    showScenicBox: false,
    showScenicCard: true,
    scale: 16,
    latitude: 23.096994,
    longitude: 113.324520,
    registerIcon: 'https://7072-production-6gycngib97dae447-1327253936.tcb.qcloud.la/assets/v2/common/register-icon.png?sign=f219eefd568b63e4843f16ae204b6ada&t=1729477487',
  },

  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
    this.getInitData()
  },

  async getInitData() {
    console.log('getInitData')
    const { data } = await request({
      method: 'POST',
      url: '/fuyu/spot/list',
      data: {
        province: "beijing"
      }
    });
    const { list = []} = data
    const markers = list.map(({ spot, is_visited }) => {
      const { loc_lat, loc_long, icon_image, id, name } = spot
      return {
        id,
        register: is_visited,
        latitude: loc_lat || 23.095994,
        longitude: loc_long || 113.325520,
        customCallout: {
          display: 'ALWAYS',
        },
        icon: icon_image || 'https://7072-production-6gycngib97dae447-1327253936.tcb.qcloud.la/assets/v2/common/area.png?sign=47a843587fc2732f56d8cedb9805fa9b&t=1729474429',
        title: name || '故宫博物院'
      }
    })
    console.log('markers', markers)
    this.setData({
      markers,
      list
    })
  },

  markertap(e) {
    console.log('@@@ markertap', e)
  },
  callouttap(e) {
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
    console.log('@@@ callouttap', e)
  },
  labeltap(e) {
    console.log('@@@ labeltap', e)
  },

  onChange() {
    this.setData({
      showScenicCard: !this.data.showScenicCard
    })
  }
  
})
