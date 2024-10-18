// app.js
App({
  onLaunch: async function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {

      wx.loadFontFace({
        family: 'FZKai-Z03S',
        scopes: ['webview', 'native'],
        global: true,
        source: 'url("https://7072-production-6gycngib97dae447-1327253936.tcb.qcloud.la/font/FZKai-Z03S-Regular.woff2?sign=1d82cd22be5dcedc6e5d0759d0027395&t=1727666864")',  //此处需替换为真实字体地址
        success(res) {
          console.log('引入字体成功', res.status)
        },
        fail: function (res) {
          console.log('引入字体失败', res.status)
        },
        complete: function (res) {
          console.log(res.status)
        }
      });

      console.log('wx.cloud.DYNAMIC_CURRENT_ENV', wx.cloud.DYNAMIC_CURRENT_ENV)
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'production-6gycngib97dae447', // 线上
        // env: 'cloud1-0gq8f3qi3903d318', // 开发
        traceUser: true,
      });
    }
    // https://developers.weixin.qq.com/community/develop/article/doc/000a8c989307888cbe1abbf675f413
    const that = this;
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync();
    // 胶囊按钮位置信息
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    // 导航栏高度 = 状态栏高度 + 44
    this.globalData = {
      navBarHeight: 0, // 导航栏高度
      menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
      menuBotton: 0, // 胶囊距底部间距（保持底部间距一致）
      menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
    };
    that.globalData.navBarHeight = systemInfo.statusBarHeight + 44;
    that.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
    that.globalData.menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
    that.globalData.menuHeight = menuButtonInfo.height;

    const data = await wx.cloud.callFunction({
      name: 'getOpenId',
    })

    const { openid } = data?.result
    that.globalData.openid = openid
  }
});
