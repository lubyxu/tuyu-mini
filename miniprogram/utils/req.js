export function request({ url, data, method }) {
	return new Promise(function (resolve, reject) {
		wx.request({
			method,
			url: `https://storyhub.cc${url}`,
			data: JSON.stringify(data),
			success: function (res) {
				const ret = res.data;
				console.log(ret);
				if (ret.errno !== 10000) {
					reject(ret.errmsg);
					return;
				}
				resolve(ret.data);
			},
			fail: function (e) {
				reject(e)
			}
		});
	})
}