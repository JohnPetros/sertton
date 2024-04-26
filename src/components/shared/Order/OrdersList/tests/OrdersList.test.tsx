import './mocks/OrderItemMock'

import { act, fireEvent, screen } from '@testing-library/react-native'

import { render } from '@/_tests_/customs/customRender'
import { processedOrdersMock } from '@/_tests_/mocks/core/processedOrdersMock'
import { useOrdersListMock } from './mocks/useOrdersList.testMock'
import { OrdersList } from '..'
import { createRef } from 'react'
import { DialogRef } from '@/components/shared/Dialog/types/DialogRef'
import { injectProviders } from '@/providers/helpers/injectProviders'

jest.mock('../useOrdersList.ts')

const documentDialogRef = createRef<DialogRef>()

describe('OrdersList component', () => {
  beforeAll(() => {
    injectProviders()
  })

  it('should render edit document button and the customer formatted document if the customer document exists in the app', () => {
    useOrdersListMock({ customerDocument: '' })

    const { rerender } = render(
      <OrdersList documentDialogRef={documentDialogRef} />,
    )

    expect(screen.queryByText('Alterar documento')).not.toBeTruthy()
    expect(screen.queryByText('123.456.789-12')).not.toBeTruthy()

    useOrdersListMock({
      customerDocument: '12345678912',
      personType: 'natural',
    })

    rerender(<OrdersList documentDialogRef={documentDialogRef} />)

    expect(screen.getByText('Alterar documento')).toBeTruthy()
    expect(screen.getByText('123.456.789-12')).toBeTruthy()
  })

  it('should render edit document button if the customer document exists in the app', () => {
    const { handleEditCustomerDocumentMock } = useOrdersListMock({
      customerDocument: '12345678965',
    })

    render(<OrdersList documentDialogRef={documentDialogRef} />)

    const editCustomerDocumentButton = screen.getByText('Alterar documento')

    fireEvent.press(editCustomerDocumentButton)

    expect(handleEditCustomerDocumentMock).toHaveBeenCalled()
  })

  it('should render orders items mock if it is loading and then render the customer orders items mock', () => {
    useOrdersListMock({
      isLoading: true,
      orders: processedOrdersMock,
    })

    const { rerender } = render(
      <OrdersList documentDialogRef={documentDialogRef} />,
    )

    processedOrdersMock.forEach((_, index) => {
      expect(screen.getByTestId(`loading-order-item-${index}`)).toBeTruthy()
      expect(screen.queryByTestId(`order-item-${index}`)).not.toBeTruthy()
    })

    useOrdersListMock({
      isLoading: false,
      orders: processedOrdersMock,
    })

    rerender(<OrdersList documentDialogRef={documentDialogRef} />)

    processedOrdersMock.forEach((_, index) => {
      expect(
        screen.queryByTestId(`loading-order-item-${index}`),
      ).not.toBeTruthy()
      expect(screen.getByTestId(`order-item-${index}`)).toBeTruthy()
    })
  })

  it('should validate document on submit a valid document', () => {
    const { handleValidateDocumentMock } = useOrdersListMock({
      isLoading: true,
      orders: processedOrdersMock,
    })

    render(<OrdersList documentDialogRef={documentDialogRef} />)

    act(() => {
      documentDialogRef.current?.open()
    })

    const customerDocument = '12345678965'

    fireEvent.changeText(screen.getByTestId('cpf-input'), customerDocument)
    fireEvent.press(screen.getByText('Buscar pedidos'))

    expect(handleValidateDocumentMock).toHaveBeenCalledWith(
      customerDocument,
      'natural',
    )
  })
})
