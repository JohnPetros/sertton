import { paymentsMock } from '@/_tests_/mocks/core/paymentsMock'
import { useCreditCardTypes } from '../useCreditCardTypes'

export function useCreditCardTypesMock(
  returnMock?: Partial<ReturnType<typeof useCreditCardTypes>>,
) {
  jest.mocked(useCreditCardTypes).mockReturnValueOnce({
    parsePaymentToCreditCardTypes: jest.fn(),
    isLoading: false,
    creditCardTypes: paymentsMock,
    ...returnMock,
  })
}
