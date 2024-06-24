const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {
  const { pid, openid } = event
  try {
   const data = await db
    .collection('bind')
    .aggregate()
    .match({
      pid,
      openid
    })
    .lookup({
      from: 'products',
      localField: 'pid',
      foreignField: 'pid',
      as: 'product',
    })
    .end()

    const current = data?.list[0]
    current.product = current?.product?.[0]
    return {
      success: true,
      pid,
      openid,
      data: current
    }
  } catch (err) {
    throw err
  }
};
