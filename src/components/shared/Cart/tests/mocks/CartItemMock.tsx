import { View } from 'react-native'

const CartItem = () => <View />

jest.mock('@/components/shared/Cart/CartItem', () => ({
  CartItem: () => {
    return <CartItem />
  },
}))
