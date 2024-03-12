import { Payment } from '@/@types/Payment'

export const paymentsMock: Payment[] = [
  {
    id: '1',
    name: 'Credit Card',
    icon: 'credit-card-icon.png',
    isCreditCard: true,
    isActive: true,
  },
  {
    id: '2',
    name: 'Ticket',
    icon: 'ticket-icon.png',
    isCreditCard: false,
    isActive: true,
  },
  {
    id: '3',
    name: 'PIX',
    icon: 'pix-icon.png',
    isCreditCard: false,
    isActive: true,
  },
]
