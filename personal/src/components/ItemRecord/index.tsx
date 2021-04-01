import React from 'react'
import { View, Text } from '@tarojs/components'
import LazyImage from '../LazyImage'

import './index.less'

interface ItemRecordProps {
  title: string,
  num: number,
  desc: string,
  time: string,
  image: string
}

const ItemRecord: React.FC<ItemRecordProps> = props => {
  return (
    <View className='record-item'>
      <Text className='record-item__circle' />
      <View className='record-item__info'>
        <View>
          <View className='record-item--header'>
            <Text className='record-item--title'>{props.title}</Text>
            <Text className='record-item--num'>x{props.num}</Text>
          </View>
          <Text className='record-item--desc'>{props.desc}</Text>
        </View>
        <Text className='record-item--time'>{props.time}</Text>
      </View>
      <LazyImage
        style={{
          width: '240rpx',
          height: '240rpx',
          borderRadius: '10rpx',
          overflow: 'hidden'
        }}
        mode='aspectFill'
        wrapStyle={{
          width: '240rpx',
          height: '240rpx'
        }}
        url={props.image}
      />
    </View>
  )
}

export default ItemRecord
