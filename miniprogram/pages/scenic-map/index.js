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
    registerIcon: 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/product/1/register.png',
  },

  onLoad: function (options) {
    this.setData({
      longitude: options.longitude / 1,
      latitude: options.latitude / 1,
    })
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
    const markers = list
      .filter(item => item?.products?.length > 0)
      .map(({ spot, is_visited }) => {
      const { loc_lat, loc_long, icon_image, id, name } = spot
      
      return {
        id,
        register: is_visited,
        latitude: loc_lat || 23.095994,
        longitude: loc_long || 113.325520,
        customCallout: {
          display: 'ALWAYS',
        },
        icon: icon_image,
        title: name,
      }
    })
    this.setData({
      markers: markers,
      list,
      latitude: markers[0].latitude,
      longitude: markers[0].longitude,
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
    console.log('@@@ callouttap', products)
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
