import { View } from 'react-native'

const Contacts = () => <View />

jest.mock('@/components/shared/Contacts', () => ({
  Contacts: () => {
    return <Contacts />
  },
}))
