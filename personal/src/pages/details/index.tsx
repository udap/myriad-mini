import React, { useEffect, useState } from 'react'
import { hideLoading, showLoading, useRouter } from '@tarojs/taro'
import { Text, View } from '@tarojs/components'

import { getProductInfoApi } from '../../services/products'
import LazyImage from '../../components/LazyImage'
import Flex from '../../components/Flex'
import BaseConfig from '../../config'

import './index.less'

const DetailsPage: React.FC = () => {
  const { params } = useRouter()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    code: undefined,
    coverImg: undefined,
    disabled: false,
    merchant: {},
    name: undefined,
    price: undefined,
    uid: undefined
  })

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await getProductInfoApi(params.id)
      setData(res.content)
    } catch (error) {

    }
    setLoading(false)

  }

  // 监听数据加载，显示loading
  useEffect(() => {
    if (loading) {
      showLoading({
        title: '数据加载中...',
        mask: true
      })
    } else {
      hideLoading()
    }
  }, [loading])
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <View className='jy-page'>
      <View className='header'>
        {data.coverImg ? (
          <LazyImage
            url={BaseConfig.baseUrl + data.coverImg}
            mode='aspectFill'
            style={{ width: '100%', height: '480rpx' }}
            wrapStyle={{ width: '100%', height: '480rpx' }}
          />
        ) : null}
      </View>
      <Flex>

      </Flex>
      <Flex>
        <Text>商品说明</Text>
        <Text>{data.disabled}</Text>
      </Flex>
      <Flex>
        <Text>配送方式</Text>
        <Text>{data.disabled}</Text>
      </Flex>
    </View>
  )
}

export default DetailsPage
