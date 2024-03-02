import { Contact } from '../types/Contact'

const WHATSAPP = {
  number: '5512988233818',
  text: 'Olá, gostaria de saber mais sobre a Sertton.',
}

export const CONTACTS: Contact[] = [
  {
    type: 'whatsapp',
    url: `whatsapp://send?phone=${WHATSAPP.number}&text=${WHATSAPP.text}`,
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
