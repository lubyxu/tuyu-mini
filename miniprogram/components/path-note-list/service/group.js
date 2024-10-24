import { request } from '../../../utils/req';

export async function getTabs() {
	const { data } = await request({
		method: 'POST',
		url: '/fuyu/path/groups',
		data: {
			province: "beijing"
		}
	});

	return data;
}