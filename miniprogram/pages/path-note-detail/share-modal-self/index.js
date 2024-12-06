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
    readOnly: true
  },


  ready() {
    console.log('navigation-bar ready', this.properties.placeDetails)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPrivilege(info) {

    },

    gotoPathDetail() {
      wx.navigateTo({
        url: `/pages/path-note-detail/index?path_id=${this.data.pathId / 1}`,
      });
    }
  }
})