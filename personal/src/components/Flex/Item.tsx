import { ReactNode } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import './index.less'

interface ItemProps {
  className?: string
  children?: ReactNode
}

function FlexItem (props: ItemProps) {
  const { className, children, ...restProps } = props
  return (
    <View className={classNames('flex-item', className)} {...restProps}>
      {children}
    </View>
  )
}

export default FlexItem
