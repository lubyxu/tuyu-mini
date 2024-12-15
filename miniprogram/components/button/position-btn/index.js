// components/button/position-btn/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    long: Number,
    lat: Number,
    location: String,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPositionGo() {
      const map = wx.createMapContext('js-hidden-map');
      console.log('=----fasdfasf')
      map.openMapApp({
        latitude: this.data.lat,
        longitude: this.data.long,
        destination: this.data.location,
        success: function (res) {
          console.log('-- success',)
        },
        fail: function (e) {
          console.log('error', e);
          wx.showToast({
            icon: 'none',
            title: '调起地图应用失败'
          });
        },
        complete(res) {
          console.log(res)
        }
      })
    }
  }
})