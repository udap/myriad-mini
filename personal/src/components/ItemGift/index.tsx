import React, { ComponentProps } from 'react'
import { View, Text } from '@tarojs/components'

import LazyImage from '../LazyImage'
import Flex from '../Flex'

import './index.less'

interface ItemGiftProps extends ComponentProps<any> {
  url: string
  title: string
  price: number
  offer: string
}

const ItemGift: React.FC<ItemGiftProps> = (props) => {
  const { url, title, price, offer, ...restProps } = props
  return (
    <View {...restProps} className="gift-item">
      <Flex direction="column" align="start">
        <LazyImage
          wrapStyle={{ height: '380rpx', width: '100%' }}
          style={{
            height: '380rpx',
            width: '100%',
            overflow: 'hidden',
            borderRadius: '10rpx',
          }}
          url={url}
          mode="aspectFill"
        />
        <Text className="gift-item__title">{title}</Text>
        <Flex justify="start">
          <Text className="gift-item__price">￥{price}</Text>
          <Text className="gift-item__desc">市场参考价</Text>
        </Flex>
        <View className="gift-item__footer">
          <Text className="gift-item__text">由</Text>
          <Text className="gift-item__offer">{offer}</Text>
          <Text className="gift-item__text">提供</Text>
        </View>
      </Flex>
    </View>
  )
}

export default ItemGift
