import { request } from '../../utils/req';
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
  console.log('---params', params)
  const { data } = await request({
    url: '/fuyu/stamp/addpage',
    data: {
      ...params,
      from: 'webpage',
    },
  });

  return data;
}