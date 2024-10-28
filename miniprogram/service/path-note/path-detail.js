import { request } from '../../utils/req';

export async function getPathDetail({ user_path_id }) {
	const { data } = await request({
		url: '/fuyu/path/userpathdetail',
		data: {
			user_path_id: user_path_id,
		}
	});
	return data;
}