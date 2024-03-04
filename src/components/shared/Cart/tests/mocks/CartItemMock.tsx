import { View } from 'react-native'

const CartItem = () => <View />

jest.mock('@/components/shared/CartItems/CartItem', () => ({
  CartItem: () => {
    return <CartItem />
  },
}))
