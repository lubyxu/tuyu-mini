const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {
  const { pid } = event
  try {
    const data = await db
    .collection('products')
    .where({
      effective: true,
      pid
    })
    .get()
    return data.data[0]
  } catch (err) {
    throw err
  }
};
