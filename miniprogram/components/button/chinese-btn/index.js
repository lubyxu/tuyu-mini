// components/button/chinese-btn/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    width: {
      type: Number,
      value: 200
    },
    unit: {
      type: String,
      value: 'px'
    },
    zIndex: {
      value: 0
    },
    className: {
      type: String,
    },
    type: {
      type: String,
      value: 'primary'
    }
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
    onClick: function (e) {
      this.triggerEvent('click', e);
    }
  }
})