import {
  ChatTeardropText,
  CreditCard,
  LockSimple,
  Truck,
} from 'phosphor-react-native'

import type { InformativeHiglight } from '../types/InformativeHighlight'

export const INFORMATIVE_HIGHLIGHTS: InformativeHiglight[] = [
  {
    text: 'Envio rápido e garantido, para todo Brasil',
    icon: Truck,
  },
  {
    text: 'Parcele suas compras com cartão de crédito',
    icon: CreditCard,
  },
  {
    text: 'Loja confiável com tecnologia 100% segura',
    icon: LockSimple,
  },
  {
    text: 'Suporte rápido e prestativo',
    icon: ChatTeardropText,
  },
]
