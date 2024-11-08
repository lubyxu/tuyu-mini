export function request({ url, data, method, Authorization }) {
	const authorization = getApp().globalData?.user?.token;
	console.log('authorization', authorization)
	return new Promise(function (resolve, reject) {
		wx.request({
			method: method || 'POST',
			url: `https://storyhub.cc${url}`,
			data: JSON.stringify(data),
			header: {
				Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMyIsImV4cCI6MTc2MjU4ODcyM30.QsJ6NvoJ8l6qBgM817i3hp_3J2YZ69BTkPv5nnEcbLs',
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