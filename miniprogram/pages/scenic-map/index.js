import { request } from '../../utils/req';
import { getPathDetail } from '../../service/path-note/path-detail';
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
    registerIcon: 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com/front-end/register.png',
  },

  onLoad: function (options) {
    this.setData({
      longitude: options.longitude / 1,
      latitude: options.latitude / 1,
      user_path_id: options.user_path_id,
      path_id: options.path_id
    })
  },

  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
    if (this.data.path_id) {
      this.getPathData({ user_path_id: this.data.user_path_id, path_id: this.data.path_id });
      return;
    }
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

  async getPathData({ user_path_id, path_id }) {
    const data = await getPathDetail({ user_path_id, path_id });
    const { path_detail_info, place_visited = {} } = data;
    const place_details = path_detail_info.place_details;
    const product_map = path_detail_info.product_map;
    const markers = place_details.map(place => ({
      id: place.place_id,
      customCallout: { display: 'ALWAYS' },
      icon: place.image,
      longitude: place.loc_long,
      latitude: place.loc_lat,
      register: place_visited[place.place_id],
      title: place.name
    }));

    const list = place_details.map(place => ({
      spot: {
        icon_image: place.image,
        id: place.place_id,
        loc_long: place.loc_long,
        loc_lat: place.loc_lat,
        province: place.province || 'beijing',
        name: place.name,
      },
      products: place.product_id ? [product_map[place.product_id]] : [],
      is_visited: place_visited[place.place_id]
    }));

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
