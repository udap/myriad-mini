import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image, OpenData } from '@tarojs/components'

import { toRouter } from '../../utils'
import Empty from '../../components/Empty'
import Flex from '../../components/Flex'
import { IconStruct01, IconStruct02, IconStruct03, IconStruct04 } from '../../assets'

import './index.less'
import ItemGift from '../../components/ItemGift'

const HomePage: React.FC = () => {
  const structList = [
    {
      title: '我的礼卷',
      icon: IconStruct01,
      handler: () => {

      }
    },

    {
      title: '我的关注',
      icon: IconStruct02,
      handler: () => {

      }
    },
    {
      title: '兑换记录',
      icon: IconStruct03,
      handler: () => toRouter({ url: '/pages/exchange/index' })
    },
    {
      title: '奖励记录',
      icon: IconStruct04,
      handler: () => toRouter({ url: '/pages/integral/index' })
    }
  ]

  const openScanCodeHandle = () => {
    Taro.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode']
    }).then(() => {

    }).catch(() => {

    })
  }

  const jumpPerson = () => {
    Taro.navigateTo({ url: '/pages/person/index' }).then((res) => {
      console.log(res)
    })
  }

  return (
    <View className='home'>
      <View className='user-container'>
        <View className='user-info' onClick={jumpPerson}>
          <OpenData type='userAvatarUrl' className='user-avatar' />
          <OpenData type='userNickName' className='user-name' />
        </View>
        <View onClick={openScanCodeHandle}>
          <Image src={require('../../assets/scan-icon.png')} className='user-scan-btn' />
        </View>
      </View>
      <View className='struct-container'>
        {structList.map((item, key) => {
          return (
            <View className='struct-item' key={key} onClick={item.handler}>
              <Image className='struct-image' src={item.icon} />
              <Text className='struct-name'>{item.title}</Text>
            </View>
          )
        })}
      </View>
      <View className='hot-container'>
        <View className='hot-title--wrap'>
          <Text className='hot-title'>热门礼品</Text>
        </View>
        <Flex direction='row' style={{ padding: '10rpx' }}>
          <ItemGift
            style={{ width: '50%', padding: '10rpx' }}
            url='https://www.baidu.com' title='测试'
            price={20}
            offer='重庆农商行提供'
          />
          <ItemGift
            style={{ width: '50%', padding: '10rpx' }}
            url='https://www.baidu.com' title='测试'
            price={20}
            offer='重庆农商行提供'
          />
        </Flex>
      </View>
      <Empty type='notList' description='没有找到兑奖记录哦！' />
    </View>
  )
}

export default HomePage
