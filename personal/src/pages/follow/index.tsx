import React from 'react'
import { View } from '@tarojs/components'
import usePageLoadingHook from '../../hooks/usePageLoadingHook'
import { queryMineFollowApi } from '../../services/mine'
import Empty from '../../components/Empty'
import MoreLoading from '../../components/MoreLoading'
import ItemFollow from '../../components/ItemFollow'

const ExchangePage: React.FC = () => {
  const {
    list,
    status,
    emptyType,
    isEmpty,
    isLoadingMore,
    onLoadingMoreHandle
  } = usePageLoadingHook({
    fetch: queryMineFollowApi
  })
  return (
    <View className='jy-page'>
      {list.map((item, key) => {
        console.log(item)
        return (
          <ItemFollow
            key={key}
            title={item.managerName}
            address={item.orgFullAddress}
            phone={item.orgPhone}
            name={item.orgName}
          />
        )
      })}
      {isEmpty ? (
        <Empty type={emptyType} description='您还没有关注哦！' />
      ) : null}
      {isLoadingMore ? (
        <MoreLoading onClick={onLoadingMoreHandle} status={status} />
      ) : null}
    </View>
  )
}

export default ExchangePage
