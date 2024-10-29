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

export async function getPathList({ group_id }) {
	if (group_id === 'mine') {
		const { data } = await request({
			url: '/fuyu/path/userpathlist',
			data: {
				province: "beijing"
			}
		});
		return data;
	}
	else {
		const { data } = await request({
			url: '/fuyu/path/pathlist',
			data: {
				province: "beijing",
				group_id: +group_id,
			}
		});
		return data;
	}
}