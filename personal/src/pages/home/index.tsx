import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image, OpenData } from '@tarojs/components'

import { toRouter } from '../../utils'
import Empty from '../../components/Empty'
import MoreLoading from '../../components/MoreLoading'
import Flex from '../../components/Flex'
import ItemGift from '../../components/ItemGift'
import usePageLoadingHook from '../../hooks/usePageLoadingHook'
import BaseConfig from '../../config'

import { getHomeGifts } from '../../services/home'

import {
  IconStruct01,
  IconStruct02,
  IconStruct03,
  IconStruct04
} from '../../assets'

import './index.less'

const HomePage: React.FC = () => {
  const {
    list,
    status,
    emptyType,
    isEmpty,
    isLoadingMore,
    onLoadingMoreHandle
  } = usePageLoadingHook({
    fetch: getHomeGifts
  })

  const structList = [
    {
      title: '我的礼卷',
      icon: IconStruct01,
      handler: () => toRouter({ url: '/pages/gift/index' })
    },

    {
      title: '我的关注',
      icon: IconStruct02,
      handler: () => toRouter({ url: '/pages/follow/index' })
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
    })
  }

  return (
    <View className='home'>
      <View className='user-container'>
        <View className='user-info'>
          <OpenData type='userAvatarUrl' className='user-avatar' />
          <OpenData type='userNickName' className='user-name' />
        </View>
        <View onClick={openScanCodeHandle}>
          <Image
            src={require('../../assets/scan-icon.png')}
            className='user-scan-btn'
          />
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
        <Flex
          direction='row'
          justify='start'
          wrap='wrap'
          style={{ padding: '10rpx' }}
        >
          {list.map((item, key) => {
            return (
              <ItemGift
                onClick={() => {
                  console.log('ok')
                  toRouter({ url: `/pages/details/index?id=${item.uid}` })
                }}
                key={key}
                style={{ width: '50%', padding: '10rpx' }}
                url={BaseConfig.baseUrl + item.coverImg}
                title={item.name}
                price={item.price.toFixed(2)}
                offer={item.merchant.name}
              />
            )
          })}
        </Flex>

        {isEmpty ? (
          <Empty type={emptyType} description='您还没有兑奖记录哦！！！' />
        ) : null}
        {isLoadingMore ? (
          <MoreLoading onClick={onLoadingMoreHandle} status={status} />
        ) : null}
      </View>
    </View>
  )
}

export default HomePage
