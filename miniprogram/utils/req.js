export function request() {
	return new Promise(function (resolve, reject) {
		wx.request({
			url: 'url',
			success: function (res) {
				resolve(res);
			},
			fail: function (e) {
				reject(e)
			}
		});
	})
}