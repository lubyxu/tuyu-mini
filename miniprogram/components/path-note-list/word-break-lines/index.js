// components/path-note-list/word-break-lines/index.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    text: String,
    lineCount: Number,
    lineHeight: Number,
    extClass: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    seeMore: false
  },

  lifetimes: {
    attached: function () {
      const _that = this;
      const query = wx.createSelectorQuery().in(this);
      query.selectAll('.plain-text').fields({ size: true }).exec(function (res) {
        let lineHeight = _that.data.lineHeight || 26;
        const item = res[0] ? res[0][0] : null;
        if (!item) return;
        console.log(item)
        if (item.height / lineHeight > 3) {
          _that.setData({
            seeMore: true
          });
        }
      });
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onSeeMore() {
      this.setData({
        seeMore: false
      });
    }
  }
})