import { renderHook } from '@/_tests_/customs/customRenderHook'
import { useShipmentServicesCalculator } from '../useShipmentServicesCalculator'
import { skusMock } from '@/_tests_/mocks/core/skusMock'
import { useApiMock } from '@/_tests_/mocks/services/apiMock'
import { act, waitFor } from '@testing-library/react-native'
import { shipmentServicesMock } from '@/_tests_/mocks/core/shipmentsServicesMock'
import { injectProviders } from '@/providers/helpers/injectProviders'
import { useToastMock } from '@/_tests_/mocks/hooks/useToastMock'

jest.mock('@/services/api')
jest.mock('@/utils/hooks/useToast')

const processedSku = { ...skusMock[0], quantity: 4 }

describe('useShipmentServicesCalculator hooks', () => {
  beforeAll(() => {
    injectProviders()
  })

  it('should return handlers', () => {
    useApiMock()

    const { result } = renderHook(() =>
      useShipmentServicesCalculator(processedSku),
    )

    expect(typeof result.current.handleZipcodeChange).toBe('function')
    expect(typeof result.current.handleShipmentServicesDialogOpenChange).toBe(
      'function',
    )
    expect(typeof result.current.handleCalculateShipmentServices).toBe(
      'function',
    )
  })

  it('should set zipcode on handle zipcode change', () => {
    useApiMock()

    const { result } = renderHook(() =>
      useShipmentServicesCalculator(processedSku),
    )

    const zipcode = 'zipcode mock'

    act(() => {
      result.current.handleZipcodeChange(zipcode)
    })

    expect(result.current.zipcode).toBe(zipcode)
  })

  it('should a show error toast message if zipcode is not set or shouldCalculate if false', async () => {
    const getShipmentServicesMock = jest.fn()

    useApiMock({ getShipmentServices: getShipmentServicesMock })
    const toastMock = useToastMock()

    const { result } = renderHook(() =>
      useShipmentServicesCalculator(processedSku),
    )

    act(() => {
      result.current.handleCalculateShipmentServices()
    })

    await waitFor(() => {
      expect(toastMock.showMock).toHaveBeenCalledWith('Cep inválido', 'error')
      expect(getShipmentServicesMock).not.toHaveBeenCalled()
    })
  })

  it('should a show error toast message if zipcode is not valid', async () => {
    const getShipmentServicesMock = jest.fn()

    useApiMock({ getShipmentServices: getShipmentServicesMock })
    const toastMock = useToastMock()

    const { result } = renderHook(() =>
      useShipmentServicesCalculator(processedSku),
    )

    act(() => {
      const zipcode = 'invalid zipcode'
      result.current.handleZipcodeChange(zipcode)
    })

    act(() => {
      result.current.handleCalculateShipmentServices()
    })

    await waitFor(() => {
      expect(toastMock.showMock).toHaveBeenCalledWith('Cep inválido', 'error')
      expect(getShipmentServicesMock).not.toHaveBeenCalled()
    })
  })

  it('should a show error toast message if Api throw an error', async () => {
    useApiMock({
      getShipmentServices: async () => {
        throw new Error('Api error mock')
      },
    })

    const toastMock = useToastMock()

    const { result } = renderHook(() =>
      useShipmentServicesCalculator(processedSku),
    )

    act(() => {
      const zipcode = '12231440'
      result.current.handleZipcodeChange(zipcode)
    })

    act(() => {
      result.current.handleCalculateShipmentServices()
    })

    await waitFor(() => {
      expect(toastMock.showMock).toHaveBeenCalledWith(
        'Não foi possível calcular frete para o CEP 12231440',
        'error',
      )
    })
  })

  it('should fetch shipment services on handle calculate shipment services and when there is a valid zipcode', async () => {
    useApiMock({
      getShipmentServices: async () => shipmentServicesMock,
    })

    const { result } = renderHook(() =>
      useShipmentServicesCalculator(processedSku),
    )

    act(() => {
      const zipcode = '12231440'
      result.current.handleZipcodeChange(zipcode)
    })

    act(() => {
      result.current.handleCalculateShipmentServices()
    })

    await waitFor(() => {
      expect(result.current.shipmentServices).toEqual(shipmentServicesMock)
    })
  })

  it('should refetch shipment services after fetch shipment services for the first time', async () => {
    const getShipmentServicesMock = jest.fn()

    useApiMock({
      getShipmentServices: getShipmentServicesMock,
    })

    const { result } = renderHook(() =>
      useShipmentServicesCalculator(processedSku),
    )

    expect(result.current.shouldCalculate).toBe(false)

    act(() => {
      const zipcode = '12231440'
      result.current.handleZipcodeChange(zipcode)
    })

    act(() => {
      result.current.handleCalculateShipmentServices()
    })

    expect(result.current.shouldCalculate).toBe(true)

    await waitFor(() => {
      expect(getShipmentServicesMock).toHaveBeenCalled()
    })

    act(() => {
      result.current.handleCalculateShipmentServices()
    })

    expect(getShipmentServicesMock).toHaveBeenCalled()
  })

  it('should change shouldCalculate value on handle shipment services dialog open change', async () => {
    useApiMock({
      getShipmentServices: async () => shipmentServicesMock,
    })

    const { result } = renderHook(() =>
      useShipmentServicesCalculator(processedSku),
    )

    expect(result.current.shouldCalculate).toBe(false)

    act(() => {
      result.current.handleCalculateShipmentServices()
    })

    expect(result.current.shouldCalculate).toBe(true)

    act(() => {
      result.current.handleShipmentServicesDialogOpenChange(false)
    })

    expect(result.current.shouldCalculate).toBe(false)
  })
})
