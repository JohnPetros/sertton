import { createRef } from 'react'
import { useDocumentDialog } from '../../useDocumentDialog'
import { DialogRef } from '@/components/shared/Dialog/types/DialogRef'

export function useDocumentDialogMock(
  returnUseCartMock?: Partial<ReturnType<typeof useDocumentDialog>>,
) {
  const dialogRef = createRef<DialogRef>()

  const handleSubmitMock = jest.fn()
  const handleCpfChangeMock = jest.fn()
  const handleCnpjChangeMock = jest.fn()
  const handleTabsChangeMock = jest.fn()

  jest.mocked(useDocumentDialog).mockReturnValueOnce({
    cpf: '12345678312',
    cnpj: '1234567896321',
    error: 'error message',
    personType: 'natural',
    isLoading: false,
    dialogRef: dialogRef,
    open: jest.fn(),
    close: jest.fn(),
    handleSubmit: handleSubmitMock,
    handleCpfChange: handleCpfChangeMock,
    handleCnpjChange: handleCnpjChangeMock,
    handleTabsChange: handleTabsChangeMock,
    ...returnUseCartMock,
  })

  return {
    dialogRef,
    handleSubmitMock,
    handleCpfChangeMock,
    handleCnpjChangeMock,
    handleTabsChangeMock,
  }
}
