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