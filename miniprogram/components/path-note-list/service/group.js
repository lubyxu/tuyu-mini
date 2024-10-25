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

export async function getUserPathList() {
	const { data } = await request({
		url: '/fuyu/path/userpathlist',
		data: {
			province: "beijing"
		}
	});
	return data;
}