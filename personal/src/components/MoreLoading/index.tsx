import React, { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'

import './index.less'

export interface MoreLoadingStatusType {
  more
  loading
  noMore
}

interface MoreLoadingProps {
  status: keyof MoreLoadingStatusType
  moreText?: string
  loadingText?: string
  noMoreText?: string
  onClick: () => void
}

/**
 * 加载更多
 * @param props 组件参数
 * @returns
 */
const MoreLoading: React.FC<MoreLoadingProps> = (props) => {
  const { status, moreText, loadingText, noMoreText, onClick } = props
  const [baseMoreText, setBaseMoreText] = useState<string | undefined>('')

  const handleClick = () => {
    if (status === 'more') {
      onClick()
    }
  }

  const baseClass = classNames('loading-more', {
    'loading-more--disabled': status !== 'more',
  })

  useEffect(() => {
    switch (status) {
      case 'more':
        setBaseMoreText(moreText)
        break
      case 'loading':
        setBaseMoreText(loadingText)
        break
      case 'noMore':
        setBaseMoreText(noMoreText)
    }
  }, [status])

  return (
    <View className={baseClass} onClick={handleClick}>
      <Text className="loading-more--text">{baseMoreText}</Text>
    </View>
  )
}

MoreLoading.defaultProps = {
  status: 'more',
  moreText: '加载更多',
  loadingText: '加载中...',
  noMoreText: '没有更多了...',
  onClick: () => {},
}
export default MoreLoading
