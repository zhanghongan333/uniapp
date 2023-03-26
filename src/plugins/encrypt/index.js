import Store from '@/store'
import CryptoJS from 'crypto-js'
import JSEncrypt from 'jsencrypt'
// DES 加密key
const PASSWORD_ENCRYPT_DES_KEY = 'sht%$38N'
// AES 加密IV
const PASSWORD_ENCRYPT_AES_IV = 'DYgjCEIMVrj2W9xN'
// AES 加密key
const PASSWORD_ENCRYPT_AES_KEY = 'DC23WL56789ABHAE'
// RSA 加密key（非对称加密，前端使用公钥加密）
const PASSWORD_ENCRYPT_RSA_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQClaYHaIe3Q9eXBQmVKmFET+j9BUeUWKVr0/IVVMkopJNbeN5Xhw54xqm4OtquTLXVF9RPgqgyi4AqFD9bY6EN5KacGfMFXBH734awlP9SNzbSuEcEztT5EhvzgX2m8K9AoYLTahvHibnzpSC6OtkKYE7UEY6zd+V/91IwxDLhTQwIDAQAB'

export function encryptPassword(store, data) {
  const { encrypt, encryption } = store
  let password = data
  if (!encrypt) return password
  switch (encryption) {
    case 'base64':
      password = encryptBasse64(password)
      break
    case 'des':
      password = encryptByDES(password, PASSWORD_ENCRYPT_DES_KEY)
      break
    case 'aes':
      password = encryptByAES(password, PASSWORD_ENCRYPT_AES_KEY, PASSWORD_ENCRYPT_AES_IV)
      break
    case 'rsa':
      password = encryptByRSA(password, PASSWORD_ENCRYPT_RSA_KEY)
      break
    default:
      break
  }
  return password
}

export function encryptByDES(data, key) {
  const iv = [1, 2, 3, 4, 5, 6, 7, 8]
  const ivString = this.encryptByToString(iv)
  const keyHex = CryptoJS.enc.Utf8.parse(key)
  const ivHex = CryptoJS.enc.Utf8.parse(ivString)
  const encryptor = CryptoJS.enc.DES.encrypt(data, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encryptor.ciphertext.toString(CryptoJS.enc.Base64)
}

export function encryptByteToString(arr) {
  if (typeof arr === 'string') {
    return arr
  }
  let str = ''
  const _arr = arr
  for (let i = 0; i < _arr.length; i++) {
    const one = _arr[i].toString(2)
    const v = one.match(/^1+?(?=0)/)
    if (v && one.length === 8) {
      const bytesLength = v[0].length
      let store = _arr[i].toString(2).slice(7 - bytesLength)
      for (let st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2)
      }
      str += String.fromCharCode(parseInt(store, 2))
      i += bytesLength - 1
    } else {
      str += String.fromCharCode(_arr[i])
    }
  }
  return str
}

export function encryptByAES(data, key, iv) {
  const keyHex = CryptoJS.enc.Utf8.parse(key)
  const ivHex = CryptoJS.enc.Utf8.parse(iv)
  const encryptor = CryptoJS.AES.encrypt(data, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encryptor.ciphertext.toString()
}

export function encryptByRSA(data, key) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(key)
  return encryptor.encrypt(data)
}

export function encryptData(data, encrypt = true) {
  if (!encrypt) { return data }
  return encryptPassword({
    encrypt: Store.getters.encrypt,
    encryption: Store.getters.encryption
  }, data)
}

export function encryptBasse64(data) {
  return Crypto.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data))
}
