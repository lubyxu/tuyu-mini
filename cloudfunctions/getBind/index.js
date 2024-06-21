const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {
  const { pid, openid } = event
  try {
   const data = await db.collection('bind')
   .where({
     pid,
     openid
   })
   .get()
    return {
      success: true,
      pid,
      openid,
      data: data?.data?.[0]
    }
  } catch (err) {
    throw err
  }
};
