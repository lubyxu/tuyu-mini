import Crypto from "crypto-js";
import { Base64 } from "./base64";
import { request, SUCCESS_CODE } from "./req"

export const getPolicyAndSignature = (policy, accessKeySecret) => {
  const policyBase64 = Base64.encode(JSON.stringify(policy));
  const message = policyBase64;
  let bytes = Crypto.HmacSHA1(message, accessKeySecret, { asBytes: true });
  let signature = Crypto.enc.Base64.stringify(bytes);
  return {
    policyBase64,
    signature,
  };
};

export const getAuthorization = (id = 4) => {
    return request({ url: `/fuyu/usertoken?id=${id}`, method: 'GET' })
  }
  
  export const getUploadParams = async (id = 4) => {
    try {
      const res = await getAuthorization(id)
      if (res.errno !== SUCCESS_CODE) {
        throw res
      }
      const { data: Authorization } = res;
      const { data: { sts_cred, bucket } } = await request({ url: `/fuyu/oss/ststoken`, method: 'GET', Authorization })
      return { ...sts_cred, bucket }
    } catch (err) {
      throw err
    }
  }
  
  export const uploadPhotos = async ({ filePath, path, userId = 4, productId = 4, id }) => {
    const host = 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com'
    const reducePath = path || `${userId}/${userId}/${productId}/${id}/${new Date().getTime()}.jpg`
    const key = `user-photos/${reducePath}`;
    const { bucket, AccessKeyId: ossAccessKeyId, AccessKeySecret: accessKeySecret, Expiration: expiration, SecurityToken: securityToken } = await getUploadParams();
  
    const PAS = getPolicyAndSignature(
        {
          expiration: expiration,
          conditions: [{ bucket: bucket || "" }],
        },
        accessKeySecret
    );
    
    const formData = {
        key,
        OSSAccessKeyId: ossAccessKeyId,
        "x-oss-security-token": securityToken,
        success_action_status: "200",
        signature: PAS.signature,
        policy: PAS.policyBase64,
    }
  
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: host,
        filePath: filePath,
        name: 'file', // 必须填file。
        formData,
        success: (res) => {
          if (res.statusCode !== 200) {
            reject(res)
          }
          resolve({ ...res, filePath: `https://fuyuoss.oss-cn-shanghai.aliyuncs.com/user-photos/${reducePath}`, createTime: Math.floor(new Date().getTime() / 1000) })
        },
        fail: reject
      });
    })
  }

export const formatTime = (time) => {
  const date = new Date(time * 1000);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}.${day}`
} 