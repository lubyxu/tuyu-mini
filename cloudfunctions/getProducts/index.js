const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {
  const { pageNo, pageSize } = event
  const data = await db
    .collection('products')
    .where({
      effective: true
    })
    .skip(pageNo)
    .limit(pageSize)
    .get()
  return data
};
