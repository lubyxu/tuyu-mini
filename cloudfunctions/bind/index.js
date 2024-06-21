const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {
  const { openid, pid, imageList } = event
  try {
   await db
    .collection('bind')
    .add({
      data: {
        openid,
        pid,
        imageList,
        date: db.serverDate()
      }
    })
    return {
      success: true
    }
  } catch (err) {
    throw err
  }
};
