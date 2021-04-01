import React from 'react'
import { View } from '@tarojs/components'
import usePageLoadingHook from '../../hooks/usePageLoadingHook'
import { queryExchangeApi } from '../../services/exchagne'
import Empty from '../../components/Empty'
import MoreLoading from '../../components/MoreLoading'
import ItemRecord from '../../components/ItemRecord'
import BaseConfig from '../../config'

const ExchangePage: React.FC = () => {
  const {
    list,
    status,
    emptyType,
    isEmpty,
    isLoadingMore,
    onLoadingMoreHandle
  } = usePageLoadingHook({
    data: { status: 'USED' },
    fetch: queryExchangeApi
  })
  return (
    <View className='jy-page'>
      {list.map((item, key) => {
        return (
          <ItemRecord
            key={key}
            title={item.name}
            num={item.numProducts}
            desc=''
            time={item.issueTime}
            image={BaseConfig.baseUrl + item.coverImg}
          />
        )
      })}
      {isEmpty ? (
        <Empty type={emptyType} description='您还没有兑换记录哦！！！' />
      ) : null}
      {isLoadingMore ? (
        <MoreLoading onClick={onLoadingMoreHandle} status={status} />
      ) : null}
    </View>
  )
}

export default ExchangePage
