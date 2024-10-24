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
          const ret = await request({ url: '/fuyu/user/code', data: { code } });
        }
        catch (e) {
          const {errno} = e;
          if (errno === 2000) {
            const data = await registerAccount(code);
            resolve(data);
          }
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
async function registerAccount(code) {
  const ret = await request({ url: '/fuyu/user/create/code', data: { code }});
  return ret.data
}