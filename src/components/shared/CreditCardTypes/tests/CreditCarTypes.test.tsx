import { paymentsMock } from '@/_tests_/mocks/core/paymentsMock'
import { useCreditCardTypesMock } from './useCreditCardTypesMock'
import { screen } from '@testing-library/react-native'
import { render } from '@/_tests_/customs/customRender'
import { CreditCardTypes } from '..'

jest.mock('../useCreditCardTypes.ts')

describe('CreditCardTypes', () => {
  it.each(paymentsMock)(
    'should render $name credit card type when is not loading',
    ({ id }) => {
      useCreditCardTypesMock({
        creditCardTypes: paymentsMock,
        isLoading: false,
      })

      render(<CreditCardTypes />)

      expect(screen.getByTestId(id)).toBeTruthy()
    },
  )
})
