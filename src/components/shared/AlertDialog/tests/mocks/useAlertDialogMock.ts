import { useAlertDialog } from "../../useAlertDialog"

export function useAlertDialogMock(returnUseCartMock?: Partial<ReturnType<typeof useAlertDialog>>) {
  jest.mocked(useAlertDialog).mockReturnValueOnce({
    close: jest.fn(),
    open: jest.fn(),
    handleOpenChange: jest.fn(),
    isOpen: true,
    ...returnUseCartMock,
  })
}
