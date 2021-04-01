import { useEffect, useState } from 'react'
import {
  showLoading,
  hideLoading,
  usePullDownRefresh,
  stopPullDownRefresh
} from '@tarojs/taro'
import { getUserId } from '../utils/storage'
import { EmptyStatusType } from '../components/Empty'
import { MoreLoadingStatusType } from '../components/MoreLoading'

interface OptionTypes {
  size?: number
  page?: number
  data?: any
  fetch: (data?: any) => Promise<{}>
}

interface ResultOptions {
  page: number
  size: number
  list: any[]
  loading: boolean
  isEmpty: boolean
  status: keyof MoreLoadingStatusType
  emptyType: keyof EmptyStatusType
  isLoadingMore: boolean
  fetchData: Function
  onLoadingMoreHandle: () => void
}

const defaultOptions: OptionTypes = {
  fetch: () => new Promise<{}>((resolve) => resolve({}))
}

const usePageLoadingHook = (options = defaultOptions): ResultOptions => {
  const [size] = useState<number>(options.size || 10)
  const [page, setPage] = useState(options.page || 0)
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<keyof MoreLoadingStatusType>('more')
  const [emptyType, setEmptyType] = useState<keyof EmptyStatusType>('notList')
  const [isEmpty, setIsEmpty] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const userId = getUserId()
  // 加载数据
  const fetchData = async (fetchType?: boolean) => {
    setLoading(true)
    try {
      const result: any = await options.fetch(Object.assign({}, {
        page: fetchType ? page + 1 : 0,
        size,
        orgUid: userId
      }, options.data))
      const content = result.content
      setStatus(content.content.length < size ? 'noMore' : 'more')
      // 是否加载更多
      if (fetchType) {
        setPage(page + 1)
        setList(list.concat(content.content))
      } else {
        setPage(0)
        setList(content.content)
      }
      stopPullDownRefresh()
    } catch (error) {
      setEmptyType('networkError')
    }
    setLoading(false)
  }
  // 加载更多
  const onLoadingMoreHandle = () => {
    setStatus('loading')
    fetchData(true)
  }

  // 监听下拉刷新，加载数据
  usePullDownRefresh(() => {
    setPage(1)
    fetchData(false)
  })

  // 初始化加载数据
  useEffect(() => {
    fetchData(false)
  }, [])

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

  // 监听是否空数据,显示加载更多
  useEffect(() => {
    setIsEmpty(!list.length && !loading)
    setIsLoadingMore(!!list.length)
  }, [loading, list])

  return {
    page,
    size,
    list,
    status,
    loading,
    isEmpty,
    emptyType,
    isLoadingMore,
    fetchData,
    onLoadingMoreHandle
  }
}

export default usePageLoadingHook
