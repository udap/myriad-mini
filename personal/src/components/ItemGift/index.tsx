import React, { ComponentProps } from 'react'
import { View, Text } from '@tarojs/components'

import './index.less'
import LazyImage from '../LazyImage'
import Flex from '../Flex'

interface ItemGiftProps extends ComponentProps<any> {
  url: string,
  title: string,
  price: number,
  offer: string
}

const ItemGift: React.FC<ItemGiftProps> = props => {
  const { url, title, price, offer, ...restProps } = props
  return (
    <View {...restProps} className='gift-item'>
      <Flex direction='column' align='start'>
        <LazyImage
          wrapStyle={{ height: '320rpx', width: '100%' }}
          style={{ height: '220rpx' }}
          url={url}
          mode='widthFix'
        />
        <Text className='gift-item__title'>{title}</Text>
        <Flex justify='start'>
          <Text>￥{price}</Text>
          <Text>市场参考价</Text>
        </Flex>
        <View>
          <Text>由</Text>
          <Text>{offer}</Text>
          <Text>提供</Text>
        </View>
      </Flex>
    </View>
  )
}

export default ItemGift
