import { renderHook } from '@/_tests_/customs/customRenderHook'
import { useOrdersList } from '../useOrdersList'
import { act, waitFor } from '@testing-library/react-native'
import { useApiMock } from '@/_tests_/mocks/services/apiMock'
import { useStorageMock } from '@/_tests_/mocks/services/storageMock'
import { STORAGE } from '@/utils/constants/storage'
import { processedOrdersMock } from '@/_tests_/mocks/core/processedOrdersMock'

const openDocumentDialogMock = jest.fn()
const closeDocumentDialogMock = jest.fn()

jest.mock('@/services/api')
jest.mock('@/services/storage')

jest.mock('expo-router', () => {
  const { useEffect } = require('react')
  const expoRouter = jest.requireActual('expo-router')

  return {
    ...expoRouter,
    useFocusEffect: useEffect,
  }
})

describe('useOrdersList hook', () => {
  it('should open document dialog if the customer document is not storeged', async () => {
    useApiMock()
    useStorageMock()

    renderHook(() =>
      useOrdersList(openDocumentDialogMock, closeDocumentDialogMock),
    )

    await waitFor(() => {
      expect(openDocumentDialogMock).toHaveBeenCalled()
    })
  })

  it('should open document dialog if the customer document is storeged but their orders is not fetched and the storaged document is malformed', async () => {
    useApiMock()
    useStorageMock([
      {
        key: STORAGE.keys.customer.document,
        value: ':',
      },
    ])

    renderHook(() =>
      useOrdersList(openDocumentDialogMock, closeDocumentDialogMock),
    )

    await waitFor(() => {
      expect(openDocumentDialogMock).toHaveBeenCalled()
    })
  })

  it("should set the customer's document and person type if their document is storeged but their orders is not fetched and the storaged document is properly formed", async () => {
    useApiMock()

    const personType = 'natural'
    const customerDocument = '123456789'
    useStorageMock([
      {
        key: STORAGE.keys.customer.document,
        value: `${personType}:${customerDocument}`,
      },
    ])

    const { result } = renderHook(() =>
      useOrdersList(openDocumentDialogMock, closeDocumentDialogMock),
    )

    await waitFor(() => {
      expect(result.current.personType).toBe(personType)
      expect(result.current.customerDocument).toBe(customerDocument)
    })
  })

  it('should fetch customer orders if the their document is storeged but their orders is not fetched and the storaged document is properly formed', async () => {
    useApiMock({
      getProcessedOrdersByCustomerDocument: async () => processedOrdersMock,
    })

    const personType = 'natural'
    const customerDocument = '123456789'
    useStorageMock([
      {
        key: STORAGE.keys.customer.document,
        value: `${personType}:${customerDocument}`,
      },
    ])

    const { result } = renderHook(() =>
      useOrdersList(openDocumentDialogMock, closeDocumentDialogMock),
    )

    await waitFor(() => {
      expect(result.current.orders).toEqual(processedOrdersMock)
    })
  })

  it('should open document dialog on edit document', () => {
    useApiMock()
    useStorageMock()

    const { result } = renderHook(() =>
      useOrdersList(openDocumentDialogMock, closeDocumentDialogMock),
    )

    act(() => {
      result.current.handleEditCustomerDocument()
    })

    expect(openDocumentDialogMock).toHaveBeenCalled()
  })

  it('should storage the document and person type of the customer', async () => {
    useApiMock()
    const storageMock = useStorageMock()

    const { result } = renderHook(() =>
      useOrdersList(openDocumentDialogMock, closeDocumentDialogMock),
    )

    const document = '12345678965'
    const personType = 'natural'

    act(async () => {
      await result.current.handleValidateDocument(document, personType)
    })

    const storagedDocument = await storageMock.getItem(
      STORAGE.keys.customer.document,
    )

    expect(storagedDocument).toBe(`${personType}:${document}`)
  })

  it('should return handlers', async () => {
    useApiMock()
    useStorageMock()

    const { result } = renderHook(() =>
      useOrdersList(openDocumentDialogMock, closeDocumentDialogMock),
    )

    expect(typeof result.current.handleValidateDocument).toBe('function')
    expect(typeof result.current.handleEditCustomerDocument).toBe('function')
  })
})
