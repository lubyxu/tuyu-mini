Component({
  data: {
    selected: 0,
    color: "#999999",
    selectedColor: "#F7393F",
    isShow: false,
    list: [
      {
        "pagePath": "pages/home/index",
        "text": "首页",
        "iconPath": "../images/icons/icon-1.png",
        "selectedIconPath": "../images/icons/icon-1-active.png",
        index: 0
      },
      {
        "pagePath": "pages/map/index/index",
        "text": "地图",
        "iconPath": "../images/icons/icon-2.png",
        "selectedIconPath": "../images/icons/icon-2-active.png",
        index: 1
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      const index = data.index
      wx.switchTab({
        url: '/' + url,
        complete: (res) => {console.log(res)},
        fail: (res) => {console.log(res)},
        success: (res) => {console.log(res)},
      })
      this.setData({
        selected: index
      })
    }
  }
})