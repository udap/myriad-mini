import React from 'react'
import { Image, Text, View } from '@tarojs/components'

import './index.less'

interface TypeFace {
  networkError: 'networkError',
  gitError: 'gitError',
  notList: 'notList'
}

interface EmptyProps {
  type: keyof TypeFace,
  description: string
}

const defaultProps: EmptyProps = {
  description: '暂无数据',
  type: 'notList'
}

const Empty: React.FC<EmptyProps> = (props = defaultProps) => {
  const status = {
    'networkError': require('../../assets/empty-wifi.png'),
    'gitError': require('../../assets/empty-gift.png'),
    'notList': require('../../assets/empty-list.png')
  }
  return (
    <View className='empty-container'>
      <Image src={status[props.type]} mode='widthFix' className='empty-image' />
      {props.children || (
        <Text className='empty-description'>{props.description}</Text>
      )}
    </View>
  )
}

export default Empty
