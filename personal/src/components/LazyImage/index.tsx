import React, { CSSProperties, useState } from 'react'
import { View, Image, Text } from '@tarojs/components'
import { ImageProps } from '@tarojs/components/types/Image'
import { DefaultImage, DefaultImageError } from '../../assets'

import './index.less'

interface LazyImageProps {
  style?: CSSProperties,
  wrapStyle?: CSSProperties,
  url: string,
  mode: keyof ImageProps.mode
}

const LazyImage: React.FC<LazyImageProps> = (props) => {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const handleLoad = (event) => {
    const { errMsg } = event.detail
    setLoading(false)
    if (errMsg) {
      setError(true)
    } else {
      setUrl(props.url)
    }
  }
  if (loading || error) {
    return (
      <View style={props.wrapStyle} className='lazy-image-wrapper'>
        <Image
          mode={props.mode}
          src={props.url}
          style='display:none'
          onLoad={handleLoad}
          onError={handleLoad}
        />
        <Image
          className='lazy-image'
          mode='widthFix'
          src={!error ? DefaultImage : DefaultImageError}
        />
        <Text className='lazy-error-text'>{error ? '加载失败!' : '加载中。'}</Text>
      </View>
    )
  }

  return (
    <Image src={url} mode={props.mode} style={props.style} />
  )
}

export default LazyImage
