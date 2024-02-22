import { View } from 'react-native'

// phosphor-react-native test bug fix
const Truck = () => <View />

jest.mock('phosphor-react-native', () => ({
  Truck: () => {
    return <Truck />
  },
}))

// Cacha test bug fix
jest.useFakeTimers()
