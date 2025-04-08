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
    const url = 'https://oss-whale-alivia.meetwhale.com/H5Pages/game/index.html';
    const query = [
      getEnv() === 'stage' ? 'env=stage' : 'env=production',
      'token=' + getApp().globalData?.user?.token,
      'id=' + (this.options.id || '1'),
    ]

    const path = decodeURIComponent(url + '?' + query.join('&'))
    this.setData({
      url: path
    });
  }
});