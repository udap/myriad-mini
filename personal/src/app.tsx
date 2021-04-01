import React, { useEffect } from 'react'
import {
  getUpdateManager,
  showModal,
  getSetting,
  getUserInfo
} from '@tarojs/taro'
import { Provider } from 'react-redux'
import configStore from './store'

import './app.less'

const store = configStore()

const App: React.FC = (props) => {
  useEffect(() => {
    getSetting({}).then((res) => {
      console.log(res)
      // 判断是否授权
      if (res.authSetting['scope.userInfo']) {
        getUserInfo().then((result) => {
          console.log(result)
        })
      }
    })
  }, [])

  // 更新
  useEffect(() => {
    // 监听小程序是否需要更新
    getUpdateManager().onCheckForUpdate((res) => {
      if (res.hasUpdate) {
        // 监听更新进度
        getUpdateManager().onUpdateReady(() => {
          showModal({
            title: '更新提示',
            content: '新版本已经准备好，单击确定重启应用',
            showCancel: false,
            success: function (result) {
              if (result.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                getUpdateManager().applyUpdate()
              }
            }
          })
        })

        // 新版下载失败
        getUpdateManager().onUpdateFailed(() => {
          showModal({
            title: '提示',
            content: '检查到有新版本，但下载失败，请检查网络设置',
            showCancel: false
          })
        })
      }
    })
  }, [])

  return <Provider store={store}>{props.children}</Provider>
}

export default App
