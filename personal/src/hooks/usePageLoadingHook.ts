import { useEffect, useState } from 'react'
import { showLoading, hideLoading, usePullDownRefresh, stopPullDownRefresh } from '@tarojs/taro'

interface OptionTypes {
  size: number,
  page: number,
  fetch: Function
}

interface ResultOptions {
  page: number,
  size: number,
  list: any[],
  status: string,
  loading: boolean,
  isEmpty: boolean,
  emptyType: string,
  isLoadingMore: boolean,
  fetchData: Function,
  onLoadingMoreHandle: Function
}

const defaultOptions = {
  size: 10,
  page: 1,
  fetch: () => {},
};

const usePageLoadingHook = (options: OptionTypes = defaultOptions): ResultOptions => {
  const [size] = useState(options.size)
  const [page, setPage] = useState(options.page)
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('more')
  const [emptyType, setEmptyType] = useState('notList')
  const [isEmpty, setIsEmpty] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  // 加载数据
  const fetchData = async () => {
    setLoading(true)
    const data = []
    try {
      const result = await options.fetch()
      console.log(result)
      setLoading(false)
      setStatus(data.length < size ? 'noMore' : 'more')
      setList(data)
      stopPullDownRefresh()
    } catch (error) {
      setEmptyType('networkError')
    }
  }
  // 加载更多
  const onLoadingMoreHandle = () => {
    setPage(page + 1)
    setStatus('loading')
    fetchData()
  }

  // 监听下拉刷新，加载数据
  usePullDownRefresh(() => {
    setPage(1)
    fetchData()
  })

  // 初始化加载数据
  useEffect(() => {
    fetchData()
  }, [])

  // 监听数据加载，显示loading
  useEffect(() => {
    if (loading) {
      showLoading({
        title: '数据加载中...',
        mask: true
      }).then(() => {
        console.log('数据开始加载!')
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
