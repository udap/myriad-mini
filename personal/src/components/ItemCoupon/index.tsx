import { View } from '@tarojs/components'

interface ItemCouponProps<T, T2> {
  name: T
  age: T2
  mobile: string
}

function ItemCoupon<T, T2> (props: ItemCouponProps<T, T2>): JSX.Element {
  return (
    <View>
      {props.name}---{props.age}---{props.mobile}
    </View>
  )
}

export default ItemCoupon
