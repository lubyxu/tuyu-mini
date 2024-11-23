import { request } from "./req"

export function authCamera() {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success(res) {
        console.log('res.authSetting', res.authSetting['scope.camera'])
        if (!res.authSetting['scope.camera']) {
          wx.authorize({
            scope: 'scope.camera',
            success: resolve,
            fail: () => {
              wx.showModal({
                title: '请先授权摄像机权限',
                content: '否则无法使用',
                success (res) {
                  if (res.confirm) {
                    wx.openSetting()
                  } else if (res.cancel) {
                    reject("取消授权")
                  }
                }
              })               
            },
          })
        } else {
          resolve()
        }
      }
    })
  })
}


/**
 * 
 * @returns { open_id: string; }
 */

export function getUser() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: async function ({ code }) {
        try {
          const app = getApp();
          const ret = await request({ url: '/fuyu/user/code', data: { code } });
          console.log(ret);
          app.globalData.user = ret.data;
          app.globalData.event.emit('login', ret.data);
          resolve(ret)
        }
        catch (e) {
          const app = getApp();
          const {errno} = e;
          if (errno === 2000) {
            console.log(e.data)
            app.globalData.user = e.data;
            resolve(e.data);
          }
          reject(e);
          app.globalData.event.emit('login', { type: 'loginFailed' });
        }
      },
      fail: reject
    })
  });
}

/**
 * 
 * @param {string} code 
 * @returns { open_id: string }
 */
export async function registerAccount(code) {
  const app = getApp();
  if (app.globalData.user.token) return app.globalData.user
  const openid = getApp().globalData.user.openid;
  const ret = await request({
    url: '/fuyu/user/create/code',
    data: {
      open_id: openid,
      code,
      nickname: ''
    }
  });
  app.globalData.user = ret.data;
  app.globalData.event.emit('login', ret.data);
  return ret.data
}