const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {
  const { pid, openid } = event
  const matchParams = pid ? { pid,openid } : { openid } 
  /**
   * 如果存在pid，证明只用获取当前商品和当前用户的绑定关系
   * 否则，需要拿到当前用户和所有商品的绑定关系
   */
  const getSingleBind = !!pid
  try {
   const data = await db
    .collection('bind')
    .aggregate()
    .match(matchParams)
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
      data: getSingleBind ? current : data.list
    }
  } catch (err) {
    throw err
  }
};
