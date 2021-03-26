import React from 'react'
import { Image, Text, View } from '@tarojs/components'

import './index.less'

export interface EmptyStatusType {
  networkError
  gitError
  notList
}

interface EmptyProps {
  type: keyof EmptyStatusType
  description: string
}

const Empty: React.FC<EmptyProps> = (props) => {
  const status = {
    networkError: require('../../assets/empty-wifi.png'),
    gitError: require('../../assets/empty-gift.png'),
    notList: require('../../assets/empty-list.png'),
  }
  return (
    <View className="empty-container">
      <Image src={status[props.type]} mode="widthFix" className="empty-image" />
      {props.children || (
        <Text className="empty-description">{props.description}</Text>
      )}
    </View>
  )
}

Empty.defaultProps = {
  description: '暂无数据',
  type: 'notList',
}

export default Empty
