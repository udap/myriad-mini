import { FC, useEffect, useState } from 'react'
import { reLaunch, showToast, login, redirectTo } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import { mobileLogin } from '../../services/login'
import BaseConfig from '../../config'
import { setUserId, setUserPhone } from '../../utils/storage'

import { Logo } from '../../assets'

import './index.less'

const Login: FC = () => {
  const [code, setCode] = useState<string>('')
  const [loading, setLoading] = useState(false)

  /**
   * 微信手机号登录
   * @param e commentEvent
   */
  const getPhoneNumberHandle = (e) => {
    const {
      detail: { errMsg, encryptedData, iv },
    } = e
    setLoading(true)
    if (errMsg === 'getPhoneNumber:ok') {
      // TODO: 登录
      const data = {
        code: code,
        appid: BaseConfig.appId,
        encryptedData: encryptedData,
        iv: iv,
      }
      mobileLogin(data)
        .then((result) => {
          const { cellphone, uid } = result
          setUserId(uid)
          setUserPhone(cellphone)
          redirectTo({ url: '/pages/home/index' })
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      showToast({
        icon: 'none',
        title: '您拒绝了授权，部分功能无法使用，请授权登录！',
      })
      setLoading(false)
    }
  }

  /**
   * 获取微信code
   */
  const wxLoginHandle = () => {
    login().then((result: login.SuccessCallbackResult) => {
      if (result.errMsg === 'login:ok' && result.code) {
        setCode(result.code)
      }
    })
  }

  const reLaunchHandle = () => {
    reLaunch({ url: '/pages/home/index' })
  }

  useEffect(() => {
    wxLoginHandle()
  }, [])

  return (
    <View className="login-page">
      <View className="login-logo">
        <Image src={Logo} className="login-logo--image" />
        <Text className="login-logo--name">江渝生活</Text>
      </View>
      <View className="login-container">
        <Text className="login-title">申请获取以下权限</Text>
        <Text className="login-desc">
          获取您的公开信息 （昵称、头像、地区及性别）
        </Text>
        <Button
          loading={loading}
          disabled={loading}
          onGetPhoneNumber={getPhoneNumberHandle}
          className="login-btn"
          openType="getPhoneNumber"
        >
          手机号授权登录
        </Button>
        <View className="login-more">
          <Text className="login-more-text" onClick={reLaunchHandle}>
            下次再说
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Login
