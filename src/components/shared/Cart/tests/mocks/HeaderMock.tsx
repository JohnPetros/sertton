import { View } from 'react-native'

const Header = () => <View />

jest.mock('../../../Header', () => ({
  Header: () => {
    return <Header />
  },
}))
