import Taro from '@tarojs/taro'

export const toRouter = (option, callback?: Function) => {
  Taro.navigateTo(option).then((result) => {
    if (typeof callback === 'function') {
      callback(result)
    }
  })
}
