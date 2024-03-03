import { View } from 'react-native'

const Icon = () => <View />

jest.mock('phosphor-react-native', () => ({
  Truck: () => {
    return <Icon />
  },
  WhatsappLogo: () => {
    return <Icon />
  },
  Phone: () => {
    return <Icon />
  },
  EnvelopeSimple: () => {
    return <Icon />
  },
  Circle: () => {
    return <Icon />
  },
  Bag: () => {
    return <Icon />
  },
  CurrencyCircleDollar: () => {
    return <Icon />
  },
  MagnifyingGlass: () => {
    return <Icon />
  },
  Check: () => {
    return <Icon />
  },
}))
