import { cartProductsMock } from '@/_tests_/mocks/core/cartProductsMock'
import { useShipmentServicesDialog } from '../../useShipmentServicesDialog'

const handleDialogOpenChangeMock = jest.fn()

export function useShipmentServicesDialogMock(
  useShipmentServicesDialogMock?: Partial<
    ReturnType<typeof useShipmentServicesDialog>
  >,
) {
  jest.mocked(useShipmentServicesDialog).mockReturnValueOnce({
    address: null,
    isLoading: false,
    handleDialogOpenChange: handleDialogOpenChangeMock,
    ...useShipmentServicesDialogMock,
  })

  return {
    handleDialogOpenChangeMock,
  }
}
