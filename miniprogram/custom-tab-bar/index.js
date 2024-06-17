Component({
  data: {
    selected: 0,
    color: "#999999",
    selectedColor: "#F7393F",
    list: [
      {
        "pagePath": "pages/home/index",
        "text": "快速开始",
        "iconPath": "../images/icons/icon-1.png",
        "selectedIconPath": "../images/icons/icon-1-active.png",
        index: 0
      },
      {
        "pagePath": "pages/examples/index",
        "text": "基础能力",
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
      wx.switchTab({url})
      this.setData({
        selected: index
      })
    }
  }
})