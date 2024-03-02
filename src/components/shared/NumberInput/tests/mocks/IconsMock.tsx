import { View } from 'react-native'

const Minus = () => <View />
const Plus = () => <View />

jest.mock('phosphor-react-native', () => ({
  Plus: () => {
    return <Plus />
  },
  Minus: () => {
    return <Minus />
  },
}))
