import { View } from '@tarojs/components'

import './index.less'

function FlexItem (props) {
  return (
    <View className='flex-item'>
      {props.children}
    </View>
  )
}

export default FlexItem
