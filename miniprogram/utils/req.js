export function request({ url, data, method, Authorization }) {
	const authorization = getApp().globalData?.user?.token;
	// const authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIzMSIsImV4cCI6MTc2MzIwOTU5N30.vZrhCuqxhGnsUczxFohvv0uubWnodE0p9QrvSHk6UOQ'
	console.log('authorization', authorization)
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