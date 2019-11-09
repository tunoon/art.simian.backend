import { createDecipheriv } from 'crypto';

export class WXBizDataCrypt {
  appId: string;
  sessionKey: string;
  constructor(appId: string, sessionKey: string) {
    this.appId = appId;
    this.sessionKey = sessionKey;
  }

  decryptData = (encryptedData: string, iv: string) => {
    const sessionKeyBuffer = new Buffer(this.sessionKey, 'base64');
    const encryptedDataBuffer = new Buffer(encryptedData, 'base64');
    const ivBuffer = new Buffer(iv, 'base64');

    try {
      // 解密
      const decipher = createDecipheriv(
        'aes-128-cbc',
        sessionKeyBuffer,
        ivBuffer
      );
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true);
      let decoded = decipher.update(encryptedDataBuffer, undefined, 'utf8');
      decoded += decipher.final('utf8');

      const decodedObj = JSON.parse(decoded);

      if (decodedObj.watermark.appid !== this.appId) {
        throw new Error('Illegal Buffer');
      }
      return decodedObj;
    } catch (err) {
      throw new Error('Illegal Buffer');
    }
  }
}
