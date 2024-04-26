import { useOrdersList } from '../../useOrdersList'

export function useOrdersListMock(
  returnUseOrdersListMock?: Partial<ReturnType<typeof useOrdersList>>,
) {
  const handleValidateDocumentMock = jest.fn()
  const handleEditCustomerDocumentMock = jest.fn()

  jest.mocked(useOrdersList).mockReturnValueOnce({
    customerDocument: '',
    personType: 'legal',
    orders: [],
    isLoading: false,
    handleValidateDocument: handleValidateDocumentMock,
    handleEditCustomerDocument: handleEditCustomerDocumentMock,
    ...returnUseOrdersListMock,
  })

  return {
    handleValidateDocumentMock,
    handleEditCustomerDocumentMock,
  }
}
