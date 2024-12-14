import { request } from '../../utils/req';
import { getProductList } from '../product/index';

export async function getBookInfo(bookId) {
  const { data } = await request({
    url: '/fuyu/stamp/bookinfo',
    data: {
      book_id: +bookId,
    }
  });

  return data;
}

export async function addToPage(params) {
  const { data } = await request({
    url: '/fuyu/stamp/addpage',
    data: {
      ...params,
      from: 'webpage',
    },
  });

  return data;
}

export function getSignetBooks() {
  return getProductList({ type: 3 });
}

export function movePage(params) {
  return request({
    url: '/fuyu/stamp/movepage',
    data: {
      ...params,
    }
  });
}