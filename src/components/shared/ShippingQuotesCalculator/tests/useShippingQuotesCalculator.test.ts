import { renderHook } from '@/_tests_/customs/customRenderHook'
import { skusMock } from '@/_tests_/mocks/core/skusMock'
import { useApiMock } from '@/_tests_/mocks/services/apiMock'
import { act, waitFor } from '@testing-library/react-native'
import { injectProviders } from '@/providers/helpers/injectProviders'
import { useToastMock } from '@/_tests_/mocks/hooks/useToastMock'
import { useShippingQuotesCalculator } from '../useShippingQuotesCalculator'
import { shippingQuotesMock } from '@/_tests_/mocks/core/shipmentsServicesMock'

jest.mock('@/services/api')
jest.mock('@/utils/hooks/useToast')

const processedSku = { ...skusMock[0], quantity: 4 }

describe('useShippingQuotesCalculator hooks', () => {
  beforeAll(() => {
    injectProviders()
  })

  it('should return handlers', () => {
    useApiMock()

    const { result } = renderHook(() =>
      useShippingQuotesCalculator(processedSku),
    )

    expect(typeof result.current.handleZipcodeChange).toBe('function')
    expect(typeof result.current.handleShippingQuotesDialogOpenChange).toBe(
      'function',
    )
    expect(typeof result.current.handleCalculateShipmentServices).toBe(
      'function',
    )
  })

  it('should set zipcode on handle zipcode change', () => {
    useApiMock()

    const { result } = renderHook(() =>
      useShippingQuotesCalculator(processedSku),
    )

    const zipcode = 'zipcode mock'

    act(() => {
      result.current.handleZipcodeChange(zipcode)
    })

    expect(result.current.zipcode).toBe(zipcode)
  })

  it('should a show error toast message if zipcode is not set or shouldCalculate if false', async () => {
    const calculateShippingQuotesMock = jest.fn()

    useApiMock({ calculateShippingQuotes: calculateShippingQuotesMock })
    const toastMock = useToastMock()

    const { result } = renderHook(() =>
      useShippingQuotesCalculator(processedSku),
    )

    act(() => {
      result.current.handleCalculateShipmentServices()
    })

    await waitFor(() => {
      expect(toastMock.showMock).toHaveBeenCalledWith('Cep inválido', 'error')
      expect(calculateShippingQuotesMock).not.toHaveBeenCalled()
    })
  })

  it('should a show error toast message if zipcode is not valid', async () => {
    const calculateShippingQuotesMock = jest.fn()

    useApiMock({ calculateShippingQuotes: calculateShippingQuotesMock })
    const toastMock = useToastMock()

    const { result } = renderHook(() =>
      useShippingQuotesCalculator(processedSku),
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
      expect(calculateShippingQuotesMock).not.toHaveBeenCalled()
    })
  })

  it('should a show error toast message if Api throw an error', async () => {
    useApiMock({
      calculateShippingQuotes: async () => {
        throw new Error('Api error mock')
      },
    })

    const toastMock = useToastMock()

    const { result } = renderHook(() =>
      useShippingQuotesCalculator(processedSku),
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
      calculateShippingQuotes: async () => shippingQuotesMock,
    })

    const { result } = renderHook(() =>
      useShippingQuotesCalculator(processedSku),
    )

    act(() => {
      const zipcode = '12231440'
      result.current.handleZipcodeChange(zipcode)
    })

    act(() => {
      result.current.handleCalculateShipmentServices()
    })

    await waitFor(() => {
      expect(result.current.shippingQuotes).toEqual(shippingQuotesMock)
    })
  })

  it('should refetch shipment services after fetch shipment services for the first time', async () => {
    const calculateShippingQuotesMock = jest.fn()

    useApiMock({
      calculateShippingQuotes: calculateShippingQuotesMock,
    })

    const { result } = renderHook(() =>
      useShippingQuotesCalculator(processedSku),
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
      expect(calculateShippingQuotesMock).toHaveBeenCalled()
    })

    act(() => {
      result.current.handleCalculateShipmentServices()
    })

    expect(calculateShippingQuotesMock).toHaveBeenCalled()
  })

  it('should change shouldCalculate value on handle shipment services dialog open change', async () => {
    useApiMock({
      calculateShippingQuotes: async () => shippingQuotesMock,
    })

    const { result } = renderHook(() =>
      useShippingQuotesCalculator(processedSku),
    )

    expect(result.current.shouldCalculate).toBe(false)

    act(() => {
      result.current.handleCalculateShipmentServices()
    })

    expect(result.current.shouldCalculate).toBe(true)

    act(() => {
      result.current.handleShippingQuotesDialogOpenChange(false)
    })

    expect(result.current.shouldCalculate).toBe(false)
  })
})
