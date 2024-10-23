// components/auth-guard/index.js
Component({
  options: {
    multipleSlots: true
  },
  externalClasses: ['t-0', 'l-0', 'r-0', 'b-0', 'absolute'],

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isLogin: true
  },

  lifetimes: {
    attached: function () {
      const globalData = getApp().globalData;
      const isLogin = globalData.open_id;
      this.setData(
        {
          isLogin: !!isLogin
        }
      );
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getPhoneNumber(e) {
      console.log(e.detail.code)  // 动态令牌
      console.log(e.detail.errMsg) // 回调信息（成功失败都会返回）
      console.log(e.detail.errno)  // 错误码（失败时返回）
      const open_id = e.detail.code;
      const prev = getApp().globalData || {};

      getApp().globalData = {
        ...prev,
        open_id,
      };

      this.setData({
        isLogin: true
      })
    }
  }
})