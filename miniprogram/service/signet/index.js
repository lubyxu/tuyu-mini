import { request } from '../../utils/req';
import { useCoupon } from '../coupons/index';
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

export async function addToPage({ from, batch_key, couponId, ...params } = {}) {
  if (couponId) {
    await useCoupon({
      user_coupon_id: +couponId,
      use_coupon_req: {
        stamp_info: {
          ...params,
          source: params.source || 'webpage'
        },
        book_id: +params.book_id,
        user_stamp_id: +params.stamp_pid,
      }
    });
    return;
  }
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