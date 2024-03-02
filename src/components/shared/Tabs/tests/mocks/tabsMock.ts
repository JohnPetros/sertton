import { Phone, User } from 'phosphor-react-native'

import { Tab } from '../..'

export const tabsMocks: Tab[] = [
  {
    title: 'Tab title 1',
    value: 'tab-value-1',
    icon: User,
    size: 600,
    content: 'Tab content 1',
  },
  {
    title: 'Tab title 2',
    value: 'tab-value-2',
    icon: Phone,
    size: 600,
    content: 'Tab content 2',
  },
  // Adicione mais mocks conforme necessário
]
