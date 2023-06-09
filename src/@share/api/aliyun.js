import axios from 'axios'
import CryptoJS from 'crypto-js'

function getConfig () {
  const params = {
    AccessKeyId: '',
    Action: '',
    Version: '2019-02-28',
    Format: 'JSON',
    RegionId: 'cn-shanghai',
    Timestamp: JSON.stringify(new Date()).replace(/"/g, ''),
    SignatureMethod: 'HMAC-SHA1',
    SignatureVersion: '1.0',
    SignatureNonce: randomHEX(32).replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5')
  };

  return params
}

export let aliToken = "";

export async function createToken (accessKeyId, accessKeySecret) {

  const param = getConfig();
  param.AccessKeyId = accessKeyId
  param.Action = "CreateToken"

  const condition = createParams(param, accessKeyId, accessKeySecret)
  const response = await axios.get('http://nls-meta.cn-shanghai.aliyuncs.com/?' + condition)

  if (response.status === 200) {
    aliToken = response.data.Token
    return response.data.Token
  } else {
    return ""
  }
}

export async function getDpChGeneralCTB (accessKeyId, accessKeySecret, text) {
  const param = getConfig();
  param.AccessKeyId = accessKeyId
  param.Action = "GetDpChGeneralCTB"
  param.ServiceCode = 'alinlp'
  param.Text = text
  param.Version = "2020-06-29"

  const condition = createParams(param, accessKeyId, accessKeySecret)
  const response = await axios.get('http://alinlp.cn-hangzhou.aliyuncs.com/?' + condition)

  if (response.status === 200) {
    return JSON.parse(response.data.Data)
  } else {
    return ""
  }
}

function createParams (params, accessKeyId, accessKeySecret) {
  const arr = [];
  for (var k in params) {
    arr.push(urlEncodeX(k) + "=" + urlEncodeX(params[k]));
  }
  arr.sort();
  params = arr.join("&")

  const signStr = "GET&" + urlEncodeX("/") + "&" + urlEncodeX(params);
  const sign = HMAC(accessKeySecret + "&", signStr);

  const condition = "Signature=" + urlEncodeX(sign) + "&" + params;

  return condition
}

function randomHEX (len) {
  const s = [];
  for (var i = 0, r; i < len; i++) {
    r = Math.floor(Math.random() * 16);
    if (r < 10) {
      s.push(String.fromCharCode(r + 48));
    } else {
      s.push(String.fromCharCode(r - 10 + 97));
    };
  };
  return s.join('');
}

function urlEncodeX (val) {
  return encodeURIComponent(val).replace(/[^\w\-.~%]/g, function(a) {
    return "%" + ("0" + a.charCodeAt(0).toString(16)).substr(-2).toUpperCase();
  });
}

function HMAC (key, data) {
  const hmac = CryptoJS.HmacSHA1(data, key)
  // var hmac = Crypto.createHmac(hash, key);
  // hmac.update(data);
  return CryptoJS.enc.Base64.stringify(hmac) // hmac.digest(resType === null ? null : (resType || 'hex'));
};
