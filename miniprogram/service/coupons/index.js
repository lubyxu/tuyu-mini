import { request } from '../../utils/req';

export async function getCouponList({status, count_only}) {
  const { data } = await request({
		url: '/fuyu/user/coupons',
		data: {
			status,
			count_only: count_only || false
		}
  });

  return data;
}


export async function getCouponsByUserPath(user_path_id) {
	const { data } = await request({
		url: '/fuyu/userpath/coupons',
		data: {
			user_path_id
		}
	});
	return data;
}

export async function getCouponsByPath(path_id) {
	const { data } = await request({
		url: '/fuyu/path/coupons',
		data: {
			path_id: +path_id
		}
	});
	return data;
}

export async function getCoupon(coupon_id) {
	await request({
		url: '/fuyu/user/sendcoupon',
		data: {
			coupon_id
		}
	})
}