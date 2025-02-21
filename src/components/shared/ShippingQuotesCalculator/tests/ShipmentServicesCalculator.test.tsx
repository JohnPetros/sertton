import { render } from '@/_tests_/customs/customRender'
import { skusMock } from '@/_tests_/mocks/core/skusMock'
import { fireEvent, screen } from '@testing-library/react-native'
import { ShippingQuotesCalculator } from '..'
import { useShippingQuotesCalculatorMock } from './useShipmentServicesCalculatorMock'

jest.mock('@/services/api')
jest.mock('../useShipingQuotesCalculator.ts')

const skuMock = { ...skusMock[0], quantity: 2 }

describe('ShipingQuotesCalculator component', () => {
  it('should handle zipcode input change', () => {
    const { handleZipcodeChangeMock } = useShippingQuotesCalculatorMock()

    render(<ShippingQuotesCalculator sku={skuMock} />)

    const zipcodeInput = screen.getByTestId('zipcode-input')

    fireEvent.changeText(zipcodeInput, 'zipcode mock')

    expect(handleZipcodeChangeMock).toHaveBeenCalled()
  })

  it('should handle calculate button press and handle shipment services dialog change', () => {
    const { handleCalculateShipmentServicesMock } =
      useShippingQuotesCalculatorMock()

    render(<ShippingQuotesCalculator sku={skuMock} />)

    const calculateButton = screen.getByTestId('calculate-button')

    fireEvent.press(calculateButton)

    expect(handleCalculateShipmentServicesMock).toHaveBeenCalled()
  })
})
