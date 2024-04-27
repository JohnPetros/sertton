import { useShipmentServicesCalculator } from '../useShipmentServicesCalculator'

export function useShipmentServicesCalculatorMock(
  returnUseShipmentServicesCalculatorMock?: Partial<
    ReturnType<typeof useShipmentServicesCalculator>
  >,
) {
  const handleZipcodeChangeMock = jest.fn()
  const handleShipmentServicesDialogOpenChangeMock = jest.fn()
  const handleCalculateShipmentServicesMock = jest.fn()

  jest.mocked(useShipmentServicesCalculator).mockReturnValueOnce({
    shipmentServices: [],
    zipcode: '',
    shouldCalculate: false,
    handleZipcodeChange: handleZipcodeChangeMock,
    handleShipmentServicesDialogOpenChange:
      handleShipmentServicesDialogOpenChangeMock,
    handleCalculateShipmentServices: handleCalculateShipmentServicesMock,
    ...returnUseShipmentServicesCalculatorMock,
  })

  return {
    handleZipcodeChangeMock,
    handleShipmentServicesDialogOpenChangeMock,
    handleCalculateShipmentServicesMock,
  }
}
