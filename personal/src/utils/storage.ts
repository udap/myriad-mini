import { getStorageSync, setStorageSync, clearStorageSync } from '@tarojs/taro'

const TOKEN = 'X-ACCESS-TOKEN'

const USER_UID = 'USER_UID'

const USER_PHONE = 'USER_PHONE'

export const get = (key: string): string => {
  return getStorageSync(key)
}

export const set = (key: string, value: string): void => {
  setStorageSync(key, value)
}

export const clear = (): void => {
  clearStorageSync()
}

// 缓存token
export const setToken = (token: string): void => {
  set(TOKEN, token)
}
// 读取token
export const getToken = (): string => {
  return get(TOKEN)
}

export const setUserId = (uid: string): void => {
  set(USER_UID, uid)
}

export const getUserId = (): string => {
  return get(USER_UID)
}

export const setUserPhone = (phone: string) => {
  set(USER_PHONE, phone)
}

export const getUserPhone = (): string => {
  return get(USER_PHONE)
}
