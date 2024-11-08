export function request({ url, data, method, Authorization }) {
	const authorization = getApp().globalData?.user?.token;
	return new Promise(function (resolve, reject) {
		wx.request({
			method: method || 'POST',
			url: `https://storyhub.cc${url}`,
			data: JSON.stringify(data),
			header: {
				Authorization: authorization,
			},
			success: function (res) {
				const ret = res.data;

				if (ret.errno !== 10000) {
					reject(ret);
					return;
				}
				resolve(ret);
			},
			fail: function (e) {
				reject(e)
			}
		});
	})
}

export const SUCCESS_CODE = 10000;