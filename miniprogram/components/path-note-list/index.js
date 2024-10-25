// components/path-note-list/index.js

Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {

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
    onClick(e) {
      console.log('000 i am clicked');
    },
    getUserProfile(e) {
      wx.getUserProfile({
        desc: '测试一下',
        success: res => {
          console.log(res);
        }
      })
    },
    getPhoneNumber(e) {
      console.log(e.detail.code)  // 动态令牌
    console.log(e.detail.errMsg) // 回调信息（成功失败都会返回）
    console.log(e.detail.errno)  // 错误码（失败时返回）
    }
  }
})