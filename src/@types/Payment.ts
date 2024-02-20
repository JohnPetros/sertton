export type PaymentMethod = 'credit-card' | 'ticket' | 'pix'

export type Payment = {
  id: string
  name: string
  icon: string
  isCreditCard: boolean
  isActive: boolean
}
