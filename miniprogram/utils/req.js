export function request({ url, data, method, Authorization }) {
	const authorization = getApp().globalData?.user?.token || '';
	// const authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1MiIsImV4cCI6MTc3NjE0MTUzM30.PB7fExN12VjY6r2POFdw8_8hoHQwDzS5EzFQjv2Ww1I'
	console.log('authorization', authorization)
	const env = getEnv();
	const baseurl = env === 'stage' ? 'https://storyhub.cc/stage' : 'https://storyhub.cc'
	// const baseurl = 'https://storyhub.cc/stage'
	// const baseurl = 'https://storyhub.cc' //production

	return new Promise(function (resolve, reject) {
		wx.request({
			method: method || 'POST',
			url: `${baseurl}${url}`,
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

export function getEnv() {
	// return 'stage'
	return 'production'
}

export const SUCCESS_CODE = 10000;