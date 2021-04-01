import React, { ComponentProps } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import './index.less'

export interface DirectionType {
  'row',
  'row-reverse',
  'column',
  'column-reverse',
}

export interface WrapType {
  'nowrap',
  'wrap',
  'wrap-reverse'
}

export interface JustifyType {
  'start',
  'end',
  'center',
  'between',
  'around'
}

export interface AlignType {
  'start',
  'center',
  'end',
  'baseline',
  'stretch'
}

export interface AlignContentType {
  'start',
  'end',
  'center',
  'between',
  'around',
  'stretch'
}

export interface FlexProps extends ComponentProps<any> {
  direction?: keyof DirectionType,
  wrap?: keyof WrapType,
  justify?: keyof JustifyType,
  align?: keyof AlignType,
  alignContent?: keyof AlignContentType,
  className?: string
}

class Flex extends React.Component<FlexProps> {

  constructor (props) {
    super(props)
  }

  static defaultProps = {
    direction: 'row',
    wrap: 'nowrap',
    justify: 'start',
    align: 'center',
    alignContent: 'stretch'
  }

  render () {
    const { direction, wrap, justify, align, alignContent, children, className, ...restProps } = this.props
    const baseClass = classNames(
      className,
      'flex',
      `direction-${direction}`,
      `wrap-${wrap}`,
      `justify-${justify}`,
      `align-${align}`,
      `alignContent-${alignContent}`
    )
    return (
      <View className={baseClass} {...restProps}>
        {children}
      </View>
    )
  }
}

export default Flex
