
import { ICheckoutController } from '../../interfaces/ICheckoutController'

export function InMemoryCheckoutController(): ICheckoutController {
  return {
    getPayments() {
      throw new Error('Method not implemented')
    },

    getCheckoutUrl() {
      return 'https://checkout.mock.com'
    },
  }
}
