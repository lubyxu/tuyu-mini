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

export async function addToPage({ from, batch_key, ...params } = {}) {
  const { data } = await request({
    url: '/fuyu/stamp/addpage',
    data: {
      ...params,
      source: params.source || 'webpage'
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

export function deletePage({ book_id, page_num }) {
  return request({
    url: '/fuyu/stamp/delpage',
    data: {
      book_id,
      page_num
    }
  });
}

export async function getSharePageInfo(user_stamp_id) {
  const { data } = await request({
    url: '/fuyu/stamp/share/page',
    data: {
      user_stamp_id: +user_stamp_id
    }
  });
  return data;
}

export async function getStampInfo(product_id, key) {
  const { data } = await request({
    url: '/fuyu/stamp/detail',
    data: {
      product_id: +product_id,
      key: key
    }
  });
  return data;
}

export async function corpStamp(url) {
  const { data } = await request({
    url: '/fuyu/stamp/corp',
    data: {
      url,
    }
  });

  return data.url;
}