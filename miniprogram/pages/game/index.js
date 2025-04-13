import loginBehavior from '../../behaviors/login/index';
import { getEnv } from '../../utils/req';

Page({
  behaviors: [loginBehavior],
  data: {
    url: '' // 替换为你需要加载的网页地址
  },
  
  onPullDownRefresh() {
    // 如果已经开启，可以在这里阻止
    wx.stopPullDownRefresh();
  },
  
  onLoad: function(options) {
    this.options = options;
     // 禁用下拉刷新
     wx.stopPullDownRefresh();
     wx.hideNavigationBarLoading();
  },
  onLogined() {
    if (!this.data.isUserAccount) {
      wx.showModal({
        content: '请先注册用户',
        complete: (res) => {
          wx.redirectTo({
            url: '/pages/home/index',
          })
        }
      })
      return;
    }
    const url = 'https://oss.storyhub.cc/h5/game/v3/index.html';
    // const url = 'http://192.168.3.51:8080/index.html'
    const query = [
      getEnv() === 'stage' ? 'env=stage' : 'env=production',
      'token=' + encodeURIComponent(getApp().globalData?.user?.token),
      'id=' + (this.options.id || '1'),
    ]

    const path = (url + '?' + query.join('&'))
    console.log('==path', path)
    this.setData({
      url: path
    });
  }
});