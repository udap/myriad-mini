import React, { useState, useEffect } from 'react'
import { View, Text, CommonEvent } from '@tarojs/components'
import classNames from 'classnames'

import './index.less'

interface StatusTypes {
  more: string,
  loading: string,
  noMore: string
}

interface MoreLoadingProps {
  status: keyof StatusTypes,
  moreText: string,
  loadingText: string,
  noMoreText: string,
  onClick: (event?: CommonEvent) => void
}

const defaultProps: MoreLoadingProps = {
  status: 'more',
  moreText: '加载更多',
  loadingText: '加载中...',
  noMoreText: '没有更多了...',
  onClick: () => {}
}

const MoreLoading: React.FC<MoreLoadingProps> = (props = defaultProps) => {
  const { status, moreText, loadingText, noMoreText, onClick } = props
  const [baseMoreText, setBaseMoreText] = useState('')

  const handleClick = () => {
    if (status === 'more') {
      onClick()
    }
  }

  const baseClass = classNames('loading-more', {
    'loading-more--disabled': status !== 'more'
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
  }, [props.status])

  return (
    <View className={baseClass} onClick={handleClick}>
      <Text className='loading-more--text'>{baseMoreText}</Text>
    </View>
  )
}

export default MoreLoading
