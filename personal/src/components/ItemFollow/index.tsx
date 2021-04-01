import React from 'react'
import { View } from '@tarojs/components'

import './index.less'

interface ItemFollowProps {
  title: string,
  name: string,
  phone: number,
  address: string
}

const ItemFollow: React.FC<ItemFollowProps> = props => {

  return (
    <View className='item-follow'>
      <View className='item-follow__title'>{props.title}</View>
      <View className='item-follow__name'>联系人：{props.name}</View>
      <View className='item-follow__phone'>电话：{props.phone}</View>
      <View className='item-follow__address'>地址：{props.address}</View>
    </View>
  )
}

export default ItemFollow
