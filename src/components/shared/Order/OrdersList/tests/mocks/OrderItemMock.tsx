import { Text, View } from 'react-native'
import { OrderItemProps } from '../../OrderItem'

const OrderItem = ({ data }: OrderItemProps) => (
  <View>
    <Text>{data.number}</Text>
  </View>
)

jest.mock('../../OrderItem', () => ({
  OrderItem: (orderItemProps: OrderItemProps) => {
    return <OrderItem {...orderItemProps} />
  },
}))
