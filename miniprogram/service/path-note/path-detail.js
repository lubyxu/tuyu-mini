import { request } from '../../utils/req';

export async function getPathDetail({ user_path_id, path_id }) {
	if (user_path_id) {
		const { data } = await request({
			url: '/fuyu/path/userpathdetail',
			data: {
				user_path_id: +user_path_id,
			}
		});
		return data;
	}
	else {
		const { data } = await request({
			url: '/fuyu/path/detail',
			data: {
				path_id: +path_id,
			}
		});
		return {
			path_detail_info: data
		}; 
	}
}


/**
 * 打开地点
 * @param {*} param0 
 * @returns 
 */

export async function checkPath({ user_path_id, place_id }) {
	return request({
		url: '/fuyu/path/userpathcheck',
		data: {
			user_path_id: +user_path_id,
			place_id: +place_id,
		}
	});
}


export function deleteUserPath() {
	// todo
	return Promise.resolve();
}