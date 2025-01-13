import { request } from '../../utils/req';

export async function getCouponList({status}) {
  const { data } = await request({
		url: '/fuyu/user/coupons',
		data: {status}
  });

  return data;
}
