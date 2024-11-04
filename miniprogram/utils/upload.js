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
  
  function computeSignature(accessKeySecret, canonicalString) {
    return crypto.enc.Base64.stringify(crypto.HmacSHA1(canonicalString, accessKeySecret));
  }
  
  export const getUploadParams = async (id = 4) => {
    try {
      const res = await getAuthorization(id)
      if (res.errno !== SUCCESS_CODE) {
        throw res
      }
      const { data: Authorization } = res;
      const { data: { sts_cred, bucket } } = await request({ url: `/fuyu/oss/ststoken`, method: 'GET', Authorization })
      console.log('sts_cred', { ...sts_cred, bucket })
      return sts_cred
    } catch (err) {
      throw err
    }
  }
  
  export const uploadPhotos = async (filePath) => {
    const host = 'https://fuyuoss.oss-cn-shanghai.aliyuncs.com'
    const key = 'user-photos';
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

    console.log('formData', formData)
  
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: host,
        filePath: filePath,
        name: 'file', // 必须填file。
        formData,
        success: (res) => {
          console.log('上传文件res', res)
          resolve(res)
        },
        fail: reject
      });
    })
  }