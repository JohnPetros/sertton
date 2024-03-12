import { Payment } from '@/@types/Payment'

export interface ICheckoutController {
  getPayments(): Promise<Payment[]>
  getCheckoutUrl(): string
}
