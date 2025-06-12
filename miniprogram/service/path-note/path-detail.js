import { request } from '../../utils/req';

export async function getPathDetail({ user_path_id, path_id, from }) {
  const { data } = await request({
    url: '/fuyu/path/detail/new',
    data: {
      path_id: +path_id
    }
  })
  return {
    is_user_liked: data.is_user_liked,
    path_detail_info: data.path_detail_info,
    place_reservation: data.place_reservation,
    place_visited: data.place_visited,
    user_path_id: data.user_path_id
  }
	// if (user_path_id) {
  //   const url = from === 'mine' ? '/fuyu/path/share/userpathdetail' : '/fuyu/path/userpathdetail';
	// 	const { data } = await request({
	// 		url,
	// 		data: {
	// 			user_path_id: +user_path_id,
	// 		}
	// 	});
	// 	return data;
	// }
	// else {
	// 	const { data } = await request({
	// 		url: '/fuyu/path/detail',
	// 		data: {
	// 			path_id: +path_id,
	// 		}
	// 	});
	// 	return {
	// 		path_detail_info: data
	// 	}; 
	// }
}


/**
 * 打开地点
 * @param {*} param0 
 * @returns 
 */

export async function checkPath({ path_id, place_id }) {
	return request({
		url: '/fuyu/path/userpathcheck',
		data: {
			path_id: +path_id,
			place_id: +place_id,
		}
	});
}

export async function addUserPath(path_id, province = 'beijing') {
  const { data } = await request({
    url: '/fuyu/path/useraddpath',
    data: {
      province,
      path_id: +path_id
    }
  });
  return data.user_path_id;
}
export function deleteUserPath(user_path_id) {
	return request({
    url: '/fuyu/path/userdelpath',
    data: {
      user_path_id: +user_path_id
    }
  });
}

export async function getPathBySpot({ spot_id, province }) {
  const {data} = await request({
    url: '/fuyu/path/pathlist',
    data: {
      spot_id,
      province
    }
  });
  return data;
}

export async function getSpotDetail(spot_id) {
  const { data } = await request({
    url: '/fuyu/spot/detail',
    data: {
      spot_id: +spot_id
    }
  });
  return data;
}


export async function getComments(path_id) {
  const { data } = await request({
    url: '/fuyu/path/comments',
    data: {
      path_id
    }
  });
  return data;
}
