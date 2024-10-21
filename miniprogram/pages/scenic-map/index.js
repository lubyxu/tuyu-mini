const app = getApp()

const customCallout1 = {
  id: 2,
  latitude: 23.097994,
  longitude: 113.323520,
  customCallout: {
    display: 'ALWAYS'
  },
  register: true,
  icon: 'https://7072-production-6gycngib97dae447-1327253936.tcb.qcloud.la/assets/v2/common/area.png?sign=47a843587fc2732f56d8cedb9805fa9b&t=1729474429',
  title: '故宫博物院'
}

const customCallout2 = {
  id: 3,
  register: true,
  latitude: 23.096994,
  longitude: 113.324520,
  customCallout: {
    display: 'ALWAYS',
  },
  register: true,
  icon: 'https://7072-production-6gycngib97dae447-1327253936.tcb.qcloud.la/assets/v2/common/area.png?sign=47a843587fc2732f56d8cedb9805fa9b&t=1729474429',
  title: '故宫博物院'
}

const customCallout3 = {
  id: 4,
  register: false,
  latitude: 23.095994,
  longitude: 113.325520,
  customCallout: {
    display: 'ALWAYS',
  },
  icon: 'https://7072-production-6gycngib97dae447-1327253936.tcb.qcloud.la/assets/v2/common/area.png?sign=47a843587fc2732f56d8cedb9805fa9b&t=1729474429',
  title: '故宫博物院'
}


Page({
  data: {
    latitude: 23.096994,
    longitude: 113.324520,
    markers: [],
    scale: 16,
    registerIcon: 'https://7072-production-6gycngib97dae447-1327253936.tcb.qcloud.la/assets/v2/common/register-icon.png?sign=f219eefd568b63e4843f16ae204b6ada&t=1729477487',
    navBarHeight: app.globalData.navBarHeight,
    menuRight: app.globalData.menuRight,
    menuBotton: app.globalData.menuBotton,
    menuHeight: app.globalData.menuHeight,
    menuTop: app.globalData.menuTop,
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
    this.setData({
      markers: [customCallout1, customCallout2, customCallout3],
    })
  },

  markertap(e) {
    console.log('@@@ markertap', e)
  },
  callouttap(e) {
    const { markerId } = e
    const current = this.data.markers.find(item => item.id === markerId)
    const { latitude, longitude } = current
    this.setData({
      latitude,
      longitude,
      scale: 32
    })
    console.log('@@@ callouttap', e)
  },
  labeltap(e) {
    console.log('@@@ labeltap', e)
  },
  
})
