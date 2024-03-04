import { View } from 'react-native'

const CartSummary = () => <View />

jest.mock('@/components/shared/CartSummary', () => ({
  CartSummary: () => {
    return <CartSummary />
  },
}))
