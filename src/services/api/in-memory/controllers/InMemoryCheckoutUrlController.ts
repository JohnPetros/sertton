import { paymentsMock } from '@/_tests_/mocks/core/paymentsMock'
import { ICheckoutController } from '../../interfaces/ICheckoutController'

export function InMemoryCheckoutController(): ICheckoutController {
  return {
    async getPayments() {
      return paymentsMock
    },

    getCheckoutUrl() {
      return 'https://checkout.mock.com'
    },
  }
}
