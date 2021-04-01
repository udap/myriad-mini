import React, { useState } from 'react'
import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import Flex from '../../components/Flex'
import FlexItem from '../../components/Flex/Item'
import ItemCoupon from '../../components/ItemCoupon'

import './index.less'

const GiftPage: React.FC = () => {
  const [status, setStatus] = useState<number>(0)
  return (
    <Flex direction='column' justify='start' className='gift-page'>
      <FlexItem>
        <View>
          123
          <ItemCoupon name='hello' age={2} mobile='15223142423' />
        </View>
      </FlexItem>
      <Flex direction='row' justify='start' align='center' className='gift-tabbar'>
        <View className={classNames('gift-tabbar--item', { active: status === 0 })} onClick={() => setStatus(0)}>
          <Text>我的礼卷</Text>
        </View>
        <View className={classNames('gift-tabbar--item', { active: status === 1 })} onClick={() => setStatus(1)}>
          <Text>我的优惠卷</Text>
        </View>
      </Flex>
    </Flex>
  )
}

export default GiftPage
