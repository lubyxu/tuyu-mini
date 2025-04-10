import loginBehavior from '../../behaviors/login/index';
import { getEnv } from '../../utils/req';

Page({
  behaviors: [loginBehavior],
  data: {
    url: '' // 替换为你需要加载的网页地址
  },
  
  onLoad: function(options) {
    this.options = options;
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
    const url = 'https://oss-whale-alivia.meetwhale.com/H5Pages/game/v4/index.html';
    // const url = 'http://192.168.3.51:8080/index.html'
    const query = [
      getEnv() === 'stage' ? 'env=stage' : 'env=production',
      'token=' + encodeURIComponent(getApp().globalData?.user?.token),
      'id=' + (this.options.id || '1'),
    ]

    const path = (url + '?' + query.join('&'))
    console.log('--', path)
    this.setData({
      url: path
    });
  }
});