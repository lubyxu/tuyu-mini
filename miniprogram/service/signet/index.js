import { request } from '../../utils/req';
export async function getBookInfo(bookId) {
  const { data } = await request({
    url: '/fuyu/stamp/bookinfo',
    data: {
      book_id: +bookId,
    }
  });
}