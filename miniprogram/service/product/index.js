import { request } from '../../utils/req';

/**
 * 
 * @param {type} 1 冰箱贴 | 3 印章本
 */
export async function getProductList({ type }) {
	const { data } = await request({
		url: '/fuyu/product/user/list',
		data: {
			type
		}
	});

	return data;
}