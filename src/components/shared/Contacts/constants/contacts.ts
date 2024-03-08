import { WHATSAPP_NUMBER } from '@/utils/constants/whatsapp'
import { Contact } from '../types/Contact'

export const CONTACTS: Contact[] = [
  {
    type: 'whatsapp',
    url: `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=Olá, gostaria de saber mais sobre a Sertton.`,
    title: '(12) 988233818',
  },
  {
    type: 'landline',
    url: 'tel:551149682964',
    title: '(11) 1149682964',
  },
  {
    type: 'email',
    url: 'mailto:falecom@sertton.ind.br',
    title: 'falecom@sertton.ind.br',
  },
]
