import { render } from '@/_tests_/customs/customRender'
import { ShippingQuotesDialog } from '..'
import { useShippingQuotesDialogMock } from './mocks/useShipmentServicesDialogMock'
import { act, fireEvent, screen } from '@testing-library/react-native'
import { Button } from 'react-native'
import { addressesMock } from '@/_tests_/mocks/core/addressesMock'
import { shippingQuotesMock } from '@/_tests_/mocks/core/shipmentsServicesMock'
import { formatPrice } from '@/utils/helpers/formatPrice'

jest.mock('../useShippingQuotesDialog.ts')

const addressMock = addressesMock[0]
const onOpenChangeMock = jest.fn()

describe('ShippingQuotesDialog component', () => {
  it('should render a loading if it is loading', () => {
    useShippingQuotesDialogMock({ isLoading: true })

    render(
      <ShippingQuotesDialog
        onOpenChange={onOpenChangeMock}
        shippingQuotes={[]}
        zipcode=''
      >
        <Button testID='trigger' title='' />
      </ShippingQuotesDialog>,
    )

    act(() => {
      fireEvent.press(screen.getByTestId('trigger'))
    })

    expect(screen.getByText('Calculando frete...')).toBeTruthy()
  })

  it("should render a address' zipcode, city and uf if there is an address and it is not loading", () => {
    useShippingQuotesDialogMock({ isLoading: false, address: addressMock })

    render(
      <ShippingQuotesDialog
        onOpenChange={onOpenChangeMock}
        shippingQuotes={[]}
        zipcode=''
      >
        <Button testID='trigger' title='' />
      </ShippingQuotesDialog>,
    )

    act(() => {
      fireEvent.press(screen.getByTestId('trigger'))
    })

    expect(screen.getByText(addressMock.zipcode)).toBeTruthy()
    expect(
      screen.getByText(`${addressMock.city} - ${addressMock.uf}`),
    ).toBeTruthy()
  })

  it("should render a address' shipment services if it is not loading and there is an address and shipment services", () => {
    useShippingQuotesDialogMock({ isLoading: false, address: addressMock })

    const { rerender } = render(
      <ShippingQuotesDialog
        onOpenChange={onOpenChangeMock}
        shippingQuotes={[]}
        zipcode=''
      >
        <Button testID='trigger' title='' />
      </ShippingQuotesDialog>,
    )

    act(() => {
      fireEvent.press(screen.getByTestId('trigger'))
    })

    for (const shipmentService of shippingQuotesMock) {
      expect(screen.queryByText(shipmentService.name)).not.toBeTruthy()
      expect(
        screen.queryByText(`até ${shipmentService.days} dias úteis`),
      ).not.toBeTruthy()
      expect(
        screen.queryByText(formatPrice(shipmentService.price)),
      ).not.toBeTruthy()
    }

    useShippingQuotesDialogMock({ isLoading: false, address: addressMock })

    rerender(
      <ShippingQuotesDialog
        onOpenChange={onOpenChangeMock}
        shippingQuotes={shippingQuotesMock}
        zipcode=''
      >
        <Button testID='trigger' title='' />
      </ShippingQuotesDialog>,
    )

    for (const shipmentService of shippingQuotesMock) {
      expect(screen.getByText(shipmentService.name)).toBeTruthy()
      expect(
        screen.getByText(`até ${shipmentService.days} dias úteis`),
      ).toBeTruthy()
      expect(screen.getByText(formatPrice(shipmentService.price))).toBeTruthy()
    }
  })

  it('should render empty message text if it is not loading', () => {
    useShippingQuotesDialogMock({ isLoading: false, address: null })

    render(
      <ShippingQuotesDialog
        onOpenChange={onOpenChangeMock}
        shippingQuotes={[]}
        zipcode=''
      >
        <Button testID='trigger' title='' />
      </ShippingQuotesDialog>,
    )

    act(() => {
      fireEvent.press(screen.getByTestId('trigger'))
    })

    expect(
      screen.getByText('Nenhum endereço encontrado para esse CEP'),
    ).toBeTruthy()
  })
})
