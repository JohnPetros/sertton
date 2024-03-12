import { renderHook } from '@/_tests_/customs/customRenderHook'
import { useApiMock } from '@/_tests_/mocks/services/apiMock'
import { useCreditCardTypes } from '../useCreditCardTypes'
import { waitFor } from '@testing-library/react-native'

jest.mock('@/services/api')

describe('useCreditCardTypes hook', () => {
  it('should fetch credit card types', async () => {
    const apiMock = useApiMock()

    const paymentsMock = await apiMock.getPayments()

    await waitFor(() => {
      const { result } = renderHook(useCreditCardTypes)

      const creditCardTypes =
        result.current.parsePaymentToCreditCardTypes(paymentsMock)

      expect(result.current.creditCardTypes).toEqual(creditCardTypes)
    })
  })
})
