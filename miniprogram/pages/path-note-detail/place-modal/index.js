// pages/path-note-detail/place-modal/index.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    images: Array,
    curIndex: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    curIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onImageClick(e) {
      this.setData({
        curIndex: e.currentTarget.dataset.index
      });
    },
    onPosClick() {
      const item = this.data.images[this.data.curIndex];
      const mp = wx.createMapContext('myMap');
      mp.openMapApp({
        longitude: item.loc_long,
        latitude: item.loc_lat,
        destination: item.location,
        success: function (res) {
        },
        fail: function () {
          console.log('error');
          wx.showToast({
            icon: 'none',
            title: '调起地图应用失败'
          });
        },
        complete(res) {
          console.log(res)
        }
      })

    },
    onClose() {
      this.triggerEvent('close');
    },
    onSwiperChange(e) {
      this.setData({
        curIndex: e.detail.current
      });
    }
  }
})