import { useShippingQuotesCalculator } from '../useShippingQuotesCalculator'

export function useShippingQuotesCalculatorMock(
  returnUseShippingQuotesCalculatorMock?: Partial<
    ReturnType<typeof useShippingQuotesCalculator>
  >,
) {
  const handleZipcodeChangeMock = jest.fn()
  const handleShipmentServicesDialogOpenChangeMock = jest.fn()
  const handleCalculateShipmentServicesMock = jest.fn()

  jest.mocked(useShippingQuotesCalculator).mockReturnValueOnce({
    shipmentServices: [],
    zipcode: '',
    shouldCalculate: false,
    handleZipcodeChange: handleZipcodeChangeMock,
    handleShipmentServicesDialogOpenChange:
      handleShipmentServicesDialogOpenChangeMock,
    handleCalculateShipmentServices: handleCalculateShipmentServicesMock,
    ...returnUseShippingQuotesCalculatorMock,
  })

  return {
    handleZipcodeChangeMock,
    handleShipmentServicesDialogOpenChangeMock,
    handleCalculateShipmentServicesMock,
  }
}
