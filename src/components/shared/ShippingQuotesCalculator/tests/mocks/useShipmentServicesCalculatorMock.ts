import { useShippingQuotesCalculator } from '../../useShippingQuotesCalculator'

export function useShippingQuotesCalculatorMock(
  returnUseShippingQuotesCalculatorMock?: Partial<
    ReturnType<typeof useShippingQuotesCalculator>
  >,
) {
  const handleZipcodeChangeMock = jest.fn()
  const handleShippingQuotesDialogOpenChangeMock = jest.fn()
  const handleCalculateShipmentServicesMock = jest.fn()

  jest.mocked(useShippingQuotesCalculator).mockReturnValueOnce({
    shippingQuotes: [],
    zipcode: '',
    shouldCalculate: false,
    handleZipcodeChange: handleZipcodeChangeMock,
    handleShippingQuotesDialogOpenChange:
      handleShippingQuotesDialogOpenChangeMock,
    handleCalculateShipmentServices: handleCalculateShipmentServicesMock,
    ...returnUseShippingQuotesCalculatorMock,
  })

  return {
    handleZipcodeChangeMock,
    handleShippingQuotesDialogOpenChangeMock,
    handleCalculateShipmentServicesMock,
  }
}
