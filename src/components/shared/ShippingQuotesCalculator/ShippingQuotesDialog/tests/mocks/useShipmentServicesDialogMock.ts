import { useShippingQuotesDialog } from '../../useShippingQuotesDialog'

const handleDialogOpenChangeMock = jest.fn()

export function useShippingQuotesDialogMock(
  useShippingQuotesDialogMock?: Partial<
    ReturnType<typeof useShippingQuotesDialog>
  >,
) {
  jest.mocked(useShippingQuotesDialog).mockReturnValueOnce({
    address: null,
    isLoading: false,
    handleDialogOpenChange: handleDialogOpenChangeMock,
    ...useShippingQuotesDialogMock,
  })

  return {
    handleDialogOpenChangeMock,
  }
}
