import { renderHook } from '@/_tests_/customs/customRenderHook'
import { useShipmentServicesDialog } from '../useShipmentServicesDialog'
import { act, waitFor } from '@testing-library/react-native'
import { useApiMock } from '@/_tests_/mocks/services/apiMock'
import { shipmentServicesMock } from '@/_tests_/mocks/core/shipmentsServicesMock'
import { addressesMock } from '@/_tests_/mocks/core/addressesMock'

jest.mock('@/services/api')

const addressMock = addressesMock[0]
const onOpenChangeMock = jest.fn()

describe('useShipmentServicesDialog hook', () => {
  it('should pass isOpen value to onOpenChange callback', () => {
    useApiMock()

    const { result } = renderHook(() =>
      useShipmentServicesDialog(addressMock.zipcode, [], onOpenChangeMock),
    )

    const isOpen = true

    act(() => {
      result.current.handleDialogOpenChange(isOpen)
    })

    expect(onOpenChangeMock).toHaveBeenCalledWith(isOpen)
  })

  it('should get address by zipcode if it is open and there are calculated shipment services', async () => {
    const apiMock = useApiMock()

    const { result } = renderHook(() =>
      useShipmentServicesDialog(
        addressMock.zipcode,
        shipmentServicesMock,
        onOpenChangeMock,
      ),
    )

    expect(result.current.address).toBeNull()

    act(() => {
      result.current.handleDialogOpenChange(true)
    })

    const fetchedAddress = await apiMock.getAddressByZipcode(
      addressMock.zipcode,
    )

    await waitFor(() => {
      expect(result.current.address).toEqual({
        zipcode: fetchedAddress?.zipcode,
        city: fetchedAddress?.city,
        uf: fetchedAddress?.uf,
      })
    })
  })

  it('should set loading to false if a address is fetched', async () => {
    useApiMock()

    const { result } = renderHook(() =>
      useShipmentServicesDialog(
        addressMock.zipcode,
        shipmentServicesMock,
        onOpenChangeMock,
      ),
    )

    expect(result.current.isLoading).toBe(true)

    act(() => {
      result.current.handleDialogOpenChange(true)
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })
  })

  it('should nullify address and reset loading state if dialog is not open', async () => {
    const apiMock = useApiMock()

    const { result } = renderHook(() =>
      useShipmentServicesDialog(
        addressMock.zipcode,
        shipmentServicesMock,
        onOpenChangeMock,
      ),
    )

    expect(result.current.address).toBeNull()

    act(() => {
      result.current.handleDialogOpenChange(true)
    })

    const fetchedAddress = await apiMock.getAddressByZipcode(
      addressMock.zipcode,
    )

    await waitFor(() => {
      expect(result.current.address).toEqual({
        zipcode: fetchedAddress?.zipcode,
        city: fetchedAddress?.city,
        uf: fetchedAddress?.uf,
      })

      expect(result.current.isLoading).toBe(false)
    })

    act(() => {
      result.current.handleDialogOpenChange(false)
    })

    expect(result.current.address).toBeNull()
    expect(result.current.isLoading).toBe(true)
  })

  it('should return dialog handler', async () => {
    useApiMock()

    const { result } = renderHook(() =>
      useShipmentServicesDialog(
        addressMock.zipcode,
        shipmentServicesMock,
        onOpenChangeMock,
      ),
    )

    expect(typeof result.current.handleDialogOpenChange).toBe('function')
  })
})
